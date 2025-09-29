import React from "react";
import { Routes, Route } from "react-router-dom";
import Nav from "./components/Nav";
import Home from "./pages/Home";
import Formations from "./pages/Formations";
import FormationDetail from "./pages/FormationDetail";
import Login from "./pages/Login";
import Contact from "./pages/Contact";
import Admin from "./pages/Admin";

function App() {
  return (
    <div>
      <Nav />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/formations" element={<Formations />} />
        <Route path="/formations/:slug" element={<FormationDetail />} />
        <Route path="/connexion" element={<Login />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/admin" element={<Admin />} />
      </Routes>
    </div>
  );
}

export default App;