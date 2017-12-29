describe("Test blur decrement", function() {
  var blurController;

  beforeEach(function() {
    blurController = new BlurController(); 
    blurController.initializeValues();
  });

	it("should be able to decrement currentBlur by blurStep", function() {	
		var actualMaxBlur = blurController.getMaxBlur();
    var actualCurrentBlur = blurController.getCurrentBlur();
    var actualBlurStep = blurController.getBlurStep();

    blurController.unblur();

    var expectedValue = actualCurrentBlur - actualBlurStep;
    expect(expectedValue).toEqual(blurController.getCurrentBlur());
	});
});
