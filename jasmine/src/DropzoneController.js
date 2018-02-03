Dropzone.options.imageDropzone = {
	  url: "/file-upload.php",
	  paramName: "file", // The name that will be used to transfer the file
	  maxFilesize: 2, // MB
	  maxFiles: 50,
	  acceptedFiles: 'image/*',
	  resizeHeight: 400,
	  clickable: true,
	  ignoreHiddenFiles: true,
	  dictDefaultMessage: "Click or drag and drop images here",
	  dictFallbackMessage: "Your browser doesn't support drag-n-drop file uploads",
	  dictFileTooBig: "Your file is too big",
	  dictInvalidFileType: "This is an invalid file type",
	  dictMaxFilesExceeded: "You have exceeded the maximum number of uploads",
	  init: function () {
	  	this.on("complete", function (file) {
	  		if (this.getUploadingFiles().length === 0 && this.getQueuedFiles().length === 0) {
		 		imageViewController.getImages();
		 		this.removeFile(file);
		 	}
		 });
	  }
};