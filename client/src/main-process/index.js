const { ipcMain } = require('electron');
const jsonfile = require('jsonfile');
const config_name = `${__dirname}/../../json/user_config.json`;
jsonfile.readFile(config_name, (err, data) => {
    if(err) throw err;
    ipcMain.on('request-back-image', (event, status) => {
        event.reply('response-back-image',data.backimage)
    });
});

