LoginController = function() {};

LoginController.prototype.linkLoginButtonToBlurPage = function() {
	_this = this;

	$('#login-button').click(function() {
		_this.handleLoginClick();
	});
}

LoginController.prototype.handleLoginSuccess = function() {
	window.location='blur.html';
}

LoginController.prototype.request;
LoginController.prototype.developmentURL = "http://localhost:8888/login.php";

LoginController.prototype.sendDataWithAjaxCall = function () {
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



$(document).ready(function() {
    loginController = new LoginController();
	loginController.linkLoginButtonToBlurPage();
});