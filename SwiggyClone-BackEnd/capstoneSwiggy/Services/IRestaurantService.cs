using Microsoft.AspNetCore.Mvc;
using MongoDB.Bson;

namespace capstoneSwiggy.Services
{
    public interface IRestaurantService
    {
        public Task<ActionResult<List<BsonDocument>>> GetUsers();
    }
}
