/* ******************************************************
 * *********************** FIELDS ***********************
 * ******************************************************
*/

var blurControllerStates = function() {
	blurValueMax: 60,
	currentBlurValue: 50,
	unblurStep: 1,
	numberOfUnblurStepsThisSession: 0,

	initializeCurrentBlurValue: function() {
		currentBlurValue = blurValueMax;
	},

	decrementCurrentBlurValue: function(currentBlurValue) {
		this.currentBlurValue -= currentBlurValue;

		if (this.currentBlurValue < 0) {
			this.currentBlurValue = 0;
		}
	},

	getNumberOfUnblurStepsThisSession: function() {
		return numberOfUnblurStepsThisSession;
	},

	setNumberOfUnblurStepsThisSession: function(numberOfUnblurStepsThisSession) {
		this.numberOfUnblurStepsThisSession = numberOfUnblurStepsThisSession;
	},

	getUnblurStep: function() {
		return unblurStep;
	}
};

/* ******************************************************
 * *********************** EVENTS ***********************
 * ******************************************************
*/

var blurControllerEvents = function() {
	//On slider input
	$("#blurSlider").on("input", function() {
		blurControllerUtils.modifyBlurValueViaSlider();
	});

	//On images div click
	$("#imageContainer").click(function() {
		blurControllerUtils.modifyBlurValueViaClick();
	});

	//Prevent click and drag of image from HTML page, 
	//or image can be revealed by a stray drag action
	$("#imageContainer").on('dragstart', function(event) { 
		event.preventDefault();
	});

	//Button click event to download stats
	$("#downloadButton").click(function() {
		var numberOfUnblurStepsThisSession = blurControllerStates.getBlurMax() - blurControllerStates.getCurrentBlurValue();
	    blurControllerUtils.saveTextAsFile("Phobiq stats", numberOfUnblurStepsThisSession);
	});
}

/* ******************************************************
 * *********************** METHODS ***********************
 * ******************************************************
*/

var blurControllerUtils = function() {
	modifyBlurValueViaSlider: function() {
		blurControllerStates.setCurrentBlurValue(blurControllerStates.getBlurMax() - $(this).val());
	    applyBlur(blurControllerStates.getCurrentBlurValue());
	}

	modifyBlurValueViaClick: function() {
		var proposedNewBlurValue = blurControllerStates.getCurrentBlurValue() - blurControllerStates.getUnblurStep();
		blurControllerStates.setCurrentBlurValue(proposedNewBlurValue);

		var newBlurValue = blurControllerStates.getCurrentBlurValue();
		applyBlur(newBlurValue);
		updateSliderPosition(newBlurValue);
	}

	applyBlur: function(newBlurValue) {
		images.css({
	    	"-webkit-filter": "blur("+newBlurValue+"px)",
	        "filter": "blur("+newBlurValue+"px)"
		});
	}

	updateSliderPosition: function(newBlurValue) {
		$("#blurSlider")[0].value = blurControllerStates.getBlurMax() - newBlurValue;
	}

	saveTextAsFile: function(filename, textToSave) {
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
	blurControllerStates();
	blurControllerEvents();
	blurControllerUtils();
});