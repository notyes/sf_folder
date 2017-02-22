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
	jQuery('#searchContainer').on('click', '.load-more-item a', function loadMoreItem(e){
		e.preventDefault();
		if(!jQuery('#searchContainer').is('.loading') && jQuery('.load-more-item a', '.paginationWrap').length > 0){
			var nextURL = jQuery('.load-more-item a', '.paginationWrap').attr('href') || "";
			if(nextURL !== ""){
				jQuery('#searchContainer').addClass('loading');
				jQuery.ajax({
					url: nextURL,
					success: function(html){
						$listItems = jQuery(html).find('.list-item');
						$paginationWrap = jQuery(html).find('.paginationWrap');
						jQuery('#searchContainer').find('.list-items').append($listItems);
						jQuery('#searchContainer').removeClass('loading');
						jQuery('#searchContainer').find('.paginationWrap').html($paginationWrap.html());
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

!function($){
	if( /Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent) ) {
    $('.selectpicker').selectpicker('mobile');
	//fix Nothing selected
    //$('select.selectpicker').wrapInner('<optgroup>');
  }else{
    $('.selectpicker').selectpicker();
  }

	if($('.house-type-plan, .house-type-function, .house-type-detail').length > 0){
		resize_watch_fn.push(function(){
			if($(window).width() > 767){
				eqh('.house-type-plan, .house-type-function, .house-type-detail');
			}else{
				$('.house-type-plan, .house-type-function, .house-type-detail').css('min-height', '');
			}
		});
	}
	$(window).resize(resize_watch);
	resize_watch();

	pagination();
	gallery();
}(jQuery);

/* detect os - engine then assign class name to html msie/chrome/safari/mozilla */
(function(){
  var e=document.documentElement;document.head||document.getElementsByTagName("head");var c=/(opera)(?:.*version)?[ \/]([\w.]+)/,g=/(msie) ([\w.]+)/,ie=/(trident)(?:.*? rv:([\w.]+))?/,h=/(mozilla)(?:.*? rv:([\w.]+))?/,s=/(safari)[ \/]([\w.]+)/,d=/(windows)/,b=/(ipad)/,f=/(iphone)/,a=window.navigator.userAgent.toLowerCase(),c=/(chrome)[ \/]([\w.]+)/.exec(a)||g.exec(a)||ie.exec(a)||s.exec(a)||c.exec(a)||0>a.indexOf("compatible")&&h.exec(a)||[],b=/(macintosh)/.exec(a)||d.exec(a)||b.exec(a)||f.exec(a)||[],d=c[1]||"",d=(d=="trident")?"msie":d;f=parseInt(c[2],10)||"",b=b[1]||"";"undefined"!=typeof e&&(e.className=e.className+" "+b+" "+d+" "+d+f);
})();


/* apply equal height */
!function($){
  eqh('.list-items h3');
  eqh('.list-items .download-link');
  eqh('.list-items .list-item');
}(jQuery);


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