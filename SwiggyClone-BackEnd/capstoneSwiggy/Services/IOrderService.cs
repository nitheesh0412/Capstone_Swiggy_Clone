using capstoneSwiggy.Models;
using Microsoft.AspNetCore.Mvc;

namespace capstoneSwiggy.Services
{
    public interface IOrderService
    {
        public Task<ActionResult<List<Order>>> GetOrderItems(string id);

        public Task createOrderItem(Order order);
    }
}
