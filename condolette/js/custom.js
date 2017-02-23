/* custom JavaScript functionality */

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
  jQuery(selector).css('min-height', '').each(function(){
    min_h = (min_h < jQuery(this).height())?jQuery(this).height():min_h;
  });
  jQuery(selector).css('min-height', min_h);
};

var eqh_fix = function eqh_fix(selector){
  var min_h = 0;
  jQuery(selector).css('height', '').each(function(){
    min_h = (min_h < jQuery(this).height())?jQuery(this).height():min_h;
  });
  jQuery(selector).css('height', min_h);
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

/** simple collapsible menu
*
*/

!function($){
  var $allParents = $('.menu-collapsible').find('.menu-collapsible-sub > a');
  var $allSub = $('.menu-collapsible').find('.menu-collapsible-sub .list-group a, .list-group-item:not(.menu-collapsible-sub) > a');
  $('.menu-collapsible > .list-group-item > a').on('click', function(e){
    e.preventDefault();
    if($(this).parents('.menu-collapsible-sub').length > 0){
      var $curParent = $(this).parents('.menu-collapsible-sub');
      if($(this).is($curParent.find(" > a"))){
        $(this).parents('.menu-collapsible').find('.menu-collapsible-sub').removeClass('js-menu-expanded');
        $(this).parents('.menu-collapsible').find('.menu-collapsible-sub').not($(this).parent()).find('.list-group').slideUp(300);
        
        $(this).parent().find('.list-group').slideDown(300);
        $(this).parent().addClass('js-menu-expanded');
        
        $(this).parents('.menu-collapsible').find('.menu-collapsible-sub .list-group-item').removeClass('active');
        $(this).parents('.menu-collapsible').find('.menu-collapsible-sub .list-group-item ul').hide();
        $(this).parent().find('.list-group-item:first ul').show();
        $(this).parent().find('.list-group-item:first').addClass('active');
        $allSub.removeClass('active');
        $allParents.removeClass('active');
        $(this).addClass('active');
      }else{
        $allSub.removeClass('active');
        $(this).addClass('active');
      }
    }else{
      $('.menu-collapsible').find('.menu-collapsible-sub').removeClass('js-menu-expanded');
      $(this).parents('.menu-collapsible').find('.menu-collapsible-sub').not($(this).parent()).find('.list-group').slideUp(300);

      $allSub.removeClass('active');
      $allParents.removeClass('active');
      $(this).addClass('active');  
    }
    var target = $(this).data('target') || "";
    if(target && !$(target).is(':visible')){
      $('.floorplan-item-wrap').slideUp(300);
      $("html, body").scrollTop($('#active_image').offset().top);
      $(target).slideDown(300);
    }
  });
  $('.menu-collapsible-sub .building').on('click', function(e){
    $(this).parents('.child-floor-plan').find('.list-group-item').removeClass('active');
    $(this).parents('.child-floor-plan').find('.list-group-item').not($(this).parent()).find('ul').slideUp(300);
    $("html, body").scrollTop($('#active_image').offset().top);
    $(this).parent().addClass('active');
    $(this).parent().find('ul').slideDown(300);
  });

  $('.list-group-item a:first').click();
  
}(jQuery);


!function($){
  $('.js-toggle-box').on('click', function(e){
    var $this   = $(this),
        data    = $this.data(),
        $target = $(data.target);

    e.preventDefault();
    $this.toggleClass('active');
    if($target.length > 0){
      $target.slideToggle(500);
    }
  });
}(jQuery);

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


var toggle = function toggle(){
  jQuery('.js-tab-toggle').on('click', function(e){
    var $this   = $(this),
        data    = $this.data(),
        $target = $(data.target),
        group   = data.group || "js-tab-content",
        groupButton = data.groupbutton || "js-tab-toggle",
        parent  = data.parent || "body",
        $parent = $this.parents(parent);

    e.preventDefault();

    if(typeof(data.smooth) != "undefined"){
      if($target.is(':visible')) return true;
      if($parent.find('.'+group).filter(':visible').length > 0){
        $parent.find('.'+group).slideUp(400);
        $parent.find('.'+groupButton).removeClass('active');

        $target.removeClass('hide').hide().slideDown(400);
        $this.addClass('active');
      }else{
        $target.removeClass('hide').hide().slideDown(400);
        $this.addClass('active');
      }

      setTimeout(function(){
        var top = $this.offset().top;
        $('html, body').delay(400).animate({scrollTop: top}, {duration: 400});
      }, 400);
    }else{
      $parent.find('.'+group).addClass('hide');
      $parent.find('.'+groupButton).removeClass('active');

      $target.removeClass('hide');
      $(this).addClass('active');
    }

  });
};

!function($){
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

!function($){
  $thumbs = $('.carousel-thumb');
  if($thumbs.length > 0){
    $('.carousel-thumb').each(function(){
      if($(this).find('.carousel-inner > .item').length === 1){
        $(this).addClass('single-set-thumb');
      }
    });
  }
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
    controls: true,
    mode:'fade',
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


/* finance popup */
!function($){
  $('.js-finance-popup').on('click', function(e){
    e.preventDefault();
//    $('#ps-finance-box').modal({show: true, backdrop: 'static'});
      $('.finance-calc').addClass('hide');
      $('#calc-month').trigger('click');
      $('#ps-finance-box').modal({show: true});
  });
}(jQuery);

!function($){
    $('.btn-calculate').on('click', function(e){
        e.preventDefault();
        //$('.js-tab-toggle').removeClass('active');
        //$('.js-tab-toggle[data-target=#finance-calc-month]').trigger('click');
        $('.finance-calc').addClass('hide');
        $('#calc-month').trigger('click');
        $('#ps-finance-box').modal({show: true});
    });
}(jQuery);

!function($){
    $('.btn-consult').on('click', function(e){
        e.preventDefault();
        //$('.js-tab-toggle').removeClass('active');
        //$('.js-tab-toggle[data-target=#finance-consult-loan]').trigger('click');
        $('.finance-calc').addClass('hide');
        $('#consult-loan').trigger('click');
        $('#ps-finance-box').modal({show: true});
    });
}(jQuery);

var setGoogleMapMarkers = function(map) {
  var markers = [],
      image = {
        url: 'img/condolette/map-icon.png',
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
  eqh('.list-item .caption_wrap');
  eqh('.list-item .caption');
  eqh('.list-item');

  $(window).on('orientationchange', function(){
    eqh('.list-item h3');
    eqh('.list-item .caption_wrap');
    eqh('.list-item .caption');
    eqh('.list-item');
  });
}(jQuery);




function addCommas(nStr)
{
	nStr += '';
	x = nStr.split('.');
	x1 = x[0];
	x2 = x.length > 1 ? '.' + x[1] : '';
	var rgx = /(\d+)(\d{3})/;
	while (rgx.test(x1)) {
		x1 = x1.replace(rgx, '$1' + ',' + '$2');
	}
	return x1 + x2;
}

function calculatePMT()
{
	var pv = document.getElementById('pv').value;
	var rate = document.getElementById('rate').value;
	var nper = document.getElementById('nper').value;
	
	if (pv=='' || pv==0) {
		alert('กรุณากรอก วงเงินกู้');
		return;
	}
	if (nper=='' || nper==0) {
		alert('กรุณากรอก ระยะเวลากู้');
		return;
	}
	
	if (pv!='' && nper!='') {
		
		var i = rate / 1200;
		var n = nper * 12;
		var p = pv;
		var pmt = roundNumber(PMT(i, n, -p),-2);
		
		var baseIncome = pmt / 0.5;
		
		document.getElementById('pmt').value = addCommas(pmt);
		document.getElementById('baseIncome').value = addCommas(baseIncome);		
		
	} else {
		return;	
	}
}

function PMT(i, n, p) {
 	return i * p * Math.pow((1 + i), n) / (1 - Math.pow((1 + i), n));
}

function roundNumber(rnum, rlength) { // Arguments: number to round, number of decimal places
	var newnumber = Math.ceil(rnum * Math.pow(10, rlength)) / Math.pow(10, rlength);
	return newnumber;
}

function resetCalculatePMT()
{
	document.getElementById('pv').value = '';
	document.getElementById('nper').value = '';	
	document.getElementById('pmt').value = '';
	document.getElementById('baseIncome').value = '';		
}

function addCommas(nStr)
{
	nStr += '';
	x = nStr.split('.');
	x1 = x[0];
	x2 = x.length > 1 ? '.' + x[1] : '';
	var rgx = /(\d+)(\d{3})/;
	while (rgx.test(x1)) {
		x1 = x1.replace(rgx, '$1' + ',' + '$2');
	}
	return x1 + x2;
}

function calculateLoans()
{
	var gross = document.getElementById('gross').value;
	var rate2 = document.getElementById('rate2').value;
	var nper2 = document.getElementById('nper2').value;
	
	if (gross=='' || gross==0) {
		alert('กรุณากรอก รายได้ (Gross)');
		return;
	}
	if (nper2==''|| nper2==0) {
		alert('กรุณากรอก ระยะเวลากู้');
		return;
	}
	
	if (gross!='') {
		var paymentRate = roundDownNumber(gross*0.5,-2);
		document.getElementById('paymentRate').value = addCommas(paymentRate);
		
		if (nper2!='') {
			
			var loanLevel = roundDownNumber(pv(rate2,12,nper2*12,-paymentRate,0),-3);
			
			document.getElementById('loanLevel').value = addCommas(loanLevel);
			
		}	
	} else {
		return;	
	}
}

function pv(rate2, per, nper2, pmt, fv)
{
	nper2 = parseFloat(nper2);
	
	pmt = parseFloat(pmt);
	
	fv = parseFloat(fv);
	
	rate2 = eval((rate2)/(per * 100));
	
	if (( pmt == 0 ) || ( nper2 == 0 )) {
	
		//alert("Why do you want to test me with zeros?");
		
		return(0);
	
	}
	
	if ( rate2 == 0 ) // Interest rate is 0
	{
		pv_value = -(fv + (pmt * nper2));
		
	} else {
	
		x = Math.pow(1 + rate2, -nper2);
		
		y = Math.pow(1 + rate2, nper2);
		
		pv_value = - ( x * ( fv * rate2 - pmt + y * pmt )) / rate2;
	
	}
	
	pv_value = conv_number(pv_value,2);
	
	return (pv_value);

}

function conv_number(expr, decplaces)
{ // This function is from David Goodman's Javascript Bible.

	var str = "" + Math.round(eval(expr) * Math.pow(10,decplaces));
	
	while (str.length <= decplaces) {
	
		str = "0" + str;
	
	}
	
	var decpoint = str.length - decplaces;
	
	return (str.substring(0,decpoint) + "." + str.substring(decpoint,str.length));

}

function roundDownNumber(rnum, rlength) { // Arguments: number to round, number of decimal places
	var newnumber = Math.floor(rnum * Math.pow(10, rlength)) / Math.pow(10, rlength);
	return newnumber;
}

function resetCalculatePV()
{
	document.getElementById('gross').value = '';
	document.getElementById('nper2').value = '';	
	document.getElementById('paymentRate').value = '';
	document.getElementById('loanLevel').value = '';		
}

function onlyMoneyInput(evt)
{
	var charCode = (evt.which) ? evt.which : event.keyCode;
	
	if (charCode > 31 && (charCode < 48 || charCode > 57) && charCode != 46) {
		return false;
	} else {
		return true;
	}
}

function onlyNumberInput(evt)
{
	var charCode = (evt.which) ? evt.which : event.keyCode;
	
	if (charCode > 31 && (charCode < 48 || charCode > 57) && charCode != 46) {
		return false;
	} else {
		return true;
	}
}

function validateRecord() 
{
	if (document.getElementById('firstName').value == '') {
		alert('กรุณากรอก ชื่อ');
		return false;
	}
	if (document.getElementById('lastName').value == '') {
		alert('กรุณากรอก นามสกุล');
		return false;
	}
	if (document.getElementById('project_room').value == '') {
		alert('กรุณากรอก ห้อง');
		return false;
	}
	if (document.getElementById('phone').value == '') {
		alert('กรุณากรอก เบอร์ติดต่อ');
		return false;
	}	
	if (trim(document.getElementById('email').value) != '' && !isValidEmail(document.getElementById('email').value)) {
		alert('กรุณาตรวจสอบอีเมล์');
		return false;
	}
	if (document.getElementById('loanMainType').value == '') {
		alert('กรุณาเลือกการเงินที่คุณสนใจ');
		return false;
	}	
	if (document.getElementById('loanSubType').value == '') {
		alert('กรุณาเลือกช่องทาง');
		return false;
	}	
	
	return true;
}

function showSubOption(val)
{
	document.getElementById('loanSubType').value = '';
	document.getElementById('loanSubType_1').selectedIndex = 0;
	document.getElementById('loanSubType_2').selectedIndex = 0;

    $('button[data-id="loanSubType_1"] .filter-option').html(document.getElementById('loanSubType_1')[0].text);
    $('button[data-id="loanSubType_2"] .filter-option').html(document.getElementById('loanSubType_2')[0].text);

    if (val == 'กู้ธนาคาร') {
		$('#subOption1').show();
		$('#subOption2').hide();
	} else if (val == 'โอนเงินสด') {
		$('#subOption1').hide();
		$('#subOption2').show();
	}
}

function selectSubOption(val)
{
    $('#loanSubType-error').hide();
	$('#loanSubType').val(val);
}

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
*/

/* override method required */
/*
if(jQuery.fn.validate){
  var validateCheckable = function( element ) {
    return (/radio|checkbox/i).test(element.type);
  };

  var validateGetLength = function( value, element ) {
    switch( element.nodeName.toLowerCase() ) {
      case "select":
      return $("option:selected", element).length;
      case "input":
      if ( validateCheckable( element) ) {
        return jQuery(element.name).parents('form').find("[name='" + element.name + "']").filter(":checked").length;
      }
    }
    return value.length;
  };
  jQuery.validator.addMethod("required", function(value, element) {
    if ( element.nodeName.toLowerCase() === "select" ) {
      var val = jQuery(element).val();
      return val && val.length > 0;
    }
    if ( validateCheckable(element) ) {
      return validateGetLength(value, element) > 0;
    }
    if($(element).attr("placeholder") != ""){
      return value!=$(element).attr("placeholder");
    }
    return jQuery.trim(value).length > 0;
  });
}
*/
