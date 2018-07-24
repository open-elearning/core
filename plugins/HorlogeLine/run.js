
var GlobalClockId = -1;

function onPaint(obj){

	var html = '';

	obj.contenu2 = 12;
	obj.contenu3 = 30;
	obj.contenu4 = 20;
	
	if(obj.field2!=''){
		if(obj.field2.indexOf(':')!=-1){
			obj.field2 = obj.field2 + ':0:0:0'
			var hparse = obj.field2.split(':');
			obj.contenu2 = hparse[0];
			obj.contenu3 = hparse[1];
			obj.contenu4 = hparse[2];
		}
	}
	
	html += '<div id="retroclockbox1" data-i="' + obj.id + '" style="border:solid 0px red;" ';
	html += ' class="clockbloc' + obj.id + '" >';
	html += '</div>';
	
	setTimeout('animRetroclock(' + obj.id  + ')',50);
	
	GlobalClockId = obj.id;
	
	return html;
	
}

function animRetroclock(i){
	
	var obj = CObjets[i];
	
	var typ = 'hour';
	if(obj.field1!=''){
		typ = obj.field1;
	}
	
	if(typ=='hour'){
		$('.clockbloc' + i).flipcountdown();
	}
	
	if(typ=='fixe'){
		$('.clockbloc' + i).flipcountdown({
			tick:function(){
				var id = this.attr("data-i");
				var vobj = CObjets[id];
				return displayRetroclock2d(vobj.contenu2) + ':' + displayRetroclock2d(vobj.contenu3) + ':' + displayRetroclock2d(vobj.contenu4);
			}
		});
	}
	
	if(typ=='fixemove'){
		$('.clockbloc' + i).flipcountdown({
			tick:function(){
				var id = this.attr("data-i");
				var vobj = CObjets[id];
				if( parseInt(vobj.contenu4)<60){
					vobj.contenu4 = parseInt(vobj.contenu4) + 1;
				}
				if( parseInt(vobj.contenu4)>59){
					vobj.contenu4 = 0;
					vobj.contenu3 = parseInt(vobj.contenu3) + 1;
				}
				return displayRetroclock2d(vobj.contenu2) + ':' + displayRetroclock2d(vobj.contenu3) + ':' + displayRetroclock2d(vobj.contenu4);
			}
		});
	}
	
	if(typ=='de-count'){
		$('.clockbloc' + i).flipcountdown({
			tick:function(){
				var id = this.attr("data-i");
				var vobj = CObjets[id];
				
				vobj.contenu4 = parseInt(vobj.contenu4) - 1;
				
				if( parseInt(vobj.contenu4)<0){
					vobj.contenu4 = 60;
					vobj.contenu3 = parseInt(vobj.contenu3) - 1;
				}
				if( parseInt(vobj.contenu3)<0){
					LUDI.nextPage();
				}
				return displayRetroclock2d(vobj.contenu2) + ':' + displayRetroclock2d(vobj.contenu3) + ':' + displayRetroclock2d(vobj.contenu4);
			}
		});
	}
	
	
}

function displayRetroclock2d(myNumber){
	var formattedNumber = ("0" + myNumber).slice(-2);
	return formattedNumber;
}

function onZoom(obj){
	
	var xb = parseInt(obj.x * zoom);
	var yb = parseInt(obj.y * zoom);
	var wb = parseInt(240);
	var hb = parseInt(55);
	
	var mbid = $('.clockbloc' + obj.id);
	
	mbid.css('position','absolute');
	
	mbid.css('-webkit-transform-origin','0px 0px');
    mbid.css('-moz-transform-origin','0px 0px');
    mbid.css('-ms-transform-origin','0px 0px');
    mbid.css('-o-transform-origin','0px 0px');
    mbid.css('transform-origin','0px 0px');
	
	mbid.css('left',xb+'px').css('top',yb+'px');
	mbid.css('width','240px').css('height','55px');
	
	mbid.css('transform','scale(' + zoom+ ')');
	
}

function isOK(obj){
	
	
}

function add30MinClock(){
	var vobj = CObjets[GlobalClockId];
	vobj.contenu3 = parseInt(vobj.contenu3) + 30;
	vobj.contenu4 = 0;
	if( parseInt(vobj.contenu3)>59){
		vobj.contenu3 = parseInt(vobj.contenu3) - 60;
		vobj.contenu2 = parseInt(vobj.contenu2) + 1;
	}
}
