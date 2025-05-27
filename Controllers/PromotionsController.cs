using CSMS_Trial.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

[ApiController]
[Route("api/[controller]")]
public class PromotionsController : ControllerBase
{
    private readonly SpillTheBeanzDbContext _context;

    public PromotionsController(SpillTheBeanzDbContext context)
    {
        _context = context;
    }

    [HttpGet]
    public async Task<IActionResult> GetPromotions()
    {
        return Ok(await _context.Promotions.ToListAsync());
    }

    [HttpPost]
    public async Task<IActionResult> CreatePromotion(Promotion promo)
    {
        _context.Promotions.Add(promo);
        await _context.SaveChangesAsync();
        return Ok(promo);
    }
}