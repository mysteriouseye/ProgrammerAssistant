const { ipcMain } = require('electron');
ipcMain.on('online-status-changed', (event, status) => {
    console.log(status);
})
