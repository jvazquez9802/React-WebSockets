//Servidor con express
const express = require("express");
const http = require("http");
const app = express();
const servidor = http.createServer(app);
const cors = require("cors");
const pool = require("./db");


const jwt = require('jsonwebtoken')
//Uso del socket
const socketio = require("socket.io");
const { json } = require("express");
const io = socketio(servidor, {
  transports: ['websocket', 'polling']
});

app.use(cors());
app.use(express.json()); 

const bcrypt = require("bcrypt");
const saltRounds = 10



//Rutas para registros

function verifyToken(req, res, next){
  const bearerHeader = req.headers['authorization']

  if(typeof bearerHeader !== 'undefined'){
    const bearerToken = bearerHeader.split(" ")[1]
    req.token = bearerToken
    next()
  } else {
    res.sendStatus(403)
  }
}

app.get("/registros", verifyToken, async(req, res) => {
  jwt.verify(req.token, 'secretkey',async (error, authData) => {
    if(error){
      res.sendStatus(403)
    } else {
      try {
        const allRegistros = await pool.query("SELECT * FROM (SELECT * FROM registro ORDER BY registro_id DESC LIMIT 24) AS QRY ORDER BY QRY.registro_id");
        res.json(allRegistros.rows);
      } catch (err) {
        res.sendStatus(403)
      }
    }
  })
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
        console.log(err);
      }
      let newUser = await pool.query(`INSERT INTO usuario 
      (nombre_usuario, nombre_completo, correo, curp, rfc, contraseña, telefono)
      VALUES 
      ('${data.username}', '${data.fullName}', '${data.email}', '${data.curp}', '${data.rfc}', '${hash}', '${data.phone}');`)
      .then(() =>{console.log("Registrado")});
      res.json({message:'Exito en el registro'});
    });
});

app.post("/login", async (req, res) => {
  try {
    const data = req.body
    let login = await pool.query(`SELECT * FROM usuario WHERE correo = '${data.email}'`);
    if(login.rowCount > 0){
      bcrypt.compare(data.password, login.rows[0].contraseña, (err, result) =>{
        if(result){
          let qry = login.rows[0]

          const user = {
            found: true,
            id: qry.usuario_id,
            username: qry.nombre_usuario,
            name: qry.nombre_completo,
            curp: qry.curp,
            rfc:qry.rfc,
            phone:qry.telefono
          }

          jwt.sign(user, 'secretkey', (err, token) => {
            user.token = token
            res.json(user);
          })

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


