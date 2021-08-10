import React from 'react';
import {useParams,Link} from 'react-router-dom';

export default function Productsaved(){
    const params= useParams();
    return(
        <div className="flex-container">
            <div className="col-md"></div>
        <div className="col-md-3">
            <div className="card">
            <div className="card-body">
                <h5 className="card-title">El Producto ha sido ingresado a la base de datos correctamente</h5>   
                <p className="card-text"> Id: {params.id}</p>  
                <p className="card-text">   Producto: {params.nombre}</p>
                
            </div>
                <div className="card-footer card-gender-new">
                    <Link to="/products" className="btn btn-primary boton">Volver</Link>
                </div>
            </div>    
        </div>
        <div className="col-md"></div>
        </div>
    );
}
