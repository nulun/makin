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

// $(document).ready(function(){
//   $.adaptiveBackground.run();
//   console.log('ab run');
// });

