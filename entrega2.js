const fs = require('fs')


export class contenedor {
    constructor(title, price, thumbnail, id) {
        this.title = title;
        this.price = price;
        this.thumbnail = thumbnail;
        this.id = id;

    }
    save(objeto) {
        let productos = [];

        try {
            const data = fs.readFileSync('./products.txt', 'utf8')
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

        fs.writeFile('./products.txt', `${dataToWrite}`, error => {
            if (error) {
                console.log("no se pudo agregar");
            }
            else {
                console.log('Producto Agregado!');

            }
        });

        return (ultimoElemento.id + 1);



    }
    getByID(num) {
        let productos;

        try {
            const data = fs.readFileSync('./products.txt', 'utf8')
            if (data !== "") {
                productos = JSON.parse(data);
                console.log(productos.filter(x => x.id === num));
            }
        } catch (err) {
            console.error(err)
        };
    };
    getAll() {
        let productos;

        try {
            const data = fs.readFileSync('./products.txt', 'utf8')
            if (data !== "") {
                productos = JSON.parse(data);
                console.log(productos);
            }
        } catch (err) {
            console.error(err)
        };
        return productos;
    };
    deleteById(num) {
        let productos;

        try {
            const data = fs.readFileSync('./products.txt', 'utf8')
            if (data !== "") {
                productos = JSON.parse(data);
                let removeIndex = productos.map(item => item.id).indexOf(num);
                ~removeIndex && productos.splice(removeIndex, 1);
            }
        } catch (err) {
            console.error(err)
        };

        let dataToWrite = JSON.stringify(productos);
        fs.writeFile('./products.txt', `${dataToWrite}`, error => {
            if (error) {
                console.log("no se pudo agregar");
            }
            else {
                console.log('Producto borrado!');

            }
        });
    };
    deleteAll() {
        fs.writeFile('./products.txt', "", error => {
            if (error) {
                console.log("no se pudo agregar");
            }
            else {
                console.log('Borrado!');

            }
        });
    }
}

const usuario = new contenedor('Casco de Hockey', 2300, 'https://static.turbosquid.com/Preview/2014/05/20__16_18_32/aHockeyhelmetsporticeprofessionalhat0001.jpgf31d4a54-2c8f-496f-9455-9d2885f46be3Large.jpg');


 usuario.save(usuario);
// usuario.getByID(3);
// usuario.getAll();
// usuario.deleteById(4);
// usuario.deleteAll();


