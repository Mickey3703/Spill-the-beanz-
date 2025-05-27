using CSMS_Trial.Models;
using System.Collections.Generic;
using System.Reflection.Emit;
using Microsoft.EntityFrameworkCore;

public class SpillTheBeanzDbContext : DbContext
{
    public SpillTheBeanzDbContext(DbContextOptions<SpillTheBeanzDbContext> options) : base(options) { }

    public DbSet<Admin> Admins { get; set; }
    public DbSet<MenuCategory> MenuCategories { get; set; }
    public DbSet<MenuItem> MenuItems { get; set; }
    public DbSet<ItemVariant> ItemVariants { get; set; }
    public DbSet<Customer> Customers { get; set; }
    public DbSet<CafeTable> CafeTables { get; set; }
    public DbSet<TableReservation> TableReservations { get; set; }
    public DbSet<Promotion> Promotions { get; set; }
    public DbSet<CustomerPromotion> CustomerPromotions { get; set; }
    public DbSet<Order> Orders { get; set; }
    public DbSet<OrderItem> OrderItems { get; set; }
    public DbSet<Inventory> Inventory { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<MenuItem>()
            .HasOne(m => m.Category)
            .WithMany(c => c.MenuItems)
            .HasForeignKey(m => m.CategoryId);

        modelBuilder.Entity<ItemVariant>()
            .HasOne(v => v.Item)
            .WithMany(i => i.Variants)
            .HasForeignKey(v => v.ItemId);

        modelBuilder.Entity<OrderItem>()
            .HasOne(oi => oi.Order)
            .WithMany(o => o.OrderItems)
            .HasForeignKey(oi => oi.OrderId);

        modelBuilder.Entity<OrderItem>()
            .HasOne(oi => oi.Item)
            .WithMany(i => i.OrderItems)
            .HasForeignKey(oi => oi.ItemId);

        modelBuilder.Entity<CustomerPromotion>()
            .HasOne(cp => cp.Customer)
            .WithMany(c => c.CustomerPromotions)
            .HasForeignKey(cp => cp.CustomerId);

        modelBuilder.Entity<CustomerPromotion>()
            .HasOne(cp => cp.Promotion)
            .WithMany(p => p.CustomerPromotions)
            .HasForeignKey(cp => cp.PromotionId);
    }
}
