describe("Test BlurController logic", function() {
  var blurController;

  beforeEach(function() {
    blurController = new BlurController();
    blurController.initializeValues();
    blurController.bindUserInterfaceElements();
    blurController.initializeUserInterfaceValues();
  });

  it("should call initialization methods", function() {
    var spyOnImageEvent = spyOn(blurController, "initializeValues");
    var spyOnImageEvent = spyOn(blurController, "bindUserInterfaceElements");
    var spyOnImageEvent = spyOn(blurController, "initializeUserInterfaceValues");

    blurController.init();

    expect(blurController.initializeValues).toHaveBeenCalled();
    expect(blurController.bindUserInterfaceElements).toHaveBeenCalled();
    expect(blurController.initializeUserInterfaceValues).toHaveBeenCalled();
  });

  it("should initialize default blur values", function() {
    var spyOnImageEvent = spyOn(blurController, "setMaxBlur");
    var spyOnImageEvent = spyOn(blurController, "setCurrentBlur");
    var spyOnImageEvent = spyOn(blurController, "setBlurStep");
    
    blurController.initializeValues();

    expect(blurController.setMaxBlur).toHaveBeenCalled();
    expect(blurController.setCurrentBlur).toHaveBeenCalled();
    expect(blurController.setBlurStep).toHaveBeenCalled();
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
});

describe("Test BlurController UI interactions", function() {
  var blurController;

  beforeEach(function() {
    blurController = new BlurController();
    blurController.initializeValues();
    blurController.bindUserInterfaceElements();
    blurController.initializeUserInterfaceValues();
  });

  it("should allow blur slider to call unblur methods", function() {
    var spyOnImageEvent = spyOn(blurController, "setCurrentBlur");
    var spyOnImageEvent = spyOn(blurController, "applyCurrentBlur");

    blurController.handleBlurSliderInput();

    expect(blurController.setCurrentBlur).toHaveBeenCalled();
    expect(blurController.applyCurrentBlur).toHaveBeenCalled();
  });

  it("should allow image click events to call unblur methods", function() {
    var spyOnImageEvent = spyOn(blurController, "unblur");
    var spyOnImageEvent = spyOn(blurController, "updateSliderPosition");

    blurController.handleImageClick();

    expect(blurController.unblur).toHaveBeenCalled();
    expect(blurController.updateSliderPosition).toHaveBeenCalled();
  });

  it("should allow a download button to initiate data download", function() {
    var spyOnImageEvent = spyOn(blurController, "saveTextAsFile");
    var spyOnImageEvent = spyOn(blurController, "getMaxBlur");
    var spyOnImageEvent = spyOn(blurController, "getCurrentBlur");

    blurController.handleDownloadButtonClick();

    expect(blurController.saveTextAsFile).toHaveBeenCalled();
    expect(blurController.getMaxBlur).toHaveBeenCalled();
    expect(blurController.getCurrentBlur).toHaveBeenCalled();
  });
});