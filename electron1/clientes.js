import {cliente,ui} from "./app.js"
const electron=require("electron");
const ipc=electron.ipcRenderer
const formulario=document.querySelector('#form')
const nombre=document.querySelector('#nombre')
const apellido=document.querySelector('#apellido')
const pais=document.querySelector('#pais')
const numero=document.querySelector('#numero')
const correo=document.querySelector('#correo')
const inversion=document.querySelector('#inversion')
const divisa=document.querySelector('#divisa')
const modalidad=document.querySelector('#modalidad')
const forma=document.querySelector('#forma')
let idn;
let modoEdicion=false;



// documento listo 

document.addEventListener('DOMContentLoaded',()=>{
    
    console.log('listooo');
    ipc.on('recibirId',(e,id)=>{
        modoEdicion=true
        nombre.value=id
        llenarFormulario(id)
    })
    eventListeners();
})
// eventListeners

function eventListeners(){
    formulario.addEventListener('submit',clientenuevo)
}


function clientenuevo(e){
    e.preventDefault();
        if(nombre.value==""|| apellido.value=="" || pais.value==""|| numero.value==""|| correo.value==""|| inversion.value==""|| forma.value==""|| numero.value==""){
            ui.alerta('Todos los campos deben ser llenados','error')
            
            return
        }

    if(modoEdicion==false){
        
        cliente.agregar(nombre.value,apellido.value,pais.value,numero.value,correo.value,inversion.value,divisa.value,modalidad.value,forma.value)
        ui.alerta('Cliente agregado correctamente','success')
        formulario.reset();
    }
    else{
        cliente.editar(nombre.value,apellido.value,pais.value,numero.value,correo.value,inversion.value,divisa.value,modalidad.value,forma.value,idn)
        ui.alerta('Cambios Guardados correctamente','success')
        formulario.reset();
    }
    
    ui.mostrarClientes()
    ipc.send('actpri')
}

function editarCliente(e){
    e.preventDefault();
    if(nombre.value==""|| apellido.value=="" || pais.value==""|| numero.value==""|| correo.value==""|| inversion.value==""|| forma.value==""|| numero.value==""){
        ui.alerta('Todos los campos deben ser llenados','error')
        return
    }

    cliente.agregar(nombre.value,apellido.value,pais.value,numero.value,correo.value,inversion.value,divisa.value,modalidad.value,forma.value)
    ui.alerta('Cliente agregado correctamente','success')
    ui.mostrarClientes()
    ipc.send('actpri')
}

function llenarFormulario(id){

    const formlocalstorage=JSON.parse(localStorage.getItem('clientes')) ;

    const formlocalstorageFilter=formlocalstorage.filter((element) => {
        return element.id==id;
    })

    console.log(formlocalstorageFilter[0])

    
    

    nombre.value=formlocalstorageFilter[0].nombre;
    apellido.value=formlocalstorageFilter[0].apellido;
    pais.value=formlocalstorageFilter[0].pais;
    numero.value=formlocalstorageFilter[0].numero;
    correo.value=formlocalstorageFilter[0].correo;
    inversion.value=formlocalstorageFilter[0].inversion;
    divisa.value=formlocalstorageFilter[0].divisa;
    forma.value=formlocalstorageFilter[0].forma;
    numero.value=formlocalstorageFilter[0].numero;
    modalidad.value=formlocalstorageFilter[0].modalidad;
    idn=id
}

