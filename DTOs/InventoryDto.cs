namespace CSMS_Trial.DTOs
{
    public class InventoryDto
    {
        public int InventoryId { get; set; }
        public string ItemName { get; set; }
        public string Category { get; set; }
        public decimal CurrentQuantity { get; set; }
        public string UnitOfMeasure { get; set; }
        public decimal? ReorderLevel { get; set; }
        public DateTime? LastRestocked { get; set; }
        public string? SupplierInfo { get; set; }
    }
}
