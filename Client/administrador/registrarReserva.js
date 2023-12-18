document.addEventListener("DOMContentLoaded", function () {
    // Obtener elementos del formulario
    const fechaReservaInput = document.getElementById("fechaReserva");
    const horaInicioSelect = document.getElementById("horaInicio");
    const horaFinSelect = document.getElementById("horaFin");
  
    // Configurar la fecha mínima como hoy más un día
    const fechaMinima = new Date();
    fechaMinima.setDate(fechaMinima.getDate() + 1);
    fechaReservaInput.min = fechaMinima.toISOString().split("T")[0];
  
    // Generar opciones de horarios académicos
    const horasAcademicas = generarHorasAcademicas();
    horasAcademicas.forEach(hora => {
      const optionInicio = document.createElement("option");
      optionInicio.value = hora;
      optionInicio.textContent = hora;
      horaInicioSelect.appendChild(optionInicio);
  
      const optionFin = document.createElement("option");
      optionFin.value = hora;
      optionFin.textContent = hora;
      horaFinSelect.appendChild(optionFin);
    });
  
    // Función para generar horas académicas
    function generarHorasAcademicas() {
      const horas = [];
      let hora = new Date();
      hora.setHours(6, 45, 0, 0); // Inicia a las 6:45
  
      while (hora.getHours() < 20 || (hora.getHours() === 20 && hora.getMinutes() === 15)) {
        const horaString = hora.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        horas.push(horaString);
        hora.setMinutes(hora.getMinutes() + 45); // Siguiente periodo académico
      }
  
      return horas;
    }
  
    // Validar hora de inicio respecto a la fecha actual
    fechaReservaInput.addEventListener("change", function () {
      const fechaReserva = new Date(this.value);
      const horaActual = new Date();
  
      // Si la fecha de reserva es igual a la fecha actual, limitar la hora de inicio
      if (fechaReserva.toDateString() === horaActual.toDateString()) {
        const horaActualString = horaActual.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  
        // Filtrar opciones de hora de inicio
        Array.from(horaInicioSelect.options).forEach(option => {
          if (option.value < horaActualString) {
            option.disabled = true;
          } else {
            option.disabled = false;
          }
        });
      } else {
        // Habilitar todas las opciones si la fecha es diferente
        Array.from(horaInicioSelect.options).forEach(option => {
          option.disabled = false;
        });
      }
    });
  
    // Validar hora de fin respecto a la hora de inicio
    horaInicioSelect.addEventListener("change", function () {
      const horaInicioSeleccionada = new Date(`2000-01-01T${this.value}`);
      const horaFinSeleccionada = new Date(`2000-01-01T${horaFinSelect.value}`);
  
      // Filtrar opciones de hora de fin
      Array.from(horaFinSelect.options).forEach(option => {
        const horaFin = new Date(`2000-01-01T${option.value}`);
        option.disabled = horaFin <= horaInicioSeleccionada;
      });
    });
  });
  