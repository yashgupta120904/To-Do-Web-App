import { useState } from 'react';
import { updateBoard, deleteBoard } from '../../services/api';

const BoardItem = ({ board, isActive, onSelect, onUpdate, onDelete }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [name, setName] = useState(board.name);
    const [loading, setLoading] = useState(false);

    const handleUpdate = async () => {
        if (!name.trim() || name === board.name) {
            setIsEditing(false);
            setName(board.name);
            return;
        }

        setLoading(true);
        try {
            const response = await updateBoard(board._id, name.trim());
            onUpdate(response.data.board);
            setIsEditing(false);
        } catch (err) {
            console.error('Failed to update board:', err);
            setName(board.name);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async () => {
        if (!window.confirm('Delete this board and all its todos?')) {
            return;
        }

        setLoading(true);
        try {
            await deleteBoard(board._id);
            onDelete(board._id);
        } catch (err) {
            console.error('Failed to delete board:', err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className={`board-item ${isActive ? 'active' : ''}`}>
            {isEditing ? (
                <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    onBlur={handleUpdate}
                    onKeyDown={(e) => {
                        if (e.key === 'Enter') handleUpdate();
                        if (e.key === 'Escape') {
                            setIsEditing(false);
                            setName(board.name);
                        }
                    }}
                    autoFocus
                    disabled={loading}
                    className="board-edit-input"
                />
            ) : (
                <>
                    <div className="board-name" onClick={() => onSelect(board)}>
                        {board.name}
                    </div>
                    <div className="board-actions">
                        <button
                            onClick={() => setIsEditing(true)}
                            className="btn-icon"
                            title="Rename"
                            disabled={loading}
                        >
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                            </svg>
                        </button>
                        <button
                            onClick={handleDelete}
                            className="btn-icon btn-danger"
                            title="Delete"
                            disabled={loading}
                        >
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                        </button>
                    </div>
                </>
            )}
        </div>
    );
};

export default BoardItem;
