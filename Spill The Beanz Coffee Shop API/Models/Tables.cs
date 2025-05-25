using System.ComponentModel.DataAnnotations;

namespace Spill_The_Beanz_Coffee_Shop_API.Models
{
    public class Tables
    {
        [Key]
        public int TableId { get; set; } // I believe table id and number are the same?
        public bool TableAvailability { get; set; }
        public int TableCapacity { get; set; }
        public string TableLocation { get; set; }

        //One table has a 'collection' of table reservations
        public ICollection<TableReservations> tableReservations { get; set; }

    }
}
