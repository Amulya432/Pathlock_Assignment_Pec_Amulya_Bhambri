using backend.Models;
using System.Collections.Generic;

namespace backend.Services
{
    public interface ITaskService
    {
        IEnumerable<TaskItem> GetAll(string? filter = null);
        TaskItem? GetById(int id);
        TaskItem Add(string description);
        bool Toggle(int id);
        bool Delete(int id);
    }
}
