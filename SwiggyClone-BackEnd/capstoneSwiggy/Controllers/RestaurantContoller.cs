using capstoneSwiggy.Models;
using capstoneSwiggy.Services;
using Microsoft.AspNetCore.Mvc;
using MongoDB.Bson;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace capstoneSwiggy.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RestaurantContoller : ControllerBase
    {
        // GET: api/<RestaurantContoller>

        private readonly IRestaurantService _restaurantService;

        public RestaurantContoller(IRestaurantService restoService)
        {
            this._restaurantService = restoService;
        }
        [HttpGet]
        public Task<ActionResult<List<BsonDocument>>> Get()
        {
            return _restaurantService.GetUsers();
        }

        // GET api/<RestaurantContoller>/5
        [HttpGet("{id}")]
        public string Get(int id)
        {
            return "value";
        }

        // POST api/<RestaurantContoller>
        [HttpPost]
        public void Post([FromBody] string value)
        {
        }

        // PUT api/<RestaurantContoller>/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] string value)
        {
        }

        // DELETE api/<RestaurantContoller>/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
}
