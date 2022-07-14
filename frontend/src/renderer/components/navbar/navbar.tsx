import React from 'react';
import logo from './logo.png';
import { Link } from 'react-router-dom';

export const Navbar = () => {
  return (
    <nav className="navbar">
      <Link to="/" className="navbar__logo">
        <img src={logo} alt="LOGO" />
        <h2 className="navbar__title">
          Comercializadora de Productos Agricolas
        </h2>
      </Link>
    </nav>
  );
};
