import { useState } from 'react';
import { updateTodo, deleteTodo } from '../../services/api';

const TodoItem = ({ todo, onUpdate, onDelete }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [title, setTitle] = useState(todo.title);
    const [description, setDescription] = useState(todo.description);
    const [loading, setLoading] = useState(false);

    const handleToggleComplete = async () => {
        setLoading(true);
        try {
            const response = await updateTodo(todo._id, { completed: !todo.completed });
            onUpdate(response.data.todo);
        } catch (err) {
            console.error('Failed to update todo:', err);
        } finally {
            setLoading(false);
        }
    };

    const handleUpdate = async () => {
        if (!title.trim()) {
            setTitle(todo.title);
            setIsEditing(false);
            return;
        }

        if (title === todo.title && description === todo.description) {
            setIsEditing(false);
            return;
        }

        setLoading(true);
        try {
            const response = await updateTodo(todo._id, {
                title: title.trim(),
                description: description.trim(),
            });
            onUpdate(response.data.todo);
            setIsEditing(false);
        } catch (err) {
            console.error('Failed to update todo:', err);
            setTitle(todo.title);
            setDescription(todo.description);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async () => {
        if (!window.confirm('Delete this todo?')) {
            return;
        }

        setLoading(true);
        try {
            await deleteTodo(todo._id);
            onDelete(todo._id);
        } catch (err) {
            console.error('Failed to delete todo:', err);
        } finally {
            setLoading(false);
        }
    };

    if (isEditing) {
        return (
            <div className="todo-item editing">
                <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Todo title..."
                    disabled={loading}
                    autoFocus
                />
                <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Description..."
                    disabled={loading}
                    rows="3"
                />
                <div className="todo-actions">
                    <button onClick={handleUpdate} className="btn btn-primary btn-sm" disabled={loading}>
                        Save
                    </button>
                    <button
                        onClick={() => {
                            setIsEditing(false);
                            setTitle(todo.title);
                            setDescription(todo.description);
                        }}
                        className="btn btn-secondary btn-sm"
                        disabled={loading}
                    >
                        Cancel
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className={`todo-item ${todo.completed ? 'completed' : ''}`}>
            <div className="todo-checkbox">
                <input
                    type="checkbox"
                    checked={todo.completed}
                    onChange={handleToggleComplete}
                    disabled={loading}
                />
            </div>
            <div className="todo-content">
                <h3 className="todo-title">{todo.title}</h3>
                {todo.description && <p className="todo-description">{todo.description}</p>}
            </div>
            <div className="todo-actions">
                <button
                    onClick={() => setIsEditing(true)}
                    className="btn-icon"
                    title="Edit"
                    disabled={loading}
                >
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                    </svg>
                </button>
                <button
                    onClick={handleDelete}
                    className="btn-icon btn-danger"
                    title="Delete"
                    disabled={loading}
                >
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                </button>
            </div>
        </div>
    );
};

export default TodoItem;
