using MongoDB.Bson.Serialization.Attributes;

namespace capstoneSwiggy.Models
{
    public class OrderItems
    {
        [BsonElement("name")]
        public string name { get; set; } = string.Empty;

        [BsonElement("price")]
        public string price { get; set; } = string.Empty;

        [BsonElement("quantity")]
        public int quantity { get; set; } = 0;
    }
}
