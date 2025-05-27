namespace CSMS_Trial.DTOs
{
    public class TableReservationDto
    {
        public int ReservationId { get; set; }
        public int CustomerId { get; set; }
        public int TableId { get; set; }
        public DateTime ReservationDate { get; set; }
        public TimeSpan StartTime { get; set; }
        public TimeSpan EndTime { get; set; }
        public int PartySize { get; set; }
        public string Status { get; set; }
    }
}
