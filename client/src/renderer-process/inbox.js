const {
    ipcRenderer
} = require('electron');

const encrypt_btn = document.getElementById('encrypt-button');
const decrypt_btn = document.getElementById('decrypt-button');
console.log(encrypt_btn);
encrypt_btn.addEventListener('click', (event) => {
    cryptomethod(encrypt_btn);
});
decrypt_btn.addEventListener('click', (event) => {
    cryptomethod(decrypt_btn);
});

function cryptomethod(e) {
    setTimeout(() => {
        console.log(e.innerHTML);
        e.innerHTML == "加密" ? ipcRenderer.send('crypto-message', { encrypt:`${document.getElementById('public-text').value}`, key: document.getElementById('keys').value, iv: document.getElementById('ivs').value }) : ipcRenderer.send('crypto-message', { decrypt: `${document.getElementById('crypto-text').value}`, key: document.getElementById('keys').value, iv: document.getElementById('ivs').value });
    },1000);
}
ipcRenderer.on('crypto-message-reply', (event, args) => {
    console.log(args.decrypt);
    if(typeof(args.encrypt) != 'undefined'){
        console.log(args.encrypt);
        document.getElementById('crypto-text').value = args.encrypt;
    }else if(typeof(args.decrypt) != 'undefined'){
        document.getElementById('public-text').value = args.decrypt;
    }
})
function rendererRex() {
    let list_dom = document.getElementById('regular-select');

    let RegList = {
        "无": "",
        "手机号码": "1[3-9]\\d{9}",
        "邮箱": "\\w+([-+.]\\w+)*@\\w+([-.]\\w+)*\\.\\w+([-.]\\w+)*",
        "URL地址": "[a-zA-z]+://[^\\s]*",
        "HTML标签": "<(\\S*?)[^>]*>.*?</\\1>|<.*?/>",
        "身份证号": "\d{17}[0-9Xx]|\d{15}",
        "日期": "\\d{4}-\\d{1,2}-\\d{1,2}/",
        "中文字符": `[\\u4e00-\\u9fa5]+`,
        "英文和数字": "^[A-Za-z0-9]+",
    }
    for (let [key, value] of Object.entries(RegList)) {
        let option = document.createElement("option");
        option.innerHTML = key;
        list_dom.appendChild(option);
    }
    list_dom.addEventListener('closed.mdui.select', (event) => {
        let list_select = document.querySelector('.mdui-select-selected');
        for (let [key, value] of Object.entries(RegList)) {
            if (key === list_select.innerHTML) {
                document.getElementById('regular-ex').value = value;
            }
        }
    });
}
rendererRex();


// ipcRenderer.send();
// ipcRenderer.on('crypto-message-reply', (event) => {

// })
