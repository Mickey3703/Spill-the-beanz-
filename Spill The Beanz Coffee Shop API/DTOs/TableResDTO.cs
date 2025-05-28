using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Spill_The_Beanz_Coffee_Shop_API.Models;

namespace Spill_The_Beanz_Coffee_Shop_API.DTOs
{
    public class TableResDTO
    {
        public int ReservationId { get; set; }
        public int CustomerId { get; set; }
        public int tableId { get; set; }
        public DateOnly ReservationDate { get; set; }
        public TimeOnly start_time { get; set; }
        public TimeOnly end_time { get; set; }
        public int SeatsNumbers { get; set; }
        public string? specialRequests { get; set; }
        public string ReservationStatus { get; set; }
        //public List <Orders> Orders { get; set; }  do orders link to reservations?

    }
}
