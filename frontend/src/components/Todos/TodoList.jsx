import TodoItem from './TodoItem';
import CreateTodo from './CreateTodo';

const TodoList = ({ board, todos, onTodoCreated, onTodoUpdated, onTodoDeleted }) => {
    if (!board) {
        return (
            <div className="todo-list-container">
                <div className="empty-state-large">
                    <svg width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                    </svg>
                    <h2>Select a board</h2>
                    <p>Choose a board from the sidebar to view and manage todos</p>
                </div>
            </div>
        );
    }

    return (
        <div className="todo-list-container">
            <div className="todo-list-header">
                <h1>{board.name}</h1>
                <p className="todo-count">
                    {todos.length} {todos.length === 1 ? 'todo' : 'todos'}
                    {todos.filter(t => t.completed).length > 0 &&
                        ` • ${todos.filter(t => t.completed).length} completed`
                    }
                </p>
            </div>

            <CreateTodo boardId={board._id} onTodoCreated={onTodoCreated} />

            <div className="todos">
                {todos.length === 0 ? (
                    <div className="empty-state">
                        <p>No todos yet. Add one to get started!</p>
                    </div>
                ) : (
                    todos.map((todo) => (
                        <TodoItem
                            key={todo._id}
                            todo={todo}
                            onUpdate={onTodoUpdated}
                            onDelete={onTodoDeleted}
                        />
                    ))
                )}
            </div>
        </div>
    );
};

export default TodoList;
