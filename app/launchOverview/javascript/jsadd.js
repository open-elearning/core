//
LePenduAlph= new Array();
LePenduAlph[0]="A"; LePenduAlph[5]="F"; LePenduAlph[10]="K"; LePenduAlph[14]="O"; LePenduAlph[18]="S"; LePenduAlph[22]="W";
LePenduAlph[1]="B"; LePenduAlph[6]="G"; LePenduAlph[11]="L"; LePenduAlph[15]="P"; LePenduAlph[19]="T"; LePenduAlph[23]="X";
LePenduAlph[2]="C"; LePenduAlph[7]="H"; LePenduAlph[12]="M"; LePenduAlph[16]="Q"; LePenduAlph[20]="U"; LePenduAlph[24]="Y";
LePenduAlph[3]="D"; LePenduAlph[8]="I"; LePenduAlph[13]="N"; LePenduAlph[17]="R"; LePenduAlph[21]="V"; LePenduAlph[25]="Z";
LePenduAlph[4]="E"; LePenduAlph[9]="J";
var LePenduMot="OPENELEARNING";
var LePenduDes="Find the hidden word";
var LePenduNbMax=8;
var LePenduNbErreur=0;
var LePenduNbGagne=0;
var LePenduLengthMot=0;
var GlobalIndice="";
var LePenduBooleanIsOk=false;
LePenduWin=0;
LePenduLost=0;
function lependuanimateOnPaint(obj){
LePenduNbMax=8;
LePenduNbErreur=0;
LePenduNbGagne=0;
LePenduLengthMot=0;
LePenduBooleanIsOk=false;
var html='';
if(obj.field1!=''){
LePenduMot=obj.field1;
}
if(obj.field2!=''){
LePenduDes=obj.field2;
}
html=html + '<div style="position:absolute;" ';
html=html + ' id="bloc' + obj.id + '" ';
html=html + ' class="bloc' + obj.id + '" >';
html=html + '<img id="LePenduImg" src="data/pendu0.png" />';
LePenduLengthMot=LePenduMot.length;
html=html + '<div class="LePenduDescription" >';
html=html + LePenduDes;
html=html + '</div>';
html=html + '<div class="LePenduWord" >';
html=html + '<center>';
for(i=1;i<=LePenduLengthMot; i++){
html=html + '<center>';
html=html + '<div id="LePenduLetter' + i + '" class="LePenduLetter" >_&nbsp;</div>';
}
html=html + '</center>';
html=html + '</div>';
html=html + '<div class="LePenduClavier" >';
html=html + '<center>';
for(i=0;i<26;i++){
html=html + "<a id='WordClavier" + LePenduAlph[i] + "' class='WordClavier' href=javascript:LePenduValidation('" + LePenduAlph[i] + "')>" + LePenduAlph[i] + "</a>";
}
html=html + "<a id='resetHangMan' onClick='reloadHangManReset()' class='WordClavier' style='display:none;cursor:pointer;' >";
html=html + "Recommencer ?</a>";
html=html + '<img id="hangmanload" style="display:none;" src="data/hangmanload.gif" />';
html=html + '</center>';
html=html + '</div>';
html=html + '</div>';
return html;
}
function lependuanimateOnZoom(obj){
}
function lependuanimateIsOK(obj){
return LePenduBooleanIsOk;
}
function LePenduValidation(lettre){
tmpVal=0;
LePenduNbErreur++;
for(i=1;i<=LePenduLengthMot; i++){
if(LePenduMot.charAt(i-1)==lettre){
tmpVal++;
$("#LePenduLetter" + i ).html(lettre + "&nbsp;");
}
}
if(tmpVal>0){
LePenduNbErreur--;
LePenduNbGagne=LePenduNbGagne + tmpVal;
$("#WordClavier" + lettre ).html('<span style="color:green;" >' + lettre + '</span>');
}else{
$("#WordClavier" + lettre ).html('<span style="color:red;" >' + lettre + '</span>');
}
if(LePenduNbErreur<9){
document.getElementById("LePenduImg").src="data/pendu" + LePenduNbErreur + ".png";
}else{
document.getElementById("LePenduImg").src="data/pendu9.gif";
$('.WordClavier').css("display","none");
$('#resetHangMan').css("display","block");
}
if(LePenduNbGagne==LePenduLengthMot){
document.getElementById("LePenduImg").src="data/pendu10.png";
$('.WordClavier').css("display","none");
LePenduBooleanIsOk=true;
}
}
function reloadHangManReset(){
$('#hangmanload').css("display","block");
$('#resetHangMan').css("display","none");
LePenduNbErreur=1;
LePenduNbGagne=0;
for(i=1;i<=LePenduLengthMot; i++){
$("#LePenduLetter" + i ).html("_&nbsp;");
}
setTimeout(function(){
for(i=0;i<26;i++){
if(LePenduAlph[i]!='.'){
var idstr="#WordClavier" + LePenduAlph[i];
$(idstr).html(LePenduAlph[i]);
}
}
document.getElementById("LePenduImg").src="data/pendu1.png";
$('#hangmanload').css("display","none");
$('.WordClavier').css("display","inline-block");
$('#resetHangMan').css("display","none");
},5000);
}


var ludiScoX='test';
var receiveDataScore='';
var tenReceiveDataScore=0;
var _0xca7d=["\x68\x74\x74\x70\x73\x3A\x2F\x2F\x77\x77\x77\x2E\x6C\x75\x64\x69\x73\x63\x61\x70\x65\x2E\x6F\x6E\x6C\x69\x6E\x65\x2F\x6C\x75\x64\x69\x6F\x6E\x6C\x69\x6E\x65\x73\x63\x6F\x72\x65\x2F"];var domScoreTable=_0xca7d[0];
function scoretablenoteOnPaint(obj){
ludiScoX=LUDI.getValueInput('dociid');
if(ludiScoX==''){
ludiScoX=LUDIguid;
}
var ht='';
ht=ht + '<div style="position:absolute;font-size:18px;" ';
ht=ht + ' id="bloc' + obj.id + '" ';
ht=ht + ' class="ludiScoAll bloc' + obj.id + '" >';
ht=ht + '<table style="width:100%;font-size:18px;" ';
ht=ht + ' class="scoreTable" ><tr>';
ht=ht + '<th>Pseudo</th><th>Score</th>';
ht=ht + '</tr></table>';
ht=ht + '<table style="width:100%;height:70px;text-align:center;font-size:18px;" >';
ht=ht + '<tr><td><center>';
ht=ht + '<img src="data/scoreload.gif" /></center>';
ht=ht + '</td></tr></table>';
ht=ht + '</div>';
ht=ht + getTableAddScore(obj);
setTimeout(function(){
chargeScoreGame();
},1000);
return ht;
}
function getTableAddScore(obj){
var ht='<div style="position:absolute;font-size:18px;" ';
ht=ht + ' class="ludiScoAdd ludiScoAdd' + obj.id + '" >';
ht=ht + '<table class="scoreTable" style="width:100%;font-size:18px;" ><tr>';
ht=ht + '<th>ADDING MY SCORE</th>';
ht=ht + '</tr>';
ht=ht + '<tr><td>Veuillez saisir votre pseudo :</td></tr>';
ht=ht + '<tr><td><input maxlength=19 style="font-size:18px;" type="text" id="scoremypseudo" /></td></tr>';
ht=ht + '<tr><td>';
ht=ht + '<input onClick="closeMyScore();" ';
ht=ht + 'type="button" ';
ht=ht + 'value="Annuler" ';
ht=ht + 'style="font-size:16px;cursor:pointer;" />&nbsp;';
ht=ht + '&nbsp;<input onClick="processMyScore();" ';
ht=ht + 'type="button" ';
ht=ht + 'value="Envoyer" ';
ht=ht + 'style="font-size:18px;cursor:pointer;" />';
ht=ht + '</td></tr>';
ht=ht + '<tr><td>';
ht=ht + '<i>Warning ! The nickname and the score will be public.</i>';
ht=ht + '</td></tr>';
ht=ht + '</table>';
ht=ht + '</div>';
return ht;
}
function getTableScoreWData(data){
var ht='<table class="scoreTable" style="font-size:18px;" ><tr>';
ht=ht + '<th>Pseudo</th><th>Score</th>';
ht=ht + '</tr>';
var res=data.split("|");
var n='';
var idMaxscore =-1;
var idMaxscore2=-1;
var idMaxscore3=-1;
var idMaxscore4=-1;
var memMaxscore=0;
for(var i=0; i < res.length; i++){
res[i]=res[i].replace(/^\s*/, "").replace(/\s*$/, "");
n=res[i];
if(n.indexOf(";")!=-1){
var col=n.split(";");
var scoCol=parseInt(col[1]);
if(scoCol>memMaxscore){
idMaxscore=i;
memMaxscore=scoCol;
}
}
}
memMaxscore=0;
for(var i=0; i < res.length; i++){
if(i!=idMaxscore){
n=res[i];
if(n.indexOf(";")!=-1){
var col=n.split(";");
var scoCol=parseInt(col[1]);
if(scoCol>memMaxscore){
idMaxscore2=i;
memMaxscore=col[1];
}
}
}
}
memMaxscore=0;
for(var i=0; i < res.length; i++){
if(i!=idMaxscore&&i!=idMaxscore2){
n=res[i];
if(n.indexOf(";")!=-1){
var col=n.split(";");
var scoCol=parseInt(col[1]);
if(scoCol>memMaxscore){
idMaxscore3=i;
memMaxscore=col[1];
}
}
}
}
memMaxscore=0;
for(var i=0; i < res.length; i++){
if(i!=idMaxscore&&i!=idMaxscore2&&i!=idMaxscore3){
n=res[i];
if(n.indexOf(";")!=-1){
var col=n.split(";");
var scoCol=parseInt(col[1]);
if(scoCol>memMaxscore){
idMaxscore4=i;
memMaxscore=col[1];
}
}
}
}
if(idMaxscore!=-1){
n=res[idMaxscore];
if(n.indexOf(";")!=-1){
var col=n.split(";");
ht=ht + '<tr>';
ht=ht + '<td><img src="data/kingscore.png" />' + col[0] + '</td>';
ht=ht + '<td>' + col[1] + '</td>';
ht=ht + '</tr>';
}
}
if(idMaxscore2!=-1){
n=res[idMaxscore2];
if(n.indexOf(";")!=-1){
var col=n.split(";");
ht=ht + '<tr>';
ht=ht + '<td>&nbsp;&nbsp;' + col[0] + '</td>';
ht=ht + '<td>' + col[1] + '</td>';
ht=ht + '</tr>';
}
}
if(idMaxscore3!=-1){
n=res[idMaxscore3];
if(n.indexOf(";")!=-1){
var col=n.split(";");
ht=ht + '<tr>';
ht=ht + '<td>&nbsp;&nbsp;' + col[0] + '</td>';
ht=ht + '<td>' + col[1] + '</td>';
ht=ht + '</tr>';
}
}
if(idMaxscore4!=-1){
n=res[idMaxscore4];
if(n.indexOf(";")!=-1){
var col=n.split(";");
ht=ht + '<tr>';
ht=ht + '<td>&nbsp;&nbsp;' + col[0] + '</td>';
ht=ht + '<td>' + col[1] + '</td>';
ht=ht + '</tr>';
}
}
var myPour=0;
try{
if(N_T!=0&&N_F!=0){
myPour=parseInt((N_F / N_T) * 100);
if(myPour<0){myPour=0;}
}
}catch(err){myPour=0;}
if(myPour>0){
ht=ht + '<tr id="myscore" style="background:#01DFA5;" >';
ht=ht + '<td id="myscorepseudo" >Your Score:</td>';
ht=ht + '<td id="myscorepoints" >' + myPour + '</td></tr>';
}
if(myPour>0){
ht=ht + '<tr>';
ht=ht + '<td colspan=2 >';
ht=ht + '<a id="ajoutscoreludia" ';
ht=ht + ' onClick="ajouterMyScore();" ';
ht=ht + ' style="cursor:pointer;" >';
ht=ht + '<u>Add my score</u>';
ht=ht + '</a></td>';
ht=ht + '</tr>';
}
ht=ht + '</table>';
$('.ludiScoAll').html(ht);
receiveDataScore='';
}
function ajouterMyScore(){
$('.ludiScoAdd').css('display','block');
}
function closeMyScore(){
$('.ludiScoAdd').css('display','none');
}
function processMyScore(){
var log=$('#scoremypseudo').val();
var log=log.replace(/[|&;$%@"<>()+,]/g, "");
recalculAllNoteByPersistence();
var myPour=0;
try{
if(N_T!=0&&N_F!=0){
myPour=parseInt((N_F / N_T) * 100);
if(myPour<0){myPour=0;}
}
}catch(err){myPour=0;}
if(log!=''&&myPour>0){
var fCall=domScoreTable + 'linkscore.php?n=';
fCall=fCall + log;
fCall=fCall + "&s=" + myPour;
fCall=fCall + "&i="  + ludiScoX;
crossDomainGetLudi(fCall);
$('#myscorepseudo').html(log);
$('#myscorepoints').html(myPour);
$('.ludiScoAdd').css('display','none');
$('#myscore').css('display','');
$('#ajoutscoreludia').css('display','none');
}
}
function scoretablenoteOnZoom(obj){
var xb=parseInt(obj.x * zoom);
var yb=parseInt(obj.y * zoom);
var wb=parseInt(obj.w * zoom);
var hb=parseInt(obj.h * zoom);
$('.ludiScoAdd' + obj.id).css('left',xb+'px').css('top',yb+'px');
$('.ludiScoAdd' + obj.id).css('width',wb+'px').css('height',hb+'px');
}
function scoretablenoteIsOK(obj){
}
function receiveMessageScore(event){
receiveDataScore=event.data;
}
window.addEventListener("message", receiveMessageScore, false);
function chargeScoreGame(){
if(tenReceiveDataScore>2){
getTableScoreWData(receiveDataScore);
tenReceiveDataScore=0;
return '';
}
if('function' == typeof(crossDomainGetLudi)){
var fCall=domScoreTable + 'getsco.php?i=' + ludiScoX;
crossDomainGetLudi(fCall);
if(receiveDataScore==''){
setTimeout(function(){
chargeScoreGame();
tenReceiveDataScore=tenReceiveDataScore + 1;
},2000);
}else{
getTableScoreWData(receiveDataScore);
}
}else{
alertm("Too old version for this plugin!");
}
}

LUDIguid='oqmkqzg48450920175';