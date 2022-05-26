import config from './config.js';
import passport from 'passport';
import local from 'passport-local';
import { userService } from './services/services.js';
import { createHash,isValidPassword } from './utiles.js';
import jwt from 'passport-jwt';
import { cookieExtractor } from './utils/cookieExtractor.js';

const LocalStrategy = local.Strategy;
const JWTStrategy = jwt.Strategy;
const ExtractJWT = jwt.ExtractJwt;

const initializePassport = () =>{
    passport.use('register', new LocalStrategy({
        usernameField:"email",
        passwordField:"password",
        passReqToCallback:true,
        session:false
    },async(req,email,password,done)=>{
        let {first_name,last_name,phone} = req.body;
        try {
            let user = await userService.getBy({email:email});
            if(user) return done(null,false,{message:"User already exists!"});
            const newUser = {
                first_name,
                last_name,
                password:createHash(password),
                role:"user",
                email,
                phone,
                cart:[],
                profile_picture: req.protocol+"://"+req.hostname+":8080"+'/images/'+req.file.filename
            }
            let result = await userService.save(newUser);

            return done(null,result);
        } catch (error) {
            console.log(error);
            return done(error);
        }
    }))
    passport.use('login',new LocalStrategy({usernameField:"email"},async(username,password,done)=>{
        try {
            // if(username===config.session.ADMIN||password===config.session.PASSWORD){
            //     return done(null,{id:0,role:"admin"})
            // }
            const user = await userService.getBy({email:username});
            if(!user) return done(null,false,{message:"Email not found"});
            if(!isValidPassword(user,password)) return done(null,false,{message:"Incorrect password!"});
            return done(null,user)
        } catch (error) {
            console.log(error);
            return done(error);
        }
    }))

    passport.use('jwt', new JWTStrategy({jwtFromRequest:ExtractJWT.fromExtractors([cookieExtractor]),
        secretOrKey:config.jwt.SECRET},
        async(jwt_payload,done)=>{
            try{
                if(jwt_payload.role==='superadmin') return done(null, jwt_payload);
                let user = await userService.getBy({_id:jwt_payload._id});
                if(!user) return done(null,false,{message:'User not found'})
                return done(null,user)
            }catch(error){
                logger.error(error)
            }
    }))

    passport.serializeUser((user,done)=>{
        done(null,user._id);
    })
    passport.deserializeUser(async(id,done)=>{
        let result = await userService.getBy({_id:id})
        done(null,result);
    })

}

export default initializePassport;