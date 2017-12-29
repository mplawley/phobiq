describe("Test BlurController functionality", function() {
  var blurController;

  beforeEach(function() {
    blurController = new BlurController();
    blurController.initializeValues();
    blurController.bindUserInterfaceElements();
    blurController.initializeUserInterfaceValues();
  });

  it("should be able to initialize BlurController values", function() {
    var expectedMaxBlur = 100;
    var expectedCurrentBlur = 100;
    var expectedBlurStep = 1;

    expect(expectedMaxBlur).toEqual(blurController.getMaxBlur());
    expect(expectedCurrentBlur).toEqual(blurController.getCurrentBlur());
    expect(expectedBlurStep).toEqual(blurController.getBlurStep());
  });

	it("should be able to decrement currentBlur by blurStep", function() {
		var actualMaxBlur = blurController.getMaxBlur();
    var actualCurrentBlur = blurController.getCurrentBlur();
    var actualBlurStep = blurController.getBlurStep();

    blurController.unblur();

    var expectedValue = actualCurrentBlur - actualBlurStep;
    expect(expectedValue).toEqual(blurController.getCurrentBlur());
	});

  it("should be able to set the currentBlur directly", function() {
    blurController.setCurrentBlur(45);
    expect(45).toEqual(blurController.getCurrentBlur());
  });

  it("should ensure that unblur() is called", function() {
    spyOn(blurController, "unblur");
    blurController.unblur(); 
    expect(blurController.unblur).toHaveBeenCalled();
  });

  //TODO: update after downloading jquery-jasmine
  // it("should have an interactive image container", function() {
  //   var spyOnImageEvent = spyOn(blurController, "unblur");
  //   $("#images").trigger("click");
  //   expect(blurController.unblur).toHaveBeenCalled();
  //   ($("#images"));
  //   expect(clickImagesEvent).toHaveBeenTriggered();
  //   expect(99).toEqual(blurController.getCurrentBlur());
  //   var eventSpy = spyOnEvent('#imageContainer', 'click');
  //   $('#imageContainer').trigger('click');
  //   expect('click').toHaveBeenTriggeredOn('#imageContainer');
  //   expect(eventSpy).toHaveBeenTriggered();
  //   pending();
  // });
});
