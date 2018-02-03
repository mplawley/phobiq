<?php
    session_start();
    $user_name = $_SESSION['username'];

    $link = mysqli_connect("localhost", "root", "root", "phobiq"); 
	if ($link === false) {
	    die("ERROR: Could not connect. " . mysqli_connect_error());
	}

	$sql = "SELECT videoUrl FROM USER_MEDIA WHERE user_name = '$user_name'";

	if (mysqli_query($link, $sql)) {
	    echo "Records retrieved successfully.";
	} else {
	    echo "ERROR: Was not able to execute $sql. " . mysqli_error($link);
	}

	mysqli_close($link);
?>

<?php
	session_start();
    $username = $_SESSION['username'];
	$servername = "localhost";
	$password = "password";
	$dbname = "myDB";

	// Create connection
	$conn = new mysqli($servername, $username, $password, $dbname);
	// Check connection
	if ($conn->connect_error) {
	    die("Connection failed: " . $conn->connect_error);
	} 

	$sql = "SELECT id, firstname, lastname FROM MyGuests";
	$result = $conn->query($sql);

	if ($result->num_rows > 0) {
	    // output data of each row
	    while($row = $result->fetch_assoc()) {
	        echo "id: " . $row["id"]. " - Name: " . $row["firstname"]. " " . $row["lastname"]. "<br>";
	    }
	} else {
	    echo "0 results";
	}
	$conn->close();
?>