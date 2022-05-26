import dotenv from 'dotenv';
dotenv.config();

export default{
    mongo:{
        url: process.env.MONGO_URL,
        sessionUrl: process.env.SESSION_URL
    },
    session:{
        ADMIN:process.env.ADMIN,
        PASSWORD:process.env.PASSWORD
    },
    jwt:{
        SECRET:process.env.SECRET_JWT,
        COOKIE_NAME:process.env.COOKIE_NAME
    }
}