export function TodoItem({ todo }) {
  return (
    <li>
      <label>
        <input type="checkbox" defaultChecked={todo.completed} />
        {todo.title}
      </label>
      <button type="button">&times;</button>
    </li>
  );
}
