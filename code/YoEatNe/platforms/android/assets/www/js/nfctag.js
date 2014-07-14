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