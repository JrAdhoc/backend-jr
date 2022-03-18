let form = document.getElementById('registerForm');

form.addEventListener('submit',(evt)=>{
    evt.preventDefault();
    let data = new FormData(form);
    let obj = {};
    data.forEach((value,key)=>obj[key]=value)
    fetch('/register',{
        method:'POST',
        body:data
    }).then(result=>result.json()).then(json=>{
        console.log(json)
        location.replace('/')
    });
})
