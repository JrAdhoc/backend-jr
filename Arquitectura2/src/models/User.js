import mongoose from 'mongoose';

const collectionName = 'Users';
const schema = new mongoose.Schema({
    first_name:String,
    last_name:String,
    email:String
})

export default{
    collectionName,
    schema
}