const express = require('express');
const router = express.Router();

const listaTareas = require('./script')
const tareas = listaTareas.tareas


// Ruta para agregar una nueva tarea
router.post('/tarea', (req, res) => {
    const { id, descripcion } = req.body;
    if (id === undefined || id === null  || id < 0) {
        res.status(404).json('El ID de la tarea no es válido');
        return;
      }
      
      // Verificar si el ID ya existe en las tareas existentes
      if (tareas.some((tarea) => tarea.id === id)) {
          res.status(404).json('El ID de la tarea ya existe');
          return;
      }
    listaTareas.agregarTarea(id,descripcion)
  res.status(201).send(listaTareas.tareas);
});

// Ruta para marcar una tarea como completada
router.put('/tarea/:id', (req, res) => {
    const tareaId = req.params.id;
    const tareaIndex = tareas.findIndex((t) => t.id == tareaId);
    if (tareaId === undefined || tareaId === null || tareaId.trim() === '' || tareaId < 0) {
        res.status(404).json('El ID de la tarea no es válido');
        return;
    }
    if (!tareas[tareaIndex]) {
        res.status(404).json({ error: 'Tarea no encontrada' });
    } else {
      listaTareas.completarTarea(tareaIndex)
        res.status(200).json(tareas);
  }
});

// Ruta para eliminar una tarea
router.delete('/tarea/:id', (req, res) => {
    const tareaId = req.params.id;
    const tareaIndex = tareas.findIndex((t) => t.id == tareaId);
    
    if (tareaId === undefined || tareaId === null || tareaId < 0) {
      return res.status(404).json('El ID de la tarea no es válido');
    }

  if (!tareas[tareaIndex]) {
        res.status(404).json({ error: 'Tarea no encontrada' });
  } else {
    listaTareas.eliminarTarea(tareaIndex)
    res.status(200).json(tareas);
  }
});

module.exports = router;