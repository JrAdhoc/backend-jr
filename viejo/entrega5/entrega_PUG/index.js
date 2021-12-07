function saveProduct(e) {
    e.preventDefault();
    let form = document.getElementById('formulario')Map;
    let data = new FormData(form);

    let title = data.get('title');
    let price = data.get('price');
    let thumbnail = data.get('thumbnail');
    
    let product={
     title : title,
     price : price,
     thumbnail : thumbnail,
    }


    fetch('/products',{
        method:'POST',
        body:product,
        headers:{
            'Content-type' : 'application/json'
        }
    })
