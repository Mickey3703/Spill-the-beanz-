using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Spill_The_Beanz_Coffee_Shop_API.Models
{
    public class MenuItems
    {
        [Key]
        [Column("item_id")]
        public int ItemId { get; set; }

        [ForeignKey("MenuCategory")]
        [Column("category_id")]
        public int MenuCategoryId { get; set; }

        [Column("item_name")]
        public string ItemName { get; set; }

        [Column("description")]
        public string Description { get; set; }

        [Column("base_price")]
        public decimal BasePrice { get; set; }

        [Column("is_available")]
        public bool IsAvailable { get; set; }

        [Column("is_featured")]
        public bool IsFeatured { get; set; }

        [Column("image_url")]
        public string? ImageUrl { get; set; }


        public virtual MenuCategories MenuCategory { get; set; } = null!;
        //one menu has a collection of orders 
        public virtual ICollection<ItemVariants> ItemsVariant { get; set; } = new List<ItemVariants>();
        public virtual ICollection<Orders> orders { get; set; } = new List<Orders>();
        public virtual ICollection<Promotions> promotions { get; set; } = new List<Promotions>();
    }
}


