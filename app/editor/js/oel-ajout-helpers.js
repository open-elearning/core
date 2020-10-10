
var getIntroH = false;
var getQcmH = false;
var getButtonH = false;
var helperQcmCount = 1;

function launchHelper(obj){

	deleteLudiHELPER();
	
	if(obj.text=="qcm"&&getQcmH==false){
		getQcmH = true;
		ajoutLudiQCMHELPERS();
		deleteLudiHELPER();
		ajoutLudiHELPBOUTON();
	}
	
	if(obj.text=="home"&&getIntroH==false){
		getIntroH = true;
		ajoutLudiHOMEHELPERS();
		deleteLudiHELPER();
		ajoutLudiHELPBOUTON();
	}
	
	if(obj.text=="button"&&getButtonH==false){
		getButtonH = true;
		var iCtn = CLudisGetNumber('button');
		if(iCtn==0){
			ajoutLudiBTN();
			ajoutLudiHELPER();
		}
	}
	
}

function ajoutLudiHELPER(){
	
	var pa = GetPageById(GPageId);
	if(typeof pa==="undefined"){return false;}
	
	if(pa.comicMode>0&&pa.comicMode!=4){
		deleteLudiHELPER();
		return false;
	}
	if(pa.comicMode==4){
		var iBtn = CLudisGetNumber('button');
		if(iBtn==0){
			if(haveLudiHelperBtn('button')==false){
				ajoutLudiHELPBOUTON();
			}
		}
		return false;
	}

	if(getQcmH==false){
		
		//deleteLudiHELPER();
		closePan();
		
		var iCtn = CLudisGetNumber('helper')+CLudisGetNumber('input')
		+ CLudisGetNumber('qcm')+CLudisGetNumber('bilan')
		+ CLudisGetNumber('img')+CLudisGetNumber('lcm')
		+ CLudisGetNumber('text')+CLudisGetNumber('video') + CLudisGetNumber('audio')
		+ CLudisGetNumber('tcm')+CLudisGetNumber('plugin')
		+ CLudisGetNumber('speech')+CLudisGetNumber('videomp4')
		+ CLudisGetNumber('plugme') + CLudisGetNumber('fluxPts')+ CLudisGetNumber('dom');
		
		if(iCtn==0){
			
			if(pa.index==0){
				
				ajoutLudiHELPHOME();
				
			}else{
				
				if(haveLudiHelperBtn("qcm")==false){
					
					var objTemp = LudiBase();
					objTemp.type= "helper";
					objTemp.text= "qcm";
					objTemp.text2 = getTrd("addcmq");
					objTemp.width  = 150;
					objTemp.height = 150;
					objTemp.realwidth = objTemp.width;
					objTemp.realheight = objTemp.height;
					objTemp.x = (960 - objTemp.width )/2;
					objTemp.y = (720 - objTemp.height)/2;

					if(EDITORMODE==1){
						objTemp.x = (480 - objTemp.width )/2;
						objTemp.y = (780 - objTemp.height)/2;
					}
					
					objTemp.pageId = GPageId;
					objTemp.data = "img/helper/speed-qcm.png";
					CLudisAdd(objTemp);
					
				}
				
			}
			
		}
		
		var iBtn = CLudisGetNumber('button');
		if(iBtn==0){
			if(haveLudiHelperBtn('button')==false){
				ajoutLudiHELPBOUTON();
			}
		}
		
		createRenderJSON();
		CLudisPaint();
	}
	
}

function ajoutLudiHELPHOME(){

	closePan();
	
	if(haveLudiHelperBtn("home")==false){
	
		if(getIntroH==false){
			var objTemp = LudiBase();
			objTemp.type= "helper";
			objTemp.text = "home";
			objTemp.text2 = getTrd("addintro");
			objTemp.width  = 150;
			objTemp.height = 150;
			objTemp.realwidth = objTemp.width;
			objTemp.realheight = objTemp.height;
			objTemp.x = (960 - objTemp.width )/2;
			objTemp.y = (720 - objTemp.height)/2;
			if(EDITORMODE==1){
				objTemp.x = (480 - objTemp.width )/2;
				objTemp.y = (780 - objTemp.height)/2;
			}
			objTemp.pageId = GPageId;
			objTemp.data = "img/helper/speed-home.png"
			
			CLudisAdd(objTemp);
		}
	
	}
	
}

function ajoutLudiHELPBOUTON(){
	
	if(haveLudiHelperBtn("button")==false){
		
		if(getButtonH==false){
			
			var pa = GetPageById(GPageId);
			if(typeof pa==="undefined"){return false;}
			
			var iCtn = CLudisGetNumber('button') + CLudisGetNumberWithActions('dom');
			
			if(iCtn>0){
				closePan();
				return false;
			}
			
			var objTemp = LudiBase();
			objTemp.type= "helper";
			objTemp.text= "button";
			objTemp.width  = 156;
			objTemp.height = 35;
			objTemp.realwidth = objTemp.width;
			objTemp.realheight = objTemp.height;
			
			objTemp.x = 960 - (156 + 28);
			objTemp.y = 720 - (35 + 30);
			
			if(EDITORMODE==1){
				objTemp.x = 480 - (156 + 28);
				objTemp.y = 780 - (35 + 30);
			}

			objTemp.pageId = GPageId;
			objTemp.data = "img/helper/speed-bouton.png"
			
			CLudisAdd(objTemp);
			
			CLudisPaint();
			
		}
	}
}

function deleteLudiHELPER(){
	
	//var hCtn = CLudisGetNumber('helper');
	//if(hCtn==0){return false;}
	
	//var iCtn = CLudisGetNumber('button');
	
	for (var i=0;i<CLudisCount;i++){
		if(CLudis[i].supp==0){
			if(CLudis[i].pageId==GPageId){
				if(CLudis[i].type=='helper'){
					canvas.forEachObject(function(obj){
						if (obj.id===i){
							obj.set('active',true);
							canvas.remove(obj);
						}
					});
					CLudis[i].supp = 1;
				}
			}
		}
	}
	
}

function deleteLudiHelperBtn(){
	
	for (var i=0;i<CLudisCount;i++){
		if(CLudis[i].supp==0){
			if(CLudis[i].pageId==GPageId){
				var luditype = CLudis[i].type;
				var luditext = CLudis[i].text;
				if(luditype=='helper'){
					if(luditext=="button"){
						canvas.forEachObject(function(obj){
							if (obj.id===i){
								obj.set('active',true);
								canvas.remove(obj);
							}
						});
						CLudis[i].supp = 1;
					}
				}
			}
		}
	}
	
	
}

function haveLudiHelperBtn(typeexist){
	
	var b = false;
	
	var pa = GetPageById(GPageId);
	if(typeof pa==="undefined"){return false;}
			
	for (var i=0;i<CLudisCount;i++){
		
		var pageIDAct = CLudis[i].pageId;
		
		if(CLudis[i].supp==0){
			
			if(pageIDAct==GPageId){
				var luditype = CLudis[i].type;
				var luditext = CLudis[i].text;
				if(luditype=='helper'){
					if(luditext==typeexist){
						b = true;
					}
				}
			}
		}
		
	}
	
	return b;
	
}

function ajoutLudiQCMHELPERS(){
	
	closePan();
	
	var objTempT = LudiBase();
	objTempT.type= "text";
	
	objTempT.x = 100;
	objTempT.y = 200;
	objTempT.width  = 450;
	objTempT.height = 100;
	
	objTempT.realwidth = objTempT.width;
	objTempT.realheight = objTempT.height;

	objTempT.x2 = 20;
	objTempT.y2 = 100;
	objTempT.width2  = 440;
	objTempT.height2 = 430;

	objTempT.realwidth2 = 440;
	objTempT.realheight2 = 430;

	objTempT.pageId = GPageId;
	objTempT.text = getTrd("writeqcm");
	objTempT.fontSize = 18;
	CLudisAdd(objTempT);
	
	var objTempQ = LudiBase();
	objTempQ.type= "qcm";
	objTempQ.x = objTempT.x-5;
	objTempQ.y = objTempT.y + objTempT.height + 10;
	objTempQ.width  = 453;
	objTempQ.height = 210;
	objTempQ.realwidth = objTempQ.width;
	objTempQ.realheight = objTempQ.height;
	objTempQ.pageId = GPageId;
	objTempQ.text  = getTrd("reply") + " 1";
	objTempQ.text2 = getTrd("reply") + " 2";
	objTempQ.text3 = getTrd("reply") + " 3";
	objTempQ.val  = 1;
	objTempQ.note = 1;
	objTempQ.remarque = "";
	objTempQ.data = "";
	objTempQ.fontSize = 20;
	CLudisAdd(objTempQ);
	
	var objTempI = LudiBase();
	objTempI.type= "img";
	objTempI.x = objTempT.x + 465;
	objTempI.y = objTempT.y;
	objTempI.width  = 300;
	objTempI.height = 300;
	objTempI.realwidth = 400;
	objTempI.realheight = 400;
	objTempI.pageId = GPageId;
	objTempI.data = "assets/questionmark0" + helperQcmCount + ".png"

	if(helperQcmCount<3){
		helperQcmCount++;
	}

	CLudisAdd(objTempI);

	CLudisPaint();
	
	createRenderJSON();

}

function ajoutLudiHOMEHELPERS(){
	
	closePan();
	
	var objTempT = LudiBase();
	objTempT.type= "text";
	objTempT.x = 160;
	objTempT.y = 200;
	objTempT.width  = 350;
	objTempT.height = 350;

	objTempT.realwidth = 350;
	objTempT.realheight = 350;

	objTempT.x2 = 20;
	objTempT.y2 = 100;
	objTempT.width2  = 440;
	objTempT.height2 = 430;

	objTempT.realwidth2 = 440;
	objTempT.realheight2 = 430;

	objTempT.pageId = GPageId;
	
	objTempT.text = getTrd("sampletext");
	
	objTempT.fontSize = 18;
	CLudisAdd(objTempT);
	

	var objTempI = LudiBase();
	objTempI.type= "img";

	objTempI.x = objTempT.x + 360;
	objTempI.y = objTempT.y + 20;
	objTempI.width  = 300;
	objTempI.height = 300;

	objTempI.realwidth = 400;
	objTempI.realheight = 400;

	objTempI.x2 = 30;
	objTempI.y2 = 560;
	objTempI.width2  = 190;
	objTempI.height2 = 190;

	objTempI.pageId = GPageId;
	objTempI.data = "assets/listecheckhome.png"
	CLudisAdd(objTempI);
	
	closePan();
	
	CLudisPaint();
	
	createRenderJSON();
	
	deleteLudiHELPER();
	
}
