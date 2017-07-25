
console.log('loaded');

$(() => {
  let boolShow = false;

  $("#toggle").click(function(){
    if (boolShow) {
      $('#details').css('display', 'none');
      boolShow = false;
    } else {
    $('#details').css('display', 'block');
      boolShow = true;
    }
  });

});
