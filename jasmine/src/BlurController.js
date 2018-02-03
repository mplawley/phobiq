/* Phobiq: This controller is responsible for allowing the
 * user to blur and unblur images through two actions:
 *
 * 1. Clicking
 * 2. Dragging the HTML slider element
 *
 * It also is responsible for holding data related to the image blur.
 * This makes it, in part, a data transfer object. If this functionality
 * ever becomes too big, then refactor out state-holding responsibilities.
 *
 * To accomplish the unblurring, this controller
 * uses CSS's default Gaussian blur and modifies that value, 
 * which must be greater than or equal to 0.
 *
 * The idea behind this controller is that a frightening image will be gradually
 * unblurred as the user clicks it, allowing the user to perform an exposure to 
 * that frightening image.
 *
*/

/************************************************
 ******************** STATES ********************
 ************************************************/

BlurController = function() {};

BlurController.prototype.username;
BlurController.prototype.maxBlur;
BlurController.prototype.currentBlur;
BlurController.prototype.blurStep;
BlurController.prototype.blurSlider;
BlurController.prototype.images;
BlurController.prototype.downloadButton;
BlurController.prototype.signOutButton;
BlurController.prototype.userProgressText;

/************************************************
 ****************** BEHAVIORS *******************
 ************************************************/

//The init is called by Main.js.
BlurController.prototype.init = function() {
	this.initializeBlurValues();
	this.bindUserInterfaceElements();
	this.initializeUserInterfaceValues();
}

//Requirements state that our blue should range from 0 - 100.
//If this ever changes, be sure to change the .css values too.
BlurController.prototype.initializeBlurValues = function() {
	this.setMaxBlur(100);
	this.setCurrentBlur(100);
	this.setBlurStep(1);
}

//Bind elements on the web page to actions.
BlurController.prototype.bindUserInterfaceElements = function() {
	var _this = this;
	username = $("#username").text();
	blurSlider = $("#blurSlider");
	images = $("#imageContainer");
	downloadButton = $("#downloadButton");
	signOutButton = $("#signOutButton");
	userProgressText = $("#userProgressText");

	blurSlider.on("input", function() {
		_this.handleBlurSliderInput();
	});

	images.click(function() {
		_this.handleImageClick();
	});

	downloadButton.click(function() {
		_this.handleDownloadButtonClick();
		_this.persistToDatabase();
	});

	signOutButton.click(function() {
		_this.handleSignOutButtonClick();
	});

	//Prevent stray click-and-drags from revealing the image
	images.on('dragstart', function(event) {
		event.preventDefault();
	});
}

//Set values on the HTML elements.
BlurController.prototype.initializeUserInterfaceValues = function() {
	blurSlider.max = this.getMaxBlur();
	blurSlider.step = this.getBlurStep();
}

//Unblur the image and ensure that currentBlur can never be negative
//since the CSS blur value can never be negative.
BlurController.prototype.unblur = function() {
	currentBlur -= blurStep;
	if (currentBlur < 0) {
		currentBlur = 0;
	}
	this.applyCurrentBlur();
}

//Apply a default CSS Gaussian blur.
BlurController.prototype.applyCurrentBlur = function() {
	var _this = this;
	images.css({
    	"-webkit-filter": "blur("+_this.getCurrentBlur()+"px)",
        "filter": "blur("+_this.getCurrentBlur()+"px)"
	});
}

//Allow the slider element to blur and unblur the image
BlurController.prototype.handleBlurSliderInput = function() {
	this.setCurrentBlur(this.getMaxBlur() - blurSlider.val());
	this.applyCurrentBlur();
	this.updateUserClickProgress();
}

//When the user clicks the image, it should unblur and also
//update the slider's position and the user's progress in clicking
//to unblur an image this session.
BlurController.prototype.handleImageClick = function() {
	this.unblur();
	this.updateSliderPosition();
	this.updateUserClickProgress();
}

//Requirements state that we must allow the user to save all data
//locally with a blob. If these requirements ever become more expansive,
//refactor this Controller to allow data transfer and data access
//objects and allow a service layer or something similar handle this functionality.
BlurController.prototype.handleDownloadButtonClick = function() {
    this.saveTextAsFile("Phobiq stats",
    					"User name: " + this.getUsername() + "\n" +
    					"Max blur: " + this.getMaxBlur() + "\n" +
    					"Current blur: " + this.getCurrentBlur() + "\n" +
    					"Blur step: " + this.getBlurStep() + "\n" +
    					"Blur steps taken: " + this.getBlurStepsTaken() + "\n" +
    					"Progress: " + this.calculateRoundedPercentage(this.getBlurStepsTaken(), this.getMaxBlur())
    					);
}

//This is called by handleDownloadButtonClick(). This essentially
//forces a blob download by adding an HTML link, clicking it, and then
//removing itself from the DOM.
BlurController.prototype.saveTextAsFile = function(filename, textToSave) {
	//Create a download link in the browser window.
	var textToSaveAsBlob = new Blob([textToSave], {type:"text/plain"});
    var textToSaveAsURL = window.URL.createObjectURL(textToSaveAsBlob);
    var downloadLink = document.createElement("a");
    downloadLink.download = filename;
    downloadLink.innerHTML = "Download File";
    downloadLink.href = textToSaveAsURL;

    //Add self, click self, then remove self.
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
}

//Go to logout.php when the user signs out.
BlurController.prototype.handleSignOutButtonClick = function() {
	location.href = "logout.php";
}

//Make an AJAX call on the databaseController.
BlurController.prototype.persistToDatabase = function() {
	databaseController.sendDataWithAjaxCall(this);
}

//Move the handle on the slider.
BlurController.prototype.updateSliderPosition = function() {
	blurSlider[0].value = this.getBlurStepsTaken();
}

//Allow the user to see progress this session.
BlurController.prototype.updateUserClickProgress = function() {
	var resultPercentage = this.calculateRoundedPercentage(this.getBlurStepsTaken(), this.getMaxBlur());
	userProgressText.html(resultPercentage + "\%");
}

//Numerator % of denominator.
BlurController.prototype.calculateRoundedPercentage = function(numerator, denominator) {
	return Math.round((numerator / denominator) * 100);
}

/************************************************
 ************ MUTATORS AND ACCESSORS ************ 
 ************************************************/

BlurController.prototype.getUsername = function() {
	return username;
}

BlurController.prototype.setUsername = function(newUsername) {
	username = newUsername;
}

BlurController.prototype.getMaxBlur = function() {
	return maxBlur;
}

BlurController.prototype.setMaxBlur = function(newMaxBlur) {
	maxBlur = newMaxBlur;
}

BlurController.prototype.getCurrentBlur = function() {
	return currentBlur;
}

BlurController.prototype.setCurrentBlur = function(newCurrentBlur) {
	currentBlur = newCurrentBlur;
}

BlurController.prototype.getBlurStep = function() {
	return blurStep;
}

BlurController.prototype.setBlurStep = function(newBlurStepValue) {
	blurStep = newBlurStepValue;
}

//How many times has the user clicked on the image, but also taking
//into account any blur manipulations from the slider. Note
//that Max Blur - Current Blur = How many unblur actions the user has committed.
BlurController.prototype.getBlurStepsTaken = function() {
	return this.getMaxBlur() - this.getCurrentBlur();
}
