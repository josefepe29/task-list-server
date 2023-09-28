const tareas = [];

// Funcion para listar tareas completadas

function listarTareasCompletas() {
    
    const filtradoCompleto = tareas.filter((tarea) => tarea.estado == true)
    return filtradoCompleto
}

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
  listarTareasCompletas,
  listarTareasIncompletas,
  agregarTarea,
  eliminarTarea,
  completarTarea,
  tareas
}