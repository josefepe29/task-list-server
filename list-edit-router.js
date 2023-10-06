const express = require('express');
const router = express.Router();

const listaTareas = require('./script')
const tareas = listaTareas.tareas

router.use((req, res, next) => {
  const keys = Object.keys(req.body)
  if ((req.method === 'POST' || req.method === 'PUT') && Object.keys(req.body).length == 0) {
    // Cuerpo vacío en solicitudes POST y PUT
    return res.status(400).json({ error: 'Cuerpo de solicitud vacío' });
  }
  if (!Object.keys(req.body).includes('id') || !Object.keys(req.body).includes('descripcion')) {
    return res.status(400).json({ error: 'Atributos faltantes' });
  }
  next();
})



// Ruta para agregar una nueva tarea
router.post('/tarea', (req, res) => {
  const { id, descripcion } = req.body;
  if (id === undefined || id === null  || id < 0) {
    return res.status(400).json('El ID de la tarea no es válido');
  }
  if (tareas.some((tarea) => tarea.id === id)) {
    return res.status(400).json('El ID de la tarea ya existe');
  } 
      
  listaTareas.agregarTarea(id,descripcion)
  res.json(listaTareas.tareas);
    
});

// Ruta para marcar una tarea como completada
router.put('/tarea/:id', (req, res) => {
    const tareaId = req.params.id;
    const tareaIndex = tareas.findIndex((t) => t.id == tareaId);
    if (tareaId === undefined || tareaId === null || tareaId.trim() === '' || tareaId < 0) {
        return res.status(404).json('El ID de la tarea no es válido');
    }
    if (!tareas[tareaIndex]) {
       return res.status(404).json({ error: 'Tarea no encontrada' });
    } 
      listaTareas.completarTarea(tareaIndex)
      res.json(tareas);
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
    res.json(tareas);
  }
});

module.exports = router;