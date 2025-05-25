using System.ComponentModel.DataAnnotations;

namespace Spill_The_Beanz_Coffee_Shop_API.Models
{
    public class MenuItemVariants
    {
        [Key]
        public int variantId { get; set; }
        public string variantName { get; set; }
        public decimal additionalPrice { get; set; }
        public bool isDefault { get; set; }

        public ICollection<Menu> menuItems { get; set; }
  
    }
}
