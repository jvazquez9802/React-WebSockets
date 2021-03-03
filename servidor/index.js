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
      const date = new Date()
      client.emit('cpu', {
        time: date.getMinutes() + ':' + date.getSeconds(),
        temperatura: (cpuPercent * 50).toFixed(2),
      });
    });
  }, 5000);
});

servidor.listen(5000, () => console.log("Servidor inicializado"));