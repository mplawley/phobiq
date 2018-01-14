RegisterController = function() {};

RegisterController.prototype.request;
RegisterController.prototype.developmentRegisterURL = "/register.php";

RegisterController.prototype.init = function() {
	this.initializeStates();
	this.linkUserInterfacetoFunctionality();
}

RegisterController.prototype.linkUserInterfacetoFunctionality = function() {
	_this = this;

	$("#register-form").submit(function(event) {
		_this.handleRegistrationCompletion();
		_this.deactivateLoginForm();
	});
}

RegisterController.prototype.handleRegistrationCompletion = function () {
	if (this.request) {
		this.request.abort();
	}
	
	request = $.ajax({
	    url: this.developmentRegisterURL,
	    type: 'POST',
	    data: { username : this.retrieveSubmittedUserNameFromDOM(),
	    		password : this.retrieveSubmittedPasswordFromDOM(),
	    		confirmed_password: this.retrieveSubmittedConfirmedPasswordFromDOM() }
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

	});
}

RegisterController.prototype.formIsValid = function() {
	if (!this.retrieveSubmittedUserNameFromDOM() || !this.retrieveSubmittedPasswordFromDOM()) {
		console.log("form failed validation");
		return false;
	} else {
		return true;
	}
}

RegisterController.prototype.retrieveSubmittedUserNameFromDOM = function() {
	return $("#username").val();
}

RegisterController.prototype.retrieveSubmittedPasswordFromDOM = function() {
	return $("#password").val();
}

RegisterController.prototype.retrieveSubmittedConfirmedPasswordFromDOM = function() {
	return $("#confirmed-password").val();
}


RegisterController.prototype.deactivateLoginForm = function() {
	$("#username").attr('disabled', 'disabled');
	$("#password").attr('disabled', 'disabled');
}

$(document).ready(function() {
    RegisterController = new RegisterController();
	RegisterController.linkUserInterfacetoFunctionality();
});
