using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Azure;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.JsonPatch;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.ModelBinding;
using Microsoft.EntityFrameworkCore;
using Spill_The_Beanz_Coffee_Shop_API.DB_Context;
using Spill_The_Beanz_Coffee_Shop_API.DTOs;
using Spill_The_Beanz_Coffee_Shop_API.Models;

namespace Spill_The_Beanz_Coffee_Shop_API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CustomersController : ControllerBase
    {
        private readonly CoffeeDbContext _context;

        public CustomersController(CoffeeDbContext context)
        {
            _context = context;
        }

        // GET: api/Customers <-- this is the endpoint. User clicks link/button
        //[HttpGet]
        //public async Task<ActionResult<IEnumerable<CustomerDTOGet>>> GetCustomerList()
        //{
        //    var customers = await _context.Customers.ToListAsync(); //retrieving all rows from DB

        //    if (customers == null) {

        //        return NotFound(); }


        //    var dto = customers.Select(customers => new CustomerDTOGet() //Selects all the rows, goes through each one, and maps each one (object) to the DTO. >= maps. select(parameter name)
        //    {
        //        CustomerName = customers.CustomerName,
        //        Email = customers.Email,
        //        PhoneNumber = customers.PhoneNumber,
        //        Address = customers.Address
        //    }).ToList(); //turns objexts into a new list

        //    return Ok(dto);

            
        //}

        [HttpGet] //customerOrders
        public async Task<ActionResult<List<CustomerDTOOrderGET>>> GetCustomerOrderList()
        {
            var customerOrders = await _context.Customers
                .Include(customer => customer.Orders) //include from orders table
                .ThenInclude(Orders => Orders.OrderItems)
                .ThenInclude(orderItem => orderItem.Item)
                .Select(customer => new CustomerDTOOrderGET
                {
                    CustomerName = customer.CustomerName,
                    Email = customer.Email,
                    PhoneNumber = customer.PhoneNumber,
                    Address = customer.Address,
                    Orders = customer.Orders.Select(Orders => new OrderDto
                    {
                        OrderId = Orders.OrderId,
                        OrderItems = Orders.OrderItems.Select(OrderItems => OrderItems.Item.ItemName).ToList(),
                        OrderStatus = Orders.OrderStatus,
                        FinalAmount = Orders.FinalAmount
                    }).ToList()
                })//retrieving all rows from DB
                    .ToListAsync();       

            if (customerOrders == null)
            {

                return NotFound();
            }

            return Ok(customerOrders);


        }

        // GET: api/Customers/{id}
        [HttpGet("{id}")]
        public async Task<ActionResult<CustomerDTOGet>> GetCustomers(int id)
        {
            var customers = await _context.Customers.FindAsync(id);  //we're making 'customers' a type of 'Customers'. 'Customers' is from the DBSet

            if (customers == null)
            {
                return NotFound();
            }

            var dto = new CustomerDTOGet
            {
                CustomerName = customers.CustomerName,
                Email = customers.Email,
                PhoneNumber = customers.PhoneNumber,
                Address = customers.Address
            };


            return Ok(dto);
        }

        // PUT: api/Customers/{id}
        [HttpPut("{id}")] //this will create a completely new instance. Override. 
        public async Task<IActionResult> PutCustomers(int id, CustomerDTOP customerdto)
        {
            if (id != customerdto.CustomerID) //i assume this checks through the whole list/column
            {
                return BadRequest();
            }

           // _context.Entry(customerdto).State = EntityState.Modified; //the customers object has been and should be modified in the db

            var customer = await _context.Customers.FindAsync(id); //find the row using an ID

            if (customer == null)
            {
                return NotFound();
            }

                customer.CustomerName = customerdto.CustomerName; //this will asign the dto value to the customer table column
                customer.Email = customerdto.Email;
                customer.PhoneNumber = customerdto.PhoneNumber;
                customer.PasswordHash = customerdto.PasswordHash;
                customer.Address = customerdto.Address;
                customer.CreatedAt = DateTime.UtcNow; //the client does not send this information
                customer.LastVisited = DateTime.UtcNow;


            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!CustomersExists(id))
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

        // POST: api/Customers
        [HttpPost] //this creates a competely new row in the tables
        public async Task<ActionResult<Customers>> PostCustomers(CustomerDTOP customerdto)
        {
            var customer = new Customers //this kind've 'restricts' what's being received
            {
                CustomerName = customerdto.CustomerName,
                Email = customerdto.Email,
                PhoneNumber = customerdto.PhoneNumber,
                PasswordHash = customerdto.PasswordHash,
                Address = customerdto.Address,
                CreatedAt = DateTime.UtcNow, //the client does not send this information
                LastVisited = DateTime.UtcNow, //or this
            };

            _context.Customers.Add(customer); //add the values to the instance of the Customeres model

            await _context.SaveChangesAsync();  //save the changes 

            return CreatedAtAction("Account successfully created", new {id = customer.CustomerID}, customer);
        }

        [HttpPatch("{id}")] //patch by ID

        public async Task<IActionResult> PatchCustomers(int id, JsonPatchDocument<CustomerDTOP> patchDoc) //what exactly is patchdoc?
        {
            if (patchDoc == null)
            {
                return BadRequest();
            }
            //find an existing customer row
            var customer = await _context.Customers.FindAsync(id);
            if (customer == null)
            {
                return NotFound();
            }

            //fetching the property values from class model and creating a new DTO from that
            var customerToPatch = new CustomerDTOP
            {
                CustomerName = customer.CustomerName,
                Email = customer.Email,
                PhoneNumber = customer.PhoneNumber,
                PasswordHash = customer.PasswordHash,
                Address = customer.Address
            };

            patchDoc.ApplyTo(customerToPatch);

            if (!TryValidateModel(customerToPatch)) //is this a form of validation? //is patching done here?
            {
                return ValidationProblem(ModelState);
            }
            //updating kinda
            customer.CustomerName = customerToPatch.CustomerName; //so whatever 'patched' value we get, we update?
            customer.Email = customerToPatch.Email;
            customer.PhoneNumber = customerToPatch.PhoneNumber;
            customer.Address = customerToPatch.Address;
            customer.LastVisited = DateTime.UtcNow; //Not in the DTO but, we are now updating the last visted since that's the case? might leave after this? what for? profile visit?

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!CustomersExists(id))
                { return NotFound(); }

                else
                {
                    throw;
                }

            }
            return NoContent();
        }

        // DELETE: api/Customers/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteCustomers(int id)
        {
            var customers = await _context.Customers.FindAsync(id);
            if (customers == null)
            {
                return NotFound();
            }

            _context.Customers.Remove(customers);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool CustomersExists(int id)
        {
            return _context.Customers.Any(e => e.CustomerID == id);
        }
    }
}
