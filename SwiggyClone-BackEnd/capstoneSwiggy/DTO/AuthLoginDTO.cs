using System.ComponentModel.DataAnnotations;

namespace capstoneSwiggy.DTO
{
    public class AuthLoginDTO
    {
        [Required]
        public Int64 Phone { get; set; } = Int64.MaxValue;

        [Required]
        public string Password { get; set; } = string.Empty.ToString();
    }
}
