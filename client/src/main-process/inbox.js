const { ipcMain } = require('electron');
const Crypto = require('crypto-js');

let key = Crypto.enc.Hex.parse("ABD234F34456");
let iv = Crypto.enc.Hex.parse("FFFE2231DEED2312231");
function Encrypt(word, method){
    let srcs = Crypto.enc.Utf8.parse(word);
    let encrypted = Crypto.AES.encrypt(srcs, key, { iv: iv, mode: Crypto.mode.CFB, padding: Crypto.pad.AnsiX923 });
    return encrypted.ciphertext.toString().toUpperCase();
}
function Decrypt(word, method) {
    let encryptedHexStr = Crypto.enc.Hex.parse(word);
    let srcs = Crypto.enc.Base64.stringify(encryptedHexStr);
    let decrypt = Crypto.AES.decrypt(srcs, key, { iv: iv, mode: Crypto.mode.CFB, padding: Crypto.pad.AnsiX923 });
    let decryptedStr = decrypt.toString(Crypto.enc.Utf8);
    return decryptedStr.toString();
}
ipcMain.on("crypto-message", (event, status) => {
    typeof(key) != 'undefined' ? key = Crypto.enc.Hex.parse(status.key) : console.log();
    typeof(iv) != 'undefined' ? iv = Crypto.enc.Hex.parse(status.iv) : console.log();
    console.log(status.key);
    console.log(status.encrypt);
    if(typeof(status.encrypt) != 'undefined'){
        let ec = Encrypt(status.encrypt);
        event.reply("crypto-message-reply", { encrypt: ec });
    }else if(typeof(status.decrypt) != 'undefined'){
        let dc = Decrypt(status.decrypt);
        console.log(dc);
        event.reply("crypto-message-reply", { decrypt: dc });
    }
});
