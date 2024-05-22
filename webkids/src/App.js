import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer/Footer";
import Login from "./components/Login/Login";
import Register from "./components/Register/Register";

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <div className="content">
          <Routes>
            <Route path="/" element={<div>Home Content</div>} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            {/* Weitere Routen hier hinzufügen */}
          </Routes>
        </div>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
