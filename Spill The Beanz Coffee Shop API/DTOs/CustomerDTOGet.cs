using System.ComponentModel.DataAnnotations.Schema;

namespace Spill_The_Beanz_Coffee_Shop_API.DTOs
{
    public class CustomerDTOGet
    {
        public string CustomerName { get; set; }
        public string Email { get; set; }
        public string PhoneNumber { get; set; }
        public string Address { get; set; }
    }
}
