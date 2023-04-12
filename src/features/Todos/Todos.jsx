export function Todos() {
  const todos = [
    { title: 'Learn React again', id: 2 },
    { title: 'Buy Milk', id: 1 },
  ];

  // const render = [];
  // for(const todo of todos) {
  //   render.push(<li>{todo.title}</li>);
  // }

  return (
    <>
      <h1>Todos</h1>
      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>{todo.title}</li>
        ))}
      </ul>
    </>
  );
}
