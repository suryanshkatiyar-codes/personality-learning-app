import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

// This component acts as a GUARD for private pages
// It wraps around pages that require login
// Usage in App.jsx:
// <ProtectedRoute><Dashboard /></ProtectedRoute>

function ProtectedRoute({ children }) {

  // Get the current logged in user from AuthContext
  const { user } = useAuth();

  // If user is NOT logged in → redirect to login page
  // Navigate is like a automatic redirect from react-router-dom
  if (!user) {
    return <Navigate to="/login" />;
  }

  // If user IS logged in → show the page they wanted to visit
  return children;
}

export default ProtectedRoute;