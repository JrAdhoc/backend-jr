import express from "express";
import * as fs from "fs";
import {engine} from 'express-handlebars';
import {Server} from 'socket.io';
import __dirname from './utils.js';

const app = express();
const server =  app.listen(5001,()=>{
    console.log("listening");
})

let products=[];
try {
    const data = fs.readFileSync('./products.txt', 'utf8')
    if (data !== "") {
        products = JSON.parse(data);
    }
} catch (err) {
    console.error(err)
}



app.set('views',__dirname+'/views')

app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.use(express.static('public'))
app.use(express.json());
// app.use(express.urlencoded({extender:true}))


app.get('/', (req, res) => {
    res.render('formulario');
});

// app.get('/',(req,res)=>{
//     let renderObject={
//         formulario:"info"
//     }
//     res.render('formulario',renderObject)
// })

app.post('/products',(req,res)=>{
    let product={
        title:req.body.title,
        price:req.body.price,
        thumbnail:req.body.thumbnail,

    }
products.push(product);
});
