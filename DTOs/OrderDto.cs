namespace CSMS_Trial.DTOs
{
    public class OrderDto
    {
        public int OrderId { get; set; }
        public int? CustomerId { get; set; }
        public string OrderType { get; set; }
        public DateTime OrderDate { get; set; }
        public decimal FinalAmount { get; set; }
        public string OrderStatus { get; set; }
    }
}
