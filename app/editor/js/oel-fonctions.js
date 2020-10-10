
//FUNCTIONS
function getWindowHeight() {
	
	var windowHeight = 0;
	if (typeof(window.innerHeight) == 'number') {
		windowHeight = window.innerHeight;
	}else{
		if(document.body && document.body.clientHeight) {
			windowHeight = document.body.clientHeight;
		}else{
		  if (document.documentElement && document.documentElement.clientHeight) {
			windowHeight = document.documentElement.clientHeight;
		  }
		}
	}

	return windowHeight;
}

function getWindowWidth() {

	var windowWidth = 0;

	if (typeof(window.innerWidth) == 'number') {
		windowWidth = window.innerWidth;
	}else{
		if(document.body && document.body.clientWidth) {
			windowWidth = document.body.clientWidth;
		}else{
		  if (document.documentElement && document.documentElement.clientHeight) {
			windowWidth = document.documentElement.clientHeight;
		  }
		}
	}

	return windowWidth;

}

function getBodyHeight() {
	
	var body = document.body;
    html = document.documentElement;
	
	var height = Math.max( body.scrollHeight, body.offsetHeight, html.clientHeight, html.scrollHeight, html.offsetHeight );
	return height;
	
}

function replaceAll(txt, replace, with_this) {
  return txt.replace(new RegExp(replace, 'g'),with_this);
}

function rectangledText(ctx,x, y,width,text,fontsize,fontface,textColor) { 
	
	self.TextWidth = ctx.measureText(Text).width;
	var height = wrapText(ctx,x, y,text,fontsize,fontface,width,textColor)

}

function cleanText(text){
	text = replaceAll(text,'</br>','     ');
	text = replaceAll(text,'<br>' ,'     ');
	text = replaceAll(text,'</span>','');
	text = replaceAll(text,'<span>','');
	return text;
}

function cleanTextForTitle(text){
	text = text.replace(/(<p[^>]+?>|<p>|<\/p>)/img,"");
	return text;
}

function wrapText(ctx,x, y, text, fontsize, fontface, maxwidth,textColor){
	var startingY = y;
	var words = text.split(' ');
	var line = '';
	var space = '';
	var lineHeight = fontsize * 1.286;
	ctx.font = fontsize + "px " + fontface;
	ctx.textAlign = 'left';
	ctx.textBaseline = 'top'
	ctx.fillStyle = textColor;
	for (var n = 0; n < words.length; n++) {
		var testLine = line + space + words[n];
		space = ' ';
		if (ctx.measureText(testLine).width > maxwidth) {
			ctx.fillText(line, x, y);
			line = words[n] + ' ';
			y += lineHeight;
			space = '';
		} else {
			line = testLine;
		}
	}
	ctx.fillText(line, x, y);
	return (y + lineHeight - startingY);
}

function getTextWidth(text, font) {
    var canvas = getTextWidth.canvas || (getTextWidth.canvas = document.createElement("canvas"));
    var context = canvas.getContext("2d");
    context.font = font;
    var metrics = context.measureText(text);
    return metrics.width;
}
