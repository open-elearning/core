
function onPaint(obj){
	
	var uid = LUDI.guid();
	
	obj.idstr = uid;

	var html = '<div onClick="clickSwitchGreen(' + obj.id + ')" class="switchthree bloc' + obj.id + '" >';
	html += '<div data-val="0" class="switchboule switchboule' + obj.id + '" ></div></div>';

	//Call previous values
	setTimeout(function(){
		recupDataObjectMem(obj,lastPage0);
	},300);

	return html;

}

function onZoom(obj){
	
	var xb = parseInt(obj.x * zoom);
	var yb = parseInt(obj.y * zoom);
	
	var wb = parseInt(obj.w * zoom);
	var hb = parseInt(obj.h * zoom);
	var radius = parseInt(obj.h/3);

	$('.bloc'+ obj.id).css("border-radius",radius + "px");
	$('.switchboule'+ obj.id).css("border-radius",(radius - 5) + "px");
	$('.switchboule'+ obj.id).css("width",parseInt(wb/2) + "px");
	$('.switchboule'+ obj.id).css("height",parseInt(hb-10) + "px");

}

function isOK(obj){
	var rb = false;
	var dataCtr = parseInt($('.switchboule'+ obj.id).attr("data-val"));
	var dataVal = parseInt(obj.fields[0]);
	if(dataCtr==dataVal){
		rb = true;
	}
	return rb;
}

function viewResults(obj){
	
	if($('.switchboule'+ obj.id).attr("data-val")==0){
		clickSwitchGreen(obj.id);
	}
	
}

function viewErrors(obj){

	$('#switchboule' + obj.id).css("background-color","red");

}

function sendObjMemory(obj){
	
	var mem = $('.switchboule'+ obj.id).attr("data-val");
	return mem;
	
}

function retrieveObjMemory(obj,mem){

	if(parseInt(mem)==1){
		clickSwitchGreen(obj.id);
	}

}

function clickSwitchGreen(i){

	var obj = CObjets[i];

	if($('.switchboule'+ obj.id).attr("data-val")==0){
		var wb = parseInt(obj.w * zoom);
		var farLeft  = parseInt(wb-((wb/2)+5));
		$('.switchboule'+ obj.id).css("left",farLeft + "px");
		$('.bloc'+ obj.id).css("background-color","#03deb2");
		$('.switchboule'+ obj.id).attr("data-val",1);
	}else{
		$('.switchboule'+ obj.id).css("left","5px");
		$('.switchboule'+ obj.id).attr("data-val",0);
		$('.bloc'+ obj.id).css("background-color","#D8D8D8");
	}


}
