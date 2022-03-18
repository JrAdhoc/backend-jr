import dotenv from 'dotenv';
dotenv.config();

export default{
    mongo:{
        url: process.env.MONGO_URL || 'mongodb+srv://juanirivero:juanirivero@mariacala.ud2da.mongodb.net/ecommerce?retryWrites=true&w=majority',
        sessionUrl: process.env.SESSION_URL
    },
    session:{
        ADMIN:process.env.ADMIN,
        PASSWORD:process.env.PASSWORD
    },
    jwt:{
        SECRET:process.env.SECRET_JWT
    }
}
