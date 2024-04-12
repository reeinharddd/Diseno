/** @format */

const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const mysql = require("mysql");

const app = express();
const port = 3000;

app.use(cors());
app.use(bodyParser.json());

// const connection = mysql.createConnection({
//   host: "193.203.166.175",
//   user: "u865220554_root",
//   password: "@P!ZZa/01245",
//   database: "u865220554_request",
// });
const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "requests",
});

connection.connect((err) => {
  if (err) {
    console.error("Error de conexión a la base de datos:", err);
    return;
  }
  console.log("Conexión a la base de datos MySQL establecida");
});

app.get("/checkdb", (req, res) => {
  connection.query("SELECT 1", (err, results) => {
    if (err) {
      console.error("Error al verificar la conexión a la base de datos:", err);
      res.status(500).json({ error: "Error interno del servidor" });
      return;
    }
    res.json({ message: "Conexión a la base de datos exitosa" });
  });
});

app.post("/login", (req, res) => {
  const { username, password } = req.body;
  const query = "SELECT * FROM usuarios WHERE nickname = ? AND password = ?";

  connection.query(query, [username, password], (err, results) => {
    if (err) {
      console.error("Error al realizar la consulta:", err);
      res.status(500).json({ error: "Error interno del servidor" });
      return;
    }

    if (results.length === 0) {
      res.status(401).json({ error: "Credenciales inválidas" });
      return;
    }

    // Verificar si el usuario tiene un category de 3
    const user = results[0];
    if (user.category.toString() !== "3") {
      // Compara después de convertir a cadena de texto
      res.status(403).json({ error: "Nivel de acceso no suficiente" });
      return;
    }

    res.json({
      message: "Inicio de sesión exitoso",
      user: {
        id: user.user_id,
        firstName: user.first_name,
        lastName: user.last_name,
        userCategory: user.category,
        nickName: user.nickname,
        idDepaUsuario: user.idDepaUsuario,
        profilePic: user.profile_pic,
      },
    });
  });
});
app.get("/aprobadas", (req, res) => {
  // Consulta SQL para obtener las solicitudes aprobadas con información detallada
  const sqlQuery = `
  SELECT s.idSolicitud, s.fechaSolicitud, s.estadoSolicitud, s.justificacion, s.comentario, 
         s.cantidad, CONCAT(u.first_name, ' ', u.last_name) AS nombreUsuario, 
         p.nomProducto AS nombreProducto, pr.nombre AS prioridad, s.estadoEntrega 
  FROM solicitudes s
  INNER JOIN usuarios u ON s.idSolicitudUser = u.user_id
  INNER JOIN productos p ON s.idSolicitudProducto = p.idProducto
  INNER JOIN prioridades pr ON s.idPrioridad = pr.idPrioridad
  WHERE s.estadoSolicitud = 'Autorizado'
  ORDER BY s.idSolicitud ASC;`;

  // Ejecutar la consulta
  connection.query(sqlQuery, (err, results) => {
    if (err) {
      // En caso de error, enviar una respuesta de error al cliente
      res
        .status(500)
        .json({ error: "Error al obtener las solicitudes aprobadas" });
      return;
    }

    // Si no hay error, enviar los resultados al cliente en formato JSON
    res.json(results);
  });
});

app.get("/desaprobadas", (req, res) => {
  // Consulta SQL para obtener las solicitudes desaprobadas con información detallada
  const sqlQuery = `
  SELECT s.idSolicitud, s.fechaSolicitud, s.estadoSolicitud, s.justificacion, s.comentario, 
         s.cantidad, CONCAT(u.first_name, ' ', u.last_name) AS nombreUsuario, 
         p.nomProducto AS nombreProducto, pr.nombre AS prioridad, s.estadoEntrega 
  FROM solicitudes s
  INNER JOIN usuarios u ON s.idSolicitudUser = u.user_id
  INNER JOIN productos p ON s.idSolicitudProducto = p.idProducto
  INNER JOIN prioridades pr ON s.idPrioridad = pr.idPrioridad
  WHERE s.estadoSolicitud = 'Denegado'
  ORDER BY s.idSolicitud ASC;`;

  // Ejecutar la consulta
  connection.query(sqlQuery, (err, results) => {
    if (err) {
      // En caso de error, enviar una respuesta de error al cliente
      res
        .status(500)
        .json({ error: "Error al obtener las solicitudes desaprobadas" });
      return;
    }

    // Si no hay error, enviar los resultados al cliente en formato JSON
    res.json(results);
  });
});

app.get("/pendientes", (req, res) => {
  // Consulta SQL para obtener las solicitudes pendientes con información detallada
  const sqlQuery = `
    SELECT s.idSolicitud, s.fechaSolicitud, s.estadoSolicitud, s.justificacion, s.comentario, 
           s.cantidad, CONCAT(u.first_name, ' ', u.last_name) AS nombreUsuario, 
           p.nomProducto AS nombreProducto, pr.nombre AS prioridad, s.estadoEntrega 
    FROM solicitudes s
    INNER JOIN usuarios u ON s.idSolicitudUser = u.user_id
    INNER JOIN productos p ON s.idSolicitudProducto = p.idProducto
    INNER JOIN prioridades pr ON s.idPrioridad = pr.idPrioridad
    WHERE s.estadoSolicitud = 'Pendiente'
    ORDER BY s.idSolicitud ASC;`;

  // Ejecutar la consulta
  connection.query(sqlQuery, (err, results) => {
    if (err) {
      // En caso de error, enviar una respuesta de error al cliente
      res
        .status(500)
        .json({ error: "Error al obtener las solicitudes pendientes" });
      return;
    }

    // Si no hay error, enviar los resultados al cliente en formato JSON
    res.json(results);
  });
});

app.post("/aprobar/:idSolicitud", (req, res) => {
  const { idSolicitud } = req.params;

  // Consulta SQL para actualizar el estado de la solicitud a 'Autorizado'
  const sqlQuery = `
    UPDATE solicitudes 
    SET estadoSolicitud = 'Autorizado' 
    WHERE idSolicitud = ?;
  `;

  // Ejecutar la consulta
  connection.query(sqlQuery, [idSolicitud], (err, results) => {
    if (err) {
      // En caso de error, enviar una respuesta de error al cliente
      console.error("Error al actualizar el estado de la solicitud:", err);
      res.status(500).json({ error: "Error interno del servidor" });
      return;
    }

    // Si la actualización se realizó correctamente, enviar una respuesta de éxito al cliente
    res.json({ message: "Solicitud aprobada exitosamente" });
  });
});

app.post("/desaprobar/:idSolicitud", (req, res) => {
  const { idSolicitud } = req.params;

  // Consulta SQL para actualizar el estado de la solicitud a 'Denegado'
  const sqlQuery = `
    UPDATE solicitudes 
    SET estadoSolicitud = 'Denegado' 
    WHERE idSolicitud = ?;
  `;

  // Ejecutar la consulta
  connection.query(sqlQuery, [idSolicitud], (err, results) => {
    if (err) {
      // En caso de error, enviar una respuesta de error al cliente
      console.error("Error al actualizar el estado de la solicitud:", err);
      res.status(500).json({ error: "Error interno del servidor" });
      return;
    }

    // Si la actualización se realizó correctamente, enviar una respuesta de éxito al cliente
    res.json({ message: "Solicitud desaprobada exitosamente" });
  });
});

app.listen(port, () => {
  console.log(`Servidor backend escuchando en http://localhost:${port}`);
});
