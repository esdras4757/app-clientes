const electron = require("electron");
const ipc = electron.ipcRenderer
import {ingresos2 , ui} from './app.js'

const formingreso = document.querySelector('#form-ingresos');
const ingresonuevo = document.querySelector('#nombre-ingreso');
const totalin = document.querySelector('#Total-ingreso');
let idn;
let moedicion = false;

document.addEventListener('DOMContentLoaded' , ()=>{
    console.log('Correcto');
    ipc.on('Idingresorecibido',(e,id)=>{
        moedicion=true
       ingresonuevo.value=id
        rellenarform(id)
    })
    eventListeners();
})

function eventListeners(){
    formingreso.addEventListener('submit' , nuevoIngreso);
}

function nuevoIngreso(e){
    e.preventDefault()
    if(ingresonuevo.value == "" || totalin.value == ""){
        console.log('todos los campos deben de ser llenados')
        iu.error('Todos los campos deben de ser llenados'  , 'error');
        return;
    }

    if(moedicion==false){
        
        ingresos2.agregandoingreso(ingresonuevo.value, totalin.value)
        iu.error('Ingreso agregado correctamente','success')
        formingreso.reset();
    }
    else{
        ingresos2.editando(ingresonuevo.value, totalin.value, idn)
        iu.error('Cambios Guardados correctamente','success')
        formingreso.reset();
    }
    
   
    ui.mostraregresos();
    ipc.send('nuevoingreso')
}

function editarIngreso(e){
    e.preventDefault();
    if(ingresonuevo.value==""|| totalin.value==""){
        iu.error('Todos los campos deben ser llenados','error')
        return
    }

    ingresos2.agregandoingreso(ingresonuevo.value, totalin.value)
    iu.error('Ingreso agregado correctamente','success')
    ui.mostraregresos()
    ipc.send('nuevoingreso')
}

function rellenarform(id){

    const formlocalstorage=JSON.parse(localStorage.getItem('ingresos')) ;

    const formlocalstorageFilter=formlocalstorage.filter((element) => {
        return element.id==id;
    })

    console.log(formlocalstorageFilter[0])

    ingresonuevo.value=formlocalstorageFilter[0].ingresonuevo;
    totalin.value=formlocalstorageFilter[0].totalin;
    idn=id
}

class UI{
    error(mensaje, tipo) {

        const formingreso = document.querySelector('#form-ingresos');
      
        const msjalerta = document.createElement('div');
        msjalerta.classList.add('p-3', 'm-3', 'text-center', 'alert')
        msjalerta.textContent = mensaje

        if (!formingreso.querySelector('.alert')) {
            if (tipo == 'error') {
                msjalerta.classList.add('alert-danger')
            }
            else {
                msjalerta.classList.add('alert-success')
            }
    
            formingreso.appendChild(msjalerta)
        
            setTimeout(() => {
                msjalerta.remove()
            }, 2000);
        }
        

    }
}

const iu = new UI()