using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Spill_The_Beanz_Coffee_Shop_API.Models
{
    public class Inventory
    {
        [Key]
     public int inventoryId { get; set; }
     public string itemName { get; set; }
     public string category { get; set; }
    public int currentQuantity {get; set;}
    public string unitOfMeasure { get; set; }
    public decimal reorderLevel { get; set; }
    public DateTime lastRestocked { get; set; }
    public string supplierInfo { get; set; }
    public int menuItemId { get; set; }
    [ForeignKey ("menuItemId")]
    public Menu MenuId { get; set; }
    }
}
