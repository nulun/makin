//=============================================================================================

$(".clickLocalStorage").on("click", function() {
  window.localStorage.defaultForm = true; //点击过注册按钮就保存一个localStorage
});

var signedUser = window.localStorage.defaultForm; //把上一步保存的true值给signedUser

// window.onload = function() { //加载完页面
//   if (!signedUser) {
//     $(".d-slide").click(); //如果是未注册过的用户，就让js点击一下[注册]按钮
//   };
//   setTimeout(function() {
//     if ($("#login-username").val() != '') {
//       $("#login-btn-2").text("以" + $("#login-username").val() + "登陆");

//       $(".fast-login-box").removeClass('my-hidden').transition('fade in');
//     } else {
//       $("#login-fm").removeClass('my-hidden');
//     };
//   }, 150);

// };

$("#login-fm").removeClass('my-hidden');

$("#login-btn-2").click(function() {
  $("#login-btn").click();
});

$("#exit-fast-login").click(function() {
  $(".fast-login-box").removeClass('visible').hide();
  $("#login-fm").transition('slide down');
});
if (!localStorage.userAvatar) {
  $(".user-avatar").attr({ "width": 400, "height": 400 }).jdenticon(md5($("#login-username").val()));
};

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
      $("p.login-lead").text(randomFoodEmoji()).removeClass("error-color");
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
$("#login-username").on("focus blur keyup", function() {
  formValid();
});
$("#login-password").on("focus blur keyup", function() {
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
          $("p.register-lead").text("⛔").removeClass("success-color").addClass("error-color").transition('fade in');
          u.parent().addClass("error");
          $("#register-btn").addClass('disabled');
          isError = true;
          isChange = false;
        } else {
          $("p.register-lead").text("✅").removeClass("error-color").addClass("success-color").transition('fade in');
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
  } else {
    $("#register-btn").addClass('disabled');
  }
};
$("#register-username").on("keypress keyup focus blur", function() {
  removeDisabled();
});

$("#register-password").on("keypress keyup focus blur", function() {
  removeDisabled();
});

//打字随机切换Emoji====================================================================================

var randomFoodEmoji = function() {
  var foodEmojisObj = {
    "Grapes": "🍇",
    "Melon": "🍈",
    "Watermelon": "🍉",
    "Tangerine": "🍊",
    "Lemon": "🍋",
    "Banana": "🍌",
    "Pineapple": "🍍",
    "RedApple": "🍎",
    "GreenApple": "🍏",
    "Pear": "🍐",
    "Peach": "🍑",
    "Cherries": "🍒",
    "Strawberry": "🍓",
    "KiwiFruit": "🥝",
    "Tomato": "🍅",
    "Avocado": "🥑",
    "Eggplant": "🍆",
    "Potato": "🥔",
    "Carrot": "🥕",
    "EarofCorn": "🌽",
    "HotPepper": "🌶",
    "Cucumber": "🥒",
    "Mushroom": "🍄",
    "Peanuts": "🥜",
    "Chestnut": "🌰",
    "Bread": "🍞",
    "Croissant": "🥐",
    "BaguetteBread": "🥖",
    "Pancakes": "🥞",
    "CheeseWedge": "🧀",
    "MeatonBone": "🍖",
    "PoultryLeg": "🍗",
    "Bacon": "🥓",
    "Hamburger": "🍔",
    "FrenchFries": "🍟",
    "Pizza": "🍕",
    "HotDog": "🌭",
    "Taco": "🌮",
    "Burrito": "🌯",
    "Cooking": "🍳",
    "PotofFood": "🍲",
    "GreenSalad": "🥗",
    "Popcorn": "🍿",
    "BentoBox": "🍱",
    "RiceCracker": "🍘",
    "RiceBall": "🍙",
    "CookedRice": "🍚",
    "CurryRice": "🍛",
    "SteamingBowl": "🍜",
    "Spaghetti": "🍝",
    "RoastedSweetPotato": "🍠",
    "Oden": "🍢",
    "Sushi": "🍣",
    "FriedShrimp": "🍤",
    "FishCakeWithSwirl": "🍥",
    "Dango": "🍡",
    "SoftIceCream": "🍦",
    "ShavedIce": "🍧",
    "IceCream": "🍨",
    "Doughnut": "🍩",
    "Cookie": "🍪",
    "BirthdayCake": "🎂",
    "Shortcake": "🍰",
    "ChocolateBar": "🍫",
    "Candy": "🍬",
    "Lollipop": "🍭",
    "Custard": "🍮",
    "HoneyPot": "🍯",
    "BabyBottle": "🍼",
    "GlassofMilk": "🥛",
    "HotBeverage": "☕",
    "TeacupWithoutHandle": "🍵",
    "Sake": "🍶",
    "BottleWithPoppingCork": "🍾",
    "WineGlass": "🍷",
    "CocktailGlass": "🍸",
    "TropicalDrink": "🍹",
    "BeerMug": "🍺",
    "ClinkingBeerMugs": "🍻",
    "ClinkingGlasses": "🥂",
    "TumblerGlass": "🥃",
    "ForkandKnifeWithPlate": "🍽",
    "ForkandKnife": "🍴",
    "Spoon": "🥄"
  };
  const foodEmojisArray = Object.keys(foodEmojisObj).map(key => foodEmojisObj[key]);
  var randomResult = foodEmojisArray[Math.floor(Math.random() * 83)];
  //var randomnumber = Math.floor(Math.random() * (maximum - minimum + 1)) + minimum;
  //84 item in array
  return (randomResult);
};

$(".login-lead").text(randomFoodEmoji());
$(".register-lead").text(randomFoodEmoji());
$("#login-fm input").on("keyup", function() {
  $(".login-lead").text(randomFoodEmoji());
});
$("#register-fm input").on("keyup", function() {
  $(".register-lead").text(randomFoodEmoji());
});

//========================================================================================

