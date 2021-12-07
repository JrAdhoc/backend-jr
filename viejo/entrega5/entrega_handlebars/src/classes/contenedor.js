import * as fs from "fs";


class ContenedorImport {
    constructor(title, price, thumbnail, id) {
        this.title = title;
        this.price = price;
        this.thumbnail = thumbnail;
        this.id = id;

    }
    async save(objeto) {
        let productos = [];

        try {
            let data = await fs.promises.readFile('./src/files/products.txt', 'utf8')
            if (data !== "") {
                productos = JSON.parse(data);
                console.log(productos);
            }
        } catch (err) {
            console.error(err)
        };
        let ultimoElemento = productos[(productos.length - 1)]

        if (ultimoElemento == null) {
            ultimoElemento = { id: 0 }
        }

        let devolver = { title: this.title, price: this.price, imagen: this.thumbnail, id: (ultimoElemento.id + 1) };
        productos.push(devolver);
        let dataToWrite = JSON.stringify(productos);

        await fs.writeFile('./src/files/products.txt', `${dataToWrite}`, error => {
            if (error) {
                console.log("no se pudo agregar");
            }
            else {
                console.log('Producto Agregado!');

            }
        });

        return (ultimoElemento.id + 1);



    }
    async getByID(num) {
        let productos;

        try {
            const data = await fs.readFileSync('./src/files/products.txt', 'utf8')
            if (data !== "") {
                productos = JSON.parse(data);
                console.log(productos.filter(x => x.id === num));
            }
        } catch (err) {
            console.error({error: 'Producto no encontrado!'})
        };
    };
    async getAll() {
        let productos;

        try {
            const data = await fs.readFileSync('./src/files/products.txt', 'utf8')
            if (data !== "") {
                productos = JSON.parse(data);
                console.log(productos);
            }
        } catch (err) {
            console.error(err)
        };
        return productos;
    };
    async deleteById(num) {
        let productos;

        try {
            const data = await fs.readFileSync('./src/files/products.txt', 'utf8')
            if (data !== "") {
                productos = JSON.parse(data);
                let removeIndex = productos.map(item => item.id).indexOf(num);
                ~removeIndex && productos.splice(removeIndex, 1);
            }
        } catch (err) {
            console.error({error: 'Producto no encontrado!'})
        };

        let dataToWrite = JSON.stringify(productos);
        await fs.writeFile('./src/files/products.txt', `${dataToWrite}`, error => {
            if (error) {
                console.log("no se pudo agregar");
            }
            else {
                console.log('Producto borrado!');

            }
        });
    };
    async deleteAll() {
        await fs.writeFile('./src/files/products.txt', "", error => {
            if (error) {
                console.log("no se pudo agregar");
            }
            else {
                console.log('Borrado!');

            }
        });
    }
    async getRandom() {
        let productosRandom;
        let productoRandom;

        try {
            const data = await fs.readFileSync('./src/files/products.txt', 'utf8')
            if (data !== "") {
                productosRandom = JSON.parse(data);
                productoRandom = JSON.stringify(productosRandom[Math.floor(Math.random()*productosRandom.length)]);
            }
        } catch (err) {
            console.error(err)
        };
        return productoRandom;
    };
    async updateProduct(num, newTitle, newPrice, newThumbnail) {
        let productos;

        try {
            const data = await fs.readFileSync('./src/files/products.txt', 'utf8')
            if (data !== "") {
                productos = JSON.parse(data);
                let updatingProduct = productos.map(item => item.id).indexOf(num);
                ~removeIndex && productos.splice(removeIndex, 1);
                if(newTitle){
                    updatingProduct.title = newTitle;
                };
                if(newPrice){
                    updatingProduct.price = newPrice;
                };
                if(newThumbnail){
                    updatingProduct.imagen = newThumbnail;
                };
                updatingProduct.id = num;
                productos.push(updatingProduct);

            }
        } catch (err) {
            console.error(err)
        };

        let dataToWrite = JSON.stringify(productos);
        await fs.writeFile('./src/files/products.txt', `${dataToWrite}`, error => {
            if (error) {
                console.log("no se pudo agregar");
            }
            else {
                console.log('Producto borrado!');

            }
        });
    };
}


export default ContenedorImport;
