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
BlurController.prototype.databaseController;

BlurController.prototype.init = function() {
	this.initializeValues();
	this.bindUserInterfaceElements();
	this.initializeUserInterfaceValues();
	this.databaseController = new DatabaseController();
}

BlurController.prototype.initializeValues = function() {
	this.setMaxBlur(100);
	this.setCurrentBlur(100);
	this.setBlurStep(1);
}

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

BlurController.prototype.initializeUserInterfaceValues = function() {
	blurSlider.max = this.getMaxBlur();
	blurSlider.step = this.getBlurStep();
}

BlurController.prototype.unblur = function() {
	currentBlur -= blurStep;
	if (currentBlur < 0) {
		currentBlur = 0;
	}
	this.applyCurrentBlur();
}

BlurController.prototype.applyCurrentBlur = function() {
	var _this = this;
	images.css({
    	"-webkit-filter": "blur("+_this.getCurrentBlur()+"px)",
        "filter": "blur("+_this.getCurrentBlur()+"px)"
	});
}

BlurController.prototype.handleBlurSliderInput = function() {
	this.setCurrentBlur(this.getMaxBlur() - blurSlider.val());
	this.applyCurrentBlur();
	this.updateUserClickProgress();
}

BlurController.prototype.handleImageClick = function() {
	this.unblur();
	this.updateSliderPosition();
	this.updateUserClickProgress();
}

BlurController.prototype.handleDownloadButtonClick = function() {
    this.saveTextAsFile("Phobiq stats", this.getBlurStepsTaken());
}

BlurController.prototype.handleSignOutButtonClick = function() {
	location.href = "logout.php";
}

BlurController.prototype.persistToDatabase = function() {
	this.databaseController.sendDataWithAjaxCall(this);
}

BlurController.prototype.saveTextAsFile = function(filename, textToSave) {
	var textToSaveAsBlob = new Blob([textToSave], {type:"text/plain"});
    var textToSaveAsURL = window.URL.createObjectURL(textToSaveAsBlob);
    var downloadLink = document.createElement("a");
    downloadLink.download = filename;
    downloadLink.innerHTML = "Download File";
    downloadLink.href = textToSaveAsURL;
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
}

BlurController.prototype.updateSliderPosition = function() {
	blurSlider[0].value = this.getBlurStepsTaken();
}

BlurController.prototype.updateUserClickProgress = function() {
	var resultPercentage = this.calculateRoundedPercentage(this.getBlurStepsTaken(), this.getMaxBlur());
	userProgressText.html(resultPercentage + "\%");
}

BlurController.prototype.calculateRoundedPercentage = function(numerator, denominator) {
	return Math.round((numerator / denominator) * 100);
}

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

BlurController.prototype.getBlurStepsTaken = function() {
	return this.getMaxBlur() - this.getCurrentBlur();
}
