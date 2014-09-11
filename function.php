<?php 
	//if (isset($_POST['call_get_products_list'])) {
	//    get_products_list($_SESSION['brand'], $_SESSION['type']);
	//}

function get_brands_list($data) {
	foreach ($data as $v) {
		foreach ($v as $vv => $k) {
			foreach ($k as $vvv => $kk) {
				$brands[] = $k[$vvv]["name"];
			}
		}
	}
	return $brands;
}

function get_products_list($brand, $type) {
//	echo $brand."=".$type;
	global $j_products;
//	print_r($j_products);
	$current_products = "";
	foreach ($j_products as $v) {
		foreach ($v as $vv => $k) {
			foreach ($k as $vvv => $kk) {
				if ($k[$vvv]["name"] == $brand) {
					foreach ($k[$vvv]["Area"] as $vvvv => $kkk) {
						if (strtolower($kkk["title"]) == strtolower($type)) {
							foreach ($kkk["Category"] as $vvvvv => $kkkk) {
								$current_products[] = $kkkk;
							}
						}
					}
				}
			}
		}
	}
//	exit;
	return $current_products;
}

function new_products($data){
	print_r($data);
}

/**
 * Returns an random string
*/
function generateRandomString($length) {
    $characters = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    $randomString = '';
    for ($i = 0; $i < $length; $i++) {
        $randomString .= $characters[rand(0, strlen($characters) - 1)];
    }
    return time().$randomString;
}

/**
 * Returns Clean String without special characters
*/
function clean($string) {
   $string = str_replace(' ', '_', $string); // Replaces all spaces with hyphens.
   return preg_replace('/[^A-Za-z0-9\-]/', '', $string); // Removes special chars.
}

/**
 * Returns Uploaded image URL
*/
function upload_image($name, $type, $tmp_name, $error, $size, $path){
	$valid_formats = array("jpg", "png", "gif", "zip", "bmp");
	$max_file_size = 1024*10000; //100 kb
	$count = 0;
	$img_dir = "";
	if($name!='') {
		if ($error == 4) {
	        continue; // Skip file if any error found
	    }
		if ($error[$id]['image'] == 0) {	          
	        if ($size > $max_file_size) {
	            $message[] = $name." is too large!";
	            continue; // Skip large files
	        }
			elseif( ! in_array(pathinfo($name, PATHINFO_EXTENSION), $valid_formats) ){
				$message[] = $name." is not a valid format";
				continue; // Skip invalid file formats
			}
	        else{ // No error found! Move uploaded files 
	       	 $temp = explode(".", $name);
	       	 
	       	 $fileName1 = generateRandomString(1).$temp[0].".".$temp[1];
	            if(move_uploaded_file($tmp_name, $path.$fileName1)) {
	            	$format=pathinfo($name, PATHINFO_EXTENSION);
	            	$img_dir= $path.$fileName1;
	            	$count++; // Number of successfully uploaded file
	            }
	        }
	    }
	}
	return $img_dir;
}



?>