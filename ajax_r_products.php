<?php
	session_start();
	$products = file_get_contents('js/productsdetails.json');
	$j_products = json_decode($products, true);
	include 'function.php';
	if (isset($_POST['type']) != "") {
	    $_SESSION['type']= $_POST['type'];
	} elseif (isset($_POST['brand']) != "") {
		$_SESSION['brand']= $_POST['brand'];
	}
	$products = get_products_list($_SESSION['brand'], $_SESSION['type']);
?>
<?php 
	
	if ($products) { ?>
	<div class="clearing" style="height: 10px; background: #fff;"></div>
	<?php 
	foreach ($products as $product => $p) { ?>
	<?php //print_r($p); ?>
<!-- related product list -->
<div class="col-xs-12 related_product">
	<div class="col-xs-5 image_box"><a class="choose_product" href="javascript:void(0);">
		<span style="display: none;" class="data">
		<?php
			$p["brand"] = $_SESSION['brand'];
			$p["category"] = $_SESSION['category'];
			$p["type"] = $_SESSION['type']; 
			echo json_encode($p); 
		?>
		</span>
		<img src="<?php if($p["productImage"] != ""){ echo $p["productImage"]; } else {echo "img/NoPhotoAvailable.jpg"; } ?>" alt="" />
		</a></div>
	<div class="col-xs-7">
		
		<div class="product_name"><?php if(is_array($p)){ echo $p["title"]; } else { echo $p; } ?></div>
		<div class="shade_name"><?php //echo $c["name"]; ?></div>
		<div class="clearing"></div>
		<div class="col-xs-6 price">Rs - <?php  //echo $c["price"]; ?></div><div class="col-xs-6 price">Offer <?php  //echo $c["offer"]; ?>%</div>
		<div class="clearing"></div>
		<div class="brand_name"><?php echo $_SESSION['brand']; ?></div>
	</div>
	<!-- Seperator -->
	<div class="clearing"></div>
	<div class="w_sep">
		<div class="col-xs-1"></div>
		<div class="col-xs-10 line"></div>
		<div class="col-xs-1"></div>
		<div class="clearing"></div>
	</div>
	<div class="clearing"></div>
</div>
<?php } }else {echo "No Matching Products"; } ?>