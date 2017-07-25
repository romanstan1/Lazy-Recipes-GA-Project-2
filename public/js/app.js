'use strict';

console.log('loaded');

$(function () {
  var boolShow = false;

  $("#toggle").click(function () {
    if (boolShow) {
      $('#details').css('display', 'none');
      boolShow = false;
    } else {
      $('#details').css('display', 'block');
      boolShow = true;
    }
  });
});