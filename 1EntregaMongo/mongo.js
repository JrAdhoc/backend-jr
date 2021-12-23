Comandos:

-use ecommerce
db.createCollection("mensajes")
db.createCollection("productos")

db.productos.insertMany([
    {title: "Heladera Carrier", description:"Heladera inverter",price:70000,thumbnail:"https://http2.mlstatic.com/D_NQ_NP_781119-MLA31632168129_072019-O.jpg"},
    {title: "Conservadora", description:"Ahora que se viene el veranito",price:6000,thumbnail:"https://http2.mlstatic.com/D_NQ_NP_781119-MLA31632168129_072019-O.jpg"},
    {title: "Microondas", description:"Calentate rapido la comida",price:40000,thumbnail:"https://http2.mlstatic.com/D_NQ_NP_781119-MLA31632168129_072019-O.jpg"},
    {title: "Cafetera", description:"Cafetera para arrancar la mañana con toda",price:10000,thumbnail:"https://http2.mlstatic.com/D_NQ_NP_781119-MLA31632168129_072019-O.jpg"},
    {title: "Yogurthera", description:"Yogurthera pa hacerse desayuno",price:3000,thumbnail:"https://http2.mlstatic.com/D_NQ_NP_781119-MLA31632168129_072019-O.jpg"},
    {title: "Aire acondicionado", description:"Aire acondicionado etc etc",price:80000,thumbnail:"https://http2.mlstatic.com/D_NQ_NP_781119-MLA31632168129_072019-O.jpg"},
    {title: "Termo Stanley", description:"Termo Stanley etc etc",price:11000,thumbnail:"https://http2.mlstatic.com/D_NQ_NP_781119-MLA31632168129_072019-O.jpg"},
    {title: "Lavarropas", description:"Lavarropas etc etc",price:52000,thumbnail:"https://http2.mlstatic.com/D_NQ_NP_781119-MLA31632168129_072019-O.jpg"},
    {title: "Freezer", description:"Freezer etc etc",price:65000,thumbnail:"https://http2.mlstatic.com/D_NQ_NP_781119-MLA31632168129_072019-O.jpg"},
    {title: "Televisor smart", description:"Televisor smart etc etc",price:86000,thumbnail:"https://http2.mlstatic.com/D_NQ_NP_781119-MLA31632168129_072019-O.jpg"},
])

db.mensajes.insertMany([
    {message: "hola como andas", email:"juancarrerasrm@gmail.com"},
    {message: "Bien y vos?", email:"carlos25@gmail.com"},
    {message: "Todo tranquilo, que andás haciendo?", email:"juancarrerasrm@gmail.com"},
    {message: "Acá haciendo una entrega del curso, vos?", email:"carlos25@gmail.com"},
    {message: "Si yo tambien, estoy dando mongodb", email:"juancarrerasrm@gmail.com"},
    {message: "Yo tambien!", email:"carlos25@gmail.com"},
    {message: "Está bueno, encima el tutor es re buena onda", email:"juancarrerasrm@gmail.com"},
    {message: "Si, el mio tambien!", email:"carlos25@gmail.com"},
    {message: "Tambien es muy bueno el profe", email:"juancarrerasrm@gmail.com"},
    {message: "Un exito!", email:"carlos25@gmail.com"},

])



db.productos.find().pretty()
db.mensajes.find().pretty()


db.productos.count()
db.productos.count()


db.productos.insertOne({title: "Monitor samsung", description:"Monitor ultra hd",price:34675,thumbnail:"https://http2.mlstatic.com/D_NQ_NP_781119-MLA31632168129_072019-O.jpg"})


db.productos.find({price:{$lt:1000}})
db.productos.find({price:{$in:[1000,3000]}})
db.productos.find({price:{$gt:3000}})
db.productos.find({},{"title":1}).sort({price:1}).skip(2).limit(1)

db.productos.updateMany({},{$set:{stock:100}})

db.productos.updateMany({price:{$gt:20000}},{$set:{stock:0}})

db.productos.deleteMany({price:{$lt:10000}})

db.createUser({user:"pepe",pwd:"asd456",roles:[{role:"read",db:"ecommerce"}]})
