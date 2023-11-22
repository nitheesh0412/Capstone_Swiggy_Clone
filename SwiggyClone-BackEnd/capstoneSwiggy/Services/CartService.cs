using capstoneSwiggy.DTO;
using capstoneSwiggy.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.OpenApi.Any;
using MongoDB.Driver;
namespace capstoneSwiggy.Services
{
    public class CartService : ICartService
    {
        private readonly IMongoCollection<Cart> _carts;

        public CartService(IUserDB db,IMongoClient mongoClient)
        {
            var dbs = mongoClient.GetDatabase(db.DatabaseName);
            _carts = dbs.GetCollection<Cart>(db.CartCollectionName);
        }
        public async Task CreateCartItem(Cart cart)
        {
            
            await _carts.InsertOneAsync(cart);
        }

        public async Task<ActionResult<Cart>> GetCartItems(string id)
        {
            return await  _carts.Find(user => user.UserId == id).FirstOrDefaultAsync();
        }

        public void UpdateCartItem(string id,Item item) {
            Cart cart = _carts.Find(user =>user.UserId == id).First();
            foreach(Item i in  cart.Items)
            {
                if(i.id == item.id)
                {
                    i.quantity = item.quantity;
                    i.id = item.id;
                    i.price = item.price;
                    i.description = item.description;
                    i.name = item.name;
                    i.restaurantId = item.restaurantId;
                    i.category = item.category;
                    i.imageId = item.imageId;

                }
            }
            var filter = Builders<Cart>.Filter.Eq(user => user.UserId, id);

            var update = Builders<Cart>.Update.Set(user => user.Items, cart.Items);

            _carts.UpdateOne(filter, update);   
        }

        public void DeleteCartItem(string id, Item item)
        {
            Cart cart = _carts.Find(user => user.UserId == id).First();
            foreach (Item i in cart.Items)
            {
                if (i.id == item.id)
                {
                    cart.Items.Remove(i);
                    break;
                }
            }
            var filter = Builders<Cart>.Filter.Eq(user => user.UserId, id);

            var update = Builders<Cart>.Update.Set(user => user.Items, cart.Items);

            _carts.UpdateOne(filter, update);
        }

        public void DeleteCartItemsResto(string id, string RestoID)
        {
            Cart cart = _carts.Find(user => user.UserId == id).First();
            
            var filter = Builders<Cart>.Filter.Eq(user => user.UserId, id);

            var update = Builders<Cart>.Update.PullFilter(user => user.Items, item => item.restaurantId == RestoID);

            _carts.UpdateOne(filter, update);
        }
        public void UpdateCart(string id, Item item)
        {
            Cart cart = _carts.Find(user => user.UserId == id).First();
            cart.Items.Add(item);
            var filter = Builders<Cart>.Filter.Eq(user => user.UserId, id);

            var update = Builders<Cart>.Update.Set(user => user.Items, cart.Items);

            _carts.UpdateOne(filter, update);

        }
    }
}
