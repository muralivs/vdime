<?php 
	session_start();
	$chosen_product[] = json_decode($_POST["data"], true);
	$color = json_decode($_POST["color"], true);
	$chosen_product[0]["Color"] = $_POST["color"];
	if ($_SESSION["wearing"] != ""){
		$dupl = "";
		$temp = $_SESSION["wearing"];
		foreach ($temp as $t => $p) {
			if ($p["title"] == $chosen_product[0]["title"]) {
				unset($temp[$t]);
			} 
		}
		$_SESSION["wearing"] =  array_merge($chosen_product, $temp );
	} else {
		$_SESSION["wearing"] = $chosen_product;
	}
	$_SESSION["wearing"] = array_unique($_SESSION["wearing"], SORT_REGULAR);	
	?>

<?php 
if ($_SESSION["wearing"]) {
  foreach ($_SESSION["wearing"] as $product => $p) {
?>

<div class="pull-left">
	<a class="close">x</a>
	<div class="all_product">
		<div class="col-xs-5 image_box"><img style="width: 100%;" src="<?php if($p["productImage"] != ""){ echo $p["productImage"]; } else {echo "img/NoPhotoAvailable.jpg"; } ?>" alt="" /></div>
		<div class="col-xs-7">
			<div class="clearing" style="height: 10px;"></div>
			<div class="brand_name"><?php echo $p["brand"]; ?></div>
			<div class="product_name"><?php echo $p["title"]; ?></div>
			<div class="product_name">Category (<?php echo $p["type"]; ?>)</div>
			<div class="shade_name"><?php $shade = json_decode($p["Color"], true); echo $shade["name"]; ?></div>
			<div class="price">Rs- <?php echo $shade["price"]; ?>.00</div>
			<div class="clearing"></div>
		</div>
		<div class="clearing"></div>
	</div>
</div>
<?php 
  } 
}
?>
