using capstoneSwiggy.Models;

namespace capstoneSwiggy.Services
{
    public interface ITokenService
    {
        public string CreateToken(User user);
    }
}
