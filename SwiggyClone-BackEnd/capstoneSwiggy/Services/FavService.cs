using capstoneSwiggy.Models;
using Microsoft.AspNetCore.Mvc;
using MongoDB.Driver;

namespace capstoneSwiggy.Services
{
    public class FavService : IfavService
    {
        private readonly IMongoCollection<Fav> _fav;

        public FavService(IUserDB db, IMongoClient mongoClient)
        {
            var dbs = mongoClient.GetDatabase(db.DatabaseName);
            _fav = dbs.GetCollection<Fav>(db.favsCollectionName);
        }
        public async Task CreateFav(Fav fav)
        {
            await _fav.InsertOneAsync(fav);
        }

        public async Task DeleteFav(string id)
        {
            await _fav.DeleteOneAsync(use => use.restoId == id);
        }

        public async Task<ActionResult<List<Fav>>> GetFavs(string id)
        {
            return await _fav.Find(user => user.UserId == id).ToListAsync();
        }
    }
}
