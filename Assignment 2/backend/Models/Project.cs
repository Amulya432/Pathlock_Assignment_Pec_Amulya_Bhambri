using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace backend.Models
{
    public class Project
    {
        [Key]
        public int Id { get; set; }

        // Title required, 3-100 chars
        [Required, MinLength(3), MaxLength(100)]
        public string Title { get; set; } = string.Empty;

        // Optional description (max 500)
        [MaxLength(500)]
        public string? Description { get; set; }

        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

        // Owner foreign key & navigation property (matches AppDbContext expectation 'Owner')
        public int OwnerId { get; set; }

        [ForeignKey(nameof(OwnerId))]
        public User? Owner { get; set; }

        // Navigation: a project has many tasks
        public ICollection<TaskItem> Tasks { get; set; } = new List<TaskItem>();
    }
}
