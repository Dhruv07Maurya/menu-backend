import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Signup from "./components/Signup";
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";
import "./App.css";
import Navbar from "./components/Navbar";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children, logged }) => {
  if (!logged) {
    return <Navigate to="/login" />;
  }
  return children;
};

const App = () => {
  const [logged, setLogged] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setLogged(true);
    } else {
      setLogged(false);
    }
  }, []);

  return (
    <Router>
      <Navbar logged={logged} setLogged={setLogged} />
      <Routes>
        {!logged && <Route path="/" element={<Signup />} />}
        {!logged && (
          <Route path="/login" element={<Login setLogged={setLogged} />} />
        )}

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute logged={logged}>
              <Dashboard logged={logged} setLogged={setLogged} />
            </ProtectedRoute>
          }
        />

        {logged && (
          <Route path="/login" element={<Navigate to="/dashboard" />} />
        )}
        {logged && <Route path="/" element={<Navigate to="/dashboard" />} />}
      </Routes>
    </Router>    
  );
};

export default App;
