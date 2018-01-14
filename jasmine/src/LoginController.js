LoginController = function() {};

LoginController.prototype.numberOfLoginAttempts;
LoginController.prototype.request;
LoginController.prototype.developmentLoginURL = "/login.php";
LoginController.prototype.registerPathToHTML = 'register.html';

LoginController.prototype.init = function() {
	this.initializeStates();
	this.linkUserInterfacetoFunctionality();
}

LoginController.prototype.initializeStates = function() {
	this.setNumberOfLoginAttempts(0);
}

LoginController.prototype.linkUserInterfacetoFunctionality = function() {
	_this = this;

	$('#main-login-form').submit(function(event) {
		_this.handleLoginAttempt();
	});
}

LoginController.prototype.handleLoginAttempt = function () {
	_this = this;

	if (this.numberOfLoginAttempts > 10) {
		console.log("Too many login attempts");
		return;
	}

	if (!this.formIsValid()) {
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
		console.log("Request is done: " + response + " textStatus: " + textStatus + " jqXHR: " + jqXHR);
	});

	request.fail(function (jqXHR, textStatus, errorThrown) {
		console.error("The following error occurred: " +
						textStatus, errorThrown, jqXHR
					 );
	});

	request.always(function () {
		_this.incrementNumberOfLoginAttempts();
	});
}

LoginController.prototype.formIsValid = function() {
	if (!this.retrieveSubmittedUserNameFromDOM() || !this.retrieveSubmittedPasswordFromDOM()) {
		console.log("form failed validation");
		return false;
	} else {
		return true;
	}
}

LoginController.prototype.incrementNumberOfLoginAttempts = function() {
	this.numberOfLoginAttempts += 1;
}

LoginController.prototype.setNumberOfLoginAttempts = function(newNumberOfLoginAttempts) {
	this.numberOfLoginAttempts = newNumberOfLoginAttempts;
}

LoginController.prototype.retrieveSubmittedUserNameFromDOM = function() {
	return $("#username").val();
}

LoginController.prototype.retrieveSubmittedPasswordFromDOM = function() {
	return $("#password").val();
}

$(document).ready(function() {
    loginController = new LoginController();
	loginController.linkUserInterfacetoFunctionality();
});