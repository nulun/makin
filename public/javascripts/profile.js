if (localStorage.userAvatar) {
  $(".user-avatar").css('background-image', 'url("/images/user-avatars/user.png")');
};


$("#avatar-box").click(function() {
  $("#upload-avatar").click();
});


function readURL(input) {
  if (input.files && input.files[0]) {
    var reader = new FileReader();
    reader.onload = function(e) {
      $('#uploaded-image').attr('src', e.target.result);
      console.log($('#upload-avatar').val());
      //----------------------------------
      var data = new FormData(jQuery('#avatar-fm')[0]);
      console.log(data);
      $.ajax({
        type: 'POST',
        url: '/update/profile/avatar',
        data: data,
        cache: false,
        contentType: false,
        processData: false,
        success: function(data, textStatus, jqXHR) {
          console.log('avatar updated');
        }
      });
      //----------------------------------
    };

    reader.readAsDataURL(input.files[0]);
    console.log(input.files[0].size / 1024 / 1024 + "MB");
  };
};


$("#upload-avatar").change(function() {
  readURL(this);
});

//====================================================

$('#update-name').click(function() {
  $('#update-name').addClass('loading');
  $.ajax({
    type: 'PUT',
    url: '/update/profile/name',
    data: {
      name: $('#name-input').val()
    },
    success: function(data, textStatus, jqXHR) {
      // console.log(data);
      // console.log(textStatus);
      // console.log(jqXHR);
      //$("#login-btn").removeClass("loading black").addClass("green");
      $('#update-name').removeClass('loading');
    }
  });
});

var removeDisabled = function() {
  if ($('#name-input').val()) {
    $("#update-name").removeClass('disabled');
  } else {
    $("#update-name").addClass('disabled');
  };
};

$("#name-input").on("keypress keyup focus blur", function() {
  removeDisabled();
});

