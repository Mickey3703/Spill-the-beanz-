using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
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
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Customers>>> GetCustomerList()
        {
            return await _context.Customers.ToListAsync();
        }

        // GET: api/Customers/{id}
        [HttpGet("{id}")]
        public async Task<ActionResult<CustomerDTO>> GetCustomers(int id)
        {
            var customers = await _context.Customers.FindAsync(id);

            if (customers == null)
            {
                return NotFound();
            }

            var dto = new CustomerDTO
            {
                CustomerName = customers.CustomerName,
                Email = customers.Email,
                PhoneNumber = customers.PhoneNumber,
                Address = customers.Address
            };


            return Ok(dto);
        }

        // PUT: api/Customers/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutCustomers(int id, Customers customers)
        {
            if (id != customers.CustomerID)
            {
                return BadRequest();
            }

            _context.Entry(customers).State = EntityState.Modified;

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
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Customers>> PostCustomers(CustomerDTO customerdto)
        {
            var customer = new Customers //this kind've 'restricts' what's being received
            {
                CustomerName = customerdto.CustomerName,
                Email = customerdto.Email,
                PhoneNumber = customerdto.PhoneNumber,
                PasswordHash = customerdto.PasswordHash,
                Address = customerdto.Address,
                CreatedAt = DateTime.UtcNow,
                LastVisited = DateTime.UtcNow,
            };

            _context.Customers.Add(customer);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetCustomers", new {id = customer.CustomerID}, customer);
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
