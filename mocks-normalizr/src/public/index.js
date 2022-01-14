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

const email = document.getElementById('email');
const nombre = document.getElementById('nombre');
const apellido = document.getElementById('apellido');
const edad = document.getElementById('edad');
const alias = document.getElementById('alias');
const avatar = document.getElementById('avatar');
const input = document.getElementById('mensaje');



input.addEventListener('keyup',(e)=>{
    if(e.key === "Enter"){
        try{
            let objeto = {
                author:{
                    id: email.value,
                    nombre:nombre.value,
                    apellido:apellido.value,
                    edad:edad.value,
                    alias:alias.value,
                    avatar:avatar.value
                },
                text: e.target.value
            }
            socket.emit('message',objeto);
        }catch(error){
            return {status:"error",error:error}
        }
    }
})

socket.on('messagelog',data=>{
    let div = document.getElementById('log');
    let mensajes = data.map(message=>{
        let fecha = new Date();
        return `<div><span><b style="color:blue;">${message.author.id}</b> <span style="color:brown;">[${fecha.getDate()}/${fecha.getMonth()+1}/${fecha.getFullYear()} ${fecha.getHours()}:
            ${fecha.getMinutes()}:${fecha.getSeconds()}]</span>: <span style="color: green; font-family:Lucida sans;">${message.text}</span><img src="${message.avatar}" /></span></span></div>`
    }).join('');
    div.innerHTML = mensajes;
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