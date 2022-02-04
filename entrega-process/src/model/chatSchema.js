import Schema from 'mongoose';
import Chat from '../services/Chat.js'

export default class Message extends Chat{
    constructor(){
        super('chats',{
            user:{
                type:Schema.Types.ObjectId,
                ref:'users',
                required:true
            },
            text:{
                type:String,
                required:true
            }
        },{timestamps:true})
    }
}