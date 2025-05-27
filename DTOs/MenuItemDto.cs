namespace CSMS_Trial.DTOs
{
    public class MenuItemDto
    {
        public int ItemId { get; set; }
        public string ItemName { get; set; }
        public string Description { get; set; }
        public decimal BasePrice { get; set; }
        public bool IsAvailable { get; set; }
        public bool IsFeatured { get; set; }
        public string? ImageUrl { get; set; }
    }
}
