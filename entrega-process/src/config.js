import __dirname from './utiles.js';
import dotenv from 'dotenv'


dotenv.config();

export default{mongo:{baseURL:process.env.MONGO_BASE_URL}}


