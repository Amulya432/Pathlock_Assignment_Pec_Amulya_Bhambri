using Microsoft.AspNetCore.Mvc;
using backend.Models;
using backend.DTOs;
using backend.Services;
using System;
using System.Collections.Generic;

namespace backend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class TasksController : ControllerBase
    {
        private readonly ITaskService _svc;

        public TasksController(ITaskService svc)
        {
            _svc = svc;
        }

        // GET /api/tasks?filter=active|completed
        [HttpGet]
        public ActionResult<IEnumerable<TaskItem>> GetAll([FromQuery] string? filter)
        {
            return Ok(_svc.GetAll(filter));
        }

        // GET /api/tasks/{id}
        [HttpGet("{id:guid}")]
        public ActionResult<TaskItem> Get(Guid id)
        {
            var t = _svc.GetById(id);
            if (t == null) return NotFound();
            return Ok(t);
        }

        // POST /api/tasks
        [HttpPost]
        public ActionResult<TaskItem> Create([FromBody] CreateTaskDto dto)
        {
            if (string.IsNullOrWhiteSpace(dto.Description))
                return BadRequest("Description is required.");

            var created = _svc.Add(dto.Description.Trim());
            return CreatedAtAction(nameof(Get), new { id = created.Id }, created);
        }

        // PUT /api/tasks/{id}
        [HttpPut("{id:guid}")]
        public IActionResult Update(Guid id, [FromBody] TaskItem updated)
        {
            var existing = _svc.GetById(id);
            if (existing == null) return NotFound();

            // ensure id correctness
            updated.Id = existing.Id;
            _svc.Update(updated);
            return Ok(updated);
        }

        // PATCH /api/tasks/{id}/toggle
        [HttpPatch("{id:guid}/toggle")]
        public IActionResult Toggle(Guid id)
        {
            if (!_svc.Toggle(id)) return NotFound();
            return NoContent();
        }

        // PATCH /api/tasks/{id} - partial update (description)
        [HttpPatch("{id:guid}")]
        public IActionResult UpdateDescription(Guid id, [FromBody] CreateTaskDto dto)
        {
            if (string.IsNullOrWhiteSpace(dto.Description)) return BadRequest("Description required.");
            var t = _svc.GetById(id);
            if (t == null) return NotFound();
            t.Description = dto.Description.Trim();
            _svc.Update(t);
            return NoContent();
        }

        // DELETE /api/tasks/{id}
        [HttpDelete("{id:guid}")]
        public IActionResult Delete(Guid id)
        {
            if (!_svc.Delete(id)) return NotFound();
            return NoContent();
        }
    }
}
