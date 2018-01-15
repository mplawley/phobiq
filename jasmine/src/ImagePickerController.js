ImagePickerController = function() {};

ImagePickerController.prototype.init = function() {
	this.bindUserInterfaceElements();
}

ImagePickerController.prototype.bindUserInterfaceElements = function() {
	var _this = this;

	$("#imagePickerButton").click(function() {
		_this.handleImagePickerButtonClick();
	});

	$("#clearImagesButton").click(function() {
		_this.handleImageClearButtonClick();
	});
}

ImagePickerController.prototype.handleImageClearButtonClick = function() {
	$("#imageContainer").empty();
}

ImagePickerController.prototype.handleImagePickerButtonClick = function() {
	google.load('search', '1', {language : 'hu'});
  	google.setOnLoadCallback(function() {
    var customSearchOptions = {
        enableImageSearch: true,
        imageSearchOptions: {
              layout: google.search.ImageSearch.LAYOUT_CLASSIC
        }
    };

    var options = new google.search.DrawOptions();
    options.setAutoComplete(true);

    var customSearchControl = new google.search.CustomSearchControl('XXX', customSearchOptions);

    customSearchControl.setResultSetSize(google.search.Search.LARGE_RESULTSET);
    customSearchControl.setAutoCompletionId('XXX');

    customSearchControl.draw('cse', options);
  }, true);

}

//clear images

//save images chosen to db automatically