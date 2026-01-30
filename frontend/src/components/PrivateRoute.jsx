import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const PrivateRoute = ({ children }) => {
    const { currentUser } = useAuth();

    if (!currentUser) {
        return <Navigate to="/login" />;
    }

    if (!currentUser.emailVerified) {
        return <Navigate to="/verify-email" />;
    }

    return children;
};

export default PrivateRoute;
