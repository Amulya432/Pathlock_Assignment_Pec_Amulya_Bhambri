using System.ComponentModel.DataAnnotations;

namespace backend.DTOs
{
    public class TaskDto
    {
        [Required]
        public string Title { get; set; } = string.Empty;

        public DateTime? DueDate { get; set; }
    }
}
