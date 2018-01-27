<?php
//TODO: guard aganst malicious image deletion via url hacking
$user_name = $_SESSION['username'];
$target_dir = "images/" . $user_name;
echo "called delete-images"

//TODO: delete all images in the user's directory
?>