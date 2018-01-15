LoginController = function() {};

LoginController.prototype.numberOfLoginAttempts = 0;
LoginController.prototype.allowedNumberOfLogins = 10;

LoginController.prototype.init = function() {
	this.linkUserInterfacetoFunctionality();
}

LoginController.prototype.linkUserInterfacetoFunctionality = function() {
	_this = this;

	$('#login-button').click(function() {
		_this.handleLoginAttempt();
	});
}

LoginController.prototype.handleLoginAttempt = function () {
	this.incrementNumberOfLoginAttempts();

	if (this.numberOfLoginAttempts > this.allowedNumberOfLogins) {
		this.addListItemToErrorList("Too many login attempts");
		return;
	}

	if (!this.formIsValid()) {
		this.addListItemToErrorList("Missing or invalid inputs");
		return;
	}
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