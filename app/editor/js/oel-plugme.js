
//Objets CPlug
function CPlug(){
	
	this.id;
	this.name;
	this.category;
	this.type;
	this.img;
	this.width;
	this.height;
	this.screenImage;
	this.screenTextMapping;
	this.embeddedFiles;
	this.defaultText;
	
	this.conditionalObject;
	this.haveScore;

	this.createByPlug = function(){
		
	}
	
}

var CPlugs = new Array();
var CPlugsCount = 0;

function CPlugAdd(Elem){

	Elem.id = CPlugsCount;
	CPlugs.push(Elem);
	CPlugsCount = CPlugsCount + 1;
	
}

function getCPlugById(name){
	
	for (var i = 0; i < CPlugsCount; i++){
		if(CPlugs[i].name==name){
			return CPlugs[i];
		}
	}

}

function getLastPlugMe(){
	
	if(CPlugsCount>0){
		return CPlugs[CPlugsCount-1];
	}else{
		var tempBloc = new CPlug();
		tempBloc.name = "";
		tempBloc.category = "";
		return tempBloc;
	}
	
}

function openPlug(data,dirp){
	
	var xml_p;
	
	if (typeof data == "string") {
		xml_p = plugToX(data);
	}else{
		xml_p = data;
	}
	
	var tempBloc = new CPlug();
	
	$(xml_p).find('properties').each(function(){
		tempBloc.type = plugToT($(this).find('type').text());
		tempBloc.name = plugToT($(this).find('id').text());
		tempBloc.category = plugToT($(this).find('category').text());		  
	});
	
	$(xml_p).find('display').each(function(){
		if(plugToT($(this).find('screenImage').text())!=''){
			tempBloc.screenImage = dirp + plugToT($(this).find('screenImage').text());
		}
		tempBloc.width = parseInt(plugToT($(this).find('width').text()));
		tempBloc.height = parseInt(plugToT($(this).find('height').text()));		
	});
	
	tempBloc.embeddedFiles = '';
	$(xml_p).find('embeddedFiles').each(function(){
		$(xml_p).find('file').each(function(){
			var filn = plugToT($(this).text());
			if(filn!=''){
				var fi = tempBloc.name + '/resources/' + filn;
				tempBloc.embeddedFiles += fi+ ";";
			}
		});
	});
	
	tempBloc.defaultText = '';
	$(xml_p).find('defaultText').each(function(){
		tempBloc.defaultText = $(this).text();
	});
	
	tempBloc.screenTextMapping = '';
	$(xml_p).find('screenTextMapping').each(function(){
		tempBloc.screenTextMapping = $(this).html();
	});

	$(xml_p).find('options').each(function(){
		tempBloc.conditionalObject = plugToT($(this).find('conditionalObject').text());
		tempBloc.haveScore = plugToT($(this).find('haveScore').text());
	});
	
	if(plugToT(tempBloc.name)!=''){
		CPlugAdd(tempBloc);
	}

}

function parseIntegerNZ(str) {
	
	if(typeof(str)=='undefined'){str=10;}
	
	if(str==null){str = 10;}
	
	if(str==''){str=10;}
	
	if(str==0){str=10;}
	
	return parseInt(str);
}

function addPlugProcess(name){
	
	var objPlug = getCPlugById(name);
	
	if(typeof(objPlug)=='undefined'){
		alert('Error plugin data !');
		return false;
	}
	closePan();
	
	var objTemp = LudiBase();
	objTemp.type= "plugme";
	var wi = parseIntegerNZ(objPlug.width);
	objTemp.x = parseIntegerNZ(960 - wi)/2;
	objTemp.y = 200;
	objTemp.width = parseIntegerNZ(objPlug.width);
	objTemp.height = parseIntegerNZ(objPlug.height);
	objTemp.realwidth = parseIntegerNZ(objTemp.width);
	objTemp.realheight = parseIntegerNZ(objTemp.height);
	objTemp.pageId = GPageId;
	objTemp.data = objPlug.screenImage;
	
	objTemp.text = objPlug.defaultText;
	objTemp.text2 = '';
	objTemp.text3 = '';
	objTemp.text4 = '';
	
	if(objPlug.conditionalObject=='1'){
		objTemp.text4 += 'conditionalObject;';
	}
	if(objPlug.haveScore=='1'){
		objTemp.text4 += 'haveScore;';
	}

	objTemp.val = name;
	objTemp.val2 = objPlug.embeddedFiles;
	objTemp.val3 = objPlug.screenTextMapping;
	
	CLudisAdd(objTemp);
	
	var res = objTemp.val2.split(";");
	
	for(var i=0;i<res.length;i++){
		var ress = res[i];
		if(ress!=''){
			if(ress.indexOf('.jpg')!=-1
			||ress.indexOf('.png')!=-1
			||ress.indexOf('.gif')!=-1){
				var dirp = folderAllPlugins;
				dirp = dirp.replace(/\\/g, "/");
				copyFileProcess(dirp + ress);
			}
			if(ress.indexOf('.js')!=-1
			||ress.indexOf('.css')!=-1){
				var dirp = folderAllPlugins;
				dirp = dirp.replace(/\\/g, "/");
				copyFileProcess(dirp + ress);
			}
		}
	}
	
	CLudisPaint();
	eventObjects = true;
	createRenderJSON();
	deleteLudiHELPER();
	
	
}

function copyFileProcess(filenam){

	const electron = require('electron');
	const ipc = electron.ipcRenderer;
	ipc.send('message',{key:'copyFileProcess',filenam:filenam});
	
}

function plugToX(t){
	
	if(window.ActiveXObject){
		var doc=new ActiveXObject('Microsoft.XMLDOM');
		doc.async='false';
		doc.loadXML(t);
	}else{
		var parser=new DOMParser();
		var doc=parser.parseFromString(t,'text/xml');
	}
	return doc;
	
}

function plugToT(s){
	
	if (s == 'undefined'){return "";}
	if (typeof(s) == 'undefined'){return "";}else{return s;}
	
}