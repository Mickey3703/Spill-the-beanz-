namespace Spill_The_Beanz_Coffee_Shop_API.Models
{
    public class Menu
    {
        public int menuItemID { get; set; }
        public string ItemName { get; set; }
        public string ItemDescription { get; set; }
        public string itemCategory { get; set; }
        public decimal itemPrice { get; set; }  
        public int itemStock { get; set; }
        public int drinkQuantity { get; set; } 

        //one menu has a collection of orders 
        public ICollection<Orders> orders { get; set; }
    }
}
