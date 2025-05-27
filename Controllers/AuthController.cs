using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using CSMS_Trial.DTOs;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;

[ApiController]
[Route("api/[controller]")]
public class AuthController : ControllerBase
{
    private readonly SpillTheBeanzDbContext _context;

    public AuthController(SpillTheBeanzDbContext context)
    {
        _context = context;
    }

    [HttpPost("admin/login")]
    public async Task<IActionResult> AdminLogin(LoginDto login)
    {
        var admin = await _context.Admins.SingleOrDefaultAsync(a => a.EmailAddress == login.Email);
        if (admin == null || admin.PasswordHash != login.Password) // Replace with proper hash check
            return Unauthorized("Invalid credentials");

        return Ok(new { admin.AdminId, admin.Name });
    }
    private readonly JwtService _jwtService;

    public AuthController(SpillTheBeanzDbContext context, JwtService jwtService)
    {
        _context = context;
        _jwtService = jwtService;
    }


}