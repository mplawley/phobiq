<?php

	function console_log( $data ){
	  echo '<script>';
	  echo 'console.log('. json_encode( $data ) .')';
	  echo '</script>';
	}

	console_log( $_POST["data"] );


	$link = mysqli_connect("localhost", "root", "root", "phobiq");
	$unblurSteps = htmlspecialchars($_POST['data']);
	 
	if ($link === false) {
	    die("ERROR: Could not connect. " . mysqli_connect_error());
	}
	 
	$sql = "INSERT INTO USER_PERFORMANCE (user_name, current_blur, max_blur, blur_step) VALUES ('Kram', 100, 100, 1)";
	if (mysqli_query($link, $sql)) {
	    echo "Records inserted successfully.";
	} else {
	    echo "ERROR: Could not able to execute $sql. " . mysqli_error($link);
	}

	mysqli_close($link);
?>