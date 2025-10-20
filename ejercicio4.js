const rl = require('readline-sync')
const IVA = 0.19
while(true){
  console.log('Registrar venta de varios productos')
  console.log('1. Ingresar productos y calcular total')
  console.log('2. Salir')
  const op = rl.question('elije una opción: ')
  if(op==='1'){
    const productos = pedirproductos()
    const res = calcularventa(productos)
    if(!res) console.log('no puedo calcular si no pones eso bien')
    else {
      console.log('subtotal:', res.subtotal)
      console.log('IVA (19%):', res.iva)
      console.log('total a pagar:', res.total)
    }
  } else if(op==='2'){
    break
  } else {
    console.log('opción inválida')
  }
}
function validarnumero(valor){
  return typeof valor === 'number' && isFinite(valor) && valor > 0
}
function pedirProductos(){
  const lista = []
  while(true){
    console.log('Ingresa los datos del producto:')
    const precio = Number(rl.question('precio: '))
    const cantidad = Number(rl.question('cantidad (enteros): '))
    if(!validarnumero(precio) || !Number.isInteger(cantidad) || cantidad <= 0){
      console.log('en algo te equivocaste pon eso bien')
      const re = rl.question('¿quieres otra vez? (si/no): ')
      if(re.toLowerCase() !== 'si') break
      else continue
    }
    lista.push({precio,cantidad})
    const mas = rl.question('¿quieres poner otro? (s/n): ')
    if(mas.toLowerCase() !== 'si') break
  }
  return lista
}
function calcularventa(lista){
  if(!Array.isArray(lista) || lista.length===0) return null
  for(const p of lista){
    if(!validarnumero(p.precio) || !Number.isInteger(p.cantidad) || p.cantidad<=0) return null
  }
  const totales = lista.map(p => p.precio * p.cantidad)
  const subtotal = totales.reduce((s,x)=>s+x,0)
  const iva = subtotal * IVA
  const total = subtotal + iva
  return {subtotal, iva, total}
}