using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using backend.Services;    // ensure this matches the namespace of your AuthService
using backend.DTOs;        // ensure your DTOs use namespace 'backend.DTOs'

namespace backend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AuthController : ControllerBase
    {
        private readonly AuthService _authService;

        public AuthController(AuthService authService)
        {
            _authService = authService;
        }

        // POST: /api/auth/register
        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody] RegisterDto dto)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);

            // Call your service (adjust method name/signature if different)
            var result = await _authService.RegisterAsync(dto.Email, dto.Password);

            // result can be bool, object, or custom result. Adjust response logic to your service.
            if (result is null)
            {
                // assume null => failure
                return BadRequest(new { message = "Registration failed" });
            }

            return Ok(result);
        }

        // POST: /api/auth/login
        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] LoginDto dto)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);

            var result = await _authService.LoginAsync(dto.Email, dto.Password);

            if (result is null)
            {
                return Unauthorized(new { message = "Invalid credentials" });
            }

            return Ok(result);
        }
    }
}
