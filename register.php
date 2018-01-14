<?php
    // Include config file
    require_once 'config.php';
     
    // Define variables and initialize with empty values
    $username = $_POST['username'];
    $password = $_POST['password'];
    $confirm_password = $_POST['confirmed_password'];

    $username_err = $password_err = $confirm_password_err = "";
     
    // Processing form data when form is submitted
    if($_SERVER["REQUEST_METHOD"] == "POST") {
     
        // Validate username
        if(empty(trim($_POST["username"]))){
            $username_err = "Please enter a username.";
        } else {
            // Prepare a select statement
            $sql = "SELECT user_id FROM USER_PROFILES WHERE username = ?";
            
            if($stmt = $mysqli->prepare($sql)) {
                // Bind variables to the prepared statement as parameters
                $stmt->bind_param("s", $param_username);
                
                // Set parameters
                $param_username = trim($_POST["username"]);
                
                // Attempt to execute the prepared statement
                if($stmt->execute()){
                    // store result
                    $stmt->store_result();
                    
                    if($stmt->num_rows == 1){
                        $username_err = "This username is already taken.";
                    } else {
                        $username = trim($_POST["username"]);
                    }
                } else {
                    echo "Oops! Something went wrong. Please try again later.";
                }
            }
             
            // Close statement
            $stmt->close();
        }
        
        // Validate password
        if(empty(trim($_POST['password']))) {
            $password_err = "Please enter a password.";     
        } elseif(strlen(trim($_POST['password'])) < 6) {
            $password_err = "Password must have atleast 6 characters.";
        } else {
            $password = trim($_POST['password']);
        }
        
        // Validate confirm password
        if(empty(trim($_POST["confirmed_password"]))) {
            $confirm_password_err = 'Please confirm password.';     
        } else {
            $confirm_password = trim($_POST['confirmed_password']);
            if($password != $confirm_password) {
                $confirm_password_err = 'Password did not match.';
            }
        }
        
        // Check input errors before inserting in database
        if(empty($username_err) && empty($password_err) && empty($confirm_password_err)){
            // Prepare an insert statement
            $sql = "INSERT INTO USER_PROFILES (username, password) VALUES (?, ?)";
             
            if($stmt = $mysqli->prepare($sql)){
                // Bind variables to the prepared statement as parameters
                $stmt->bind_param("ss", $param_username, $param_password);
                
                // Set parameters
                $param_username = $username;
                $param_password = password_hash($password, PASSWORD_DEFAULT); // Creates a password hash
                
                // Attempt to execute the prepared statement
                if($stmt->execute()) {
                    // Let the user start right away
                    session_start();
                    $_SESSION['username'] = $username;
                    header("Location:welcome.php");
                    exit();
                } else {
                    echo "Something went wrong. Please try again later.";
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
    <link rel="stylesheet" type="text/css" href="login-styles.css">
    
    <script src="jquery-3.2.1.min.js"></script>
    <script src="jasmine/src/RegisterController.js"></script>
    <script src="bootstrap/js/bootstrap.min.js"></script>
    <title>Phobiq</title>
  </head>

  <body>

    <div class="wrapper">
        <h2>Sign Up to use Phobiq</h2>
        <p>Please fill this form to create an account.</p>
        <form id="register-form" action="/welcome.php">
            <div>
                <label>Username:<sup>*</sup></label>
                <input id="username" type="text" name="username" class="form-control">
                <span class="help-block"></span>
            </div>    
            <div>
                <label>Password:<sup>*</sup></label>
                <input id="password" type="password" name="password" class="form-control">
                <span class="help-block"></span>
            </div>
            <div>
                <label>Confirm Password:<sup>*</sup></label>
                <input id="confirmed-password" type="password" name="confirm_password" class="form-control">
                <span class="help-block"></span>
            </div>
            <div class="form-group">
                <input type="submit" class="btn btn-primary" value="Submit">
                <input type="reset" class="btn btn-default" value="Reset">
            </div>
            <p>Already have an account? <a href="index.html">Login here</a>.</p>
        </form>
    </div>  
</html>