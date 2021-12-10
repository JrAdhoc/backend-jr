import fs from 'fs';
import __dirname from '../utils.js';

const productURL = __dirname+'/files/Productos.txt';
const carritoURL = __dirname+'/files/Carrito.txt';

class Contenedor{
    async save(product){  
    try{
        let data = await fs.promises.readFile(productURL,'utf-8');
        let fecha = new Date;
        let timestamp = fecha.getDate()+'/'+(fecha.getMonth()+1)+'/'+fecha.getFullYear();
        let products = JSON.parse(data);
        let id = products[products.length-1].id+1;
        product = Object.assign({id:id},{timestamp: timestamp},product);
        products.push(product);
        try{
            await fs.promises.writeFile(productURL,JSON.stringify(products,null,2));
            return {status:"success",message:"Producto agregado al carrito"}
        }catch{
            return {statis:"error",message:"No se pudo agregar el producto"} 
        }
    }catch{
        let fecha = new Date;
        let timestamp = fecha.getDate()+'/'+(fecha.getMonth()+1)+'/'+fecha.getFullYear();
        product = Object.assign({id:1},{timestamp: timestamp},product)
        try{
            await fs.promises.writeFile(productURL,JSON.stringify([product],null,2));
            return {status:"success", message:"Producto cargado"}
        }
        catch{
            return {status:"error",message:"No se pudo cargar el producto"}
        }
    }
}

async newCarrito(){
    try{
        let data = await fs.promises.readFile(carritoURL,'utf-8');
        let fecha = new Date;
        let timestamp = fecha.getDate()+'/'+(fecha.getMonth()+1)+'/'+fecha.getFullYear();
        let carrito = JSON.parse(data);
        let id = carrito[carrito.length-1].id+1;
        let carritoNuevo = Object.assign({id:id},{timestamp: timestamp},{productos:[]});
        carrito.push(carritoNuevo);
        try{
            await fs.promises.writeFile(carritoURL,JSON.stringify(carrito,null,2));
            return {status:"success",message:"Su carrito ha sido creado con el id: "+carritoNuevo.id}
        }catch{
            return {statis:"error",message:"No se pudo generar su carrito"} 
        }
    }catch{
        let fecha = new Date;
        let timestamp = fecha.getDate()+'/'+(fecha.getMonth()+1)+'/'+fecha.getFullYear();
        let carritoNuevo = Object.assign({id:1},{timestamp: timestamp},{productos:[]})
        try{
            await fs.promises.writeFile(carritoURL,JSON.stringify([carritoNuevo],null,2));
            return {status:"success", message:"Su carrito ha sido creado con el id: "+carritoNuevo.id}
        }
        catch{
            return {status:"error",message:"No se pudo generar el carrito :("}
        }
    }
}

async agregarProductosCarrito(idCarrito,productos){
    try {
        let archivo = await fs.promises.readFile(carritoURL,'utf-8');
        let carritos = JSON.parse(archivo);
        let index = carritos.findIndex(v => v.id === idCarrito);
        if(index === -1 ){
            return {status: "error", message:"El carrito no existe!"};
        }else{
            let carritoSeleccionado = carritos[index];
            let producto = new Contenedor();
            let agregar =  (await producto.getById(productos.id));
            agregar.stock = productos.stock;
            carritoSeleccionado.productos.push(agregar.playload);
            let carritoNuevo = carritos.map((cart)=>{
                if(cart.id === idCarrito){
                    return carritoSeleccionado;
                }else{
                    return cart;
                }
            })
            console.log(carritoNuevo);
            await fs.promises.writeFile(carritoURL,JSON.stringify(carritoNuevo,null,2));
            return {status:"success", message:"Se agrego el producto al carrito."}
        }
    } catch (error) {
        return {status:"error", message:"No se pudo agregar el producto."}
    }
}

async getProductosCarrito(idCarrito){
    try {
        let data = await fs.promises.readFile(carritoURL,'utf-8');
        let carritos = JSON.parse(data);
        for(let i=0;i<carritos.length;i++){
            if(carritos[i].id==idCarrito){
                let products = carritos[i].productos;
                return {status:"success", productos:products}
            }
        }
    } catch (error) {
        return {status:"error", message:"Error al encontrar el carrito"}; 
    }
}

async deleteProductoCarrito(idCarrito, idProducto){
    try {
        let archivo = await fs.promises.readFile(carritoURL,'utf-8');
        let carritos = JSON.parse(archivo);
        let carrito = carritos.find(carr => carr.id === idCarrito);
        let carrIndex = carritos.findIndex(carr=>carr.id===idProducto)

        let productIndex = carrito.productos.findIndex(prod => prod.id === idProducto);
        if(productIndex > -1){
            carrito.productos.splice(productIndex,1)
            carritos.splice(carrIndex,1,carrito)
            try{
                await fs.promises.writeFile(carritoURL,JSON.stringify(carritos,null,2));
                return{status:"success",message:"Producto eliminado correctamente del carrito"};    
            }catch(err){
                console.log(err);
                return{status:"error",message:"No se pudo agregar el producto"}
            }
        }
    }catch(err){
        return {status:"error",message:err};
    }
}

async deleteCarrito(idCarrito){
    try{
        let contenido = await fs.promises.readFile(carritoURL,'utf-8')
        let carritos = JSON.parse(contenido);
        if(idCarrito > carritos.length){
            return {status:"error", message:"No hay ningun carrito con ese id"}
        }
        let aux = carritos.filter(carrito =>carrito.id != idCarrito)
        try{
            await fs.promises.writeFile(carritoURL,JSON.stringify(aux,null,2));
            return {status:"success",message:"El carrito ha sido eliminado"}
        }catch{
            return {status:"error", message:"El id del carrito no existe"}
        }
    }catch{
        return{status:"error",message: "Error al eliminar carrito"}
    }
}



async getById(idProducto){  
    try {
        let contenido = await fs.promises.readFile(productURL,'utf-8')    
        let productos = JSON.parse(contenido);
        let buscar = productos.find( prd =>prd.id === idProducto);
        if(buscar){
            return {status: "success",playload:buscar}
        }else{
            return {status:"error", message:"Producto no encontrado"}
        }
    }catch{
            return {status:"error",message:"Error al obtener el prodcuto"}
    }
}
    
    async getAll(){
        try{
            let contenido = await fs.promises.readFile(productURL, 'utf-8')
            let arrayProductos = JSON.parse(contenido);
            return {status:"success", payload:arrayProductos};
        }catch{
            return {status:"error",message:"Error al obtener los productos."}
        }
    }

    async deleteById(id){
        try{
            let contenido = await fs.promises.readFile(productURL,'utf-8')
            let products = JSON.parse(contenido)
            if(id > products.length){
                return {status:"error", message:"No existe un producto con el id especificado"}
            }
            let aux = products.filter(product =>product.id != id)
            try{
                await fs.promises.writeFile(productURL,JSON.stringify(aux,null,2));
                return {status:"success",message:"Producto eliminado"}
            }catch{
                return {status:"error", message:"El id del producto es incorrecto"}
            }
        }catch{
            return{status:"error",message: "Error al intentar eliminar el producto"}
        }
    }

    async deleteAll(){
        try{
            let contenido = await fs.promises.readFile(productURL, 'utf-8')
            let arrayProductos = JSON.parse(contenido)
            arrayProductos.splice(0,arrayProductos.length)
            await fs.writeFile(productURL,JSON.stringify(arrayProductos))
            return{status:"success", message:"Los productos fueron eliminados correctamente"}
        }catch{
            return{status:"error",message:"Error al querer eliminar los productos"}
        }
    }

    getRandom(){
        let contenido = fs.readFileSync(productURL, 'utf-8');
        const arrayProductos = JSON.parse(contenido);
        let rand = Math.floor(Math.random() * (arrayProductos.length));
        return arrayProductos[rand];
    }

    async editProduct(id,body){
        try {
            let contenido = await fs.promises.readFile(productURL,'utf-8')
            let products = JSON.parse(contenido);
            let idbuscar = JSON.parse(id);
            for(let i = 0;i<products.length;i++){
                if(idbuscar === products[i].id){
                    products[i] = body;
                    products[i].id = idbuscar;
                }
            }
            try{
                await fs.promises.writeFile(productURL,JSON.stringify(products,null,2));
                return {status:"success", message:"Producto actualizado correctamente!"}
            }catch{
                return {status:"error", message:"Error al actualizar el producto"}
            }
        } catch{
            return {status:"error", message:"Fallo al actualizar el producto"}
        }
    }
}

export default Contenedor;

