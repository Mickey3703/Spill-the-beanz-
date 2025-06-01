
namespace Spill_The_Beanz_Coffee_Shop_API.DTOs
{
    public class OrderDto
    {
        //public int OrderId { get; set; }
        // public int? CustomerId { get; set; }
        //public string OrderType { get; set; }
        //public DateTime OrderDate { get; set; }
        // public List<string> OrderItems { get; set; }
        public string OrderType { get; set; }
        public DateTime OrderDate { get; set; }
        public string? SpecialInstructions { get; set; }
        public string OrderStatus { get; set; }
        public decimal FinalAmount { get; set; }
    }
}
