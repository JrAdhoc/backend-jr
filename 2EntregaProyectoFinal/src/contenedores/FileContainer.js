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
}
