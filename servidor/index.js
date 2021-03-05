//Servidor con express
const express = require("express");
const http = require("http");
const app = express();
const servidor = http.createServer(app);
const cors = require("cors");
const pool = require("./db");

//Mandar info para graficar
const os = require('os-utils');


const socketio = require("socket.io");
const io = socketio(servidor, {
  transports: ['websocket', 'polling']
});

app.use(cors());
app.use(express.json()); 

//Rutas

app.get("/registros", async(req, res) => {
  try {
    const allRegistros = await pool.query("SELECT * FROM registro");
    console.log(allRegistros)
    res.json(allRegistros.rows);
  } catch (err) {
    console.error(err.message);
  }
});

app.get("/registros/temperatura", async(req, res) => {
  try {
    const allRegistros = await pool.query("SELECT temperatura FROM registro");
    res.json(allRegistros.rows);
    console.log(allRegistros)
  } catch (err) {
    console.error(err.message);
  }
});

app.get("/registros/:id", async(req, res) => {
  try {
    const {id} = req.params;
    const registro = await pool.query("SELECT * FROM registro WHERE registro_id = $1", [id]);

    res.json(registro.rows[0]);

  } catch (err) {
    console.error(err.message);
  }
});


//Funcionalidad de socket.io en el servidor
io.on('connection', client => {
  setInterval(() => {
    os.cpuUsage((cpuPercent) =>{
      client.emit('cpu', {
        fecha: "2021-02-12T06:00:00.000Z",
        humedad: parseFloat((cpuPercent * 10).toFixed(2)),
        precipitacion: parseFloat((cpuPercent * 15).toFixed(2)),
        presion: parseFloat((cpuPercent * 20).toFixed(2)),
        radiacion: parseFloat((cpuPercent * 25).toFixed(2)),
        temperatura: parseFloat((cpuPercent * 50).toFixed(2)),
        viento: parseFloat((cpuPercent * 30).toFixed(2)),
      });
    });
  }, 5000);
});

servidor.listen(5000, () => console.log("Servidor inicializado"));