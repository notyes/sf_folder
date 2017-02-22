
var map;
var marker;
var geocoder;
var initPos;

try{
	 initPos = new google.maps.LatLng(__COORDINATE.split(',')[0],__COORDINATE.split(',')[1]);
}catch(e){
	initPos = new google.maps.LatLng(15.368451100519781,100.581779525);
}

var infowindowArray = [];
var markersArray = [];
var dataObjs = [{ lat: initPos.lat(), lng: initPos.lng(), img: '', desc: '', title: '' }];

gm={
    init: function () {
        var _this = this;
        google.maps.Map.prototype.markers = new Array();

        google.maps.Map.prototype.addMarker = function(marker) {
            this.markers[this.markers.length] = marker;
        };

        google.maps.Map.prototype.getMarkers = function() {
            return this.markers
        };

        google.maps.Map.prototype.clearMarkers = function() {
            for (var i = 0; i < this.markers.length; i++) {
                this.markers[i].setMap(null);
            }
            this.markers = new Array();
        };
        //End Google map intial
        
        geocoder = new GClientGeocoder();
        map = new google.maps.Map(document.getElementById("map_canvas"), {
            draggable: true,
            zoom: 6,
            center: initPos,
            mapTypeId: google.maps.MapTypeId.ROADMAP,
            //overviewMapControl : true,
            zoomControl : true,
            panControl : false,
            streetViewControl : false,
            mapTypeControl : true,
            raiseOnDrag: false
        });

        $.each(dataObjs, function (i, o) {
            _this.addMarker(o);
        });

        google.maps.event.addListener(map, 'click', function (res) {
            //_this.addNewMarker(res.latLng);
        });

    },
    addNewMarker: function (position) {
        var _this = this;
        var marker = new google.maps.Marker({
            map: map,
            position: position,
            //animation: google.maps.Animation.DROP,
            draggable: false,
            title: "lat : " + position.lat() + ' long : ' + position.lng()
        });
		map.addMarker(marker);
        var infowindow = new google.maps.InfoWindow({ content: '<span style="color:red;"> lat : ' + position.lat() + ' long : ' + position.lng() + '</span>', maxWidth: 10 });
        infowindowArray.push(infowindow);
        _this.addMarkerEvent(marker, infowindow);
        //_this.addInfoWindowEvent(infowindow);
    },
    addMarker: function (obj) {
        var _this = this;
        var position = new google.maps.LatLng(obj.lat, obj.lng);
        var marker = new google.maps.Marker({
            map: map,
            position: position,
            //icon : obj.img,
            animation: google.maps.Animation.DROP,
            draggable: false,
            title: obj.title
        });
		map.addMarker(marker);
        var html = '<div style="position:relative; width:175px;"> <span >' + obj.desc + ' <br/> <a href="javascript:void(0);" onclick="alert(\'xxxx\'); return false;" style="float:right;">xx</a> </span></div>';
        var infowindow = new google.maps.InfoWindow({ content: html, size: new google.maps.Size(500, 150) });
        
        infowindowArray.push(infowindow);
        _this.addMarkerEvent(marker, infowindow);
        //_this.addInfoWindowEvent(infowindow);

    },
    addMarkerEvent: function (marker, infowindow) {
		
        google.maps.event.addListener(marker, 'click', function (res) {
            $(infowindowArray).each(function (i, o) {
                o.close();
            });
            //infowindow.open(map, marker);
        });
		
        google.maps.event.addListener(marker, 'rightclick', function (res) {
            //alert(res.latLng);
        });
		
        google.maps.event.addListener(marker, 'dblclick', function (res) {
            var zoom = map.getZoom();
            map.setOptions({ center: res.latLng, zoom: ++zoom });
        });
        
        google.maps.event.addListener(marker, 'dragend', function (res) {
			var lat = res.latLng.lat();
			var lng = res.latLng.lng();
           //document.title= 'lat : ' + lat + ' lng : ' + lng;
        });
    },
    addInfoWindowEvent: function (infowindow) {
        google.maps.event.addListener(infowindow, 'closeclick', function () {

        });

        google.maps.event.addListener(infowindow, 'domready', function () {

        });
    },
    search : function(){
		var _this =this;
		var key = $('#txt-search').val();
        geocoder.getLatLng(
          key,
          function(point) {
            if (!point) {
              alert("ไม่เจอสถานที่ ที่ต้องการค้นหา");
            } else {
//				map.setOptions({
//					zoom: 18,
//					mapTypeId: google.maps.MapTypeId.HYBRID
//				});
				var pos = new google.maps.LatLng(point.lat(), point.lng());
				map.clearMarkers();
//				var marker = new google.maps.Marker({
//					map: map,
//					position: pos,
//					animation: google.maps.Animation.DROP,
//					draggable: true,
//					title: key
//				});
				_this.addNewMarker(pos);
				map.panTo(pos);
//				map.addMarker(marker);
              //map.setCenter(point, 15);
              //var marker = new GMarker(point);
              //map.addOverlay(marker);
              //marker.openInfoWindowHtml(address);
            }
          }
        );
		
    }
};

$(document).ready(function () {
	
    gm.init();
    
    $('#btn-goto').click(function () {
        var pos = new google.maps.LatLng('15.35675978956506 ', '103.76634667916949');
        map.setOptions({
            zoom: 18,
            mapTypeId: google.maps.MapTypeId.HYBRID
        });
        map.panTo(pos);
    });

    $('#btn-getzoom').click(function () {
        alert(map.getZoom());
    });
    
    $('#btn-search').click(function(){
		gm.search();
		return false;
    });

});
