const express = require('express');
const vista = require('./list-view-router');
const app = express();
const edicion = require('./list-edit-router');
const jwt = require('jsonwebtoken')
require('dotenv').config()


const PORT = process.env.PORT || 3000
const SECRET_KEY = process.env.SECRET_KEY

function validarCredenciales (req, res,next) {
  const token = req.header("Authorization");

  if (!token) {
    return res.status(401).json({ error: "Token no proporcionado" });
  }
    // Verifica y decodifica el token JWT
  jwt.verify(token, SECRET_KEY, (err, decoded) => { 
    if (err) {  
      return res.status(401).json({ error: "Token inválido" });
    }
  });
    next()
};

app.use(express.json());

const usuarios = [
  { id: 1, usuario: "usuario1", contrasena: "contrasena1" },
  { id: 2, usuario: "usuario2", contrasena: "contrasena2" },
];

function validarMetodosHTTP(req, res, next) {
  const validarMetodos = ['GET', 'POST', 'PUT', 'DELETE'];
  
  if (!validarMetodos.includes(req.method)) {
    
    return res.status(400).json({ error: 'Método HTTP no válido' });
  }
  
  next();
}

app.use(validarMetodosHTTP)


app.post("/login", (req, res) => {
  const { usuario, contrasena } = req.body;

  // Busca el usuario en la lista 
  const user = usuarios.find(
    (u) => u.usuario === usuario && u.contrasena === contrasena
  );

  if (!user) {
    return res.status(401).json({ error: "Credenciales inválidas" });
  }

  const token = jwt.sign({ id: user.id, usuario:user.usuario, contrasena:user.contrasena }, SECRET_KEY);

  res.json({ token });
});

app.use(validarCredenciales)

app.use('/edicion',edicion)
app.use('/vista',vista)

app.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto ${PORT}`);
});

