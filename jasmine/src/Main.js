/*
 * Phobiq: This controller builds the core objects we need
 * to use Phobiq, such as the blurController. While we aim to 
 * decouple these controllers, whenever there is a dependency between
 * controllers, we pass the dependency in as an argument.
 */

$(document).ready(function() {
	databaseController = new DatabaseController();

    blurController = new BlurController(databaseController);
    blurController.init();

    deleteImageController = new DeleteImageController();

    clearButtonController = new ClearButtonController(deleteImageController);
    clearButtonController.init();

    imageViewController = new ImageViewController();
    imageViewController.init();
});
