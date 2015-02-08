// Portions from: Chris Coyier - http://css-tricks.com/css3-progress-bars/

var canceled = false;
var cancelButtonColors;
var cancelButtonIsEnabled = false;
var stepsCompleted = 0;
var totalSteps = 100;

cancelButtonColors = {
	active: '#7d7d7d',
	disabled: '#e7e7e7',
	enabled: '#bdbdbd',
	hover: '#9d9d9d'};
		
function setStepsCompleted (steps) {
	stepsCompleted = steps >= 0 ? steps : 0;
	
	if (stepsCompleted > totalSteps) {
		totalSteps = stepsCompleted;
	}
	
	setProgress();
}

function setTotalSteps (steps) {
	totalSteps = steps >= 0 ? steps : 0;
	
	if (stepsCompleted > totalSteps) {
		stepsCompleted = 0;
	}
	
	setProgress();
}

function setProgress () {
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

function setTextWidth (percentage) {
	var $text = $("#progressMeter-text");
	
	$text.width(percentage + "%");
	
	if (percentage === 0) {
		$text.hide();
	}
	else {
		$text.show();
	}
	
	setElementSizes();
}

function setCancelButtonSize () {
	var $cancelButton = $(".cancel-button");
	var cancelButtonSizes;
	var fontSize;
	var i;
	var idealCancelButtonPixelSize;
	var topMargin;

	idealCancelButtonPixelSize = $("#progressMeter").height() * 2;
	
	cancelButtonSizes = [
		{pixels: 15, fontSize: 20},
		{pixels: 19, fontSize: 26},
		{pixels: 24, fontSize: 33},
		{pixels: 29, fontSize: 39},
		{pixels: 34, fontSize: 46},
		{pixels: 39, fontSize: 52},
		{pixels: 43, fontSize: 58},
		{pixels: 48, fontSize: 65},
		{pixels: 53, fontSize: 71},
		{pixels: 58, fontSize: 78},
		{pixels: 63, fontSize: 84}];
	
	for(i = cancelButtonSizes.length - 1;i >= 0; i--) {
		if (cancelButtonSizes[i].pixels <= idealCancelButtonPixelSize) {
			break;
		}
	}
	
	fontSize = (i < 0) ? cancelButtonSizes[0].fontSize : cancelButtonSizes[i].fontSize;
	
	$cancelButton.css('font-size', fontSize);
	
	topMargin = ($("#container").height() - $cancelButton.outerHeight()) / 2;
    $cancelButton.css('margin-top', topMargin);
}

function setFontSize () {
	var $cancelButton = $(".cancel-button");
	var cancelButtonLeftMargin;
	var fontSize;
	var $text = $("#progressMeter-text");
	var textRightMargin;

	setCancelButtonSize();
	
    fontSize = $text.height() * 0.85;
    $text.css('font-size', fontSize);
	
	textRightMargin = ($text.width() > 0) ? fontSize : 0;
	
	cancelButtonLeftMargin = $cancelButton.width() * .7;
	
    $("#progressMeter").css('width', $("#container").width() - $text.width() - textRightMargin - $cancelButton.width() - cancelButtonLeftMargin);			
    $text.css('margin-right', textRightMargin);
	$cancelButton.css('margin-left', cancelButtonLeftMargin);
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
	padding = padding < 6 ? padding : 5;
	
	$node.find("div").css("padding", padding + "px");
}

function setCancelButtonColors () {
	var $cancelButton = $('.cancel-button');

	if (cancelButtonIsEnabled) {
		$cancelButton
			.css('background', cancelButtonColors.enabled)
			.mousedown(function () {
  				$(this).css("background", cancelButtonColors.active)
			})
			.mouseup(function () {
  				$(this).css("background", cancelButtonColors.hover)
			})
			.mouseover(function () {
  				$(this).css("background", cancelButtonColors.hover)
			})
			.mouseout(function () {
  				$(this).css("background", cancelButtonColors.enabled)
			});
	}
	else {
		$cancelButton
			.css('background', cancelButtonColors.disabled)
			.mousedown(function () {
  				$(this).css("background", cancelButtonColors.disabled)
			})
			.mouseup(function () {
  				$(this).css("background", cancelButtonColors.disabled)
			})
			.mouseover(function () {
  				$(this).css("background", cancelButtonColors.disabled)
			})
			.mouseout(function () {
  				$(this).css("background", cancelButtonColors.disabled)
			});
	}
}

function enableCancelButton () {
	cancelButtonIsEnabled = true;
	setCancelButtonColors();
	setCancelButtonClick();
}

function disableCancelButton () {
	cancelButtonIsEnabled = false;
	setCancelButtonColors();
	setCancelButtonClick();
}

function setCancelButtonColor (color) {
	cancelButtonColors.enabled = color;
	setCancelButtonColors();
}

function setCancelButtonHoverColor (color) {
	cancelButtonColors.hover = color;
	setCancelButtonColors();
}

function setCancelButtonActiveColor (color) {
	cancelButtonColors.active = color;
	setCancelButtonColors();
}

function setCancelButtonDisabledColor (color) {
	cancelButtonColors.disabled = color;
	setCancelButtonColors();
}

function userCanceled () {
	return canceled;
}

function resetUserCanceled () {
	canceled = false;
}

function setCancelButtonClick () {
	var $cancelButton = $('.cancel-button');
	
	if (cancelButtonIsEnabled) {
		$cancelButton.click(function () {
    		canceled = true;
		});
	}
	else {
		$cancelButton.click(function () {
    		// Do nothing.
		});
	}
}

$(window).resize(setElementSizes);

$(document).ready(function () {
    setProgress();
	setElementSizes();
});
