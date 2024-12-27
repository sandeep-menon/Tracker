import "./App.css";
import Navbar from "./components/navbar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./routes/Home";
import SignInSignUp from "./routes/SignInSignUp";
import Dashboard from "./routes/Dashboard";
import { Toaster } from "./components/ui/toaster";
import { AuthProvider } from "./AuthContext";
import { ProtectedRoute } from "./ProtectedRoute";

function App() {
  return (
    <Router>
      <AuthProvider>
        <MainContent />
      </AuthProvider>
    </Router>
  );
}
function MainContent() {
  return (
    <>
      <header className="sticky top-0 z-50">
        <Navbar />
      </header>
      <main className="flex mx-auto justify-center items-center max-w-screen-lg p-4">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<SignInSignUp />} />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
        </Routes>
      </main>
      <Toaster />
    </>
  );
}

export default App;
