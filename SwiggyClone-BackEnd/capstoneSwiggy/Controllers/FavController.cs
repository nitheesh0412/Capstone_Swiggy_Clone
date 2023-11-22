using capstoneSwiggy.DTO;
using capstoneSwiggy.Models;
using capstoneSwiggy.Services;
using Microsoft.AspNetCore.Mvc;


namespace capstoneSwiggy.Controllers
{
    [Route("api/[controller]")]
    [ApiController]

    
    public class FavController : ControllerBase
    {
        private readonly IfavService _favservice;
        public FavController(IfavService favservice)
        {
            _favservice = favservice;
        }

        // GET api/<FavController>/5
        [HttpGet("{id}")]
        public Task<ActionResult<List<Fav>>> Get(string id)
        {
            return _favservice.GetFavs(id);
        }

        // POST api/<FavController>
        [HttpPost]
        public void Post(FavDTO fav)
        {
            var f = new Fav
            {
                UserId = fav.UserId,
                restoId = fav.restoId,
                name = fav.name,
                imageId = fav.imageId,
                cuisines = fav.cuisines,
                avgRating = fav.avgRating,
                totalRatings = fav.totalRatings,
                discount = fav.discount,
            };
            _favservice.CreateFav(f);
           
        }


        // DELETE api/<FavController>/5
        [HttpDelete("{id}")]
        public void Delete(string id)
        {
            _favservice.DeleteFav(id);
        }
    }
}
