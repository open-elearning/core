/*
OPEN ELEARNING PLUGIN
Plugin for http://www.openelearning.org/
Authoring Tools for eLearning on Linux, Mac, and Windows
incrementNumeric
*/

function onPaint(obj){
	
	var uid = '';
	
	if('function' == typeof(LUDI.guid)){
		uid = LUDI.guid();
	}else{
		return '<div class="bloc'+obj.id+'" >Please update software</div>';
	}
	
	obj.idstr = uid;
	
	var h = '<table id="'+ uid +'" class="incrementNumeric  incrementNumeric' + obj.id + '" >';
	
	h += '<tr><td>';
	
	h += '<input id="input'+uid+'" name="input'+uid+'" ';
	h += ' type="text" value="0" ';
	h += 'class="' + obj.fields[6] + ' incrementNumericinput" />';
	
	h += '</td><td>';
	
	h += getRoundButtonIncrementNumeric(obj.id,'addIncrementNumeric','data/plusincrement.png');
	
	h += getRoundButtonIncrementNumeric(obj.id,'delIncrementNumeric','data/minincrement.png');
	
	h += '</td></tr></table>';
	
	//Call previous seizures
	setTimeout(function(){
		recupDataObjectMem(obj,lastPage0);
	},200);
	
	//Call of the numerical control
	setTimeout('controlIncrementNumericStringOnly("' + obj.id + '");',500);
	
	return h;
	
}

function controlIncrementNumericStringOnly(i){
	
	var obj = CObjets[i];
	var str = $('#input' + obj.idstr).val();
	var regexp = /^[0-9]+([,.][0-9]+)?$/g;
	var result = regexp.test(str);
	
	var strFloat = parseFloat(str);
	
	if(result==false){
		strFloat = parseFloat(str);
	}
	
	var min = parseFloat(obj.fields[1]);
	var max = parseFloat(obj.fields[2]);
	var decimal = parseInt(obj.fields[3]);
	
	if(strFloat<min){
		strFloat = min;
	}
	if(strFloat>max){
		strFloat = max;
	}
	if(decimal<1||decimal==''){
		strFloat = parseInt(strFloat);
	}
	if(decimal>0){
		strFloat = Math.round(strFloat*Math.pow(10, decimal))/Math.pow(10, decimal);
	}
	if(isNaN(strFloat)){
		strFloat=min;
	}
	if(strFloat=='NaN'){
		strFloat=min;
	}
	
	$('#input' + obj.idstr).val(strFloat.toFixed(decimal));
	
	if(document.getElementById('input' + obj.idstr)){
		setTimeout('controlIncrementNumericStringOnly("' + obj.id + '");',500);
	}
}

function addIncrementNumeric(i){
	
	var obj = CObjets[i];
	if(document.getElementById('input' + obj.idstr)){
		var decimal = parseInt(obj.fields[3]);
		var flt = parseFloat($('#input' + obj.idstr).val());
		var incr = parseFloat(obj.fields[4]);
		flt = flt + incr;
		$('#input' + obj.idstr).val(flt.toFixed(decimal));
	}
	
}

function delIncrementNumeric(i){
	
	var obj = CObjets[i];
	
	if(document.getElementById('input' + obj.idstr)){
		var decimal = parseInt(obj.fields[3]);
		var flt = parseFloat($('#input' + obj.idstr).val());
		var incr = parseFloat(obj.fields[4]);
		flt = flt - incr;
		$('#input' + obj.idstr).val(flt.toFixed(decimal));
	}
	
}

function getRoundButtonIncrementNumeric(i,fct,img){
	
	var h = '<div ';
	h += ' style="position:relative;left:0px;top:0px;" ';
	h += ' class="roundboutongray alterbloc' + i + '" >';
	h += '<a style="width:20px;height:20px;line-height:20px;margin:5px;" ';
	h += ' onClick="' + fct + '(\''+i+'\');" ';
	h += 'class="roundboutonbef5" >';
	h += '<div class="roundboutongrayicon ' + i + '" ';
	h += ' style="width:20px;height:20px;line-height:20px;background-image:url(' + img + ')!important;" ></div>';
	h += '</a></div>';
	
	return h;
	
}

function onZoom(obj){
	
	var xb = parseInt(obj.x * zoom);
	var yb = parseInt(obj.y * zoom);
	
	var wb = parseInt(obj.w * zoom);
	var hb = parseInt(obj.h * zoom);
	
	var cmqobj = $('.incrementNumeric'+obj.id);
	
	cmqobj.css("width",obj.w + "px").css("height",obj.h + "px");
	cmqobj.css("left",xb + "px").css("top",yb + "px");
	
	cmqobj.css('transform','scale(' +  zoom  + ')');
	cmqobj.css('-ms-transform','scale(' +  zoom + ')');
	
}

function viewResults(obj){
	
	var flt = parseFloat($('#input' + obj.idstr).val());
	var ctr = parseFloat(obj.fields[5]);
	
	if(flt!=ctr){
		
		$('#input' + obj.idstr).css("color","red").css("font-weight","bold");
		$('#input' + obj.idstr).val(ctr);
	}else{
		$('#input' + obj.idstr).css("color","green").css("font-weight","bold");
	}
	
}

function viewErrors(obj){
	
	var flt = parseFloat($('#input' + obj.idstr).val());
	var ctr = parseFloat(obj.fields[5]);
	if(flt!=ctr){
		$('#input' + obj.idstr).css("color","red");
	}

}

function sendObjMemory(obj){
	
	var flt = parseFloat($('#input' + obj.idstr).val());
	return flt;
	
}

function retrieveObjMemory(obj,mem){
	
	$('#input' + obj.idstr).val(mem);
	
}

function isOK(obj){
	
	var r = false;
	var flt = parseFloat($('#input' + obj.idstr).val());
	var ctr = parseFloat(obj.fields[5]);
	if(flt==ctr){
		r = true;
	}
	
	return r;
	
}

