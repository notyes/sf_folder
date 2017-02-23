
/**
 -- js toggle
*/
!function($){
  $('.js-toggle').on('click', function(e){
    var target = $(this).data('toggle') || "";
    $('.js-toggle').removeClass('active');
    $(this).addClass('active');
    e.preventDefault();
    if($('#'+target).length > 0){
      if(!$('#'+target).is('visible')){
        if($('.ps-bank-information:visible').length > 0){
          $('.ps-bank-information:visible').slideUp(400);
        }
        $('#'+target).slideDown(400);
      }
    }
  });
}(jQuery);