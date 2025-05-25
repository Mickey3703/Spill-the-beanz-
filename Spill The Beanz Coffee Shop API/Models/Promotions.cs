using System.ComponentModel.DataAnnotations;

namespace Spill_The_Beanz_Coffee_Shop_API.Models
{
    public class Promotions
    {
        [Key]
        public string PromoID { get; set; }
        public string PromoName { get; set; }
        public string PromoDescription { get; set; }
        public string discountType { get; set; }
        public decimal discountValue { get; set; }
        public DateTime startDate { get; set; }
        public DateTime endDate { get; set; }
        public decimal minOrder {  get; set; } //?
       // public int applicableCategoryId { get; set; }
        public int applicableItemId { get; set; } //why not use this instead of above?
        public string PromoStatus { get; set; }
        public DateTime createdAt { get; set; }
        public int AdminId { get; set; }
        public ICollection<CustomerPromotions> SentPromotions { get; set; }
        public ICollection<Admins> Admins { get; set; } //Many promotions created by many admins
        public ICollection<Menu> MenuItems { get; set; } //m:m?
    }
}
