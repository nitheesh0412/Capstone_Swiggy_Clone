using MongoDB.Bson.Serialization.Attributes;
using MongoDB.Bson;
using capstoneSwiggy.DTO;

namespace capstoneSwiggy.Models
{
    public class Order
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)] public string _id { get; set; } = string.Empty;

        [BsonElement("userId")]
        public string userId { get; set; } = string.Empty;

        [BsonElement("restoName")]
        public string restoName {  get; set; } = string.Empty;

        [BsonElement("locality")]
        public string locality {  get; set; } = string.Empty;

        [BsonElement("areaName")]
        public string areaName { get; set; } = string.Empty;

        [BsonElement("restaurantId")]
        public string restaurantId {  get; set; } = string.Empty;

        [BsonElement("address")]
        public string address { get; set; } = string.Empty;

        [BsonElement("items")]
        public List<OrderItems> items { get; set; } = new List<OrderItems>();
        public Order() {
           userId = string.Empty;
            restoName = string.Empty;
            locality = string.Empty;
            areaName = string.Empty;
            restaurantId = string.Empty;
            address = string.Empty;
            items = new List<OrderItems>();
        }

    }
}
