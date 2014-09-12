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

	$("#model_image").css("background-image", img);

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
	};
}

// Draw Area from the XML and apply the shade color
function drawlines(canvas, context, xml_name){
    $.ajax({
        type: "GET",
        url: "modelXML/"+xml_name,
        dataType: "xml",
        success: function(xml) {
    	  if($("#what_iam_wearing").html() != "") {
    		model_data = jQuery.parseJSON($("#what_iam_wearing").html()); 
    		
    		$.each(model_data, function(i, o) {
    			if(o.type = "foundation") {
    				draw_foundation(xml, canvas, context);
    			}
//    		  alert(o.type);
	    	});
    		console.log(model_data);
    	  }
//    		//Lips area
//    		context.beginPath();
//    		context.globalCompositeOperation = "destination-atop";
//    		$(xml).find('LIPS').each(function(){
//            	context.lineTo($(this).attr('X'), $(this).attr('Y'));
//            });
//    		context.closePath();
//    		// line color
//    		var shade_color = "#"+$(".shade_box.selected").attr("data-color");
//    		context.fillStyle = shade_color;
//    		var value = $( "#slider" ).slider("option", "value");
////            context.globalAlpha = value/100;
//            context.clip();
//            
//            //LipsInner
////            context.globalCompositeOperation="xor";
//    		context.beginPath();
//    		$(xml).find('LIPSINNER').each(function(){
//            	context.lineTo($(this).attr('X'), $(this).attr('Y'));
//            });
//    		context.closePath();
//    		context.fill();
    		

    	}
    });
    
}


//Drawing the foundation
function draw_foundation(xml, canvas, context) {
	

	
	context.beginPath();
	$(xml).find('FACE').each(function(){
    	context.lineTo($(this).attr('X'), $(this).attr('Y'));
    });
	context.closePath();
	var shade_color = "#"+$(".shade_box.selected").attr("data-color");
	context.fillStyle = shade_color;
	var value = $( "#slider" ).slider("option", "value");
    context.globalAlpha = value/100;
    context.fill();


    context.globalCompositeOperation = "destination-out";
	context.beginPath();
	$(xml).find('LIPS').each(function(){
    	context.lineTo($(this).attr('X'), $(this).attr('Y'));
    });
	context.closePath();
	context.globalAlpha = 1;
    context.fill();

    context.restore();
}