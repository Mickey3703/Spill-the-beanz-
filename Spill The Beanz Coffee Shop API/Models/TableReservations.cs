using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Spill_The_Beanz_Coffee_Shop_API.Models
{
    public class TableReservations
    {
        [Key]
        [Column("reservation_id")]
        public int ReservationId { get; set; }

        [Column("customer_id")]
        public int CustomerId { get; set; }

        [Column("table_id")]
        public int tableId { get; set; }

        [Column("reservation_date")]
        public DateOnly ReservationDate { get; set; }

        [Column("start_time")]
        public TimeOnly start_time { get; set; }

        [Column("end_time")]
        public TimeOnly end_time { get; set; }

        [Column("party_size")]
        public int SeatsNumbers { get; set; }

        [Column("special_requests")]
        public string specialRequests { get; set; }

        [Column("status")]
        public string ReservationStatus { get; set; }

        [Column("created_at")]
        public DateTime createdAt { get; set; }

        //Many table reservations can be made by many customers
        [ForeignKey("CustomerId")]
        public virtual Customers Customers { get; set; } = null!;
        public virtual ICollection<Orders> Orders { get; set; } = new List<Orders>();

        [ForeignKey("tableId")]
        public virtual Tables Tables { get; set; } = null!; 



    }
}
