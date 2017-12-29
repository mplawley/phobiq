BlurController = function() {};

BlurController.prototype.maxBlur;
BlurController.prototype.currentBlur;
BlurController.prototype.blurStep;

BlurController.prototype.initializeValues = function() {
	maxBlur = 100;
	currentBlur = 100;
	blurStep = 1;
}

BlurController.prototype.unblur = function() {
	currentBlur -= blurStep;
}

BlurController.prototype.getMaxBlur = function() {
	return maxBlur;
}

BlurController.prototype.getCurrentBlur = function() {
	return currentBlur;
}

BlurController.prototype.getBlurStep = function() {
	return blurStep;
}
