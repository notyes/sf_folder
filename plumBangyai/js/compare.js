
/**
* compare script
*/
var loadCompareItems = function loadCompareItems(href){
  if(href == "") return false;
  $('#ps-compare-box').modal({show: true});
  $('#ps-compare-box').find('.modal-body').html('');
  $.ajax({
    url: href,
    success: function(html){
      $(html).find('.compare-content').appendTo($('#ps-compare-box').find('.modal-body'));
    }
  });
};

!function($){
  $('.js-compare-link').on('click', function(e){
    e.preventDefault();
    var href = this.href,
        data = $(this).data(),
        cmpItems = "";

    if(data.id != ""){
      cmpItems = $.cookie('cmp-items') || "";
      if(cmpItems == ""){
        cmpItems = [data.id];
      }else{
        cmpItems = cmpItems.split(",");
        if($.inArray(data.id, cmpItems) < 0){
          cmpItems.push(data.id);
        }
      }
      if(cmpItems.length < 3){
        $.cookie('cmp-items', cmpItems.join(','), { expires: 7 });
      }
      loadCompareItems(href);
    }
  });

  $(document).on('click', '.js-compare-remove-all', function(e){
    $.cookie('cmp-items', '', { expires: 7 });
    if($('#ps-compare-box').is(':visible')){
      e.preventDefault();
      $('#ps-compare-box').modal('hide');
    }
  });
  $(document).on('click', '.js-compare-add-more-item', function(e){
    if($('#ps-compare-box').is(':visible')){
      e.preventDefault();
      $('#ps-compare-box').modal('hide');
    }
  });
  $(document).on('click', '.js-compare-remove-link', function(e){
    if($('#ps-compare-box').is(':visible')){
      e.preventDefault();
    }
    var data  = $(this).data(),
        items = [],
        href  = this.href;

    if(data.id != ""){
      cmpItems = $.cookie('cmp-items') || "";
      if(cmpItems != ""){
        cmpItems = cmpItems.split(",");
        for(var i=0;i<cmpItems.length;i++){
          if(cmpItems[i] != data.id){
            items.push(cmpItems[i]);
          }
        }
      }
      
      $.cookie('cmp-items', items.join(','), { expires: 7 });

      loadCompareItems(href);
    }
  });
}(jQuery);
