DeleteImageController = function() {};
DeleteImageController.prototype.request;
DeleteImageController.prototype.url = "/delete-images.php";

DeleteImageController.prototype.clearImagesFromDirectory = function() {
	//If a request already exists, abort this one.
	if (this.request) {
		this.request.abort();
	}

	//Otherwise, send the POST request.
	request = $.ajax({
	    url: this.url,
	    type: 'POST'
	});

	//Notifications...
	request.done(function (response, textStatus, jqXHR) {
		console.log("Request is done: " + response + 
					" textStatus: " + textStatus + 
					" jqXHR: " + jqXHR);
	});

	request.fail(function (jqXHR, textStatus, errorThrown) {
		console.error("The following error occurred: " +
						textStatus, errorThrown, jqXHR
					 );
	});
}