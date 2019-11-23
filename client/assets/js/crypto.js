const Crypto = require('crypto-js');

const key = Crypto.enc.Utf8.parse("ABD234F3d4456");
const iv = Crypto.enc.Utf8.parse("FFFE2231D");

function Encrypt(word){
    let srcs = Crypto.enc.Utf8.parse(word);
    let encrypted = Crypto.TripleDES.encrypt(srcs, key, { iv: iv, mode: Crypto.mode.CBC, padding: Crypto.pad.Pkcs7 });
    return encrypted.ciphertext.toString().toUpperCase();
}
function Decrypt(word) {
    let encryptedHexStr = Crypto.enc.Hex.parse(word);
    let srcs = Crypto.enc.Base64.stringify(encryptedHexStr);
    let decrypt = Crypto.TripleDES.decrypt(srcs, key, { iv: iv, mode: Crypto.mode.CBC, padding: Crypto.pad.Pkcs7 });
    let decryptedStr = decrypt.toString(Crypto.enc.Utf8);
    return decryptedStr.toString();
}

let v = Encrypt("哈哈哈哈哈");
let c = Decrypt(v);
console.log(v,c);
let md5 = Crypto.SHA256("哈哈哈哈");
console.log(md5);
