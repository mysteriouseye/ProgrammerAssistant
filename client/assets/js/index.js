const $$ = mdui.JQ;
function form_tans(e) {
    let resgit_form = "#regist-form";
    let login_form = "#login-form";
    if (e.id === "login_a") {
        $$(resgit_form).css("animation-name", "end");
        setTimeout(() => {
            $$(resgit_form).css("display", "none");
            $$(login_form).css("animation-name", "start");
            $$(login_form).css("display", "block");
        }, 270);
    } else if (e.id === "regist_a") {
        $$(login_form).css("animation-name", "end");
        setTimeout(() => {
            $$(login_form).css("display", "none");
            $$(resgit_form).css("animation-name", "start");
            $$(resgit_form).css("display", "block");
        }, 270);
    }
}
