const { ipcRenderer } = require('electron')


function rendererHtml(){
    let header = `
        <nav class="header-line mdui-appbar-fixed">
        <span class="mdui-typo">程序员助手</span>
        </nav>
        <nav class="close-line">
        <span id="close_window" class="mdui-btn mdui-btn-icon mdui-ripple mdui-ripple-white close_btn"><i class="mdui-icon material-icons">close</i></span>
        <span id="reduce_window" class="mdui-btn mdui-btn-icon mdui-ripple mdui-ripple-white reduce_btn"><i class="mdui-icon material-icons">keyboard_arrow_down</i></span>
        </nav>`;
    document.body.innerHTML += header;
}

rendererHtml();
const close_btn = document.getElementById('close_window');
const reduce_btn = document.getElementById('reduce_window');
close_btn.addEventListener('click', (event) => {
    ipcRenderer.send('window-message', 'close');
});
reduce_btn.addEventListener('click', (event) => {
    ipcRenderer.send('window-message', 'reduce');
});
