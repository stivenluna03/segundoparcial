constrl = require('readline-sync')
 let estudiantes= [
 {cedula:"1001", nombres: "juan", apellidos:"perez",edad: 20},
 {cedula:"1002", nombres: "maria", apellidos:"gonzalez",edad: 22},
  {cedula:"1003", nombres: "luis", apellidos:"ramirez",edad: 19},
]

while(true){
  console.log('1. Buscar estudiante por cedula')
  console.log('2. Mostrar todos los estudiantes')
  console.log('3. Salir')
  const op = rl.question('elij una opción: ')
  if(op==='1'){
    const ced = rl.question(' ingresar  cedula: ')
    const r = buscarestudiante(ced)
    mostrarestudiante(r)
  } else if(op==='2'){
    console.log(estudiantes)
  } else if(op==='3'){
    break
  } else {
    console.log('opción inválida')
  }
}

function buscarestudiante (cedula){
  const encontrado = estudiantes.find(e => e.cedula === cedula)
  if(!encontrado) return null
  return encontrado
}

function mostrarestudiante(e){
  if(!e) return console.log('No hay estudiante con esa cedula.')
  console.log('cedula:', e.cedula)
  console.log('nombres:', e.nombres)
  console.log('apellidos:', e.apellidos)
  console.log('edad:', e.edad)
}