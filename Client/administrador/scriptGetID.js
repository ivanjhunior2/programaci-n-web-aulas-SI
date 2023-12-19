
async function getID() {
    let id = localStorage.getItem('id');
    return fetch(`http://localhost:4000/ambientes/${id}`)
    .then(response => {
        if (!response.ok) {
            throw new Error(`Error al obtener datos del ambiente. Código: ${response.status}`);
        }
        return response.json();
    })
    .then(data => {
        console.log(data);
        return data;
    });

}

document.addEventListener("DOMContentLoaded", function(){
    const miDiv = document.getElementById("info");
    getID().then(data => {
        const contedor = `
            <label>Nombre:</label> ${data.nombre}<br>
            <label>Descripción:</label> ${data.descripcion}<br>
            <label>Capacidad:</label> ${data.capacidad}<br>
            <label>Tipo de Ambiente:</label> ${data.tipo}<br>
            <label>Facilidades:</label> ${obtenerFacilidadesHTML(data.facilidades)} 
            `
        miDiv.innerHTML = contedor;
    });
})

function obtenerFacilidadesHTML(facilidades) {
    const facilidadesArray = Object.values(facilidades);
    return `<ul>${facilidadesArray.map(facilidad => `<li>${facilidad}</li>`).join('')}</ul>`;
}

getID();
