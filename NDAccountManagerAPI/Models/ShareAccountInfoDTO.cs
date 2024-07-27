namespace NDAccountManagerAPI.Models
{
    public class ShareAccountInfoDTO
    {
        public int AccountInfoId { get; set; }
        public List<string> UserIds { get; set; }
        public DateTime? ShareDuration { get; set; }
        public bool IsUnlimited { get; set; }
    }
}
