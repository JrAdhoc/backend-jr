import mongoose from 'mongoose';
import Users from '../services/user.js';

let Schema = mongoose.Schema;

export default class User extends Users{
    constructor(){
        super('users',{
            first_name:{
                type:String,
                required:true,
            },
            last_name:{
                type:String,
                required:true,
            },
            age:{
                type:Number
            },
            username:{
                type:String,
                default:"anonymus",
                unique:true
            },
            email:{
                type:String,
                required:true,
                unique:true
            },
            password:{
                type:String,
                required:true
            },
            avatar:{
                type:String
            }

        })
    }
}