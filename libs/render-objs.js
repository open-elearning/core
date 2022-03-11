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
		fxml += "<x2>" + ob.x2 + "</x2>";
		fxml += "<y2>" + ob.y2 + "</y2>";
		fxml += "<w2>" + ob.w2 + "</w2>";
		fxml += "<h2>" + ob.h2 + "</h2>";
		fxml += "<text></text>";
		fxml += "<align>LeftCenter</align>";
		fxml += "<fontsize>14</fontsize>";
		fxml += "<color><![CDATA[white]]></color>";
		fxml += "<page>" + p + "</page>";
		fxml += "<ind>1</ind>";
		fxml += "<an>1</an>";
		fxml += "<css>background-color:" + ob.val + ";</css>";
		fxml += "</bloc>";

		fxml += '<bloc>';
		fxml += '<type>text</type>';
		fxml += '<id></id>';
		fxml += "<x>" + (ob.x + 10) + "</x>";
		fxml += "<y>" + (ob.y + 5) + "</y>";
		fxml += "<w>" + (ob.w - 20) + "</w>";
		fxml += "<h>" + (ob.h - 10) + "</h>";
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
	
	return fxml;
	
}
exports.renderBarre = renderBarre;

function renderVariable(ob,p){

	var fxml = '';
	if(ob.type=='variable'){

		var namvar = rJtext(ob.text);
		var minv = parseInteger(ob.text2);
		var maxv = parseInteger(ob.text3);
		fxml += '<scriptloop><data>';
		fxml += '<![CDATA[';
		
		fxml += "if(" + namvar + "==\"-\"){";
		fxml += namvar + ' = Math.floor(Math.random()*(';
		fxml += maxv + '-' + minv + '+1)+' + minv + ')';
		fxml += '}';
		fxml += "processVarsIntoTexte(\"" + namvar + "\"," + namvar + ");";
		fxml += ']]>';
		fxml += '</data></scriptloop>';
	}
	return fxml;
}
exports.renderVariable = renderVariable;

function renderInput(ob,p){
	
	var fxml = '';
	
	if(ob.type=='input'){

		fxml += '<bloc>';
		fxml += '<type>input</type>';
		fxml += '<id></id>';
		fxml += "<x>" + ob.x + "</x><y>" + ob.y + "</y>";
		fxml += "<w>" + ob.w + "</w><h>" + ob.h + "</h>";

		fxml += "<x2>" + ob.x2 + "</x2><y2>" + ob.y2 + "</y2>";
		fxml += "<w2>" + ob.w2 + "</w2><h2>" + ob.h2 + "</h2>";

		fxml += "<text><![CDATA[" + ob.text + "]]></text>";
		fxml += "<align>LeftTop</align>";
		fxml += "<fontsize>18</fontsize>";
		fxml += "<color>Black</color>";
		fxml += "<page>" + p + "</page>";
		
		fxml += '<note>' + ob.note + '</note>';
		fxml += '<remarque><![CDATA[' + rJtext(ob.remarque) + ']]></remarque>';
		fxml += "<negnote>0</negnote>";

		fxml += "<remarque></remarque>";
		fxml += "<contenu5></contenu5>";
		fxml += "<ind>1</ind>";
		fxml += "<css>border:solid 2px Gray;background-color:White;</css>";
		fxml += "</bloc>";
	}
	
	return fxml;
	
}
exports.renderInput = renderInput;

function renderDom(ob,p){

	var fxml = '';

	if(ob.type=='dom'){
		fxml += '<bloc>';
		fxml += '<type>texthtml</type>';
		fxml += '<id></id>';
		fxml += "<x>" + ob.x + "</x><y>" + ob.y + "</y>";
		fxml += "<w>" + ob.w + "</w><h>" + ob.h + "</h>";
		
		fxml += "<x2>" + ob.x2 + "</x2><y2>" + ob.y2 + "</y2>";
		fxml += "<w2>" + ob.w2 + "</w2><h2>" + ob.h2 + "</h2>";

		if(ob.fontSize){
			fxml += "<fontsize>" + rJtext(ob.fontSize) + "</fontsize>";
		}else{
			fxml += "<fontsize>18</fontsize>";
		}

		var actJs = calculActionJs(ob,p);

		fxml += '<text><![CDATA[<div ' + actJs;
		fxml += 'style="position:absolute;top:50%;margin-top:-15px;';
		fxml += 'line-height:30px;height:30px;left:0%;right:0%;" ';
		fxml += ' >';
		fxml += rJtext(ob.text);
		fxml += '</div>]]></text>';
		fxml += "<align>center</align>";

		fxml += "<color><![CDATA[black]]></color>";
		
		if(ob.anim){
			fxml += "<an>" + rJtext(ob.anim) + "</an><de>0</de>";
		}
		fxml += "<page>" + p + "</page>";

		var cssExtra = rJtext(ob.text6);
		cssExtra = cssExtra.replace(/(\r\n|\n|\r)/gm,"");
		
		fxml += "<css><![CDATA[" + cssExtra + "]]></css>";
		fxml += "<ind>2</ind>";
		fxml += "</bloc>";
	}
	
	if(ob.type=='label'){
		fxml += '<bloc>';
		fxml += '<type>texthtml</type>';
		fxml += '<id></id>';

		fxml += "<x>" + ob.x + "</x><y>" + ob.y + "</y>";
		fxml += "<w>" + ob.w + "</w><h>" + ob.h + "</h>";
		
		fxml += "<x2>" + ob.x2 + "</x2><y2>" + ob.y2 + "</y2>";
		fxml += "<w2>" + ob.w2 + "</w2><h2>" + ob.h2 + "</h2>";

		if(ob.fontSize){
			fxml += "<fontsize>" + rJtext(ob.fontSize) + "</fontsize>";
		}else{
			fxml += "<fontsize>18</fontsize>";
		}

		fxml += '<text><![CDATA[<div ';
		fxml += 'style="position:absolute;top:50%;margin-top:-15px;';
		fxml += 'line-height:30px;height:30px;left:0%;right:0%;" ';
		fxml += ' >';
		fxml += rJtext(ob.text);
		fxml += '</div>]]></text>';
		fxml += "<align>center</align>";

		fxml += "<color><![CDATA[black]]></color>";
		
		if(ob.anim){
			fxml += "<an>" + rJtext(ob.anim) + "</an><de>0</de>";
		}
		fxml += "<page>" + p + "</page>";

		fxml += "<css><![CDATA[border:solid 1px black;border-radius:5px;text-align:center;]]></css>";
		fxml += "<ind>2</ind>";
		fxml += "</bloc>";
	}
	return fxml;

}
exports.renderDom = renderDom;

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

		fxml += "<x2>" + ob.x2 + "</x2><y2>" + ob.y2 + "</y2>";
		fxml += "<w2>" + ob.w2 + "</w2><h2>" + ob.h2 + "</h2>";

		var txtEdit = strReplace("data-ref=","href=",ob.text);
		fxml += '<tx><![CDATA[' + rJtext(txtEdit) +']]></tx>';

		fxml += "<align>LeftTop</align>";
		if(ob.fontSize){
			fxml += "<fontsize>" + rJtext(ob.fontSize) + "</fontsize>";
		}else{
			fxml += "<fontsize>18</fontsize>";
		}
		if(ob.val==''||ob.val==0){
			fxml += "<color><![CDATA[black]]></color>";
		}
		if(ob.val=='1'||ob.val==1){
			fxml += "<color><![CDATA[white]]></color>";
		}
		if(ob.anim){
			fxml += "<an>" + rJtext(ob.anim) + "</an><de>0</de>";
		}
		
		fxml += "<css><![CDATA[" + rJtext(ob.css) + "]]></css>"
		fxml += "<page>" + p + "</page>";
		fxml += "<ind>2</ind>";
		fxml += "</bloc>";
	}
	
	if(ob.type=='title'){
		fxml += '<bloc>';
		fxml += '<type>text</type>';
		fxml += '<id></id>';
		fxml += "<x>" + ob.x + "</x><y>" + ob.y + "</y>";
		fxml += "<w>" + ob.w + "</w><h>" + ob.h + "</h>";

		fxml += "<x2>" + ob.x2 + "</x2><y2>" + ob.y2 + "</y2>";
		fxml += "<w2>" + ob.w2 + "</w2><h2>" + ob.h2 + "</h2>";

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

function renderQcm(ob,p,typePage){
	
	var fxml = '';
	
	if(ob.type=='qcm'){
	
		fxml += '<bloc>';
		fxml += '<type>qcm</type>';
		fxml += '<theme>barre</theme>';
		fxml += "<fontsize>18</fontsize>";
		
		fxml += '<note>' + ob.note + '</note>';
		fxml += '<remarque><![CDATA[' + rJtext(ob.remarque) + ']]></remarque>';
		fxml += '<negnote>0</negnote>';

		fxml += '<id></id><ids></ids>';
		fxml += "<x>" + ob.x + "</x>";
		fxml += "<y>" + ob.y + "</y>";
		fxml += "<w>" + ob.w + "</w>";
		
		fxml += "<x2>" + ob.x2 + "</x2><y2>" + ob.y2 + "</y2>";
		fxml += "<w2>" + ob.w2 + "</w2>";

		var calculH = parseInt(ob.h);
		
		var nbelement = 2;
		
		var src = '';
		if(ob.val==1){
			src += '*' + rJtextCmq(ob.text);
		}else{
			src += rJtextCmq(ob.text);
		}
		
		if(ob.val2==1){
			src += ';*' + rJtextCmq(ob.text2);
		}else{
			src += ';' + rJtextCmq(ob.text2);
		}

		if(ob.text3){
			if(ob.text3!=''){
				if(ob.val3==1){
					src += ';*' + rJtextCmq(ob.text3);
				}else{
					src += ';' + rJtextCmq(ob.text3);
				}
				nbelement++;
			}
		}
		if(ob.text4){
			if(ob.text4!=''){
				if(ob.val4==1){
					src += ';*' + rJtextCmq(ob.text4);
				}else{
					src += ';' + rJtextCmq(ob.text4);
				}
				nbelement++;
			}
		}
		if(ob.text5){
			if(ob.text5!=''){
				if(ob.val5==1){
					src += ';*' + rJtextCmq(ob.text5);
				}else{
					src += ';' + rJtextCmq(ob.text5);
				}
				nbelement++;
			}
		}
		if(ob.text6){
			if(ob.text6!=''){
				if(ob.val6==1){
					src += ';*' + rJtextCmq(ob.text6);
				}else{
					src += ';' + rJtextCmq(ob.text6);
				}
				nbelement++;
			}
		}
		if(ob.text7){
			if(ob.text7!=''){
				if(ob.val7==1){
					src += ';*' + rJtextCmq(ob.text7);
				}else{
					src += ';' + rJtextCmq(ob.text7);
				}
				nbelement++;
			}
		}
		if(ob.text8){
			if(ob.text8!=''){
				if(ob.val8==1){
					src += ';*' + rJtextCmq(ob.text8);
				}else{
					src += ';' + rJtextCmq(ob.text8);
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
		
		if(typePage==0){
			fxml += "<ind>2</ind>";
		}else{
			fxml += "<ind>4</ind>";
		}
		
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
		fxml += "<x>" + ob.x + "</x><y>" + ob.y + "</y>";
		fxml += "<w>" + ob.w + "</w><h>" + ob.h + "</h>";

		fxml += "<x2>" + ob.x2 + "</x2><y2>" + ob.y2 + "</y2>";
		fxml += "<w2>" + ob.w2 + "</w2><h2>" + ob.h2 + "</h2>";

		fxml += '<tx></tx>';
		fxml += '<tx7></tx7>'
		fxml += "<align>LeftCenter</align>";

		var filename = ob.text6.replace(/^.*[\\\/]/,'');
		filename = filename.replace(' ','');
		filename = filename.replace(' ','');

		if(filename.indexOf('.jpg')==-1&&filename.indexOf('.gif')==-1&&filename.indexOf('.png')==-1&&filename.indexOf('.svg')==-1){
			filename = filename + '.jpg';
		}
		
		fxml += "<src><![CDATA[images/" + filename + " ]]></src>";
		
		fxml += calculActionObj(ob,p);

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

function renderOverLaw(typePage,p){
	
	var fxml = '';
	
	fxml += '<bloc>';
	fxml += '<type>img</type>';
	fxml += '<id></id>';

	fxml += '<ids>' + 'a01' + '</ids>';

	fxml += "<x>-1</x>";
	fxml += "<y>-1</y>";
	fxml += "<w>962</w>";
	fxml += "<h>722</h>";

	fxml += "<x2>-1</x2>";
	fxml += "<y2>-1</y2>";
	fxml += "<w2>962</w2>";
	fxml += "<h2>722</h2>";

	fxml += '<tx></tx>';
	fxml += "<align>LeftCenter</align>";
	let filename = "comic-0" + typePage + ".png";
	fxml += "<src><![CDATA[images/" + filename + " ]]></src>";
	fxml += "<an>0</an><de>0</de>";
	fxml += "<fontsize>20</fontsize>";
	fxml += "<color><![CDATA[black]]></color>";
	fxml += "<page>" + p + "</page>";
	fxml += "<ind>3</ind>";
	fxml += "</bloc>";

	
	return fxml;
	
}
exports.renderOverLaw = renderOverLaw;

function renderButton(ob,p,typePage){
	
	var fxml = '';
	
	if(ob.type=='button'||ob.type=='buttonarea'||ob.type=='gamezoneaction'){
		
		fxml += '<bloc>';
		
		var tb = parseInt(ob.text6);
		
		if(ob.type=='gamezoneaction'){
			fxml += '<type>gamezoneaction</type>';
			tb = 6;
		}else{
			if(ob.type=='buttonarea'){
				fxml += '<type>buttonarea</type>';
				tb = 6;
			}else{
				if(tb==4||tb==5){
					fxml += '<type>btncirculaire</type>';
				}else{
					fxml += '<type>button</type>';
				}
			}
		}
		fxml += '<id></id>';
		fxml += "<x>" + pInt(pInt(ob.x)+3) + "</x>";
		fxml += "<y>" + pInt(pInt(ob.y)+3) + "</y>";
		fxml += "<w>" + pInt(pInt(ob.w)-6) + "</w>";
		fxml += "<h>" + pInt(pInt(ob.h)-6) + "</h>";
		
		fxml += "<x2>" + pInt(pInt(ob.x2)+3) + "</x2>";
		fxml += "<y2>" + pInt(pInt(ob.y2)+3) + "</y2>";
		fxml += "<w2>" + pInt(pInt(ob.w2)-6) + "</w2>";
		fxml += "<h2>" + pInt(pInt(ob.h2)-6) + "</h2>";

		if(ob.type=='gamezoneaction'){
			fxml += "<tx><![CDATA[data/zone-blue.png]]></tx>";
		}else{
			if(tb==4||tb==5||tb==6){
				if(tb==4){
					fxml += "<tx><![CDATA[next]]></tx>";
				}
				if(tb==5){
					fxml += "<tx><![CDATA[prev]]></tx>";
				}
				if(tb==6){
					fxml += "<tx><![CDATA[(invisible)]]></tx>";
				}
			}else{
				fxml += "<tx><![CDATA[" + rJtext(ob.text) + "]]></tx>";
			}
		}
		
		if(tb==2){
			fxml += "<boite>css3modernblue</boite>";
			fxml += "<color>white</color>";
		}else{
			if(tb==3){
				fxml += "<boite>css3modernorange</boite>";
				fxml += "<color>DarkRed</color>";
			}else{
				if(tb==4){
					fxml += "<boite>gray</boite>";
				}else{
					fxml += "<boite>neoCssGray</boite>";
					fxml += "<color>#808080</color>";
				}
			}
		}
		
		fxml += "<contenu5>1</contenu5>";
		
		fxml += calculActionObj(ob,p);
		
		fxml += "<an>" + pInt(ob.anim) + "</an><de>0</de>";
		
		fxml += "<fontsize>15</fontsize>";
		
		fxml += "<page>" + p + "</page>";
		
		if (ob.type=='gamezoneaction') {
			fxml += "<ind>1</ind>";
		} else {
			if(typePage==0){
				fxml += "<ind>2</ind>";
			}else{
				fxml += "<ind>4</ind>";
			}
		}
		
		fxml += "</bloc>";
	
	}
	
	return fxml;
	
}
exports.renderButton = renderButton;

function calculActionObj(ob,p){
	
	var fxml = "";

	if(ob.actionVal=="DS"){
		fxml += "<url>data/page" + pInt(pInt(p)+1) + ".xml</url>";
		fxml += "<data></data>";
	}
	if(ob.actionVal=="DP"&&p>0){
		fxml += "<url>data/page" +  pInt(pInt(p)-1) + ".xml</url>";
		fxml += "<data></data>";
	}
	if(ob.actionVal=="DC"){
		fxml += "<url>openCorrectSimple(" + pInt(pInt(p)+1) + ");</url>";
		fxml += "<data></data>";
	}
	if(ob.actionVal=="DK"){
		fxml += "<url>data/page" + pInt(pInt(p)+1) + ".xml</url>";
		fxml += "<data>isok</data>";
	}
	if(ob.actionVal=="GO"){
		fxml += "<url>data/page" + pInt(ob.actionData) + ".xml</url>";
		fxml += "<data></data>";
	}
	if(ob.actionVal=="AP"){
		fxml += "<st>";
		fxml += "<![CDATA[onMouseDown=\"" + rJtextScript(ob.actionData) + "\"]]>";
		fxml += "</st>";
		fxml += "<data></data>";
	}
	if(ob.actionVal=="AI"){
		var filename = ob.actionData.replace(/^.*[\\\/]/,'');
		filename = strReplace(' ','',filename);
		fxml += "<url><![CDATA[";
		fxml += "disImgToScr(0,\"" + filename + "\",\"black\");";
		fxml += "]]></url>";
		fxml += "<data></data>";
	}

	return fxml;

}
exports.calculActionObj = calculActionObj;

function calculActionJs(ob,p){

	var actJs = "";
	if(ob.actionVal=="DS"){
		actJs = ' onClick="LUDI.nextPage()" ';
	}
	if(ob.actionVal=="DP"&&p>0){
		actJs = ' onClick="LUDI.prevPage()" ';
	}
	if(ob.actionVal=="DK"){
		actJs = ' onClick="LUDI.nextPageIsOK()" ';
	}
	if(ob.actionVal=="GO"){
		actJs = ' onClick="LUDI.goPage(' + pInt(ob.actionData) + ')" ';
	}
	if(ob.actionVal=="AP"){
		var scriptVal = rJtextScript(ob.actionData);
		actJs = ' onClick="' + scriptVal + '" ';
	}
	if(ob.actionVal=="AI"){
		var filename = ob.actionData.replace(/^.*[\\\/]/,'');
		filename = strReplace(' ','',filename);
		actJs += ' onClick=\""disImgToScr(0,\'' + filename + '\',\'black\';\"" ';
	}

	return actJs;

}
exports.calculActionJs = calculActionJs;

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

		fxml += "<x2>" + parseInt(ob.x2) + "</x2>";
		fxml += "<y2>" + parseInt(ob.y2) + "</y2>";
		fxml += "<w2>" + parseInt(ob.w2) + "</w2>";
		fxml += "<h2>" + parseInt(ob.h2) + "</h2>";

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
		fxml += '<type>videohtml</type>';
		fxml += '<id></id><an>1</an><border>0</border>';
		
		//Fullscreen
		if(parseInt(ob.val)==1){

			fxml += "<x>-1</x><y>-1</y>";
			fxml += "<w>962</w><h>722</h>";

			fxml += "<x2>-1</x2><y2>-1</y2>";
			fxml += "<w2>482</w2><h2>782</h2>";

			fxml += "<contenu5><![CDATA["+back+"]]></contenu5>";
			
		}else{

			fxml += "<x>" + parseInt(ob.x) + "</x>";
			fxml += "<y>" + parseInt(ob.y) + "</y>";
			fxml += "<w>" + parseInt(ob.w) + "</w>";
			fxml += "<h>" + parseInt(ob.h) + "</h>";

			fxml += "<x2>" + parseInt(ob.x2) + "</x2>";
			fxml += "<y2>" + parseInt(ob.y2) + "</y2>";
			fxml += "<w2>" + parseInt(ob.w2) + "</w2>";
			fxml += "<h2>" + parseInt(ob.h2) + "</h2>";

		}
		
		fxml += "<text><![CDATA[data/" + rJtext(ob.text) + "]]></text>";
		fxml += '<data></data><contenu3>0</contenu3><contenu4>0</contenu4>';
		
		//AutoPlay
		if(parseInt(ob.val3)==1){
			fxml += '<o>1</o>';
		}else{
			fxml += '<o>0</o>';
		}
		
		fxml += '<o2>1</o2>';
		
	
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

function renderAudioMp3(ob,p){

	var fxml = '';
	
	if(ob.type=='audio'){
		
		fxml += '<bloc>';
		fxml += '<type>audiocircle</type>';
		fxml += '<id></id><an>1</an><border>0</border>';

		fxml += "<x>" + parseInt(ob.x) + "</x>";
		fxml += "<y>" + parseInt(ob.y) + "</y>";
		fxml += "<w>" + parseInt(ob.w) + "</w>";
		fxml += "<h>" + parseInt(ob.h) + "</h>";

		fxml += "<x2>" + parseInt(ob.x2) + "</x2>";
		fxml += "<y2>" + parseInt(ob.y2) + "</y2>";
		fxml += "<w2>" + parseInt(ob.w2) + "</w2>";
		fxml += "<h2>" + parseInt(ob.h2) + "</h2>";

		fxml += "<text><![CDATA[data/" + rJtext(ob.text) + "]]></text>";
		fxml += '<data></data><contenu3>0</contenu3><contenu4>0</contenu4>';
		
		//AutoPlay
		if(parseInt(ob.val3)==1){
			fxml += '<o>1</o>';
		}else{
			fxml += '<o>0</o>';
		}
		
		fxml += '<o2>0</o2>';
		
		fxml += "<align>LeftTop</align>";
		fxml += "<fontsize>5</fontsize>";
		fxml += "<color>black</color>";
		fxml += "<page>" + p + "</page>";
		fxml += "<ind>2</ind>";
		fxml += "</bloc>";
		
	}
	
	return fxml;
	
}
exports.renderAudioMp3 = renderAudioMp3;

function renderLcm(ob,p,typePage){
	
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
		
		if(fxml==''){
			ob.type=='text'
			ob.text = "ERROR";
			fxml = renderText(ob,p);
		}

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
		
		var ntb =  (ob.note/n);
		
		fxml = strReplaceX('<note>0</note>','<note>' + ntb + '</note>',fxml);

		fxml =  strReplaceZ("<page>2</page>","<page>" + p + "</page>",fxml);
		
	}
	
	return fxml;
	
}
exports.renderLcm = renderLcm;

function renderTcm(ob,p,typePage){
	
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
		
		fxml += "<x2>" + parseInt(ob.x2) + "</x2>";
		fxml += "<y2>" + parseInt(ob.y2) + "</y2>";
		fxml += "<w2>" + parseInt(ob.w2) + "</w2>";
		fxml += "<h2>" + parseInt(ob.h2) + "</h2>";

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
		
		fxml += '<note>' + ob.note + '</note>';
		fxml += '<remarque><![CDATA[' + rJtext(ob.remarque) + ']]></remarque>';
		fxml += '<negnote>0</negnote>';

		if(typePage==0){
			fxml += "<ind>2</ind>";
		}else{
			fxml += "<ind>4</ind>";
		}
		
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
		
		fxml = global.sharedFiles.allData[subtyp]
		if(typeof fxml === "undefined") {
			fxml = '';
		}
		if(typeof fxml !== 'string'){
			fxml = fxml.toString('utf8');
		}
		console.log('OBJECT:' + subtyp);
		


		fxml = strReplaceX(">posx<",'>'+ob.x+'<',fxml);
		fxml = strReplaceX(">posy<",'>'+ob.y+'<',fxml);
		
		var field1 = ob.text;
		if(subtyp=="lependu"){
			field1 = field1.toUpperCase();
		}
		
		fxml = strReplaceX("valfield1",field1, fxml);
		
		fxml = strReplaceX("valfield2",ob.text2, fxml);
		fxml = strReplaceX("<page>2</page>","<page>" + p + "</page>",fxml);
		
	}
	
	return fxml;
	
}
exports.renderLife = renderLife;

function renderPlugMe(ob,p,typePage){
	
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
		
		var opts = rJtext(ob.text4);

		if(opts.indexOf("conditionalObject")!=-1&&opts.indexOf("haveScore")!=-1){
			fxml = strReplaceX('plugin-','plugques-',fxml);
			fxml = strReplaceX('<contenu6>False</contenu6>','<contenu6>True</contenu6>',fxml);
		}
		
		fxml = strReplaceX(">posx<",'>'+ ob.x +'<',fxml);
		fxml = strReplaceX(">posy<",'>'+ ob.y +'<',fxml);
		fxml = strReplaceX(">posw<",'>'+ ob.w +'<',fxml);
		fxml = strReplaceX(">posh<",'>'+ ob.h +'<',fxml);
		
		fxml = strReplaceX("valfield1",ob.text ,fxml);
		fxml = strReplaceX("valfield2",rJtext(ob.text2),fxml);
		fxml = strReplaceX("valfield3",rJtext(ob.text3),fxml);
		fxml = strReplaceX("valfield4",'',fxml);
		fxml = strReplaceX("<page>2</page>","<page>" + p + "</page>",fxml);
		
		var res = ob.val2.split(";");
		
		var easyfile =  require('./easyfile');
		
		for(var i=0;i<res.length;i++){
			var ress = res[i];
			if(ress!=''){
				if(ress.indexOf('.jpg')!=-1
				||ress.indexOf('.gif')!=-1
				||ress.indexOf('.png')!=-1
				){
					var fDirp = easyfile.getfWf("assets")+extractNameImg(ress);
					var hDirp = easyfile.getfWf("finalHtml")+'data/'+extractNameImg(ress);
					copyFileImgPlug(fDirp,hDirp);
				}
			}
		}
		
	}
	
	return fxml;
	
}
exports.renderPlugMe = renderPlugMe;

function renderFluxPts(ob,p,dataLudiFile){
	
	var fxml = '';
	
	if(ob.type=='fluxPts'&&ob.val3==0){
		
		var finalPath = "";
		
		var decx = ob.w/2;
		var decy = ob.h/2;
		
		var recTx1 = ob.x;
		var recTy1 = ob.y;
		
		var recTx2 = ob.x;
		var recTy2 = ob.y;
		
		var recTw = 30;
		var recTh = 30;
		
		//liste des CLudi
		for(var i = 0; i < dataLudiFile.length; i++){
			var objPath = dataLudiFile[i];
			if(objPath.type=='fluxPts'
			&&objPath.val3>0
			&&objPath.val==ob.val){
				
				finalPath = finalPath + parseInt(objPath.x + decx) + ";" + parseInt(objPath.y + decy) + "!";
				
				if(objPath.x<recTx1){
					recTx1 = objPath.x;
				}
				if(objPath.x>recTx2){
					recTx2 = objPath.x;
				}
				if(objPath.y<recTy1){
					recTy1 = objPath.y;
				}
				if(objPath.y>recTy2){
					recTy2 = objPath.y;
				}
				
			}
		}
		
		recTw = recTx2 - recTx1;
		recTh = recTy2 - recTy1;
		
		if(recTw<30){recTw = 30;}
		if(recTh<30){recTh = 30;}
		
		recTw = recTw + 30;
		recTh = recTh + 30;

		var svgmap =  getBaseSvg(recTw,recTh);
		
		var mapx = ob.x + decx;
		var mapy = ob.y + decy;
		
		var endx = ob.x + decx;
		var endy = ob.y + decy;
		
		for(var i = 0; i < dataLudiFile.length; i++){
			
			var objPath = dataLudiFile[i];
			
			if(objPath.type=='fluxPts'
			&&objPath.val3>0
			&&objPath.val==ob.val){
				
				endx = objPath.x + decx;
				endy = objPath.y + decy;
				
				
				var dy1 = parseInt(mapy - (recTy1 + decy));
				var dy2 = parseInt(endy - (recTy1 + decy));
				if(dy1<1){dy1 = 1;}
				if(dy2<1){dy2 = 1;}
				
				svgmap += '<line ';
				svgmap += ' x1="' + parseInt(mapx - (recTx1 + decx)) + '" ';
				svgmap += ' y1="' + dy1 + '" ';
				svgmap += ' x2="' + parseInt(endx - (recTx1 + decx)) + '" ';
				svgmap += ' y2="' + dy2 + '" ';
				svgmap += ' style="stroke:rgb(50,50,50);stroke-width:1" />';
				
				mapx = endx;
				mapy = endy;
			}
			
		}
		
		svgmap += '</svg>';
		
		var easyfile =  require('./easyfile');
		var renderMap = easyfile.getfWf("finalHtml") + 'images' + fd + 'map.svg';
		easyfile.writeText(renderMap,svgmap);
		
		//generate image svg path
		
		fxml += '<bloc>';
		fxml += '<type>img</type>';
		fxml += '<id></id>';
		fxml += '<ids>mapsvg</ids>';
		fxml += "<x>" + parseInt(recTx1 + decx) + "</x>";
		fxml += "<y>" + parseInt(recTy1 + decy) + "</y>";
		fxml += "<w>" + recTw + "</w>";
		fxml += "<h>" + recTh + "</h>";
		fxml += '<text></text><align></align>';
		fxml += "<src><![CDATA[images/map.svg]]></src>";
		fxml += "<an>1</an><de>0</de>";
		fxml += "<fontsize>20</fontsize>";
		fxml += "<color><![CDATA[black]]></color>";
		fxml += "<page>" + p + "</page>";
		fxml += "<ind>1</ind>";
		fxml += "</bloc>";
		
		
		
		fxml += '<bloc>';
		fxml += '<type>fluxitems</type>';
		fxml += '<id></id>';
		fxml += "<x>" + parseInt(ob.x + decx) + "</x><y>" + parseInt(ob.y + decy) + "</y>";
		fxml += "<contenu3><![CDATA[" + parseInt(ob.x + decx) + ";" + parseInt(ob.y + decy) + "]]></contenu3>";
		fxml += "<w>" + ob.w + "</w><h>" + ob.h + "</h>";
		fxml += '<data><![CDATA[fluxprocess.png]]></data>';
		fxml += '<text><![CDATA[fluxprocess.png]]></text>';
		fxml += "<contenu2><![CDATA[" + finalPath + "]]></contenu2>";
		fxml += "<fontsize>20</fontsize>";
		fxml += "<color><![CDATA[black]]></color>";
		if(ob.anim){
			fxml += "<an>" + rJtext(ob.anim) + "</an><de>0</de>";
		}
		fxml += "<page>" + p + "</page><align>5</align>";
		fxml += "<ind>1</ind><border>0</border>";
		fxml += "</bloc>";
		
		
		
		
		
		
		
	}

	return fxml;
	
}
exports.renderFluxPts = renderFluxPts;

function getBaseSvg(w,h){
	
	var svg = '<?xml version="1.0" encoding="utf-8"?>';
	svg += '<!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" ';
	svg += ' "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd">';
	svg += '<svg version="1.1"  xmlns="http://www.w3.org/2000/svg" ';
	svg += ' xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" ';
	svg += ' viewBox="0 0 ' + w + ' ' + h +'" ';
	svg += ' enable-background="new 0 0 ' + w + ' ' + h +'" ';
	svg += ' xml:space="preserve">';
	
	return svg;
	
}

function copyFileImgPlug(src,dest){
	
	var fs = require('fs');
	
	//If no exist
	if(!fs.existsSync(dest)){
		
		let readStream = fs.createReadStream(src);
		
		readStream.once('error', (err) => {
			console.log(err);
		});
		
		readStream.once('end', () => {
			console.log('done copying');
		});
		
		readStream.pipe(fs.createWriteStream(dest));
	
	}
	
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
					sel += '<option value="' + rJtext(th) + '" >' + th + '</option>';
				}else{
					sel = '<option value="' + rJtext(th) + '" >' + th + '</option>' + sel ;
				}
			}

		
		}
		
	}
	
	for(i=0;i<matches.length;i++){
		var th = matches[i];
		if(rJtext(th)!=""){
			
			var v1 = '<select id="tcmvfa' + rand() + rand() + '" class="reponseholetext selecttcm" ';
			v1 += ' data-rep="goodrep" >';
			v1 += "<option value=\"\" ></option>";
			v1 += sel + "</select>";

			v1 = strReplace('goodrep' , rJtext(th) , v1 );
			txtval = strReplace('[' + th + ']' , v1 , txtval);
			
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

function parseInteger(s){

	if(typeof s==="undefined"){s = 0;}

	return parseInt(s);

}

function pInt(s){

	if(typeof s==="undefined"){s = 0;}

	return parseInt(s);

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
	s = strReplace("!",'ZexclaA',s);
	s = strReplace("\\",'ZslashA',s);
	s = strReplace("/",'ZdeslashA',s);
	s = strReplace("{",'ZbrakA',s);
	s = strReplace("}",'ZdebrakA',s);
	return s;
	
}
exports.rJtext = rJtext;

function rJtextScript(s){
	
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
exports.rJtextScript = rJtextScript;

function rJtextCmq(s){
	
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
	
	s = strReplace("u00f4","ô",s);
	s = strReplace("u00e9","é",s);
	s = strReplace("u00e8","è",s);
	s = strReplace("u00e2","â",s);
	s = strReplace("u2019","'",s);
	s = strReplace("ZaposA",'"',s);
	s = strReplace("'",'&apos.,',s);
	s = strReplace("!",'ZexclaA',s);
	
	return s;
	
}
exports.rJtextCmq = rJtextCmq;

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
