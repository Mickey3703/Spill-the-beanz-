using Microsoft.AspNetCore.Mvc;
using CSMS_Trial.Models;
using Microsoft.EntityFrameworkCore;

[ApiController]
[Route("api/[controller]")]
public class InventoryController : ControllerBase
{
    private readonly SpillTheBeanzDbContext _context;

    public InventoryController(SpillTheBeanzDbContext context)
    {
        _context = context;
    }

    [HttpGet]
    public async Task<IActionResult> GetInventory()
    {
        return Ok(await _context.Inventory.ToListAsync());
    }

    [HttpPost]
    public async Task<IActionResult> AddInventoryItem(Inventory item)
    {
        _context.Inventory.Add(item);
        await _context.SaveChangesAsync();
        return Ok(item);
    }
}

