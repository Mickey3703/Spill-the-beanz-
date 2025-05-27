using System.ComponentModel.DataAnnotations.Schema;
using CSMS_Trial.DTOs;

namespace Spill_The_Beanz_Coffee_Shop_API.DTOs
{
    public class CustomerDTOOrderGET //should have customer id
    {
        public string CustomerName { get; set; }
        public string Email { get; set; }
        public string PhoneNumber { get; set; }
        public string Address { get; set; }
        public List<OrderDto> Orders { get; set; }
    }
}
