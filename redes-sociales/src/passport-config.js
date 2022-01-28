import passport from "passport";
import fbStrategy from 'passport-facebook';
import User from "./model/userSchema.js";
import Users from "./services/user.js";
import {userService} from './app.js';


const facebookStrategy = fbStrategy.Strategy;
const initializePassportConfig = () => {
    passport.use('facebook', new facebookStrategy({
        clientID: '267937618635196',
        clientSecret: '582ad125740332608ad38205ccd55bbc',
        callbackURL: 'https://fbcb-181-230-77-226.ngrok.io/auth/facebook/callback',
        profileFields:['emails', 'picture', 'displayName']
    },async (accessToken,refreshToken,profile,done)=>{
        try{
            console.log(profile);
            let exist = await userService.getBy({email:profile.emails[0].value});
            if(!exist){
                let sendObject = {
                    email:profile.emails[0].value,
                    avatar:profile._json.picture.data.url,
                    name:profile.displayName
                }
                console.log('////')
                console.log(sendObject)
                await userService.saveUser(sendObject)
                let user = await userService.getBy(sendObject.email)
                done(null,user);
            }
            done(null,exist);
        }catch(error){
            done(error)
        }
    }))

    passport.serializeUser((user,done)=>{
        done(null,user._id);
    })
    passport.deserializeUser((user,done)=>{
        userService.getBy(id,done);
    })

}


export default initializePassportConfig;
