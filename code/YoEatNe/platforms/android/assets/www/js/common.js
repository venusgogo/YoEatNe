/**
 * 
 */

	function onBackKeyDown() {
       navigator.notification.confirm('종료하시겠습니까?', onConfirm, '종료', ['종료', '취소']);
	}
		
	function onConfirm(button) { 
		if(button == 1) {
        	navigator.app.exitApp();
      	}
 	} 
	
	function goToLoginPage() {
		
	}
	
	function panelInit() {
		 $.ajax({
	 			type : "POST",
	 			url : "ajax/panel.html",
	 			dataType : "html",
	 			success : function(data) {
	 				$("#mypanel").html(data).trigger("create");
	 				
	 				if( $("#isLoggedIn").val() == "true" ) {
						$("#btnLogin").remove();
	 				} else {
	 					$("#btnLogout").remove();
	 				}
	 				$("#list").listview("refresh");
	 			}
	 		});
	}
		
	function login() {
		console.log("=======++++++++ Login");
		
		$.ajax({
			type : "POST",
			url : "http://www.yoeatne.com/appLogin.php",
			dataType : "html",
			data : $("#frmLogin").serialize(),
			success : function(data) {	
				if(data == "success") {
							 		
					$.ajax({
		 				type : "POST",
		 				data : "user_id=" + $("#user_id").val(),
		 				dataType : "html",
		 				url : "http://www.yoeatne.com/ajax_get_token.php",
		 				success : function(data) {
	 						$("#id").val($("#user_id").val());
		 					$("#token").val(data);		 					
							db.transaction(populateDB, errorCB, successCB);
		 				}
		 			});
					
					$("#message").html("<p style='color:green;font-weight:bold'>로그인 성공!</p>");					
 					window.location.replace('main.html');
					
				} else if(data == "empty") {
					$("#message").html("<p style='color:red'>아이디 또는 비밀번호가 잘못되었습니다.</p>");					
				} else {
					$("#message").html("");
					navigator.notification.alert(data);	
				}
				
			},
			error : function(data) {
				console.log("===== Login Error!");
			}
		});
		
		$("isLoggedIn").val("true");
	}
	
	
	function logout() {
		db.transaction(deleteDB, errorCB, deleteSuccess);
		window.location.replace('main.html');
		$("isLoggedIn").val("false");
	}
		
	function deleteDB(tx) {
		var id = $("#id").val();
		tx.executeSql("DROP TABLE IF EXISTS yoeatne");
// 			tx.executeSql("DELETE FROM yoeatne WHERE id=?", [id], successCB, errorCB);
// 			tx.executeSql("UPDATE yoeatne SET id='', token='' WHERE id=?", [id], successCB, errorCB);
	}

	//function will be called when an error occurred
	function errorCB(err) {
//		alert("Error processing SQL: "+err.code);
	}
	
	function deleteSuccess() {
//		alert("Delete Succeeded!");
	}
	
	function insertSuccess() {
//    	alert("Insert Succeeded!");
    }
	
  
	
	function goToMain() {
		$.ajax({
 			type : "POST",
 			url : "ajax/main.html",
 			dataType : "html",
 			success : function(data) {
 				$("#contents").html(data);
 				$("#headers").find("h1").text("Main Page"); 				
 			},
 			error : function() {
 				alert("Failed");
 			}
 		});
	}
	
	
	
  	




/*	GPS	START	*/
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
//$('#map_page').live("pageshow", function() {
//	console.log('재실행');
//	loadScript();
//	//parse_codenet();
//});


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
/*	GPS	END	*/



/*	CAMERA START	*/

var pictureSource; // picture source
var destinationType; // sets the format of returned value


function onPhotoDataSuccess(imageData) {

	var smallImage = document.getElementById('smallImage');

	smallImage.style.display = 'block';

	smallImage.src = "data:image/jpeg;base64," + imageData;
}

function onPhotoURISuccess(imageURI) {
	// Uncomment to view the image file URI
	// console.log(imageURI);

	// Get image handle
	//
	var largeImage = document.getElementById('largeImage');

	// Unhide image elements
	//
	largeImage.style.display = 'block';

	// Show the captured photo
	// The in-line CSS rules are used to resize the image
	//
	largeImage.src = imageURI;
}

// A button will call this function
//
function capturePhoto() {
	navigator.camera.getPicture(onPhotoDataSuccess, onFail, {
		quality : 50,
		destinationType : destinationType.DATA_URL
	});
}

// A button will call this function
//
function capturePhotoEdit() {
	// Take picture using device camera, allow edit, and retrieve image as base64-encoded string
	navigator.camera.getPicture(onPhotoDataSuccess, onFail, {
		quality : 20,
		allowEdit : true,
		destinationType : destinationType.DATA_URL
	});
}

// A button will call this function
//
function getPhoto(source) {
	navigator.camera.getPicture(onPhotoURISuccess, onFail, {
		quality : 50,
		destinationType : destinationType.FILE_URI,
		sourceType : source
	});
}

function onFail(message) {
	alert('Failed because: ' + message);
}
/*	CAMERA END	*/



/*	NFC START	*/
//NFC 스티커에 앱실행을 위한 데이터 입력.
function writeTag(nfcEvent) {

	var mimeType = "application/gettestnfc", //이걸로 앱 실행
	payload = "임의의 값", record = ndef.mimeMediaRecord(mimeType, nfc
			.stringToBytes(payload));

	nfc.write([ record ], function() {
		alert("정상적으로 쓰기가 동작하였습니다 : " + mimeType);

	}, function(reason) {
		console.log("There was a problem");
	});
}
//NFC의 활성화를 알아보는 함수
var ready = function() {

	function win() {
		console.log("Listening for NDEF tags");
	}
	function fail() {
		alert('not ready NFC! Failed to register NFC Listener');
	}
	nfc.addNdefListener(writeTag, win, fail);
};
//NFC 스티커 읽기 시작 함수
var read = function() {
	console.log("NFC 태그 읽기 시작");
	nfc.addNdefListener(nfcTagDetected);

};
// NFC 스티커를 읽어들이는 함수
function nfcTagDetected(nfcEvent) {

	var tag = nfcEvent.tag, ndefMessage = tag.ndefMessage;

	console.log(JSON.stringify(ndefMessage));
	alert(nfc.bytesToString(ndefMessage[0].payload));
	nfc.removeNdefListener(nfcTagDetected);

}

// 아직 구현되지 않았습니다. (NFC 스티커 초기화를 위한 함수)
function initNFC() {
	console.log('삭제중입니다');
	function win() {
		console.log("삭제가 완료됬습니다.");
	}

	function fail() {
		alert('삭제 실패');
	}
	nfc.erase(win, fail);
}
/*	NFC END	*/


/*	QR CODE START	*/
// QR코드 스캔 테스트
function scans() {
	cordova.plugins.barcodeScanner.scan(function(result) {
		alert("We got a barcode\n" + "Result: " + result.text + "\n"
				+ "Format: " + result.format + "\n" + "Cancelled: "
				+ result.cancelled);
	}, function(error) {
		alert("Scanning failed: " + error);
	});
}

// QR코드 생성 테스트
function encode() {
	var data = "www.naver.com";
	function success() {
		console.log("ok");
	}
	function fail() {
		alert('fail');
	}
	cordova.plugins.barcodeScanner.encode("TEXT_TYPE", "www.naver.com",
			success, fail);
}
/*	QR CODE END	*/


















