namespace Spill_The_Beanz_Coffee_Shop_API.Models
{
    public class Table_Reservations
    {
        public int ReservationId {  get; set; }

        //foreign keys TableId. customerid EF deciphers
        public int TableId { get; set; }
        public Tables Table { get; set; }
        public int SeatReserved { get; set; }
        public DateTime ReservationDate { get; set; }         
        public string ReservationStatus { get; set; }

        //Many table reservations can be made by many customers
        public ICollection<Customers>Customers { get; set; }


    }
}
