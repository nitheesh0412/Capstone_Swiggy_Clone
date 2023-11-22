using capstoneSwiggy.DTO;
using capstoneSwiggy.Models;
using Microsoft.AspNetCore.Http.Features;
using Microsoft.AspNetCore.Mvc;
using Microsoft.OpenApi.Any;

namespace capstoneSwiggy.Services
{
    public interface ICartService
    {
        public Task<ActionResult<Cart>> GetCartItems(string id);

        public Task CreateCartItem(Cart cart);

        public void UpdateCartItem(string id,Item item);

        public void DeleteCartItem(string id,Item item);


        public void DeleteCartItemsResto(string id, string RestoID);
        public void UpdateCart(string id,Item item);


    }
}
