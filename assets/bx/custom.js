$(document).ready(function(){
    $('.bxslider').each(function(){
        $(this).bxSlider({
            auto: $(this).children().length > 1
        });
    });
});