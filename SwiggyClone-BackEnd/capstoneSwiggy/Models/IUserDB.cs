namespace capstoneSwiggy.Models
{
    public interface IUserDB
    {
        string UserCollectionName { get; set; }

        string CartCollectionName { get; set; }

        string DeliveryCollectionName { get; set; }

        string RestaurantCollectionName { get; set; }

        string favsCollectionName { get; set; }

        string ordersCollectionName { get; set; }
        string ConnectionString { get; set; }
        string DatabaseName { get; set; }
    }
}
