namespace backend.DTOs
{
    public class AuthResponseDto
    {
        public bool Success { get; set; } = false;
        public string? Token { get; set; }
        public string? Error { get; set; }
        public string? Email { get; set; }
        public int? UserId { get; set; }
    }
}
