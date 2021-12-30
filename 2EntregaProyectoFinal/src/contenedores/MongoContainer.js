import mongoose from 'mongoose';
import config from '../config.js';


mongoose.connect(config.mongo.baseUrl, {useNewUrlParser:true,useUnifiedTopology:true});

export default class MongoContainer{
    constructor(collection,schema,timestamps){
        this.collection = mongoose.model(collection,new mongoose.Schema(schema,timestamps))
    }
    getAll = async() =>{
        try {
            let documents = await this.collection.find();
            return {status:"success",payload:documents}
        } catch (error) {
            return {status:"error", error:error}
        }
    }
    saveOne = async(object) => {
        try {
            let result = await this.collection.create(object)
            return {status:"succes", message:"creado",payload:result}
        } catch (error) {
            return {status:"error", error:error}
        }
    }
    addToCart = async(carritoId,productoId)=>{
        try {
            let result = await this.collection.updateOne({_id:carritoId},{$push:{productos:productoId}})
            return {status:"succes", message:"agregado exitosamente",payload:result}
        } catch (error) {
            return {status:"error", error:error}
        }
    }
}
