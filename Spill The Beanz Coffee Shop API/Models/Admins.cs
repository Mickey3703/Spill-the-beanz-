namespace Spill_The_Beanz_Coffee_Shop_API.Models
{
    public class Admins
    {
        public int adminID { get; set; }
        public string adminName { get; set; }
        public string adminPassword { get; set; }
        public string adminEmail { get; set; }

       public ICollection<Promotions> promotions { get; set; }
      
            
    }
}
