namespace CSMS_Trial.DTOs
{
    public class PromotionDto
    {
        public int PromotionId { get; set; }
        public string PromoName { get; set; }
        public string PromoDescription { get; set; }
        public string? DiscountType { get; set; }
        public decimal? DiscountValue { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }
        public string Status { get; set; }
    }
}
