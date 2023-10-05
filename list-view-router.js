const express = require('express');
const router = express.Router();

const listaTareas = require('./script')
const tareas = listaTareas.tareas

router.get('/listar/:id', (req, res) => {
  const tareaId = req.params.id; 
    if (tareaId === undefined || tareaId === null || tareaId.trim() === '' || tareaId < 0) {
        res.status(404).json('El ID de la tarea no es válido');
        return;
  }
  const tareaIndex = listaTareas.obtenerTarea(tareaId)
    if (!tareas[tareaIndex]) {
        res.status(404).json({ error: 'Tarea no encontrada' });
    } else {
        res.status(200).json(tareas[tareaIndex]);
  }
})

router.get('/listar', (req, res) => {
  res.status(200).json(listaTareas.tareas)
})

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