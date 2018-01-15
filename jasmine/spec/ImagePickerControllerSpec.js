describe("Test ImagePicker logic", function() {
  var imagePickerController;

  beforeEach(function() {
    loadFixtures("indexFixture.html");
    imagePickerController = new ImagePickerController();
  });

  it("should call UI bindings", function() {
    spyOn(imagePickerController, "bindUserInterfaceElements");

    imagePickerController.init();
    
    expect(imagePickerController.bindUserInterfaceElements).toHaveBeenCalled();
  });
});
