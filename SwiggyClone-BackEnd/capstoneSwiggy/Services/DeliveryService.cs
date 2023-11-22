using capstoneSwiggy.Models;
using Microsoft.AspNetCore.Mvc;
using MongoDB.Driver;

namespace capstoneSwiggy.Services
{
    public class DeliveryService : IDeliveryService
    {
        private readonly IMongoCollection<DeliveryPartner> _delivery;
      
        public DeliveryService(IUserDB user, IMongoClient mongoClient)
        {
            var db = mongoClient.GetDatabase(user.DatabaseName);
            _delivery = db.GetCollection<DeliveryPartner>(user.DeliveryCollectionName);
        }

        public async Task CreatePartner(DeliveryPartner User)
        {

            await _delivery.InsertOneAsync(User);
        }

        public async Task<ActionResult<DeliveryPartner>> GetPartner(string email)
        {
            return await _delivery.Find(user => user.Email.ToLower() == email.ToLower()).FirstOrDefaultAsync();
        }
        public async Task<ActionResult<DeliveryPartner>> GetPartnerid(Int64 phone)
        {
            return await _delivery.Find(user => user.Phone == phone).FirstOrDefaultAsync();
        }
    }
}
