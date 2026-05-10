import { TodoFilters, TodoInput } from "./components/FilterContext";
import { TodoProvider, useTodos } from "./components/ToDoContext";
import { TodoItem } from "./components/ToDoItem";
import "./App.css"


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
        <h1 style={{color: "blueviolet"}}>Todo App</h1>
        <TodoInput /><br />
        <TodoFilters /><br />
        <TodoList />
      </div>
    </TodoProvider>
  );
}
