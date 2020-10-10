
var imgUzl ="cµ____<img src='img/load.gif' />µc";
var loadUzl = true;
var urlImage = '';
var folderAllImages = '';
var targetImg = 0;

var memImagesDec = '';

function getAssetsList(){

	var remote = require('electron').remote;
	var listassets = remote.getGlobal('sharedObj').listassets;
	
	if(typeof listassets === 'undefined'){
		listassets = "";
	}

	if(listassets!=''){
		var res = listassets.split(";");
		var dir = res[0];
		folderAllImages = dir;
	}
	
	return listassets;
	
}

function getAssetsOne(){

	var remote = require('electron').remote;
	var imgassets = remote.getGlobal('sharedObj').imgassets;

	if(typeof imgassets === 'undefined'){
		imgassets = "";
	}

	return imgassets;
	
}

//Windows Images
function imageEditZone(){
	
	var p = '<div id="editImage" class="editImage pan ' + TYPEWIND + 'osBorder" >';
	
	p += barEditWind('Images')

	p += '<div id="listzoneload" class="listzoneload" >.</div>';

	p += '<div id="listzone" class="listzone" >';
	p +=  openelearning.cthl(imgUzl);
	p += "</div>";
	
	p += '<div class="listzoneboutons" >';
	p += '<a style="float:left;" onclick="closeEdit();" ';
	p += 'class="validation" >'+getTrdU("cancel")+'</a>';
	
	p += '<a style="float:right;margin-right:10px;" ';
	p += 'onclick="imageInsert();" ';
	p += 'class="btnSave" >'+getTrdU("apply")+'</a>';
	
	p += '<a id="btnImgUpload" style="float:right;margin-right:10px;" ';
	p += 'onclick="imageUpload();" ';
	p += 'class="validation" >'+getTrdU("upload")+'</a>';
	
	p += '</div></div>';
	
	return p;

}

function imageUpload(){
	
	var ht = openelearning.cthl(imgUzl);
	
	$('#listzone').html(ht);
	
	const electron = require('electron');
	const ipc = electron.ipcRenderer;
	ipc.send('message',{key:'uploadimage'});
	
	setTimeout(function(){
		imageUploadDetectEnd();
	},1000);
	
}

function imageUploadDetectEnd(){
	
	var listassets = getAssetsList();
	if(listassets==''){
		setTimeout(function(){
			imageUploadDetectEnd();
		},1000);
	}else{
		launchImageOneZone();
	}
	
}

function selUzl(i){
	$('.Uzl').css("border","2px dashed #F2F2F2");
	$('#Uzl' + i).css("border","2px solid green");
    var bg = $('#Uzl' + i).css('background-image');
	bg = bg.replace('url(','').replace(')','').replace(/\"/gi, "");
	urlImage = bg;
}

function selCharImg(){
	launchImageEditZone();
}

function changePageUzl(i){
	$('.Uzl').css("display","none");
	$('.Pzl'+i).css("display","block");
}

function launchImageOneZone(){
	
	$('.opacedit,#editImage').css("display","block");
	
	var assetsOne = getAssetsOne();
	
	var memImages = '';
	
	if(assetsOne!=''){
		
		var data = "";

		var path = 'file:///' + folderAllImages + assetsOne;
		path = path.replace(/\\/g, "/");
		
		data += '<div id="Uzl0" class="Uzl Pzl1" onClick="selUzl(0);" ';
		data += 'style="background-image:url(\'' + path + '\');" ></div>';
		
		data += '<div id="UselCharImg" class="Uzl Pzl1 arrowGreen" onClick="selCharImg();" ';
		data += ' ></div>';
		
		$('#listzone').html(data);
	
		selUzl(0);	
	
	}else{
		
		launchImageEditZone();
		
	}
	
}

function filterImagesSys(name){
	
	$('#btnImgUpload').css("display","");
	
	var r = true;
	if(name.indexOf('uibase-')!=-1){
		$('#btnImgUpload').css("display","none");
		r = false;
	}
	if(name.indexOf('processoe-')!=-1){
		$('#btnImgUpload').css("display","none");
		r = false;
	}
	if(name.indexOf('fluxprocess.png')!=-1){
		$('#btnImgUpload').css("display","none");
		r = false;
	}
	if(name.indexOf('white.jpg')!=-1){
		r = false;
	}
	if(name.indexOf('comic-01.png')!=-1){
		r = false;
	}
	if(name.indexOf('playvideo.png')!=-1){
		r = false;
	}
	if(name.indexOf('roundnext.png')!=-1){
		r = false;
	}
	if(name.indexOf('roundprev.png')!=-1){
		r = false;
	}
	if(name.indexOf('scorebilan.png')!=-1){
		r = false;
	}
	if(name.indexOf('scorescreen.jpg')!=-1){
		r = false;
	}
	if(name.indexOf('littlelcm.png')!=-1){
		r = false;
	}
	
	var filter = "";
	
	if(GlobalUid!=-1){
		var objTempI = CLudis[GlobalUid];
		if(objTempI.type=='img'){
			if(objTempI.data.indexOf('processoe-')!=-1){
				filter = "processoe-";
				$('#btnImgUpload').css("display","none");
			}
			if(objTempI.data.indexOf('uibase-')!=-1){
				filter = "uibase-";
				var getparts = objTempI.data.split('-');
				if(getparts.length>0){
					filter = "uibase-" + getparts[1] + '-' ;
					$('#btnImgUpload').css("display","none");
				}
			}
		}
	}
	
	if(filter!=""){
		if(name.indexOf(filter)!=-1){
			r = true;
		}else{
			r = false;
		}
	}

	return r;
	
}

function launchImageEditZone(){
	
	$('.opacedit,#editImage').css("display","block");
	
	$('.listzoneload').html(".");
	$('.listzoneload').css("display","block");
	$('.listzone').css("opacity","0.1");

	var listassets = getAssetsList();
	
	var memImages = '';
	
	if(listassets!=''){
		
		var res = listassets.split(";");
		var dir = res[0];
		
		var data = "";
		
		for(var i = 0; i < res.length; i++) {
			var ress = res[i];
			if(i>0&&ress.indexOf('.html')==-1&&ress!=''){
				if(ress.indexOf('.png')!=-1
				||ress.indexOf('.jpg')!=-1
				||ress.indexOf('.gif')!=-1
				||ress.indexOf('.svg')!=-1){

					var path = 'file:///' + dir + ress;
					path = path.replace(/\\/g, "/");
					
					if(memImages.indexOf(path)==-1&&filterImagesSys(path)){
						
						data += '<div id="Uzl' + i + '" class="Uzl Pzl1" onClick="selUzl(' + i + ');" ';
						data += 'style="background-image:url(\'' + path + '\');" ';
						data += 'datasrc="' + path + '" datawidth=0 dataheight=0 ';
						data += '></div>';
						
						memImages = memImages + path + ';';
						memImagesDec = memImagesDec + path + ';';
					
					}
				}
			}
		}
		
		$('#listzone').html(data);
		
		calculImageRatio();
		
		setTimeout(function(){
			$('.listzoneload').html("..");
		},100);

		setTimeout(function(){
			$('.listzoneload').html("...");
		},200);
		
		setTimeout(function(){
			$('.listzoneload').html("....");
		},300);

		setTimeout(function(){
			$('.listzoneload').css("display","none");
			$('.listzone').css("opacity","1");
		},400);

	}else{
		
		$('.opacedit,#editImage').css("display","none");
		refreshImagesZones();
		
	}
	
}

function calculImageRatio(){
	
	$(".Pzl1").each(function(){
		
		var path = $(this).attr("datasrc");
		var img = new Image();
		img.id = "MselectY" + $(this).attr("id");
		img.onload = function(){
			var idM = this.id.replace("MselectY","");
			$("#" + idM).attr("datawidth",this.width).attr("dataheight",this.height);
		};
		img.src = path;
			
	});
	
	setTimeout(function(){
		filtreImageRatio();
	},200);

}

function filtreImageRatio(){
	
	$(".Pzl1").each(function(){
		
		var width = parseInt($(this).attr("datawidth"));
		var height = parseInt($(this).attr("dataheight"));
		
		//normal
		if(targetImg==0){

			var validImg = false;
			if(width<900&&height<700){
				validImg = true;
			}
			if(width==height){
				validImg = true;
			}
			if(validImg){
				$(this).css("display","block");
			}else{
				if(width>0){
					$(this).css("display","none");
				}
			}
		}
		
		//background
		if(targetImg==1||targetImg==2){
			if(width>900&&height>700){
				$(this).css("display","block");
			}else{
				if(width>0){
					$(this).css("display","none");
				}
			}
		}
		
		
		
		
	});
	
}

function refreshImagesZones(){
	
	const electron = require('electron');
	const ipc = electron.ipcRenderer;
	ipc.send('message',{key:'refreshimgs'});
	
}

function imageFinishUpload(file,dropCtr){
	dropCtr.removeAllFiles(true); 
	$('#listzone').html(imgUzl);
	refreshImagesZones();
	$('.opacedit,#editImage').css("display","none");
}

function imageInsert(){
	
	//Classic img
	if(targetImg==0){

		var objTempI = CLudis[GlobalUid];
		
		if(objTempI.type=='img'){

			$('.editImage').css("display","none");
			
			var img = new Image();
			img.onload = function() {
				
				var objTempT = CLudis[GlobalUid];
				objTempT.realwidth = img.width;
				objTempT.realheight = img.height;

				if(urlImage.indexOf(".svg")!=-1){
					if(img.width>900&&img.width==img.height){
						objTempT.width = 450;
						objTempT.height = 450;
					}else{
						objTempT.width = img.width;
						objTempT.height = img.height;
					}
				}else{
					objTempT.width = img.width;
					objTempT.height = img.height;
				}
				
				objTempT.data = urlImage;			
				loadPage(GPageId);
				$('.pan').css("display","none");
			};
			
			img.src = urlImage;
		
		}
			
	}
	
	//Page
	if(targetImg==1){
		
		$('.editImage').css("display","none");
		var obj = GetPageById(GPageId);
		var img = new Image();
		var filename = urlImage.replace(/^.*[\\\/]/, '')
		obj.back = filename;
		var filebackload = folderAllImages + obj.back;
		img.onload = function() {
			canvas.setBackgroundImage(filebackload);
		};
		img.src = filebackload;
		$('.pan').css("display","none");
		loadPage(GPageId);
	}

	//Screen
	if(targetImg==2){
		
		$('.editImage').css("display","none");
		
		var filename = urlImage.replace(/^.*[\\\/]/, '')
		PageApplikScreen(filename);

		var path = 'file:///' + folderAllImages + filename;
		path = path.replace(/\\/g, "/");
		
		$(".backScreenDiv").css("background-image",'url(' + path + ')');
		$('.opacedit,#editImage').css("display","none");
		$('.pan').css("display","none");
	}
	
}

function deleteImageBackScreen(){
	PageApplikScreen("");
	$(".backScreenDiv").css("background-image",'none');
	$('.pan').css("display","none");
}

function PageApplikScreen(screenBack){
	for(var i=0;i<CPagesCount;i++){
		var obj = CPages[i];
		if(typeof obj === "undefined"){
		}else{
			obj.screen = screenBack;
		}
	}
	return false;
}

function getApplikScreen(){
	var gscreen = "";
	for(var i=0;i<CPagesCount;i++){
		var obj = CPages[i];
		if(typeof obj === "undefined"){
		}else{
			if(obj.screen!=""){
				gscreen = obj.screen;
			}
		}
	}
	return gscreen;
}