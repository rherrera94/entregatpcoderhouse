const express= require('express');
const routerProductos=express.Router();
const isAdmin=require('../Middleware/funcionAdmin');
const listado=require ('../persistencia/Archivo');
/*
    devuelve el producto o productos
*/
routerProductos.get('/listar/:id?',async (req,res)=>{
    try{
        if(!req.params.id){
            let contenido= await listado.leer();
            if (contenido.length==0){
                throw new Error('no hay productos cargados')
            }
            res.json (contenido);
        }else{
            let contenido=await listado.buscar(req.params.id);
            if (contenido.length==0){
                throw new Error('Producto no encontrado');
            }
            res.json(contenido);
        }
        
    }catch(e){
        res.status(404).json ({"error": e.message});
    }
})

/*
 almacena el producto y devuelve el producto incorporado
*/
routerProductos.post('/agregar',isAdmin,async (req,res)=>{
//id, timestamp, nombre, descripcion, código, foto (url), precio, stock.   
    try{
        if (!req.body.nombre || !req.body.descripcion || !req.body.codigo || !req.body.foto 
            || !req.body.precio|| !req.body.stock){
            throw new Error ("debe rellenar todos los datos solicitados")
        }
        let d=new Date();
        let mes=d.getMonth();
        mes=mes+1;
        let fech=d.getDate()+"/"+mes+"/"+d.getFullYear()+" "+d.getHours()+":"+d.getMinutes()+":"+d.getSeconds();      
    
        let productoGuardar={
            "timestamp":fech,
            "nombre":req.body.nombre,
            "descripcion":req.body.descripcion,
            "codigo":req.body.codigo,
            "foto":req.body.foto,
            "precio":req.body.precio,
            "stock": req.body.stock
        };
        let resultado=await listado.guardar(productoGuardar);
        if (resultado.length==0){
            throw new Error("Error al guardar el archivo");
        }
        res.json(resultado);
    }catch(e){
        res.status(404).json({"error":e.message});
    }
})
/**
 * Modificar un producto segun su id
 */
routerProductos.put('/actualizar/:id',isAdmin,async(req,res)=>{
    try{
        //me fijo si el producto existe
        let producto=await listado.buscar(req.params.id);
        if (producto.length==0){
            throw new Error("El producto buscado no existe");
        }
        let d=new Date();
        let mes=d.getMonth();
        mes=mes+1;
        let fech=d.getDate()+"/"+mes+"/"+d.getFullYear()+" "+d.getHours()+":"+d.getMinutes()+":"+d.getSeconds();      
    
        let productoaModificar={
            "timestamp":fech,
            "nombre":req.body.nombre,
            "descripcion":req.body.descripcion,
            "codigo":req.body.codigo,
            "foto":req.body.foto,
            "precio":req.body.precio,
            "stock": req.body.stock,
            "id":req.params.id
        }
        let productoModificado=await listado.modificar(productoaModificar);
        if (productoModificado.length==0){
            throw new Error("Se ha producido un error al modificar el producto");
        }else{
            res.json(productoModificado);
        }

    }catch(e){
        res.status(404).send({"error": e.message});
    }    
})
/**
 * Elimina el producto
 */
 routerProductos.delete('/borrar/:id',isAdmin,async (req,res)=>{
    try{
        let borrado=await listado.borrarProducto(req.params.id);
        if (borrado=="No hay productos en la base de datos" || borrado=="Elemento no encontrado"){
            throw new Error(borrado)
        }
        if (borrado.length==0){
            throw new Error("Error al borrar el producto")
        }
        res.json(borrado);
    }catch(e){
        res.status(404).json({"error":e.message});
    }    
})


module.exports=routerProductos;