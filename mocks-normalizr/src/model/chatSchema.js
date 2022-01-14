import Chat from '../services/Chat.js';

export default class ChatSchema extends Chat{
    constructor(){
        super('chats',
            {
                author:{
                    id:{type:String},
                    nombre:{type:String},
                    apellido:{type:String},
                    edad:{type:Number},
                    alias:{type:String},
                    avatar:{type:String}
                },
                text:{type:String}
            },{timestamps:true}
        )
    }
}