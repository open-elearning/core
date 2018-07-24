
var recent1 = '';
var recent2 = '';

function loadLaunch(){
	
	$(".pleasewait").css("display","block");
	$(".loadimg").css("display","none");
	
	var remote = require('electron').remote;
	
	recent1 = remote.getGlobal('sharedFiles').recent1;
	recent2 = remote.getGlobal('sharedFiles').recent2;
	
	if(recent1!=''){
		$("#linerecent1").html("<span>" + recent1.replace('.openelearning','') + "</span>");
		$("#linerecent1").css("display","block");
	}else{
		$("#linerecent1").css("display","none");
	}
	
	if(recent2!=''){
		$("#linerecent2").html("<span>" + recent2.replace('.openelearning','') + "</span>");
		$("#linerecent2").css("display","block");
	}else{
		$("#linerecent2").css("display","none");
	}
	
}

function launchRecent(i){
	
	var path = '';
	
	if(i==1){path=recent1;}
	if(i==2){path=recent2;}
	
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
},2000);