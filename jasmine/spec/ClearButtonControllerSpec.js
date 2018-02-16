describe("ClearButtonController", function() {
  var imagePickerController;

  beforeEach(function() {
    loadFixtures("indexFixture.html");
    clearButtonController = new ClearButtonController();
  });

  it("should call UI bindings", function() {
    spyOn(clearButtonController, "bindUserInterfaceElements");

    clearButtonController.init();
    
    expect(clearButtonController.bindUserInterfaceElements).toHaveBeenCalled();
  });
});
