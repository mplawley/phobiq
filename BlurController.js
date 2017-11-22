/* ******************************************************
 * *********************** EVENTS ***********************
 * ******************************************************
*/

var blurControllerEvents = function() {
	//On slider input
	$("#blurSlider").on("input", function() {
		BlurController.modifyBlurValueViaSlider();
	});

	//On images div click
	$("#imageContainer").click(function() {
		BlurController.modifyBlurValueViaClick();
	});

	//Prevent click and drag of image from HTML page, 
	//or image can be revealed by a stray drag action
	$("#imageContainer").on('dragstart', function(event) { 
		event.preventDefault();
	});

	//Button click event to download stats
	$("#downloadButton").click(function() {
		var numberOfUnblurStepsThisSession = BLUR_VALUE_MAX - currentBlurValue;
	    BlurController.saveTextAsFile("Phobiq stats", numberOfUnblurStepsThisSession);
	});
}

/* ******************************************************
 * *********************** METHODS ***********************
 * ******************************************************
*/

var blurControllerMethods = function() {

}



	function BlurController() {
		var blurValueMax = 40; //Be sure to set in two places in CSS and in HTML slider range too
		var currentBlurValue;
		var unblurStep = 1;
		var images;
		var slider;
	};

	BlurController.prototype.getBlurMax = function() {
		return BlurController.blurValueMax;
	};

	BlurController.prototype.setCurrentBlurValue = function(currentBlurValue) {
		this.currentBlurValue = currentBlurValue;
	}

	BlurController.prototype.getCurrentBlurValue = function() {
		return currentBlurValue;
	}

	BlurController.prototype.modifyBlurValueViaSlider = function() {
		BlurController.setCurrentBlurValue(BlurController.getBlurMax() - $(this).val());
	    BlurController.applyBlur(BlurController.getCurrentBlurValue());
	}

	BlurController.prototype.modifyBlurValueViaClick = function() {
		currentBlurValue -= unblurStep;

		if (currentBlurValue < 0) {
			currentBlurValue = 0;
		}

		applyBlur(currentBlurValue);
		updateSliderPosition(currentBlurValue);
	}

	BlurController.prototype.applyBlur = function(currentBlurValue) {
		images.css({
	    	"-webkit-filter": "blur("+currentBlurValue+"px)",
	        "filter": "blur("+currentBlurValue+"px)"
		});
	}

	BlurController.prototype.updateSliderPosition = function(currentBlurValue) {
		slider[0].value = blurValueMax - currentBlurValue;
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


}



/* ******************************************************
 * *********************** INIT ***********************
 * ******************************************************
*/

$(document).ready(function() {
	BlurController = new BlurController();
	BlurController.setCurrentBlurValue(BlurController.getBlurMax());
	events();
});