using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace capstoneSwiggy.Models
{
    [BsonIgnoreExtraElements]
    public class User
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)] public string _id { get; set; } = string.Empty;


        [BsonElement("name")] public string Name { get; set;} = string.Empty.ToString();

        [BsonElement("email")] public string Email { get; set; } = string.Empty.ToString();

        [BsonElement("phone")] public Int64 Phone { get; set; } = 0;

        [BsonElement("hashpassword")] public byte[] HashedPassword { get; set; } = new byte[64];


        [BsonElement("saltpassword")] public byte[] SaltPassword { get; set; } = new byte[64];



        



    }
}
