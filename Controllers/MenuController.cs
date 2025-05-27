using CSMS_Trial.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace CSMS_Trial.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class MenuController : ControllerBase
    {
        private readonly SpillTheBeanzDbContext _context;

        public MenuController(SpillTheBeanzDbContext context)
        {
            _context = context;
        }

        [HttpGet("categories")]
        public async Task<ActionResult<IEnumerable<MenuCategory>>> GetCategories()
        {
            return await _context.MenuCategories.ToListAsync();
        }

        [HttpGet("items")]
        public async Task<ActionResult<IEnumerable<MenuItem>>> GetMenuItems()
        {
            return await _context.MenuItems.Include(m => m.Category).ToListAsync();
        }

        [HttpPost("item")]
        public async Task<IActionResult> AddMenuItem(MenuItem item)
        {
            _context.MenuItems.Add(item);
            await _context.SaveChangesAsync();
            return CreatedAtAction(nameof(GetMenuItems), new { id = item.ItemId }, item);
        }
    }

}
