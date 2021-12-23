import { chatsdb } from "../config";

export default class Chats{
    constructor(){
        chatsdb.schema.hasTable('chats').then(result=>{
            if(!result){//No existe la tabla, hay que crearla
                chatsdb.schema.createTable('chats', table=>{
                    table.increments();
                    table.string('email').notNullable();
                    table.string('message').notNullable();
                    table.timestamps(true,true);
                }).then(result=>{
                    console.log('chats DB created');
                })
            }
        })
    }
    getChats = async () =>{
        try{
            let chats = await chatdb.select().table("chats").then(result => {
                let processed = JSON.parse(JSON.stringify(result));
                console.log(processed)
            })
         return{status:'success',payload:chats}
        }catch(error){
            return{status:'error',message:error}
        }
     }
}

