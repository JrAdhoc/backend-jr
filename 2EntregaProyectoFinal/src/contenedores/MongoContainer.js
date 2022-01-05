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
    getById = async(productoId)=>{
        try {
            let result = await this.collection.find({_id:productoId})
            return {status:"success",payload:result}
        } catch (error) {
            return {status:"error", error:error}
        }
    }
    saveOne = async(object) => {
        try {
            let result = await this.collection.create(object)
            return {status:"success", message:"creado",payload:result}
        } catch (error) {
            return {status:"error", error:error}
        }
    }
    addToCart = async(carritoId,productoId)=>{
        try {
            let result = await this.collection.updateOne({_id:carritoId},{$push:{productos:productoId}})
            return {status:"success", message:"agregado exitosamente",payload:result}
        } catch (error) {
            return {status:"error", error:error}
        }
    }
    updateById = async(productoId, body) => {
        try {
            let result = await this.collection.findByIdAndUpdate(productoId, body);
            return {status:"success", message:"modificado exitosamente",payload:result}
        } catch (error) {
            return {status:"error", error:error}
        }
    }
    deleteById = async(productoId)=>{
        try {
            let result = await this.collection.deleteOne({_id:productoId})
            return {status:"success",  message:"eliminado exitosamente",payload:result}
        } catch (error) {
            return {status:"error", error:error}
        }
    }
    crearCarrito = async() =>{
        try {
            let crear = await this.collection.create({});
            return {status:"success", message:"carrito creado", payload:crear}
        } catch (error) {
            return{status:"error",error:error}
        }
    }
    agregarProductoACarrito = async(idCarrito,idProducto)=>{
        try {
            const Carrito = await this.collection.doc(idCarrito).get();
            let productos = Carrito.data();
            productos.products.push(idProducto)
            const agregar = await this.collection.doc(idCarrito).update(productos);
            return{status:"success",message:"Producto agregado al carrito!",payload:agregar}
        } catch (error) {
            return{status:"error",error:error}
        }
    }
    borrarProductoCarrito = async(idCarrito,idProducto)=>{
        try {
            const carrito = await this.collection.doc(idCarrito).get();
            let productos = carrito.data();
            let array = productos.products;
            productos = array.filter(pr=>pr._id != idProducto);
            const data={productos}
            const agregar = await this.collection.doc(idCarrito).set(data);
            return{status:"success",message:"Producto borrado del carro!"}
        } catch (error) {
            return{status:"error",error:error}
        }

    }

}
