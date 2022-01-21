const socket = io();
let user;
fetch('/currentUser').then(result=>result.json()).then(json=>{
    user=json;
    console.log(user);
    let nombreUser = document.getElementById('user')
    nombreUser.innerHTML = user.username;
})

let input = document.getElementById('message');

input.addEventListener('keyup',(event)=>{
    if(event.key==="Enter"){
        if(event.target.value){
            fetch('/currentUser').then(result=>result.json()).then(json=>{
                if(event.target.value){
                    socket.emit('message',{message:event.target.value});
                    event.target.value="";
                }
                let user = json;
                console.log(user);
            }).catch(()=>{
                alert("Su sesion a expirado, ingrese su cuenta nuevamente.");
                location.replace('../pages/login.html')
            })
        }
    }
})

socket.on("messagelog",data=>{
    let p = document.getElementById("log");
    let messages = data.map(message=>{
        return `<div><span>${message.user.username} dice: ${message.text}</span></div>`
    }).join('');
    p.innerHTML = messages;
})