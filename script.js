const tareas = [];

//Funcion para obtener una sola tarea

function obtenerTarea(id) {
  const tareaObtenida = tareas.findIndex((t) => t.id == id);
  
  return tareaObtenida
}

//Funcion para listar todas las tareas
function listarTareas() {
  return tareas
}


// Funcion para listar tareas completadas

function listarTareasCompletas() {
    
    const filtradoCompleto = tareas.filter((tarea) => tarea.estado == true)
    return filtradoCompleto
}

//Funcion para lista tareas incompletas

function listarTareasIncompletas() {
    const filtradoIncompleto = tareas.filter((tarea) => tarea.estado == false)
    return filtradoIncompleto
}

//Funcion para agregar tareas

function agregarTarea(id, descripcion) {
  
      
  tareas.push({ id, descripcion, estado: false });
    
}

//Funcion para eliminar tareas

function eliminarTarea(indice) {
    
  tareas.splice(indice, 1);

}

//Funcion para completar tareas

function completarTarea(indice) {

  tareas[indice].estado = true;
      
}
// //--------------------------------------------------------------------------------------------------------------------------


module.exports = {
  obtenerTarea,
  listarTareasCompletas,
  listarTareasIncompletas,
  agregarTarea,
  eliminarTarea,
  completarTarea,
  tareas
}