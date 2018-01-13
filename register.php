<?php
    // Include config file
    require_once 'config.php';

    function console_log( $data ) {
        echo '<script>';
        echo 'console.log('. json_encode( $data ) .')';
        echo '</script>';
    }
     
    // Define variables and initialize with empty values
    $username = $_POST['username'];
    $password = $_POST['password'];
    $confirm_password = $_POST['confirmed_password'];

    $username_err = $password_err = $confirm_password_err = "";
    console_log("step 1");
     
    // Processing form data when form is submitted
    if($_SERVER["REQUEST_METHOD"] == "POST") {
        console_log("step 2");
     
        // Validate username
        if(empty(trim($_POST["username"]))){
            $username_err = "Please enter a username.";
        } else {
            // Prepare a select statement
            $sql = "SELECT user_id FROM USER_PROFILES WHERE username = ?";
            console_log("step 3");
            
            if($stmt = $mysqli->prepare($sql)) {
                // Bind variables to the prepared statement as parameters
                console_log("step 4");
                $stmt->bind_param("s", $param_username);
                
                // Set parameters
                $param_username = trim($_POST["username"]);
                
                // Attempt to execute the prepared statement
                if($stmt->execute()){
                    console_log("step 5");
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
            console_log("step 6");
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
        console_log("step 7");
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
            console_log("step 8");
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
                    // Redirect to login page
                    header("location: index.html");
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

    console_log("if there are any errors...");
    console_log($username_err);
    console_log($password_err);
    console_log($confirm_password_err);
?>