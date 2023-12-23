//Función para Enlace Anterior de la Navegación

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

let aulas;
const botonBucar = document.getElementById('buscar');

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
        }).catch(error => {
            console.error('Error:', error.message);
        });
        
      
}



function mostrarAulas() {
    obtenerAulas()
        .then(aulasMostradas => {
            aulas = aulasMostradas;
            const listaAulas = document.getElementById('listaAulas');
            listaAulas.innerHTML = '';
            aulas.forEach(aula => {
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



function redireccionEditarConID(id) {
    localStorage.setItem('id', id);
    window.location.href = 'editarAmbiente.html';
}

mostrarAulas();

function filtrarAulas(){
    const filtro = document.getElementById('filtro').value.toLowerCase();
    const filtroInput = document.getElementById('filtroInput').value.toLowerCase();
    let aulasFiltradas;
    
    if(filtro === "capacidad"){
        aulasFiltradas= aulas.filter(a => {return a.capacidad >= filtroInput})
        console.log(aulasFiltradas);
        return;
    }
    if(filtro === "nombre"){
        aulasFiltradas = aulas.filter(a => a.nombre.toLowerCase().includes(filtroInput));
        console.log(aulasFiltradas);
        return;
    }else{
        aulasFiltradas = aulas;
    }
    
    mostrarAulas();
}


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


function redireccionVerConID(id) {
    localStorage.setItem('id', id);
    const urlDestino = "verInformacionAmbiente.html?origen=listarAmbientes.html";
    window.location.href = urlDestino;

  }




botonBucar.addEventListener('click', filtrarAulas);
