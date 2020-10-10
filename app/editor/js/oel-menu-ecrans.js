
function drwImageDataMini(processId,ctx){
	
	for (var i = 0; i < CLudisCount; i++){
		var obj = CLudis[i];
		if(obj.supp==0){
			if(obj.pageId==processId){
				if(obj.type=='barre'){
					var rx = parseInt(obj.x * 0.16);
					var ry = parseInt(obj.y * 0.16);
					var rw = parseInt(obj.width * 0.16);
					var rh = parseInt(obj.height * 0.16);
					ctx.fillStyle = obj.val;
					ctx.fillRect(rx,ry,rw,rh);
					ctx.stroke();
				}
			}
		}
	}
	
	for (var i = 0; i < CLudisCount; i++){
		
		var obj = CLudis[i];
		
		if(obj.supp==0){
			
			if(obj.pageId==processId){
				
				if(obj.type=='img'||obj.type=='bilan'||obj.type=='plugin'){

					var img = new Image();
					img.onload = function() {
						var objIm = CLudis[img.id];
						var x = parseInt(objIm.x * 0.16);
						var y = parseInt(objIm.y * 0.16);
						var dw = parseInt(objIm.width * 0.16);
						var dh = parseInt(objIm.height * 0.16);
						ctx.drawImage(img, x, y, dw, dh);
					};
					var srcimg = correctUrlImg(obj.data);
					img.id = i;
					img.src = srcimg;
					
				}
				
				if(obj.type=='plugme'){
					
					var img = new Image();
					
					img.onload = function() {
						var objIm = CLudis[img.id];
						var x = parseInt(objIm.x * 0.16);
						var y = parseInt(objIm.y * 0.16);
						var dw = parseInt(objIm.width * 0.16);
						var dh = parseInt(objIm.height * 0.16);
						ctx.drawImage(img, x, y, dw, dh);
					};
					var srcimg = correctLocalUrlImg(obj.data);
					img.id = i;
					img.src = srcimg;
					
				}
				
				if(obj.type=='video'){

					var img = new Image();
					img.onload = function() {
						var objIm = CLudis[img.id];
						var x = parseInt(objIm.x * 0.16);
						var y = parseInt(objIm.y * 0.16);
						var dw = parseInt(objIm.width * 0.16);
						var dh = parseInt(objIm.height * 0.16);
						ctx.drawImage(img, x, y, dw, dh);
					};
					var srcimg = correctUrlImg(obj.data);
					img.id = i;
					img.src = srcimg;
					
				}
				
				if(obj.type=='speech'){
					
					var imgSpeech = new Image();
					imgSpeech.onload = function() {
						var objIm = CLudis[imgSpeech.id];
						var x = parseInt(objIm.x * 0.16);
						var y = parseInt(objIm.y * 0.16);
						var dw = parseInt(objIm.width * 0.16);
						var dh = parseInt(objIm.height * 0.16);
						ctx.drawImage(imgSpeech, x, y, dw, dh);
					};
					var srcimgSpeech = correctUrlImg(obj.data);
					imgSpeech.id = i;
					imgSpeech.src = srcimgSpeech;
					
				}

				if(obj.type=='bilan'){
					
					var imgBilan = new Image();
					imgBilan.onload = function() {
						var objIm = CLudis[imgBilan.id];
						var x = parseInt(objIm.x * 0.16);
						var y = parseInt(objIm.y * 0.16);
						var dw = parseInt(objIm.width * 0.16);
						var dh = parseInt(objIm.height * 0.16);
						ctx.drawImage(imgBilan, x, y, dw, dh);
					};
					var srcimgBilan = folderAllImages + "scorebilan.png";
					imgBilan.id = i;
					imgBilan.src = srcimgBilan;
					
				}
				
				if(obj.type=='qcm'){
					
					var qcmx = parseInt(obj.x * 0.16);
					var qcmy = parseInt(obj.y * 0.16);
					var qcmdw = parseInt(obj.width * 0.16);
					var qcmdh = parseInt(obj.height * 0.16);
					var img2 = new Image();
					img2.onload = function() {
						ctx.drawImage(img2, qcmx, qcmy, qcmdw, qcmdh);
					};
					img2.src = 'img/littleqcm.jpg';
					
				}
				
				if(obj.type=='lcm'){
					
					var qcmx = parseInt(obj.x * 0.16);
					var qcmy = parseInt(obj.y * 0.16);
					var qcmdw = parseInt(obj.width * 0.16);
					var qcmdh = parseInt(obj.height * 0.16);
					var img3 = new Image();
					img3.onload = function() {
						ctx.drawImage(img3, qcmx, qcmy, qcmdw, qcmdh);
					};
					img3.src = 'img/littlelcm.png';
				}
				
				if(obj.type=='text'||obj.type=='tcm'||obj.type=='dom'){
					var x2 = parseInt(obj.x * 0.16);
					var y2 = parseInt(obj.y * 0.16);
					var dw2 = parseInt(obj.width * 0.16);
					var dh2 = parseInt(obj.height * 0.16);
					rectangledText(ctx,x2,y2,dw2,cleanText(obj.text),4,'Helvetica','black');
				}
				
				if(obj.type=='title'){
					var xt = parseInt((obj.x + 5) * 0.16);
					var yt = parseInt((obj.y + 15) * 0.16);
					var dwt = parseInt(obj.width * 0.16);
					var dht = parseInt(obj.height * 0.16);
					rectangledText(ctx,xt,yt,dwt,cleanText(obj.text),4,'Helvetica','white');
				}
				
			}
		}
	}
	
}

function getImageDataMini(processId){
	
	if(!openelearning.gebi('page' + processId)){
		return false;
	}
	
	var c = openelearning.gebi('page' + processId);
	var ctx = c.getContext("2d");
	
	ctx.clearRect(0,0,c.width,c.height);
	
	var pa = GetPageById(processId);
	
	if(typeof pa === "undefined"){
		return false;
	}
	if(typeof pa.back === "undefined"){
		pa.back = 'white.jpg';
	}
	
	if(pa.back!=''&&pa.back!='white.jpg'){
		var imgBack = new Image();
		imgBack.onload = function(){
			ctx.drawImage(imgBack,0,0,153,115);
			drwImageDataMini(processId,ctx);
			getImageDataMiniV2(processId,pa,ctx);
		};
		imgBack.src = folderAllImages + pa.back;
	}else{
		drwImageDataMini(processId,ctx);
		getImageDataMiniV2(processId,pa,ctx);
	}
	
}

function getImageDataMiniV2(processId,pa,ctx){
	
	if(pa.comicMode>0){
		var imgComic01 = new Image();
		imgComic01.onload = function(){
			ctx.drawImage(imgComic01,0,0,153,115);
		};
		imgComic01.src = folderAllImages + "comic-0" + pa.comicMode + ".png";
	}
	
	for(var i=0;i<CPagesCount;i++){
		var pa = CPages[i];
		if (typeof pa === "undefined") {
		}else{
			if(pa.pageId==processId){
				pa.havemin = 1;
			}
		}
	}
	
}

function unloadImageData(){

	$('#page' + GPageId).attr("src","img/empty.png");

}
