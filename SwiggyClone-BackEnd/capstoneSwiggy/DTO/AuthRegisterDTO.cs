using System.ComponentModel.DataAnnotations;
namespace capstoneSwiggy.DTO
{
    public class AuthRegisterDTO
    {
        [Required]
        public string Name { get; set; } 

        [Required]
        public string Email { get; set; } 

        [Required]
        public Int64 Phone { get; set; }

        [Required]
        public string Password { get; set; } 



    }
}
