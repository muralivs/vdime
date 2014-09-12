$( document ).ready(function() {
	//alert($.session.get('brand'));
	scripts();
	$(".m-cat").click(function() {
		findsubcat("id", this.id);
		$(".m-cat").css("color","#dcd7d7");
		$(this).css("color","#f00");
	});

	$(".change_brand").click(function() {
		$( ".m_change_brand" ).toggle("display");
	});

	$(".d_before").click(function() {
		$( ".m_before" ).toggle("display");
	});

	var value = "Foundation";
	$( "#ajax_r_products" ).html("Loading...");
	$.ajax({
	    url: 'ajax_r_products.php',
	    dataType: "text",
	    type: 'POST',
	    data: "type="+value,
	    success: function(msg) { 
			$( "#ajax_r_products" ).html(msg);
			if(msg != "No Matching Products") {
				var first_product = $(msg).find(".image_box span.data").html();
				choose_product(first_product);
				$(".jScroll").jScrollPane();
			}
	    }
	});	

});

function scripts(){
	$(".sub_cat").click(function() {
		var value = $(this).html();
		$(".sub_cat").css("color","#dcd7d7");
		$(this).css("color","#f00");
		$( "#ajax_r_products" ).html("Loading...");
		$.ajax({
		    url: 'ajax_r_products.php',
		    dataType: "text",
		    type: 'POST',
		    data: "type="+value,
		    success: function(msg) { 
				$( "#ajax_r_products" ).html(msg);
				if(msg != "No Matching Products") {
					var first_product = $(msg).find(".image_box span.data").html();
					choose_product(first_product);
					$(".jScroll").jScrollPane();
				}
		    }
		});
	});
	
	//Middle Alignment 
	$(".mid_margin").each(function(){
		var p_height = $(this).parent().height();
		var c_height = $(this).height();
		var min_margin = ((p_height - c_height)/2);
		$(this).css("padding", min_margin+"px 0px");
	});
		
	//Select the Model image
	$(".choose_model").click(function(){
		var value = $(this).find("img").attr("src");
		$.ajax({
		    url: 'session.php',
		    dataType: "text",
		    type: 'POST',
		    data: "model="+value,
		    success: function(img) {
				$(".current_model").attr("src", img);
				refresh_model_image();
			}
		});
	});
}

//Refresh the model images setttings
function refresh_model_image() {
	$.ajax({
	    url: 'session.php',
	    dataType: "text",
	    type: 'POST',
	    data: "get_model=1",
	    success: function(data) {
			//initiate canvas
			var canvas = document.getElementById('model_image');
			var context = canvas.getContext('2d');
			context.restore();
			// call functions
			context.save();
			var obj = JSON.parse(data);
			drawbackground(canvas, context, obj["model_image"], obj["type"]); 
			$("#home").css("display", "none");
			$("#products").css("display", "block");
			
	    }
	});	
}

//Apply the Model Images
function drawbackground(canvas, context, img, type) {
	var MAX_WIDTH = 417;
	var background = new Image();
	background.src = img;

	// Get points of image xml from name
	var test_str = img;
	var start_pos = test_str.indexOf('/') + 1;
	var end_pos = test_str.indexOf('.',start_pos);
	var xml_name = test_str.substring(start_pos,end_pos)+".xml";

	background.onload = function(){
		if(background.width > MAX_WIDTH) {
			background.height_2 = canvas.width / background.width;
			background.width_2 = canvas.width;
			scale_x = background.width_2 / background.width;
			scale_y = background.height_2;
			context.scale(scale_x, scale_y);
		}

		//Draw Images
		context.drawImage(background, 0, 0); 
		//Draw Shapes
		drawlines(canvas, context, xml_name, type); 
	}
}

// Draw Area from the XML and apply the shade color
function drawlines(canvas, context, xml_name, type){
    $.ajax({
        type: "GET",
        url: "modelXML/"+xml_name,
        dataType: "xml",
        success: function(xml) {
    		
    		//Lips area
    		context.beginPath();
    		context.globalCompositeOperation="source-over";
    		$(xml).find('LIPS').each(function(){
            	context.lineTo($(this).attr('X'), $(this).attr('Y'));
            });
    		context.closePath();
    		// line color
    		var shade_color = "#"+$(".shade_box.selected").attr("data-color");
    		context.fillStyle = shade_color;
    		var value = $( "#slider" ).slider("option", "value");
            context.globalAlpha = value/100;
            context.fill();
            
            //LipsInner
//            context.globalCompositeOperation="xor";
//    		context.beginPath();
//    		$(xml).find('LIPSINNER').each(function(){
//            	context.lineTo($(this).attr('X'), $(this).attr('Y'));
//            });
//    		context.closePath();
//    		context.fill();
    	}
    });
    
}


function change_brand(b){
	var value = b;
	$( "#ajax_r_products" ).html("Loading...");
	$.ajax({
	    url: 'ajax_r_products.php',
	    dataType: "text",
	    type: 'POST',
	    data: "brand="+value,
	    success: function(msg) { 
			$( "#ajax_r_products" ).html(msg);
			if(msg != "No Matching Products") {
				var first_product = $(msg).find(".image_box span.data").html();
				choose_product(first_product);
				$(".jScroll").jScrollPane();
			}
	    }
	});	
}

function r_choose_product(){
$(".choose_product").click(function(){
	var data = $(this).find(".data").html();
	$.ajax({
	    url: 'choose_product.php',
	    dataType: "text",
	    type: 'POST',
	    data: "data="+data,
	    success: function(msg) { 
			$( "#current_product" ).html(msg);
			$(".jScroll").jScrollPane();
			select_shade();
	    }
	});	
});
}

function choose_product(data){
	$.ajax({
	    url: 'choose_product.php',
	    dataType: "text",
	    type: 'POST',
	    data: "data="+data,
	    success: function(msg) { 
			$( "#current_product" ).html(msg);
			$(".jScroll").jScrollPane();
			select_shade();
			r_choose_product();
	    }
	});	
}

function select_shade(){
	$(".shade_box").click(function(){
		var name = $(this).attr("data-name");
		var price = $(this).attr("data-price");
		var color = $(this).attr("data-color");
		$(".shades_area .shade_box").removeClass("selected");
		$(this).addClass("selected");
		$("#current_product .product_details .shade").html(name);
		$("#current_product .product_details .price").html("Rs - "+ price +".00");
		$("img.current_shade").css("background","#"+color);
		
		//add selected shade to what i am wearing
		var data = $("#current_product_data").html(); 
		var color = $(this).find("span").html();
		what_wearing(data, color);
		
		//Refresh canvas details
		refresh_model_image();
	});
	
	$(function() {
		$( "#slider" ).slider({"value" : 40 });
		$( "#slider" ).on( "slidechange", function( event, ui ) {refresh_model_image();} );
	});
}

function what_wearing(data, color){
	console.clear();
	$.ajax({
	    url: 'what_wearing.php',
	    dataType: "text",
	    type: 'POST',
	    data: "data="+data+"&color="+color,
	    success: function(msg) { 
			$("#all_products").html(msg);
			$("#all_products").css("display","block");
	    }
	});	
}

function findsubcat(propName, propValue) {
	$( "#sub_cat" ).html("");
	$.get('js/category.json', function(data) {
		$.each(data, function(i, item) {
			if (data[i][propName] == propValue) {
				$.each(data[i].subcat, function(y, item) {
					if(y == 0 ){
						$( "#sub_cat" ).append("<a class='sub_cat' id='"+ data[i].subcat[y].id +"' href='javascript:void(0);'>"+ data[i].subcat[y].name +"</a>");
					} else {
						$( "#sub_cat" ).append("&nbsp;|&nbsp;<a class='sub_cat' id='"+ data[i].subcat[y].id +"' href='javascript:void(0);'>"+ data[i].subcat[y].name +"</a>");
					}
				});
			}
		});
	}).done(function() {
		scripts();
	});
}


$(function(){

    var ul = $('#upload ul');

    $('#drop a').click(function(){
        // Simulate a click on the file input button
        // to show the file browser dialog
        $(this).parent().find('input').click();
    });

    // Initialize the jQuery File Upload plugin
    $('#upload').fileupload({

        // This element will accept file drag/drop uploading
        dropZone: $('#drop'),

        // This function is called when a file is added to the queue;
        // either via the browse button, or via drag/drop:
        add: function (e, data) {

    		$("#home").css("display", "none");
    		$("#products").css("display", "block");

            // Automatically upload the file once it is added to the queue
            var jqXHR = data.submit();
        },

        progress: function(e, data){

            // Calculate the completion percentage of the upload
            var progress = parseInt(data.loaded / data.total * 100, 10);

            // Update the hidden input field and trigger a change
            // so that the jQuery knob plugin knows to update the dial
            //data.context.find('input').val(progress).change();

            if(progress == 100){
                //data.context.removeClass('working');
            }
        },

        fail:function(e, data){
            // Something has gone wrong!
            //data.context.addClass('error');
        },
        
        success:function(){
        	$.ajax({
        	    url: 'session.php',
        	    dataType: "text",
        	    type: 'POST',
        	    data: "get_model=1",
        	    success: function(data) {
	        		var obj = JSON.parse(data);
	        		$(".current_model").attr("src", obj["model_image"]); 
        		}
        	});
        	refresh_model_image();
        }

    });


    // Prevent the default action when a file is dropped on the window
    $(document).on('drop dragover', function (e) {
        e.preventDefault();
    });

    // Helper function that formats the file sizes
    function formatFileSize(bytes) {
        if (typeof bytes !== 'number') {
            return '';
        }

        if (bytes >= 1000000000) {
            return (bytes / 1000000000).toFixed(2) + ' GB';
        }

        if (bytes >= 1000000) {
            return (bytes / 1000000).toFixed(2) + ' MB';
        }

        return (bytes / 1000).toFixed(2) + ' KB';
    }

});
//
//function brand(obj) {
//	$.each(obj, function(i, o) {
//	    $.each(o, function(ii, oo) {
//	        alert(ii + "=" + oo.name);
//	        $.each(oo.Area, function(iii, ooo) {
//	        	alert(oo.name+ "=" + iii + "=" + ooo.title);
//	        });
//	    });
//	});
//}
//
//
//$.ajax({
//    url: "js/products.json",
//    //force to handle it as text
//    dataType: "text",
//    success: function(data) {
//        //data downloaded so we call parseJSON function 
//        //and pass downloaded data
//        var json = $.parseJSON(data);
//        //now json variable contains data in json format
//        //let's display a few items
////        brand(json.Shades);
//        //$('#test').html('Plugin name: ' + json.Shades);
//        console.log(json.Shades);
//    }
//});
