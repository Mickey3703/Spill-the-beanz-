using System.ComponentModel.DataAnnotations;

namespace Spill_The_Beanz_Coffee_Shop_API.Models
{
    public class Admins
    {
        [Key]
        public int AdminId { get; set; }
        public string adminName { get; set; }
        public string adminEmailAddress { get; set; }
        public string adminPasswordHash { get; set; }

        public DateTime profileCreatedAt { get; set; } //when inserting it, it must just fetch the current date. when clicking, it invokes

        public DateTime lastVogin { get; set; } //change to login
        //active? not consistant with Customers


        public ICollection<Promotions> Promotions { get; set; } = new List<Promotions>();








    }
}
