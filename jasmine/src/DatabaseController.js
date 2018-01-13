DatabaseController = function() {};

DatabaseController.prototype.request;
DatabaseController.prototype.developmentURL = "http://localhost:8888/dbConnection.php";

DatabaseController.prototype.sendDataToAjaxCall = function (blurController) {
	if (this.request) {
		this.request.abort();
	}

	request = $.ajax({
	    url: this.developmentURL,
	    type: 'POST',
	    data: { blurStepsTaken : blurController.getBlurStepsTaken(),
	    		currentBlur : blurController.getCurrentBlur(),
	    		maxBlur : blurController.getMaxBlur(),
	    		blurStep : blurController.getBlurStep() }
	});

	request.done(function (response, textStatus, jqXHR) {
		console.log("\nRequest is done: " + response + " textStatus: " + textStatus + " jqXHR: " + jqXHR);
	});

	request.fail(function (jqXHR, textStatus, errorThrown) {
		console.error("The following error occurred: " +
						textStatus, errorThrown, jqXHR
					 );
	});

	request.always(function () {
		
	});
}