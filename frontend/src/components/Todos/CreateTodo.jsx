import { useState } from 'react';
import { createTodo } from '../../services/api';

const CreateTodo = ({ boardId, onTodoCreated }) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [showForm, setShowForm] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        if (!title.trim()) {
            return setError('Todo title is required');
        }

        setLoading(true);

        try {
            const response = await createTodo(boardId, {
                title: title.trim(),
                description: description.trim(),
            });
            setTitle('');
            setDescription('');
            setShowForm(false);
            onTodoCreated(response.data.todo);
        } catch (err) {
            setError(err.response?.data?.error || 'Failed to create todo');
        } finally {
            setLoading(false);
        }
    };

    if (!showForm) {
        return (
            <button className="btn btn-primary add-todo-btn" onClick={() => setShowForm(true)}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
                Add Todo
            </button>
        );
    }

    return (
        <div className="create-todo">
            <form onSubmit={handleSubmit}>
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
                    placeholder="Description (optional)..."
                    disabled={loading}
                    rows="3"
                />
                {error && <div className="error-text">{error}</div>}
                <div className="form-actions">
                    <button type="submit" className="btn btn-primary btn-sm" disabled={loading}>
                        {loading ? 'Creating...' : 'Add Todo'}
                    </button>
                    <button
                        type="button"
                        className="btn btn-secondary btn-sm"
                        onClick={() => {
                            setShowForm(false);
                            setTitle('');
                            setDescription('');
                            setError('');
                        }}
                        disabled={loading}
                    >
                        Cancel
                    </button>
                </div>
            </form>
        </div>
    );
};

export default CreateTodo;
