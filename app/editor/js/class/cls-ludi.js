
var GPageId = '';
var finishLoadJson = false;
var finishLoadData = false;
var unLockSize = -1;

//Objets CLudi
function CLudi(){
	
	this.type;
	this.subtype;
	
	this.id;
	this.idFab;
	this.unikid;
	this.idString;
	this.css;

	this.x;this.y;
	this.width;this.height;
	
	this.x2 = -1;
	this.y2 = -1;
	this.width2 = -1;
	this.height2 = -1;
	
	this.realwidth = -1;
	this.realheight = -1;
	
	this.realwidth2 = -1;
	this.realheight2 = -1;

	this.fontSize;this.pageId;this.data;

	this.text;this.text2;this.text3;
	this.text4;this.text5;this.text6;
	this.text7;this.text8;

	this.val;this.val2;this.val3;
	this.val4;this.val5;this.val6;
	this.val7;this.val8;

	this.actionVal;
	this.actionData;
	this.actionLine1;
	this.actionLine2;

	this.number;
	this.anim;
	this.lock = false;
	this.zindex;
	
	this.note;this.remarque;
	this.isCreate;this.supp;
	
	this.idsDico;
	
	this.showElement = function(){
		CLudiRender(this);
	}
	this.haveEditElement = function(){
		var b = true;
		if(this.type=='bilan'){b = false};
		if(this.type=='life'){b = false};
		if(this.type=='tablescore'){b = false};
		if(this.subtype=='tablescore'){b = false};
		return b;
	}
	this.setX = function(v){
		if(EDITORMODE==1){
			this.x2 = v;
		}else{
			this.x = v;
		}
	}
	this.setY = function(v){
		if(EDITORMODE==1){
			this.y2 = v;
		}else{
			this.y = v;
		}
	}
	this.setW = function(v){
		if(EDITORMODE==1){
			this.width2 = v;
		}else{
			this.width = v;
		}
	}
	this.setH = function(v){
		if(EDITORMODE==1){
			this.height2 = v;
		}else{
			this.height = v;
		}
	}
	this.setRW = function(v){
		if(EDITORMODE==1){
			this.realwidth2 = v;
		}else{
			this.realwidth = v;
		}
	}
	this.setRH = function(v){
		if(EDITORMODE==1){
			this.realheight2 = v;
		}else{
			this.realheight = v;
		}
	}

	this.getX = function(){
		if(EDITORMODE==1){
			if (this.x2<1) {
				this.x2=this.x;
				if(this.x2>470){
					this.x2 = 300;
				}
			}
			return parseInt(this.x2);
		}else{
			return parseInt(this.x);
		}
	}
	this.getY = function(){
		if(EDITORMODE==1){
			if (this.y2<1) {
				this.y2=this.y;
			}
			return parseInt(this.y2);
		}else{
			return parseInt(this.y);
		}
	}
	this.getW = function(){
		if (EDITORMODE==1) {
			if (this.width2<1) {
				this.width2=this.width;
			}
			return parseInt(this.width2);
		}else{
			return parseInt(this.width);
		}
	}
	this.getH = function() {
		if (EDITORMODE==1) {
			if(this.height2<1){
				this.height2=this.height;
			}
			return parseInt(this.height2);
		}else{
			return parseInt(this.height);
		}
	}
	this.getRW = function() {
		if (EDITORMODE==1) {
			if (this.realwidth2<1) {
				this.realwidth2 = this.realwidth;
			}
			return parseInt(this.realwidth2);
		}else{
			return parseInt(this.realwidth);
		}
	}
	this.getRH = function() {
		if (EDITORMODE==1) {
			if (this.realheight2<1) {
				this.realheight2 = this.realheight;
			}
			return parseInt(this.realheight2);
		}else{
			return parseInt(this.realheight);
		}
	}

}

function cloneObj(i){
	
	var obj1 = CLudis[i];
	
	var obj2 = LudiBase();
	
	obj2.type = obj1.type;
	obj2.subtype = obj1.subtype;
	obj2.idString = obj1.idString;
	
	obj2.x = obj1.x;
	obj2.y = obj1.y;
	obj2.width = obj1.width;
	obj2.height = obj1.height;

	obj2.x2 = obj1.x2;
	obj2.y2 = obj1.y2;
	obj2.width2 = obj1.width2;
	obj2.height2 = obj1.height2;

	obj2.realwidth = obj1.realwidth;
	obj2.realheight = obj1.realheight;

	obj2.realwidth2 = obj1.realwidth2;
	obj2.realheight2 = obj1.realheight2;

	obj2.fontSize = obj1.fontSize;
	obj2.data = obj1.data;
	obj2.zindex = obj1.zindex;
	obj2.anim = obj1.anim;
	obj2.css = obj1.css;

	obj2.text = obj1.text;
	obj2.text2 = obj1.text2;
	obj2.text3 = obj1.text3;
	obj2.text4 = obj1.text4;
	obj2.text5 = obj1.text5;
	obj2.text6 = obj1.text6;
	obj2.text7 = obj1.text7;
	obj2.text8 = obj1.text8;
	
	obj2.val = obj1.val;
	obj2.val2 = obj1.val2;
	obj2.val3 = obj1.val3;
	obj2.val4 = obj1.val4;
	obj2.val5 = obj1.val5;
	obj2.val6 = obj1.val6;
	obj2.val7 = obj1.val7;
	obj2.val8 = obj1.val8;

	obj2.actionVal = obj1.actionVal;
	obj2.actionData = obj1.actionData;
	obj2.actionLine1 = obj1.actionLine1;
	obj2.actionLine2 = obj1.actionLine2;
	
	obj2.number = obj1.number;
	obj2.note = obj1.note;
	obj2.remarque = obj1.remarque;

	return obj2;
		
}

var CLudis = new Array();
var CLudisCount = 0;

function CLudisAdd(Elem){
	
	if(GPageId==''){
		return false;
	}
	
	var returnV = -1;

	var unikid = 't' + Elem.type + 'x' + Elem.x + 'y' + Elem.y;
	unikid = unikid + 'w' + Elem.width + 'h' + Elem.height + 'p' + Elem.pageId;
	
	if(CLudiExists(unikid)==false){
		returnV = CLudisCount;
		Elem.id = CLudisCount;
		Elem.idFab = CLudisCount;
		Elem.unikid = unikid;
		Elem.supp = 0;
		CLudis.push(Elem);
		CLudisCount = CLudisCount + 1;
	}

	return returnV;
	
}

function CLudisPaint(){
	
	if(GPageId==''){
		return false;
	}
	
	var detectLock = false;

	for (var i = 0; i < CLudisCount; i++){
		if(CLudis[i].supp==0){
			if(CLudis[i].pageId==GPageId){
				CLudis[i].showElement();
				if(CLudis[i].lock){
					detectLock = true;
				}
			}
		}
	}
	if(detectLock){
		$("#lockopenludi").css("display","block");
	}else{
		$("#lockopenludi").css("display","none");
	}
	getImageDataMini(GPageId);

	showWiziZone();
	
}

function ludisUnlock(){
	if(GPageId==''){
		return false;
	}
	for (var i = 0; i < CLudisCount; i++){
		if(CLudis[i].supp==0){
			if(CLudis[i].lock){
				CLudis[i].lock = false;
			}
		}
	}
	$("#lockopenludi").css("display","none");
	loadPage(GPageId,1);
}

var stockLudis = null;

function copyCLudi(){
	
	loadEdit = true;
	
	var obj1 = CLudis[GlobalUid];
	
	var obj2 = LudiBase();
	
	obj2.type = obj1.type;
	obj2.subtype = obj1.subtype;
	
	obj2.x = obj1.x - 20;
	obj2.y = obj1.y - 20;
	
	obj2.x2 = obj1.x2 - 20;
	obj2.y2 = obj1.y2 - 20;

	if(obj2.x<30){obj2.x = 20;}
	if(obj2.y<60){obj2.y = 59;}
	
	obj2.width = obj1.width;
	obj2.height = obj1.height;

	obj2.width2 = obj1.width2;
	obj2.height2 = obj1.height2;

	obj2.realwidth = obj1.realwidth;
	obj2.realheight = obj1.realheight;

	obj2.realwidth2 = obj1.realwidth2;
	obj2.realheight2 = obj1.realheight2;

	obj2.fontSize = obj1.fontSize;
	obj2.data = obj1.data;
	obj2.zindex = obj1.zindex;
	obj2.anim = obj1.anim;
	obj2.css = obj1.css;
	
	obj2.text = obj1.text;
	obj2.text2 = obj1.text2;
	obj2.text3 = obj1.text3;
	obj2.text4 = obj1.text4;
	obj2.text5 = obj1.text5;
	obj2.text6 = obj1.text6;
	
	obj2.actionVal = obj1.actionVal;
	obj2.actionData = obj1.actionData;
	obj2.actionLine1 = obj1.actionLine1;
	obj2.actionLine2 = obj1.actionLine2;
	
	obj2.val = obj1.val;
	obj2.val2 = obj1.val2;
	obj2.val3 = obj1.val3;
	obj2.val4 = obj1.val4;
	obj2.val5 = obj1.val5;
	obj2.val6 = obj1.val6;
	obj2.number = obj1.number;
	obj2.note = obj1.note;
	obj2.remarque = obj1.remarque;
	
	stockLudis = obj2;
	
	loadEdit = false;
	
}

function pasteCLudi(){
	
	if(stockLudis==null){
		return false;
	}
	
	stockLudis.pageId = GPageId;
	
	CLudisAdd(stockLudis);
	
	CLudisPaint();
	
}

function CLudisGetNumber(type){
	
	if(GPageId==''){
		return 0;
	}
	
	var iVal = 0;
	
	for (var i = 0; i < CLudisCount; i++){
		if(CLudis[i].supp==0){
			if(CLudis[i].pageId==GPageId){
				if(CLudis[i].type==type){
					iVal = iVal + 1;
				}
			}
		}
	}
	
	return iVal;
	
}

function CLudisGetNumberWithActions(type){
	
	if(GPageId==''){
		return 0;
	}
	
	var iVal = 0;

	for (var i = 0; i < CLudisCount; i++){
		if(CLudis[i].supp==0){
			if(CLudis[i].pageId==GPageId){
				if(CLudis[i].type==type){
					if(CLudis[i].data=='DS'||CLudis[i].data=='DK'){
						iVal = iVal + 1;
					}
				}
			}
		}
	}
	
	return iVal;
	
}

function CLudiExists(unikid){
	
	for (var i = 0; i < CLudisCount; i++){
		if(CLudis[i].supp==0){
			if(CLudis[i].unikid==unikid){
				return true;
			}
		}
	}
	
	return false;
	
}

function UrlExists(url){
	return true;
}

var MoveObjectLudi;
var createObjectLudi = false;

function addMoveCursor(){
		
	if(createObjectLudi===false){
		
		placeWorkingPlace();
		
		createObjectLudi = true;
		
		var ol = -50;
		var ot = 50;
		var ow = 29;
		var oh = 29;
		
		var imgsrc = "img/mono-move.png";
		
		fabric.util.loadImage(imgsrc, function(img){
			
			var legimg = new fabric.Image(img,{
				borderColor :'white',
				left : ol,
				top  : ot,
				scaleX : ow / img.width,
				scaleY : oh / img.height
			});
			
			legimg.id = "Move";
			legimg.lockRotation = true;
			legimg.lockScalingY = true;
			legimg.lockScalingX = true;
			legimg.hasRotatingPoint = false;
			legimg.hasControls = false;
			legimg.hasBorders  = false;
			legimg.lockMovementX = false;
			legimg.lockMovementY = false;
			
			MoveObjectLudi = legimg;
			
			canvas.add(legimg);
			
		});
	
	}
	
}

