LoginController = function() {};

LoginController.prototype.numberOfLoginAttempts;
LoginController.prototype.request;
LoginController.prototype.developmentLoginURL = "/login.php";

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
	});
}

LoginController.prototype.handleLoginAttempt = function () {
	_this = this;

	if (this.numberOfLoginAttempts > 10) {
		this.addListItemToErrorList("Too many login attempts");
		return;
	}

	if (!this.formIsValid()) {
		this.addListItemToErrorList("Missing or invalid inputs");
		return;
	}

	if (this.request) {
		this.addListItemToErrorList("Request already made; wait and try again.");
		this.request.abort();
	}
	
	request = $.ajax({
	    url: this.developmentLoginURL,
	    type: 'POST',
	    data: { username : this.retrieveSubmittedUserNameFromDOM(),
	    		password : this.retrieveSubmittedPasswordFromDOM() }
	});

	request.done(function (response, textStatus, jqXHR) {
		if (response.contains)
		console.log("Request is done: " + response + " textStatus: " + textStatus + " jqXHR: " + jqXHR);
	});

	request.fail(function (jqXHR, textStatus, errorThrown) {
		_this.addListItemToErrorList("Communication with server failed.");
		console.error("The following error occurred: " +
						textStatus, errorThrown, jqXHR
					 );
	});

	request.always(function () {
		_this.incrementNumberOfLoginAttempts();
	});
}

LoginController.prototype.formIsValid = function() {
	return this.retrieveSubmittedUserNameFromDOM() &&
		   this.retrieveSubmittedPasswordFromDOM();
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

LoginController.prototype.addListItemToErrorList = function(errorItem) {
	$("#errorList").append("<li>" + errorItem + "</li>");
}

$(document).ready(function() {
    loginController = new LoginController();
	loginController.linkUserInterfacetoFunctionality();
});