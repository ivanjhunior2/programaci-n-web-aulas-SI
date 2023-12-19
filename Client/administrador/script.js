// Ejemplo de datos de aulas (puedes reemplazar esto con datos reales de tu aplicación)
// const aulas = [
//     { id: '1', nombre: 'Aula 101', capacidad: 30, descripcion: 'Aula de conferencias' },
//     { id: '2', nombre: 'Aula 201', capacidad: 25, descripcion: 'Aula de laboratorio' },
// 	{ id: '3', nombre: 'Aula 102', capacidad: 30, descripcion: 'Aula de conferencias' },
//     { id: '4', nombre: 'Aula 203', capacidad: 25, descripcion: 'Aula de laboratorio' },
// 	{ id: '5', nombre: 'Aula 104', capacidad: 30, descripcion: 'Aula de conferencias' },
//     { id: '6', nombre: 'Aula 204', capacidad: 25, descripcion: 'Aula de laboratorio' },
// 	{ id: '7', nombre: 'Aula 105', capacidad: 30, descripcion: 'Aula de conferencias' },
//     { id: '8', nombre: 'Aula 205', capacidad: 25, descripcion: 'Aula de laboratorio' },
// ];

function obtenerAulas() {
    return fetch('http://localhost:4000/ambientes', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    })
        .then(response => {
            if (!response.ok) {
                throw new Error('Error al obtener la lista de aulas');
            }
            return response.json();
        })
        .catch(error => {
            console.error('Error:', error.message);
        });
}

function mostrarAulas() {
    obtenerAulas()
        .then(aulasMostradas => {
            const listaAulas = document.getElementById('listaAulas');
            listaAulas.innerHTML = '';

            aulasMostradas.forEach(aula => {
                const tr = document.createElement('tr');

                tr.innerHTML = `
                    <td>${aula.nombre}</td>
                    <td>${aula.capacidad}</td>
                    <td>
                        <button class="listar-btn" onclick="redireccionEditarConID(${aula.id});"><img src="./Imagenes/editar.png" </button>
                        <button class="listar-btn" onclick="eliminarAula('${aula.id}')"><img src="./Imagenes/borrar.png"></button>
                        <button class="listar-btn" onclick="redireccionVerConID('${aula.id}')"><img src="./Imagenes/ver.png" </button>
                    </td>
                `;

                listaAulas.appendChild(tr);
            });
        });
}

//Esta función es para que no se pase Id por la URL si no se almacenen en local storage como variable global 
function redireccionEditarConID(id) {
    localStorage.setItem('id', id);
    window.location.href = 'editarAmbiente.html';
  }

// function filtrarAulas() {
//     // Obtener los valores de los elementos de entrada (filtros)
//     const filtro = document.getElementById('filtro').value.toLowerCase();
//     const filtroInput = document.getElementById('filtroInput').value.toLowerCase();

//     let aulasFiltradas;

//     if (filtro === 'todas') {
//         aulasFiltradas = aulas;
//     } else {
//         aulasFiltradas = aulas.filter(aula => {
//             // Convertir el valor de la propiedad a cadena antes de aplicar toLowerCase()
//             const propiedadAula = filtro === 'capacidad' ? aula[filtro].toString() : aula[filtro];
//             return propiedadAula.toLowerCase().includes(filtroInput);
//         });
//     }

//     // Llamar a la función mostrarAulas para actualizar la interfaz con las aulas filtradas
//     mostrarAulas(aulasFiltradas);
// }

async function eliminarAula(id) {
    const confirmacion = window.confirm(`¿Estás seguro de que deseas eliminar el aula con ID: ${id}?`);
    if (confirmacion) {
        try {
           
            console.log(`Eliminar aula con ID: ${id}`);
            const response = await fetch(`http://localhost:4000/ambientes/${id}`, {
                method: 'DELETE'
            });

            if (!response.ok) {
                throw new Error('Error al eliminar el aula');
            }
            mostrarAulas();
        } catch (error) {
            console.error('Error:', error.message);
        }
    } else {
        console.log('Eliminación cancelada');
    }
}


// function redireccionVerConID(id) {
//     localStorage.setItem('id', id);
//     const urlDestino = "verInformacionAmbiente.html?origen=listarAmbientes.html";
//     window.location.href = urlDestino;

//   }


mostrarAulas();

