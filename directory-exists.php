<?php
    session_start();
    $user_name = $_SESSION['username'];
    $target_dir = "images/" . $user_name;

    if (!is_dir($target_dir)) {
        echo 'true';
    } else {
    	echo 'false';
    }
?>