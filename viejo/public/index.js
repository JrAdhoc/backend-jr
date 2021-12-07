document.addEventListener('submit', event=>{
    let newProdForm = document.querySelector('newProduct');
    let newProdData = new FormData(newProdForm);
    fetch('http://localhost:4000/api/products',{
        method: 'POST',
        body:newProdData
    }).then(result=>{
        return result.json();
    }).then(json=>{
        console.log(json);
    })

    let modifProdForm = document.querySelector('modifProduct');
    let modifProdData = new FormData(modifProdForm);
    fetch('http://localhost:4000/api/products',{
        method: 'PUT',
        body:modifProdData
    }).then(result=>{
        return result.json();
    }).then(json=>{
        console.log(json);
    })

    let delProdForm = document.querySelector('delProduct');
    let delProdData = new FormData(delProdForm);
    fetch('http://localhost:4000/api/products',{
        method: 'PUT',
        body:delProdData
    }).then(result=>{
        return result.json();
    }).then(json=>{
        console.log(json);
    })
})
