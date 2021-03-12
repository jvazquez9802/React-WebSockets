//Servidor con express
const express = require("express");
const http = require("http");
const app = express();
const servidor = http.createServer(app);
const cors = require("cors");
const pool = require("./db");

//Uso del socket
const socketio = require("socket.io");
const { json } = require("express");
const io = socketio(servidor, {
  transports: ['websocket', 'polling']
});

app.use(cors());
app.use(express.json()); 

//Rutas para registros

app.get("/registros", async(req, res) => {
  try {
    const allRegistros = await pool.query("SELECT * FROM (SELECT * FROM registro ORDER BY registro_id DESC LIMIT 24) AS QRY ORDER BY QRY.registro_id");
    res.json(allRegistros.rows);
  } catch (err) {
    console.error(err.message);
  }
});

// Rutas para usuarios

app.get("/usuarios", async(req, res) => {
  try {
    const allRegistros = await pool.query("SELECT * FROM usuario");
    res.json(allRegistros.rows);
  } catch (err) {
    console.error(err.message);
  }
});

app.get("/usuarios/:id", async(req, res) => {
  try {
    const {id} = req.params;
    const registro = await pool.query("SELECT * FROM usuario WHERE usuario_id = $1", [id]);

    res.json(registro.rows[0]);

  } catch (err) {
    console.error(err.message);
  }
});

app.post("/signup", async(req, res) => {
  try{
    const data = req.body
    let newUser = await pool.query(`INSERT INTO usuario 
    (nombre_usuario, nombre_completo, correo, curp, rfc, contraseña, telefono)
    VALUES 
    ('${data.username}', '${data.fullName}', '${data.email}', '${data.curp}', '${data.rfc}', '${data.password}', '${ data.phone}');`).then(() =>{console.log("Registrado")});
    res.json({message:'Exito en el registro'})
  } catch (err) {
    console.error(err.message)
  }
});

app.post("/signin", async (req, res) => {
  try {
    const data = req.body
    let login = await pool.query(`SELECT * FROM usuario WHERE correo = '${data.email}' AND contraseña = '${data.password}'`)
    if(login.rowCount > 0){
      res.json(login.rows[0])
    } else {
      res.json({message:"Correo electrónico o contraseña no válido"})
    }
  } catch (err) {
    res.json({err:err})
  }
});

// Socket que se encarga de informar de nuevos registros

io.on('connection', client => {
  
  app.post("/registros/nuevo", async (req, res) => {
    try{
      let insertar = await pool.query(`INSERT INTO registro 
      (fecha, hora, temperatura, presion, humedad, viento, viento_max, radiacion, precipitacion)
      VALUES 
      ('${req.body.fecha}', '${req.body.hora}', ${req.body.temperatura}, ${req.body.presion}, ${req.body.humedad}, ${req.body.viento}, ${req.body.viento_max}, ${req.body.radiacion}, ${req.body.precipitacion});`).then(() =>{client.emit('new: data', 'La base de datos ha sido actualizada')});
      res.json({message:"Recibido"});
    } catch (err) {
      console.error(err.message);
    }
  });
});


//Funcionalidad de socket.io en el servidor
/*io.on('connection', client => {
  setInterval(() => {
    os.cpuUsage((cpuPercent) =>{
      client.emit('cpu', {
        fecha: "2021-02-12T06:00:00.000Z",
        humedad: parseFloat((cpuPercent * 10).toFixed(2)),
        precipitacion: parseFloat((cpuPercent * 15).toFixed(2)),
        presion: parseFloat((cpuPercent * 20).toFixed(2)),
        radiacion: parseFloat((cpuPercent * 25).toFixed(2)),
        temperatura: parseFloat((cpuPercent * 50).toFixed(2)),
        viento: parseFloat((cpuPercent * 35).toFixed(2)),
      });
    });
  }, 5000);
});*/

servidor.listen(5000, () => console.log("Servidor inicializado"));


