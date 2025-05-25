using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Spill_The_Beanz_Coffee_Shop_API.Models
{
    public class Menu
    {
        [Key]
        public int menuItemID { get; set; }
        public string ItemName { get; set; }
        public string ItemDescription { get; set; }
        public decimal itemPrice { get; set; }
        public bool isAvailable { get; set; }
        public bool isFeatured { get; set; }
        public string imageUrl { get; set; }
        // public DateTime itemCreatedAt { get; set; }  /is this necessary?
        // public DateTime itemUpdatedAt { get; set; }
        //preparation time nec?
        public int categoryId { get; set; }
        [ForeignKey ("categoryId")]
        public Menu_Categories menuCategories { get; set; }

        //one menu has a collection of orders 
        public ICollection<Orders> orders { get; set; }
        public ICollection<MenuItemVariants> menuItemsVariant { get; set; }
        public ICollection<Promotions> promotions { get; set; }
    }
}
