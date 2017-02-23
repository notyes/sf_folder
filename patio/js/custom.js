/* Modernizr 2.8.2 (Custom Build) | MIT & BSD
 * Build: http://modernizr.com/download/#-mq-cssclasses-teststyles
 */
;window.Modernizr=function(a,b,c){function w(a){j.cssText=a}function x(a,b){return w(prefixes.join(a+";")+(b||""))}function y(a,b){return typeof a===b}function z(a,b){return!!~(""+a).indexOf(b)}function A(a,b,d){for(var e in a){var f=b[a[e]];if(f!==c)return d===!1?a[e]:y(f,"function")?f.bind(d||b):f}return!1}var d="2.8.2",e={},f=!0,g=b.documentElement,h="modernizr",i=b.createElement(h),j=i.style,k,l={}.toString,m={},n={},o={},p=[],q=p.slice,r,s=function(a,c,d,e){var f,i,j,k,l=b.createElement("div"),m=b.body,n=m||b.createElement("body");if(parseInt(d,10))while(d--)j=b.createElement("div"),j.id=e?e[d]:h+(d+1),l.appendChild(j);return f=["&#173;",'<style id="s',h,'">',a,"</style>"].join(""),l.id=h,(m?l:n).innerHTML+=f,n.appendChild(l),m||(n.style.background="",n.style.overflow="hidden",k=g.style.overflow,g.style.overflow="hidden",g.appendChild(n)),i=c(l,a),m?l.parentNode.removeChild(l):(n.parentNode.removeChild(n),g.style.overflow=k),!!i},t=function(b){var c=a.matchMedia||a.msMatchMedia;if(c)return c(b)&&c(b).matches||!1;var d;return s("@media "+b+" { #"+h+" { position: absolute; } }",function(b){d=(a.getComputedStyle?getComputedStyle(b,null):b.currentStyle)["position"]=="absolute"}),d},u={}.hasOwnProperty,v;!y(u,"undefined")&&!y(u.call,"undefined")?v=function(a,b){return u.call(a,b)}:v=function(a,b){return b in a&&y(a.constructor.prototype[b],"undefined")},Function.prototype.bind||(Function.prototype.bind=function(b){var c=this;if(typeof c!="function")throw new TypeError;var d=q.call(arguments,1),e=function(){if(this instanceof e){var a=function(){};a.prototype=c.prototype;var f=new a,g=c.apply(f,d.concat(q.call(arguments)));return Object(g)===g?g:f}return c.apply(b,d.concat(q.call(arguments)))};return e});for(var B in m)v(m,B)&&(r=B.toLowerCase(),e[r]=m[B](),p.push((e[r]?"":"no-")+r));return e.addTest=function(a,b){if(typeof a=="object")for(var d in a)v(a,d)&&e.addTest(d,a[d]);else{a=a.toLowerCase();if(e[a]!==c)return e;b=typeof b=="function"?b():b,typeof f!="undefined"&&f&&(g.className+=" "+(b?"":"no-")+a),e[a]=b}return e},w(""),i=k=null,e._version=d,e.mq=t,e.testStyles=s,g.className=g.className.replace(/(^|\s)no-js(\s|$)/,"$1$2")+(f?" js "+p.join(" "):""),e}(this,this.document);

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
	$('.bxslider').bxSlider({
    pagerCustom: '#bx-pager',
    controls:false,
    infiniteLoop: false,
    hideControlOnEnd: true
  });
  $('.bx-slider-1').bxSlider({
    pagerCustom: '.bx-pager-1',
    controls:false,
    infiniteLoop: false,
  });
  $('.bx-slider-2').bxSlider({
    pagerCustom: '.bx-pager-2',
    controls:false,
    infiniteLoop: false,
  });
  $('#bx-pager').bxSlider({
    minSlides: 2,
    maxSlides: 6,
    slideWidth: 165,
    slideMargin: 30,
    pager:false,
    infiniteLoop: false,
    hideControlOnEnd: true
  });
  $('.bx-pager-1').bxSlider({
    minSlides: 1,
    maxSlides: 4,
    slideWidth: 165,
    slideMargin: 30,
    infiniteLoop: false,
    hideControlOnEnd: true,
    pager:false,
  });
  $('.bx-pager-2').bxSlider({
    minSlides: 1,
    maxSlides: 4,
    slideWidth: 165,
    slideMargin: 30,
    infiniteLoop: false,
    hideControlOnEnd: true,
    pager:false,
  });
  $('.project-box-slider, .promotion-box-slider').bxSlider({
    controls:false,
    pager:true,
    infiniteLoop: false,
  });



};

var pagination = function pagination(){
  // main-content
  jQuery(document).on('click', '.load-more-item a', function loadMoreItem(e){
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
            eqh('.list-item .detail');
            eqh('.list-item .caption_wrap');
            eqh('.list-item .thumbnail');
            eqh('.list-item .list-item-wrap');
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
 //  if( /Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent) ) {
 //    $('.selectpicker').selectpicker('mobile');
	// //fix Nothing selected
 //    $('select.selectpicker').wrapInner('<optgroup>');
 //  }else{
 //    $('.selectpicker').selectpicker();
 //  }
  if( /Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent) ) {
    $('.selectpicker').selectpicker('mobile');
  //fix Nothing selected
    //$('select.selectpicker').wrapInner('<optgroup>');
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



$(window).load(function(){
  $('#carousel-homepage .call-pruksa').removeClass('hide');
  !function($){
    /* apply auto slider to homepage list */
    if($('.main-content.home-page').length > 0){
      eqh('.home-list-items .caption_detail');
      eqh('.home-list-items .thumbnail');
      eqh('.home-list-items .list-item');
    }


    /**
    $('.home-list-items').bxSlider({
      controls:false  ,
      mode:'fade' ,
      auto:'true',
      speed:500,
      autoDelay:5000
    });
      **/
    $(".home-list-items").each(function( index ) {
      var num = $(this).find('.list-item').length;
      if(num > 1)
      {
        $(this).bxSlider({
          controls:false,
          mode:'fade',
          auto:'true',
          speed:500,
          autoDelay:5000
        });
      }
    });
  }(jQuery);
});


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
        url: 'img/lite/map-icon.png',
        // This marker is 20 pixels wide by 32 pixels tall.
        size: new google.maps.Size(41, 62),
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

/*
!function($){
    if($('html').is('.msie9') || $('html').is('.msie8') || $('html').is('.msie7') || $('html').is('.msie6')){
        $('[placeholder]').focus(function() {
            var input = $(this);
            if (input.val() == input.attr('placeholder')) {
                input.val('');
                input.removeClass('placeholder');
            }
        }).blur(function() {
            var input = $(this);
            if (input.val() == '' || input.val() == input.attr('placeholder')) {
                input.addClass('placeholder');
                input.val(input.attr('placeholder'));
            }
        }).blur();
    }
}(jQuery);

jQuery.validator.addMethod("placeholder", function(value, element) {
    return value!=$(element).attr("placeholder");
}, jQuery.validator.messages.required);
*/

!function($){
    if($('.main-content.home-page').length === 0){
      eqh('.list-item .detail');
      eqh('.list-item .caption');
      eqh('.list-item .caption_wrap');
      eqh('.list-item .thumbnail');
      eqh('.list-item .list-item-wrap');
      eqh('.list-item');
    }
}(jQuery);
