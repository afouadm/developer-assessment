using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using System;
using System.Linq;
using System.Threading.Tasks;
using TodoList.Api.Models;
using TodoList.Api.Services;

namespace TodoList.Api.Controllers {
    [Route("api/[controller]")]
    [ApiController]
    public class TodoItemsController : ControllerBase {

        private readonly ILogger<TodoItemsController> _logger;
        private readonly ToDoService _toDoService;

        public TodoItemsController(ILogger<TodoItemsController> logger, ToDoService toDoService) {
            _logger = logger;
            _toDoService = toDoService;
        }

        // GET: api/TodoItems
        [HttpGet]
        public async Task<IActionResult> GetTodoItems() {
            var results = await _toDoService.GetTodoItems();
            return Ok(results);
        }

        // GET: api/TodoItems/...
        [HttpGet("{id}")]
        public async Task<IActionResult> GetTodoItem(Guid id) {
            var result = await _toDoService.GetTodoItem(id);

            if (result == null) {
                return NotFound();
            }

            return Ok(result);
        }

        // PUT: api/TodoItems/... 
        [HttpPut("{id}")]
        public async Task<IActionResult> PutTodoItem(Guid id, TodoItem todoItem) {
            if (id != todoItem.Id) {
                return BadRequest();
            }
            bool updated = await _toDoService.UpdateTodoItem(todoItem);
            if (!updated) {
                return NotFound();
            }
            return NoContent();
        }

        // POST: api/TodoItems 
        [HttpPost]
        public async Task<IActionResult> PostTodoItem(TodoItem todoItem) {
            if (string.IsNullOrEmpty(todoItem?.Description)) {
                return BadRequest("Description is required");
            } else if (_toDoService.TodoItemDescriptionExists(todoItem.Description)) {
                return BadRequest("Description already exists");
            }
            await _toDoService.AddTodoItem(todoItem);
            return CreatedAtAction(nameof(GetTodoItem), new { id = todoItem.Id }, todoItem);
        }
    }
}
