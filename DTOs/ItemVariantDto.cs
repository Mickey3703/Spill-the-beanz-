namespace CSMS_Trial.DTOs
{
    public class ItemVariantDto
    {
        public int VariantId { get; set; }
        public string VariantName { get; set; }
        public decimal AdditionalPrice { get; set; }
        public bool IsDefault { get; set; }
    }
}
