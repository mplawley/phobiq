<?php
	$blurStepsTaken = $_POST['blurStepsTaken'];
	$currentBlur = $_POST['currentBlur'];
	$maxBlur = $_POST['maxBlur'];
	$blurStep = $_POST['blurStep'];
	$username = $_POST['username'];
	
	$link = mysqli_connect("localhost", "root", "root", "phobiq"); 
	if ($link === false) {
	    die("ERROR: Could not connect. " . mysqli_connect_error());
	}
	 
	$sql = "INSERT INTO USER_PERFORMANCE (user_name, blur_steps_taken, current_blur, max_blur, blur_step) VALUES ('$username', '$blurStepsTaken', '$currentBlur', '$maxBlur', '$blurStep')";

	if (mysqli_query($link, $sql)) {
	    echo "Records inserted successfully.";
	} else {
	    echo "ERROR: Was not able to execute $sql. " . mysqli_error($link);
	}

	mysqli_close($link);
?>