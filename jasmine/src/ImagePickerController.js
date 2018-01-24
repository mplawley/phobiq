ImagePickerController = function() {};

ImagePickerController.prototype.init = function() {
	this.bindUserInterfaceElements();
}

ImagePickerController.prototype.bindUserInterfaceElements = function() {
	var _this = this;

	$("#clearImagesButton").click(function() {
		_this.handleImageClearButtonClick();
	});
}

ImagePickerController.prototype.handleImageClearButtonClick = function() {
	$("#imageContainer").empty();

	$("#imageContainer").animate({
	    height: 300
	}, 600);

	imageViewController.animateImageContainerLimitDiv();
}
