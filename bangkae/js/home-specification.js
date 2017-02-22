/**
* is support touch
*/
function is_touch_device() {if ("ontouchstart" in document.documentElement){return true;}else{return false;}};

/**
 * @fileoverview pixelPlot
 * @requires jQuery
 */

 !function ($){
  var defaults = {
    canvasClass       : '.home-spec-main .spec-image-canvas',
    detailClass       : '.home-spec-main .spec-detail-content',
    sourceClass       : '.pointx',
    controllerClass   : '.controller-prev, .controller-next',
    dotClass          : '.spec-image-canvas .dot',
    buyableClass      : '.spec-image-canvas .buyable',
    buyableCloseClass : '.btn-back',
    animate           : 500
  }
  var pixelPlot = function (element, options){
    this.options  = $.extend({}, defaults, options),
    this.$element = $(element),
    this.$canvas  = this.$element.find(this.options.canvasClass),
    this.$detail  = this.$element.find(this.options.detailClass);
  };
  pixelPlot.prototype = {
    init: function(){
      var $canvas = this.$canvas,
      data = this.$element.data();

      this.$element.find(this.options.sourceClass).each(function(){
        var data = $(this).data();
        var $dot = $('<span class="dot" id="'+data.uid+'"></span>');

        if(data.buyable && data.buyable == "1"){
          $dot.addClass('buyable');
        }
        $dot.css({left: data.x, top: data.y}).data(data);
        $canvas.append($dot);
      });

      if(is_touch_device()){
        $(this.options.dotClass).off().on('touchstart.pixelPlot', $.proxy(this.pixelHover, this));
        $(this.options.controllerClass).off().on('touchstart.pixelPlot.controller', $.proxy(this.controllerEvent, this));
        $(this.options.buyableCloseClass).off().on('touchstart.pixelPlot.buyableclosc', $.proxy(this.buyableCloseEvent, this));
        $(this.options.buyableClass).off().on('touchstart.pixelPlot.buyable', $.proxy(this.buyableEvent, this));
      }else{
        $(this.options.dotClass).off().on('mouseenter.pixelPlot', $.proxy(this.pixelHover, this));
        $(this.options.controllerClass).off().on('click.pixelPlot.controller', $.proxy(this.controllerEvent, this));
        $(this.options.buyableCloseClass).off().on('click.pixelPlot.buyableclosc', $.proxy(this.buyableCloseEvent, this));
        $(this.options.buyableClass).off().on('click.pixelPlot.buyable', $.proxy(this.buyableEvent, this));
      }
    },
    pixelHover: function pixelHover(e){
      e.preventDefault();
      if(!$(e.target).is(this.options.buyableClass)){
        this.doChange($(e.target));
      }
    },
    controllerEvent: function controllerEvent(e){
      var $this    = $(e.target),
      opt          = this.options;
      $dots        = $(opt.dotClass).not('.buyable'),
      total        = $dots.length,
      current      = $dots.eq(0);
      currentIndex = $dots.index(current);

      e.preventDefault();
      if($dots.filter('.active').length > 0){
        current = $dots.filter('.active');
        currentIndex = $dots.index(current);
        if($this.is('.controller-prev')){
          currentIndex--;

        }else{
          currentIndex++;
        }
        if(currentIndex >= total){currentIndex = 0;}
        if(currentIndex < 0){currentIndex = total-1;}
        this.doChange($dots.eq(currentIndex));
      }else{
        this.doChange(current);
      }
    },
    buyableEvent: function buyableEvent(e){
      e.preventDefault();
      var $this   = $(e.target),
      data        = $this.data(),
      opt         = this.options;

      $('.buyable-container').fadeIn(this.options.animate);
      $('.buyable-container').find('.spec-image-canvas').html('');
      $('.buyable-container').find('.spec-image-canvas').html('<a class="cloud-zoom" rel="position: \'inside\', useWrapper: false, showTitle: true,adjustY:0, adjustX:0" href="'+data.zoomimg+'"><img id="zoom" src="'+data.img+'" data-zoom-image="'+data.zoomimg+'"></a>');

      setHashWithoutScroll(data.uid);
      $('.buyable-container').find('.spec-detail-content').html($('[data-uid="'+data.uid+'"]').html());
      $('.buyable-container').find('.spec-detail-content').find('.buy-div').remove();

      $('.buyable-container').find('.buynow').data('pid', data.pid);

      $('.cloud-zoom, .cloud-zoom-gallery').CloudZoom();

    var min_h = 0;
    var vbox_left = 0, vbox_right = 0;

    jQuery('.buyable-container .spec-image').css('height', '').each(function(){
        vbox_left = jQuery(this).height();
    });
    jQuery('.buyable-container .spec-detail').css('height', '').each(function(){
        vbox_right = jQuery(this).height();
    });

    min_h = (vbox_left < vbox_right) ? vbox_right : vbox_left;

    if(min_h < 550) { min_h = 550; }
    else { min_h = min_h+10; }
    //$('.buyable-container').css('height', min_h);

    jQuery('.home-spec-container-wrapper').css('height', '').each(function(){
        var bigbox_ht = jQuery(this).height();
        if(min_h != 0 && bigbox_ht<min_h)
        {
            $('.home-spec-container-wrapper').css('height', min_h);
        }
    });

      // dealing with back button
      if ( $('a.cloud-zoom img').height() > $('.buyable-container').height() ) {
        btnBackPos = $('a.cloud-zoom img').height() - $('.buyable-container').height() + 9; // default = 9px
        $('.btn-back').css('bottom', btnBackPos+'px');
      } else {
        $('.btn-back').css('bottom', '9px');
      }
      
    },
    buyableCloseEvent: function buyableEvent(e){
      e.preventDefault();
      var $this = $(e.target),
      data  = $this.data();

      if($('.buyable-container').is(':visible')){
        $('.buyable-container').fadeOut(this.options.animate);
      }
      $('.home-spec-container-wrapper').css('height', 'auto');
      $('.buyable-container').css('height', 'auto');
    },
    doChange: function doChange($this){
      var data  = $this.data();

      if(!$this.is('.active')){
        this.$canvas.find('.dot').removeClass('active');
        $this.addClass('active');

        setHashWithoutScroll(data.uid);
        this.$detail.html($('[data-uid="'+data.uid+'"]').html());
        this.$detail.css('opacity', 0).fadeTo(this.options.animate, 1);
      }
    }
  };
  $.fn.pixelPlot = function (option) {
    return this.each(function () {
      var options = $(this).data() || {};
      (new pixelPlot(this, options)).init();
    });
  }
}(window.jQuery);


!function($){
  $('.home-specification').on('click', '.ps-project-gall-bx-thmb a', function(e){
    e.preventDefault();
    var $pixelData = $('#'+$(this).data('specid')).clone();

    $('.spec-image-data').html($pixelData);
    $('.spec-image-canvas').html('<img src="'+$pixelData.data('image')+'">');
    $('.spec-detail-content').find('.part-name, .part-img, .part-desc').html("");
    $('.home-spec-container').pixelPlot();
    $('.spec-image-canvas').find('img').css('opacity', 0).fadeTo(1500, 1);

    if($('.buyable-container').is(':visible')){
      $('.buyable-container').fadeOut(500);
    } 
    $('.home-spec-container-wrapper').css('height', 'auto');
    $('.buyable-container').css('height', 'auto');
  });
  $('.ps-project-gall-bx-thmb a:first').click();
}(jQuery);


/* call bxSlider */
/*
!function($){

  $('.ps-project-gall-bx').bxSlider({
    controls:false,
    pagerCustom: '.ps-project-gall-bx-thmb'

  });
  $('.ps-project-gall-bx-thmb').bxSlider({
    minSlides: 2,
    maxSlides: 6,
    slideWidth: 163,
    pager:false,
    infiniteLoop:false,
    slideMargin: 29,
        onSliderLoad: function(currentIndex){
            if (document.location.hash.match(/^#id/))
            {
                showBoxItemfromHash (document.location.hash);
            }
        }
  });
}(jQuery);
*/
!function($){
  resize_watch_fn.push(function(){
    if($(window).width() > 767){
      eqh('.spec-image-data .part-name');
      eqh('.spec-image-data .part-desc');
    }else{
      $('.spec-image-data .part-name, .spec-image-data .part-desc, .spec-image-data .pointx').css('min-height', '');
    }
  });
  $(window).resize(resize_watch);
  resize_watch();
}(jQuery);

!function($){
  $('.buy-div .how_to_buy').on('click', function(e){
    e.preventDefault();
    
    $('#ps-how-to-buy-box').modal({show: true});
    $('#step_tab a:first').tab('show');
  });
}(jQuery);

!function($){
  $('.buy-div .buynow').on('click', function(e){
    var data = $(this).data();

    e.preventDefault();

    $('#ps-buynow-box').modal({show: true});
    $('.form-result').hide().html('');
    $('.form-container').show();
    $('.form-container').find('#pid').val(data.pid);
  });

/*
  $('#validate-customer').on('submit', function(e){
    e.preventDefault();
    var action = this.action;
	
    $.ajax({
      url: action,
      cache: false,
      type : 'post',
      data: $(this).serialize(),
      success: function(result){
        $('.form-container').hide();
        $('.form-result').show().html('').html(result);
        if($('.form-result').find('.error').length > 0){
          setTimeout(function(){
            $('.form-result').hide().html('');
            $('.form-container').show();
          }, 3000);
        }
      }
    });
  });
 */
}(jQuery);