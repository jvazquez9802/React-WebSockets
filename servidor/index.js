//Servidor con express
const express = require("express");
const http = require("http");
const app = express();
const servidor = http.createServer(app);
const cors = require("cors");
const pool = require("./db");


const socketio = require("socket.io");
const io = socketio(servidor);

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

app.get("/registros/:id", async(req, res) => {
  try {
    const {id} = req.params;
    const registro = await pool.query("SELECT * FROM registro WHERE registro_id = $1", [id]);

    res.json(registro,rows[0]);

  } catch (err) {
    console.error(err.message);
  }
});


//Funcionalidad de socket.io en el servidor
io.on("connection", (socket) => {
  let nombre;

  socket.on("conectado", (nomb) => {
    nombre = nomb;
    //socket.broadcast.emit manda el mensaje a todos los clientes excepto al que ha enviado el mensaje
    socket.broadcast.emit("mensajes", {
      nombre: nombre,
      mensaje: `${nombre} ha entrado en la sala del chat`,
    });
  });

  socket.on("mensaje", (nombre, mensaje) => {
    //io.emit manda el mensaje a todos los clientes conectados al chat
    io.emit("mensajes", { nombre, mensaje });
  });

  socket.on("disconnect", () => {
    io.emit("mensajes", {
      servidor: "Servidor",
      mensaje: `${nombre} ha abandonado la sala`,
    });
  });
});

servidor.listen(5000, () => console.log("Servidor inicializado"));