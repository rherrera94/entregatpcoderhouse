import axios from "axios";
import React from "react";
import Product from './cardProduct';
import Productnew from './formNewProduct';


export default function Productos() {
  const [error, setError] = React.useState("no");
  const [productos, setProductos] = React.useState([]);

  
/**
 *  Cada vez que se llame a ésta funcion, la misma me devolvera el listado de productos
 * existentes en la base de datos. De generarse algun error lo mostrará por pantalla.
 */

  function ListadeProductos(){
    const listadoProducto = async () => {
      try {

        const respuesta = await axios.get("/productos/listar");
        setProductos(respuesta.data);
        setError("no")
      } catch (e) {
        if(e.response.data.error==='no hay productos cargados'){
          // esto lo que hace es que al no encontrar ningun producto actualizo el state de productos para que sepa que no hay.
          setProductos([]);
        }
        setError(e.response.data.error);//error proveniente del backend
      }
    };
    listadoProducto();
  }

  React.useEffect(() => {
     ListadeProductos();
  }, []);


/** 
 * Ésta función lo que hace es borrar el producto de numero de id que se recibe por parametros.
 * a su vez despues de borrar es producto muestra por pantalla el listado actualizado de productos,
 * llamando a la funcion ListadeProductos() 
*/

  function borrador(id) {
    const borradoProducts = async () => {
      try {
        await axios.delete("/productos/borrar/" + id);
        ListadeProductos();
      } catch (e) {
        setError(e.response.data.error);
      }
    };
    borradoProducts();
  }
     
/***********************************************************************************************/
/* Aca comienza lo que se mostrará por pantalla. Según lo que me haya ido tirando el backend   */    
/***********************************************************************************************/

if (error === "no") {
      //aca entra si no hubo error 
return (
        <div className="flex-container">
            <div className="col-md"></div>
            <div className="col-md-3">
              {productos.map((unProducto, index) => {
                      return (
                        <div key={index}>
                        <div className="col-md-10">
                          <div className="card">
                            <div className="card-body card-gender-new">
                              <Product unProducto={unProducto} index={index}/>   
                            </div>
                            <div className="card-footer">
                              <div className="btn-group" role="group" aria-label="Basic Example">
                              <button type="button" className="btn btn-primary" onClick={() => borrador(unProducto.id) }>Borrar</button>            
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>         
                      );
              })}
              </div>
              <div className="col-md"></div>
              <div className="col-md-4">
                <div className="col-md-6">
                    <div className="formulario-agregar-genero">
                        <Productnew/>
                    </div>
                </div>
              </div>
              
            </div>
        
        
      )       
    } else {
      //en el caso de que haya habido algun tipo de error enviado por el backend me lo va a mostrar
      return (
        <div className="flex-container">
          <div>  
              <div className="col-sm">
                <div className="card">
                  <div className="card-body">
                    <h5 className="card-title">Error {error}</h5>        
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-4">
                <div className="col-md-6">
                    <div className="formulario-agregar-genero">
                        <Productnew/>
                    </div>
                </div>
              </div>
        </div>
      )
    }   
}
