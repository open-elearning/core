"use strict";

function renderBarre(ob,p){
	
	var fxml = '';
	
	if(ob.type=='barre'){
		fxml += '<bloc>';
		fxml += '<type>texthtml</type>';
		fxml += '<id></id>';
		fxml += "<x>" + ob.x + "</x>";
		fxml += "<y>" + ob.y + "</y>";
		fxml += "<w>" + ob.w + "</w>";
		fxml += "<h>" + ob.h + "</h>";
		fxml += "<text></text>";
		fxml += "<align>LeftCenter</align>";
		fxml += "<fontsize>14</fontsize>";
		fxml += "<color><![CDATA[white]]></color>";
		fxml += "<page>" + p + "</page>";
		fxml += "<ind>1</ind>";
		fxml += "<css>background-color:" + ob.val + ";</css>";
		fxml += "</bloc>";
	}
	
	return fxml;
	
}
exports.renderBarre = renderBarre;

function renderText(ob,p){
	
	var fxml = '';
	
	if(ob.type=='text'){
		fxml += '<bloc>';
		fxml += '<type>text</type>';
		fxml += '<id></id>';
		fxml += "<x>" + ob.x + "</x>";
		fxml += "<y>" + ob.y + "</y>";
		fxml += "<w>" + ob.w + "</w>";
		fxml += "<h>" + ob.h + "</h>";
		fxml += '<text><![CDATA[' + rJtext(ob.text) +']]></text>';
		fxml += "<align>LeftTop</align>";
		if(ob.fontSize){
			fxml += "<fontsize>" + ob.fontSize + "</fontsize>";
		}
		if(ob.val==''||ob.val==0){
			fxml += "<color><![CDATA[black]]></color>";
		}
		if(ob.val=='1'||ob.val==1){
			fxml += "<color><![CDATA[white]]></color>";
		}
		fxml += "<an>" + ob.anim + "</an><de>0</de>";
		fxml += "<page>" + p + "</page>";
		fxml += "<ind>2</ind>";
		fxml += "</bloc>";
	}
	
	if(ob.type=='title'){
		fxml += '<bloc>';
		fxml += '<type>text</type>';
		fxml += '<id></id>';
		fxml += "<x>" + ob.x + "</x>";
		fxml += "<y>" + ob.y + "</y>";
		fxml += "<w>" + ob.w + "</w>";
		fxml += "<h>" + ob.h + "</h>";
		fxml += '<text>';
		fxml += '<![CDATA[' + rJtext(ob.text) +']]>';
		fxml += '</text>';
		fxml += "<align>LeftCenter</align>";
		if(ob.fontSize){
			fxml += "<fontsize>" + ob.fontSize + "</fontsize>";
		}
		fxml += "<color><![CDATA[white]]></color>";
	
		fxml += "<page>" + p + "</page>";
		fxml += "<ind>2</ind>";
		fxml += "</bloc>";
	}
	
	if(ob.type=='speech'){
		
		fxml = global.sharedLibs.speech;
		
		if (typeof fxml === "undefined") {
			fxml = '';
		}
		if(typeof fxml !== 'string'){
			fxml = fxml.toString('utf8');
		}
		
		if(ob.idString!=''){
			fxml = strReplace("objIds",ob.idString,fxml);
		}else{
			fxml = strReplace("objIds",'',fxml);
		}
		
		fxml = strReplace("\n",'',fxml);
		fxml = fxml.replace(/[\n]/gi,"");
		fxml = fxml.replace(/(\r\n|\n|\r)/gm,"");
		
		fxml = strReplaceX("posx",ob.x,fxml);
		fxml = strReplaceX("posy",ob.y,fxml);
		fxml = strReplaceX("posw",ob.w,fxml);
		
		fxml = strReplaceX("txtw",parseInt(parseInt(ob.w)-30),fxml);
		
		fxml = strReplaceX("valfieldtext",rJtext(ob.text),fxml);
		fxml = strReplaceX("{typespeech}",rJtext(ob.val),fxml);
		
		fxml =  strReplaceX("<page>2</page>","<page>" + p + "</page>",fxml);
		
	}
	
	return fxml;
	
}
exports.renderText = renderText;

function renderQcm(ob,p){
	
	var fxml = '';
	
	if(ob.type=='qcm'){
	
		fxml += '<bloc>';
		fxml += '<type>qcm</type>';
		fxml += '<theme>barre</theme>';
		fxml += "<fontsize>18</fontsize>";
		fxml += '<note>1</note>';
		fxml += '<negnote>0</negnote>';
		fxml += '<remarque></remarque>';
		fxml += '<id></id><ids></ids>';
		fxml += "<x>" + ob.x + "</x>";
		fxml += "<y>" + ob.y + "</y>";
		fxml += "<w>" + ob.w + "</w>";
		
		var calculH = parseInt(ob.h);
		
		var nbelement = 2;
		
		var src = '';
		if(ob.val==1){
			src += '*' + rJtext(ob.text);
		}else{
			src += rJtext(ob.text);
		}
		
		if(ob.val2==1){
			src += ';*' + rJtext(ob.text2);
		}else{
			src += ';' + rJtext(ob.text2);
		}

		if(ob.text3){
			if(ob.text3!=''){
				if(ob.val3==1){
					src += ';*' + rJtext(ob.text3);
				}else{
					src += ';' + rJtext(ob.text3);
				}
				nbelement++;
			}
		}
		if(ob.text4){
			if(ob.text4!=''){
				if(ob.val4==1){
					src += ';*' + rJtext(ob.text4);
				}else{
					src += ';' + rJtext(ob.text4);
				}
				nbelement++;
			}
		}
		if(ob.text5){
			if(ob.text5!=''){
				if(ob.val5==1){
					src += ';*' + rJtext(ob.text5);
				}else{
					src += ';' + rJtext(ob.text5);
				}
				nbelement++;
			}
		}
		
		calculH = nbelement * 45;
		
		fxml += "<h>" + calculH + "</h>";
		fxml += "<text><![CDATA[" + src + "]]></text>";
		fxml += "<o>0</o><o2>0</o2><acl>0</acl>";
		fxml += "<boite>check</boite><an>1</an>";
		fxml += "<de>0</de><di>0</di><dedi>0</dedi>";
		fxml += "<domaine>0</domaine>";
		fxml += "<color><![CDATA[black]]></color>";
		fxml += "<page>" + p + "</page>";
		fxml += "<ind>2</ind>";
		fxml += "<contenu2>47</contenu2>";
		fxml += "<contenu3><![CDATA[]]></contenu3>";
		fxml += "<contenu4><![CDATA[33]]></contenu4>";
		fxml += "<border><![CDATA[#D8D8D8|White]]></border>";
		fxml += "<selectcolor>#BCF5A9</selectcolor>";
		fxml += "</bloc>";
		
	}
	
	return fxml;
	
}
exports.renderQcm = renderQcm;

function renderImages(ob,p){
	
	var fxml = '';
	
	if(ob.type=='img'){
		
		fxml += '<bloc>';
		fxml += '<type>img</type>';
		fxml += '<id></id>';
		if(ob.idString!=''){
			fxml += '<ids>'+ ob.idString +'</ids>';
		}
		fxml += "<x>" + ob.x + "</x>";
		fxml += "<y>" + ob.y + "</y>";
		fxml += "<w>" + ob.w + "</w>";
		fxml += "<h>" + ob.h + "</h>";
		fxml += '<text>';
		fxml += '<![CDATA[]]>';
		fxml += '</text>';
		fxml += "<align>LeftCenter</align>";
		var filename = ob.text6.replace(/^.*[\\\/]/, '');
		
		fxml += "<src><![CDATA[images/" + filename + " ]]></src>";
		
		fxml += "<an>" + ob.anim + "</an><de>0</de>";
		
		fxml += "<fontsize>20</fontsize>";
		fxml += "<color><![CDATA[black]]></color>";
		fxml += "<page>" + p + "</page>";
		fxml += "<ind>2</ind>";
		fxml += "</bloc>";
	
	}
	
	return fxml;
	
}
exports.renderImages = renderImages;

function renderButton(ob,p){
	
	var fxml = '';
	
	if(ob.type=='button'){
		
		fxml += '<bloc>';
		fxml += '<type>button</type>';
		fxml += '<id></id>';
		fxml += "<x>" + parseInt(parseInt(ob.x+3)) + "</x>";
		fxml += "<y>" + parseInt(parseInt(ob.y+3)) + "</y>";
		fxml += "<w>" + parseInt(parseInt(ob.w-6)) + "</w>";
		fxml += "<h>" + parseInt(parseInt(ob.h-6)) + "</h>";
		fxml += "<text><![CDATA[" + rJtext(ob.text) + "]]></text>";
		
		if(parseInt(ob.text6)==2){
			fxml += "<boite>css3modernblue</boite>";
			fxml += "<color>white</color>";
		}else{
			if(parseInt(ob.text6)==3){
				fxml += "<boite>css3modernorange</boite>";
				fxml += "<color>DarkRed</color>";
			}else{
				fxml += "<boite>neoCssGray</boite>";
				fxml += "<color>#808080</color>";
			}
		}
		
		fxml += "<contenu5>1</contenu5>";
		
		if(ob.data=="DS"){
			fxml += "<url>data/page" + parseInt(p+1) + ".xml</url>";
			fxml += "<data></data>";
		}
		if(ob.data=="DP"&&p>0){
			fxml += "<url>data/page" + parseInt(p-1) + ".xml</url>";
			fxml += "<data></data>";
		}
		if(ob.data=="DK"){
			fxml += "<url>data/page" + parseInt(p+1) + ".xml</url>";
			fxml += "<data>isok</data>";
		}
		if(ob.data=="GO"){
			fxml += "<url>data/page" + parseInt(ob.val) + ".xml</url>";
			fxml += "<data></data>";
		}
		if(ob.data=="AP"){
			fxml += "<st>";
			fxml += "<![CDATA[onMouseDown=\"" + rJtext(ob.text4) + "\"]]>";
			fxml += "</st>";
			fxml += "<data></data>";
		}
		
		fxml += "<an>" + ob.anim + "</an><de>0</de>";
		
		fxml += "<fontsize>15</fontsize>";
		
		fxml += "<page>" + p + "</page>";
		fxml += "<ind>2</ind>";
		fxml += "</bloc>";
	
	}
	
	return fxml;
	
}
exports.renderButton = renderButton;

function renderVideo(ob,p){
	
	var fxml = '';
	
	if(ob.type=='video'){
		
		fxml += '<bloc>';
		fxml += '<type>videodistante</type>';
		fxml += '<id></id>';
		fxml += '<an>1</an>';
		fxml += "<x>" + parseInt(ob.x) + "</x>";
		fxml += "<y>" + parseInt(ob.y) + "</y>";
		fxml += "<w>" + parseInt(ob.w) + "</w>";
		fxml += "<h>" + parseInt(ob.h) + "</h>";
		fxml += "<text><![CDATA[" + rJtext(ob.text) + "]]></text>";
		
		fxml += '<data>';
		fxml += '<![CDATA[';
		fxml += '<iframe class="genframeludiscape" width="videow" height="videoh" ';
		fxml += ' src="https://www.youtube.com/embed/'+ rJtext(ob.val) +'" ';
		fxml += ' frameborder="0" allowfullscreen></iframe>';
		fxml += ']]>';
		fxml += '</data>';
		fxml += "<align>LeftTop</align>";
		fxml += "<fontsize>5</fontsize>";
		fxml += "<color>black</color>";
		fxml += "<page>" + p + "</page>";
		fxml += "<ind>2</ind>";
		fxml += "</bloc>";
	
	}
	
	return fxml;
	
}
exports.renderVideo = renderVideo;

function renderVideoMp4(ob,p,back){
	
	var fxml = '';
	
	if(ob.type=='videomp4'){
		
		fxml += '<bloc>';
		fxml += '<type>ludiplayerhtml</type>';
		fxml += '<id></id><an>1</an><border>0</border>';
		
		//Fullscreen
		if(parseInt(ob.val)==1){
			fxml += "<x>-1</x><y>-1</y>";
			fxml += "<w>962</w><h>722</h>";
			fxml += "<contenu5><![CDATA["+back+"]]></contenu5>";
			
		}else{
			fxml += "<x>" + parseInt(ob.x) + "</x>";
			fxml += "<y>" + parseInt(ob.y) + "</y>";
			fxml += "<w>" + parseInt(ob.w) + "</w>";
			fxml += "<h>" + parseInt(ob.h) + "</h>";
		}
		
		fxml += "<text><![CDATA[data/" + rJtext(ob.text) + "]]></text>";
		fxml += '<data></data><contenu3>0</contenu3><contenu4>0</contenu4>';
		
		//AutoPlay
		if(parseInt(ob.val3)==1){
			fxml += '<o>1</o>';
		}else{
			fxml += '<o>0</o>';
		}
		
		fxml += '<o2>0</o2>';
		
		//NextPageLudiVideo
		if(parseInt(ob.val2)==1){
			fxml += '<o3>1</o3>';
		}else{
			fxml += '<o3>0</o3>';
		}
		
		fxml += "<align>LeftTop</align>";
		fxml += "<fontsize>5</fontsize>";
		fxml += "<color>black</color>";
		fxml += "<page>" + p + "</page>";
		fxml += "<ind>2</ind>";
		fxml += "</bloc>";
		
	}
	
	return fxml;
	
}
exports.renderVideoMp4 = renderVideoMp4;

function renderLcm(ob,p){
	
	var fxml = '';
	
	if(ob.type=='lcm'){
		
		var n = parseInt(ob.number);
		
		fxml = global.sharedLibs.lcm3;
		if(n<4){
			fxml = global.sharedLibs.lcm3;
		}
		if(n==4){
			fxml = global.sharedLibs.lcm4;
		}
		if(n==5){
			fxml = global.sharedLibs.lcm5;
		}
		if(n==6){
			fxml = global.sharedLibs.lcm6;
		}
		if (typeof fxml === "undefined") {
			fxml = '';
		}
		if(typeof fxml !== 'string'){
			fxml = fxml.toString('utf8');
		}
		fxml = strReplace("\n",'',fxml);
		fxml = fxml.replace(/[\n]/gi,"");
		fxml = fxml.replace(/(\r\n|\n|\r)/gm,"");
		
		//Position x et y
		fxml = strReplace(">posx+",'>'+ob.x+'+',fxml);
		fxml = strReplace(">posy+",'>'+ob.y+'+',fxml);
		//Element1
		fxml = strReplaceX('Element1',rJtext(ob.text),fxml);
		fxml = strReplaceX('Object1' ,rJtext(ob.val),fxml);
		//Element2
		fxml = strReplaceX('Element2',rJtext(ob.text2),fxml);
		fxml = strReplaceX('Object2' ,rJtext(ob.val2),fxml);
		//Element3
		fxml = strReplaceX('Element3',rJtext(ob.text3),fxml);
		fxml = strReplaceX('Object3' ,rJtext(ob.val3),fxml);
		
		if(n>3){	
			//Element4
			fxml = strReplaceX('Element4',rJtext(ob.text4),fxml);
			fxml = strReplaceX('Object4' ,rJtext(ob.val4),fxml);
		}
		if(n>4){
			//Element5
			fxml = strReplaceX('Element5',rJtext(ob.text5),fxml);
			fxml = strReplaceX('Object5' ,rJtext(ob.val5),fxml);
		}
		if(n>5){
			//Element6
			fxml = strReplaceX('Element6',rJtext(ob.text6),fxml);
			fxml = strReplaceX('Object6' ,rJtext(ob.val6),fxml);
		}
		
		fxml =  strReplaceZ("<page>2</page>","<page>" + p + "</page>",fxml);
		
	}
	
	return fxml;
	
}
exports.renderLcm = renderLcm;

function renderTcm(ob,p){
	
	var fxml = '';
	
	if(ob.type=='tcm'){
		
		fxml += '<bloc>';
		fxml += '<type>tcm</type>';
		fxml += '<id></id>';
		fxml += '<an>1</an>';
		fxml += "<x>" + parseInt(ob.x) + "</x>";
		fxml += "<y>" + parseInt(ob.y) + "</y>";
		fxml += "<w>" + parseInt(ob.w) + "</w>";
		fxml += "<h>" + parseInt(ob.h) + "</h>";
		
		var txtval = rJtext(ob.text);
		var distra = rJtext(ob.text2);
		distra = strReplace('<br>','|',distra);
		
		txtval = txtValDistracteurs(txtval,distra);
		
		fxml += "<text><![CDATA[<p style=\"line-height:150%;\" >";
		fxml += txtval;
		fxml += "</p>]]></text>";
		
		if(ob.fontSize){
			fxml += "<fontsize>" + (ob.fontSize + 2) + "</fontsize>";
		}
		fxml += "<css>text-align:left;vertical-align:top;</css>";
		fxml += "<color><![CDATA[black]]></color>";
		fxml += "<page>" + p + "</page>";
		fxml += "<ind>2</ind>";
		fxml += "</bloc>";
		
	}
	
	return fxml;
	
}
exports.renderTcm = renderTcm;

function renderLife(ob,p){
	
	var fxml = '';
	
	if(ob.type=='life'){
		
		fxml = global.sharedLibs.life;
		if(typeof fxml === "undefined") {
			fxml = '';
		}
		if(typeof fxml !== 'string'){
			fxml = fxml.toString('utf8');
		}
		fxml = strReplace("\n",'',fxml);
		fxml = fxml.replace(/[\n]/gi,"");
		fxml = fxml.replace(/(\r\n|\n|\r)/gm,"");
		
		//Position x et y
		fxml = strReplaceX(">posx<",'>'+ob.x+'<',fxml);
		fxml = strReplaceX(">posy<",'>'+ob.y+'<',fxml);
		fxml =  strReplaceX("<page>2</page>","<page>" + p + "</page>",fxml);
	}
	
	if(ob.type=='bilan'){
		
		fxml = global.sharedLibs.bilan;
		if(typeof fxml === "undefined") {
			fxml = '';
		}
		if(typeof fxml !== 'string'){
			fxml = fxml.toString('utf8');
		}
		fxml = strReplace("\n",'',fxml);
		fxml = fxml.replace(/[\n]/gi,"");
		fxml = fxml.replace(/(\r\n|\n|\r)/gm,"");
		
		//Position x et y
		fxml = strReplaceX(">posx",'>'+ob.x,fxml);
		fxml = strReplaceX(">posy",'>'+ob.y,fxml);
		fxml =  strReplaceX("<page>2</page>","<page>" + p + "</page>",fxml);
		
	}
	
	
	if(ob.type=='plugin'){
		
		console.log('type plugin');
		
		var subtyp = ob.subtype;
		
		fxml = file_get_contents('./assets/t/' + subtyp + '.xml',subtyp);
		console.log('plugin:' + fxml);
		
		fxml = strReplaceX(">posx<",'>'+ob.x+'<',fxml);
		fxml = strReplaceX(">posy<",'>'+ob.y+'<',fxml);
		fxml = strReplaceX("valfield1",ob.text , fxml);
		fxml = strReplaceX("valfield2",ob.text2, fxml);
		fxml = strReplaceX("<page>2</page>","<page>" + p + "</page>",fxml);
		
	}
	
	return fxml;
	
}
exports.renderLife = renderLife;

function renderPlugMe(ob,p){
	
	var fxml = '';
	
	if(ob.type=='plugme'){
		
		fxml = global.sharedLibs.plugin;
		if(typeof fxml === "undefined") {
			fxml = '';
		}
		if(typeof fxml !== 'string'){
			fxml = fxml.toString('utf8');
		}
		fxml = strReplace("\n",'',fxml);
		fxml = fxml.replace(/[\n]/gi,"");
		fxml = fxml.replace(/(\r\n|\n|\r)/gm,"");
		
		fxml = strReplaceX("{name}<",ob.val+'<',fxml);
		fxml = strReplaceX(">posx<",'>'+ ob.x +'<',fxml);
		fxml = strReplaceX(">posy<",'>'+ ob.y +'<',fxml);
		fxml = strReplaceX(">posw<",'>'+ ob.w +'<',fxml);
		fxml = strReplaceX(">posh<",'>'+ ob.h +'<',fxml);
		
		fxml = strReplaceX("valfield1",ob.text ,fxml);
		fxml = strReplaceX("valfield2",ob.text2,fxml);
		fxml = strReplaceX("valfield3",ob.text3,fxml);
		fxml = strReplaceX("valfield4",ob.text4,fxml);
		fxml = strReplaceX("<page>2</page>","<page>" + p + "</page>",fxml);
		
		var res = ob.val2.split(";");
		
		var easyfile =  require('./easyfile');
		
		for(var i=0;i<res.length;i++){
			var ress = res[i];
			if(ress!=''){
				var fDirp = easyfile.getfWf("assets")+extractNameImg(ress);
				var hDirp = easyfile.getfWf("finalHtml")+'data/'+extractNameImg(ress);
				copyFileImgPlug(fDirp,hDirp);
			}
		}
		
	}
	
	return fxml;
	
}
exports.renderPlugMe = renderPlugMe;

function copyFileImgPlug(src,dest){
	
	var fs = require('fs');
	
	let readStream = fs.createReadStream(src);
	
	readStream.once('error', (err) => {
		console.log(err);
	});
	
	readStream.once('end', () => {
		console.log('done copying');
	});
	
	readStream.pipe(fs.createWriteStream(dest));
	
}

function file_get_contents(path,idFile){
	
	console.log('file_get_contents:' + path);
	
	if(typeof global.sharedFiles.allData[idFile] === 'undefined') {

		var fs = require('fs');
		
		if(fs.existsSync(path)){
			
			fs.openSync(path,'r+');
			fs.readFile(path,function read(err,fxml){
				if(typeof fxml === "undefined") {
					fxml = '';
				}
				if(typeof fxml !== 'string'){
					fxml = fxml.toString('utf8');
				}
				fxml = strReplace("\n",'',fxml);
				fxml = fxml.replace(/[\n]/gi,"");
				fxml = fxml.replace(/(\r\n|\n|\r)/gm,"");
				
				console.log('readFile:' + fxml);
				
				global.sharedFiles.allData[idFile] = fxml;
				
				return fxml;
			});
			
		}else{
			console.log('file no found:' + path);
		}

	}else{
		return global.sharedFiles.allData[idFile];
	}
		
	return '';
	
}

function txtValDistracteurs(txtval,distra){
	
	var sel = '';
	var lines = distra.split("|");
	
	var b = 0;
	var i = 0;
	var j = 0;
	var h = 0;
	var k = 0;
	
	for(b=0;b<lines.length;b++) {
		var line = lines[b];
		if(rJtext(line)!=""){
			var r = rand();
			if(r<10){
				sel += '<option value="" >' + line + '</option>';
			}else{
				sel = '<option value="" >' + line + '</option>' + sel;
			}
		}
	}
	
	var matches = preg_match_all(txtval);
	
	var ms = '';
	
	for(i=0;i<matches.length;i++){
		
		var th = matches[i];
		
		if(rJtext(th)!=""){
			
			th = strReplace('[','',th);
			th = strReplace(']','',th);
			
			var pos = ms.indexOf(';' + th + ';');
			
			if(pos==-1){
				ms = ms + ';' + th + ';';
				var r = rand();
				if(r<10){
					sel += '<option value="" >' + th + '</option>';
				}else{
					sel = '<option value="" >' + th + '</option>' + sel ;
				}
			}
			
		}
		
	}
	
	var v1 = '<select id="tcmvfa106" class="reponseholetext selecttcm" ';
	v1 += ' data-rep="goodrep" >';
	v1 += "<option value=\"\" ></option>";
	v1 += sel + "</select>";
	
	for(i=0;i<matches.length;i++){
		var th = matches[i];
		if(rJtext(th)!=""){
			txtval = strReplace('[' + th + ']',v1,txtval);
		}
	}
	
	return txtval;
	
}

function preg_match_all(str){

	var  result = "";
	var ite = 0;
	var off = str.indexOf("[");
		
	while(off !=-1)
	{
		off = str.indexOf("[",ite);
		if(off!=-1)
		{
		if(ite == off)
			result += str.substring(off+1,str.indexOf("]",off))+"|";
		}
		ite++;
	}
    
	var tab = result.split("|");
	
	return tab;
	
}

function rand(){
	return Math.floor((Math.random() * 10) + 1);
}

function rJtext(s){
	
	if(typeof s==="undefined"){
		s = '';
	}
	if(typeof s==='number'){
		s = s.toString();
	}
	if(typeof s!=='number'){
		if(typeof s!=='string'){
			s = s.toString('utf8');
		}
	}
	s = strReplace(";nLUDI.",";LUDI.",s);
	s = strReplace(";n",";",s);
	s = strReplace("u00f4","ô",s);
	s = strReplace("u00e9","é",s);
	s = strReplace("u00e8","è",s);
	s = strReplace("u00e2","â",s);
	s = strReplace("u2019","'",s);
	s = strReplace("ZaposA",'"',s);
	s = strReplace("'",'&apos;',s);
	
	return s;
	
}
exports.rJtext = rJtext;

function extractNameImg(source){
	
	var nam = source.replace(/^.*[\\\/]/, '')
	
	var ext = "";
	var src = source;

	if(src.indexOf('.jpg')!=-1){
		ext = '.jpg';
	}
	if(src.indexOf('.png')!=-1){
		ext = '.png';
	}
	if(src.indexOf('.gif')!=-1){
		ext = '.gif';
	}
	
	return nam;
}

function strReplace(s1,par,str){
	
	str = str.replace(s1,par);
	
	if(str.indexOf(s1)!=-1){
		str = strReplace(s1,par,str);
	}
	
	return str;
}

function strReplaceZ(s1,par,str){
	
	str = strReplaceX(s1,par,str);
	str = strReplaceX(s1,par,str);
	str = strReplaceX(s1,par,str);
	str = strReplaceX(s1,par,str);
	str = strReplaceX(s1,par,str);
	
	str = strReplaceX(s1,par,str);
	str = strReplaceX(s1,par,str);
	str = strReplaceX(s1,par,str);
	str = strReplaceX(s1,par,str);
	str = strReplaceX(s1,par,str);

	return str;

}

function strReplaceX(s1,par,str){
	str = strReplace5(s1,par,str);
	return str;
}

function strReplace5(s1,par,str){
	str = str.replace(s1,par);
	str = str.replace(s1,par);
	str = str.replace(s1,par);
	str = str.replace(s1,par);
	str = str.replace(s1,par);
	str = str.replace(s1,par);
	return str;
}
