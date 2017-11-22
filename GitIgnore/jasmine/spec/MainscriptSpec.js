describe("mainscript", function() {
  var BlurController;

  beforeEach(function() {
      BlurController = new BlurController();
  });

	it("should update the slider position to the current value", function() {
		
		var expectedSliderValue = 5;
    console.log(BlurController.getBlurMax());
    //var actualBlurValue = mainscriptTest.mainUtils.getCurrentBlurValue();

    expect(40).toEqual(BlurController.getBlurMax());
	});
});
