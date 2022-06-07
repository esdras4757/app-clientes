const{app, BrowserWindow, Menu , ipcMain}=require('electron');
const url=require('url')
const path =require('path');
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));


require ( 'electron-reload' ) ( __dirname ,  {  
  } ) ;


let mainWindow
let addClientWindow
let addNotaWindow
let addIngresoWindow
let addEgresoWindow

app.on('ready',()=>{
    mainWindow=new BrowserWindow({
        width:4000,
        height:4000,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false,
        }
    });
    
    mainWindow.loadURL(`file://${__dirname}/views/index.html`)

    mainWindow.maximize();

    

    // const mainMenu=Menu.buildFromTemplate([])
    // Menu.setApplicationMenu(mainMenu)

})






const templateMenu=[
    {
        label:'Deudores',
        submenu:[
            {
                label:'NewProduct'
            }
        ]
    },
    {
        label:'exit2e',
        submenu:[
            {
                label:'NewProduct'
            }
        ]
    }
]

if(process.env.NODE_ENV !=='production'){

    
}
ipcMain.on('agregarCliente', (event) => {
    addClientWindow=new BrowserWindow({
        width:500,
        height:500,
        parent:mainWindow,
        modal:true,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false,
        }
    })

    addClientWindow.loadFile('views/windowAddClient.html')

    
})

ipcMain.on('actpri', (event) => {
    mainWindow.reload()
})
ipcMain.on('agregarNota', (event) => {
    addNotaWindow=new BrowserWindow({
        width:500,
        height:500,
        parent:mainWindow,
        modal:true,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false,
        }
       
    })

    addNotaWindow.loadFile('views/addNota.html')
})

ipcMain.on('nuevasnotas' , (event) =>{
    mainWindow.reload();
})

ipcMain.on('agregarIngreso', (event) => {
    addIngresoWindow=new BrowserWindow({
        width:500,
        height:500,
        parent:mainWindow,
        modal:true,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false,
        }
       
    })

    addIngresoWindow.loadFile('views/newIngreso.html')
})



ipcMain.on('agregarEgreso', (event) => {
    addEgresoWindow=new BrowserWindow({
        width:500,
        height:500,
        parent:mainWindow,
        modal:true,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false,
        }
       
    })

    addEgresoWindow.loadFile('views/newEgreso.html')
})

ipcMain.on('nuevosgastos' , (event) =>{
    mainWindow.reload();
})

ipcMain.on('editarGasto' , (event , mensaje) =>{
    console.log(mensaje)
    addEgresoWindow=new BrowserWindow({
        width:500,
        height:500,
        parent:mainWindow,
        modal:true,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false,
        }
        
})
addEgresoWindow.loadFile('views/edicionGasto.html')
addEgresoWindow.on('ready-to-show',()=>{
    setTimeout(() => {
   addEgresoWindow.webContents.send('Idgastorecibido',mensaje)
    }, 100);
})
})
ipcMain.on('nuevoingreso' , (event) =>{
    mainWindow.reload();
})

ipcMain.on('editarIngresos' , (event , mensaje) =>{
    console.log(mensaje)
    addIngresoWindow=new BrowserWindow({
        width:500,
        height:500,
        parent:mainWindow,
        modal:true,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false,
        }
        
})
addIngresoWindow.loadFile('views/IngresoEdit.html')
addIngresoWindow.on('ready-to-show',()=>{
    setTimeout(() => {
        addIngresoWindow.webContents.send('Idingresorecibido',mensaje)
    }, 100);
})
})
ipcMain.on('editarNota' , (event , mensaje) =>{
    console.log(mensaje)
    addNotaWindow=new BrowserWindow({
        width:500,
        height:500,
        parent:mainWindow,
        modal:true,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false,
        }
        
})
addNotaWindow.loadFile('views/edicionNota.html')
addNotaWindow.on('ready-to-show',()=>{
    setTimeout(() => {
   addNotaWindow.webContents.send('Idrecibido',mensaje)
    }, 100);
})
})

ipcMain.on('editarCliente', (event,mensaje) => {
    console.log(mensaje)
    addClientWindow=new BrowserWindow({
        width:500,
        height:500,
        parent:mainWindow,
        modal:true,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false,
        }
    })

    addClientWindow.loadFile('views/windowEditClient.html')

    addClientWindow.on('ready-to-show',()=>{
        setTimeout(() => {
       addClientWindow.webContents.send('recibirId',mensaje)
        }, 100);
    })
})         


ipcMain.on('agregarEvento', (event) => {
    const addEventWindow=new BrowserWindow({
        width:500,
        height:500,
        parent:mainWindow,
        modal:true,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false,
        }
    })


    addEventWindow.loadFile('views/windowAddEvent.html')
    
})

ipcMain.on('editarEvento', (event,mensaje) => {
    const addEventWindow=new BrowserWindow({
        width:500,
        height:500,
        parent:mainWindow,
        modal:true,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false,
        }
    })

    
    addEventWindow.loadFile('views/windowAddEvent.html')
    console.log(mensaje);
    
    addEventWindow.on('ready-to-show',()=>{
        setTimeout(() => {
            addEventWindow.webContents.send('recibirId2',mensaje)
        }, 100);
    })
    
})


ipcMain.on('grafica' , (event , mensaje) =>{
    console.log(mensaje)
    mainWindow.reload();
    addIngresoWindow=new BrowserWindow({
        width:800,
        height:800,
        parent:mainWindow,
        modal:true,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false,
        }
    })

    addIngresoWindow.loadFile('views/grafica.html')

    addIngresoWindow.on('ready-to-show',()=>{
        setTimeout(() => {
       addIngresoWindow.webContents.send('recibirIding',mensaje)
        }, 100);
    })
})

ipcMain.on('grafica2' , (event , mensaje) =>{
    console.log(mensaje)
    mainWindow.reload();
    addIngresoWindow=new BrowserWindow({
        width:2000,
        height:800,
        parent:mainWindow,
        modal:true,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false,
        }
    })

    
    addIngresoWindow.loadFile('views/grafica2.html')

    addIngresoWindow.on('ready-to-show',()=>{
        setTimeout(() => {
       addIngresoWindow.webContents.send('recibirIdingresos',mensaje)
        }, 100);
    })
})