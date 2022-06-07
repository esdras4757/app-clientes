const electron = require("electron");
const ipc = electron.ipcRenderer
const iro = require('@jaames/iro');
var eventos=JSON.parse(localStorage.getItem('eventos')) 

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
      eventClick:function(e) {
        ipc.send('editarEvento',e.event.id)
      }
      
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