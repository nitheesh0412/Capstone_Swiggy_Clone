using capstoneSwiggy.DTO;
using capstoneSwiggy.Models;
using capstoneSwiggy.Services;
using Microsoft.AspNetCore.Mvc;
using System.Security.Cryptography;
using System.Text;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace capstoneSwiggy.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DeliveryController : ControllerBase
    {
        private readonly IDeliveryService deliveryService;

        private readonly ITokenService tokenService;

        public DeliveryController(IDeliveryService deliveryService, ITokenService tokenService)
        {
            this.deliveryService = deliveryService;
            this.tokenService = tokenService;
        }
        // POST api/<DeliveryController>
        [HttpPost("register")]
        public async Task<ActionResult<DeliveryPartner>> Post(DeliveryPartnerRegisterDTO dt)
        {
            if (await this.UserExists(dt.Email)) return BadRequest("email is already taken");
            using var hma = new HMACSHA512();
            System.Diagnostics.Debug.WriteLine(dt.Email);
            var user = new DeliveryPartner
            {
                Name = dt.Name.ToLower(),
                Email = dt.Email,
                TypeOfVehicel = dt.typeOfVehicle,
                VehicleNo = dt.VehicleNo,
                LicenseNo = dt.LicenseNo,
                RCNo = dt.RCNo,
                Phone = dt.Phone,
                HashedPassword = hma.ComputeHash(Encoding.UTF8.GetBytes(dt.Password)),
                SaltPassword = hma.Key
            };
            await this.deliveryService.CreatePartner(user);
            return Ok(user);
        }
        [HttpPost("login")]
        public async Task<ActionResult<DeliveryPartner>> Login(AuthLoginDTO authDto)
        {
            var userFound = await this.deliveryService.GetPartnerid(authDto.Phone);
            if (userFound.Value == null) return Unauthorized("inavlid username!");
            else
            {
                using var hma = new HMACSHA512(userFound.Value.SaltPassword);
                var computedHash = hma.ComputeHash(Encoding.UTF8.GetBytes(authDto.Password));

                for (int i = 0; i < computedHash.Length; i++)
                {
                    if (computedHash[i] != userFound.Value.HashedPassword[i]) return Unauthorized("Invalid password");
                }

                return Ok();
            }
        }

        private async Task<bool> UserExists(string username)
        {
            var userFound = await this.deliveryService.GetPartner(username);
            //System.Diagnostics.Debug.WriteLine(userFound.Value);
            if (userFound.Value == null) return false;
            return true;
        }
    }
}
