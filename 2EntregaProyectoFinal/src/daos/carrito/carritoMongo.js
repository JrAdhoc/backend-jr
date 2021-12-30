import pkg from 'mongoose'
import MongoContainer from "../../contenedores/MongoContainer.js";

const { Schema } = pkg;

export default class CarritoMongo extends MongoContainer{
    constructor(){
        super('carrito', 
            {
                productos:{
                    type:[{
                        type:Schema.Types.ObjectId,
                        ref:'productos'
                    }],
                    defaul:[]
                }
            },{timestamps:true}
        )
    }
}
