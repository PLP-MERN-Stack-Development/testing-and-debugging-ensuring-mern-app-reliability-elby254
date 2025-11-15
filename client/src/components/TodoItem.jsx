export default function TodoItem({ todo, onToggle, onDelete }) {
    return (
        <li
            className="flex items-center justify-between gap-3 border-b py-2"
            data-testid="todo-item"
        >
            <label className="flex items-center gap-2">
                <input
                    type="checkbox"
                    checked={todo.completed}
                    onChange={() => onToggle(todo)}
                    aria-label={`toggle-${todo.title}`}
                />

                <span
                    className={
                        todo.completed
                            ? "line-through text-gray-400"
                            : "text-gray-900"
                    }
                >
                    {todo.title}
                </span>
            </label>

            <button
                onClick={() => onDelete(todo)}
                className="text-red-600 text-sm"
                aria-label={`delete-${todo.title}`}
            >
                Delete
            </button>
        </li>
    );
}
