import "./App.css";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import {AuthProvider} from "./context/AuthContext";
import ProtectedRoute from './components/ProtectedRoute';
import Login from "./components/login";
import React, {useEffect} from "react";
import LandingPage from "./components/LandingPage";
import Signup from "./components/Signup";
import HomePage from "./components/HomePage";

const App: React.FC = () => {

  useEffect(() => {
    document.title = 'Phinder Inventories';
  }, []);

  return (
      <AuthProvider>
        <Router>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/home" element={<ProtectedRoute component={HomePage} path={"/home"} />} />
          </Routes>
        </Router>
      </AuthProvider>
  );
};

export default App;
