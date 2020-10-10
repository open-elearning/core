
var folderAllAudio = "";

function launchAudioMp3Zone(obj){
	
	$('.opacedit,#editAudioMp3').css("display","block");
	$('#Mp3EditSelect').html(obj.text);
	audioMp3Overview(obj.text);
	
	if(obj.val2==0){
		document.getElementById('audioMp3Nextpage').checked = false;
	}else{
		document.getElementById('audioMp3Nextpage').checked = true;
	}
	
	if(obj.val3==0){
		document.getElementById('audioMp3Autoplay').checked = false;
	}else{
		document.getElementById('audioMp3Autoplay').checked = true;
	}
					
}

function editAudioMp3Zone(){
	
	var p = '<div id="editAudioMp3" class="editAudioMp3 pan ' + TYPEWIND + 'osBorder" >';
	
	p += barEditWind('Audio Mp3');
		
	p += '<p style="margin-top:25px;" >&nbsp;&nbsp;&nbsp;&nbsp;Audio&nbsp;:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;';
	p += '<span id="Mp3EditSelect" style="width:240px;" ';
	p += 'onclick="audioUpload();" ';
	p += ' class="fakeSelect" >...</span></p>';
	
	p += '<div id="overviewaudiomp3" class="overviewaudio" ><audio>';
	p += '<source src="no.mp3" >';
	p += '</audio></div>';
	
	p += lineCheckBox('audioMp3Autoplay',getTrd("autoplay"));
	
	p += '<a style="position:absolute;left:15px;bottom:15px;" ';
	p += ' onclick="closeEdit();" ';
	p += 'class="validation lblcancel" >Cancel</a>';
	
	p += '<a style="position:absolute;right:15px;bottom:15px;" ';
	p += 'onclick="audioMp3Save();" ';
	p += 'class="btnSave lblsave" >Save</a>';

	p += '</div>';
	
	return p;

}

function audioUpload(){
	
	const electron = require('electron');
	const ipc = electron.ipcRenderer;
	ipc.send('message',{key:'uploadaudio'});
	
	setTimeout(function(){
		controlReceptionAudioUpload();
	},300);
	
}

function audioMp3Save(){
	
	var obj = CLudis[GlobalUid];
	
	if($('#Mp3EditSelect').html().indexOf(".mp3")!=-1){
		obj.text = $('#Mp3EditSelect').html();
	}else{
		obj.text = "...";
	}
    
	if(document.getElementById('audioMp3Autoplay').checked){
	obj.val3 = 1;}else{obj.val3 = 0;}
	
	closeEdit();
	
}

function audioMp3Overview(idaudio){
	
	if(typeof idaudio === "undefined"){
		idaudio = '';
	}
	if(idaudio.indexOf(".mp3")!=-1){
		folderAllAudio = folderAllPlugins.replace("plugins","assets");
		var h = '<audio controls>';
		h += '<source src="' + folderAllAudio + idaudio +'" type="audio/mpeg">';
	  	h += '</audio>';
		$('#overviewaudiomp3').html(h);
	}

}

function controlReceptionAudioUpload(){

	if ($('#editAudioMp3').is(':visible')) {
		
		var remote = require('electron').remote;
		var dataAudio = remote.getGlobal('sharedObj').dataAudio;
		
		if(dataAudio==''){
			setTimeout(function(){
				controlReceptionAudioUpload();
			},300);
		}else{
			$('#Mp3EditSelect').html(dataAudio);
			audioMp3Overview(dataAudio);
		}
		
	}
	
}
