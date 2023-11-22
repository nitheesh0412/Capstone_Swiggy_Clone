namespace capstoneSwiggy.Models
{
    public class UserDB : IUserDB
    {
        public string UserCollectionName { get; set; } = string.Empty;

        public string CartCollectionName {  get; set; } = string.Empty;

        public string DeliveryCollectionName {  get; set; } = string.Empty;

        public string RestaurantCollectionName {  get; set; } = string.Empty;

        public string favsCollectionName {  get; set; } = string.Empty;

        public string ordersCollectionName {  get; set; } = string.Empty;
        public string ConnectionString { get; set; } = string.Empty;
        public string DatabaseName { get; set; } = string.Empty;
    }
}
