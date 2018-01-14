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
                                header("location: /welcome.php");
                                exit;
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

    if (!empty($username_err)) {
        echo "username_err: " . $username_err;
    }
    if (!empty($password_err)) {
        echo "password_err: " .  $password_err;
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
    <script src="jasmine/src/LoginController.js"></script>
    <script src="bootstrap/js/bootstrap.min.js"></script>
    <title>Phobiq</title>
  </head>

  <body>
    <h1 id="loginHeader">Phobiq login</h1>

    <form id="main-login-form" class="login-form" action="/welcome.php">
      <p class="login-text">
        <span class="fa-stack fa-lg">
          <i class="fa fa-circle fa-stack-2x"></i>
          <i class="fa fa-lock fa-stack-1x"></i>
        </span>
      </p>
      <input id="username" type="email" class="login-username" autofocus="true" required="true" placeholder="Email" />
      <input id="password" type="password" class="login-password" required="true" placeholder="Password" />
      <input id="login-button" type="submit" name="Login" value="Login" class="login-submit"/>
      <a id="registerLink" href="/register.php">Not a member yet? Register for free!</a>
    </form>

    <div id="errors">
        <ul id="errorList">
        </ul>
    </div>

    <a href="#" class="login-forgot-pass">forgot password?</a>
    <div class="underlay-photo"></div>
    <div class="underlay-black"></div>
</html>
