import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';

/**
 * A component that guards its children from being accessed by unauthenticated users.
 * 
 * If the user is not authenticated (determined by the absence of a token in sessionStorage),
 * it redirects to the homepage. If the user is authenticated, it renders the child components.
 * This component is typically used to wrap around routes that should only be accessible
 * after logging in.
 * 
 * @param {Object} props - The component props.
 * @param {React.ReactNode} props.children - The children components to render if authenticated.
 * @returns {React.ReactElement} Either a redirection to the login page or the child components.
 */
const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useContext(AuthContext);

  // Check if user is authenticated
  if (!isAuthenticated) {
    // If not authenticated, redirect to the login page
    return <Navigate to="/login" />;
  }

  // If authenticated, render the child component
  return children;
};

export default ProtectedRoute;

