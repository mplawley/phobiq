BlurController = function() {};

BlurController.prototype.maxBlur;
BlurController.prototype.currentBlur;
BlurController.prototype.blurStep;
BlurController.prototype.blurSlider;
BlurController.prototype.images;

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
	var me = this;
	blurSlider = $("#blurSlider");
	images = $("#imageContainer");

	blurSlider.on("input", function() {
		me.setCurrentBlur(me.getMaxBlur() - blurSlider.val());
		me.applyCurrentBlur();
	});

	images.click(function() {
		me.unblur();
		me.updateSliderPosition();
	});

	//Prevent stray click-and-drags from revealing the image
	images.on('dragstart', function(event) {
		event.preventDefault();
	});

	$('#downloadButton').click(function() {
		var numberOfUnblurStepsThisSession = me.getMaxBlur() - me.getCurrentBlur();
	    me.saveTextAsFile("Phobiq stats", numberOfUnblurStepsThisSession);
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
	var me = this;
	images.css({
    	"-webkit-filter": "blur("+me.getCurrentBlur()+"px)",
        "filter": "blur("+me.getCurrentBlur()+"px)"
	});
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
