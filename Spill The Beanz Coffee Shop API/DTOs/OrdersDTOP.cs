using Spill_The_Beanz_Coffee_Shop_API.Models;

namespace Spill_The_Beanz_Coffee_Shop_API.DTOs
{
    public class OrdersDTOP
    {
        //from Orders table
        public int CustomerId { get; set; } //Fetched from auth?
        public string OrderType { get; set; } = null!;
        public DateTime OrderDate { get; set; }
        public decimal TotalAmount { get; set; }
        public decimal DiscountAmount { get; set; } //from?
        public decimal TaxAmount { get; set; }
        public decimal FinalAmount { get; set; }
        public string OrderStatus { get; set; } //will be defaulted to 'received'/'prepping'
        public string? SpecialInstructions { get; set; } //this can be null
        public int? ReservationId { get; set; } //also this

        public List<OrderItemsDTOP> OrderItems { get; set; } = new List<OrderItemsDTOP>();
    }
}
