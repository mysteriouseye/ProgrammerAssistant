function getNowTime(){
    let dates = new Date();
    let now = `${dates.getHours()} : ${dates.getMinutes() < 10 ? '0' + dates.getMinutes() : dates.getMinutes()} : ${dates.getSeconds() < 10 ? '0' + dates.getSeconds() : dates.getSeconds()}`;
    document.getElementById('home-div-line').children[1].innerHTML = `<i class="mdui-icon material-icons">access_time</i>  ` + now;
}
getNowTime();
setInterval(() => {
    getNowTime();
},300)
