using capstoneSwiggy.DTO;
using capstoneSwiggy.Models;
using Microsoft.AspNetCore.Mvc;

namespace capstoneSwiggy.Services
{
    public interface IUserService
    {
        public Task<ActionResult<List<User>>> GetUsers();
        public Task<ActionResult<User>> GetUser(string email);

        public Task<ActionResult<User>> GetUserid(Int64 phone);

        public Task CreateUser(User User);

        void Update(string id, User User);

        //void AddAddress(string id,AddressDTO Address);

        void Remove(String id);


    }
}
