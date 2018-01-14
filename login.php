<?php
    require_once 'config.php'; 
    $username = $_POST['username'];
    $password = $_POST['password'];
    $username_err = $password_err = "";

    // Processing form data when form is submitted
    if($_SERVER["REQUEST_METHOD"] == "POST") {
     
        // Check if username is empty
        if (empty(trim($_POST["username"]))){
            $username_err = 'Please enter username.';
        } else {
            $username = trim($_POST["username"]);
        }
        
        // Check if password is empty
        if (empty(trim($_POST['password']))) {
            $password_err = 'Please enter your password.';
        } else {
            $password = trim($_POST['password']);
        }
        
        // Validate credentials
        if (empty($username_err) && empty($password_err)) {
            // Prepare a select statement
            $sql = "SELECT username, password FROM USER_PROFILES WHERE username = ?";
            
            if($stmt = $mysqli->prepare($sql)){
                // Bind variables to the prepared statement as parameters
                $stmt->bind_param("s", $username);

                // Set parameters
                $param_username = $username;

                // Attempt to execute the prepared statement
                if($stmt->execute()) {

                    // Store result
                    $stmt->store_result();
                    
                    // Check if username exists, if yes then verify password
                    if($stmt->num_rows == 1) {   
                        // Bind result variables
                        $stmt->bind_result($username, $hashed_password);
                        if($stmt->fetch()){
                            if(password_verify($password, $hashed_password)){
                                /* Password is correct, so start a new session and
                                save the username to the session */
                                session_start();
                                $_SESSION['username'] = $username;
                                header("Location:login.php");
                            } else {
                                // Display an error message if password is not valid
                                $password_err = 'The password you entered was not valid.';
                            }
                        }
                    } else {
                        // Display an error message if username doesn't exist
                        $username_err = 'No account found with that username.';
                    }
                } else {
                    echo "Oops! Something went wrong. Please try again later.";
                }
            }
            
            // Close statement
            $stmt->close();
        }
        
        // Close connection
        $mysqli->close();
    }
?>
<!DOCTYPE html>
<html lang="en">
    <head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <link rel="stylesheet" type="text/css" href="bootstrap/css/bootstrap.min.css">
    <link rel="stylesheet" type="text/css" href="blurcontroller-styles.css">

    <script src="jquery-3.2.1.min.js"></script>
    <script src="jasmine/src/DatabaseController.js"></script>
    <script src="jasmine/src/BlurController.js"></script>
    <script src="jasmine/src/Main.js"></script>
    <script src="bootstrap/js/bootstrap.min.js"></script>
    <title>Phobiq</title>
    </head>

    <body>
        <h1 id="mainHeader">Phobiq</h1>
        <div class="page-header">
            <h1>Hi, <b><?php echo $_SESSION['username']; ?></b>. Welcome to our site.</h1>
        </div>
            <p><a href="logout.php" class="btn btn-danger">Sign Out of Your Account</a></p>

        <div id="imageContainer">
            <img class="imageToBlur" src="images/bloodImage.png"/>
            <img class="imageToBlur" src="images/cockroach.jpg"/>
        </div>

        <p id="instructions">Click above or move the slider to change the blur.</p>

        <div id="sliders">
            <input id="blurSlider" type="range" value="0" max="100" min="0" step="1"/>
            <p id="userProgressText">0%</p>
        </div>

        <div id="pageUtils">
          <button id="downloadButton" type="button">Download stats</button>
        </div>
    </body>
</html>