using CSMS_Trial.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

[ApiController]
[Route("api/[controller]")]
public class ReservationsController : ControllerBase
{
    private readonly SpillTheBeanzDbContext _context;

    public ReservationsController(SpillTheBeanzDbContext context)
    {
        _context = context;
    }

    [HttpGet]
    public async Task<IActionResult> GetReservations()
    {
        var reservations = await _context.TableReservations.Include(r => r.Customer).ToListAsync();
        return Ok(reservations);
    }

    [HttpPost]
    public async Task<IActionResult> CreateReservation(TableReservation reservation)
    {
        _context.TableReservations.Add(reservation);
        await _context.SaveChangesAsync();
        return Ok(reservation);
    }
}

