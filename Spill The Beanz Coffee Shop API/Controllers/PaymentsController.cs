using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Spill_The_Beanz_Coffee_Shop_API.DB_Context;
using Spill_The_Beanz_Coffee_Shop_API.Models;

namespace Spill_The_Beanz_Coffee_Shop_API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PaymentsController : ControllerBase
    {
        private readonly CoffeeDbContext _context;

        public PaymentsController(CoffeeDbContext context)
        {
            _context = context;
        }

        // GET: api/Payments
        //[HttpGet]
        //public async Task<ActionResult<IEnumerable<Payments>>> GetPayments()
        //{
        //    return await _context.Payments.ToListAsync();
        //}

        //// GET: api/Payments/5
        //[HttpGet("{id}")]
        //public async Task<ActionResult<Payments>> GetPayments(int id)
        //{
        //    var payments = await _context.Payments.FindAsync(id);

        //    if (payments == null)
        //    {
        //        return NotFound();
        //    }

        //    return payments;
        //}

        //// PUT: api/Payments/5
        //// To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        //[HttpPut("{id}")]
        //public async Task<IActionResult> PutPayments(int id, Payments payments)
        //{
        //    if (id != payments.payment_id)
        //    {
        //        return BadRequest();
        //    }

        //    _context.Entry(payments).State = EntityState.Modified;

        //    try
        //    {
        //        await _context.SaveChangesAsync();
        //    }
        //    catch (DbUpdateConcurrencyException)
        //    {
        //        if (!PaymentsExists(id))
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

        // POST: api/Payments
        [HttpPost]
        public async Task<ActionResult<Payments>> PostPayments(Payments payments)
        {
            _context.Payments.Add(payments);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetPayments", new { id = payments.payment_id }, payments);
        }

        // DELETE: api/Payments/5
        //[HttpDelete("{id}")]
        //public async Task<IActionResult> DeletePayments(int id)
        //{
        //    var payments = await _context.Payments.FindAsync(id);
        //    if (payments == null)
        //    {
        //        return NotFound();
        //    }

        //    _context.Payments.Remove(payments);
        //    await _context.SaveChangesAsync();

        //    return NoContent();
        //}

        //private bool PaymentsExists(int id)
        //{
        //    return _context.Payments.Any(e => e.payment_id == id);
        //}
    }
}
