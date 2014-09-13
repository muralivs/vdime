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
    			 if(o.type == "Lipstick") {
    				draw_lipstick(xml, canvas, context, o.Color.value, o.op_value);
    			} else if(o.type == "Foundation") {
    				draw_foundation(xml, canvas, context, o.Color.value, o.op_value); 
    			}
	    	});
    		console.log(model_data);
    	  }
    	}
    });
}
function draw_lipstick(xml, canvas, context, shade, op_value){
	//Create area for Lips
	draw_paths("LIPS", xml, canvas, context);
	context.fillStyle = shade;
	console.log(shade);
    context.globalAlpha = op_value/100;
    context.fill();
    
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
	draw_paths("FACE", xml, canvas, context);
	context.fillStyle = shade;
    context.globalAlpha = op_value/100;
    context.fill();
    //Clip excess areas
    var areas = ["LIPS", "RIGHTEYE", "LEFTEYE", "LEFTEYEBROW", "RIGHREYEBROW", "KAJALLOWERLEFT", "KAJALLOWERRIGHT", "EYESHADOWLIDLEFT", "EYESHADOWLIDRIGHT", "EYESHADOWCONTOURLEFT", "EYESHADOWCONTOURRIGHT", "EYESHADOWHIGHLIGHTLEFT", "EYESHADOWHIGHLIGHTRIGHT", "CONCEALERLEFT", "CONCEALERRIGHT"];
    clip_excess_regions(areas, xml, canvas, context);
}

function clip_excess_regions(areas, xml, canvas, context){
	for ( var int = 0; int < areas.length; int++) {
		context.save();
	    draw_paths(areas[int], xml, canvas, context);
	    context.globalAlpha = 1;
	    context.clip();
	    re_draw(canvas, context);
	    context.restore();
	}
}

function re_draw(canvas, context) {
    var background = new Image();
	background.src = window.imgurl;
    context.drawImage(background, 0, 0); 

}

function draw_paths(area, xml, canvas, context){
	
	context.save();
	context.beginPath();
	t_counts = $(xml).find(area).size();
//	alert(area);
	//Start on the first point
	context.moveTo($(xml).find(area).eq(0).attr('X'), $(xml).find(area).eq(0).attr('Y'));
	
	//Looping to the last points
	$(xml).find(area).each(function(index){
		if(index < parseInt(t_counts)-1) {
	      var xc = (parseInt($(this).attr('X')) + parseInt($(this).next().attr('X'))) / 2;
	      var yc = (parseInt($(this).attr('Y')) + parseInt($(this).next().attr('Y'))) / 2;
	      context.quadraticCurveTo($(this).attr('X'), $(this).attr('Y'), xc, yc);
		} else {
	      xc = (parseInt($(xml).find(area).eq(-1).attr('X')) + parseInt($(xml).find(area).eq(0).attr('X'))) / 2;
	      yc = (parseInt($(xml).find(area).eq(-1).attr('Y')) + parseInt($(xml).find(area).eq(0).attr('Y'))) / 2;
	      context.quadraticCurveTo($(xml).find(area).eq(-1).attr('X'), $(xml).find(area).eq(-1).attr('Y'), xc, yc);
		}
    });
	
	//Curve from last before point to the end point
    xc = (parseInt($(xml).find(area).eq(-1).attr('X')) + parseInt($(xml).find(area).eq(0).attr('X'))) / 2;
    yc = (parseInt($(xml).find(area).eq(-1).attr('Y')) + parseInt($(xml).find(area).eq(0).attr('Y'))) / 2;
    context.quadraticCurveTo($(xml).find(area).eq(-1).attr('X'), $(xml).find(area).eq(-1).attr('Y'), xc, yc);

    //Draw Curve from 0 point to first point 
    xc = (parseInt($(xml).find(area).eq(0).attr('X')) + parseInt($(xml).find(area).eq(1).attr('X'))) / 2;
    yc = (parseInt($(xml).find(area).eq(0).attr('Y')) + parseInt($(xml).find(area).eq(1).attr('Y'))) / 2;
    context.quadraticCurveTo($(xml).find(area).eq(0).attr('X'), $(xml).find(area).eq(0).attr('Y'), xc, yc);

    context.closePath();
    context.restore();

}