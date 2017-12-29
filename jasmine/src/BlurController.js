BlurController = function() {};

BlurController.prototype.maxBlur;
BlurController.prototype.currentBlur;
BlurController.prototype.blurStep;
BlurController.prototype.blurSlider;
BlurController.prototype.images;
BlurController.prototype.downloadButton;

BlurController.prototype.init = function() {
	this.initializeValues();
	this.bindUserInterfaceElements();
	this.initializeUserInterfaceValues(); //TODO: complete
}

BlurController.prototype.initializeValues = function() {
	maxBlur = 100;
	currentBlur = 100;
	blurStep = 1;
}

BlurController.prototype.bindUserInterfaceElements = function() {
	var _this = this;
	blurSlider = $("#blurSlider");
	images = $("#imageContainer");
	downloadButton = $('#downloadButton');

	blurSlider.on("input", function() {
		_this.handleBlurSliderInput();
	});

	images.click(function() {
		_this.handleImageClick();
	});

	downloadButton.click(function() {
		_this.handleDownloadButtonClick();
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
}

BlurController.prototype.handleImageClick = function() {
	this.unblur();
	this.updateSliderPosition();
}

BlurController.prototype.handleDownloadButtonClick = function() {
	var numberOfUnblurStepsThisSession = this.getMaxBlur() - this.getCurrentBlur();
    this.saveTextAsFile("Phobiq stats", numberOfUnblurStepsThisSession);
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
	blurSlider[0].value = this.getMaxBlur() - this.getCurrentBlur();
}

BlurController.prototype.getMaxBlur = function() {
	return maxBlur;
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
