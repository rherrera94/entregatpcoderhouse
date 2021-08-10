
export default function Product(propiedades){
return(
 
      <div className="datos">
        <div className=" text">
            id: {propiedades.unProducto.id}<br/>
            nombre: {propiedades.unProducto.nombre}<br/>
            descripcion: {propiedades.unProducto.descripcion}<br/>
            precio: {propiedades.unProducto.precio}
        </div>
    </div>
)
}

