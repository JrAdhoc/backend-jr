import express from 'express';
import cluster from 'cluster';
import { cpus } from 'os';
import compression from 'compression';
import log4js from 'log4js';

const PORT = parseInt(process.argv[2])||8080;
const isCluster = process.argv[3] === "CLUSTER";
const app = express();

log4js.configure({
    appenders:{
        console:{type:"console"},
        warnFile:{type:"file",filename:"./warn.log"},
        errorFile:{type:"file",filename:"./error.log"},
        errorLevelFilter:{
            type:"logLevelFilter",
            level:"error",
            appender:"errorFile"   
        },
        warnLevelFilter:{
            type:"logLevelFilter",
            level:"warn",
            appender:"warnFile"
        }
    },categories:{
        default:{
            appenders:["console","warnLevelFilter","errorLevelFilter"],level:"all"
        }
    }
})

const logger = log4js.getLogger();

app.use(compression());

if(isCluster&&cluster.isMaster){
    const numCPUs = cpus().length;
    console.log(`PID Master: ${process.pid}`);
    for(let i=0;i<numCPUs;i++){
        cluster.fork();
    }
    cluster.on('exit',worker=>{
        console.log(`worker ${worker.process.pid} dejó de funcionar`);
        cluster.fork();
    })
}else{
    app.listen(PORT,()=>{
        console.log(`PID worker trabajando en puerto ${PORT}`)
    })
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
        'Numero de procesadores' : cpus().length
    }
    console.log("Informacion recibida!");
    logger.info(object);
    res.send(object);
})

app.get('/',(req,res)=>{
    res.send("WARN!");
    logger.warn("Ruta incorrecta o inexistente");
})

app.get('/error',(req,res)=>{
    res.send("ERROR!");
    logger.error("Error!")
})
