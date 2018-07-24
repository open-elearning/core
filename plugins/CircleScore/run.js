
function onPaint(obj){
	var sp = LUDI.getScore();
	var html = '<div class="circlescore progress-'+sp+' bloc' + obj.id + '" >';
	html += '<span>'+sp+'</span></div>';
	return html;
}

function onZoom(obj){
	
	var xb = parseInt(obj.x * zoom);
	var yb = parseInt(obj.y * zoom);
	
	var wb = parseInt(obj.w * zoom);
	var hb = parseInt(obj.h * zoom);
	
}

function isOK(obj){
	
	
}
