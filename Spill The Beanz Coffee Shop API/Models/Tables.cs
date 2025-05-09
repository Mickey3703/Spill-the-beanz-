namespace Spill_The_Beanz_Coffee_Shop_API.Models
{
    public class Tables
    {
        public int TabledD { get; set; }
        public string TableAvailability { get; set; }
        public int TableSeats { get; set; }

        //One table has a 'collection' of table reservations
        public ICollection<Table_Reservations> tableReservations { get; set; }

    }
}
