import React from 'react';
import {BrowserRouter as Router, Route} from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css"
import './App.css';


//todos los componentes importados.
import Navbar from './components/navbar';
import Productos from './components/products/productos';
import Carrito from './components/carrito/carrito';
import Productsaved from './components/products/productSaved';
import Productsavedc from './components/carrito/productSaved';
// function madre donde desde aca vamos a cada ruta de componente.
function App() {
  return (
    <Router>
      <Navbar></Navbar>
      <Route exact path="/products" component = {Productos} />
      <Route exact path="/carrito" component = {Carrito} />
      <Route exact path="/products/saved/:id/:nombre" component={Productsaved}/>
      <Route exact path="/carrito/saved/:id/:nombre" component={Productsavedc}/>
    </Router>
  );
}

export default App;
