using capstoneSwiggy.Models;
using Microsoft.AspNetCore.Mvc;

namespace capstoneSwiggy.Services
{
    public interface IDeliveryService
    {
        public  Task CreatePartner(DeliveryPartner User);
        public Task<ActionResult<DeliveryPartner>> GetPartner(string email);

        public Task<ActionResult<DeliveryPartner>> GetPartnerid(Int64 phone);
    }
}
