$(".secondary a").on("click", function() {
    $(".secondary a").removeClass("active");
    $(this).addClass("active");
});


//切换效果
$(".click-secondary").on("click", function() {
    $(".slide-container-secondary").removeClass("my-hidden");
    $(".slide-container-secondary").removeClass("slide-out-right");
    $(".slide-container-primary").removeClass("slide-in-left");
    $(".slide-container-primary").addClass("slide-out-left");
    $(".slide-container-secondary").addClass("slide-in-right");
});


$(".click-primary").on("click", function() {
    $(".slide-container-secondary").removeClass("slide-in-right");
    $(".slide-container-primary").removeClass("slide-out-left");
    $(".slide-container-secondary").addClass("slide-out-right");
    $(".slide-container-primary").addClass("slide-in-left");
});

//注册过的用户默认打开登陆
$(".clickLocalStorage").on("click", function() {
    window.localStorage.defaultForm = true;
});

window.onload = function(){
    if (window.localStorage.defaultForm) {
        $(".click-secondary").click();
    };
    console.log("  ____ ___   ___  _  ______  _   _    _    ____  _____ ");
    console.log(" / ___/ _ \\ / _ \\| |/ / ___|| | | |  / \\  |  _ \\| ____|");
    console.log("| |  | | | | | | | ' /\\___ \\| |_| | / _ \\ | |_) |  _|  ");
    console.log("| |__| |_| | |_| | . \\ ___) |  _  |/ ___ \\|  _ <| |___ ");
    console.log(" \\____\\___/ \\___/|_|\\_\\____/|_| |_/_/   \\_\\_| \\_\\_____|");
    
};

