<?php

if (isset($_POST['type']) != "") {
	session_start();
    $_SESSION['type']= $_POST['type'];
} elseif (isset($_POST['category']) != "") {
	session_start();
	$_SESSION['category']= $_POST['category'];
} elseif (isset($_POST['brand']) != "") {
	session_start();
	$_SESSION['brand']= $_POST['brand'];
} elseif (isset($_POST['model']) != "") {
	session_start();
	$image_url = str_replace("thumbs/","",$_POST['model']);
	$_SESSION['model_image'] = $image_url;
	echo $_SESSION['model_image'];
} elseif (isset($_POST['get_model']) == "1") {
	session_start();
	$data["type"]=$_SESSION['type'];
	$data["model_image"]=$_SESSION['model_image'];
//	print_r($data);
	echo json_encode($data);
}
// print_r($_POST);
// print_r($_SESSION);
 
?>