<?php 
	session_start();
  if (isset($_POST["r_data"])) {
  		$temp = $_SESSION["wearing"];
		foreach ($temp as $t => $p) {
			if ($p["type"] == $_POST["r_data"]) {
				unset($temp[$t]);
			}
		}
		$_SESSION["wearing"] = $temp;
  } elseif (isset($_POST["data"])) {
	$chosen_product[] = json_decode($_POST["data"], true);
	$color = json_decode($_POST["color"], true);
	$color["value"] = "#".str_replace("0x", "", strtolower($color["value"]));
//	echo $color["value"];
	$chosen_product[0]["Color"] = $color;
	$chosen_product[0]["op_value"] = $_POST["op_value"];
	if ($_SESSION["wearing"] != ""){
		$dupl = "";
		$temp = $_SESSION["wearing"];
		foreach ($temp as $t => $p) {
			if ($p["title"] == $chosen_product[0]["title"]) {
				unset($temp[$t]);
			} elseif ($p["type"] == $chosen_product[0]["type"]) {
				unset($temp[$t]);
			}
		}
		$_SESSION["wearing"] =  array_merge($chosen_product, $temp );
	} else {
		$_SESSION["wearing"] = $chosen_product;
	}
	$_SESSION["wearing"] = array_unique($_SESSION["wearing"], SORT_REGULAR);
  }
?>

<?php 
if (isset($_SESSION["wearing"])){
	$wearing_products = $_SESSION["wearing"];
	if (isset($_POST["sort_data"])){
	  foreach ($wearing_products as $product => $p) {
	    if ($_POST["sort_data"] != "ALL") {
		  	if (strtolower($_POST["sort_data"]) != strtolower($p["category"])) {
				unset($wearing_products[$product]);
			}
	    }
	  }
	} 
}
?>
<div class="inner">
<?php 
if ($_SESSION["wearing"]) {
  	$cnt = 0;
	foreach ($wearing_products as $product => $p) {	
  	$cnt = $cnt+1;
?>
<?php if ($cnt > 2) {?>
<script>
	$(function() {
		var a_width = $("#all_products .inner").width();
		$("#all_products .inner").css("width", a_width+286);	
	});
</script>
<?php } ?>
<div class="pull-left">
	<a class="close" id="<?php echo $p["type"]; ?>">x</a>
	<div class="all_product">
		<div class="col-xs-5 image_box"><img style="width: 100%; max-height:100px;" src="<?php if($p["productImage"] != ""){ echo $p["productImage"]; } else {echo "img/NoPhotoAvailable.jpg"; } ?>" alt="" /></div>
		<div class="col-xs-7">
			<div class="clearing" style="height: 10px;"></div>
			<div class="brand_name"><?php echo $p["brand"]; ?></div>
			<div class="product_name"><?php echo $p["title"]; ?></div>
			<div class="product_name">Category (<?php echo $p["type"]; ?>)</div>
			<div class="shade_name"><?php echo $p["Color"]["name"]; ?></div>
			<div class="price">Rs- <?php echo $p["Color"]["price"]; ?>.00</div>
			<div class="clearing"></div>
		</div>
		<div class="clearing"></div>
	</div>
</div>
<?php 
  } 
} else {
?>
No Products Choosen
<?php } ?>
</div>
<div id="what_iam_wearing" style="display: none;"><?php echo json_encode($_SESSION["wearing"]); ?></div>