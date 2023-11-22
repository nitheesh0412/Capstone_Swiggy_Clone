using System.ComponentModel.DataAnnotations;

namespace capstoneSwiggy.DTO
{
    public class CartDTO
    {
        [Required]
        public string userId { get; set; } = string.Empty;

        [Required]
        public string id { get; set; } = string.Empty;


        [Required]
        public string restaurantId { get; set; } = string.Empty;
        [Required]
        public string name { get; set; } = string.Empty;

        [Required]
        public string description { get; set; } = string.Empty;
        [Required]
        public int price { get; set; } = int.MaxValue;
        [Required]
        public int quantity { get; set; } = 0;
        [Required]
        public string category { get; set; } = string.Empty;

        [Required]
        public string imageId { get; set; } = string.Empty;
    }
}
