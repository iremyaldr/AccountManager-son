namespace NDAccountManagerAPI.Models
{
    public class AccountInfo
    {
        public int Id { get; set; }
        public string AccountName { get; set; }
        public string UserName { get; set; }
        public string Password { get; set; }
        public string Category { get; set; }
        public string Email { get; set; }
        public List<string> SharedWith { get; set; }
        public DateTime? ShareExpiration { get; set; }
        public DateTime CreatedAt { get; set; }
    }
}
