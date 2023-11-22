using MongoDB.Bson.Serialization.Attributes;

namespace capstoneSwiggy.DTO
{
    public class FavDTO
    {
        public string UserId { get; set; } = string.Empty;

 public string restoId { get; set; } = string.Empty;
public string name { get; set; } = string.Empty;
        public string imageId { get; set; } = string.Empty;
        public string[] cuisines { get; set; } = [];
       public string avgRating { get; set; } = string.Empty;

   public string totalRatings { get; set; } = string.Empty;
      public string discount { get; set; } = string.Empty;
    }
}
