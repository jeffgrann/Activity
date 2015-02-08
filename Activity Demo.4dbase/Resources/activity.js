function setProgress (totalSteps, stepsCompleted) {
	var $animationSpan;
	var $node = $("#progressMeter");
	var percentComplete;
	var $span;
	
	$span = $node.find("span");
	$animationSpan = $span.find("span");
	
	if (totalSteps <= 0) {
		$span.css("width", "100%");
		
		if ($animationSpan.length === 0) {
			$span.html('<span></span>');
		}
	}
	else {
		percentComplete = totalSteps <= 0 || stepsCompleted < 0 ? 0 : Math.floor(stepsCompleted / totalSteps * 100);
		percentComplete = percentComplete > 100 ? 100 : percentComplete;
		
		$span.css("width", percentComplete + "%");
		
		if ($animationSpan.length > 0) {
			$span.html('');
		}
	}
}

function setText (text) {
	$("#progressMeter-text").text(text);
}

function setMeterWidth (percentage) {
	$("#progressMeter").width(percentage + "%");
	
	if (percentage === 100) {
		$("#progressMeter-text").hide();
	}
	else {
		$("#progressMeter-text").show();
	}
	
	setElementSizes();
}

function setFontSize () {
    var fontSize = $("#progressMeter-text").height();
    $("#progressMeter-text").css('font-size', fontSize);
	var rightMargin = fontSize;
    $("#progressMeter-text").css('width', $("#container").width() - $("#progressMeter").width() - rightMargin);	
    $("#progressMeter-text").css('margin-right', rightMargin);	
}

function setFontColor (fontColor) {
	$("#progressMeter-text").css('color', fontColor);
}

function setFontFamily (fontFamily) {
	$("#progressMeter-text").css('font-family', fontFamily);
}

function setFontWeight (fontWeight) {
	$("#progressMeter-text").css('font-weight', fontWeight);
}

function setBackgroundColor (color) {
	$("body").css('background-color', color)
}

function setMeterBackgroundColor (color) {
	$(".sw-widget-progressMeter").css('background', color)
}

function setMeterBorderColor (color) {
	$(".sw-widget-progressMeter").css('border-color', color)
}

function setMeterColor (color) {
	$(".sw-widget-progressMeter > span").css('background-color', color)
}

function hide () {
	$("#container").hide();
}

function show () {
	$("#container").show();
}

function setProgressTopMargin () {
    var topMargin = ($("#container").height() - $(".sw-widget-progressMeter").outerHeight()) / 2;
    $("#progressMeter").css('margin-top', topMargin);
}

function setElementSizes () {
	setFontSize();
	setProgressTopMargin();
	setPadding();
}

function setPadding () {
	var $node = $("#progressMeter");
	var padding;
	
	padding = Math.floor($node.outerHeight() / 5);
	padding = padding > 0 ? padding : 1;
	
	$node.find("div").css("padding", padding + "px");
}

$(window).resize(setElementSizes);

$(document).ready(function () {
    setProgress(100, 0);
	setElementSizes();
	setMeterWidth(100); 
/*
	setFontFamily('"HelveticaNeue-Light", "Helvetica Neue Light", "Helvetica Neue", Helvetica, Arial, "Lucida Grande", sans-serif');
	setFontWeight(300);
	setFontColor('#444');
	setBackgroundColor('#c4c4c4');
	setMeterBackgroundColor('#fff');
	setMeterBorderColor('#777');
	setMeterColor('#ff9900');
	setText("Finding your best clients...");
	*/
});
