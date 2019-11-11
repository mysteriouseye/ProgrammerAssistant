const { app, BrowserWindow, ipcMain } = require('electron');
const client = require('electron-connect').client;
const path = require('path');
const glob = require('glob');
const debug = /--debug/.test(process.argv[2]);
require('electron-reload')(__dirname);

if(process.mas) app.setName('程序员助手 Dev 1.0')

let mainWindow = null;

function initialize() {
    makeSingleInstance();
    loadMains();
    const createWindow = () =>{
        const windowOptions = {
            width: 1080,
            minWidth: 680,
            height: 640,
            titile: app.getName(),
            frame: false,
            resizable:false,
            webPreferences: {
                nodeIntegration: true
            }
        }
        //!!!图标 保留
        // if(process.platform === 'linux') {
        //     windowOptions.icon = path.join(__dirname,'/assets/')
        // }
        mainWindow = new BrowserWindow(windowOptions);
        mainWindow.loadURL(path.join(`file://${__dirname}/src/index.html`));
        if(debug) {
            mainWindow.webContents.openDevTools();
            mainWindow.maximize();
            require('devtron').install();
        }
        mainWindow.on('closed', () => {
            mainWindow = null;
        });
        client.create(mainWindow);
    }

    app.on('ready', createWindow);
    app.on('window-all-closed', () => {
        if (process.platform !== 'darwin') {
            app.quit()
        }
    });

    app.on('activate', () => {
        if(mainWindow === null){
            createWindow();
        }
    })
    ipcMain.on('window-message', (event, arg) => {
        console.log(arg);
        switch(arg){
            case "close":
                mainWindow.close();
                break;
            case "reduce":
                mainWindow.minimize();
        }
    })
}
function makeSingleInstance() {
    if (process.mas) return;
    app.requestSingleInstanceLock();
    app.on('second-instance', () => {
        if(mainWindow) {
            if (mainWindow.isMinimized()) mainWindow.restore();
            mainWindow.focus();
        }
    });
}

function loadMains () {
    const files = glob.sync(path.join(__dirname, './src/main-process/**/*.js'));
    files.forEach((file) => { require(file) });
}
initialize();
