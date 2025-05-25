using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Spill_The_Beanz_Coffee_Shop_API.Models
{
    public class TableReservations
    {
        [Key]
        public int ReservationId { get; set; }
        public int CustomerId { get; set; }
        public int tableId { get; set; }
        public DateOnly ReservationDate { get; set; }
        public TimeOnly start_time { get; set; }
        public TimeOnly end_time { get; set; }
        public int SeatsNumbers { get; set; }
        public string specialRequests { get; set; }
        public string ReservationStatus { get; set; }
        public DateTime createdAt { get; set; }
        //Many table reservations can be made by many customers
        public virtual Customers Customers { get; set; } = null!;
        public virtual ICollection<Orders> Orders { get; set; } = new List<Orders>();
        public virtual Tables Tables { get; set; } = null!; 



    }
}
