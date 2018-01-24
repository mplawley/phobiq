ImageViewController = function() {};

ImageViewController.prototype.directoryToGetImagesFrom;

ImageViewController.prototype.init = function() {
	this.directoryToGetImagesFrom = folder = "images/" + blurController.getUsername() + "/";
	this.getImages();
}

ImageViewController.prototype.getImages = function() {
	var _this = this;
	$.ajax({
	    url : this.directoryToGetImagesFrom,
	    success: function (data) {
	        $(data).find("a").attr("href", function (i, val) {
	            if( val.match(/\.(jpe?g|png|gif)$/) ) { 
	                $("#imageContainer").append( "<img src='"+ folder + val +"'>" );
	                _this.animateImageContainerLimitDiv();
	            } 
	        });
	    }
	});
}

ImageViewController.prototype.animateImageContainerLimitDiv = function() {
	$("#imageContainerLimit").animate({
    	height: $("#imageContainer").height()
	},600);
}