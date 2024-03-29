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
			window.imgurl = obj["model_image"];
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
			//Scale canvas to fit
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
    			if(o.type == "Foundation") {
    				window.d_foundation = "true";
    				window.d_shade_c = o.Color.value;
    				window.op_value = o.op_value;
    			}
	    	});
    		if(window.d_foundation == "true") {
    			draw_foundation(xml, canvas, context, window.d_shade_c, window.op_value);
    		}
    		$.each(model_data, function(i, o) {
    			if(o.type == "Lipstick") {
    				draw_lipstick(xml, canvas, context, o.Color.value, o.op_value);
    			} else if(o.type == "Eyeliner") {
    				draw_eyeliner(xml, canvas, context, o.Color.value, o.op_value); 
    			} else if(o.type == "Lip Liner") {
    				draw_lipsliner(xml, canvas, context, o.Color.value, o.op_value); 
    			} else if(o.type == "Concealer") {
    				draw_concealer(xml, canvas, context, o.Color.value, o.op_value); 
    			} else if(o.type == "Blush") {
    				draw_blush(xml, canvas, context, o.Color.value, o.op_value); 
    			} else if(o.type == "Eyeshadow") {
    				draw_eyeshadow(xml, canvas, context, o.Color.value, o.op_value); 
    			} else if(o.type == "Eyeshadow") {
    				draw_eyeshadow(xml, canvas, context, o.Color.value, o.op_value); 
    			} else if(o.type == "Kajal") {
    				draw_kajal(xml, canvas, context, o.Color.value, o.op_value); 
    			} else if(o.type == "Mascara") {
    				draw_mascara(xml, canvas, context, o.Color.value, o.op_value); 
    			}
	    	});
    	  }
    	  console.log(model_data);
    	}
    });
}

function draw_mascara(xml, canvas, context, shade, op_value){
	d_areas = ["LOWERLEFTMASCARA", "LOWERRIGHTMASCARA", "UPPERLEFTMASCARA", "UPPERRIGHTMASCARA"];
	context.fillStyle = shade;
	context.globalAlpha = op_value/100;
	do_type = "fill";
    draw_paths(d_areas, xml, canvas, context, do_type);
}

function draw_kajal(xml, canvas, context, shade, op_value){
	d_areas = ["KAJALLOWERLEFT", "KAJALLOWERRIGHT"];
	context.fillStyle = shade;
	context.globalAlpha = op_value/100;
	do_type = "fill";
    draw_paths(d_areas, xml, canvas, context, do_type);
}

function draw_eyeshadow(xml, canvas, context, shade, op_value){
	d_areas = ["EYESHADOWLIDLEFT", "EYESHADOWLIDRIGHT", "EYESHADOWCONTOURLEFT", "EYESHADOWCONTOURRIGHT" ,"EYESHADOWHIGHLIGHTLEFT" ,"EYESHADOWHIGHLIGHTRIGHT"];
	context.fillStyle = shade;
	context.globalAlpha = op_value/100;
	do_type = "fill";
    draw_paths(d_areas, xml, canvas, context, do_type);
}

function draw_blush(xml, canvas, context, shade, op_value){
	d_areas = ["LEFTCHEEK", "LEFTCHEEKSTYLE2", "LEFTCHEEKSTYLE3", "RIGHTCHEEK" ,"RIGHTCHEEKSTYLE2" ,"RIGHTCHEEKSTYLE3"];
	context.fillStyle = shade;
	context.globalAlpha = op_value/100;
	do_type = "fill";
    draw_paths(d_areas, xml, canvas, context, do_type);
}

function draw_concealer(xml, canvas, context, shade, op_value){
	d_areas = ["CONCEALERLEFT, CONCEALERRIGHT"];
	context.fillStyle = shade;
	context.globalAlpha = op_value/100;
	do_type = "fill";
    draw_paths(d_areas, xml, canvas, context, do_type);
}

function draw_eyeliner(xml, canvas, context, shade, op_value) {
	d_areas = ["EYELINERLOWERRIGHT", "EYELINERUPPERLEFT", "EYELINERUPPERRIGHT", "EYELINERLOWERLEFT"];
	context.strokeStyle = shade;
    context.globalAlpha = op_value/100;
    do_type = "stroke";
    context.lineWidth = 6;
    draw_paths(d_areas, xml, canvas, context, do_type);
}

function draw_lipsliner(xml, canvas, context, shade, op_value) {
	d_areas = ["LIPS"];
	context.strokeStyle = shade;
    context.globalAlpha = op_value/100;
    do_type = "stroke";
    close_path = "true";
    context.lineWidth = 6;
    draw_paths(d_areas, xml, canvas, context, do_type, close_path);
}

function draw_lipstick(xml, canvas, context, shade, op_value){
	//Create area for Lips
	d_areas = ["LIPS"];
	context.fillStyle = shade;
	context.globalAlpha = op_value/100;
	do_type = "fill";
    draw_paths(d_areas, xml, canvas, context, do_type);
    
    var islipsopen = $(xml).find("IsMouthOpen").html();
    if(islipsopen == "true"){
        //Clip excess areas
        var areas = ["LIPSINNER"];
        clip_excess_regions(areas, xml, canvas, context);
    }
}

//Drawing the foundation
function draw_foundation(xml, canvas, context, shade, op_value) {
	//Create area for foundation
	d_areas = ["FACE"];
	context.fillStyle = shade;
    context.globalAlpha = op_value/100;
    do_type = "fill";
    draw_paths(d_areas, xml, canvas, context, do_type);
    
    //Clip excess areas
    var areas = ["LIPS", "RIGHTEYE", "LEFTEYE", "LEFTEYEBROW", "RIGHREYEBROW", "KAJALLOWERLEFT", "KAJALLOWERRIGHT", "EYESHADOWLIDLEFT", "EYESHADOWLIDRIGHT", "EYESHADOWCONTOURLEFT", "EYESHADOWCONTOURRIGHT", "EYESHADOWHIGHLIGHTLEFT", "EYESHADOWHIGHLIGHTRIGHT", "CONCEALERLEFT", "CONCEALERRIGHT"];
    clip_excess_regions(areas, xml, canvas, context);
}

function clip_excess_regions(areas, xml, canvas, context){
	for ( var int = 0; int < areas.length; int++) {
		context.save();
		d_areas = [areas[int]];
	    context.globalAlpha = 1;
	    do_type = "clip";
	    draw_paths(d_areas, xml, canvas, context, do_type);
	    re_draw(canvas, context);
	    context.restore();
	}
}

function re_draw(canvas, context) {
    var background = new Image();
	background.src = window.imgurl;
    context.drawImage(background, 0, 0); 
}

function draw_paths(d_areas, xml, canvas, context, do_type, close_path){
  for ( var int = 0; int < d_areas.length; int++) {
	
	context.beginPath();
	t_counts = $(xml).find(d_areas[int]).size();
	//Start on the first point
	context.moveTo($(xml).find(d_areas[int]).eq(0).attr('X'), $(xml).find(d_areas[int]).eq(0).attr('Y'));
	
	if (do_type == "stroke") {
		//Looping to the last points
		$(xml).find(d_areas[int]).each(function(index){
			if(index < parseInt(t_counts)-1) {
		      var xc = (parseInt($(this).attr('X')) + parseInt($(this).next().attr('X'))) / 2;
		      var yc = (parseInt($(this).attr('Y')) + parseInt($(this).next().attr('Y'))) / 2;
		      context.quadraticCurveTo($(this).attr('X'), $(this).attr('Y'), xc, yc);
		      context.quadraticCurveTo(xc, yc, $(this).next().attr('X'), $(this).next().attr('Y'));
			}
	    });		
	} else {
		
	//Looping to the last points
	$(xml).find(d_areas[int]).each(function(index){
		if(index < parseInt(t_counts)-1) {
	      var xc = (parseInt($(this).attr('X')) + parseInt($(this).next().attr('X'))) / 2;
	      var yc = (parseInt($(this).attr('Y')) + parseInt($(this).next().attr('Y'))) / 2;
	      context.quadraticCurveTo($(this).attr('X'), $(this).attr('Y'), xc, yc);
		} else {
	      xc = (parseInt($(xml).find(d_areas[int]).eq(-1).attr('X')) + parseInt($(xml).find(d_areas[int]).eq(0).attr('X'))) / 2;
	      yc = (parseInt($(xml).find(d_areas[int]).eq(-1).attr('Y')) + parseInt($(xml).find(d_areas[int]).eq(0).attr('Y'))) / 2;
	      context.quadraticCurveTo($(xml).find(d_areas[int]).eq(-1).attr('X'), $(xml).find(d_areas[int]).eq(-1).attr('Y'), xc, yc);
		}
    });
	
	//Curve from last before point to the end point
    xc = (parseInt($(xml).find(d_areas[int]).eq(-1).attr('X')) + parseInt($(xml).find(d_areas[int]).eq(0).attr('X'))) / 2;
    yc = (parseInt($(xml).find(d_areas[int]).eq(-1).attr('Y')) + parseInt($(xml).find(d_areas[int]).eq(0).attr('Y'))) / 2;
    context.quadraticCurveTo($(xml).find(d_areas[int]).eq(-1).attr('X'), $(xml).find(d_areas[int]).eq(-1).attr('Y'), xc, yc);

    //Draw Curve from 0 point to first point 
    xc = (parseInt($(xml).find(d_areas[int]).eq(0).attr('X')) + parseInt($(xml).find(d_areas[int]).eq(1).attr('X'))) / 2;
    yc = (parseInt($(xml).find(d_areas[int]).eq(0).attr('Y')) + parseInt($(xml).find(d_areas[int]).eq(1).attr('Y'))) / 2;
    context.quadraticCurveTo($(xml).find(d_areas[int]).eq(0).attr('X'), $(xml).find(d_areas[int]).eq(0).attr('Y'), xc, yc);
	}
    if (do_type == "fill") {
    	context.closePath();
    	context.fill();
	} else if (do_type == "clip") {
		context.closePath();
		context.clip();
	} else if (do_type == "stroke") {
		if(close_path == "true") {
			context.closePath();
		}
		context.stroke();
	}    
  }
}