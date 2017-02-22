(function($) {
	$.fn.jRating = function(op) {
		var defaults = {
			bigStarsPath : 'jquery/icons/stars.png', // path of the icon stars.png
			phpPath : 'php/jRating.php', // path of the php file jRating.php
			step:false, // if true,  mouseover binded star by star,
			isDisabled:false, // if true, user could not rate
			canRateAgain : false, // if true, the user could rates {nbRates} times with jRating.. Default, 1 time
			sendRequest: false, // send values to server
			length:5, // number of star to display
			decimalLength : 0, // number of decimals.
			rateMax : 5, // maximal rate - integer from 0 to 9999 (or more)
			nbRates : 1,
			onSuccess : null, // Fires when the server response is ok
			onError : null, // Fires when the server response is not ok
			onClick: null // Fires when clicking on a star
		};

		if(this.length>0)
		return this.each(function() {
			/*vars*/
			var opts = $.extend(defaults, op),
			newWidth = 0,
			starWidth = 0,
			starHeight = 0,
			bgPath = '',
			hasRated = false,
			globalWidth = 0,
			nbOfRates = opts.nbRates;

			if($(this).hasClass('jDisabled') || opts.isDisabled)
				var jDisabled = true;
			else
				var jDisabled = false;

			starWidth = 23; // width of the picture stars.png
			starHeight = 20; // height of the picture stars.png
			bgPath = opts.bigStarsPath;
			$(this).height(starHeight);

			var average = parseFloat($(this).attr('data-average')), // get the average of all rates
			idBox = parseInt($(this).attr('data-id')), // get the id of the box
			widthRatingContainer = starWidth*opts.length, // Width of the Container
			widthColor = average/opts.rateMax*widthRatingContainer, // Width of the color Container

			quotient =
			$('<div>',
			{
				'class' : 'jRatingColor',
				css:{
					width:widthColor
				}
			}).appendTo($(this)),

			average =
			$('<div>',
			{
				'class' : 'jRatingAverage',
				css:{
					width:0,
					top:- starHeight
				}
			}).appendTo($(this)),

			 jstar =
			$('<div>',
			{
				'class' : 'jStar',
				css:{
					width:widthRatingContainer,
					height:starHeight,
					top:- (starHeight*2),
					background: 'url('+bgPath+') repeat-x'
				}
			}).appendTo($(this));


			$(this).css({width: widthRatingContainer,overflow:'hidden',zIndex:1,position:'relative'});
			if(!jDisabled){
				$(this).off().on("mouseover", function(e){
					$(this).css('cursor','pointer');
				}).on("mouseout", function(){
					$(this).css('cursor','default');
					if(hasRated) average.width(globalWidth);
					else average.width(0);
				}).on("mousemove", function(e){
					var realOffsetLeft = findRealLeft(this);
					var relativeX = e.pageX - realOffsetLeft;
					if(opts.step) newWidth = Math.floor(relativeX/starWidth)*starWidth + starWidth;
					else newWidth = relativeX;
					average.width(newWidth);
				}).on("click", function(e){
                    var element = this;
					/*set vars*/
					hasRated = true;
					globalWidth = newWidth;
					nbOfRates--;

					if(!opts.canRateAgain || parseInt(nbOfRates) <= 0) $(this).unbind().css('cursor','default').addClass('jDisabled');

					e.preventDefault();
					var rate = getNote(newWidth);
					average.width(newWidth);
					if(opts.onClick) opts.onClick( element, rate );

					if(opts.sendRequest) {
						$.post(opts.phpPath,{
								idBox : idBox,
								rate : rate,
								action : 'rating'
							},
							function(data) {
								if(!data.error)
								{
									if(opts.onSuccess) opts.onSuccess( element, rate );
								}
								else
								{
									if(opts.onError) opts.onError( element, rate );
								}
							},
							'json'
						);
					}
				});
			}
			function getNote(relativeX) {
				var noteBrut = parseFloat((relativeX*100/widthRatingContainer)*parseInt(opts.rateMax)/100);
				var dec=Math.pow(10,parseInt(opts.decimalLength));
				var note = Math.round(noteBrut*dec)/dec;
				return note;
			};
			function findRealLeft(obj) {
			  if( !obj ) return 0;
			  return obj.offsetLeft + findRealLeft( obj.offsetParent );
			};
		});

	}
})(jQuery);
