/*
 * Phobiq: this controller is responsible for persisting
 * data to the database. It sends data over to a PHP controller.
 */

DatabaseController = function() {};

DatabaseController.prototype.request; //The AJAX request
DatabaseController.prototype.requestStatus; //Whether the AJAX request succeeded
DatabaseController.prototype.developmentURL = "/dbConnection.php";

DatabaseController.prototype.sendDataWithAjaxCall = function (blurController) {
	//If a request already exists, abort this one.
	if (this.request) {
		this.request.abort();
	}

	//Otherwise, send the POST request.
	request = $.ajax({
	    url: this.developmentURL,
	    type: 'POST',
	    data: { username : blurController.getUsername(),
	    		blurStepsTaken : blurController.getBlurStepsTaken(),
	    		currentBlur : blurController.getCurrentBlur(),
	    		maxBlur : blurController.getMaxBlur(),
	    		blurStep : blurController.getBlurStep() }
	    		//TODO: eventually add heart rate and session duration
	});

	//Notifications...
	request.done(function (response, textStatus, jqXHR) {
		console.log("Request is done: " + response + 
					" textStatus: " + textStatus + 
					" jqXHR: " + jqXHR);
		requestStatus = true;
	});

	request.fail(function (jqXHR, textStatus, errorThrown) {
		console.error("The following error occurred: " +
						textStatus, errorThrown, jqXHR
					 );
		requestStatus = false;
	});
}

DatabaseController.prototype.getRequestStatus = function() {
	return requestStatus;
}