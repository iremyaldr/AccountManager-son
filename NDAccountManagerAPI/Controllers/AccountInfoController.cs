using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using NDAccountManagerAPI.Data;
using NDAccountManagerAPI.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.Extensions.Logging;

namespace NDAccountManagerAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AccountInfoController : ControllerBase
    {
        private readonly ApplicationDbContext _context;
        private readonly ILogger<AccountInfoController> _logger;

        public AccountInfoController(ApplicationDbContext context, ILogger<AccountInfoController> logger)
        {
            _context = context;
            _logger = logger;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<AccountInfo>>> GetAccountInfos()
        {
            return await _context.AccountInfos.ToListAsync();
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<AccountInfo>> GetAccountInfo(int id)
        {
            var accountInfo = await _context.AccountInfos.FindAsync(id);

            if (accountInfo == null)
            {
                return NotFound();
            }

            return accountInfo;
        }

        [HttpPost]
        public async Task<ActionResult<AccountInfo>> PostAccountInfo(AccountInfo accountInfo)
        {
            accountInfo.CreatedAt = DateTime.UtcNow;
            try
            {
                _context.AccountInfos.Add(accountInfo);
                await _context.SaveChangesAsync();
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error while saving new account information.");
                return BadRequest("There was an error processing your request.");
            }

            return CreatedAtAction("GetAccountInfo", new { id = accountInfo.Id }, accountInfo);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> PutAccountInfo(int id, AccountInfo accountInfo)
        {
            accountInfo.CreatedAt = DateTime.UtcNow;

            _context.Entry(accountInfo).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!AccountInfoExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteAccountInfo(int id)
        {
            var accountInfo = await _context.AccountInfos.FindAsync(id);
            if (accountInfo == null)
            {
                return NotFound();
            }

            _context.AccountInfos.Remove(accountInfo);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        [HttpPost("share")]
        public async Task<IActionResult> ShareAccountInfo([FromBody] ShareAccountInfoDTO shareDto)
        {
            _logger.LogInformation("ShareAccountInfo called with payload: {@shareDto}", shareDto);

            if (shareDto == null)
            {
                _logger.LogWarning("shareDto is null.");
                return BadRequest("Invalid data.");
            }

            var accountInfo = await _context.AccountInfos.FindAsync(shareDto.AccountInfoId);
            if (accountInfo == null)
            {
                _logger.LogWarning("Account information not found for Id: {AccountInfoId}", shareDto.AccountInfoId);
                return NotFound("Account information not found.");
            }

            if (shareDto.UserIds == null || !shareDto.UserIds.Any())
            {
                _logger.LogWarning("UserIds cannot be null or empty.");
                return BadRequest("UserIds cannot be null or empty.");
            }

            accountInfo.SharedWith = shareDto.UserIds;
            accountInfo.ShareExpiration = shareDto.IsUnlimited ? (DateTime?)null : shareDto.ShareDuration;
            _context.Entry(accountInfo).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error while saving changes.");
                return BadRequest("There was an error processing your request.");
            }

            return Ok(accountInfo);
        }

        private bool AccountInfoExists(int id)
        {
            return _context.AccountInfos.Any(e => e.Id == id);
        }
    }
}
