//=============================================================================================

$(".h-tab a").on("click", function() {
    $(".h-tab a").removeClass("active"); //解决tab 按钮active问题
    $(this).addClass("active");
});

//=============================================================================================

$(".click-2").on("click", function() { //点击[切换到盒子2]按钮添加删除动画class
    $(".slide-box-2").removeClass("my-hidden slide-out-right").addClass("slide-in-right");
    $(".slide-box-1").removeClass("slide-in-left").addClass("slide-out-left");
    document.title = '注册';
});


$(".click-1").on("click", function() { //点击[切换到盒子1]按钮添加删除动画class
    $(".slide-box-2").removeClass("slide-in-right").addClass("slide-out-right");
    $(".slide-box-1").removeClass("slide-out-left").addClass("slide-in-left");
    document.title = '登陆';
});

//=============================================================================================

$(".clickLocalStorage").on("click", function() {
    window.localStorage.defaultForm = true; //点击过注册按钮就保存一个localStorage
});

var signedUser = window.localStorage.defaultForm; //把上一步保存的true值给signedUser

window.onload = function() { //加载完页面
    if (!signedUser) {
        $(".d-slide").click(); //如果是未注册过的用户，就让js点击一下[注册]按钮
    };
    setTimeout(function() {
        console.log("time");
        console.log($("#login-username").val());
        if ($("#login-username").val() != '') {
            $("#login-btn-2").text("以" + $("#login-username").val() + "登陆");
            
            $(".fast-login-box").removeClass('my-hidden').transition('fade in');
        }else{
            $("#login-fm").removeClass('my-hidden');
        };
    }, 100);

};

$("#login-btn-2").click(function(){
    $("#login-btn").click();
});

$("#exit-fast-login").click(function(){
    $(".fast-login-box").removeClass('visible').hide();
    $("#login-fm").transition('slide down');
});
if (!localStorage.userAvatar) {
    $(".user-avatar").css('background-image', 'url("/images/user-avatars/user.png")');
};

//=============================================================================================

var vueApp1 = new Vue({
    el: '#v-wrap',
    data: {
        message: '料理标题'
    }
});

//=============================================================================================

var login = function() {
    $("#login-btn").addClass('loading');
    $("#login-btn-2").addClass('loading');
    $.ajax({
        type: "POST",
        url: '/login',
        data: $("#login-fm").serialize(), //批量提交form内的数据
        success: function(data, textStatus, jqXHR) {
            // console.log(data);
            // console.log(textStatus);
            // console.log(jqXHR);
            //$("#login-btn").removeClass("loading black").addClass("green");
            $("#particles-js").transition('fade');
            $(".d-box").transition('scale');
            location.reload();
        },
        error: function(textStatus, errorThrown) {
            //console.log(textStatus.status);
            //console.log(errorThrown);
            $("#login-btn").removeClass("loading"); //删除按钮的加载动画
            $("#login-btn-2").removeClass('loading');
            $("input").transition('shake'); //出现错误摇动输入框动画
            $("p.login-lead").text("用户名或密码错误").addClass("error-color").transition('fade in');
        }
    });
};

//============================================================================================

var hasTried = false;
var formValid = function() {
    var u = $("#login-username").val(),
        p = $("#login-password").val();
    if (hasTried) {
        if (u && p) {
            $("p.login-lead").text("🍜").removeClass("error-color");
            $("#login-password").parent().removeClass('error');
            $("#login-username").parent().removeClass('error');
        } else if (u && !p) {
            $("p.login-lead").text("请输入密码").addClass("error-color");
            $("#login-password").parent().addClass('error');
            $("#login-username").parent().removeClass('error');
        } else if (!u && p) {
            $("p.login-lead").text("请输入用户名").addClass("error-color");
            $("#login-username").parent().addClass('error');
            $("#login-password").parent().removeClass('error');
        } else {
            $("p.login-lead").text("请输入用户名和密码").addClass("error-color");
            $("#login-username").parent().addClass('error');
            $("#login-password").parent().addClass('error');
        };
    }
};
$("#login-username").on("focus blur keypress keyup", function() {
    formValid();
});
$("#login-password").on("focus blur keypress keyup", function() {
    formValid();
});
$("#login-btn").click(function(e) { //点击登陆按钮
    e.preventDefault(); //禁止默认的提交表单功能（防止address bar出现cook-share.com?username=......）
    hasTried = true;
    if ($("#login-username").val() && $("#login-password").val()) {
        login();
    } else {
        formValid();
    };
});

//=============================================================================================

console.log("  ____ ___   ___  _  ______  _   _    _    ____  _____ ");
console.log(" / ___/ _ \\ / _ \\| |/ / ___|| | | |  / \\  |  _ \\| ____|");
console.log("| |  | | | | | | | ' /\\___ \\| |_| | / _ \\ | |_) |  _|  ");
console.log("| |__| |_| | |_| | . \\ ___) |  _  |/ ___ \\|  _ <| |___ ");
console.log(" \\____\\___/ \\___/|_|\\_\\____/|_| |_/_/   \\_\\_| \\_\\_____|");

//=============================================================================================

$("#body-box #particles-js").transition('fade in'); //逐渐显现
$(".d-box").transition('scale in');
$(".exit").click(function() {
    $("#body-box").transition('fade'); //逐渐隐去
})

//用户名ajax检验=================================================================================

var isError = false;
var isChange = true;
var verify = function() {
    var u = $("#register-username"),
        p = $("#register-password");
    if (u.val() && isChange) {
        $.ajax({
            type: "POST",
            url: "/verify",
            data: {
                username: u.val()
            },
            success: function(data, textStatus, jqXHR) {
                if (data) {
                    //console.log(data);  --> true
                    //console.log("用户名已存在");
                    u.transition('jiggle');
                    $("p.register-lead").text("此名称已被注册").removeClass("success-color").addClass("error-color").transition('fade in');
                    u.parent().addClass("error");
                    $("#register-btn").addClass('disabled');
                    isError = true;
                    isChange = false;
                } else {
                    $("p.register-lead").text("此名称可用").removeClass("error-color").addClass("success-color").transition('fade in');
                    u.parent().removeClass('error');
                    isError = false;
                    isChange = false;
                    if ($("#register-username").val() && $("#register-password").val()) {
                        $("#register-btn").removeClass('disabled');
                    };
                };
            },
            error: function(textStatus, errorThrown) {
                console.log(errorThrown);
            }

        });
    };
};

//用户输入完成后触发verify()================================================================================

var typingTimer; //timer identifier
var doneTypingInterval = 500; //time in ms (5 seconds)

$('#register-username').keyup(function() { //on keyup, start the countdown
    isChange = true;
    clearTimeout(typingTimer);
    if ($('#register-username').val()) {
        typingTimer = setTimeout(verify, doneTypingInterval);
    }
});


$(".click-2").click(verify);

//注册按钮可否点击=================================================================================

var removeDisabled = function() {
    if ($("#register-username").val() && $("#register-password").val()) {
        if (!isError) {
            $("#register-btn").removeClass('disabled');
        }; 
    }else{
        $("#register-btn").addClass('disabled');
    }
};
$("#register-username").on("keypress keyup focus blur", function() {
    removeDisabled();
});

$("#register-password").on("keypress keyup focus blur", function() {
    removeDisabled();
});

//=============================================================================================

