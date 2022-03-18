fetch('/session/current',{
    method: 'GET',
    credentials: 'include'
}).then(result=>result.json()).then(json=>{
    if(json.error){
        location.replace('/session/login')
    }else{
        location.replace('/session/profile')
    }
})