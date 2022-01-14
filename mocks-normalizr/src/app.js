import express from 'express';
import {engine} from 'express-handlebars';
import cors from 'cors';
import {Server} from 'socket.io';
import __dirname from './utiles.js';
import { generarProductos } from './utiles.js';
import { authMiddleware } from './utiles.js';
import ChatSchema from './model/chatSchema.js';


const app = express();
const PORT = process.env.PORT||4001;
const server = app.listen(PORT,()=>{
    console.log("servidor escuchando en: "+PORT);
})

const chat = new ChatSchema();
export const io = new Server(server);


app.engine('handlebars',engine())
app.set('views',__dirname+'/views')
app.set('view engine','handlebars')

const admin = true;

app.use(express.json());
app.use(cors());
app.use(express.urlencoded({extended:true}));
app.use(express.static(__dirname+'/public'));
app.use((req,res,next)=>{
    req.auth = admin;
    next();
})
app.get('/api/productos-test',(req,res)=>{
    let productos = generarProductos();
    let preparedObject ={
        products:productos
    }
    res.render('productos-test',preparedObject);
})

let messages =[];
io.on('connection', async socket=>{
    console.log(`El socket ${socket.id} se ha conectado`);
    socket.on('message',data=>{
        messages.push(data);
        io.emit('messagelog', messages);
        chat.cargarMensaje(data).then(result=>{
            console.log(result);
        })
    })
})
