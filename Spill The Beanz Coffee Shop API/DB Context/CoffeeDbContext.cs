using Microsoft.EntityFrameworkCore;
using Microsoft.Identity.Client;
using Spill_The_Beanz_Coffee_Shop_API.Models;

namespace Spill_The_Beanz_Coffee_Shop_API.DB_Context
{
    public class CoffeeDbContext : DbContext
    {
        //method

        public CoffeeDbContext(DbContextOptions<CoffeeDbContext> options) : base(options)
        {
            //this defines a table. so we need to create on for each.
            //each row is an 'object' of the type <xyz>
            //the {get and set} is what we'll use to interact with the database (CRUD for db)
            //the list below are 'properties' in the DBcontext
        }
        public DbSet<Admins> AdminList { get; set; } = null!; //this is a table for Admins
        public DbSet<Customers> CustomerList { get; set; } = null!;
        public DbSet<Menu> MenuItems { get; set; } = null!;
        public DbSet<Orders> Orderlist { get; set; } = null!;
        public DbSet<Promotions> PromotionsList { get; set; } = null!;
        public DbSet<Sent_Promotions> SentPromoList { get; set; } = null!;
        public DbSet<Staff> StaffList { get; set; } = null!;
        public DbSet<Table_Reservations> ReservationsList { get; set; } = null!;
        public DbSet<Tables> TableList { get; set; } = null!;

    }
}
