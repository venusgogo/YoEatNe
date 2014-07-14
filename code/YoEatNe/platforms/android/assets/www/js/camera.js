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