const electron = require("electron");
const ipc = electron.ipcRenderer
import {gastos , ui} from './app.js'

const formGastos = document.querySelector('#form-gastos');
const gastonuevo = document.querySelector('#nombre-gasto');
const total = document.querySelector('#Total-gasto');
let idn;
let modedicion = false;

document.addEventListener('DOMContentLoaded' , ()=>{
    console.log('Correcto');
    ipc.on('Idgastorecibido',(e,id)=>{
        modedicion=true
       gastonuevo.value=id
        rellenar(id)
    })
    eventListeners();
})

function eventListeners(){
    formGastos.addEventListener('submit' , nuevoEgreso);
}

function nuevoEgreso(e){
    e.preventDefault()
    if(gastonuevo.value == "" || total.value == ""){
        console.log('todos los campos deben de ser llenados')
        iu.error('Todos los campos deben de ser llenados'  , 'error');
        return;
    }

    if(modedicion==false){
        
        gastos.agregandogastos(gastonuevo.value, total.value)
        iu.error('Gasto agregado correctamente','success')
        formGastos.reset();
    }
    else{
        gastos.editados(gastonuevo.value, total.value, idn)
        iu.error('Cambios Guardados correctamente','success')
        formGastos.reset();
    }
    
   
    ui.mostraringresos();
    ipc.send('nuevosgastos')
}

function editarGasto(e){
    e.preventDefault();
    if(gastonuevo.value==""|| total.value==""){
        iu.error('Todos los campos deben ser llenados','error')
        return
    }

    gastos.agregandogastos(gastonuevo.value, total.value)
    iu.error('Gasto agregado correctamente','success')
    ui.mostraringresos()
    ipc.send('nuevosgastos')
}

function rellenar(id){

    const formlocalstorage=JSON.parse(localStorage.getItem('gastos')) ;

    const formlocalstorageFilter=formlocalstorage.filter((element) => {
        return element.id==id;
    })

    console.log(formlocalstorageFilter[0])

    gastonuevo.value=formlocalstorageFilter[0].gastonuevo;
    total.value=formlocalstorageFilter[0].total;
    idn=id
}

class UI{
    error(mensaje, tipo) {

        const formagastos = document.querySelector('#form-gastos');
      
        const msjalerta = document.createElement('div');
        msjalerta.classList.add('p-3', 'm-3', 'text-center', 'alert')
        msjalerta.textContent = mensaje

        if (tipo == 'error') {
            msjalerta.classList.add('alert-danger')
        }
        else {
            msjalerta.classList.add('alert-success')
        }

        formagastos.appendChild(msjalerta)
    
        setTimeout(() => {
            msjalerta.remove()
        }, 2000);

    }
}

const iu = new UI()