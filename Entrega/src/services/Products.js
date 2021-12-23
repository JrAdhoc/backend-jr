import { db } from "../config";

export default class Products{
    constructor(){
        db.schema.hasTable('products').then(result=>{
            if(!result){//No existe la tabla, hay que crearla
                db.schema.createTable('products', table=>{
                    table.increments();
                    table.string('title').notNullable();
                    table.integer('price').notNullable();
                    table.string('thumbnail').notNullable();
                    table.timestamps(true,true);
                }).then(result=>{
                    console.log('Products DB created');
                })
            }
        })
    }
    getProducts = async () =>{
       try{
        let products = await db.select().table('products');
        return{status:'success',payload:products}
       }catch(error){
           return{status:'error',message:error}
       }

    }
     getProductById = async (id) =>{
        try{
         let product = await db.select().table('products').where('id', id).first();
         if(user){
         return{status:'success',payload:product}
        }else{
            return{status:'error',message:'Producto no encontrado'}
        }
        }catch(error){
            return{status:'error',message:error}
        }
     }
     registerProduct = async (product) =>{
         try{
             let exist = await db.table('products').select().where('title',product.title).first();
             if (exist) return {status:'error',message:'product already exists'}
             let result = await db.table('products').insert(product)
             return {status:'success',payload:result}
         } catch(error){
             console.log(error);
            return{status:'error',message:error}
         }
     }
     modifyProductById = async (id, product) =>{
        try{
            let exist = await db.table('products').select().where('id',id).first();
            if (exist){
                db.table('products').select().where('id',id).update(product).first();
            }
            return {status:'success',payload:result}
        } catch(error){
            console.log(error);
           return{status:'error',message:error}
        }
    }
     deleteProductById = async (id) =>{
        try{
         let product = await db.del().table('products').where('id', id).first();
         if(user){
         return{status:'success',payload:product}
        }else{
            return{status:'error',message:'Producto no encontrado'}
        }
        }catch(error){
            return{status:'error',message:error}
        }
     }
}
