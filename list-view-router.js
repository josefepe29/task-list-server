const express = require('express');
const router = express.Router();

const listaTareas = require('./script')
const tareas = listaTareas.tareas

//Ruta get para poder listar objetos por id

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
        res.json(tareas[tareaIndex]);
  }
})

//Ruta para listar todos los elementos

router.get('/listar', (req, res) => {
  res.json(listaTareas.tareas)
})


//Ruta para listar incompletas o completas
router.get('/:accion', (req, res) => {
  const accion = req.params.accion

  if (accion == 'completas') {
    const completadas = listaTareas.listarTareasCompletas()
    return res.json(completadas);
  } else if (accion == 'incompletas') {
    const incompletas = listaTareas.listarTareasIncompletas()
    return res.json(incompletas);
  } else {
    return res.status(404).json({ error: "No se encontro la accion a realizar" })
  }
  
})

module.exports = router;