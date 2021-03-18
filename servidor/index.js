//Servidor con express
const express = require("express");
const http = require("http");
const app = express();
const servidor = http.createServer(app);
const cors = require("cors");
const pool = require("./db");
const socketio = require("socket.io");
const { json } = require("express");
const io = socketio(servidor, {
  transports: ['websocket', 'polling']
});

app.use(cors());
app.use(express.json()); 

const bcrypt = require("bcrypt");
const saltRounds = 10


app.get("/registros", async(req, res) => {
  try {
    const allRegistros = await pool.query("SELECT * FROM (SELECT * FROM registro ORDER BY registro_id DESC LIMIT 24) AS QRY ORDER BY QRY.registro_id");
    console.log(allRegistros)
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
    const data = req.body
    const bcPass = data.password
    bcrypt.hash(bcPass, saltRounds, async(err, hash) => {
      if(err){
        res.json({error: err});
      }
      let newUser = await pool.query(`INSERT INTO usuario 
      (nombre_usuario, nombre_completo, correo, curp, rfc, contraseña, telefono)
      VALUES 
      ('${data.username}', '${data.fullName}', '${data.email}', '${data.curp}', '${data.rfc}', '${hash}', '${data.phone}');`)
      .then(() =>{
          console.log("Registrado")
        }
      );
    });
    res.json({success: true, message:'Exito en el registro'});
});

app.post("/login", async (req, res) => {
  try {
    const data = req.body
    let login = await pool.query(`SELECT * FROM usuario WHERE correo = '${data.email}'`);
    if(login.rowCount > 0){
      bcrypt.compare(data.password, login.rows[0].contraseña, (err, result) =>{
        if(result){
          console.log('AQUI PASA <=====')
          res.json({found: true, message: 'Inicio de sesion exitoso'});
        } else {
          res.json({found:false, message:"Contraseña incorrecta"});
        }
        if(err){
          console.log(err)
        }
      });
    } else {
      res.json({found:false, message:"Correo electrónico incorrecto"});
    }
  } catch (err) {
    res.json({err:err});
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

servidor.listen(5000, () => console.log("Servidor inicializado"));


