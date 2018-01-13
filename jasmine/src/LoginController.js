LoginController = function() {};

LoginController.prototype.numberOfLoginAttempts;
LoginController.prototype.request;
LoginController.prototype.developmentLoginURL = "http://localhost:8888/login.php";

LoginController.prototype.init = function() {
	this.initializeStates();
	this.linkUserInterfacetoFunctionality();
}

LoginController.prototype.initializeStates = function() {
	this.setNumberOfLoginAttempts(0);
}

LoginController.prototype.linkUserInterfacetoFunctionality = function() {
	_this = this;

	$('#login-button').click(function() {
		_this.handleLoginAttempt();
		_this.deactivateLoginForm();
	});
}

LoginController.prototype.handleLoginAttempt = function () {
	_this = this;

	this.incrementNumberOfLoginAttempts();

	if (this.numberOfLoginAttempts > 10) {
		console.log("Too many login attempts");
		return;
	}

	if (this.request) {
		this.request.abort();
	}

	request = $.ajax({
	    url: this.developmentLoginURL,
	    type: 'POST',
	    data: { username : this.retrieveSubmittedUserNameFromDOM(),
	    		password : this.retrieveSubmittedPasswordFromDOM() }
	});

	request.done(function (response, textStatus, jqXHR) {
	});

	request.fail(function (jqXHR, textStatus, errorThrown) {
		console.error("The following error occurred: " +
						textStatus, errorThrown, jqXHR
					 );
	});

	request.always(function () {
	});
}

LoginController.prototype.handleLoginSuccess = function() {
	window.location='blur.html';
}

LoginController.prototype.incrementNumberOfLoginAttempts = function() {
	this.numberOfLoginAttempts += 1;
}

}

$(document).ready(function() {
    loginController = new LoginController();
	loginController.linkUserInterfacetoFunctionality();
});