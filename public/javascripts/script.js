$(".secondary a").on("click", function() {
    $(".secondary a").removeClass("active");
    $(this).addClass("active");
});



$(".click-login").on("click", function() {
    $(".login-container").removeClass("hidden");
    $(".login-container").removeClass("slide-out-right");
    $(".signup-container").removeClass("slide-in-left");
    $(".signup-container").addClass("slide-out-left");
    $(".login-container").addClass("slide-in-right");
});


$(".click-signup").on("click", function() {
	 $(".login-container").removeClass("slide-in-right");
    $(".signup-container").removeClass("slide-out-left");
    $(".login-container").addClass("slide-out-right");
    $(".signup-container").addClass("slide-in-left");
});





