import express from 'express';
import {engine} from 'express-handlebars';
import cors from 'cors';
import productosRouter from './routes/productos.js';
import carritoRouter from './routes/carrito.js';
import {Server} from 'socket.io';
import __dirname from './utiles.js';
import session from 'express-session';
import MongoStore from 'connect-mongo'
import  initializePassport from './passport-config.js';
import passport from 'passport';
import sessionRouter from './routes/session.js';
import userRouter from './routes/users.js';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import config from './config.js'

dotenv.config();


const app = express();
const PORT = process.env.PORT||4001;
const server = app.listen(PORT,()=>{
    console.log("servidor escuchando en: "+PORT);
})

export const io = new Server(server);


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
app.use(cors());
app.use(express.urlencoded({extended:true}));
app.use(express.static(__dirname+'/public'));
app.use(cookieParser());

app.use('/api/productos',productosRouter);
app.use('/api/carrito',carritoRouter);
app.use('/session',sessionRouter);
app.use('/user',userRouter)
