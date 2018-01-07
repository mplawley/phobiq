DatabaseController = function() {};

DatabaseController.prototype.request;
DatabaseController.prototype.developmentURL = "http://localhost:8888/dbConnection.php";

DatabaseController.prototype.sendDataToAjaxCall = function (numberOfUnblurStepsThisSession) {
	if (this.request) {
		this.request.abort();
	}

	request = $.ajax({
	    url: this.developmentURL,
	    type: 'POST',
	    data: numberOfUnblurStepsThisSession.toString()
	});

	request.done(function (response, textStatus, jqXHR) {
		console.log("Request is done");
	});

	request.fail(function (jqXHR, textStatus, errorThrown) {
		console.error("The following error occurred: " +
						textStatus, errorThrown
					 );
	});

	request.always(function () {
		console.log("I'm always called :) ");
	})
}
