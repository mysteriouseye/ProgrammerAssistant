const { app,BrowserWindow } = require('electron');
const jsonfile = require('jsonfile');
const client = require('electron-connect').client;
const path = require('path');
const glob = require('glob');
const debug = /--debug/.test(process.argv[2]);
const config_name = `${__dirname}\\json\\window.json`
require('electron-reload')(__dirname);

let mainWindow = null;

function initialize() {
    makeSingleInstance();
    loadMains();

    const createWindow = () => {
        jsonfile.readFile(config_name, (err, data) => {
            if (err) throw err;
            const windowOptions = {
                width: data.width,
                height: data.height,
                minWidth: data.minWidth,
                title: data.title,
                frame: data.frame,
                resizable: data.resizable,
                webPreferences: {
                    nodeIntegration: data.nodeIntegration
                }
            }
            //!!!图标 保留
            // if(process.platform === 'linux') {
            //     windowOptions.icon = path.join(__dirname,'/assets/')
            // }
            mainWindow = new BrowserWindow(windowOptions);
            mainWindow.loadURL(path.join(`file://${__dirname}/src/index.html`));
            if (debug) {
                mainWindow.webContents.openDevTools();
                mainWindow.maximize();
                require('devtron').install();
            }
            mainWindow.on('closed', () => {
                mainWindow = null;
            });
            client.create(mainWindow);
        });
    }

    app.on('ready', createWindow);
    app.on('window-all-closed', () => {
        if (process.platform !== 'darwin') {
            app.quit()
        }
    });

    app.on('activate', () => {
        if (mainWindow === null) {
            createWindow();
        }
    });
}

function makeSingleInstance() {
    if (process.mas) return;
    app.requestSingleInstanceLock();
    app.on('second-instance', () => {
        if (mainWindow) {
            if (mainWindow.isMinimized()) mainWindow.restore();
            mainWindow.focus();
        }
    });
}

function loadMains() {
    const files = glob.sync(path.join(__dirname, './src/main-process/**/*.js'));
    files.forEach((file) => {
        require(file)
    });
}
initialize();