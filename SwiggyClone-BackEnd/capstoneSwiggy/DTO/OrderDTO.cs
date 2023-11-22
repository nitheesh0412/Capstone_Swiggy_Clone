namespace capstoneSwiggy.DTO
{
    public class OrderDTO
    {
        public string userId { get; set; } = string.Empty;
        public string restoName { get; set; } = string.Empty;
        public string locality {  get; set; } = string.Empty;

        public string areaName { get; set; } = string.Empty;
        public string restaurantId { get; set; } = string.Empty;
        public string address {  get; set; } = string.Empty;

        public List<ItemDTO> items { get; set;} = new List<ItemDTO>();



    }
}
