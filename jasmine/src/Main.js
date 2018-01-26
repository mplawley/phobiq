/*
 * Phobiq: This controller builds the core objects we need
 * to use Phobiq, such as the blurController.
 */

$(document).ready(function() {
    blurController = new BlurController();
    blurController.init();

    clearButtonController = new ClearButtonController();
    clearButtonController.init();

    imageViewController = new ImageViewController();
    imageViewController.init();

    databaseController = new DataBaseController();
    databaseController.init();

    loginController = new LoginController();
    loginController.init();
});