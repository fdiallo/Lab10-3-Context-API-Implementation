import { useState } from "react";
import { useTodos } from "./ToDoContext";

export const TodoInput = () => {
    const [text, setText] = useState('');
    const { addTodo, toggleTheme, darkMode } = useTodos();

    const handleSubmit = (e: { preventDefault: () => void; }) => {
        e.preventDefault();
        if (!text.trim()) return;
        addTodo(text);
        setText('');
    };

    return (
        <form onSubmit={handleSubmit}>

            <button type="button" onClick={toggleTheme}>
                {darkMode ? '☀️ Light' : '🌙 Dark'}
            </button>  <br />  <br />
            <input style={{ marginRight: "20px" }}
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="What needs to be done?"
            />
            <button type="submit">Add Todo</button>

        </form>
    );
};

/**
 * Buttons to switch between All, Active, and Completed
 */
export const TodoFilters = () => {
    const { filter, setFilter, remainingCount } = useTodos();
    return (
        <div>
            <button style={{ marginRight: "20px" }} onClick={() => setFilter('all')} disabled={filter === 'all'}>All</button>
            <button style={{ marginRight: "20px" }} onClick={() => setFilter('active')} disabled={filter === 'active'}>Active</button>
            <button onClick={() => setFilter('completed')} disabled={filter === 'completed'}>Completed</button>
            <span style={{ marginLeft: "20px" }}>Items left: {remainingCount}</span>
        </div>
    );
};
