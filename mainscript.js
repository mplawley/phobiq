var BLUR_VALUE_MAX = 40; //Be sure to set in two places in CSS and in HTML slider range too
var UNBLUR_STEP = 1;

var mainUtils = function() {
	var currentBlurValue = BLUR_VALUE_MAX;
	var images = $("#imageContainer");
	var slider = $("#blurSlider");

	//Modify blur value via slider
	slider.on("input", function() {
		currentBlurValue = BLUR_VALUE_MAX - $(this).val();
	    applyBlur(currentBlurValue);
	});

	//Modify blur value towards less blur via clicking the image
	images.click(function() {
		currentBlurValue -= UNBLUR_STEP;

		if (currentBlurValue < 0) {
			currentBlurValue = 0;
		}

		applyBlur(currentBlurValue);
		updateSliderPosition(currentBlurValue);
	});

	function applyBlur(currentBlurValue) {
		images.css({
	    	"-webkit-filter": "blur("+currentBlurValue+"px)",
            "filter": "blur("+currentBlurValue+"px)"
		});
	}

	//Used when the image(s) are clicked
	function updateSliderPosition(currentBlurValue) {
		slider[0].value = BLUR_VALUE_MAX - currentBlurValue;
	}

	//Prevent click and drag of image from HTML page, or image can be revealed by a stry drag
	images.on('dragstart', function(event) { event.preventDefault(); });

	//Button click event to download stats
	$('#downloadButton').click(function() {
		var numberOfUnblurStepsThisSession = BLUR_VALUE_MAX - currentBlurValue;
	    saveTextAsFile("Phobiq stats", numberOfUnblurStepsThisSession);
	});

	//Blob save
	function saveTextAsFile(filename, textToSave){
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

$(document).ready(mainUtils);