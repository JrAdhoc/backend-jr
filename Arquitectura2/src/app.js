import express from 'express';
import userRouter from './routes/usersRouter.js';
import MongoClient from './daos/MongoClient.js';

const app = express();
const server = app.listen(4001,()=>console.log("Now Listening"));
// let client = new MongoClient();
// client.connect();

app.use(express.json())
app.use('/users',userRouter);
