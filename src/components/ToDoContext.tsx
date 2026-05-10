import { createContext, useContext } from 'react';
import type { TodoContextType } from '../types';


const TodoContext = createContext<TodoContextType| undefined>(undefined);

export const useTodos = () => {
  const context = useContext(TodoContext);
  if (!context) throw new Error("useTodos must be used within a provider");
  return context;
};
