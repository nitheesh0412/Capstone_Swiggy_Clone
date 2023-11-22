namespace capstoneSwiggy.DTO
{
    public class AddressDTO
    {
        public string type { get; set; } = string.Empty;

        public string address { get; set; } = string.Empty;
        
        public string street { get; set; } = string.Empty;

        public int pincode { get; set; }    = 0;
    }
}
