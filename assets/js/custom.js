/**
* jquery.matchHeight-min.js v0.5.2
* http://brm.io/jquery-match-height/
* License: MIT
*/
/*
(function(e){e.fn.matchHeight=function(t){if("remove"===t){var n=this;this.css("height","");e.each(e.fn.matchHeight._groups,function(e,t){t.elements=t.elements.not(n)});return this}if(1>=this.length)return this;t="undefined"!==typeof t?t:!0;e.fn.matchHeight._groups.push({elements:this,byRow:t});e.fn.matchHeight._apply(this,t);return this};e.fn.matchHeight._apply=function(t,n){var s=e(t),o=[s];n&&(s.css({display:"block","padding-top":"0","padding-bottom":"0","border-top-width":"0","border-bottom-width":"0",height:"100px"}),o=r(s),s.css({display:"","padding-top":"","padding-bottom":"","border-top-width":"","border-bottom-width":"",height:""}));e.each(o,function(t,n){var r=e(n),s=0,o=r.parents().add(r).filter(":hidden");o.css({display:"block"});r.each(function(){var t=e(this);t.css({display:"block",height:""});t.outerHeight(!1)>s&&(s=t.outerHeight(!1));t.css({display:""})});o.css({display:""});r.each(function(){var t=e(this),n=0;"border-box"!==t.css("box-sizing")&&(n+=i(t.css("border-top-width"))+i(t.css("border-bottom-width")),n+=i(t.css("padding-top"))+i(t.css("padding-bottom")));t.css("height",s-n)})});$(".xhide_box").hide();return this};e.fn.matchHeight._applyDataApi=function(){var t={};e("[data-match-height], [data-mh]").each(function(){var n=e(this),r=n.attr("data-match-height");t[r]=r in t?t[r].add(n):n});e.each(t,function(){this.matchHeight(!0)})};e.fn.matchHeight._groups=[];e.fn.matchHeight._throttle=80;var t=-1,n=-1;e.fn.matchHeight._update=function(r){if(r&&"resize"===r.type){r=e(window).width();if(r===t)return;t=r}-1===n&&(n=setTimeout(function(){e.each(e.fn.matchHeight._groups,function(){e.fn.matchHeight._apply(this.elements,this.byRow)});n=-1},e.fn.matchHeight._throttle));$(".xhide_box").hide()};e(e.fn.matchHeight._applyDataApi);e(window).bind("load resize orientationchange",e.fn.matchHeight._update);var r=function(t){var n=null,r=[];e(t).each(function(){var t=e(this),s=t.offset().top-i(t.css("margin-top")),o=0<r.length?r[r.length-1]:null;null===o?r.push(t):1>=Math.floor(Math.abs(n-s))?r[r.length-1]=o.add(t):r.push(t);n=s});return r},i=function(e){return parseFloat(e)||0}})(jQuery)
*/
(function(e){e.fn.matchHeight=function(t){if("remove"===t){var n=this;this.css("height","");e.each(e.fn.matchHeight._groups,function(e,t){t.elements=t.elements.not(n)});return this}if(1>=this.length)return this;t="undefined"!==typeof t?t:!0;e.fn.matchHeight._groups.push({elements:this,byRow:t});e.fn.matchHeight._apply(this,t);return this};e.fn.matchHeight._apply=function(t,n){var s=e(t),o=[s];n&&(s.css({display:"block","padding-top":"0","padding-bottom":"0","border-top-width":"0","border-bottom-width":"0",height:"100px"}),o=r(s),s.css({display:"","padding-top":"","padding-bottom":"","border-top-width":"","border-bottom-width":"",height:""}));e.each(o,function(t,n){var r=e(n),s=0,o=r.parents().add(r).filter(":hidden");o.css({display:"block"});r.each(function(){var t=e(this);t.css({display:"block",height:""});t.outerHeight(!1)>s&&(s=t.outerHeight(!1));t.css({display:""})});o.css({display:""});r.each(function(){var t=e(this),n=0;"border-box"!==t.css("box-sizing")&&(n+=i(t.css("border-top-width"))+i(t.css("border-bottom-width")),n+=i(t.css("padding-top"))+i(t.css("padding-bottom")));t.css("min-height",s-n)})});$(".xhide_box").hide();return this};e.fn.matchHeight._applyDataApi=function(){var t={};e("[data-match-height], [data-mh]").each(function(){var n=e(this),r=n.attr("data-match-height");t[r]=r in t?t[r].add(n):n});e.each(t,function(){this.matchHeight(!0)})};e.fn.matchHeight._groups=[];e.fn.matchHeight._throttle=80;var t=-1,n=-1;e.fn.matchHeight._update=function(r){if(r&&"resize"===r.type){r=e(window).width();if(r===t)return;t=r}-1===n&&(n=setTimeout(function(){e.each(e.fn.matchHeight._groups,function(){e.fn.matchHeight._apply(this.elements,this.byRow)});n=-1},e.fn.matchHeight._throttle));$(".xhide_box").hide()};e(e.fn.matchHeight._applyDataApi);e(window).bind("load resize orientationchange",e.fn.matchHeight._update);var r=function(t){var n=null,r=[];e(t).each(function(){var t=e(this),s=t.offset().top-i(t.css("margin-top")),o=0<r.length?r[r.length-1]:null;null===o?r.push(t):1>=Math.floor(Math.abs(n-s))?r[r.length-1]=o.add(t):r.push(t);n=s});return r},i=function(e){return parseFloat(e)||0}})(jQuery);


//(function(b){b.fn.matchHeight=function(a){if("remove"===a){var d=this;this.css("height","");b.each(b.fn.matchHeight._groups,function(b,a){a.elements=a.elements.not(d)});return this}if(1>=this.length)return this;a="undefined"!==typeof a?a:!0;b.fn.matchHeight._groups.push({elements:this,byRow:a});b.fn.matchHeight._apply(this,a);return this};b.fn.matchHeight._apply=function(a,d){var c=b(a),f=[c];d&&(c.css({display:"block","padding-top":"0","padding-bottom":"0","border-top-width":"0","border-bottom-width":"0",
//height:"100px"}),f=k(c),c.css({display:"","padding-top":"","padding-bottom":"","border-top-width":"","border-bottom-width":"",height:""}));b.each(f,function(a,c){var d=b(c),f=0,e=d.parents().add(d).filter(":hidden");e.css({display:"block"});d.each(function(){var a=b(this);a.css({display:"block",height:""});a.outerHeight(!1)>f&&(f=a.outerHeight(!1));a.css({display:""})});e.css({display:""});d.each(function(){var a=b(this),c=0;"border-box"!==a.css("box-sizing")&&(c+=g(a.css("border-top-width"))+g(a.css("border-bottom-width")),
//c+=g(a.css("padding-top"))+g(a.css("padding-bottom")));a.css("height",f-c)})});return this};b.fn.matchHeight._applyDataApi=function(){var a={};b("[data-match-height], [data-mh]").each(function(){var d=b(this),c=d.attr("data-match-height");a[c]=c in a?a[c].add(d):d});b.each(a,function(){this.matchHeight(!0)})};b.fn.matchHeight._groups=[];b.fn.matchHeight._throttle=80;var h=-1,e=-1;b.fn.matchHeight._update=function(a){if(a&&"resize"===a.type){a=b(window).width();if(a===h)return;h=a}-1===e&&(e=setTimeout(function(){b.each(b.fn.matchHeight._groups,
//function(){b.fn.matchHeight._apply(this.elements,this.byRow)});e=-1},b.fn.matchHeight._throttle))};b(b.fn.matchHeight._applyDataApi);b(window).bind("load resize orientationchange",b.fn.matchHeight._update);var k=function(a){var d=null,c=[];b(a).each(function(){var a=b(this),e=a.offset().top-g(a.css("margin-top")),h=0<c.length?c[c.length-1]:null;null===h?c.push(a):1>=Math.floor(Math.abs(d-e))?c[c.length-1]=h.add(a):c.push(a);d=e});return c},g=function(a){return parseFloat(a)||0}})(jQuery);
//(function(){for(var a,e=function(){},b="assert clear count debug dir dirxml error exception group groupCollapsed groupEnd info log markTimeline profile profileEnd table time timeEnd timeline timelineEnd timeStamp trace warn".split(" "),c=b.length,d=window.console=window.console||{};c--;)a=b[c],d[a]||(d[a]=e)})();
/** simple collapsible menu
*
*/
if(!window.location.hostname.match(/^ivycondo/)
    && !window.location.hostname.match(/^stylishresidences/)
//    && !window.location.hostname.match(/^chapterone/)
    && !window.location.hostname.match(/^fuse/)
)
{
    !function($){
      var $allParents = $('.menu-collapsible').find('.ps-Menu-list-Left-sub > a');
      var $allSub = $('.menu-collapsible').find('.ps-Menu-list-Left-sub .list-group a, .list-group-item:not(.ps-Menu-list-Left-sub) > a');
      $('.menu-collapsible').on('click', 'a', function(e){
        e.preventDefault();
        if($(this).parents('.ps-Menu-list-Left-sub').length > 0){
          var $curParent = $(this).parents('.ps-Menu-list-Left-sub');
          if($(this).is($curParent.find(" > a"))){
            $(this).parents('.menu-collapsible').find('.ps-Menu-list-Left-sub').removeClass('js-menu-expanded');
            $(this).parent().addClass('js-menu-expanded');
            $allSub.removeClass('ps-Txt-Green');
            $allParents.removeClass('ps-Txt-Green');
            $(this).addClass('ps-Txt-Green');
          }else{
            $allSub.removeClass('ps-Txt-Green');
            $(this).addClass('ps-Txt-Green');
          }
        }else{
          $('.menu-collapsible').find('.ps-Menu-list-Left-sub').removeClass('js-menu-expanded');
          $allSub.removeClass('ps-Txt-Green');
          $allParents.removeClass('ps-Txt-Green');
          $(this).addClass('ps-Txt-Green');
        }
        var target = $(this).data('target') || "";
        if(target && !$(target).is(':visible')){
          $('#active_image').length && $("html, body").scrollTop($('#active_image').offset().top);
          $('.floorplan-item-wrap').slideUp(400);
          $(target).slideDown(400);
        }
      });
      $('.list-group-item a:first').click();

    }(jQuery);
}
/** simple image popup
*
*/

!function($){
    $('.js-enlarge-link').on('click', function(e){
        $(this).attr('target','_blank');
        if(!is_mobile_only)
        {
            e.preventDefault();
            var img     = new Image(),
                img_src = this.href;
            $('#ps-image-box').find('.modal-body').html('');
            jQuery(img).attr('src', img_src).appendTo($('#ps-image-box').find('.modal-body'));
            $('#ps-image-box').modal({show: true});
        }
    });
}(jQuery);

/**
* equal height
*/
var resize_watch_fn = [];
var resize_watch = function resize_watch(){
  for(var i=0,l=resize_watch_fn.length || 0;i<l;i++){
    if(typeof(resize_watch_fn[i]) === "function"){
      resize_watch_fn[i].call(this);
    }
  }
};
var eqh = function eqh(selector){
  var min_h = 0;
  jQuery(selector).css('height', '').each(function(){
    min_h = (min_h < jQuery(this).height())?jQuery(this).height():min_h;
  });
  jQuery(selector).css('height', min_h);
};

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
        data = $(this).data();
        img_bg = typeof compare_img_bg != 'undefined' ? compare_img_bg : '';
        $('#ps-compare-box').modal({show: true});
        $('#ps-compare-box').find('.modal-body').html('<p style="text-align: center;"><strong>'+compare_loading+'</strong></p>');
        $.post(href,{
            project_id:data.projectid,
            home_id:data.homeid,
            img_bg:img_bg
        },function(html){
            $('#ps-compare-box').find('.modal-body').html('');
            $(html).find('.compare-content').appendTo($('#ps-compare-box').find('.modal-body'));
        });
  });

  $(document).on('click', '.js-compare-remove-all', function(e){
      e.preventDefault();
      var href = this.href;
      $('.compare-custom').append("<div id='loading-data-compare' style='position:absolute;left:0;top:0;width:100%;height:100%;z-index:999;'><div style='margin:-30px auto;width:200px;backgournd:#fff;text-align:center;'><strong>"+compare_loading+"</strong></div></div>");
      $.post(href,{
          t:(new Date()).getTime()
      },function(html){$('#loading-data-compare').remove();});
      $('.items-compare').remove();
      $("#add-more-item").removeClass('col-xs-4');
      $("#add-more-item").removeClass('col-xs-6');
      $("#add-more-item").removeClass('col-xs-8');
      $("#add-more-item").removeClass('col-xs-0');
      $("#add-more-item").removeClass('col-xs-3');
      $("#add-more-item").addClass('col-xs-12');
      $("#add-more-item").show();
      //$('#ps-compare-box').find('.modal-body').html('');
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
      var href = this.href,
          data = $(this).data();
      $('.compare-custom').append("<div id='loading-data-compare' style='position:absolute;left:0;top:0;width:100%;height:100%;z-index:999;'><div style='margin:-30px auto;width:200px;backgournd:#fff;text-align:center;'><strong>"+compare_loading+"</strong></div></div>");
      $.post(href,{
          project_id:data.projectid,
          home_id:data.homeid
      },function(html)
      {
          $('#loading-data-compare').remove();
          $(data.boxid).remove();
          var size_item = $(".compare-content .ps-tab-Green-Content >div").size();
          if(size_item < 4)
          {
              $("#add-more-item").removeClass('col-xs-4');
              $("#add-more-item").removeClass('col-xs-6');
              $("#add-more-item").removeClass('col-xs-8');
              $("#add-more-item").removeClass('col-xs-12');
              $("#add-more-item").removeClass('col-xs-0');
              $("#add-more-item").removeClass('col-xs-3');
              var new_class= "col-xs-"+(4*(3-(size_item-1)));
              $("#add-more-item").addClass(new_class);
              $("#add-more-item").show();
          }
      });
  });
}(jQuery);

$( document ).ready( function() {
	var maxwidth = $( document ).width();
	$('.nonRespon .ps-FT-gb-wrap').width(maxwidth);
	$('.nonRespon .ps-bg-gd-Grey-Rp-X').width(maxwidth);
	$('.nonRespon .ps-KS-hd').width(maxwidth);
} );



/* Call script match height  ห้ามเปิดอีกนะครับ ใช้วิธีการกำหนดความสูงเฉพาะตอนแสดงผลเท่านั้น */
/*
$('.list-items,.eqh-container').each(function() {
    $(this).find('.eqh-col').matchHeight();
});

$('.js-tab-toggle ,[id^=load-more]').on( "click", function() {
    $.fn.matchHeight._update();
});
*/
