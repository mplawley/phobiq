/*
 * Phobiq: This controller builds the core objects we need
 * to use Phobiq, such as the blurController. While we aim to 
 * decouple these controllers, whenever there is a dependency between
 * controllers, we inject the dependency through the constructor 
 * argument.
 */

$(document).ready(function() {
	databaseController = new DatabaseController();

    blurController = new BlurController(databaseController);
    blurController.init();

    clearButtonController = new ClearButtonController();
    clearButtonController.init();

    imageViewController = new ImageViewController();
    imageViewController.init();

    loginController = new LoginController();
    loginController.init();
});