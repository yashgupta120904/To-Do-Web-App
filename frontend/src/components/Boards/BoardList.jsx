import BoardItem from './BoardItem';
import CreateBoard from './CreateBoard';

const BoardList = ({ boards, activeBoard, onSelectBoard, onBoardCreated, onBoardUpdated, onBoardDeleted }) => {
    return (
        <div className="board-list">
            <div className="board-list-header">
                <h2>My Boards</h2>
            </div>

            <CreateBoard onBoardCreated={onBoardCreated} />

            <div className="boards">
                {boards.length === 0 ? (
                    <div className="empty-state">
                        <p>No boards yet. Create one to get started!</p>
                    </div>
                ) : (
                    boards.map((board) => (
                        <BoardItem
                            key={board._id}
                            board={board}
                            isActive={activeBoard?._id === board._id}
                            onSelect={onSelectBoard}
                            onUpdate={onBoardUpdated}
                            onDelete={onBoardDeleted}
                        />
                    ))
                )}
            </div>
        </div>
    );
};

export default BoardList;
