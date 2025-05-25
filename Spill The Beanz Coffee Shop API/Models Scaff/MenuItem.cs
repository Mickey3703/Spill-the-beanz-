//using System;
//using System.Collections.Generic;

//namespace Spill_The_Beanz_Coffee_Shop_API.Models Scaff;

//public partial class MenuItem
//{
//    public int ItemId { get; set; }

//    public int CategoryId { get; set; }

//    public string ItemName { get; set; } = null!;

//    public string Description { get; set; } = null!;

//    public decimal BasePrice { get; set; }

//    public bool? IsAvailable { get; set; }

//    public bool? IsFeatured { get; set; }

//    public string? ImageUrl { get; set; }

//    public virtual MenuCategory Category { get; set; } = null!;

//    public virtual ICollection<ItemVariant> ItemVariants { get; set; } = new List<ItemVariant>();

//    public virtual ICollection<OrderItem> OrderItems { get; set; } = new List<OrderItem>();

//    public virtual ICollection<Promotion> Promotions { get; set; } = new List<Promotion>();
//}
