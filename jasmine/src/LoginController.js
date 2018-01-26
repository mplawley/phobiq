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

//Init is called by Main.js
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
	this.incrementNumberOfLoginAttempts();

	if (this.numberOfLoginAttempts > this.allowedNumberOfLogins) {
		this.addListItemToErrorList("Too many login attempts");
		return;
	}

	if (!this.loginFormIsValid()) {
		this.addListItemToErrorList("Missing or invalid inputs");
		return;
	}
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
	numberOfLoginAttempts += 1;
}

LoginController.prototype.setNumberOfLoginAttempts = function(newNumberOfLoginAttempts) {
	numberOfLoginAttempts = newNumberOfLoginAttempts;
}

LoginController.prototype.retrieveSubmittedUserNameFromDOM = function() {
	return $("#username").val();
}

LoginController.prototype.retrieveSubmittedPasswordFromDOM = function() {
	return $("#password").val();
}

