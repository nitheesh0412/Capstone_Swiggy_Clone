using capstoneSwiggy.DTO;
using capstoneSwiggy.Models;
using capstoneSwiggy.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Cryptography;
using System.Text;

namespace capstoneSwiggy.Controllers

{
    [ApiController]
    [Route("api/[controller]")]
    public class AuthController : ControllerBase
    {
        private readonly IUserService userService;
        private readonly ITokenService tokenService;
        private readonly ICartService _cartService;

        public AuthController(IUserService userService, ITokenService tokenService,ICartService cartService)
        {
            this.userService = userService;
            this.tokenService = tokenService;
            this._cartService = cartService;
        }
        [HttpPost("register")]
        public async Task<ActionResult<UserRegisterDTO>> Register(AuthRegisterDTO authDto)
        {
            if (await this.UserExists(authDto.Email)) return BadRequest("email is already taken");
            using var hma = new HMACSHA512();
            System.Diagnostics.Debug.WriteLine(authDto.Email);
            var user = new User
            {
                Name = authDto.Name.ToLower(),
                Email = authDto.Email,
                Phone = authDto.Phone,
                HashedPassword = hma.ComputeHash(Encoding.UTF8.GetBytes(authDto.Password)),
                SaltPassword = hma.Key
            };
            await this.userService.CreateUser(user);


            return Ok(
                new UserRegisterDTO
                {
                    id = user._id,
                    email = authDto.Email,
                    Token = this.tokenService.CreateToken(user)
                }) ;
        }

        [HttpPost("login")]
        public async Task<ActionResult<UserRegisterDTO>> Login(AuthLoginDTO authDto)
        {
            var userFound = await this.userService.GetUserid(authDto.Phone);
            if (userFound.Value == null) return Unauthorized("inavlid phone!");
            else
            {
                using var hma = new HMACSHA512(userFound.Value.SaltPassword);
                var computedHash = hma.ComputeHash(Encoding.UTF8.GetBytes(authDto.Password));

                for (int i = 0; i < computedHash.Length; i++)
                {
                    if (computedHash[i] != userFound.Value.HashedPassword[i]) return Unauthorized("Invalid password");
                }

                var cartitem = new Cart();
                cartitem.UserId = userFound.Value._id;
                cartitem.Items = [];
                await _cartService.CreateCartItem(cartitem);

                return Ok(
                    new UserLoginDTO
                    {
                        phone = authDto.Phone,
                        id = userFound.Value._id,
                        name = userFound.Value.Name,
                        token = this.tokenService.CreateToken(userFound.Value)
                    });
            }
        }

        private async Task<bool> UserExists(string username)
        {
            var userFound = await this.userService.GetUser(username);
            //System.Diagnostics.Debug.WriteLine(userFound.Value);
            if (userFound.Value == null) return false;
            return true;
        }
    }
}
