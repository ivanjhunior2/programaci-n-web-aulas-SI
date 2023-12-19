//http://localhost:4000/ambientes
//crear ambiente
const boton = document.getElementById("registrarAmbiente");

const postAula = (e) =>{
    e.preventDefault();
    let nombre = document.getElementById("nombreAmbiente").value;
    let capacidad = document.getElementById("capacidad").value;
    let descripcion =document.getElementById("descripcion").value;
    let ambiente = document.getElementById("tipoAmbiente").value;

    const facilidades = Array.from(document.getElementById('facilidad').options)
    .filter(option => option.selected)
    .map(option => option.value);

    const create = {
        nombre,
        capacidad,
        descripcion,
        ambiente,
        facilidades
    }

    fetch('http://localhost:4000/ambientes',{
        method : 'POST' ,
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(create)
    }).
        then(response => response.json())
        .then(data =>{
            console.log('Nueva aula registrada:', data);
            document.getElementById('nombreAmbiente').value = '';
            document.getElementById('capacidad').value = '';
            document.getElementById('descripcion').value = '';
        })
        .catch(error => {
            console.error('Error al crear el aula:', error);
        });

}


boton.addEventListener('click', postAula);