const express = require("express");
const morgan = require("morgan");
const cors = require('cors');
const ambietesRoutes = require('./routes/ambiente.Routes');
const reservaRoutes = require('./routes/reserva.Routes');
const usuarioRoutes = require('./routes/usuario.Routes');
const facilidadRoutes = require('./routes/facilidad.Routes');
const ambienteFacilidadRoutes = require('./routes/ambienteFacilidad.Routes');
const tipoAmbienteRoutes = require('./routes/tipoAmbiente.Routes');


const app = express();
app.use(morgan('dev'));
app.use(express.json());
app.use(cors());

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Content-Type'); 
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
});

app.use(ambietesRoutes);
app.use(reservaRoutes);
app.use(usuarioRoutes);
app.use(facilidadRoutes);
app.use(ambienteFacilidadRoutes);
app.use(tipoAmbienteRoutes);


app.use((err,req,res,next)=>{
   return res.json({
        message : err.message
   }) 
});

app.listen(4000)
console.log("puerto 4000");