// external js: masonry.pkgd.js, imagesloaded.pkgd.js

console.log('loaded');

$(() => {
  var $grid = $('.grid').imagesLoaded( function() {
    $grid.masonry({
      itemSelector: '.grid-item',
      percentPosition: true,
      columnWidth: '.grid-sizer'
    });
  });


  // var scrollPos = 0;
  // var animationBeginPos = 0;
  // var animationEndPos = 1000;
  //
  // var beginningColor = new $.Color( 'rgb(210,50,98)' ); //we can set this here, but it'd probably be better to get it from the CSS; for the example we're setting it here.
  // var endingColor = new $.Color( 'rgb(0,197,209)' ); //what color we want to use in the end

  // $(document).scroll(function() {
  //   scrollPos = $(this).scrollTop();
  //   if(scrollPos >= animationBeginPos && scrollPos <= animationEndPos ) {
  //        // console.log( 'scrolling and animating' );
  //         //we want to calculate the relevant transitional rgb value
  //     var percentScrolled = scrollPos / ( animationEndPos - animationBeginPos );
  //     var newRed = beginningColor.red() + ( ( endingColor.red() - beginningColor.red() ) * percentScrolled );
  //     var newGreen = beginningColor.green() + ( ( endingColor.green() - beginningColor.green() ) * percentScrolled );
  //     var newBlue = beginningColor.blue() + ( ( endingColor.blue() - beginningColor.blue() ) * percentScrolled );
  //     var newColor = new $.Color( newRed, newGreen, newBlue );
  //
  //     $('body').animate({ backgroundColor: newColor }, 0);
  //   } else if ( scrollPos > animationEndPos ) {
  //     $('body').animate({ backgroundColor: endingColor }, 0);
  //   } else if ( scrollPos < animationBeginPos ) {
  //     $('body').animate({ backgroundColor: beginningColor }, 0);
  //   } else {
  //     console.log('nothing');
  //   }
  // });
  $('h5').addClass('madeBy');

  if (window.location.pathname !== '/') {
    $('body').addClass('changeColor');
    $('h5').removeClass('madeBy');
    $('header').removeClass('opacity');
    $('h2.home').addClass('changeColorH2');
    //$('h3.home').removeClass('changeColorH3');
  }

  $(window).scroll(function () {
    if (($(this).scrollTop() > 50) && window.location.pathname==='/') {
      $('body').addClass('changeColor');
      $('h2.home').addClass('changeColorH2');
      $('h3.home').addClass('changeColorH3');
      $('h5').removeClass('madeBy');
      $('header').removeClass('opacity');
    }
    if (($(this).scrollTop() < 50) && window.location.pathname==='/') {
      $('body').removeClass('changeColor');
      $('header').addClass('opacity');
      $('h2.home').removeClass('changeColorH2');
      $('h3.home').removeClass('changeColorH3');
      //$('h5').addClass('madeBy');
    }

  });


});
