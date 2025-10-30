using System.ComponentModel.DataAnnotations;

namespace backend.DTOs
{
    public class ProjectDto
    {
        [Required, MinLength(3), MaxLength(100)]
        public string Title { get; set; } = string.Empty;

        [MaxLength(500)]
        public string? Description { get; set; }
    }
}
