import fs from 'fs';
import config from '../config.js';


export default class FileContainer{
    constructor(file_endpoint){
        this.url = `${config.FileSystem.baseUrl}${file_endpoint}`
    }


    getAll = async() => {
        try {
            let data = await fs.promises.readFile(this.url, 'utf-8');
            return{status:"success",payLoad:JSON.parse(data)};
        }catch(error) {
            return{status:`error",error:"No se pudo obtener la información ${error}`};
    }

    }
    getById = async(id)=>{
        try {
            let data = await fs.promises.readFile(this.url, 'utf-8');
            let objects = JSON.parse(data);
            let search = objects.find(object=>object.id===id);
            if(search){
                return {status:"success",payLoad:search}
            }else{
                return {status:"error",error:"Objeto no encontrado"}
            }
        } catch (error) {
            return {status:`error",error:"No se pudo obtener la información: ${error}`}
        }
    }
    deleteAll = async() => {
        try{
            let contenido = await fs.promises.readFile(this.url, 'utf-8')
            let arrayProductos = JSON.parse(contenido)
            arrayProductos.splice(0,arrayProductos.length)
            await fs.writeFile(this.url,JSON.stringify(arrayProductos))
            return{status:"success", message:"TODOS los productos fueron eliminados correctamente"}
        }catch{
            return{status:"error",message:"Error al querer eliminar TODOS los productos"}
        }
    }
    deleteById = async(id) => {
        try{
            let contenido = await fs.promises.readFile(this.url,'utf-8')
            let products = JSON.parse(contenido)
            if(id > products.length){
                return {status:"error", message:"No hay producto con el id especificado"}
            }
            let aux = products.filter(product =>product.id != id)
            try{
                await fs.promises.writeFile(this.url,JSON.stringify(aux,null,2));
                return {status:"success",message:"Producto eliminado"}
            }catch{
                return {status:"error", message:"El id del producto es incorrecto"}
            }
        }catch{
            return{status:"error",message: "Error al eliminar el producto"}
        }
    }
    updateById = async(id,body) => {
        try {
            let contenido = await fs.promises.readFile(this.url,'utf-8')
            let products = JSON.parse(contenido);
            let idbuscar = JSON.parse(id);
            for(let i = 0;i<products.length;i++){
                if(idbuscar === products[i].id){
                    products[i] = body;
                    products[i].id = idbuscar;
                }
            }
            try{
                await fs.promises.writeFile(this.url,JSON.stringify(products,null,2));
                return {status:"success", message:"Producto actualizado correctamente!"}
            }catch{
                return {status:"error", message:"Error al actualizar el producto"}
            }
        } catch{
            return {status:"error", message:"Fallo al actualizar el producto"}
        }
    }
}
