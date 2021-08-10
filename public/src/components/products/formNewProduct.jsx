import axios from "axios";
import React from "react";
import { useHistory } from 'react-router-dom';
import swal from 'sweetalert';
import '../../App.css';
export default function Productnew(){
    
  // Defino los estados de cada uno de los inputs del formulario
  const [nombre, setNombre] = React.useState("");
  const [descripcion, setDescripcion] = React.useState("");
  const [codigo, setCodigo] = React.useState("");
  const [foto, setFoto] = React.useState("");
  const [precio, setPrecio] = React.useState("");
  const [stock, setStock] = React.useState("");
  const history = useHistory();
  // creo una funcion para guardar los datos del usuario ingresa en el formulario
  const handleSave = async () => {
  // guardo en una constante las propiedades a enviar del formulario
    const body = {
            nombre:nombre,
            descripcion:descripcion,
            codigo:codigo,
            foto:foto,
            precio:precio,
            stock:stock
    };
    try {
    // compruebo que se ingresen todos los datos
      if (body.nombre.trim()===""|| body.descripcion.trim()===""||body.codigo.trim()===""||body.foto.trim()===""||
      body.precio.trim()===""||body.stock.trim()===""){
        swal({
          title:"Error: ",
          text: "faltan llenar campos",
          icon:"warning",
          buttons:["continuar",0]})
      .then(()=>{
          return;
      })
      }
     const respuesta = await axios.post("/productos/agregar", body);
      if (respuesta.status === 200) {
        history.push("/products/saved/"+respuesta.data.id+"/"+respuesta.data.nombre); 
        
      }
  
    } catch (e) {
      
      swal({
        title:"Error: ",
        text: e.response.data.error,
        icon:"warning",
        buttons:["volver",0]})
    .then(()=>{
        return;
    })      
    }
  };

    return (
        <div>
          <div className="card">
            <div className="card-body card-gender-new">
            <h5 className="card-title">Agregar Producto</h5>
            <input type="text" name="nombre" placeholder="nombre" className="form-control" onChange={(e) => {
                setNombre(e.target.value);
              }}
            />
            <input type="text" name="descripcion" placeholder="descripcion" className="form-control" onChange={(e) => {
                setDescripcion(e.target.value);
              }}
            />
            <input type="text" name="codigo" placeholder="codigo" className="form-control" onChange={(e) => {
                setCodigo(e.target.value);
              }}
            />
            <input type="text" name="foto" placeholder="foto" className="form-control" onChange={(e) => {
                setFoto(e.target.value);
              }}
            />
            <input type="number" name="precio" placeholder="precio" className="form-control" onChange={(e) => {
                setPrecio(e.target.value);
              }}
            />
            <input type="number" name="stock" placeholder="stock" className="form-control" onChange={(e) => {
                setStock(e.target.value);
              }}
            />
            <button className="btn btn-primary" onClick={handleSave}>Enviar</button>
          </div>
        </div>
        </div>
      );

        
  
}