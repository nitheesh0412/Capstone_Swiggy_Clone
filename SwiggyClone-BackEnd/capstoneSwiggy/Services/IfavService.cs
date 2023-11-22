using capstoneSwiggy.Models;
using Microsoft.AspNetCore.Mvc;

namespace capstoneSwiggy.Services
{
    public interface IfavService
    {
        public Task<ActionResult<List<Fav>>> GetFavs(string id);

        public Task CreateFav(Fav fav);

        public Task DeleteFav(string id);
    }
}
