import { createContext, useContext, useEffect, useState } from "react";
import API from "../api/axios";

// Step 1: Create the context
// Think of this as an empty box that will hold all auth data
const AuthContext = createContext();

// Step 2: Create the Provider component
// This component WRAPS your entire app and gives every page access to auth data
export function AuthProvider({ children }) {

  // These are the 3 things we store globally
  const [user, setUser] = useState(null);       // logged in user's info
  const [token, setToken] = useState(null);     // JWT token
  const [loading, setLoading] = useState(true); // is app still checking login status?

  // Step 3: When app first loads, check if user was already logged in
  // This runs ONCE when the app starts
  useEffect(() => {
    const savedToken = localStorage.getItem("token");

    if (savedToken) {
      // Token found! Set it in state
      setToken(savedToken);

      // Now fetch the user's profile using that token
      fetchUser();
    } else {
      // No token found, user is not logged in
      setLoading(false);
    }
  }, []); // ← empty array means run once on app start

  // Helper function to fetch user profile from backend
  const fetchUser = async () => {
    try {
      const response = await API.get("/api/user/profile");
      setUser(response.data.user); // save user info in state
    } catch (err) {
      // Token might be expired or invalid
      // Clear everything and start fresh
      localStorage.removeItem("token");
      setUser(null);
      setToken(null);
    } finally {
      // Whether success or fail, we're done loading
      setLoading(false);
    }
  };

  // Register function - called when user submits register form
  const register = async (username, email, password) => {
    try {
      const response = await API.post("/api/auth/register", {
        username,
        email,
        password,
      });

      const { token, user } = response.data;

      // Save token to localStorage so it persists after page refresh
      localStorage.setItem("token", token);

      // Save to state so app knows user is logged in right now
      setToken(token);
      setUser(user);

      return { success: true };
    } catch (err) {
      // Return the error message so the form can display it
      return { 
        success: false, 
        message: err.response?.data?.message || "Registration failed" 
      };
    }
  };

  // Login function - called when user submits login form
  const login = async (email, password) => {
    try {
      const response = await API.post("/api/auth/login", {
        email,
        password,
      });

      const { token, user } = response.data;

      // Same as register - save token and user
      localStorage.setItem("token", token);
      setToken(token);
      setUser(user);

      return { success: true };
    } catch (err) {
      return { 
        success: false, 
        message: err.response?.data?.message || "Login failed" 
      };
    }
  };

  // Logout function - clears everything
  const logout = () => {
    localStorage.removeItem("token"); // remove from localStorage
    setUser(null);                    // clear user from state
    setToken(null);                   // clear token from state
  };

  // Step 4: Everything we want to share with the entire app
  const value = {
    user,
    token,
    loading,
    register,
    login,
    logout,
  };

  // Step 5: While checking login status show nothing
  // This prevents pages from flashing before we know if user is logged in
  if (loading) {
    return <div>Loading...</div>;
  }

  // Step 6: Wrap children with the context provider
  // Every page inside this will have access to the value above
  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

// Step 7: Custom hook so pages can easily use the context
// Instead of writing useContext(AuthContext) every time
// you just write useAuth()
export function useAuth() {
  return useContext(AuthContext);
}