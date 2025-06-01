        using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.JsonPatch;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Spill_The_Beanz_Coffee_Shop_API.DB_Context;
using Spill_The_Beanz_Coffee_Shop_API.DTOs;
using Spill_The_Beanz_Coffee_Shop_API.Models;

namespace Spill_The_Beanz_Coffee_Shop_API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class OrdersController : ControllerBase
    {
        private readonly CoffeeDbContext _context;

        public OrdersController(CoffeeDbContext context)
        {
            _context = context;
        }

        // GET: api/Orders
        [HttpGet] //customerOrders
        public async Task<ActionResult<List<CustomerDTOOrderGET>>> GetCustomerOrderList()
        {

            var customerOrders = await _context.Orders
               .Include(customer => customer.Customer) //include from customer table for customer details
               .ThenInclude(Orders => Orders.Orders) //then orders again
               .ThenInclude(orderItem => orderItem.OrderItems)
               .Select(order => new CustomerDTOOrderGET
               {
                   OrderId = order.OrderId,
                   CustomerName = order.Customer.CustomerName,
                   Email = order.Customer.Email,
                   PhoneNumber = order.Customer.PhoneNumber,
                   Address = order.Customer.Address,
                   Orders = new List<OrderDto>
                       { new OrderDto
                       {
                           OrderDate = order.OrderDate,
                           SpecialInstructions = order.SpecialInstructions,
                           OrderStatus = order.OrderStatus,
                           FinalAmount = order.FinalAmount
                       }
                       }

                   })                   
            //retrieving all rows from DB
                   .ToListAsync();

            if (customerOrders == null)
            {

                return NotFound();
            }

            return Ok(customerOrders);


        }

        //    var customerOrders = await _context.Customers
        //        .Include(customer => customer.Orders) //include from orders table
        //        .ThenInclude(Orders => Orders.OrderItems)
        //        .ThenInclude(orderItem => orderItem.Item)
        //        .Select(customer => new CustomerDTOOrderGET
        //        {
        //            CustomerName = customer.CustomerName,
        //            Email = customer.Email,
        //            PhoneNumber = customer.PhoneNumber,
        //            Address = customer.Address,
        //            Orders = customer.Orders.Select(Orders => new OrderDto
        //            {
        //                OrderId = Orders.OrderId,
        //                OrderItems = Orders.OrderItems.Select(OrderItems => OrderItems.Item.ItemName).ToList(),
        //                OrderStatus = Orders.OrderStatus,
        //                FinalAmount = Orders.FinalAmount
        //            }).ToList()
        //        })//retrieving all rows from DB
        //            .ToListAsync();

        //    if (customerOrders == null)
        //    {

        //        return NotFound();
        //    }

        //    return Ok(customerOrders);


        //}

        // GET: api/Orders/5
        //[HttpGet("{id}")]
        //public async Task<ActionResult<Orders>> GetOrders(int id)
        //{
        //    var orders = await _context.Orders.FindAsync(id);

        //    if (orders == null)
        //    {
        //        return NotFound();
        //    }
        //    var customerOrders = await _context.Customers
        //        .Include(customer => customer.Orders) //include from orders table
        //        .ThenInclude(Orders => Orders.OrderItems)
        //        .ThenInclude(orderItem => orderItem.Item)
        //        .Select(customer => new CustomerDTOOrderGET
        //        {
        //            CustomerName = customer.CustomerName,
        //            Email = customer.Email,
        //            PhoneNumber = customer.PhoneNumber,
        //            Address = customer.Address,
        //            Orders = customer.Orders.Select(Orders => new OrderDto
        //            {
        //                OrderId = Orders.OrderId,
        //                OrderItems = Orders.OrderItems.Select(OrderItems => OrderItems.Item.ItemName).ToList(),
        //                OrderStatus = Orders.OrderStatus,
        //                FinalAmount = Orders.FinalAmount
        //            }).ToList()
        //        })//retrieving all rows from DB
        //            .ToListAsync();



        //    return orders;
        //}

        // PUT: api/Orders/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        //[HttpPut("{id}")]
        //public async Task<IActionResult> PutOrders(int id, Orders orders)
        //{
        //    if (id != orders.OrderId)
        //    {
        //        return BadRequest();
        //    }

        //    _context.Entry(orders).State = EntityState.Modified;

        //    try
        //    {
        //        await _context.SaveChangesAsync();
        //    }
        //    catch (DbUpdateConcurrencyException)
        //    {
        //        if (!OrdersExists(id))
        //        {
        //            return NotFound();
        //        }
        //        else
        //        {
        //            throw;
        //        }
        //    }

        //    return NoContent();
        //}

        [HttpPatch("{id}")]
        public async Task<ActionResult<Orders>> PatchTableReservationStatus(int id, JsonPatchDocument<OrdersDTOP> patchDoc) //you patch the DTO but you're returning back to the model
        {
            if (patchDoc == null)
            {
                return BadRequest();
            }

            var customersOrd = await _context.Orders.FindAsync(id); //find all the customers in the list

            if (customersOrd == null)
            {
                return NotFound();
            }
            //do i only 'copy' the one value i want to change?

            var OrderStatus = new OrdersDTOP //now we assign the current value from the MODEL to the value of the DTO
            {
                OrderStatus = customersOrd.OrderStatus
            };

            patchDoc.ApplyTo(OrderStatus);

            if (!TryValidateModel(OrderStatus)) //is this a form of validation? //is patching done here?
            {
                return ValidationProblem(ModelState);
            }

            customersOrd.OrderStatus = OrderStatus.OrderStatus;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!OrdersExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }
            return NoContent();
        }


        // POST: api/Orders
        [HttpPost]
        public async Task<ActionResult> CustomerOrders(OrdersDTOP cartItems) //for cart
        {
            var order = new Orders
            {
                CustomerId = cartItems.CustomerId,
                OrderType = cartItems.OrderType,
                OrderDate = cartItems.OrderDate,
                TotalAmount = cartItems.TotalAmount,
                DiscountAmount = cartItems.DiscountAmount,
                TaxAmount = cartItems.TaxAmount,
                FinalAmount = cartItems.FinalAmount,
                OrderStatus = cartItems.OrderStatus,
                SpecialInstructions = cartItems.SpecialInstructions
            };

            _context.Orders.Add(order);
            await _context.SaveChangesAsync();

            var orderItems = cartItems.OrderItems.Select(OrderItems => new OrderItems{
                OrderId = order.OrderId,
                ItemId = OrderItems.ItemId,
                Quantity = OrderItems.Quantity,
                UnitPrice = OrderItems.UnitPrice,
                SpecialRequests = OrderItems.SpecialRequests,
                ItemStatus = OrderItems.ItemStatus

    }).ToList();

            _context.OrderItems.AddRange(orderItems);
            await _context.SaveChangesAsync();
            return Ok(cartItems);
        }

        // DELETE: api/Orders/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteOrders(int id)
        {
            var orders = await _context.Orders.FindAsync(id);
            if (orders == null)
            {
                return NotFound();
            }

            _context.Orders.Remove(orders);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool OrdersExists(int id)
        {
            return _context.Orders.Any(e => e.OrderId == id);
        }
    }
}
