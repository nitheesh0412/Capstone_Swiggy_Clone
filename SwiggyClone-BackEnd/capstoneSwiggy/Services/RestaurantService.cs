using capstoneSwiggy.Models;
using Microsoft.AspNetCore.Mvc;
using MongoDB.Bson;
using MongoDB.Driver;

namespace capstoneSwiggy.Services
{
    public class RestaurantService : IRestaurantService
    {
        private readonly IMongoCollection<BsonDocument> _restaurant;
        public RestaurantService(IUserDB db, IMongoClient mongoClient)
        {
            var dbs = mongoClient.GetDatabase(db.DatabaseName);
            _restaurant = dbs.GetCollection<BsonDocument>(db.CartCollectionName);
            
        }

        public async Task<ActionResult<List<BsonDocument>>> GetUsers()
        {
            return await _restaurant.Find(user => true).ToListAsync();
        }

    }
}
