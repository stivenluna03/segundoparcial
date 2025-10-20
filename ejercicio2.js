const rl = require('readline-sync')
let libros = [
  {titulo: "cien años de soledad", autor: "gabriel garcía márquez", año: 1967, isbn: "111"},
  {titulo: "el túnel", autor: "ernesto sabato", año: 1948, isbn: "222"}
]
while(true){
  console.log('\---Gestión de libros---')
  console.log('1. Agregar libro')
  console.log('2. Listar todos los libros')
  console.log('3. Buscar por título o autor')
  console.log('4. Salir')
  const op = rl.question('elije una opción: ')
  if(op==='1'){
    const titulo = rl.question('título: ')
    const autor = rl.question('autor: ')
    const añoStr = rl.question('año de publicación: ')
    const isbn = rl.question('ISBN: ')
    const año = Number(añoStr)
    if(!Number.isInteger(año) || año <= 0){
      console.log('no te sabes el año ?')
    } else {
      const ok = agregarLibro({titulo, autor, año, isbn})
      console.log(ok ? 'ya lo agregre' : 'pon bien esos datos ome que no se pudo')
    }
  } else if(op==='2'){
    console.log(listarLibros())
  } else if(op==='3'){
    const texto = rl.question('puedes buscar por titulo o autor ')
    const res = tituloyautor(texto)
    if(res.length===0) console.log('no tenemos ese bro')
    else console.log(res)
  } else if(op==='4'){
    break
  } else {
    console.log('ta malo eso ve')
  }
}
function agregarLibro(libro){
  if(!libro.titulo || !libro.autor || !libro.año || !libro.isbn) return false
  if(typeof libro.año !== 'number' || libro.año <= 0) return false
  libros.push(libro)
  return true
}
function listarLibros(){
  return libros.slice()
}
function tituloyautor(texto){
  const t = texto.toLowerCase()
  return libros.filter(l => l.titulo.toLowerCase().includes(t) || l.autor.toLowerCase().includes(t))
}