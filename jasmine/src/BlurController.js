BlurController = function() {};

BlurController.prototype.maxBlur;
BlurController.prototype.currentBlur;
BlurController.prototype.blurStep;
BlurController.prototype.blurSlider;
BlurController.prototype.images;

BlurController.prototype.initializeValues = function() {
	maxBlur = 100;
	currentBlur = 100;
	blurStep = 1;
}

BlurController.prototype.bindUserInterfaceElements = function() {
	slider = $("#imageSlider");
	images = $("#imageContainer");

	slider.on("input", function() {
		unblur();
	});

	images.click(function() {
		unblur();
		updateSliderPosition();
	});

	//Prevent stray click-and-drags from revealing the image
	images.on('dragstart', function(event) { 
		event.preventDefault();
	});

	$('#downloadButton').click(function() {
		var numberOfUnblurStepsThisSession = getMaxBlur() - getCurrentBlur();
	    saveTextAsFile("Phobiq stats", numberOfUnblurStepsThisSession);
	});
}

BlurController.prototype.unblur = function() {
	currentBlur -= blurStep;
	if (currentBlur < 0) {
		currentBlur = 0;
	}
	applyBlur(currentBlur);
}

BlurController.prototype.applyBlur = function() {
	images.css({
    	"-webkit-filter": "blur("+currentBlurValue+"px)",
        "filter": "blur("+currentBlurValue+"px)"
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
	slider[0].value = getCurrentBlur();
}

BlurController.prototype.getMaxBlur = function() {
	return maxBlur;
}

BlurController.prototype.getCurrentBlur = function() {
	return currentBlur;
}

BlurController.prototype.getBlurStep = function() {
	return blurStep;
}



