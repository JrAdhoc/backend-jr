const socket = io();

socket.on('showProducts', data =>{
    console.log(data)
    fetch('../templates/Products.handlebars').then(string=>string.text()).then(template=>{
        console.log(template)
        const templateObject = {
            products : data
        }
        const processedTemplate = Handlebars.compile(template)
        const html = processedTemplate(templateObject);
        let div = document.getElementById('product-container');
        div.innerHTML=html
    })
})


miFunc = ()=>{
    fetch('/session/current').then(result=>result.json()).then(json=>{
        const id = json.carts[0]
        location.replace(`/api/carrito/${id}/productos`)
    })
    
}