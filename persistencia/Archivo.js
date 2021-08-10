class Archivo{
    fs=require('fs');

    constructor(nombreArchivo){
        this.nombreArchivo=nombreArchivo;
    }
    async leer() {
        try {
            const contenido= await this.fs.promises.readFile(this.nombreArchivo,'utf-8');//segun filmina 37
            return JSON.parse(contenido);
        } catch{ 
            return [];
        }
    }
    async buscar (id){
        const contenido=await this.leer();
        if (contenido==[]){
            return [];
        }
        let i=0;
        let encontrado=0;
        while (i<contenido.length && encontrado==0){
            if (contenido[i].id==id){
                encontrado=1;
            }else{
                i++;
            }
        }
        if (encontrado==1){
            return contenido[i];
        }else{
            return [];
        }
    }
    async modificar(producto){
        const contenido=await this.leer();
        if (contenido==[]){
            return [];
        }
        let i=0;
        let encontrado=0;
        while (i<contenido.length && encontrado==0){
            if (contenido[i].id==producto.id){
                encontrado=1;
                contenido[i]=producto;
                try {    
                    // necesito usar stringify para poder pasar el json a string y meterlo en el archivo
                    await this.fs.promises.writeFile(this.nombreArchivo,JSON.stringify(contenido)); //segun filmina 39
                    return producto;
                } catch (e) {
                    return [];
                }
            }else{
                i++;
            }
        }
        if (encontrado==0){
            return [];
        }
    }
    async borrarProducto(producto){
        const contenido=await this.leer();
        if (contenido.length==0){
            return "No hay productos en la base de datos";
        }
        let i=0;
        let encontrado=0;
        while (i<contenido.length && encontrado==0){
            if (contenido[i].id==producto){
                encontrado=1;
                let elementoBorrar=contenido[i];
                contenido.splice(i,1);
                try {    
                    // necesito usar stringify para poder pasar el json a string y meterlo en el archivo
                    await this.fs.promises.writeFile(this.nombreArchivo,JSON.stringify(contenido)); //segun filmina 39
                    return elementoBorrar;
                } catch (e) {
                    return [];
                }
            }else{
                i++;
            }
        }
        if (encontrado==0){
            return "Elemento no encontrado";
        }
    }
    async guardar(producto) {
        const contenido = await this.leer();
        if (contenido.length==0){
            producto.id = contenido.length + 1;
        }else{
            producto.id=parseInt(contenido[contenido.length-1].id)+1;
        }
         
        contenido.push(producto);
        try {    
            // necesito usar stringify para poder pasar el json a string y meterlo en el archivo
            await this.fs.promises.writeFile(this.nombreArchivo,JSON.stringify(contenido)); //segun filmina 39
            return producto;
        } catch (e) {
            return [];
        }
    }     
    async borrar() {
        try {
            await this.fs.promises.unlink(this.nombreArchivo);
        } catch (error) {
            console.error("error al intentar borrar archivo");
        }
    }
}

module.exports=new Archivo('productos.txt');
