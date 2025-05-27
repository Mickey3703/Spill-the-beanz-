using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Spill_The_Beanz_Coffee_Shop_API.Models
{
    public class OrderItems
    {
        [Key]
        [Column("order_item_id")]
        public int OrderItemId {get; set;}

        [Column("order_id")]
        public int OrderId { get; set;}

        [Column("item_id")]
        public int ItemId { get; set;}

        [Column("variant_id")]
        public int VariantId { get; set;}

        [Column("quantity")]
        public int Quantity { get; set; }

        [Column("unit_price")]
        public decimal UnitPrice { get; set; }

        [Column("special_requests")]
        public string? SpecialRequests { get; set; }

        [Column("item_status")]
        public string ItemStatus { get; set; }

        public virtual MenuItems Item { get; set; } = null!;
        [ForeignKey("OrderId")]
        public virtual Orders Order { get; set; } = null!;
        public virtual ItemVariants Variant { get; set; }


    }
}
