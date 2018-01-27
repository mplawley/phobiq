ImageViewController = function() {};

//Directory on the server where images are stored
//in subdirectories based on unique username
ImageViewController.prototype.directoryToGetImagesFrom;

//The images currently loaded to the Phobiq webpage
ImageViewController.prototype.loadedImages;

//Init called by Main.js
ImageViewController.prototype.init = function() {
	this.directoryToGetImagesFrom = folder = "images/" + blurController.getUsername() + "/";
	this.loadedImages = [];
	this.getImages();
}

//Get images from the server
ImageViewController.prototype.getImages = function() {
	var _this = this;
	
	$.ajax({
	    url : this.directoryToGetImagesFrom,
	    success: function (data) {
	        $(data).find("a").attr("href", function (i, val) {
	        	//Only get jpegs, pngs, and gifs, and only get them if they haven't been loaded already...
	            if( val.match(/\.(jpe?g|png|gif)$/) && $.inArray(folder + val, _this.loadedImages) == -1 ) { 
	            	//Append those images to the imageContainer div
	                $("#imageContainer").append( "<img src='"+ folder + val +"'>" );
	                //Also put them on the loadedImages array
	                _this.loadedImages.push(folder + val);
	                //And animate the resizing of the imageContainer div
	                _this.animateImageContainerLimitDiv();
	            } 
	        });
	    }
	});
}

//Animate the resizing of the imageContainer div by animating a container
//that contains the imageContainer div
ImageViewController.prototype.animateImageContainerLimitDiv = function() {
	$("#imageContainerLimit").animate({
    	height: $("#imageContainer").height()
	},600);
}