import { useState, useEffect } from 'react';
import Header from './Header';
import Sidebar from './Sidebar';
import TodoList from '../Todos/TodoList';
import { getBoards, getTodos } from '../../services/api';

const MainLayout = () => {
    const [boards, setBoards] = useState([]);
    const [activeBoard, setActiveBoard] = useState(null);
    const [todos, setTodos] = useState([]);
    const [sidebarOpen, setSidebarOpen] = useState(true);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadBoards();
    }, []);

    useEffect(() => {
        if (activeBoard) {
            loadTodos(activeBoard._id);
        } else {
            setTodos([]);
        }
    }, [activeBoard]);

    const loadBoards = async () => {
        try {
            const response = await getBoards();
            setBoards(response.data.boards);
            if (response.data.boards.length > 0 && !activeBoard) {
                setActiveBoard(response.data.boards[0]);
            }
        } catch (err) {
            console.error('Failed to load boards:', err);
        } finally {
            setLoading(false);
        }
    };

    const loadTodos = async (boardId) => {
        try {
            const response = await getTodos(boardId);
            setTodos(response.data.todos);
        } catch (err) {
            console.error('Failed to load todos:', err);
        }
    };

    const handleBoardCreated = (newBoard) => {
        setBoards([newBoard, ...boards]);
        setActiveBoard(newBoard);
    };

    const handleBoardUpdated = (updatedBoard) => {
        setBoards(boards.map(b => b._id === updatedBoard._id ? updatedBoard : b));
        if (activeBoard?._id === updatedBoard._id) {
            setActiveBoard(updatedBoard);
        }
    };

    const handleBoardDeleted = (boardId) => {
        setBoards(boards.filter(b => b._id !== boardId));
        if (activeBoard?._id === boardId) {
            setActiveBoard(boards.length > 1 ? boards.find(b => b._id !== boardId) : null);
        }
    };

    const handleTodoCreated = (newTodo) => {
        setTodos([newTodo, ...todos]);
    };

    const handleTodoUpdated = (updatedTodo) => {
        setTodos(todos.map(t => t._id === updatedTodo._id ? updatedTodo : t));
    };

    const handleTodoDeleted = (todoId) => {
        setTodos(todos.filter(t => t._id !== todoId));
    };

    if (loading) {
        return (
            <div className="loading-container">
                <div className="spinner"></div>
            </div>
        );
    }

    return (
        <div className="app-container">
            <Header onToggleSidebar={() => setSidebarOpen(!sidebarOpen)} />

            <div className="app-main">
                <Sidebar
                    isOpen={sidebarOpen}
                    boards={boards}
                    activeBoard={activeBoard}
                    onSelectBoard={setActiveBoard}
                    onBoardCreated={handleBoardCreated}
                    onBoardUpdated={handleBoardUpdated}
                    onBoardDeleted={handleBoardDeleted}
                />

                <main className="app-content">
                    <TodoList
                        board={activeBoard}
                        todos={todos}
                        onTodoCreated={handleTodoCreated}
                        onTodoUpdated={handleTodoUpdated}
                        onTodoDeleted={handleTodoDeleted}
                    />
                </main>
            </div>

            {sidebarOpen && <div className="sidebar-overlay" onClick={() => setSidebarOpen(false)} />}
        </div>
    );
};

export default MainLayout;
