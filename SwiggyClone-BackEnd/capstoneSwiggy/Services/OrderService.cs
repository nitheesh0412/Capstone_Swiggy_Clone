using capstoneSwiggy.Models;
using Microsoft.AspNetCore.Mvc;
using MongoDB.Driver;

namespace capstoneSwiggy.Services
{
    public class OrderService : IOrderService
    {
        private readonly IMongoCollection<Order> _orders;

        public OrderService(IUserDB db, IMongoClient mongoClient) {
            var dbs = mongoClient.GetDatabase(db.DatabaseName);
            _orders = dbs.GetCollection<Order>(db.ordersCollectionName);

        }
        public async Task createOrderItem(Order order)
        {
            await _orders.InsertOneAsync(order);
        }

        public async Task<ActionResult<List<Order>>> GetOrderItems(string id)
        {
            return await _orders.Find(user => user.userId == id).ToListAsync();
        }
    }
}
