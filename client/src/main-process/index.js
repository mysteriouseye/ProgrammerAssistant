const { ipcMain } = require('electron');
const jsonfile = require('jsonfile');

jsonfile.readFile()
ipcMain.on('online-status-changed', (event, status) => {
    console.log(status);
})
