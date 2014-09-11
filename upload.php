<?php

// A list of permitted file extensions
include 'function.php';

$allowed = array('png', 'jpg', 'gif', 'jpeg');

if(isset($_FILES['upl']) && $_FILES['upl']['error'] == 0){

	$extension = pathinfo($_FILES['upl']['name'], PATHINFO_EXTENSION);

	if(!in_array(strtolower($extension), $allowed)){
		echo '{"status":"error1"}';
		exit;
	}
	
	$temp = explode(".", $_FILES['upl']['name']);
	$fileName1 = generateRandomString(5).".".$temp[1];

		
	if(move_uploaded_file($_FILES['upl']['tmp_name'], 'uploads/'.$fileName1)){

//		echo '{"status":"success"},{"FileName":"'.$fileName1.'"}';
		session_start();
		$_SESSION['model_image'] = 'uploads/'.$fileName1;
		echo $_SESSION['model_image'];
		exit;
	}
}

echo '{"status":"error2"}';
exit;