import mongoose from 'mongoose';

const userModel = mongoose.Schema({
    first_name:String,
    last_name:String,
    email:String,
    password:String
})

const users = mongoose.model('users',userModel);
export default users;
