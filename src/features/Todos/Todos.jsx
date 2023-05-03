import { useEffect, useRef, useState } from 'react';
import styles from './Todos.module.css';
import { TodoItem } from './TodoItem';
import { replaceItemInArray } from '~/helpers/arrayHelpers';
import { configureApi } from '~/helpers/apiHelper';
import { useLocalStorageState } from '~/hooks';
import { useAuth } from '..';

const { retrieve, create, remove, update } = configureApi('todos');

export function Todos() {
  const [todos, setTodos] = useState(null);
  const titleRef = useRef();
  const { accessToken, user } = useAuth();

  useEffect(() => {
    retrieve('', `userId=${user.id}`, { accessToken }).then((data) =>
      setTodos(data)
    );
  }, [setTodos, accessToken, user]);

  async function handleAddTodo(e) {
    e.preventDefault();
    const form = new FormData(e.target);
    const todo = await create(
      { title: form.get('title'), completed: false, userId: user.id },
      { accessToken }
    );

    setTodos([...todos, todo]);
    e.target.reset();
    titleRef.current.focus();
  }

  async function handleDeleteTodo(todo) {
    if (
      !window.confirm(
        `Are you sure you want to delete this todo: "${todo.title}"?`
      )
    ) {
      return false;
    }

    await remove(todo.id, { accessToken });
    setTodos(todos.filter((t) => t !== todo));
  }

  async function handleCompleteTodo(todo) {
    const origTodos = [...todos];
    const newTodos = replaceItemInArray(todos, todo, {
      ...todo,
      completed: !todo.completed,
    });
    setTodos(newTodos);

    try {
      await update(todo.id, { completed: !todo.completed }, { accessToken });
    } catch (e) {
      console.warn(e);
      setTodos(origTodos);
    }
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
          <TodoItem
            key={todo.id}
            todo={todo}
            onDelete={handleDeleteTodo}
            onComplete={handleCompleteTodo}
          />
        ))}
      </ul>
    </>
  );
}
