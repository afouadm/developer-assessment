using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using TodoList.Api.Models;
using TodoList.Api.Repositories;

namespace TodoList.Api.Services {
    public interface IToDoService {
        public Task<IList<TodoItem>> GetTodoItems();
        public Task<TodoItem> GetTodoItem(Guid id);
        public Task<bool> UpdateTodoItem(TodoItem todoItem);
        public Task AddTodoItem(TodoItem todoItem);
        public bool TodoItemDescriptionExists(string description);
    }
    public class ToDoService : IToDoService {
        private readonly ToDoRepository _toDoRepository;
        public ToDoService(ToDoRepository toDoRepository) {
            _toDoRepository = toDoRepository;
        }

        public Task AddTodoItem(TodoItem todoItem) {
            return _toDoRepository.AddTodoItem(todoItem);
        }

        public Task<TodoItem> GetTodoItem(Guid id) {
            return _toDoRepository.GetTodoItem(id);
        }

        public Task<IList<TodoItem>> GetTodoItems() {
            return _toDoRepository.GetTodoItems();
        }

        public Task<bool> UpdateTodoItem(TodoItem todoItem) {
            return _toDoRepository.UpdateTodoItem(todoItem);
        }

        public bool TodoItemDescriptionExists(string description) {
            return _toDoRepository.TodoItemDescriptionExists(description);
        }
    }
}

