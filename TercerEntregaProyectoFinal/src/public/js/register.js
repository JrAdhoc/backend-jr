let submitBtn = document.getElementById('submitButton');
let form = document.getElementById('formRegister');

submitBtn.addEventListener('click',(event)=>{
    event.preventDefault();
    let data = new FormData(form)
    console.log(data)
    fetch('/session/register',{
        method:'POST',
        body:data
    }).then(result=>result.json()).then(json=>{
        console.log(json)
        location.replace('../pages/login.html')
    });
})