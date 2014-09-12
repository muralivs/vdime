<?php 
error_reporting(0);
$category = file_get_contents('js/category.json');
	$j_cat = json_decode($category, true);
	$products = file_get_contents('js/productsdetails.json');
	$j_products = json_decode($products, true);
	 session_start();
	 $_SESSION['brand'] = "Lakme";
	 $_SESSION['category'] = "face";
	 $_SESSION['type']= "foundation";
	 $_SESSION['product']= "PURE ROUGE BLUSHER";
	 $_SESSION['shade']= "0xe8d1d9";
	 $_SESSION["wearing"]= "";
	include 'session.php';
	include 'function.php';
?>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
	<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
	<link href="css/style.css" rel="stylesheet" type="text/css" />
	<link href="css/bootstrap-responsive.css" rel="stylesheet" type="text/css" />
	<link href="css/bootstrap.css" rel="stylesheet" type="text/css" />
	
	<script src="//code.jquery.com/jquery-1.10.2.js"></script>
	<script src="//code.jquery.com/ui/1.11.1/jquery-ui.js"></script>	
	<script src="js/jquery.session.js"></script>	
	<script src="js/jquery.knob.js"></script>
	<script src="js/jquery.fileupload.js"></script>
	<!-- the jScrollPane script -->
	<script type="text/javascript" src="js/jquery.mousewheel.js"></script>
	<script type="text/javascript" src="js/jquery.jscrollpane.min.js"></script>	

	<script src="js/script.js"></script>	
	<script src="js/canvas.js"></script>	

	<link type="image/x-icon" href="favicon.ico" rel="shortcut icon" />
	<script>
		$(function() {
			$( "#slider" ).slider({"value" : 60});
			$(".jScroll").jScrollPane();
		});
	</script>
</head>
<?php flush(); ?>
<body>
	<div id="home">
		<div class="col-xs-12 home_bk">
			<div class="col-xs-5 model_window mid_margin">
				<div class="title1">Create a look</div>
				<div class="title2">upload your photo  -or-  select a model</div>
				<div class="col-xs-12 select_model">
					<div class="col-xs-4">
						<div class="model">
						<form id="upload" method="post" action="upload.php" enctype="multipart/form-data">
							<div id="drop">
								<a href="javascript:void(0);"><img src="models/thumbs/0.png" alt="" /></a>
								<input type="file" name="upl" multiple />
							</div>					
						</form>
						</div>
					</div>
					
					<div class="col-xs-4">
						<div class="model"><a class="choose_model" href="javascript:void(0);"><img src="models/thumbs/2.jpg" alt="" /></a></div>
					</div>
					<div class="col-xs-4">
						<div class="model"><a class="choose_model" href="javascript:void(0);"><img src="models/thumbs/3.jpg" alt="" /></a></div>
					</div>
					<div class="col-xs-4">
						<div class="model"><a class="choose_model" href="javascript:void(0);"><img src="models/thumbs/4.jpg" alt="" /></a></div>
					</div>
					<div class="col-xs-4">
						<div class="model"><a class="choose_model" href="javascript:void(0);"><img src="models/thumbs/5.jpg" alt="" /></a></div>
					</div>
					<div class="col-xs-4">
						<div class="model"><a class="choose_model" href="javascript:void(0);"><img src="models/thumbs/6.jpg" alt="" /></a></div>
					</div>
					<div class="col-xs-4">
						<div class="model"><a class="choose_model" href="javascript:void(0);"><img src="models/thumbs/7.jpg" alt="" /></a></div>
					</div>
					<div class="col-xs-4">
						<div class="model"><a class="choose_model" href="javascript:void(0);"><img src="models/thumbs/8.jpg" alt="" /></a></div>
					</div>
					<div class="col-xs-4">
						<div class="model"><a class="choose_model" href="javascript:void(0);"><img src="models/thumbs/9.jpg" alt="" /></a></div>
					</div>

				</div>
			</div>
			<div class="col-xs-7 site_title mid_margin">
				<div class="main_title">Virtual makeover studio</div>
				<div class="tag_line">With our virtual makeup tool, you can try our products before you buy</div>
			</div>
			<div class="clearing"></div>
		</div>
	</div>
	
	<div id="products" class="wrapper" style="display:none;">
		<!-- Top Menu  -->
		<div class="col-xs-12 main-cat">
		<?php foreach ($j_cat as $key => $value) {?>
			<a class="m-cat" href="javascript:void(0);" id="<?php echo $value["id"]; ?>" <?php if ($key == 0) {?>style="color: #f00;"<?php } ?>><?php echo $value["name"]; ?></a>
		<?php } ?>
		</div>
		<div class="clearing"></div>
		
		<!-- Widget Area -->
		<div class="col-xs-12">
			
			<!-- Image Area -->
			<div class="col-xs-5 model_area">
				<!-- Canvas Area -->
				<div class="image-details">
				<canvas id="model_image" width="420" height="470"></canvas>
					<div class="clearing"></div>
				</div>
				<!-- end Canvas Area -->
			</div>
			
			<!-- Products Area -->
			<div class="col-xs-7 products_area">
			  	<!-- Sub category and cart -->
				<div id="sub_cat" class="sub-cat pull-left">
				<?php foreach ($j_cat[0]["subcat"] as $key => $value) { ?>
					<a class="sub_cat" href="javascript:void(0);" <?php if ($key == 0) { ?>style="color:#f00;"<?php } ?> id="<?php echo $value["id"]; ?>"><?php echo $value["name"]; ?></a><?php if ($key === end($j_cat[0]["subcat"])) { } else {?> | <?php } ?>
				<?php } ?>
				</div>
				<div class="cart pull-right">
				  <div class="mini-cart">	
					<div class="col-xs-7">Cart</div>
					<div class="col-xs-5 items"><span class="img-rounded">9</span></div>
				  </div>						
				</div>
				<div class="clearing"></div>
				
				<!-- Product Details Area -->
				<div class="col-xs-12" style="background: #fff;">
					<div class="col-xs-7">
					  <div class="product_details">
					  	<div class="d_before">Before</div>
					  	<div class="m_before" style="display:none;">
					  		<img class="col-xs-12 current_model" src="<?php echo $_SESSION["model_image"]; ?>" alt="" />
					  		<div class="back_btn d_before">Back</div>
					  	</div>
					  	
					  	<!-- Change Brand -->
					  	<div class="d_change_brand change_brand">Change Brand</div>
					  	<div class="m_change_brand" style="display:none;">
					  	  
					  		<?php 
					  			$brands = get_brands_list($j_products);	
					  			foreach ($brands as $brands => $key) { ?>
					  			<div class="brands"><a class="change_brand" href="javascript:change_brand('<?php echo $key; ?>');"><?php echo $key; ?></a></div>
					  		<?php } ?>
					  		
					  		<div class="back_btn change_brand">Back</div>
					  	</div>
						
						<!-- Selected Product Details -->
						<div id="current_product">
						<div class="w_selected_product">
							<div class="title_1">current selected</div>
							<div class="col-xs-4 "><img src="img/product_image_1.jpg" alt="" /></div>
							<div class="col-xs-8 product_details">
								<div class="brand">brand</div>
								<div class="product">Product name</div>
								<div class="shade">Shade Name</div>
								<div class="price">Rs - 00.00 </div>
							</div>
						</div>
						<div class="clearing"></div>
						
						<!-- Seperator -->
						<div class="clearing"></div>
						<div class="w_sep">
							<div class="col-xs-1 "></div>
							<div class="col-xs-10 line"></div>
							<div class="col-xs-1 "></div>
							<div class="clearing"></div>
						</div>
						<div class="clearing"></div>
						
						<!-- Product Shades -->
						<div class="w_product_shades">
							<div class="title_1">Product Shades</div>
							<div style="height: 10px;"></div>
							<div class="col-xs-12">
								<div class="col-xs-5">
									<img src="img/selected_shade_bk.png" alt="" />
								</div>
								<div class="col-xs-7">
									<div class="col-xs-3"><div style="background: #dda68e;" class="shade_box selected"></div></div>
									<div class="col-xs-3"><div style="background: #b0765b;" class="shade_box"></div></div>
									<div class="col-xs-3"><div style="background: #b47d4a;" class="shade_box"></div></div>
									<div class="col-xs-3"><div style="background: #9e6c4e;" class="shade_box"></div></div>
									<div class="col-xs-3"><div style="background: #dfa987;" class="shade_box"></div></div>
									<div class="col-xs-3"><div style="background: #f9bfad;" class="shade_box"></div></div>
									<div class="col-xs-3"><div style="background: #dea78c;" class="shade_box"></div></div>
									<div class="col-xs-3"><div style="background: #e1b299;" class="shade_box"></div></div>
								</div>
							</div>
							<div class="clearing"></div>
						</div>
						
						<!-- Intensity -->
						<div class="w_product_intensity">
							<div class="col-xs-6 ">
								<div class="title_1">Intensity</div>
								<div id="slider"></div>
							</div>
							<div class="col-xs-1 "></div>
							<div class="col-xs-4 addtocart">add to cart</div>
							<div class="col-xs-1 "></div>
						</div>
						<div class="clearing"></div>
						</div>
					  </div>	
					</div>
					<div id="ajax_r_products" class="col-xs-5 products_list">
						<div class="clearing" style="height: 10px; background: #fff;"></div>
						
						<?php foreach ($products as $product => $p) { ?>
						<!-- related product list -->
						<?php foreach ($p["Color"] as $color => $c) { ?>
						<div class="col-xs-12 related_product">
							<div class="col-xs-5 image_box"><img src="img/related_1.jpg" alt="" /></div>
							<div class="col-xs-7">
								<div class="product_name"><?php echo $p["title"]; ?></div>
								<div class="shade_name"><?php echo $c["name"]; ?></div>
								<div class="clearing"></div>
								<div class="col-xs-6 price">Rs - <?php  echo $c["price"]; ?></div><div class="col-xs-6 price">Offer <?php  echo $c["offer"]; ?>%</div>
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
						<?php } ?>
						<?php } ?>

					</div>
					<div class="clearing"></div>

					<!-- What iam wearing -->
					<div class="col-xs-12 " style="background: #fff;">
					
						<div class="w_sep" style="margin-top: 10px;">
							<div class="col-xs-12 line" ></div>
							<div class="clearing"></div>
						</div>
						<div class="clearing"></div>
						
						<div class="all_category">
							<div class="col-xs-3 ">what i'am wearing</div>
							<div class="col-xs-9 sort_by"><a href="javascript:void(0);">face</a>&nbsp;&nbsp;/&nbsp;&nbsp;<a href="javascript:void(0);">eyes</a>&nbsp;&nbsp;/&nbsp;&nbsp;<a href="javascript:void(0);">lips</a>&nbsp;&nbsp;/&nbsp;&nbsp;<a href="javascript:void(0);">nails</a>&nbsp;&nbsp;/&nbsp;&nbsp;<a class="current" href="javascript:void(0);">ALL</a></div>
						</div>
						<div class="clearing"></div>
						
					    <div class="all_products">	
							<div id="all_products" style="display: none;">
							<!-- product List -->
							<div class="pull-left">
								<a class="close">x</a>
								<div class="all_product">
									<div class="col-xs-5 image_box"><img src="img/product_image_1.jpg" alt="" /></div>
									<div class="col-xs-7">
										<div style="height: 10px;" class="clearing"></div>
										<div class="brand_name">Brand</div>
										<div class="product_name">Product name</div>
										<div class="product_name">Category (foundation)</div>
										<div class="shade_name">Shade name</div>
										<div class="price">Rs- 00.00</div>
										<div class="clearing"></div>
									</div>
									<div class="clearing"></div>
								</div>
							</div>
												
							<div class="clearing"></div>
							</div>
						</div>
						
						<div class="clearing"></div>
					</div>
					
				</div>
				
			</div>
		</div>
		<div class="clearing"></div>
	</div>
	
	<div id="json_data"></div>

</body>
</html>