
function getBaseSvg(w,h){
	
	var svg = '<?xml version="1.0" encoding="utf-8"?>';
	svg = svg + '<!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" ';
	svg = svg + ' "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd">';
	svg = svg + '<svg version="1.1"  xmlns="http://www.w3.org/2000/svg" ';
	svg = svg + ' xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" ';
	svg = svg + ' viewBox="0 0 ' + w + ' ' + h +'" ';
	svg = svg + ' enable-background="new 0 0 ' + w + ' ' + h +'" ';
	svg = svg + ' xml:space="preserve">';
	
	return svg;
	
}

function getBaseQcm(w,h,code){
	
	var svg = getBaseSvg(w,h);
	
	//svg = svg + '<image xlink:href="img/circle.png" x="3" y="5" height="37px" width="37px" />';
	
	svg = svg + getLineQcm( 5,'Reponse 1',1);
	svg = svg + getLineQcm((5 + 40),'Reponse 2',0);
	svg = svg + getLineQcm((5 + 80),'Reponse 3',0);
	svg = svg + getLineQcm((5 + 120),'Reponse 4',0);
	svg = svg + getLineQcm((5 + 160),'Reponse 5',0);
	
	svg = svg + '</svg>';
	return svg;
	
}

function getBaseQcmObj(w,h,obj){
	
	var svg = getBaseSvg(w,h);
	
	var j = 2;
	var h = 104;
	if(obj.text3!=''){j=j+1;h = 155;
	if(obj.text4!=''){j=j+1;h = 207;
	if(obj.text5!=''){j=j+1;h = 257;}
	}
	}

	svg += '<image ';
	svg += ' xlink:href="img/qcm/qcm'+j+'.png" height="'+h+'px" ';
	svg += ' x="3" y="3" ';
	svg += ' width="453px" />';
	
	var dx = 10;
	var dy = 51;
	svg +=  getLineQcm(dx , obj.text, obj.val);
	svg +=  getLineQcm((dx + dy) , obj.text2, obj.val2);
	
	if(obj.text3!=''){
		svg +=  getLineQcm((dx + (dy * 2)) , obj.text3, obj.val3);
	}else{
		svg +=  getEmptyQcm(dx + (dy * 2));
	}
	if(obj.text4!=''){
		svg +=  getLineQcm((dx + (dy * 3)) , obj.text4, obj.val4);
	}else{
		svg +=  getEmptyQcm(dx + (dy * 3));	
	}
	if(obj.text5!=''){
		svg +=  getLineQcm((dx + (dy * 4)) , obj.text5, obj.val5);
	}else{
		svg +=  getEmptyQcm(dx + (dy * 4));	
	}
	
	svg +=  '</svg>';
	return svg;
	
}

function getLineQcm(y,text,coche){
	
	var svg = '<image ';
	if(coche==0){
		svg += ' xlink:href="img/circle.png" ';
	}else{
		svg += ' xlink:href="img/check.png" ';
	}
	svg += ' x="9" y="' + y + '" ';
	svg += ' height="37px" width="37px" />';

	svg += '<text text-anchor="start" font-family="Helvetica, Arial, sans-serif" font-size="18" ';
	svg += ' y="' + (y + 25) + '" x="52" stroke-width="0" stroke="#000" fill="#000000" >';
	
	svg +=  text;
	
	svg +=  '</text>';
	return svg;
	
}

function getEmptyQcm(y){
	
	var svg = '<image xlink:href="img/empty.png" ';
	svg += ' x="3" y="' + y + '" ';
	svg += ' height="37px" width="37px" />';
	
	svg += '<text text-anchor="start" font-family="Helvetica, Arial, sans-serif" font-size="18" ';
	svg += ' y="' + (y + 25) + '" x="50" stroke-width="0" stroke="#000" ';svg =svg + ' fill="#000000" ></text>';
	
	return svg;
}

function correctQcm(text){
	
	var finalText = "                              ";//30 spaces
	
	if(text.length<30){
		text = text + finalText.substring(text.length);
	}
	
	return text;
	
}

function getBaseBouton(w,h,obj){
	
	var svg = getBaseSvg(w,h);
	
	if (typeof obj.text6 === "undefined") {obj.text6 = 1;}
	
	if(obj.text6==0||obj.text6==1){
		svg += '<image xlink:href="img/bouton.png" ';
		svg += ' x="0" y="0" height="' + obj.height + 'px" width="160px" />';
	}
	if(obj.text6==2){
		svg += '<image xlink:href="img/button/css3modernblue.png" ';
		svg += ' x="0" y="0" height="' + obj.height + 'px" width="' + obj.width + 'px" />';
	}
	if(obj.text6==3){
		svg += '<image xlink:href="img/button/css3modernorange.png" ';
		svg += ' x="0" y="0" height="' + obj.height + 'px" width="' + obj.width + 'px" />';
	}
	
	if(obj.text6==4){
		svg += '<image xlink:href="img/roundnext.png" ';
		svg += ' x="0" y="0" height="' + obj.height + 'px" width="80px" />';
	}
	if(obj.text6==5){
		svg += '<image xlink:href="img/roundprev.png" ';
		svg += ' x="0" y="0" height="' + obj.height + 'px" width="80px" />';
	}
	if(obj.text6==6){
		svg += '<image xlink:href="img/roundhidden.png" ';
		svg += ' x="0" y="0" height="' + obj.height + 'px" width="80px" />';
	}

	if(obj.text6!=4&&obj.text6!=5&&obj.text6!=6){
		
		svg += '<text ';
		svg += ' font-family="Helvetica" font-size="18" ';
		
		var possvg = ' y="25" x="56"';
		
		var txtV = obj.text;

		if(obj.text6==0||obj.text6==1){
			possvg = ' y="25" x="56"';
		}else{
			possvg = ' y="30" x="76"';
		}
		if(obj.text=='Siguiente'){
			possvg = ' y="25" x="44"';
		}
		if(obj.text=='Nächster'){
			possvg = ' y="25" x="44"';
		}
		if(obj.text=='Suivant'){
			possvg = ' y="25" x="50"';
		}
		
		if(obj.text=='<'){
			possvg = ' y="25" x="75"';
			txtV = '&lt;';
		}
		if(obj.text=='>'){
			possvg = ' y="25" x="75"';
			txtV = '&gt;';
		}

		svg += possvg;
		svg += ' stroke-width="0" stroke="#000" ';
		svg += ' fill="#000000" >' + txtV + '</text>';
	}
	
	svg += '</svg>';
	
	return svg;
	
}

function getBaseLcm3(w,h,obj){
	
	var svg = getBaseSvg(w,h);
	
	svg = svg + '<image xlink:href="img/lcmbase3.png" ';
	svg = svg + ' x="0" y="0" width="480px" height="260px" />';
	
	svg = svg + getBaseText(46,obj.text);
	svg = svg + getBaseText(136,obj.text2);
	svg = svg + getBaseText(226,obj.text3);

	svg = svg + '<text font-family="Helvetica" font-size="18" ';
	svg = svg + ' x="340" y="46" stroke-width="0" stroke="#000" ';
	svg = svg + ' fill="#000000" >';
	svg = svg + obj.val;
	svg = svg + '</text>';
	
	svg = svg + '<text font-family="Helvetica" font-size="18" ';
	svg = svg + ' x="340" y="136" stroke-width="0" stroke="#000" ';
	svg = svg + ' fill="#000000" >';
	svg = svg + obj.val2;
	svg = svg + '</text>';

	svg = svg + '<text font-family="Helvetica" font-size="18" ';
	svg = svg + ' x="340" y="226" stroke-width="0" stroke="#000" ';
	svg = svg + ' fill="#000000" >';
	svg = svg + obj.val3;
	svg = svg + '</text>';
	
	
	svg = svg + '</svg>';
	
	return svg;
	
}

function getBaseLcm4(w,h,obj){
	
	var svg = getBaseSvg(w,h);
	
	svg = svg + '<image xlink:href="img/lcmbase4.png" ';
	svg = svg + ' x="0" y="0" width="480px" height="260px" />';
	
	var iny = 63;
	
	var dh0 = 40;
	var dh1 = dh0 + (iny);
	var dh2 = dh0 + (iny * 2);
	var dh3 = dh0 + (iny * 3);
	
	svg = svg + getBaseText(dh0,obj.text);
	svg = svg + getBaseText(dh1,obj.text2);
	svg = svg + getBaseText(dh2,obj.text3);
	svg = svg + getBaseText(dh3,obj.text3);
	
	svg = svg + '<text font-family="Helvetica" font-size="18" ';
	svg = svg + ' x="340" y="' + dh0 + '" stroke-width="0" stroke="#000" ';
	svg = svg + ' fill="#000000" >';
	svg = svg + obj.val;
	svg = svg + '</text>';
	
	svg = svg + '<text font-family="Helvetica" font-size="18" ';
	svg = svg + ' x="340" y="' + dh1 + '" stroke-width="0" stroke="#000" ';
	svg = svg + ' fill="#000000" >';
	svg = svg + obj.val2;
	svg = svg + '</text>';
	
	svg = svg + '<text font-family="Helvetica" font-size="18" ';
	svg = svg + ' x="340" y="' + dh2 + '" stroke-width="0" stroke="#000" ';
	svg = svg + ' fill="#000000" >';
	svg = svg + obj.val3;
	svg = svg + '</text>';
	
	svg = svg + '<text font-family="Helvetica" font-size="18" ';
	svg = svg + ' x="340" y="' + dh3 + '" stroke-width="0" stroke="#000" ';
	svg = svg + ' fill="#000000" >';
	svg = svg + obj.val4;
	svg = svg + '</text>';
	
	svg = svg + '</svg>';
	
	return svg;
	
}

function getBaseLcm5(w,h,obj){
	
	var svg = getBaseSvg(w,h);
	
	svg = svg + '<image xlink:href="img/lcmbase5.png" ';
	svg = svg + ' x="0" y="0" width="480px" height="320px" />';
	
	var iny = 63;
	
	var dh0 = 40;
	var dh1 = dh0 + (iny);
	var dh2 = dh0 + (iny * 2);
	var dh3 = dh0 + (iny * 3);
	var dh4 = dh0 + (iny * 4);
	
	svg = svg + getBaseText(dh0,obj.text);
	svg = svg + getBaseText(dh1,obj.text2);
	svg = svg + getBaseText(dh2,obj.text3);
	svg = svg + getBaseText(dh3,obj.text3);
	svg = svg + getBaseText(dh4,obj.text4);
	
	svg = svg + '<text font-family="Helvetica" font-size="18" ';
	svg = svg + ' x="340" y="' + dh0 + '" stroke-width="0" stroke="#000" ';
	svg = svg + ' fill="#000000" >';
	svg = svg + obj.val;
	svg = svg + '</text>';
	
	svg = svg + '<text font-family="Helvetica" font-size="18" ';
	svg = svg + ' x="340" y="' + dh1 + '" stroke-width="0" stroke="#000" ';
	svg = svg + ' fill="#000000" >';
	svg = svg + obj.val2;
	svg = svg + '</text>';
	
	svg = svg + '<text font-family="Helvetica" font-size="18" ';
	svg = svg + ' x="340" y="' + dh2 + '" stroke-width="0" stroke="#000" ';
	svg = svg + ' fill="#000000" >';
	svg = svg + obj.val3;
	svg = svg + '</text>';
	
	svg = svg + '<text font-family="Helvetica" font-size="18" ';
	svg = svg + ' x="340" y="' + dh3 + '" stroke-width="0" stroke="#000" ';
	svg = svg + ' fill="#000000" >';
	svg = svg + obj.val4;
	svg = svg + '</text>';
	
	svg = svg + '<text font-family="Helvetica" font-size="18" ';
	svg = svg + ' x="340" y="' + dh4 + '" stroke-width="0" stroke="#000" ';
	svg = svg + ' fill="#000000" >';
	svg = svg + obj.val5;
	svg = svg + '</text>';
	
	svg = svg + '</svg>';
	
	return svg;
	
}

function getBaseLcm6(w,h,obj){
	
	var svg = getBaseSvg(w,h);
	
	svg = svg + '<image xlink:href="img/lcmbase6.png" ';
	svg = svg + ' x="0" y="0" width="480px" height="350px" />';
	
	var iny = 58;
	
	var dh0 = 35;
	var dh1 = dh0 + (iny);
	var dh2 = dh0 + (iny * 2);
	var dh3 = dh0 + (iny * 3);
	var dh4 = dh0 + (iny * 4);
	var dh5 = dh0 + (iny * 5);
	
	svg = svg + getBaseText(dh0,obj.text);
	svg = svg + getBaseText(dh1,obj.text2);
	svg = svg + getBaseText(dh2,obj.text3);
	svg = svg + getBaseText(dh3,obj.text3);
	svg = svg + getBaseText(dh4,obj.text4);
	svg = svg + getBaseText(dh5,obj.text5);
	
	svg = svg + '<text font-family="Helvetica" font-size="18" ';
	svg = svg + ' x="340" y="' + dh0 + '" stroke-width="0" stroke="#000" ';
	svg = svg + ' fill="#000000" >';
	svg = svg + obj.val;
	svg = svg + '</text>';
	
	svg = svg + '<text font-family="Helvetica" font-size="18" ';
	svg = svg + ' x="340" y="' + dh1 + '" stroke-width="0" stroke="#000" ';
	svg = svg + ' fill="#000000" >';
	svg = svg + obj.val2;
	svg = svg + '</text>';
	
	svg = svg + '<text font-family="Helvetica" font-size="18" ';
	svg = svg + ' x="340" y="' + dh2 + '" stroke-width="0" stroke="#000" ';
	svg = svg + ' fill="#000000" >';
	svg = svg + obj.val3;
	svg = svg + '</text>';
	
	svg = svg + '<text font-family="Helvetica" font-size="18" ';
	svg = svg + ' x="340" y="' + dh3 + '" stroke-width="0" stroke="#000" ';
	svg = svg + ' fill="#000000" >';
	svg = svg + obj.val4;
	svg = svg + '</text>';
	
	svg = svg + '<text font-family="Helvetica" font-size="18" ';
	svg = svg + ' x="340" y="' + dh4 + '" stroke-width="0" stroke="#000" ';
	svg = svg + ' fill="#000000" >';
	svg = svg + obj.val5;
	svg = svg + '</text>';
	
	svg = svg + '<text font-family="Helvetica" font-size="18" ';
	svg = svg + ' x="340" y="' + dh5 + '" stroke-width="0" stroke="#000" ';
	svg = svg + ' fill="#000000" >';
	svg = svg + obj.val6;
	svg = svg + '</text>';
	
	svg = svg + '</svg>';
	
	return svg;
	
}

function getBaseText(y,text){
	
	var svg = '';
	
	var words = text.split(' ');
	
	if(words.length>2){
		
		y = y - 10;
		
		var t1 = words[0] + ' ' + words[1];
		var xt1 = 95 - getTextWidth(t1,'Helvetica 18pt');
		svg = svg + '<text font-family="Helvetica" font-size="18" ';
		svg = svg + ' x="' + xt1 + '" ';
		svg = svg + ' y="' + y + '" stroke-width="0" stroke="#000" ';
		svg = svg + ' fill="#000000" >';
		svg = svg + t1
		svg = svg + '</text>';
		
		var t2 = words[2];
		if(words.length>3){
			t2 = t2 + ' ' + words[3];
		}
		var xt2 = 95 - getTextWidth(t2,'Helvetica 18pt');
		svg = svg + '<text font-family="Helvetica" font-size="18" ';
		svg = svg + ' x="' + xt2 + '" ';
		svg = svg + ' y="' + parseInt(y + 22) + '" stroke-width="0" stroke="#000" ';
		svg = svg + ' fill="#000000" >';
		svg = svg + t2
		svg = svg + '</text>';
		
	}else{
		
		var xtglobal = 95 - getTextWidth(text,'Helvetica 18pt');
		svg = svg + '<text font-family="Helvetica" font-size="18" ';
		svg = svg + ' x="' + xtglobal + '" ';
		svg = svg + ' y="' + y + '" stroke-width="0" stroke="#000" ';
		svg = svg + ' fill="#000000" >';
		svg = svg + text
		svg = svg + '</text>';
	
	}
	
	return svg;
	
}

function getBaseInput(w,h,obj){

	var svg = getBaseSvg(w,h);
	svg += '<rect x="0" y="0" width="' + w + '" height="' + h + '" ';
	svg += ' stroke="gray" stroke-width="2px" fill="white"/>';
	svg += '<text font-family="Helvetica" font-size="16" ';
	svg += ' x="' + 4 + '" ';
	svg += ' y="' + ((h/2)+2) + '" ';
	svg += ' width="' + w + '" ';
	svg += ' height="' + h + '" ';
	svg += ' stroke-width="0" stroke="#000" ';
	svg += ' fill="#000000" >';
	svg += obj.text;
	svg += '</text>';
	svg += '</svg>';
	return svg;

}

function getBaseVariable(w,h,obj){

	var svg = getBaseSvg(w,h);
	svg += '<ellipse  cx="' + (w/2) + '" cy="' + (h/2) + '" ';
	svg += ' rx="' + ((w/2)-10) + '" ry="' + ((h/2)-10) + '" ';
	svg += ' stroke="#00aa00" stroke-width="5px" fill="white"/>';

	svg += '<svg width="' + w + 'px" height="' + h + 'px">';
	svg += '<text x="50%" y="40%" alignment-baseline="middle" text-anchor="middle">';
	svg += '<textPath startOffset="50%" xlink:href="#tp3">';
	svg += obj.text + '</textPath>';
	svg += '</text>';
	svg += '</svg>';
	
	svg += '<svg width="' + w + 'px" height="' + h + 'px">';
	svg += '<text x="50%" y="70%" alignment-baseline="middle" text-anchor="middle">';
	svg += '<textPath startOffset="50%" xlink:href="#tp3">';
	svg += obj.text2 + '-' +  obj.text3 + '</textPath>';
	svg += '</text>';
	svg += '</svg>';

	svg += '</svg>';
	return svg;

}

function getBaseHelper(w,h,obj){
	
	var svg = getBaseSvg(w,h);
	
	svg += '<image xlink:href="img/helper/speed-home.png" ';
	svg += 'x="0" y="0" ';
	svg += 'height="150px" width="150px" />';
	
	svg += '<svg width="150px" height="100px">';
	svg += '<text x="50%" y="50%" alignment-baseline="middle" text-anchor="middle">';
	svg += '<textPath startOffset="50%" xlink:href="#tp3">CHANGE</textPath>';
	svg += '</text>';   
	svg += '</svg>';

	/*
	svg += '<rect x="0" y="0" width="150" height="150" stroke="red" stroke-width="3px" fill="white"/>';
	svg += '<text ';
	svg += ' font-family="Helvetica" font-size="18" ';
	svg += " x='50%' y='50%' dominant-baseline='middle' text-anchor='middle' ";
	svg += ' stroke-width="0" stroke="#000" ';
	svg += ' fill="#000000" >';
	svg += obj.text2;
	svg += '</text>';
	*/

	svg += '</svg>';
	
	return svg;
	
}

