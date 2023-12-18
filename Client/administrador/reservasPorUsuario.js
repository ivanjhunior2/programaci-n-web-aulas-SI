// Simulación de datos de reserva desde tu base de datos
const reservas = [
    { aula: "Aula 101", horaInicio: "10:00 AM", horaFin: "12:00 PM", fecha: "2023-01-01", solicitante: "Nombre Apellido", descripcion: "Clase Programación Web", Estado: "Pendiente" },
    { aula: "Aula 102", horaInicio: "10:00 AM", horaFin: "12:00 PM", fecha: "2023-01-01", solicitante: "Nombre Apellido", descripcion: "Clase Practica Programación Web", Estado: "Rechazada" },
    { aula: "Aula 103", horaInicio: "10:00 AM", horaFin: "12:00 PM", fecha: "2023-01-01", solicitante: "Nombre Apellido", descripcion: "Revisión de Proyecto", Estado: "Aceptada" },
    // Agrega más reservas según tu base de datos
];

// Función para crear un elemento de reserva
function crearElementoReserva(reserva) {
    const divReserva = document.createElement('div'); //crea el div
    divReserva.classList.add('reserva'); //agrega el style .reserva al elemento div creado

    divReserva.innerHTML = `
        <p><strong>Aula:</strong> ${reserva.aula}</p>
        <p><strong>Hora de inicio:</strong> ${reserva.horaInicio}</p>
        <p><strong>Hora de fin:</strong> ${reserva.horaFin}</p>
        <p><strong>Fecha:</strong> ${reserva.fecha}</p>
        <p><strong>Datos del Solicitante:</strong> ${reserva.solicitante}</p>
        <p><strong>Descripción:</strong> ${reserva.descripcion}</p>
        <p><strong>Descripción:</strong> <mark> ${reserva.Estado} </mark></p>

        <div class="acciones">
            <button class="aceptar" onclick="editarReserva('${reserva.aula}')">Editar</button>
            <button class="rechazar" onclick="eliminarReserva('${reserva.aula}')">Eliminar</button>
        </div>
    `;

    return divReserva;
}

// Función para mostrar todas las reservas en el contenedor
function mostrarReservas() {
    const reservasContainer = document.getElementById('reservasContainer');

     
    // Crear y agregar elementos de reserva al contenedor
    reservas.forEach(reserva => {
        const elementoReserva = crearElementoReserva(reserva);
        reservasContainer.appendChild(elementoReserva);
    });
}

// Llamada a la función para mostrar reservas al cargar la página
window.onload = mostrarReservas;

// Funciones para aceptar y rechazar reservas (puedes conectar estas funciones a tu backend)
function editarReserva(aula) {
    alert(`Reserva en ${aula} en contrucción`);
}

function eliminarReserva(aula) {
    alert(`Reserva en ${aula} Eliminada`);
}