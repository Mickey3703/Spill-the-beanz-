//using System;
//using System.Collections.Generic;

//namespace Spill_The_Beanz_Coffee_Shop_API.Models Scaff;

//public partial class Order
//{
//    public int OrderId { get; set; }

//    public int? CustomerId { get; set; }

//    public string OrderType { get; set; } = null!;

//    public DateTime OrderDate { get; set; }

//    public decimal TotalAmount { get; set; }

//    public decimal? DiscountAmount { get; set; }

//    public decimal? TaxAmount { get; set; }

//    public decimal FinalAmount { get; set; }

//    public string? PaymentMethod { get; set; }

//    public string? PaymentStatus { get; set; }

//    public string? OrderStatus { get; set; }

//    public string? SpecialInstructions { get; set; }

//    public int? ReservationId { get; set; }

//    public virtual Customer? Customer { get; set; }

//    public virtual ICollection<OrderItem> OrderItems { get; set; } = new List<OrderItem>();

//    public virtual TableReservation? Reservation { get; set; }
//}
