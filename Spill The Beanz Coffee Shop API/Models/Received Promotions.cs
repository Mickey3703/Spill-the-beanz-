namespace Spill_The_Beanz_Coffee_Shop_API.Models
{
    public class Received_Promotions
    {
        public int ReceivedPromosPK { get; set; }

        //foregin keys

        public int CustomerID { get; set; }
        public string PromoID { get; set; }
        //does this date start from 00:00? If not then use DateTime
        public DateOnly PromoDateReceived { get; set; }
        public DateOnly PromoDateUsed { get; set; }

        //promoStatus recevies the values Available/Redeemed/Expired
        public string PromoStatus { get; set; }
        public ICollection<Promotions> Promotions {get; set;}
        public ICollection<Admins> Admins {get; set;}
    }
}
