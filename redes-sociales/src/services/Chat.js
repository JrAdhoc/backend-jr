import config from "../config.js";
import mongoose from 'mongoose';
import {normalize,schema} from 'normalizr';

mongoose.connect(config.mongo.baseURL,{useNewUrlParser:true,useUnifiedTopology:true});

export default class Chat{
    constructor(collection,schema,timestamps){
        this.collection = mongoose.model(collection,new mongoose.Schema(schema,timestamps))
    }
    cargarMensaje = async (mensaje)=>{
        try {
            let result = await this.collection.create(mensaje);
            return {status:"success", message:"creado", payload:result}
        } catch (error) {
            return{status:"error",error:error}
        }
    }

    verMensajes = async ()=>{
        try {
            let documents = await this.collection.find().populate('user');
            return documents
        } catch (error) {
            return{status:"error",error:error}
        }
    }

}