using capstoneSwiggy.DTO;
using capstoneSwiggy.Models;
using capstoneSwiggy.Services;
using Microsoft.AspNetCore.Mvc;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace capstoneSwiggy.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class OrderController : ControllerBase
    {
        private readonly IOrderService _orderService;
        // GET: api/<OrderController>

        public OrderController(IOrderService orderService)
        {
            _orderService = orderService;
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<List<Order>>> Get(string id)
        {
           return await _orderService.GetOrderItems(id);
        }
    

        

        // POST api/<OrderController>
        [HttpPost]
        public void Post(OrderDTO orderDTO)
        {
            var order = new Order
            {
                userId = orderDTO.userId,
                restoName = orderDTO.restoName,
                locality = orderDTO.locality,
                areaName = orderDTO.areaName,
                restaurantId = orderDTO.restaurantId,
                address = orderDTO.address,
                items = []
            };
            foreach(var ord in orderDTO.items)
            {
                var it = new OrderItems
                {
                    name = ord.name,
                    quantity = ord.quantity,
                    price = ord.price,
                };
                order.items.Add(it);
            }
            _orderService.createOrderItem(order);
        }

        // PUT api/<OrderController>/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] string value)
        {
        }

        // DELETE api/<OrderController>/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
}
