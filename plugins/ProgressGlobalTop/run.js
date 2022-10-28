
var endPageBarTop = 0;
var backcolorPageBarTop = "#337ab7";
var isFinishPageBarTop = false;

function onPaint(obj){
	
	if(!document.getElementById("progressBarTop")){
	
		var color="white";
		if(obj.color){
			color=obj.color;
		}
		
		if(obj.field1!=''){
			backcolorPageBarTop = obj.field1;
		}
		
		if(obj.field2!=''){
			endPageBarTop = parseInteger(obj.field2);
		}
		
		var h = '<div id="progressBarTop" class="progressBarTop" >';
		h += '<div class="progress-bar" ';
		h += ' style="width:1%;background-color:'+backcolorPageBarTop+';" >';
		h += '</div></div>';

		h += '<div id="progressBarTopFinal" class="progressBarTopFinal" ></div>';

		$("body").append(h);
		
		setTimeout(function(){ 
			calculPlacementBarTop();
		},2000);
		
	}
	
	return "";

}

function calculPlacementBarTop(){

	var lx =  parseInt(largEcranWidth *zoom);
	var largX =  parseInt(lx*0.9);
	var ly =  parseInt((largEcranHeight *zoom)/2);

	$('#progressBarTop').css("width",largX + 'px');
	$('#progressBarTop').css("margin-left",((largX/2)*-1) + 'px');
	
	var mt = (ly + 7)*-1 ;
	$('#progressBarTop').css("margin-top", mt + 'px');
	$('#progressBarTop').css("display","block");

	var mt = (ly + 15)*-1 ;
	$('#progressBarTopFinal').css("margin-top", mt + 'px');
	$('#progressBarTopFinal').css("margin-left",((largX/2)-2) + 'px');
	$('#progressBarTopFinal').css("display","block");
	
	var actuNb = calculProgressNbPage();
	var fullNb = LUDI.getFullNbPage();

	var pourcProg= 0;

	if(actuNb==0||fullNb==0){
		pourcProg=0;
	}else{
		pourcProg = parseInt(((actuNb)/fullNb)*100);
	}

	if(endPageBarTop!=0&&endPageBarTop==LUDI.getNumPage()){
		isFinishPageBarTop = true;	
	}
	
	if(isFinishPageBarTop){
		pourcProg = 100;
	}
	if(pourcProg==100){
		$('#progressBarTopFinal').css("background-color",backcolorPageBarTop);
	}
	$('.progress-bar').css("width",pourcProg + '%');

	setTimeout(function(){ 
		calculPlacementBarTop();
	},1000);

}

function calculProgressNbPage(){

	var nbP = 0;
	var processSearch = true;
	var aNumPage = LUDI.getNumPage();
	
	for(var i=0;i<800;i++){
		if(processSearch){
			if(pageNumExistXml(i)){
				nbP++;
				if(aNumPage==i){
					processSearch = false;
				}
			}
		}
	}

	return nbP;

}

function onZoom(obj){
	
	var xb = parseInt(obj.x * zoom);
	var yb = parseInt(obj.y * zoom);
	
	var wb = parseInt(obj.w * zoom);
	var hb = parseInt(obj.h * zoom);
	
}

function isOK(obj){
	


}



