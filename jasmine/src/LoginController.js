/*
 * Phobiq: While an HTMl form sends basic login data to 
 * the server, this controller guides the user
 * throughout the login process.
 */

 /************************************************
 ******************** STATES ********************
 ************************************************/

LoginController = function() {};

LoginController.prototype.numberOfLoginAttempts = 0;
LoginController.prototype.allowedNumberOfLogins = 10;

/************************************************
 ******************* BEHAVIORS ******************
 ************************************************/

//Init is called by document.ready in this script
LoginController.prototype.init = function() {
	this.linkUserInterfacetoFunctionality();
}

//Event bindings
LoginController.prototype.linkUserInterfacetoFunctionality = function() {
	_this = this;

	$('#login-button').click(function() {
		_this.handleLoginAttempt();
	});
}

//Allow the user to login and guard against too many login attempts
//Build up an error list and output it later
LoginController.prototype.handleLoginAttempt = function () {
	//TODO: If we ever need to validate data or guard against attacks
	//We could do it here
}

//Append an error to a div element as a list item one at a time
LoginController.prototype.addListItemToErrorList = function(errorItem) {
	$("#errorList").append("<li>" + errorItem + "</li>");
}

//The form is valid if the user has filled in a username and password...
//This returns whether this form has done so. If either condition is missing,
//this will return false.
LoginController.prototype.loginFormIsValid = function() {
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

$(document).ready(function() {
	loginController = new LoginController();
	loginController.init();
});
