import { useState } from "react";
import type { Todo } from "../types";
import { useTodos } from "./ToDoContext";

/**
 * Built-in state for inline editing and deleting of todos
 */
export const TodoItem = ({ todo }: { todo: Todo }) => {
    const { toggleTodo, deleteTodo, editTodo } = useTodos();
    const [isEditing, setIsEditing] = useState(false);
    const [editText, setEditText] = useState(todo.text);

    const handleSave = () => {
        editTodo(todo.id, editText);
        setIsEditing(false);
    };

    return (
        <li style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}>
            <input type="checkbox" checked={todo.completed} onChange={() => toggleTodo(todo.id)} />

            {isEditing ? (
                <input value={editText} onChange={(e) => setEditText(e.target.value)} onBlur={handleSave} autoFocus />
            ) : (
                <span>{todo.text}</span>
            )}

            <button onClick={() => setIsEditing(!isEditing)}>{isEditing ? 'Save' : 'Edit'}</button>
            <button onClick={() => deleteTodo(todo.id)}>Delete</button>
        </li>
    );
};
