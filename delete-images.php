<?php
	session_start();
    $user_name = $_SESSION['username'];
    $target_dir = "images/" . $user_name . '/*';
    echo($target_dir);

	$files = glob($target_dir); // get all file names
	foreach($files as $file){ // iterate through files
	  if(is_file($file))
	    unlink($file); // delete the file
	}
?>
<!DOCTYPE html>
<html lang="en">
    <head>
    
    </head>

    <body>
        

        <h1>Hi, <b><span id="username"><?php echo $_SESSION['username']; echo($target_dir); ?></span></b>. Welcome to our site.</h1>

    </body>
</html>