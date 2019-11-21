const { ipcMain } = require('electron');
const jsonfile = require('jsonfile');
const config_name = `${__dirname}/../json/window.json`;
jsonfile.readFile(config_name, (err, data) => {
    if(err) throw err;
    ipcMain.on('back-image', (event) => {

    })
})
ipcMain.on('online-status-changed', (event, status) => {
    console.log(status);
})
