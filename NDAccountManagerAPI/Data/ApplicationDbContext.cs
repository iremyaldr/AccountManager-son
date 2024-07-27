using Microsoft.EntityFrameworkCore;
using NDAccountManagerAPI.Models;

namespace NDAccountManagerAPI.Data
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
            : base(options)
        {
        }

        public DbSet<AccountInfo> AccountInfos { get; set; }
    }
}
