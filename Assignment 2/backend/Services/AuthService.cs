using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using backend.Data;
using backend.DTOs;
using backend.Models; // adjust if your models namespace is different
using Microsoft.Extensions.Configuration;

namespace backend.Services
{
    public class AuthService
    {
        private readonly AppDbContext _db;
        private readonly IConfiguration _config;

        public AuthService(AppDbContext db, IConfiguration config)
        {
            _db = db;
            _config = config;
        }

        // Register: returns token + basic user info
        public async Task<AuthResponseDto> RegisterAsync(string email, string password)
        {
            var existing = await _db.Users.FirstOrDefaultAsync(u => u.Email == email);
            if (existing != null)
                return new AuthResponseDto { Success = false, Error = "Email already registered." };

            // Simple hashing example (use a proper salted hash in production)
            var passwordHash = Convert.ToBase64String(System.Security.Cryptography.SHA256.HashData(Encoding.UTF8.GetBytes(password)));

            var user = new User
            {
                Email = email,
                PasswordHash = passwordHash
                // set other properties if your User model requires them
            };

            _db.Users.Add(user);
            await _db.SaveChangesAsync();

            var token = GenerateJwtToken(user);
            return new AuthResponseDto { Success = true, Token = token, Email = user.Email, UserId = user.Id };
        }

        // Login: verify and return token
        public async Task<AuthResponseDto> LoginAsync(string email, string password)
        {
            var user = await _db.Users.FirstOrDefaultAsync(u => u.Email == email);
            if (user == null)
                return new AuthResponseDto { Success = false, Error = "Invalid credentials." };

            var passwordHash = Convert.ToBase64String(System.Security.Cryptography.SHA256.HashData(Encoding.UTF8.GetBytes(password)));
            if (user.PasswordHash != passwordHash)
                return new AuthResponseDto { Success = false, Error = "Invalid credentials." };

            var token = GenerateJwtToken(user);
            return new AuthResponseDto { Success = true, Token = token, Email = user.Email, UserId = user.Id };
        }

        private string GenerateJwtToken(User user)
        {
            var key = _config["Jwt:Key"] ?? throw new InvalidOperationException("JWT Key missing");
            var issuer = _config["Jwt:Issuer"];
            var audience = _config["Jwt:Audience"];
            var lifetimeMinutes = int.TryParse(_config["Jwt:TokenLifetimeMinutes"], out var m) ? m : 60;

            var claims = new[]
            {
                new Claim(JwtRegisteredClaimNames.Sub, user.Id.ToString()),
                new Claim(JwtRegisteredClaimNames.Email, user.Email),
                new Claim("uid", user.Id.ToString())
            };

            var keyBytes = Encoding.UTF8.GetBytes(key);
            var creds = new SigningCredentials(new SymmetricSecurityKey(keyBytes), SecurityAlgorithms.HmacSha256);

            var token = new JwtSecurityToken(
                issuer: issuer,
                audience: audience,
                claims: claims,
                expires: DateTime.UtcNow.AddMinutes(lifetimeMinutes),
                signingCredentials: creds
            );

            return new JwtSecurityTokenHandler().WriteToken(token);
        }
    }
}
