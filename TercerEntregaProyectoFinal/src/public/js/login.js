let submitBtn = document.getElementById('submitButton');
let form = document.getElementById('loginForm');

submitBtn.addEventListener('click',(event)=>{
    event.preventDefault();
    let sendObject = {}
    let data = new FormData(form)
    data.forEach((value,key)=>sendObject[key]=value)
    fetch('/session/login',{
        method:"POST",
        body:JSON.stringify(sendObject),
        headers:{
            'Content-Type':"application/json"
        }
    }).then(result=>{
        if(result.status===404){
            return window.alert('Usuario o contraseña inválidos')
         }
         else{
             location.replace('/session/profile')
         }
    });
})
