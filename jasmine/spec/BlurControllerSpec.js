describe("Test blur decrement", function() {
  var BlurController;

  beforeEach(function() {
      BlurController = new BlurController();
  });

	it("should be able to decrement currentBlur by blurStep", function() {	
		var actualMaxBlur = BlurController.getMaxBlur();
    var actualCurrentBlur = BlurController.getCurrentBlur();
    var actualBlurStep = BlurController.getBlurStep();

    BlurController.unblur();

    var expectedValue = actualCurrentBlur - actualBlurStep;
    expect(expectedValue).toEqual(blurController.getCurrentBlur());
	});
});
