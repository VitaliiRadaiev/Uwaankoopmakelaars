// swiper slider plugin  =========
@@include('plagins/swiper-bundle.js');
// and swiper slider plugin  =========

@@include('_function.js');

window.addEventListener('load', function () {

// popup handler ==============
@@include('../common/popup/popup.js');
// and popup handler ==============


// form quiz =============
@@include('../common/form-quiz/form-quiz.js');
// and form quiz =============
});

jQuery(document).ready(function ($) {


    $('img.img-svg').each(function () {
      var $img = $(this);
      var imgClass = $img.attr('class');
      var imgURL = $img.attr('src');
      $.get(imgURL, function (data) {
        var $svg = $(data).find('svg');
        if (typeof imgClass !== 'undefined') {
          $svg = $svg.attr('class', imgClass + ' replaced-svg');
        }
        $svg = $svg.removeAttr('xmlns:a');
        if (!$svg.attr('viewBox') && $svg.attr('height') && $svg.attr('width')) {
          $svg.attr('viewBox', '0 0 ' + $svg.attr('height') + ' ' + $svg.attr('width'))
        }
        $img.replaceWith($svg);
      }, 'xml');
    });
  
  });