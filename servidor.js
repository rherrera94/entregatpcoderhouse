const express= require('express');
const app= express();
const cors= require('cors');
app.use(cors());
require('dotenv').config();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const rutasProductos=require('./routes/productos');
const rutasCarrito=require('./routes/carrito');
const port= process.env.PORT? process.env.PORT:8080;

app.use('/productos',rutasProductos);
app.use('/carrito',rutasCarrito);
if (process.env.NODE_ENV==="prod"){
    app.use(express.static(__dirname+'/public/build'));
    app.get('/',(req,res)=>{
        res.sendFile(__dirname+'/public/build/'+'index.html')
    })
}
app.use((req, res) => {
    res.json({"error":"Ruta no encontrada","descripcion": `ruta ${req.originalUrl} no implementada` });
})
app.listen(port,()=>{
    console.log('puerto '+ port);
});
