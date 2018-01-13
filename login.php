<?php
    require_once 'config.php';
    
    function console_log( $data ) {
      echo '<script>';
      echo 'console.log('. json_encode( $data ) .')';
      echo '</script>';
    }
     
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
                if($stmt->execute()){

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
                                header("location: welcome.php");
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

    console_log($username_err);
    console_log($password_err);
?>