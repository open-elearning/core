function openelearning2017() {
this.load = function(id){};
this.gebi = function(n){
return document.getElementById(n);
};
this.gvbi = function(n) {
if(document.getElementById(n)){
var tagName = document.getElementById(n).tagName;
if(tagName=='SELECT'){
var get_id = document.getElementById(n);
var resultselect = get_id.options[get_id.selectedIndex].value;
return resultselect;
}
if(tagName=='INPUT'){
return document.getElementById(n).value;
}
if(tagName=='TEXTAREA'){
var ct = document.getElementById(n).value;
ct = ct.replace('\n','<br />');
return ct;
}
}else{
return "-"
}
};
this.real = function(txt, rep, witht) {
return txt.replace(new RegExp(rep,'g'),witht);
};
this.cthl = function(txt) {
txt = this.real(txt,'$','<br />');
txt = this.real(txt,'_','<br />');
txt = this.real(txt,'cµ','<center>');
txt = this.real(txt,'µc','</center>');
return txt;
};
this.getMenu = function(n){
h = '<div class="m'+n+' mpan" onClick="ludiCss(\''+n+'-vertical\');" >';
return h + '</div>';
};
this.extractvId = function(n){
n = this.real(n,'http://www.youtube.com/watch?v=','');
n = this.real(n,'https://www.youtube.com/watch?v=','');
n = this.real(n,'https://youtu.be/','');
n = this.real(n,'https://www.youtube.com/','');
n = this.real(n,'http://www.youtube.com/','');
n = this.real(n,'/','');
n = this.real(n,' ','');
n = this.real(n,' ','');
n = n.replace('watch?v=','');
n = n.replace('/','');
n = n.replace(' ','');
n = n.replace(' ','');
var ampersandPosition = n.indexOf('&');
if(ampersandPosition != -1) {
n = n.substring(0, ampersandPosition);
}
return n;
};
this.extractIdStr = function(s){
s = s.replace(' ','');
s = s.replace(' ','');
s = replaceAll(s,'ô','o');
s = replaceAll(s,'é','e');
s = replaceAll(s,'è','e');
s = replaceAll(s,'à','a');
s = replaceAll(s,'à','a');
s = replaceAll(s,'ç','c');
s = replaceAll(s,'ù','u');
s = replaceAll(s,'ï','i');
s = replaceAll(s,'ö','o');
s = replaceAll(s,'â','a');
return s;
};
}
var openelearning = new openelearning2017();
var globalSortable = '';
function actionsEdit(){
var p = '';
p += '<div id="actionseditzone" class="editImage pan ' + TYPEWIND + 'osBorder" >';
p += '</div>';
return p;
}
function fctInnerActionsEdit(lst,lst2){
var p = '';
if(lst.indexOf("|")==-1){
p += '<div class="actionslistehelp" >Drag actions here</div>';
}
p += '<ul id="listactions1" class="actionsliste '+globalSortable+'" >';
var actions =  lst.split('|');
var params =  lst2.split('|');
var i = 0;
for (i=0;i<actions.length;i++){
p += lineActionsEdit(actions[i],params[i]);
}
p += '</ul>';
p += '<ul id="listactions2" style="background-color:gray;" class="actionsliste '+globalSortable+'" >';
if(lst.indexOf("cod1")==-1){p += lineActionsEdit("cod1");}
if(lst.indexOf("cod2")==-1){p += lineActionsEdit("cod2");}
if(lst.indexOf("act1")==-1){p += lineActionsEdit("act1");}
if(lst.indexOf("act2")==-1){p += lineActionsEdit("act2");}
p += lineActionsEdit("act3");
p += lineActionsEdit("act4");
p += lineActionsEdit("act5");
p += lineActionsEdit("act6");
p += lineActionsEdit("act8");
p += lineActionsEdit("act7");
p += '</ul>';
p += '<div class="toolBas2" >';
p += '<a onclick="saveActionsPerso();" ';
p += ' style="margin-right:13px;margin-top:1px;" class="btnSave" >' + getTrd('save') + '</a>';
p += '</div>';
return p;
}
function lineActionsEdit(id,pa){
var p = '';
switch(id){
case "cod1":
p = '<li id="cod1" ><div class="minCondi Pos" >&nbsp;If the question objects are OK</div></li>';
break;
case "cod2":
p = '<li id="cod2" ><div class="minCondi Neg" >&nbsp;If the question objects are KO</div></li>';
break;
case "act1":
p = '<li id="act1" ><div class="minAction" >Delete life</div></li>';
break;
case "act2":
p = '<li id="act2" ><div class="minAction" >Add life</div></li>';
break;
case "act3":
p = '<li id="act3" ><div class="minAction" >Next page</div></li>';
break;
case "act4":
p = '<li id="act4" ><div class="minAction" >Next page + 1</div></li>';
break;
case "act5":
p = '<li id="act5" ><div class="minAction" >Pause 2 sec</div></li>';
break;
case "act6":
p = '<li id="act6" ><div class="minAction" >Reset</div></li>';
break;
case "act7":
var pasc = parseFctTxt(pa);
p = '<li id="act7" ><div class="minAction" >F:&nbsp;';
p += '<input type="text" class="minFct valFct" value="'+pasc+'" /></div></li>';
break;
case "act8":
var pasc = parseFctTxt(pa);
p = '<li id="act8" ><div class="minAction" >goPage:&nbsp;';
p += '<input type="number" class="numFct valFct" value="'+pasc+'" /></div></li>';
break;
}
return p;
}
function scActionsEdit(id,pa){
var p = '';
pa = parseFctTxt(pa);
switch(id){
case "cod1":
p = 'if(LUDI.pageIsOk()){';
break;
case "cod2":
p = 'if(!LUDI.pageIsOk()){';
break;
case "act1":
p = 'LUDI.deleteLife();';
break;
case "act2":
p = 'LUDI.addLife();';
break;
case "act3":
p = 'LUDI.nextPage();';
break;
case "act4":
p = 'LUDI.nextPageAnd1();';
break;
case "act5":
p = 'LUDI.wait(2000);';
break;
case "act6":
p = 'window.location.reload();';
break;
case "act7":
if(pa!=''){
p = pa + '();';
}
break;
case "act8":
if(pa!=''){
p = 'LUDI.goPage(' + parseInteger(pa) + ');';
}
break;
}
return p;
}
function actionspersoShow(){
if(GlobalUid==-1){return false;}
oeEditorShow('editor-action');
$('#actioneditbtn').css("display","none");
$('.classWindow').css("display","none");
}
function saveActionsPerso(){
if(GlobalUid==-1){return false;}
var obj = CLudis[GlobalUid];
var lst = recupActionsPerso();
obj.actionLine1 = lst;
var lst2 = recupParamsPerso();
obj.actionLine2 = lst2;
var actions = lst.split('|');
var params  = lst2.split('|');
var sc = '';
var condiopen = false;
var i = 0;
for (i=0;i<actions.length;i++){
if(actions[i].indexOf('cod')!=-1){
if(condiopen){sc = sc+'}';}
condiopen = true;
}
sc = sc + scActionsEdit(actions[i],params[i]);
}
if(condiopen){sc = sc+'}';}
sc = sc + 'LUDI.waitReset();';
obj.text4 = sc;
$("." + globalSortable).sortable('disable');
closePan();
}
function recupActionsPerso(){
var r = '';
var idul = '#listactions1 li';
$(idul).each(function(n){
r = r + $(this).attr('id') + "|";
});
return r;
}
function recupParamsPerso(){
var r = '';
var idul = '#listactions1 li';
$(idul).each(function(n){
r = r + parseFctTxt($(this).find('.valFct').val()) + "|";
});
return r;
}
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
closePan();
var iCtn = CLudisGetNumber('helper')+CLudisGetNumber('input')
+ CLudisGetNumber('qcm')+CLudisGetNumber('bilan')+CLudisGetNumber('objframe')
+ CLudisGetNumber('img')+CLudisGetNumber('lcm')+CLudisGetNumber('metaobject')
+ CLudisGetNumber('text')+CLudisGetNumber('video') + CLudisGetNumber('audio')
+ CLudisGetNumber('tcm')+CLudisGetNumber('plugin')+ CLudisGetNumber('texthtml')
+ CLudisGetNumber('speech')+CLudisGetNumber('videomp4')+CLudisGetNumber('buttonarea')
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
objTemp.x = (SCREEN_0_W - objTemp.width )/2;
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
objTemp.x = (SCREEN_0_W - objTemp.width )/2;
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
var iCtn = CLudisGetNumber('button') + CLudisGetNumber('dom') + CLudisGetNumber('buttonarea');
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
objTemp.x = SCREEN_0_W - (156 + 28);
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
function deleteLudiByType(typ){
for (var i=0;i<CLudisCount;i++){
if(CLudis[i].supp==0){
if(CLudis[i].pageId==GPageId){
if(CLudis[i].type==typ){
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
objTemp.type = "img";
objTemp.idString = "img" + guid();
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
objTemp.type = "img";
objTemp.idString = "img" + guid();
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
objTemp.type = "img";
objTemp.idString = "img" + guid();
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
targetImg = 0;
launchImageEditZone();
}
function ajoutLudiIMGsvg(im,six,siy,rix,riy){
closePan();
var objTemp = LudiBase();
objTemp.type = "img";
objTemp.idString = "img" + guid();
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
objTemp.idString = "img" + guid();
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
objTemp2.type = "qcm";
objTemp2.idString = "mcq" + guid4();
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
objTemp2.idString = "tcm" + guid4();
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
objTemp2.idString = "lcm" + guid4();
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
objInput.idString = "input" + guid4();
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
objTemp.idString = "video" + guid4();
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
objTemp.idString = "mp4" + guid4();
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
objTemp.idString = "audio" + guid4();
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
objTemp.idString = "bil" + guid4();
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
objTemp.idString = "life" + guid4();
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
function ajoutLudiGameZoneAct(){
closePan();
var objTemp = LudiBase();
objTemp.type= "gamezoneaction";
objTemp.subtype= "gamezoneaction";
objTemp.text3= "";
objTemp.text4= "";
objTemp.x = 350 + qcmx;
objTemp.y = 350 + qcmx;
objTemp.width  = 90;
objTemp.height = 50;
objTemp.realwidth = objTemp.width;
objTemp.realheight = objTemp.height;
objTemp.pageId = GPageId;
objTemp.data = "img/zone-blue.png";
CLudisAdd(objTemp);
qcmx++;
CLudisPaint();
eventObjects = true;
createRenderJSON();
deleteLudiHELPER();
}
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
objTemp.idString = "txt" + guid4();
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
objTemp.idString = "txt" + guid4();
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
objTemp.idString = "txt" + guid4();
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
objTemp.idString = "speech" + guid4();
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
objTemp.idString = "btn" + guid4();
objTemp.y = 650;
if(iCtn==0){
objTemp.x = 760;
objTemp.text = getTrdU("next");
objTemp.actionVal = "DS";
}
if(iCtn==1){
objTemp.x = 10;
objTemp.text = getTrdU("return");
objTemp.actionVal = "DP";
}
if(iCtn==2){
objTemp.x = 400;
objTemp.text = getTrdU("next");
objTemp.actionVal = "DP";
}
if(iCtn==3){
objTemp.x = 100;
objTemp.text = getTrdU("next");
objTemp.actionVal = "DP";
}
if(iCtn==4){
objTemp.x = 500;
objTemp.text = getTrdU("next");
objTemp.actionVal = "DP";
}
if(iCtn==5){
objTemp.x = 150;
objTemp.y = 600;
objTemp.text = getTrdU("next");
objTemp.actionVal = "DP";
}
if(iCtn==6){
objTemp.x = 170;
objTemp.y = 590;
objTemp.text = getTrdU("next");
objTemp.actionVal = "DP";
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
function ajoutLudiActiveZone(){
var objTemp = LudiBase();
objTemp.text6 = 1;
objTemp.type = 'buttonarea';
objTemp.idString = "btn" + guid4();
objTemp.y = 550 + qcmx ;
objTemp.x = 560 + qcmx;
objTemp.width = 80;
objTemp.height = 80;
objTemp.text = getTrdU("next");
objTemp.actionVal = "DS";
objTemp.realwidth = objTemp.width;
objTemp.realheight = objTemp.height;
objTemp.pageId = GPageId;
objTemp.fontSize = 18;
qcmx++;
CLudisAdd(objTemp);
lastUniKid = objTemp.unikid;
CLudisPaint();
eventObjects = true;
createRenderJSON();
deleteLudiHelperBtn();
deleteLudiHELPER();
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
var classiquelarge = getParamsValue('classiquelarge');
closePan();
var objTemp = LudiBase();
objTemp.type= "barre";
objTemp.x = 0;
objTemp.y = 0;
objTemp.width = 960;
if (classiquelarge==1) {
objTemp.width = 1280;
}
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
function ajoutLudiFluxPts() {
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
function ajoutLudiDOM() {
closePan();
var objTemp = LudiBase();
objTemp.type= "dom";
objTemp.idString = "dom" + guid4();
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
function launchCustomIframe() {
closePan();
var objTemp = LudiBase();
objTemp.type= "objframe";
objTemp.x = 120 + domx;
objTemp.y = 120 + domx;
objTemp.width  = 550;
objTemp.height = 450;
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
function launchMetaObject(typ,mtyp) {
closePan();
var objTemp = LudiBase();
objTemp.type= "metaobject";
objTemp.x = 120 + domx;
objTemp.y = 220 + domx;
objTemp.width  = 50;
objTemp.height = 50;
objTemp.realwidth = objTemp.width;
objTemp.realheight = objTemp.height;
if (typ=='showstarfx') {
objTemp.data = "img/startline-view.png";
objTemp.width  = 456;
objTemp.height = 182;
objTemp.realwidth = objTemp.width;
objTemp.realheight = objTemp.height;
objTemp.text2 = 0;
objTemp.text3 = 50;
objTemp.text4 = 90;
}
if (typ=='infopoint') {
objTemp.data = "img/infopoint.png";
}
if (typ=='panelslide') {
objTemp.x = 920;
objTemp.x2 = 440;
objTemp.data = "assets/infopanelslide.png";
}
if (typ=='checkpoint') {
objTemp.x = 520;
objTemp.x2 = 140;
objTemp.width  = 60;
objTemp.height = 60;
objTemp.data = "assets/iconcheckpoint.jpg";
}
if (typ=='timer') {
objTemp.data = "img/timec14.png";
objTemp.text3 = 20;
objTemp.width  = 100;
objTemp.height = 100;
objTemp.realwidth = objTemp.width;
objTemp.realheight = objTemp.height;
objTemp.actionVal = "DS";
}
if (typ=='learningcoin') {
objTemp.idString = guid4() + guid4();
objTemp.data = "assets/lc-flat.png";
objTemp.width  = 60;
objTemp.height = 60;
objTemp.realwidth = objTemp.width;
objTemp.realheight = objTemp.height;
mtyp= 'learningcoins';
}
objTemp.pageId = GPageId;
objTemp.text = "";
objTemp.text7 = mtyp;
objTemp.text8 = typ; //"infopoint"
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
objTemp2.text6 = "";
objTemp2.text7 = "";
objTemp2.text8 = "";
objTemp2.val = 0;
objTemp2.val2 = 0;
objTemp2.val3 = 0;
objTemp2.val4 = 0;
objTemp2.val5 = 0;
objTemp2.val6 = 0;
objTemp2.val7 = 0;
objTemp2.val8 = 0;
objTemp2.zindex = 1;
objTemp2.note = 1;
objTemp2.remarque = "";
objTemp2.data = "";
objTemp2.fontSize = 20;
objTemp2.isCreate = false;
objTemp2.supp = 0;
return objTemp2;
}
function showObjFxPann() {
if ($('#pann-objectfx').is(":visible")) {
$('#pann-objectfx').hide();
} else {
redimObjFxPann();
$('#pann-objectfx').show();
$('#pann-extensions').hide();
setTimeout(() => {
redimObjFxPann();
setTimeout(() => {
redimObjFxPann();
setTimeout(() => {
redimObjFxPann();
}, 800);
}, 700);
}, 700);
}
}
function redimObjFxPann() {
if ($('#pann-objectfx').children().length == 4) {
$('#pann-objectfx').css("width","219px");
$('#pann-objectfx').css("height","204px");
}
if ($('#pann-objectfx').children().length > 4) {
$('#pann-objectfx').css("width","329px");
$('#pann-objectfx').css("height","204px");
}
if ($('#pann-objectfx').children().length > 6) {
$('#pann-objectfx').css("width","329px");
$('#pann-objectfx').css("height","306px");
}
if ($('#pann-objectfx').children().length > 9) {
$('#pann-objectfx').css("width","329px");
$('#pann-objectfx').css("height","408px");
}
}
function hideObjExtPann() {
$('#pann-objectfx').hide();
$('#pann-extensions').hide();
}
function addObjFxBlueBox() {
closePan();
var objTemp = LudiBase();
objTemp.type= "dom";
objTemp.idString = "objfx" + guid4();
objTemp.x = 50 + domx;
objTemp.y = 200 + domx;
objTemp.width  = 400;
objTemp.height = 100;
objTemp.realwidth = objTemp.width;
objTemp.realheight = objTemp.height;
objTemp.pageId = GPageId;
objTemp.text = "This is a blue box with an arrow";
objTemp.fontSize = 18;
var ObjCss = "background-image:url(images/arrowblue.png);";
ObjCss += "background-repeat:no-repeat;";
ObjCss += "text-align:center;";
ObjCss += "background-position:left bottom;";
ObjCss += "-webkit-box-shadow: inset 0px 0px 0px 6px #3366cc;";
ObjCss += "box-shadow: inset 0px 0px 0px 6px #3366cc;";
objTemp.text6 = ObjCss;
CLudisAdd(objTemp);
lastUniKid = objTemp.unikid;
domx = domx + 4;
CLudisPaint();
eventObjects = true;
createRenderJSON();
deleteLudiHELPER();
}
function addObjFxBlueBoard() {
closePan();
var objTemp = LudiBase();
objTemp.type= "dom";
objTemp.idString = "objfx" + guid4();
objTemp.x = 50 + domx;
objTemp.y = 200 + domx;
objTemp.width  = 420;
objTemp.height = 250;
objTemp.realwidth = objTemp.width;
objTemp.realheight = objTemp.height;
objTemp.pageId = GPageId;
objTemp.text = "CHAPTER 1";
objTemp.fontSize = 28;
var ObjCss = "background-image:url(images/little-presentation.svg);";
ObjCss += "background-repeat:no-repeat;";
ObjCss += "background-size:cover;";
ObjCss += "text-align:center;";
ObjCss += "background-position:center center;";
objTemp.text6 = ObjCss;
CLudisAdd(objTemp);
lastUniKid = objTemp.unikid;
domx = domx + 4;
CLudisPaint();
eventObjects = true;
createRenderJSON();
deleteLudiHELPER();
}
var globalAnimChoice = 0;
function showEditAnim(){
if(GlobalUid==-1){
return false;
}
var obj = CLudis[GlobalUid];
$('.opacedit').css("display","block");
$('#editAnim').css("display","block");
$('.toolAnimBl').css('background-color','transparent');
if (typeof obj.anim === "undefined") {obj.anim = 1;}
if(obj.anim==0||obj.anim==1){
$('.toolAnim01').css('background-color','#BCF5A9');}
if(obj.anim==3){
$('.toolAnim03').css('background-color','#BCF5A9');}
if(obj.anim==4){
$('.toolAnim04').css('background-color','#BCF5A9');}
if(obj.anim==5){
$('.toolAnim05').css('background-color','#BCF5A9');}
if(obj.anim==12){
$('.toolAnim12').css('background-color','#BCF5A9');}
if(obj.anim==17){
$('.toolAnim17').css('background-color','#BCF5A9');}
if(obj.anim==18){
$('.toolAnim18').css('background-color','#BCF5A9');}
globalAnimChoice = obj.anim;
}
function saveAnimChoice(){
if(GlobalUid==-1){
return false;
}
var obj = CLudis[GlobalUid];
obj.anim = 	globalAnimChoice;
closeEdit();
}
function showClickAnim(i,elm){
globalAnimChoice = i;
$('.toolAnimBl').css('background-color','transparent');
elm.style.backgroundColor = '#BCF5A9';
}
function animEditObject(){
var p = '';
p += '<div id="editAnim" class="editAnim pan ' + TYPEWIND + 'osBorder" >';
p += '<div class="toolbar-w toolbar-header">';
p += '<div onClick="closeEdit();" class="closehead" ></div>';
p += '<h1 class="titlehead">Animation</h1>';
p += '</div>';
p += '<div id="editAnimList" class="editAnimList" >';
p += '<div onClick="showClickAnim(1,this);" class="toolAnim01 toolAnimBl" ></div>';
p += '<div onClick="showClickAnim(3,this);" class="toolAnim03 toolAnimBl" ></div>';
p += '<div onClick="showClickAnim(4,this);" class="toolAnim04 toolAnimBl" ></div>';
p += '<div onClick="showClickAnim(5,this);" class="toolAnim05 toolAnimBl" ></div>';
p += '<div onClick="showClickAnim(12,this);" class="toolAnim12 toolAnimBl" ></div>';
p += '<div onClick="showClickAnim(17,this);" class="toolAnim17 toolAnimBl" ></div>';
p += '<div onClick="showClickAnim(18,this);" class="toolAnim18 toolAnimBl" ></div>';
p += '</div>';
p += '<a style="position:absolute;right:10px;bottom:10px;" ';
p += ' onClick="saveAnimChoice();" class="btnSave">' + getTrd('save') + '</a>';
p += '</div>';
return p;
}
var globalFormatButton = 0;
function showFormatButton(){
if(GlobalUid==-1){
return false;
}
var obj = CLudis[GlobalUid];
$('.opacedit').css("display","block");
$('#editFormatButton').css("display","block");
$('.toolFormatButton').css('background-color','transparent');
$('#textButtonFormatEdit').val(obj.idString);
if (typeof obj.text6 === "undefined") {obj.text6 = 1;}
applickFormatButton(obj);
globalFormatButton = obj.text6;
}
function applickFormatButton(obj){
if(obj.text6==0||obj.text6==1){
obj.width  = 160;
obj.height = 40;
obj.realwidth = obj.width;
obj.realheight = obj.height;
$('.toolFormatButton01').css('background-color','#BCF5A9');
}
if(obj.text6==2){
obj.width  = 200;
obj.height = 50;
obj.realwidth = obj.width;
obj.realheight = obj.height;
$('.toolFormatButton02').css('background-color','#BCF5A9');
}
if(obj.text6==3){
obj.width  = 200;
obj.height = 50;
obj.realwidth = obj.width;
obj.realheight = obj.height;
$('.toolFormatButton03').css('background-color','#BCF5A9');
}
}
function saveFormatButton(){
if(GlobalUid==-1){
return false;
}
var obj = CLudis[GlobalUid];
obj.text6 = globalFormatButton;
if(obj.text6==1){
obj.width  = 160;
obj.height = 40;
obj.realwidth = obj.width;
obj.realheight = obj.height;
}
if(obj.text6==4||obj.text6==5||obj.text6==6){
obj.width = 80;
obj.height = 80;
obj.realwidth = obj.width;
obj.realheight = obj.height;
}
applickFormatButton(obj);
obj.idString = $('#textButtonFormatEdit').val();
closeEdit();
eventObjects = true;
}
function showClickBtnObj(i,elm){
globalFormatButton = i;
$('.toolFormatButton,.toolFormatButtonR').css('background-color','transparent');
elm.style.backgroundColor = '#BCF5A9';
}
function formatButtonObject(){
var p = '<div id="editFormatButton" ';
p += ' class="editFormatButton pan ' + TYPEWIND + 'osBorder" >';
p += barreEdit();
p += '<div class="tableBaseTitle" style="width:350px;margin-top:20px;" >';
p += 'ID&nbsp;:&nbsp;<input id="textButtonFormatEdit" ';
p += ' type="text" class="textdatabasetitleedit" style="width:270px;" />';
p += '</div>';
p += '<div id="formatButtonList" class="formatButtonList" >';
p += '<div onClick="showClickBtnObj(1,this);" ';
p += 'class="toolFormatButton01 toolFormatButton" ></div>';
p += '<div onClick="showClickBtnObj(2,this);" ';
p += 'class="toolFormatButton02 toolFormatButton" ></div>';
p += '<div onClick="showClickBtnObj(3,this);" ';
p += 'class="toolFormatButton03 toolFormatButton" ></div>';
p += '<div onClick="showClickBtnObj(4,this);" ';
p += 'class="toolRoundButton04 toolFormatButtonR" ></div>';
p += '<div onClick="showClickBtnObj(5,this);" ';
p += 'class="toolRoundButton05 toolFormatButtonR" ></div>';
p += '<div onClick="showClickBtnObj(6,this);" ';
p += 'class="toolRoundButton06 toolFormatButtonR" ></div>';
p += '</div>';
p += '<br/><br/><br/><br/><br/>';
p += '<a style="position:absolute;right:15px;bottom:15px;" ';
p += 'onClick="saveFormatButton();" class="btnSave">' + getTrd('save') + '</a>';
p += '</div>';
return p;
}
var colorSelect = '';
var imageLogoSelect = '';
function launchBarreEdit(obj){
$('.opacedit,#colorselectpan').css("display","block");
$('#textTitleBarreEdit').val(obj.text);
$('#textBarreColorEdit').val(obj.val);
colorSelect = obj.val;
imageLogoSelect = obj.val3;
if (imageLogoSelect=='') {
imageLogoSelect = 'assets/uibase-icon-04.png';
}
applyActiveLogoImg();
$('#backcolorlogo').css('background-color',colorSelect);
if(obj.val2==0){
document.getElementById('activelogoimg').checked = false;
$('#backcolorlogo').css('display','none');
$('.actionSlctLogoImg').css('display','none');
}else{
document.getElementById('activelogoimg').checked = true;
$('#backcolorlogo').css('display','block');
$('.actionSlctLogoImg').css('display','block');
}
$('#activelogoimg:checkbox').change(function(){
switchActiveLogoImg();
});
}
function switchActiveLogoImg(){
if (document.getElementById('activelogoimg').checked) {
$('#backcolorlogo').css('display','block');
$('.actionSlctLogoImg').css('display','block');
} else {
$('#backcolorlogo').css('display','none');
$('.actionSlctLogoImg').css('display','none');
}
}
function applyActiveLogoImg(){
if (imageLogoSelect!='') {
var absoluteUrlImg = (correctUrlImg(imageLogoSelect));
absoluteUrlImg = absoluteUrlImg.replace(/\\/g, "/");
$('#backcolorlogopicture').attr("src",absoluteUrlImg);
}
}
function colorChoiceZone(){
var p = '<div id="colorselectpan" ';
p += ' style="height:350px;width:540px;" ';
p += ' class="editnote pan ' + TYPEWIND + 'osBorder" >';
p += barreEdit();
p += '<div style="position:relative;width:415px;margin-top:10px;padding-top:10px;';
p += 'padding-bottom:10px;font-size:15px;border:solid 0px red;" >';
p += '&nbsp;&nbsp;&nbsp;Title&nbsp;:&nbsp;&nbsp;';
p += '<input id="textTitleBarreEdit" ';
p += ' type="text" class="css-input textdatabasetitleedit" style="width:320px;" />';
p += '</div>';
p += '<div style="position:relative;width:160px;height:163px;';
p += 'float:left;margin-top:5px;';
p += 'padding-bottom:10px;border:solid 0px red;" >';
p += minimalLineCheckBox('activelogoimg',getTrd("activatelogo"));
p += '<p style="margin-top:1px;margin-bottom:2px;font-size:15px;" >';
p += '&nbsp;'+getTrd("labelImage")+'&nbsp;:&nbsp;</p>';
p += '<div id="backcolorlogo" style="position:relative;width:100%;height:66px;" >';
p += '<img id="backcolorlogopicture" style="position:relative;left:50%;width:64px;';
p += 'margin-left:-32px;height:64px;" ';
p += 'src="images/uibase-icon-04.png" /></div>';
p += '<a onClick="showSelImgLogoImg();" ';
p += ' class="actionSlctLogoImg actionSlctFileImgLogo actionSelectLogoImageLogo" ></a>';
p += '</div>';
p += '<div style="position:relative;width:324px;';
p += 'height:150px;margin-top:5px;padding:12px;';
p += 'float:left;border-left:dotted 1px purple;" >';
p += colorChoiceC('#447BB3');
p += colorChoiceC('#336E7B');
p += colorChoiceC('#019875');
p += colorChoiceC('#F2784B');
p += colorChoiceC('#913D88');
p += colorChoiceC('#22313F');
p += colorChoiceC('#F62459');
p += colorChoiceC('#a0522d');
p += colorChoiceC('#008a00');
p += colorChoiceC('#a20025');
p += colorChoiceC('#642EFE');
p += colorChoiceC('#4C0B5F');
p += colorChoiceC('#AEB6BF');
p += colorChoiceC('#610B21');
p += colorChoiceC('#0B614B');
p += colorChoiceC('#D98880');
p += colorChoiceC('#633974');
p += colorChoiceC('#4D5656');
p += colorChoiceC('#B03A2E');
p += colorChoiceC('#B7950B');
p += colorChoiceC('#FF00FF');
p += colorChoiceC('#D98880');
p += colorChoiceC('#24445C');
p += colorChoiceC('#7cb7d8');
p += colorChoiceC('transparent');
p += '<input id="textBarreColorEdit" ';
p += ' type="text" class="css-input" ';
p += ' style="width:90px;margin-top:4px;margin-left:6px;';
p += 'font-size:15px;padding:7px;" />';
p += '</div>';
p += '<a style="position:absolute;right:15px;bottom:15px;" ';
p += 'onClick="saveChoiceColorProcess();" class="btnSave">' + getTrd('save') + '</a>';
p += '</div>';
return p;
}
function colorChoiceC(col){
var idCol = col.replace('#','col');
var p = '<div id="'+ idCol +'" class="colorCircle colorCircleRound" ';
p += ' style="background-color:'+ col +';';
if (col=='transparent') {
p += 'background-image:url(\'img/colortransparent.png\');';
}
p += '" onClick="colorChoiceProcess(\''+ col +'\',\'' + idCol + '\');" >';
p += '</div>';
return p;
}
function colorChoiceProcess(col,idCol){
colorSelect = col;
$('#textBarreColorEdit').val(colorSelect);
$('#backcolorlogo').css('background-color',colorSelect);
$('.colorCircleRound').removeClass("colorCircleActive");
$('#' + idCol).addClass("colorCircleActive");
}
function saveChoiceColorProcess(){
if(GlobalUid==-1){
return false;
}
closePan();
var obj = CLudis[GlobalUid];
if(obj.type=="barre"){
colorSelect = $('#textBarreColorEdit').val();
colorBase = colorSelect;
obj.text = $('#textTitleBarreEdit').val();
obj.val3 = imageLogoSelect;
}
var objCanvas = canvas.getActiveObject();
objCanvas.fill = colorSelect;
obj.val = colorSelect;
if(document.getElementById('activelogoimg').checked){
obj.val2 = 1;
}else{
obj.val2 = 0;
}
canvas.deactivateAll();
getImageDataMini(GPageId);
canvas.renderAll();
showWiziZone();
eventObjects = true;
}
function seClTxt(c){
editorInstance.commands.foreColor('',"foreColor", "red");
$('.colorpikerpalette').css('display','none');
$('#colorpiker').css('background-color',c);
}
var GlobalDataid = -1;
var tableGlobale;
var tableDataTxt = "";
var loadDataShow="<center><br><img src='img/microsave.gif' /><br></center>";
function databaseEditZone(){
var p = '<div id="editDatabase" class="editDatabase pan ' + TYPEWIND + 'osBorder" >';
p += '<div class="toolbar-w toolbar-header">';
p += '<div onClick="closeEdit();" class="closehead" ></div>';
p += '<h1 class="titlehead">Data-Base edition</h1>';
p += '</div>';
p += '<div class="tableBaseTitle" >';
p += 'ID&nbsp;:&nbsp;<input id="textdatabasetitleedit" type="text" class="textdatabasetitleedit" ';
p += ' style="width:350px;" />';
p += '</div>';
p += '<div class="tableBaseEdition" ></div>';
p += '<div class="tableBaseEditionBtn" >';
p += '<a style="float:left;" onclick="closeEdit();" ';
p += 'class="validation" >Cancel</a>';
p += '<a style="float:left;margin-left:10px;" onclick="csvUpload();" ';
p += 'class="validation" >Import CSV</a>';
p += '<a style="float:right;margin-right:10px;" ';
p += 'onclick="extractDataBase();" ';
p += 'class="btnSave" >' + getTrd('save') + '</a>';
p += '</div>';
p += '</div>';
return p;
}
function extractDataBase(){
if(tableDataTxt!=""){
var obj = CLudis[GlobalDataid];
var exportTxt = '';
var i = 0;
var tableDoc = $("#tableBaseE");
tableDoc.find('tr').each(function(){
if(i!=0){
var j = 0;
$(this).find('td').each(function(){
var txt = $(this).text();
if(txt=='&nbsp;'){
txt = '';
}
txt = txt.replace('|','');
txt = txt.replace('@','');
if(j==0){
exportTxt += txt  ;
}else{
exportTxt += '|' + txt  ;
}
j++;
});
exportTxt += '@';
}
i++;
});
obj.text = exportTxt;
obj.idString = $('#textdatabasetitleedit').val();
$('.tableBaseEdition').html(loadDataShow);
closeEdit();
tableDataTxt = "";
}
}
function launchEditDataBase(obj){
GlobalDataid = obj.id;
$('.opacedit').css("display","block");
$('#editDatabase').css("display","block");
$('#textdatabasetitleedit').val(obj.idString);
tableDataTxt = obj.text;
$('.tableBaseEdition').html(loadDataShow);
setTimeout(function(){
launchTableDataBase();
},700);
}
function launchTableDataBase(){
var dataTxt = tableDataTxt;
tableDataTxt = "ok";
var p ='<table id="tableBaseE" class="tableBaseE a-table" >';
p += '<tr>';
p += '<th>A</th>';
p += '<th>B</th>';
p += '<th>C</th>';
p += '<th>D</th>';
p += '<th>E</th>';
p += '<th>F</th>';
p += '<th>G</th>';
p += '<th>H</th>';
p += '<th>I</th>';
p += '<th>J</th>';
p += '<th>K</th>';
p += '<th>L</th>';
p += '<th>M</th>';
p += '<th>N</th>';
p += '<th>O</th>';
p += '</tr>';
var dataTxta = dataTxt.split("@");
var i = 0;
var r = 0;
for (i = 0; i < dataTxta.length; i++) {
var lineRow = dataTxta[i];
if(lineRow!=''){
r++;
var rowTxta = lineRow.split("|");
if(rowTxta.length>2){
var clue1 = rowTxta[0].replace(' ','');
var clue2 = rowTxta[1].replace(' ','');
var clue3 = rowTxta[2].replace(' ','');
if(clue1!=''&&clue1!=' '&&(clue1.length>1||clue2.length>1||clue3.length>1)){
p += '<tr>';
var j = 0;
for (j=0;j<rowTxta.length;j++) {
var tdTxt = rowTxta[j];
p += '<td id="' + guid() + '" onClick="editCellOplace(this);" >' + tdTxt + '</td>';
}
p += '</tr>';
}
}
}
}
p += getLineData()+getLineData();
p += getLineDataAdd();
p += '</table>';
$('.tableBaseEdition').html(p);
}
var tdInit;
var valtdInit;
var actualIdTdInit = "";
function editCellOplace(o){
if(typeof tdInit =="undefined"){
}else{
if(actualIdTdInit==$(o).attr("id")){
return false;
}
}
$(".editorInputTd").remove();
$(o).css("min-width","100px");
tdInit = $(o);
actualIdTdInit = tdInit.attr("id");
valtdInit = $(o).html();
if(valtdInit=='&nbsp;'){
valtdInit = '';
}
var widthInput = " style='width:100%;' ";
if(valtdInit.length>12){
widthInput = " style='width:100%;min-width:150px;' ";
}
if(valtdInit.length>24){
widthInput = " style='width:100%;min-width:250px;' ";
}
if(valtdInit.length>36){
widthInput = " style='width:100%;min-width:350px;' ";
}
$(o).html("<input " + widthInput + " onblur='blurLineData(this)' id='editorInputTd' val='' />");
tdInit.attr("val-data",valtdInit);
$("#editorInputTd").val(valtdInit);
$("#editorInputTd").focus();
}
function saveLineData(inp){
if(typeof tdInit=="undefined"){
}else{
tdInit.attr("val-data",$(inp).val());
}
}
function blurLineData(inp){
if(typeof tdInit =="undefined"){
}else{
var valData = $(inp).val();
if(valData==''){
valData = '&nbsp;';
}
tdInit.html(valData);
tdInit.attr("val-data",valData);
}
}
function getLineData(){
var p ='<tr>';
p += '<td id="' + guid() + '" onClick="editCellOplace(this);" >&nbsp;</td>';
p += '<td id="' + guid() + '" onClick="editCellOplace(this);" ></td>';
p += '<td id="' + guid() + '" onClick="editCellOplace(this);" ></td>';
p += '<td id="' + guid() + '" onClick="editCellOplace(this);" ></td>';
p += '<td id="' + guid() + '" onClick="editCellOplace(this);" ></td>';
p += '<td id="' + guid() + '" onClick="editCellOplace(this);" ></td>';
p += '<td id="' + guid() + '" onClick="editCellOplace(this);" ></td>';
p += '<td id="' + guid() + '" onClick="editCellOplace(this);" ></td>';
p += '<td id="' + guid() + '" onClick="editCellOplace(this);" ></td>';
p += '<td id="' + guid() + '" onClick="editCellOplace(this);" ></td>';
p += '<td id="' + guid() + '" onClick="editCellOplace(this);" ></td>';
p += '<td id="' + guid() + '" onClick="editCellOplace(this);" ></td>';
p += '<td id="' + guid() + '" onClick="editCellOplace(this);" ></td>';
p += '<td id="' + guid() + '" onClick="editCellOplace(this);" ></td>';
p += '<td id="' + guid() + '" onClick="editCellOplace(this);" ></td></tr>';
return p;
}
function getLineDataAdd(){
var p ='<tfoot id="footerLinedata" ><tr id="lineDataAdd" >';
p += '<td style="text-align:center;background:white!important;" ';
p += ' colSpan="15" onClick="addLineData();" >';
p += '<img style="cursor:pointer;" src="img/line-add.png" />';
p += '</td></tr></tfoot>';
return p;
}
function addLineData(){
$('#footerLinedata').before(getLineData());
}
function csvUpload(){
const electron = require('electron');
const ipc = electron.ipcRenderer;
ipc.send('message',{key:'dataupload'});
setTimeout(function(){
controlReceptionCsvUpload();
},300);
}
function controlReceptionCsvUpload(){
if ($('#editDatabase').is(':visible')) {
var remote = require('electron').remote;
var dataUpload = remote.getGlobal('sharedObj').dataUpload;
if(dataUpload==''){
setTimeout(function(){
controlReceptionCsvUpload();
},300);
}else{
if(dataUpload=='error'){
alert('echec');
}else{
var dataTxt = CSVtoBase(dataUpload);
var dataTxta = dataTxt.split("@");
if(dataTxta && dataTxta.length){
var loadDataS = loadDataShow + '<center>Import ' + dataTxta.length + ' lines Ok</center>';
$('.tableBaseEdition').html(loadDataS);
tableDataTxt = dataTxt;
setTimeout(function(){
launchTableDataBase();
},1000);
}
}
}
}
}
function CSVtoBase(data) {
var finalExtract = "";
var currentData = data.toString().split(/(?:\r\n|\r|\n)/g);
if (currentData && currentData.length) {
for(var line = 0; line < currentData.length; line++) {
var lineSplit = currentData[line];
finalExtract = finalExtract + replaceAll(lineSplit,';','|') + '@';
}
}
return finalExtract;
}
function lauchExportsScorm(){
closeMove();
$('.barreProgress').css("width","0%");
eventPages = true;
eventObjects = true;
createRenderJSON();
var objTitleScorm = getParamsGlobal("titleScorm","text");
if(objTitleScorm.value==''){
objTitleScorm.value = "Title of content";
}
var objSelectScorm = getParamsGlobal("selectScorm","text");
if(objSelectScorm.value==''){
objSelectScorm.value = "moodle";
}
var objScoreMasterScorm = getParamsGlobal("scoreMasterScorm","text");
if(objScoreMasterScorm.value==''){
objScoreMasterScorm.value = '80';
}
var objStatusScorm = getParamsGlobal("statusScorm","text");
if(objStatusScorm.value==''){
objStatusScorm.value = 1;
}
$('.opacedit').css("display","block");
setTimeout(function(){
launchProcessRender();
let obj = {type:"exportsScorm"};
constructWindEdit(obj);
},400);
}
function exec_ExportsScorm(){
var title = getParamsGlobal("titleScorm","text").value;
var lms = getParamsGlobal("selectScorm","text").value;
var msc = getParamsGlobal("scoreMasterScorm","text").value;
var autc = getParamsGlobal("statusScorm","text").value;
exportToScorm(lms,msc,autc,title);
}
var typeCodeEdit = -1;
var tableDataFiles = "test.jpg|no@test2.jpg|no2";
var initTableDataFiles = "";
var deleteTableFiles = "";
function launchCustomFilesEditZone(){
optHideAll();
$('.opacedit').css("display","block");
$('#editExtraCustomFiles').css("display","block");
$('.menu-vertical').css("display","none");
launchTableFilesBase();
}
function extraCustomFilesEditZone(){
var p = '<div id="editExtraCustomFiles" class="editExtraCode pan ' + TYPEWIND + 'osBorder" >';
p += barEditWind(getTrd("Edition") + '&nbsp;Custom&nbsp;Files');
p += '<div class="tableFileEdition" >...</div>';
p += '<div class="tableBaseEditionBtn" >';
p += '<a style="float:left;" onclick="cancelCustomFiles();" ';
p += 'class="validation lblcancel" >' + getTrd('cancel') + '</a>';
p += '<a style="float:right;margin-right:10px;" ';
p += 'onclick="saveCustomFilesEditZone();" ';
p += 'class="btnSave lblsave" >' + getTrd('save') + '</a>';
p += '</div>';
p += '</div>';
return p;
}
function launchTableFilesBase(){
var remote = require('electron').remote;
tableDataFiles = remote.getGlobal('sharedObj').stockfiles;
initTableDataFiles = tableDataFiles;
deleteTableFiles = ";";
var dataTxt = tableDataFiles;
var p ='<table id="tableBaseFS" ';
p += ' style="min-width:650px;margin-left:5px;" ';
p += ' class="tableBaseE a-table" >';
p += '<tr>';
p += '<th>Name</th>';
p += '<th>Params</th>';
p += '<th>Actions</th>';
p += '</tr>';
var dataTxta = dataTxt.split("@");
var i = 0;
var r = 0;
for (i = 0; i < dataTxta.length; i++) {
var lineRow = dataTxta[i];
if(lineRow!=''){
r++;
var rowTxta = lineRow.split("|");
if(rowTxta.length>1){
var clue1 = rowTxta[0].replace(' ','');
if(clue1!=''&&clue1!=' '){
p += '<tr>';
p += '<td id="' + guid() + '" onClick="actualIdTdInit=0;" >' + rowTxta[0] + '</td>';
p += '<td id="' + guid() + '"  onClick="editCellOplace(this);" >' + rowTxta[1] + '</td>';
p += '<td id="' + guid() + '" onClick="actualIdTdInit=0;" ';
p += ' style="text-align:center;" >';
p += '<img onClick="deleteFplace(this,\''+cleanTxTN(clue1)+'\');" ';
p += ' src="img/supp.png" ';
p += ' style="cursor:pointer;" />';
p += '</td></tr>';
}
}
}
}
p += getLineFileAdd();
p += '</table>';
$('.tableFileEdition').html(p);
}
function deleteFplace(o,s){
$(o).parent().parent().css("display","none");
deleteTableFiles = deleteTableFiles + cleanTxTN(s) + ";";
}
function getLineFileAdd(){
var p ='<tfoot id="footerLinedata" ><tr id="lineDataAdd" >';
p += '<td style="text-align:center;background:white!important;" ';
p += ' colSpan="15" >';
p += '<img style="cursor:pointer;" onClick="addNewFileUpload();" src="img/line-add.png" />';
p += '</td></tr></tfoot>';
return p;
}
function saveCustomFilesEditZone(){
$('.opacedit').css("display","none");
$('#editExtraCustomFiles').css("display","none");
extractFilesStock();
closePan();
}
function cancelCustomFiles(){
const electron = require('electron');
const ipc = electron.ipcRenderer;
ipc.send('message',{key:'setGlobalVar',varkey:'stockfiles',valkey:initTableDataFiles});
closeEdit();
}
function addNewFileUpload(){
actualIdTdInit=0;
const electron = require('electron');
const ipc = electron.ipcRenderer;
ipc.send('message',{key:'uploadfile'});
setTimeout(function(){
refreshFilesStock()
},500);
}
function refreshFilesStock(){
var remote = require('electron').remote;
var stockmaj = remote.getGlobal('sharedObj').stockmaj;
if(stockmaj==1&&stockmaj=='1'){
launchTableFilesBase();
}else{
setTimeout(function(){
refreshFilesStock()
},1000);
}
}
function extractFilesStock(){
var exportTxt = '';
var i = 0;
var tableDoc = $("#tableBaseFS");
tableDoc.find('tr').each(function(){
if (i!=0) {
var j = 0;
var exId = "";
var exTxt = "";
$(this).find('td').each(function(){
var txt = $(this).text();
if (txt=='&nbsp;') {
txt = '';
}
txt = txt.replace('|','');
txt = txt.replace('@','');
if (j==0) {
exTxt += txt;
exId = txt;
}else{
exTxt += '|' + txt  ;
}
j++;
});
var idStr = ";"+ cleanTxTN(exId) + ";";
if (deleteTableFiles.indexOf(idStr)==-1){
exportTxt += exTxt + '@';
}
}
i++;
});
tableDataFiles = exportTxt;
const electron = require('electron');
const ipc = electron.ipcRenderer;
ipc.send('message',{key:'setGlobalVar',varkey:'stockfiles',valkey:exportTxt});
}
function cleanTxTN(s){
s = s.replace(/[^\w\s]/gi,'');
return s;
}
var typeCodeEdit = -1;
function extraCodeEditZone(){
var p = '<div id="editExtraCode" class="editExtraCodeMenu pan ' + TYPEWIND + 'osBorder" >';
p += barEditWind(getTrd("Edition") + '&nbsp;<span class="titlecustomcode" >...</span>');
p += '<textarea spellcheck="false" ';
p += ' style="border:solid 1px gray;font-size:22px;';
p += 'margin-top:40px;background-color:#2C3E50;color:white;';
p += 'margin-left:1%;width:98%;height:88%;" ';
p += 'id="textExtraCode" name="textExtraCode" ';
p += 'rows="5" cols="40">';
p += '</textarea>';
p += '<div class="tableBaseEditionBtn" >';
p += '<a style="float:left;" onclick="closeEdit();" ';
p += 'class="validation lblcancel" >' + getTrd('cancel') + '</a>';
p += '<a style="float:right;margin-right:10px;" ';
p += 'onclick="saveCodeEditZone();" ';
p += 'class="btnSave lblsave" >' + getTrd('save') + '</a>';
p += '</div>';
p += '</div>';
return p;
}
function launchCodeEditZone(){
optHideAll();
$('.titlecustomcode').html("Custom code script JS")
$('.opacedit').css("display","block");
$('#editExtraCode').css("display","block");
var remote = require('electron').remote;
var extraCodeTxt = remote.getGlobal('sharedObj').extracode;
$('#textExtraCode').val(extraCodeTxt);
typeCodeEdit = 0;
}
function launchCodeEditZoneCss(){
optHideAll();
$('.titlecustomcode').html("Custom code script CSS")
$('.opacedit').css("display","block");
$('#editExtraCode').css("display","block");
var remote = require('electron').remote;
var extraCodeTxt = remote.getGlobal('sharedObj').extracodecss;
$('#textExtraCode').val(extraCodeTxt);
typeCodeEdit = 1;
}
function saveCodeEditZone(){
$('.opacedit').css("display","none");
$('#editExtraCode').css("display","none");
var extraCodeTxt = $('#textExtraCode').val();
const electron = require('electron');
const ipc = electron.ipcRenderer;
ipc.send('message',{key:'saveExtraCode',text:extraCodeTxt,tc:typeCodeEdit});
closePan();
}
function getWindowHeight() {
var windowHeight = 0;
if (typeof(window.innerHeight) == 'number') {
windowHeight = window.innerHeight;
}else{
if(document.body && document.body.clientHeight) {
windowHeight = document.body.clientHeight;
}else{
if (document.documentElement && document.documentElement.clientHeight) {
windowHeight = document.documentElement.clientHeight;
}
}
}
return windowHeight;
}
function getWindowWidth() {
var windowWidth = 0;
if (typeof(window.innerWidth) == 'number') {
windowWidth = window.innerWidth;
}else{
if(document.body && document.body.clientWidth) {
windowWidth = document.body.clientWidth;
}else{
if (document.documentElement && document.documentElement.clientHeight) {
windowWidth = document.documentElement.clientHeight;
}
}
}
return windowWidth;
}
function getBodyHeight() {
var body = document.body;
html = document.documentElement;
var height = Math.max( body.scrollHeight, body.offsetHeight, html.clientHeight, html.scrollHeight, html.offsetHeight );
return height;
}
function replaceAll(txt, replace, with_this) {
return txt.replace(new RegExp(replace, 'g'),with_this);
}
function rectangledText(ctx,x, y,width,text,fontsize,fontface,textColor) {
self.TextWidth = ctx.measureText(Text).width;
var height = wrapText(ctx,x, y,text,fontsize,fontface,width,textColor)
}
function cleanText(text){
text = replaceAll(text,'</br>','     ');
text = replaceAll(text,'<br>' ,'     ');
text = replaceAll(text,'</span>','');
text = replaceAll(text,'<span>','');
return text;
}
function cleanTextForTitle(text){
text = text.replace(/(<p[^>]+?>|<p>|<\/p>)/img,"");
return text;
}
function wrapText(ctx,x, y, text, fontsize, fontface, maxwidth,textColor){
var startingY = y;
var words = text.split(' ');
var line = '';
var space = '';
var lineHeight = fontsize * 1.286;
ctx.font = fontsize + "px " + fontface;
ctx.textAlign = 'left';
ctx.textBaseline = 'top'
ctx.fillStyle = textColor;
for (var n = 0; n < words.length; n++) {
var testLine = line + space + words[n];
space = ' ';
if (ctx.measureText(testLine).width > maxwidth) {
ctx.fillText(line, x, y);
line = words[n] + ' ';
y += lineHeight;
space = '';
} else {
line = testLine;
}
}
ctx.fillText(line, x, y);
return (y + lineHeight - startingY);
}
function getTextWidth(text, font) {
var canvas = getTextWidth.canvas || (getTextWidth.canvas = document.createElement("canvas"));
var context = canvas.getContext("2d");
context.font = font;
var metrics = context.measureText(text);
return metrics.width;
}
function launchIframeZone(obj){
$('#sourceiframe').val('');
document.getElementById('IframeScrollBar').checked = false;
document.getElementById('Iframeborder').checked = false;
document.getElementById('Iframesandbox').checked = false;
if(obj.type=='objframe'){
$('.opacedit,#editIframeArea').css("display","block");
$('#sourceiframe').val(obj.text);
if(obj.val2==1) {
document.getElementById('IframeScrollBar').checked = true;
}
if(obj.val3==1) {
document.getElementById('Iframeborder').checked = true;
}
if(obj.val4==1) {
document.getElementById('Iframesandbox').checked = true;
}
}
}
function editIframeZone(){
var p = '<div id="editIframeArea" class="editIframeArea pan ' + TYPEWIND + 'osBorder" >';
p += barEditWind('Iframe');
p += '<div style="margin-top:25px;height:35px;padding:5px;" >';
p += '<div style="float:left;font-size:17px;" >&nbsp;Source&nbsp;:&nbsp;</div>';
p += '<input id="sourceiframe" type="text" ';
p += ' style="float:left;width:435px;font-size:17px;" />';
p += '</div>';
p += lineCheckBox('IframeScrollBar',getTrd("ScrollBar"));
p += lineCheckBox('Iframeborder',getTrd("Frameborder"));
p += lineCheckBox('Iframesandbox',getTrd("Sandbox"));
p += '<a style="position:absolute;left:15px;bottom:15px;" ';
p += ' onclick="closeEdit();" ';
p += 'class="validation lblcancel" >' + getTrd('cancel') + '</a>';
p += '<a style="position:absolute;right:15px;bottom:15px;" ';
p += 'onclick="iframeSave();" ';
p += 'class="btnSave lblsave" >' + getTrd('save') + '</a>';
p += '</div>';
return p;
}
function iframeSave() {
var obj = CLudis[GlobalUid];
if(obj.type=='objframe'){
obj.text = $('#sourceiframe').val();
if (document.getElementById('IframeScrollBar').checked) {
obj.val2 = 1;
} else {
obj.val2 = 0;
}
if (document.getElementById('Iframeborder').checked) {
obj.val3 = 1;
} else {
obj.val3 = 0;
}
if (document.getElementById('Iframesandbox').checked) {
obj.val4 = 1;
} else {
obj.val4 = 0;
}
}
closeEdit();
}
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
function imageEditZone(){
var p = '<div id="editImage" class="editImage pan ' + TYPEWIND + 'osBorder" >';
p += barEditWind('Images');
p += imageMenuSystem();
p += '<div id="listzoneload" class="listzoneload" >.</div>';
p += '<div id="listzone" class="listzone" >';
p +=  openelearning.cthl(imgUzl);
p += "</div>";
p += '<div class="listzoneboutons" >';
p += '<a style="float:left;display:none;" onclick="closeEdit();" ';
p += 'class="validation" >'+getTrdU("cancel")+'</a>';
p += '<a id="imgactionbtn" ';
p += ' style="float:left;margin-left:10px;padding:5px;cursor:pointer;" ';
p += ' onclick="imageActions();" ';
p += ' ><img src="img/call_to_action.png" /></a>';
p += '<a style="float:right;margin-right:10px;width:150px;" ';
p += 'onclick="imageInsert();" ';
p += 'class="btnSave" >'+getTrdU("save")+'</a>';
p += '</div></div>';
return p;
}
function imageMenuSystem(){
var men = '<div class="media-frame-menu">';
men += '<div class="media-menu">';
men += '<a class="media-menu-item menu-insert media-menu-active">Project files</a>';
men += '<div class="separator"></div>';
men += '<a class="media-menu-item menu-clipart" >Image library</a>';
men += '<a onclick="imageUpload();" class="media-menu-item menu-direct" >'+getTrdU("upload")+'</a>';
men += '</div>';
men += '</div>';
return men;
}
function imageActions(){
if(targetImg==0){
loadEdit = true;
var obj = CLudis[GlobalUid];
$('.opacedit,#editImage').css("display","none");
showActionZone(obj);
loadEdit = false;
}
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
if (targetImg==1||targetImg==12) {
if (name.indexOf('.svg')!=-1) {
r = false;
}
}
if (targetImg==11||targetImg==13) {
if (name.indexOf('.svg')==-1) {
r = false;
}
}
if (name.indexOf('uibase-')!=-1) {
$('#btnImgUpload').css("display","none");
r = false;
}
if (name.indexOf('processoe-')!=-1) {
$('#btnImgUpload').css("display","none");
r = false;
}
if (name.indexOf('fluxprocess.png')!=-1) {
$('#btnImgUpload').css("display","none");
r = false;
}
if (name.indexOf('white.jpg')!=-1) {
r = false;
}
if (name.indexOf('comic-01.png')!=-1) {
r = false;
}
if (name.indexOf('playvideo.png')!=-1) {
r = false;
}
if (name.indexOf('roundnext.png')!=-1) {
r = false;
}
if (name.indexOf('roundprev.png')!=-1) {
r = false;
}
if (name.indexOf('scorebilan.png')!=-1) {
r = false;
}
if (name.indexOf('scorescreen.jpg')!=-1) {
r = false;
}
if (name.indexOf('littlelcm.png')!=-1) {
r = false;
}
if (name.indexOf('gameoel-isodeco.jpg')!=-1) {
r = false;
}
if (name.indexOf('-sprite.png')!=-1) {
r = false;
}
var filter = "";
if (GlobalUid!=-1) {
var objTempI = CLudis[GlobalUid];
if (objTempI.type=='img') {
if (objTempI.data.indexOf('processoe-')!=-1) {
filter = "processoe-";
$('#btnImgUpload').css("display","none");
}
if (objTempI.data.indexOf('uibase-')!=-1) {
filter = "uibase-";
var getparts = objTempI.data.split('-');
if (getparts.length>0) {
filter = "uibase-" + getparts[1] + '-' ;
$('#btnImgUpload').css("display","none");
}
}
}
}
if (filter!="") {
if (name.indexOf(filter)!=-1) {
r = true;
} else {
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
var data = getSpecialmagesForTools();
if(listassets!=''){
var res = listassets.split(";");
var dir = res[0];
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
function getSpecialmagesForTools() {
var data = "";
var j = 100000;
if (targetImg==7) {
var i = 1;
for (i=1;i<12;i++) {
var path = 'file:///' + folderAllImages + 'uibase-icon-0'+i+'.png';
path = path.replace(/\\/g, "/");
data += '<div id="Uzl' + j + '" class="Uzl Pzl1" onClick="selUzl(' + j + ');" ';
data += 'style="background-image:url(\'' + path + '\');" ';
data += 'datasrc="' + path + '" ';
data += ' datawidth=64 dataheight=64 ';
data += '></div>';
j++;
}
}
return data;
}
function showSelImgDisplayImg(){
targetImg = 5;
$('#actioneditbtn').css("display","none");
$('.classWindow').css("display","none");
launchImageEditZone();
}
function showSelImgLogoImg(){
targetImg = 7;
$('#actioneditbtn').css("display","none");
$('.classWindow').css("display","none");
launchImageEditZone();
$('#editImage').css("z-index","103");
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
if(targetImg==0){
$("#imgactionbtn").css("display","block");
}else{
$("#imgactionbtn").css("display","none");
}
$(".Pzl1").each(function(){
var width = parseInt($(this).attr("datawidth"));
var height = parseInt($(this).attr("dataheight"));
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
if(targetImg==1||targetImg==2){
if(width>900&&height>700){
$(this).css("display","block");
}else{
if(width>0){
$(this).css("display","none");
}
}
}
if(targetImg==7){
var validLogoImg = false;
if(width<200&&height<200){
validLogoImg = true;
}
if(validLogoImg){
$(this).css("display","block");
}else{
if(width>0){
$(this).css("display","none");
}
}
}
});
}
function refreshImagesZones() {
const electron = require('electron');
const ipc = electron.ipcRenderer;
ipc.send('message',{key:'refreshimgs'});
}
function imageFinishUpload(file,dropCtr) {
dropCtr.removeAllFiles(true);
$('#listzone').html(imgUzl);
refreshImagesZones();
$('.opacedit,#editImage').css("display","none");
}
function imageInsert() {
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
loadPage(GPageId,1);
$('.pan').css("display","none");
};
img.src = urlImage;
}
}
if (targetImg==1) {
$('.editImage').css("display","none");
var obj = GetPageById(GPageId,1);
var img = new Image();
var filename = urlImage.replace(/^.*[\\\/]/, '')
obj.back = filename;
var filebackload = folderAllImages + obj.back;
loadImgBackCanvas(filebackload);
$('.pan').css("display","none");
loadPage(GPageId,0);
}
if (targetImg==11) {
$('.editImage').css("display","none");
var obj = GetPageById(GPageId,1);
var filename = urlImage.replace(/^.*[\\\/]/, '')
obj.backsvg = filename;
$('.pan').css("display","none");
$('#BackEditSelectSVG').html(get17Letter(obj.backsvg));
$('#pageeditbtn').css("display","block");
}
if (targetImg==12) {
$('.editImage').css("display","none");
var obj = GetPageById(GPageId,1);
var img = new Image();
var filename = urlImage.replace(/^.*[\\\/]/, '')
obj.back2 = filename;
var filebackload = folderAllImages + obj.back;
loadImgBackCanvas(filebackload);
$('.pan').css("display","none");
loadPage(GPageId,0);
}
if (targetImg==13) {
$('.editImage').css("display","none");
var obj = GetPageById(GPageId,1);
var filename = urlImage.replace(/^.*[\\\/]/, '')
obj.back2svg = filename;
$('.pan').css("display","none");
$('#Back2EditSelectSVG').html(get17Letter(obj.back2svg));
$('#pageeditbtn').css("display","block");
}
if (targetImg==2) {
$('.editImage').css("display","none");
var filename = urlImage.replace(/^.*[\\\/]/, '')
PageApplikScreen(filename);
var path = 'file:///' + folderAllImages + filename;
path = path.replace(/\\/g, "/");
$(".backScreenDiv").css("background-image",'url(' + path + ')');
$('.opacedit,#editImage').css("display","none");
$('.pan').css("display","none");
}
if(targetImg==5){
var objTempT = CLudis[GlobalUid];
objTempT.actionData = urlImage;
loadPage(GPageId,1);
$('.pan').css("display","none");
}
if(targetImg==6){
var filename = urlImage.replace(/^.*[\\\/]/, '');
$('.editImage').css("display","none");
$('#editzoneContent').css("display","block");
applyImgToHtmlContent(filename);
}
if(targetImg==7){
imageLogoSelect = urlImage;
applyActiveLogoImg();
$('#editImage').css("display","none");
}
}
function loadImgBackCanvas(filebackload) {
var img = new Image();
img.onload = function() {
var scaX = SCREEN_0_W/canvas.width;
var scaY = SCREEN_0_H/canvas.height;
scaX = SCREEN_0_W/img.width;
scaY = SCREEN_0_H/img.height;
canvas.setBackgroundImage(
filebackload,
canvas.renderAll.bind(canvas),
{
scaleX: scaX,scaleY: scaY
}
);
};
img.src = filebackload;
}
function loadPageBackImgIso() {
urlImage = 'gameoel-isodeco.jpg';
targetImg = 1;
deleteBackImgObj();
imageInsert();
}
function deleteBackImgObj() {
deleteLudiByType('helper');
deleteLudiByType('barre');
deleteLudiByType('helper');
$('.helpershow').css('display','none');
}
function deleteImageBackScreen() {
PageApplikScreen("");
$(".backScreenDiv").css("background-image",'none');
$('.pan').css("display","none");
}
function PageApplikScreen(screenBack) {
for(var i=0;i<CPagesCount;i++){
var obj = CPages[i];
if(typeof obj === "undefined"){
}else{
obj.screen = screenBack;
}
}
return false;
}
function getApplikScreen() {
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
function lauchImportPDF(){
closeMove();
$('.barreProgress').css("width","0%");
eventPages = true;
eventObjects = true;
$('.opacedit').css("display","block");
$('.renderPdfArea').css("display","block");
console.log('import pdf');
let obj = {type:"import_pdf"};
}
function exec_importpdf(){
var filename = $('#'+actualIdInput).val();
if (filename == '') { return; }
$('.renderPdfArea').css("display","block");
loadpdfprocess();
}
function renderPdfAreaZone(){
var p = '<div id="renderPdfArea" class="renderPdfArea pan ' + TYPEWIND + 'osBorder" >';
p += barEditWind('Prepare');
p += '<div id="listPdfArea" class="listPdfArea" >';
p += '<input type="file" class="pdf_file" name="pdf_file" id="pdf_file" accept=".pdf" />';
p += '</br>';
p += '<p style="text-align:center;" >';
p += '<button id="btn_import" class="btnSave2" onclick="loadpdfprocess2()">Import</button>';
p += '</p>';
p += '<div id="renderPdfAreaRoot" ></div>';
p += '<canvas id="previewPdfArea" class="previewPdfArea"  ></canvas>';
p += '</div>';
p += '</div>';
return p;
}
var actualIdInput = '';
function showSelFileGen(idInput){
actualIdInput = idInput;
var remote = require('electron');
var ipc = remote.ipcRenderer;
ipc.send('message',{key:'uploadfilesolo'});
setTimeout(function() {
refreshFileUpload();
},500);
}
function refreshFileUpload(){
var remote = require('electron').remote;
var stockmaj = remote.getGlobal('sharedObj').stockmaj;
if (stockmaj==1&&stockmaj=='1') {
var filesolo = remote.getGlobal('sharedObj').filesolo;
$('#'+actualIdInput).val(filesolo);
} else {
setTimeout(function(){
refreshFileUpload()
},1000);
}
}
function loadLocalJSON(name){
var remote = require('electron').remote;
var gPath = remote.getGlobal('sharedObj').gpath;
var pathTemp = gPath;
var actos = haveActiveOS();
if(actos=='linux'||actos=='darwin'){
pathTemp = pathTemp + '/openelearning/extract/';
}else{
pathTemp = pathTemp + '\\openelearning\\extract\\';
}
pathTemp = pathTemp + name;
var ret = false;
var jsonObject = require(pathTemp);
if(typeof jsonObject !="undefined"){
if(typeof jsonObject[0] !="undefined"){
if(typeof jsonObject[0].pageId !="undefined"){
ret = true;
return jsonObject;
}
}
}
if(!ret){
if(typeof jsonObject ==="undefined"){
return JSON.parse('{}');
}else{
if(typeof jsonObject._data ==="undefined"){
return JSON.parse('{}');
}else{
return JSON.parse(jsonObject._data);
}
}
}
}
var	borderCol = 'gray';
var	cornerCol = 'white';
var	strokeCol = 'black';
var	cornerTrans = false;
var	strokeSize = 9;
function OptsHandles(legObj,refLudi) {
if (refLudi.lock) {
legObj.set({
borderColor: borderCol,
cornerColor: cornerCol,
transparentCorners: true,
cornerStrokeColor : strokeCol,
cornerSize: 0,
padding:0,
selectable:false
});
} else {
legObj.set({
borderColor: borderCol,
cornerColor: cornerCol,
transparentCorners: cornerTrans,
cornerStrokeColor : strokeCol,
cornerSize: strokeSize,
padding:4
});
}
}
function CLudiRender(refLudi) {
if(refLudi.isCreate==false){
refLudi.isCreate = true;
oldIdSize = '';
var ol = parseInt(refLudi.getX());
var ot = parseInt(refLudi.getY());
var ow = parseInt(refLudi.getW());
var oh = parseInt(refLudi.getH());
var rw = parseInt(refLudi.getRW());
var rh = parseInt(refLudi.getRH());
if (isNaN(ow)) {ow = rw;}
if (isNaN(oh)) {oh = rh;}
var uid = parseInt(refLudi.id);
if ("undefined"===typeof refLudi.type) {
return false;
}
if (refLudi.type=="img") {
var imgsrc = correctUrlImg(refLudi.data);
fabric.util.loadImage(imgsrc, function(img){
var legimg = new fabric.Image(img,{
left : ol,
top  : ot,
scaleX : ow / rw,
scaleY : oh / rh
});
legimg.id = uid;
legimg.lockRotation = true;
legimg.hasRotatingPoint = false;
OptsHandles(legimg,refLudi);
canvas.add(legimg);
});
console.log("img:" + imgsrc);
}
if(refLudi.type=="barre"){
var rect = new fabric.Rect({
left : ol,
top  : ot,
width : ow,
height : oh,
fill: refLudi.val
});
colorBase = refLudi.val;
rect.id = uid;
rect.lockRotation = true;
rect.lockScalingY = true;
rect.lockScalingX = true;
rect.lockMovementX = false;
rect.hasRotatingPoint = false;
rect.hasControls = false;
rect.hasBorders  = true;
rect.lockMovementX = true;
rect.lockMovementY = true;
OptsHandles(rect,refLudi);
canvas.add(rect);
}
if(refLudi.type=="video"
||refLudi.type=="videomp4"){
var videosrc = refLudi.data;
fabric.util.loadImage(videosrc,function(img){
var legimg = new fabric.Image(img,{
left : ol,top  : ot,
scaleX : ow / img.width,
scaleY : oh / img.height
});
legimg.id = uid;
legimg.lockRotation = true;
legimg.hasRotatingPoint = false;
legimg.hasControls = true;
OptsHandles(legimg,refLudi);
canvas.add(legimg);
});
}
if(refLudi.type=="audio"){
var videosrc = refLudi.data;
fabric.util.loadImage(videosrc,function(img){
var legimg = new fabric.Image(img,{
left : ol,top  : ot,
scaleX : ow / img.width,
scaleY : oh / img.height
});
legimg.id = uid;
legimg.lockRotation = true;
legimg.lockScalingY = true;
legimg.lockScalingX = true;
legimg.lockMovementX = false;
legimg.hasRotatingPoint = false;
legimg.hasControls = false;
OptsHandles(legimg,refLudi);
canvas.add(legimg);
});
}
if(refLudi.type=="gamezoneaction"){
var videosrc = refLudi.data;
fabric.util.loadImage(videosrc,function(img){
var legimg = new fabric.Image(img,{
left : ol,top  : ot,
scaleX : ow / img.width,
scaleY : oh / img.height
});
legimg.id = uid;
legimg.lockRotation = true;
legimg.lockScalingY = true;
legimg.lockScalingX = true;
legimg.lockMovementX = false;
legimg.hasRotatingPoint = false;
legimg.hasControls = false;
OptsHandles(legimg,refLudi);
canvas.add(legimg);
});
}
if(refLudi.type=="bilan"){
var bilansrc = refLudi.data;
fabric.util.loadImage(bilansrc, function(img){
var legimg = new fabric.Image(img,{
left : ol,top  : ot,
scaleX : ow / img.width,
scaleY : oh / img.height
});
legimg.id = uid;
legimg.lockRotation = true;
legimg.lockScalingY = true;
legimg.lockScalingX = true;
legimg.lockMovementX = false;
legimg.hasRotatingPoint = false;
legimg.hasControls = false;
legimg.hasBorders  = true;
OptsHandles(legimg,refLudi);
canvas.add(legimg);
});
}
if(refLudi.type=="database"){
var bilansrc = refLudi.data;
fabric.util.loadImage(bilansrc, function(img){
var legimg = new fabric.Image(img,{
left : ol,top  : ot,
scaleX : ow / img.width,
scaleY : oh / img.height
});
legimg.id = uid;
legimg.lockRotation = true;
legimg.lockScalingY = true;
legimg.lockScalingX = true;
legimg.lockMovementX = false;
legimg.hasRotatingPoint = false;
legimg.hasControls = false;
legimg.hasBorders  = true;
OptsHandles(legimg,refLudi);
canvas.add(legimg);
});
}
if(refLudi.type=="life"){
var lifesrc = refLudi.data;
fabric.util.loadImage(lifesrc, function(img){
var legLife = new fabric.Image(img,{
left : ol,top  : ot,
scaleX : ow / img.width,
scaleY : oh / img.height
});
legLife.id = uid;
legLife.lockRotation = true;
legLife.lockScalingY = true;
legLife.lockScalingX = true;
legLife.lockMovementX = false;
legLife.hasRotatingPoint = false;
legLife.hasControls = false;
legLife.hasBorders  = true;
OptsHandles(legLife,refLudi);
canvas.add(legLife);
});
}
if(refLudi.type=="plugin"){
if(typeof(refLudi.data)=='undefined'){
refLudi.data = "";
}
if(refLudi.data=='undefined'){
refLudi.data = "";
}
var pluginsrc = correctLocalUrlImg(refLudi.data);
if(pluginsrc!=''&&UrlExists(pluginsrc)){
fabric.util.loadImage(pluginsrc, function(img){
var legimg = new fabric.Image(img,{
left : ol,top  : ot,
scaleX : ow / img.width,
scaleY : oh / img.height
});
legimg.id = uid;
legimg.lockRotation = true;
legimg.lockScalingY = true;
legimg.lockScalingX = true;
legimg.lockMovementX = false;
legimg.hasRotatingPoint = false;
legimg.hasControls = false;
legimg.hasBorders  = true;
OptsHandles(legimg,refLudi);
canvas.add(legimg);
});
}else{
var imgsrc = 'img/empty.png';
fabric.util.loadImage(imgsrc, function(img){
var legimg = new fabric.Image(img,{
left : ol,
top  : ot,
scaleX : ow / rw,
scaleY : oh / rh
});
legimg.id = uid;
canvas.add(legimg);
});
}
}
if(refLudi.type=="plugme"){
if(typeof(refLudi.data)=='undefined'){
refLudi.data = "";
}
if(refLudi.data=='undefined'){
refLudi.data = "";
}
var pluginsrc = correctLocalUrlImg(refLudi.data);
if(pluginsrc!=''&&UrlExists(pluginsrc)){
fabric.util.loadImage(pluginsrc, function(img){
var legimg = new fabric.Image(img,{
left : ol,top  : ot,
scaleX : ow / img.width,
scaleY : oh / img.height
});
legimg.id = uid;
legimg.lockRotation = true;
legimg.lockScalingY = true;
legimg.lockScalingX = true;
legimg.lockMovementX = false;
legimg.hasRotatingPoint = false;
legimg.hasControls = false;
legimg.hasBorders  = true;
OptsHandles(legimg,refLudi);
canvas.add(legimg);
});
}else{
refLudi.realwidth = refLudi.width;
refLudi.realheight = refLudi.height;
var text = new rectLudiscape({
left: ol,
top: ot,
width: ow,
height: oh,
borderColor :'#A9E2F3',
label:'',
fontSize : 18,
fill: '',
textColor : 'black',
stroke : 'gray',
strokeWidth : 0.5
});
text.lockRotation = true;
text.hasRotatingPoint = false;
text.lockScalingY = false;
text.lockScalingX = false;
text.lockMovementX = false;
text.hasControls = false;
text.hasBorders  = true;
text.setControlsVisibility({
mt: false,
mb: true,
mr: true,
ml: false,
bl: false,
br: false,
tl: false,
tr: false,
mtr: false,
});
if (refLudi.val.indexOf("t6m_")!=-1) {
text.hasControls = true;
text.setControlsVisibility({
mt: true,
mb: true,
mr: true,
ml: true,
bl: true,
br: true,
tl: true,
tr: true,
mtr: true,
});
}
text.id = uid;
OptsHandles(text,refLudi);
canvas.add(text);
}
}
if(refLudi.type=="speech"){
var speechsrc = refLudi.data;
fabric.util.loadImage(speechsrc,function(img){
var speechimg = new fabric.Image(img,{
left : ol,top  : ot,
scaleX : ow / img.width,
scaleY : oh / img.height
});
speechimg.id = uid;
speechimg.lockRotation = true;
speechimg.lockScalingY = true;
speechimg.lockScalingX = true;
speechimg.lockMovementX = false;
speechimg.hasRotatingPoint = false;
speechimg.hasControls = false;
speechimg.hasBorders  = true;
OptsHandles(speechimg,refLudi);
canvas.add(speechimg);
});
}
if(refLudi.type=="qcm"){
var svg = new String(getBaseQcmObj(453,210,refLudi));
fabric.loadSVGFromString(svg, function(objects, options) {
var obj = fabric.util.groupSVGElements(objects, options);
obj.left = ol;
obj.top = ot;
obj.scaleX = ow/453;
obj.scaleY =  memHeightSvg/memHeightSvg;
obj.lockRotation = true;
obj.lockScalingY = true;
obj.lockScalingX = true;
obj.lockMovementX = false;
obj.hasControls = false;
obj.hasRotatingPoint = false;
obj.id = uid;
OptsHandles(obj,refLudi);
canvas.add(obj);
});
}
if(refLudi.type=="lcm"){
var hobj = 260;
var svg = new String(getBaseLcm3(480,260,refLudi));
if(refLudi.number<4){
refLudi.height = hobj;
oh = hobj;
}
if(refLudi.number==4){
refLudi.height = hobj;
oh = hobj;
svg = new String(getBaseLcm4(480,260,refLudi));
}
if(refLudi.number==5){
hobj = 320;
refLudi.height = hobj;
oh = hobj;
svg = new String(getBaseLcm5(480,320,refLudi));
}
if(refLudi.number==6){
hobj = 350;
refLudi.height = hobj;
oh = hobj;
svg = new String(getBaseLcm6(480,350,refLudi));
}
fabric.loadSVGFromString(svg, function(objects, options) {
var obj = fabric.util.groupSVGElements(objects, options);
obj.left = ol;
obj.top = ot;
obj.scaleX = ow / 480;
obj.scaleY =  oh / hobj;
obj.lockRotation = true;
obj.lockScalingY = true;
obj.lockScalingX = true;
obj.lockMovementX = false;
obj.hasControls = false;
obj.hasRotatingPoint = false;
obj.id = uid;
OptsHandles(obj,refLudi);
canvas.add(obj);
});
}
if(refLudi.type=="text"){
refLudi.realwidth = refLudi.width;
refLudi.realheight = refLudi.height;
var text = new rectLudiscape({
left: ol,
top: ot,
width: ow,
height: oh,
borderColor :'#A9E2F3',
label:'',
fontSize : 18,
fill: '',
textColor : 'black',
stroke : 'gray',
strokeWidth : 0.5
});
text.lockRotation = true;
text.hasRotatingPoint = false;
text.lockScalingY = false;
text.lockScalingX = false;
text.lockMovementX = false;
text.hasControls = true;
text.hasBorders  = true;
text.setControlsVisibility({
mt: false,
mb: true,
mr: true,
ml: false,
bl: false,
br: false,
tl: false,
tr: false,
mtr: false,
});
text.id = uid;
OptsHandles(text,refLudi);
canvas.add(text);
}
if(refLudi.type=="texthtml"){
refLudi.realwidth = refLudi.width;
refLudi.realheight = refLudi.height;
var text = new rectLudiscape({
left: ol,
top: ot,
width: ow,
height: oh,
borderColor :'#A9E2F3',
label:'',
fontSize : 18,
fill: '',
textColor : 'black',
stroke : 'gray',
strokeWidth : 0.5
});
text.lockRotation = true;
text.hasRotatingPoint = false;
text.lockScalingY = false;
text.lockScalingX = false;
text.lockMovementX = false;
text.hasControls = true;
text.hasBorders  = true;
text.setControlsVisibility({
mt: false,
mb: true,
mr: true,
ml: false,
bl: false,
br: false,
tl: false,
tr: false,
mtr: false,
});
text.id = uid;
OptsHandles(text,refLudi);
canvas.add(text);
}
if(refLudi.type=="label"){
refLudi.realwidth = refLudi.width;
refLudi.realheight = refLudi.height;
var text = new rectLudiscape({
left: ol,
top: ot,
width: ow,
height: oh,
borderColor :'black',
label:'',
stroke: 'white',
strokeWidth: 0,
fontSize : 14,
fill: '',
textColor : 'black',
stroke : 'gray',
strokeWidth : 0.5
});
text.lockRotation = true;
text.hasRotatingPoint = false;
text.lockScalingY = false;
text.lockScalingX = false;
text.lockMovementX = false;
text.hasControls = true;
text.hasBorders  = true;
text.setControlsVisibility({
mt: false,
mb: true,
mr: true,
ml: false,
bl: false,
br: false,
tl: false,
tr: false,
mtr: false,
});
text.id = uid;
OptsHandles(text,refLudi);
canvas.add(text);
}
if(refLudi.type=="dom"){
refLudi.realwidth = refLudi.width;
refLudi.realheight = refLudi.height;
var text = new rectLudiscape({
left: ol,
top: ot,
width: ow,
height: oh,
borderColor :'black',
label:'',
stroke: 'white',
strokeWidth: 0,
fontSize : 14,
fill: '',
textColor : 'black',
stroke : 'pink',
strokeWidth : 0.5
});
text.lockRotation = true;
text.hasRotatingPoint = false;
text.lockScalingY = false;
text.lockScalingX = false;
text.lockMovementX = false;
text.hasControls = true;
text.hasBorders  = true;
text.setControlsVisibility({
mt: false,
mb: true,
mr: true,
ml: false,
bl: false,
br: false,
tl: false,
tr: false,
mtr: false,
});
text.id = uid;
OptsHandles(text,refLudi);
canvas.add(text);
}
if(refLudi.type=="objframe"){
refLudi.realwidth = refLudi.width;
refLudi.realheight = refLudi.height;
var text = new rectLudiscape({
left: ol,
top: ot,
width: ow,
height: oh,
borderColor :'black',
label:'',
stroke: 'white',
strokeWidth: 0,
fontSize : 14,
fill: '',
textColor : 'black',
stroke : 'purple',
strokeWidth : 0.5
});
text.lockRotation = true;
text.hasRotatingPoint = false;
text.lockScalingY = false;
text.lockScalingX = false;
text.lockMovementX = false;
text.hasControls = true;
text.hasBorders  = true;
text.setControlsVisibility({
mt: false,
mb: true,
mr: true,
ml: false,
bl: false,
br: false,
tl: false,
tr: false,
mtr: false,
});
text.id = uid;
OptsHandles(text,refLudi);
canvas.add(text);
}
if(refLudi.type=="infopoint"){
var infopointsrc = refLudi.data;
fabric.util.loadImage(infopointsrc,function(img){
var legimg = new fabric.Image(img,{
left : ol,top  : ot,
scaleX : ow / img.width,
scaleY : oh / img.height
});
legimg.id = uid;
legimg.lockRotation = true;
legimg.lockScalingY = true;
legimg.lockScalingX = true;
legimg.lockMovementX = false;
legimg.hasRotatingPoint = false;
legimg.hasControls = false;
OptsHandles(legimg,refLudi);
canvas.add(legimg);
});
}
if(refLudi.type=="metaobject"){
var infopointsrc = refLudi.data;
fabric.util.loadImage(infopointsrc,function(img){
var legimg = new fabric.Image(img,{
left : ol,top  : ot,
scaleX : ow / img.width,
scaleY : oh / img.height
});
legimg.id = uid;
legimg.lockRotation = true;
legimg.lockScalingY = true;
legimg.lockScalingX = true;
legimg.lockMovementX = false;
if (refLudi.text7=='panelslide') {
legimg.lockMovementX = true;
}
legimg.hasRotatingPoint = false;
legimg.hasControls = false;
OptsHandles(legimg,refLudi);
canvas.add(legimg);
});
}
if(refLudi.type=="buttonarea"){
refLudi.realwidth = refLudi.width;
refLudi.realheight = refLudi.height;
var text = new rectLudiscape({
left: ol,
top: ot,
width: ow,
height: oh,
borderColor :'black',
label:'',
stroke: 'white',
strokeWidth: 0,
fontSize : 14,
fill: '',
textColor : 'black',
stroke : 'pink',
strokeWidth : 0.5
});
text.lockRotation = true;
text.hasRotatingPoint = false;
text.lockScalingY = false;
text.lockScalingX = false;
text.lockMovementX = false;
text.hasControls = true;
text.hasBorders  = true;
text.setControlsVisibility({
mt: false,
mb: true,
mr: true,
ml: false,
bl: false,
br: false,
tl: false,
tr: false,
mtr: false,
});
text.id = uid;
OptsHandles(text,refLudi);
canvas.add(text);
}
if(refLudi.type=="tcm"){
refLudi.realwidth = refLudi.width;
refLudi.realheight = refLudi.height;
var text = new rectLudiscape({
left: ol,
top: ot,
width: ow,
height: oh,
borderColor :'#A9E2F3',
label: '',
fontSize : 18,
fill: '',
textColor : 'black'
});
text.lockRotation = true;
text.hasRotatingPoint = false;
text.lockScalingY = false;
text.lockScalingX = false;
text.lockMovementX = false;
text.hasControls = true;
text.hasBorders  = true;
text.id = uid;
text.setControlsVisibility({
mt: false,
mb: true,
mr: true,
ml: false,
bl: false,
br: false,
tl: false,
tr: false,
mtr: false,
});
OptsHandles(text,refLudi);
canvas.add(text);
}
if(refLudi.type=="title"){
var txt = refLudi.text;
if(isTxtHtml(refLudi.text)){
txt = "";
}
var text = new rectLudiscape({
left: ol,
top: ot,
width: ow,
height: oh,
borderColor :'#A9E2F3',
label: txt,
fontSize : 20,
fill: '',
textColor : 'white'
});
titleBase = refLudi.text;
text.lockRotation = true;
text.lockScalingY = true;
text.lockScalingX = true;
text.lockMovementX = false;
text.hasRotatingPoint = false;
text.hasControls = false;
text.hasBorders  = true;
text.id = uid;
OptsHandles(text,refLudi);
canvas.add(text);
canvas.bringToFront(text)
}
if(refLudi.type=="button"){
var svg = new String(getBaseBouton(ow,oh,refLudi));
fabric.loadSVGFromString(svg, function(objects, options) {
var obj = fabric.util.groupSVGElements(objects, options);
obj.left = ol;
obj.top = ot;
obj.scaleX = 1;
obj.scaleY =  1;
obj.lockRotation = true;
obj.lockScalingY = true;
obj.lockScalingX = true;
obj.lockMovementX = false;
obj.hasRotatingPoint = false;
obj.hasControls = false;
obj.hasBorders  = true;
obj.id = uid;
OptsHandles(obj,refLudi);
canvas.add(obj);
});
}
if(refLudi.type=="input"){
var svg = new String(getBaseInput(ow,oh,refLudi));
fabric.loadSVGFromString(svg, function(objects, options) {
var obj = fabric.util.groupSVGElements(objects, options);
obj.left = ol;
obj.top = ot;
obj.scaleX = 1;
obj.scaleY =  1;
obj.lockRotation = true;
obj.lockScalingY = true;
obj.lockScalingX = true;
obj.lockMovementX = false;
obj.hasRotatingPoint = false;
obj.hasControls = false;
obj.hasBorders  = true;
obj.id = uid;
OptsHandles(obj,refLudi);
canvas.add(obj);
});
}
if(refLudi.type=="variable"){
var svg = new String(getBaseVariable(ow,oh,refLudi));
fabric.loadSVGFromString(svg, function(objects, options) {
var obj = fabric.util.groupSVGElements(objects, options);
obj.left = ol;
obj.top = ot;
obj.scaleX = 1;
obj.scaleY =  1;
obj.lockRotation = true;
obj.lockScalingY = true;
obj.lockScalingX = true;
obj.lockMovementX = false;
obj.hasRotatingPoint = false;
obj.hasControls = false;
obj.hasBorders  = true;
obj.id = uid;
OptsHandles(obj,refLudi);
canvas.add(obj);
});
}
if(refLudi.type=="fluxPts"){
var fluxPtsSrc = 'img/flux-add.png';
if(UrlExists(fluxPtsSrc)){
fabric.util.loadImage(fluxPtsSrc, function(img){
var legimg = new fabric.Image(img,{
left : ol,top  : ot,
scaleX : ow / img.width,
scaleY : oh / img.height
});
legimg.id = uid;
legimg.preserveObjectStacking = true;
legimg.lockRotation = true;
legimg.lockScalingY = true;
legimg.lockScalingX = true;
legimg.lockMovementX = false;
legimg.hasRotatingPoint = false;
legimg.hasControls = false;
legimg.hasBorders  = true;
OptsHandles(legimg,refLudi);
canvas.add(legimg);
});
}else{
var imgsrc = 'img/error.png';
fabric.util.loadImage(imgsrc, function(img){
var legimg = new fabric.Image(img,{
left : ol,
top  : ot,
scaleX : ow / rw,
scaleY : oh / rh
});
legimg.id = uid;
canvas.add(legimg);
});
}
}
if(refLudi.type=="helper"){
if(refLudi.text=="test"){
var imgsrc = refLudi.data;
var svg = new String(getBaseHelper(453,210,refLudi));
fabric.loadSVGFromString(svg, function(objects, options) {
var obj = fabric.util.groupSVGElements(objects, options);
obj.left = ol;
obj.top = ot;
obj.scaleX = ow/rw;
obj.scaleY = oh/rh;
obj.lockRotation = true;
obj.lockScalingY = true;
obj.lockScalingX = true;
obj.lockMovementX = true;
obj.hasControls = false;
obj.hasRotatingPoint = false;
obj.id = uid;
OptsHandles(obj,refLudi);
canvas.add(obj);
});
}else{
var imgsrc = refLudi.data;
fabric.util.loadImage(imgsrc, function(img){
var legimg = new fabric.Image(img,{
borderColor :'white',
left : ol,
top  : ot,
scaleX : ow / img.width,
scaleY : oh / img.height
});
legimg.id = uid;
legimg.lockRotation = true;
legimg.lockScalingY = true;
legimg.lockScalingX = true;
legimg.lockMovementX = false;
legimg.hasRotatingPoint = false;
legimg.hasControls = false;
legimg.hasBorders  = true;
legimg.lockMovementX = true;
legimg.lockMovementY = true;
canvas.add(legimg);
});
}
}
}else{
}
}
function correctUrlImg(imgsrc){
if(typeof(imgsrc)=='undefined'){
imgsrc = "";
}
if(imgsrc=='undefined'){
imgsrc = "";
}
if(imgsrc.indexOf("assets")==-1){
imgsrc = folderAllImages + imgsrc;
}
if(imgsrc.indexOf("ssets/aaoel")!=-1){
imgsrc = folderAllImages + findNameOfFile(imgsrc);
} else {
if(imgsrc.indexOf("/assets/")!=-1){
imgsrc = folderAllImages + findNameOfFile(imgsrc);
}
}
if(imgsrc.indexOf("img")!=-1&&imgsrc.indexOf("playvideo.png")!=-1){
imgsrc = folderAllImages + "playvideo.png";
}
if(imgsrc.indexOf("img/bulle")!=-1&&imgsrc.indexOf("assets")!=-1){
imgsrc = imgsrc.replace("img/bulle", "bulle");
}
return imgsrc;
}
function correctLocalUrlImg(imgsrc){
if(imgsrc.indexOf("file:")!=-1||imgsrc.indexOf("Users/")!=-1){
if(imgsrc.indexOf("plugins/")!=-1){
var folderPlugins = folderAllImages.replace("assets", "plugins");
var local = findNameOfFileForPlugins(imgsrc);
newimgsrc = 'file:///' + folderPlugins + local;
newimgsrc = newimgsrc.replace(/\\/g, "/");
console.log(imgsrc + ' correctLocalUrlImg ' + newimgsrc);
imgsrc = newimgsrc;
}
}
return imgsrc;
}
function findNameOfFile(imgsrc){
if(imgsrc.indexOf("/")!=-1){
imgsrc = imgsrc.substring(imgsrc.lastIndexOf('/')+1);
}
if(imgsrc.indexOf("\\")!=-1){
imgsrc = imgsrc.substring(imgsrc.lastIndexOf('\\')+1);
}
return imgsrc;
}
function findNameOfFileForPlugins(imgsrc){
if(imgsrc.indexOf("/")!=-1){
imgsrc = imgsrc.substring(imgsrc.lastIndexOf('plugins/')+8);
}
if(imgsrc.indexOf("\\")!=-1){
imgsrc = imgsrc.substring(imgsrc.lastIndexOf('plugins\\')+8);
}
return imgsrc;
}
function drwImageDataMini(processId,ctx,index){
for (var i = 0; i < CLudisCount; i++){
var obj = CLudis[i];
if (obj.supp==0) {
if (obj.pageId==processId) {
if (obj.type=='barre') {
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
var indexImg = 0;
for (var i = 0; i < CLudisCount; i++){
var obj = CLudis[i];
if (obj.supp==0) {
if (obj.pageId==processId) {
if (obj.type=='img'||obj.type=='bilan'||obj.type=='plugin') {
var x = parseInt(obj.x * 0.16);
var y = parseInt(obj.y * 0.16);
var dw = parseInt(obj.width * 0.16);
var dh = parseInt(obj.height * 0.16);
drwImgLittle(ctx,indexImg,correctUrlImg(obj.data),x,y,dw,dh);
indexImg++;
}
if (obj.type=='plugme') {
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
if (obj.type=='video'||obj.type=='videomp4') {
var axt = parseInt(obj.x * 0.16);
var ayt = parseInt(obj.y * 0.16);
var awt = parseInt(obj.width * 0.16);
var aht = parseInt(obj.height * 0.16);
ctx.beginPath();
ctx.lineWidth = 0.5;
ctx.strokeStyle = 'gray';
ctx.fillStyle = 'black';
ctx.fillRect(axt, ayt, awt, aht);
ctx.stroke();
if (obj.type=='video') {
var imgVid = new Image();
imgVid.onload = function() {
var objIm = CLudis[imgVid.id];
var x = parseInt(objIm.x * 0.16);
var y = parseInt(objIm.y * 0.16);
var dw = parseInt(objIm.width * 0.16);
var dh = parseInt(objIm.height * 0.16);
ctx.drawImage(imgVid, x, y, dw, dh);
};
var srcimg = correctUrlImg(obj.data);
imgVid.id = i;
imgVid.src = srcimg;
}
}
if (obj.type=='speech') {
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
if(obj.type=='metaobject') {
if (obj.text8=='showstarfx') {
var qcmx = parseInt(obj.x * 0.16);
var qcmy = parseInt(obj.y * 0.16);
var qcmdw = parseInt(obj.width * 0.16);
var qcmdh = parseInt(obj.height * 0.16);
var imgmeta = new Image();
imgmeta.onload = function() {
ctx.drawImage(imgmeta, qcmx, qcmy, qcmdw, qcmdh);
};
imgmeta.src = obj.data;
}
}
if(obj.type=='texthtml'){
var qcmx = parseInt(obj.x * 0.16);
var qcmy = parseInt(obj.y * 0.16);
var qcmdw = parseInt(obj.width * 0.16);
var qcmdh = parseInt(obj.height * 0.16);
var imgSB = new Image();
imgSB.onload = function() {
ctx.drawImage(imgSB, qcmx, qcmy, qcmdw, qcmdh);
};
imgSB.src = 'img/helper/smartbloc1.jpg';
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
if(obj.type=='label'){
var xt = parseInt(obj.x * 0.16);
var yt = parseInt(obj.y * 0.16);
var dwt = parseInt(obj.width * 0.16);
var dht = parseInt(obj.height * 0.16);
ctx.beginPath();
ctx.lineWidth = 0.5;
ctx.strokeStyle = 'black';
ctx.rect(xt, yt, dwt, dht);
ctx.stroke();
}
}
}
}
rectangleNumPage(ctx,index);
}
function drwImgLittle(ctx,indImg,src,x,y,dw,dh){
if (indImg==0) {
var img = new Image();
img.onload = function() {
ctx.drawImage(img, x, y, dw, dh);
};
img.id = indImg;
img.src = src;
}
if (indImg==1) {
var img1 = new Image();
img1.onload = function() {
ctx.drawImage(img1, x, y, dw, dh);
};
img1.id = indImg;
img1.src = src;
}
if (indImg==2) {
var img2 = new Image();
img2.onload = function() {
ctx.drawImage(img2, x, y, dw, dh);
};
img2.id = indImg;
img2.src = src;
}
if (indImg==3) {
var img3 = new Image();
img3.onload = function() {
ctx.drawImage(img3, x, y, dw, dh);
};
img3.id = indImg;
img3.src = src;
}
if (indImg==4) {
var img4 = new Image();
img4.onload = function() {
ctx.drawImage(img4, x, y, dw, dh);
};
img4.id = indImg;
img4.src = src;
}
if (indImg==5) {
var img5 = new Image();
img5.onload = function() {
ctx.drawImage(img5, x, y, dw, dh);
};
img5.id = indImg;
img5.src = src;
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
drwImageDataMini(processId,ctx,pa.index);
getImageDataMiniV2(processId,pa,ctx);
};
imgBack.src = folderAllImages + pa.back;
}else{
drwImageDataMini(processId,ctx,pa.index);
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
function rectangleNumPage(ctx,index) {
ctx.fillStyle = 'black';
ctx.fillRect(-1,88,25,25);
ctx.fill();
ctx.fillStyle = 'white';
ctx.fillRect(0,89,23,23);
ctx.fill();
index = parseInt(index);
ctx.font = "14px Arial";
ctx.fillStyle = 'black';
ctx.textBaseline = 'middle';
ctx.textAlign = "center";
if (index<10) {
ctx.fillText(index,9,101);
} else {
ctx.fillText(index,8,101);
}
}
function ludiInit(){
var h = '';
h += '<div class="pspeedpage" onClick="launchRapidRender(-1);" >';
h += '</div>';
h += '<div class="pslogs" onClick="$(\'#voirleslogs\').fadeIn();" >';
h += '</div>';
$('.menu-ecran').append(h);
var p = panneauxTools();
p += questionQcmEdit();
p += listeEcransEdit() + questionEdit();
p += questionEditDelete() + actionEdit();
p += imageEditZone() + videoEdit() + editAudioMp3Zone();
p += tcmEditZone() + lcmEditZone() + extraCodeEditZone();
p += actionsEdit() + objectEditId() + editVideoMp4Zone();
p += colorChoiceZone() + pageEditOptions() + formatButtonObject();
p += exceptionExtraWindows() + databaseEditZone();
p += animEditObject()+ propertiesObject();
p += extraCustomFilesEditZone();
p += editIframeZone() + renderPdfAreaZone();
$('body').append(p);
var be = barreEdit();
$('.toolbarZoneTexteDiv').html(be);
var mp = '<a style="position:absolute;left:15px;bottom:15px;" ';
mp += ' onclick="closeEdit();" ';
mp += 'class="validation noselectmouse" >' + getTrd('cancel') + '</a>';
mp += '<a style="position:absolute;right:15px;bottom:15px;" ';
mp += 'onclick="setSourceTextV2();closeEdit();" ';
mp += 'class="btnSave noselectmouse" >' + getTrd('save') + '</a>';
$('#editzoneV2').append(mp);
$('#editzoneV2').addClass('pan');
$('#editzoneV2').addClass(TYPEWIND + 'osBorder');
var mpV3 = '<a style="position:absolute;left:15px;bottom:15px;" ';
mpV3 += ' onclick="closeEdit();" ';
mpV3 += 'class="validation noselectmouse" >' + getTrd('cancel') + '</a>';
mpV3 += '<a style="position:absolute;left:130px;bottom:15px;" ';
mpV3 += 'onclick="showSelImgChangeContent();" ';
mpV3 += 'class="btnuploadimage noselectmouse" >&nbsp;&nbsp;&nbsp;</a>';
mpV3 += '<a style="position:absolute;left:240px;bottom:15px;" ';
mpV3 += 'onclick="showScriptEdit(2);" ';
mpV3 += 'class="btnparamscss noselectmouse" >&nbsp;&nbsp;&nbsp;</a>';
mpV3 += '<a style="position:absolute;right:15px;bottom:15px;" ';
mpV3 += 'onclick="setSourceTextV3();closeEdit();" ';
mpV3 += 'class="btnSave noselectmouse" >' + getTrd('save') + '</a>';
$('#editzoneContent').append(mpV3);
$('#editzoneContent').addClass('pan').addClass(TYPEWIND + 'osBorder');
var mpV4 = barreEdit();
$('#editscript').prepend(mpV4);
}
function panneauxTools(){
var p = '';
p += '<div class="notequestion pan" onClick="showEditNote();" >';
p += '<div class="remarqueview" ></div>';
p += '<div class="noteview" ></div>';
p += '</div>';
p += '<div class="actiondelete pan" onClick="showEditDelete(0);" ></div>';
p += '<div class="actiondeleteb pan" onClick="showEditDelete(0);" ></div>';
p += '<div class="actionposition pan" onClick="changeSourceSpeech();" ></div>';
p += '<div class="editquestion pan" onClick="showEditZone();" ></div>';
p += '<div class="actionaddfluxpts pan" onClick="addFluxPts();" ></div>';
p += '<div class="micro-save" ></div>';
return p;
}
function ludiCss(nam){
closePan();
closeMove();
$('.' + nam).css("display","block");
$('.opacedit').css("display","block");
$('.opacedit').css("top","103px");
$('.opacedit').css("left","0px");
}
function ludiCssNoPan(nam){
closePan();
closeMove();
$('.' + nam).css("display","block");
$('.opacedit').css("display","block");
$('.opacedit').css("top","103px");
$('.opacedit').css("left","0px");
}
function optMenu(){
optHideAll();
$('.menu-options').css("display","block");
}
function optCustom(){
optHideAll();
$('.menu-custom').css("display","block");
}
function optExport(){
optHideAll();
$('.menu-export').css("display","block");
}
function optImport(){
optHideAll();
$('.menu-import').css("display","block");
}
function optHideAll(){
$('#editExtraCustomFiles').css("display","none");
$('#editExtraCode').css("display","none");
$('.menu-options').css("display","none");
$('.menu-custom').css("display","none");
$('.menu-export').css("display","none");
$('.menu-import').css("display","none");
}
function showLogsInfos(){
const electron = require('electron');
const ipc = electron.ipcRenderer;
ipc.send('message',{key:'logsopt',path:'logsopt'});
$('.menu-options').css("display","none");
}
function closePan(){
var pan = $('.pan');
pan.css("display","none");
$('.opacedit').css("left","0px");
$('#pann-objectfx').hide();
optHideAll();
typeCodeEdit = -1;
}
function closeMove(){
if(typeof MoveObjectLudi!=="undefined"){
MoveObjectLudi.set('left',-50);
}
}
function listeEcransEdit(){
var p = '<div id="g-block" class="global-block" data-force="30" >';
p += '<div id="g-block-ordo" class="block-reordonne" onClick="reOrdonne();" ></div>';
p += '<div id="g-block-ordo-stop" class="block-stopedit" onClick="endOrdonne();" ></div>';
p += '<ol id="listecrans" class="listecrans" >';
p += '</ol>';
p += '<div id="addecrans" onClick="pageAdd();" ></div>';
p += '<div class="forceload" onClick="forceLoadProcess()" ></div>';
p += '</div>';
return p;
}
function forceLoadProcess(){
lessonid = 'forcefile';
finishLoadJson=true;
initLoadJson=1;
GPageId = guid();
var objTemp = new CPage();
objTemp.pageId = GPageId;
objTemp.index = 0;
CPagesAdd(objTemp);
ajoutLudiBARRE();
eventPages = true;
finishLoadJson=true;
initLoadJson=1;
CPagesPaint();
loadPage(GPageId,1);
finishLoadData = true;
$("#initgeneration,.opacedit,.forceload").css("display","none");
CPagesPaint();
}
function isMetaObjectHaveText(obj) {
var b = false;
if (obj.type=='metaobject') {
if (obj.text7=='panelcenter') {
b = true;
}
if (obj.text7=='panelslide') {
b = true;
}
if (obj.text7=='checkpoint') {
b = true;
}
}
return b;
}
function showEditMetaObject(obj){
if (obj.type=='metaobject') {
if (obj.text7=='timer') {
var objWind = new CWindow();
objWind.id = obj.type + obj.text7;
objWind.name = getTrd("edition") +  ' timer';
objWind.addControl("double:Time&nbsp;(sec)=>text3|number");
objWind.addControl("actionsel:Action=>text2|");
objWind.showDialog('');
}
if (obj.text7=='showstarfx') {
var objWind = new CWindow();
objWind.id = obj.type + obj.text7;
objWind.name = getTrd("edition") +  ' Golden stars';
objWind.addControl("double:Star&nbsp;1=>text2|number");
objWind.addControl("double:Star&nbsp;2=>text3|number");
objWind.addControl("double:Star&nbsp;2=>text4|number");
objWind.showDialog('');
}
}
}
var folderAllAudio = "";
function launchAudioMp3Zone(obj){
$('.opacedit,#editAudioMp3').css("display","block");
$('#Mp3EditSelect').html(obj.text);
audioMp3Overview(obj.text);
if(obj.val2==0){
document.getElementById('audioMp3Nextpage').checked = false;
}else{
document.getElementById('audioMp3Nextpage').checked = true;
}
if(obj.val3==0){
document.getElementById('audioMp3Autoplay').checked = false;
}else{
document.getElementById('audioMp3Autoplay').checked = true;
}
}
function editAudioMp3Zone(){
var p = '<div id="editAudioMp3" class="editAudioMp3 pan ' + TYPEWIND + 'osBorder" >';
p += barEditWind('Audio Mp3');
p += '<p style="margin-top:25px;" >&nbsp;&nbsp;&nbsp;&nbsp;Audio&nbsp;:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;';
p += '<span id="Mp3EditSelect" style="width:260px;" ';
p += 'onclick="audioUpload();" ';
p += ' class="fakeSelect" >...</span></p>';
p += '<div id="overviewaudiomp3" class="overviewaudio" ><audio>';
p += '<source src="no.mp3" >';
p += '</audio></div>';
p += lineCheckBox('audioMp3Autoplay',getTrd("autoplay"));
p += '<a style="position:absolute;left:15px;bottom:15px;" ';
p += ' onclick="closeEdit();" ';
p += 'class="validation lblcancel" >' + getTrd('cancel') + '</a>';
p += '<a style="position:absolute;right:15px;bottom:15px;" ';
p += 'onclick="audioMp3Save();" ';
p += 'class="btnSave lblsave" >' + getTrd('save') + '</a>';
p += '</div>';
return p;
}
function audioUpload(){
const electron = require('electron');
const ipc = electron.ipcRenderer;
ipc.send('message',{key:'uploadaudio'});
setTimeout(function(){
controlReceptionAudioUpload();
},300);
}
function audioMp3Save(){
var obj = CLudis[GlobalUid];
if($('#Mp3EditSelect').html().indexOf(".mp3")!=-1){
obj.text = $('#Mp3EditSelect').html();
}else{
obj.text = "...";
}
if(document.getElementById('audioMp3Autoplay').checked){
obj.val3 = 1;}else{obj.val3 = 0;}
closeEdit();
}
function audioMp3Overview(idaudio){
if(typeof idaudio === "undefined"){
idaudio = '';
}
if(idaudio.indexOf(".mp3")!=-1){
folderAllAudio = folderAllPlugins.replace("plugins","assets");
var h = '<audio controls>';
h += '<source src="' + folderAllAudio + idaudio +'" type="audio/mpeg">';
h += '</audio>';
$('#overviewaudiomp3').html(h);
}
}
function controlReceptionAudioUpload(){
if ($('#editAudioMp3').is(':visible')) {
var remote = require('electron').remote;
var dataAudio = remote.getGlobal('sharedObj').dataAudio;
if(dataAudio==''){
setTimeout(function(){
controlReceptionAudioUpload();
},300);
}else{
$('#Mp3EditSelect').html(dataAudio);
audioMp3Overview(dataAudio);
}
}
}
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
p += 'class="btnSave lblsave" >' + getTrd('cancel') + '</a>';
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
p += lineCheckBox('videoMp4Autoplay',getTrd("autoplay"));
p += '<div class="listVideoMp4boutons" >';
p += '<a style="float:left;" onclick="closeEdit();" ';
p += 'class="validation lblcancel" >' + getTrd('cancel') + '</a>';
p += '<a style="float:right;margin-right:10px;" ';
p += 'onclick="videoMp4Save();" ';
p += 'class="btnSave lblsave" >' + getTrd('save') + '</a>';
p += '</div>';
p += '</div>';
return p;
}
function minimalLineCheckBox(id,lab){
var p = '<div style="position:relative;margin-left:5px;';
p += ';width:260px;margin-top:14px;margin-bottom:4px;" >';
p += '<label style="margin-top:1px;" ';
p += ' class="el-switch el-switch-green" >';
p += '<input id="'+id+'" type="checkbox" name="switch" >';
p += '<span class="el-switch-style"></span>';
p += '</label>';
p += '<span class="margin-r" ';
p += ' style="position:absolute;left:45px;top:0px;"  >';
p += '&nbsp;'+lab+'</span>';
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
function CPage(){
this.id;
this.pageId;
this.index;
this.data;
this.back;
this.backsvg;
this.back2;
this.back2svg;
this.screen;
this.script;
this.havemin;
this.transition;
this.title;
this.komessage;
this.isCreate;
this.supp;
this.comicMode;
this.showElement = function(){
var i = this.pageId;
if(!document.getElementById('page' + i)){
var p = '<li id="lip' + i + '" class="pagecl ' + i + '" ';
p += ' style="border:solid 1px gray;" >';
p += ' <canvas class="imgpage" id="page' + i + '" ';
p += ' onClick="loadPage(\'' + i + '\',1);" ';
p += ' class="ecranmini" width="150" height="110" >';
p += '<canvas>';
p += '</li>';
$('#listecrans').append(p);
$('#lip' + i).append('<div class=pagedeleteb onClick="pageDelete=\'' + i + '\';showEditDelete(1);" ></div>');
$('#lip' + i).append('<div class=pageduplica onClick="duplikPageFct(\'' + i + '\');" ></div>');
}
}
}
var CPages = new Array();
var CPagesCount = 0;
function CPagesAdd(Elem){
if(GPageId==''){
return false;
}
Elem.havemin = 0;
Elem.supp = 0;
Elem.id = CPagesCount;
CPages.push(Elem);
CPagesCount = CPagesCount + 1;
}
function CPagesPaint(){
for(var i=0;i<CPagesCount;i++){
var pa = CPages[i];
if(typeof pa === "undefined") {
}else{
if(CPages[i].supp==0){
CPages[i].showElement();
CPages[i].index = i;
}
}
}
}
function CPagesResetAll(){
$('#listecrans').html('');
CPagesPaint();
}
var CPagesCountNew  = 0;
function reordonnePages(){
CPagesCountNew  = 0;
var CPagesNew = new Array();
$('#listecrans').find('li').each(function(){
var clsId = $(this).attr('class');
clsId = clsId.replace('pagecl','');
clsId = clsId.replace(' ','');
var actuPage = GetPageById(clsId);
if(typeof actuPage==="undefined") {
}else{
if(actuPage.supp==0){
var Elem = new CPage();
Elem.id = CPagesCountNew;
Elem.pageId = actuPage.pageId;
Elem.index = actuPage.index;
Elem.data = actuPage.data;
Elem.script = actuPage.script;
Elem.back = actuPage.back;
Elem.screen = actuPage.screen;
Elem.comicMode = actuPage.comicMode;
Elem.havemin = 0;
Elem.isCreate = false;
Elem.supp = 0;
CPagesNew.push(Elem);
CPagesCountNew = CPagesCountNew + 1;
}
}
});
CPages = CPagesNew;
eventPages = true;
createRenderPagesJSON();
}
function deletePagesG(){
pageDelete=GPageId;
showEditDelete(1);
}
function deletePages(pId){
if(nbPages()>1){
$('#lip' + pId).html('').addClass("pagedeleteicone");
setTimeout('$("#lip' + pId + '").css("display","none");',2000);
var actuPage = GetPageById(pId);
actuPage.supp = 1;
eventPages = true;
CPagesPaint();
loadPage(GPageId,1);
}else{
endOrdonne();
}
}
function duplikPageFct(i){
pageDuplica = i;
duplikPages();
}
function duplikPages(){
var precPage = GetPageById(pageDuplica);
var oldP = pageDuplica;
GPageId = guid();
var objTemp = new CPage();
objTemp.pageId = GPageId;
objTemp.index = 0;
objTemp.script = precPage.script;
objTemp.back = precPage.back;
objTemp.screen = precPage.screen;
objTemp.comicMode = precPage.comicMode;
CPagesAdd(objTemp);
var CDuplikLudis = new Array();
for (var i = 0; i < CLudisCount; i++){
if(CLudis[i].supp==0){
if(CLudis[i].pageId==oldP){
var ob = cloneObj(i);
CDuplikLudis.push(ob);
}
}
}
for (var e = 0; e < CDuplikLudis.length; e++) {
CDuplikLudis[e].pageId = GPageId;
CLudisAdd(CDuplikLudis[e])
}
eventPages = true;
eventObjects = true;
$('#lip' + oldP).after('<li id="lip' + GPageId + '" class="pagecl ' + GPageId + '" ></li>');
endOrdonne();
}
function nbPages(){
var n = 0;
for(var i=0;i<CPagesCount;i++){
var pa = CPages[i];
if(typeof pa === "undefined") {
}else{
if(CPages[i].supp==0){
n = n + 1;
}
}
}
return n;
}
function GetNumPageById(pageId){
var b = 0;
for(var i=0;i<CPagesCount;i++){
if(CPages[i].supp==0){
if(CPages[i].pageId==pageId){
return b;
}
b = b + 1;
}
}
}
function GetPageById(pageId){
for(var i=0;i<CPagesCount;i++){
if(CPages[i].pageId==pageId){
var obj = CPages[i];
return CPages[i];
}
}
}
function GetPageByNum(pageNum){
var obj = -1;
var b = 0;
for(var i=0;i<CPagesCount;i++){
if(CPages[i].supp==0){
if(b==pageNum){
obj = CPages[i];
}
b = b + 1;
}
}
if (obj==-1){
pageAdd();
obj = GetPageById(GPageId);
}
return obj;
}
function PageExist(pageId){
for(var i=0;i<CPagesCount;i++){
var obj = CPages[i];
if (typeof obj === "undefined") {
}else{
if(obj.supp==0){
if(obj.pageId==pageId){
return true;
}
}
}
}
return false;
}
function GetNewPage(pageId){
for(var i=0;i<CPagesCount;i++){
if(CPages[i].pageId!=pageId){
var obj = CPages[i];
if(obj.supp==0){
return CPages[i].pageId;
}
}
}
return '';
}
function processPagesMini(){
if(finishLoadData){
for(var i=0;i<CPagesCount;i++){
if (typeof(CPages[i])!="undefined"){
if(CPages[i].havemin==0){
CPages[i].havemin = 1;
getImageDataMini(CPages[i].pageId);
setTimeout(function(){processPagesMini();},300);
return false;
}
}
}
setTimeout(function(){processPagesMini();},1000);
} else {
setTimeout(function(){processPagesMini();},1000);
}
}
function pageAdd(){
if(GPageId==''){
showExeptionWin();
return false;
}
eventPages = true;
GPageId = guid();
var objTemp = new CPage();
objTemp.pageId = GPageId;
objTemp.index = 0;
objTemp.back = 'white.jpg';
objTemp.screen = getApplikScreen();
objTemp.comicMode = 0;
objTemp.transition = 'Direct';
objTemp.title = '';
if(isNonePage()){
objTemp.comicMode = 4;
}
CPagesAdd(objTemp);
CPagesPaint();
loadPage(GPageId,1);
closePan();
if(isNonePage()){
}else{
ajoutLudiBARRE();
}
eventPages = true;
}
function loadPage(UidPage,helperAdd) {
var pa = GetPageById(UidPage);
if(typeof pa === "undefined"){
UidPage = GetNewPage();
var pa = GetPageById(UidPage);
if (typeof pa === "undefined"){
return false;
}
}
if(pa.supp==1){
UidPage = GetNewPage();
var pa = GetPageById(UidPage);
if (typeof pa === "undefined"){
return false;
}
}
getIntroH = false;
getQcmH = false;
getButtonH = false;
closePan();
$('#GlobalMenuFormat').css("display","none");
$('.toolsMenuFormat').css('visibility','hidden');
$(".pagecl").css("border","solid 3px #D8D8D8");
GPageId = UidPage;
if(pa.back==''){
pa.back='white.jpg';
}else if(pa.back=='undefined'){
pa.back='white.jpg';
}
if(typeof pa.back === "undefined"){
pa.back = 'white.jpg';
}
if(pa.back2==''){
pa.back2='white.jpg';
}else if(pa.back2=='undefined'){
pa.back2='white.jpg';
}
if(typeof pa.back2 === "undefined"){
pa.back2 = 'white.jpg';
}
var pathPath = folderAllImages + pa.back;
if (EDITORMODE==1) {
pathPath = folderAllImages + pa.back2;
}
loadImgBackCanvas(pathPath);
if(pa.comicMode>0){
var pco = parseInt(pa.comicMode);
var pathPath = folderAllImages + "comic-0" + pco + ".png";
canvas.setOverlayImage(pathPath, canvas.renderAll.bind(canvas));
}else{
canvas.overlayImage = null;
canvas.renderAll.bind(canvas);
}
if(typeof pa.screen === "undefined"){
pa.screen = '';
}
if(pa.screen==''){
$(".backScreenDiv").css("background-image",'none');
}else{
var pathScreen = 'file:///' + folderAllImages + pa.screen;
pathScreen = pathScreen.replace(/\\/g, "/");
$(".backScreenDiv").css("background-image",'url(' + pathScreen + ')');
console.log("PathScreen : " + pathScreen);
}
$("." + GPageId).css("border","solid 3px #019875");
$("." + GPageId).css("border-left","solid 5px #019875");
$("." + GPageId).css("border-right","solid 1px #019875");
$("." + GPageId + ".listecrans li").css("border-right","solid 1px #019875");
canvas.clear();
createObjectLudi = false;
addMoveCursor();
for (var i = 0; i < CLudisCount; i++){
CLudis[i].isCreate = false;
}
closePan();
CLudisPaint();
closePan();
if (helperAdd==1) {
ajoutLudiHELPER();
}
noSizeCanvas = 0;
}
var GlobalSortable;
function reOrdonne(){
$(".mparamspage").css("display","block");
$("#g-block-ordo").css("display","none");
$("#g-block-ordo-stop").css("display","block");
$(".pagedeleteb").css("display","block");
$(".pageduplica").css("display","block");
$("#listecrans").sortable({
onDrop: function ($item, container, _super, event){
$item.removeClass(container.group.options.draggedClass).removeAttr("style");
$("body").removeClass(container.group.options.bodyClass);
reordonnePages();
eventPages = true;
},
placeholder : '<li class="placeholder" ></li>'
});
$("#listecrans").sortable('enable');
}
function endOrdonne(){
$(".mparamspage").css("display","none");
$("#listecrans").sortable('disable');
$("#g-block-ordo").css("display","block");
$("#g-block-ordo-stop").css("display","none");
$(".pagedeleteb").css("display","none");
$(".pageduplica").css("display","none");
reordonnePages();
CPagesResetAll();
loadPage(GPageId,0);
}
var nombre = 0;
function nb_aleatoire(nb){
nombre= Math.floor(Math.random() * nb)+1;
}
function guid(){
var tirage = new Array;
var lettre = new Array;
var nombres="";
nb = 7;
for (i=1 ;i<nb ;i++)
{
nb_aleatoire(50);
tirage[i]= nombre;
for (t=1 ; t<i ;t++){
if (tirage[t]==nombre)
{
i=i-1;
}
}
}
var characts = 'abcdefghijklmnopqrstuvwzabcdefghijklmnopqrstuvwz';
for (i=1 ;i<nb ;i++)
{
nb_aleatoire(26);
c = characts.substr(nombre,1)
nombres= nombres + tirage[i] + c ;
}
return nombres;
}
function guid4(){
var tirage = new Array;
var lettre = new Array;
var nombres = "";
nb = 3;
for (i=1 ;i<nb ;i++)
{
nb_aleatoire(20);
tirage[i]= nombre;
for (t=1 ; t<i ;t++){
if (tirage[t]==nombre)
{
i=i-1;
}
}
}
var characts = 'abcdefghijklmnopqrstuvwzabcdefghijklmnopqrstuvwz';
for (i=1 ;i<nb;i++)
{
nb_aleatoire(26);
c = characts.substr(nombre,1)
nombres = nombres + tirage[i] + c ;
}
return nombres;
}
function isNonePage(){
var b = false;
for(var i=0;i<CPagesCount;i++){
var pa = CPages[i];
if(typeof pa === "undefined") {
}else{
if(CPages[i].comicMode==4){
b = true;
}
}
}
return b;
}
function paramsSettingsLaunch(){
$(".menu-vertical").css("display","none");
$(".menu-options").css("display","none");
let obj = {type:"process_params"};
constructWindEdit(obj);
}
function exec_params(){
}
function showEditZoneText(obj){
if (obj.type=='text'
||obj.type=='title'
||obj.type=='infopoint'
||obj.type=='speech'
||isMetaObjectHaveText(obj)
||obj.type=='label') {
$('.editZoneTexteV2').css("display","block");
$('.opacedit').css("display","block");
loadEdit = true;
var txtEdit = replaceAll(obj.text,"data-ref","href");
txtEdit = txtEdit.replace('color: ','color:');
txtEdit = txtEdit.replace('#ffffff;','white;');
txtEdit = txtEdit.replace('#000000;','black;');
var isWhite = false;
if (txtEdit.toLowerCase().indexOf("color:white;")!=-1) {
isWhite = true;
}
tinymce.get("textAreaV2").setContent(txtEdit);
if (isWhite) {
tinymce.get("textAreaV2").getBody().style.backgroundColor = "#808B96";
}else{
tinymce.get("textAreaV2").getBody().style.backgroundColor = "white";
}
if(obj.type!='speech'){
$('.styl0,.styl1').css("background-color","white").css("display","block");
if(parseInteger(obj.val)==0){
$('.styl0').css("background-color","#A9A9F5");
}else{
$('.styl1').css("background-color","#A9A9F5");
}
}else{
$('.styl0,.styl1').css("display","none");
}
loadEdit = false;
}
}
function showEditZoneTextHtml(obj){
if (obj.type=='texthtml') {
$('.editZoneTexteContent').css("display","block");
$('.opacedit').css("display","block");
loadEdit = true;
var cssEdit = obj.text2;
if (cssEdit!='') {
resetEditZoneTextHtml(obj,cssEdit);
}
var txtEdit = replaceAll(obj.text,"data-ref","href");
txtEdit = txtEdit.replace('color: ','color:');
txtEdit = txtEdit.replace('#ffffff;','white;');
txtEdit = txtEdit.replace('#000000;','black;');
tinymce.get("textAreaV3").setContent(txtEdit);
loadEdit = false;
}
}
function resetEditZoneTextHtml(obj,cssEdit){
tinymce.remove("textarea#textAreaV3");
tinymce.init({
selector: 'textarea#textAreaV3',
height: 420, menubar: false, statusbar: false,
plugins:[
'advlist autolink lists link image charmap print preview anchor',
'searchreplace visualblocks code fullscreen',
'insertdatetime media table paste code help wordcount paste'
],
toolbar: 'undo redo | paste | formatselect | bold italic forecolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | removeformat fontselect code | help',
body_class: "mcebodycore",
content_css: "editor/oel-card.css",
content_style : cssEdit
});
}
var GlobalUid = -1;
var ModeEdit = false;
var ModeDelete = 0;
var pageDelete = '';
var pageDuplica = '';
var loadEdit = true;
var UidEdit = -1;
function placeEditZone(uid){
for (var i = 0; i < CLudisCount; i++){
var obj = CLudis[i];
if(obj.id==uid){
GlobalUid = uid;
placeGlobalTools(obj);
if(obj.type=='helper'){
var obs = $('.editquestion,.actiondeleteb,.actiondelete,.notequestion,.actionposition,.actionaddfluxpts');
obs.css("display","none");
launchHelper(obj);
return false;
}
if(obj.type=='text'||obj.type=='img'||obj.type=='label'){
$('.notequestion').css("display","none");
}
if(obj.type=='fluxPts'){
var obs = $('.editquestion,.actiondeleteb,.actiondelete,.notequestion,.actionposition');
obs.css("display","none");
if(obj.val2==0){
var ol = parseInt(obj.getX() * zoomCanv) + parseInt(obj.getW() * zoomCanv) + decxCanv ;
var ot = parseInt(obj.getY() * zoomCanv) + decyCanv;
$('.actionaddfluxpts').css("display","block");
$('.actionaddfluxpts').css("left",ol + 'px').css("top",ot + 'px');
}
return false;
}
if(obj.type=='qcm'
||obj.type=='tcm'
||obj.type=='lcm'
||obj.type=='input'
){
var ol = parseInt(obj.getX() * zoomCanv) + decxCanv;
var ot = parseInt(obj.getY() * zoomCanv) + parseInt(obj.getH() * zoomCanv) + decyCanv + 10;
$('.notequestion').css("display","block");
$('.notequestion').css("left",ol +'px');
$('.notequestion').css("top",ot +'px');
$('.remarqueview').html(obj.remarque);
$('.noteview').html(obj.note);
}
var editL = parseInt(obj.getX() * zoomCanv) + parseInt(obj.getW() * zoomCanv) + decxCanv - 50;
var editT = parseInt(obj.getY() * zoomCanv) + decyCanv + 5;
if(editT<decyCanv){
editT = decyCanv;
}
if(obj.haveEditElement()){
$('.editquestion').css("display","block");
}else{
$('.editquestion').css("display","none");
}
if(obj.width<100||obj.height<100){
editL = parseInt(obj.getX() * zoomCanv) + parseInt(obj.getW() * zoomCanv) + decxCanv - 20;
editT = parseInt(obj.getY() * zoomCanv) + decyCanv - 45;
}
if(editT<115){
editT = 115;
}
$('.editquestion').css("left",editL + 'px');
$('.editquestion').css("top" ,editT + 'px');
if(obj.type=='input'){
editT = parseInt(obj.getY() * zoomCanv) + parseInt(obj.getH() * zoomCanv) + decyCanv - (obj.getH());
editL = parseInt(obj.getX() * zoomCanv) + parseInt(obj.getW() * zoomCanv) + decxCanv + 4;
$('.actiondelete').css("top",editT + 'px').css("left",editL + 'px').css("display","block");
}else{
if(obj.type=='barre'||obj.type=='title'||obj.getH()<100){
editT = parseInt(obj.getY() * zoomCanv) + parseInt(obj.getH() * zoomCanv) + decyCanv + 4;
editL = parseInt(obj.getX() * zoomCanv) + parseInt(obj.getW() * zoomCanv) + decxCanv - 50;
$('.actiondeleteb').css("top",editT + 'px').css("left",editL + 'px').css("display","block");
}else{
editT = parseInt(obj.getY() * zoomCanv) + parseInt(obj.getH() * zoomCanv) + decyCanv - (obj.getH() / 3);
editL = parseInt(obj.getX() * zoomCanv) + parseInt(obj.getW() * zoomCanv) + decxCanv;
$('.actiondelete').css("top",editT + 'px').css("left",editL + 'px').css("display","block");
}
}
var mobjL = parseInt(obj.getX()) - 33;
var mobjT = parseInt(obj.getY()) - 33;
MoveObjectLudi.set('left',mobjL);
MoveObjectLudi.set('top',mobjT);
if(obj.type=='speech'){
editT = parseInt(obj.getY() * zoomCanv) + parseInt(obj.getH() * zoomCanv) + decyCanv - (obj.getH() / 3);
editL = parseInt(obj.getX() * zoomCanv) + decxCanv -36;
$('.actionposition').css("top",editT + 'px').css("left",editL + 'px').css("display","block");
}
showWiziZone();
}
}
}
function placeGlobalTools(obj){
if(obj.type=='text'||obj.type=='label'||obj.type=='title'||obj.type=='barre'){
$('#GlobalMenuFormat').css("display","block");
$('.toolsMenuFormat').css('visibility','visible');
$('.toolsMenuFormat').css('display','block');
authoApplikFormat = false;
$('#fontsizenumber').val(obj.fontSize);
authoApplikFormat = true;
}else{
$('#GlobalMenuFormat').css("display","none");
$('.toolsMenuFormat').css('visibility','hidden');
}
}
var authoApplikFormat = false;
function applikFtSizeToObj(){
if(authoApplikFormat){
var obj = CLudis[GlobalUid];
if(typeof obj === 'undefined'){
$('#GlobalMenuFormat').css("display","none");
$('.toolsMenuFormat').css('visibility','hidden');
}else{
var tz = $('#fontsizenumber').val();
obj.fontSize = tz;
showWiziZone();
}
}
}
function showEditZone(){
if(GlobalUid==-1){
return false;
}
eventObjects = true;
var obj = CLudis[GlobalUid];
if (obj.lock) {
return false;
}
if(obj.type=='qcm'){
var panLeft = parseInt((SCREEN_0_W/2) * zoomCanv) + decxCanv - 200;
$('.questionqcmedit').css("left",panLeft + 'px');
$('.opacedit').css("display","block");
$('.questionqcmedit').css("display",'block');
setSourceQcm(GlobalUid);
}
constructWindEdit(obj);
if(obj.type=='input'){
LaunchInputEdit(obj);
}
showEditZoneText(obj);
showEditMetaObject(obj);
showEditZoneTextHtml(obj);
if(obj.type=='button'||obj.type=='buttonarea'||obj.type=='gamezoneaction'){
loadEdit = true;
var obj = CLudis[GlobalUid];
showActionZone(obj);
loadEdit = false;
}
if(obj.type=='img'){
targetImg = 0;
launchImageEditZone();
}
if(obj.type=='database'){
launchEditDataBase(obj);
}
if(obj.type=='video'){
loadEdit = true;
$('#videoEditUrl').val(obj.text);
$('#overviewvideo').html(obj.text3);
$('.opacedit,#videoeditzone').css("display","block");
loadEdit = false;
}
if(obj.type=='videomp4'){
loadEdit = true;
launchVideoMp4Zone(obj);
loadEdit = false;
}
if(obj.type=='audio'){
loadEdit = true;
launchAudioMp3Zone(obj);
loadEdit = false;
}
if(obj.type=='objframe'){
loadEdit = true;
launchIframeZone(obj);
loadEdit = false;
}
if(obj.type=='tcm'){
loadEdit = true;
$('.opacedit,#tcmeditnote').css("display","block");
$('#tcmtextarea').val(txtAreaText(obj.text));
$('#tcmdistra').val(txtAreaText(obj.text2));
loadEdit = false;
}
if(obj.type=='lcm'){
loadEdit = true;
$('.opacedit,#lcmeditpan').css("display","block");
$('#sourcelcm1').val(obj.text);
$('#tolcm1').val(obj.val);
$('#sourcelcm2').val(obj.text2);
$('#tolcm2').val(obj.val2);
$('#sourcelcm3').val(obj.text3);
$('#tolcm3').val(obj.val3);
$('#sourcelcm4').val(obj.text4);
$('#tolcm4').val(obj.val4);
$('#sourcelcm5').val(obj.text5);
$('#tolcm5').val(obj.val5);
$('#sourcelcm6').val(obj.text6);
$('#tolcm6').val(obj.val6);
ajustLcmZone();
loadEdit = false;
}
if(obj.type=='barre'){
loadEdit = true;
launchBarreEdit(obj);
loadEdit = false;
}
if(obj.type=='plugin'){
LunchPluginEdit(obj);
}
if(obj.type=='plugme'){
editPluginLaunch(obj);
}
}
function showActionZone(obj){
if(obj.type=='button'){
$('#actionedittext').val(obj.text);
$('#actionedittext').removeAttr( "readonly");
$('#actionTextPara').css('opacity','1');
}else{
$('#actionedittext').val("");
$('#actionedittext').attr("readonly","true");
$('#actionTextPara').css('opacity','0.4');
}
$('#actioneditpage').css('display','none');
$('.actionSelectPersoBtn').css('display','none');
$('.actionSelectFileImage').css('display','none');
if (obj.actionVal==''){
if (obj.data==refAct[0]||obj.data==refAct[1] ||obj.data==refAct[2]
||obj.data==refAct[3]||obj.data==refAct[4]
||obj.data==refAct[5]||obj.data==refAct[6]){
obj.actionVal = obj.data;
}
}
if (obj.actionData==''){
if (obj.actionVal==refAct[3]){
obj.actionData = obj.val;
}
}
switch (obj.actionVal) {
case refAct[0]:
$('#actioneditselect').html(getTrd(refActs[0]));
break;
case refAct[1]:
$('#actioneditselect').html(getTrd(refActs[1]));
break;
case refAct[2]:
$('#actioneditselect').html(getTrd(refActs[2]));
break;
case refAct[3]:
$('#actioneditselect').html(getTrd(refActs[3]));
$('#actioneditpage').css('display','inline-block');
break;
case refAct[4]:
$('#actioneditselect').html(getTrd(refActs[4]));
$('.actionSelectPersoBtn').css('display','block');
break;
case refAct[5]:
$('#actioneditselect').html(getTrd(refActs[5]));
break;
case refAct[6]:
$('#actioneditselect').html(getTrd(refActs[6]));
$('.actionSelectFileImage').css('display','block');
break;
default:
$('#actioneditselect').html('-');
}
$('.opacedit,#actioneditbtn').css("display","block");
$('#actioneditpage').val(parseInteger(obj.actionData));
}
function ajustLcmZone(){
if(GlobalUid==-1){
return false;
}
var obj = CLudis[GlobalUid];
if(parseTxt(obj.text3)!=''
||parseTxt(obj.val3)!=''){
obj.number = 3;
$('#tolcm4,#sourcelcm4').css("display","inline-block");
$('#lcmeditpan').css("height","280px");
}else{
$('#tolcm4,#sourcelcm4').css("display","none");
}
if(parseTxt(obj.text4)!=''
||parseTxt(obj.val4)!=''){
obj.number = 4;
$('#sourcelcm5,#tolcm5').css("display","inline-block");
$('#lcmeditpan').css("height","330px");
}else{
$('#sourcelcm5,#tolcm5').css("display","none");
}
if(parseTxt(obj.text5)!=''
||parseTxt(obj.val5)!=''){
obj.number = 5;
$('#sourcelcm6,#tolcm6').css("display","inline-block");
$('#lcmeditpan').css("height","380px");
}else{
$('#sourcelcm6,#tolcm6').css("display","none");
}
if(parseTxt(obj.text6)!=''
||parseTxt(obj.val6)!=''){
obj.number = 6;
}
eventObjects = true;
}
function showEditNote(){
if(GlobalUid==-1){
return false;
}
loadEdit = true;
var obj = CLudis[GlobalUid];
$('#questioneditremarque').val(obj.remarque);
$('#questioneditnote').val(obj.note);
$('.opacedit,#editnote').css("display","block");
loadEdit = false;
}
function switchTextBack(v){
if(GlobalUid==-1){
return false;
}
var obj = CLudis[GlobalUid];
obj.val = v;
$('.styl0,.styl1').css("background-color","white");
if(parseInteger(obj.val)==0){
$('.styl0').css("background-color","#A9A9F5");
}else{
$('.styl1').css("background-color","#A9A9F5");
}
showWiziZone();
eventObjects = true;
}
function showEditDelete(typ){
ModeDelete = typ;
if(ModeDelete==0&&GlobalUid==-1){
return false;
}
loadEdit = true;
if(ModeDelete==0){
var obj = CLudis[GlobalUid];
$('#questioneditremarque').val(obj.remarque);
$('#questioneditnote').val(obj.note);
}
$('.opacedit,#editdelete').css("display","block");
loadEdit = false;
}
function showEditFormatId(){
if(GlobalUid==-1){
return false;
}
loadEdit = true;
var obj = CLudis[GlobalUid];
if(obj.type=='button'){
showFormatButton();
}else{
$('#editIdObject').val(obj.idString);
$('#editCssObject').val(obj.css);
$('.opacedit,#objetEditIdZone').css("display","block");
}
loadEdit = false;
}
function showExeptionWin(){
loadEdit = true;
$('.opacedit,#exeptionLogZone').css("display","block");
loadEdit = false;
}
function closeEdit(){
$('.opacedit,.editnote,#editzone,.opacedit,.pan').css("display","none");
$('.panel-login').css('display','none');
$('.opacedit').css("left","0px");
reloadObject(GlobalUid);
}
var folderAllPlugins = '';
var transfertTextPlugins = '';
var pleaseWaitPlugin = false;
function editPluginPrepareLaunch(obj){
$('.opacedit').css("display","block");
editPluginForms(obj);
}
function editPluginLaunch(obj){
editPluginPrepareLaunch(obj);
$('.editpluginForms').css("display",'block');
}
function editPluginForms(obj){
pleaseWaitPlugin = false;
transfertTextPlugins = obj.text;
if(transfertTextPlugins == 'undefined'){
transfertTextPlugins = "";
}
if(typeof(transfertTextPlugins) == 'undefined'){
transfertTextPlugins = "";
}
var pathAllPlugins = folderAllPlugins.replace(/\\/g, "/");
var remote = require('electron').remote;
var lang = remote.getGlobal('sharedObj').lang || 'en';
localStorage.setItem('pluginlang', lang);
var wbpath = 'file:///' + pathAllPlugins + obj.val + '/forms/index.html';
wbpath = wbpath.replace(/\\/g, "/");
wbpath = wbpath.replace('\\', "/");
if(!openelearning.gebi('editpluginForms')){
var p = '<div id="editpluginForms" ';
p += ' class="editpluginForms pan ' + TYPEWIND + 'osBorder" ';
p += ' style="background:white!important;" >';
p += barreEdit();
p += '<div class="zonePluginLogo" ></div>';
p += '<iframe id="editPluginFrame" name="editPluginFrame" ';
p += ' src="' + wbpath + '" width="827px" height="480px" ';
p += ' style="position:absolute;left:2px;top:35px;display:none;" ';
p += ' frameBorder="0" >';
p += '</iframe>';
p += '<div class="listzonepuglin" >';
p += '<a style="float:left;" onclick="closeEdit();" ';
p += 'class="validation" >' + getTrd('cancel') + '</a>';
p += '<a style="float:right;margin-right:10px;" ';
p += 'onclick="validPluginInsert();" ';
p += 'class="btnSave" >' + getTrd('save') + '</a>';
p += '</div>';
p += '</div>';
$('body').append(p);
} else {
$('#editPluginFrame').css("display","none");
$('.zonePluginLogo').css("display","block");
loadIframe('editPluginFrame',wbpath);
}
$('#editpluginForms').css("height","540px");
setTimeout(function(){
if(transfertTextPlugins==''){
transfertTextPlugins = '|||||';
}
$('#editPluginFrame').contents().find('#finalcode').val(transfertTextPlugins);
},350);
setTimeout(function(){
$('#editPluginFrame').css("display","block");
$('.zonePluginLogo').css("display","none");
pleaseWaitPlugin = true;
},750);
}
function validPluginInsert(){
if(pleaseWaitPlugin){
transfertTextPlugins = $('#editPluginFrame').contents().find('#finalcode').val();
if(transfertTextPlugins==''){
alert('Failure of registration');
}else{
var obj = CLudis[GlobalUid];
obj.text = transfertTextPlugins;
$('.opacedit').css("display","none");
$('.editpluginForms').css("display",'none');
showWiziZone();
}
}
}
function loadIframe(iframeName, url){
var $iframe = $('#' + iframeName);
if($iframe.length){
$iframe.attr('src',url);
return false;
}
return true;
}
function loadMappingSvg(i){
var obj = CLudis[i];
var ol = parseInt(obj.x);
var ot = parseInt(obj.y);
var ow = parseInt(obj.width);
var oh = parseInt(obj.height);
var rw = parseInt(obj.realwidth);
var rh = parseInt(obj.realheight);
var objPlug = getCPlugById(obj.val);
var svgMapping = objPlug.screenTextMapping;
fabric.loadSVGFromString(svgMapping,function(objects,options){
var obj = fabric.util.groupSVGElements(objects, options);
obj.left = ol;
obj.top = ot;
obj.scaleX = ow/rw;
obj.scaleY =  oh/rh;
obj.lockRotation = true;
obj.lockScalingY = true;
obj.lockScalingX = true;
obj.lockMovementX = false;
obj.hasControls = false;
obj.hasRotatingPoint = false;
obj.id = i;
obj.set({
borderColor: borderCol,
cornerColor: cornerCol,
transparentCorners: false
});
canvas.add(obj);
});
}
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
alert('Error plugin ' + name + ' data !');
return false;
}
closePan();
var objTemp = LudiBase();
objTemp.type= "plugme";
var wi = parseIntegerNZ(objPlug.width);
objTemp.x = parseIntegerNZ(SCREEN_0_W - wi)/2;
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
copyProcessToEmbeded(dirp + ress);
}
if(ress.indexOf('.js')!=-1
||ress.indexOf('.css')!=-1){
var dirp = folderAllPlugins;
dirp = dirp.replace(/\\/g, "/");
copyFileProcess(dirp + ress);
copyProcessToEmbeded(dirp + ress);
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
function copyProcessToEmbeded(filenam){
const electron = require('electron');
const ipc = electron.ipcRenderer;
ipc.send('message',{key:'uploadfilebyplugin',filenam:filenam});
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
function processLockObjLudi(){
if(GlobalUid==-1){
return false;
}
var obj = CLudis[GlobalUid];
obj.lock = true;
$("#lockopenludi").css("display","block");
placeEditZone(GlobalUid);
showWiziZone();
placeEditZone(GlobalUid);
var obs = $('.editquestion,.actiondeleteb,.actiondelete,.notequestion,.actionposition,.actionaddfluxpts');
obs.css("display","none");
$('.notequestion').css("display","none");
MoveObjectLudi.set('left',-100);
MoveObjectLudi.set('top' ,-100);
canvas.deactivateAll();
loadPage(GPageId,1);
}
function setObZ(i) {
if(GlobalUid==-1){
return false;
}
var obj = CLudis[GlobalUid];
if (obj.lock) {
return false;
}
if (i==1) {
obj.zindex = 1;
} else if (i==2) {
obj.zindex = 2;
} else {
obj.zindex = 3;
}
eventObjects = true;
loadPage(GPageId,1);
}
function showProperties(){
if(GlobalUid==-1){
return false;
}
var obj = CLudis[GlobalUid];
if (obj.lock) {
return false;
}
$('.opacedit').css("display","block");
$('#editFormatproperties').css("display","block");
$('#propertiesObjectX').val(obj.getX());
$('#propertiesObjectY').val(obj.getY());
$('#propertiesObjectW').val(obj.getW());
$('#propertiesObjectH').val(obj.getH());
if(obj.zindex==''||obj.zindex==0||obj.zindex>3){
obj.zindex = 1;
}
if(typeof(obj.zindex)=='undefined'){
obj.zindex = 1;
}
$('#propertiesObjectZ').val(obj.zindex);
}
function propertiesObject(){
var p = '<div id="editFormatproperties" ';
p += ' class="editFormatproperties pan ' + TYPEWIND + 'osBorder" >';
p += '<div class="toolbar-w toolbar-header">';
p += '<div onClick="closeEdit();" class="closehead" ></div>';
p += '<h1 class="titlehead">Properties of object</h1>';
p += '</div>';
p += '<div class="floatProp" style="margin-top:35px;" >';
p += '&nbsp;X&nbsp;:&nbsp;<input id="propertiesObjectX" type="number" ';
p += ' class="textdatabasetitleedit" style="width:100px;" />';
p += '</div>';
p += '<div class="floatProp" >';
p += '&nbsp;Y&nbsp;:&nbsp;<input id="propertiesObjectY" type="number" ';
p += ' class="textdatabasetitleedit" style="width:100px;" />';
p += '</div>';
p += '<div class="floatProp" >';
p += 'W&nbsp;:&nbsp;<input id="propertiesObjectW" type="number" ';
p += ' class="textdatabasetitleedit" style="width:100px;" />';
p += '</div>';
p += '<div class="floatProp" >';
p += 'H&nbsp;:&nbsp;<input id="propertiesObjectH" type="number" ';
p += ' class="textdatabasetitleedit" style="width:100px;" />';
p += '</div>';
p += '<div class="floatProp" >';
p += 'Z&nbsp;:&nbsp;<input id="propertiesObjectZ" type="number" ';
p += ' class="textdatabasetitleedit" style="width:100px;" />';
p += '</div>';
p += '<a style="float:right;margin:10px;" onClick="saveProperties();" class="btnSave">Apply</a>';
p += '</div>';
return p;
}
function saveProperties(){
if(GlobalUid==-1){
return false;
}
var obj = CLudis[GlobalUid];
if (obj.lock) {
return false;
}
obj.setX($('#propertiesObjectX').val());
obj.setY($('#propertiesObjectY').val());
obj.setW($('#propertiesObjectW').val());
obj.setH($('#propertiesObjectH').val());
obj.zindex = $('#propertiesObjectZ').val();
if(obj.zindex==0||obj.zindex>3){
obj.zindex = 1;
}
loadPage(GPageId,0);
eventObjects = true;
}
function reloadObject(i){
if(i==-1){
return false;
}
var objL = CLudis[i];
UidEdit = -1;
if(objL.type=='qcm'||objL.type=='text'
||objL.type=='variable'||objL.type=='label'
||objL.type=='title'||objL.type=='tcm'||objL.type=='gamezoneaction'
||objL.type=='lcm'||objL.type=='button'||objL.type=='buttonarea'
||objL.type=='speech'||objL.type=='input'){
canvas.forEachObject(function(obj) {
if (obj.id && obj.id === i&& obj.id != 'move') {
obj.set('active', true);
canvas.remove(obj);
}
});
canvas.forEachObject(function(obj) {
if (obj.id === i&& obj.id != 'move') {
obj.set('active', true);
canvas.remove(obj);
}
});
objL.isCreate = false;
ModeEdit = false;
eventObjects = true;
CLudisPaint();
}
}
function setSourceText(){
if(GlobalUid==-1){
return false;
}
closePan();
var obj = CLudis[GlobalUid];
var txt = editorInstance.getValue();
if(obj.text!=txt){
txt = replaceAll(txt,"href","data-ref");
obj.text = txt;
}
reloadObject(GlobalUid);
showWiziZone();
eventObjects = true;
}
function setSourceTextV2(){
if(GlobalUid==-1){
return false;
}
var txt = tinymce.get("textAreaV2").getContent();
closePan();
var obj = CLudis[GlobalUid];
if(obj.text!=txt){
txt = replaceAll(txt,"href","data-ref");
obj.text = txt;
}
reloadObject(GlobalUid);
showWiziZone();
eventObjects = true;
}
function setSourceTextV3(){
if(GlobalUid==-1){
return false;
}
var txt = tinymce.get("textAreaV3").getContent();
closePan();
var obj = CLudis[GlobalUid];
if(obj.text!=txt){
txt = replaceAll(txt,"href","data-ref");
obj.text = txt;
}
reloadObject(GlobalUid);
showWiziZone();
eventObjects = true;
}
function setSourceNote(){
if(loadEdit==true){
return false;
}
if(GlobalUid==-1){
return false;
}
var obj = CLudis[GlobalUid];
obj.remarque = $('#questioneditremarque').val();
obj.note = $('#questioneditnote').val();
$('.remarqueview').html(obj.remarque);
$('.noteview').html(obj.note);
eventObjects = true;
}
function setSourcePlugin(){
if(loadEdit==true){
return false;
}
if(GlobalUid==-1){
return false;
}
var obj = CLudis[GlobalUid];
obj.text = $('#field1').val();
obj.text2 = $('#field2').val();
eventObjects = true;
}
function setSourceInput(){
if(loadEdit==true){return false;}
if(GlobalUid==-1){return false;}
var obj = CLudis[GlobalUid];
obj.text = $('#fieldInput').val();
closePan();
placeEditZone(GlobalUid);
reloadObject(GlobalUid);
showWiziZone();
eventObjects = true;
}
function setSourceButton(){
if(GlobalUid==-1){
return false;
}
var obj = CLudis[GlobalUid];
if (obj.type=='button'
||obj.type=='buttonarea'
||obj.type=='img'
||obj.type=='gamezoneaction') {
var txt = $('#actionedittext').val();
obj.text = txt;
if (obj.type!='img') {
obj.val = $('#actioneditpage').val();
}
obj.actionData = $('#actioneditpage').val();
eventObjects = true;
if(obj.text6==4||obj.text6==5||obj.text6==6){
}else{
var objCanvas = canvas.getActiveObject();
if (objCanvas.paths) {
objCanvas.paths[1].text = txt;
}
}
}
eventObjects = true;
}
function setSourceIdString(){
if(GlobalUid==-1){
return false;
}
var obj = CLudis[GlobalUid];
var txt = $('#editIdObject').val();
txt = openelearning.extractIdStr(txt);
obj.idString = txt;
eventObjects = true;
}
function changeSourceSpeech(){
if(GlobalUid==-1){
return false;
}
var lst = '0;1;4;5;';
var max = 5;
var obj = CLudis[GlobalUid];
obj.val = parseInteger(obj.val) + 1;
if(obj.val>max){obj.val = 0;}
if(obj.y<200){
if(lst.indexOf(obj.val+';')==-1){
obj.val++;
if(obj.val>max){obj.val = 0;}
}
if(lst.indexOf(obj.val+';')==-1){
obj.val++;
if(obj.val>max){obj.val = 0;}
}
if(lst.indexOf(obj.val+';')==-1){
obj.val++;
if(obj.val>max){obj.val = 0;}
}
}
if(obj.val<4){obj.width = 300;}
if(obj.val==4){obj.width = 480;}
if(obj.val==5){obj.width = 480;}
obj.realwidth = obj.width;
obj.data = "img/bulle/bullebase" + obj.val + ".png";
placeEditZone(GlobalUid);
reloadObject(GlobalUid);
showWiziZone();
eventObjects = true;
}
function setSourceTcm(){
if(GlobalUid==-1){
return false;
}
var obj = CLudis[GlobalUid];
if(obj.type=='tcm'){
var text = transText($('#tcmtextarea').val());
if(text!=obj.text){
obj.text = text;
ModeEdit = true;
UidEdit = GlobalUid;
}
var text2 = transText($('#tcmdistra').val());
if(text2!=obj.text2){
obj.text2 = text2;
ModeEdit = true;
UidEdit = GlobalUid;
}
eventObjects = true;
}
}
function setSourceLcm(){
if(GlobalUid==-1){
return false;
}
var obj = CLudis[GlobalUid];
if(obj.type=='lcm'){
obj.text = $('#sourcelcm1').val();
obj.val = $('#tolcm1').val();
obj.text2 = $('#sourcelcm2').val();
obj.val2 = $('#tolcm2').val();
obj.text3 = $('#sourcelcm3').val();
obj.val3 = $('#tolcm3').val();
obj.text4 = parseTxt($('#sourcelcm4').val());
obj.val4 = parseTxt($('#tolcm4').val());
obj.text5 = parseTxt($('#sourcelcm5').val());
obj.val5 = parseTxt($('#tolcm5').val());
obj.text6 = parseTxt($('#sourcelcm6').val());
obj.val6 = parseTxt($('#tolcm6').val());
if(obj.text3!=''){obj.number = 3;}
if(obj.text4!=''){obj.number = 4;}
if(obj.text5!=''){obj.number = 5;}
if(obj.text6!=''){obj.number = 6;}
ajustLcmZone();
ModeEdit = true;
UidEdit = GlobalUid;
eventObjects = true;
}
}
function actionDelete(){
if(ModeDelete==1){
deletePages(pageDelete);
closeEdit();
closePan();
return false;
}
if(loadEdit==true){
return false;
}
if(GlobalUid==-1){
return false;
}
i = GlobalUid;
canvas.forEachObject(function(obj) {
if (obj.id && obj.id === i) {
obj.set('active', true);
canvas.remove(obj);
}
});
canvas.forEachObject(function(obj) {
if (obj.id === i) {
obj.set('active', true);
canvas.remove(obj);
}
});
var obj = CLudis[i];
obj.supp = 1;
GlobalUid = -1;
UidEdit = -1;
showWiziZone();
closePan();
createRenderJSON();
closeEdit();
closePan();
if(typeof MoveObjectLudi==="undefined"){
}else{
MoveObjectLudi.set('left',-100);
}
eventObjects = true;
}
function transText(txt){
txt = txt.replace(/(?:\r\n|\r|\n)/g, '<br>');
return txt;
}
function txtAreaText(txt){
var find = '<br>';
var re = new RegExp(find, 'g');
txt = txt.replace(re, '\n');
return txt;
}
function drawHardPlug(obj,objPlug,i){
if(!openelearning.gebi('plugzone' + i)){
var p = '<div id="plugzone'+i+'" ';
p += ' onClick="SelectWorkingI('+i+');" ';
p += ' class="tmpshow showtext noselectmouse" >';
p += '</div>';
$('body').append(p);
}
var txtVars =  obj.text + "|||||||";
var textPlugs = txtVars.split("|");
var plugL = parseInt(obj.x * zoomCanv)+ decxCanv;
var plugT = parseInt(obj.y * zoomCanv)+ decyCanv;
var plugW = parseInt(obj.width * zoomCanv);
var plugH = parseInt(obj.height * zoomCanv);
var plugzone = $('#plugzone'+i);
plugzone.css("left",plugL+'px').css("top",plugT+'px');
plugzone.css("width",plugW+'px').css("height",plugH+'px');
plugzone.css("display","block");
if (objPlug.name=='t6m_markswords') {
var valTxt1 = textPlugs[0];
var valTxt2 = textPlugs[1];
if (valTxt1=='') {
valTxt1 = 'Mark the Words';
}
if (valTxt2=='') {
valTxt2 = "A free based question type allowing *Creatives* to create *Challenges* ";
valTxt2 += "where the user is to mark *specific* types of verbs in a text.";
}
var plugzone = $('#plugzone'+i);
var hPrt = '<div style="font-size:18px;font-family:Sans-Serif;padding-left:5px;';
hPrt += 'padding-top:10px;padding-bottom:10px;" >';
hPrt += valTxt1 + '</div>';
hPrt += '<div style="font-size:16px;font-family:Sans-Serif;padding-left:10px;" >';
hPrt += valTxt2 + '</div>';
plugzone.html(hPrt);
}
}
var ivideo = -1;
function showWiziZone(){
$('.tmpshow').css("display","none");
findLines();
for(var i=0;i<CLudisCount;i++){
var obj = CLudis[i];
if(obj.supp==0&&obj.lock&&obj.pageId==GPageId){
installWiziZone(obj,i);
}
}
for(var i=0;i<CLudisCount;i++){
var obj = CLudis[i];
if(obj.supp==0&&obj.lock==false&&obj.pageId==GPageId){
installWiziZone(obj,i);
}
}
}
function installWiziZone(obj,i){
var showL = parseInt(obj.getX() * zoomCanv) + decxCanv + 5;
var showT = parseInt(obj.getY() * zoomCanv) + decyCanv + 5;
var showW = parseInt(obj.getW() * zoomCanv) - 10;
var showH = parseInt(obj.getH() * zoomCanv) - 10;
if(obj.type=='video'){
var videoL = parseInt(obj.getX() * zoomCanv) + decxCanv + 5;
var videoT = parseInt(obj.getY() * zoomCanv) + decyCanv + 5;
ivideo = i;
$("#minvideoimage").click(function() {
SelectWorkingI(ivideo);
});
$('#minvideoimage').css("cursor",'pointer');
$('#minvideoimage').css("left",videoL + 'px');
$('#minvideoimage').css("top",videoT + 'px');
if(obj.text2!=""){
$('#minvideoimage').css("display","block");
$('#minvideoimage').attr('src',obj.text2);
}
var h = '<iframe width="320" height="220" ';
h = h + 'src="https://www.youtube.com/embed/';
h = h + 'idvideo?rel=0&amp;controls=0&amp;showinfo=0" ';
h = h + 'frameborder="0" allowfullscreen></iframe>';
h = h.replace('idvideo',obj.val);
obj.text3 = h;
}
if(obj.type=='title'){
if(isTxtHtml(obj.text)){
if(!openelearning.gebi('titlezone' + i)){
var p = '<div id="titlezone'+i+'" ';
p += ' onClick="SelectWorkingI('+i+');" ';
p += ' class="tmpshow showtext noselectmouse" >';
p += cleanTextForTitle(obj.text);
p += '</div>';
$('body').append(p);
}
var col='black';
if(parseInteger(obj.val)==1){col='white';}
$('#titlezone'+i).html(cleanTextForTitle(obj.text));
$('#titlezone'+i).css("left",showL+'px').css("top",showT+'px');
$('#titlezone'+i).css("max-width",showW+'px').css("height",showH+'px');
var tz = parseInt(obj.fontSize * zoomCanv)
if(tz<3){tz=3;}
$('#titlezone'+i).css("font-size",tz+'px');
$('#titlezone'+i).css("display","block");
$('#titlezone'+i).css("overflow","auto");
$('#titlezone'+i).css("color",col);
$('#titlezone'+i).css("line-height",showH+'px');
}
}
if(obj.type=='barre'){
showL = parseInt((obj.getX()+10) * zoomCanv) + decxCanv + 5;
if(!openelearning.gebi('barrezone' + i)){
var p = '<div id="barrezone'+i+'" ';
p += ' onClick="SelectWorkingI('+i+');" ';
p += ' class="tmpshow showtext noselectmouse" >';
p += cleanTextForTitle(obj.text);
p += '</div>';
$('body').append(p);
}
var col='white';
if (obj.val == 'transparent') {
col = 'black';
}
$('#barrezone'+i).html(cleanTextForTitle(obj.text));
$('#barrezone'+i).css("left",showL + 'px').css("top",showT+'px');
$('#barrezone'+i).css("max-width",showW+'px').css("height",showH+'px');
var tz = parseInt(obj.fontSize * zoomCanv)
if(tz<3){tz=3;}
$('#barrezone'+i).css("font-size",tz+'px');
$('#barrezone'+i).css("display","block");
$('#barrezone'+i).css("overflow","auto");
$('#barrezone'+i).css("color",col);
$('#barrezone'+i).css("line-height",showH+'px');
if(obj.val2==1){
if (!openelearning.gebi('barrelogo' + i)) {
var p = '<img id="barrelogo'+i+'" ';
if (obj.val3=='') {
p += ' src="images/uibase-icon-04.png" ';
} else {
p += ' src="' + obj.val3 + '" ';
}
p += ' class="tmpshow showtext noselectmouse" />';
$('body').append(p);
}
var logoW = parseInt(54 * zoomCanv);
$('#barrelogo'+i).css("left",showL + 'px');
$('#barrelogo'+i).css("top",showT + parseInt(7*zoomCanv) +'px');
$('#barrelogo'+i).css("width",logoW+'px').css("height",logoW+'px');
$('#barrelogo'+i).css("display",'block');
if (obj.val3!='') {
$('#barrelogo'+i).attr("src",obj.val3);
} else {
$('#barrelogo'+i).attr("src","images/uibase-icon-04.png");
}
$('#barrezone'+i).css("left",showL + parseInt(70 * zoomCanv) + 'px').css("top",showT+'px');
} else {
$('#barrelogo'+i).css("display",'none');
}
}
if(obj.type=='text'||obj.type=='tcm'||obj.type=='texthtml'){
installWiziTexte(obj,i);
}
if(obj.type=='label'){
var labL = parseInt(obj.getX() * zoomCanv) + decxCanv + 2;
var labT = parseInt(obj.getY() * zoomCanv) + decyCanv + 2;
var labW = parseInt(obj.getW() * zoomCanv) - 4;
var labH = parseInt(obj.getH() * zoomCanv) - 4;
var col = 'black';
if(!openelearning.gebi('tablezone' + i)){
var p = '<table id="tablezone'+i+'" ';
p += ' style="border:solid 1px black;border-radius:5px;" ';
p += ' cellpadding=0 cellspacing=0 ';
p += ' onClick="SelectWorkingI('+i+');" ';
p += ' class="tmpshow showtext noselectmouse" >';
p += '<tbody class="tableZoneCell'+i+' noselectmouse" >';
p += '<tr class="tableZoneCell'+i+' noselectmouse" >';
p += '<td id="tblZoneCell'+i+'" class="tableZoneCell'+i+' noselectmouse" ';
p += ' style="text-align:center;" >';
p += obj.text;
p += '</td></tr></tbody></table>';
$('body').append(p);
}
$('#tblZoneCell'+i).html(obj.text);
$('.tableZoneCell'+i).css("width",labW+'px').css("height",labH +'px');
$('#tablezone'+i).css("left",labL+'px').css("top",labT+'px');
$('#tablezone'+i).css("width",labW+'px').css("height",labH +'px');
var tz = parseInt(obj.fontSize * zoomCanv);
if(tz<3){tz=3;}
$('#tablezone'+i).css("font-size",tz+'px');
$('#tablezone'+i).css("display","block");
$('#tablezone'+i).css("overflow","hidden");
$('#tablezone'+i).css("color",col);
}
if(obj.type=='dom'){
var domL = parseInt(obj.getX() * zoomCanv) + decxCanv;
var domT = parseInt(obj.getY() * zoomCanv) + decyCanv;
var domW = parseInt(obj.getW() * zoomCanv);
var domH = parseInt(obj.getH() * zoomCanv);
var cssExtra = rJtext(obj.text6);
cssExtra = cssExtra.replace(/(\r\n|\n|\r)/gm,"");
if(!openelearning.gebi('tablezone' + i)){
var p = '<div id="tablezone'+i+'" ';
p += ' style="' + cssExtra + '" ';
p += ' onClick="SelectWorkingI('+i+');" ';
p += ' class="tmpshow showtext noselectmouse" >';
p += '<div id="tablezoneinner'+i+'" ';
p += ' style="position:absolute;top:50%;';
p += 'margin-top:-15px;line-height:30px;';
p += 'height:30px;left:0%;right:0%;" >';
p += obj.text;
p += '</div></div>';
$('body').append(p);
contextInstall($('#tablezone' + i));
}
$('#tablezone'+i).attr("style",cssExtra);
$('#tablezoneinner'+i).html(obj.text);
$('#tablezone'+i).css("left",domL+'px').css("top",domT+'px');
$('#tablezone'+i).css("width",domW+'px').css("height",domH +'px');
var tz = parseInt(obj.fontSize * zoomCanv);
if(tz<6){tz=6;}
$('#tablezone'+i).css("font-size",tz+'px');
$('#tablezone'+i).css("display","block");
}
if(obj.type=='buttonarea'){
var domL = parseInt(obj.getX() * zoomCanv) + decxCanv;
var domT = parseInt(obj.getY() * zoomCanv) + decyCanv;
var domW = parseInt(obj.getW() * zoomCanv);
var domH = parseInt(obj.getH() * zoomCanv);
var cssExtra = "background-image:url('img/zonearea.png');";
cssExtra += "background-repeat:no-repeat;";
cssExtra += "background-position:center center;";
if(!openelearning.gebi('tablezone' + i)){
var p = '<div id="tablezone'+i+'" ';
p += ' style="' + cssExtra + '" ';
p += ' onClick="SelectWorkingI('+i+');" ';
p += ' class="tmpshow showtext noselectmouse" >';
p += '</div>';
$('body').append(p);
contextInstall($('#tablezone' + i));
}
$('#tablezone'+i).css("left",domL+'px').css("top",domT+'px');
$('#tablezone'+i).css("width",domW+'px').css("height",domH +'px');
$('#tablezone'+i).css("display","block");
}
if(obj.type=='helper'&&(obj.text=='home'||obj.text=='qcm')){
var helpL = parseInt(obj.getX() * zoomCanv) + decxCanv + 10;
var helpT = parseInt((obj.getY() + obj.height - 60) * zoomCanv) + decyCanv + 5;
var helpH = parseInt(60 * zoomCanv) - 10;
var helpW = parseInt(obj.getW() * zoomCanv) - 20;
var col = 'gray';
if(parseInteger(obj.val)==1){col='white';}
if(!openelearning.gebi('textzone' + i)){
var p = '<div id="textzone'+i+'" ';
p = p + ' onClick="SelectWorkingI('+i+');" ';
p = p + ' class="tmpshow nosel showtext helpershow noselectmouse" >';
p = p + obj.text2;
p = p + '</div>';
$('body').append(p);
}
$('#textzone'+i).html(obj.text2);
$('#textzone'+i).css("left",helpL+'px').css("top",helpT+'px');
$('#textzone'+i).css("width",helpW+'px').css("max-height",helpH+'px');
var tz = parseInt(16 * zoomCanv)
if(tz<3){tz=3;}
$('#textzone'+i).css("text-align",'center');
$('#textzone'+i).css("font-size",tz+'px');
$('#textzone'+i).css("display","block");
$('#textzone'+i).css("overflow","hidden");
$('#textzone'+i).css("color",col);
}
if(obj.type=='speech'){
var speL = parseInt(obj.x * zoomCanv) + decxCanv + 10;
var speT = parseInt(obj.y * zoomCanv) + decyCanv + 45;
var speW = parseInt(obj.width * zoomCanv)-20;
var speH = parseInt(obj.height * zoomCanv)-90;
var col='black';
if(!openelearning.gebi('textzone' + i)){
var idTmpObj =  "wizitxt" + guid();
var p = '<table id="textzone'+i+'" ';
p += ' onClick="SelectWorkingI('+i+');" ';
p += ' class="tmpshow tabletext '+idTmpObj+' noselectmouse" ><tbody>';
p += '<tr class=nosel >';
p += '<td id="textzoneinn'+i+'" valign="center" class=nosel >';
p += '<span class="noselectmouse" >' + obj.text + '</span>';
p += '</td></tr></tbody></table>';
$('body').append(p);
contextInstall($('.'+idTmpObj));
}
$('#textzoneinn'+i).html(obj.text);
$('#textzoneinn'+i).css("width",speW+'px').css("height",(speH - 5)+'px');
$('#textzone'+i).css("left",speL+'px').css("top",speT+'px');
$('#textzone'+i).css("width",speW+'px').css("height",speH+'px');
var tz = parseInt(obj.fontSize * zoomCanv)
if(tz<3){tz=3;}
$('#textzoneinn'+i).css("font-size",tz+'px');
$('#textzone'+i).css("display","block");
$('#textzone'+i).css("overflow","auto");
$('#textzoneinn'+i).css("text-align","center");
$('#textzoneinn'+i).css("color",col);
}
if(obj.type=='fluxPts'){
var sW = parseInt(obj.getW() * zoomCanv)/2;
var sH = parseInt(obj.getH() * zoomCanv)/2;
var x1 = parseInt(obj.getX() * zoomCanv) + decxCanv + sW;
var y1 = parseInt(obj.getY() * zoomCanv) + decyCanv + sH;
var nextObj = findObjectAfter(obj.val,obj.val3);
var x2 = parseInt(nextObj.x * zoomCanv) + decxCanv + sW;
var y2 = parseInt(nextObj.y * zoomCanv) + decyCanv + sH;
if(nextObj.x==-1){
$('#line'+i).css("display","none");
}else{
if(x2<x1){
var xm1 = x1;
var xm2 = x2;
var ym1 = y1;
var ym2 = y2;
y1 = ym2;
y2 = ym1;
x1 = xm2;
x2 = xm1;
}
if(!openelearning.gebi('line' + i)){
var clin = createLine(x1,y1,x2,y2,i);
$('body').append(clin);
}
var length = Math.sqrt((x1-x2)*(x1-x2) + (y1-y2)*(y1-y2));
var angle  = Math.atan2(y2 - y1, x2 - x1) * 180 / Math.PI;
var transform = 'rotate('+angle+'deg)';
var fny = y1;
if(y2<fny){
fny = y2;
}
$('#line'+i).css("display","block");
$('#line'+i).width(length)
$('#line'+i).offset({left:x1,top:fny});
$('#line'+i).css({'transform': transform});
}
}
if(obj.type=='plugme'){
drawSvgMapping(obj,i);
}
if(lastUniKid==obj.unikid){
var extraselectL = parseInt(obj.getX() * zoomCanv) + decxCanv;
var extraselectT = parseInt(obj.getY() * zoomCanv) + decyCanv;
var extraselectW = parseInt(obj.getW() * zoomCanv);
var extraselectH = parseInt(obj.getH() * zoomCanv);
if(!openelearning.gebi('extraselect')){
var p = '<div id="extraselect" ';
p += ' onMouseMove="eraseExtraSelect();" ';
p += ' onMouseOver="eraseExtraSelect();" ';
p += ' class="tmpshow showtext noselectmouse" >';
p += '</div>';
$('body').append(p);
}
var extraselectzone = $('#extraselect');
extraselectzone.css("position","absolute");
extraselectzone.css("border","solid 1px orange");
extraselectzone.css("left",extraselectL+'px').css("top",extraselectT+'px');
extraselectzone.css("width",extraselectW+'px').css("height",extraselectH+'px');
extraselectzone.css("display","block");
}
}
var memStyleWizi = '';
function installWiziTexte(obj,i){
var showL = parseInt(obj.getX() * zoomCanv) + decxCanv + 5;
var showT = parseInt(obj.getY() * zoomCanv) + decyCanv + 5;
var showW = parseInt(obj.getW() * zoomCanv) - 10;
var showH = parseInt(obj.getH() * zoomCanv) - 10;
var txtEdit = replaceAll(obj.text,"data-ref="," style='pointer-events:none;' href='javascript:function(){return false;}' data-ref=");
var col='black';
if(parseInteger(obj.val)==1){col='white';}
if(!openelearning.gebi('textzone' + i)){
var idTmpObj =  "wizitxt" + guid();
var p = '<div id="textzone' + i + '" ';
p += ' onMouseUp="hookMouseUp();" ';
p += ' onClick="SelectWorkingI('+i+');" ';
p += ' class="tmpshow showtext ' + idTmpObj + ' noselectmouse" >';
p += txtEdit + '</div>';
$('body').append(p);
contextInstall($('.'+idTmpObj));
}
if(obj.css!=''){
$('#textzone'+i).attr("style",obj.css);
}
txtEdit += '<div class="areaActiveSelect" ';
txtEdit += 'onMouseDown="SelectWorkingI('+i+');" ></div>';
$('#textzone'+i).html(txtEdit);
if (txtEdit.indexOf('text-align:center')!=-1
||txtEdit.indexOf('text-align :center')!=-1
||txtEdit.indexOf('text-align : center')!=-1
||txtEdit.indexOf('text-align: center')!=-1) {
$('#textzone'+i).css('width',showW + 'px');
}
if (obj.type=='texthtml') {
$('#textzone'+i).find('div').click(function() {
console.log('SelectWorkingI('+i+')');
SelectWorkingI(i);
});
}
$('#textzone'+i).css("left",showL+'px').css("top",showT+'px');
if (obj.type=='texthtml') {
if (obj.text2!='') {
if (memStyleWizi.indexOf('')!=-1 ) {
}
$('head').append('<style type="text/css">' + obj.text2 + '</style>');
}
}
if(
(obj.css!=''&&obj.css.indexOf("background")!=-1)
||(obj.type=='texthtml')
){
$('#textzone'+i).css("width",showW+'px').css("height",showH +'px');
}else{
$('#textzone'+i).css("max-width",showW+'px').css("max-height",showH +'px');
}
if (obj.type=='texthtml') {
$('#textzone'+i).css("height",showH +'px');
}
var tz = parseInt(obj.fontSize * zoomCanv);
if(tz<3){tz=3;}
$('#textzone'+i).css("font-size",tz+'px');
$('#textzone'+i).css("display","block");
$('#textzone'+i).css("overflow","hidden");
$('#textzone'+i).find("p").css("margin",'0px').css("padding",'4px');
$('#textzone'+i).find("p").css("line-height","120%");
}
function drawSvgMapping(obj,i){
var objPlug = getCPlugById(obj.val);
if(typeof objPlug === "undefined"){
objPlug = new CPlug();
}
if (objPlug.name=='t6m_markswords') {
drawHardPlug(obj,objPlug,i);
}
var svgMapping = objPlug.screenTextMapping;
if(typeof svgMapping === "undefined"){
svgMapping = '';
}
if(svgMapping!=''){
var hPrt = '';
var xmlDoc = $.parseXML(svgMapping);
var xml_p = $(xmlDoc);
var textPlugs = obj.text.split("|");
$(xml_p).find('rect').each(function(){
var ref = parseInt($(this).attr('ref'));
var x = get2Deci(($(this).attr('x')/obj.width)*100);
var y = get2Deci(($(this).attr('y')/obj.height)*100);
var w = get2Deci(($(this).attr('width')/obj.width)*100);
var h = get2Deci(($(this).attr('height')/obj.height)*100);
var hl = parseInt($(this).attr('height')) * zoomCanv;
var type = plugToT($(this).attr('type'));
var defautsrc = plugToT($(this).attr('defautsrc'));
var ftsize = parseInt(16) * zoomCanv;
var valTxt = '';
if(textPlugs[ref]){
valTxt = textPlugs[ref];
}
if(type=="image"){
if(valTxt==''){
valTxt = defautsrc;
}
var wbpath = 'file:///' + folderAllImages + valTxt;
wbpath = wbpath.replace(/\\/g, "/");
wbpath = wbpath.replace('\\', "/");
var prt = '<img draggable=false class="zonewizi'+i+' noselectmouse" style="position:absolute;';
prt += 'border:dotted 1px red;';
prt += 'left:' + x + '%;';
prt += 'top:' + y + '%;';
prt += 'width:' + w + '%;';
prt += 'height:' + h + '%;" ';
prt += ' onClick="SelectWorkingI('+i+');" ';
prt += ' src="' + wbpath + '" />';
hPrt = hPrt + prt;
}else{
if(valTxt!=''){
var prt = '<div class="zonewizi'+i+' noselectmouse" onClick="SelectWorkingI('+i+');" style="position:absolute;';
prt += 'text-align:center;';
prt += 'border:dotted 0px red;';
prt += 'left:' + x + '%;';
prt += 'top:' + y + '%;';
prt += 'width:' + w + '%;';
prt += 'height:' + h + '%;';
prt += 'line-height:' + hl + 'px;';
prt += 'font-size:' + ftsize + 'px;';
prt += '" >' + valTxt + '</div>';
hPrt = hPrt + prt;
}
}
});
if(!openelearning.gebi('plugzone' + i)){
var p = '<div id="plugzone'+i+'" ';
p += ' onClick="SelectWorkingI('+i+');" ';
p += ' class="tmpshow showtext noselectmouse" >';
p += hPrt;
p += '</div>';
$('body').append(p);
}
var plugL = parseInt(obj.x * zoomCanv)+ decxCanv;
var plugT = parseInt(obj.y * zoomCanv)+ decyCanv;
var plugW = parseInt(obj.width * zoomCanv);
var plugH = parseInt(obj.height * zoomCanv);
var plugzone = $('#plugzone'+i);
plugzone.html(hPrt);
plugzone.css("left",plugL+'px').css("top",plugT+'px');
plugzone.css("width",plugW+'px').css("height",plugH+'px');
plugzone.css("display","block");
}
}
function findObjectAfter(id,ind){
for(var i=0;i<CLudisCount;i++){
var obj = CLudis[i];
if(obj.supp==0&&obj.pageId==GPageId){
if(obj.type=='fluxPts'){
if(obj.val==id){
if(obj.val3==(ind+1)){
return obj;
}
}
}
}
}
return LudiBase();
}
function findLines(){
var memval = "";
for(var i=0;i<CLudisCount;i++){
var obj = CLudis[i];
if(obj.supp==0&&obj.pageId==GPageId){
if(obj.type=='fluxPts'){
if(memval.indexOf(obj.val)==-1){
calculLines(obj.val);
memval = memval + obj.val;
}
}
}
}
}
function calculLines(id){
var ind = 0;
for(var i=0;i<CLudisCount;i++){
var obj = CLudis[i];
if(obj.supp==0&&obj.pageId==GPageId){
if(obj.type=='fluxPts'&&obj.val==id){
obj.val3 = ind;
ind = ind +1;
}
}
}
}
function createLine(x1,y1, x2,y2,i){
var length = Math.sqrt((x1-x2)*(x1-x2) + (y1-y2)*(y1-y2));
var angle  = Math.atan2(y2 - y1, x2 - x1) * 180 / Math.PI;
var transform = 'rotate('+angle+'deg)';
var line = $('<div>')
.addClass('lineoe')
.addClass('tmpshow')
.attr('id','line' + i )
.css({
'position': 'absolute',
'transform': transform
})
.width(length)
.offset({left: x1, top: y1});
return line;
}
function eraseExtraSelect(){
var extraselectzone = $('#extraselect');
extraselectzone.css("display","none");
lastUniKid = "e";
}
function isTxtHtml(objtext){
if(objtext.indexOf("<")!=-1){
return true;
}
if(objtext.indexOf("<span")!=-1){
return true;
}
if(objtext.indexOf("wysiwyg")!=-1){
return true;
}
return false;
}
function moveWiziZone(i){
var obj = CLudis[i];
if(obj.supp==0&&obj.pageId==GPageId){
var showL = parseInt(obj.getX() * zoomCanv) + decxCanv + 5;
var showT = parseInt(obj.getY() * zoomCanv) + decyCanv + 5;
if(obj.type=='video'){
var videoL = parseInt(obj.getX() * zoomCanv) + decxCanv + 5;
var videoT = parseInt(obj.getY() * zoomCanv) + decyCanv + 5;
$('#minvideoimage').css("left",videoL + 'px');
$('#minvideoimage').css("top",videoT + 'px');
}
if(obj.type=='text'||obj.type=='texthtml'||obj.type=='tcm'){
$('#textzone'+i).css("left",showL+'px').css("top",showT+'px');
}
if(obj.type=='label'){
var labL = parseInt(obj.getX() * zoomCanv) + decxCanv + 2;
var labT = parseInt(obj.getY() * zoomCanv) + decyCanv + 2;
$('#tablezone'+i).css("left",labL+'px').css("top",labT+'px');
}
if(obj.type=='dom'||obj.type=='buttonarea'){
var domL = parseInt(obj.getX() * zoomCanv) + decxCanv + 1;
var domT = parseInt(obj.getY() * zoomCanv) + decyCanv + 1;
$('#tablezone'+i).css("left",domL+'px').css("top",domT+'px');
}
if(obj.type=='title'){
$('#titlezone'+i).css("left",showL+'px').css("top",showT+'px');
}
if(obj.type=='speech'){
var speL = parseInt(obj.getX() * zoomCanv) + decxCanv + 10;
var speT = parseInt(obj.getY() * zoomCanv) + decyCanv + 45;
$('#textzone'+i).css("left",speL+'px').css("top",speT+'px');
}
if(obj.type=='plugme'){
var plugL = parseInt(obj.getX() * zoomCanv)+ decxCanv;
var plugT = parseInt(obj.getY() * zoomCanv)+ decyCanv;
var plugzone = $('#plugzone'+i);
plugzone.css("left",plugL+'px').css("top",plugT+'px');
var ftsize = parseInt(16*zoomCanv);
var zonewizi = $('zonewizi'+i);
}
}
}
function get2Deci(num){
return Math.round(num * 100) / 100;
}
function getBaseSvg(w,h){
var svg = '<?xml version="1.0" encoding="utf-8"?>';
svg = svg + '<!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" ';
svg = svg + ' "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd">';
svg = svg + '<svg version="1.1"  xmlns="http://www.w3.org/2000/svg" ';
svg = svg + ' xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" ';
svg = svg + ' viewBox="0 0 ' + w + ' ' + h +'" ';
svg = svg + ' enable-background="new 0 0 ' + w + ' ' + h +'" ';
svg = svg + ' xml:space="preserve">';
return svg;
}
function getBaseQcm(w,h,code){
var svg = getBaseSvg(w,h);
svg = svg + getLineQcm( 5,'Reponse 1',1);
svg = svg + getLineQcm((5 + 40),'Reponse 2',0);
svg = svg + getLineQcm((5 + 80),'Reponse 3',0);
svg = svg + getLineQcm((5 + 120),'Reponse 4',0);
svg = svg + getLineQcm((5 + 160),'Reponse 5',0);
svg = svg + '</svg>';
return svg;
}
var memHeightSvg = 210;
function getBaseQcmObj(w,h,obj){
var svg = getBaseSvg(w,h);
var j = 2;
var h = 104;
if(obj.text3!=''){
j=j+1;h = 155;
if(obj.text4!=''){
j=j+1;h = 207;
if(obj.text5!=''){
j=j+1;h = 257;
if(obj.text6!=''){
j=j+1;h = 307;
if(obj.text7!=''){
j=j+1;h = 357;
if(obj.text8!=''){
j=j+1;h = 407;
}
}
}
}
}
}
memHeightSvg = h;
svg += '<image ';
svg += ' xlink:href="img/qcm/qcm'+j+'.png" height="'+h+'px" ';
svg += ' x="3" y="3" ';
svg += ' width="453px" />';
var dx = 10;
var dy = 51;
svg +=  getLineQcm(dx , obj.text, obj.val);
svg +=  getLineQcm((dx + dy) , obj.text2, obj.val2);
if(obj.text3!=''){
svg +=  getLineQcm((dx + (dy * 2)) , obj.text3, obj.val3);
}else{
svg +=  getEmptyQcm(dx + (dy * 2));
}
if(obj.text4!=''){
svg +=  getLineQcm((dx + (dy * 3)) , obj.text4, obj.val4);
}else{
svg +=  getEmptyQcm(dx + (dy * 3));
}
if(obj.text5!=''){
svg +=  getLineQcm((dx + (dy * 4)) , obj.text5, obj.val5);
}else{
svg +=  getEmptyQcm(dx + (dy * 4));
}
if(obj.text6!=''){
svg +=  getLineQcm((dx + (dy * 5)) , obj.text6, obj.val6);
}else{
svg +=  getEmptyQcm(dx + (dy * 5));
}
if(obj.text7!=''){
svg +=  getLineQcm((dx + (dy * 6)) , obj.text7,obj.val7);
}else{
svg +=  getEmptyQcm(dx + (dy * 6));
}
if(obj.text8!=''){
svg +=  getLineQcm((dx + (dy * 7)) , obj.text8, obj.val8);
}else{
svg +=  getEmptyQcm(dx + (dy * 7));
}
svg +=  '</svg>';
return svg;
}
function getLineQcm(y,text,coche){
var svg = '<image ';
if(coche==0){
svg += ' xlink:href="img/circle.png" ';
}else{
svg += ' xlink:href="img/check.png" ';
}
svg += ' x="9" y="' + y + '" ';
svg += ' height="37px" width="37px" />';
svg += '<text text-anchor="start" font-family="Helvetica, Arial, sans-serif" font-size="18" ';
svg += ' y="' + (y + 25) + '" x="52" stroke-width="0" stroke="#000" fill="#000000" >';
svg +=  text;
svg +=  '</text>';
return svg;
}
function getEmptyQcm(y){
var svg = '<image xlink:href="img/empty.png" ';
svg += ' x="3" y="' + y + '" ';
svg += ' height="37px" width="37px" />';
svg += '<text text-anchor="start" font-family="Helvetica, Arial, sans-serif" font-size="18" ';
svg += ' y="' + (y + 25) + '" x="50" stroke-width="0" stroke="#000" ';svg =svg + ' fill="#000000" ></text>';
return svg;
}
function correctQcm(text){
var finalText = "                              ";//30 spaces
if(text.length<30){
text = text + finalText.substring(text.length);
}
return text;
}
function getBaseBouton(w,h,obj){
var svg = getBaseSvg(w,h);
if (typeof obj.text6 === "undefined") {obj.text6 = 1;}
if(obj.text6==0||obj.text6==1){
svg += '<image xlink:href="img/bouton.png" ';
svg += ' x="0" y="0" height="' + obj.height + 'px" width="160px" />';
}
if(obj.text6==2){
svg += '<image xlink:href="img/button/css3modernblue.png" ';
svg += ' x="0" y="0" height="' + obj.height + 'px" width="' + obj.width + 'px" />';
}
if(obj.text6==3){
svg += '<image xlink:href="img/button/css3modernorange.png" ';
svg += ' x="0" y="0" height="' + obj.height + 'px" width="' + obj.width + 'px" />';
}
if(obj.text6==4){
svg += '<image xlink:href="img/roundnext.png" ';
svg += ' x="0" y="0" height="' + obj.height + 'px" width="80px" />';
}
if(obj.text6==5){
svg += '<image xlink:href="img/roundprev.png" ';
svg += ' x="0" y="0" height="' + obj.height + 'px" width="80px" />';
}
if(obj.text6==6){
svg += '<image xlink:href="img/roundhidden.png" ';
svg += ' x="0" y="0" height="' + obj.height + 'px" width="80px" />';
}
if(obj.text6!=4&&obj.text6!=5&&obj.text6!=6){
svg += '<text ';
svg += ' font-family="Helvetica" font-size="18" ';
var possvg = ' y="25" x="56"';
var txtV = obj.text;
if(obj.text6==0||obj.text6==1){
possvg = ' y="25" x="56"';
}else{
possvg = ' y="30" x="76"';
}
if(obj.text=='Siguiente'){
possvg = ' y="25" x="44"';
}
if(obj.text=='Seguendo'){
possvg = ' y="25" x="44"';
}
if(obj.text=='Nächster'){
possvg = ' y="25" x="44"';
}
if(obj.text=='Suivant'){
possvg = ' y="25" x="50"';
}
if(obj.text=='<'){
possvg = ' y="25" x="75"';
txtV = '&lt;';
}
if(obj.text=='>'){
possvg = ' y="25" x="75"';
txtV = '&gt;';
}
svg += possvg;
svg += ' stroke-width="0" stroke="#000" ';
svg += ' fill="#000000" >' + txtV + '</text>';
}
svg += '</svg>';
return svg;
}
function getBaseLcm3(w,h,obj){
var svg = getBaseSvg(w,h);
svg = svg + '<image xlink:href="img/lcmbase3.png" ';
svg = svg + ' x="0" y="0" width="480px" height="260px" />';
svg = svg + getBaseText(46,obj.text);
svg = svg + getBaseText(136,obj.text2);
svg = svg + getBaseText(226,obj.text3);
svg = svg + '<text font-family="Helvetica" font-size="18" ';
svg = svg + ' x="340" y="46" stroke-width="0" stroke="#000" ';
svg = svg + ' fill="#000000" >';
svg = svg + obj.val;
svg = svg + '</text>';
svg = svg + '<text font-family="Helvetica" font-size="18" ';
svg = svg + ' x="340" y="136" stroke-width="0" stroke="#000" ';
svg = svg + ' fill="#000000" >';
svg = svg + obj.val2;
svg = svg + '</text>';
svg = svg + '<text font-family="Helvetica" font-size="18" ';
svg = svg + ' x="340" y="226" stroke-width="0" stroke="#000" ';
svg = svg + ' fill="#000000" >';
svg = svg + obj.val3;
svg = svg + '</text>';
svg = svg + '</svg>';
return svg;
}
function getBaseLcm4(w,h,obj){
var svg = getBaseSvg(w,h);
svg = svg + '<image xlink:href="img/lcmbase4.png" ';
svg = svg + ' x="0" y="0" width="480px" height="260px" />';
var iny = 63;
var dh0 = 40;
var dh1 = dh0 + (iny);
var dh2 = dh0 + (iny * 2);
var dh3 = dh0 + (iny * 3);
svg = svg + getBaseText(dh0,obj.text);
svg = svg + getBaseText(dh1,obj.text2);
svg = svg + getBaseText(dh2,obj.text3);
svg = svg + getBaseText(dh3,obj.text3);
svg = svg + '<text font-family="Helvetica" font-size="18" ';
svg = svg + ' x="340" y="' + dh0 + '" stroke-width="0" stroke="#000" ';
svg = svg + ' fill="#000000" >';
svg = svg + obj.val;
svg = svg + '</text>';
svg = svg + '<text font-family="Helvetica" font-size="18" ';
svg = svg + ' x="340" y="' + dh1 + '" stroke-width="0" stroke="#000" ';
svg = svg + ' fill="#000000" >';
svg = svg + obj.val2;
svg = svg + '</text>';
svg = svg + '<text font-family="Helvetica" font-size="18" ';
svg = svg + ' x="340" y="' + dh2 + '" stroke-width="0" stroke="#000" ';
svg = svg + ' fill="#000000" >';
svg = svg + obj.val3;
svg = svg + '</text>';
svg = svg + '<text font-family="Helvetica" font-size="18" ';
svg = svg + ' x="340" y="' + dh3 + '" stroke-width="0" stroke="#000" ';
svg = svg + ' fill="#000000" >';
svg = svg + obj.val4;
svg = svg + '</text>';
svg = svg + '</svg>';
return svg;
}
function getBaseLcm5(w,h,obj){
var svg = getBaseSvg(w,h);
svg = svg + '<image xlink:href="img/lcmbase5.png" ';
svg = svg + ' x="0" y="0" width="480px" height="320px" />';
var iny = 63;
var dh0 = 40;
var dh1 = dh0 + (iny);
var dh2 = dh0 + (iny * 2);
var dh3 = dh0 + (iny * 3);
var dh4 = dh0 + (iny * 4);
svg = svg + getBaseText(dh0,obj.text);
svg = svg + getBaseText(dh1,obj.text2);
svg = svg + getBaseText(dh2,obj.text3);
svg = svg + getBaseText(dh3,obj.text3);
svg = svg + getBaseText(dh4,obj.text4);
svg = svg + '<text font-family="Helvetica" font-size="18" ';
svg = svg + ' x="340" y="' + dh0 + '" stroke-width="0" stroke="#000" ';
svg = svg + ' fill="#000000" >';
svg = svg + obj.val;
svg = svg + '</text>';
svg = svg + '<text font-family="Helvetica" font-size="18" ';
svg = svg + ' x="340" y="' + dh1 + '" stroke-width="0" stroke="#000" ';
svg = svg + ' fill="#000000" >';
svg = svg + obj.val2;
svg = svg + '</text>';
svg = svg + '<text font-family="Helvetica" font-size="18" ';
svg = svg + ' x="340" y="' + dh2 + '" stroke-width="0" stroke="#000" ';
svg = svg + ' fill="#000000" >';
svg = svg + obj.val3;
svg = svg + '</text>';
svg = svg + '<text font-family="Helvetica" font-size="18" ';
svg = svg + ' x="340" y="' + dh3 + '" stroke-width="0" stroke="#000" ';
svg = svg + ' fill="#000000" >';
svg = svg + obj.val4;
svg = svg + '</text>';
svg = svg + '<text font-family="Helvetica" font-size="18" ';
svg = svg + ' x="340" y="' + dh4 + '" stroke-width="0" stroke="#000" ';
svg = svg + ' fill="#000000" >';
svg = svg + obj.val5;
svg = svg + '</text>';
svg = svg + '</svg>';
return svg;
}
function getBaseLcm6(w,h,obj){
var svg = getBaseSvg(w,h);
svg = svg + '<image xlink:href="img/lcmbase6.png" ';
svg = svg + ' x="0" y="0" width="480px" height="350px" />';
var iny = 58;
var dh0 = 35;
var dh1 = dh0 + (iny);
var dh2 = dh0 + (iny * 2);
var dh3 = dh0 + (iny * 3);
var dh4 = dh0 + (iny * 4);
var dh5 = dh0 + (iny * 5);
svg = svg + getBaseText(dh0,obj.text);
svg = svg + getBaseText(dh1,obj.text2);
svg = svg + getBaseText(dh2,obj.text3);
svg = svg + getBaseText(dh3,obj.text3);
svg = svg + getBaseText(dh4,obj.text4);
svg = svg + getBaseText(dh5,obj.text5);
svg = svg + '<text font-family="Helvetica" font-size="18" ';
svg = svg + ' x="340" y="' + dh0 + '" stroke-width="0" stroke="#000" ';
svg = svg + ' fill="#000000" >';
svg = svg + obj.val;
svg = svg + '</text>';
svg = svg + '<text font-family="Helvetica" font-size="18" ';
svg = svg + ' x="340" y="' + dh1 + '" stroke-width="0" stroke="#000" ';
svg = svg + ' fill="#000000" >';
svg = svg + obj.val2;
svg = svg + '</text>';
svg = svg + '<text font-family="Helvetica" font-size="18" ';
svg = svg + ' x="340" y="' + dh2 + '" stroke-width="0" stroke="#000" ';
svg = svg + ' fill="#000000" >';
svg = svg + obj.val3;
svg = svg + '</text>';
svg = svg + '<text font-family="Helvetica" font-size="18" ';
svg = svg + ' x="340" y="' + dh3 + '" stroke-width="0" stroke="#000" ';
svg = svg + ' fill="#000000" >';
svg = svg + obj.val4;
svg = svg + '</text>';
svg = svg + '<text font-family="Helvetica" font-size="18" ';
svg = svg + ' x="340" y="' + dh4 + '" stroke-width="0" stroke="#000" ';
svg = svg + ' fill="#000000" >';
svg = svg + obj.val5;
svg = svg + '</text>';
svg = svg + '<text font-family="Helvetica" font-size="18" ';
svg = svg + ' x="340" y="' + dh5 + '" stroke-width="0" stroke="#000" ';
svg = svg + ' fill="#000000" >';
svg = svg + obj.val6;
svg = svg + '</text>';
svg = svg + '</svg>';
return svg;
}
function getBaseText(y,text){
var svg = '';
var words = text.split(' ');
if(words.length>2){
y = y - 10;
var t1 = words[0] + ' ' + words[1];
var xt1 = 95 - getTextWidth(t1,'Helvetica 18pt');
svg = svg + '<text font-family="Helvetica" font-size="18" ';
svg = svg + ' x="' + xt1 + '" ';
svg = svg + ' y="' + y + '" stroke-width="0" stroke="#000" ';
svg = svg + ' fill="#000000" >';
svg = svg + t1
svg = svg + '</text>';
var t2 = words[2];
if(words.length>3){
t2 = t2 + ' ' + words[3];
}
var xt2 = 95 - getTextWidth(t2,'Helvetica 18pt');
svg = svg + '<text font-family="Helvetica" font-size="18" ';
svg = svg + ' x="' + xt2 + '" ';
svg = svg + ' y="' + parseInt(y + 22) + '" stroke-width="0" stroke="#000" ';
svg = svg + ' fill="#000000" >';
svg = svg + t2
svg = svg + '</text>';
}else{
var xtglobal = 95 - getTextWidth(text,'Helvetica 18pt');
svg = svg + '<text font-family="Helvetica" font-size="18" ';
svg = svg + ' x="' + xtglobal + '" ';
svg = svg + ' y="' + y + '" stroke-width="0" stroke="#000" ';
svg = svg + ' fill="#000000" >';
svg = svg + text
svg = svg + '</text>';
}
return svg;
}
function getBaseInput(w,h,obj){
var svg = getBaseSvg(w,h);
svg += '<rect x="0" y="0" width="' + w + '" height="' + h + '" ';
svg += ' stroke="gray" stroke-width="2px" fill="white"/>';
svg += '<text font-family="Helvetica" font-size="16" ';
svg += ' x="' + 4 + '" ';
svg += ' y="' + ((h/2)+2) + '" ';
svg += ' width="' + w + '" ';
svg += ' height="' + h + '" ';
svg += ' stroke-width="0" stroke="#000" ';
svg += ' fill="#000000" >';
svg += obj.text;
svg += '</text>';
svg += '</svg>';
return svg;
}
function getBaseVariable(w,h,obj){
var svg = getBaseSvg(w,h);
svg += '<ellipse  cx="' + (w/2) + '" cy="' + (h/2) + '" ';
svg += ' rx="' + ((w/2)-10) + '" ry="' + ((h/2)-10) + '" ';
svg += ' stroke="#00aa00" stroke-width="5px" fill="white"/>';
svg += '<svg width="' + w + 'px" height="' + h + 'px">';
svg += '<text x="50%" y="40%" alignment-baseline="middle" text-anchor="middle">';
svg += '<textPath startOffset="50%" xlink:href="#tp3">';
svg += obj.text + '</textPath>';
svg += '</text>';
svg += '</svg>';
svg += '<svg width="' + w + 'px" height="' + h + 'px">';
svg += '<text x="50%" y="70%" alignment-baseline="middle" text-anchor="middle">';
svg += '<textPath startOffset="50%" xlink:href="#tp3">';
svg += obj.text2 + '-' +  obj.text3 + '</textPath>';
svg += '</text>';
svg += '</svg>';
svg += '</svg>';
return svg;
}
function getBaseHelper(w,h,obj){
var svg = getBaseSvg(w,h);
svg += '<image xlink:href="img/helper/speed-home.png" ';
svg += 'x="0" y="0" ';
svg += 'height="150px" width="150px" />';
svg += '<svg width="150px" height="100px">';
svg += '<text x="50%" y="50%" alignment-baseline="middle" text-anchor="middle">';
svg += '<textPath startOffset="50%" xlink:href="#tp3">CHANGE</textPath>';
svg += '</text>';
svg += '</svg>';
/*
svg += '<rect x="0" y="0" width="150" height="150" stroke="red" stroke-width="3px" fill="white"/>';
svg += '<text ';
svg += ' font-family="Helvetica" font-size="18" ';
svg += " x='50%' y='50%' dominant-baseline='middle' text-anchor='middle' ";
svg += ' stroke-width="0" stroke="#000" ';
svg += ' fill="#000000" >';
svg += obj.text2;
svg += '</text>';
*/
svg += '</svg>';
return svg;
}
function hookChangeTabs(){
$('#pann-isometric').css('display','none');
}
function hookMouseUp(){
showWiziZone();
console.log("hookMouseUp");
}
function hookObjectMove(){
eventObjects = true;
moveWiziZone(GlobalUid);
console.log("hookObjectMove");
}
function showSmartBlocs(){
pageCreateSmartBlocs();
$('.opacedit').css("display","block");
$("#pageSmartBlocs").css("display","block");
$('.wrapperSmartBlocs').html(innerSmartBlocs());
}
function pageCreateSmartBlocs() {
if($("#pageSmartBlocs").length==0){
var p = '';
p += '<div id="pageSmartBlocs" ';
p += 'class="editnoteOelContents pan ' + TYPEWIND + 'osBorder" >';
p += barreEdit();
p += '<div class="wrapperSmartBlocs" >';
p += '</div>';
p += '<a style="position:absolute;left:15px;bottom:15px;" ';
p += ' onclick="closeEdit();" ';
p += 'class="validation noselectmouse" >' + getTrd('cancel') + '</a>';
p += '<a style="position:absolute;right:15px;bottom:15px;" ';
p += 'onclick="closeEdit();" ';
p += 'class="btnSave noselectmouse" >' + getTrd('save') + '</a>';
p += '</div>';
$('body').append(p);
}
}
function innerSmartBlocs() {
var p = '';
p += '<div onClick="appendSmartBlocs(1);" class="blocOelContents" ';
p += 'style="background-image:url(img/helper/smartbloc1.jpg);" ></div>';
p += '<div onClick="appendSmartBlocs(2);" class="blocOelContents" ';
p += 'style="background-image:url(img/helper/smartbloc2.jpg);" ></div>';
collSmartBloc.forEach((item, index) => {
var collItem = item;
var idColl = collItem.id;
p += '<div class="blocOelContents" ';
p += '<div onClick="appendSmartBlocsByPlug(\'' + collItem.id + '\');" ';
p += 'style="background-image:url(' + collItem.pth + ');" >';
p += '</div>';
});
p += '<div class="blocOelContents" >';
p += '</div>';
p += '<div class="blocOelContents" >';
p += '</div>';
return p;
}
function appendSmartBlocs(i){
closePan();
var objTemp = LudiBase();
objTemp.type= "texthtml";
objTemp.x = 30 + imgx;
objTemp.y = 170;
objTemp.width  = 600;
objTemp.height = 300;
objTemp.x2 = 22 + imgx;
objTemp.y2 = 90;
objTemp.width2  = 437;
objTemp.height2 = 350;
objTemp.realwidth = objTemp.width;
objTemp.realheight = objTemp.height;
objTemp.pageId = GPageId;
objTemp.text = getContentSmartBlocs(i);
objTemp.fontSize = 18;
CLudisAdd(objTemp);
lastUniKid = objTemp.unikid;
CLudisPaint();
eventObjects = true;
createRenderJSON();
deleteLudiHELPER();
}
function appendSmartBlocsByPlug(idColl){
var txtPlug = '';
var cssPlug = '';
collSmartBloc.forEach((item,index) => {
var collItem = item;
if (idColl == collItem.id) {
txtPlug = collItem.jsData;
cssPlug = collItem.cssData;
}
});
if (txtPlug!='') {
closePan();
var objTemp = LudiBase();
objTemp.type= "texthtml";
objTemp.x = 30 + imgx;
objTemp.y = 170;
objTemp.width  = 600;
objTemp.height = 300;
objTemp.x2 = 22 + imgx;
objTemp.y2 = 90;
objTemp.width2  = 437;
objTemp.height2 = 350;
objTemp.realwidth = objTemp.width;
objTemp.realheight = objTemp.height;
objTemp.pageId = GPageId;
objTemp.text = txtPlug;
objTemp.text2 = cssPlug;
objTemp.fontSize = 18;
CLudisAdd(objTemp);
lastUniKid = objTemp.unikid;
CLudisPaint();
eventObjects = true;
createRenderJSON();
deleteLudiHELPER();
}
}
function getContentSmartBlocs(i){
var h = '';
if (i==1){
h = renderpluginoelcontentcardinfo();
}
if (i==2){
h = renderpluginoelcontentcardinfo2();
}
return h;
}
function renderpluginoelcontentcardinfo() {
var h = '<div class="oelcardinfo oelcardinfoline" >';
h += ' <div class="meta">';
h += ' <div class="photo" ></div>';
h += ' </div>';
h += ' <div class="description">';
h += ' <div class=oelcardinfoh1 >Learning to Code</div>';
h += ' <div class=oelcardinfoh2 >Opening a door to the future</div>';
h += ' <p> Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad eum dolorum architecto obcaecati enim dicta praesentium, quam nobis! Neque ad aliquam facilis numquam. Veritatis, sit.</p>';
h += ' <p class="read-more"><br/></p>';
h += ' </div>';
h += ' </div>';
return h;
}
function renderpluginoelcontentcardinfo2() {
var h = '<div class="oelcardinfo oelcardinfolinelarge" >';
h += ' <div class="description">';
h += ' <div class="oelcardinfoh1 oeltxtcenter" >Learning to Design</div>';
h += ' <div class="oelcardinfoh2 oeltxtcenter" >Opening a door to elearning</div>';
h += ' <p class="oeltxtcenter" > Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad eum dolorum architecto obcaecati enim dicta praesentium, quam nobis! Neque ad aliquam facilis numquam. Veritatis, sit.</p>';
h += ' <p class="read-more"><br/></p>';
h += ' </div>';
h += ' <div class="metacircle">';
h += ' <div class="photo" ></div>';
h += ' </div>';
h += ' </div>';
return h;
}
function showSelImgChangeContent(){
targetImg = 6;
$('#editzoneContent').css("display","none");
$('.classWindow').css("display","none");
launchImageEditZone();
}
function applyImgToHtmlContent(urlImg) {
var obj = CLudis[GlobalUid];
if (obj.type=='texthtml'&&urlImg!='') {
obj.text6 = urlImg;
plogs('applyImgToHtmlContent('+ urlImg + ')');
var hContent = tinymce.get("textAreaV3").getContent();
if (hContent!='') {
var hContent2 = applyImgContentTiny1(hContent,urlImg);
var tinyMceSrcEdit = tinymce.get('textAreaV3');
tinyMceSrcEdit.setContent(hContent2);
}
}
}
function applyImgContentTiny1(hContent,urlImg){
if (hContent!='') {
if (urlImg!='') {
var absoluteUrlImg = (correctUrlImg(urlImg));
absoluteUrlImg = absoluteUrlImg.replace(/\\/g, "/");
if (hContent.indexOf("background-image:")==-1) {
if (hContent.indexOf('class="photo')!=-1) {
hContent = hContent.replace('class="photo',' style="background-image:url(\''+ absoluteUrlImg+'\');" class="photo');
}
} else {
hContent = hContent.replace(/url\((?!['"]?(?:data|http):)['"]?([^'"\)]*)['"]?\)/g,'url(\''+absoluteUrlImg+'\')');
}
}
}
return hContent;
}
function pageEditDom(){
}
function pageEditShow(){
targetImg = 1;
var obj = GetPageById(GPageId);
if (obj.back=='') {
$('#BackEditSelect').html("-");
} else {
$('#BackEditSelect').html(get17Letter(obj.back));
}
if(obj.backsvg=='') {
$('#BackEditSelectSVG').html("-");
}else{
$('#BackEditSelectSVG').html(get17Letter(obj.backsvg));
}
if (obj.back2=='') {
$('#Back2EditSelect').html("-");
} else {
$('#Back2EditSelect').html(get17Letter(obj.back2));
}
if (obj.back2svg=='') {
$('#Back2EditSelectSVG').html("-");
} else {
$('#Back2EditSelectSVG').html(get17Letter(obj.back2svg));
}
if (obj.screen=='') {
$('#typePageScreen').html("-");
}else{
$('#typePageScreen').html(get17Letter(obj.screen));
}
if(typeof obj.transition === "undefined") {
obj.transition = 'Direct'
}
if(obj.transition == "") {
obj.transition = 'Direct'
}
$('#transition-select').val(obj.transition);
switch(obj.comicMode) {
case 0:
$('#typePageSelect').html('Classic');
break;
case 1:
$('#typePageSelect').html('Comics01');
break;
case 2:
$('#typePageSelect').html('Comics02');
break;
case 3:
$('#typePageSelect').html('Comics03');
break;
case 4:
$('#typePageSelect').html('None');
break;
}
ludiCss('pageeditbtn');
}
function get14Letter(str){
var res = "";
if (typeof str === "undefined"){
res  = "-";
}else{
res = str.substring(0,15);
}
return res;
}
function get17Letter(str){
var res = "";
if (typeof str === "undefined"){
res  = "-";
}else{
res = str.substring(0,20);
}
return res;
}
function pageEditOptions(){
var p = '';
p += '<div id="pageeditbtn" class="editbackground pageeditbtn pan ' + TYPEWIND + 'osBorder" >';
p += barreEdit();
p += '<div class="containtablist" >';
p += '<a class="monotablist monotablist1 trd monotablistselect noselect" onclick="displayParamsTab1();" >General</a>';
p += '<a class="monotablist monotablist2 trd noselect" onclick="displayParamsTab2();" >Background</a>';
p += '<a class="monotablist monotablist3 trd noselect" onclick="displayParamsTab3();" >Options</a>';
p += '</div>';
p += '<div class="ligneParams typpagetab1" style="margin-top:30px;" >';
p += '<div class="ligneParamsLabel nosel" >Page&nbsp;title&nbsp;:&nbsp;</div>';
p += '<input class="ligneParamsInput css-input" id="actionEditBack" ';
p += ' type="text" onchange="setSourceButton();" ';
p += ' onkeyup="setSourceButton();" value="" />';
p += '</div>';
p += '<div class="ligneParams typpagetab1" >';
p += '<div class="ligneParamsLabel nosel" >Page&nbsp;script&nbsp;:&nbsp;</div>';
p += '<span onClick="showScriptEdit(1);" class="fakeSelect" >...</span>';
p += '</div>';
p += '<div class="ligneParams typpagetab1" >';
p += '<div class="ligneParamsLabel nosel" >Transition&nbsp;:&nbsp;</div>';
p += '<select name="transition-select" id="transition-select" class="ligneParamsSelect css-input nosel" >';
p += '<option value="Direct">Direct</option>';
p += '<option value="Explose">Explose</option>';
p += '<option value="FlipSlide">FlipSlide</option>';
p += '</select>';
p += '</div>';
p += '<div id="selectTypePageSelect" class="selectChoiceTypePage pan" >';
p += '<div onClick="selChType(0);" class="actionSelect" >Classic</div>';
p += '<div onClick="selChType(4);" class="actionSelect" >None</div>';
p += '<div onClick="selChType(1);" class="actionSelect" >Comics01</div>';
p += '<div onClick="selChType(2);" class="actionSelect" >Comics02</div>';
p += '<div onClick="selChType(3);" class="actionSelect" >Comics03</div>';
p += '</div>';
p += '<div class="ligneParams typpagetab1" >';
p += '<div class="ligneParamsLabel nosel" >Type&nbsp;page&nbsp;:&nbsp;</div>';
p += '<span id="typePageSelect" onClick="showTypePageSelect();" ';
p += ' class="fakeSelect" >-</span>';
p += '</div>';
p += '<div class="ligneParams typpagetab2" style="display:none;margin-top:30px;" >';
p += '<div class="ligneParamsLabel nosel" >Background&nbsp;page&nbsp;:&nbsp;</div>';
p += '<span id="BackEditSelect" onClick="showChoiceBackground();" ';
p += ' class="fakeSelectBack" >-</span>';
p += '</div>';
p += '<div class="ligneParams typpagetab2" style="display:none;" >';
p += '<div class="ligneParamsLabel nosel" >Background&nbsp;SVG&nbsp;:&nbsp;</div>';
p += '<span id="BackEditSelectSVG" onClick="showChoiceBackground11();" ';
p += ' class="fakeSelectBack" >-</span>';
p += '</div>';
p += '<div class="ligneParams typpagetab2" style="display:none;" >';
p += '<div class="ligneParamsLabel nosel" >Background&nbsp;Smart&nbsp;:&nbsp;</div>';
p += '<span id="Back2EditSelect" onClick="showChoiceBackground12();" ';
p += ' class="fakeSelectBack" >-</span>';
p += '</div>';
p += '<div class="ligneParams typpagetab2" style="display:none;" >';
p += '<div class="ligneParamsLabel nosel" >Background&nbsp;Smart&nbsp;SVG&nbsp;:&nbsp;</div>';
p += '<span id="Back2EditSelectSVG" onClick="showChoiceBackground13();" ';
p += ' class="fakeSelectBack" >-</span>';
p += '</div>';
p += '<div class="ligneParams typpagetab2" style="display:none;position:relative;" >';
p += '<div class="ligneParamsLabel nosel" >Background&nbsp;screen&nbsp;:&nbsp;</div>';
p += '<span id="typePageScreen" onClick="showChoiceBackScreen();" ';
p += ' class="fakeSelectBack" >-</span>';
p += '<a onClick="deleteImageBackScreen();" class="actionDeleteBackRel" style="display:block!important;float:right;" ></a>';
p += '</div>';
p += '<a style="position:absolute;left:15px;bottom:15px;" ';
p += ' onclick="closeEdit();" ';
p += 'class="validation noselectmouse" >' + getTrd('cancel') + '</a>';
p += '<a style="position:absolute;right:15px;bottom:15px;" ';
p += 'onclick="savePageElements();" ';
p += 'class="btnSave noselectmouse" >' + getTrd('save') + '</a>';
p += '</div>';
return p;
}
function removeAllClassTabs(){
$(".monotablist1").removeClass("monotablistselect");
$(".monotablist2").removeClass("monotablistselect");
$(".monotablist3").removeClass("monotablistselect");
$('.typpagetab1').css("display","none");
$('.typpagetab2').css("display","none");
$('.typpagetab3').css("display","none");
}
function displayParamsTab1(){
removeAllClassTabs()
$(".monotablist1").addClass("monotablistselect");
$('.typpagetab1').css("display","block");
}
function displayParamsTab2(){
removeAllClassTabs();
$(".monotablist2").addClass("monotablistselect");
$('.typpagetab2').css("display","block");
}
function displayParamsTab3(){
removeAllClassTabs();
$(".monotablist3").addClass("monotablistselect");
$('.typpagetab3').css("display","block");
}
function savePageElements(){
var objPage = GetPageById(GPageId);
objPage.transition = $('#transition-select').val();
closeEdit();
}
function showTypePageSelect(){
$('#selectTypePageSelect').css("display","block");
}
function showChoiceBackground(){
targetImg = 1;
$('#pageeditbtn').css("display","none");
launchImageEditZone();
}
function showChoiceBackground11(){
targetImg = 11;
$('#pageeditbtn').css("display","none");
launchImageEditZone();
}
function showChoiceBackground12(){
targetImg = 12;
$('#pageeditbtn').css("display","none");
launchImageEditZone();
}
function showChoiceBackground13(){
targetImg = 13;
$('#pageeditbtn').css("display","none");
launchImageEditZone();
}
function showChoiceBackScreen(){
targetImg = 2;
$('#pageeditbtn').css("display","none");
launchImageEditZone();
}
var typeCode = 1;
function showScriptEdit(type){
typeCode = type;
if (typeCode==1) {
if (GPageId=='') {
return false;
}
eventPages = true;
$("#listecrans").sortable('disable');
var objPage = GetPageById(GPageId);
$('#textareascript').val(objPage.script);
$('#editscript').css("display","block");
$('#pageeditbtn').css("display","none");
}
if (typeCode==2) {
var obj = CLudis[GlobalUid];
if (obj.type=='texthtml') {
var cssEdit = obj.text2;
$('#textareascript').val(cssEdit);
$('#editscript').css("display","block");
$('#editzoneContent').css("display","none");
$('#pageeditbtn').css("display","none");
}
}
}
function setSourceScript(){
if (typeCode==1) {
if(GPageId==''){
return false;
}
var objPage = GetPageById(GPageId);
objPage.script = $('#textareascript').val();
closePan();
}
if (typeCode==2) {
var obj = CLudis[GlobalUid];
if (obj.type=='texthtml') {
obj.text2= $('#textareascript').val();
}
closePan();
}
eventPages = true;
eventObjects = true;
}
var cacheBackWhite;
var cacheBackJeuTV;
function selChBack(i){
var obj = GetPageById(GPageId);
$('#BackEditSelect').html('img&nbsp;');
$('#selectChoiceBackground').css("display","none");
loadImgBackCanvas(folderAllImages + obj.back);
}
function selChType(i){
var obj = GetPageById(GPageId);
obj.comicMode = i;
$('#selectTypePageSelect').css("display","none");
pageEditShow();
if(obj.comicMode==4){
canvas.overlayImage = null;
canvas.renderAll.bind(canvas);
}else{
if(obj.comicMode>0){
deleteLudiHELPER();
var pathPath = folderAllImages + "comic-0" + obj.comicMode + ".png";
canvas.setOverlayImage(pathPath, canvas.renderAll.bind(canvas));
}else{
canvas.overlayImage = null;
canvas.renderAll.bind(canvas);
}
}
}
function questionQcmEdit(){
var p = '<div class="questionqcmedit pan ' + TYPEWIND + 'osBorder" >';
p += barreEdit();
p +='<a id="cocheqcm1" onClick="qcmProcessClick(1);" class="cocheqcmedit" style="margin-top:35px;" ></a>';
p += '<input id="sourceqcm1" onkeyup="ajusteQcm();" type="text" class="textqcmedit"  style="margin-top:35px;" />';
p += '<a id="cocheqcm2" onClick="qcmProcessClick(2);" class="cocheqcmedit" ></a>';
p += '<input id="sourceqcm2" onkeyup="ajusteQcm();" type="text" class="textqcmedit" />';
p += '<a id="cocheqcm3" onClick="qcmProcessClick(3);" class="cocheqcmedit" ></a>';
p += '<input id="sourceqcm3" onkeyup="ajusteQcm();" type="text" class="textqcmedit" />';
p += '<a id="cocheqcm4" onClick="qcmProcessClick(4);" class="cocheqcmedit" ></a>';
p += '<input id="sourceqcm4" onkeyup="ajusteQcm();" type="text" class="textqcmedit" />';
p += '<a id="cocheqcm5" onClick="qcmProcessClick(5);" class="cocheqcmedit" ></a>';
p += '<input id="sourceqcm5" onkeyup="ajusteQcm();" type="text" class="textqcmedit" />';
p += '<a id="cocheqcm6" onClick="qcmProcessClick(6);" class="cocheqcmedit" ></a>';
p += '<input id="sourceqcm6" onkeyup="ajusteQcm();" type="text" class="textqcmedit" />';
p += '<a id="cocheqcm7" onClick="qcmProcessClick(7);" class="cocheqcmedit" ></a>';
p += '<input id="sourceqcm7" onkeyup="ajusteQcm();" type="text" class="textqcmedit" />';
p += '<a id="cocheqcm8" onClick="qcmProcessClick(8);" class="cocheqcmedit" ></a>';
p += '<input id="sourceqcm8" onkeyup="ajusteQcm();" type="text" class="textqcmedit" />';
p += '<a style="position:absolute;left:15px;bottom:15px;" ';
p += ' onclick="closeEdit();" ';
p += 'class="validation noselectmouse" >' + getTrd('cancel') + '</a>';
p += '<a style="position:absolute;right:15px;bottom:15px;" ';
p += 'onclick="saveQcmInsert();" ';
p += 'class="btnSave noselectmouse" >' + getTrd('save') + '</a>';
p += '</div>';
return p;
}
function saveQcmInsert(){
getSourceQcm();
$('.opacedit').css("display","none");
$('.questionqcmedit').css("display",'none');
showWiziZone();
}
function getSourceQcm(){
if(GlobalUid==-1){
return false;
}
redimQcm(GlobalUid);
var obj = CLudis[GlobalUid];
if(obj.type=='qcm'){
obj.text = $('#sourceqcm1').val();
obj.text2 = $('#sourceqcm2').val();
obj.text3 = $('#sourceqcm3').val();
obj.text4 = $('#sourceqcm4').val();
obj.text5 = $('#sourceqcm5').val();
obj.text6 = $('#sourceqcm6').val();
obj.text7 = $('#sourceqcm7').val();
obj.text8 = $('#sourceqcm8').val();
var svg = new String(getBaseQcmObj(453,210,obj));
var objCanvas = canvas.getActiveObject();
var objC;
fabric.loadSVGFromString(svg,function(objects,options){
objCanvas.paths[1] = objects[1];
objCanvas.paths[2].text = objects[2].text;
objCanvas.paths[3] = objects[3];
objCanvas.paths[4].text = objects[4].text;
objCanvas.paths[5] = objects[5];
objCanvas.paths[6].text = objects[6].text;
objCanvas.paths[7] = objects[7];
objCanvas.paths[8].text = objects[8].text;
objCanvas.paths[9] = objects[9];
objCanvas.paths[10].text = objects[10].text;
});
}
eventObjects = true;
}
function setSourceQcm(uid){
var obj = CLudis[uid];
if(obj.type=='qcm'){
$('#cocheqcm3,#sourceqcm3').css("display",'none');
$('#cocheqcm4,#sourceqcm4').css("display",'none');
$('#cocheqcm5,#sourceqcm5').css("display",'none');
$('#cocheqcm6,#sourceqcm6').css("display",'none');
$('#cocheqcm7,#sourceqcm7').css("display",'none');
$('#cocheqcm8,#sourceqcm8').css("display",'none');
$('#sourceqcm1').val(obj.text);
$('#sourceqcm2').val(obj.text2);
$('#sourceqcm3').val(obj.text3);
$('#sourceqcm4').val(obj.text4);
$('#sourceqcm5').val(obj.text5);
$('#sourceqcm6').val(obj.text6);
$('#sourceqcm7').val(obj.text7);
$('#sourceqcm8').val(obj.text8);
cocheQcmProcess(1,obj.val);
cocheQcmProcess(2,obj.val2);
cocheQcmProcess(3,obj.val3);
cocheQcmProcess(4,obj.val4);
cocheQcmProcess(5,obj.val5);
cocheQcmProcess(4,obj.val6);
cocheQcmProcess(5,obj.val7);
cocheQcmProcess(4,obj.val8);
if(obj.text2!=''){
$('#cocheqcm3,#sourceqcm3').css("display",'block');
}
if(obj.text3!=''){
$('#cocheqcm4,#sourceqcm4').css("display",'block');
}
if(obj.text4!=''){
$('#cocheqcm5,#sourceqcm5').css("display",'block');
}
if(obj.text5!=''){
$('#cocheqcm6,#sourceqcm6').css("display",'block');
}
if(obj.text6!=''){
$('#cocheqcm7,#sourceqcm7').css("display",'block');
}
if(obj.text7!=''){
$('#cocheqcm8,#sourceqcm8').css("display",'block');
}
}
eventObjects = true;
}
function redimQcm(uid){
var obj = CLudis[uid];
if(obj.type=='qcm'){
var hw = 280;
if(obj.text2!=''){
$('#cocheqcm3,#sourceqcm3').css("display",'block');
hw = 280;
}else{
$('#cocheqcm3,#sourceqcm3').css("display",'none');
}
if(obj.text3!=''){
$('#cocheqcm4,#sourceqcm4').css("display",'block');
hw = 300;
}else{
$('#cocheqcm4,#sourceqcm4').css("display",'none');
}
if(obj.text4!=''){
$('#cocheqcm5,#sourceqcm5').css("display",'block');
hw = 350;
}else{
$('#cocheqcm5,#sourceqcm5').css("display",'none');
}
if(obj.text5!=''){
$('#cocheqcm6,#sourceqcm6').css("display",'block');
hw = 400;
}else{
$('#cocheqcm6,#sourceqcm6').css("display",'none');
}
if(obj.text6!=''){
$('#cocheqcm7,#sourceqcm7').css("display",'block');
hw = 450;
}else{
$('#cocheqcm7,#sourceqcm7').css("display",'none');
}
if(obj.text7!=''){
$('#cocheqcm8,#sourceqcm8').css("display",'block');
hw = 500;
}else{
$('#cocheqcm8,#sourceqcm8').css("display",'none');
}
$('.questionqcmedit').css("height",hw + 'px');
}
}
function ajusteQcm(){
ModeEdit = true;
UidEdit = GlobalUid;
var t2 = $('#sourceqcm2').val();
if(t2!=''){
$('#cocheqcm3,#sourceqcm3').css("display",'block');
}else{
$('#cocheqcm3,#sourceqcm3').css("display",'none');
}
var t3 = $('#sourceqcm3').val();
if(t3!=''){
$('#cocheqcm4,#sourceqcm4').css("display",'block');
}else{
$('#cocheqcm4,#sourceqcm4').css("display",'none');
}
var t4 = $('#sourceqcm4').val();
if(t4!=''){
$('#cocheqcm5,#sourceqcm5').css("display",'block');
}else{
$('#cocheqcm5,#sourceqcm5').css("display",'none');
}
var t5 = $('#sourceqcm5').val();
if(t5!=''){
$('#cocheqcm6,#sourceqcm6').css("display",'block');
}else{
$('#cocheqcm6,#sourceqcm6').css("display",'none');
}
var t6 = $('#sourceqcm6').val();
if(t6!=''){
$('#cocheqcm7,#sourceqcm7').css("display",'block');
}else{
$('#cocheqcm7,#sourceqcm7').css("display",'none');
}
var t7 = $('#sourceqcm7').val();
if(t7!=''){
$('#cocheqcm8,#sourceqcm8').css("display",'block');
}else{
$('#cocheqcm8,#sourceqcm8').css("display",'none');
}
getSourceQcm();
redimQcm(GlobalUid);
eventObjects = true;
}
function cocheQcmProcess(i,coche){
var coh = $('#cocheqcm' + i);
if(coche==0){
coh.css("background-image",'url(img/circle40.png)');
}else{
coh.css("background-image",'url(img/check40.png)');
}
eventObjects = true;
}
function qcmProcessClick(i){
var obj = CLudis[GlobalUid];
var coh = $('#cocheqcm' + i);
var bg = coh.css('background-image');
if(bg.indexOf('circle40')!=-1){
if(i==1){obj.val  = 1;}
if(i==2){obj.val2 = 1;}
if(i==3){obj.val3 = 1;}
if(i==4){obj.val4 = 1;}
if(i==5){obj.val5 = 1;}
if(i==6){obj.val6 = 1;}
if(i==7){obj.val7 = 1;}
if(i==8){obj.val8 = 1;}
coh.css("background-image",'url(img/check40.png)');
}else{
if(i==1){obj.val  = 0;}
if(i==2){obj.val2 = 0;}
if(i==3){obj.val3 = 0;}
if(i==4){obj.val4 = 0;}
if(i==5){obj.val5 = 0;}
if(i==6){obj.val6 = 0;}
if(i==7){obj.val7 = 0;}
if(i==8){obj.val8 = 0;}
coh.css("background-image",'url(img/circle40.png)');
}
getSourceQcm();
eventObjects = true;
}
var refAct = ["DS","DK","DP","GO","AP","DC","AI"];
var refActs = ["nextpage","nextpageisok","previouspage","tothepage","personalact","nextpagefeedback","displayimage"];
function questionEditDelete(){
var p = '';
p += '<div id="editdelete" class="loadBase pan ' + TYPEWIND + 'osBorder" style="height:100px;" >';
p += '<div class="toolbar-w toolbar-header">';
p += '<div onClick="closeEdit();" class="closehead" ></div>';
p += '<h1 class="titlehead" >'+getTrd("deleteMessage")+'</h1>';
p += '</div>';
p += '<br/><br/><center><a onClick="closeEdit();" class="validation">'+getTrd("no")+'</a>&nbsp;&nbsp;&nbsp;';
p += '<a onClick="actionDelete();" class="btnSave">'+getTrd("yes")+'</a>';
p += '</center></div>';
return p;
}
function barreEdit(){
var p = barEditWind(getTrd("Edition"));
return p;
}
function questionEdit(){
var p = '<div id="editnote" class="editnote pan ' + TYPEWIND + 'osBorder" >';
p += barreEdit();
p += '<p>Note&nbsp;if&nbsp;false&nbsp;answer&nbsp;:&nbsp;</p>';
p += '<input id="questioneditremarque" type="text" style="width:365px;" ';
p += ' class="css-input" onchange="setSourceNote();" onkeyup="setSourceNote();" value="" />';
p += '<p>Score&nbsp;:&nbsp;&nbsp;';
p += '<input id="questioneditnote" type="number" style="width:90px;" ';
p += ' class="css-input" onchange="setSourceNote();" ';
p += 'onkeyup="setSourceNote();" min="0" max="10" value="" /></p>';
p += '</div>';
return p;
}
function LunchPluginEdit(obj){
if(!openelearning.gebi('editplugin')&&obj.text3!=''){
var p = '<div id="editplugin" class="editzoneplugin pan ' + TYPEWIND + 'osBorder" >';
p += barreEdit();
p += '<p id="labelfield1" >'+obj.text3+' :</p>';
p += '<input id="field1" type="text" style="width:380px;" ';
p += ' class="css-input" onchange="setSourcePlugin();" onkeyup="setSourcePlugin();" value="" />';
p += '<p id="labelfield2" >'+obj.text4+' :</p>';
p += '<input id="field2" type="text" style="width:380px;" ';
p += ' class="css-input" onchange="setSourcePlugin();" onkeyup="setSourcePlugin();" value="" />';
p += '<a style="position:absolute;left:15px;bottom:15px;" ';
p += ' onclick="closeEdit();" ';
p += 'class="validation noselectmouse" >' + getTrd('cancel') + '</a>';
p += '<a style="position:absolute;right:15px;bottom:15px;" ';
p += 'onclick="setSourcePlugin();closeEdit();" ';
p += 'class="btnSave noselectmouse" >' + getTrd('save') + '</a>';
p += '</div>';
$('body').append(p);
}
placeWorkingPlace();
loadEdit = false;
$('#labelfield1').html(obj.text3 + ' :');
$('#field1').val(obj.text);
$('#labelfield2').html(obj.text4 + ' :');
$('#field2').val(obj.text2);
$('.opacedit,#editplugin').css("display","block");
}
function LaunchInputEdit(obj){
if(!openelearning.gebi('editInput')){
var p = '<div id="editInput" class="inputZoneWin pan ' + TYPEWIND + 'osBorder" >';
p += barreEdit();
p += '<p id="labelInput" >Answer :</p>';
p += '<input id="fieldInput" type="text" style="width:380px;" ';
p += 'class="css-input" value="" />';
p += '<a style="position:absolute;left:15px;bottom:15px;" ';
p += ' onclick="closeEdit();" ';
p += 'class="validation noselectmouse" >' + getTrd('cancel') + '</a>';
p += '<a style="position:absolute;right:15px;bottom:15px;" ';
p += 'onclick="setSourceInput();closeEdit();" ';
p += 'class="btnSave noselectmouse" >' + getTrd('save') + '</a>';
p += '</div>';
$('body').append(p);
}
placeWorkingPlace();
loadEdit = false;
$('#fieldInput').val(obj.text);
$('.opacedit,#editInput').css("display","block");
}
function tcmEditZone(){
var p = '<div id="tcmeditnote" class="editnote2 pan ' + TYPEWIND + 'osBorder" >';
p += barreEdit();
p += '<p>'+getTrd("text")+' :</p>';
p += '<textarea id="tcmtextarea" onchange="setSourceTcm();" ';
p += ' onkeyup="setSourceTcm();" col=75 line=35 class="textzone" ';
p += 'style="font-size:16px;width:440px;height:140px;" >';
p += '</textarea>';
p += '<p>'+getTrd("Distractors")+' :</p>';
p += '<textarea id="tcmdistra" onchange="setSourceTcm();" ';
p += ' onkeyup="setSourceTcm();" col=70 line=35 class="textzone" ';
p += 'style="font-size:16px;width:220px;height:140px;" >';
p += '</textarea>';
p += '<a style="position:absolute;left:15px;bottom:15px;" ';
p += ' onclick="closeEdit();" ';
p += 'class="validation noselectmouse" >' + getTrd('cancel') + '</a>';
p += '<a style="position:absolute;right:15px;bottom:15px;" ';
p += 'onclick="setSourceTcm();closeEdit();" ';
p += 'class="btnSave noselectmouse" >' + getTrd('save') + '</a>';
p += '</div>';
return p;
}
function lcmEditZone(){
var p = '<div id="lcmeditpan" class="editnote2 pan ' + TYPEWIND + 'osBorder" >';
p += barreEdit();
p += '<br><input id="sourcelcm1" onkeyup="setSourceLcm();" ';
p += ' type="text" class="lcm-input" />';
p += '<input id="tolcm1" onkeyup="setSourceLcm();" ';
p += ' type="text" class="lcm-input" />';
p += '<input id="sourcelcm2" onkeyup="setSourceLcm();" ';
p += ' type="text" class="lcm-input" />';
p += '<input id="tolcm2" onkeyup="setSourceLcm();" ';
p += ' type="text" class="lcm-input" />';
p += '<input onchange="ajustLcmZone()" id="sourcelcm3" onkeyup="setSourceLcm();" ';
p += ' type="text" class="lcm-input" />';
p += '<input onchange="ajustLcmZone()" id="tolcm3" onkeyup="setSourceLcm();" ';
p += ' type="text" class="lcm-input" />';
p += '<input onchange="ajustLcmZone()" id="sourcelcm4" onkeyup="setSourceLcm();" ';
p += ' type="text" class="lcm-input" />';
p += '<input onchange="ajustLcmZone()" id="tolcm4" onkeyup="setSourceLcm();" ';
p += ' type="text" class="lcm-input" />';
p += '<input onchange="ajustLcmZone()" id="sourcelcm5" onkeyup="setSourceLcm();" ';
p += ' type="text" class="lcm-input" />';
p += '<input onchange="ajustLcmZone()" id="tolcm5" onkeyup="setSourceLcm();" ';
p += ' type="text" class="lcm-input" />';
p += '<input onchange="ajustLcmZone()" id="sourcelcm6" onkeyup="setSourceLcm();" ';
p += ' type="text" class="lcm-input" />';
p += '<input onchange="ajustLcmZone()" id="tolcm6" onkeyup="setSourceLcm();" ';
p += ' type="text" class="lcm-input" />';
p += '<a style="position:absolute;left:15px;bottom:15px;" ';
p += ' onclick="closeEdit();" ';
p += 'class="validation noselectmouse" >' + getTrd('cancel') + '</a>';
p += '<a style="position:absolute;right:15px;bottom:15px;" ';
p += 'onclick="ajustLcmZone();closeEdit();" ';
p += 'class="btnSave noselectmouse" >' + getTrd('save') + '</a>';
p += '</div>';
return p;
}
function actionEdit(){
var p = '';
p += '<div id="actioneditbtn" class="editnoteactions pan ' + TYPEWIND + 'osBorder" >';
p += barreEdit();
p += GetActionSel("selectChoiceAction",112,109,'');
p += '<br>';
p += '<p id="actionTextPara" >&nbsp;Button&nbsp;Text;';
p += '&nbsp;:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;';
p += '<input id="actionedittext" type="text" style="width:190px;" ';
p += ' class="css-input" onchange="setSourceButton();"  ';
p += ' onkeyup="setSourceButton();" value="" />';
p += '</p>';
p += '<p>';
p += '<span class="labelactionswin" >';
p += 'Button&nbsp;Action&nbsp;:&nbsp;';
p += '</span>';
p += '<span id="actioneditselect" style="height:26px;width:220px;" ';
p += ' onClick="showChoiceAction();" ';
p += ' class="fakeSelect" >-</span>';
p += '<input id="actioneditpage" type="number" ';
p += ' class="css-input actionSelectPageNumber" onchange="setSourceButton();"  ';
p += ' onkeyup="setSourceButton();" min=0 max=100 value="" />';
p += '<a onClick="actionspersoShow();" class="actionSelectPersoBtn" ></a>';
p += '<a onClick="showSelImgDisplayImg();" class="actionSelectFileImage" ></a>';
p += '</p>';
p += '<a style="position:absolute;left:15px;bottom:15px;" ';
p += ' onclick="closeEdit();" ';
p += 'class="validation noselectmouse" >' + getTrd('cancel') + '</a>';
p += '<a style="position:absolute;right:15px;bottom:15px;" ';
p += 'onclick="closeEdit();" ';
p += 'class="btnSave noselectmouse" >' + getTrd('save') + '</a>';
p += '</div>';
return p;
}
function showChoiceAction(){
$('#selectChoiceAction').css("display","block");
}
function objectEditId(){
var p = '<div id="objetEditIdZone" ';
p += ' class="objetEditIdZone pan ' + TYPEWIND + 'osBorder" >';
p += barreEdit();
p += '<div style="position:relative;float:left;margin-top:35px;" >';
p += '<div style="float:left;padding:10px;min-width:60px;text-align:right;" >ID&nbsp;:&nbsp;</div>';
p += '<input  id="editIdObject" type="text" style="width:300px;float:left;" ';
p += ' class="css-input" value="" /></div>';
p += '<div style="position:relative;float:left;margin-top:10px;" >';
p += '<div style="float:left;padding:10px;min-width:60px;text-align:right;" >CSS&nbsp;:&nbsp;</div>';
p += '<input  id="editCssObject" type="text" style="width:300px;float:left;" ';
p += ' class="css-input" value="" /></div>';
p += '<a style="position:absolute;left:15px;bottom:15px;" ';
p += ' onclick="closeEdit();" ';
p += 'class="validation noselectmouse" >' + getTrd('cancel') + '</a>';
p += '<a style="position:absolute;right:15px;bottom:15px;" ';
p += 'onclick="saveEditIdCssFormat();closeEdit();" ';
p += 'class="btnSave noselectmouse" >' + getTrd('save') + '</a>';
p += '</div>';
return p;
}
function saveEditIdCssFormat(){
if(GlobalUid==-1){
return false;
}
var obj = CLudis[GlobalUid];
obj.idString = $('#editIdObject').val();
var cssStr = $('#editCssObject').val();
obj.css = cssStr;
}
function exceptionExtraWindows(){
var p = '';
p += '<div id="exeptionLogZone" class="exeptionLogZone pan ' + TYPEWIND + 'osBorder" >';
p += '<div class="toolbar-w toolbar-header">';
p += '<div onClick="closeEdit();" class="closehead" ></div>';
p += '<h1 class="titlehead">Exception</h1>';
p += '</div>';
p += '<div id="zoneLogText" class="zoneLogText" ></div>';
p += '<br><center><a onClick="closeEdit();" class="validation">Cancel</a>&nbsp;&nbsp;&nbsp;';
p += '<a onClick="forceLoad()" class="validation">Force</a>';
p += '</div>';
return p;
}
var canvas;
var canvasIsOK = false;
var zoomCanv = 1;
var oldZoomCanvas = 0;
var decxCanv = 1;
var decyCanv = 1;
var actualX = 0;
var actualY = 0;
var rectLudiscape;
var editor;
var EDITORMODE = 0;
var SCREEN_0_W = 960;
var SCREEN_0_H = 720;
(function() {
canvas = new fabric.Canvas('ecran');
canvas.hoverCursor = 'pointer';
var moveHandler = function (evt){
var movingObject = evt.target;
closePan();
if(typeof movingObject==="undefined"){
}else{
if (movingObject.id=='Move') {
var LudiObj = CLudis[GlobalUid];
var LinkObjectl = parseInt(movingObject.get('left')) + 29 ;
var LinkObjectt = parseInt(movingObject.get('top')) + 29;
if(haveGridPlace(LudiObj)){
LinkObjectl = Math.round(LinkObjectl/10) * 10;
LinkObjectt = Math.round(LinkObjectt/10) * 10;
}
if (LudiObj.text7=='panelslide') {
if (EDITORMODE==0) {
LinkObjectl = 920;
}
if (EDITORMODE==1) {
LinkObjectt = 440;
}
}
canvas.forEachObject(function(obj){
if (obj.id&&obj.id===GlobalUid){
obj.set('left',LinkObjectl);
obj.set('top', LinkObjectt);
LudiObj.setX(LinkObjectl);
LudiObj.setY(LinkObjectt);
}
});
hookObjectMove();
return false;
}else{
MoveObjectLudi.set('left',-100);
}
$('.tmpshow').css("display","none");
var i = parseInt(movingObject.id);
var obj = CLudis[i];
var ol = parseInt(movingObject.get('left'));
var ot = parseInt(movingObject.get('top'));
if(haveGridPlace(obj)){
ol = Math.round(ol/10) * 10;
ot = Math.round(ot/10) * 10;
}
if(obj.type!='img'){
if(ol<10){ol = 10;}
if(obj.type=='speech'){
if(ot<-30){ot = -30;}
}else{
if(ot<10){ot = 10;}
}
}
if(obj.type=='fluxPts'){
showWiziZone();
}
movingObject.set('left',ol);
movingObject.set('top',ot);
if(obj.type=='button'){
if(obj.text6==4||obj.text6==5||obj.text6==6){
if(EDITORMODE==0){
if(ol>SCREEN_0_W-90){
ol = SCREEN_0_W-90;
movingObject.set('left',ol);
}
}
if(EDITORMODE==1){
if(ol>390){
ol = 390;
movingObject.set('left',390);
}
}
}else{
if(EDITORMODE==0){
if(ol>760){
ol = 760;
movingObject.set('left',760);
}
}
if(EDITORMODE==1){
if(ol>310){
ol = 310;
movingObject.set('left',310);
}
}
}
if(EDITORMODE==0){
if(ot>650){
ot = 650;
movingObject.set('top',650);
}
}
if(EDITORMODE==1){
if(ot>720){
ot = 720;
movingObject.set('top',720);
}
}
}
obj.setX(ol);
obj.setY(ot);
eventObjects = true;
}
};
var resizeHandler = function (evt) {
var resizeObject = evt.target;
closePan();
if(typeof resizeObject==="undefined"){
}else{
if(resizeObject.id=='Move'){
return false;
eventObjects = true;
}
var i = (resizeObject.id);
var obj = CLudis[i];
var propX = resizeObject.get('width');
var propY = resizeObject.get('height');
var scalX = resizeObject.get('scaleX');
var scalY = resizeObject.get('scaleY');
var ow = parseInt(scalX * propX);
var oh = parseInt(scalY * propY);
obj.setW(ow);
obj.setH(oh);
if(obj.type=='text'||obj.type=='label'||obj.type=='dom'){
showWiziZone();
}
}
};
var modifiedHandler = function (evt){
var modifiedObject = evt.target;
};
var customEvtHandler = function (evt) {
console.log("I was triggered by a custom event.");
};
var customEvtHandlerAdded = function (evt){
};
canvas.on('object:moving', moveHandler);
canvas.on('object:scaling', resizeHandler);
canvas.on('object:modified', modifiedHandler);
canvas.on('custom:event', customEvtHandler);
canvas.on('object:added', customEvtHandlerAdded);
canvas.on('mouse:move', function(options) {
actualX = parseInt(options.e.layerX/zoomCanv);
actualY = parseInt(options.e.layerY/zoomCanv);
});
fabric.util.addListener(canvas.upperCanvasEl, 'dblclick', function (e){
if(GlobalUid==-1){return false;}
var target = canvas.findTarget(e);
var modifiedObject = target;
if (typeof modifiedObject === "undefined") {
}else{
var obj = CLudis[GlobalUid];
if(obj.haveEditElement()){
showEditZone();
placeWorkingPlace();
}
}
});
fabric.util.addListener(canvas.upperCanvasEl, 'click', function (e){
closePan();
var target = canvas.findTarget(e);
var modifiedObject = target;
if (typeof modifiedObject === "undefined") {
if(ModeEdit){
reloadObject(UidEdit);
}
}else{
if(modifiedObject.id=='Move'){
return false;
eventObjects = true;
}
if(ModeEdit){
reloadObject(UidEdit);
}
SelectWorkingI(modifiedObject.id);
placeWorkingPlace();
}
});
rectLudiscape = fabric.util.createClass(fabric.Rect,{
type: 'textRectLudiscape',
initialize: function(options) {
options || (options = { });
this.callSuper('initialize', options);
this.set('label', options.label || '');
this.set('textColor', options.textColor || 'black');
this.set('fontSize', options.fontSize || 12);
},
toObject: function() {
return fabric.util.object.extend(this.callSuper('toObject'), {
label: this.get('label'),textColor: this.get('textColor')
});
},
_render: function(ctx) {
this.callSuper('_render', ctx);
ctx.font = this.fontSize + 'px Helvetica';
ctx.fillStyle = this.textColor;
rectangledText(ctx,-this.width/2 + 5,-this.height/2 + 20,this.width,cleanText(this.label),this.fontSize,'Helvetica',this.textColor);
}
});
canvasIsOK = true;
})();
$(function() {
contextInstall($('.backScreenDiv'));
contextInstall($('.canvas-container'));
$('#g-block').contextPopup({
title: 'Open eLearning',
items: [
{label:'Duplicate',
icon:'img/icons/windows.png',
action:function(){
duplikPages();
}},
{label:'Delete',
icon:'img/icons/delete.png',
action:function() {
deletePagesG();
}}
]
});
});
setTimeout(function(){
if ($('.global-block').length>0) {
contextScreenInstall($('.global-block'));
}
if ($('.global-block-little').length>0) {
contextScreenInstall($('.global-block-little'));
}
},1000);
function contextInstall(objMenu){
var plan_back = "Background";
var plan_normal = "Normal";
var plan_front = "Front";
var copy = "Copy";
var paste = "Paste";
var lock = "Lock";
if (globalLang=="fr") {
plan_back = "Arriere plan";
plan_normal = "Plan normal";
plan_front = "Avant plan";
copy = "Copier";
paste = "Coller";
lock = "Verrouiller";
}
if (globalLang=="de") {
plan_back = "Hintergrund";
plan_normal = "Normal";
plan_front = "Vordergrund";
copy = "Kopieren";
paste = "Einfügen";
lock = "Sperren";
}
objMenu.contextPopup({
title: 'Open eLearning',
items: [
{label:'Edit object',
icon:'img/icons/edit.png',
action:function(){
showEditZone();
}},
{label: copy+' Ctr + C',
icon:'img/icons/copy.png',
action:function(){
copyCLudi();
}},
{label: paste + ' Ctr + V',
icon:'img/icons/paste.png',
action:function(){
pasteCLudi();
}},
{label:'Format',
icon:'img/icons/format_cells.png',
action:function(){
showEditFormatId();
}},
{label:'Animation',
icon:'img/icons/anim.png',
action:function(){
showEditAnim();
}},
{label:'Properties',
icon:'img/icons/check.gif',
action:function(){
showProperties();
}},
{label:'Position',
icon:'img/icons/position.png',
items: {
"plan-back": {label: plan_back,icon:'img/icons/posi-chg.png', action: function() { setObZ(1); }},
"plan-normal": {label: plan_normal, icon:'img/icons/posi-chg.png', action: function() { setObZ(2); }},
"plan-front": {label: plan_front,icon:'img/icons/posi-chg.png', action: function() { setObZ(3); }},
}},
{label: lock,
icon:'img/icons/lock.gif',
action:function(){
processLockObjLudi();
}},
{label:'Delete',
icon:'img/icons/delete.png',
action:function(){
showEditDelete();
}}
]
});
}
function contextScreenInstall(objMenu){
objMenu.contextPopup({
title: 'Open eLearning',
items: [
{label:'Edit',
icon:'img/icons/edit.png',
action:function(){
reOrdonne();
}}
]
});
}
function contextmenuEventsFabric(){
if(GPageId==''){
return false;
}
canvas.deactivateAll();
closeEdit();
var seli = -1;
for (var i = 0; i < CLudisCount; i++){
if(CLudis[i].supp==0){
if(CLudis[i].pageId==GPageId){
if(actualX>CLudis[i].getX()){
if(actualX<(CLudis[i].getX()+CLudis[i].getW())){
if(actualY>CLudis[i].getY()){
if(actualY<(CLudis[i].getY()+CLudis[i].getH())){
seli = i;
}
}
}
}
}
}
}
if(seli!=-1){
canvas.forEachObject(function(obj) {
if (obj.id === seli) {
obj.set('active', true);
GlobalUid = seli;
}
});
}
}
function deviceChange(){
if(GPageId==''){
return false;
}
var responsiveProject = getParamsGlobal('responsiveProject','text').value;
if(responsiveProject==''){
paramsSettingsLaunch();
}else{
deleteLudiHELPER();
closePan();
if(EDITORMODE==1){
EDITORMODE = 0;
$('#iconScreenMode').attr('src','editor/metro/img/screen43.png');
}else{
EDITORMODE = 1;
$('#iconScreenMode').attr('src','editor/metro/img/screen24.png');
}
setEditorMode(EDITORMODE);
loadPage(GPageId,1);
}
}
function SelectWorkingI(i){
var objLudi = CLudis[i];
if(objLudi===undefined){
}else{
if(CLudis[i].lock){
return false;
}
canvas.forEachObject(function(obj){
if(obj===undefined){
}else{
var idu = parseInteger(obj.id);
if(isNaN(idu)){idu = 0;}
if((idu && idu===i)
||(idu==0&&i==0)){
obj.set('active',true);
placeEditZone(i);
canvas.renderAll();
canvas.calcOffset();
}else{
obj.set('active', false);
}
}
});
noSizeCanvas = 0;
}
}
function SelectWorkingO(i){
canvas.forEachObject(function(obj){
if(obj===undefined){
}else{
var idu = parseInteger(obj.id);
if(isNaN(idu)){idu=0;}
if (idu&&idu===i){
obj.set('active', true);
}else{
obj.set('active', false);
}
}
});
}
function haveGridPlace(LudiObj){
var b = true;
if(LudiObj.type=='label'){
b = true;
}
return b;
}
function haveWizi(LudiObj){
var b = true;
if(LudiObj.type=='img'){
b = false;
}
return b;
}
var ctrlDownTouch = false;
var oneTimeOnlyTouch = true;
var kCodeCtrlKey = 17;
var kCodeCmdKey = 91;
var kCodeVKey = 86;
var kCodeRKey = 82;
var kCodeCKey = 67;
var kCodeSKey = 83;
var kCodeDelete = 46;
$(document).keyup(function(e){
if(catchEventTouchs()){
if(e.keyCode == kCodeCtrlKey || e.keyCode == kCodeCmdKey){
ctrlDownTouch = false;
}else{
ctrlDownTouch = false;
}
}else{
ctrlDownTouch = false;
}
oneTimeOnlyTouch = true;
});
document.addEventListener('keydown',function(event){
if(catchEventTouchs()){
processKeyEventCatch(event);
}
});
function catchEventTouchs(){
var b = true;
if ($('.opacedit').is(':visible')) {
b = false;
}
return b;
}
function processKeyEventCatch(event){
if(typeof event==="undefined"){return false;}
if(event.keyCode == kCodeCtrlKey||event.keyCode == kCodeCmdKey){
ctrlDownTouch = true;
}
if(ctrlDownTouch && event.keyCode == kCodeSKey){
saveCommand();
}
if(GlobalUid==-1){return false;}
var LudiObj = CLudis[GlobalUid];
var haveMv = false;
console.log("keyCode = " + event.keyCode);
if(ctrlDownTouch && event.keyCode == kCodeRKey){
}
if(ctrlDownTouch && event.keyCode == kCodeCKey){
copyCLudi();
}
if(ctrlDownTouch && event.keyCode == kCodeVKey){
pasteCLudi();
}
if(event.keyCode == kCodeDelete){
actionDelete();
}
if(event.keyCode == 37&&oneTimeOnlyTouch) {
LudiObj.x = LudiObj.x - 1;
haveMv = true;
}
if(event.keyCode == 38&&oneTimeOnlyTouch) {
LudiObj.y = LudiObj.y - 1;
haveMv = true;
}
if(event.keyCode == 39&&oneTimeOnlyTouch) {
LudiObj.x = LudiObj.x + 1;
haveMv = true;
}
if(event.keyCode == 40&&oneTimeOnlyTouch) {
LudiObj.y = LudiObj.y + 1;
haveMv = true;
}
if(haveMv&&oneTimeOnlyTouch){
oneTimeOnlyTouch = false;
canvas.forEachObject(function(obj){
if (obj.id&&obj.id===GlobalUid){
obj.set('left',LudiObj.x);
obj.set('top', LudiObj.y);
}
});
var obs = $('.editquestion,.actiondeleteb,.actiondelete,.notequestion,.actionposition,.actionaddfluxpts');
obs.css("display","none");
moveWiziZone(GlobalUid);
canvas.renderAll();
}
}
var timeWplace = 300;
var oldWidthCanvas = 0;
var oldHeightCanvas = 0;
var oldIdSize = '';
var noSizeCanvas = 0;
setTimeout(function(){
placeWorkingPlace();
setTimeout(function(){
detectWorkingResize();
},500);
},250);
function detectWorkingResize(){
var width = getWindowWidth();
var height = getWindowHeight();
var idSize = parseInteger(width/3) + '_' + parseInteger(height/3);
if(oldIdSize!=idSize||noSizeCanvas==0){
if (canvasIsOK) {
oldIdSize = idSize;
placeWorkingPlace();
noSizeCanvas = 1;
}
console.log("call placeWorkingPlace");
}
setTimeout(function(){
detectWorkingResize();
},500);
}
function placeWorkingPlace(){
var classiquelarge = getParamsValue('classiquelarge');
var menuWidth = 210;
var width = getWindowWidth();
var height = getWindowHeight()-115;
if(width<(1060 + menuWidth)){
menuWidth = 120;
}
if (EDITORMODE==1) {
SCREEN_0_W = 480;
SCREEN_0_H = 780;
} else {
SCREEN_0_W = 960;
if (classiquelarge==1) {
SCREEN_0_W = 1280;
}
SCREEN_0_H = 720;
}
var originalWidth = SCREEN_0_W;
var zoomCanvas = ((width - 14) - menuWidth)/originalWidth;
if (width<(1060 + menuWidth)) {
} else {
zoomCanvas = 1;
}
oldWidthCanvas = width;
oldHeightCanvas = height;
canvas.setZoom(zoomCanvas);
if (SCREEN_0_W!=1280) {
var cibleHeight = SCREEN_0_H * zoomCanvas;
if(cibleHeight>height){
zoomCanvas = (height-20)/SCREEN_0_H;
canvas.setZoom(zoomCanvas);
}
}
canvas.setWidth(SCREEN_0_W * canvas.getZoom());
canvas.setHeight(SCREEN_0_H * canvas.getZoom());
var widthcanv = (SCREEN_0_W * canvas.getZoom()) + 4;
var largW = (SCREEN_0_W * zoomCanvas)
var decXMarg = ((width - menuWidth) - largW)/2;
var decYMarg = (height-(SCREEN_0_H * zoomCanvas))/2;
decYMarg = decYMarg + 100;
decxCanv = 0;
if(decYMarg<120){
decYMarg = 120;
}
decyCanv = decYMarg;
decxCanv = decXMarg;
$(".opacedit").css("width",width + "px");
$(".editnote,.editzoneplugin,.editnote2,.editvideozone").css("left",(((widthcanv - 400)/2) + decxCanv) + "px");
$(".editImage").css("left",(((widthcanv - 700)/2) + decxCanv) + "px");
document.body.style.paddingLeft = decxCanv + "px";
document.body.style.paddingTop = decYMarg  + "px";
zoomCanv = zoomCanvas;
if (menuWidth<180) {
$("#g-block").removeClass("global-block");
$("#g-block").addClass("global-block-little");
$("#g-block-ordo").removeClass("block-reordonne");
$("#g-block-ordo").addClass("block-reordonne-little");
$("#g-block-ordo-stop").removeClass("block-stopedit");
$("#g-block-ordo-stop").addClass("block-stopedit-little");
$(".snaplogin2").css('right','125px');
} else {
$("#g-block").addClass("global-block");
$("#g-block").removeClass("global-block-little");
$("#g-block-ordo").removeClass("block-reordonne-little");
$("#g-block-ordo").addClass("block-reordonne");
$("#g-block-ordo-stop").removeClass("block-stopedit-little");
$("#g-block-ordo-stop").addClass("block-stopedit");
$(".snaplogin2").css('right','200px');
}
showWiziZone();
}
var editorInstance;
setTimeout(function(){
var hash = location.hash.replace('#','');
if(hash=='devmode'){
forceLoad();
}
},600);
setTimeout(function(){
var hash = location.hash.replace('#','');
if(hash=='devmode'){
launchCodeEditZone();
}
},700);
setTimeout(function(){
processPagesMini();
},1500);
setTimeout(function(){
loadLearningPlugins();
},4000);
function forceLoad(){
location.hash = 'devmode';
GPageId = guid();
var objTemp = new CPage();
objTemp.pageId = GPageId;
objTemp.index = 0;
objTemp.back = 'white.jpg';
CPagesAdd(objTemp);
CPagesPaint();
loadPage(GPageId,0);
closePan();
ajoutLudiBARRE();
eventPages = true;
reOrdonne();
endOrdonne();
pageAdd();
}
$(function(){
ludiInit();
});
