import express from "express";
import {engine} from 'express-handlebars';
import cors from 'cors';
import ContenedorImport from "./src/classes/contenedor.js";
import productsRouter from "./src/routes/products.js";
const app = express();
const contenedor = new ContenedorImport();
import {Server} from 'socket.io';

const server =  app.listen(5001,()=>{
    console.log("listening");
})



// let products=[];
// try {
//     const data = fs.readFileSync('./products.txt', 'utf8')
//     if (data !== "") {
//         products = JSON.parse(data);
//     }
// } catch (err) {
//     console.error(err)
// }



app.engine("handlebars", engine());
app.set("views", "./src/views");
app.set("view engine", "handlebars");
app.use(cors());
app.use(express.static('public'))   
app.use('/api/products',productsRouter);
app.use(express.json());
app.use(express.urlencoded({extended:true}));
// app.use(express.urlencoded({extender:true}))


app.get('/', (req, res) => {
    res.render('formulario');
});
app.get('/views/products',(req,res)=>{  
    contenedor.getAll().then(result=>{
        let info = result.playload;
        let preparedObject = {
            products : info
        }
        res.render('products',preparedObject);
    })
})


app.post('/products',(req,res)=>{
    let product={
        title:req.body.title,
        price:req.body.price,
        thumbnail:req.body.thumbnail,

    }
products.push(product);
});
