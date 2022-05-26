import { createTransport } from 'nodemailer';
import dotenv from 'dotenv';
import config from '../config.js'
import jwt from 'jsonwebtoken';
import {serialize} from '../utiles.js'

dotenv.config();

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

const register = async(req,res)=>{
        const mail={    
            from:"Ecommerce Coder", 
            to:"juanii.rivero@hotmail.com",
            subject:"New Register",
            html:`<h1>New user:</h1></br>
            <h3>
                Email: "${req.body.email}"</br>
                First Name: "${req.body.first_name}"</br>
                Last Name: "${req.body.last_name}"</br>
                Phone: "${req.body.phone}"</br>
            </h3>
            `
        }
        transport.sendMail(mail);
        res.send({status:"success",message:"Signed up"})
}

const login = async(req,res)=>{
    let user;
    if(req.user.role!=='superadmin'){
        user = req.user;
    }else{
        user = req.user;    
    }
    let token = jwt.sign(user,config.jwt.SECRET);
    res.cookie(config.jwt.COOKIE_NAME,token,{
        httpOnly:true,
        maxAge:1000*60*60
    })
    res.cookie('sessionCookie','boom',{
        maxAge:60*60*1000
    })
    res.send({status:"success",payload:{user}});
}

const current = async(req,res)=>{
    let user = serialize(req.user,["first_name","last_name","role","profile_picture","cart"]);
    res.send({status:"succcess",payload:user}); 
}

const profile = async(req,res)=>{
    let user = req.user;
    io.on('connection', async socket=>{
        let products = await productService.getAll();
        console.log(products)
        socket.emit('showProducts', products);
    })
    console.log(user)
    res.render('profile',user);
}

const logout = async(req,res)=>{
    res.clearCookie('JWT_COOKIE')
    res.send({message:'Logged Out'})
}

export default{
    register,
    login,
    current,
    profile,
    logout
}
