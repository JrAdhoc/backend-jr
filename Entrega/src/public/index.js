import Chats from "../services/Chats";

const socket = io();

let fecha = new Date();

function FechayHora(fecha){
    let datoFecha = `${fecha.getDay()}/${fecha.getMonth()+1}/${fecha.getFullYear()}`;
    let datoHora = `${fecha.getHours()}:${fecha.getMintues()+1}:${fecha.getSeconds()+1}`
    let momentoActual ={
        fecha: datoFecha,
        hora: datoHora
    };
    return momentoActual;
}

socket.on('updateProducts', data=>{
    
    let products = data.payload;
    fetch('templates/productTable.handlebars').then(string=>string.text()).then(template=>{
        const processedTemplate = Handlebars.compile(template);
        const templateObject={
            products:products
        }
        const html = processedTemplate(templateObject);
        let div = document.getElementById('productTable');
        div.innerHTML = html; 
    })
})
 //CHAT EN VIVO
let input = document.getElementById('mensaje');
let email = document.getElementById('email');

input.addEventListener('keyup',(e)=>{
    if(e.key === "Enter"){
        socket.emit('message',{email: email.value,message:e.target.value});
    }
})

socket.on('messagelog',data=>{
    let p = document.getElementById('log');
    let mensajes = data.map(message=>{
        let fecha = new Date();
        return `<div><span>${message.email} [${fecha.getDate()}/${fecha.getMonth()+1}/${fecha.getFullYear()} ${fecha.getHours()}:
            ${fecha.getMinutes()}:${fecha.getSeconds()}]: ${message.message}</span></div>`
    }).join('');
    p.innerHTML = mensajes;
})

document.addEventListener('submit',enviarFormulario);
function enviarFormulario(event){
    event.preventDefault();
    const form = document.getElementById('productForm');
    const data = new FormData(form);
    fetch('/api/productos',{
        method:'POST',
        body:JSON.stringify({
            name:data.get("title"),
            price:data.get("price"),
            thumbnail:data.get("thumbnail")
        }),
        headers:{"Content-type": "application/json"}
    }).then(result=>{
        return result.json();
    }).then(json=>{
        console.log(json);
    })
}
