const express = require('express');
const router = express.Router();

const listaTareas = require('./script')

// router.use((req, res, next) => {
//   const parametro = req.params.tarea

//   if (parametro != 'completas' || parametro != 'incompletas') {
//     res.status(404).send("Not found")
//   }

//   next()
// })

// Ruta para listar tareas completas
router.get('/completas', (req, res) => {
const completadas = listaTareas.listarTareasCompletas()
  res.status(200).json(completadas);
});

// Ruta para listar tareas incompletas
router.get('/incompletas', (req, res) => {
  const incompletas = listaTareas.listarTareasIncompletas()
  res.status(200).json(incompletas);
});

module.exports = router;