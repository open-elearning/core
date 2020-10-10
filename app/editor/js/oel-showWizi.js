
var ivideo = -1;

function showWiziZone(){
	
	$('.tmpshow').css("display","none");
	
	findLines();
	
	for(var i=0;i<CLudisCount;i++){
		var obj = CLudis[i];
		if(obj.supp==0&&obj.lock&&obj.pageId==GPageId){
			installWiziZone(obj,i);
		}
	}

	for(var i=0;i<CLudisCount;i++){
		var obj = CLudis[i];
		if(obj.supp==0&&obj.lock==false&&obj.pageId==GPageId){
			installWiziZone(obj,i);
		}
	}
	
}

function installWiziZone(obj,i){

	var showL = parseInt(obj.getX() * zoomCanv) + decxCanv + 5;
	var showT = parseInt(obj.getY() * zoomCanv) + decyCanv + 5;
	var showW = parseInt(obj.getW() * zoomCanv) - 10;
	var showH = parseInt(obj.getH() * zoomCanv) - 10;
	
	if(obj.type=='video'){
		
		var videoL = parseInt(obj.getX() * zoomCanv) + decxCanv + 5;
		var videoT = parseInt(obj.getY() * zoomCanv) + decyCanv + 5;
		ivideo = i;
		$("#minvideoimage").click(function() {
			SelectWorkingI(ivideo);
		});
		$('#minvideoimage').css("cursor",'pointer');
		$('#minvideoimage').css("left",videoL + 'px');
		$('#minvideoimage').css("top",videoT + 'px');
		
		if(obj.text2!=""){
			$('#minvideoimage').css("display","block");
			$('#minvideoimage').attr('src',obj.text2);
		}
		
		var h = '<iframe width="320" height="220" ';
		h = h + 'src="https://www.youtube.com/embed/';
		h = h + 'idvideo?rel=0&amp;controls=0&amp;showinfo=0" ';
		h = h + 'frameborder="0" allowfullscreen></iframe>';
		h = h.replace('idvideo',obj.val);
		obj.text3 = h;
		
	}
	
	if(obj.type=='title'){
		
		if(isTxtHtml(obj.text)){
			
			if(!openelearning.gebi('titlezone' + i)){
				var p = '<div id="titlezone'+i+'" ';
				p += ' onClick="SelectWorkingI('+i+');" ';
				p += ' class="tmpshow showtext noselectmouse" >';
				p += cleanTextForTitle(obj.text);
				p += '</div>';
				$('body').append(p);
			}
			
			var col='black';
			if(parseInteger(obj.val)==1){col='white';}
			
			$('#titlezone'+i).html(cleanTextForTitle(obj.text));
			$('#titlezone'+i).css("left",showL+'px').css("top",showT+'px');
			$('#titlezone'+i).css("max-width",showW+'px').css("height",showH+'px');
			
			var tz = parseInt(obj.fontSize * zoomCanv)
			if(tz<3){tz=3;}
			
			$('#titlezone'+i).css("font-size",tz+'px');
			$('#titlezone'+i).css("display","block");
			$('#titlezone'+i).css("overflow","auto");
			$('#titlezone'+i).css("color",col);
			
			$('#titlezone'+i).css("line-height",showH+'px');
			
		}
		
	}
	
	if(obj.type=='barre'){

		showL = parseInt((obj.getX()+10) * zoomCanv) + decxCanv + 5;

		if(!openelearning.gebi('barrezone' + i)){
			var p = '<div id="barrezone'+i+'" ';
			p += ' onClick="SelectWorkingI('+i+');" ';
			p += ' class="tmpshow showtext noselectmouse" >';
			p += cleanTextForTitle(obj.text);
			p += '</div>';
			$('body').append(p);
		}

		var col='white';

		$('#barrezone'+i).html(cleanTextForTitle(obj.text));
		$('#barrezone'+i).css("left",showL+'px').css("top",showT+'px');
		$('#barrezone'+i).css("max-width",showW+'px').css("height",showH+'px');
		
		var tz = parseInt(obj.fontSize * zoomCanv)
		if(tz<3){tz=3;}
		
		$('#barrezone'+i).css("font-size",tz+'px');
		$('#barrezone'+i).css("display","block");
		$('#barrezone'+i).css("overflow","auto");
		$('#barrezone'+i).css("color",col);
		$('#barrezone'+i).css("line-height",showH+'px');

	}

	if(obj.type=='text'||obj.type=='tcm'){
		installWiziTexte(obj,i);
	}

	if(obj.type=='label'){
		
		var labL = parseInt(obj.getX() * zoomCanv) + decxCanv + 2;
		var labT = parseInt(obj.getY() * zoomCanv) + decyCanv + 2;
		var labW = parseInt(obj.getW() * zoomCanv) - 4;
		var labH = parseInt(obj.getH() * zoomCanv) - 4;

		var col = 'black';

		if(!openelearning.gebi('tablezone' + i)){
			var p = '<table id="tablezone'+i+'" ';
			p += ' style="border:solid 1px black;border-radius:5px;" ';
			p += ' cellpadding=0 cellspacing=0 ';
			p += ' onClick="SelectWorkingI('+i+');" ';
			p += ' class="tmpshow showtext noselectmouse" >';
			p += '<tbody class="tableZoneCell'+i+' noselectmouse" >';
			p += '<tr class="tableZoneCell'+i+' noselectmouse" >';
			p += '<td id="tblZoneCell'+i+'" class="tableZoneCell'+i+' noselectmouse" ';
			p += ' style="text-align:center;" >';
			p += obj.text;
			p += '</td></tr></tbody></table>';
			$('body').append(p);
		}
		
		$('#tblZoneCell'+i).html(obj.text);
		$('.tableZoneCell'+i).css("width",labW+'px').css("height",labH +'px');

		$('#tablezone'+i).css("left",labL+'px').css("top",labT+'px');
		$('#tablezone'+i).css("width",labW+'px').css("height",labH +'px');
		
		var tz = parseInt(obj.fontSize * zoomCanv);
		if(tz<3){tz=3;}
		
		$('#tablezone'+i).css("font-size",tz+'px');
		$('#tablezone'+i).css("display","block");
		$('#tablezone'+i).css("overflow","hidden");
		$('#tablezone'+i).css("color",col);
		
	}
	
	if(obj.type=='dom'){
		
		var domL = parseInt(obj.getX() * zoomCanv) + decxCanv;
		var domT = parseInt(obj.getY() * zoomCanv) + decyCanv;
		var domW = parseInt(obj.getW() * zoomCanv);
		var domH = parseInt(obj.getH() * zoomCanv);

		var cssExtra = rJtext(obj.text6);
		cssExtra = cssExtra.replace(/(\r\n|\n|\r)/gm,"");

		if(!openelearning.gebi('tablezone' + i)){
		
			var p = '<div id="tablezone'+i+'" ';
			p += ' style="' + cssExtra + '" ';
			p += ' onClick="SelectWorkingI('+i+');" ';
			p += ' class="tmpshow showtext noselectmouse" >';
			p += '<div id="tablezoneinner'+i+'" ';
			p += ' style="position:absolute;top:50%;';
			p += 'margin-top:-15px;line-height:30px;';
			p += 'height:30px;left:0%;right:0%;" >';
			p += obj.text;
			p += '</div></div>';

			$('body').append(p);
			
			contextInstall($('#tablezone' + i));
			
		}

		$('#tablezone'+i).attr("style",cssExtra);
		$('#tablezoneinner'+i).html(obj.text);
		
		$('#tablezone'+i).css("left",domL+'px').css("top",domT+'px');
		$('#tablezone'+i).css("width",domW+'px').css("height",domH +'px');
		
		var tz = parseInt(obj.fontSize * zoomCanv);
		if(tz<6){tz=6;}
		
		$('#tablezone'+i).css("font-size",tz+'px');
		$('#tablezone'+i).css("display","block");
		
	}
	
	if(obj.type=='helper'&&(obj.text=='home'||obj.text=='qcm')){
		
		var helpL = parseInt(obj.getX() * zoomCanv) + decxCanv + 10;
		var helpT = parseInt((obj.getY() + obj.height - 60) * zoomCanv) + decyCanv + 5;
		var helpH = parseInt(60 * zoomCanv) - 10;
		var helpW = parseInt(obj.getW() * zoomCanv) - 20;
		
		var col = 'gray';
		if(parseInteger(obj.val)==1){col='white';}
			
		if(!openelearning.gebi('textzone' + i)){
			var p = '<div id="textzone'+i+'" ';
			p = p + ' onClick="SelectWorkingI('+i+');" ';
			p = p + ' class="tmpshow nosel showtext noselectmouse" >';
			p = p + obj.text2;
			p = p + '</div>';
			$('body').append(p);
		}
		
		$('#textzone'+i).html(obj.text2);
		$('#textzone'+i).css("left",helpL+'px').css("top",helpT+'px');
		$('#textzone'+i).css("width",helpW+'px').css("max-height",helpH+'px');
		
		var tz = parseInt(16 * zoomCanv)
		if(tz<3){tz=3;}
		
		$('#textzone'+i).css("text-align",'center');
		$('#textzone'+i).css("font-size",tz+'px');
		$('#textzone'+i).css("display","block");
		$('#textzone'+i).css("overflow","hidden");
		$('#textzone'+i).css("color",col);
		
	}
	
	if(obj.type=='speech'){
		
		var speL = parseInt(obj.x * zoomCanv) + decxCanv + 10;
		var speT = parseInt(obj.y * zoomCanv) + decyCanv + 45;
		var speW = parseInt(obj.width * zoomCanv)-20;
		var speH = parseInt(obj.height * zoomCanv)-90;
		
		var col='black';
		
		if(!openelearning.gebi('textzone' + i)){
			var p = '<table id="textzone'+i+'" ';
			p += ' onClick="SelectWorkingI('+i+');" ';
			p += ' class="tmpshow tabletext noselectmouse" ><tbody>';
			p += '<tr class=nosel >';
			p += '<td id="textzoneinn'+i+'" valign="center" class=nosel >';
			p += '<span class="noselectmouse" >' + obj.text + '</span>';
			p += '</td></tr></tbody></table>';
			$('body').append(p);
		}
		
		$('#textzoneinn'+i).html(obj.text);
		$('#textzoneinn'+i).css("width",speW+'px').css("height",(speH - 5)+'px');
		$('#textzone'+i).css("left",speL+'px').css("top",speT+'px');
		$('#textzone'+i).css("width",speW+'px').css("height",speH+'px');
		
		var tz = parseInt(obj.fontSize * zoomCanv)
		if(tz<3){tz=3;}
		
		$('#textzoneinn'+i).css("font-size",tz+'px');
		$('#textzone'+i).css("display","block");
		$('#textzone'+i).css("overflow","auto");
		$('#textzoneinn'+i).css("text-align","center");
		$('#textzoneinn'+i).css("color",col);
		
		
	}

	if(obj.type=='fluxPts'){
		
		var sW = parseInt(obj.getW() * zoomCanv)/2;
		var sH = parseInt(obj.getH() * zoomCanv)/2;
		var x1 = parseInt(obj.getX() * zoomCanv) + decxCanv + sW;
		var y1 = parseInt(obj.getY() * zoomCanv) + decyCanv + sH;
		
		var nextObj = findObjectAfter(obj.val,obj.val3);
		
		var x2 = parseInt(nextObj.x * zoomCanv) + decxCanv + sW;
		var y2 = parseInt(nextObj.y * zoomCanv) + decyCanv + sH;
		
		if(nextObj.x==-1){
		
			$('#line'+i).css("display","none");
		
		}else{
			
			if(x2<x1){
				var xm1 = x1;
				var xm2 = x2;
				var ym1 = y1;
				var ym2 = y2;
				y1 = ym2;
				y2 = ym1;
				x1 = xm2;
				x2 = xm1;
			}

			if(!openelearning.gebi('line' + i)){
				var clin = createLine(x1,y1,x2,y2,i);
				$('body').append(clin);
			}
			
			var length = Math.sqrt((x1-x2)*(x1-x2) + (y1-y2)*(y1-y2));
			var angle  = Math.atan2(y2 - y1, x2 - x1) * 180 / Math.PI;
			var transform = 'rotate('+angle+'deg)';
			
			var fny = y1;
			if(y2<fny){
				fny = y2;
			}
			$('#line'+i).css("display","block");
			$('#line'+i).width(length)
			$('#line'+i).offset({left:x1,top:fny});
			$('#line'+i).css({'transform': transform});
		}
		
		
	}
	
	if(obj.type=='plugme'){
		
		drawSvgMapping(obj,i);

	}

	if(lastUniKid==obj.unikid){
		
		var extraselectL = parseInt(obj.getX() * zoomCanv) + decxCanv;
		var extraselectT = parseInt(obj.getY() * zoomCanv) + decyCanv;
		var extraselectW = parseInt(obj.getW() * zoomCanv);
		var extraselectH = parseInt(obj.getH() * zoomCanv);
		
		if(!openelearning.gebi('extraselect')){
			var p = '<div id="extraselect" ';
			p += ' onMouseMove="eraseExtraSelect();" ';
			p += ' onMouseOver="eraseExtraSelect();" ';
			p += ' class="tmpshow showtext noselectmouse" >';
			p += '</div>';
			$('body').append(p);
		}
		
		var extraselectzone = $('#extraselect');
		extraselectzone.css("position","absolute");
		extraselectzone.css("border","solid 1px orange");
		extraselectzone.css("left",extraselectL+'px').css("top",extraselectT+'px');
		extraselectzone.css("width",extraselectW+'px').css("height",extraselectH+'px');
		extraselectzone.css("display","block");
			
		
	}

}

function installWiziTexte(obj,i){

	var showL = parseInt(obj.getX() * zoomCanv) + decxCanv + 5;
	var showT = parseInt(obj.getY() * zoomCanv) + decyCanv + 5;
	var showW = parseInt(obj.getW() * zoomCanv) - 10;
	var showH = parseInt(obj.getH() * zoomCanv) - 10;

	var col='black';
	if(parseInteger(obj.val)==1){col='white';}
	
	if(!openelearning.gebi('textzone' + i)){
		var p = '<div id="textzone'+i+'" ';
		p += ' onClick="SelectWorkingI('+i+');" ';
		
		p += ' class="tmpshow showtext noselectmouse" >';
		p += obj.text + '</div>';
		$('body').append(p);
	}
	
	if(obj.css!=''){
		$('#textzone'+i).attr("style",obj.css);
	}
	
	$('#textzone'+i).html(obj.text);
	$('#textzone'+i).css("left",showL+'px').css("top",showT+'px');

	if(obj.css!=''&&obj.css.indexOf("background")!=-1){
		$('#textzone'+i).css("width",showW+'px').css("height",showH +'px');
	}else{
		$('#textzone'+i).css("max-width",showW+'px').css("max-height",showH +'px');
	}

	var tz = parseInt(obj.fontSize * zoomCanv);

	if(tz<3){tz=3;}
	
	$('#textzone'+i).css("font-size",tz+'px');
	$('#textzone'+i).css("display","block");
	$('#textzone'+i).css("overflow","hidden");
	$('#textzone'+i).css("color",col);

}

function drawSvgMapping(obj,i){

	var objPlug = getCPlugById(obj.val);
				
	if(typeof objPlug === "undefined"){
		objPlug = new CPlug();
	}
	
	var svgMapping = objPlug.screenTextMapping;
	
	if(typeof svgMapping === "undefined"){
		svgMapping = '';
	}
	
	if(svgMapping!=''){
		
		var hPrt = '';
		
		var xmlDoc = $.parseXML(svgMapping);
		var xml_p = $(xmlDoc);
		
		var textPlugs = obj.text.split("|");
		
		$(xml_p).find('rect').each(function(){
			
			var ref = parseInt($(this).attr('ref'));
			
			var x = get2Deci(($(this).attr('x')/obj.width)*100);
			var y = get2Deci(($(this).attr('y')/obj.height)*100);
			var w = get2Deci(($(this).attr('width')/obj.width)*100);
			var h = get2Deci(($(this).attr('height')/obj.height)*100);
			
			var hl = parseInt($(this).attr('height')) * zoomCanv;
			
			var type = plugToT($(this).attr('type'));
			var defautsrc = plugToT($(this).attr('defautsrc'));

			var ftsize = parseInt(16) * zoomCanv;
			
			var valTxt = '';
			
			if(textPlugs[ref]){
				valTxt = textPlugs[ref];
			}
			
				if(type=="image"){

					if(valTxt==''){
						valTxt = defautsrc;
					}
					var wbpath = 'file:///' + folderAllImages + valTxt;
					wbpath = wbpath.replace(/\\/g, "/");
					wbpath = wbpath.replace('\\', "/");
					
					//valTxt
					var prt = '<img draggable=false class="zonewizi'+i+' noselectmouse" style="position:absolute;';
					prt += 'border:dotted 1px red;';
					prt += 'left:' + x + '%;';
					prt += 'top:' + y + '%;';
					prt += 'width:' + w + '%;';
					prt += 'height:' + h + '%;" ';
					prt += ' onClick="SelectWorkingI('+i+');" ';
					prt += ' src="' + wbpath + '" />';
					hPrt = hPrt + prt;

				}else{

					if(valTxt!=''){
						
						var prt = '<div class="zonewizi'+i+' noselectmouse" onClick="SelectWorkingI('+i+');" style="position:absolute;';
						prt += 'text-align:center;';
						prt += 'border:dotted 0px red;';
						prt += 'left:' + x + '%;';
						prt += 'top:' + y + '%;';
						prt += 'width:' + w + '%;';
						prt += 'height:' + h + '%;';
						prt += 'line-height:' + hl + 'px;';
						prt += 'font-size:' + ftsize + 'px;';
						prt += '" >' + valTxt + '</div>';
						hPrt = hPrt + prt;

					}

			}
			
		});

		if(!openelearning.gebi('plugzone' + i)){
			var p = '<div id="plugzone'+i+'" ';
			p += ' onClick="SelectWorkingI('+i+');" ';
			p += ' class="tmpshow showtext noselectmouse" >';
			p += hPrt;
			p += '</div>';
			$('body').append(p);
		}
		
		var plugL = parseInt(obj.x * zoomCanv)+ decxCanv;
		var plugT = parseInt(obj.y * zoomCanv)+ decyCanv;
		var plugW = parseInt(obj.width * zoomCanv);
		var plugH = parseInt(obj.height * zoomCanv);
		
		var plugzone = $('#plugzone'+i);
		
		plugzone.html(hPrt);
		plugzone.css("left",plugL+'px').css("top",plugT+'px');
		plugzone.css("width",plugW+'px').css("height",plugH+'px');
		plugzone.css("display","block");
					
	}
				
}

function findObjectAfter(id,ind){
	
	for(var i=0;i<CLudisCount;i++){
		var obj = CLudis[i];
		if(obj.supp==0&&obj.pageId==GPageId){
			if(obj.type=='fluxPts'){
				if(obj.val==id){
					if(obj.val3==(ind+1)){
						return obj;
					}
				}
			}
		}
	}
	return LudiBase();
}

function findLines(){
	
	var memval = "";
	
	for(var i=0;i<CLudisCount;i++){
		var obj = CLudis[i];
		if(obj.supp==0&&obj.pageId==GPageId){
			if(obj.type=='fluxPts'){
				if(memval.indexOf(obj.val)==-1){
					calculLines(obj.val);
					memval = memval + obj.val;
				}
				
			}
		}
	}
	
}

function calculLines(id){
	
	var ind = 0;
	
	for(var i=0;i<CLudisCount;i++){
		var obj = CLudis[i];
		if(obj.supp==0&&obj.pageId==GPageId){
			if(obj.type=='fluxPts'&&obj.val==id){
				obj.val3 = ind;
				ind = ind +1;
			}
		}
	}
	
}

function createLine(x1,y1, x2,y2,i){
	
  var length = Math.sqrt((x1-x2)*(x1-x2) + (y1-y2)*(y1-y2));
  var angle  = Math.atan2(y2 - y1, x2 - x1) * 180 / Math.PI;
  var transform = 'rotate('+angle+'deg)';

    var line = $('<div>')
	.addClass('lineoe')
	.addClass('tmpshow')
	.attr('id','line' + i )
	.css({
		'position': 'absolute',
		'transform': transform
	})
	.width(length)
	.offset({left: x1, top: y1});
    return line;

}

function eraseExtraSelect(){
	var extraselectzone = $('#extraselect');
	extraselectzone.css("display","none");
	lastUniKid = "e";
}

function isTxtHtml(objtext){
	
	if(objtext.indexOf("<")!=-1){
		return true;
	}
	if(objtext.indexOf("<span")!=-1){
		return true;
	}
	if(objtext.indexOf("wysiwyg")!=-1){
		return true;
	}
	return false;
}

function moveWiziZone(i){
	
	var obj = CLudis[i];
		
	if(obj.supp==0&&obj.pageId==GPageId){
			
		var showL = parseInt(obj.getX() * zoomCanv) + decxCanv + 5;
		var showT = parseInt(obj.getY() * zoomCanv) + decyCanv + 5;
		
		if(obj.type=='video'){
			
			var videoL = parseInt(obj.getX() * zoomCanv) + decxCanv + 5;
			var videoT = parseInt(obj.getY() * zoomCanv) + decyCanv + 5;

			$('#minvideoimage').css("left",videoL + 'px');
			$('#minvideoimage').css("top",videoT + 'px');
			
		}
		
		if(obj.type=='text'||obj.type=='tcm'){
			
			$('#textzone'+i).css("left",showL+'px').css("top",showT+'px');
			
		}

		if(obj.type=='label'){
			var labL = parseInt(obj.getX() * zoomCanv) + decxCanv + 2;
			var labT = parseInt(obj.getY() * zoomCanv) + decyCanv + 2;
			$('#tablezone'+i).css("left",labL+'px').css("top",labT+'px');
		}

		if(obj.type=='dom'){
			var domL = parseInt(obj.getX() * zoomCanv) + decxCanv + 1;
			var domT = parseInt(obj.getY() * zoomCanv) + decyCanv + 1;
			$('#tablezone'+i).css("left",domL+'px').css("top",domT+'px');
		}
		
		if(obj.type=='title'){
			$('#titlezone'+i).css("left",showL+'px').css("top",showT+'px');
		}
		
		if(obj.type=='speech'){
			
			var speL = parseInt(obj.getX() * zoomCanv) + decxCanv + 10;
			var speT = parseInt(obj.getY() * zoomCanv) + decyCanv + 45;

			$('#textzone'+i).css("left",speL+'px').css("top",speT+'px');
			
		}
	
		if(obj.type=='plugme'){
			
			var plugL = parseInt(obj.getX() * zoomCanv)+ decxCanv;
			var plugT = parseInt(obj.getY() * zoomCanv)+ decyCanv;
			
			var plugzone = $('#plugzone'+i);
			plugzone.css("left",plugL+'px').css("top",plugT+'px');
			
			var ftsize = parseInt(16*zoomCanv);
			
			var zonewizi = $('zonewizi'+i);
			//plugzone.css("font-size",ftsize+'px');
			
		}
		
	}
	
}

function get2Deci(num){
	return Math.round(num * 100) / 100;
}
