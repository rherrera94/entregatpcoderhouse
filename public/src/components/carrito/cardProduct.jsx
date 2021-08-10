
export default function Product(propiedades){
return(
 
      <div className="datos">
        <div className=" text">
            id: {propiedades.unProducto.id}<br/>
            nombre: {propiedades.unProducto.producto.nombre}<br/>
            descripcion: {propiedades.unProducto.producto.descripcion}<br/>
            precio: {propiedades.unProducto.producto.precio}
        </div>
    </div>
)
}

