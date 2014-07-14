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