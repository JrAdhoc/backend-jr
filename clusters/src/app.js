const express = require('express');
const cluster = require('cluster');
const core = require('os');
const minimist = require('minimist');
const {fork} = require('child_process');


let minimizedArgs = minimist(process.argv.slice(2));

let config = {
    port : minimizedArgs.port||4041,
    modo: minimizedArgs.modo||"FORK"
}

const app = express();

if(config.modo === "CLUSTER"){
    if(cluster.isMaster){
        console.log(`Proceso primario con pid ${process.pid}`)
        for(let i=0;i<core.cpus().length;i++){
             cluster.fork();
        }
        cluster.on('exit',(worker,code,signal)=>{
            console.log(`worker ${worker.process.pid} finalizado`);
            cluster.fork();
            console.log(`worker restaurado`);
        })
    }else{
        console.log(`Soy un worker con pid ${process.pid}`)
        const server = app.listen(config.port,()=>console.log(`Servidor escuchando en ${config.port} con ${config.modo}`))
    }
}
if(config.modo === "FORK"){
    const server = app.listen(config.port,()=>console.log(`Servidor escuchando en ${config.port} con ${config.modo}`))
}

app.get('/info',(req,res)=>{
    let object = {
        'Argumentos': process.argv.slice(2),
        'Sistema operativo' : process.platform,
        'Version de node' : process.version,
        'Memoria total reservada (rss)' : JSON.stringify(process.memoryUsage().rss),
        'Path de ejecucion' : process.argv[1],
        'Id del proceso' : process.pid,
        'Carpeta del proyecto' : process.cwd(),
        'Numero de procesadores' : core.cpus().length
    }
    console.log("Informacion recibida!")
    res.send(object)
})

app.get('/api/randoms',(req,res)=>{
    const cant = req.query.cant || 1000000
    const child = fork('randoms.js',[cant]);
    child.on('message',(data=>{
        console.log(data);
        res.send({payload: data})
    }))
})



