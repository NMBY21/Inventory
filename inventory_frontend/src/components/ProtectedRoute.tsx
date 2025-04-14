import React, { useContext } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

interface ProtectedRouteProps {
  component: React.ComponentType<any>;
  path: string;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ component: Component, ...rest }) => {
  const authContext = useContext(AuthContext);

  if (!authContext) {
    throw new Error('AuthContext must be used within an AuthProvider');
  }

  const { authState, isLoggedIn } = authContext;
  const location = useLocation();

  return authState.isAuthenticated || isLoggedIn ? (
      <Component {...rest} />
  ) : (
      <Navigate to="/login" state={{ from: location }} />
  );
};

export default ProtectedRoute;
