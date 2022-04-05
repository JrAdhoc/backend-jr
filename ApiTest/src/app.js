import express from 'express';
import MongoClient from './models/MongoClient.js';
import userRouter from './routes/userRoutes.js';

const app = express();
const server = app.listen(4001,()=>console.log('Now Listening'));

app.use(express.urlencoded({extended:true}));
app.use(express.json());

new MongoClient();

app.use('/users',userRouter);
