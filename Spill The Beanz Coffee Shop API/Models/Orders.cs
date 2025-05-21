namespace Spill_The_Beanz_Coffee_Shop_API.Models
{
    public class Orders
    {
        public int OrderID;
        //foreign key
        public int CustomerId;
        public Customers Customer { get; set; }

        public int ItemId;
        public Menu Item {  get; set; }
        //
        public int ItemOrderQuantity;
        public int DrinkOrderSize;
        public decimal ItemPrice;
        public string OrderStatus;
        public DateTime OrderDate;

        public ICollection<Staff> Staff { get; set; }

    }
}
