using System.ComponentModel.DataAnnotations;

namespace capstoneSwiggy.DTO
{
    public class DeliveryPartnerRegisterDTO
    {
        [Required]
        public string Name { get; set; }

        [Required]
        public string Email { get; set; }

        [Required]
        public string typeOfVehicle { get; set; }

        [Required]
        public string VehicleNo { get; set; }

        [Required]
        public string LicenseNo { get; set; }

        [Required]
        public string RCNo { get; set; }

        [Required]
        public Int64 Phone { get; set; }

        [Required]
        public string Password { get; set; }
    }
}
