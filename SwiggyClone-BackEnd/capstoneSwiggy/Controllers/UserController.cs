using capstoneSwiggy.DTO;
using capstoneSwiggy.Models;
using capstoneSwiggy.Services;
using Microsoft.AspNetCore.Mvc;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace capstoneSwiggy.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly IUserService _userService;

        public UserController(IUserService userService) {
            this._userService = userService;
        }
        // GET: api/<UserController>
        [HttpGet]
        public Task<ActionResult<List<User>>> Get()
        {
            return _userService.GetUsers();
        }

        // GET api/<UserController>/5
        [HttpGet("profile")]
        public Task<ActionResult<User>> Get(Int64 phone)
        {
            return _userService.GetUserid(phone);
        }

        

        // PUT api/<UserController>/5
        //public  void Put(string id, AddressDTO addressDTO)
        //{
          //  _userService.AddAddress(id, addressDTO);
        //}


    }
}
