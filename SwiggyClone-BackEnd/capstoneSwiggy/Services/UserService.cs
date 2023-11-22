using capstoneSwiggy.DTO;
using capstoneSwiggy.Models;
using Microsoft.AspNetCore.Mvc;
using MongoDB.Driver;

namespace capstoneSwiggy.Services
{
    public class UserService : IUserService
    {
        private readonly IMongoCollection<User> _users;
        public UserService(IUserDB user, IMongoClient mongoClient) {
            var db = mongoClient.GetDatabase(user.DatabaseName);
            _users = db.GetCollection<User>(user.UserCollectionName);
        }
        public async Task CreateUser(User User)
        {

            await _users.InsertOneAsync(User);
        }

        public async Task<ActionResult<User>> GetUser(string email)
        {
            return await _users.Find(user => user.Email.ToLower() == email.ToLower()).FirstOrDefaultAsync();
        }


        public async Task<ActionResult<User>> GetUserid(Int64 phone)
        {
            return await _users.Find(user => user.Phone == phone).FirstOrDefaultAsync();
        }

        public async Task<ActionResult<List<User>>> GetUsers()
        {
            return await _users.Find(user => true).ToListAsync();
        }



        public void Remove(string id)
        {
            throw new NotImplementedException();
        }

        /*public void AddAddress(string id, AddressDTO Address)
        {
            User user = _users.Find(user => user._id == id).First();
           
            var filter = Builders<User>.Filter.Eq(user._id, id);

            var obj = new AddressDTO
            {
                type = Address.type,
                address = Address.address,
                street = Address.street,
                pincode = Address.pincode,
            };
            var update = Builders<User>.Update.Set(user  => user.Address , "a" );

            _users.UpdateOne(filter, update);

        } */
        public void Update(string id, User User)
        {
            throw new NotImplementedException();
        }
    }
}
