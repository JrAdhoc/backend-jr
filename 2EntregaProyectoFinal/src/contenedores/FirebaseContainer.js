import config from '../config.js';
const admin = require('firebase-admin');
const serviceAccount = require('../db/ecommerce-jr-firebase-adminsdk-x4p3d-3e5338d093.json')


admin.initializeApp({
    credential:admin.cert(serviceAccount),
    databaseURL: config.firebase.baseUrl
})
const db = admin.firestore();
const currentCollection = db.collection('products');


export default class FirebaseCotainer {

    constructor(){}

saveOne = async(object) => {
    try{
        let doc = currentCollection.doc()
        let result= await doc.create(object)
        return {status:"success", message:"creado",payload:result}

    }catch(err){
        return {status:"error", error:error}
    }
}

getAll = async() =>{
    try {
        const data = await currentCollection.get();
        const dataDocs = data.docs;
        const formatted = dataDocs.map(documento=>documento.data())
        return {status:"success",payload:formatted}
    } catch (error) {
        return {status:"error", error:error}
    }
}

getById = async(productoId)=>{
    try {
        const doc = currentCollection.doc(productoId)
        let product = await doc.get();
        return {status:"success",payload:product.data()}
    } catch (error) {
        return {status:"error", error:error}
    }
}

UpdateById = async(productoId,body)=>{
    try {
        const doc = currentCollection.doc(productoId)
        await doc.update(body)
    } catch (error) {
        return {status:"error", error:error}
    }
}

deleteById = async(productoId) => {
    try{
        const doc = currentCollection.doc(productoId)
        await doc.delete();
    }catch{
        return{status:"error",message: "Error al eliminar el producto"}
    }
}

deleteAll = async() =>{
    try {
         await currentCollection.drop();
    } catch (error) {
        return {status:"error", error:error}
    }
}
}

