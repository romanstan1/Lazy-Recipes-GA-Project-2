'use strict';

// external js: masonry.pkgd.js, imagesloaded.pkgd.js

console.log('loaded');

$(function () {
  var $grid = $('.grid').imagesLoaded(function () {
    $grid.masonry({
      itemSelector: '.grid-item',
      percentPosition: true,
      columnWidth: '.grid-sizer'
    });
  });
});