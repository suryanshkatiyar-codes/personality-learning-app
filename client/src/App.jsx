import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";

// Import all pages
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Quiz from "./pages/Quiz";
import Dashboard from "./pages/Dashboard";
import Roadmap from "./pages/Roadmap";
import Roadmaps from "./pages/Roadmaps"
import Generate from "./pages/Generate";
import Navbar from "./components/Navbar";

function App() {
  return (
    // Step 1: Wrap everything in AuthProvider
    // This gives EVERY page access to user, login, logout etc.
    <AuthProvider>
      {/* // Step 2: Wrap everything in Router
      // This enables navigation between pages */}
      <Router>
        <Navbar/>
        <Routes>

          {/* Public Routes - anyone can visit these */}
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* Protected Routes - only logged in users can visit */}
          {/* If not logged in → automatically redirected to /login */}
          <Route path="/quiz" element={
            <ProtectedRoute>
              <Quiz />
            </ProtectedRoute>
          } />

          <Route path="/dashboard" element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          } />

          <Route path="/roadmaps" element={
            <ProtectedRoute>
              <Roadmaps />
            </ProtectedRoute>
          } />

          <Route path="/roadmap/:id" element={
            <ProtectedRoute>
              <Roadmap />
            </ProtectedRoute>
          } />

          <Route path="/generate" element={
            <ProtectedRoute>
              <Generate />
            </ProtectedRoute>
          } />

        </Routes>
      </Router>

    </AuthProvider>
  );
}

export default App;


// ## How Routing Works
// ```
// User visits /dashboard
//       ↓
// Router matches the path
//       ↓
// ProtectedRoute checks if user is logged in
//       ↓
// Yes → shows Dashboard component
// No  → redirects to /login