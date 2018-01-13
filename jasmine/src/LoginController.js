LoginController = function() {};

LoginController.prototype.linkLoginButtonToBlurPage = function() {
	_this = this;

	$('#login-button').click(function() {
		_this.handleLoginClick();
	});
}

LoginController.prototype.handleLoginClick = function() {
	window.location='blur.html';
}

$(document).ready(function() {
    loginController = new LoginController();
	loginController.linkLoginButtonToBlurPage();
});