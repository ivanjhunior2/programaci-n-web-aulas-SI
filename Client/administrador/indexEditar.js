
let boton = document.getElementById('actualizarAmbiente');

const putAula = (e) => {
    e.preventDefault();
    let nombre = document.getElementById("nombreAmbiente").value;
    let capacidad = document.getElementById("capacidad").value;
    let descripcion = document.getElementById("descripcion").value;
    let ambiente = document.getElementById("tipoAmbiente").value;
    let id = localStorage.getItem('id');
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

    fetch(`http://localhost:4000/ambientes/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(create)
    })
        .then(response => {
            if (!response.ok) {
                throw new Error(`Error HTTP! Estado: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            nombre.value = "";
            capacidad.value = '';
            descripcion.value = '';
            Array.from(document.getElementById('facilidad').options)
                .forEach(option => option.selected = false);
        })
        .catch(error => {
            console.error('Error al crear el ambiente:', error);
        });
}

boton.addEventListener('click', putAula);
