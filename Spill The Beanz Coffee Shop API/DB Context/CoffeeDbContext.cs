using Microsoft.EntityFrameworkCore;
using Microsoft.Identity.Client;
using Spill_The_Beanz_Coffee_Shop_API.Models;

namespace Spill_The_Beanz_Coffee_Shop_API.DB_Context
{
    public class CoffeeDbContext : DbContext
    {


        public CoffeeDbContext(DbContextOptions<CoffeeDbContext> options) : base(options)
        {

        }

        public DbSet<Customers> Customers { get; set; } = null!;
        public DbSet<Orders> Orders { get; set; } = null;
        public DbSet<ItemVariants> ItemVariants { get; set; } = default!; //deafult? null?
        public DbSet<MenuCategories> Categories { get; set; } = null!;

    }
}
