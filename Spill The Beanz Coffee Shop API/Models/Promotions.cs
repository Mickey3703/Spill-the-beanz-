namespace Spill_The_Beanz_Coffee_Shop_API.Models
{
    public class Promotions
    {
        public string PromoID { get; set; }
        public string PromoName { get; set; }
        public string PromoDescription { get; set; }
        public string PromoStatus { get; set; }
        public int AdminId { get; set; }
        public ICollection<Sent_Promotions> SentPromotions { get; set; }
        public ICollection<Admins> Admins { get; set; } //Many promotions created by many admins
    }
}
