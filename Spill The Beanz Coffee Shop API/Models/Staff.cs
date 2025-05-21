namespace Spill_The_Beanz_Coffee_Shop_API.Models
{
    public class Staff
    {
        public int StaffiD { get; set; }
        public string StaffPassword { get; set; }
        public string StaffName { get; set; }
        public string StaffEmail { get; set; }
        public string StaffRole { get ; set; }

        public ICollection<Orders> Orders { get; set; } //many staff can handle many orders

    }
}
