import mongoose from 'mongoose';

let model = 'Users';

let userSchema = new mongoose.Schema({
    first_name:String,
    last_name:String,
    email:String
})

export const userDao = mongoose.model(model,userSchema);