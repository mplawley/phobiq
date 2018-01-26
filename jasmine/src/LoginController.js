/*
 * This controller allows the user to login and register
 * It stores user information in the database and requires
 * that the user have a unique username. This controller also
 * handles errors that occur during login and registration.
 */

LoginController = function() {};

LoginController.prototype.numberOfLoginAttempts = 0;
LoginController.prototype.allowedNumberOfLogins = 10;

//Init is called by Main.js
LoginController.prototype.init = function() {
	this.linkUserInterfacetoFunctionality();
}

LoginController.prototype.linkUserInterfacetoFunctionality = function() {
	_this = this;

	$('#login-button').click(function() {
		_this.handleLoginAttempt();
	});
}

//Allow the user to login and guard against too many login attempts
//Build up an error list and output it later
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

//If the login form is valid, get the username and password
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