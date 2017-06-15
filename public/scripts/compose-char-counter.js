$( document ).ready(function() {
  $('.text-for-tweets').on( "keyup", function() { 
    var textInputLength = $(this).val().length
    var remaining = 140 - textInputLength;
    var $counter = $(this).parent().find('.counter').text(remaining)
    if(remaining < 0) {
      console.log(remaining);
      $counter.css('color', 'red');
    }else {
      $counter.css('color', 'black');
    }
  });
});

