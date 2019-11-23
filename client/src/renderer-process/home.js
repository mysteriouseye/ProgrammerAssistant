const path = require('path')

function getNowTime() {
    let dates = new Date();
    let now = `${dates.getHours()} : ${dates.getMinutes() < 10 ? '0' + dates.getMinutes() : dates.getMinutes()} : ${dates.getSeconds() < 10 ? '0' + dates.getSeconds() : dates.getSeconds()}`;
    document.getElementById('home-div-line').children[1].innerHTML = `<i class="mdui-icon material-icons">access_time</i>  ` + now;
}
getNowTime();
setInterval(() => {
    getNowTime();
}, 300)

setTimeout(() => {
    console.log(10000);
    let test_btn = document.getElementById('test-voice')
    test_btn.addEventListener('click', () => {
        let notifition = new window.Notification("温馨提示",{
            title: '温馨提示',
            body: '您已经工作了2小时哦，建议活动活动哦！ ',
            icon: path.join(__dirname, '../../assets/img/hhh.jpg')
        });
        notifition.onclick = () => {
            console.log('点击');
        }
    });
}, 1000);
