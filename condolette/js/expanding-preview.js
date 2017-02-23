
/**
* @fileoverview ExpandedPreview
* @requires jQuery
*/

!function ($){
  var defaults = {
    expandedclass: 'js-expanding-preview-container',
    parentclass: 'list-item'
  };
  var connection = false;
  var expandingPreview = function (element, options){
    this.$element   = $(element),
    this.$container = false,
    this.$parent    = false,
    this.options    = $.extend({}, defaults, options);
  };
  expandingPreview.prototype = {
    init: function(){
      var opt = this.options;

      this.$parent = this.$element.parents('.'+opt.parentclass);
      if(this.$parent.find('.'+opt.expandedclass).length == 0){
        this.$container = $('<div class="'+opt.expandedclass+'"></div>').css({'height': 0, 'overflow': 'hidden'});
        this.$parent.append(this.$container);

        this.$element.on('click.expanding.preview', $.proxy(this._clickHandler,this));
        
        this.$container.on('open.expanding.preview', $.proxy(this._open,this));
        this.$container.on('opened.expanding.preview', $.proxy(this._opened,this));

        this.$container.on('close.expanding.preview', $.proxy(this._close,this));
        this.$container.on('closed.expanding.preview', $.proxy(this._closed,this));
      }
    },
    fixProtocol: function(url){ /* fix url prevent accessing none secure content from https */


      return (url.indexOf("http:") === 0 && document.location.protocol == "https:")?url.replace("http:", "https:"):url;
    },
    _clickHandler: function(e){
      var opt       = this.options,
          targeturl = e.currentTarget.href;

      e.preventDefault();

      if(connection){connection.abort();}

      if($('.'+opt.expandedclass+':visible').length > 0){
        $('.'+opt.expandedclass).trigger('close.expanding.preview');
        return false;
      }
      this.$container.trigger('loading.expanding.preview');

      connection = $.ajax({
        url: targeturl,
        cache: false,
        success: $.proxy(this._loadSuccess, this),
        error: $.proxy(this._loadFail, this)
      });
    },
    _loadSuccess: function(html){
      this.$container.removeClass('loading');
      this.$container.html(html).trigger('open.expanding.preview');
    },
    _loadFail: function(){

    },
    _open: function(){
      var height = this.$container.data('height') || 0;

      if(height === 0){
        height = this.$container.find('.expanded-content').height();
        this.$container.data('height', height);
      }

      this.$container.css('display', 'block').animate({height: height}, {duration: 400}, function(){
        $(this).trigger('opened.expanding.preview');
      });
    },
    _opened: function(){

    },
    _close: function(){
      this.$container.animate({height: 0}, {duration: 400}, function(){
        $(this).trigger('closed.expanding.preview');
      });
    },
    _closed: function(){
      var opt = this.options;

      this.$container.hide();
      this.$container = $('<div class="'+opt.expandedclass+'"></div>');
    },
    renderBox: function (banners){
      var opt = this.options;
    }
  };
  $.fn.expandingPreview = function (option) {
    return this.each(function () {
      var options = $(this).data() || {};
      (new expandingPreview(this, options)).init();
    });
  };
  $('.js-expanding-preview').expandingPreview();
}(window.jQuery);
