import Contenedor from '../classes/Class'

const contenedor = new Contenedor();

document.addEventListener('submit',enviarFormulario);
function enviarFormulario(event){
    event.preventDefault();
    const form = document.getElementById('productFormDelete');
    const data = new FormData(form);
    const id = data.get("id")
    contenedor.deleteById(id);
}
