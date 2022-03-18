import mongoose from 'mongoose';

let Schema = mongoose.Schema;
export default class User{
    constructor(data){
        this.data = data;
    }
    static get model(){
        return 'users';
    }
    static get schema(){
        return{
            email:{type:String},
            name:{type:String},
            age:{type:Number},
            address:{type:String},
            phone:{type:Number},
            password:{type:String},
            avatar:{type:String},
            cart:[{
                type:Boolean,
                default:true
            }]
        }
    }
}
