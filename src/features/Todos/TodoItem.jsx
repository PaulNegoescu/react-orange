export function TodoItem({ todo, onDelete, onComplete }) {
  return (
    <li>
      <label>
        <input
          type="checkbox"
          checked={todo.completed}
          onChange={(e) => onComplete(todo)}
        />
        {todo.title}
      </label>
      <button type="button" onClick={() => onDelete(todo)}>
        &times;
      </button>
    </li>
  );
}
