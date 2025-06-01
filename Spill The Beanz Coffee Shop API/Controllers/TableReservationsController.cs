using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Azure;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.JsonPatch;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.ModelBinding;
using Microsoft.EntityFrameworkCore;
using Spill_The_Beanz_Coffee_Shop_API.DB_Context;
using Spill_The_Beanz_Coffee_Shop_API.DTOs;
using Spill_The_Beanz_Coffee_Shop_API.Models;
using static NuGet.Packaging.PackagingConstants;

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
            var customersRes = await _context.TableReservations //using the Customers as the base
            .Include(customer => customer.Customers) //use the tableres property in there
          //.ThenInclude(customerRes => customerRes.Customers)
            .Select(customerRes => new CustomerDTORes()
            { //create new DTO object of customer. so only certain data is seen. 
                ReservationId = customerRes.ReservationId,
                CustomerName = customerRes.Customers.CustomerName,
                Email = customerRes.Customers.Email,
                PhoneNumber = customerRes.Customers.CustomerName,
                TableReservations = new List<TableResDTO>
                { new TableResDTO
                {
                    TableId = customerRes.TableId,
                    ReservationDate = customerRes.ReservationDate,
                    StartTime = customerRes.StartTime,
                    EndTime = customerRes.EndTime,
                    PartySize = customerRes.PartySize,
                    SpecialRequests = customerRes.SpecialRequests,
                    ReservationStatus = customerRes.ReservationStatus
                }
                }                                 
            }).ToListAsync();

            return Ok(customersRes);
        }

        // GET: api/TableReservations/5
        //[HttpGet("{id}")]
        //public async Task<ActionResult<List<TableResDTO>>> GetTableReservations(int id)
        //{
        //    var tableReservations = await _context.TableReservations.FindAsync(id);

        //    if (tableReservations == null)
        //    {
        //        return NotFound();
        //    }

        //    var customersRes = await _context.TableReservations //using the Customers as the base
        //     .Include(customer => customer.Customers) //use the tableres property in there
        //     //.ThenInclude(customerRes => customerRes.Customers)
        //     .Select(customer => new CustomerDTORes()
        //     { //create new DTO object of customer. so only certain data is seen. 
        //         ReservationId = customer.ReservationId,
        //         CustomerName = customer.CustomerName,
        //         Email = customer.Email,
        //         PhoneNumber = customer.PhoneNumber,
        //         TableReservations = customer.TableReservations.Select(TableRes => new TableResDTO
        //         {
        //             ReservationId = TableRes.ReservationId,
        //             CustomerId = TableRes.CustomerId,
        //             tableId = TableRes.tableId,
        //             ReservationDate = TableRes.ReservationDate,
        //             start_time = TableRes.start_time,
        //             end_time = TableRes.end_time,
        //             SeatsNumbers = TableRes.SeatsNumbers,
        //             specialRequests = TableRes.specialRequests,
        //             ReservationStatus = TableRes.ReservationStatus

        //         }).ToList()


        //     }).ToListAsync();

        //    return Ok(customersRes);
        //}

        // PUT: api/TableReservations/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        //[HttpPut("{id}")]
        //public async Task<IActionResult> PutTableReservations(int id, TableReservations tableReservations)
        //{
        //    if (id != tableReservations.ReservationId)
        //    {
        //        return BadRequest();
        //    }

        //    _context.Entry(tableReservations).State = EntityState.Modified;

        //    try
        //    {
        //        await _context.SaveChangesAsync();
        //    }
        //    catch (DbUpdateConcurrencyException)
        //    {
        //        if (!TableReservationsExists(id))
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

        // POST: api/TableReservations
        //[Authorize]
        //[HttpPost]
        //public async Task<ActionResult<TableReservations>> PostTableReservations(TableReservations tableReservations)
        //{
        //    _context.TableReservations.Add(tableReservations);
        //    await _context.SaveChangesAsync();

        //    return CreatedAtAction("GetTableReservations", new { id = tableReservations.ReservationId }, tableReservations);
        //}

        [HttpPatch("{id}")]
        public async Task<ActionResult<TableReservations>>PatchTableReservationStatus(int id, JsonPatchDocument<TableResDTO> patchDoc) //you patch the DTO but you're returning back to the model
        {
            if (patchDoc == null)
            {
                return BadRequest();
            }

            var customersRes = await _context.TableReservations.FindAsync(id); //find all the customers in the list

            if (customersRes == null)
            {
                return NotFound();
            }
            //do i only 'copy' the one value i want to change?

            var reservationStatus = new TableResDTO //now we assign the current value from the MODEL to the value of the DTO
            {
                ReservationStatus = customersRes.ReservationStatus
            };

            patchDoc.ApplyTo(reservationStatus);

              if (!TryValidateModel(reservationStatus)) //is this a form of validation? //is patching done here?
              {
                  return ValidationProblem(ModelState);
              }

               customersRes.ReservationStatus = reservationStatus.ReservationStatus;

                try
                {
              await _context.SaveChangesAsync();
                }
                catch (DbUpdateConcurrencyException)
                {
                    if (!TableReservationsExists(id))
                             { return NotFound(); 
                }
                   else
                   {
                       throw;
                   }
              }
              return NoContent();
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
