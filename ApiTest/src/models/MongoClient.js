import mongoose from 'mongoose';

export default class MongoClient {
    constructor(){
        mongoose.connect("mongodb+srv://juanirivero:asd123@mariacala.ud2da.mongodb.net/myFirstDatabase?retryWrites=true&w=majority")
    }
}
