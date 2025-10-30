using backend.Models;
using System.Collections.Concurrent;

namespace backend.Services
{
    public class InMemoryTaskService : ITaskService
    {
        private readonly ConcurrentDictionary<int, TaskItem> _store = new();
        private int _id = 0;

        public InMemoryTaskService()
        {
            Add("Welcome — this is your first task!");
        }

        public IEnumerable<TaskItem> GetAll(string? filter = null)
        {
            var all = _store.Values.OrderByDescending(t => t.CreatedAt);
            return filter?.ToLower() switch
            {
                "completed" => all.Where(t => t.IsCompleted),
                "active" => all.Where(t => !t.IsCompleted),
                _ => all,
            };
        }

        public TaskItem? GetById(int id) => _store.TryGetValue(id, out var t) ? t : null;

        public TaskItem Add(string description)
        {
            var id = Interlocked.Increment(ref _id);
            var ti = new TaskItem { Id = id, Description = description, CreatedAt = DateTime.UtcNow };
            _store[id] = ti;
            return ti;
        }

        public bool Toggle(int id)
        {
            if (!_store.TryGetValue(id, out var t)) return false;
            t.IsCompleted = !t.IsCompleted;
            _store[id] = t;
            return true;
        }

        public bool Delete(int id) => _store.TryRemove(id, out _);
    }
}
