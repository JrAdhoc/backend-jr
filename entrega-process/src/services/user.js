import config from "../config.js";
import mongoose from 'mongoose';

mongoose.connect(config.mongo.baseURL,{useNewUrlParser:true,useUnifiedTopology:true});

export default class Users{
    constructor(collection,schema,timestamps){
        this.collection = mongoose.model(collection,new mongoose.Schema(schema,timestamps));
    }
    
    saveUser = async (object)=>{
        try {
            let result = await this.collection.create(object);
            return {status:"success",message:"usuario registrado",payload:result}
        } catch (error) {
            return{status:"error",error:error}
        }
    }

    getBy = async(params)=>{
        try {
            let result = await this.collection.findOne(params);
            return result
        } catch (error) {
            return {status:"error",error:error}
        }
    }
    
    getByUsername = async(params)=>{
        try {
            return this.collection.findOne({username:params});
        } catch (error) {
            return {error:error, message:"User not found"}
        }
    }
}