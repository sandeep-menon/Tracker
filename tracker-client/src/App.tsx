import "./App.css";
import Navbar from "./components/navbar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./routes/Home";
import SignInSignUp from "./routes/SignInSignUp";
import Dashboard from "./routes/Dashboard";
import { Toaster } from "./components/ui/toaster";
import { AuthProvider } from "./AuthContext";
import { ProtectedRoute } from "./ProtectedRoute";
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query';
import Layout from "./components/layout/Layout";
import { useUserStore } from "./store/user";
import Projects from "./routes/Projects";
import Assigned from "./routes/Assigned";
const queryClient = new QueryClient();

function App() {

  return (
    <Router>
      <AuthProvider>
        <QueryClientProvider client={queryClient}>
          <MainContent />
        </QueryClientProvider>
      </AuthProvider>
    </Router>
  );
}
function MainContent() {
  const isLoggedIn = useUserStore((state) => state.isLoggedIn);

  return (
    <>
      <header className="sticky top-0 z-50">
        <Navbar />
      </header>
      <main className="">
        {isLoggedIn ? (
          <Layout>
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
              <Route
                path="/projects"
                element={
                  <ProtectedRoute>
                    <Projects />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/assigned"
                element={
                  <ProtectedRoute>
                    <Assigned />
                  </ProtectedRoute>
                }
              />
            </Routes>
          </Layout>
        ) : (
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<SignInSignUp />} />
          </Routes>
        )}



      </main>
      <Toaster />
    </>
  );
}

export default App;
