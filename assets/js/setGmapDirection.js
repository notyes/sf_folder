var isMobile = {
    Android: function() {
        return navigator.userAgent.match(/Android/i);
    },
    BlackBerry: function() {
        return navigator.userAgent.match(/BlackBerry/i);
    },
    iOS: function() {
        return navigator.userAgent.match(/iPhone|iPad|iPod/i);
    },
    Opera: function() {
        return navigator.userAgent.match(/Opera Mini/i);
    },
    Windows: function() {
        return navigator.userAgent.match(/IEMobile/i);
    },
    any: function() {
        return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows());
    }
};
/* for reset direction */
var directionsDisplay = null;
var curentMarker = null;
var curentLatitude = null;
var curentLongitude = null;

/* For Location on project concept */
$( "body" ).delegate('#pruksa-direction',"click", function() {
    var latitude = myLatlng.G;
    var longitude = myLatlng.K;
    if ( isMobile.Android() ) {
        window.open('google.navigation:q='+latitude+','+longitude+'&mode=d', '_system');  
    }
    else if(isMobile.iOS()){
        //var url = "comgooglemapsurl://maps.google.com/maps?f=d&sll="+lat+","+lng;
        //var url = "comgooglemaps://?saddr="+lat+","+lng;
        //var url = "https://www.google.com/maps/dir/13.7321084,100.5765234/"+latitude+","+longitude; 
        //var url = "maps://maps.apple.com/?daddr="+latitude+","+longitude;
        var url = "comgooglemaps://?q="+latitude+","+longitude+"&directionsmode=driving";
        window.open(url);   
    }else{
      setDirection(map,myLatlng);
    }
});

/* For Location on serch map */
$( "body" ).delegate('.direction-serch',"click", function() {
    var lat = $(this).attr('data-lat');
    var lng = $(this).attr('data-lng');
    if ( isMobile.Android() ) {
        window.open('google.navigation:q='+lat+','+lng+'&mode=d', '_system');
    }
    else if(isMobile.iOS()){
        //var url = "comgooglemapsurl://maps.google.com/maps?f=d&sll="+lat+","+lng;
        //var url = "comgooglemaps://?saddr="+lat+","+lng;
        //var url = "https://www.google.com/maps/dir/"+curentLatitude+","+curentLongitude+"/"+lat+","+lng; 
        var url = "comgooglemaps://?q="+lat+","+lng+"&directionsmode=driving";
        window.open(url);   
    }else{
      setDirection(map,new google.maps.LatLng(lat,lng));
    }
});

function setDirection(map,latlng){
    
    var directionsService = new google.maps.DirectionsService();

    if(directionsDisplay != null){
        directionsDisplay.setMap(null);
    }

    directionsDisplay = new google.maps.DirectionsRenderer();
    directionsDisplay.setMap(map);
    directionsDisplay.setOptions({
        suppressMarkers:true,
        polylineOptions: {
            strokeWeight: 4,
            strokeOpacity: 1,
            strokeColor:  'red' 
        }
    });
    if(curentLatitude == null && curentLongitude == null){
         if(navigator.geolocation) {
         navigator.geolocation.getCurrentPosition(function(position) {
           curentLatitude = position.coords.latitude;                    
           curentLongitude = position.coords.longitude;    

           var request = {
               origin:  new google.maps.LatLng(curentLatitude,curentLongitude),
               destination: latlng,
               travelMode: google.maps.DirectionsTravelMode.DRIVING
             };

           directionsService.route(request, function (response, status) {
             if (status == google.maps.DirectionsStatus.OK) {
               directionsDisplay.setDirections(response);
             }
           });

          
          new google.maps.Marker({
                position: new google.maps.LatLng(curentLatitude,curentLongitude),
                map: map,
                title: '',
                html: ''
          });
           
          }, function() {
            handleNoGeolocation(true);
          });

      } else {
          // Browser doesn't support Geolocation
          handleNoGeolocation(false);
      }
    }else{

      var request = {
         origin:  new google.maps.LatLng(curentLatitude,curentLongitude),
         destination: latlng,
         travelMode: google.maps.DirectionsTravelMode.DRIVING
       };
       
       directionsService.route(request, function (response, status) {
          if (status == google.maps.DirectionsStatus.OK) {
             directionsDisplay.setDirections(response);
           }
       });

    }
   infos[0].close();
}

/* Custom google map info windows on Search By Map page*/
function googleMapInfoCustom(){
  var iwOuter = $('.gm-style-iw');
  var iwBackground = iwOuter.prev();
  iwBackground.css({'z-index' : 1});
  iwBackground.children(':nth-child(2)').css({'display' : 'none'});
  iwBackground.children(':nth-child(4)').css({'display' : 'none'});  

  return null; 
}