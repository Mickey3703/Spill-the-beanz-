using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

namespace Spill_The_Beanz_Coffee_Shop_API.Models
{
    public class ItemVariants
    {
        [Key]
        [Column("variant_id")]
        public int? VariantId { get; set; }

        [Column("item_id")]
        public int ItemId { get;set; }

        [Column("variant_name")]
        public string VariantName { get; set; }

        [Column("additional_price")]
        public decimal AdditionalPrice { get; set; }

        [Column("is_default")]
        public bool IsDefault { get; set; }
        public virtual MenuItems Item { get; set; }
        public ICollection<OrderItems> OrderItems { get; set; } = new List<OrderItems>();
  
    }
}

