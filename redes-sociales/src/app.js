import express from 'express';
import cors from 'cors';
import {Server} from 'socket.io';
import __dirname from './utiles.js';
import { generarProductos } from './utiles.js';
import ChatSchema from './model/chatSchema.js';
import UserSchema from './model/userSchema.js';
import session from 'express-session';
import MongoStore from 'connect-mongo';
import passport from 'passport';
// import { Mongoose } from 'mongoose';
import ios from 'socket.io-express-session';
import initializePassportConfig from './passport-config.js';


const app = express();
const PORT = process.env.PORT||4001;
const server = app.listen(PORT,()=>{
    console.log("servidor escuchando en: "+PORT);
})

const baseSession = (session({
    store:MongoStore.create({mongoUrl:"mongodb+srv://juanirivero:a1s2d3@mariacala.ud2da.mongodb.net/sessions?retryWrites=true&w=majority",ttl:10}),
    resave:false,
    saveUninitialized:false,
    secret:"CoderChat",
    cookie:{MaxAge:600000}
}));

export const io = new Server(server);
const chatService = new ChatSchema();
export const userService = new UserSchema();

app.use(express.json());
app.use(cors());
app.use(express.urlencoded({extended:true}));
app.use(express.static(__dirname+'/public'));
app.use(baseSession);
io.use(ios(baseSession));
initializePassportConfig();
app.use(passport.initialize());
app.use(passport.session());

app.get('/auth/facebook', passport.authenticate('facebook',{scope:['email']}),(req,res)=>{

})
app.get('/auth/facebook/callback', passport.authenticate('facebook',{
    failureRedirect:'/paginadeFail'
}), async (req,res)=>{
    let user = req.user;	
    res.send({message:"logged in!",payload:user})
});





app.get('/api/productos-test',(req,res)=>{
    let productos = generarProductos();
    let preparedObject ={
        products:productos
    }
    res.render('productos-test',preparedObject);
})

app.get('/currentUser',(req,res)=>{
    res.send(req.session.user);

})

app.post('/register',(req,res)=>{
    let object = req.body;
    let result = userService.saveUser(object);
    res.send({message:"Usuario creado",user:result});
})

app.post('/login', async(req,res)=>{
    let {email,password} = req.body;    
    if(!email || !password) return res.status(400).send({error:"datos incompletos"});
    const usuario = await userService.getBy({email:email});
    if(!usuario) res.status(404).send({error:"Usuario no encontrado"})
    if(usuario.password!==password) return res.status(400),send({error:"Contraseña incorrecta"});
    req.session.user={
        username:usuario.username,
        email:usuario.email
    }  
    res.send({status:"Logueado correctamente!"})
})

io.on('connection',async socket=>{
    console.log(`El socket ${socket.id} se ha conectado`);
    socket.on('message',async data=>{
        const user = await userService.getByUsername(socket.handshake.session.user.username)
        console.log(user);
        let message={
            user:user._id,
            text:data.message
        }
        await chatService.cargarMensaje(message);
        const messages =  await chatService.verMensajes()
        io.emit('messagelog', messages);
    })
})

app.get('/logout',(req,res)=>{
    req.logout();
})