import Schema from 'mongoose';
import MongoContainer from "../../contenedores/MongoContainer.js";

export default class ProductosMongo extends MongoContainer{
    constructor(){
        super(
            'productos',
            {
                title:{type:String, required:true},
                price:{type:Number, required:true},
                thumbnail:{type:String},
                carrito:{
                    type:Schema.Types.ObjectId,
                    ref:'carrito',
                    default:null
                }
            },{Timestamps:true}
        )
    }
}
