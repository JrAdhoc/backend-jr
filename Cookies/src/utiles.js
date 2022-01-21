import {fileURLToPath} from 'url';
import {dirname} from 'path';
import faker from 'faker';

const filename = fileURLToPath(import.meta.url);
const __dirname = dirname(filename);

export const authMiddleware = (req,res,next)=>{
    if(!req.auth){
        res.status(403).send({error:-2,message:"No autorizado"})
    }else{
        next();
    }
}

export const generarProductos = () =>{
    let productos = [];
    for(let i=0;i<5;i++){
        productos.push({
            name: faker.commerce.productName(),
            price: faker.commerce.price(),
            thumbnail: faker.image.fashion()
        })
    }
    return productos;
}

export default __dirname;