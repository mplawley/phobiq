/* Phobiq: this controls the Clear button on the blur screen.
 * It is also responsible for calling animations in the div that 
 * contains the frightening images the user wishes to blur.
 */

ClearButtonController = function() {};

//This is called by Main.js
ClearButtonController.prototype.init = function() {
	this.bindUserInterfaceElements();
}

//Bind the clear button to an action.
ClearButtonController.prototype.bindUserInterfaceElements = function() {
	var _this = this;

	$("#clearImagesButton").click(function() {
		_this.handleImageClearButtonClick();
	});
}

//Empty the imageContainer div, animate it to its new size
//and clear out the images loaded on the imageViewController
ClearButtonController.prototype.handleImageClearButtonClick = function() {
	$("#imageContainer").empty();

	$("#imageContainer").animate({
	    height: 400
	}, 600);

	imageViewController.animateImageContainerLimitDiv();

	//Clear out the images that are loaded in the imageViewController
	imageViewController.loadedImages = [];

	//Clear out the images in the user's directory
	imageDAO.clearImagesFromDirectory();
}
