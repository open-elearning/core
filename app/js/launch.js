
var recent1 = '';
var recent2 = '';
var recent3 = '';
var recent4 = '';

function displayNone(sel){
	
	var els = document.querySelectorAll(sel);
	for (var x = 0; x < els.length; x++){
		els[x].style.display = 'none';
	}
    	
}
function displayShow(sel){

	var els = document.querySelectorAll(sel);
	for (var x = 0; x < els.length; x++){
		els[x].style.display = 'block';
	}

}

function loadLaunch(){

	$(".pleasewait").css("display","block");
	$(".loadimg").css("display","none");
	
	var remote = require('electron').remote;
	
	recent1 = remote.getGlobal('sharedFiles').recent1;
	recent2 = remote.getGlobal('sharedFiles').recent2;
	recent3 = remote.getGlobal('sharedFiles').recent3;
	recent4 = remote.getGlobal('sharedFiles').recent4;
	
	if(isFileOk(recent1)){
		$("#linerecent1").html("<span>" + recent1.replace('.openelearning','') + "</span>");
		$("#linerecent1").css("display","block");
	}else{
		$("#linerecent1").css("display","none");
	}
	if(isFileOk(recent2)){
		$("#linerecent2").html("<span>" + recent2.replace('.openelearning','') + "</span>");
		$("#linerecent2").css("display","block");
	}else{
		$("#linerecent2").css("display","none");
	}
	if(isFileOk(recent3)){
		$("#linerecent3").html("<span>" + recent3.replace('.openelearning','') + "</span>");
		$("#linerecent3").css("display","block");
	}else{
		$("#linerecent3").css("display","none");
	}
	if(isFileOk(recent4)){
		$("#linerecent4").html("<span>" + recent4.replace('.openelearning','') + "</span>");
		$("#linerecent4").css("display","block");
	}else{
		$("#linerecent4").css("display","none");
	}
	
}

function isFileOk(fileRecent){
	
	if(fileRecent==''){
		return false;
	}
	if(fileRecent.indexOf(".openelearning")==-1){
		return false;
	}
	return true;
	
}

function launchRecent(i){
	
	var path = '';
	
	if(i==1){path=recent1;}
	if(i==2){path=recent2;}
	if(i==3){path=recent3;}
	if(i==4){path=recent4;}
	
	if(path!=''){
		
		$("#divrecent").css("display","none");
		$("#newProject").css("display","none");
		$("#openProject").css("display","none");
		$("#extensions").css("display","none");
		
		const electron = require('electron');
		const ipc = electron.ipcRenderer;
		
		var data = [];
		data[0] = path;
		
		ipc.send('message',{key:'openfile',val:data});
		
		$(".pleasewait").css("display","none");
		$(".loadimg").css("display","block");
			
		setTimeout(function(){
			ipc.send('ShowEditorWindow');
		},500);
		
	}

}

setTimeout(function(){
	loadLaunch();
},3000);

setTimeout(function(){
	getVersion();
},100);

function getVersion(){

	var remote = require('electron').remote;
	var appVersion = remote.getGlobal('appVersion');
	$('#openelearningversion').html('Beta V ' + appVersion);
	
}