import jwt from 'jsonwebtoken';
const register = async(req,res) =>{
    console.log(req.user);
    res.send({message:"Registrado"})
}
const login = async(req,res)=>{
    let user = req.user;
    console.log(req.user);
    let token = jwt.sign(user,"codercoder")
    res.cookie("MVC_JWT_COOKIE",token,{
        httpOnly:true,
        maxAge:60*60*1000
    })
    res.send({message:"Logueado"})
}



export default {
    register,
    login
}
