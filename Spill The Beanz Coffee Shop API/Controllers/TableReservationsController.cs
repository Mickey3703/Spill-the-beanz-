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
    public class TableReservationsController : ControllerBase
    {
        private readonly CoffeeDbContext _context;

        public TableReservationsController(CoffeeDbContext context)
        {
            _context = context;
        }

        // GET: api/TableReservations
        [HttpGet]
        public async Task<ActionResult<IEnumerable<CustomerDTORes>>> GetTableReservations()
        {
            var customersRes = await _context.TableReservations
                .Include(customer => customer.Orders) //include from orders table
                .ThenInclude(Orders => Orders.OrderItems)
                .ThenInclude(orderItem => orderItem.Item)

                .Select(customersRes => new CustomerDTORes() {

                CustomerName = customersRes.CustomerName,
                Email = customersRes.Email,
                PhoneNumber = customersRes.PhoneNumber
                TableRes = customersRes.TableRes.Select(TableRes => new TableResDTO 
                {
                    ReservationId = TableRes.ReservationId,
                    CustomerId = TableRes.CustomerId,
                    tableId = TableRes.tableId,
                    ReservationDate = TableRes.ReservationDate,
                    start_time = TableRes.start_time,
                    end_time = TableRes.end_time,
                    SeatsNumbers = TableRes.SeatsNumbers,
                    specialRequests = TableRes.specialRequests,
                    ReservationStatus = TableRes.ReservationStatus

                }) .ToList()


            }) .ToListAsync();


        }

        // GET: api/TableReservations/5
        [HttpGet("{id}")]
        public async Task<ActionResult<TableReservations>> GetTableReservations(int id)
        {
            var tableReservations = await _context.TableReservations.FindAsync(id);

            if (tableReservations == null)
            {
                return NotFound();
            }

            return tableReservations;
        }

        // PUT: api/TableReservations/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutTableReservations(int id, TableReservations tableReservations)
        {
            if (id != tableReservations.ReservationId)
            {
                return BadRequest();
            }

            _context.Entry(tableReservations).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!TableReservationsExists(id))
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

        // POST: api/TableReservations
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<TableReservations>> PostTableReservations(TableReservations tableReservations)
        {
            _context.TableReservations.Add(tableReservations);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetTableReservations", new { id = tableReservations.ReservationId }, tableReservations);
        }

        // DELETE: api/TableReservations/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteTableReservations(int id)
        {
            var tableReservations = await _context.TableReservations.FindAsync(id);
            if (tableReservations == null)
            {
                return NotFound();
            }

            _context.TableReservations.Remove(tableReservations);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool TableReservationsExists(int id)
        {
            return _context.TableReservations.Any(e => e.ReservationId == id);
        }
    }
}
