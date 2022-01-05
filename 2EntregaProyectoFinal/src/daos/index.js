let productos;
let carrito;
let persistencia = 'mongo';

switch(persistencia){
    case "fileSystem":
        const  {default:ProductosFileSystem} = await import('./productos/productosFileSystem.js');
        const {default:CarritoFileSystem} = await import('./carrito/carritoFileSystem.js');
        productos = new ProductosFileSystem();
        carrito = new CarritoFileSystem();
        break;
    case "mongo":
        const {default:ProductosMongo} = await import('./productos/productosMongo.js');
        const {default:CarritoMongo} = await import('./carrito/carritoMongo.js');
        productos = new ProductosMongo;
        carrito = new CarritoMongo;
        break;
    case "firebase":
        const {default:ProductosFirebase} = await import('./productos/productosFirebase.js');
        const {default:CarritoFirebase} = await import('./carrito/carritoFirebase.js');
        productos = new ProductosFirebase;
        carrito = new CarritoFirebase;
        break;
    default:

}
export {productos, carrito}
