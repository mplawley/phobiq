describe("DeleteImageController", function() {
  var deleteImageController;

  beforeEach(function() {
    deleteImageController = new DeleteImageController();
    jasmine.Ajax.install();
  });

  afterEach(function() {
    jasmine.Ajax.uninstall();
  });

  it("can handle a completed AJAX call", function() {
    spyOn(console, "log");
    deleteImageController.clearImagesFromDirectory();
    
    expect(jasmine.Ajax.requests.mostRecent().url).toBe("/delete-images.php");

    jasmine.Ajax.requests.mostRecent().respondWith({
      status: "200",
      contentType: "text/plain",
      responseText: "OK"
    });

    expect(console.log).toHaveBeenCalled();
  });

  it("can handle a failed AJAX call", function() {
    spyOn(console, "error");
    deleteImageController.clearImagesFromDirectory();
    
    expect(jasmine.Ajax.requests.mostRecent().url).toBe("/delete-images.php");

    jasmine.Ajax.requests.mostRecent().respondWith({
      status: "500",
      contentType: "text/plain",
      responseText: "OK"
    });

    expect(console.error).toHaveBeenCalled();
  });
});