
var imgstock = 0;
var imgx = 0;
var qcmx = 0;
var domx = 0;
var titleBase = "Enter title";
var colorBase = "#019875";
var lastUniKid = "";

function ajoutLudiIMG(){
	
	closePan();
	
	var objTemp = LudiBase();
	objTemp.type= "img";
	objTemp.x = 450 + imgx;
	objTemp.y = 170;
	objTemp.width  = 400;
	objTemp.height = 400;

	objTemp.x2 = 20 + imgx;
	objTemp.y2 = 590;
	objTemp.width2  = 161;
	objTemp.height2 = 161;

	objTemp.realwidth = objTemp.width;
	objTemp.realheight = objTemp.height;
	
	objTemp.pageId = GPageId;
	objTemp.data = "assets/girlshowqcm.png"
	if(imgstock==1){
		objTemp.data = "assets/girlshowqcm2.jpg"
	}
	
	GlobalUid = CLudisAdd(objTemp);
	lastUniKid = objTemp.unikid;
	CLudisPaint();
	imgx = imgx +1;
	imgstock = imgstock + 1;
	eventObjects = true;
	createRenderJSON();
	deleteLudiHELPER();
	
	targetImg = 0;
	launchImageEditZone();

}

function ajoutLudiIMGprocess(){
	
	closePan();
	
	var objTemp = LudiBase();
	objTemp.type= "img";
	objTemp.x = 250 + imgx;
	objTemp.y = 170;
	objTemp.width  = 150;
	objTemp.height = 150;

	objTemp.x2 = 20 + imgx;
	objTemp.y2 = 590;
	objTemp.width2  = 161;
	objTemp.height2 = 161;

	objTemp.realwidth = objTemp.width;
	objTemp.realheight = objTemp.height;
	
	objTemp.pageId = GPageId;
	objTemp.data = "assets/processoe-docu.svg"
	
	CLudisAdd(objTemp);

	lastUniKid = objTemp.unikid;
	CLudisPaint();
	imgx = imgx +1;
	imgstock = imgstock + 1;
	eventObjects = true;
	createRenderJSON();
	deleteLudiHELPER();
	
}

function ajoutLudiIMGpng(im,six,siy,rix,riy){
	
	closePan();
	
	var objTemp = LudiBase();
	objTemp.type= "img";
	objTemp.x = 250 + imgx;
	objTemp.y = 170;
	objTemp.width  = six;
	objTemp.height = siy;

	objTemp.x2 = 20 + imgx;
	objTemp.y2 = 590;
	objTemp.width2  = six * 0.7;
	objTemp.height2 = siy * 0.7;

	objTemp.realwidth = rix;
	objTemp.realheight = riy;
	
	objTemp.pageId = GPageId;
	objTemp.data = "assets/" + im + ".png"
	
	GlobalUid = CLudisAdd(objTemp);
	lastUniKid = objTemp.unikid;
	CLudisPaint();
	imgx = imgx +1;
	imgstock = imgstock + 1;
	eventObjects = true;
	createRenderJSON();
	deleteLudiHELPER();
	
	//Image choice
	targetImg = 0;
	launchImageEditZone();

}

function ajoutLudiIMGsvg(im,six,siy,rix,riy){
	
	closePan();
	
	var objTemp = LudiBase();
	objTemp.type= "img";

	objTemp.x = 250 + imgx;
	objTemp.y = 170;
	objTemp.width  = six;
	objTemp.height = siy;
	objTemp.realwidth = rix * 3.777;
	objTemp.realheight = riy * 3.777;
	
	objTemp.x2 = 20 + imgx;
	objTemp.y2 = 590;
	objTemp.width2  = six * 0.7;
	objTemp.height2 = siy * 0.7;

	objTemp.pageId = GPageId;
	objTemp.data = "assets/" + im + ".svg"
	
	CLudisAdd(objTemp);
	lastUniKid = objTemp.unikid;
	CLudisPaint();
	imgx = imgx +1;
	imgstock = imgstock + 1;
	eventObjects = true;
	createRenderJSON();
	deleteLudiHELPER();
	
}

function ajoutLudiIMGsvgReal(im,six,siy,rix,riy){
	
	closePan();
	
	var objTemp = LudiBase();
	objTemp.type= "img";

	objTemp.x = 250 + imgx;
	objTemp.y = 170;
	objTemp.width  = six;
	objTemp.height = siy;

	objTemp.realwidth = rix;
	objTemp.realheight = riy;
	
	objTemp.x2 = 20 + imgx;
	objTemp.y2 = 590;
	objTemp.width2  = six * 0.7;
	objTemp.height2 = siy * 0.7;

	objTemp.pageId = GPageId;
	objTemp.data = "assets/" + im + ".svg"
	
	GlobalUid = CLudisAdd(objTemp);
	lastUniKid = objTemp.unikid;
	CLudisPaint();
	imgx = imgx +1;
	imgstock = imgstock + 1;
	
	eventObjects = true;
	createRenderJSON();
	deleteLudiHELPER();
	
	//Image choice
	targetImg = 0;
	launchImageEditZone();

}

function ajoutLudiQCM(){
	
	var iCtn = CLudisGetNumber('qcm') + CLudisGetNumber('tcm') + CLudisGetNumber('lcm');
	
	if(iCtn>1){
		closePan();
		return false;
	}
	
	var objTemp2 = LudiBase();
	
	objTemp2.type= "qcm";
	objTemp2.x = 50 + qcmx;
	objTemp2.y = 260 + qcmx;
	objTemp2.width  = 453;
	objTemp2.height = 210;

	objTemp2.realwidth = objTemp2.width;
	objTemp2.realheight = objTemp2.height;
	
	objTemp2.pageId = GPageId;
	
	objTemp2.text  = getTrd("reply") + " 1";
	objTemp2.text2 = getTrd("reply") + " 2";
	objTemp2.text3 = getTrd("reply") + " 3";
	
	objTemp2.val  = 1;
	
	objTemp2.note = 1;
	objTemp2.remarque = "";
	
	objTemp2.data = "";
	objTemp2.fontSize = 20;
	
	qcmx++;

	CLudisAdd(objTemp2);
	
	lastUniKid = objTemp2.unikid;
	
	ajoutLudiQUEST();
	
	closePan();
	
	CLudisPaint();
	
	eventObjects = true;
	createRenderJSON();
	
	deleteLudiHELPER();
	
}

function ajoutLudiTCM(){
	
	var iCtn = CLudisGetNumber('qcm') + CLudisGetNumber('tcm') + CLudisGetNumber('lcm');
	
	if(iCtn>1){
		closePan();
		return false;
	}
	
	var objTemp2 = LudiBase();
	
	objTemp2.type= "tcm";
	objTemp2.x = 50;
	objTemp2.y = 160;
	objTemp2.width  = 400;
	objTemp2.height = 400;
	objTemp2.realwidth = objTemp2.width;
	objTemp2.realheight = objTemp2.height;
	
	objTemp2.pageId = GPageId;
	
	objTemp2.text = "This is [text] has holes. This is text has [holes].";
	
	objTemp2.note = 1;
	objTemp2.remarque = "";
	
	objTemp2.data = "";
	objTemp2.fontSize = 20;
	
	CLudisAdd(objTemp2);
	lastUniKid = objTemp2.unikid;
	closePan();
	
	CLudisPaint();
	eventObjects = true;
	createRenderJSON();
	deleteLudiHELPER();
}

function ajoutLudiLCM(){
	
	var iCtn = CLudisGetNumber('qcm') + CLudisGetNumber('tcm') + CLudisGetNumber('lcm');
	
	if(iCtn>1){
		closePan();
		return false;
	}
	
	var objTemp2 = LudiBase();
	
	objTemp2.type= "lcm";
	objTemp2.x = 240;
	objTemp2.y = 200;
	objTemp2.width  = 480;
	objTemp2.height = 260;
	objTemp2.realwidth = objTemp2.width;
	objTemp2.realheight = objTemp2.height;
	
	objTemp2.pageId = GPageId;
	
	objTemp2.text  = "Element 1";
	objTemp2.text2 = "Element 2";
	objTemp2.text3 = "Element 3";
	
	objTemp2.val  = "to Object 1";
	objTemp2.val2 = "to Object 2";
	objTemp2.val3 = "to Object 3";
	objTemp2.val4 = '';
	objTemp2.val5 = '';
	objTemp2.val6 = '';
	
	objTemp2.number = 3;
	
	objTemp2.note = 1;
	objTemp2.remarque = "";
	
	objTemp2.data = "";
	objTemp2.fontSize = 18;
	
	CLudisAdd(objTemp2);
	lastUniKid = objTemp2.unikid;
	closePan();
	
	CLudisPaint();
	eventObjects = true;
	createRenderJSON();
	deleteLudiHELPER();
}

function ajoutLudiInput(){

	var objInput = LudiBase();
	
	objInput.type= "input";
	objInput.x = 240 + imgx;
	objInput.y = 200;
	objInput.width  = 200;
	objInput.height = 36;
	objInput.realwidth = objInput.width;
	objInput.realheight = objInput.height;
	
	objInput.pageId = GPageId;
	
	objInput.text  = '';
	objInput.text2 = '';
	objInput.text3 = '';
	
	objInput.val  = '';
	objInput.val2 = '';
	objInput.val3 = '';
	objInput.val4 = '';
	objInput.val5 = '';
	objInput.val6 = '';
	
	objInput.number = 3;
	
	objInput.note = 1;
	objInput.remarque = "";
	
	objInput.data = "";
	objInput.fontSize = 18;
	
	imgx = imgx + 1;

	CLudisAdd(objInput);
	lastUniKid = objInput.unikid;
	closePan();
	
	CLudisPaint();
	eventObjects = true;
	createRenderJSON();
	deleteLudiHELPER();

}

function ajoutLudiVariable(){

	var objInput = LudiBase();
	
	objInput.type= "variable";
	objInput.x = 340 + imgx;
	objInput.y = 200;
	objInput.width  = 100;
	objInput.height = 100;
	objInput.realwidth = objInput.width;
	objInput.realheight = objInput.height;
	
	objInput.pageId = GPageId;
	
	objInput.text  = 'openvar';
	objInput.text2  = '1';
	objInput.text3  = '99';

	objInput.number = 3;
	
	objInput.note = 1;
	objInput.remarque = "";
	
	objInput.data = "";
	objInput.fontSize = 18;
	
	imgx = imgx + 1;

	CLudisAdd(objInput);
	lastUniKid = objInput.unikid;
	closePan();
	
	CLudisPaint();
	eventObjects = true;
	createRenderJSON();
	deleteLudiHELPER();

}

function ajoutLudiVIDEO(){
	
	var iCtn = CLudisGetNumber('video');
	if(iCtn>2){
		closePan();
		return false;
	}
	
	closePan();
	
	var objTemp = LudiBase();
	objTemp.type= "video";
	objTemp.x = 450;
	objTemp.y = 170;
	objTemp.width  = 448;
	objTemp.height = 252;
	objTemp.realwidth = objTemp.width;
	objTemp.realheight = objTemp.height;
	
	objTemp.pageId = GPageId;
	objTemp.data = "img/playvideo.png"
	
	objTemp.text = "https://www.youtube.com/watch?v=M1W_Y068aLo";
	objTemp.val = "M1W_Y068aLo";

	CLudisAdd(objTemp);
	
	CLudisPaint();
	eventObjects = true;
	createRenderJSON();
	deleteLudiHELPER();
}

function ajoutLudiVIDEOMP4(){
	
	var iCtn = CLudisGetNumber('videomp4');
	if(iCtn>2){
		closePan();
		return false;
	}
	
	closePan();
	
	var objTemp = LudiBase();
	objTemp.type= "videomp4";
	objTemp.text = "....";
	objTemp.x = 250;
	objTemp.y = 170;
	objTemp.width  = 448;
	objTemp.height = 252;
	objTemp.realwidth = objTemp.width;
	objTemp.realheight = objTemp.height;
	
	objTemp.pageId = GPageId;
	objTemp.data = "img/playvideo.png"
	
	CLudisAdd(objTemp);
	
	CLudisPaint();
	eventObjects = true;
	createRenderJSON();
	deleteLudiHELPER();
}

function ajoutLudiAUDIOMP3(){
	
	closePan();
	
	var objTemp = LudiBase();
	objTemp.type= "audio";
	objTemp.text = "....";
	objTemp.x = 450;
	objTemp.y = 420;
	objTemp.width  = 80;
	objTemp.height = 80;
	objTemp.realwidth = objTemp.width;
	objTemp.realheight = objTemp.height;
	
	objTemp.pageId = GPageId;
	objTemp.data = "img/audioplay.png"
	
	CLudisAdd(objTemp);
	
	CLudisPaint();
	eventObjects = true;
	createRenderJSON();
	deleteLudiHELPER();
}


function ajoutLudiBILAN(){
	
	var iCtn = CLudisGetNumber('bilan');
	if(iCtn>0){closePan();return false;}
	
	closePan();
	
	var objTemp = LudiBase();
	objTemp.type= "bilan";
	objTemp.x = 245;
	objTemp.y = 230;
	objTemp.width  = 450;
	objTemp.height = 240;
	objTemp.realwidth = objTemp.width;
	objTemp.realheight = objTemp.height;
	objTemp.pageId = GPageId;
	objTemp.data = "img/scorebilan.png";
	CLudisAdd(objTemp);
	
	CLudisPaint();
	eventObjects = true;
	createRenderJSON();
	deleteLudiHELPER();
}

function ajoutLudiLIFE(){
	
	var iCtn = CLudisGetNumber('life');
	if(iCtn>0){closePan();return false;}
	
	closePan();
	
	var objTemp = LudiBase();
	objTemp.type= "life";
	objTemp.x = 830;
	objTemp.y = 20;
	objTemp.width  = 114;
	objTemp.height = 38;
	objTemp.realwidth = objTemp.width;
	objTemp.realheight = objTemp.height;
	objTemp.pageId = GPageId;
	objTemp.data = "img/life.png";
	CLudisAdd(objTemp);
	
	CLudisPaint();
	eventObjects = true;
	createRenderJSON();
	deleteLudiHELPER();
	
}

//Plugin tableScore
function ajoutLudiTABLESCORE(){
	
	var iCtn = CLudisGetNumber('tablescore');
	if(iCtn>0){closePan();return false;}
	
	closePan();
	
	var objTemp = LudiBase();
	objTemp.type= "plugin";
	objTemp.subtype= "tablescore";
	
	objTemp.text3= "";
	objTemp.text4= "";
	
	objTemp.x = 245;
	objTemp.y = 230;
	objTemp.width  = 400;
	objTemp.height = 350;
	objTemp.realwidth = objTemp.width;
	objTemp.realheight = objTemp.height;
	objTemp.pageId = GPageId;
	objTemp.data = "img/plugins/scorescreen.jpg";
	CLudisAdd(objTemp);
	
	CLudisPaint();
	eventObjects = true;
	createRenderJSON();
	deleteLudiHELPER();
}

function ajoutLudiDATATABLE(){
	
	closePan();
	
	var objTemp = LudiBase();
	objTemp.type= "database";
	objTemp.subtype= "database";
	
	objTemp.text3= "";
	objTemp.text4= "";
	
	objTemp.x = 10;
	objTemp.y = 620;
	objTemp.width  = 180;
	objTemp.height = 80;
	objTemp.realwidth = objTemp.width;
	objTemp.realheight = objTemp.height;
	objTemp.pageId = GPageId;
	objTemp.data = "img/base.png";
	CLudisAdd(objTemp);
	
	CLudisPaint();
	eventObjects = true;
	createRenderJSON();
	deleteLudiHELPER();
	
}

//plugin plugin
function ajoutLudiPENDU(){
	
	var iCtn = CLudisGetNumber('plugin');
	if(iCtn>0){closePan();return false;}
	
	closePan();
	
	var objTemp = LudiBase();
	objTemp.type= "plugin";
	objTemp.subtype= "lependu";
	
	objTemp.text3= getTrd("secretword");
	objTemp.text4= getTrd("definition");
	
	objTemp.x = 245;
	objTemp.y = 130;
	objTemp.width  = 450;
	objTemp.height = 450;
	objTemp.realwidth = objTemp.width;
	objTemp.realheight = objTemp.height;
	objTemp.pageId = GPageId;
	objTemp.data = "img/plugins/lependuanimatescreen.jpg";
	CLudisAdd(objTemp);
	
	CLudisPaint();
	eventObjects = true;
	createRenderJSON();
	deleteLudiHELPER();
}

function ajoutLudiQUEST(){
	
	var objTemp = LudiBase();
	
	objTemp.type= "text";
	objTemp.x = 50 + qcmx;
	objTemp.y = 160 + qcmx;
	objTemp.width  = 350;
	objTemp.height = 100;
	objTemp.realwidth = objTemp.width;
	objTemp.realheight = objTemp.height;
	
	objTemp.pageId = GPageId;

	objTemp.text = getTrd("writeqcm");
	
	objTemp.fontSize = 18;

	CLudisAdd(objTemp);
	
	CLudisPaint();
	eventObjects = true;
	createRenderJSON();
	
}

function ajoutLudiTEXT(){
	
	var iCtn = CLudisGetNumber('qcm');
	iCtn = iCtn + CLudisGetNumber('text');
	iCtn = iCtn + CLudisGetNumber('img');
	
	if(iCtn>2){
		closePan();
		return false;
	}
	
	closePan();
	
	var objTemp = LudiBase();
	
	objTemp.type= "text";
	objTemp.x = 30;
	objTemp.y = 170;
	objTemp.width  = 400;
	objTemp.height = 400;

	objTemp.x2 = 20 + imgx;
	objTemp.y2 = 90;
	objTemp.width2  = 437;
	objTemp.height2 = 350;

	objTemp.realwidth = objTemp.width;
	objTemp.realheight = objTemp.height;
	
	objTemp.pageId = GPageId;

	objTemp.text = getTrd("sampletext");

	objTemp.fontSize = 18;
	
	CLudisAdd(objTemp);
	
	lastUniKid = objTemp.unikid;
	
	CLudisPaint();
	eventObjects = true;
	createRenderJSON();
	deleteLudiHELPER();
}

function ajoutLudiLABEL(){
	
	closePan();
	
	var objTemp = LudiBase();
	
	objTemp.type= "label";
	objTemp.x = 30;
	objTemp.y = 160 + imgx;
	objTemp.width = 200;
	objTemp.height = 50;
	objTemp.realwidth = objTemp.width;
	objTemp.realheight = objTemp.height;
	
	objTemp.pageId = GPageId;

	objTemp.text = getTrd("sampletext");

	objTemp.fontSize = 14;
	
	CLudisAdd(objTemp);
	
	lastUniKid = objTemp.unikid;

	imgx = imgx +1;
	
	CLudisPaint();
	eventObjects = true;
	createRenderJSON();
	deleteLudiHELPER();

}

function ajoutLudiSPEECH(){

	var objTemp = LudiBase();
	
	objTemp.type= "speech";
	objTemp.x = 320 + imgx;
	objTemp.y = 10;
	objTemp.width  = 300;
	objTemp.height = 220;
	objTemp.data = "img/bulle/bullebase.png";
	objTemp.realwidth = objTemp.width;
	objTemp.realheight = objTemp.height;
	objTemp.pageId = GPageId;
	objTemp.text = "Enter dialog here";

	objTemp.fontSize = 18;
	
	CLudisAdd(objTemp);
	lastUniKid = objTemp.unikid;
	imgx = imgx +1;
	
	CLudisPaint();
	eventObjects = true;
	createRenderJSON();
	
	closePan();
	
}

function ajoutLudiBTN(){
	
	if(isNonePage()&&haveLudiDomNp()){
		
		var objTemp = ajoutLudiDomNp()
		objTemp.pageId = GPageId;
		CLudisAdd(objTemp);
		lastUniKid = objTemp.unikid;
		CLudisPaint();
		eventObjects = true;
		createRenderJSON();
		deleteLudiHelperBtn();
		closePan();

		return false;
	}


	var iCtn = CLudisGetNumber('button');
	
	var objTemp = LudiBase();
	
	objTemp.text6 = 1;
	objTemp.type = 'button';
	objTemp.y = 650;
	if(iCtn==0){
		objTemp.x = 760;
		objTemp.text = getTrdU("next");
		objTemp.data = "DS";
	}
	if(iCtn==1){
		objTemp.x = 10;
		objTemp.text = getTrdU("return");
		objTemp.data = "DP";
	}
	if(iCtn==2){
		objTemp.x = 400;
		objTemp.text = getTrdU("next");
		objTemp.data = "DP";
	}
	if(iCtn==3){
		objTemp.x = 100;
		objTemp.text = getTrdU("next");
		objTemp.data = "DP";
	}
	if(iCtn==4){
		objTemp.x = 500;
		objTemp.text = getTrdU("next");
		objTemp.data = "DP";
	}
	if(iCtn==5){
		objTemp.x = 150;
		objTemp.y = 600;
		objTemp.text = getTrdU("next");
		objTemp.data = "DP";
	}
	if(iCtn==6){
		objTemp.x = 170;
		objTemp.y = 590;
		objTemp.text = getTrdU("next");
		objTemp.data = "DP";
	}
	objTemp.width  = 160;
	objTemp.height = 40;
	
	objTemp.realwidth = objTemp.width;
	objTemp.realheight = objTemp.height;
	
	objTemp.pageId = GPageId;
	
	objTemp.fontSize = 18;
	
	CLudisAdd(objTemp);
	lastUniKid = objTemp.unikid;
	CLudisPaint();
	eventObjects = true;
	createRenderJSON();
	deleteLudiHelperBtn();
	closePan();
	
}

function ajoutLudiDomNp(){

	for (var i = 0; i < CLudisCount; i++){
		if(CLudis[i].supp==0){
			if(CLudis[i].type=='dom'){
				if(CLudis[i].data=='DS'){
					return CLudis[i];
				}
				
			}
		}
	}

}

function haveLudiDomNp(){
	var b = false;
	for (var i = 0; i < CLudisCount; i++){
		if(CLudis[i].supp==0){
			if(CLudis[i].type=='dom'){
				if(CLudis[i].data=='DS'){
					b = true;
				}
				
			}
		}
	}
	return b;
}

function ajoutLudiTITLE(){
	
	var iCtn = CLudisGetNumber('title');
	
	if(iCtn>0){
		closePan();
		return false;
	}
	
	closePan();
	
	var objTemp = LudiBase();
	
	objTemp.type= "title";
	objTemp.x = 10;
	objTemp.y = 10;
	objTemp.width  = 440;
	objTemp.height = 55;
	objTemp.realwidth = objTemp.width;
	objTemp.realheight = objTemp.height;
	
	objTemp.pageId = GPageId;

	objTemp.text = getTrd("sampletitle");
	
	objTemp.fontSize = 20;
	
	CLudisAdd(objTemp);
	
	CLudisPaint();
	eventObjects = true;
	createRenderJSON();
	
}

function ajoutLudiBARRE(){
	
	var iCtn = CLudisGetNumber('barre');
	
	if(iCtn>0){
		closePan();
		return false;
	}
	
	closePan();
	
	var objTemp = LudiBase();
	
	objTemp.type= "barre";
	objTemp.x = 0;
	objTemp.y = 0;
	objTemp.width  = 960;
	objTemp.height = 76;
	objTemp.realwidth = objTemp.width;
	objTemp.realheight = objTemp.height;
	
	objTemp.x2 = 0;
	objTemp.y2 = 0;
	objTemp.width2  = 480;
	objTemp.height2 = 76;
	objTemp.realwidth2 = objTemp.width2;
	objTemp.realheight2 = objTemp.height2;

	objTemp.pageId = GPageId;

	objTemp.text = getTrd("sampletitle");
	objTemp.val = colorBase;
	
	objTemp.fontSize = 20;
	
	CLudisAdd(objTemp);
	
	CLudisPaint();
	eventObjects = true;
	createRenderJSON();
	
}

function ajoutLudiFluxPts(){
	
	var iCtn = CLudisGetNumber('fluxPts');
	
	if(iCtn>0){closePan();return false;}
	
	var o2 = LudiBase();
	o2.type= "fluxPts";
	o2.x = 50;
	o2.y = 160;
	o2.width  = 30;
	o2.height = 30;
	o2.realwidth = o2.width;
	o2.realheight = o2.height;
	o2.pageId = GPageId;
	o2.text = "";
	o2.val = guid();
	o2.val2 = 0;
	o2.val3 = 0;
	o2.note = 1;
	o2.remarque = "";
	o2.data = "";
	o2.fontSize = 20;
	
	CLudisAdd(o2);
	
	lastUniKid = o2.unikid;
	
	closePan();
	
	CLudisPaint();
	eventObjects = true;
	createRenderJSON();
	deleteLudiHELPER();
}

function ajoutLudiDOM(){

	closePan();
	
	var objTemp = LudiBase();
	
	objTemp.type= "dom";
	objTemp.x = 50 + domx;
	objTemp.y = 200 + domx;
	objTemp.width  = 200;
	objTemp.height = 100;
	objTemp.realwidth = objTemp.width;
	objTemp.realheight = objTemp.height;
	
	objTemp.pageId = GPageId;
	objTemp.text = "";
	objTemp.fontSize = 18;

	CLudisAdd(objTemp);
	
	lastUniKid = objTemp.unikid;
	
	domx = domx + 4;

	CLudisPaint();
	eventObjects = true;
	createRenderJSON();
	deleteLudiHELPER();

}

function addFluxPts(){
	
	var o1 = CLudis[GlobalUid];
	o1.val2 = 1;
	
	$('.actionaddfluxpts').css("display","none");
	
	var o2 = LudiBase();
	o2.type= "fluxPts";
	o2.x = o1.x + 60;
	o2.y = o1.y;
	o2.width  = 30;
	o2.height = 30;
	o2.realwidth = o2.width;
	o2.realheight = o2.height;
	o2.pageId = GPageId;
	o2.text = "";
	o2.val = o1.val;
	o2.val2 = 0;
	o2.val3 = o1.val3 + 1;
	o2.note = 1;
	o2.remarque = "";
	o2.data = "";
	o2.fontSize = 20;
	
	CLudisAdd(o2);
	
	lastUniKid = o2.unikid;
	
	closePan();
	
	CLudisPaint();
	eventObjects = true;
	createRenderJSON();
	deleteLudiHELPER();
	

}

function LudiBase(){
	
	var objTemp2 = new CLudi();
	
	objTemp2.type= "";
	objTemp2.subtype= "";
	objTemp2.x = -1;
	objTemp2.y = 260;
	objTemp2.width  = 350;
	objTemp2.height = 210;
	objTemp2.realwidth = objTemp2.width;
	objTemp2.realheight = objTemp2.height;
	
	objTemp2.pageId = GPageId;
	
	objTemp2.css = "";
	objTemp2.text = "";
	objTemp2.text2 = "";
	objTemp2.text3 = "";
	objTemp2.text4 = "";
	objTemp2.text5 = "";
	
	objTemp2.val = 0;
	objTemp2.val2 = 0;
	objTemp2.val3 = 0;
	objTemp2.val4 = 0;
	objTemp2.val5 = 0;
	
	objTemp2.zindex = 1;
	
	objTemp2.note = 1;
	objTemp2.remarque = "";
	
	objTemp2.data = "";
	objTemp2.fontSize = 20;
	objTemp2.isCreate = false;
	objTemp2.supp = 0;
	
	return objTemp2;
}

//BAS