namespace Spill_The_Beanz_Coffee_Shop_API.Models
{
    public class Customers
    {
        public int customerID { get; set; }
        public string customerPassword { get; set; }
        public string customerName { get; set; }
        public string customerPhoneNumber { get; set; }
        public string customerEmail { get; set; }
        public string customerAddress { get; set; }
        public ICollection<Table_Reservations> tableReservations {  get; set; } //ok if same name accross classes? not neccessary to declare tb reservation in customers right?
        public ICollection<Sent_Promotions> receivedPromotions { get; set; }
    }
}
