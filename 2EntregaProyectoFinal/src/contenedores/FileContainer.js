import fs from 'fs';
import { PerformanceObserver } from 'perf_hooks';
import config from '../config.js';


export default class FileContainer{
    constructor(file_endpoint){
        this.url = `${config.FileSystem.baseUrl}${file_endpoint}`
    }



    saveOne = async(product) => {
        try{
            let data = await fs.promises.readFile(this.url,'utf-8');
            let fecha = new Date;
            let timestamp = fecha.getDate()+'/'+(fecha.getMonth()+1)+'/'+fecha.getFullYear();
            let products = JSON.parse(data);
            let id = products[products.length-1].id+1;
            product = Object.assign({id:id},{timestamp: timestamp},product);
            products.push(product);
            try{
                await fs.promises.writeFile(this.url,JSON.stringify(products,null,2));
                return {status:"success",message:"Producto agregado al carrito"}
            }catch{
                return {statis:"error",message:"No se pudo agregar el producto"} 
            }
        }catch{
            let fecha = new Date;
            let timestamp = fecha.getDate()+'/'+(fecha.getMonth()+1)+'/'+fecha.getFullYear();
            product = Object.assign({id:1},{timestamp: timestamp},product)
            try{
                await fs.promises.writeFile(this.url,JSON.stringify([product],null,2));
                return {status:"success", message:"Producto cargado"}
            }
            catch{
                return {status:"error",message:"No se pudo cargar el producto"}
            }
        }
    }

    getAll = async() => {
        try {
            let data = await fs.promises.readFile(this.url, 'utf-8');
            return{status:"success",payLoad:JSON.parse(data)};
        }catch(error) {
            return{status:`error",error:"No se pudo obtener la información ${error}`};
    }

    }
    getById = async(productoId)=>{
        try {
            let id=parseInt(productoId)
            let data = await fs.promises.readFile(this.url, 'utf-8');
            let objects = JSON.parse(data);
            let search = objects.find(object=>object.id===id);
            if(search){
                return {status:"success",payload:search}
            }else{
                return {status:"error",error:"Objeto no encontrado"}
            }
        } catch (error) {
            return {status:`error",error:"No se pudo obtener la información: ${error}`}
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
