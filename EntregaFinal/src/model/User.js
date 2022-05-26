import mongoose from 'mongoose';

let Schema = mongoose.Schema;
export default class User{
    constructor(data){
        this.data = data;
    }
    static get model(){
        return 'Users';
    }
    static get schema(){
        return{
            first_name:{type:String},
            last_name:{type:String},
            password:{type:String},
            role:{type:String},
            email:{type:String},
            status:{
                type:Boolean,
                default:true
            },
            phone:{type:String},
            cart:{
                type:[{
                    type: Schema.Types.ObjectId,
                    ref:'Carts'
                }]
            },
            profile_picture:String
        }
    }
}