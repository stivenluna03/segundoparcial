const rl = require('readline-sync')
let inventario = [
  {codigo:"P001", nombre:"café Molido", precio:12000, stock:10, estado:"disponible"},
  {codigo:"P002", nombre:"té Verde", precio:8000, stock:0, estado:"agotado"}
]
while(true){
  console.log('gestión de inventario')
  console.log('1. Agregar nuevo producto')
  console.log('2. Actualizar stock por código')
  console.log('3. Listar productos (ordenados por nombre)')
  console.log('4. Salir')
  const op = rl.question('Elije una opción: ')
  if(op==='1'){
    const codigo = rl.question('código: ')
    const nombre = rl.question('nombre: ')
    const precio = Number(rl.question('Precio: '))
    const stock = Number(rl.question('Stock: '))
    const r = agregarproducto({codigo,nombre,precio,stock})
    console.log(r.msg)
  } else if(op==='2'){
    const codigo = rl.question('código del producto: ')
    const nuevoStock = Number(rl.question('nuevo stock : '))
    const r = actualizarstock(codigo, nuevoStock)
    console.log(r.msg)
  } else if(op==='3'){
    console.log(listarproductos())
  } else if(op==='4'){
    break
  } else {
    console.log('malo , siempre lo mismo compa ')
  }
}
function validarproducto(p){
  if(!p.codigo || !p.nombre) return false
  if(typeof p.precio !== 'number' || p.precio <= 0) return false
  if(!Number.isInteger(p.stock) || p.stock < 0) return false
  return true
}
function agregarproducto(producto){
  if(inventario.some(x=>x.codigo===producto.codigo)) return {ok:false,msg:'lo repetiste'}
  if(!validarproducto(producto)) return {ok:false,msg:'joa dato invalido mano'}
  producto.estado = producto.stock>0 ? 'si hay' : 'no hay'
  inventario.push(producto)
  return {ok:true,msg:'ya lo puse bro'}
}
function actualizarstock(codigo, nuevoStock){
  const p = inventario.find(x=>x.codigo===codigo)
  if(!p) return {ok:false,msg:' no lo encontre mano perdon'}
  if(!Number.isInteger(nuevoStock) || nuevoStock<0) return {ok:false,msg:'Stock malo'}
  p.stock = nuevoStock
  p.estado = p.stock>0 ? 'si hay' : 'no hay'
  return {ok:true,msg:'Stock actualizado'}
}
function listarproductos(){
  return inventario.slice().sort((a,b)=> a.nombre.localeCompare(b.nombre))
}
