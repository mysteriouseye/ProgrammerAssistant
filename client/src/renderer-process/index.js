const { ipcRenderer } = require('electron');
const links = document.querySelectorAll('link[rel="import"]');

ipcRenderer.send("request-back-image", '1');
ipcRenderer.on('response-back-image', (event, arg) => {
    document.getElementById('back-image').style.background = `url('../assets/img/${arg}') fixed`;
});
function rendererHtml() {
    let left_menu = ``
    const userIds = {
        'home': '首页',
        'inbox': '工具箱',
        'account_circle': '用户中心',
        'fiber_new': '(FLAG)IT新闻',
        'settings': '设置',
    }
    let header = `
        <nav class="header-line mdui-appbar-fixed">
        <span class="mdui-typo">程序员助手</span>
        </nav>
        <nav class="close-line">
        <span id="close_window" class="mdui-btn mdui-btn-icon mdui-ripple mdui-ripple-white close_btn"><i class="mdui-icon material-icons">close</i></span>
        <span id="reduce_window" class="mdui-btn mdui-btn-icon mdui-ripple mdui-ripple-white reduce_btn"><i class="mdui-icon material-icons">keyboard_arrow_down</i></span>
        </nav>`;
    let left = `
        <div class="mdui-drawer mdui-drawer-open mdui-shadow-2 left-drawer" id="left-drawer">
            <div class="head-icon mdui-shadow-17" style="margin-top:100px;">
                <div class="box">
                    <img src="../assets/img/user_black.png">
                </div>
            </div>
            <div class="user-info">
                <span id="user-info-username mdui-btn mdui-btn-icon mdui-ripple mdui-ripple-white"
                    mdui-dialog="{target: '#login-register-dialog'}">登录/注册</span>
            </div>
        <div class="list-menu mdui-list">
        `;

    for (let [key, value] of Object.entries(userIds)) {
        left_menu += `
            <a class="mdui-list-item mdui-ripple select-list" id="${key}">
                <i class="mdui-list-item-icon mdui-icon material-icons">${key}</i>
                <div class="mdui-list-item-content">${value}</div>
            </a>`;
    }
    left += left_menu + '</div></div>';

    let forms = `
        <div class="user-form mdui-dialog" style="width: 400px;" id="login-register-dialog">
            <div id="login-form" class="login-regist-form">
                <div class="head-icon mdui-shadow-17">
                    <div class="box">
                        <img src="../assets/img/user_black.png">
                    </div>
                </div>
                <div class="mdui-textfield mdui-textfield-floating-label">
                    <i class="mdui-icon material-icons">account_circle</i>
                    <label class="mdui-textfield-label">用户名/邮箱</label>
                    <input class="mdui-textfield-input" type="text" required />
                </div>
                <div class="mdui-textfield mdui-textfield-floating-label">
                    <i class="mdui-icon material-icons">vpn_key</i>
                    <label class="mdui-textfield-label">密码</label>
                    <input class="mdui-textfield-input" type="password" pattern="^.*(?=.{16,})(?=.*[a-z])(?=.*[A-Z]).*$"
                        required />
                </div>
                <div class="mdui-textfield mdui-textfield-floating-label">
                    <i class="mdui-icon material-icons">code</i>
                    <label class="mdui-textfield-label">验证码</label>
                    <input class="mdui-textfield-input" style="width:100px;" type="text" required />
                    <img style="background: white;float:right;margin-top:-40px;" width="100px" height="40px">
                </div>
                <center><button class="mdui-btn mdui-btn-raised mdui-ripple mdui-color-blue mdui-text-color-white"
                        style="width: 200px;margin: 0 auto;margin-top:20px">登录</button></center>
                <div style="margin-top:20px;width:100%;text-align: center;">
                    <span>没有账号？立即<a id="regist_a" class="mdui-text-color-blue" style="cursor:pointer;"
                            onclick="form_tans(this)">注册</a>一个</span>
                </div>
            </div>
            <div id="regist-form" class="login-regist-form" style="display:none;">
                <div class="">
                    <span class="mdui-text-color-purple">注册一个账号，获取更多精彩</span>
                </div>
                <div class="mdui-textfield mdui-textfield-floating-label">
                    <i class="mdui-icon material-icons">account_circle</i>
                    <label class="mdui-textfield-label">用户名</label>
                    <input class="mdui-textfield-input" type="text" required />
                </div>
                <div class="mdui-textfield mdui-textfield-floating-label">
                    <i class="mdui-icon material-icons">email</i>
                    <label class="mdui-textfield-label">邮箱</label>
                    <input class="mdui-textfield-input" type="email" required />
                </div>
                <div class="mdui-textfield mdui-textfield-floating-label">
                    <i class="mdui-icon material-icons">vpn_key</i>
                    <label class="mdui-textfield-label">密码</label>
                    <input class="mdui-textfield-input" type="password" pattern="^.*(?=.{16,})(?=.*[a-z])(?=.*[A-Z]).*$"
                        required />
                </div>
                <div class="mdui-textfield mdui-textfield-floating-label">
                    <i class="mdui-icon material-icons">code</i>
                    <label class="mdui-textfield-label">验证码</label>
                    <input class="mdui-textfield-input" style="width:100px;" type="text" required />
                    <button class="mdui-btn mdui-btn-raised mdui-ripple mdui-color-purple mdui-text-color-white"
                        style="float:right;margin-top:-40px;" width="100px" height="40px">获取验证码</button>
                </div>
                <center><button class="mdui-btn mdui-btn-raised mdui-ripple mdui-color-purple mdui-text-color-white"
                        style="width: 200px;margin: 0 auto;margin-top:20px">注册</button></center>
                <div style="margin-top:20px;width:100%;text-align: center;">
                    <span>已经有了账号？立即<a id="login_a" class="mdui-text-color-purple" style="cursor:pointer;"
                            onclick="form_tans(this)">登录</a></span>
                </div>
            </div>
        </div>
    `;
    document.body.innerHTML += header + left + forms;
}
function renderContent() {
    Array.prototype.forEach.call(links, (link) => {
        console.log(link);
        let template = link.import.querySelector('.task-template');
        let clone = document.importNode(template.content, true);
        document.querySelector('.content').appendChild(clone);
    });
}
rendererHtml();
renderContent();

const as = document.querySelectorAll('.mdui-list-item.mdui-ripple');
Array.prototype.forEach.call(as, (a) => {
    a.addEventListener('click', (event) => {
            console.log(event);
            sectionAction(a);

    });
});
function sectionAction(event){
    hidenSectionsAndButtons();
    event.classList.add('select-list');
    const sectionVal = `${event.id}-section`;
    document.getElementById(sectionVal).classList.add('is-shown');
}
function hidenSectionsAndButtons(){
    const sections = document.querySelectorAll('.section.is-shown');
    Array.prototype.forEach.call(sections, (sections) => {
        sections.classList.remove('is-shown');
    });

    const a = document.querySelectorAll('.select-list');
    Array.prototype.forEach.call(a, (a) => {
        a.classList.remove('select-list');
    })
}
const close_btn = document.getElementById('close_window');
const reduce_btn = document.getElementById('reduce_window');
close_btn.addEventListener('click', (event) => {
    ipcRenderer.send('window-message', 'close');
});
reduce_btn.addEventListener('click', (event) => {
    ipcRenderer.send('window-message', 'reduce');
});



