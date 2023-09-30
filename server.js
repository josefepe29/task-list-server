const express = require('express');
const app = express();
const port = 8080;
const vista = require('./list-view-router');
const edicion = require('./list-edit-router');

app.use(express.json());

function validarMetodosHTTP(req, res, next) {
  const validarMetodos = ['GET', 'POST', 'PUT', 'DELETE'];

  if (!validarMetodos.includes(req.method)) {
  
    return res.status(400).json({ error: 'Método HTTP no válido' });
  }

  next();
}

app.use(validarMetodosHTTP)

app.use('/edicion', edicion)
app.use('/vista',vista)

app.listen(port, () => {
  console.log(`Servidor escuchando en el puerto ${port}`);
});