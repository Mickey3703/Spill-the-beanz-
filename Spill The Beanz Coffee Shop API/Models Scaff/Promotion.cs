//using System;
//using System.Collections.Generic;

//namespace Spill_The_Beanz_Coffee_Shop_API.Models Scaff;

//public partial class Promotion
//{
//    public int PromotionId { get; set; }

//    public int AdminId { get; set; }

//    public string PromoName { get; set; } = null!;

//    public string PromoDescription { get; set; } = null!;

//    public string? DiscountType { get; set; }

//    public decimal? DiscountValue { get; set; }

//    public DateTime StartDate { get; set; }

//    public DateTime EndDate { get; set; }

//    public decimal? MinOrderAmount { get; set; }

//    public int? ApplicableItemId { get; set; }

//    public string? Status { get; set; }

//    public DateTime? CreatedAt { get; set; }

//    public virtual Admin Admin { get; set; } = null!;

//    public virtual MenuItem? ApplicableItem { get; set; }

//    public virtual ICollection<CustomerPromotion> CustomerPromotions { get; set; } = new List<CustomerPromotion>();
//}
