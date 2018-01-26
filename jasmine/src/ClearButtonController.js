/* Phobiq: this controls the Clear button on the blur screen.
 * It is also responsible for calling animations in the div that 
 * contains the frightening images the user wishes to blur.
 */

ClearButtonController = function() {};

ClearButtonController.prototype.init = function() {
	this.bindUserInterfaceElements();
}

ClearButtonController.prototype.bindUserInterfaceElements = function() {
	var _this = this;

	$("#clearImagesButton").click(function() {
		_this.handleImageClearButtonClick();
	});
}

ClearButtonController.prototype.handleImageClearButtonClick = function() {
	$("#imageContainer").empty();

	$("#imageContainer").animate({
	    height: 300
	}, 600);

	imageViewController.animateImageContainerLimitDiv();

	//Clear out the images that are loaded in the imageViewController
	imageViewController.loadedImages = [];
}
