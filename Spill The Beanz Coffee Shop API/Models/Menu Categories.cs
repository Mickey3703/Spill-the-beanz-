using System.ComponentModel.DataAnnotations;

namespace Spill_The_Beanz_Coffee_Shop_API.Models
{
    public class Menu_Categories
    {
     [Key]
     public int categoryId { get; set; }
    public string categoryName { get; set; }
    public string catergoryDescription { get; set; }
    public int displayOrder { get; set; } //for?
    public bool is_active { get; set; } //?
    }
}
