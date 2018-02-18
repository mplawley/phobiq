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
    spyOn(console, "log");
    databaseController.sendDataWithAjaxCall(blurController);
    
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
    spyOn(console, "error");
    databaseController.sendDataWithAjaxCall(blurController);
    
    expect(jasmine.Ajax.requests.mostRecent().url).toBe("/dbConnection.php");

    jasmine.Ajax.requests.mostRecent().respondWith({
      status: "500",
      contentType: "text/plain",
      responseText: "OK"
    });

    expect(console.error).toHaveBeenCalled();
    expect(databaseController.getRequestStatus()).toBe(false);
  });

  it("ensure a completed AJAX request calls its status setter with true", function() {
    spyOn(databaseController, "setRequestStatus");
    databaseController.sendDataWithAjaxCall(blurController);
    
    expect(jasmine.Ajax.requests.mostRecent().url).toBe("/dbConnection.php");

    jasmine.Ajax.requests.mostRecent().respondWith({
      status: "200",
      contentType: "text/plain",
      responseText: "OK"
    });

    expect(databaseController.setRequestStatus).toHaveBeenCalledWith(true);
  });

  it("ensure a failed AJAX request calls its status setter with false", function() {
    spyOn(databaseController, "setRequestStatus");
    databaseController.sendDataWithAjaxCall(blurController);
    
    expect(jasmine.Ajax.requests.mostRecent().url).toBe("/dbConnection.php");

    jasmine.Ajax.requests.mostRecent().respondWith({
      status: "500",
      contentType: "text/plain",
      responseText: "OK"
    });

    expect(databaseController.setRequestStatus).toHaveBeenCalledWith(false);
  });

  it("a successful AJAX call will only mark itself as complete when it is truly complete", function() {
      var setRequestStatus = jasmine.createSpy("success");

      var xhr = new XMLHttpRequest();
      xhr.onreadystatechange = function(args) {
        if (this.readyState == this.DONE) {
          setRequestStatus(this.responseText);
        }
      };

      xhr.open("GET", "/some/cool/url");
      xhr.send();

      expect(jasmine.Ajax.requests.mostRecent().url).toBe('/some/cool/url');
      expect(setRequestStatus).not.toHaveBeenCalled();

      jasmine.Ajax.requests.mostRecent().respondWith({
        "status": 200,
        "contentType": 'text/plain',
        "responseText": 'awesome response'
      });

      expect(setRequestStatus).toHaveBeenCalledWith('awesome response');
    });
});