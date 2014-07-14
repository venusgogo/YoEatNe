	var lats = 35.226603, lngs = 128.682166;
	var useraddr;
	var watchID = null;
	
// 	function setaddress(){
//		var latlng = new google.maps.LatLng(lats, lngs);

//		var geocoder =  new google.maps.Geocoder();

//		geocoder.geocode({
//			'latLng':latlng}, function(results,status){
//				console.log('현제 주소 : ' + results[1].formatted_address);
//				useraddr = results[1].formatted_address;
//				alert('현제 주소 : ' + useraddr + ' (를)을 사용합니다.');
//				});
//		alert('선택된 날짜 : ' +	$("#meetDay").val());
//		}
var map;
var markers = [];
var contentString = '안녕하세요'
var getlat = new Array();
var getlng = new Array();
var watchID = null;
var pos = null;
function initialize() {
	var latlng = new google.maps.LatLng(lats, lngs);
	parse_codenet();
	var mapOptions = {
		zoom : 17,
		center : latlng
	};

	map = new google.maps.Map(document.getElementById('map_canvas'),
			mapOptions);
	addMarker(latlng);

	google.maps.event.addListener(map, 'idle', function() {
		var bounds = map.getBounds();
		var endLo = bounds.getNorthEast();
		var startLo = bounds.getSouthWest();
		addMarke(startLo, endLo);
	});

	google.maps.event.addListener(map, 'zoom_changed', function() {
		var bounds = map.getBounds();
		var endLo = bounds.getNorthEast();
		var startLo = bounds.getSouthWest();
		addMarke(startLo, endLo);
	});

	google.maps.event.addListener(map, 'dragend', function() {
		var bounds = map.getBounds();
		var endLo = bounds.getNorthEast();
		var startLo = bounds.getSouthWest();
		addMarke(startLo, endLo);
	});

}

function loadScript() {
	var script = document.createElement('script');
	script.type = 'text/javascript';
	script.src = 'https://maps.googleapis.com/maps/api/js?v=3.exp&sensor=true&'
			+ 'callback=initialize';
	document.body.appendChild(script);
	
	var options = { enableHighAccuracy: true,
			timeout: 30000 };
    watchID = navigator.geolocation.watchPosition(onSuccess, onError, options);
}
$('#map_page').live("pageshow", function() {
	console.log('재실행');
	loadScript();
	//parse_codenet();
});


function addMarker(location) {
	var markicon = "http://google-maps-icons.googlecode.com/files/walking-tour.png";
	var marker = new google.maps.Marker({
		position : location,
		map : map,
		icon : markicon
	});
	console.log('현제위치 마커생성');
}

function chasePos() {
	pos = {
			enableHighAccuracy:true,
			  maximumAge:0,
			  timeout           : 10000
	};
	watchID = navigator.geolocation.watchPosition(onSuccessWatch, onError, pos);
	console.log('위치 추적 시작');
}
function onSuccessWatch(position)
{
	alert('위치 추적 성공');
	var element = document.getElementById('geolocation');
	element.innerHTML = 'Latitude: ' + position.coords.latitude + '<br />'
			+ 'Longitude: ' + position.coords.longitude + '<br />'
			+ '<hr />' + element.innerHTML;
	addMarker(position);

}

	
function stopchase() {
	watchID = null;
	pos.enableHighAccuracy = false;
	navigator.geolocation.clearWatch(watchID);
	
	var element = document.getElementById('geolocation');
	element.innerHTML = '위치 추적 종료';
}
function addMarke(start, end) {
	for (var i = 0; i < getlat.length; i++) {
		var location = new google.maps.LatLng(getlat[i], getlng[i]);

		var marker = new google.maps.Marker({
			position : location,
			map : map,

		});
		markers.push(marker);

	}

}

function onSuccess(position) {

	lats = position.coords.latitude;
	lngs = position.coords.longitude;
	console.log("초기 좌표 설정 완료" + position);

}

$('#login').bind("click", function(event) {
	console.log("로긴");
});



function onError(error) {
	alert('code: ' + error.code + '\n' + 'message: ' + error.message + '\n');
}