import React from "react";
import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/products">
          Carrito de compras
        </Link>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ml-auto">
            <li className="nav-item">
            <Link className="nav-link" to="/products">Productos</Link>
            </li>
            <li className="nav-item">
            <Link className="nav-link" to="/carrito">Carrito</Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
