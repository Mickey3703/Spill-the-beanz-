using System.ComponentModel.DataAnnotations.Schema;
using CSMS_Trial.DTOs;

namespace Spill_The_Beanz_Coffee_Shop_API.DTOs
{
    public class CustomerDTORes
    {
        public string CustomerName { get; set; }
        public string Email { get; set; }
        public string PhoneNumber { get; set; }
        public List<TableResDTO> TableRes { get; set; }
    }
}
