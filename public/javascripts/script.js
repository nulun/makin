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

//============================================================================================

console.log("  ____ ___   ___  _  ______  _   _    _    ____  _____ ");
console.log(" / ___/ _ \\ / _ \\| |/ / ___|| | | |  / \\  |  _ \\| ____|");
console.log("| |  | | | | | | | ' /\\___ \\| |_| | / _ \\ | |_) |  _|  ");
console.log("| |__| |_| | |_| | . \\ ___) |  _  |/ ___ \\|  _ <| |___ ");
console.log(" \\____\\___/ \\___/|_|\\_\\____/|_| |_/_/   \\_\\_| \\_\\_____|");

//=============================================================================================

