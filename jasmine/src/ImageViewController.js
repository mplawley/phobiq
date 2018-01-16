ImageViewController = function() {};

ImageViewController.prototype.directoryToGetImagesFrom;

ImageViewController.prototype.init = function() {
	this.directoryToGetImagesFrom = folder = "images/" + blurController.getUserName();
}

Dropzone.options.filedrop = {
  init: function () {
    this.on("complete", function (file) {
      if (this.getUploadingFiles().length === 0 && this.getQueuedFiles().length === 0) {
        this.getImages();
      }
    });
  }
};

ImageViewController.prototype.getImages = function() {
	$.ajax({
	    url : this.directoryToGetImagesFrom,
	    success: function (data) {
	        $(data).find("a").attr("href", function (i, val) {
	            if( val.match(/\.(jpe?g|png|gif)$/) ) { 
	                $("body").append( "<img src='"+ folder + val +"'>" );
	            } 
	        });
	    }
	});
}
