/**
* jquery.matchHeight-min.js v0.5.2
* http://brm.io/jquery-match-height/
* License: MIT
*/
(function(e){e.fn.matchHeight=function(t){if("remove"===t){var n=this;this.css("height","");e.each(e.fn.matchHeight._groups,function(e,t){t.elements=t.elements.not(n)});return this}if(1>=this.length)return this;t="undefined"!==typeof t?t:!0;e.fn.matchHeight._groups.push({elements:this,byRow:t});e.fn.matchHeight._apply(this,t);return this};e.fn.matchHeight._apply=function(t,n){var s=e(t),o=[s];n&&(s.css({display:"block","padding-top":"0","padding-bottom":"0","border-top-width":"0","border-bottom-width":"0",height:"100px"}),o=r(s),s.css({display:"","padding-top":"","padding-bottom":"","border-top-width":"","border-bottom-width":"",height:""}));e.each(o,function(t,n){var r=e(n),s=0,o=r.parents().add(r).filter(":hidden");o.css({display:"block"});r.each(function(){var t=e(this);t.css({display:"block",height:""});t.outerHeight(!1)>s&&(s=t.outerHeight(!1));t.css({display:""})});o.css({display:""});r.each(function(){var t=e(this),n=0;"border-box"!==t.css("box-sizing")&&(n+=i(t.css("border-top-width"))+i(t.css("border-bottom-width")),n+=i(t.css("padding-top"))+i(t.css("padding-bottom")));t.css("min-height",s-n)})});$(".xhide_box").hide();return this};e.fn.matchHeight._applyDataApi=function(){var t={};e("[data-match-height], [data-mh]").each(function(){var n=e(this),r=n.attr("data-match-height");t[r]=r in t?t[r].add(n):n});e.each(t,function(){this.matchHeight(!0)})};e.fn.matchHeight._groups=[];e.fn.matchHeight._throttle=80;var t=-1,n=-1;e.fn.matchHeight._update=function(r){if(r&&"resize"===r.type){r=e(window).width();if(r===t)return;t=r}-1===n&&(n=setTimeout(function(){e.each(e.fn.matchHeight._groups,function(){e.fn.matchHeight._apply(this.elements,this.byRow)});n=-1},e.fn.matchHeight._throttle));$(".xhide_box").hide()};e(e.fn.matchHeight._applyDataApi);e(window).bind("load resize orientationchange",e.fn.matchHeight._update);var r=function(t){var n=null,r=[];e(t).each(function(){var t=e(this),s=t.offset().top-i(t.css("margin-top")),o=0<r.length?r[r.length-1]:null;null===o?r.push(t):1>=Math.floor(Math.abs(n-s))?r[r.length-1]=o.add(t):r.push(t);n=s});return r},i=function(e){return parseFloat(e)||0}})(jQuery);

$( document ).ready( function() {
	/* Call script match height  */
	$('.list-items,.eqh-container').each(function() {
	    $(this).find('.eqh-col').matchHeight();
	});
	/* Manually trigger an update */
	$('.js-tab-toggle ,[id^=load-more],[id^=loadmore]').on( "click", function() {
	    $.fn.matchHeight._update();
	});
});