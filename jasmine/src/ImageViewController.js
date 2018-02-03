ImageViewController = function() {};

//Directory on the server where images are stored
//in subdirectories based on unique username
ImageViewController.prototype.directoryToGetImagesFrom;
ImageViewController.prototype.directoryCheckUrl = "/directory-exists.php";
ImageViewController.prototype.request;

//The images currently loaded to the Phobiq webpage
ImageViewController.prototype.loadedImages;

//Init called by Main.js
ImageViewController.prototype.init = function() {
	this.directoryToGetImagesFrom = folder = "images/" + blurController.getUsername() + "/";
	this.loadedImages = [];

	//If the user has logged in and uploaded images before, get them now.
	if (this.directoryExists()) {
		this.getImages();	
	}
}

//Get images from the server
ImageViewController.prototype.getImages = function() {
	_this = this;

	//Otherwise, get the images from the directory based on the user's unique login name.
	//These are stored in the /images directory on the server
	$.ajax({
		url: this.directoryToGetImagesFrom,
	    success: function (data) {
	        $(data).find("a").attr("href", function (i, val) {
	        	//Only get jpegs, pngs, and gifs, and only get them if they haven't been loaded already...
	            if( val.match(/\.(jpe?g|png|gif)$/) && $.inArray(folder + val, _this.loadedImages) == -1 ) { 
	            	//Append those images to the imageContainer div
	                $("#imageContainer").append( "<img src='"+ folder + val +"' height='400'>" );
	                //Also put them on the loadedImages array
	                _this.loadedImages.push(folder + val);
	                //And animate the resizing of the imageContainer div
	                _this.animateImageContainerLimitDiv();
	            } 
	        });
	    },
	    error: function(jqXHR, textStatus, errorThrown) {
			console.error("The following error occurred: " +
							textStatus, errorThrown, jqXHR
			);
		}
	}); 
}

ImageViewController.prototype.directoryExists = function() {
    $.ajax({
	    type: 'get',
	    url: this.directoryCheckUrl,
	    success: function(data) {
        	return data; //php at directoryCheckUrl echoes true or false
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