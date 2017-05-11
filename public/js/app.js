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

  // $(window).scroll(function () {
  //   let top = $(window).scrollTop();
  //   console.log(top);
  //   top = (top / 2) + 33;
  //
  //   rgba(33, 33, 51)
  //
  //
  //   $('body').css('background', `rgba(33, 33, ${top}, 1)`);
  //   // color: rgba(33, 33, 51, 1);
  // });


  // $('h5').addClass('madeBy');
  //
  // if (window.location.pathname !== '/') {
  //   $('body').addClass('changeColor');
  //   $('h5').removeClass('madeBy');
  //   $('header').removeClass('opacity');
  //   $('h2.home').addClass('changeColorH2');
  //   //$('h3.home').removeClass('changeColorH3');
  // }
  //
  // $(window).scroll(function () {
  //   if (($(this).scrollTop() > 50) && window.location.pathname==='/') {
  //     $('body').addClass('changeColor');
  //     $('h2.home').addClass('changeColorH2');
  //     $('h3.home').addClass('changeColorH3');
  //     $('h5').removeClass('madeBy');
  //     $('header').removeClass('opacity');
  //   }
  //   if (($(this).scrollTop() < 50) && window.location.pathname==='/') {
  //     $('body').removeClass('changeColor');
  //     $('header').addClass('opacity');
  //     $('h2.home').removeClass('changeColorH2');
  //     $('h3.home').removeClass('changeColorH3');
  //     //$('h5').addClass('madeBy');
  //   }
  //
  // });

});