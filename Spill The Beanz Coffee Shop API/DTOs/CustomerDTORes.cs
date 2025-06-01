using System.ComponentModel.DataAnnotations.Schema;
using Spill_The_Beanz_Coffee_Shop_API.DTOs;
namespace Spill_The_Beanz_Coffee_Shop_API.DTOs
{
    public class CustomerDTORes
    {
        public int ReservationId { get; set; }
        public string CustomerName { get; set; }
        public string Email { get; set; }
        public string PhoneNumber { get; set; }
        public List<TableResDTO> TableReservations { get; set; }
    }
}
