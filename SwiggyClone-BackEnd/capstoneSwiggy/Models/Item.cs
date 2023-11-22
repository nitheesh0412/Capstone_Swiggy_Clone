using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using System.ComponentModel.DataAnnotations;

namespace capstoneSwiggy.Models
{
    public class Item
    {
        [BsonElement("id")] 
        public string id { get; set; } = string.Empty;

        [BsonElement("restaurantId")]
        public string restaurantId { get; set; } = string.Empty;

        [BsonElement("name")] 
        public string name { get; set; } = string.Empty;

        [BsonElement("description")] 
        public string description { get; set; } = string.Empty;
        [BsonElement("price")] 
        public int price { get; set; } = int.MaxValue;
        [BsonElement("quantity")] 
        public int quantity { get; set; } = 0;
        [BsonElement("category")] 
        public string category { get; set; } = string.Empty;

        [BsonElement("imageId")] 
        public string imageId { get; set; } = string.Empty;
    }
}
