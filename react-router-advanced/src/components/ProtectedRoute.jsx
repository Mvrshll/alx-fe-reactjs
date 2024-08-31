import { Navigate } from 'react-router-dom';
import { useAuth } from '../AuthContext'; // Import the useAuth hook

const ProtectedRoute = ({ element }) => {
  const { isAuthenticated } = useAuth(); // Get authentication status

  return isAuthenticated ? element : <Navigate to="/" />;
};

export default ProtectedRoute;