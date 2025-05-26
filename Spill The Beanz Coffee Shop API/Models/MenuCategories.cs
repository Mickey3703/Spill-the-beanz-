using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Spill_The_Beanz_Coffee_Shop_API.Models
{
    public class MenuCategories
    {
        [Key]
        [Column("category_id")]
        public int CategoryID { get; set; }

        [Column("category_name")]
        public string CategoryName { get; set; }

        [Column("description")]
        public string Description { get; set; }

        [Column("display_order")]
        public int DisplayOrder { get; set; } //for?

        [Column("is_active")]
        public bool IsActive { get; set; } //?

        public virtual ICollection<MenuItems> Items { get; set; } = new List<MenuItems>();
    }
}