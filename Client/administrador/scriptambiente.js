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

const postAula = (e) => {
    e.preventDefault();
    
    // Verificación manual de campos requeridos
    const nombre = document.getElementById("nombreAmbiente").value;
    const capacidad = document.getElementById("capacidad").value;
    const descripcion = document.getElementById("descripcion").value;
    const ambiente = document.getElementById("tipoAmbiente").value;

    if (!nombre || !capacidad || !descripcion || !ambiente) {
        alert("Por favor, complete todos los campos requeridos.");
        return;
    }
    const create = {
        nombre,
        capacidad,
        descripcion,
        ambiente,
        facilidades: Array.from(document.getElementById('facilidad').options)
            .filter(option => option.selected)
            .map(option => option.value)
    };

    fetch('http://localhost:4000/ambientes', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(create)
    })
    .then(response => response.json())
    .then(data => {
        console.log(data);
        document.getElementById('nombreAmbiente').value = '';
        document.getElementById('capacidad').value = '';
        document.getElementById('descripcion').value = '';
        document.getElementById('tipoAmbiente').value = '';
        Array.from(document.getElementById('facilidad').options)
            .forEach(option => option.selected = false);
    })
    .catch(error => {
        console.error('Error al crear el aula:', error);
    });
}
const boton = document.getElementById("registrarAmbiente");
boton.addEventListener('click', postAula);
