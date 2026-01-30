import BoardList from '../Boards/BoardList';

const Sidebar = ({ isOpen, boards, activeBoard, onSelectBoard, onBoardCreated, onBoardUpdated, onBoardDeleted }) => {
    return (
        <aside className={`sidebar ${isOpen ? 'open' : ''}`}>
            <BoardList
                boards={boards}
                activeBoard={activeBoard}
                onSelectBoard={onSelectBoard}
                onBoardCreated={onBoardCreated}
                onBoardUpdated={onBoardUpdated}
                onBoardDeleted={onBoardDeleted}
            />
        </aside>
    );
};

export default Sidebar;
