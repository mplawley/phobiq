<?php
    session_start();
    $user_name = $_SESSION['username'];
    $youtubeVideoLink = $_POST['youtubeVideoLink'];

    $link = mysqli_connect("localhost", "root", "root", "phobiq"); 
	if ($link === false) {
	    die("ERROR: Could not connect. " . mysqli_connect_error());
	}

	$sqlInsert = "INSERT INTO USER_MEDIA (user_name, videoUrl) VALUES ('$user_name', '$youtubeVideoLink')";

	if (mysqli_query($link, $sql)) {
	    echo "Records inserted successfully.";
	} else {
	    echo "ERROR: Was not able to execute $sql. " . mysqli_error($link);
	}

	mysqli_close($link);
?>