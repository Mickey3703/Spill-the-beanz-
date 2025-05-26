using System.ComponentModel.DataAnnotations;

namespace Spill_The_Beanz_Coffee_Shop_API.Models
{
    public class OrderItems
    {
        [Key]
        public int OrderItemId {get; set;}
        public int OrderId { get; set;}
        public int ItemId { get; set;}
        public int VariantId { get; set;}   
        public int Quantity { get; set; }
        public decimal UnitPrice { get; set; }
        public string? SpecialRequests { get; set; }
        public string ItemStatus { get; set; }
        public virtual MenuItems Item { get; set; } = null!;
        public virtual Orders Order { get; set; } = null!;
        public virtual ItemVariants Variant { get; set; }


    }
}
