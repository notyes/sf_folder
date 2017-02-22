/** simple collapsible menu
*
*/

!function($){
  $('.menu-collapsible').on('click', ".ps-Menu-list-Left-sub > a", function(e){
    e.preventDefault();
    $(this).parents('.menu-collapsible').find('.ps-Menu-list-Left-sub').removeClass('js-menu-expanded');
    $(this).parent().addClass('js-menu-expanded');
  });
}(jQuery);

/** simple image popup
*
*/

!function($){
  $('.js-enlarge-link').on('click', function(e){
    e.preventDefault();
    $('#ps-image-box').modal({show: true})
  });
}(jQuery);