//Servidor con express
const express = require("express");
const http = require("http");
const app = express();
const servidor = http.createServer(app);
const cors = require("cors");
const pool = require("./db");
const socketio = require("socket.io");
const io = socketio(servidor, {
  transports: ['websocket', 'polling']
});

app.use(cors());
app.use(express.json());

const getData = async () => {
  return await pool.query("SELECT * FROM (SELECT * FROM registro ORDER BY registro_id DESC LIMIT 24) AS QRY ORDER BY QRY.registro_id");
}
io.on('connection', client => {

  app.post("/registros/nuevo", async (req, res) => {
    try {
      let insertar = await pool.query(`INSERT INTO registro 
      (fecha, hora, temperatura, presion, humedad, viento, viento_max, radiacion, precipitacion)
      VALUES 
      ('${req.body.fecha}', '${req.body.hora}', ${req.body.temperatura}, ${req.body.presion}, ${req.body.humedad}, ${req.body.viento}, ${req.body.viento_max}, ${req.body.radiacion}, ${req.body.precipitacion});`).then(() => { client.emit('new: data', req.body) });
      console.log(req.body)
      res.json({ message: "Recibido" });
    } catch (err) {
      console.error(err.message);
    }
  });
});



app.get("/registros", async (req, res) => {
  try {
    allRegistros = (await getData()).rows
    res.json(allRegistros);
  } catch (err) {
    console.error(err.message);
  }
});

app.get("/filtro", async (req, res) => {
  try {
    const allRegistros = await pool.query(`SELECT * FROM registro WHERE fecha between '${req.query.lower}' and '${req.query.upper}';`);
    res.json(allRegistros.rows);
  } catch (err) {
    console.error(err.message);
  }
});

// Rutas para usuarios

app.post("/user/:uid", async (req, res) => {

  const { uid } = req.params;
  const existe = await pool.query("SELECT * FROM users WHERE userid = $1", [uid]);

  if (existe.rowCount > 0) {
    try {
      let update = await pool.query(`UPDATE users 
        SET
        username = '${req.body.name}',
        curp = '${req.body.curp}',
        rfc = '${req.body.rfc}',
        phone = '${req.body.phone}'
        WHERE userid = '${uid}';`)
      res.json({ success: true, message: 'Data updated' });
    } catch (error) {
      res.json({ success: false, message: 'Something was wrong' })
    }
  } else {
    try {
      let newUser = await pool.query(`INSERT INTO users 
      (userid, username, curp, rfc, phone)
      VALUES 
      ('${uid}', '${req.body.name}', '${req.body.curp}', '${req.body.rfc}', '${req.body.phone}');`)
      res.json({ success: true, message: 'Data created' });
    } catch (err) {
      res.json({ success: false, message: 'Something was wrong' })
    }
  }
});

app.get("/user/:uid", async (req, res) => {
  try {
    const { uid } = req.params;
    const user = await pool.query("SELECT username, curp, rfc, phone FROM users WHERE userid = $1", [uid]);
    user.rowCount <= 0 ? res.json({ succes: true, found: false, user: null }) : res.json({
      succes: true, found: true, user: {
        username: user.rows[0].username,
        curp: user.rows[0].curp,
        rfc: user.rows[0].rfc,
        phone: user.rows[0].phone
      }
    })
  } catch (err) {
    res.json({ success: false, message: 'Something was wrong' })
  }
});

// Socket que se encarga de informar de nuevos registros



servidor.listen(5000, () => console.log("Servidor inicializado"));


