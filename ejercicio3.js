const rl = require('readline-sync')
let estudiantes = [
  {cedula:"2001", nombres:"ana", apellidos:"aantos", edad:21},
  {cedula:"2002", nombres:"aedro", apellidos:"alvarez", edad:23},
  {cedula:"2003", nombres:"aarla", apellidos:"aermúdez", edad:20}
]

while(true){
  console.log('\---Gestión de estudiantes---')
  console.log('1. Agregar nuevo estudiante')
  console.log('2. Listar estudiantes (ordenados por apellidos)')
  console.log('3. Buscar estudiante por cédula')
  console.log('4. Actualizar datos de estudiante')
  console.log('5. Eliminar estudiante')
  console.log('6. Salir')
  const op = rl.question('Elija una opción: ')
  if(op==='1'){
    const cedula = rl.question('Cédula: ')
    const nombres = rl.question('Nombres: ')
    const apellidos = rl.question('Apellidos: ')
    const edad = Number(rl.question('Edad: '))
    const r = agregarestudiante({cedula,nombres,apellidos,edad})
    console.log(r.msg)
  } else if(op==='2'){
    console.log(listarestudiantes())
  } else if(op==='3'){
    const ced = rl.question('mira la que vamos a buscar: ')
    const res = buscarestudiante(ced)
    if(!res) console.log('No encontrado')
    else console.log(res)
  } else if(op==='4'){
    const ced = rl.question('mira esta es la cedula: ')
    const existe = buscarestudiante(ced)
    if(!existe) console.log('no esta eso aqui busca bien ')
    else {
      const nombres = rl.question(`eombres [${existe.nombres}]: `) || existe.nombres
      const apellidos = rl.question(`epellidos [${existe.apellidos}]: `) || existe.apellidos
      const edadStr = rl.question(`edad [${existe.edad}]: `) || String(existe.edad)
      const edad = Number(edadStr)
      if(!Number.isInteger(edad) || edad<=0) console.log('jaja no le da la edad')
      else {
        const r = actualizarEstudiante(ced,{nombres,apellidos,edad})
        console.log(r.msg)
      }
    }
  } else if(op==='5'){
    const ced = rl.question('Cédula a eliminar: ')
    const ok = eliminarestudiante(ced)
    console.log(ok ? 'ya ta eliminau' : 'mala mia no lo encontre')
  } else if(op==='6'){
    break
  } else {
    console.log('malo eso')
  }
}
function agregarastudiante(est){
  if(!est.cedula) return {ok:false,msg:'anja y la cedula?'}
  if(estudiantes.some(e=>e.cedula===est.cedula)) return {ok:false,msg:' esa cedula ya existe'}
  if(!est.nombres || !est.apellidos) return {ok:false,msg:'una de dos o el nombre o el apellido'}
  if(!Number.isInteger(est.edad) || est.edad<=0) return {ok:false,msg:'edad inválida'}
  estudiantes.push(est)
  return {ok:true,msg:'listo lo agrege'}
}
function listarastudiantes(){
  return estudiantes.slice().sort((a,b)=> a.apellidos.localeCompare(b.apellidos))
}
function buscarastudiante(cedula){
  return estudiantes.find(e=>e.cedula===cedula) || null
}
function actualizarestudiante(cedula, datos){
  const i = estudiantes.findIndex(e=>e.cedula===cedula)
  if(i===-1) return {ok:false,msg:'No encontrado'}
  estudiantes[i] = {...estudiantes[i], ...datos}
  return {ok:true,msg:'Actualizado'}
}
function eliminarestudiante(cedula){
  const inicial = estudiantes.length
  estudiantes = estudiantes.filter(e=>e.cedula!==cedula)
  return estudiantes.length < inicial
}