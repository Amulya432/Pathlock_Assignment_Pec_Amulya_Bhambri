using Microsoft.EntityFrameworkCore;
using backend.Models; // <- your models namespace (you said models & DTOs are done)

namespace backend.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

        // Use your real model classes here (I assume you have User, Project, TaskItem)
        public DbSet<User> Users => Set<User>();
        public DbSet<Project> Projects => Set<Project>();
        public DbSet<TaskItem> Tasks => Set<TaskItem>();

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            // Example constraints (adjust/remove to match your real DTOs/models)
            modelBuilder.Entity<User>(b =>
            {
                b.HasKey(u => u.Id);
                b.HasIndex(u => u.Email).IsUnique();
            });

            modelBuilder.Entity<Project>(b =>
            {
                b.HasKey(p => p.Id);
                b.Property(p => p.Title).IsRequired().HasMaxLength(100);
                b.Property(p => p.Description).HasMaxLength(500);
                b.HasOne(p => p.Owner).WithMany(u => u.Projects).HasForeignKey(p => p.OwnerId);
            });

            modelBuilder.Entity<TaskItem>(b =>
            {
                b.HasKey(t => t.Id);
                b.Property(t => t.Title).IsRequired();
                b.HasOne(t => t.Project).WithMany(p => p.Tasks).HasForeignKey(t => t.ProjectId);
            });
        }
    }
}
