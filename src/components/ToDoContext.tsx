import { createContext, useContext, useState, useEffect } from 'react';
import type { FilterType, Todo, TodoContextType } from '../types';


const TodoContext = createContext<TodoContextType | undefined>(undefined);

export const TodoProvider = ({ children }) => {
  const [todos, setTodos] = useState<Todo[]>(() => {
    const saved = localStorage.getItem('todos');
    return saved ? JSON.parse(saved) : [];
  });
  
  const [filter, setFilter] = useState<FilterType>('all');
  const [darkMode, setDarkMode] = useState(() => {
    const savedTheme = localStorage.getItem('theme');
    return savedTheme === 'dark';
  });

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  useEffect(() => {
    localStorage.setItem('theme', darkMode ? 'dark' : 'light');
    document.body.className = darkMode ? 'dark-mode' : 'light-mode';
  }, [darkMode]);

  const addTodo = (text: string) => {
    const newTodo = { id: crypto.randomUUID(), text, completed: false };
    setTodos([...todos, newTodo]);
  };

  const deleteTodo = (id: string) => setTodos(todos.filter(t => t.id !== id));

  const toggleTodo = (id: string) => {
    setTodos(todos.map(t => t.id === id ? { ...t, completed: !t.completed } : t));
  };

  const editTodo = (id: string, newText: string) => {
    setTodos(todos.map(t => t.id === id ? { ...t, text: newText } : t));
  };

  const remainingCount = todos.filter(t => !t.completed).length;

  const toggleTheme = () => setDarkMode(!darkMode);

  return (
    <TodoContext.Provider value={{ 
      todos, filter, darkMode, addTodo, deleteTodo, 
      toggleTodo, editTodo, setFilter, toggleTheme, remainingCount 
    }}>
      {children}
    </TodoContext.Provider>
  );
};

export const useTodos = () => {
  const context = useContext(TodoContext);
  if (!context) throw new Error("useTodos must be used within TodoProvider");
  return context;
};
