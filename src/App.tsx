import { TodoProvider, useTodos } from "./components/ToDoContext";
import { TodoItem } from "./components/ToDoItem";


const TodoList = () => {
  const { todos, filter } = useTodos();
  
  const filteredTodos = todos.filter(t => {
    if (filter === 'active') return !t.completed;
    if (filter === 'completed') return t.completed;
    return true;
  });

  return (
    <ul>
      {filteredTodos.map(todo => <TodoItem key={todo.id} todo={todo} />)}
    </ul>
  );
};

export default function App() {
  return (
    <TodoProvider>
      <div className="container">
        <h1>Todo App</h1>
        <TodoList />
      </div>
    </TodoProvider>
  );
}
