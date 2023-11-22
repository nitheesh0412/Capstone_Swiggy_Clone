using MongoDB.Bson.Serialization.Attributes;
using MongoDB.Bson;

namespace capstoneSwiggy.Models
{
    public class Cart
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)] public string _id { get; set; } = string.Empty;

        [BsonElement("userId")]
        public string UserId { get; set; } = string.Empty;

        [BsonElement("items")]
        public List<Item> Items { get; set; } = new List<Item>();

        public Cart() {
            
            Items = new List<Item>();
            UserId = string.Empty;
        }
    }
}
