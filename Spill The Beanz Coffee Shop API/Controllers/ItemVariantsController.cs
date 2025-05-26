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
    public class ItemVariantsController : ControllerBase
    {
        private readonly CoffeeDbContext _context;

        public ItemVariantsController(CoffeeDbContext context)
        {
            _context = context;
        }

        // GET: api/MenuItemVariants fetch all
        [HttpGet]
        public async Task<ActionResult<IEnumerable<ItemVariants>>> GetMenuItemVariants()
        {
            var variants = await _context.ItemVariants
                .Include(variants => variants.Item) //orderitems too
                .ToListAsync();
            return await _context.ItemVariants.ToListAsync();
        }

        // GET: api/MenuItemVariants/{id}
        [HttpGet("{id}")]
        public async Task<ActionResult<ItemVariants>> GetMenuItemVariants(int id)
        {
            var menuItemVariants = await _context.ItemVariants.FindAsync(id);

            if (menuItemVariants == null)
            {
                return NotFound();
            }

            return menuItemVariants;
        }

        // PUT: api/MenuItemVariants/{id}
        [HttpPut("{id}")]
        public async Task<IActionResult> PutMenuItemVariants(int id, ItemVariants menuItemVariants)
        {
            if (id != menuItemVariants.VariantId)
            {
                return BadRequest();
            }

            _context.Entry(menuItemVariants).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!MenuItemVariantsExists(id))
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

        // POST: api/MenuItemVariants
        [HttpPost]
        public async Task<ActionResult<ItemVariants>> PostMenuItemVariants(ItemVariants menuItemVariants)
        {
            _context.ItemVariants.Add(menuItemVariants);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetMenuItemVariants", new { id = menuItemVariants.VariantId }, menuItemVariants);
        }

        // DELETE: api/MenuItemVariants/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteMenuItemVariants(int id)
        {
            var menuItemVariants = await _context.ItemVariants.FindAsync(id);
            if (menuItemVariants == null)
            {
                return NotFound();
            }

            _context.ItemVariants.Remove(menuItemVariants);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool MenuItemVariantsExists(int id)
        {
            return _context.ItemVariants.Any(exists => exists.VariantId == id);
        }
    }
}
