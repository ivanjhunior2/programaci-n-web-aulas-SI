// Simulación de datos de reserva desde tu base de datos
const reservas = [
    { aula: "Aula 101", horaInicio: "10:00 AM", horaFin: "12:00 PM", fecha: "2023-01-01", solicitante: "Nombre Apellido", descripcion: "Reunión de equipo" },
    { aula: "Aula 101", horaInicio: "10:00 AM", horaFin: "12:00 PM", fecha: "2023-01-01", solicitante: "Nombre Apellido", descripcion: "Reunión de equipo" },
    { aula: "Aula 101", horaInicio: "10:00 AM", horaFin: "12:00 PM", fecha: "2023-01-01", solicitante: "Nombre Apellido", descripcion: "Reunión de equipo" },
    // Agrega más reservas según tu base de datos
];

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


