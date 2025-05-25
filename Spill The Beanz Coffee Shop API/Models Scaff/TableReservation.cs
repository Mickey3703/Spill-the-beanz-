//using System;
//using System.Collections.Generic;

//namespace Spill_The_Beanz_Coffee_Shop_API.Models Scaff;

//public partial class TableReservation
//{
//    public int ReservationId { get; set; }

//    public int CustomerId { get; set; }

//    public int TableId { get; set; }

//    public DateOnly ReservationDate { get; set; }

//    public TimeOnly StartTime { get; set; }

//    public TimeOnly EndTime { get; set; }

//    public int PartySize { get; set; }

//    public string? SpecialRequests { get; set; }

//    public string? Status { get; set; }

//    public DateTime? CreatedAt { get; set; }

//    public virtual Customer Customer { get; set; } = null!;

//    public virtual ICollection<Order> Orders { get; set; } = new List<Order>();

//    public virtual CafeTable Table { get; set; } = null!;
//}
