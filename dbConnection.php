<?php
	echo 'post data: ' . htmlspecialchars($_POST["msg"]) . '!';
	$link = mysqli_connect("localhost", "root", "root", "phobiq");
	 
	if ($link === false) {
	    die("ERROR: Could not connect. " . mysqli_connect_error());
	}
	 
	$sql = "INSERT INTO USER_PERFORMANCE (user_name, current_blur, max_blur, blur_step) VALUES ('Test user', 100, 100, 1)";
	if (mysqli_query($link, $sql)) {
	    echo "Records inserted successfully.";
	} else {
	    echo "ERROR: Could not able to execute $sql. " . mysqli_error($link);
	}

	mysqli_close($link);
?>