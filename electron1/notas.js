import {ui, notas} from "./app.js"
const electron=require("electron");
const ipc=electron.ipcRenderer
const notilla = document.querySelector('#formularioNota');
const notaNueva = document.querySelector('#nota-nueva');
let modoEdi = false;
let idn
//event LIsteners
document.addEventListener('DOMContentLoaded',()=>{
    
    console.log('cargado');
    ipc.on('Idrecibido',(e,id)=>{
        modoEdi=true
        notaNueva.value=id
        notaeditada(id);
       
    })
    eventListeners();
})

function eventListeners(){
    notilla.addEventListener('submit', nuevaNotaAgregar);
    
}

//funciones
function nuevaNotaAgregar(e){
    e.preventDefault();

    if(notaNueva.value === ""){    
        ui.mensajeError('No se puede guardar una nota vacia' , 'error');
       
        return
    }
    if(modoEdi == false){
        notas.agregando(notaNueva.value);
         ui.mensajeError('Nota agregada correctamente','success');
        notilla.reset();
    }else{
        notas.editada(notaNueva.value , idn);
        ui.mensajeError('Cambios en la nota guardados correctamente' , 'success');
        notilla.reset();
    }
    
    ui.mostrarnotas();  
    ipc.send('nuevasnotas');
}

function editarNota(e){
    e.preventDefault();
    if(notaNueva.value==""){
        ui.alerta('No se puede guardar una nota vacia','error')
        return
    }

    notas.agregando(notaNueva.value)
    ui.mensajeError('Cliente agregado correctamente','success')
    ui.mostrarnotas()
    ipc.send('nuevasnotas')
}

function notaeditada(id){

    const formlocalstorage=JSON.parse(localStorage.getItem('notas')) ;

    const formlocalstorageFilter=formlocalstorage.filter((element) => {
        return element.id==id;
    });

    console.log(formlocalstorageFilter[0]);
    notaNueva.value=formlocalstorageFilter[0].notaNueva;
    idn=id
}