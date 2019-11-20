const { ipcMain } = require('electron');

ipcMain.on('window-message', (event, arg) => {
    console.log(arg);
    switch (arg) {
        case "close":
            mainWindow.close();
            break;
        case "reduce":
            mainWindow.minimize();
    }
});