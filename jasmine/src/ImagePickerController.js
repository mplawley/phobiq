ImagePickerController = function() {};

ImagePickerController.prototype.init = function() {
	this.bindUserInterfaceElements();
}

ImagePickerController.prototype.bindUserInterfaceElements = function() {
	var _this = this;

	$("#imagePickerButton").click(function() {
		_this.handleImagePickerButtonClick();
	});

	$("#clearImagesButton").click(function() {
		_this.handleImageClearButtonClick();
	});
}

ImagePickerController.prototype.handleImageClearButtonClick = function() {
	$("#imageContainer").empty();
}

ImagePickerController.prototype.handleImagePickerButtonClick = function() {
	

}

//save images chosen to db automatically