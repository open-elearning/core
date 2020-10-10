
var folderAllVideos = "";

function videoEdit(){
	
	var p = '';
	
	p += '<div id="videoeditzone" class="editvideozone pan ' + TYPEWIND + 'osBorder" >';
	
	p += barreEdit();

	p += '<p>Url of the video :</p>';
	
	p += '<input id="videoEditUrl" type="text" style="width:430px;" ';
	p += ' class="css-input" onchange="setSourceVideo();"  ';
	p += ' onkeyup="setSourceVideo();" value="" />';
	
	p += '<div id="overviewvideo" class="overviewvideo" >';
	p += '</div>';
	
	p += '<a style="position:absolute;left:10px;bottom:10px;" onclick="closeEdit();" ';
	p += 'class="validation lblcancel" >Cancel</a>';
	
	p += '<a style="position:absolute;right:10px;bottom:10px;" ';
	p += 'onclick="saveSourceVideo();" ';
	p += 'class="btnSave lblsave" >Save</a>';

	p += '</div>';
	
	p += '<img id="minvideoimage" class="tmpshow" ';
	p += ' src="" alt="Image not found" onerror="this.src=\'img/errorsrc.png\';" />';
	
	return p;
	
}

function setSourceVideo(){
	
	if(GlobalUid==-1){
		return false;
	}
	
	var txt = $('#videoEditUrl').val();
	txt = txt.replace(' ','');
	var idvideo = openelearning.extractvId(txt);

	var h = '<iframe width="320px" height="220" ';
	h += 'src="https://www.youtube.com/embed/';
	h += 'idvideo?rel=0&amp;controls=0&amp;showinfo=0" ';
	h += 'frameborder="0" allowfullscreen></iframe>';
	h = h.replace('idvideo',idvideo);
	var textVideo = h;
	$('#overviewvideo').html(textVideo);

}

function saveSourceVideo(){
	
	if(GlobalUid==-1){
		return false;
	}
	var obj = CLudis[GlobalUid];
	if(obj.type=='video'){
		var txt = $('#videoEditUrl').val();
		txt = txt.replace(' ','');
		obj.text = txt;
		var idvideo = openelearning.extractvId(txt);
		obj.val = idvideo;
		obj.text2 = '';	
	}
	eventObjects = true;
	closeEdit();

}

function launchVideoMp4Zone(obj){
	
	$('.opacedit,#editVideoMp4').css("display","block");
	$('#Mp4EditSelect').html(obj.text);
	videoMp4Overview(obj.text);
	
	if(obj.val==0){
		document.getElementById('videoMp4Fullscreen').checked = false;
	}else{
		document.getElementById('videoMp4Fullscreen').checked = true;
	}
	
	/*
		if(obj.val2==0){
			document.getElementById('videoMp4Nextpage').checked = false;
		}else{
			document.getElementById('videoMp4Nextpage').checked = true;
		}
	*/
	
	if(obj.val3==0){
		document.getElementById('videoMp4Autoplay').checked = false;
	}else{
		document.getElementById('videoMp4Autoplay').checked = true;
	}
					
}

function editVideoMp4Zone(){
	
	var p = '<div id="editVideoMp4" class="editVideoMp4 pan ' + TYPEWIND + 'osBorder" >';
	
	p += barEditWind('Video Mp4');
		
	p += '<p style="margin-top:25px;" >&nbsp;&nbsp;&nbsp;&nbsp;Video&nbsp;:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;';
	p += '<span id="Mp4EditSelect" style="width:240px;" ';
	p += 'onclick="videoUpload();" ';
	p += ' class="fakeSelect" >...</span></p>';
	
	p += '<div id="overviewvideomp4" style="margin-left:40px;" ';
	p += ' class="overviewvideo" ></div>';
	
	p += lineCheckBox('videoMp4Fullscreen',getTrd("fullscreen"));
	//p += lineCheckBox('videoMp4Nextpage',getTrd("autonextpage"));
	p += lineCheckBox('videoMp4Autoplay',getTrd("autoplay"));
	
	p += '<div class="listVideoMp4boutons" >';
	
	p += '<a style="float:left;" onclick="closeEdit();" ';
	p += 'class="validation lblcancel" >Cancel</a>';
	
	p += '<a style="float:right;margin-right:10px;" ';
	p += 'onclick="videoMp4Save();" ';
	p += 'class="btnSave lblsave" >Save</a>';
	
	p += '</div>';
	
	p += '</div>';
	
	return p;

}

function lineCheckBox(id,lab){
	
	var p = '<div style="position:relative;margin-left:70px;';
	p += ';width:260px;margin-bottom:4px;" >';
	p += '<label style="margin-top:1px;" ';
	p += ' class="el-switch el-switch-green" >';
	p += '<input id="'+id+'" type="checkbox" name="switch" >';
	p += '<span class="el-switch-style"></span>';
	p += '</label>';
	p += '<span class="margin-r" ';
	p += ' style="position:absolute;left:50px;top:0px;"  >';
	p += '&nbsp;'+lab+'</span>';
	p += '</div>';
	
	return p;
	
}

function videoUpload(){
	
	const electron = require('electron');
	const ipc = electron.ipcRenderer;
	ipc.send('message',{key:'uploadvideo'});
	
	setTimeout(function(){
		controlReceptionVideoUpload();
	},300);
	
}

function videoMp4Save(){
	
	var obj = CLudis[GlobalUid];
	
	if($('#Mp4EditSelect').html().indexOf(".mp4")!=-1){
		obj.text = $('#Mp4EditSelect').html();
	}else{
		obj.text = "...";
	}
	
	if(document.getElementById('videoMp4Fullscreen').checked){
	obj.val = 1;}else{obj.val = 0;}
	
	//if(document.getElementById('videoMp4Nextpage').checked){
	//obj.val2 = 1;}else{obj.val2 = 0;}
	
	obj.val2 = 0;

	if(document.getElementById('videoMp4Autoplay').checked){
	obj.val3 = 1;}else{obj.val3 = 0;}
	
	closeEdit();
	
}

var idVideoOverview = '';

function videoMp4Overview(idvideo){

	if(typeof idvideo === "undefined"){
		idvideo = '';
	}
	idVideoOverview = idvideo;

	if(folderAllPlugins==''){

		setTimeout(function(){
			videoMp4Overview(idVideoOverview);
		},1000);

	}else{
		if(idvideo.indexOf(".mp4")!=-1){
			folderAllVideos = folderAllPlugins.replace("plugins","assets");
			var h = '<video style="width:316px;height:210px;" ';
			h += ' controls src="' + folderAllVideos + idvideo +'" autoplay muted ></video>';
			$('#overviewvideomp4').html(h);
		}
	}

}

function controlReceptionVideoUpload(){

	if ($('#editVideoMp4').is(':visible')) {
		
		var remote = require('electron').remote;
		var dataVideo = remote.getGlobal('sharedObj').dataVideo;
		
		if(dataVideo==''){
			setTimeout(function(){
				controlReceptionVideoUpload();
			},300);
		}else{
			$('#Mp4EditSelect').html(dataVideo);
			videoMp4Overview(dataVideo);
		}
		
	}
	
}

