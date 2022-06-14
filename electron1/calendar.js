const electron = require("electron");
const ipc = electron.ipcRenderer
const iro = require('@jaames/iro');
var eventos=JSON.parse(localStorage.getItem('eventos')) 
var evento;

document.addEventListener('DOMContentLoaded', function() {
    var calendarEl = document.getElementById('calendar');
    

    var calendar = new FullCalendar.Calendar(calendarEl, {

      
      initialView: 'dayGridMonth',
      headerToolbar: {
        center: 'addEventButton'
      },
      customButtons: {
        addEventButton: {
          text: 'Agregar un evento...',
          click: function() {
            ipc.send('agregarEvento')
          }
        }
      },
      eventDrop: function imprimir(e) {
        // console.log(e.event.title);
        // console.log(e.event.start);
        // console.log(e.event.id);
        // console.log(e.event.extendedProps.descripcion);
         var EventObj={
          'nombre':e.event.title,
          'start':e.event.start,
           'end':e.event.end,
           'descripcion':e.event.extendedProps.descripcion,
           'color':e.event.backgroundColor,
           'id':e.event.id
        }
        console.log(e.event.end)
        actualizarEvento(e.event.id,EventObj)
      },
      eventMouseEnter: function mostrarBtnEliminar(e){

        const contenedor= e.el.querySelector('.fc-event-title-container')
        console.log(e.el.parentElement);

        

        if (!contenedor.querySelector(".borrarActivo")) {
          console.log(contenedor);

          const deleteBtn=document.createElement('button')
          deleteBtn.className='bg-transparent border-0  bi-x-circle borrarActivo d-block'
          
          deleteBtn.innerHTML=`
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="white" class="bi bi-x-circle" viewBox="0 0 16 16">
    <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
    <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>
  </svg>
          `
  
          contenedor.appendChild(deleteBtn)

          
          

          e.el.parentElement.addEventListener('click',(ev)=>{
            if(ev.target.classList.contains('bi-x-circle'||'borrarActivo')){
              eliminarEvento(e.event.id)
              
            }
            else{
              ipc.send('editarEvento',e.event.id)
            }
          })
        }

        const contenedor2= e.el.querySelector('.bi-x-circle')
        contenedor2.classList.remove('d-none')


      },
      eventMouseLeave: function ocultarBtnEliminar(e){
        const contenedor= e.el.querySelector('.bi-x-circle')
        contenedor.classList.add("d-none")
        
      }
      ,
      eventResize:function imprimir(e) {
        // console.log(e.event.title);
         console.log(e.event.start);
        // console.log(e.event.id);
        // console.log(e.event.extendedProps.descripcion);
         const EventObj={
          'nombre':e.event.title,
          'start':e.event.start,
           'end':e.event.end,
           'descripcion':e.event.extendedProps.descripcion,
           'color':e.event.backgroundColor,
           'id':e.event.id
        }
        console.log(e.event.end)
        actualizarEvento(e.event.id,EventObj)
      },
      
    });
  
    calendar.render();



    const eventos=JSON.parse(localStorage.getItem('eventos')) 
    
    console.log(eventos);

    if (eventos) {
      eventos.forEach(element => {
        calendar.addEvent({
          title: element.nombre,
          start: element.start,
          end: element.end,
          id:element.id,
          allDay: true,
          backgroundColor:element.color,
          borderColor:element.color,
          editable:true,
          durationEditable:true,
          eventStartEditable:true,
          extendedProps:{
            descripcion:element.descripcion
          }

        });
    
      });
    }

    
   const evento = calendar.getEvents()

  });


  function actualizarEvento(id,obj){
 const eventosfilter=eventos.filter((item) => {
    return item.id!=id
  })
  console.log(eventosfilter)
  console.log(obj)

  eventos=eventosfilter;
  eventos.push(obj)

  console.log(eventos);

  localStorage.setItem('eventos',JSON.stringify(eventos))
}

function eliminarEvento(id){
  const eventosfilter=eventos.filter((item) => {
     return item.id!=id
   })
   console.log(eventosfilter)
 
   eventos=eventosfilter;
 
   console.log(eventos);
 
   localStorage.setItem('eventos',JSON.stringify(eventos))

   ipc.send('actpri')
 }
