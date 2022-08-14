using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using TodoList.Api.Models;

namespace TodoList.Api.Repositories {
    public interface IToDoRepository {
        public Task<IList<TodoItem>> GetTodoItems();
        public Task<TodoItem> GetTodoItem(Guid id);
        public Task<bool> UpdateTodoItem(TodoItem todoItem);
        public Task AddTodoItem(TodoItem todoItem);
        public bool TodoItemDescriptionExists(string description);
    }

    public class ToDoRepository : IToDoRepository {
        private readonly TodoContext _context;

        public ToDoRepository(TodoContext context) {
            _context = context;
        }

        public async Task AddTodoItem(TodoItem todoItem) {
            _context.TodoItems.Add(todoItem);
            await _context.SaveChangesAsync();
        }

        public async Task<TodoItem> GetTodoItem(Guid id) {
            return await _context.TodoItems.FindAsync(id);
        }

        public async Task<IList<TodoItem>> GetTodoItems() {
            return await _context.TodoItems.Where(x => !x.IsCompleted).ToListAsync();
        }

        public async Task<bool> UpdateTodoItem(TodoItem todoItem) {
            try {
                TodoItem item = await GetTodoItem(todoItem.Id);
                item.IsCompleted = todoItem.IsCompleted;
                await _context.SaveChangesAsync();
            } catch (DbUpdateConcurrencyException) {
                if (!TodoItemIdExists(todoItem.Id)) {
                    return false;
                } else {
                    throw;
                }
            }
            return true;
        }

        private bool TodoItemIdExists(Guid id) {
            return _context.TodoItems.Any(x => x.Id == id);
        }

        public bool TodoItemDescriptionExists(string description) {
            return _context.TodoItems
            .Any(x => x.Description.ToLowerInvariant() == description.ToLowerInvariant() && !x.IsCompleted);
        }
    }
}

