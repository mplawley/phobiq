<?php
    // Initialize the session
    session_start();

    // If session variable is not set it will redirect to login page
    if(!isset($_SESSION['username']) || empty($_SESSION['username'])) {
      header("location: login.php");
    }
?>
<!DOCTYPE html>
<html lang="en">
    <head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <link rel="stylesheet" type="text/css" href="bootstrap/css/bootstrap.min.css">
    <link rel="stylesheet" type="text/css" href="styles/blurcontroller-styles.css">
    <link rel="stylesheet" type="text/css" href="styles/basic.min.css">
    <link rel="stylesheet" type="text/css" href="styles/dropzone.min.css">

    <script src="jquery-3.2.1.min.js"></script>
    <script src="bootstrap/js/bootstrap.min.js"></script>
    <script src="resources/dropzone.min.js"></script>
    <script src="jasmine/src/DatabaseController.js"></script>
    <script src="jasmine/src/BlurController.js"></script>
    <script src="jasmine/src/ImagePickerController.js"></script>
    <script src="jasmine/src/ImageViewController.js"></script>
    <script src="jasmine/src/Main.js"></script>

    <title>Phobiq</title>
    </head>

    <body>
        <h1 id="mainHeader">Phobiq</h1>
        <div class="page-header">
            <h1>Hi, <b><span id="username"><?php echo $_SESSION['username']; ?></span></b>. Welcome to our site.</h1>
        </div>

        <div id="pageUtils">
            <button id="downloadButton" type="button" class="consoleButtons">Save performance</button>
            <button id="clearImagesButton" type="button" class="consoleButtons">Clear images</button>
            <button id="signOutButton" type="button" class="consoleButtons">Sign out</button>
        </div>

        <div id="imageContainer" class="imageToBlur">

        </div>

        <p id="instructions">Click above or move the slider to change the blur.</p>

        <div id="sliders">
            <input id="blurSlider" type="range" value="0" max="100" min="0" step="1"/>
            <p id="userProgressText">0%</p>
        </div>

        <div id="bottomDiv">
            <form id="imageDropzone" class="dropzone" name="file" action="/file-upload.php"></form>
        </div>

    </body>
</html>