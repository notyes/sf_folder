 
var map;
var marker;
var geocoder;
var initPos = new google.maps.LatLng(lat_bk, long_bk);
var initZoom = 6;      
if(typeof(zoom) != "undefined" && zoom !== null) {
   var initZoom = zoom;
}
var infowindowArray = [];
var markersArray = [];
var dataObjs = [{ lat: initPos.lat(), lng: initPos.lng(), img: '', desc: '', title: ''}];
var lat_active = 13.7522222;
var long_active= 100.4938889;
gm={
    init: function () {
        var _this = this;

        //Begin Google map intial
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

        geocoder = new google.maps.Geocoder();
        //End Google map intial

        map = new google.maps.Map(document.getElementById("map_canvas"), {
            draggable: true,
            zoom: initZoom,
            center: initPos,
            mapTypeId: google.maps.MapTypeId.ROADMAP,
            //overviewMapControl : true,
            zoomControl : true,
            panControl : true,
            streetViewControl : false,
            mapTypeControl : true,
            raiseOnDrag: true
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
            draggable: true,
            title: "lat : " + position.lat() + ' long : ' + position.lng()
        });
       $('#pos-lat').html(position.lat());
       $('#pos-lng').html(position.lng());
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
            draggable: true,
            title: obj.title
        });
       
       $('#pos-lat').html(obj.lat);
       $('#pos-lng').html(obj.lng);
		
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
			lat_active = lat;
			long_active = lng;
           $('#pos-lat').html(lat);
           $('#pos-lng').html(lng);
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
		var key = $('#search_area').val();
		
		geocoder.geocode({ 'address': key }, function (results, status) 
		{
			if (status == google.maps.GeocoderStatus.OK) 
			{
				var location = results[0].geometry.location;
				lat_active = location.lat().toString().substr(0, 12);
				long_active = location.lng().toString().substr(0, 12);
				
				var pos = new google.maps.LatLng(lat_active, long_active);
				map.clearMarkers();
				map.setOptions({
					zoom: 10
				});
				_this.addNewMarker(pos);
				map.panTo(pos);
			}
			else alert("ไม่เจอสถานที่ ที่ต้องการค้นหา");
		});
    },
    initObject : function(){
		var _this =this;
		$('#search_area').val('');
		map.clearMarkers();
		_this.addNewMarker(initPos);
		map.panTo(initPos);
    }
};

$(document).ready(function () {
	
    gm.init();

    $('#btn-search_area').click(function(){
		gm.search();
		return false;
    });

	$('#search_area').keydown(function(e){
		if(e.which == 13){
			gm.search();
		}
	});
	
	$('#btn-reset').click(function(){
		gm.initObject();
	});

});
