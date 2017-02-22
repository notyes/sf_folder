
function setHashWithoutScroll (hash)
{
    hash = hash.replace( /^#/, '' );
    var fx, node = $( '#' + hash );
    if ( node.length ) {
        node.attr( 'id', '' );
        fx = $( '<div></div>' )
            .css({
                position:'absolute',
                visibility:'hidden',
                top: $(document).scrollTop() + 'px'
            })
            .attr( 'id', hash )
            .appendTo( document.body );
    }
    window.location.hash = hash;
    if ( node.length ) {
        fx.remove();
        node.attr( 'id', hash );
    }
}

function showBoxItemfromHash (hash)
{
    if(hash !='')
    {
        /* trigger for open light box */
        var spec_id = hash.replace('#id', '');
        spec_id = spec_id.split('-');
        $('a[data-specid="spec-'+spec_id[0]+'"]').trigger('click');
        $(hash).trigger('click');

        /* set css for new height */
        var min_h = 0;
        jQuery('.spec-detail').css('height', '').each(function(){
            min_h = (min_h < jQuery(this).height())?jQuery(this).height():min_h;
        });
        if(min_h < 535) min_h = 535;
        else min_h = min_h+30;
        $('.home-spec-container-wrapper').css('height', min_h+50);
        $('.buyable-container').css('height', min_h+20);

        window.scrollTo(0, 0);
    }
}

function collapsed(hash)
{

    if(is_mobile == true){
        $('.collapse').removeClass('in');
        if(hash.match(/^#id/)){
            var tag = hash.replace('#id', '');
            var collapseId = $('div[data-uid="id'+tag+'"] > .panel-collapse')[0].id;
            $('#'+collapseId).collapse('toggle');
            //$('div[data-uid="id'+tag+'"]').find('.panel-collapse').collapse('toggle');
            
        }else{
            /*first collapse when empty hashtag*/
            $('#collapse1').collapse('toggle');
        }
       
    }else{
        $('a[data-parent="#accordion"]').removeClass('accordion-toggle');
    }
}

function autoClosePanelCollapse(){
  $("body").on('click','.panel-heading > a',function(e){
        $('.collapse.in').collapse('hide'); 
    });
}    

