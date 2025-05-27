namespace CSMS_Trial.DTOs
{
    public class CustomerPromotionDto
    {
        public int Id { get; set; }
        public int CustomerId { get; set; }
        public int PromotionId { get; set; }
        public DateTime DateReceived { get; set; }
        public string Status { get; set; }
    }
}
