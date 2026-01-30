import { useAuth } from '../../context/AuthContext';

const Header = ({ onToggleSidebar }) => {
    const { currentUser, logout } = useAuth();

    const handleLogout = async () => {
        try {
            await logout();
        } catch (err) {
            console.error('Logout failed:', err);
        }
    };

    return (
        <header className="app-header">
            <button className="menu-toggle" onClick={onToggleSidebar}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
            </button>

            <div className="header-title">
                <h1>Board Todo</h1>
            </div>

            <div className="header-user">
                <span className="user-email">{currentUser?.email}</span>
                <button onClick={handleLogout} className="btn btn-secondary btn-sm">
                    Logout
                </button>
            </div>
        </header>
    );
};

export default Header;
