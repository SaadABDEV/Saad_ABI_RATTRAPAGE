import React from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/images/Logo_HETIC.png";

export default function Nav() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/connexion");
  };

  return (
    <nav className="nav">
      <div className="nav__links">
        <Link to="/">
          <img src={logo} alt="Logo" className="nav__logo" />
        </Link>
        <Link to="/formations" className="nav__link">Formations</Link>
        <Link to="/contact" className="nav__link">Contact</Link>
      </div>
      <div className="nav__spacer"></div>
      <div className="nav__links">
        {token ? (
          <>
            <Link to="/admin" className="nav__admin-link">Admin</Link>
            <button className="nav__logout" onClick={handleLogout}>
              Déconnexion
            </button>
          </>
        ) : (
          <Link to="/connexion" className="nav__login-link">Connexion</Link>
        )}
      </div>
    </nav>
  );
}