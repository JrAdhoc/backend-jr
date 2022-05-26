import express from 'express';
import {engine} from 'express-handlebars';
import cors from 'cors';
import productosRouter from './routes/productos.js';
import carritoRouter from './routes/carrito.js';
import { Server } from 'socket.io';
import __dirname from './utiles.js';
import session from 'express-session';
import MongoStore from 'connect-mongo'
import  initializePassport from './passport-config.js';
import passport from 'passport';
import sessionRouter from './routes/session.js';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import config from './config.js'
import { messageService } from './services/services.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT||4001;
const server = app.listen(PORT,()=>{
    console.log("servidor escuchando en: "+PORT);
})

export const io = new Server(server,{
    cors:{
        origin: 'http://localhost:3000',
        methods:['GET','POST']
    }
});


app.engine('handlebars',engine())
app.set('views',__dirname+'/views')
app.set('view engine','handlebars')

app.use(session({
    store:MongoStore.create({mongoUrl:config.mongo.sessionUrl}),
    secret:process.env.SESSION_SECRET,
    resave:false,
    saveUninitialized:true
}))
initializePassport();
app.use(passport.initialize());
app.use(passport.session());

app.use(express.json());
app.use(cors({credentials:true, origin:'http://localhost:3000'}))
app.use(express.urlencoded({extended:true}));
app.use(express.static(__dirname+'/public'));
app.use(cookieParser());

app.use('/api/products',productosRouter);
app.use('/api/carts',carritoRouter);
app.use('/api/session',sessionRouter);

let connectedSockets = {};

io.on('connection',async socket=>{
    console.log("client connected");
    if(socket.handshake.query.name){
        if(Object.values(connectedSockets).some(user=>user.id===socket.handshake.query.id)){
            Object.keys(connectedSockets).forEach(idSocket =>{
                if(connectedSockets[idSocket].id===socket.handshake.query.id){
                    delete connectedSockets[idSocket];
                    connectedSockets[socket.id]={
                        name: socket.handshake.query.name,
                        id:socket.handshake.query.id,
                        thumbnail:socket.handshake.query.thumbnail
                    };
                }
            })
        }else{
            connectedSockets[socket.id]={
                name:socket.handshake.query.name,
                id:socket.handshake.query.id,
                thumbnail:socket.handshake.query.thumbnail
            };
        }
    }
    io.emit('users',connectedSockets);
    let logs =await messageService.getAll();
    io.emit('logs',logs);
    socket.on('disconnect',reason=>{
        delete connectedSockets[socket.id];
    })
    socket.on('message',async data=>{
        if(Object.keys(connectedSockets).includes(socket.id)){
            await messageService.save({
                author:connectedSockets[socket.id].id,
                content:data
            })
            let logs = await messageService.getAll();
            io.emit('logs',logs);
        }
    })
})
