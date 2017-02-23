/* custom JavaScript functionality */

/** simple collapsible menu
*
*/

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
        $allSub.removeClass('ps-Txt-Orange');
        $allParents.removeClass('ps-Txt-Orange');
        $(this).addClass('ps-Txt-Orange');
        $(this).siblings().find('.list-group-item a:first').addClass('ps-Txt-Orange');
      }else{
        $allSub.removeClass('ps-Txt-Orange');
        $(this).addClass('ps-Txt-Orange');
      }
    }else{
      $('.menu-collapsible').find('.ps-Menu-list-Left-sub').removeClass('js-menu-expanded');
      $allSub.removeClass('ps-Txt-Orange');
      $allParents.removeClass('ps-Txt-Orange');
      $(this).addClass('ps-Txt-Orange');  
    }
    var target = $(this).data('target') || "";
    if(target && !$(target).is(':visible')){
      $('.floorplan-item-wrap').slideUp(400);
      $(target).slideDown(400);
    }
  });
  $('.list-group-item a:first,.list-group-item .active').click();
  
}(jQuery);

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

  pagination();
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
  $('.bxslider-cover-image').bxSlider({
    controls:false,
    mode:'fade',
    speed: 1500,
    // pager:false,
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
    $('#ps-image-box').find('.modal-content figure').html('');
    $(img).attr('src', img_src).appendTo($('#ps-image-box').find('.modal-content figure'));
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
  eqh('.list-item h3');
  eqh('.list-item .caption');
  eqh('.list-item');
  eqh('.list-item .caption p.shortDesc');
}(jQuery);


