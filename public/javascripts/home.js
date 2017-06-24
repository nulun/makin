//=============================================================================================

var vueApp1 = new Vue({
  el: '#v-wrap',
  data: {
    message: '料理标题'
  }
});

//===================================================================

$("#recipe-image").click(function() {
  $("#upload-recipe-image").click();
});


function readURL(input) {
  if (input.files && input.files[0]) {
    var reader = new FileReader();
    reader.onload = function(e) {
      $('#uploaded-image').attr('src', e.target.result);
    };

    reader.readAsDataURL(input.files[0]);
  };
};


$("#upload-recipe-image").change(function() {
  readURL(this);
  $("i.photo").addClass('my-hidden');
});

//=======================================================

(function() {
  var pre = window.document.getElementsByTagName('pre'),
    pl = pre.length;
  for (var i = 0; i < pl; i++) {
    pre[i].innerHTML = '<span class="line-number"></span>' + pre[i].innerHTML /* + '<span class="cl"></span>'*/ ;
    var num = pre[i].innerHTML.split(/\n/).length + 1;
    for (var j = 1; j < num; j++) {
      var line_num = pre[i].getElementsByTagName('span')[0];
      line_num.innerHTML += '<span>' + (j) + '</span>';
    }
  }
})();

//===============================================

//$('.newpost').click(function() {
//$('.newpost-mask').removeClass('my-hidden').transition('fade in');
//$(this).addClass('stay');
//$('.newpost-box').removeClass('my-hidden').transition('fade up in');
//$('textarea').focus();
//});

// $('.newpost-mask').click(function() {
//   $('.newpost-mask').transition('fade');
//   $('.newpost').removeClass('stay');
// });




//======================================

$('.heart').on('click', function() {
  var id = $(this).parent().parent().attr('name');
  $.ajax({
    type: 'PUT',
    url: '/like',
    data: { '_id': id }
  })
});

//======================================

var postedTime = function() {
  var result;
  var t = new Date();
  var seconds = t.getSeconds();
  var minutes = t.getMinutes();
  var hours = t.getHours();
  var days = t.getDay();
  var months = t.getMonth() + 1;
  var years = t.getFullYear();

  $('.time p').each(function(index) {
    var s = $(this).text().split(' ');
    var x = s[4].split(':');
    var mo;
    switch (s[1]) {
      case 'January':
        mo = 1;
        break;
      case 'February':
        mo = 2;
        break;
      case 'March':
        mo = 3;
        break;
      case 'April':
        mo = 4;
        break;
      case 'May':
        mo = 5;
        break;
      case 'June':
        mo = 6;
        break;
      case 'July':
        mo = 7;
        break;
      case 'August':
        mo = 8;
        break;
      case 'September':
        mo = 9;
        break;
      case 'October':
        mo = 10;
        break;
      case 'November':
        mo = 11;
        break;
      case 'December':
        mo = 12;
        break;
    };
    if (years - s[3] == 1) {
      result = '去年' + mo + '月' + s[2] + '日'; //去年3月5日
    } else if (years - s[3] > 1) {
      result = s[3] + '年' + mo + '月' + s[2] + '日'; // 2016年3月5日
    } else if (years - s[3] == 0) {
      if (months == mo) {
        let d = s[2].split('');
        if (d[0] === '0') {
          d.splice(0, 1);
        }
        let x = d.join('');
        result = mo + '月' + x + '日'; //4月5日
      } else {
        if (days - s[2] == 1) {
          result = '昨天' + ' ' + x[0] + ':' + x[1];
        } else if (days - s[2] == 0) {
          if (hours - x[0] !== 0) {
            result = hours - x[0] + '小时前';
          } else {
            if (minutes - x[1] !== 0) {
              result = minutes - x[1] + '分钟前';
            } else {
              result = seconds - x[2] + '秒前';
            }
          }
        } else {
          result = years + '年' + months + '月' + s[2] + '日';
        }
      }
    };
    $(this).text(result);
  });
};
postedTime();

//=================================

window.onload = function() {
  $('.name a').each(function(index) {
    let str = $(this).text();
    $(this).parent().prev().attr({ "width": 200, "height": 200 }).jdenticon(md5(str));
  })
  var nm = $('#h-avatar').attr('name');
  $('.h-avatar').attr({ "width": 100, "height": 100 }).jdenticon(md5(nm));

  $('code').each(function() {
    let className = $(this).attr('class');
    let lang = className.split(' ')[1];
    let l_name = 'l-' + lang;
    $(this).parent().parent().prev().children('.lang').addClass(l_name);
    $(this).parent().parent().prev().children('.lang').text(lang);
  })

  $('.heart').each(function() {
    if ($(this).hasClass('liked')) {
      let lang = $(this).parent().prev().prev().find('.lang').text();
      let h_name = 'h-' + lang;
      $(this).addClass(h_name);
    }
  })
}

//========================================

$('.heart').click(function() {
  let text = $(this).next().text();
  if (text.constructor === String) {
    let list = [];
    if (text) {
      list = text.replace(/\s+/g, '').split(',');
    }
    let name = $('#h-avatar').attr('name');
    let i = list.indexOf(name);
    if (i === -1) {
      list.push(name);
    } else {
      list.splice(i, 1);
    }
    let result = list.join(', ');
    $(this).next().text(result);
  }

  let lang = $(this).parent().prev().prev().find('.lang').text();
  let h_name = 'h-' + lang;
  $(this).toggleClass(h_name).transition('jiggle');
})

//============================================

$('.postcode').click(function() {
  $.ajax({
    type: 'POST',
    url: '/postcode',
    data: {
      code: $('.newpost textarea').val()
    },
    success: function() {
      $('.small-mask').transition('slide down');
      location.reload();
    }
  })
})

//==================================

var isshow = false;
$('.newcode').click(function() {
  if (isshow) {
    $(this).removeClass('hidecode');
    $('.small-mask').removeClass('my-hidden').transition('slide down');
    $('body').css('overflow', 'scroll');
    $('body').css('background', '#f3f5f6');
    $('.menu-box').css('transform', 'translateX(0px)');
    $('.subm-box').removeClass('my-hidden').transition('slide down');
    isshow = false;
  } else {
    $(this).addClass('hidecode');
    $('.small-mask').removeClass('my-hidden').transition('slide down in');
    $('body').css('overflow', 'hidden');
    $('body').css('background', '#fff');
    $('.menu-box').css('transform', 'translateX(-4px)');
    $('.subm-box').removeClass('my-hidden').transition('slide down in');
    isshow = true;
  }
})

//=============================================

$('.newpost textarea').on('keyup', function() {
  let text = $(this).val();
  let lines = text.split('\n');
  let lineNum = lines.length + 1;
  for (let i = 1; i < lineNum; i++) {
    $('.new-linenum').innerHTML += '<span>' + (i) + '</span>';
  }
})

//=============================================

$('.h-box').mouseenter(function() {
  $(this).children('.foot').children('i.trash').removeClass('my-hidden').transition('fade in');
})

$('.h-box').mouseleave(function() {
  $(this).children('.foot').children('i.trash').removeClass('my-hidden').transition('fade');
})

$('.foot i.trash').click(function() {
  $(this).prev().addClass('trash-box-scale');
  let id = $(this).parent().parent().attr('name');
  $(this).parent().parent().append("<div name = " + id + " class='delete-post'><i class='trash icon big-trash'/></div><div class='cancel-del'><i class='remove icon big-remove'/></div>");
  $('div.h-box .foot .trash-box').not($(this).prev()).removeClass('trash-box-scale');
  $('.cancel-del').not($(this).parent().parent().children('.cancel-del')).transition('fade out');
  $('.delete-post').not($(this).parent().parent().children('.delete-post')).transition('fade out').remove();
})

$('div.h-box').on('click', '.cancel-del', function() {
  $('.trash-box').removeClass('trash-box-scale');
  $('.cancel-del').transition('fade out');
  $('.delete-post').transition('fade out').remove();
})

$('div.h-box').on('click', '.delete-post', function() {
  let id = $('.delete-post').parent().attr('name');
  $.ajax({
    type: 'DELETE',
    url: '/delete/post',
    data: {
      '_id': id
    },
    success: function(data, textStatus, jqXHR) {
      if (data) {
        $('.delete-post').parent().transition('vertical flip out');
      }
    }
  })
})

//===========================================

var content = [
  { title: 'Andorra' },
  { title: 'United Arab Emirates' },
  { title: 'Afghanistan' },
  { title: 'Antigua' },
  { title: 'Anguilla' },
  { title: 'Albania' },
  { title: 'Armenia' },
  { title: 'Netherlands Antilles' },
  { title: 'Angola' },
  { title: 'Argentina' },
  { title: 'American Samoa' },
  { title: 'Austria' },
  { title: 'Australia' },
  { title: 'Aruba' },
  { title: 'Aland Islands' },
  { title: 'Azerbaijan' },
  { title: 'Bosnia' },
  { title: 'Barbados' },
  { title: 'Bangladesh' },
  { title: 'Belgium' },
  { title: 'Burkina Faso' },
  { title: 'Bulgaria' },
  { title: 'Bahrain' },
  { title: 'Burundi' }
  // etc
];

$('.ui.search')
  .search({
    source: content
  });

//======================================

$(".nav-search").click(function() {
  $("#nav-search").addClass('show-nav-search');
  console.log('123');
  $("#nav-search").focus();
})

$("#nav-search").blur(function() {
  $("#nav-search").removeClass('show-nav-search');
})