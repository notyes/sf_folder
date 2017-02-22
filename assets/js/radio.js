!function ($) {
	var defaults = {
	}
	var RadioButton = function (element, options) {
		this.$element = $(element),
		this.options = $.extend({}, defaults, options);
	};
	RadioButton.prototype = {
		init : function (){
			if(this.$element.data('radio') != 1){
				this.$element.data('radio', 1);
				this.$element.wrap('<span class="button-checkbox bootstrap-radio"></span>');
				this.$element.wrap('<button class="btn clearfix btn-link" type="button"></button>');
				this.$element.css({opacity:'0'});
				this.$element.parents('.btn-link').append('<span class="icon cb-icon-check"></span><span class="icon cb-icon-check-empty"></span>');
				this.$element.parents('.btn-link').on('click', this.clickEvent);
				if(this.$element.is(":checked")){
					this.$element.parents('.btn-link').addClass('checked');
					this.$element.parents('.btn-link').find('input[type=radio]').attr('checked', true);
				}
			}
		},
		clickEvent: function(e){
			e.preventDefault();
			var $this   = $(this),
				  $radio = $this.find('input[type=radio]'),
				  $form   = $this.parents('form'),
				  name   = $radio.attr('name');
			$form.find('input[type=radio][name='+name+']').each(function(){
				$(this).removeAttr('checked');
				$(this).parents('.btn-link').removeClass('checked');
			});
			
			$radio.prop('checked', true);
			$this.addClass('checked');
		}
	};
	$.fn.RadioButton = function (option) {
		return this.each(function () {
			var options = $(this).data() || {};
			(new RadioButton(this, options)).init();
		})
	}
}(window.jQuery);