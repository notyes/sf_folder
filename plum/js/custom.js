/**
* jquery.matchHeight-min.js v0.5.2
* http://brm.io/jquery-match-height/
* License: MIT
*/
// .eqh-col
/*
(function(b){b.fn.matchHeight=function(a){if("remove"===a){var d=this;this.css("height","");b.each(b.fn.matchHeight._groups,function(b,a){a.elements=a.elements.not(d)});return this}if(1>=this.length)return this;a="undefined"!==typeof a?a:!0;b.fn.matchHeight._groups.push({elements:this,byRow:a});b.fn.matchHeight._apply(this,a);return this};b.fn.matchHeight._apply=function(a,d){var c=b(a),f=[c];d&&(c.css({display:"block","padding-top":"0","padding-bottom":"0","border-top-width":"0","border-bottom-width":"0",
height:"100px"}),f=k(c),c.css({display:"","padding-top":"","padding-bottom":"","border-top-width":"","border-bottom-width":"",height:""}));b.each(f,function(a,c){var d=b(c),f=0,e=d.parents().add(d).filter(":hidden");e.css({display:"block"});d.each(function(){var a=b(this);a.css({display:"block",height:""});a.outerHeight(!1)>f&&(f=a.outerHeight(!1));a.css({display:""})});e.css({display:""});d.each(function(){var a=b(this),c=0;"border-box"!==a.css("box-sizing")&&(c+=g(a.css("border-top-width"))+g(a.css("border-bottom-width")),
c+=g(a.css("padding-top"))+g(a.css("padding-bottom")));a.css("height",f-c)})});return this};b.fn.matchHeight._applyDataApi=function(){var a={};b("[data-match-height], [data-mh]").each(function(){var d=b(this),c=d.attr("data-match-height");a[c]=c in a?a[c].add(d):d});b.each(a,function(){this.matchHeight(!0)})};b.fn.matchHeight._groups=[];b.fn.matchHeight._throttle=80;var h=-1,e=-1;b.fn.matchHeight._update=function(a){if(a&&"resize"===a.type){a=b(window).width();if(a===h)return;h=a}-1===e&&(e=setTimeout(function(){b.each(b.fn.matchHeight._groups,
function(){b.fn.matchHeight._apply(this.elements,this.byRow)});e=-1},b.fn.matchHeight._throttle))};b(b.fn.matchHeight._applyDataApi);b(window).bind("load resize orientationchange",b.fn.matchHeight._update);var k=function(a){var d=null,c=[];b(a).each(function(){var a=b(this),e=a.offset().top-g(a.css("margin-top")),h=0<c.length?c[c.length-1]:null;null===h?c.push(a):1>=Math.floor(Math.abs(d-e))?c[c.length-1]=h.add(a):c.push(a);d=e});return c},g=function(a){return parseFloat(a)||0}})(jQuery);
*/
(function(e){e.fn.matchHeight=function(t){if("remove"===t){var n=this;this.css("height","");e.each(e.fn.matchHeight._groups,function(e,t){t.elements=t.elements.not(n)});return this}if(1>=this.length)return this;t="undefined"!==typeof t?t:!0;e.fn.matchHeight._groups.push({elements:this,byRow:t});e.fn.matchHeight._apply(this,t);return this};e.fn.matchHeight._apply=function(t,n){var s=e(t),o=[s];n&&(s.css({display:"block","padding-top":"0","padding-bottom":"0","border-top-width":"0","border-bottom-width":"0",height:"100px"}),o=r(s),s.css({display:"","padding-top":"","padding-bottom":"","border-top-width":"","border-bottom-width":"",height:""}));e.each(o,function(t,n){var r=e(n),s=0,o=r.parents().add(r).filter(":hidden");o.css({display:"block"});r.each(function(){var t=e(this);t.css({display:"block",height:""});t.outerHeight(!1)>s&&(s=t.outerHeight(!1));t.css({display:""})});o.css({display:""});r.each(function(){var t=e(this),n=0;"border-box"!==t.css("box-sizing")&&(n+=i(t.css("border-top-width"))+i(t.css("border-bottom-width")),n+=i(t.css("padding-top"))+i(t.css("padding-bottom")));t.css("min-height",s-n)})});$(".xhide_box").hide();return this};e.fn.matchHeight._applyDataApi=function(){var t={};e("[data-match-height], [data-mh]").each(function(){var n=e(this),r=n.attr("data-match-height");t[r]=r in t?t[r].add(n):n});e.each(t,function(){this.matchHeight(!0)})};e.fn.matchHeight._groups=[];e.fn.matchHeight._throttle=80;var t=-1,n=-1;e.fn.matchHeight._update=function(r){if(r&&"resize"===r.type){r=e(window).width();if(r===t)return;t=r}-1===n&&(n=setTimeout(function(){e.each(e.fn.matchHeight._groups,function(){e.fn.matchHeight._apply(this.elements,this.byRow)});n=-1},e.fn.matchHeight._throttle));$(".xhide_box").hide()};e(e.fn.matchHeight._applyDataApi);e(window).bind("load resize orientationchange",e.fn.matchHeight._update);var r=function(t){var n=null,r=[];e(t).each(function(){var t=e(this),s=t.offset().top-i(t.css("margin-top")),o=0<r.length?r[r.length-1]:null;null===o?r.push(t):1>=Math.floor(Math.abs(n-s))?r[r.length-1]=o.add(t):r.push(t);n=s});return r},i=function(e){return parseFloat(e)||0}})(jQuery);
/*
(function(e){e.fn.matchHeight=function(t){if("remove"===t){var n=this;this.css("height","");e.each(e.fn.matchHeight._groups,function(e,t){t.elements=t.elements.not(n)});return this}if(1>=this.length)return this;t="undefined"!==typeof t?t:!0;e.fn.matchHeight._groups.push({elements:this,byRow:t});e.fn.matchHeight._apply(this,t);return this};e.fn.matchHeight._apply=function(t,n){var s=e(t),o=[s];n&&(s.css({display:"block","padding-top":"0","padding-bottom":"0","border-top-width":"0","border-bottom-width":"0",height:"100px"}),o=r(s),s.css({display:"","padding-top":"","padding-bottom":"","border-top-width":"","border-bottom-width":"",height:""}));e.each(o,function(t,n){var r=e(n),s=0,o=r.parents().add(r).filter(":hidden");o.css({display:"block"});r.each(function(){var t=e(this);t.css({display:"block",height:""});t.outerHeight(!1)>s&&(s=t.outerHeight(!1));t.css({display:""})});o.css({display:""});r.each(function(){var t=e(this),n=0;"border-box"!==t.css("box-sizing")&&(n+=i(t.css("border-top-width"))+i(t.css("border-bottom-width")),n+=i(t.css("padding-top"))+i(t.css("padding-bottom")));t.css("height",s-n)})});$(".xhide_box").hide();return this};e.fn.matchHeight._applyDataApi=function(){var t={};e("[data-match-height], [data-mh]").each(function(){var n=e(this),r=n.attr("data-match-height");t[r]=r in t?t[r].add(n):n});e.each(t,function(){this.matchHeight(!0)})};e.fn.matchHeight._groups=[];e.fn.matchHeight._throttle=80;var t=-1,n=-1;e.fn.matchHeight._update=function(r){if(r&&"resize"===r.type){r=e(window).width();if(r===t)return;t=r}-1===n&&(n=setTimeout(function(){e.each(e.fn.matchHeight._groups,function(){e.fn.matchHeight._apply(this.elements,this.byRow)});n=-1},e.fn.matchHeight._throttle));$(".xhide_box").hide()};e(e.fn.matchHeight._applyDataApi);e(window).bind("load resize orientationchange",e.fn.matchHeight._update);var r=function(t){var n=null,r=[];e(t).each(function(){var t=e(this),s=t.offset().top-i(t.css("margin-top")),o=0<r.length?r[r.length-1]:null;null===o?r.push(t):1>=Math.floor(Math.abs(n-s))?r[r.length-1]=o.add(t):r.push(t);n=s});return r},i=function(e){return parseFloat(e)||0}})(jQuery)
*/

/* custom JavaScript functionality */

var resize_watch_fn = [];
var resize_watch = function resize_watch(){
  for(var i=0,l=resize_watch_fn.length || 0;i<l;i++){
    if(typeof(resize_watch_fn[i]) === "function"){
      resize_watch_fn[i].call(this);
    }
  }
};

var gallery = function gallery(){
  
  $('.carousel-thumb .item a').on('click', function thumbClickEvent(e){
    e.preventDefault();
    if(($(this).data('target') || "") != ""){
      $canvas = jQuery("#"+$(this).data('target')).find('.image-frame');
      if(!$canvas.is('.loading')){
        var next = new Image();
        $canvas.addClass('loading');
        jQuery(next).load(function(){
          var $old = $canvas.find('img:first'),
              $next = jQuery(next);

          $old.addClass('old');
          $next.css({opacity: 0});
          $canvas.append($next);
          $next.animate({opacity: 1}, {duration: 600});
          $old.animate({opacity: 0}, {duration: 800, complete: function(){
              jQuery(this).remove();
              $canvas.removeClass('loading');
          }});
        }).attr('src', this.href);
      }
    }else{
      $thumbs = $(this).parents('.image-gallery-wrapper').find('.carousel-thumb .item a');
      var index = $thumbs.index(this);
      $(this).parents('.image-gallery-wrapper').find('.nivo-controlNav .nivo-control').eq(index).trigger('click');
    }
  });
};

var pagination = function pagination(){
  // main-content
  jQuery('.search-container').on('click', '.load-more-item a', function loadMoreItem(e){
    e.preventDefault();

    $parent = jQuery(this).parents('.search-container');
    if(!$parent.is('.loading')){
      var nextURL = jQuery(this).attr('href') || "";
      if(nextURL !== ""){
        $parent.addClass('loading');
        jQuery.ajax({
          url: nextURL,
          success: function(html){
            $listItems = jQuery(html).find('.list-item');
            $paginationWrap = jQuery(html).find('.paginationWrap');
            $parent.find('.list-items').append($listItems);
            $parent.removeClass('loading');
            $parent.find('.paginationWrap').html($paginationWrap.html());
            if($parent.find('.paginationWrap .load-more-item a').length === 0){
              $parent.find('.load-more-item').remove();
            }
            
            eqh('.list-item h3');
            eqh('.list-item .caption');
            eqh('.list-item');
          }
        });
      }
    }
  });
};

var eqh = function eqh(selector){
  var min_h = 0;
  jQuery(selector).css('min-height', '').each(function(){
    min_h = (min_h < jQuery(this).height())?jQuery(this).height():min_h;
  });
  jQuery(selector).css('min-height', min_h);
};

var eqh_click = function eqh(selector){
    var min_h = 0;
    jQuery(selector).css('min-height', '').each(function(){
        min_h = (min_h < jQuery(this).outerHeight())?jQuery(this).outerHeight():min_h;
    });
    jQuery(selector).css('min-height', min_h);
    jQuery(selector).css('height', min_h);
};

var toggle = function toggle(){
  jQuery('.js-tab-toggle').on('click', function(e){
    var data    = $(this).data(),
        $target = $(data.target);

    e.preventDefault();

    $('.js-tab-content').addClass('hide');
    $('.js-tab-toggle').removeClass('active');

    $target.removeClass('hide');
    $(this).addClass('active');
  });
};

!function($){
  if( /Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent) ) {
    $('.selectpicker').selectpicker('mobile');
    $('select.selectpicker').wrapInner('<optgroup>');
  }else{
    $('.selectpicker').selectpicker();
  }
  $('.datetimepicker').datetimepicker({pickTime: false});

  if($('.house-type-plan, .house-type-function, .house-type-detail').length > 0){
    resize_watch_fn.push(function(){
      if($(window).width() > 767){
        eqh('.house-type-plan , .house-type-function, .house-type-detail');
      }else{
        $('.house-type-plan, .house-type-function, .house-type-detail').css('min-height', '');
      }
    });
  }

  $(window).resize(resize_watch);
  resize_watch();

  toggle();
  gallery();
}(jQuery);

/* detect os - engine then assign class name to html msie/chrome/safari/mozilla */
(function(){
  var e=document.documentElement;document.head||document.getElementsByTagName("head");var c=/(opera)(?:.*version)?[ \/]([\w.]+)/,g=/(msie) ([\w.]+)/,ie=/(trident)(?:.*? rv:([\w.]+))?/,h=/(mozilla)(?:.*? rv:([\w.]+))?/,s=/(safari)[ \/]([\w.]+)/,d=/(windows)/,b=/(ipad)/,f=/(iphone)/,a=window.navigator.userAgent.toLowerCase(),c=/(chrome)[ \/]([\w.]+)/.exec(a)||g.exec(a)||ie.exec(a)||s.exec(a)||c.exec(a)||0>a.indexOf("compatible")&&h.exec(a)||[],b=/(macintosh)/.exec(a)||d.exec(a)||b.exec(a)||f.exec(a)||[],d=c[1]||"",d=(d=="trident")?"msie":d;f=parseInt(c[2],10)||"",b=b[1]||"";"undefined"!=typeof e&&(e.className=e.className+" "+b+" "+d+" "+d+f);
})();

/* fix ipad rotation */
(function(doc) {

    var addEvent = 'addEventListener',
        type = 'gesturestart',
        qsa = 'querySelectorAll',
        scales = [1, 1],
        meta = qsa in doc ? doc[qsa]('meta[name=viewport]') : [];

    function fix() {
        meta.content = 'width=device-width,minimum-scale=' + scales[0] + ',maximum-scale=' + scales[1];
        doc.removeEventListener(type, fix, true);
    }

    if ((meta = meta[meta.length - 1]) && addEvent in doc) {
        fix();
        scales = [.25, 1.6];
        doc[addEvent](type, fix, true);
    }

}(document));

!function($){
  /* apply auto slider to homepage list */
  var status_auto = ($('.bxslider-cover-image li').size() > 1) ? true:false;
  $('.bxslider-cover-image').bxSlider({
    controls:false,
    mode:'fade',
    auto:status_auto,
    speed: 1500,
    onSliderLoad: function(){
      $('.cover-image .call-pruksa').removeClass('hide');
    }
  });
}(jQuery);


!function($){
  $('.js-enlarge-link').on('click', function(e){
    e.preventDefault();
    var img     = new Image(),
        img_src = this.href,
        title   = this.title || "";

    $('#ps-image-box').find('.modal-header h3').html(title);
    $('#ps-image-box').find('.modal-body').html('');
    $(img).attr('src', img_src).appendTo($('#ps-image-box').find('.modal-body'));
    $('#ps-image-box').modal({show: true});
  });
}(jQuery);

var setGoogleMapMarkers = function(map) {
  var markers = [],
      image = {
        url: 'img/wireframe/map-icon.png',
        // This marker is 20 pixels wide by 32 pixels tall.
        size: new google.maps.Size(39, 62),
        // The origin for this image is 0,0.
        origin: new google.maps.Point(0,0),
        // The anchor for this image is the base of the flagpole at 0,32.
        anchor: new google.maps.Point(0, 62)
      };

  $('.js-map-item').each(function(){
    var data = $(this).data(),
        myLatLng = new google.maps.LatLng(data.lat, data.lng);

    marker = new google.maps.Marker({
      position: myLatLng,
      map: map,
      icon: image,
      title: data.title,
      animation: google.maps.Animation.DROP,
      customInfo: data.item
    });
    var infowindow = new google.maps.InfoWindow({
        content: '<div class="project-location" style="width:230px; height:295px;"><div class="location-img"><img src="'+data.image+'" width="230" height="145" style="height:145px;width:230px;"><div class="location-desc"><h3><a href="'+data.href+'" title="'+data.title+'">'+data.title+'</a></h3><p>'+data.desc+'</p></div></div></div>'
    });

    google.maps.event.addListener(marker, 'click', function() {
      if(typeof(activeWindow) != "undefined") activeWindow.close(); 
      infowindow.open(map, this);

      activeWindow = infowindow; 
    });

  });
};

!function($){

  $('.home-box').matchHeight();
  $('.list-item h3').matchHeight();
  $('.list-item .caption').matchHeight();
  $('.list-item .caption p').matchHeight();
  $('.list-item').matchHeight();
  $('.list-item .thumbnail').matchHeight();
  $('.list-item').each(function(i,e)
  {
  if(i>0 && i%3==0){$(e).css('clear','left')}
  });
}(jQuery);

!function($){
    $(".floorplan-item-wrap .tab").on('click',function(){
        var id = $(this).attr("data-taget");
        $(this).parent().parent().find(".img-plan").hide();
        $(this).parent().parent().find("#"+id).show();
        $(this).parent().find(".tab").removeClass("active");
        // $(this).parent().find(".tab").css("background-color","#fff !important");
        $(this).addClass("active");
    });

    $('.menu-collapsible').on('click', 'a', function(e){
        e.preventDefault();
        $(".child div").removeClass("active");
        $(".tab-menu div").removeClass("active");
        var root = $(this).attr("data-root");
        var parent = $(this).attr("data-parent");
        $(".parent").removeClass("active");
        $(this).children("div").addClass("active");
        // alert("ddd");
        // $("a[data-root='"+root+"']").removeClass("active");
        $("#"+root+" div").addClass("active");
        $("#"+parent).addClass("active");
        $("#"+parent+"_p div").addClass("active");
        // $(this).children("div").addClass("active");
        // $(this).parent().find(".child ul li:first-child ul li a").click();
        // $("#"+root).addClass("active");
        var target = $(this).data('target') || "";
        if(target && !$(target).is(':visible')){
            $('.floorplan-item-wrap').slideUp(400);
            $(target).slideDown(400);
        }
    });
    $('.list-group-item a:first').click();
}(jQuery);
