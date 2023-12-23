//Función para controlar la navegación superior 
document.addEventListener('DOMContentLoaded', function () {
    // Obtener el enlace "Anterior"
    var anteriorEnlace = document.getElementById('anterior');

    // Manejar el clic en "Anterior"
    anteriorEnlace.addEventListener('click', function (event) {
        event.preventDefault(); // Evitar el comportamiento predeterminado del enlace
        // Verificar si la página actual es "adminMenu.html" antes de retroceder
        if (window.location.pathname !== '/adminMenu.html') {
            window.history.back();
        }
        // Si ya estás en "adminMenu.html", no hagas nada
    });
});


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
