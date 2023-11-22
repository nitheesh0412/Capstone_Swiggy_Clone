using MongoDB.Bson.Serialization.Attributes;
using MongoDB.Bson;

namespace capstoneSwiggy.Models
{
    public class DeliveryPartner
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)] public string _id { get; set; } = string.Empty;


        [BsonElement("name")] public string Name { get; set; } = string.Empty.ToString();

        [BsonElement("email")] public string Email { get; set; } = string.Empty.ToString();


        [BsonElement("typeOfVehicle")] public string TypeOfVehicel { get; set; } = string.Empty.ToString();

        [BsonElement("vehicleNo")] public string VehicleNo { get; set;} = string.Empty.ToString();

        [BsonElement("licenseNo")] public string LicenseNo { get; set;} = string.Empty.ToString();

        [BsonElement("Rcno")] public string RCNo { get; set ; } = string.Empty.ToString();
        [BsonElement("phone")] public Int64 Phone { get; set; } = 0;

        [BsonElement("hashpassword")] public byte[] HashedPassword { get; set; } = new byte[64];


        [BsonElement("saltpassword")] public byte[] SaltPassword { get; set; } = new byte[64];
    }
}
