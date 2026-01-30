import { useState } from 'react';
import { createBoard } from '../../services/api';

const CreateBoard = ({ onBoardCreated }) => {
    const [name, setName] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        if (!name.trim()) {
            return setError('Board name is required');
        }

        setLoading(true);

        try {
            const response = await createBoard(name.trim());
            setName('');
            onBoardCreated(response.data.board);
        } catch (err) {
            setError(err.response?.data?.error || 'Failed to create board');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="create-board">
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="New board name..."
                    disabled={loading}
                />
                <button type="submit" className="btn btn-primary btn-sm" disabled={loading}>
                    {loading ? 'Creating...' : 'Add Board'}
                </button>
            </form>
            {error && <div className="error-text">{error}</div>}
        </div>
    );
};

export default CreateBoard;
