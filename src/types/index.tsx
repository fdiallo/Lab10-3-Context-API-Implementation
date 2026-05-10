//Define ToDo type interface
export interface Todo {
  id: string;
  text: string;
  completed: boolean;
}

export interface TodoContextType {
  todos: Todo[];
  filter: FilterType;
  darkMode: boolean;
  addTodo: (text: string) => void;
  deleteTodo: (id: string) => void;
  toggleTodo: (id: string) => void;
  editTodo: (id: string, newText: string) => void;
  setFilter: (filter: FilterType) => void;
  toggleTheme: () => void;
  remainingCount: number;
}

export type FilterType = 'all' | 'active' | 'completed';
