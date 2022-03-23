import express from 'express';
import { passportCall } from '../utils/middlewares.js';
import { uploader } from '../services/uploader.js'
import { createTransport } from 'nodemailer';
import { productService } from '../services/services.js';
import dotenv from 'dotenv';
import config from '../config.js'
import jwt from 'jsonwebtoken';
import { io } from '../app.js'
import __dirname from '../utiles.js'

dotenv.config();
const router = express.Router();

const appUser = process.env.TRANSPORT_USER;
const appPwd = process.env.TRANSPORT_PWD;
const transport = createTransport({
    service:"gmail",
    port:587,
    auth:{
        user:appUser,
        pass: appPwd
    }
})


router.post('/register',uploader.single('avatar'),passportCall('register'),(req,res)=>{
    const mail={    
        from:"Ecommerce",
        to:"juanii.rivero@gmail.com",
        subject:"New Register",
        html:`<h1>New user:</h1></br>
        <h3>
            Email: "${req.body.email}"</br>
            Name: "${req.body.name}"</br>
            Age: "${req.body.age}"</br>
            Address: "${req.body.address}"</br>
            Phone: "${req.body.phone}"</br>
        </h3>
        `
    }
    transport.sendMail(mail);
    res.send({message:"Signed up"})
})

router.post('/login',passportCall('login'),(req,res)=>{
    let user = req.user;
    let token = jwt.sign(user,config.jwt.SECRET);
    res.cookie('JWT_COOKIE',token,{
        httpOnly:true,
        maxAge:1000*60*60
    })
    res.send({message:"Logged in!"})
})

router.get('/register',(req,res)=>{

    res.sendFile(path.join(__dirname + '/index.html'));
})

router.get('/current',passportCall('jwt'),(req,res)=>{
    let user = req.user;
    res.send(user);
})

router.get('/profile',passportCall('jwt'),(req,res)=>{
    let user = req.user;
    io.on('connection', async socket=>{
        let products = await productService.getAll();
        console.log(products)
        socket.emit('showProducts', products);
    })
    res.render('profile',user);
})

router.get('/logout',(req,res)=>{
    res.clearCookie('JWT_COOKIE')
    res.send({message:'Logged Out'})
})

export default router;
