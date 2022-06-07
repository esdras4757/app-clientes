const electron = require("electron");
const ipc = electron.ipcRenderer
document.addEventListener('DOMContentLoaded' , ()=>{
    console.log('Correcto');
    ipc.on('recibirIdingresos',(e,id)=>{
       
       
       
       imping(id)
       impricli(id)
    })
})


const formlocalstorage=JSON.parse(localStorage.getItem('ingresos')) ;
const formlocal=JSON.parse(localStorage.getItem('clientes')) ;

function impricli  ( cliente =formlocal, id){

    const ctxp = document.querySelector("#myChart3")
    
    const localfilter = cliente.filter(eachgastos => eachgastos.id)
    let lista = localfilter.slice(-10)
    console.log(localfilter)
    const data = {
      labels: lista.map(eachGasto => eachGasto.nombre ),
      datasets: [{
          label: 'Clientes',
          data:lista.map(eachGasto => eachGasto.inversion ),
          backgroundColor: ['	rgb(221, 160, 221)' , '	rgb(205, 92, 92)' , 'rgb(240, 230, 140)' , 'rgb(255, 215, 0)', 'rgb(135, 206, 250)', 'rgb(186, 85, 211)' , 'rgb(199, 21, 133)', 'rgb(72, 209, 204)', 'rgb(205, 133, 63)', 'rgb(255, 99, 71)'], 
          borderWidth: 1,
          borderColor: ['rgb(154, 205, 50)' , 'rgb(255, 255, 0)' , 'rgb(245, 222, 179)' , '	rgb(238, 130, 238)' , '	rgb(64, 224, 208)' , '	rgb(255, 99, 71)' , '	rgb(216, 191, 216)' , '	rgb(0, 128, 128)' , '	rgb(210, 180, 140)' , '	rgb(70, 130, 180)']
      }]
    }
    
    
    new Chart (ctxp , {type: 'bar' , data})
    }

function imping  ( dinero =formlocalstorage , id){

    const ctxp = document.querySelector("#myChart2")
    
    const localfilter = dinero.filter(eachgastos => eachgastos.id)
    let lista = localfilter.slice(-10)
    console.log(localfilter)
    const data = {
      labels: lista.map(eachGasto => eachGasto.ingresonuevo ),
      datasets: [{
          label: 'Ingresos',
          data:lista.map(eachGasto => eachGasto.totalin ),
          backgroundColor: ['rgb(154, 205, 50)' , 'rgb(255, 255, 0)' , 'rgb(245, 222, 179)' , '	rgb(238, 130, 238)' , '	rgb(64, 224, 208)' , '	rgb(255, 99, 71)' , '	rgb(216, 191, 216)' , '	rgb(0, 128, 128)' , '	rgb(210, 180, 140)' , '	rgb(70, 130, 180)'], 
          borderWidth: 1,
          borderColor: ['	rgb(128, 0, 128)']
      }]
    }
    
    
    new Chart (ctxp , {type: 'bar' , data})
    }