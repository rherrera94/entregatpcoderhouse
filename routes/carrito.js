const express= require('express');
const routerCarrito=express.Router();
const isAdmin=require('../Middleware/funcionAdmin');
const listado=require ('../persistencia/Carrito');
const listProd=require ('../persistencia/Archivo');
/*
    devuelve el producto o productos
*/
routerCarrito.get('/listar/:id?',async (req,res)=>{
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
routerCarrito.post('/agregar/:id_producto',isAdmin,async (req,res)=>{
    try{
        let prod=await listProd.buscar(req.params.id_producto);
        if (prod.length==0){
            throw new Error('Producto no encontrado');
        }
        let d=new Date();
        let mes=d.getMonth();
        mes=mes+1;
        let fech=d.getDate()+"/"+mes+"/"+d.getFullYear()+" "+d.getHours()+":"+d.getMinutes()+":"+d.getSeconds();      
    
        let productoGuardar={
            "timestamp":fech,
            "producto":prod
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
 * Elimina el producto
 */
 routerCarrito.delete('/borrar/:id',isAdmin,async (req,res)=>{
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


module.exports=routerCarrito;