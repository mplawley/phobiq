describe("Test BlurController logic", function() {
  var blurController;

  beforeEach(function() {
    loadFixtures("indexFixture.html");
    blurController = new BlurController();
  });

  it("should call initialization methods", function() {
    spyOn(blurController, "initializeValues");
    spyOn(blurController, "bindUserInterfaceElements");
    spyOn(blurController, "initializeUserInterfaceValues");

    blurController.init();

    expect(blurController.initializeValues).toHaveBeenCalled();
    expect(blurController.bindUserInterfaceElements).toHaveBeenCalled();
    expect(blurController.initializeUserInterfaceValues).toHaveBeenCalled();

    expect(blurController.initializeValues.calls.count()).toEqual(1);
    expect(blurController.bindUserInterfaceElements.calls.count()).toEqual(1);
    expect(blurController.initializeUserInterfaceValues.calls.count()).toEqual(1);
  });
  
  it("should allow init() to bind UI elements to object values via jQuery selectors", function() {
    blurController.init();

    expect(blurSlider).toEqual($("#blurSlider"));
    expect(images).toEqual($("#imageContainer"));
    expect(downloadButton).toEqual($("#downloadButton"));
    expect(userProgressText).toEqual($("#userProgressText"));
  });

  it("should initialize default blur values", function() {
    spyOn(blurController, "setMaxBlur");
    spyOn(blurController, "setCurrentBlur");
    spyOn(blurController, "setBlurStep");
    
    blurController.initializeValues();

    expect(blurController.setMaxBlur).toHaveBeenCalled();
    expect(blurController.setCurrentBlur).toHaveBeenCalled();
    expect(blurController.setBlurStep).toHaveBeenCalled();
  });

  it("should be able to initialize BlurController values", function() {
    var expectedMaxBlur = 100;
    var expectedCurrentBlur = 100;
    var expectedBlurStep = 1;

    expect(blurController.getMaxBlur()).toEqual(expectedMaxBlur);
    expect(blurController.getCurrentBlur()).toEqual(expectedCurrentBlur);
    expect(blurController.getBlurStep()).toEqual(expectedBlurStep);
  });

	it("should be able to decrement currentBlur by blurStep", function() {
		var actualMaxBlur = blurController.getMaxBlur();
    var actualCurrentBlur = blurController.getCurrentBlur();
    var actualBlurStep = blurController.getBlurStep();

    blurController.unblur();

    var expectedValue = actualCurrentBlur - actualBlurStep;
    expect(blurController.getCurrentBlur()).toEqual(expectedValue);
	});

  it("should be able to set the currentBlur directly", function() {
    blurController.setCurrentBlur(45);
    expect(blurController.getCurrentBlur()).toEqual(45);
  });

  it("should be able to mutate and access object values related to blur", function() {
    var expectedValue = 88;
    blurController.setMaxBlur(expectedValue);
    blurController.setCurrentBlur(expectedValue);
    blurController.setBlurStep(expectedValue);

    expect(blurController.getMaxBlur()).toEqual(expectedValue);
    expect(blurController.getCurrentBlur()).toEqual(expectedValue);
    expect(blurController.getBlurStep()).toEqual(expectedValue);
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
    spyOn(blurController, "setCurrentBlur");
    spyOn(blurController, "applyCurrentBlur");

    blurController.handleBlurSliderInput();

    expect(blurController.setCurrentBlur).toHaveBeenCalled();
    expect(blurController.applyCurrentBlur).toHaveBeenCalled();
  });

  it("should allow image click events to call unblur methods", function() {
    spyOn(blurController, "unblur");
    spyOn(blurController, "updateSliderPosition");

    blurController.handleImageClick();

    expect(blurController.unblur).toHaveBeenCalled();
    expect(blurController.updateSliderPosition).toHaveBeenCalled();
  });

  it("should allow a download button to initiate data download", function() {
    spyOn(blurController, "saveTextAsFile");
    spyOn(blurController, "getMaxBlur");
    spyOn(blurController, "getCurrentBlur");

    blurController.handleDownloadButtonClick();

    expect(blurController.saveTextAsFile).toHaveBeenCalled();
    expect(blurController.getMaxBlur).toHaveBeenCalled();
    expect(blurController.getCurrentBlur).toHaveBeenCalled();
  });
});

describe("UI views", function() {
  var blurController;

  beforeEach(function() {
    blurController = new BlurController();
    blurController.initializeValues();
    blurController.bindUserInterfaceElements();
    blurController.initializeUserInterfaceValues();
  });

  it("should update the UI with the user's click progress", function() {  
    spyOn(blurController, "getCurrentBlur");
    spyOn(blurController, "getMaxBlur");

    blurController.updateUserClickProgress();
    
    expect(blurController.getCurrentBlur).toHaveBeenCalled();
    expect(blurController.getMaxBlur).toHaveBeenCalled();
  });

  it("should calculate percentage progress correctly", function() {
    var numeratorValue1 = 50;
    var denominatorValue1 = 100;
    var expectedValue1 = 50;

    var numeratorValue2 = 27;
    var denominatorValue2 = 126;
    var expectedValue2 = 21;

    var numeratorValue3 = 6;
    var denominatorValue3 = 50;
    var expectedValue3 = 12;

    var numeratorValue4 = 0;
    var denominatorValue4 = 5000;
    var expectedValue4 = 0;

    var numeratorValue5 = -33;
    var denominatorValue5 = 216;
    var expectedValue5 = -15;

    var numeratorValue6 = 1.9;
    var denominatorValue6 = 2;
    var unexpectedValueBecauseWeAreRounding = 0.95;

    var actualValue1 = blurController.calculateRoundedPercentage(numeratorValue1, denominatorValue1);;
    var actualValue2 = blurController.calculateRoundedPercentage(numeratorValue2, denominatorValue2);;
    var actualValue3 = blurController.calculateRoundedPercentage(numeratorValue3, denominatorValue3);;
    var actualValue4 = blurController.calculateRoundedPercentage(numeratorValue4, denominatorValue4);;
    var actualValue5 = blurController.calculateRoundedPercentage(numeratorValue5, denominatorValue5);;
    var actualValue6 = blurController.calculateRoundedPercentage(numeratorValue6, denominatorValue6);;

    expect(actualValue1).toEqual(expectedValue1);
    expect(actualValue2).toEqual(expectedValue2);
    expect(actualValue3).toEqual(expectedValue3);
    expect(actualValue4).toEqual(expectedValue4);
    expect(actualValue5).toEqual(expectedValue5);
    expect(actualValue6).not.toEqual(unexpectedValueBecauseWeAreRounding);
  });
});
