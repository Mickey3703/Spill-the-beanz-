using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace Spill_The_Beanz_Coffee_Shop_API.DTOs
{
    public class MenuDTOGET
    {
        public int ItemId { get; set; } //this won't be displayed. any way to 'store' this? it's not in here
        public string MenuCategory { get; set; }
        public string ItemName { get; set; }
        public string? ImageUrl { get; set; }
        public string Description { get; set; }
        public decimal Price { get; set; }

    }
}
