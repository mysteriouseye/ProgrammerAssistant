function doRex() {
    let reg = document.getElementById('regular-ex').value;
    let regtext = document.getElementById('regular-text').value;
    let regresult = document.getElementById('regular-result');
    let regx = new RegExp(reg, 'g');
    console.log(regx);
    regresult.value = regtext.match(regx);
}
var qrcode = new QRCode(document.getElementById("qrcode"), {
    width: 200,
    height: 200
});

function makeCode() {
    var elText = document.getElementById("qrcode-text");

    qrcode.makeCode(elText.value);
}

makeCode();
