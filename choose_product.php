<?php 
session_start();
if (isset($_POST['data']) != "") {
	$product = json_decode($_POST["data"], true);
}
?>
						<!-- Selected Product Details -->
						<div id="current_product">
						<span style="display:none;" id="current_product_data"><?php echo $_POST["data"]; ?></span>
						<div class="w_selected_product">
							<div class="title_1">current selected</div>
							<div class="col-xs-4 "><img src="<?php if($product["productImage"] != ""){ echo $product["productImage"]; } else {echo "img/NoPhotoAvailable.jpg"; } ?>" alt="" /></div>
							<div class="col-xs-8 product_details">
								<div class="brand"><?php echo $_SESSION["brand"]; ?></div>
								<div class="product"><?php echo $product["title"]; ?></div>
								<div class="shade"><?php echo $product["Color"][0]["name"]; ?></div>
								<div class="price">Rs - <?php echo $product["Color"][0]["price"]; ?>.00 </div>
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
								<div class="col-xs-4">
									<img class="current_shade" src="img/selected_shade_bk.png" alt="" style="background: #<?php echo str_replace("0x", "", strtolower($product["Color"][0]["value"])); ?>"/>
								</div>
								<div class="col-xs-8 shades_area jScroll">
									
										<?php $i=0; foreach ($product["Color"] as $shades => $s) {  ?>
											<div class="col-xs-3"><div style='background: #<?php echo str_replace("0x", "", strtolower($s["value"])); ?>;' class="shade_box <?php if ($i==0) {?>selected<?php }?>" data-name="<?php echo $s["name"]; ?>" data-price="<?php echo $s["price"]; ?>" data-color="<?php echo str_replace("0x", "", strtolower($s["value"])); ?>"><span style="display:none;"><?php echo json_encode($s); ?></span></div></div>
										<?php $i=$i+1; } ?>
									<div class="clearing"></div>
									
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
