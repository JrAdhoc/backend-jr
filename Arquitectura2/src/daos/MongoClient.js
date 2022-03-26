import mongoose from 'mongoose';

export default class MongoClient{
    constructor(){
        this.connected = true;
        this.client = mongoose;
    }
    connect = async()=>{
        try {
            this.client.connect('mongodb+srv://juanirivero:asd123@mariacala.ud2da.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',{
                userNewUrlParser:true,
                useUnifiedTopology:true 
            })
        } catch (error) {
            throw new Error("Can't connect to database")
        }
    }
}
