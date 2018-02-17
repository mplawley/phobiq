describe("DatabaseController", function() {
  var blurController;
  var databaseController;

  beforeEach(function() {
    blurController =  new BlurController();
    databaseController = new DatabaseController(blurController);
    jasmine.Ajax.install();
  });

  afterEach(function() {
    jasmine.Ajax.uninstall();
  });

  it("can handle a completed AJAX call", function() {
    databaseController.sendDataWithAjaxCall(blurController);
    spyOn(console, "log");

    expect(jasmine.Ajax.requests.mostRecent().url).toBe("/dbConnection.php");

    jasmine.Ajax.requests.mostRecent().respondWith({
      status: "200",
      contentType: "text/plain",
      responseText: "OK"
    });

    expect(console.log).toHaveBeenCalled();
    expect(databaseController.getRequestStatus()).toBe(true);
  });

  it("can handle a failed AJAX call", function() {
    databaseController.sendDataWithAjaxCall(blurController);
    spyOn(console, "error");

    expect(jasmine.Ajax.requests.mostRecent().url).toBe("/dbConnection.php");

    jasmine.Ajax.requests.mostRecent().respondWith({
      status: "500",
      contentType: "text/plain",
      responseText: "OK"
    });

    expect(console.error).toHaveBeenCalled();
    expect(databaseController.getRequestStatus()).toBe(false);
  });
});