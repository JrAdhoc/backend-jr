import fs from 'fs';
import __dirname from '../utiles.js';

const productURL = __dirname+'/files/Carrito.txt';

class Contenedor{
    async save(product){  
    try{
        let data = await fs.promises.readFile(productURL,'utf-8');
        let products = JSON.parse(data);
        let id = products[products.length-1].id+1;
        product = Object.assign({id:id},product);
        products.push(product);
        try{
            await fs.promises.writeFile(productURL,JSON.stringify(products,null,2));
            return {status:"success",message:"Producto registrado"}
        }catch{
            return {statis:"error",message:"No se pudo registrar al producto"} 
        }
    }catch{
        product = Object.assign({id:1},product)
        try{
            await fs.promises.writeFile(productURL,JSON.stringify([product],null,2));
            return {status:"success", message:"Producto registrado"}
        }
        catch{
            return {status:"error",message:"No se pudo registrar el producto"}
        }
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
            return {status:"error",message:"Error al obtener los productos. Intente más tarde"}
        }
    }

    async deleteById(id){
        try{
            let contenido = await fs.promises.readFile(productURL,'utf-8')
            let products = JSON.parse(contenido)
            //if(!products.some(producto=>producto.id===id)) return {status:"error", message:"No hay producto con el id especificado"}
            if(id > products.length){
                return {status:"error", message:"No hay producto con el id especificado"}
            }
            let aux = products.filter(product =>product.id != id)
            try{
                await fs.promises.writeFile(productURL,JSON.stringify(aux,null,2));
                return {status:"success",message:"Producto eliminado"}
            }catch{
                return {status:"error", message:"El id del producto es incorrecto"}
            }
        }catch{
            return{status:"error",message: "Error al eliminar el producto"}
        }
        // let newArray = arrayProductos.filter(i => i.id != id);
        // fs.writeFileSync('./files/Productos.txt',JSON.stringify(newArray,null,2))
    }

    async deleteAll(){
        try{
            let contenido = await fs.promises.readFile(productURL, 'utf-8')
            let arrayProductos = JSON.parse(contenido)
            arrayProductos.splice(0,arrayProductos.length)
            await fs.writeFile(productURL,JSON.stringify(arrayProductos))
            return{status:"success", message:"TODOS los productos fueron eliminados correctamente"}
        }catch{
            return{status:"error",message:"Error al querer eliminar TODOS los productos"}
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



