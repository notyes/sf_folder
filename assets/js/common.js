var $_GET = {};
document.location.search.replace(/\??(?:([^=]+)=([^&]*)&?)/g, function () {
    function decode(s) {
        return decodeURIComponent(s.split("+").join(" "));
    }

    $_GET[decode(arguments[1])] = decode(arguments[2]);
});
if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
    is_mobile = true;
}
function validateEmail(value) {
    return /^([a-z0-9\+_\-]+)(\.[a-z0-9\+_\-]+)*@([a-z0-9\-]+\.)+[a-z]{2,6}$/i.test(value);
}
var $sub = $("input[name='subscribe-email']"), $teaser = $(".ps-teaser"), teaserSlider, ytplayer;
var $home_sm_banner = $(".ps-banner-small"), $home_sm_navigation = $(".ps-banner-navigation-small");
function modal(title, body, closable){
    var closable = typeof closable === 'boolean' ? closable : true;
    var close = (typeof phrase_information_close=='string') ? phrase_information_close:'CLOSE';
    var site_modal = $("#ps-favoriteModal");
    if (site_modal.length) {
	site_modal.find('.modal-header h4').html(title);
	site_modal.find('.modal-body').html(body);
	site_modal.modal({show: true});
    } else {
	BootstrapDialog.show({
	    type:	BootstrapDialog.TYPE_DEFAULT,
	    title: '<h4 class="modal-title"><span class="ff-dbGill-bold ps-Txt-Green">' + title + '</span></h4>',
	    message: body,
	    closable: closable,
	    buttons: closable?[{
		label: close+' <span class="ps-btn-black-reflex"><img src="'+sf_url+'assets/img/btn/reflex.png" width="68" height="28" alt="Close Button"></span>',
		cssClass: 'btn ps-btn-black',
		action: function(dialogItself){
		    dialogItself.close();
		}
	    }]:[]
	});
    }
    
}
Object.size = function(obj) {
    var size = 0, key;
    for (key in obj) {
        if (obj.hasOwnProperty(key)) size++;
    }
    return size;
};
_picked = {};
$(function(){
jQuery.fn.ForceNumericOnly =
    function()
    {
        return this.each(function()
        {
            $(this).keypress(function(e)
            {
                var key = e.which || e.charCode || e.keyCode || 0;
                return (
                    key == 8 ||
                        key == 9 ||
                        key == 13 ||
                        key == 110 ||
                        key == 190 ||
                        (key >= 35 && key <= 40) ||
                        (key >= 48 && key <= 57));
            });
        });
    };

    $("#subscribe-btn").click(function(e){
        e.preventDefault();
        var title = (typeof phrase_information_title=='string') ? phrase_information_title:'Information';
        var $this = $(this), val = $sub.val();
        if(!validateEmail(val))
        {
            $this.parents(".input-group").addClass("has-error");
            $sub.val("").attr("placeholder", invalid_email);
        } else {
            $.post(current_lang=="th"?"/subscribe":"/en/subscribe", {email: val}, function(d){
                modal(title, d);
                $this.parents(".input-group").removeClass("has-error");
                $sub.val("").attr("placeholder", $sub.attr("data-placeholder"));
            });
        }
    });
    /*teaser banner code*/
    if($teaser.length > 0)
    {
        $.post(current_lang=="th"?"/teaser":"/en/teaser", {type: $teaser.attr("data-type")}, function(d){
            $teaser.html(d);
            if(is_mobile) {
                $(".ps-hiSli-call a").attr("href", "tel:1739");
            }
            if($teaser.attr("data-type") == 'pool' && $teaser.find(".ps-hiSli-bx li").length > 1)
            {
                var delay = parseInt($(".ps-hiSli-bx li:first").attr("data-delay"), 10) * 1000;
                teaserSlider = $('.ps-hiSli-bx').bxSlider({
                    controls:false  ,
                    auto:true,
                    speed:1000,
                    pause:delay,
                    pagerCustom: '.ps-hiSli-bx-pager',
                    onSliderLoad: function(currentIndex){
                        var yt = $("#ytplayer");
                        if(yt.length > 0)
                        {
                            yt.html('<iframe frameborder="no" allowfullscreen="" src="'+yt.attr("data-src")+'" class="youtube-player" marginheight="0" marginwidth="0"></iframe>');
                            var h = $(".ps-hiSli-wrap .bx-viewport").height();
                            yt.parent("li").height(h);
                            yt.height(h);
                            yt.find("iframe").height(h);

                            $(window).on("resize orientationchange",function(){
                                var yt = $("#ytplayer");
                                yt.height(0);
                                setTimeout(function(){
                                    var h = 0;
                                    $(".ps-hiSli-wrap .bx-viewport .teaser-img img").each(function(){
                                        if($(this).height() > 0){
                                            h=$(this).height();
                                        }
                                    });
                                    $(".ps-hiSli-wrap .bx-viewport").height(h);
                                    yt.parent("li").height(h);
                                    yt.height(h);
                                    yt.find("iframe").height(h);
                                }, 300);
                            });
                        }
                    },
                    onSlideAfter: function($slideElement, oldIndex, newIndex){
                        var yt = $($slideElement).find("#ytplayer");
                        if(yt.length > 0)
                        {
                            yt.html('<iframe frameborder="no" allowfullscreen="" src="'+yt.attr("data-src")+'" class="youtube-player" marginheight="0" marginwidth="0"></iframe>');
                            var h = $(".ps-hiSli-wrap .bx-viewport").height();
                            yt.parent("li").height(h);
                            yt.height(h);
                            yt.find("iframe").height(h);
                        } else {
                            $("#ytplayer").empty();
                        }
                    },
                    onSlideBefore: function($slideElement, oldIndex, newIndex){
                        var delay = parseInt($($slideElement).attr("data-delay"), 10);
                        if(!delay) delay = 4;
                        delay = delay * 1000;
                        teaserSlider.newPause(delay);
                    }
                 });
            }
            else if($teaser.find(".ps-hiSli-bx li").length > 1)
            {
                $('.ps-hiSli-bx').bxSlider({
                      controls:false    ,
                      auto:true,
                      speed:1000,
                      minSlides: 2,
                      maxSlides: 2,
                      slideWidth: 565,
                      slideMargin: 10,
                      pagerCustom: '.ps-hiSli-bx-pager'
                });
            }else{
				var yt = $("#ytplayer");
				if(yt.length > 0)
				{
					yt.html('<iframe frameborder="no" allowfullscreen="" src="'+yt.attr("data-src")+'" class="youtube-player" marginheight="0" marginwidth="0"></iframe>');
					var h = $(".ps-hiSli-wrap .bx-viewport").height();
					yt.parent("li").height(h);
					yt.height(h);
					yt.find("iframe").height(h);
				}
			}
            
        });
    }
    if(typeof _bn == "object")
    {
        for(var pos in _bn)
        {
            _picked[pos] = {};
            var _len = Object.size(_bn[pos]);
            if(_len > 1)
            {
                var rnd = Math.floor(Math.random() * (_len));
                for(var i in _bn[pos])
                {
                    if(i == rnd)
                    {
                        _picked[pos] = _bn[pos][i];
                    }
                }
            }
            else
            {
                _picked[pos] = _bn[pos][0];
            }
			if(typeof(_picked[pos].gmt_event) !== 'undefined')
			{
				$("#" + pos).html('<a href="'+_picked[pos].link+'" title="'+_picked[pos].name+'" target="_blank" '+_picked[pos].gmt_event+'><img src="'+_picked[pos].img+'" width="'+_picked[pos].w+'" height="'+_picked[pos].h+'" border="0" /></a>');
			}
			else
			{
				$("#" + pos).html('<a href="'+_picked[pos].link+'" title="'+_picked[pos].name+'" target="_blank"><img src="'+_picked[pos].img+'" width="'+_picked[pos].w+'" height="'+_picked[pos].h+'" border="0" /></a>');
			}
		}
    }
    $(".number-only").ForceNumericOnly();
    if(is_mobile) {
		phrase_tel_main = typeof phrase_tel_main == "string" ? phrase_tel_main : "โทร";
        $(".ps-ic-ft-gb-tel-a").wrap('<a href="tel:1739"></a>').css("margin-top", "-20px");
        $(".ps-KS-hd-global-Tel").html('<a href="tel:1739">'+phrase_tel_main+'<strong>1739</strong></a>');
    }
    if(/MSIE [9|8|7|6]/.test(navigator.userAgent)){
        $("textarea[maxlength]").each(function(){
            $(this).bind("keypress paste change blur", function(e){
                var $this = $(this), maxlength = $this.attr('maxlength');
                if (!!maxlength) {
                    var text = $this.val();
                    if(text == undefined) $this.trigger("blur");
                    if (text.length > maxlength) {
                        $this.val(text.substring(0,maxlength));
                        e.preventDefault();
                        return false;
                    }
                }
            });
        });
    }
    function sitesearch(e){
        var q = $("#search-q"), q2 = $("#search-q2"), q3 = $("#search-q3"), v1 = $.trim(q.val()), v2 = $.trim(q2.val()), v3 = $.trim(q3.val());
        if(v1 != ""){
            document.location.href = q.attr("data-target") + "site-search?q=" + encodeURIComponent(v1);
        }
        else if(v2 != ""){
            document.location.href = q2.attr("data-target") + "site-search?q=" + encodeURIComponent(v2);
        }
        else if(v3 != ""){
            document.location.href = q3.attr("data-target") + "pruksaville-search?q=" + encodeURIComponent(v3);
        }
    };
    $(".site-search-btn").click(sitesearch);
    $("#search-q, #search-q2, #search-q3").keypress(function(e){
        if(/13/.test(e.which|| e.KeyCode|| e.CharCode) && this.value != ""){
            sitesearch();
        }
    });

});

$(function(){
	if($(".ps-mobile-btn-share").length > 0)
	{
		$("body").addClass("has-share");
	}
    $("#inqtype_id").change(function(){
        if (this.value == 13 || this.value == 20) {
            $(this).parents("form").find("input,select,textarea,button").attr("disabled", true);
            document.location = global_www + "/sellland";
        }

        /* TPPM-5670: inqtype_id 4 type && 11 SBU only */
        var ArrSite_forRedirect = new Array(16, 49, 29, 24, 7, 28, 20, 23, 18, 22, 12, 51);
        var ArrTypes = new Array(2, 33, 40, 12, 38, 45, 3, 34, 41, 5, 36, 43);
        var set_inqtype = 5;
        var set_lang_url = (current_lang=="th")?"":"/en";

        // เสนอสินค้าหรือบริการ : 2  => 33, 40 (PROD: 53, 67)
        // เสนอให้เช่าป้ายโฆษณา : 12 => 38, 45 (PROD: 63, 77)
        // เสนอสื่อออนไลน์ : 3 =>  34, 41 (PROD: 55, 69)
        // อื่นๆ : 5 =>  36, 43 (PROD: 59, 73)

        // env == 'uat'
        switch (parseInt(this.value)) {
            case 2:    // site 1 - global
            case 33:  // site 22 - theprivacy
            case 40:  // site 23 - fuse
                set_inqtype = 2;
                break;

            case 12:
            case 38:
            case 45:
                set_inqtype = 12;
                break;

            case 3:
            case 34:
            case 41:
                set_inqtype = 3;
                break;

            case 5:
            case 36:
            case 43:
                set_inqtype = 5;
                break;
        }

        if(env == 'prod')
        {
            ArrTypes = new Array(2, 53, 67, 12, 63, 77, 3, 55, 69, 5, 59, 73);

            switch (parseInt(this.value)) {
                case 2:    // site 1 - global
                case 53:  // site 23 - fuse
                case 67:  // site 22 - theprivacy
                    set_inqtype = 2;
                    break;

                case 12:
                case 63:
                case 77:
                    set_inqtype = 12;
                    break;

                case 3:
                case 55:
                case 69:
                    set_inqtype = 3;
                    break;

                case 5:
                case 59:
                case 73:
                    set_inqtype = 5;
                    break;
            }
        }

        if($.inArray(parseInt(site_id), ArrSite_forRedirect) !== -1 ) // found site
        {
            if($.inArray(parseInt(this.value), ArrTypes) !== -1 ) // found type
            {
                $(this).parents("form").find("input,select,textarea,button").attr("disabled", true);
                document.location = global_www + set_lang_url + "/contact-us/other" + "?inqtype_id=" + set_inqtype;
            }
        }
    });

if(typeof social_module_is_active == "boolean")
{

    $("#shareFB").click(function(){
        var shrUrl="http://www.facebook.com/sharer.php?u="+encodeURIComponent(sharetofriend_url);
        window.open(shrUrl,"sharer","toolbar=0,status=0,width=626,height=436");;
    });

    $("#shareTW").click(function(){
        var txtTwitter = sharetofriend_text;
        var shrUrl= "http://twitter.com/intent/tweet?source=sharethiscom&text="+encodeURIComponent(txtTwitter)+"&url="+sharetofriend_url;
        window.open(shrUrl);
    });


    // share to friend
    $.validator.addMethod("multi_email", function(value, element, param) {
        var emails = value.split(","), valid = true;
        for(i=0; i<emails.length; i++){
            if(!/^([a-z0-9\+_\-]+)(\.[a-z0-9\+_\-]+)*@([a-z0-9\-]+\.)+[a-z]{2,6}$/i.test(emails[i])){
                valid=false;
            }
        }
        return valid;
    }, st_valid_multi_email);

    validator = $("#share-to-friends-form").validate({
        submitHandler: function(form){
            $("#share_url").val(sharetofriend_url);
            $("#share_source").val(sharetofriend_source);
            $("#share_type").val(sharetofriend_type);
            $("#share_img").val($('.ps-Promo-Detail .img-fullsize img').attr('src'));

            if($("#project_image").size() > 0 && typeof project_image!="undefined")
            {
                $("#project_image").val(project_image);
            }
            if($("#project_name").size() > 0 && typeof project_name!="undefined")
            {
                $("#project_name").val(project_name);
            }
            if($("#project_price").size() > 0 && typeof project_price!="undefined")
            {
                $("#project_price").val(project_price);
            }
            if($("#project_link").size() > 0 && typeof project_link!="undefined")
            {
                $("#project_link").val(project_link);
            }
            if($("#project_taglink").size() > 0 && typeof project_taglink!="undefined")
            {
                $("#project_taglink").val(project_taglink);
            }
            if($("#project_ads").size() > 0 && typeof project_ads!="undefined")
            {
                $("#project_ads").val(project_ads);
            }
            if($("#project_concept").size() > 0 && typeof project_concept!="undefined")
            {
                $("#project_concept").val(project_concept);
            }
            if($("#project_home_name").size() > 0 && typeof project_home_name!="undefined")
            {
                $("#project_home_name").val(project_home_name);
            }
            if($("#project_home_price").size() > 0 && typeof project_home_price!="undefined")
            {
                $("#project_home_price").val(project_home_price);
            }
            if($("#project_home_url").size() > 0 && typeof project_home_url!="undefined")
            {
                $("#project_home_url").val(project_home_url);
            }
            if($("#project_home_description").size() > 0 && typeof project_home_description!="undefined")
            {
                $("#project_home_description").val(project_home_description);
            }
            if($("#project_home_area").size() > 0 && typeof project_home_area!="undefined")
            {
                $("#project_home_area").val(project_home_area);
            }
            if($("#project_home_picture").size() > 0 && typeof project_home_picture!="undefined")
            {
                $("#project_home_picture").val(project_home_picture);
            }

            $.post(site_url+"sharetofriends", $(form).serialize(), function(d){
                if(d.match(/success/)) {
                    $("#success-data-result").empty().append(sharetofriend_results);
                    $("#success-send-mail").show();
                    $("#share-to-friends-form").hide();
                }
                else {
                    alert(d);
                }
            });

        },
        errorClass: "help-block",
        errorElement: "span",
        highlight:function(element, errorClass, validClass) {
            $(element).parent().removeClass('has-success').addClass('has-error');
        },
        unhighlight: function(element, errorClass, validClass) {
            $(element).parent().removeClass('has-error').addClass('has-success');
        },
        rules: st_rule
        ,
        messages: st_message
    });
}
    //Preload brand menu image
    $(".brand-menu-link").each(function(){
        var $this = $(this), target = $this.attr("data-target");
        $this.find("a").each(function(){
            var $a = $(this),img = $a.attr("data-img");
            if(img != undefined && img != ""){
                var dummy_img = new Image();
                dummy_img.src = img;
                $(this).hover(function(){
                    $(target).attr("src", img).attr("alt", $a.attr("title"));
                });
            }
        });
    })
});

//this is common js

// js for non-responsive page
$( document ).ready( function() {
    var maxwidth = $( document ).width();
    $('.nonRespon .ps-FT-gb-wrap').width(maxwidth);
    $('.nonRespon .ps-bg-gd-Grey-Rp-X').width(maxwidth);
    $('.nonRespon .ps-KS-hd').width(maxwidth);
} );
$(document).on('shown.bs.tab', 'a[data-toggle="tab"]', function (e) {
	if(typeof google == "object" && typeof google.maps == "object" && typeof map == "object"){
		google.maps.event.trigger(map, 'resize');
	}
});