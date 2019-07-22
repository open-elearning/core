
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
	this.x;this.y;
	this.width;this.height;
	
	this.x2;this.y2;
	this.width2;this.height2;
	
	this.realwidth;this.realheight;
	
	this.fontSize;this.pageId;this.data;
	this.text;this.text2;this.text3;
	this.text4;this.text5;this.text6;
	this.val;this.val2;this.val3;
	this.val4;this.val5;this.val6;
	
	this.number;
	this.anim;
	this.lock = false;
	this.zindex;
	
	this.note;this.remarque;
	this.isCreate;this.supp;
		
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

}

function correctUrlImg(imgsrc){
	if(imgsrc.indexOf("assets")==-1){
		imgsrc = folderAllImages + imgsrc;
	}
	return imgsrc;
}

function cloneObj(i){
	
	var obj1 = CLudis[i];
	
	var obj2 = LudiBase();
	
	obj2.type = obj1.type;
	obj2.subtype = obj1.subtype;
	
	obj2.x = obj1.x;
	obj2.y = obj1.y;
	obj2.width = obj1.width;
	obj2.height = obj1.height;
	obj2.realwidth = obj1.realwidth;
	obj2.realheight = obj1.realheight;
	obj2.fontSize = obj1.fontSize;
	obj2.data = obj1.data;
	obj2.zindex = obj1.zindex;
	obj2.anim = obj1.anim;
	
	obj2.text = obj1.text;
	obj2.text2 = obj1.text2;
	obj2.text3 = obj1.text3;
	obj2.text4 = obj1.text4;
	obj2.text5 = obj1.text5;
	obj2.text6 = obj1.text6;
	
	obj2.val = obj1.val;
	obj2.val2 = obj1.val2;
	obj2.val3 = obj1.val3;
	obj2.val4 = obj1.val4;
	obj2.val5 = obj1.val5;
	obj2.val6 = obj1.val6;
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
	loadPage(GPageId);
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
	
	if(obj2.x<30){obj2.x = 20;}
	if(obj2.y<60){obj2.y = 59;}
	
	obj2.width = obj1.width;
	obj2.height = obj1.height;
	obj2.realwidth = obj1.realwidth;
	obj2.realheight = obj1.realheight;
	obj2.fontSize = obj1.fontSize;
	obj2.data = obj1.data;
	obj2.zindex = obj1.zindex;
	obj2.anim = obj1.anim;
	
	obj2.text = obj1.text;
	obj2.text2 = obj1.text2;
	obj2.text3 = obj1.text3;
	obj2.text4 = obj1.text4;
	obj2.text5 = obj1.text5;
	obj2.text6 = obj1.text6;
	
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
		
		placeWorkingPlace(false);
		
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

