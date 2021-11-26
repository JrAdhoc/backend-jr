import express from 'express';
const app = express();
const server =  app.listen(8080,()=>{
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


app.set('view engine','ejs');
app.use(express.static('public'))
app.use(express.json());
app.use(express.urlencoded({extender:true}))
app.get('/',(req,res)=>{
    let renderObject={
        nombre:"coders"
    }
    res.render('formulario',renderObject)
})

app.post('/products',(req,res)=>{
    let product={
        title=req.body.title,
        price=req.body.price,
        thumbnail=req.body.thumbnail,

    }
products.push(product);
});
