/** simple image popup
*
*/

!function($){
  $('.js-enlarge-link').on('click', function(e){
    e.preventDefault();
    $('#ps-image-box').modal({show: true})
  });
}(jQuery);