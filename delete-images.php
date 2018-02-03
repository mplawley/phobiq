<?php
	session_start();
    $user_name = $_SESSION['username'];
    $target_dir = "images/" . $user_name . '/*';

	$files = glob($target_dir); // get all file names
	foreach($files as $file){ // iterate through files
	  if(is_file($file))
	    unlink($file); // delete the file
	}
?>
