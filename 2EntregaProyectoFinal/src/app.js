import express from 'express';
import {engine} from 'express-handlebars';
import cors from 'cors';
import Contenedor from './contenedores/Class.js';
import productosRouter from './routes/productos.js';
import carritoRouter from './routes/carrito.js';
import {Server} from 'socket.io';
import __dirname from './utiles.js';
import { authMiddleware } from './utiles.js';

const app = express();
const PORT = 3000;
const server = app.listen(PORT,()=>{
    console.log("servidor escuchando en: "+PORT);
})

const contenedor = new Contenedor();
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
app.use('/api/productos',productosRouter);
app.use('/api/carrito',carritoRouter);

app.get('/views/productos',(req,res)=>{
    contenedor.getAll().then(result=>{
        let info = result.payload;
        let preparedObject = {
            products : info
        }
        res.render('productos',preparedObject);
    })
})

let messages =[];
io.on('connection', async socket=>{
    console.log(`El socket ${socket.id} se ha conectado`);
    let productos = await contenedor.getAll();
    socket.emit('updateProducts',productos);
})
