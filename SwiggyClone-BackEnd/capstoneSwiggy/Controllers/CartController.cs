using Microsoft.AspNetCore.Mvc;
using capstoneSwiggy.Services;
using Microsoft.OpenApi.Any;
using capstoneSwiggy.DTO;
using capstoneSwiggy.Models;
using Microsoft.AspNetCore.Http.Features;
using Microsoft.AspNetCore.Authorization;
// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace capstoneSwiggy.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
   
    public class CartController : ControllerBase
    {
        private readonly ICartService _cartService;

        public CartController(ICartService cartService)
        {
            _cartService = cartService;
        }

        [HttpGet("{id}")]

        public async Task<ActionResult<Cart>> Get(string id)
        {
            return await _cartService.GetCartItems(id);
        }

        // POST api/<CartController>
        [HttpPost("{id}")]
        public async void Post(CartDTO cart)
        {
            var item = new Item
            {
                id = cart.id,
                restaurantId = cart.restaurantId,
                name = cart.name,
                description = cart.description,
                price = cart.price,
                quantity = cart.quantity,
                category = cart.category,
                imageId = cart.imageId

            };

            var cartitem = new Cart();
            
            cartitem.UserId = cart.userId;
            cartitem.Items.Add(item);
            await _cartService.CreateCartItem(cartitem);
           
            
            

           
        }

        // PUT api/<CartController>/5
        [HttpPut("{id}")]
        public void Put(string id, Item item)
        {
            _cartService.UpdateCartItem(id,item);

        }

        [HttpPut("add/{id}")]
        public void Put(string id,int c, Item item)
        {
            _cartService.UpdateCart(id, item);
        }

        // DELETE api/<CartController>/5
        [HttpDelete("{id}")]
        public void Delete(string id,Item item)
        {
            _cartService?.DeleteCartItem(id,item);
        }

        [HttpDelete("deleterestoitems/{id}")]
        public void DeleteItems(string id, string restoID)
        {
            _cartService?.DeleteCartItemsResto(id,restoID);
        }
    }
}
