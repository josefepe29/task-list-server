const express = require('express');
const app = express();
const port = 8080;
const vista = require('./list-view-router');
const edicion = require('./list-edit-router');

// Middleware para permitir solicitudes JSON
app.use(express.json());
app.use('/edicion', edicion)
app.use('/vista',vista)

app.listen(port, () => {
  console.log(`Servidor escuchando en el puerto ${port}`);
});