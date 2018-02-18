describe("ClearButtonController", function() {
  var clearButtonController;

  beforeEach(function() {
    loadFixtures("indexFixture.html");
    clearButtonController = new ClearButtonController();
  });

  it("should call UI bindings", function() {
    spyOn(clearButtonController, "bindUserInterfaceElements");
    clearButtonController.init();
    expect(clearButtonController.bindUserInterfaceElements).toHaveBeenCalled();
  });

  it("should clear the imageContainer upon clicking the Clear button", function() {
  	//Put elements inside the imageContainer
  	//and set its height to the default image height of 400
  	var testPictureElement;
  	$("#imageContainer").append(testPictureElement);
  	$("#div_register").height(400);

  	//Ensure that clear removes those elements and resets the height
    clearButtonController.handleImageClearButtonClick();
    expect($("#imageContainer").children().length).toBe(0);
    expect($("#imageContainer").height()).not.toBe(400);
  });

  it("should ensure that another controller's methods are called without performing an integration test ", function() {
    spyOn(imageViewController, "animateImageContainerLimitDiv");
    spyOn(imageDAO, "clearImagesFromDirectory");

    clearButtonController.handleImageClearButtonClick();

    expect(imageViewController.animateImageContainerLimitDiv).toHaveBeenCalled();
    expect(imageDAO.clearImagesFromDirectory).toHaveBeenCalled();
  });
});
