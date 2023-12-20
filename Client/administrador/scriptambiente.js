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
