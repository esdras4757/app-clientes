const electron = require("electron");
const ipc = electron.ipcRenderer
document.addEventListener('DOMContentLoaded' , ()=>{
    console.log('Correcto');
    ipc.on('recibirIding',(e,id)=>{
       
       
       imprimir(id)
       
    })
})

const GastosLocal = JSON.parse(localStorage.getItem('gastos'))


function imprimir  ( gastos =GastosLocal , id  ){

const ctxp = document.querySelector("#myChart")
const localfilter = gastos.filter(eachgastos => eachgastos.id)
let lista = localfilter.slice(-10)

console.log(lista)

const data = {
  
  labels: lista.map(eachGasto => eachGasto.gastonuevo ),
    
  datasets: [{
      label: 'Gastos',
      data:lista.map(eachGasto => eachGasto.total ),
      backgroundColor: ['	rgb(221, 160, 221)' , '	rgb(205, 92, 92)' , 'rgb(240, 230, 140)' , 'rgb(255, 215, 0)', 'rgb(135, 206, 250)', 'rgb(186, 85, 211)' , 'rgb(199, 21, 133)', 'rgb(72, 209, 204)', 'rgb(205, 133, 63)', 'rgb(255, 99, 71)'], 
      borderWidth: 1,
      borderColor: ['	rgb(128, 0, 128)'],
      
  }]

}
const options ={
    scale:{
        gridLines:{
            color: '#444'
        }
    },
    legend:{
        position: 'right'
    }
}



new Chart (ctxp , {type: 'pie' , data, options} )
}
