import { useEffect, useRef, useState } from 'react';
import styles from './Todos.module.css';
import { TodoItem } from './TodoItem';

const apiUrl = 'http://localhost:3001/todos';
export function Todos() {
  const [todos, setTodos] = useState(null);
  const titleRef = useRef();

  useEffect(() => {
    fetch(apiUrl)
      .then((res) => res.json())
      .then((data) => setTodos(data));
  }, []);

  async function handleAddTodo(e) {
    e.preventDefault();
    const form = new FormData(e.target);
    const todo = await fetch(apiUrl, {
      method: 'POST',
      body: JSON.stringify({ title: form.get('title'), completed: false }),
      headers: {
        'Content-type': 'application/json',
      },
    }).then((res) => res.json());

    setTodos([...todos, todo]);
    e.target.reset();
    titleRef.current.focus();
  }

  return (
    <>
      <h1>Todos</h1>
      <form onSubmit={handleAddTodo}>
        <p>
          <label htmlFor="title">What do you want to do?</label>
          <input type="text" name="title" id="title" ref={titleRef} />
        </p>
        <p>
          <button type="submit">Add Todo</button>
        </p>
      </form>
      <ul className={styles.todoList}>
        {todos?.map((todo) => (
          <TodoItem key={todo.id} todo={todo} />
        ))}
      </ul>
    </>
  );
}
