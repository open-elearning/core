
var progressTranquil = 2;
var progressPrepare = ".";
var lmsSelect = "chamilo";

function loadProg(){
	
	$('.barreProgress').css("width", progressTranquil + "%");
	
	lmsSelect = $("#selectlms option:selected" ).val();
	
	setTimeout(function(){
		
		$('#etape1').css('display','none');
		$('#etape2').css('display','block');
		$('.loadimg').css('display','block');
		
		progressTranquil = progressTranquil + 10;
		$('.barreProgress').css("width", progressTranquil + "%");
		
		setTimeout(function(){
			progressTranquil = progressTranquil + 10;
			$('.barreProgress').css("width", progressTranquil + "%");
			finalRenderProcess();
		},500);
		
	},200);
	
}

function autoSelectImg(){
	
	var actuSelect = $("#selectlms option:selected" ).val();
	$('#imglms').attr("src", "images/" + actuSelect +  ".jpg");
	if(progressTranquil<30){
		setTimeout(function(){
			autoSelectImg();
		},250);
	}
	
}

setTimeout(function(){
	autoSelectImg()
},250);

function autoDisplayProcess(){
	if(haveRenderProcess()){
		setTimeout(function(){
			autoDisplayProcess();
		},1250);
		progressPrepare = progressPrepare + ".";
		$('#extensions-wait').html(progressPrepare);
	}else{
		$('#extensions-wait').css("display","none");
		$('#extensions-graphic').css("display","block");
	}
}

setTimeout(function(){
	autoDisplayProcess()
},2000);

function finalRenderProcess(){

	if(haveRenderProcess()){
		
		if(progressTranquil<90){
			progressTranquil = progressTranquil + 5;
		}else if(progressTranquil<96){
			progressTranquil = progressTranquil + 1;
		}
		
		$('.barreProgress').css("width", progressTranquil + "%");
		
		setTimeout(function(){
			finalRenderProcess();
		},500);
		
	}else{
		
		setTimeout(function(){
			if(progressTranquil<100){
				$('.barreProgress').css("width","100%");
			}
			setTimeout(function(){
				$('#etape2').css('display','none');
				$('#help'+lmsSelect).css('display','block');
			},500);
		
		},1500);
		
	}
	
}

//haveRenderProcess
function haveRenderProcess(){
	
	var remote = require('electron').remote;
	var renderProcess = remote.getGlobal('renderprocess');
	
	if(renderProcess==true||renderProcess==1){
		remote.getGlobal('sharedLogs').logs += 'ExportScorm => renderProcess = True;<br>';
		return true;
	}else{
		remote.getGlobal('sharedLogs').logs += 'ExportScorm => renderProcess = False;<br>';
		return false;
	}
	
}

