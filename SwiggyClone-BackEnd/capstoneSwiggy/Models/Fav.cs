using MongoDB.Bson.Serialization.Attributes;
using MongoDB.Bson;

namespace capstoneSwiggy.Models
{
    public class Fav
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)] public string _id { get; set; } = string.Empty;

        [BsonElement("userId")] public string UserId { get; set; } = string.Empty;


        [BsonElement("restoId")] public string restoId { get; set; } = string.Empty;

        [BsonElement("name")] public string name { get; set; } = string.Empty;
        [BsonElement("imageId")] public string imageId { get; set; } = string.Empty;
        [BsonElement("cuisines")] public string[] cuisines { get; set; } = [];
        [BsonElement("avgRating")] public string avgRating { get; set; } = string.Empty;

        [BsonElement("totalRatings")] public string totalRatings { get; set; } = string.Empty;
        [BsonElement("discount")] public string discount { get; set; } = string.Empty;

    }
}
