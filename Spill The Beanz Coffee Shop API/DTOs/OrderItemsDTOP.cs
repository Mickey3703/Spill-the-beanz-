using Spill_The_Beanz_Coffee_Shop_API.Models;
using System.ComponentModel.DataAnnotations.Schema;

namespace Spill_The_Beanz_Coffee_Shop_API.DTOs
{
    public class OrderItemsDTOP
    {//AUTO INC DOESNT NEED THE INPUT RIGHT?


        //From Order Items table
        public int OrderId { get; set; } //fetch from orders table?
        public int ItemId { get; set; } //fetch from items table?
        public int Quantity { get; set; }
        public decimal UnitPrice { get; set; } //from?
        public string? SpecialRequests { get; set; } //same as spec instructions
        public string? ItemStatus { get; set; } //for?

    }

    
}
