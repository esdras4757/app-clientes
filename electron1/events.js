
const iro = require('@jaames/iro');
const electron=require("electron");
import {cliente,ui} from "./app.js"
const form= document.querySelector('#form')
const nombre=document.querySelector('#nombre')
const start=document.querySelector('#start')
const end=document.querySelector('#end')
const descripcion=document.querySelector('#descripcion')
const color=document.querySelector('#color')
var liestaEventos=JSON.parse(localStorage.getItem('eventos'))
const ipc=electron.ipcRenderer
const titulo=document.querySelector('h1')
const textobotonsucces=document.querySelector('#butn')
var modoEdicion=false
var idedicion
if (!liestaEventos) {
  liestaEventos=[]
}






document.addEventListener('DOMContentLoaded',()=>{
  const hoy= new Date()
  var mes;
  var dia;
  var dia2;
  if (hoy.getMonth()+1<10) {
    mes=`0${hoy.getMonth()+1}`
  } 
  else{
    mes=`${hoy.getMonth()+1}`
  }

  if (hoy.getDate()+1<10) {
    dia=`0${hoy.getDate()+1}`
    var dia2=`0${hoy.getDate()+2}`
  } 
  else{
    dia=`${hoy.getDate()}`
    var dia2=`${hoy.getDate()+1}`
  }
  ipc.on('recibirId2',(e,id)=>{
    console.log(id)
    modoEdicion=true;
    idedicion=id
    llenarFormulario(id)
    titulo.textContent='Editar evento'
    textobotonsucces.textContent='Guardar cambios'
})
  

  const fechaConFormato=`${hoy.getFullYear()}-${mes}-${dia}`;
  const fechaConFormato2=`${hoy.getFullYear()}-${mes}-${dia2}`;

  start.value=fechaConFormato
  end.value=fechaConFormato2
  console.log(fechaConFormato2);

  addEventListeners()
})



function addEventListeners(){
  document.addEventListener('submit',validarFormulario)
}


var colorPicker = new iro.ColorPicker("#picker", {
    // Set the size of the color picker
    width: 320,
    // Set the initial color to pure red
    color: "#f00"

    
  });
  




function validarFormulario(e){
  var hex=colorPicker.color.hexString;
 console.log(hex);
 e.preventDefault();
const btnform=document.querySelector('#btnform')

 if(nombre.value==""){

  if (document.querySelector('.error')) {
    return
  }
    const alertaError=document.createElement('p')
      alertaError.textContent='El nombre del evento debe ser llenado'
      alertaError.className='alert text-center p-3 alert-danger error'

      btnform.insertBefore(alertaError,form.querySelector('#butn'))

      setTimeout(() => {
        alertaError.remove()
      }, 2000);

  return
 }

 if (start.value==end.value) {
  if (document.querySelector('.error')) {
    return
  }
    const alertaError=document.createElement('p')
      alertaError.textContent='La fecha de inicio y de termino no puede ser la misma'
      alertaError.className='alert text-center p-3 alert-danger error'

      btnform.insertBefore(alertaError,form.querySelector('#butn'))

      setTimeout(() => {
        alertaError.remove()
      }, 2000);

  return
 }

 const EventObj={
  'nombre':nombre.value,
  'start':start.value,
   'end':end.value,
   'descripcion':descripcion.value,
   'color':hex,
   'id':Date.now()
}

if(modoEdicion==false) {
 console.log(EventObj);
liestaEventos.push(EventObj)
localStorage.setItem('eventos',JSON.stringify(liestaEventos))

if (document.querySelector('.error')) {
  return
}
  const alertaError=document.createElement('p')
    alertaError.textContent='Evento agregado correctamente'
    alertaError.className='alert text-center p-3 alert-success error'

    btnform.insertBefore(alertaError,form.querySelector('#butn'))

    setTimeout(() => {
      alertaError.remove()
    }, 2000);
}

else{
  EventObj.id=idedicion
  actualizarEvento(idedicion,EventObj)
  if (document.querySelector('.error')) {
    return
  }
    const alertaError=document.createElement('p')
      alertaError.textContent='Actualizado correctamente'
      alertaError.className='alert text-center p-3 alert-success error'

      btnform.insertBefore(alertaError,form.querySelector('#butn'))

      setTimeout(() => {
        alertaError.remove()
      }, 2000);
}

ipc.send('actpri')



}







function formatoFecha(fecha, formato) {
  const map = {
      dd: fecha.getDate(),
      mm: '0'+(fecha.getMonth() + 1),
      yy: fecha.getFullYear().toString().slice(-2),
      yyyy: fecha.getFullYear()
  }

  return formato.replace(/dd|mm|yyyy/gi, matched => map[matched])
}

function llenarFormulario(id){

  const formlocalstorage=JSON.parse(localStorage.getItem('eventos')) ;

  const formlocalstorageFilter=formlocalstorage.filter((element) => {
      return element.id==id;
  })

  console.log(formlocalstorageFilter[0])

//   const form= document.querySelector('#form')
// const nombre=document.querySelector('#nombre')
// const start=document.querySelector('#start')
// const end=document.querySelector('#end')
// const descripcion=document.querySelector('#descripcion')
// const color=document.querySelector('#color')
  

  nombre.value=formlocalstorageFilter[0].nombre;
  start.value=formlocalstorageFilter[0].start.slice(0,10);
  end.value=formlocalstorageFilter[0].end.slice(0,10);
  descripcion.value=formlocalstorageFilter[0].descripcion;

  
}


 function actualizarEvento(id,obj){
  const eventosfilter=liestaEventos.filter((item) => {
     return item.id!=id
   })
   console.log(eventosfilter)
   console.log(obj)
 
   liestaEventos=eventosfilter;
   liestaEventos.push(obj)
 
   console.log(liestaEventos);
 
   localStorage.setItem('eventos',JSON.stringify(liestaEventos))
 }