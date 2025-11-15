import { useState, useEffect } from 'react';
import { TodosAPI } from './lib/api';
import TodoItem from './components/TodoItem';

export default function App() {
  const [todos, setTodos] = useState([]);
  const [title, setTitle] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    (async () => {
      try {
        const list = await TodosAPI.list();
        setTodos(list);
      } catch (e) {
        setError("Failed to load Todos");
      }
    })();
  }, []);

  async function addTodo(e) {
    e.preventDefault();
    if (!title.trim()) return;
    try {
      const todo = await TodosAPI.create(title.trim());
      setTodos((prev) => [...prev, todo]);
      setTitle("");
    } catch {
      setError("Failed to add");
    }
  }

  async function toggle(todo) {
    try {
      const updated = await TodosAPI.update(todo._id, { completed: !todo.completed });
      setTodos(prev => prev.map(t => (t._id === todo._id ? updated : t)));
    } catch {
      setError("Failed to update");
    }
  }

  async function remove(todo) {
    try {
      await TodosAPI.remove(todo._id);
      setTodos(prev => prev.filter(t => t._id !== todo._id));
    } catch {
      setError("Failed to remove");
    }
  }

  return (
    <div className="max-w-xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Todo App (Testing Edition)</h1>

      <form onSubmit={addTodo} className="flex gap-2 mb-4">
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="New Todo"
          className="flex-1 border px-3 py-2 rounded"
          aria-label="new-todo-input"
        />
        <button className="bg-black text-white px-4 py-2 rounded">Add</button>
      </form>

      {error && <p className="text-red-600 text-sm mb-2">{error}</p>}

      <ul>
        {todos.map((todo) => (
          <TodoItem
            key={todo._id}
            todo={todo}
            onToggle={toggle}
            onDelete={remove}
          />
        ))}
      </ul>
    </div>
  );
}




