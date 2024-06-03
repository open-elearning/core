var typesite="classique";
var mobiSite=false;
var oldMobiSite=-1;
var sizesite=400;
var titlePage=new Array();
var oriTypeSite="classique";
var xcoord=0;
var ycoord=0;
var domainesN_T;
var domainesN_F;
var domainesPour;
var domainesRemarques;
var learnerName="";
var Variable1="";
var Variable2="";
var Variable3="";
var Variable4="";
var Variable5="";
var Variable6="";
var Variable7="";
var Variable8="";
var Variable9="";
var Variable10="";
var langue='fr';
var zoom=1;
var IE8=0; var IE9=0; var IOS=0;
var langueextend='';
var haveNoSyntaxInScreen=true;
var haveANAvigation=false;
var oldnav=false;
var largEcranWidth=960; var largEcranHeight=720;
var externdata=''; var externdatafilterpage=0;
var fullscreen=false; var forceScreen=false;
var screen90=false; var easyLoading=true;var CanalTempo=1;
var forkDragDrop=0;
var screenTime=0;
function initializeLang(){
var baseLang='en';
try{
if(navigator.userLanguage){
baseLang=navigator.userLanguage.substring(0,2).toLowerCase();
}else{
baseLang=navigator.language.substring(0,2).toLowerCase();
}
}catch(e){
baseLang='en';
}
langue=baseLang;
}
function initializeDomaines(){
domainesN_T=new Array();
domainesN_F=new Array();
domainesPour=new Array();
domainesRemarques=new Array();
for(var i=0; i<20; i++){
domainesN_T[i]=0;
domainesN_F[i]=0;
domainesPour[i]=0;
domainesRemarques[i]="";
}
}
function resizeAppAnim(){
if(typesite=="classic-auto"){
if(haveDevMobiMode()){
logDevMobiMode();
}
var rax=960;
var ray=720;
if(mobiSite){
rax=480;
ray=780;
}
}
largEcranWidth=rax;
largEcranHeight=ray;
var largx=0;
var largy=0;
largx=rax * zoom;
largy=ray * zoom;
$('.unselectable').css({transition : 'all 0.5s ease'});
var mainObjet=$("#main");
var nh=parseInt(getWindowHeight()) ;
var nw=parseInt(getWindowWidth());
var ratio=rax/ray;
var ecart=50;
largx=nw - ecart;
largy=nh - ecart;
if(largx>largy){
largx=parseInt(largy * ratio);
}else{
largy=parseInt(largx / ratio);
}
if(fullscreen==false){
if(largx>nw||largy>nh){
largy=nh - 100;
largx=parseInt(largy * ratio);
}
if(typesite!="perso"){
if(largx>1024){
largx=1024;
largy=768;
}
}
}
mainObjet.css("opacity",0.5);
mainObjet.css("position","absolute");
mainObjet.css("left","50%").css("top","50%");
CObjets_Paint();
for(var i=0; i < CObjets_count; i++){
CObjets[i].oldzoom=0.5;
}
mainObjet.animate({
width: largx +'px', height: largy +'px',
marginLeft:'-' + parseInt(parseInt(largx/2))  + "px",
marginTop:'-' + parseInt(parseInt(largy/2))  + "px",
},600,function(){
mainObjet.css("opacity",1);
resizeApp();
appliqueFondByResize();
});
}
function appliqueFondByResize(){
$("#colorfond").remove();
CObjets_Paint();
callcolorfond=0;
appliqueFond();
$("#colorfond").css("display","block");
$('.unselectable').css({transition : 'none'});
closePanelSideObject();
}
function resizeApp(){
var nh=parseInt(getWindowHeight());
var nw=parseInt(getWindowWidth());
if(istablet()){
var nheight=nh + 'px';
document.documentElement.style.height=nheight;
document.body.height=nheight;
}
typesite=$('#typesite').attr('data-size');
oriTypeSite=typesite;
sizesite=$('#sizesite').attr('data-size');
var largx=0;
var largy=0;
var rax=960;
var ray=720;
var ecart=50;
var topScreen=false;
if(typesite=="mobile"){
rax=480;
ray=780;
largEcranWidth=rax;
largEcranHeight=ray;
}
if(typesite=="phablet"){
rax=780;
ray=400;
largEcranWidth=rax;
largEcranHeight=ray;
}
if(typesite=="fixe"){
var Gratio=720/960;
rax=sizesite;
ray=parseInt(rax * Gratio);
largx=rax
largy=ray;
largEcranWidth=rax;
largEcranHeight=ray;
}
if(typesite=="classic-responsive"){
if(nw<500){
rax=480;
ray=1440;
largEcranWidth=rax;
largEcranHeight=ray;
typesite="mobile";
}else{
rax=960;
ray=720;
largEcranWidth=rax;
largEcranHeight=ray;
typesite ="classique";
}
}
if(typesite=="classic-auto"){
if(haveDevMobiMode()){
logDevMobiMode();
}else{
if(nw<550){
mobiSite=true;
}else{
if(ismobiledevice()){
if(nh>nw){
$('#loadludi').removeClass("loadludi");
$('#minibar').removeClass("minibar");
$('#evolminibar').removeClass("evolminibar");
$('#loadludi').addClass("loadludi2");
$('#minibar').addClass("minibar2");
$('#evolminibar').addClass("evolminibar2");
mobiSite=true;
}else{
mobiSite=false;
}
}
}
}
if(mobiSite){
rax=480;
ray=780;
largEcranWidth=rax;
largEcranHeight=ray;
}else{
rax=960;
ray=720;
largEcranWidth=rax;
largEcranHeight=ray;
}
}
if(typesite=="classiquelarge"){
persoX=1280;
persoY=720;
rax=persoX;
ray=persoY;
largEcranWidth=rax;
largEcranHeight=ray;
fullscreen=true;
ecart=20;
}
if(typesite=="perso"){
persoX=$('#persoX').attr('data-size');
persoY=$('#persoY').attr('data-size');
rax=persoX;
ray=persoY;
largEcranWidth=rax;
largEcranHeight=ray;
}
var ratio=rax/ray;
if(typesite=="mobile"){ecart=1;}
if(typesite!="fixe"){
largx=nw - ecart;
largy=nh - ecart;
if(largx>largy){
largx=parseInt(largy * ratio);
}else{
largy=parseInt(largx / ratio);
}
if(fullscreen==false){
if(largx>nw||largy>nh){
largy=nh - 100;
largx=parseInt(largy * ratio);
}
if(typesite!="perso"
&&typesite!="classiquelarge"){
if(largx>1024){
largx=1024;largy=768;
}
}
}
if(typesite=="classic-auto"&&oldMobiSite!=-1){
if(mobiSite!=oldMobiSite){
appliqueFondByResize();
}
}
if(mobiSite==false){
if(fullscreen||forceScreen){
var ctrRatio=rax/ray;
var ctrRatioA=nw/nh;
if(ctrRatioA>ctrRatio){
largy=nh - 32;
largx=parseInt(largy * ratio);
topScreen=true;
$("body").css("overflow","hidden");
}
}
oldMobiSite=false;
}else{
oldMobiSite=true;
}
if(typesite=="classiquelarge"){
var ctrRatio=rax/ray;
var ctrRatioA=nw/nh;
if(ctrRatioA<ctrRatio){
largx =	nw - 20;
largy=parseInt(largx / ratio);
}else{
largy=nh - 10;
largx=parseInt(largy * ratio);
}
}
if(typesite!="mobile"){
$("body").css("overflow","hidden");
}
if(typesite=="mobile"){
var iniw=nw;
if(nw>500){
nw=500;
}
if(iniw>900&&nh<780){
nw=450;
}
largx=nw - 4;
largy=parseInt(largx * ratio);
if(oriTypeSite=="classic-responsive"){
largx=nw - 20;
largy=parseInt(largx * ratio);
}
}
if(typesite=="classic-auto"){
if(ismobiledevice()){
if(mobiSite){
largx=nw - 4;
largy=parseInt(largx / ratio);
var ratioCal=nw/nh;
if(ratioCal>0.62){
largy=nh-20;
largx=parseInt(largy * ratio);
}
}
}
}
if(typesite=="phablet"){
if(nh>500){
nh=500;
}
largy=nh;
largx=parseInt(largy * ratio);
if(largx>parseInt(nw-30)){
largx=nw - 20;
largy=parseInt(largx * ratio);
}
}
if(inIframe()==false){
if(istablet()){
if(typesite!="mobile"&&typesite!="fixe"){
var ctrratioscreen=nw / nh;
if(ctrratioscreen>1.36){
largx=parseInt(nw*0.86);
largy=parseInt(largx * ratio);
}
}
}
}
if(navigator.userAgent.toUpperCase().indexOf("ANDROID") != -1){
if(typesite!="mobile"&&typesite!="fixe"&&mobiSite==false){
var ctrratioscreen=nw / nh;
if(ctrratioscreen>1.5){
largy=parseInt(nh * 0.96);
largx=parseInt(largy * ratio);
}
}
}
zoom =	largx / rax;
}
if(!forceScreen){
if(typesite=="fixe"){
zoom=rax / 960;
}
if(typesite!="mobile"
&&typesite!="phablet"
&&typesite!="classiquelarge"){
zoom=Math.round( zoom * 10) / 10;
}
if(typesite!="fixe"){
largx=rax * zoom;
largy=ray * zoom;
if(zoom>1&&largy>(nh-ecart)){
zoom=zoom - 0.1
largx=rax * zoom;
largy=ray * zoom;
}
}
}
var collObjets=$("#main,#loaddiv,#loaddivbarre,#lightbox,#globaltransition,#globalcurtain,#game");
collObjets.css("position","absolute");
collObjets.css("left","50%");
if(typesite!="mobile"){
if(isFixedFrame()&&mobiSite==false){
$('body').css("overflow" , "hidden");
collObjets.css("position" , "fixed");
collObjets.css("top","5px");
collObjets.css("margin-top",'0px');
window.addEventListener("scroll",function(){window.scrollTo(0,0)},false);
var nheight=nh + 'px';
document.documentElement.style.height=nheight;
document.body.height=nheight;
}else{
if(istablet()
&&typesite!="phablet"
&&typesite!="classic-auto"){
collObjets.css("top","5px");
collObjets.css("margin-top",'0px');
}else{
collObjets.css("top","50%");
collObjets.css("margin-top",'-' + parseInt(parseInt(largy/2))  + "px");
}
}
}else{
collObjets.css("top" , "0px");
collObjets.css("margin-top",'0px');
}
if(typesite=="classic-auto"){
if(ismobiledevice()){
if(mobiSite){
if(largy>parseInt(nh-30)){
collObjets.css("top","0px");
collObjets.css("margin-top",'0px');
}
$('body').css("overflow" , "hidden");
}
}
}
$("#ecranalter").css("width",largx+"px").css("height",largy+"px");
collObjets.css("width" ,largx + "px");
collObjets.css("height",largy + "px");
collObjets.css("margin-left", '-' + parseInt(parseInt(largx/2)) + "px");
$("#colorfond").css("width", largx + 'px').css("height", largy + 'px');
if(typesite=="mobile"){
$("body").css("overflow","");
if(isWindows()&&ray<1000){
$("body").css("overflow" , "hidden");
}
if(oriTypeSite=="classic-responsive"){
$("body").css("overflow","auto");
collObjets.css("margin-left", "0px");
collObjets.css("left", "0px");
}
}
if(typesite=="mobile"){
if(navigator.userAgent.toUpperCase().indexOf("ANDROID") != -1){
var screenh=parseInt(getWindowHeight()) ;
var screenw= parseInt(getWindowWidth());
if(screenw>screenh){
zoom=(screenh-15) / rax;
largx=rax * zoom;
largy=ray * zoom;;
collObjets.css("width" ,largx + "px");
collObjets.css("height",largy + "px");
$("#colorfond").css("width", largx + 'px').css("height", largy + 'px');
collObjets.css("transform" , "rotate(-90deg) translateX(-" + (largx + 5) + "px)");
collObjets.css("transform-origin" , "left top");
collObjets.css("left","5px").css("top","1px");
collObjets.css("position" , "fixed");
collObjets.css("margin-top","0px").css("margin-left","0px");
}else{
collObjets.css("transform" , "none");
$("body").removeClass("wrap90");
}
}
}
if(typesite=="phablet"){
$("body").css("overflow","hidden");
if(DetectUagentL("windows phone")){
$("body").css("height",largy + "px");
collObjets.css("top" , "5px");
collObjets.css("margin-top",'0px');
}
}
dimensionneCadres();
}
function dimensionneCadres(){
var cadreDecY=10;
var headerHeight=45;
var bodyHeight=parseInt($("#main").width() - parseInt(24 * zoom));
var bodyY =parseInt(12 * zoom) - 2;
if(headerfond=='1'||headerfond==1){
if(footerfond=='0'||footerfond==0){
bodyHeight=$("#main").height() - parseInt((12 + cadreDecY + headerHeight) * zoom);
}
}
if(headerfond=='0'||headerfond==0){
if(footerfond=='1'||footerfond==1){
bodyHeight=$("#main").height() - parseInt((12 + cadreDecY + headerHeight) * zoom);
}
}
if(headerfond=='1'||headerfond==1){
if(footerfond=='1'||footerfond==1){
bodyHeight=$("#main").height() - (parseInt((cadreDecY + headerHeight) * zoom)*2);
}
}
if(headerfond=='1'||headerfond==1){
var fdheader=$("#cadreheader");
fdheader.css("left",'-1px');
fdheader.css("top", '-1px');
fdheader.css("width", parseInt($("#main").width()) + 'px');
fdheader.css("height", parseInt(headerHeight * zoom) + 'px');
bodyY=parseInt((cadreDecY + headerHeight) * zoom) - 2;
}
if(footerfond=='1'||footerfond==1){
var fdfooter=$("#cadrefooter");
fdfooter.css("left",'-1px');
fdfooter.css("top", parseInt($("#main").height() - parseInt(headerHeight * zoom)) +  'px');
fdfooter.css("width", parseInt($("#main").width()) + 'px');
fdfooter.css("height", parseInt(headerHeight * zoom) + 'px');
}
var fdcadre=$("#cadrefond");
fdcadre.css("left", parseInt(12 * zoom) + 'px');
fdcadre.css("top", bodyY + 'px');
fdcadre.css("width", parseInt($("#main").width() - parseInt(24 * zoom)) + 'px');
fdcadre.css("height", bodyHeight + 'px');
}
$(function(){
resizeApp();
var useragt=navigator.userAgent.toUpperCase();
if(useragt.indexOf("MSIE 8") != -1||useragt.indexOf("MSIE 7") != -1){
IE8=1;
}
if(useragt.indexOf("MSIE 9") != -1){
IE9=1;
}
if(useragt.indexOf("IPAD") != -1||useragt.indexOf("SAFARI") != -1){
IOS=1;
}
if(useragt.indexOf("FIREFOX") != -1||useragt.indexOf("CHROME") != -1){
IOS=0;
}
if(istablet()){
if(window.innerHeight != document.documentElement.clientHeight){
var fixViewportHeight=function(){
if(haveNoSyntaxInScreen){
allaysOnTop();
}
}.bind(this);
window.addEventListener("scroll", fixViewportHeight, false);
window.addEventListener("orientationchange", fixViewportHeight, false);
fixViewportHeight();
document.body.style.webkitTransform="translate3d(0,0,0)";
}
}
if(useragt.indexOf("TRIDENT/4.0") != -1){
oldnav=true;
}
if(useragt.indexOf("TRIDENT/3.0") != -1){
oldnav=true;
}
if(useragt.indexOf("MSIE 6.0") != -1){
oldnav=true;
}
$(window).resize(function(){
resizeApp();
zoomLargeElements();
});
resizeApp();
var t=setTimeout("resizeApp()",1000);
$(".preloadclock").css("top","-100px");
initializeDomaines();
if(gebi("main")){
if(noDragDrop()){
forkDragDrop=1;
}else{
initMouvementEvents();
}
}
if(gebi("detpr")){
if(detectProt()){
evolinit=-4000;
$("#minibar").css("display","none");
}
}
$('#main').keydown(function(e){
var x=e.keyCode;
haveKeyDULR(x);
});
$('body').keydown(function(e){
var x=e.keyCode;
haveKeyDULR(x);
});
$(document).keydown(function(e){
var x=e.keyCode;
haveKeyDULR(x);
});
for(i=0; i<1000; i++){
allDiapoQuest[i]='0';
titlePage[i]='page' + i;
}
Variable1=getParamValue("v1");
Variable2=getParamValue("v2");
Variable3=getParamValue("v3");
Variable4=getParamValue("v4");
Variable10=getParamValue("v10");
learnerName=getParamValue("learnerName");
externdata=getParamValue("externdata");
var pagenum=getParamValue("ps");
if(pagenum!=""){
if(pagenum.length>6){
pagenum=pidoff[pagenum];
if(typeof pagenum === 'undefined'){
pagenum=0;
}
}
if(document.getElementById("numpagemem")){
document.getElementById("numpagemem").innerHTML=pagenum;
}
}
langueextend=getParamValue("lg");
if(getAnchorValue().indexOf("langueextend")!=-1){
langueextend=getAnchorValue().replace("langueextend","");
}
if(langueextend!=""){
if(gebi("LangChoiceActual")){
gebi("LangChoiceActual").src="images/" + langueextend + ".jpg";
langueextend="-" + langueextend;
}else{
langueextend="";
}
}
var UrlInteractions=getParamValue("resume");
if(UrlInteractions!=""){
openUrlInteractions(UrlInteractions);
}
var UrlSave=getParamValue("save");
if(UrlSave!=""){
openUrlSave(UrlSave);
}
unselect();
setTimeout("verifisload()",500);
initializeLang();
if(gebi("controlload")){
gebi("controlload").innerHTML='';
}
initializeEventSurface();
});
function initMouvementEvents(){
if(!noDragDrop()){
var main_map=document.getElementById("main");
main_map.onmousemove=function(e){
calculCoord(e);
moveDrag();
movePhysics();
};
main_map.onmouseup=function(e){
onEndDrag();
};
}
}
var evolinit=1;
function allaysOnTop(){
if(istablet()){
document.documentElement.style.height=window.innerHeight + "px";
if(document.body.scrollTop !== 0){
window.scrollTo(0, 0);
}
}
}
function verifisload(){
if(ismobiledevice()){
evolinit=evolinit + 15;
}else{
evolinit=evolinit + 25;
}
if(haveLocalFileUrl()){
evolinit=evolinit + 25;
var wbh=getParamValue("wb");
if(wbh==1){
evolinit=evolinit + 180;
$("#main").css("display","block");
}
}
if(evolinit>0){
$("#evolminibar").css("width" , evolinit + "px");
}
if(evolinit<270){
setTimeout("verifisload()",300);
}else{
if(ismobiledevice()||oldnav){
$("#main").css("display","block");
$("#loadludi").css("display","none");
$("#loadbloc").css("display","none");
}else{
if(localExec()){
$("#main").fadeIn();
$("#loadludi,#loadbloc").animate({marginLeft:"-100px",opacity:0},400);
setTimeout('$("#loadludi,#loadbloc").css("display","none")',500);
}else{
$("#main").fadeIn();
$("#loadludi,#loadbloc").animate({marginTop : "-100px",opacity: 0},900);
setTimeout('$("#loadludi,#loadbloc").css("display","none")', 1000);
}
}
$(".previmg").css('right','-10px')
}
}
function haveDevMobiMode(){
var ur=window.location.href;
if(ur.indexOf("BatisseursNumeriques")!=-1){
if(ur.indexOf("FASTWEB")!=-1){
return true;
}
}
return false;
}
function logDevMobiMode(){
if(!document.getElementById("devmodemobimenu")){
$('body').append("<img id='devmodemobimenu' onClick='eventDevMobiMode()' style='position:fixed;right:30px;bottom:5px;cursor:pointer;' src='images/responsive01.png' />" );
}
}
function eventDevMobiMode(){
if(mobiSite){
mobiSite=false;
$('#devmodemobimenu').attr("src","images/responsive01.png");
}else{
mobiSite=true;
$('#devmodemobimenu').attr("src","images/responsive00.png");
}
resizeAppAnim();
}
function localExec(){
if(haveLocalFileUrl()){
return true;
}
var uagent=navigator.userAgent.toUpperCase();
if(uagent.indexOf("OPERA") != -1){
return true;
}
if(uagent.indexOf("MSIE") != -1){
}
if(uagent.indexOf("SAFARI") != -1){
return true;
}
if(uagent.indexOf("CHROME") != -1){
return true;
}
if(uagent.indexOf("EDGE") != -1){
return true;
}
if(uagent.indexOf("IPAD") != -1){
return true;
}
if(uagent.indexOf("IPHONE") != -1){
return true;
}
if(uagent.indexOf("ANDROID") != -1){
return true;
}
if(uagent.indexOf("TRIDENT/") != -1){
return true;
}
if(uagent.indexOf("FIREFOX") != -1){
return true;
}
return false;
}
function haveLocalFileUrl(){
var ur=window.location.href;
if(ur.indexOf("file://")!=-1){
return true;
}
return false;
}
function istablet(){
var tablet=false;
if(navigator.userAgent.toUpperCase().indexOf("IPAD") != -1){
tablet=true;
}
if(navigator.userAgent.toUpperCase().indexOf("ANDROID") != -1){
tablet=true;
}
return tablet;
}
function haveFullScreenNative(){
var fulls=false;
var uagent=navigator.userAgent.toUpperCase();
if(uagent.indexOf("IPAD") != -1){
fulls=true;
}
if(uagent.indexOf("ANDROID") != -1){
fulls=true;
}
if(uagent.indexOf("CHROME") != -1){
fulls=true;
}
if(uagent.indexOf("FIREFOX") != -1){
fulls=true;
}
return fulls;
}
function haveNoAutoplay(){
var fulls=false;
var uagent=navigator.userAgent.toUpperCase();
if(haveANAvigation==false){
if(uagent.indexOf("ANDROID") != -1){
fulls=true;
}
if(uagent.indexOf("CHROME") != -1){
fulls=true;
}
if(uagent.indexOf("FIREFOX") != -1){
fulls=true;
}
}
return fulls;
}
function isFixedFrame(){
var tablet=false;
if(navigator.userAgent.toUpperCase().indexOf("IPAD") != -1){
tablet=true;
}
if(navigator.userAgent.toUpperCase().indexOf("ANDROID") != -1){
tablet=true;
}
return tablet;
}
function isVideoHtml5Control(){
var tablet=false;
if(haveANAvigation==false){
if(navigator.userAgent.toUpperCase().indexOf("IPAD") != -1){
tablet=true;
}
if(navigator.userAgent.toUpperCase().indexOf("SAFARI") != -1){
tablet=true;
}
if(navigator.userAgent.toUpperCase().indexOf("ANDROID") != -1){
tablet=true;
}
}
if(haveANAvigation==false){
tablet=true;
}
return tablet;
}
function isMsie(){
var Msie=false;
if(navigator.userAgent.toUpperCase().indexOf("MSIE") != -1){
Msie=true;
}
if(isWindows()){
Msie=true;
}
return Msie;
}
function isMozilla(){
var Moz=false;
if(navigator.userAgent.toUpperCase().indexOf("FIREFOX") != -1){
Moz=true;
}
return Moz;
}
function isSafari(){
var Saf=false;
if(navigator.userAgent.toUpperCase().indexOf("SAFARI") != -1){
Saf=true;
}
return Saf;
}
function isIOS(){
var Saf=false;
if(navigator.userAgent.toUpperCase().indexOf("IPOD") != -1){
Saf=true;
}
if(navigator.userAgent.toUpperCase().indexOf("IPAD") != -1){
return true;
}
if(navigator.userAgent.toUpperCase().indexOf("IPHONE") != -1){
return true;
}
return Saf;
}
function isChrome(){
var Saf=false;
if(navigator.userAgent.toUpperCase().indexOf("CHROME") != -1){
Saf=true;
}
if(navigator.userAgent.toUpperCase().indexOf("CHROMIUM") != -1){
return true;
}
return Saf;
}
function isSurface(){
var surf=false;
if(navigator.userAgent.toUpperCase().indexOf("ARM") != -1){
if(navigator.userAgent.toUpperCase().indexOf("TRIDENT/6.0") != -1){
surf=true;
}
if(navigator.userAgent.toUpperCase().indexOf("TRIDENT/7.0") != -1){
surf=true;
}
if(navigator.userAgent.toUpperCase().indexOf("TRIDENT/8.0") != -1){
surf=true;
}
if(navigator.userAgent.toUpperCase().indexOf("TRIDENT/9.0") != -1){
surf=true;
}
}
return surf;
}
function isWindows(){
var wind=false;
if(navigator.userAgent.toUpperCase().indexOf("ARM") == -1){
if(navigator.userAgent.toUpperCase().indexOf("WINDOWS PHONE") == -1){
if(navigator.userAgent.toUpperCase().indexOf("TRIDENT/9.0") != -1){
wind=true;
}
if(navigator.userAgent.toUpperCase().indexOf("TRIDENT/8.0") != -1){
wind=true;
}
if(navigator.userAgent.toUpperCase().indexOf("TRIDENT/7.0") != -1){
wind=true;
}
if(navigator.userAgent.toUpperCase().indexOf("TRIDENT/6.0") != -1){
wind=true;
}
if(navigator.userAgent.toUpperCase().indexOf("TRIDENT/5.0") != -1){
wind=true;
}
if(navigator.userAgent.toUpperCase().indexOf("TRIDENT/4.0") != -1){
wind=true;
}
if(navigator.userAgent.toUpperCase().indexOf("TRIDENT/3.0") != -1){
wind=true;
}
}
}
return wind;
}
function noDragDrop(){
var nodd=false;
if('ontouchstart' in document.documentElement){
return false;
}
if(navigator.userAgent.toUpperCase().indexOf("WINDOWS PHONE") != -1){
nodd=true;
}
if(navigator.userAgent.toUpperCase().indexOf("ANDROID") != -1){
nodd=true;
}
if(navigator.userAgent.toUpperCase().indexOf("ARM") != -1){
if(navigator.userAgent.toUpperCase().indexOf("TRIDENT/6.0") != -1){
}
if(navigator.userAgent.toUpperCase().indexOf("TRIDENT/7.0") != -1){
}
}
return nodd;
}
function isSVGcompatible(){
var isSVGcomp=false;
var nav=navigator.userAgent.toUpperCase();
if(nav.indexOf("CHROME") != -1){
isSVGcomp=true;
}
if(nav.indexOf("FIREFOX") != -1){
isSVGcomp=true;
}
if(nav.indexOf("TRIDENT/7.0") != -1){
isSVGcomp=true;
}
if(nav.indexOf("TRIDENT/8.0") != -1){
isSVGcomp=true;
}
if(nav.indexOf("EDGE") != -1){
return true;
}
return isSVGcomp;
}
function svgaccept(){
if(navigator.userAgent.toUpperCase().indexOf("MSIE 10") != -1){
return true;
}
if(navigator.userAgent.toUpperCase().indexOf("IPAD") != -1){
return true;
}
if(navigator.userAgent.toUpperCase().indexOf("FIREFOX") != -1){
return false;
}
if(navigator.userAgent.toUpperCase().indexOf("SAFARI") != -1){
return true;
}
if(navigator.userAgent.toUpperCase().indexOf("CHROME") != -1){
return true;
}
if(navigator.userAgent.toUpperCase().indexOf("IPHONE") != -1){
return true;
}
return false;
}
function recupCss3(){
var Css3=false;
if(navigator.userAgent.toUpperCase().indexOf("WINDOWS PHONE") != -1){
Css3=true;
}
if(navigator.userAgent.toUpperCase().indexOf("ANDROID") != -1){
Css3=true;
}
if(navigator.userAgent.toUpperCase().indexOf("CHROME") != -1){
Css3=true;
}
if(navigator.userAgent.toUpperCase().indexOf("FIREFOX") != -1){
Css3=true;
}
if(navigator.userAgent.toUpperCase().indexOf("IPAD") != -1){
Css3=true;
}
if(navigator.userAgent.toUpperCase().indexOf("SAFARI") != -1){
Css3=true;
}
if(navigator.userAgent.toUpperCase().indexOf("TRIDENT/9.0") != -1){
Css3=true;
}
if(navigator.userAgent.toUpperCase().indexOf("TRIDENT/8.0") != -1){
Css3=true;
}
if(navigator.userAgent.toUpperCase().indexOf("TRIDENT/7.0") != -1){
Css3=true;
}
if(navigator.userAgent.toUpperCase().indexOf("TRIDENT/6.0") != -1){
Css3=true;
}
if(navigator.userAgent.toUpperCase().indexOf("TRIDENT/5.0") != -1){
Css3=false;
}
if(navigator.userAgent.toUpperCase().indexOf("TRIDENT/4.0") != -1){
Css3=false;
}
if(navigator.userAgent.toUpperCase().indexOf("TRIDENT/3.0") != -1){
Css3=false;
}
if(navigator.userAgent.toUpperCase().indexOf("MSIE 6.0") != -1){
Css3=false;
}
if(navigator.userAgent.toUpperCase().indexOf("MSIE") != -1){
if(navigator.userAgent.toUpperCase().indexOf("WINDOWS XP") != -1){
Css3=false;
}
if(navigator.userAgent.toUpperCase().indexOf("WINDOWS NT 5.1") != -1){
Css3=false;
}
if(navigator.userAgent.toUpperCase().indexOf("WINDOWS NT 6.0") != -1){
Css3=false;
}
}
return Css3;
}
function haveCss3D(){
var Css3=true;
if(navigator.userAgent.toUpperCase().indexOf("MSIE 9.0") != -1){
Css3=false;
}
if(navigator.userAgent.toUpperCase().indexOf("MSIE 8.0") != -1){
Css3=false;
}
if(navigator.userAgent.toUpperCase().indexOf("TRIDENT/5.0") != -1){
Css3=false;
}
if(navigator.userAgent.toUpperCase().indexOf("TRIDENT/4.0") != -1){
Css3=false;
}
if(navigator.userAgent.toUpperCase().indexOf("TRIDENT/3.0") != -1){
Css3=false;
}
if(navigator.userAgent.toUpperCase().indexOf("MSIE 6.0") != -1){
Css3=false;
}
if(navigator.userAgent.toUpperCase().indexOf("MSIE 7.0") != -1){
Css3=false;
}
if(navigator.userAgent.toUpperCase().indexOf("MSIE") != -1){
if(navigator.userAgent.toUpperCase().indexOf("WINDOWS XP") != -1){
Css3=false;
}
if(navigator.userAgent.toUpperCase().indexOf("WINDOWS NT 5.1") != -1){
Css3=false;
}
if(navigator.userAgent.toUpperCase().indexOf("WINDOWS NT 6.0") != -1){
Css3=false;
}
}
return Css3;
}
function inIframe(){
if(top.frames.length == 0){
return false;
}else{
return true;
}
}
function detectProt(){
if(inIframe()==false||haveLocalFileUrl()){
return true;
}else{
return false;
}
}
function ismobiledevice(){
if(DetectUagentL("android")) return true;
else if(DetectUagentL("iphone")) return true;
else if(DetectUagentL("ipod")) return true;
else if(DetectUagentL("symbian")) return true;
else if(DetectUagentL("ipad")) return true;
else if(DetectUagentL("windows phone")) return true;
return false;
}
function isImageC(name){
if(name.indexOf("fond-white.png")!=-1){
return false;
}
if(name.indexOf(".jpg")!=-1
||name.indexOf(".png")!=-1
||name.indexOf(".gif")!=-1
||name.indexOf(".svg")!=-1
||name.indexOf(".jpeg")!=-1){
return true;
}else{
return false;
}
}
function DetectUagentL(name){
var uagent=navigator.userAgent.toLowerCase();
if(uagent.search(name) > -1){
return true;
}else{
return false;
}
}
function getstorage(name){
var r="";
try{
if(localStorage){
r=window.localStorage.getItem(name);
}
}catch(err){}
return r;
}
function savestorage(name, val){
try{
if(!window.localStorage.getItem(name)){
window.localStorage.setItem(name, val);
}else{
window.localStorage.setItem(name, val);
}
}catch(err){}
}
function savestoragebyloadFile(f){
if(f!=''){
try{
if(!document.getElementById("noCacheManifest")){
if(localStorage){
$.ajax({
type: "GET",
url: f,
dataType: "text",
cache:true,
async:false,
success: function(data){
savestorage(f,data);
},error: function(){
}
});
}
}
}catch(err){}
}
}
function alignByObj(obj){
var r="";
if(obj.align=='LeftTop'){
r= "vertical-align:top;text-align:left;";
}
if(obj.align=='RightTop'){
r= "vertical-align:top;text-align:right;";
}
if(obj.align=='CenterTop'){
r= "vertical-align:top;text-align:center;";
}
if(obj.align=='CenterBottom'){
r= "vertical-align:bottom;text-align:center;";
}
if(obj.align=='Center'){
r= "vertical-align:center;text-align:center;";
}
if(obj.align=='LeftCenter'){
r= "vertical-align:center;text-align:left;";
}
if(obj.align=='RightCenter'){
r= "vertical-align:center;text-align:right;";
}
if(obj.align=='Justify'){
r= "vertical-align:top;text-align:left;text-justify:inter-word;text-align:justify!important;";
}
if(obj.align=='Fit'){
r= "vertical-align:center;text-align:center;";
}
if(obj.align=='LeftBottom'){
r= "vertical-align:bottom;text-align:left;";
}
if(obj.align=='RightBottom'){
r= "vertical-align:bottom;text-align:right;";
}
return r;
}
function borderByObj(obj){
}
function getBoite(obj){
if(obj.boite==''){
return '';
}
var nind=parseInt(obj.ind);
if(nind>1){
nind=nind -1 ;
}
var bullecss="bullewhite";
if(obj.boite=="bbullewhite"||obj.boite=="bcbullewhite"||obj.boite=="bdbullewhite"){
var cssPlus="";
if(obj.css){
cssPlus=obj.css;
}
var h='<div style="display:none;position:absolute;z-index:' + nind + ';' + cssPlus + '" ';
h += ' id="bbullewhite' + obj.id + '" unselectable="on" ' ;
h += ' class="unselectable bbullewhite' + obj.id + ' alterbloc' + obj.id + '" >';
h += '</div>';
if(obj.boite=="bbullewhite"){
var eachElem=obj.contentpath.split(';');
if(mobiSite){
eachElem=obj.contentpathsecond.split(';');
}
h += '<img style="position:absolute;z-index:' + nind + ';" ';
h += ' src="images/' + eachElem[0] + '" onError="ImgErrorVideo(this);" ';
h += ' id="linkbbullewhite' + obj.id + '" unselectable="on" ' ;
h += ' class="unselectable linkbbullewhite' + obj.id + ' alterbloc' + obj.id + '" />';
}
return h;
}
if(obj.boite=="scrollpro"){
var cssPlus="";
if(obj.css){
cssPlus=obj.css;
}
var exb=parseInt(parseInt(obj.getX() - 15) );
var eyb=parseInt(parseInt(obj.getY() - 15));
var wbb=parseInt(parseInt(obj.getW() + 30));
var hbb=parseInt(parseInt(obj.getH() + 30));
h += '<div class="cloudAbull' + obj.id + ' alterbloc' + obj.id + ' unselectable" style="position:absolute;z-index:' + nind + ';';
h += 'border-radius:3px;background-color:' + BackColor + ';' + cssPlus;
h += '" ></div>';
return h;
}
if(obj.boite=="clouding"){
var cssPlus="";
if(obj.css){
cssPlus=obj.css;
}
var eachBulles=obj.contentpath.split(';');
if(mobiSite){
eachBulles=obj.contentpathsecond.split(';');
}
var BigImage=eachBulles[0];
var h='<img style="position:absolute;z-index:' + nind + ';" ';
h += ' src="images/' + BigImage + '" ';
h += ' id="clouding' + obj.id + '" unselectable="on" ' ;
h += ' class="clouding' + obj.id + ' alterbloc' + obj.id + ' unselectable" />';
var BackColor=eachBulles[1];
var PenColor=eachBulles[2];
var PenSize=eachBulles[3];
if(PenSize>2){
PenSize=2;
}
var P1x=eachBulles[4];
var P1y=eachBulles[5];
var P1w=eachBulles[6];
var P1h=eachBulles[7];
h += '<div class="cloudAbull' + obj.id + ' alterbloc' + obj.id + ' unselectable" style="position:absolute;z-index:' + nind + ';';
h += 'background-color:' + BackColor + ';';
h += 'border: solid ' + PenSize + 'px ' + PenColor + ';';
h += 'border-radius: 50%;';
h += 'left:' +convertToPercentX(P1x) + ';';
h += 'top:' +convertToPercentY(P1y) + ';';
h += 'width:' +convertToPercentX(P1w) + ';';
h += 'height:' +convertToPercentY(P1h) + ';';
h += '" ></div>';
var P2x=eachBulles[8];
var P2y=eachBulles[9];
var P2w=eachBulles[10];
var P2h=eachBulles[11];
h += '<div class="cloudBbull' + obj.id + ' alterbloc' + obj.id + ' unselectable" style="position:absolute;z-index:' + nind + ';';
h += 'background-color:' + BackColor + ';';
h += 'border: solid ' + PenSize + 'px ' + PenColor + ';';
h += 'border-radius: 50%;';
h += 'left:' +convertToPercentX(P2x) + ';';
h += 'top:' +convertToPercentY(P2y) + ';';
h += 'width:' +convertToPercentX(P2w) + ';';
h += 'height:' +convertToPercentY(P2h) + ';';
h += '" ></div>';
var P3x=eachBulles[12];
var P3y=eachBulles[13];
var P3w=eachBulles[14];
var P3h=eachBulles[15];
h += '<div class="cloudCbull' + obj.id + ' alterbloc' + obj.id + ' unselectable" style="position:absolute;z-index:' + nind + ';';
h += 'background-color:' + BackColor + ';';
h += 'border: solid ' + PenSize + 'px ' + PenColor + ';';
h += 'border-radius: 50%;';
h += 'left:' +convertToPercentX(P3x) + ';';
h += 'top:' +convertToPercentY(P3y) + ';';
h += 'width:' +convertToPercentX(P3w) + ';';
h += 'height:' +convertToPercentY(P3h) + ';';
h += '" ></div>';
var P4x=eachBulles[16];
var P4y=eachBulles[17];
var P4w=eachBulles[18];
var P4h=eachBulles[19];
h += '<div class="cloudDbull' + obj.id + ' alterbloc' + obj.id + ' unselectable" style="position:absolute;z-index:' + nind + ';';
h += 'background-color:' + BackColor + ';';
h += 'border: solid ' + PenSize + 'px ' + PenColor + ';';
h += 'border-radius: 50%;';
h += 'left:' +convertToPercentX(P4x) + ';';
h += 'top:' +convertToPercentY(P4y) + ';';
h += 'width:' +convertToPercentX(P4w) + ';';
h += 'height:' +convertToPercentY(P4h) + ';';
h += '" ></div>';
return h;
}
if(obj.boite=="bullewhiteleft"||obj.boite=="bullewhiteright"){
bullecss="bullewhite"
}else{
bullecss=obj.boite;
}
var h='<div style="display:none;z-index:' + nind + ';" ';
h=h + ' id="bulle0_' + obj.id + '" unselectable="on" class="' + bullecss + '0 unselectable bulle' + obj.id + '" >';
h=h + '</div>';
h=h + '<div style="display:none;z-index:' + nind + ';" ';
h=h + ' id="bulle1_' + obj.id + '" unselectable="on" class="' + bullecss + '1 unselectable bulle' + obj.id + '" >';
h=h + '</div>';
h=h + '<div style="display:none;z-index:' + nind + ';" ';
h=h + ' id="bulle2_' + obj.id + '" unselectable="on" class="' + bullecss + '2 unselectable bulle' + obj.id + '" >';
h=h + '</div>';
h=h + '<div style="display:none;z-index:' + nind + ';" ';
h=h + ' id="bulle3_' + obj.id + '" unselectable="on" class="' + bullecss + '3 unselectable bulle' + obj.id + '" >';
h=h + '</div>';
if(obj.boite=="bullewhiteleft"){
h=h + '<img style="display:none;position:absolute;z-index:' + nind + ';" ';
h=h + ' id="bullelink_' + obj.id + '" class="unselectable bulle' + obj.id + '" ';
h=h + ' src="fx/droitbulleleft.png" ';
h=h + ' />';
}
if(obj.boite=="bullewhiteright"){
h=h + '<img style="display:none;position:absolute;z-index:' + nind + ';" ';
h=h + ' id="bullelink_' + obj.id + '" class="unselectable bulle' + obj.id + '" ';
h=h + ' src="fx/droitbulleright.png" ';
h=h + ' />';
}
return h;
}
function zoomBoite(obj){
if(obj.boite==''){
return false;
}
if(obj.boite=="scrollpro"){
var exb=parseInt(parseInt(obj.getX() - 15) );
var eyb=parseInt(parseInt(obj.getY() - 15));
var wbb=parseInt(parseInt(obj.getW() + 30));
var hbb=parseInt(parseInt(obj.getH() + 30));
var bbu=$(".cloudAbull" + obj.id);
bbu.css("width",convertToPercentX(wbb)).css("height", convertToPercentY(hbb));
bbu.css("left", convertToPercentX(exb)).css("top", convertToPercentY(eyb));
}
if(obj.boite=="clouding"){
var exb=parseInt(obj.getX() * zoom);
var eyb=parseInt(obj.getY() * zoom);
var wbb=parseInt(obj.getW()  * zoom);
var hbb=parseInt(obj.getH() * zoom);
var bbu=$("#clouding" + obj.id);
bbu.css("width", wbb + "px").css("height", hbb + "px");
bbu.css("left", exb + "px").css("top", eyb + "px");
bbu.fadeIn();
var eachBulles=obj.contentpath.split(';');
if(mobiSite){
eachBulles=obj.contentpathsecond.split(';');
}
var P1x=eachBulles[4];
var P1y=eachBulles[5];
var P1w=eachBulles[6];
var P1h=eachBulles[7];
var cloudAbull=$(".cloudAbull" + obj.id);
cloudAbull.css("left",convertToPercentX(P1x)).css("top",convertToPercentY(P1y));
cloudAbull.css("width",convertToPercentX(P1w)).css("height",convertToPercentY(P1h));
var P2x=eachBulles[8];
var P2y=eachBulles[9];
var P2w=eachBulles[10];
var P2h=eachBulles[11];
var cloudBbull=$(".cloudBbull" + obj.id);
cloudBbull.css("left",convertToPercentX(P2x)).css("top",convertToPercentY(P2y));
cloudBbull.css("width",convertToPercentX(P2w)).css("height",convertToPercentY(P2h));
var P3x=eachBulles[12];
var P3y=eachBulles[13];
var P3w=eachBulles[14];
var P3h=eachBulles[15];
var cloudCbull=$(".cloudCbull" + obj.id);
cloudCbull.css("left",convertToPercentX(P3x)).css("top",convertToPercentY(P3y));
cloudCbull.css("width",convertToPercentX(P3w)).css("height",convertToPercentY(P3h));
var P4x=eachBulles[16];
var P4y=eachBulles[17];
var P4w=eachBulles[18];
var P4h=eachBulles[19];
var cloudDbull=$(".cloudDbull" + obj.id);
cloudDbull.css("left",convertToPercentX(P4x)).css("top",convertToPercentY(P4y));
cloudDbull.css("width",convertToPercentX(P4w)).css("height",convertToPercentY(P4h));
}
if(obj.boite=="bdbullewhite"||obj.boite=="bdbulleTitle"){
var exb=parseInt(parseInt(obj.getX() - 5) * zoom);
var eyb=parseInt(parseInt(obj.getY() - 5) * zoom);
var wbb=parseInt(parseInt(obj.getW() + 10) * zoom);
var hbb=parseInt(parseInt(obj.getH() + 10) * zoom);
var bbu=$("#bbullewhite" + obj.id);
bbu.css("width", wbb + "px").css("height", hbb + "px");
bbu.css("left", exb + "px").css("top", eyb + "px");
bbu.fadeIn();
}
if(obj.boite=="bbullewhite"||obj.boite=="bcbullewhite"){
var exb=parseInt(parseInt(obj.getX() - 5) * zoom);
var eyb=parseInt(parseInt(obj.getY() - 5) * zoom);
var wbb=parseInt(parseInt(obj.getW() + 10) * zoom);
var hbb=parseInt(parseInt(obj.getH() + 10) * zoom);
var bbu=$("#bbullewhite" + obj.id);
bbu.css("border-radius","10px");
bbu.css("width", wbb + "px").css("height", hbb + "px");
bbu.css("left", exb + "px").css("top", eyb + "px");
bbu.fadeIn();
var eachElement=obj.contentpath.split(';');
if(mobiSite){
eachElement=obj.contentpathsecond.split(';');
}
var bexb=parseInt(parseInt(eachElement[1]) * zoom);
var beyb=parseInt(parseInt(eachElement[2]) * zoom);
var bwbb=parseInt(parseInt(eachElement[3]) * zoom);
var bhbb=parseInt(parseInt(eachElement[3]) * zoom);
var bbulink=$("#linkbbullewhite" + obj.id);
bbulink.css("border-radius","10px");
bbulink.css("width", bwbb + "px").css("height", bhbb + "px");
bbulink.css("left", bexb + "px").css("top", beyb + "px");
bbulink.attr("src","images/" + eachElement[0]);
return true;
}
var e_x=parseInt(obj.getX() * zoom);
var e_y=parseInt(obj.getY() * zoom);
var wb=parseInt(obj.getW() * zoom);
var hb=parseInt(obj.getH() * zoom);
var dec=10 * zoom;
$("#bulle0_" + obj.id).css("width", (wb /1.5) + "px").css("height", (hb- dec) + "px");
$("#bulle0_" + obj.id).css("left", (e_x - dec) + "px").css("top", (e_y - dec) + "px");
$("#bulle0_" + obj.id).fadeIn();
$("#bulle1_" + obj.id).css("width", (wb /2) + "px").css("height", (hb) + "px");
$("#bulle1_" + obj.id).css("left", (e_x + dec + (wb /2))  + "px").css("top", (e_y - dec) + "px");
$("#bulle1_" + obj.id).fadeIn();
$("#bulle2_" + obj.id).css("width", (wb /1.5) + "px").css("height", (hb /2) + dec + "px");
$("#bulle2_" + obj.id).css("left", (e_x - dec) + "px").css("top", (e_y  + (hb /2)) + "px");
$("#bulle2_" + obj.id).fadeIn();
$("#bulle3_" + obj.id).css("width", (wb /2) + "px").css("height", (hb /2) + dec + "px");
$("#bulle3_" + obj.id).css("left", (e_x + dec + (wb /2))  + "px").css("top", (e_y + (hb /2)) + "px");
$("#bulle3_" + obj.id).fadeIn();
$("#bullelink_" + obj.id).css("width", (50 * zoom) + "px").css("height", (50 * zoom)  + "px");
$("#bullelink_" + obj.id).css("top", (e_y + hb) + "px");
if(obj.boite=="bullewhiteleft"){
$("#bullelink_" + obj.id).css("left", (e_x) + "px");
}
if(obj.boite=="bullewhiteright"){
$("#bullelink_" + obj.id).css("left", parseInt((e_x + wb) - (50 * zoom))  + "px");
}
$("#bullelink_" + obj.id).fadeIn();
}
function helperDateActu(){
var dateString=new Date().toLocaleDateString();
try{
var dt=new Date();
var day=dt.getDate().toString();
if(day.length == 1){day='0' + day;}
var mth=parseInt(dt.getMonth()) + 1 ;
if(mth.toString().length == 1){mth='0' + mth.toString();}
var year=dt.getFullYear().toString();
dateString=day + '/' + mth +'/' + year;
}catch(err){
}
return dateString;
}
function helperHourActu(){
var dateString='';
try{
var dt=new Date();
var hour=dt.getHours();
if(hour<10){hour="0"+hour;}
var min=dt.getMinutes();
if(min<10){min="0"+min;}
dateString=hour + 'h' + min;
}catch(err){}
return dateString;
}
var menu_html='';
var menu_global='data/page0.xml';
var menu_load=0;
function installmenu(obj){
var Ecran=document.getElementById("main");
var e_x=parseInt(orix) + parseInt(obj.getX() * zoom);
var e_y=parseInt(obj.getY() * zoom);
var selectcolor="red";
if(obj.selectcolor){
selectcolor=obj.selectcolor;
}
var color="black";
if(obj.color){
color=obj.color;
}
var align="center";
if(obj.align){
align=obj.align;
}
var h='';
var act='';
var eachUrl;
var eachLabel;
var border="none";
if(obj.url!=''){
var eachUrl=obj.url.split(';');
}
if(obj.border!=''){
border=obj.border;
}
if(obj.text!=''){
var eachLabel=obj.text.split(';');
}
h='<table cellspacing="0" cellpadding="0" border=0 style="padding:0;margin:0;" ';
h=h + ' id="table' + obj.id + '" class="bloc' + obj.id + '" ';
h=h + ' >';
if(obj.src!=''){
var back='background:' +obj.src + ';';
}
if(eachLabel != null){
if(obj.data=='hori'||obj.data=='dome'||obj.data=='colorhori'){
h=h + '<tr>';
}
for(var e=0 ; e < eachLabel.length; e++){//For
if(obj.data=='vert'||obj.data=='colorvert'){h=h + '<tr>';}//VERTI
var Label=eachLabel[e];
var Url  =eachUrl[e];
act='';
if(Url!=''){
act=' onclick="loaddata(\'' + Url + '\',\'\');" ';
}
var select ='';
var classanim ='menuitem' + obj.id ;
if(menu_global==Url){
select ='color:' + selectcolor + ';';
classanim='';
}
h=h + '<td>';
h=h + '<div class="menudiv' + obj.id + '" style="position:relative;left:0px;top:0px;border:solid 0px red;width:100%;padding:0;margin:0;" >';
var borderplus='';
if(obj.data=="hori"){
if(e==eachLabel.length-1){
borderplus='';
}else{
borderplus='border-right:' + obj.border + ';';
}
}
if(obj.data=="colorhori"){
if(e==eachLabel.length-1){
borderplus='';
}else{
borderplus='border-right:' + obj.border + ';';
}
border='';
}
if(obj.data=="colorvert"){
if(e==eachLabel.length-1){
borderplus='';
}else{
borderplus='border-bottom:' + obj.border + ';';
}
border='';
}
if(obj.data=='vert'){
borderplus='border-right:' + obj.border + ';';
}
var sty=' style="' + back + 'text-align:' + align + ';color:' + color + ';' + select + 'border:' + border + ';' + borderplus + '" ';
h += '<table class="menubloc' + obj.id + '"  cellspacing="0" cellpadding="0" border=0 style="position:absolute;left:0px;top:0px;z-index:10;width:100%;padding:0;margin:0;" ><tr>';
h += '<td class="' + classanim + ' textshadow ' + obj.src + ' round itemblocmenu' + obj.id + '" ' + sty + act + ' >';
h += Label ;
h += '</td></tr></table>';
h=h + '</div></td>';
if(obj.data=='vert'||obj.data=='colorvert'){
h=h + '</tr>';
}
}
if(obj.data=='hori'||obj.data=='colorhori'){
h=h + '</tr>';
}
}
h=h + '</table>';
menu_html=h;
Ecran.innerHTML=Ecran.innerHTML + h;
obj.oldzoom=0;
obj.create=1;
}
function installmenuauto(obj){
var Ecran=document.getElementById("main");
var color="black";
if(this.color){
color=this.color;
}
var h="";
h += '<div style="display:none;color:' + color + ';position:absolute;overflow:auto;' +  obj.cssadd + '" class="unselectable haveflou unselectable bloc' + obj.id + '" unselectable="on" >';
h += obj.text;
h += '</div>';
Ecran.innerHTML=Ecran.innerHTML + h;
obj.oldzoom=0;
obj.create=1;
}
function installforms(obj){
var h='';
var act='';
var Ecran=document.getElementById("main");
if(obj.type=='contactsimple'){
h='<div style="border:solid 0px red;overflow:hidden;position:absolute;" ';
h=h + ' id="table' + obj.id + '" class="bloc' + obj.id + '" >';
h=h + '<iframe frameborder=0 scrolling=auto style="width:99%;height:90%;" ';
h=h + ' src="forms/simple/contact' +  obj.text + '.html" ></iframe>';
h=h + '</div>';
Ecran.innerHTML=Ecran.innerHTML + h;
}
if(obj.type=='contactqytouch'){
h='<iframe frameborder=0 scrolling=auto ';
h=h + ' id="table' + obj.id + '" class="bloc' + obj.id + '" ';
h=h + ' src="forms/qytouch/contact.html" ></iframe>';
Ecran.innerHTML=Ecran.innerHTML + h;
}
}
var eventCatchScript=false;
var fctMamSlideObject="";
function installfx(obj,act){
var h='';
var Ecran=document.getElementById("main");
if(obj.type=='scriptEvents'){
eventCatchScript=false;
h='<div id="bloc' +  obj.id + '" ';
h += ' class="bloc' +  obj.id + '" ';
h += ' style="display:none;';
h += 'position:absolute;left:-5px;width:2px;" >';
h += '</div>';
if(obj.data==0){
setTimeout('execEventScript1Second('+obj.id+','+lastPage0+',1000);',1000);
}
if(obj.data==1){
setTimeout('execEventScript1Second('+obj.id+','+lastPage0+',2000);',2000);
}
if(obj.data==2){
setTimeout('execEventScript1Second('+obj.id+','+lastPage0+',3000);',3000);
}
if(obj.data==3){
setTimeout('execEventScript1Second('+obj.id+','+lastPage0+',5000);',5000);
}
if(obj.data==4){
setTimeout('execEventScript1Second('+obj.id+','+lastPage0+',0);',300);
}
if(obj.data==5){
setTimeout('execEventScriptCatch('+obj.id+','+lastPage0+',0);',500);
}
if(obj.data==100){
execEventScriptCatchOne(obj.id,lastPage0);
}
}
if(obj.type=='material-top-bar'){
var ind=obj.ind;
if(oldTransitionPage=='Slide'){
ind=5;
fctMamSlideObject='$(".topslideobject' + obj.id +'").css("z-index",' + obj.ind + ');';
}
var he=convertToPercentY(obj.getH());
if(obj.selectcolor=='transparent'){
h='<div class="';
}else{
h='<div class="mat-shadows-a';
}
h += ' noslideobject topslideobject' +  obj.id + '" ';
h += 'style="position:absolute;left:-1px;top:-1px;right:-1px;z-index:' + ind + ';' + obj.cssadd + '';
h += 'height:' + he + ';background-color:'+ obj.selectcolor + ';" >';
h += '</div>';
$("#main").append(h);
}
if(obj.type=='material-panel'){
h ='<div id="bloc' +  obj.id + '" ';
h += ' class="material-panel mat-shadows-a bloc' +  obj.id + '" ';
h += 'style="position:absolute;z-index:1;' + obj.cssadd;
h += ';background-color:'+ obj.selectcolor + ';" >';
h += '</div>';
$("#main").append(h);
}
if(obj.type=='material-button'){
var col=obj.selectcolor;
h='<button id="bloc' + obj.id + '" style="background-color:' + col +  ';' + obj.cssadd + '" ';
h += ' class="mat-button bloc' + obj.id + '" ';
h += act + ' >';
h += '<i class="material-icon" ';
h += ' style="background-image:url(\'images/' +  obj.contenu2 + '\');" ';
h += '>&nbsp;&nbsp;&nbsp;</i>';
h += '</button>';
$("#main").append(h);
}
if(obj.type=='material-top50'){
var ind=obj.ind;
var we=(obj.getW() - 31) * zoom;
var he=obj.getH() * zoom;
if(obj.selectcolor=='transparent'){
h='<div class="';
}else{
h='<div class="mat-shadows-a';
}
h += ' noslideobject topslideobject' +  obj.id + '" ' ;
h += 'style="position:absolute;left:-1px;top:-1px;right:-1px;z-index:' + ind + ';';
h += 'width:' + we + 'px;height:' + he + 'px;background-color:' + obj.selectcolor + ';" >';
h += '</div>';
we=32 * zoom;
he=obj.getH() * zoom;
if(obj.selectcolor!='transparent'){
h += '<div class="mat-shadows-a-deco noslideobject decoslideobject' +  obj.id + '" ' ;
h += 'style="position:absolute;left:-1px;top:-1px;right:-1px;z-index:' + ind + ';';
h += 'width:' + we + 'px;height:' + he + 'px;background-color:' + obj.selectcolor + ';" >';
h += '</div>';
h += '<div class="noslideobject lineslideobject' +  obj.id + '" ' ;
h += 'style="position:absolute;left:-1px;top:-1px;right:-1px;z-index:' + ind + ';';
h += 'width:' + we + 'px;height:' + he + 'px;background-color:' + obj.selectcolor + ';" >';
h += '</div>';
}
var color="black";
if(obj.color){
color=obj.color;
}
if(obj.src!=''){
h += '<img class="imgTop' +  obj.id + '" ' ;
h += ' src="' + obj.src + '" ';
h += 'style="position:absolute;width:30px;height:30px;z-index:' + ind + ';" />';
}
if(obj.contenu2==''){
h += '<div class="textTop' +  obj.id + '" ' ;
h += 'style="position:absolute;left:-1px;top:-1px;z-index:' + ind + ';color:' + color + ';';
h += 'width:' + we + 'px;height:' + he + 'px;" >';
h += '<div class="vertical-texte-mat" >';
h += obj.text;
h += '</div>';
h += '</div>';
}else{
h += '<div class="textTop' +  obj.id + '" ' ;
h += 'style="position:absolute;left:-1px;top:-1px;z-index:' + ind + ';color:' + color + ';';
h += 'width:' + we + 'px;height:' + he + 'px;" >';
h += '<div class="bottom-texte-mat" >';
h += obj.text;
h += '</div>';
h += '</div>';
h += '<div class="textBottom' +  obj.id + '" ' ;
h += 'style="position:absolute;left:-1px;top:-1px;z-index:' + ind + ';color:' + color + ';';
h += 'width:' + we + 'px;height:' + he + 'px;" >';
h += '<div class="top-texte-mat" >';
h += obj.contenu2;
h += '</div>';
h += '</div>';
}
$("#main").append(h);
}
if(obj.type=='material-flipcard'){
installFlipCard(obj);
}
if(obj.type=='infosbulle'){
var exten='.png';
var rond="rond.png";
if(obj.boite!=''){
boitefond=obj.boite;
if(boitefond.indexOf(".jpg")!=-1
||boitefond.indexOf(".png")!=-1
||boitefond.indexOf(".gif")!=-1
||boitefond.indexOf(".jpeg")!=-1){
rond=obj.boite;
}else{
rond=obj.boite + ".png";
}
}
var omd=act.replace('onclick=','onMouseDown=');
h='<img style="position:absolute;cursor:pointer;left:2%;top:2%;width:5px;height:5px;" ';
h += ' id="bloc' + obj.id + '" class="bloc' + obj.id + '" ';
h += ' src="fx/bulles/' + rond + '" ';
h += ' onclick="viewbulle(' + obj.id + ');" ';
h += ' onmouseover="viewbulle(' + obj.id + ');" ';
h += ' onmouseout="viewbulleoff(' +obj.id + ');" ';
h += omd;
h += ' />';
obj.objx=105 * zoom;
obj.objy=96 * zoom;
obj.border=0;
var zi=11;
if(oldnav){zi=0;}
var sens='';
if(obj.getX()>840){
sens='-left';
}
h=h + '<img style="z-index:' + zi + ';position:absolute;cursor:pointer;display:none;" ';
h=h + ' id="bulle' + obj.id + '" class="bulle' + obj.id + '" ';
h=h + ' src="fx/bulles/bulle-infos' + sens + '.png" ';
h=h + omd;
h=h + ' />';
zi=12;
if(oldnav){zi=0;}
h=h + '<table id="textbulle' + obj.id + '"  cellspacing="0" cellpadding="0" border=0 ';
h=h + ' style="position:absolute;left:2%;top:2%;z-index:' + zi + ';';
h=h + 'display:none;padding:0;margin:0;" ><tr>';
h=h + '<td id="innertextbulle' + obj.id + '" style="text-align:center;" >';
h=h + '<div style="padding:10px" >' + obj.text + '</div>';
h=h + '</td></tr></table>'
Ecran.innerHTML=Ecran.innerHTML + h;
}
if(obj.type=='btnimage'){
h='<img style="display:none;px;cursor:pointer;" ';
h=h + ' onMouseOver="upBI(' +  obj.id + ');" ';
h=h + ' onMouseOut="doBI(' +  obj.id + ');" ';
h=h + ' id="bloc' +  obj.id + '" class="bloc' +  obj.id + '" ';
h=h + ' src="' +  obj.src + '" ';
if( obj.cssadd!=''){
h=h + ' style="' +  obj.cssadd + '" ';
}
h=h + act;
h=h + ' />';
Ecran.innerHTML=Ecran.innerHTML + h;
}
if(obj.type=='btnimagelegend'){
var animlegend=false;
if(obj.option==1){
animlegend=true;
}
h='<img style="display:none;cursor:pointer;" ';
h=h + ' id="bloc' +  obj.id + '" class="bloc' +  obj.id + '" ';
h=h + ' src="' +  obj.src + '" ';
if(animlegend){
h=h + ' onMouseOver="upBL(' +  obj.id + ');" ';
h=h + ' onMouseOut="doBL(' +  obj.id + ');" ';
}
if( obj.cssadd!=''){
h=h + ' style="' +  obj.cssadd + '" ';
}
h=h + act;
h=h + ' />';
h=h + '<div id="containlegend' + obj.id + '" class="bloc' +  obj.id + '" '
h=h + act;
if(animlegend){
h=h + ' onMouseOver="upBL(' +  obj.id + ');" ';
h=h + ' onMouseOut="doBL(' +  obj.id + ');" ';
}
h=h + ' style="overflow:hidden;" />';
h=h + '<div class="btnlegend' +  obj.id + '"  style="position:absolute;';
h=h + 'padding:5px;padding-right:0px;';
if(animlegend){h=h + 'margin-bottom:-70px;';}
h=h + 'opacity:0.5;filter:alpha(opacity=50);background-color:black;';
h=h + 'left:0px;bottom:0px;width:100%;background-color:black;color:black;font-weight:bold;" >';
h=h + obj.text;
h=h + '</div>';
h=h + '<div class="btnlegend' +  obj.id + '"  style="position:absolute;';
h=h + 'padding:5px;padding-right:0px;';
if(animlegend){h=h + 'margin-bottom:-70px;';}
h=h + 'left:0px;bottom:0px;width:100%;color:' + obj.color + ';font-weight:bold;" ';
h=h + act;
h=h +' >';
h=h + obj.text;
h=h + '</div>';
h=h + '</div>';
Ecran.innerHTML=Ecran.innerHTML + h;
}
if(obj.type=='galerie'){
h=h + '<table id="galerie' + obj.id + '" cellspacing="0" cellpadding="0" border=0 class="bloc' + obj.id + '" ';
h=h + ' style="position:abpxsolute;padding:0;margin:0;" >';
h=h + '<tr>';
h=h + '<td style="width:5%;height:5%;" >&nbsp;</td><td style="width:90%;" >&nbsp;</td><td style="width:5%;" >&nbsp;</td>';
h=h + '</tr>';
h=h + '<tr>';
h=h + '<td style="width:5%;height:85%;" >&nbsp;</td>';
h=h + '<td style="overflow:hidden;border:solid 0px gray;background:' + obj.color + ';" >';
h=h + '<div id="cont' + obj.id + '" class="galerie' + obj.id + '" ';
h=h + ' style="border:solid 0px red;width:100%;height:100%;position:relative;left:0px;top:0px;overflow:hidden;" >';
h=h + '<img id="imgwork" style="position:absolute;left:-2500px;top:-2500px;" />';
h=h + '<img id="imgcont' + obj.id + '" src="images/haute.jpg" style="position:absolute;overflow:hidden;" />';
h=h + '</div>';
h=h + '</td>';
h=h + '<td style="width:5%;" >&nbsp;</td>';
h=h + '</tr>';
h=h + '<tr>';
h=h + '<td style="width:5%;" >&nbsp;</td>';
h=h + '<td>';
h=h + '<img src="fx/black_fleche_g.png" onClick="MovePrevGalerie(' + obj.id + ')" style="cursor:pointer;float:left;height:25px;margin-top:1%;margin-left:2%;" />';
h=h + '<div style="float:left;width:1px;height:1px;overflow:hidden;color:gray"  id="numcont' + obj.id + '" >1</div>';
h=h + '<p id="legend' + obj.id + '" style="float:left;text-align:center;height:20px;margin-left:2%;border:solid 0px gray;" >...</p>';
h=h + '<img src="fx/black_fleche_d.png" onClick="MoveNextGalerie(' + obj.id + ')" style="cursor:pointer;float:right;height:25px;margin-top:1%;margin-right:2%;" />';
h=h + '</td>';
h=h + '<td style="width:5%;" >&nbsp;</td>';
h=h + '</tr>';
h=h + '</table>';
Ecran.innerHTML=Ecran.innerHTML + h;
}
if(obj.type=='playersound'){
act=' onclick="playSoundByPlayer(\'' + obj.data + '\',\'' + obj.contenu3 + '\',\'' + obj.id + '\');" ';
h='<img style="display:none;cursor:pointer;" ';
h=h + ' id="bloc' +  obj.id + '" class="bloc' +  obj.id + '" ';
h=h + ' src="' +  obj.text + '" ';
h=h + act;
h=h + ' />';
Ecran.innerHTML=Ecran.innerHTML + h;
}
}
function zoomfx(obj,e_x,e_y,wb,hb){
if(obj.type=='pola'){
$(".cadrepola"+ obj.id).css("width", wb + "px").css("height",hb + "px");
$(".legendbox").css("font-size",parseInt(obj.fontsize * zoom) + 'px');
}
if(obj.type=='material-flipcard'){
$(".flipcardfront"+ obj.id).css("width", wb + "px").css("height",hb + "px");
$(".flipcardback"+ obj.id).css("width", wb + "px").css("height",hb + "px");
$(".flipcardtable"+ obj.id).css("width", wb + "px").css("height",hb + "px");
}
if(obj.type=='material-top50'){
var we=(obj.getW() - 31) * zoom;
$(".topslideobject" + obj.id).css("width",we + "px").css("height",hb + "px");
var radius=31 * zoom;
var largW=32 * zoom;
if(obj.contenu7==1){
$(".decoslideobject" + obj.id).css("left",(we - 1) + "px");
$(".decoslideobject" + obj.id).css("width",largW + "px").css("height",hb + "px");
$(".decoslideobject" + obj.id).css("border-bottom-right-radius",radius + "px");
}
$(".lineslideobject" + obj.id).css("left",(we - (5 * zoom)) + "px").css("height",(hb-1) + "px");
$(".lineslideobject" + obj.id).css("width",(8 * zoom) + "px");
if(obj.contenu7==2){
var winX=(wb + (30 * zoom));
$(".topslideobject" + obj.id).css("left", (-48 * zoom) + "px");
$(".topslideobject" + obj.id).css("width",winX + "px").css("height",hb + "px");
$(".topslideobject" + obj.id).css("transform","skew(-18deg)");
$(".decoslideobject" + obj.id).css("display","none");
$(".lineslideobject" + obj.id).css("display","none");
}
if(obj.contenu7==3){
var winX=(wb + (30 * zoom));
$(".topslideobject" + obj.id).css("left", (-48 * zoom) + "px");
$(".topslideobject" + obj.id).css("width",winX + "px").css("height",hb + "px");
$(".topslideobject" + obj.id).css("transform","skew(18deg)");
$(".decoslideobject" + obj.id).css("display","none");
$(".lineslideobject" + obj.id).css("display","none");
}
if(obj.contenu7==4){
$(".decoslideobject" + obj.id).css("left",(we - 1) + "px");
$(".decoslideobject" + obj.id).css("width",largW + "px").css("height",hb + "px");
$(".decoslideobject" + obj.id).css("border-bottom-right-radius",radius + "px");
$(".decoslideobject" + obj.id).css("border-top-right-radius",radius + "px");
}
if(obj.contenu7==5){
$(".topslideobject" + obj.id).css("left", (-1 * zoom) + "px");
$(".topslideobject" + obj.id).css("width",(wb+1) + "px").css("height",hb + "px");
$(".decoslideobject" + obj.id).css("display","none");
$(".lineslideobject" + obj.id).css("display","none");
}
if(obj.contenu7==6){
$(".topslideobject" + obj.id).css("left", (-1 * zoom) + "px");
$(".topslideobject" + obj.id).css("width","101%").css("height",hb + "px");
$(".decoslideobject" + obj.id).css("display","none");
$(".lineslideobject" + obj.id).css("display","none");
}
$(".textTop" + obj.id).css("font-size",parseInt(obj.getFts() * zoom) + 'px');
$(".textBottom" + obj.id).css("font-size",parseInt(obj.getFts() * zoom) + 'px');
var decLeft=parseInt(10 * zoom);
if(obj.src!=''){
decLeft=parseInt(64 * zoom);
$(".imgTop" + obj.id).css("left",parseInt(8 * zoom) + "px").css("top",parseInt(8 * zoom) + "px");
$(".imgTop" + obj.id).css("width",parseInt(48 * zoom) + "px").css("height",parseInt(48 * zoom) + "px");
}
if(obj.contenu2==''){
$(".textTop" + obj.id).css("left", decLeft + "px").css("top", (-1 * zoom) + "px");
$(".textTop" + obj.id).css("height",(hb + 1) + "px");
$(".textTop" + obj.id).css("width",(we - decLeft) + "px");
$(".textBottom" + obj.id).css("display","none");
}else{
$(".textTop" + obj.id).css("left", decLeft+ "px").css("top", (-1 * zoom) + "px");
$(".textTop" + obj.id).css("height",(hb/2) + "px");
$(".textTop" + obj.id).css("width",(we - decLeft) + "px");
$(".textBottom" + obj.id).css("left",decLeft + "px").css("top", (hb/2) + "px");
$(".textBottom" + obj.id).css("height",(hb/2) + "px");
$(".textBottom" + obj.id).css("width",(we - decLeft) + "px");
}
}
if(obj.type=='infosbulle'){
var fts=parseInt(obj.fontsize * zoom);
$("#innertextbulle" + obj.id).css("font-size",fts + "px");
zoomMiniBulle(obj,e_x,e_y,wb,hb);
zoomMiniBulle(obj,e_x,e_y,wb,hb);
zoomMiniBulle(obj,e_x,e_y,wb,hb);
zoomMiniBulle(obj,e_x,e_y,wb,hb);
}
if(obj.type=='galerie'){
placeImg(obj);
$(".galerie" + obj.id).css("height",  parseInt(hb * 0.85) + 'px');
}
if(obj.type=='slide'){
placeImgSlide(obj);
}
}
function installFlipCard(obj){
var h='<div id="bloc' +  obj.id + '" ';
h += ' class="flipcard-container bloc' +  obj.id + '" ';
h += ' onClick="this.classList.toggle(\'flipcard-hover\');flipcardHackIE(' +  obj.id + ');" >';
h += '<div class="flipcard-flipper flipcardflipper' +  obj.id + '">';
h += sideFlipRecto(obj);
h += sideFlipVerso(obj);
h += '</div>';
h += '</div>';
$("#main").append(h);
}
function sideFlipRecto(obj){
var h='';
if(obj.contenu3==1){
h += '<div class="flipcard-front flipcard-question flipcardfront' +  obj.id + '" >';
h += '</div>';
}
if(obj.contenu3==2){
h += '<div class="flipcard-front flipcardfront' +  obj.id + '" >';
h += '<table class="flipcard-inner flipcardtable' +  obj.id + '" ><tr>';
h += '<td>';
h += obj.text;
h += '</td>';
h += '</tr></table>';
h += '</div>';
}
if(obj.contenu3==3){
h += '<div class="flipcard-inner flipcard-front flipcard-image flipcardfront' +  obj.id + '"';
h += ' style="background-image:url(\'images/' +  obj.data + '\');" >';
h += '</div>';
}
return h;
}
function sideFlipVerso(obj){
var h='';
if(obj.contenu4==1){
h += '<div hie=0 class="flipcard-back mat-shadows-a flipcardback' +  obj.id + '">';
h += '<table class="flipcard-inner flipcardtable' +  obj.id + '" ><tr>';
h += '<td>';
h += obj.contenu2;
h += '</td>';
h += '</tr></table>';
h += '</div>';
}
if(obj.contenu4==2){
h += '<div hie=0 class="flipcard-inner flipcard-back flipcard-image mat-shadows-a flipcardback' +  obj.id + '" ';
h += ' style="background-image:url(\'images/' +  obj.contenu7 + '\');" >';
h += '</div>';
}
return h;
}
function flipcardHackIE(i){
if(isMsie()||isIOS()||isSafari()||isMozilla()){
var hie=$('.flipcardback' + i).attr('hie');
$('.bloc'+ i).css('opacity','1');
$('.bloc'+ i + ' .flipcard-inner').css('opacity','0.6');
if(hie==0){
$('.flipcardback' + i).attr('hie',1);
setTimeout(function(){
sdn('.flipcardfront'+ i);
sdb('.flipcardback' + i);
}, 350);
setTimeout(function(){
$('.flipcardback' + i).css('-ms-transform','rotateY(0deg)').css('transform','rotateY(0deg)');
$('.flipcardback' + i).css('-ms-transform','scaleX(-1)').css('transform','scaleX(-1)');
},350);
setTimeout(function(){
$('.bloc'+ i).css('opacity','1');
$('.bloc'+ i + ' .flipcard-inner').css('opacity','1');
},700);
}else{
$('.flipcardback' + i).attr('hie',0);
setTimeout(function(){
sdb('.flipcardfront'+ i);
sdn('.flipcardback' + i);
}, 350);
setTimeout(function(){
$('.flipcardback' + i).css('-ms-transform','rotateY(180deg)').css('transform','rotateY(180deg)');
$('.flipcardback' + i).css('-ms-transform','scaleX(1)').css('transform','scaleX(1)');
},350);
setTimeout(function(){
$('.bloc'+ i).css('opacity','1');
$('.bloc'+ i + ' .flipcard-inner').css('opacity','1');
},700);
}
}
}
function execEventScript1Second(id,lpage,time){
if(lastPage0==lpage){
var obj=CObjets[id];
eval(obj.text);
if(time>0){
setTimeout('execEventScript1Second('+id+','+lpage+','+time+');',time);
}
}
}
function execEventScriptCatch(id,lpage){
if(lastPage0==lpage){
if(eventCatchScript){
var obj=CObjets[id];
eval(obj.text);
eventCatchScript=false;
}
setTimeout('execEventScriptCatch('+id+','+lpage+');',750);
}
}
function execEventScriptCatchOne(id,lpage){
if(lastPage0==lpage){
var obj=CObjets[id];
eval(obj.text);
}
}
var timerPlayer;
function playSoundByPlayer(data1,data2,i){
i=parseInt(i);
StopAllSounds();
for(var j=0; j < CObjets_count; j++){
if(CObjets[j].id!=i){
if(CObjets[j].type=='playersound'){
CObjets[j].border='';
$('.bloc' + CObjets[j].id).attr('src', CObjets[j].text);
}
}
}
if(CObjets[i].border!='1'){
$('.bloc' + CObjets[i].id ).attr('src', CObjets[i].contenu2);
CObjets[i].border='1';
playSoundOne(data1,data2);
}else{
CObjets[i].border='';
$('.bloc' + CObjets[i].id ).attr('src', CObjets[i].text);
clearTimeout(timerPlayer);
}
}
function resetSound(i){
clearTimeout(timerPlayer);
var act='$(\'.bloc' + CObjets[i].id + '\').attr(\'src\',"' + CObjets[i].text + '"); ';
timerPlayer=setTimeout(act, 5000);
}
function upBI(i){
var wb=parseInt(CObjets[i].getW() * zoom);
var hb=parseInt(CObjets[i].getH() * zoom);
var wb_max=parseInt(wb * 1.2);
var hb_max=parseInt(hb * 1.2);
var dec_x=parseInt((wb_max - wb) / 2 );
var dec_y=parseInt((hb_max - hb) / 2 );
$('.bloc' + i).stop().animate({width :wb_max + 'px',height :hb_max + 'px',marginLeft :  '-' + dec_x + 'px',marginTop :  '-' + dec_y + 'px' } , 500);
}
function doBI(i){
var wb=parseInt(CObjets[i].getW() * zoom);
var hb=parseInt(CObjets[i].getH() * zoom);
$('.bloc' + i).stop().animate({width : wb + 'px',height : hb + 'px',marginLeft : '0px',marginTop : '0px' } , 500);
}
function upBL(i){
$('.btnlegend' + i).stop().animate({marginBottom :'0px'} , 500);
}
function doBL(i){
$('.btnlegend' + i).stop().animate({marginBottom :'-70px'} , 500);
}
function zoomMiniBulle(obj,e_x,e_y,wb,hb){
var lw=obj.objx;
var lh=obj.objy;
if(document.getElementById ("textbulle" + obj.id)){
var ctrh=document.getElementById ("textbulle" + obj.id).offsetHeight;
if(ctrh>lh-(17 * zoom)&&lw<250){
if(ctrh>lh-(17 * zoom)){
lh=lh + 20;
}else{
obj.border=1;
}
var rati=105/96;
lw= parseInt(lh * rati);
obj.objx=lw;
obj.objy=lh;
}else{
obj.border=1;
}
var LittleDecY=(10 * zoom);
var leftBul=parseInt(parseInt(e_x -( (lw * zoom)/2 ) )+(wb/2));
if(obj.getX()>840){
leftBul=parseInt(parseInt(e_x -(lw * zoom) )+ parseInt(wb/3) );
}
var topBull =parseInt(e_y -(lh + LittleDecY));
$('#textbulle' + obj.id).css("left", (leftBul + 5) + 'px');
$('#textbulle' + obj.id).css("top",  (topBull + 5) + 'px');
$("#textbulle" + obj.id).css("width",  parseInt(parseInt(lw - 10) * zoom) + 'px');
$("#textbulle" + obj.id).css("height",  parseInt(lh - (17 * zoom)) + 'px');
$("#bulle" + obj.id).css("left", leftBul + 'px');
$("#bulle" + obj.id).css("top",  topBull + 'px');
$("#bulle" + obj.id).css("width",  parseInt(lw * zoom) + 'px');
var ctrhy=document.getElementById ("textbulle" + obj.id).offsetHeight;
$("#bulle" + obj.id).css("height",  parseInt(ctrhy + (17 * zoom)) + 'px');
}
}
function viewbulle(objid){
$("#bulle" + objid + ',#textbulle' + objid).stop().fadeIn(100);
}
function viewbulleoff(i){
if(typeof CObjets[i] === "undefined"){
return false;
}
if(typeof CObjets[i].border === "undefined"){
return false;
}
if(CObjets[i].border==1){
$("#bulle" + i + ',#textbulle' + i).css("display","none");
}
}
function placeImg(obj){
var actual=parseInt(document.getElementById("numcont" + obj.id).innerHTML) - 1;
var parsed=[];
parsed=obj.src.split(";");
var legendcoll=[];
legendcoll=obj.text.split(";");
if(parsed[actual]!=''){
var srcimg="images/" + parsed[actual];
$('#imgcont' + obj.id ).attr('src', srcimg);
}
var iwe=parseInt(parseInt(obj.getW() * 0.9) * zoom);
var ihe=parseInt(parseInt(obj.getH() * 0.8) * zoom);
$('#legend' + obj.id ).css("width", parseInt(parseInt(parseInt(obj.getW() * 0.80) * zoom) - 60) + "px");
document.getElementById("legend" + obj.id ).innerHTML=legendcoll[actual];
$('#imgcont' + obj.id ).stop().css("opacity", "0");
document.getElementById("imgwork").src=srcimg;
$('#imgcont' + obj.id ).stop().animate({
opacity: 0.1}, 500, function(){
var itw= document.getElementById("imgwork").offsetWidth;
var ith= document.getElementById("imgwork").offsetHeight;
var ratio=itw/ith;
if(ith>itw){
ratio=itw/ith;
iw=parseInt(ihe * ratio);
ih=ihe;
}
if(itw>ith){
ratio=itw/ith;
ih=parseInt(iwe / ratio);
iw=iwe;
}
if(ih>ihe){
ratio=itw/ith;
iw=parseInt(ihe * ratio);
ih=ihe;
}
if(iw>iwe){
ratio=itw/ith;
ih=parseInt(iwe / ratio);
iw=iwe;
}
$("#imgcont" + obj.id).css("left" ,'50%').css("top" ,'50%');
$("#imgcont" + obj.id).css("width" ,iw + 'px').css("height",ih + 'px');
$("#imgcont" + obj.id).css("margin-left" , '-' + parseInt(iw/2) + 'px');
$("#imgcont" + obj.id).css("margin-top"	 , '-' + parseInt(ih/2) + 'px');
$('#imgcont' + obj.id ).stop().animate({opacity: 1});
});
}
function MoveNextGalerie(i){
var actual=parseInt(document.getElementById("numcont" + i).innerHTML);
var parsed=[];
parsed=CObjets[i].src.split(";");
if(actual==parsed.length -1){
actual=0;
}
document.getElementById("numcont" + i).innerHTML=actual + 1;
placeImg(CObjets[i]);
placeImg(CObjets[i]);
}
function MovePrevGalerie(i){
var actual=parseInt(document.getElementById("numcont" + i).innerHTML);
var parsed=[];
parsed=CObjets[i].src.split(";");
if(actual==1){
actual=parsed.length;
}
document.getElementById("numcont" + i).innerHTML=actual - 1;
placeImg(CObjets[i]);
placeImg(CObjets[i]);
}
function placeImgSlide(obj){
var actual=parseInt(document.getElementById("numcont" + obj.id).innerHTML);
var parsed=[];
parsed=obj.src.split(";");
var legendcoll=[];
legendcoll=obj.text.split(";");
if(parsed[actual]!=''){
var srcimg="images/" + parsed[actual];
var srcimg2="images/" + parsed[actual + 1];
$('#slideimg1' + obj.id ).attr('src', srcimg);
$('#slideimg2' + obj.id ).attr('src', srcimg2);
}
pointSlide(obj.id);
var iwe=parseInt(parseInt(obj.getW()) * zoom);
var ihe=parseInt(parseInt(obj.getH()) * zoom);
var ratioH=obj.getH()/200;
var vH=parseInt(71*ratioH);
var ratioW=obj.getW()/400;
var vW=parseInt(61*ratioW);
$("#ombreslide" + obj.id ).css("position",'absolute');
$("#ombreslide" + obj.id ).css("top",parseInt(parseInt(obj.getY() - parseInt(vH/2)) * zoom) + 'px');
$("#ombreslide" + obj.id ).css("height",parseInt(parseInt(obj.getH() + vH) * zoom) + 'px');
$("#ombreslide" + obj.id ).css("left",parseInt(parseInt(obj.getX() -parseInt(vW/2)) * zoom) + 'px');
$("#ombreslide" + obj.id ).css("width" ,parseInt(parseInt(obj.getW() + vW) * zoom) + 'px');
$("#slidecontainGlobal" + obj.id ).css("width" ,parseInt(iwe) + 'px')
$("#slidecontainGlobal" + obj.id ).css("width" ,parseInt(iwe) + 'px').css("height",ihe + 'px');
$("#slidecontainGlobal" + obj.id ).css("overflow" ,'hidden');
$("#slidecontain" + obj.id ).css("width" ,parseInt(iwe * 3) + 'px');
$("#slidecontain" + obj.id ).css("height",parseInt(ihe + 5) + 'px');
$("#slidecontain" + obj.id ).css("overflow" ,'hidden');
var idIm="#slidebl" + obj.id + "," + "#slideb2" + obj.id;
$(idIm).css("top",parseInt(parseInt(obj.getY() * zoom) + parseInt(ihe/2) - 28) + 'px');
var ec=0 ;
var hauteurF=parseInt(720 * zoom);
if(hauteurF<700){ec=7;}
if(hauteurF<450){ec=15;}
$("#slidebl" + obj.id ).css("left" ,parseInt(obj.getX() * zoom) - (36 - ec) + 'px');
$("#slideb2" + obj.id ).css("left" ,parseInt(parseInt(obj.getX() + obj.getW()) * zoom) - (3 + ec) + 'px');
var idS="#slideimg1" + obj.id + "," + "#slideimg2" + obj.id;
$(idS).css("width" ,iwe + 'px').css("height",ihe + 'px').css("float",'left');
}
function transitionSlide(id,incr,prop){
if(document.getElementById("numcont" + id)){
var obj=CObjets[id];
var actual=parseInt(document.getElementById("numcont" + id).innerHTML);
var parsed=[];
parsed=obj.src.split(";");
var iwe=parseInt(parseInt(obj.getW()) * zoom);
actual=actual + incr;
if(parsed[actual]==''){actual=0;}
document.getElementById("numcont" + id).innerHTML=actual;
pointSlide(obj.id);
$('#slideimg1' + id ).stop().animate({marginLeft: "-" + iwe + "px"}, 1000,
function(){
if(parsed[actual]!=''){
var srcimg="images/" + parsed[actual];
var srcimg2="";
if(parsed[actual+ 1]!=''){
srcimg2="images/" + parsed[actual + 1];
}else{
srcimg2="images/" + parsed[0];
}
$('#slideimg1' + obj.id ).attr('src', srcimg);
$('#slideimg1' + obj.id ).css("margin-left","0px");
$('#slideimg2' + obj.id ).attr('src', srcimg2);
}
setTimeout('transitionSlide(' + obj.id + ',' + incr + ')', 4000);
}
);
}
}
function transitionRapid(id,incr){
var obj=CObjets[id];
var actual=parseInt(document.getElementById("numcont" + id).innerHTML);
var parsed=[];
parsed=obj.src.split(";");
var iwe=parseInt(parseInt(obj.getW()) * zoom);
actual=parseInt(actual + parseInt(incr));
if(parsed[actual]==''){actual=0;}
if(parseInt(actual)==-1){actual=parseInt(parsed.length-2);}
if(parsed[actual]==''){actual=0;}
document.getElementById("numcont" + id).innerHTML=actual;
pointSlide(obj.id);
if(parsed[actual]!=''){
var srcimg="images/" + parsed[actual];
var srcimg2="";
if(parsed[actual+ 1]!=''){
srcimg2="images/" + parsed[actual + 1];
}else{
srcimg2="images/" + parsed[0];
}
$('#slideimg1' + obj.id ).attr('src', srcimg);
$('#slideimg1' + obj.id ).css("margin-left","0px");
$('#slideimg2' + obj.id ).attr('src', srcimg2);
}
}
function pointSlide(id){
if(document.getElementById("numcont" + id)){
var obj=CObjets[id];
var actual=parseInt(document.getElementById("numcont" + id).innerHTML);
var parsed=[];
parsed=obj.src.split(";");
if(document.getElementById("indexslide" + obj.id)){
htmlist="";
for(var i=0; i<parsed.length; i++){
if(parsed[i]!=''){
if(actual==i){
htmlist=htmlist + '<img src="fx/active-slide.png" />';
}else{
htmlist=htmlist + '<img src="fx/inactive-slide.png" />';
}
}
}
document.getElementById("indexslide" + obj.id).innerHTML=htmlist;
}
}
}
var objectifherox=0;
var objectifheroy=0;
var haveHero=false;
var loadaction=0;
var angleHero=0;
var nextGameTick=80;
var FirstGameInit=true;
function exitAllGame(){
$("#game").empty();
$('#main').empty();
setTimeout('$("#game").css("display","none");', 500);
window.gameInstance.finish();
}
function installgame(obj){
var h='';
var act='';
var Ecran=document.getElementById("main");
if(obj.type=='3dplane'&&obj.objx!=1){
obj.objx=1;
if(FirstGameInit){
$('#game').css('background','white');
setTimeout('$("#main").append("<div class=coverall ></div>");$("body").focus();',200);
setTimeout('$("#main").append("<div class=coverall ></div>");$("#game").css("display","block");$("body").focus();',1200);
setTimeout('gameLaunch' + obj.data + '();',1500);
FirstGameInit=false;
}else{
$("#game").css("display","block").css('background','white');
setTimeout('$("#main").append("<div class=coverall ></div>");$("body").focus();', 200);
setTimeout('$("#main").append("<div class=coverall ></div>");$("#game").css("display","block");$("body").focus();',1000);
setTimeout('gameLaunch' + obj.data + '();',1500);
}
$('body').focus();
}
if(obj.type=='gamehero'){
if(haveHeroMask){
if(objectHeroMask.idscript==obj.idscript){
obj.text=objectHeroMask.text;
obj.contenu3=objectHeroMask.contenu3;//h
obj.contenu2=objectHeroMask.contenu2;//b
obj.src=objectHeroMask.contenu5;//g
obj.data=objectHeroMask.contenu4;//d
}
}
h='<img style="position:absolute;z-index:2;" ';
h += ' id="bloc' + obj.id + '" class="hero' + obj.id + '" ';
h += ' src="' + obj.text + '" ';
h += ' />';
objectifherox=obj.getX();
objectifheroy=obj.getY();
loadaction=0;
haveHero=true;
}
if(obj.type=='gamecollide'){
h='<img style="position:absolute;z-index:1;" ';
h += ' id="collide' + obj.id + '" class="collide' + obj.id + ' alterbloc' + obj.id + '" ';
h += ' src="' + obj.text + '" ';
h += ' />';
}
if(obj.type=='gamezoneaction'){
var extraCss="";
if(obj.text.indexOf("gotogreen.gif")!=-1){
extraCss="opacity: 0.7;";
}
if(obj.text.indexOf("zone-")!=-1){
extraCss="opacity: 0.4;";
}
if(obj.an==26){
extraCss="opacity:0.95;";
}
obj.option=0;
h='<img style="position:absolute;z-index:1;cursor:pointer;' + extraCss + '" ';
h += ' id="zoneaction' + obj.id + '" class="bloc' + obj.id + ' zoneaction' + obj.id + ' unselectable" ';
h += ' src="' + obj.text + '" ';
h += ' onClick="this.style.opacity=0.7;" ';
h += ' />';
}
if(obj.type=='gameitem'){
h='<img style="position:absolute;z-index:1;cursor:pointer;" ';
h += ' id="gameitem' + obj.id + '" class="bloc' + obj.id + ' gameitem' + obj.id + '" ';
h += ' src="' + obj.text + '" ';
h += ' />';
}
if(obj.type=='gamelife'){
if(LUDIlifeFirstLoad){
LUDIlifeFirstLoad=false;
LUDIlife=parseInt(obj.data);
}
if(LUDIlifeNoReload==0){
if(LUDIlife==0||LUDIlife<1){
LUDIlife=parseInt(obj.data);
}
}
LUDIlifeheight= parseInt(obj.getH());
LUDIlifegameover=parseInt(obj.src);
h += '<div style="border:gray 0px solid;display:none;" ';
h += ' id="table' + obj.id + '" unselectable="on" ';
h += ' class="unselectable bloc' + obj.id + '" >';
LUDIlifeTotal=parseInt(obj.data);
LUDIlifeNoReload=parseInt(obj.option3);
var srcImg=obj.text;
if(cleText(obj.contenu2)!=""){
srcImg='images/' + obj.contenu2;
}
for(var i=0;i<LUDIlifeTotal;i++){
if(i<LUDIlife){
h += '<img style="float:left;height:100%;" ';
h += ' id="gamelife' + i + '" class="gamelife' + i + '" ';
h += ' src="' + srcImg + '" ';
h += ' />';
}else{
h += '<img style="float:left;height:100%;opacity:0.1;" ';
h += ' id="gamelife' + i + '" class="gamelife' + i + '" ';
h += ' src="' + srcImg + '" ';
h += ' />';
}
}
h += '</div>';
}
if(h!=''){
Ecran.innerHTML=Ecran.innerHTML + h;
$('body').focus();
}
}
function zoomGame(obj){
var ex=parseInt(obj.getX() * zoom);
var ey=parseInt(obj.getY() * zoom);
var ew=parseInt(obj.getW() * zoom);
var eh=parseInt(obj.getH() * zoom);
var hero_ex=ex - (ew/2);
var hero_ey=ey - eh;
if(obj.type=='gamehero'){
$(".hero" + obj.id).css("left",hero_ex + 'px').css("top",hero_ey + 'px');
$(".hero" + obj.id).css("width",ew + 'px').css("height",eh + 'px');
}
if(obj.type=='gamecollide'){
$(".collide" + obj.id).css("left",ex + 'px').css("top",ey + 'px');
$(".collide" + obj.id).css("width",ew + 'px').css("height",eh + 'px');
}
if(obj.type=='gamezoneaction'){
$(".zoneaction" + obj.id).css("left",ex + 'px').css("top",ey + 'px');
$(".zoneaction" + obj.id).css("width",ew + 'px').css("height",eh + 'px');
}
if(obj.type=='gameitem'){
$(".gameitem" + obj.id).css("left",ex + 'px').css("top",ey + 'px');
$(".gameitem" + obj.id).css("width",ew + 'px').css("height",eh + 'px');
}
}
function zoomGameCollide(obj,hx,hy){
var ex=parseInt(obj.getX() * zoom);
var ey=parseInt(obj.getY() * zoom);
var ew=parseInt(obj.getW() * zoom);
var eh=parseInt(obj.getH() * zoom);
if(obj.type=='gamecollide'){
var collide_ex=ex + (ew/2);
var collide_ey=parseInt(ey) + parseInt(eh);
if(collide_ey<parseInt(hy+10)){
$(".collide" + obj.id).css("z-index",'1');
}else{
$(".collide" + obj.id).css("z-index",'3');
}
}
}
function displayCollideObjects(hx,hy){
for(var i=0; i < CObjets_count; i++){
if(CObjets[i].type=='gamecollide'){
zoomGameCollide(CObjets[i],hx,hy);
}
}
}
var lastGameItemID='';
function haveCollideObjects(hx,hy,mode){
for(var i=0;i<CObjets_count;i++){
var CtrObj=CObjets[i];
var ex=parseInt(CtrObj.getX());
var ey=parseInt(CtrObj.getY());
var ew=parseInt(CtrObj.getW());
var eh=parseInt(CtrObj.getH());
var CtrType=CtrObj.type;
if(CtrType=='gamecollide'){
var collide_ex=ex + parseInt(ew/2);
var collide_ey=parseInt(ey) + parseInt(eh/2);
if(hx>ex&&hx<parseInt(ex+ew)){
if(hy>ey&&hy<parseInt(ey+eh)){
return true;
}
}
}
if(CtrType=='gamezoneaction'){
var act='';
if(CtrObj.url!=''){
if(CtrObj.url.indexOf("link:")!=-1){
var ur=CtrObj.url.replace('link:','');
act='window.location.href=\'' + ur + '\'; ';
}else{
act='loaddata(\'' + CtrObj.url + '\',\'' + CtrObj.data + '\');';
}
}
if(isSpJSFct(CtrObj.url)){
act=CtrObj.url;
}
if(CtrObj.strscript!=''){
act=act + CtrObj.strscript;
}
if(act!=''){
if(hx>ex&&hx<parseInt(ex+ew)){
if(hy>ey&&hy<parseInt(ey+eh+10)){
if(CtrObj.option==0){
CtrObj.option=1;
if(CtrObj.url!=''){
var HeroCtrObj=trouveHero();
if(typeof HeroCtrObj === 'undefined'){
}else{
CtrObj.setX(-1000);
CtrObj.setY(-1000);
$(".hero" + HeroCtrObj.id).fadeOut(1000);
}
}
setTimeout(act,1000);
}
}
}
}
}
if(CtrType=='gameitem'){
if(hx>ex&&hx<parseInt(ex+ew)){
if(hy>ey&&hy<parseInt(ey+eh)){
if(mode==0){
var HeroCtrObj=trouveHero();
if(typeof HeroCtrObj === 'undefined'){
}else{
CtrObj.setY(-1000);
CtrObj.setX(-1000);
objectifherox=HeroCtrObj.getX();
objectifheroy=HeroCtrObj.getY() + 3;
$(".gameitem" + CtrObj.id).css("display","none");
if(CtrObj.data!=''){
setTimeout(CtrObj.data,200);
}
$(".hero" + HeroCtrObj.id).attr('src',HeroCtrObj.text);
}
}
var objRef=CtrObj.id + '-' + LUDI.getNumPage();
if(mode==1&&lastGameItemID!=objRef){
lastGameItemID=objRef;
$(".gameitem" + CtrObj.id).css("opacity","0.5");
if(CtrObj.getY()>(largEcranHeight/2)){
LUDI.translateXY(CtrObj.idscript,CtrObj.getX(),largEcranHeight + 350);
}else{
LUDI.translateXY(CtrObj.idscript,CtrObj.getX(),-350);
}
if(CtrObj.data!=''){
setTimeout(CtrObj.data,200);
}
}
}
}
}
}
return false;
}
var idaction='';
var nbClickAct=0;
var lantenceClickAct=0;
var TlantenceClickAct=setTimeout(function(){}, 100);
function addL(){
lantenceClickAct=1;
clearTimeout(TlantenceClickAct);
TlantenceClickAct=setTimeout(function(){ lantenceClickAct=0;},500);
}
function clickAction(){
if(lantenceClickAct>0){
return false;
}
if(nbClickAct==0){
nbClickAct++;
return false;
}
var randomnumber=Math.floor(Math.random()*10000);
var randomnumber2=Math.floor(Math.random()*10000);
var randomnumber3=Math.floor(Math.random()*10000);
idaction='idaction' + randomnumber + randomnumber2 + randomnumber3;
var Ecran=document.getElementById("main");
eventClickIsoAvatar();
if(haveHero){
var Vobj=trouveHero();
if(Vobj){
var ex=parseInt(parseInt(xcoord - Ecran.offsetLeft) /zoom);
var ey=parseInt(parseInt(ycoord - Ecran.offsetTop ) /zoom);
if(noClickCancel(ex,ey)==false){
objectifherox=ex;
objectifheroy=ey;
correctionZoneAction(objectifherox,objectifheroy);
var angleHero=getAngle(objectifherox,objectifheroy,Vobj.getX(),Vobj.getY());
var angleDegrees=angleHero *  (180 /Math.PI) ;
var imgsrc=($('.hero' + Vobj.id ).attr("src"));
if(objectifherox>Vobj.getX()){
if(imgsrc.indexOf(Vobj.data)==-1){
$(".hero" + Vobj.id).attr('src',Vobj.data);
}
}
if(objectifherox<=Vobj.getX()){
if(imgsrc.indexOf(Vobj.src)==-1){
$(".hero" + Vobj.id).attr('src',Vobj.src);
}
}
if(Vobj.option==0){
if(angleDegrees>65&&angleDegrees<115){
if(imgsrc.indexOf(Vobj.contenu2)==-1){
$(".hero" + Vobj.id).attr('src',Vobj.contenu2);
}
}
if(angleDegrees<-45&&angleDegrees>-135){
if(imgsrc.indexOf(Vobj.contenu3)==-1){
$(".hero" + Vobj.id).attr('src',Vobj.contenu3);
}
}
}
nextGameTick=(new Date).getTime();
moveHero(idaction);
}
}
}
if(haveCanon){
for(var i=0; i < CObjets_count; i++){
if(CObjets[i].type=='physicscanon'){
var Vobj= CObjets[i];
activeBoule(Vobj);
}
}
}
var ex=parseInt(parseInt(xcoord - Ecran.offsetLeft) /zoom);
var ey=parseInt(parseInt(ycoord - Ecran.offsetTop ) /zoom);
if(!onObjectClickCancel(ex,ey)){
activeObjectAnimClic();
}
}
function correctionZoneAction(ctrx,ctry){
for(var i=0; i < CObjets_count; i++){
var ob=CObjets[i];
if(ob.type=='gamezoneaction'){
var r=0;
if(ctrx>parseInt(ob.getX())){
r=r + 1 ;
}
if(ctry>parseInt(ob.getY())){
r=r + 1 ;
}
if(ctrx<parseInt(ob.getX()+ob.getW())){
r=r + 1 ;
}
if(ctry<parseInt(ob.getY()+ob.getH())){
r=r + 1 ;
}
if(r==4){
objectifherox=ob.getX()+(ob.getW()/2);
objectifheroy=ob.getY()+(ob.getH()/1.4);
if(ob.text.indexOf("portefermee.png")!=-1){
objectifheroy=ob.getY()+(ob.getH()*1.1);
}
if(ob.text.indexOf("elipse.png")!=-1){
objectifheroy=ob.getY()+(ob.getH()/1.2);
}
if(ob.text.indexOf("zone-")!=-1){
objectifheroy=ob.getY()+(ob.getH()/1.2);
}
if(ob.text.indexOf("gotogreen.gif")!=-1){
objectifheroy=ob.getY()+(ob.getH()*0.95);
}
}
}
}
}
function noClickCancel(ctrx,ctry){
if(ctrx>largEcranWidth-30){
if(ctry<100){
return true;
}
}
for(var i=0; i < CObjets_count; i++){
var ob=CObjets[i];
if(ob.type=='videohtml'
||ob.type=='audiohtml'
||ob.type=='videodistante'
||ob.type=='qcm'||ob.type=='qcmuniquedata'
||ob.type=='holetext'||ob.type=='tcm'||ob.type=='drop'||ob.type=='bag'
||ob.type=='input'||ob.type=='inputNumerique'||ob.type=='inputNumeriqueSignificatif'
||ob.type=='motatrier'||ob.type=='drag'
||ob.type=='ludidialog'||ob.type=='ludidialogrep'
||ob.type=='button'||ob.type=='buttonarea'||ob.type=='material-button'
||ob.type=='panelslide'||ob.type=='panelcenter'
){
var r=0;
if(ctrx>parseInt(ob.getX())){
r=r + 1 ;
}
if(ctry>parseInt(ob.getY())){
r=r + 1 ;
}
if(ctrx<parseInt(ob.getX()+ob.getW())){
r=r + 1 ;
}
if(ctry<parseInt(ob.getY()+ob.getH())){
r=r + 1 ;
}
if(r==4){
return true;
}
}
}
return false;
}
function onObjectClickCancel(ctrx,ctry){
for(var i=0; i < CObjets_count; i++){
var ob=CObjets[i];
if(ob.type=='videohtml'||ob.type=='audiohtml'||ob.type=='videodistante'){
var r=0;
if(ctrx>parseInt(ob.getX())){
r=r + 1 ;
}
if(ctry>parseInt(ob.getY())){
r=r + 1 ;
}
if(ctrx<parseInt(ob.getX()+ob.getW())){
r=r + 1 ;
}
if(ctry<parseInt(ob.getY()+ob.getH())){
r=r + 1 ;
}
if(r==4){
return true;
}
}
}
return false;
}
function moveHero(idact){
if(idaction==idact){
var Vobj=trouveHero();
if(Vobj){
try{
if(Vobj.field1==0){
var distx=distancepyta(objectifherox,Vobj.getY(),Vobj.getX(),Vobj.getY());
if(distx>5){
angleHero=getAngle(Vobj.getX(),Vobj.getY(),objectifherox,Vobj.getY());
}else{
angleHero=getAngle(Vobj.getX(),Vobj.getY(),objectifherox,objectifheroy);
}
}else{
angleHero=getAngle(Vobj.getX(),Vobj.getY(),objectifherox,objectifheroy);
}
}
catch(err)
{}
var interval=(new Date).getTime() - nextGameTick;
nextGameTick=(new Date).getTime();
var dist=distancepyta(objectifherox,objectifheroy,Vobj.getX(),Vobj.getY());
var distX=distancepyta(objectifherox,Vobj.getY(),Vobj.getX(),Vobj.getY());
var deplace=parseInt(parseInt(Vobj.border) * zoom)* (interval / 80);
if(dist>5&&dist<25&&Vobj.border>4){
deplace=parseInt(4 * zoom)* (interval / 80);
}
if(distX>5&&distX<25&&Vobj.border>4){
deplace=parseInt(4 * zoom)* (interval / 80);
}
if(dist>5){
var evolx=parseFloat(Vobj.getX()) +  ((deplace) * Math.cos(angleHero));
var evoly=parseFloat(Vobj.getY());
var oneColl=false;
if(haveCollideObjects(evolx,evoly,0)==true){
evolx=parseFloat(Vobj.getX());
evoly=parseFloat(Vobj.getY()) + ((deplace) * Math.sin(angleHero));
}else{
evoly=parseFloat(Vobj.getY()) + ((deplace) * Math.sin(angleHero));
}
if(haveCollideObjects(evolx,evoly,0)==false){
Vobj.setX(evolx);
Vobj.setY(evoly);
}else{
objectifherox=Vobj.getX();
objectifheroy=Vobj.getY();
}
zoomGame(Vobj);
displayCollideObjects(evolx,evoly);
setTimeout('moveHero("' + idact + '")', 80);
var angleDegrees=angleHero * (180 /Math.PI) ;
var imgsrc=($('.hero' + Vobj.id ).attr("src"));
if(Vobj.field1==0){
if(objectifherox>Vobj.getX()){
if(imgsrc.indexOf(Vobj.data)==-1){
$(".hero" + Vobj.id).attr('src',Vobj.data);
}
}
if(objectifherox<=Vobj.getX()){
if(imgsrc.indexOf(Vobj.src)==-1){
$(".hero" + Vobj.id).attr('src',Vobj.src);
}
}
if(Vobj.option==0){
if(angleDegrees>65&&angleDegrees<115){
if(imgsrc.indexOf(Vobj.contenu2)==-1){
$(".hero" + Vobj.id).attr('src',Vobj.contenu3);
}
}
if(angleDegrees<-45&&angleDegrees>-135){
if(imgsrc.indexOf(Vobj.contenu3)==-1){
$(".hero" + Vobj.id).attr('src',Vobj.contenu2);
}
}
}
}else{
if(angleDegrees<65&&angleDegrees>35){
if(imgsrc.indexOf(Vobj.data)==-1){
$(".hero" + Vobj.id).attr('src',Vobj.data);
}
}
if(angleDegrees<-25&&angleDegrees>-65){
if(imgsrc.indexOf(Vobj.contenu2)==-1){
$(".hero" + Vobj.id).attr('src',Vobj.contenu2);
}
}
if(angleDegrees<-125&&angleDegrees>-155){
if(imgsrc.indexOf(Vobj.src)==-1){
$(".hero" + Vobj.id).attr('src',Vobj.src);
}
}
if(angleDegrees>105&&angleDegrees<165){
if(imgsrc.indexOf(Vobj.contenu3)==-1){
$(".hero" + Vobj.id).attr('src',Vobj.contenu3);
}
}
}
}else{
$(".hero" + Vobj.id).attr('src',Vobj.text);
}
}
}
}
function stopHero(){
idaction ="";
var Vobj=trouveHero();
if(Vobj){
$(".hero" + Vobj.id).attr('src',Vobj.text);
}
}
function trouveHero(){
for(var i=0; i < CObjets_count; i++){
if(CObjets[i].type=='gamehero'){
return CObjets[i];
}
}
}
function getAngle(p1x,p1y,p2x,p2y){
var delta_x=p2x - p1x;
var delta_y=p2y - p1y;
var theta_radians= Math.atan2(delta_y, delta_x);
return theta_radians;
}
function distancepyta(x1, y1, x2, y2){
var q1=(x1 - x2) * (x1 - x2);
var q2=(y1 - y2) * (y1 - y2);
return Math.sqrt(q1 + q2);
}
function haveKeyDULR(keycode){
if(haveHero==false){
haveKeySprite(keycode);
return false;
}
var Vobj=trouveHero();
var dist=distancepyta(objectifherox,objectifheroy,Vobj.getX(),Vobj.getY());
if(dist<5){
var randomnumber=Math.floor(Math.random()*10000);
var randomnumber2=Math.floor(Math.random()*10000);
var randomnumber3=Math.floor(Math.random()*10000);
var distp=50;
idaction='idaction' + randomnumber + randomnumber2 + randomnumber3;
switch (keycode){
case 38: //Haut
objectifheroy=objectifheroy - distp;
if($(".hero" + Vobj.id).attr('src')!=Vobj.contenu2){
$(".hero" + Vobj.id).attr('src',Vobj.contenu2);
}
nextGameTick=(new Date).getTime();
moveHero(idaction);
break;
case 40: //Bas
objectifheroy=objectifheroy + distp;
if($(".hero" + Vobj.id).attr('src')!=Vobj.contenu3){
$(".hero" + Vobj.id).attr('src',Vobj.contenu3);
}
nextGameTick=(new Date).getTime();
moveHero(idaction);
break;
case 39: //Droite
objectifherox=objectifherox + distp;
if($(".hero" + Vobj.id).attr('src')!=Vobj.data){
$(".hero" + Vobj.id).attr('src',Vobj.data);
}
nextGameTick=(new Date).getTime();
moveHero(idaction);
break;
case 37: //gauche
objectifherox=objectifherox - distp;
if($(".hero" + Vobj.id).attr('src')!=Vobj.src){
$(".hero" + Vobj.id).attr('src',Vobj.src);
}
nextGameTick=(new Date).getTime();
moveHero(idaction);
break;
}
}
haveKeySprite(keycode);
}
var haveHeroMask=false;
var objectHeroMask=false;
function installherotarget(obj){
var Ecran=document.getElementById("main");
if(obj.type=='gameherotarget'){
if(haveHeroMask){
if(objectHeroMask.idscript==obj.idscript){
obj.text=objectHeroMask.text;
obj.contenu3=objectHeroMask.contenu3;//h
obj.contenu2=objectHeroMask.contenu2;//b
obj.contenu5=objectHeroMask.contenu5;//g
obj.contenu4=objectHeroMask.contenu4;//d
}
}
var rn=Math.floor(Math.random()*10000);
var rn2=Math.floor(Math.random()*10000);
var rn3=Math.floor(Math.random()*10000);
obj.idstr=rn + rn2 + rn3;
obj.objx=obj.getX();
obj.objy=obj.getY();
obj.border=0;
h='<img style="position:absolute;z-index:2;" ';
h +=' id="bloc' + obj.idstr + '" class="herotarget' + obj.idstr + '" ';
var tobjx=obj.getX();
var tobjy=obj.getY();
var lengthPts=1;
if(obj.de==0){
var parsedPoints=[];
parsedPoints=obj.data.split("!");
if(mobiSite){
parsedPoints=obj.contentpathsecond.split("!");
}
if(parsedPoints[parseInt(obj.border)]!=''){
var parsedPt=[];
parsedPt=parsedPoints[parseInt(obj.border)].split(";");
tobjx=parseInt(parsedPt[0]);
tobjy=parseInt(parsedPt[1]);
}
if(Sit(obj.data)==""){
lengthPts=0;
}
if(lengthPts==1){
var angleHero=getAngle(obj.getX(),obj.getY(),tobjx,tobjy);
var angleDegrees=angleHero *  (180 /Math.PI) ;
if(angleDegrees>-45&&angleDegrees<45){
h += ' src="' + obj.contenu4 + '" ';
}else{
h += ' src="' + obj.text + '" ';
}
}else{
h += ' src="' + obj.text + '" ';
}
}else{
h=h + ' src="' + obj.text + '" ';
}
h=h + ' />';
Ecran.innerHTML=Ecran.innerHTML + h;
if(lengthPts==1){
if(obj.de>0){
setTimeout('animGametargetID("' + obj.id + '","' + obj.idstr + '")',obj.de);
}else{
setTimeout('animGametargetID("' + obj.id + '","' + obj.idstr + '")', 500);
}
}
}
if(obj.type=='gameheroselect'){
h='<img style="position:absolute;z-index:2;" ';
h += ' name="' + obj.id + '" id="bloc' + obj.id + '" class="gameheroselect bloc' + obj.id + '" ';
h += ' src="' + obj.text + '" ';
h += ' />';
Ecran.innerHTML=Ecran.innerHTML + h;
if(document.getElementById('bloc' + obj.id)){
$(document).on( "click", '#bloc' + obj.id , function(){
var ids=parseInt($(this).attr('name'));
selectPlayerProcess(ids);
});
}
}
}
function selectPlayerProcess(id){
var Splayobj=CObjets[id];
if(haveHeroMask==false){
haveHeroMask=true;
objectHeroMask=new CObjet();
objectHeroMask.text=Splayobj.text;
objectHeroMask.contenu3=Splayobj.contenu3; //HAUT
objectHeroMask.contenu2=Splayobj.contenu2; //BAS
objectHeroMask.contenu5=Splayobj.contenu5; //GAUCHE
objectHeroMask.contenu4=Splayobj.contenu4; //DROITE
objectHeroMask.idscript=Splayobj.idscript;
LUDI.nextPage();
}
}
function zoomGametarget(obj){
if(obj.type=='gameherotarget'){
var ex=parseInt(obj.getX() * zoom);
var ey=parseInt(obj.getY() * zoom);
var ew=parseInt(obj.getW() * zoom);
var eh=parseInt(obj.getH() * zoom);
var hero_ex=ex - (ew/2);
var hero_ey=ey - (eh/2);
$(".herotarget" + obj.idstr).css("left",hero_ex + 'px').css("top",hero_ey + 'px');
$(".herotarget" + obj.idstr).css("width",ew + 'px').css("height",eh + 'px');
}
}
function haveCollideObjectsTarget(hx,hy,idstr){
for(var i=0; i < CObjets_count; i++){
var CtrObj=CObjets[i];
var ex=parseInt(CtrObj.getX());
var ey=parseInt(CtrObj.getY());
var ew=parseInt(CtrObj.getW());
var eh=parseInt(CtrObj.getH());
var CtrType=CtrObj.type;
if(CtrType=='gamezoneaction'){
var act='';
if(CtrObj.url!=''){
if(CtrObj.url.indexOf("link:")!=-1){
var ur=CtrObj.url.replace('link:','');
act='window.location.href=\'' + ur + '\'; ';
}else{
act='loaddata(\'' + CtrObj.url + '\',\'' + CtrObj.data + '\');';
}
}
if(CtrObj.strscript!=''){
act=act + CtrObj.strscript;
}
if(act!=''){
if(hx>ex&&hx<parseInt(ex+ew)){
if(hy>ey&&hy<parseInt(ey+eh)){
if(CtrObj.option==0){
CtrObj.option=1;
setTimeout(act,1000);
$('.herotarget' + idstr).fadeOut();
}
}
}
}
}
}
return false;
}
function animGametarget(obj,idstr){
if(!document.getElementById('bloc' + idstr)){
return false;
}
if(obj.type=='gameherotarget'){
var parsedPoints=[];
parsedPoints=obj.data.split("!");
if(mobiSite){
parsedPoints=obj.contentpathsecond.split("!");
}
var nbpts=parseInt(parsedPoints.length);
if(obj.border==''){obj.border='0';}
if(parseInt(obj.border)<nbpts){
if(parsedPoints[parseInt(obj.border)]!=''){
if(document.getElementById("bloc" + obj.idstr)){
var parsedPt=[];
parsedPt=parsedPoints[parseInt(obj.border)].split(";");
var wb=parseInt(obj.getW()/2);
var hb=parseInt(obj.getH()/2);
var xm=parseInt(parsedPt[0]);
var ym=parseInt(parsedPt[1]);
if(xm>(largEcranWidth-3)){
xm=largEcranWidth + parseInt(obj.getW()/1.5);
}
if(xm<3){
xm=parseInt(obj.getW()/1.5) * -1;
}
var xanim=parseInt(xm);
var yanim=parseInt(ym);
obj.objx=xanim;
obj.objy=yanim;
animMoveGametarget(obj,idstr);
setTimeout('animGametargetID("' + obj.id + '","' + idstr + '")', 80);
}
}
}
}
}
function animGametargetID(i,idstr){
animGametarget(CObjets[i],idstr);
}
function animMoveGametarget(obj,idstr){
var angleHero=0;
try{
angleHero=getAngle(obj.getX(),obj.getY(),obj.objx,obj.objy);
}catch(err){}
var dist=distancepyta(obj.objx,obj.objy,obj.getX(),obj.getY());
var deplace=parseInt(8 * zoom);
var distCtr=parseInt(parseInt(obj.align) + 2);
if(distCtr<5){distCtr=5;}
if(dist>distCtr){
var deplace=parseInt(parseInt(obj.align) * zoom);
var evolx=parseFloat(obj.getX()) + ((deplace) * Math.cos(angleHero));
var evoly=parseFloat(obj.getY()) + ((deplace) * Math.sin(angleHero));
if(haveCollideObjectsTarget(evolx,evoly,obj.idstr)){
var imgsrc=$('.herotarget' + obj.idstr).attr("src");
if(imgsrc.indexOf(obj.text)==-1){
$(".herotarget" + obj.idstr).attr('src',obj.text);
}
return false;
}
obj.setX(evolx);
obj.setY(evoly);
zoomGametarget(obj);
var angleDegrees=angleHero *  (180 /Math.PI) ;
var imgsrc=$('.herotarget' + obj.idstr ).attr("src");
var newimg='';
if(obj.objx>obj.getX()){
newimg=obj.contenu4;
}
if(obj.objx<=obj.getX()){
newimg=obj.contenu5;
}
if(obj.option==0){
if(angleDegrees>65&&angleDegrees<115){
newimg=obj.contenu3;
}
if(angleDegrees<-45&&angleDegrees>-135){
newimg=obj.contenu2;
}
}
if(obj.field1==1){
if(angleDegrees<0&&angleDegrees>-90){
newimg=obj.contenu2;
}
if(angleDegrees>-180&&angleDegrees<-270){
newimg=obj.contenu4;
}
if(angleDegrees>0&&angleDegrees<90){
newimg=obj.contenu4;
}
if(angleDegrees<-90&&angleDegrees>-180){
newimg=obj.contenu5;
}
if(angleDegrees>-270&&angleDegrees<-180){
newimg=obj.contenu3;
}
if(angleDegrees>90&&angleDegrees<180){
newimg=obj.contenu3;
}
}
if(imgsrc.indexOf(newimg)==-1){
$(".herotarget" + obj.idstr).attr('src',newimg);
}
}else{
var parsedPoints=[];
parsedPoints=obj.data.split("!");
if(mobiSite){
parsedPoints=obj.contentpathsecond.split("!");
}
var nbpts=parseInt(parsedPoints.length);
if(obj.border==''){obj.border=0;}
obj.border=parseInt(obj.border);
if(parsedPoints.length>1){
if(parseInt(obj.border + 2)>parseInt(nbpts)||parseInt(obj.border + 2)==parseInt(nbpts)){
var imgsrc=($('.herotarget' + obj.idstr).attr("src"));
if(imgsrc.indexOf(obj.text)==-1){
$(".herotarget" + obj.idstr).attr('src',obj.text);
}
}
}
obj.border=parseInt(parseInt(obj.border) +1);
}
}
function installfluxitems(obj){
if(obj.type=='fluxitems'){
var nind=parseInt(obj.ind);
var h='';
var color="black";
if(obj.color){color=obj.color;}
var Ecran=document.getElementById("main");
var rn=Math.floor(Math.random() * 100);
obj.idstr=rn + '-' + obj.idscript ;
h='<img style="display:none;position:absolute;';
if(obj.contenu5!=''){
h += 'cursor:pointer;';
}
h += 'left:0px;top:0px;width:50px;height:50px;z-index:' + nind + ';" ';
if(obj.contenu5!=''&&obj.contenu4==''){
h += ' onClick="' + obj.contenu5 + 'CObjets[' + obj.id + '].negnote=1;" ';
}
h += ' id="targetflux' + obj.idstr + '" class="targetflux' + obj.idstr + '" ';
h += ' src="images/' + obj.data +  '" ';
h += ' unselectable="on" class="unselectable" />';
if(obj.contenu4!=''){
var cur='';
if(obj.contenu5!=''){
cur='cursor:pointer;';
}
h += '<table style="display:none;position:absolute;z-index:' + nind + ';color:' + color  + ';' + cur + '" ' ;
h += ' class="targetflux' + obj.idstr + '" ';
h += ' >';
h += '<tr><td id="targetfluxinner' + obj.id + '" ';
if(obj.contenu5!=''){
h += ' onMouseDown="' + obj.contenu5 + 'CObjets[' + obj.id + '].negnote=1;" ';
}
h += ' style="text-align:center;background-image:url(\'fx/transparent.png\');' + cur + ' color:' + color + ';" ';
h += ' unselectable="on" class="unselectable" >';
h += '</td></tr></table>';
}
Ecran.innerHTML=Ecran.innerHTML + h;
if(obj.border==''){obj.border=0;}
var parsedPoints=[];
parsedPoints=obj.contenu2.split("!");
if(mobiSite){
parsedPoints=obj.contentpathsecond.split("!");
}
var parsedPt=[];
parsedPt=parsedPoints[parseInt(obj.border)].split(";");
var xanim=parseInt(parsedPt[0]);
var yanim=parseInt(parsedPt[1]);
obj.objx=xanim;
obj.objy=yanim;
if(obj.an!=1){
setTimeout('firstanimfluxitemstID("' + obj.id + '")', parseInt(parseInt(obj.de) + 500));
}else{
setTimeout('firstanimfluxitemstID("' + obj.id + '")', 500);
}
appltextfluxitem(obj.id );
zoomfluxitems(obj.id );
}
if(obj.type=='circletarget'){
var nind=parseInt(obj.ind);
var rn=Math.floor(Math.random() * 100);
obj.idstr=rn + 'circletarget';
var h="";
if(parseInt(obj.option4)==1){
h += '<div style="position:absolute;z-index:' + nind + ';border:dotted 2px gray;border-radius:50%;" ';
h += ' id="bloctarget' + obj.id + '" class="unselectable bloctarget' + obj.id + '" >';
h += '</div>';
}
h += '<img style="position:absolute;';
h += 'left:-100px;top:-150px;width:50px;height:50px;z-index:' + nind + ';" ';
h += ' id="circletarget' + obj.idstr + '" class="unselectable circletarget' + obj.idstr + '" ';
h += ' src="images/' + obj.data +  '" ';
h += ' unselectable="on" />';
$('#main').append(h);
obj.border=parseFlo(obj.contenu4);
setTimeout('firstaAnimCircleTargetID("' + obj.id + '")', 200);
}
}
function zoomfluxitems(i){
var obj=CObjets[parseInt(i)];
if(obj.type=='fluxitems'){
var ex=parseInt(obj.getX() * zoom);
var ey=parseInt(obj.getY() * zoom);
var wb=parseInt(obj.getW() * zoom);
var hb=parseInt(obj.getH() * zoom);
var lt_ex=ex - (wb/2);
var lt_ey=ey - (hb/2);
var tobjtarget=$(".targetflux" + obj.idstr);
tobjtarget.css("width",wb + 'px').css("height",hb + 'px');
tobjtarget.css("left",lt_ex + 'px').css("top",lt_ey + 'px');
var valfontsize=parseInt(obj.fontsize * zoom);
$("#targetfluxinner" + obj.id).css("font-size",valfontsize + 'px');
}
if(obj.type=='circletarget'){
var ex=parseInt((obj.getX() - obj.getW()) * zoom);
var ey=parseInt((obj.getY()- obj.getH()) * zoom);
var wb=parseInt(obj.getW() * zoom) * 2;
var hb=parseInt(obj.getH() * zoom)* 2;
var tobjtarget=$(".bloctarget" + obj.id);
tobjtarget.css("width",wb + 'px').css("height",hb + 'px');
tobjtarget.css("left",ex + 'px').css("top",ey + 'px');
}
}
function zoomfluxitemsY(i){
var obj=CObjets[parseInt(i)];
var ey=parseInt(obj.getY()* zoom);
var hb=parseInt(obj.getH() * zoom);
var lt_ey=ey - (hb/2);
$(".targetflux" + obj.idstr).css("top",lt_ey + 'px');
}
function firstanimfluxitemstID(i){
var obj=CObjets[parseInt(i)];
var objTarget=$('.targetflux' + obj.idstr);
objTarget.css("display", "");
animfluxitems(i);
}
function animfluxitemstID(i){
var obj=CObjets[parseInt(i)];
animfluxitems(i);
}
function animfluxitems(i){
var obj=CObjets[parseInt(i)];
if(typeof(obj)=='undefined'){return false;}
if(!document.getElementById('targetflux' + obj.idstr)){
return false;
}
if(obj.type=='fluxitems'){
var objTarget=$('.targetflux' + obj.idstr);
var times=50;
if(parseInt(obj.negnote)==1){
objTarget.css("margin-top", "-1350px");
}
var fluxitemstag23=0;
var angleItems=0;
try{
angleItems=getAngle(obj.getX(),obj.getY(),obj.objx,obj.objy);
}catch(err){}
var dist=distancepyta(obj.objx,obj.objy,obj.getX(),obj.getY());
var deplace=parseInt(10);
if(dist>10){
if(document.getElementById('targetflux' + obj.idstr)){
deplace =parseInt(obj.align);
var evolx=parseFloat(obj.getX()) + ((deplace) * Math.cos(angleItems));
var evoly=parseFloat(obj.getY()) + ((deplace) * Math.sin(angleItems));
obj.setX(evolx);
obj.setY(evoly);
CObjets[obj.id].setX(parseFloat(evolx));
CObjets[obj.id].setY(parseFloat(evoly));
zoomfluxitems(i);
}
}else{
var evolx=parseFloat(obj.objx);
var evoly=parseFloat(obj.objy);
obj.setX(evolx);
obj.setX(evoly);
CObjets[obj.id].setX(parseFloat(evolx));
CObjets[obj.id].setY(parseFloat(evoly));
zoomfluxitems(i);
collideImageChange(obj.id,obj.getX(),obj.getY());
times=10;
var parsedPoints=[];
parsedPoints=obj.contenu2.split("!");
if(mobiSite){
parsedPoints=obj.contentpathsecond.split("!");
}
var nbpts=parseInt(parsedPoints.length);
obj.border=parseInt(parseInt(obj.border) + 1);
if(parseInt(obj.border)>parseInt(nbpts)||parseInt(obj.border)==parseInt(nbpts)){
if(parseInt(obj.option3)==0){
restartAllAnimFlux(i);
if(parseInt(obj.negnote)==0){
if(obj.strscript!=''){eval(obj.strscript);}
}else{
obj.negnote=0;
objTarget.css("margin-top", "0px");
}
}else{
objTarget.css("margin-top", "0px");
obj.contenu2 ="";
}
}else{
var parsedPt=[];
parsedPt=parsedPoints[parseInt(obj.border)].split(";");
var xanim=parseInt(parsedPt[0]);
var yanim=parseInt(parsedPt[1]);
obj.objx=xanim;
obj.objy=yanim;
}
}
if(obj.contenu2!=""){
if(document.getElementById('targetflux' + obj.idstr)){
setTimeout('animfluxitemstID("' + obj.id + '");', times); //80
}
}
}
}
function restartAllAnimFlux(i){
var obj=CObjets[parseInt(i)];
var parsedPoints=[];
parsedPoints=obj.contenu2.split("!");
if(mobiSite){
parsedPoints=obj.contentpathsecond.split("!");
}
obj.border=0;
var parsedStart=[];
parsedStart=obj.contenu3.split(";");
if(mobiSite){
parsedStart=obj.contenu6.split(";");
}
var xStart=parseInt(parsedStart[0]);
var yStart=parseInt(parsedStart[1]);
obj.setX(parseInt(xStart));
obj.setY(parseInt(yStart));
CObjets[obj.id].setX(parseInt(xStart));
CObjets[obj.id].setY(parseInt(yStart));
zoomfluxitems(i);
var parsedPt=[];
parsedPt=parsedPoints[0].split(";");
var xanimobj=parseInt(parsedPt[0]);
var yanimobj=parseInt(parsedPt[1]);
obj.objx=xanimobj;
obj.objy=yanimobj;
zoomfluxitems(i);
appltextfluxitem(i);
}
function appltextfluxitem(i){
var obj=CObjets[parseInt(i)];
obj.contenu4=cleText(obj.contenu4);
if(obj.contenu4!=''){
if(obj.contenu4.indexOf(';')==-1){
var nh=obj.contenu4;
$("#targetfluxinner" + obj.id).html(nh);
}else{
var parsedText=[];
parsedText=obj.contenu4.split(";");
var r=Math.floor(Math.random() * parsedText.length);
var nh=parsedText[r];
$("#targetfluxinner" + obj.id).html(nh);
}
}
var ra=parseInt(Math.floor(Math.random() * 10));
if(ra<5){
$("#targetflux" + obj.idstr).attr('src','images/' + obj.text);
}else{
$("#targetflux" + obj.idstr).attr('src','images/' + obj.data);
}
}
function collideImageChange(j,hx,hy){
var objC=CObjets[parseInt(j)];
for(var i=0; i < CObjets_count; i++){
var obj=CObjets[i];
if(obj.type=='gamechangeimages'){
var ex=parseInt(obj.getX());
var ey=parseInt(obj.getY());
var ew=parseInt(obj.getW());
var eh=parseInt(obj.getH());
if(hx>ex&&hx<parseInt(ex+ew)){
if(hy>ey&&hy<parseInt(ey+eh)){
if(objC.type=='fluxitems'){
$("#targetflux" + objC.idstr).attr('src', obj.src);
if(obj.contenu7!=''){
if(isFunctionW(obj.contenu7)){
window[obj.contenu7]();
}
}
}
}
}
}
}
}
function isFunctionW(func){
var func1=window[func];
if(typeof func1 === 'undefined'){
return false
}else{
return true;
}
}
function firstaAnimCircleTargetID(i){
var obj=CObjets[parseInt(i)];
var objTarget=$('.circletarget' + obj.idstr);
objTarget.css("display", "");
animCircleTarget(i);
}
function animCircleTarget(i){
var obj=CObjets[parseInt(i)];
var tim=50;
if(typeof(obj)=='undefined'){return false;}
if(!document.getElementById('circletarget' + obj.idstr)){
return false;
}
var rayonW=obj.getW();
var rayonH=obj.getH();
var evolx=parseFloat(obj.getX()) + ((rayonW) * Math.cos(obj.border));
var evoly=parseFloat(obj.getY()) + ((rayonH) * Math.sin(obj.border));
var wb=parseInt(parseInt(obj.contenu2) * zoom);
var hb=parseInt(parseInt(obj.contenu3) * zoom);
var b=collideImageChangeCT(i,evolx,evoly);
if(obj.option==1||obj.option=='1'){
if(b){
tim=1000;
}
}
var ex=parseInt(evolx * zoom) - (wb/2);
var ey=parseInt(evoly * zoom) - (hb/2);
var tobjtarget=$("#circletarget" + obj.idstr);
tobjtarget.css("width",wb + 'px').css("height",hb + 'px');
tobjtarget.css("left",ex + 'px').css("top",ey + 'px');
if(parseInt(obj.option3)==1){
var degRot=parseInt(obj.border * (180/Math.PI)) + 90;
tobjtarget.css({ transform: 'rotate(' + degRot + 'deg)'});
tobjtarget.css({ WebkitTransform: 'rotate(' + degRot + 'deg)'});
}
zoomfluxitems(i);
var speed=parseInt(obj.text)/100;
if(obj.option2==1||obj.option2=='1'){
obj.border=obj.border + speed;
}else{
obj.border=obj.border - speed;
}
if(document.getElementById('circletarget' + obj.idstr)){
setTimeout('animCircleTarget("' + obj.id + '");', tim); //80
}
}
function collideImageChangeCT(j,hx,hy){
var objC=CObjets[parseInt(j)];
for(var i=0; i < CObjets_count; i++){
var obj=CObjets[i];
if(obj.type=='gamechangeimages'){
var ex=parseInt(obj.getX());
var ey=parseInt(obj.getY());
var ew=parseInt(obj.getW());
var eh=parseInt(obj.getH());
if(hx>ex&&hx<parseInt(ex+ew)){
if(hy>ey&&hy<parseInt(ey+eh)){
if(objC.type=='circletarget'){
var ob=$("#circletarget" + objC.idstr);
var oldSrc=ob.attr('src');
if(oldSrc.indexOf(obj.src)==-1){
ob.attr('src', obj.src);
return true;
}
}
}
}
}
}
return false;
}
var EquipMapTarg=-1;
var EquipMapMAX=0;
var InitialMapTarget=[0, 0, 0, 0];
var ObjectifMapTarget=[0, 0, 0, 0];
var RunMapDice=false;
var RunActionDice=false;
function installMapTarget(obj){
if(obj.type=='maptarget'){
if(EquipMapTarg==-1){
EquipMapTarg=0;
}
if(obj.contenu6>EquipMapMAX){
EquipMapMAX=obj.contenu6;
}
var nind=parseInt(obj.ind);
var h='';
var Ecran=document.getElementById("main");
var rn=Math.floor(Math.random() * 10000);
obj.idstr=rn + '-' + obj.idscript ;
var ex=parseInt(obj.getX() * zoom);
var ey=parseInt(obj.getY() * zoom);
var wb=parseInt(obj.getW() * zoom);
var hb=parseInt(obj.getH() * zoom);
h += '<img style="position:absolute;';
h += 'left:' + ex + 'px;top:' + ey + 'px;width:' + wb + 'px;height:' + hb + 'px;z-index:' + nind + ';" ';
h += ' id="' + obj.contenu6 + 'targetMap' + obj.idstr + '" class="' + obj.contenu6 + 'targetMap' + obj.idstr + '" ';
if(obj.text.indexOf('/')==-1){
h += ' src="images/' + obj.text +  '" ';
}else{
h += ' src="' + obj.text +  '" ';
}
h=h + ' unselectable="on" class="unselectable" />';
Ecran.innerHTML=Ecran.innerHTML + h;
var parsedPoints=[];
parsedPoints=obj.contenu2.split("!");
if(mobiSite){
parsedPoints=obj.contentpathsecond.split("!");
}
var initmt=parseInt(InitialMapTarget[parseInt(obj.contenu6)]);
if(typeof(initmt) === "undefined" ||  isNaN(initmt)){
InitialMapTarget=[0, 0, 0, 0];
ObjectifMapTarget=[0, 0, 0, 0];
initmt=parseInt(InitialMapTarget[parseInt(obj.contenu6)]);
}
var pars=parsedPoints[initmt];
var parsedPt=[];
parsedPt=pars.split(";");
var xanim=parseInt(parsedPt[0]);
var yanim=parseInt(parsedPt[1]);
if(parseInt(obj.contenu6)==1){
xanim=xanim - 5;
yanim=yanim - 5;
}
obj.setX(xanim);
obj.setY(yanim);
obj.objx=xanim;
obj.objy=yanim;
if(parseInt(EquipMapTarg)==parseInt(obj.contenu6)){
setTimeout('firstanimMapTargetID("' + obj.id + '")', 500);
}else{
setTimeout('displayMapTargetID("' + obj.id + '")', 300);
}
zoomMapTarget(obj.id );
}
if(obj.type=='mapdes'){
var Ecran=document.getElementById("main");
var h='';
h=h + '<img ';
h=h + ' id="bloc' + obj.id + '" class="unselectable bloc' + obj.id + ' ' +  obj.idscript + '" ';
h=h + ' src="' + obj.text + '" style="cursor:pointer;" ';
h=h + ' onClick="loadDices(' + obj.id + ');" ';
h=h + ' style="position:absolute;" ';
h=h + ' />';
Ecran.innerHTML=Ecran.innerHTML + h;
RunMapDice=false;
}
}
function loadDices(i){
if(RunMapDice==false){
var obj=CObjets[parseInt(i)];
$('#bloc' + i ).attr('src',obj.contenu2);
RunMapDice=true;
$( "#bloc" + i ).animate({
marginTop: "-250px"
}, 500, function(){
$( "#bloc" + i ).animate({
marginTop: "0px"
}, 500, function(){
var num =Math.floor((Math.random()*9)+1);
if(num==0){num=1;}
if(num>6){num=3;}
ObjectifMapTarget[EquipMapTarg]=ObjectifMapTarget[EquipMapTarg] + num;
$('#bloc' + i ).attr('src','images/dice-' + num + '.png');
var valDice=parseInt(num);
if(obj.contenu3!=''){
var reInitDices=false;
eval(obj.contenu3);
if(reInitDices){
RunMapDice=false;
}
}else{
setTimeout(function(){
RunActionDice=true;
},1500);
}
});
});
}
}
function zoomMapTarget(i){
var obj=CObjets[parseInt(i)];
if(obj.type=='maptarget'){
var ex=parseInt(obj.getX() * zoom);
var ey=parseInt(obj.getY() * zoom);
var wb=parseInt(obj.getW() * zoom);
var hb=parseInt(obj.getH() * zoom);
var lt_ex=ex - (wb/2);
var lt_ey=ey - (hb);
var tobjtarget=$("." + obj.contenu6 + "targetMap" + obj.idstr);
tobjtarget.css("width",wb + 'px').css("height",hb + 'px');
tobjtarget.css("left",lt_ex + 'px').css("top",lt_ey + 'px');
}
}
function firstanimMapTargetID(i){
var obj=CObjets[parseInt(i)];
var objTarget=$("." + obj.contenu6 + "targetMap" + obj.idstr);
objTarget.css("display", "");
var ctr1=parseInt(ObjectifMapTarget[obj.contenu6]);
var ctr2=parseInt(InitialMapTarget[obj.contenu6]);
if(ctr1<ctr2){
reculeMapTargetID(i);
setTimeout('animMapTarget("' + obj.id + '")', 1500);
}else{
animMapTarget(i);
}
}
function displayMapTargetID(i){
var obj=CObjets[parseInt(i)];
var objTarget=$("." + obj.contenu6 + "targetMap" + obj.idstr);
objTarget.css("display", "");
reculeMapTargetID(i);
}
function reculeMapTargetID(i){
var obj=CObjets[parseInt(i)];
var ctr1=parseInt(ObjectifMapTarget[obj.contenu6]);
var ctr2=parseInt(InitialMapTarget[obj.contenu6]);
if(ctr1<ctr2){
var objTarget=$("." + obj.contenu6 + "targetMap" + obj.idstr);
var parsedPoints=[];
parsedPoints=obj.contenu2.split("!");
if(mobiSite){
parsedPoints=obj.contentpathsecond.split("!");
}
var itemid=parseInt(obj.contenu6);
var itempts=parseInt(ObjectifMapTarget[itemid]);
var parsedPt=[];
parsedPt=parsedPoints[itempts].split(";");
var xanim=parseInt(parsedPt[0]);
var yanim=parseInt(parsedPt[1]);
obj.setX(xanim);
obj.setY(yanim);
obj.objx=xanim;
obj.objy=yanim;
var ex=parseInt(obj.getX() * zoom);
var ey=parseInt(obj.getY() * zoom);
var wb=parseInt(obj.getW() * zoom);
var hb=parseInt(obj.getH() * zoom);
var lt_ex=ex - (wb/2);
var lt_ey=ey - (hb);
InitialMapTarget[obj.contenu6]=ObjectifMapTarget[obj.contenu6];
objTarget.animate({
left: lt_ex + "px" ,
top:  lt_ey + "px"
}, 1000, function(){
zoomMapTarget(i);
});
}
}
function animMapTargetID(i){
var obj=CObjets[parseInt(i)];
animMapTarget(i);
}
function animMapTarget(i){
var obj=CObjets[parseInt(i)];
var continu=true;
if(typeof(obj)=='undefined'){return false;}
if(!document.getElementById(obj.contenu6 + 'targetMap' + obj.idstr)){
continu=false;
return false;
}
if(obj.type=='maptarget'){
var times=50;
var angleItems=0;
try{
angleItems=getAngle(obj.getX(),obj.getY(),obj.objx,obj.objy);
}catch(err){}
var dist=distancepyta(obj.objx,obj.objy,obj.getX(),obj.getY());
var deplace=parseInt(10);
if(dist>10){//distance
if(document.getElementById(obj.contenu6 + 'targetMap' + obj.idstr)){
var deplace=parseInt(parseInt(obj.align));
var evolx=parseFloat(obj.getX()) + ((deplace) * Math.cos(angleItems));
var evoly=parseFloat(obj.getY()) + ((deplace) * Math.sin(angleItems));
obj.setX(evolx);
obj.setY(evoly);
CObjets[obj.id].setX(parseInt(evolx));
CObjets[obj.id].setY(parseInt(evoly));
zoomMapTarget(i);
}
}else{//distance
var evolx=parseFloat(obj.objx);
var evoly=parseFloat(obj.objy);
obj.setX(evolx);
obj.setY(evoly);
CObjets[obj.id].setX(parseInt(evolx));
CObjets[obj.id].setY(parseInt(evoly));
zoomMapTarget(i);
collideImageChangeMaptarget(obj.id,obj.getX(),obj.getY());
times=1;
var parsedPoints=[];
parsedPoints=obj.contenu2.split("!");
if(mobiSite){
parsedPoints=obj.contentpathsecond.split("!");
}
var nbpts=parseInt(parsedPoints.length);
if(parseInt(InitialMapTarget[EquipMapTarg])>parseInt(nbpts)
||parseInt(InitialMapTarget[EquipMapTarg])==parseInt(parseInt(nbpts)-1)){
var parsedActions=[];
parsedActions=obj.contenu4.split("!");
RunActionDice=false;
InitialMapTarget[EquipMapTarg]=parseInt(nbpts-2);
ObjectifMapTarget[EquipMapTarg]=InitialMapTarget[EquipMapTarg];
rSp3(parsedActions[InitialMapTarget[EquipMapTarg]],obj.option3);
continu=false;
}
if(continu){
if(RunActionDice){
if(InitialMapTarget[EquipMapTarg]>0){
if(InitialMapTarget[EquipMapTarg]==ObjectifMapTarget[EquipMapTarg]){
var parsedActions=[];
parsedActions=obj.contenu4.split("!");
RunActionDice=false;
var num=parsedActions[ObjectifMapTarget[EquipMapTarg]];
if(obj.option3==0||obj.option3=='0'){
setTimeout("rSp3(" + num + ",0);",1500);
continu=false;
}else{
setTimeout("rSp3(" + num + ",1);",1500);
continu=true;
}
}
}
}
}
if(InitialMapTarget[EquipMapTarg]<ObjectifMapTarget[EquipMapTarg]){
InitialMapTarget[EquipMapTarg]=InitialMapTarget[EquipMapTarg] + 1;
var parsedPt=[];
var pointCtr=parsedPoints[parseInt(InitialMapTarget[EquipMapTarg])];
if(pointCtr){
parsedPt=pointCtr.split(";");
var xanim=parseInt(parsedPt[0]);
var yanim=parseInt(parsedPt[1]);
if(EquipMapTarg==1){
xanim=xanim - 5;
yanim=yanim - 5;
}
obj.objx=xanim;
obj.objy=yanim;
}
}
}//distance
}
if(obj.contenu2!=""&&continu){
if(document.getElementById(obj.contenu6 + 'targetMap' + obj.idstr)&&continu){
setTimeout('animMapTargetID("' + obj.id + '");', times); //80
}
}
}
function collideImageChangeMaptarget(j,hx,hy){
var objC=CObjets[parseInt(j)];
for(var i=0; i < CObjets_count; i++){
var obj=CObjets[i];
if(obj.type=='gamechangeimages'){
var ex=parseInt(obj.getX());
var ey=parseInt(obj.getY());
var ew=parseInt(obj.getW());
var eh=parseInt(obj.getH());
if(hx>ex&&hx<parseInt(ex+ew)){
if(hy>ey&&hy<parseInt(ey+eh)){
if(objC.type=='maptarget'){
$("#"  +  EquipMapTarg +  "targetMap" + objC.idstr).attr('src', obj.src);
}
}
}
}
}
}
function rSp3(p,o3){
if(o3==1||o3=='1'){
LUDI.GoMini(p);
}else{
LUDI.goPage(p);
}
}
var execTimerOK=0;
function installSimulBloc(obj){
if(obj.type=='simulBloc'){
var Ecran=document.getElementById("main");
var h='';
h += '<img style="display:none;position:absolute;border:solid 1px gray;';
h += 'left:0px;top:0px;width:50px;height:50px;" ';
h += ' id="bloc' + obj.id + '" class="bloc' + obj.id + '" ';
h += ' src="images/' + obj.data +  '" ';
h += ' unselectable="on" class="unselectable" />';
Ecran.innerHTML=Ecran.innerHTML + h;
var ix=obj.getX()+(obj.getW()/2);
var iy=obj.getY()+(obj.getH()/2);
var anglei=0;
try{
anglei=getAngle(ix,iy,parseInt(obj.contenu5),parseInt(obj.contenu6));
obj.evol=anglei;
}catch(err){}
if(obj.option==1){
var fctimer='InsertObjetSimulItem(' + ix + ',' + iy + ',"' + obj.text + '",' + anglei + ',2000,' + lastPage0 + ')';
setTimeout(fctimer, 1000);
}
if(execTimerOK==0){
execTimerOK=1;
setTimeout('execObjetSimulItem(' + lastPage0 + ')', 1000);
}
}
if(obj.type=='simulItem'){
var Ecran=document.getElementById("main");
obj.evol=0;
var h='';
h=h + '<img style="position:absolute;';
h=h + ' left:-300px;top:-300px;width:50px;height:50px;" ';
h=h + ' id="simulItem' + obj.id + '" class="simulItem' + obj.id + '" ';
h=h + ' src="images/' + obj.data +  '" ';
h=h + ' unselectable="on" class="unselectable" />';
Ecran.innerHTML=Ecran.innerHTML + h;
zoomObjetSimulItem();
}
}
function execObjetSimulItem(createPage){
if(lastPage0!=createPage){
return false;
}
for(var i=0; i < CObjets_count; i++){
var obj=CObjets[i];
if(obj.type=='simulItem'){
if(obj.evol==0){
var deplace=4;
var angleItems=parseFlo(obj.text);
var evolx=parseFloat(obj.getX()) + (deplace * Math.cos(angleItems));
var evoly=parseFloat(obj.getY()) + (deplace * Math.sin(angleItems));
if(evolx>980||evoly>740||evolx<-20||evoly<-20){
obj.evol=1;
}
obj.setX(parseInt(evolx));
obj.setY(parseInt(evoly));
CObjets[obj.id].setX(parseInt(evolx));
CObjets[obj.id].setY(parseInt(evoly));
collideImageChangeProcessSimul(i,evolx,evoly)
zoomObjetSimulItem();
}
if(obj.evol==2){
var deplace=4;
var dist=distancepyta(obj.objx,obj.objy,obj.getX(),obj.getY());
if(dist>6){
var angleItems=parseFlo(getAngle(obj.getX(),obj.getY(),obj.objx,obj.objy));
var evolx=parseFloat(obj.getX()) + (deplace * Math.cos(angleItems));
var evoly=parseFloat(obj.getY()) + (deplace * Math.sin(angleItems));
obj.setX(parseInt(evolx));
obj.setY(parseInt(evoly));
CObjets[obj.id].setX(parseInt(evolx));
CObjets[obj.id].setY(parseInt(evoly));
zoomObjetSimulItem();
}else{
obj.evol=0;
}
}
}
}
if(execTimerOK==1){
setTimeout('execObjetSimulItem(' + createPage + ')', 50);
}
}
function findObjectLibreItem(){
for(var i=0; i < CObjets_count; i++){
var obj=CObjets[i];
if(obj.type=='simulItem'){
if(obj.evol==1){
obj.evol=0;
return obj;
}
}
}
return false;
}
function zoomObjetSimulItem(){
for(var i=0; i < CObjets_count; i++){
var obj=CObjets[i];
if(obj.type=='simulItem'){
var ex=parseInt(obj.getX() * zoom);
var ey=parseInt(obj.getY() * zoom);
var wb=parseInt(obj.getW() * zoom);
var hb=parseInt(obj.getH() * zoom);
var lt_ex=ex - (wb/2);
var lt_ey=ey - (hb/2);
var tobjtarget=$(".simulItem" + obj.id);
tobjtarget.css("left",lt_ex + 'px').css("top",lt_ey + 'px');
tobjtarget.css("width",wb + 'px').css("height",hb + 'px');
}
}
}
function InsertObjetSimulItem(x,y,data,angleItems,t,createPage){
if(lastPage0!=createPage){
return false;
}
var simulBlocTemp=findObjectLibreItem();
var simulBlocT=new CObjet();
if(simulBlocTemp!=false){
simulBlocT=simulBlocTemp;
simulBlocT.w=30;
simulBlocT.h=simulBlocT.w;
simulBlocT.x=x;
simulBlocT.y=y;
simulBlocT.data=data;
simulBlocT.evol=0;
simulBlocT.text=angleItems;
var fctimer='InsertObjetSimulItem(' + x + ',' + y + ',"' + data + '",' + angleItems + ',' + t + ',' + createPage + ')';
setTimeout(fctimer, t);
return false;
}
simulBlocT.idscript='SimulItem';
simulBlocT.strscript='simulItem';
simulBlocT.type='simulItem';
simulBlocT.w=30;
simulBlocT.h=simulBlocT.w;
simulBlocT.x=x;
simulBlocT.y=y;
simulBlocT.data=data;
simulBlocT.text=angleItems;
simulBlocT.url='';
simulBlocT.align='';
simulBlocT.initialtext='';
simulBlocT.color='white';
simulBlocT.css='background:transparent;border-bottom:solid 1px red;';
simulBlocT.fontsize=10;
simulBlocT.an=1;
simulBlocT.de=0;
simulBlocT.cssadd='';
simulBlocT.di=0;
simulBlocT.dedi=0;
simulBlocT.ind=1;
simulBlocT.create=0;
simulBlocT.boite='';
simulBlocT.linkcontenu= '';
simulBlocT.linkimage= '';
simulBlocT.linkx= '';
simulBlocT.linky= '';
simulBlocT.field1= '';
simulBlocT.field2= '';
simulBlocT.field3= '';
simulBlocT.field4= '';
simulBlocT.AnimClic=0;
CObjets_Add(simulBlocT);
var fctimer='InsertObjetSimulItem(' + x + ',' + y + ',"' + data + '",' + angleItems + ',' + t + ',' + createPage + ')';
setTimeout(fctimer, t);
}
function collideImageChangeProcessSimul(j,hx,hy){
var objC=CObjets[parseInt(j)];
for(var i=0; i < CObjets_count; i++){
var obj=CObjets[i];
if(obj.type=='simulBloc'){
var ex=parseInt(obj.getX());
var ey=parseInt(obj.getY());
var ew=parseInt(obj.getW());
var eh=parseInt(obj.getH());
if(hx>ex&&hx<parseInt(ex+ew)){
if(hy>ey&&hy<parseInt(ey+eh)){
if(objC.type=='simulItem'){
if(objC.text!=obj.evol){
if(objC.evol==0){
objC.evol=2;
var ix=obj.getX()+(obj.getW()/2);
var iy=obj.getY()+(obj.getH()/2);
objC.objx=ix;
objC.objy=iy;
objC.text=obj.evol;
}
}
}
}
}
}
}
}
function installPlugins(obj){
if(obj.type.indexOf('plugin-')!=-1
||obj.type.indexOf('plugques-')!=-1){
var Ecran=document.getElementById("main");
obj.fields=(obj.field1 + '||||||||').split('|');
var h='';
var fct=obj.type.replace('plugin-','');
fct=fct.replace('plugques-','');
var namePlgFct=fct ;
var fctstrCtr=fct + 'OnPaint';
var fctstr=fct + 'OnPaint(obj)';
fct='h=' + fctstr;
if(typeof window[fctstrCtr] === "function"){
eval(fct);
}else{
h='<div class="bloc' + obj.id + '" style="background:gray;color:white;text-align:center;" >"Could not <br>find or load <br>the ' + namePlgFct + '  plugin</div>'
}
if(h!=''){
if(obj.contenu2=='drag'){
appliqueDragObj(obj);
}
$('#main').append(h);
}
}
}
function zoomPlugins(obj){
if(obj.type.indexOf('plugin-')!=-1
||obj.type.indexOf('plugques-')!=-1){
var h='';
var fct=obj.type.replace('plugin-','');
fct=fct.replace('plugques-','');
fct=fct + 'OnZoom(obj)';
var fctstrCtr=fct.replace('(obj)','');
if(typeof window[fctstrCtr] === "function"){
eval(fct);
}
}
}
function testPlugins(obj){
if(obj.type.indexOf('plugin-')!=-1
||obj.type.indexOf('plugques-')!=-1){
var ret=false;
var fct=obj.type.replace('plugin-','');
fct=fct.replace('plugques-','');
fct='ret=' + fct + 'IsOK(obj)';
eval(fct);
return ret;
}
}
function processViewErrorsPlugins(obj){
if(obj.type.indexOf('plugques-')!=-1){
var ret=false;
var fct=obj.type.replace('plugin-','');
fct=fct.replace('plugques-','');
fct='ret=' + fct + 'ViewErrors(obj)';
eval(fct);
return ret;
}
}
function getObjMemoryStream(obj){
if(obj.type.indexOf('plugques-')!=-1){
var ret='';
var fct=obj.type.replace('plugques-','');
fct='ret=' + fct + 'SendObjMemory(obj)';
eval(fct);
return ret;
}else{
return '';
}
}
function setObjMemoryStream(obj,mem){
if(obj.type.indexOf('plugques-')!=-1){
var ret='';
var fct=obj.type.replace('plugques-','');
fct='ret=' + fct + 'RetrieveObjMemory(obj,\'' + mem + '\')';
eval(fct);
return ret;
}else{
return '';
}
}
function installInputSimple(obj){
execScriptLoop();
var h='<input style="position:absolute;z-index:10;" ';
var texteValue=obj.text;
if(texteValue.indexOf("==")!=-1){
try{
texteValue=texteValue.replace('==','');
texteValue=eval(texteValue);
}catch(err){
texteValue=obj.text;
}
}
h += ' data-rep="' + texteValue + '" ';
h += ' id="input' + obj.id + '" ';
h += ' class="haveflou alterbloc' + obj.id + ' input' + obj.id + ' ' +  obj.idscript + '" ';
h += ' type="text" ';
h += ' onKeyUp="execScriptLoop();eventCatchScript=true;" ';
if(obj.contenu5!=''){
h=h + ' value="' + obj.contenu5 + '" ';
}
h=h + ' />';
addToM(h);
recupDataObjectMem(obj,lastPage0);
}
function installInputNumerique(obj){
if(obj.type=='inputNumerique'){
var h='<div style="position:absolute;border:solid 1px black;cursor:text;background:white;" ';
h += ' id="bloc' + obj.id + '" class="bloc' + obj.id + '" onKeyUp="execScriptLoop();eventCatchScript=true;" ';
h += ' >';
h += '</div>';
addToM(h);
$("#bloc" + obj.id).mathKeyboard({parentId:"main"});
recupDataObjectMem(obj,lastPage0);
}
if(obj.type=='inputNumeriqueSignificatif'){
var Vact=''
if(obj.option2==1){
Vact='controlSigFigs(' + obj.id + ',' + parseInt(obj.contenu4) + ');'
}
var h='<input onkeyup="' + Vact + 'execScriptLoop();eventCatchScript=true;" style="position:absolute;z-index:10;" ';
h +=  ' data-rep="' + obj.text + '" ';
h += ' id="input' + obj.id + '" class="haveflou bloc' + obj.id + ' ' +  obj.idscript + '" ';
h += ' type="text" ';
h += ' />';
addToM(h);
recupDataObjectMem(obj,lastPage0);
}
}
function controlSigFigs(id,chs){
var num=document.getElementById('input' + id).value.toLowerCase();
num=num.replace(',','.');
num=num.replace(/ /g,'');
if(num.indexOf(".")==-1){
num=num + ".";
}
if(getSigFigs(num)==chs){
$('#input' + id).css("color","black");
}else{
$('#input' + id).css("color","red");
}
}
function getSigFigs(num){
if(!isFinite(Number(num))){
return -1;
}
var n=String(num).trim(),
FIND_FRONT_ZEROS_SIGN_DOT_EXP=/^[\D0]+|\.|([e][^e]+)$/g,
FIND_RIGHT_ZEROS=/0+$/g;
if(!/\./.test(num)){
n=n.replace(FIND_RIGHT_ZEROS, "");
}
return n.replace(FIND_FRONT_ZEROS_SIGN_DOT_EXP, "").length;
}
function installInputFocus(obj){
var h='<div style="position:absolute;border:solid 2px black;cursor:text;background:white;" ';
h += ' id="bloc' + obj.id + '" class="bloc' + obj.id + '" ';
h += ' onClick="activeInputFocus(' + obj.id + ');" >';
h += '</div>';
h += '<input onkeypress="onKeyPressFocus(\'' + obj.id + '\')" onkeyUp="onKeyPressFocus(\'' + obj.id + '\')" ';
h += ' style="position:absolute;border:solid 2px #8A0808;z-index:10;display:none;" ';
h += ' data-rep="' + obj.text + '" ';
h += ' id="input' + obj.id + '" class="input' + obj.id + ' ' +  obj.idscript + ' inputfocus" ';
h += ' type="text" ';
h += ' />';
if(obj.field1!=''){
h += '<table style="position:absolute;border:solid 1px gray;z-index:10;background:white;;display:none;" ';
h += ' id="tableauto' + obj.id + '" class="table' + obj.id + '" ';
h += '>';
var eachElement=obj.field1.split(';');
for(var e=0 ; e < eachElement.length; e++){
var reponse=eachElement[e];
if(reponse!=''){
var tmpId=obj.id + 'a' + e + 't' + reponse.length; ;
var reponseLoad=reponse.replace('\'','apostrophe');
reponseLoad=reponseLoad.replace('\'','apostrophe');
reponseLoad=reponseLoad.replace('\'','apostrophe');
h=h + '<tr name="search' +  obj.id + '" id="' + tmpId + '" data-string="' + reponse + '" ><td><a href="#" onclick="onCompleteFocus(\'' + obj.id + '\',\'' + reponseLoad + '\');" >' + reponse + '</a></td></tr>';
}
}
h=h + '</table>';
}
addToM(h);
recupDataObjectMem(obj,lastPage0);
}
function installInputTextAreaBloc(obj,color){
var h='<table style="display:none;color:' + color + ';" ';
h += ' id="table' + obj.id + '" class="textarea haveflou bloc' + obj.id + '" ';
h +=  ' data-rep="' + obj.text + '" ';
h += ' >';
h += '<tr><td>';
h += '<div id="divtextareabloc' + obj.id + '"  style="overflow:hidden;border:0px solid red;margin:1px;" >';
h += '<textarea style="overflow:auto;" ';
h += ' id="textareabloc' + obj.id + '" class="textareabloc textareabloc' + obj.id + '" ';
h +=  ' data-rep="' + obj.text + '" ';
h +=  ' >';
h += '</textarea>';
h += '</div>';
h += '</td></tr></table>';
addToM(h);
recupDataObjectMem(obj,lastPage0);
}
function zoomInputFocus(obj){
var xb=parseInt(parseInt(obj.getX() - 2) * zoom);
var yb=parseInt(parseInt(obj.getY() + 2) * zoom);
var hb=parseInt(obj.getH() * zoom);
var wb=parseInt(parseInt(obj.getW() + 12) * zoom);
$("#tableauto" + obj.id).css("left",parseInt(xb) + 'px').css("top", parseInt(yb + hb + 2) + 'px');
$("#tableauto" + obj.id).css("min-width",parseInt(wb) + 'px');
$("#tableauto" + obj.id).css("font-size",parseInt(obj.fontsize * zoom) + 'px');
}
function activeInputFocus(ido){
$('.inputfocus').css("display","none");
$('.input' + ido).fadeIn();
$('.input' + ido).focus();
}
function onKeyPressFocus(id){
if(document.getElementById('input' + id)){
var f=0;
var valInput=document.getElementById('input' + id).value.toLowerCase();
var arr=new Array();
arr=document.getElementsByTagName('tr');
for(var i=0; i < arr.length; i++){
var att=arr[i].getAttribute("name");
var ctr='search' + id;
if(att==ctr){
var obj=arr[i];
var Vobj=document.getElementById(obj.id);
if(valInput==''){
Vobj.style.display="none";
}else{
var ctr2=Vobj.getAttribute("data-string");
if(ctr2.toLowerCase().indexOf(valInput)!=-1){
Vobj.style.display="";
f=1;
}else{
Vobj.style.display="none";
}
}
}
}
if(f==1){
$('#tableauto' + id).css("display","");
}else{
$('#tableauto' + id).css("display","none");
}
}
}
function onCompleteFocus(id,reponse){
reponse=reponse.replace('apostrophe',"'");
reponse=reponse.replace('apostrophe',"'");
reponse=reponse.replace('apostrophe',"'");
if(document.getElementById('input' + id)){
document.getElementById('input' + id).value=reponse;
}
$('#tableauto' + id).css("display","none");
}
function installCarreQuizz(obj){
if(obj.type=='qcmcube'){
applyDataCarreQuizz(obj);
var bCSS=obj.css
var bord=obj.border;
var txtColor=obj.color;
bCSS += 'color:' + txtColor + ';';
var zbord=(obj.border/ obj.getW()) * 100;
var backcol=obj.field1;
var gW=(obj.getW() - bord) / 2;
var zW=(gW / obj.getW()) * 100;
zW=Math.round(zW * 100) / 100;
var gH=(obj.getH() - bord) / 2;
if( parseInt(obj.option4)==1 ){
gH=(obj.getH() - bord);
}
var zH=(gH / obj.getH()) * 100;
zH=Math.round(zH * 100) / 100;
var h='<div style="position:absolute;border:solid 0px purple;overflow:hidden;" ';
h += ' class="haveflou bloc' + obj.id ;
h += ' ' +  obj.idscript + '" >';
h += '<div style="display:none;" class="blocState' + obj.id + '" >0</div>' ;
h += '<div style="display:none;" class="blocMode' + obj.id + '" >' + obj.option + '</div>' ;
h += '<div style="display:none;" class="backCol' + obj.id + '" >' + backcol + '</div>' ;
var stC='position:absolute;text-align:center;border-radius:3px;' + bCSS;
var stCeel='<tbody style="height:100%;" >';
stCeel += '<tr style="height:100%;" >';
stCeel += '<td style="width:100%;text-align:center;height:100%;';
stCeel += 'vertical-align:middle;cursor:pointer;padding:5px;" >';
var styB='width:' + zW + '%;height:' + zH + '%;' + stC;
var classCube='cubeChoice';
if(obj.contenu6==1){
classCube=' class="cube1Choice'+obj.id+' cubeChoice cubeChoiceX Choice'+obj.id+'" ';
}else{
classCube=' class="cube1Choice'+obj.id+' cubeChoice Choice'+obj.id+'" ';
}
var pos1="left:0px;top:0px;";
var ht1="";
ht1 += '<table ' + classCube + ' ';
ht1 += ' onClick="selectCarreQuizz('+obj.id+',1,\'' + backcol + '\');" ';
ht1 += ' style="{pos1}' + styB + '" >';
ht1 += stCeel + getTextCarreQuizz(obj.contenu2,obj.contenu7,obj.field2,0);
ht1 += '</td></tr></tbody></table>';
if(obj.contenu6==2){
classCube=' class="cube2Choice'+obj.id+' cubeChoice cubeChoiceX Choice'+obj.id+'" ';
}else{
classCube=' class="cube2Choice'+obj.id+' cubeChoice Choice'+obj.id+'" ';
}
var pos2='left:' + (zW + zbord) + '%;top:0px;';
var ht2="";
ht2 += '<table ' + classCube+ ' ';
ht2 += ' onClick="selectCarreQuizz('+obj.id+',2,\'' + backcol + '\');" ';
ht2 += ' style="{pos2}' + styB + '" >';
ht2 += stCeel + getTextCarreQuizz(obj.contenu3,obj.contenu7,obj.field2,1);
ht2 += '</td></tr></tbody></table>';
if(obj.contenu6==3){
classCube=' class="cube3Choice'+obj.id+' cubeChoice cubeChoiceX Choice'+obj.id+'" ';
}else{
classCube=' class="cube3Choice'+obj.id+' cubeChoice Choice'+obj.id+'" ';
}
var pos3='left:0px;bottom:0px;';
var pos4='left:' + (zW + zbord) + '%;bottom:0px;';
var ht3="";
var ht4="";
if( parseInt(obj.option4)==0 ){
ht3 += '<table ' + classCube + ' ';
ht3 += ' onClick="selectCarreQuizz('+obj.id+',3,\'' + backcol + '\');" ';
ht3 += ' style="{pos3}' + styB + '" >';
ht3 += stCeel + getTextCarreQuizz(obj.contenu4,obj.contenu7,obj.field2,2);
ht3 += '</td></tr></tbody></table>';
if(obj.contenu6==4){
classCube=' class="cube4Choice'+obj.id+' cubeChoice cubeChoiceX Choice'+obj.id+'" ';
}else{
classCube=' class="cube4Choice'+obj.id+' cubeChoice Choice'+obj.id+'" ';
}
ht4 += '<table ' + classCube + ' ';
ht4 += ' onClick="selectCarreQuizz('+obj.id+',4,\'' + backcol + '\');" ';
ht4 += ' style="{pos4}' + styB + '" >';
ht4 += stCeel + getTextCarreQuizz(obj.contenu5,obj.contenu7,obj.field2,3);
ht4 += '</td></tr></tbody></table>';
}
if( parseInt(obj.option4)==0 ){
pos3='left:0px;bottom:0px;';
pos4='left:' + (zW + zbord) + '%;bottom:0px;';
}
if( parseInt(obj.option3)==0 ){
ht1=ht1.replace('{pos1}',pos1);
ht2=ht2.replace('{pos2}',pos2);
ht3=ht3.replace('{pos3}',pos3);
ht4=ht4.replace('{pos4}',pos4);
h += ht1 + ht2 + ht3 + ht4;
}else{
var qcmRandomize=Math.floor(Math.random() * 8);
if(qcmRandomize==1||qcmRandomize==2){
ht1=ht1.replace('{pos1}',pos1);
ht2=ht2.replace('{pos2}',pos2);
ht3=ht3.replace('{pos3}',pos3);
ht4=ht4.replace('{pos4}',pos4);
h += ht1 + ht2 + ht3 + ht4;
} else if(qcmRandomize==3||qcmRandomize==4){
ht4=ht4.replace('{pos4}',pos1);
ht1=ht1.replace('{pos1}',pos2);
ht2=ht2.replace('{pos2}',pos3);
ht3=ht3.replace('{pos3}',pos4);
h += ht4 + ht1 + ht2 + ht3;
}else if(qcmRandomize==5||qcmRandomize==6){
ht3=ht3.replace('{pos3}',pos1);
ht4=ht4.replace('{pos4}',pos2);
ht1=ht1.replace('{pos1}',pos3);
ht2=ht2.replace('{pos2}',pos4);
h += ht3 + ht4 + ht1 + ht2 ;
}else{
ht3=ht3.replace('{pos3}',pos1);
ht4=ht4.replace('{pos4}',pos2);
ht2=ht2.replace('{pos2}',pos3);
ht1=ht1.replace('{pos1}',pos4);
h += ht3 + ht4 + ht2 + ht1;
}
}
h += '</div>';
addToM(h);
recupDataObjectMem(obj,lastPage0);
}
}
function applyDataCarreQuizz(obj){
if(obj.linkcontenu!=''&&obj.linkcontenu.indexOf(':')!=-1){
eachContent=obj.linkcontenu.split(':');
var nameB=eachContent[0];
VerifLoadBaseLink(nameB);
var ctrtext=recupDataLink(nameB + ':B','');
if(ctrtext!=''){
}
var nbr=0;
ctrtext=recupDataLink(nameB + ':C','');
if(ctrtext!=''){
obj.contenu2=ctrtext;
}
ctrtext=recupDataLink(nameB + ':D','');
if(ctrtext!=''){
obj.contenu3=ctrtext
nbr++;
}
ctrtext=recupDataLink(nameB + ':E','');
if(ctrtext!=''){
obj.contenu4=ctrtext;
}
ctrtext=recupDataLink(nameB + ':F','');
if(ctrtext!=''){
obj.contenu5=ctrtext;
}
}
}
function getTextCarreQuizz(content,typ,libs,numi){
if(typ==0){
return "<p style='overflow-wrap:break-word;' >"+content+"</p>";
}else{
var divContain='';
var libObj='';
if(typ==1){
divContain='<div class="cubeChoicePaper" ';
divContain += 'style=\'background-image:url("' + content + '");\' >';
divContain += '</div>';
}
if(typ==2){
libs += '|||';
var eachElement=libs.split('|');
libObj=eachElement[numi];
divContain='<div class="cubeChoicePaper2" ';
divContain += 'style=\'background-image:url("' + content + '");\' >';
divContain += '</div>';
divContain += '<div class="cubeChoicePaperLib" style="overflow-wrap:break-word;" >';
divContain += libObj + '</div>';
}
return divContain;
}
}
function selectCarreQuizz(id,index,backcol){
var blocState=parseInteger($('.blocState'+id).text());
var blocMode=parseInteger($('.blocMode'+id).text());
if(blocState==0){
$('.Choice' + id).css("text-decoration","none");
$('.Choice' + id).css("font-weight","normal");
$('.Choice' + id).css("border-width","2px");
$('.Choice' + id).css("border-style","dashed");
$('.Choice' + id).removeClass('CubeChoiceSelect');
$('.cube' + index + 'Choice' + id).css("text-decoration","underline");
$('.cube' + index + 'Choice' + id).css("font-weight","bold");
$('.cube' + index + 'Choice' + id).css("border-style","solid");
$('.cube' + index + 'Choice' + id).css("border-width","4px");
$('.cube' + index + 'Choice' + id).addClass('CubeChoiceSelect');
if(blocMode==1){
$('.cube' + index + 'Choice' + id).css("background-color","#FAD7A0");
$('.blocState'+id).html('1');
setTimeout("correctionCarreQuizz(" + id + ",1)",400);
}
}
}
function correctionCarreQuizz(id,hs){
var ctr=false;
var Obj=CObjets[id];
$('.Choice' + id).each(function(index){
if($(this).hasClass("cubeChoiceX")){
if($(this).hasClass("CubeChoiceSelect")){
ctr=true;
$(this).css("background-color","#74DF00");
}
}
});
if(ctr==false){
$('.Choice' + id).each(function(index){
if($(this).hasClass("cubeChoiceX")){
$(this).css("background-color","#74DF00");
}else{
$(this).css("background-color","#F5B7B1");
}
});
}
if(hs==1&&Obj.strscript!=''){
setTimeout(Obj.strscript,800);
}
}
function processErreurCarreQuizz(id){
var backCol=$('.backCol'+id).text();
if(parseInt($('.blocState'+id).html())==0){
$('.Choice' + id).each(function(index){
$(this).css("background-color",backCol);
});
$('.Choice' + id).each(function(index){
if(!$(this).hasClass("cubeChoiceX")){
if($(this).hasClass("CubeChoiceSelect")){
$(this).css("background-color","#F5B7B1");
}
}
});
}
}
function getCorrectCarreQuizz(id){
var ctr=false;
var Obj=CObjets[id];
$('.Choice' + id).each(function(index){
if($(this).hasClass("cubeChoiceX")){
if($(this).hasClass("CubeChoiceSelect")){
ctr=true;
}
}
});
if($('.blocState'+id).html()=='1'){
}
return ctr;
}
function getLostInteractionCarreQuizz(id){
var c=true;
$('.Choice' + id).each(function(index){
if($(this).hasClass("CubeChoiceSelect")){
c=false;
}
});
return c;
}
function getInputCarreQuizz(id){
var repo='-';
var Obj=CObjets[id];
$('.Choice' + id).each(function(index){
if($(this).hasClass("CubeChoiceSelect")){
repo=$(this).text();
}
});
return repo;
}
var IntervalClock =0;
var clockId='';
var clockAct='';
var clockTimeI=20;
var clockImage=1;
var clockBoite='';
var clockFct='';
var clockTimerG=0;
function installclock(obj,act){
var h='';
clockAct='';
IntervalClock=0;
clockBoite=obj.boite;
var timeI=parseInt(obj.text);
if(obj.contenu4!=''){
if(typeof window[obj.contenu4]!== 'undefined'){
timeI=window[obj.contenu4];
}
}
clockTimeI=timeI;
var timeG=parseInt(1000);
var randomnumber=Math.floor(Math.random()*10000);
var randomnumber2=Math.floor(Math.random()*10000);
var randomnumber3=Math.floor(Math.random()*10000);
clockId='clocktimer' + obj.id + randomnumber + randomnumber2 + randomnumber3;
clockImage=1;
var decy='';
if(obj.getW()<35||obj.an==18){
decy='margin-top:-1550px;';
clockImage=0;
}
h='<img style="display:none;' + decy + '" ';
h += ' id="bloc' + obj.id + '" class="' + clockId + ' bloc' + obj.id + '" ';
if(clockImage==1){
h += ' src="fx/time/time' + clockBoite + '0.png" ';
}
h += ' />';
$("#main").append(h);
clockAct=act;
clockAct=clockAct.replace(' onMouseDown="','');
clockAct=clockAct.replace('"','');
var timeInter=timeI/25;
timeG=parseInt(timeInter);
clockTimerG=timeG;
clockFct='animClock(' + timeG + ',"' + clockId + '")';
if(obj.option2==0){
setTimeout(clockFct,clockTimerG);
}
}
function animClock(timeG,clockref){
if(clockref!=''){
if($("." + clockref).length > 0){
if(IntervalClock < 24){
IntervalClock=IntervalClock + 1;
if(clockImage==1){
$("." + clockref).attr('src','fx/time/time' + clockBoite + IntervalClock + '.png');
}
setTimeout('animClock(' + timeG + ',"' + clockref + '")', timeG);
}else{
if(clockAct!=''){
setTimeout(clockAct, 100);
}
}
}
}
}
var globalCompteurTimer=false;
var globalCompteurTimerSecond=0;
var globalCompteurTimerDepart=0;
var globalCompteurTimerEnd=0;
var globalCompteurDecompt=false;
var globalCompteurEndScreen=0;
var globalCompteurDisplay="<b>00:00:00</b>";
var gctElapse=0;
function installclockcompteur(obj,act){
var Ecran=document.getElementById("main");
var cssPlus="";
if(obj.css){
cssPlus=obj.css ;
}
var color="black";
if(obj.color){
color=obj.color;
}
var h='';
h='<table style="padding:0;margin:0;position:absolute;' + cssPlus + '" ';
h += ' id="bloc' + obj.id + '" class="bloc' + obj.id + '"  ';
h += ' ><tr><td class="blocTimerCompteur blocTimerCompteur' + obj.id + '" ';
h += ' style="padding:0;margin:0;text-align:center;border:solid 0px white;width:95%;color:' + color + ';" >'
h += globalCompteurDisplay + '</td>';
h += '<td style="vertical-align: middle;" >';
h += '<img style="padding:0;margin:0;" ';
h += ' id="imgbloc' + obj.id + '" ';
h += ' src="' + obj.data + '" ';
h += ' />';
h += '</td></tr>';
h += '</table>';
if(globalCompteurTimer==false){
globalCompteurTimerSecond=parseInt(obj.field1);
if(obj.option==1||obj.option==true){
globalCompteurDecompt=true;
globalCompteurEndScreen=parseInt(obj.field2);
}
globalCompteurTimerDepart=(new Date()).getTime();
globalCompteurTimerEnd=parseInt((globalCompteurTimerSecond * 60) * 1000) + 1000;
appliqueCompteurTimer();
setInterval("appliqueCompteurTimer()", 1000);
globalCompteurTimer=true;
}
Ecran.innerHTML=Ecran.innerHTML + h;
}
function appliqueCompteurTimer(){
if(globalCompteurTimer){
if(globalCompteurDecompt){
globalCompteurTimerEnd=parseInt(globalCompteurTimerEnd - 1000);
var ht=globalCompteurTimerEnd + (new Date()).getTime();
globalCompteurDisplay='<b>' + MillisecondsToTimeForCompteur(globalCompteurTimerEnd) + '</b>';
$(".blocTimerCompteur").html(globalCompteurDisplay);
if(globalCompteurTimerEnd<1000){
var ur="data/page" + globalCompteurEndScreen + ".xml";
var t=setTimeout( "loaddata('" + ur +  "','');" ,100);
globalCompteurDecompt=false;
globalCompteurTimer=false;
}
}else{
var ht=(new Date()).getTime() - globalCompteurTimerDepart;
gctElapse=parseInteger(ht);
globalCompteurDisplay='<b>' + MillisecondsToTimeForCompteur(gctElapse) + '</b>';
$(".blocTimerCompteur").html(globalCompteurDisplay);
}
}
}
function MillisecondsToTimeForCompteur(Seconds){
Seconds=Math.round(Seconds/1000);
var S=Seconds % 60;
Seconds -= S;
if(S < 10){S='0' + S;}
var M=(Seconds / 60) % 60;
if(M < 10){M='0' + M;}
var H=Math.floor(Seconds / 3600);
if(H < 10){H='0' + H;}
return H + ':' + M + ':' + S;
}
var filedata='';
var activeNoeud=0;
var loadReponses='<img class="loaderajaxdialog" style="margin-top:10px;margin-bottom:10px;" src="css/ajax_loader_line.gif" />';
var sensRep=0;
var dialogId=0;
var dialogObjId=0;
var dialogObjIdUnik='';
var dialogQuest="";
function instalDialog(obj){
var Ecran=document.getElementById("main");
var color="black";
if(obj.color){
color=obj.color;
}
if(obj.type=='ludidialog'){
var h='';
var ht=getBoite(obj);
if(ht!=''){
h += ht;
}
dialogObjId=parseInt(obj.id);
var rn=Math.floor(Math.random() * 100);
dialogObjIdUnik='zonereponsesdialog' + rn + dialogObjId;
h += '<table style="display:none;color:' + color + ';" ';
h += ' id="table' + obj.id + '" class="bloc' + obj.id + '" >';
h += '<tr><td id="zonedialogtexte" class="zonereponsesdialog" style="text-align:center;color:' + color + ';" >';
h += convertDiaToHtml(obj.text) + '</td>';
obj.bilan='';
obj.bilandisplay='';
dialogQuest=convertDiaToHtml(obj.text);
if(obj.src==0){
if(obj.option==true||obj.option==1){
h += '<td id="' + dialogObjIdUnik + '" class="zonereponsesdialog" style="width:30%;" ';
h += ' >' + loadReponses + '</td></tr>';
sensRep=1 ;
}else{
h += '</tr><tr><td id="' + dialogObjIdUnik + '" class="zonereponsesdialog" ';
h += ' style="height:20%;" >';
h += loadReponses + '</td></tr>';
sensRep=0 ;
}
}else{
h += '</tr>';
}
h += '</table>';
Ecran.innerHTML=Ecran.innerHTML + h;
loadDialog(obj.data,obj.contenu7);
}
if(obj.type=='ludidialogrep'){
var h='';
var ht=getBoite(obj);
if(ht!=''){
h=h + ht;
}
h += '<table style="color:' + color + ';" ';
h += ' id="table' + obj.id + '" class="bloc' + obj.id + '" ';
h += ' >';
h += '<tr><td id="' + dialogObjIdUnik + '" ';
h += 'class="zonereponsesdialog" style="text-align:center;color:' + color + ';" >';
h += '</td></tr></table>';
Ecran.innerHTML=Ecran.innerHTML + h;
}
}
function loadDialog(data,localx){
var d=new Date();
var n=d.getMinutes();
if(localExec()){
data=doff[localx];
opendialogXML(data);
setTimeout('afficheChoices(0,"' + dialogObjIdUnik + '");',500);
}else{
$.ajax({
type: "GET",
url: 'data/' + data + '?t=' + n,
dataType: (isMsie()) ? "text" : "xml",
cache:true,
async:false,
success: function(data){
}
,
error: function(){
noresp();
}
});
}
}
function afficheChoices(i,idUnik){
var h='';
if(!document.getElementById(dialogObjIdUnik)){
return false;
}
if(typeof(CDialogs[i]) == 'undefined'){
return false;
}
if(typeof(CDialogs[i].idChoix1) == 'undefined'){
return false;
}
if(CDialogs[i].idChoix1.length>5){
h += createButtonDialogue(CDialogs[i].idChoix1,CDialogs[i].lienChoix1,i,CDialogs[i].noteChoix1);
}
if(CDialogs[i].idChoix2.length>5){
h += createButtonDialogue(CDialogs[i].idChoix2,CDialogs[i].lienChoix2,i,CDialogs[i].noteChoix2);
}
if(CDialogs[i].idChoix3.length>5){
h += createButtonDialogue(CDialogs[i].idChoix3,CDialogs[i].lienChoix3,i,CDialogs[i].noteChoix3);
}
if(CDialogs[i].idChoix4.length>5){
h += createButtonDialogue(CDialogs[i].idChoix4,CDialogs[i].lienChoix4,i,CDialogs[i].noteChoix4);
}
if(CDialogs[i].idChoix5.length>5){
h += createButtonDialogue(CDialogs[i].idChoix5,CDialogs[i].lienChoix5,i,CDialogs[i].noteChoix5);
}
if(document.getElementById(idUnik)){
document.getElementById(idUnik).innerHTML=h;
}else{
setTimeout('afficheChoices(0,"' + idUnik + '");',1000);
}
if(typeof(CDialogs[i].soundFile) === 'undefined'){
}else{
if(globalSound==1){
if(CDialogs[i].soundFile.indexOf(".mp3")!=-1){
playSoundOne('data/' + CDialogs[i].soundFile,'');
}
}
}
}
function createButtonDialogue(i,l,numid,repnote){
var h='';
var formatl=l;
var escapedString=formatl.replace(/'/g," ").replace(/"/g," ");
escapedString=escapedString.replace(/'/g," ").replace(/"/g," ");
escapedString=escapedString.replace(/"/g," ").replace(/"/g," ");
escapedString=escapedString.replace(/&apos;/g,' ');
escapedString=escapedString.replace(/&quot;/g,' ');
var actbtn=' onclick=\'afficheND("' + i + '", ' + parseInteger(numid) + ',' + parseInteger(repnote) + ' , "' + escapedString + '");\' ';
if(sensRep==1){
h='<a href="#" class="RightRepDialog" ' + actbtn + ' >' + convertDiaToHtml(l) + '</a>';
}else{
if(sensRep==2){
h='<a href="#" class="scrRepDialog" ' + actbtn + ' >' + convertDiaToHtml(l) + '</a>';
}else{
h='<a href="#" class="BottomRepDialog" ' + actbtn + ' >' + convertDiaToHtml(l) + '</a>';
}
}
return h;
}
function afficheND(idstr,numid, repnote,libelle){
var noteReponse=parseFlo(CDialogs[numid].note);
if(noteReponse>0){
if(CDialogs[numid].remarque!=''&&repnote==0){
remarques=remarques + CDialogs[numid].remarque + '<br />';
}
N_T=parseFlo(parseFlo(N_T) + parseFlo(CDialogs[numid].note));
domainesN_T[CDialogs[numid].domaine]=parseFlo(domainesN_T[CDialogs[numid].domaine]  + parseFlo(CDialogs[numid].note));
writeInConsole("domaine dia " + CDialogs[numid].domaine);
writeInConsole("domainesN_T[CDialogs[numid].domaine] " + domainesN_T[CDialogs[numid].domaine]);
if(repnote>0){
N_F=parseFlo(parseFlo(N_F) + parseFlo(repnote));
domainesN_F[CDialogs[numid].domaine]= parseInt( parseInt(domainesN_F[CDialogs[numid].domaine])  + parseInt(repnote));
}
var dialogBloc=new CObjet();
dialogBloc.id=idstr + '00' + numid;
dialogBloc.type='dialog';
chargeNoteObjectMem(dialogBloc,lastPage0,parseFlo(CDialogs[numid].note),parseFlo(repnote),CDialogs[numid].domaine,CDialogs[numid].remarque,'dialog');
if(parseFlo(CDialogs[numid].note)==parseFlo(repnote)){
var bhtml='<div class="blockbilan" ><div class="questbilan" ><span style="color:green;" >&#9632;&nbsp;</span> Dialogue</div>';
bhtml += '<ul>' + dialogQuest + '</ul>';
bhtml += '<ul style="color:green;" ><i>&quot;' + libelle + '&quot;</i></ul>';
bhtml += '</div>';
}else{
var bhtml='<div class="blockbilan" ><div class="questbilan" ><span style="color:orange;" >&#9632;&nbsp;</span> Dialogue</div>';
bhtml += '<ul>' + dialogQuest + '</ul>';
bhtml += '<ul><i>&quot;' + libelle + '&quot;</i></ul>';
bhtml += '</div>';
}
var bxml='<item id="' + idstr + '-' + numid + '" >';
bxml += "<answer>";
bxml += '<resume><![CDATA[' + dialogQuest + ']]></resume>';
bxml += "<text><![CDATA[" + libelle + "]]></text>";
bxml += "<note>" + parseInt(repnote) + "</note>";
bxml += "<total>" + noteReponse + "</total>";
bxml += "</answer>";
bxml += '</item>';
chargeBilanPartObjectMem(dialogBloc,lastPage0,bxml,bhtml)
}
if(document.getElementById(dialogObjIdUnik)){
document.getElementById(dialogObjIdUnik).innerHTML="";
}
var idDialogGlob="zonedialogtexte";
if(sensRep==2){
idDialogGlob="diaTxtView";
}
document.getElementById(idDialogGlob).innerHTML=loadReponses;
var ri=-1;
for(var i=0; i < CDialog_count; i++){
if(CDialogs[i].idstr==idstr){
ri=i;
}
}
if(CDialogs[ri].linkTo!=''){
idstr=CDialogs[ri].linkTo;
for(var i=0; i < CDialog_count; i++){
if(CDialogs[i].idstr==idstr){
ri=i;
}
}
}
if(ri!=-1){
$(".loaderajaxdialog").animate({
opacity: '0.2'
}, 500, function(){
if(document.getElementById(idDialogGlob)){
var diaHTML =convertDiaToHtml(CDialogs[ri].text);
if(noteReponse>0){
var Vobj=CObjets[dialogObjId];
Vobj.bilan =Vobj.bilan + "<answer>";
Vobj.bilan=Vobj.bilan + '<resume><![CDATA[' + dialogQuest + ']]></resume>';
Vobj.bilan =Vobj.bilan + "<text><![CDATA[" + libelle + "]]></text>";
Vobj.bilan =Vobj.bilan + "<note>" + parseInt(repnote) + "</note>";
Vobj.bilan =Vobj.bilan + "<total>" + noteReponse + "</total>";
Vobj.bilan =Vobj.bilan + "</answer>";
Vobj.bilandisplay=Vobj.bilandisplay + "<li>";
Vobj.bilandisplay=Vobj.bilandisplay + dialogQuest + '&nbsp;>>' + libelle + '&nbsp;(' + parseInt(repnote) + '/' + noteReponse + ")";
Vobj.bilandisplay=Vobj.bilandisplay + "</li>";
}
document.getElementById(idDialogGlob).innerHTML=diaHTML;
dialogQuest=diaHTML;
setTimeout('afficheChoices(' + ri + ',"' + dialogObjIdUnik + '");',1500);
if(CDialogs[ri].linkScript!=''){
var scr=detectScriptToEval(CDialogs[ri].linkScript);
try{
eval(scr);
} catch (e){
alert(scr);
if(e instanceof SyntaxError){
alert(e.message);
}
}
}
}
});
}
}
var CDialogs=new Array();
var CDialog_count=0;
function CDialogs_Add(Elem){
Elem.id=CDialog_count;
CDialogs.push(Elem);
CDialog_count=CDialog_count + 1 ;
}
function CDialog(){
this.id;
this.idstr;
this.text;
this.noteChoix1;
this.noteChoix2;
this.noteChoix3;
this.noteChoix4;
this.noteChoix5;
this.idChoix1;
this.idChoix2;
this.idChoix3;
this.idChoix4;
this.idChoix5;
this.lienChoix1;
this.lienChoix2;
this.lienChoix3;
this.lienChoix4;
this.lienChoix5;
this.note;
this.domaine;
this.remarque;
this.soundFile;
this.linkTo;
this.linkScript;
}
function opendialogXML(data){
if(data==''){
return false;
}
CDialogs=new Array();
CDialog_count=0;
var nbcharge=0;
var xml_p;
if(typeof data == "string"){
xml_p=StringtoXML(data);
}else{
xml_p=data;
}
$(xml_p).find('dialog').each(function(){
var tempBloc=new CDialog();
tempBloc.idstr=$(this).find('id').text();
tempBloc.text=$(this).find('texte').text();
tempBloc.idChoix1=$(this).find('idChoix1').text();
tempBloc.lienChoix1=$(this).find('lienChoix1').text();
tempBloc.noteChoix1=$(this).find('noteChoix1').text();
tempBloc.idChoix2=$(this).find('idChoix2').text();
tempBloc.lienChoix2=$(this).find('lienChoix2').text();
tempBloc.noteChoix2=$(this).find('noteChoix2').text();
tempBloc.idChoix3=$(this).find('idChoix3').text();
tempBloc.lienChoix3=$(this).find('lienChoix3').text();
tempBloc.noteChoix3=$(this).find('noteChoix3').text();
tempBloc.idChoix4=$(this).find('idChoix4').text();
tempBloc.lienChoix4=$(this).find('lienChoix4').text();
tempBloc.noteChoix4=$(this).find('noteChoix4').text();
tempBloc.idChoix5=$(this).find('idChoix5').text();
tempBloc.lienChoix5=$(this).find('lienChoix5').text();
tempBloc.noteChoix5=$(this).find('noteChoix5').text();
tempBloc.note=$(this).find('note').text();
tempBloc.domaine=$(this).find('domaine').text();
tempBloc.remarque=$(this).find('remarque').text();
tempBloc.linkTo=$(this).find('linkTo').text();
tempBloc.linkScript=$(this).find('linkScript').text();
tempBloc.soundFile=$(this).find('soundFile').text();
CDialogs_Add(tempBloc);
nbcharge++;
});
}
function convertDiaToHtml(data){
data=data.replace('br!', '<br />');
data=data.replace('br!', '<br />');
data=data.replace('br!', '<br />');
data=data.replace('br!', '<br />');
data=data.replace('br!', '<br />');
data=data.replace('br!', '<br />');
data=data.replace('br!', '<br />');
data=data.replace('br!', '<br />');
data=data.replace('br!', '<br />');
data=data.replace('br!', '<br />');
if(data.indexOf('{Variable1}')!=-1){
data=data.replace('{Variable1}',Variable1);
}
return data;
}
function detectScriptToEval(data){
data=data.replace('&rsquo;', '\'');
data=data.replace('&rsquo;', '\'');
data=data.replace('&rsquo;', '\'');
data=data.replace('&rsquo;', '\'');
data=data.replace('&rsquo;', '\'');
data=data.replace('&rsquo;', '\'');
return data;
}
var nextIdia=0;
function disDiaToScr(i,pathimg,pathdialog,color){
sensRep=2;
$('#imgViewBack,#imgScrView').css("display","none");
if(!document.getElementById("diaScrView")){
var rn=Math.floor(Math.random() * 100);
dialogObjIdUnik='zonereponsesdialog' + rn;
var h='<div id="diaViewBack" style="position:absolute;z-index:5;" >';
h += '<div onClick="closeDiaToScr()" class="closeImgViewSrc" >';
h += '</div>';
h += '<div id="diaScrView" style="position:absolute;z-index:6;" ></div>';
h += '<div id="diaTxtView" ';
h += 'style="position:absolute;z-index:6;padding:2%;text-align:center;" >';
h += '</div>';
h += '<div id="' + dialogObjIdUnik + '" class="diaTxtResponse" ';
h += 'style="position:absolute;z-index:6;padding:2%;text-align:center;" ></div>';
h += '</div>';
addToM(h);
}else{
}
$('.diaTxtResponse').html(loadReponses);
var finalPath='images/' + pathimg;
var objAll=$('#diaViewBack,#diaScrView,#diaTxtView');
objAll.css('background-repeat','no-repeat');
objAll.css('background-position','center center');
$('#diaViewBack').css('background-color',color);
$('#diaScrView').css('background-image','url(\'' + finalPath + '\')');
objAll.css('background-size','contain');
objAll.css('margin-left','0px').css('margin-top','0px');
if(i==0){
nextIdia=0;
$('#diaViewBack').css('bottom','0%').css('top','90%');
$('#diaScrView').css('bottom','4%').css('top','4%');
$('#diaScrView').css('left','2%').css('width','25%');
if( pathimg!='' ){
$('#diaTxtView,.diaTxtResponse').css('width','63%');
}else{
$('#diaTxtView,.diaTxtResponse').css('width','92%');
$('#diaScrView').css('display','none')
}
$('#diaTxtView').css('right','4%');
$('#diaTxtView').css('color','white');
$('#diaTxtView').css('bottom','35%').css('top','4%');
$('.diaTxtResponse').css('right','4%');
$('.diaTxtResponse').css('bottom','0%');
objAll.css('display','block');
$('#diaViewBack').css('left','0%').css('right','0%');
$('#diaViewBack').animate({
top : "75%"
}, 300, function(){
});
}
if(i==5){
nextIdia=5;
$('#diaViewBack').css('bottom','90%').css('top','0%');
$('#diaScrView').css('bottom','4%').css('top','4%');
$('#diaScrView').css('left','2%').css('width','25%');
if( pathimg!='' ){
$('#diaTxtView,.diaTxtResponse').css('width','63%');
}else{
$('#diaTxtView,.diaTxtResponse').css('width','92%');
$('#diaScrView').css('display','none')
}
$('#diaTxtView').css('right','4%');
$('#diaTxtView').css('color','white');
$('#diaTxtView').css('bottom','35%').css('top','4%');
$('.diaTxtResponse').css('right','4%');
$('.diaTxtResponse').css('bottom','0%');
objAll.css('display','block');
$('#diaViewBack').css('left','0%').css('right','0%');
$('#diaViewBack').animate({
bottom : "75%"
}, 300, function(){
});
}
loadDialog(pathdialog,'dialog'+pathdialog);
var firstTxt=convertDiaToHtml(CDialogs[0].text);
$('#diaTxtView').html(firstTxt);
}
function closeDiaToScr(){
var objAll=$('#diaViewBack,#diaScrView');
if(nextIdia==0){
objAll.animate({
top : "95%",bottom : "0%"
}, 200, function(){
objAll.css("display","none");
});
}
if(nextIdia==5){
objAll.animate({
bottom : "95%",top : "0%"
}, 200, function(){
objAll.css("display","none");
});
}
}
var hiddenZoneFakeClicked=0;
var hiddenZoneLastWord="";
function installludi(obj){
var h='';
var act='';
var color="black";
if(obj.color){
color=obj.color;
}
if(obj.url!=''){
if(obj.url.indexOf("link:")!=-1){
var ur=obj.url.replace('link:','');
act=' onClick="window.location.href=\'' + ur + '\';return false;" ';
}else{
act=' onclick="loaddata(\'' + obj.url + '\',\'' + obj.data + '\');" ';
}
}
var Ecran=document.getElementById("main");
if(obj.type=='luditarget'){
var parsedIMG=[];
parsedIMG=obj.text.split(";");
var rn=Math.floor(Math.random()*10000);
var rn2=Math.floor(Math.random()*10000);
var rn3=Math.floor(Math.random()*10000);
obj.idstr=rn + rn2 + rn3;
h += '<img style="position:absolute;left:0px;top:0px;width:50px;height:50px;" ';
h += ' id="targetbloc' + obj.idstr + '" class="targetbloc' + obj.id + '" ';
h += ' src="images/' +  parsedIMG[0]  +  '" ';
h += act;
h += ' />';
Ecran.innerHTML=Ecran.innerHTML + h;
}
if(obj.type=='ludihiddenzone'){
h += '<span style="position:absolute;z-index:3;background-image:url(\'fx/transparent.png\');" ';
h += ' id="activebloc' + obj.id + '" class="zonebloc' + obj.id + '" ';
var escapedString=obj.text.replace(/'/g, " ").replace(/"/g, " ");
h += ' onClick="$(\'#zonebloc' + obj.id + '\').fadeIn();hiddenZoneLastWord=\'' + escapedString + '\';" ';
h += '></span>';
h += '<img style="position:absolute;left:0px;top:0px;width:50px;height:50px;display:none;z-index:3;" ';
h += ' id="zonebloc' + obj.id + '" class="zonebloc' + obj.id + '" ';
h += ' src="' +   obj.src  +  '" ';
h += act;
h += ' />';
Ecran.innerHTML=Ecran.innerHTML + h;
}
if(obj.type=='ludihiddenzonefake'){
h += '<span style="position:absolute;z-index:3;';
h += 'background-image:url(\'fx/transparent.png\');" ';
h += ' id="activebloc' + obj.id + '" class="zonebloc' + obj.id + '" ';
h += ' onClick="$(\'#zonebloc' + obj.id + '\').fadeIn();hzfakeincr();" ';
h += '></span>';
h += '<img style="position:absolute;left:0px;top:0px;width:50px;height:50px;display:none;z-index:3;" ';
h += ' id="zonebloc' + obj.id + '" class="zonebloc' + obj.id + '" ';
h += ' src="' +   obj.src  +  '" ';
h += act;
h += ' />';
Ecran.innerHTML=Ecran.innerHTML + h;
}
if(obj.type=='ludicascade'){
var rn=Math.floor(Math.random()*10000);
var rn2=Math.floor(Math.random()*10000);
var rn3=Math.floor(Math.random()*10000);
obj.idstr=rn + rn2 + rn3;
h='<img style="position:absolute;left:0px;top:0px;width:50px;height:50px;display:none;z-index:2;" ';
h += ' id="cascade1bloc' + obj.idstr + '" class="cascadebloc' + obj.idstr + '" ';
h += ' src="' +   obj.src  +  '" ';
h += act;
h += ' />';
if(obj.de>0){
h=h + '<div id="cascadeActivator' + obj.idstr + '" style="display:none;" >0</div>';
setTimeout('$("#cascadeActivator' + obj.idstr + '").html("1");zoomludiCascade(' + obj.id + ');',obj.de);
}else{
h=h + '<div id="cascadeActivator' + obj.idstr + '" style="display:none;" >1</div>';
}
var nb  =parseInt(obj.border);
if(nb>1){
h += '<img style="position:absolute;left:0px;top:0px;width:50px;height:50px;display:none;z-index:2;" ';
h += ' id="cascade2bloc' + obj.idstr + '" class="cascadebloc' + obj.idstr + '" ';
h += ' src="' +   obj.src  +  '" ';
h += act;
h += ' />';
}
if(nb>2){
h += '<img style="position:absolute;left:0px;top:0px;width:50px;height:50px;display:none;z-index:2;" ';
h += ' id="cascade3bloc' + obj.idstr + '" class="cascadebloc' + obj.idstr + '" ';
h += ' src="' +   obj.src  +  '" ';
h += act;
h += ' />';
}
if(nb>3){
h += '<img style="position:absolute;left:0px;top:0px;width:50px;height:50px;display:none;z-index:2;" ';
h += ' id="cascade4bloc' + obj.idstr + '" class="cascadebloc' + obj.idstr + '" ';
h += ' src="' +   obj.src  +  '" ';
h += act;
h += ' />';
}
if(nb>4){
h += '<img style="position:absolute;left:0px;top:0px;width:50px;height:50px;display:none;z-index:2;" ';
h += ' id="cascade5bloc' + obj.idstr + '" class="cascadebloc' + obj.idstr + '" ';
h += ' src="' +   obj.src  +  '" ';
h += act;
h += ' />';
}
Ecran.innerHTML=Ecran.innerHTML + h;
}
if(obj.type=='ludilistemots'){
h='<table ';
h += ' style="position:absolute;" ';
h += ' id="bloc' + obj.id + '" class="bloc' + obj.id + '" ';
h += '><tr><td id="innerbloclistemot' + obj.id + '" style="text-align:center;" >';
h += '<img src="css/ajax_loader_blue.gif" />';
h += '</td></tr></table>';
Ecran.innerHTML=Ecran.innerHTML + h;
}
if(obj.type=='ludirpt'){
recalculAllNoteByPersistence();
h='<table ';
h += ' style="position:absolute;border:solid 0px purple;color:' + color + ';" ';
h += ' id="bloc' + obj.id + '" class="bloc' + obj.id + '" ';
h += '>';
var wi=parseInt(obj.border);
var he=parseInt(obj.note);
var libelles=obj.text.split('|');
var rptcolors=obj.data.split(';');
for(var i=0; i<parseInt(obj.src); i++){
if(libelles[i]!=''){
var pourc=0;
if(domainesN_F[i]!=0&&domainesN_T[i]!=0){
pourc=(domainesN_F[i] / domainesN_T[i]);
}
domainesPour[i]=pourc;
h += '<tr><td class="libellegauge libelle' + obj.id + '" ';
h += ' style="color:' + color + ';" >';
h +=  libelles[i] + '</td>';
h += '<td>';
h += '<div class="gauge' + obj.id + '" style="position:relative;" >';
h += '<div data-size="' + domainesPour[i] + '" class="barresty gaugebar' + obj.id + '" style="position:absolute;left:0px;top:0px;width:10px;overflow:hidden;';
h += 'background:' + rptcolors[i] + ';" >';
h += '<div class="notegauge" style="display:none;color:black;" >';
var resultD=Math.round(domainesN_F[i]*10)/10;
h += resultD + '/' + domainesN_T[i];
h += '</div></div>';
h += '<img class="gauge' + obj.id + '" ';
h += ' style="position:absolute;left:0px;top:0px;width:' + wi + 'px;height:' + he + 'px;" src="fx/regle.png" />';
h += '</div>';
h += '</td></tr>';
}
}
h=h + '</table>';
Ecran.innerHTML=Ecran.innerHTML + h;
}
if(obj.type=='redirLudi'){
var adress=obj.text;
adress=adress + '?ps=' + obj.contenu2;
if(obj.option==1){
adress=adress + '&v1=' + Variable1;
}
if(obj.option2==1){
adress=adress + '&v2=' + Variable2;
}
if(obj.option3==1){
adress=adress + '&v3=' + Variable3;
}
if(obj.option4==1){
adress=adress + '&v4=' + Variable4;
}
if(obj.border=="1"){
adress=adress + '&v10=' + Variable10;
}
window.location.href=adress;
}
if(obj.type=='holetext'){
haveNoSyntaxInScreen=false;
h='<table ';
h += ' style="position:absolute;color:' + color + ';" ';
h += ' id="bloc' + obj.id + '" class="bloc' + obj.id + '" ';
h += '><tr><td id="innerbloctext' + obj.id + '" style="' + obj.css + '" >';
h += obj.text; //Html auto-g�n�r�
h += '</td></tr></table>';
Ecran.innerHTML=Ecran.innerHTML + h;
recupDataObjectMem(obj,lastPage0);
}
if(obj.type=='tcm'){
h='<table style="position:absolute;color:' + color + ';" ';
h += ' id="bloc' + obj.id + '" class="bloc' + obj.id + ' tcm' + obj.idscript + '" >';
h += '<tr><td id="innerbloctext' + obj.id + '" style="' + obj.css + '" >';
h += obj.text;
h += '</td></tr></table>';
Ecran.innerHTML=Ecran.innerHTML + h;
recupDataObjectMem(obj,lastPage0);
zoomludi(obj);
}
}
function hzfakeincr(){
hiddenZoneFakeClicked=hiddenZoneFakeClicked + 1;
}
function zoomludiCascade(i){
var obj=CObjets[i];
var xb=parseInt(obj.getX() * zoom);
var yb=parseInt(obj.getY() * zoom);
var wb=parseInt(obj.getW() * zoom);
var hb=parseInt(obj.getH() * zoom);
if(document.getElementById("cascadeActivator" + obj.idstr)){
var v=$("#cascadeActivator" + obj.idstr).text();
if(v=="0"){
return false;
}
}
$(".cascadebloc" + obj.idstr).css("width",wb + 'px').css("height",hb + 'px');
if(document.getElementById("cascadeActivator" + obj.idstr)){
var v=$("#cascadeActivator" + obj.idstr).text();
if(v=="2"){
return false;
}
}
$("#cascadeActivator" + obj.idstr).html("2");
$(".cascadebloc" + obj.idstr).css("left",xb + 'px').css("top",yb + 'px');
var nb=parseInt(obj.border);
var tps =parseInt(obj.note);
var valu=tps / nb;
animcascade(obj,tps,1,10);
if(nb==2){
animcascade(obj,tps,2,parseInt(tps/2));
}
if(nb==3){
animcascade(obj,tps,2,parseInt(valu * 2)) ;
animcascade(obj,tps,3,valu);
}
if(nb==4){
animcascade(obj,tps,2,parseInt(valu * 3)) ;
animcascade(obj,tps,3,parseInt(valu * 2));
animcascade(obj,tps,4,parseInt(valu));
}
if(nb==5){
animcascade(obj,tps,2,parseInt(valu * 4)) ;
animcascade(obj,tps,3,parseInt(valu * 3)) ;
animcascade(obj,tps,4,parseInt(valu * 2));
animcascade(obj,tps,5,parseInt(valu));
}
}
function zoomludi(obj){
var xb=parseInt(obj.getX() * zoom);
var yb=parseInt(obj.getY() * zoom);
var wb=parseInt(obj.getW() * zoom);
var hb=parseInt(obj.getH() * zoom);
if(obj.type=='luditarget'){
$("#targetbloc" + obj.idstr).css("width",wb + 'px').css("height",hb + 'px');
$("#targetbloc" + obj.idstr).css("left",xb + 'px').css("top",yb + 'px');
$("#targetbloc" + obj.idstr).css("z-index",obj.ind);
animludi(obj);
}
if(obj.type=='ludihiddenzone'||obj.type=='ludihiddenzonefake'){
$(".zonebloc" + obj.id).css("width",wb + 'px').css("height",hb + 'px');
$(".zonebloc" + obj.id).css("left",xb + 'px').css("top",yb + 'px');
}
if(obj.type=='ludicascade'){
zoomludiCascade(obj.id);
}
if(obj.type=='ludilistemots'){
setTimeout('animlistemots(' + obj.id + ')', 1000);
}
if(obj.type=='ludirpt'){
var wi=parseInt(obj.border * zoom);
var he=parseInt(obj.note * zoom);
$(".gauge" + obj.id).css("width",wi + 'px').css("height", he + 'px');
wi=wb - wi;
$(".libelle" + obj.id).css("width",wi + 'px');
$(".gaugebar" + obj.id).css("height",parseInt(he *0.7) + 'px');
$(".gaugebar" + obj.id).css("left",parseInt(wi *0.08) + 'px');
$(".gaugebar" + obj.id).css("top",parseInt(he *0.15) + 'px');
$(".gaugebar" + obj.id).each(function(index){
var size=$(this).attr('data-size');
var wsize=parseInt(wi *0.9) * size;
$(this).animate({width : wsize + 'px'},2000);
});
var ht=$(".notegauge").height();
var lht=parseInt(parseInt(parseInt(he *0.7) - ht)/2);
$(".notegauge").css("margin-top",lht);
$(".notegauge").fadeIn("slow");
$(".notegauge").animate({marginRight : lht + 'px'},2500);
}
if(obj.type=='holetext'||obj.type=='tcm'){
var nt=parseInt(parseInt(obj.fontsize * zoom) * 0.7);
if(nt<14){nt='14';}
$('#bloc' + obj.id + ' .reponseholetext').each(function(index){
var idctr=$(this).attr('id');
if(document.getElementById(idctr)){
var fct='if(document.getElementById("' + idctr + '")){document.getElementById("' + idctr + '").style.fontSize ="' + nt + 'px";}';
setTimeout(fct, 300);
}
});
}
}
function animlistemots(id){
if(document.getElementById('innerbloclistemot' + id )){
var html="";
for(var i=0; i < CObjets_count; i++){
if(CObjets[i].type=='ludihiddenzone'){
if(document.getElementById('zonebloc' + CObjets[i].id )){
if(document.getElementById('zonebloc' + CObjets[i].id ).style.display=='none'){
html=html + "<p>" + CObjets[i].text + "</p>" ;
}else{
html=html + "<p style='text-decoration:line-through;' >" + CObjets[i].text + "</p>" ;
}
}
}
}
if(html==""){
html ='Aucune <br />"Zone cach&eacute;e"<br /> avec mot !';
}else{
setTimeout('animlistemots(' + id + ')', 1000);
}
document.getElementById('innerbloclistemot' +  id).innerHTML=html;
}
}
function animludi(obj){
if(obj.type=='luditarget'){
var parsedPoints=[];
parsedPoints=obj.data.split("!");
var parsedTime=[];
parsedTime=obj.remarque.split(";");
var parsedIMG=[];
parsedIMG=obj.text.split(";");
var nbpts=parseInt(parsedPoints.length);
if(obj.border==''){obj.border='0';}
if(parseInt(obj.border)<nbpts){
if(parsedPoints[parseInt(obj.border)]!=''){
var parsedPt=[];
parsedPt=parsedPoints[parseInt(obj.border)].split(";");
var wb=parseInt(obj.getW()/2);
var hb=parseInt(obj.getH()/2);
var xanim=parseInt(parseInt(parsedPt[0]) - wb) * zoom;
var yanim=parseInt(parseInt(parsedPt[1]) - hb) * zoom;
var timep=parseInt(parsedTime[parseInt(obj.border)]);
$("#targetbloc" + obj.idstr).animate({
left: xanim + 'px',top: yanim + 'px'
},
{ queue: false, duration: timep , easing : 'linear',
complete : function(){
if(document.getElementById("targetbloc" + obj.idstr)){
if(obj.mymenu==menu_global){
obj.border=parseInt(parseInt(obj.border) +1);
obj.getX()=parseInt(parsedPt[0]) - wb;
obj.getY()=parseInt(parsedPt[1]) - hb;
document.getElementById("targetbloc" + obj.idstr).src="images/" + parsedIMG[parseInt(obj.border)];
animludi(obj);
}
}
}});
}else{
obj.border=parseInt(parseInt(obj.border) +1);
}
}
}
}
function animcascade(obj,tps,i,dec){
if(document.getElementById("cascade1bloc" + obj.idstr)){
var parsedPoints=[];
parsedPoints=obj.remarque.split(";");
var xb=parseInt(obj.getX() * zoom);
var yb=parseInt(obj.getY() * zoom);
var wb=parseInt(obj.getW()/2);
var hb=parseInt(obj.getH()/2);
var xanim=parseInt(parseInt(parsedPoints[0]) - wb) * zoom;
var yanim=parseInt(parseInt(parsedPoints[1]) - hb) * zoom;
if(parseInt(obj.selectcolor)!=0){
var zone=parseInt(obj.selectcolor) * zoom;
xanim=parseInt(xanim - zone) + parseInt( Math.floor( Math.random() * (zone*2) ));
yanim=parseInt(yanim - zone) + parseInt( Math.floor( Math.random() * (zone*2) ));
}
$("#cascade" + i + "bloc" + obj.idstr).animate({
opacity : 1
}, dec , function(){
$("#cascade" + i + "bloc" + obj.idstr).fadeIn();
$("#cascade" + i + "bloc" + obj.idstr).animate({
left: xanim + 'px',top: yanim + 'px'
},
{ queue: true, duration: tps , easing : 'linear',
complete : function(){
$("#cascade" + i + "bloc" + obj.idstr).animate({
opacity : 0
}, 50 , function(){
$("#cascade" + i + "bloc" + obj.idstr).css("left",xb + 'px').css("top",yb + 'px');
animcascade(obj, tps, i,10);
});
}});
});
}
}
var AutoLockObjets=0;
function placeLockObjets(obj){
return false;
}
function isQuestObj(obj){
if(obj.type=='qcm'){return true;}
if(obj.type=='qcmunique'){return true;}
if(obj.type=='drag'){return true;}
if(obj.type=='drop'){return true;}
if(obj.type=='bag'){return true;}
if(obj.type=='inputFocus'){return true;}
if(obj.type=='inputsyntaxique'){return true;}
if(obj.type=='input'){return true;}
if(obj.type=='inputNumerique'){return true;}
if(obj.type=='holetext'){return true;}
if(obj.type=='tcm'){return true;}
return false;
}
var timeoutHW;
var actualObjHW;
function launchHandWriting(id){
var obj=CObjets[id];
actualObjHW=id;
var sid=".bloc" + id +",.alterbloc" + id;
$(sid).css({ opacity : 0});
$(sid).css("margin-top", "0px");
window.clearTimeout(timeoutHW);
var i=0;
addHandWritingImg();
var xObj=parseInt(obj.getX() * zoom);
var yObj=parseInt(obj.getY() * zoom);
var fontSizeObj=parseInt(obj.fontsize * zoom);
var lgtObj=($('#innerbloc' + id + " p").length);
if(lgtObj>0){
processHW($('#innerbloc' + id + " p"),$('#innerbloc' + id + " p").html(),'',xObj,yObj,fontSizeObj,300,id);
}else{
processHW($('#innerbloc' + id),$('#innerbloc' + id).html(),'',xObj,yObj,fontSizeObj,300,id);
}
}
function processHW(selfObj,textObj,content,xObj,yObj,fontSizeObj,timeup,id){
if(textObj.length > 0){
var timeSteps=70;
var next=textObj.match(/(\s*(<[^>]*>)?)*(&.*?;|.?)/)[0];
textObj=textObj.substr(next.length);
$(selfObj).html(content + next + "<span id='cursorhandpencil" + id + "' >&nbsp;</span>");
if(timeup==0){
var sid=".bloc" + id +",.alterbloc" + id;
$(sid).css({ opacity : 1});
}
$("#handpencil").css("margin-top","-100px");
var p=$("#cursorhandpencil" + id);
var of1=p.position();
var of2=$(selfObj).position();
var rdm=Math.floor(Math.random() * fontSizeObj)
if(actualObjHW==id){
$("#handpencil").animate({
"left" : parseInt(of1.left + xObj) + "px",
"top"  : parseInt( of1.top + yObj + rdm) + "px"
},20 + timeup);
}else{
timeSteps=30;
}
setTimeout(function(){
processHW(selfObj, textObj , content + next,xObj,yObj,fontSizeObj,0,id);
},timeSteps + timeup);
}else{
$("#cursorhandpencil" + id).css("display","none");
$("#handpencil").animate({
"top"  : (yObj + 30) + "px"
},
300,
function(){
if(actualObjHW==id){
window.clearTimeout(timeoutHW);
timeoutHW=window.setTimeout(exitWH,300);
}
});
}
}
function exitWH(){
$("#handpencil").animate({
"left" : "1500px",
"top"  : "1500px"
},500);
}
function installHandProcess(obj){
installHandWriting(obj);
installHandArrow(obj);
}
function installHandWriting(obj){
if(obj.type=='handcircle'){
var h='<img ';
h += ' id="bloc' + obj.id + '" ';
h += ' class="haveflou unselectable bloc' + obj.id + ' ' +  obj.idscript + '" ';
h += ' src="images/hand-circle0.png" ';
h += ' />';
addToM(h);
}
}
function installHandArrow(obj){
if(obj.type=='handarrow'){
var h='<img ';
h += ' id="bloc' + obj.id + '" ';
h += ' class="haveflou unselectable bloc' + obj.id + ' ' +  obj.idscript + '" ';
h += ' src="images/hand-arrow-right0.png" ';
h += ' />';
addToM(h);
}
if(obj.type=='handarrowbottom'){
var h='<img ';
h += ' id="bloc' + obj.id + '" ';
h += ' class="haveflou unselectable bloc' + obj.id + ' ' +  obj.idscript + '" ';
h += ' src="images/hand-arrow-bottom0.png" ';
h += ' />';
addToM(h);
}
}
function launchHandArrowAnim(id,step,nam){
var obj=CObjets[id];
var timeH=200;
var xP=0.1;
var yP=0.45;
var sid=".bloc" + id +",.alterbloc" + id;
var imgF="images/hand-arrow-" + nam + "0.png";
if(step==0){
actualObjHW=id;
xP=0.1;
timeH=500;
$(sid).css({opacity : 0});
$(sid).css("margin-top", "0px");
}
if(step==1){
xP=0.5;
$(sid).css({opacity : 1});
imgF="images/hand-arrow-" + nam + "0.png";
}
if(step==2){
xP=0.95;
imgF="images/hand-arrow-" + nam + "1.png";
}
if(step==3){
xP=0.6;
yP=0.05;
imgF="images/hand-arrow-" + nam + "2.png";
}
if(step==4){
xP=0.95;
imgF="images/hand-arrow-" + nam + "2.png";
}
if(step==5){
xP=0.6;
yP=0.95;
imgF="images/hand-arrow-" + nam + "3.png";
}
if(step==6){
if(actualObjHW==id){
setTimeout(function(){
exitWHdec(id);
},500);
}
return false;
}
if(actualObjHW==id){
if(nam=="bottom"){
var mx=xP;
xP=yP;
yP=mx;
}
var xObj=parseInt(obj.getX() + ((obj.getW())*xP)) * zoom;
var yObj=parseInt(obj.getY() + ((obj.getH())*yP)) * zoom;
addHandWritingImg();
$("#handpencil").css("margin-top", "-100px");
$("#handpencil").animate({
"left" : parseInt(xObj) + "px",
"top"  : parseInt(yObj) + "px"
},
timeH,
function(){
$(sid).css({opacity:1});
$(".bloc" + id).attr("src",imgF);
launchHandArrowAnim(id,step+1,nam);
}
);
}else{
$(".bloc" + id).attr("src","images/hand-arrow-" + nam + "3.png");
}
}
function addHandWritingImg(){
if(!document.getElementById("handpencil")){
var h="<img id='handpencil' ";
h=h + "style='position:absolute;left:1500px;top:1500px;width:750px,height:750px;z-index:4;' ";
h=h + "src='images/hand-cartoon.png' />";
$('#main').append(h);
}
}
function launchHandWritingCircle(id){
var obj=CObjets[id];
actualObjHW=id;
var xObj=parseInt(obj.getX() + ((obj.getW()/2)*0.2)) * zoom;
var yObj=parseInt(obj.getY() + ((obj.getH()/2)*0.9)) * zoom;
addHandWritingImg();
var sid=".bloc" + id +",.alterbloc" + id;
$(sid).css({opacity : 0});
$(sid).css("margin-top", "0px");
$("#handpencil").css("margin-top", "-100px");
$("#handpencil").animate({
"left" : parseInt(xObj) + "px",
"top"  : parseInt(yObj) + "px"
},300,
function(){
launchHandWritingCircleS2(id);
}
);
}
function launchHandWritingCircleS2(id){
var obj=CObjets[id];
var xObj=parseInt(obj.getX() + ((obj.getW()/2)*0.85)) * zoom;
var yObj=parseInt(obj.getY() + ((obj.getH()/2)*0.1)) * zoom;
var sid=".bloc" + id +",.alterbloc" + id;
if(actualObjHW==id){
$("#handpencil").animate({
"left" : parseInt(xObj) + "px",
"top"  : parseInt(yObj) + "px"
},
200,
function(){
$(sid).css({opacity:1});
launchHandWritingCircleS3(id);
}
);
}else{
$(".bloc" + id).attr("src","images/hand-circle4.png");
}
}
function launchHandWritingCircleS3(id){
var obj=CObjets[id];
var xObj=parseInt(obj.getX() + ((obj.getW())*0.90)) * zoom;
var yObj=parseInt(obj.getY() + ((obj.getH()/2)*0.6)) * zoom;
if(actualObjHW==id){
$("#handpencil").animate({
"left" : parseInt(xObj) + "px",
"top"  : parseInt(yObj) + "px"
},
200,
function(){
$(".bloc" + id).attr("src","images/hand-circle1.png");
launchHandWritingCircleS4(id);
}
);
}else{
$(".bloc" + id).attr("src","images/hand-circle4.png");
}
}
function launchHandWritingCircleS4(id){
var obj=CObjets[id];
var xObj=parseInt(obj.getX() + ((obj.getW())*0.75)) * zoom;
var yObj=parseInt(obj.getY() + ((obj.getH())*0.82)) * zoom;
if(actualObjHW==id){
$("#handpencil").animate({
"left" : parseInt(xObj) + "px",
"top"  : parseInt(yObj) + "px"
},
200,
function(){
$(".bloc" + id).attr("src","images/hand-circle2.png");
launchHandWritingCircleS5(id);
}
);
}else{
$(".bloc" + id).attr("src","images/hand-circle4.png");
}
}
function launchHandWritingCircleS5(id){
var obj=CObjets[id];
var xObj=parseInt(obj.getX() + ((obj.getW())*0.16)) * zoom;
var yObj=parseInt(obj.getY() + ((obj.getH())*0.75)) * zoom;
if(actualObjHW==id){
$("#handpencil").animate({
"left" : parseInt(xObj) + "px",
"top"  : parseInt(yObj) + "px"
},
200,
function(){
$(".bloc" + id).attr("src","images/hand-circle3.png");
launchHandWritingCircleS6(id);
}
);
}else{
$(".bloc" + id).attr("src","images/hand-circle4.png");
}
}
function launchHandWritingCircleS6(id){
var obj=CObjets[id];
var xObj=parseInt(obj.getX() + ((obj.getW())*0.16)) * zoom;
var yObj=parseInt(obj.getY() + ((obj.getH())*0.17)) * zoom;
if(actualObjHW==id){
$("#handpencil").animate({
"left" : parseInt(xObj) + "px",
"top"  : parseInt(yObj) + "px"
},
200,
function(){
$(".bloc" + id).attr("src","images/hand-circle4.png");
var cyObj=parseInt((obj.getY() + (obj.getH()/2)) * zoom);
$("#handpencil").animate({
"top"  : cyObj + "px"
},
300,
function(){
if(actualObjHW==id){
setTimeout(function(){
exitWHdec(id);
},500);
}
});
}
);
}else{
$(".bloc" + id).attr("src","images/hand-circle4.png");
}
}
function exitWHdec(id){
if(actualObjHW==id){
window.clearTimeout(timeoutHW);
timeoutHW=window.setTimeout(exitWH,300);
}
}
var ObjDrag=-1;
var EcranDrag ;
var EcranDragX;
var EcranDragY;
var attentePlace=0;
function installdragdrop(obj){
if(obj.type=='drag'||obj.type=='dragslide'){
obj.objx=obj.getX();
obj.objy=obj.getY();
}
recupDataObjectMem(obj,lastPage0);
var h='';
var act='';
if(obj.url!=''){
if(obj.url.indexOf("link:")!=-1){
var ur=obj.url.replace('link:','');
act=' onClick="window.location.href=\'' + ur + '\';return false;" ';
}else{
act=' onclick="loaddata(\'' + obj.url + '\',\'' + obj.data + '\');" ';
}
}
var color="black";
if(obj.color){
color=obj.color;
}
var align="center";
if(obj.align){
align=obj.align;
}
var cssPlus="";
if(obj.css){
cssPlus=obj.css;
}
var Ecran=document.getElementById("main");
var cursorA='cursor:move;';
if(forkDragDrop==1||exceptionForkDragDrop){
cursorA='cursor:pointer;';
}
if(obj.type=='dragslide'){
slideDragLoadImage(obj);
}
if(obj.type=='drag'||obj.type=='dragslide'){
var event='';
if(obj.idscript=='ludiscapelinks'){
var decx=parseInt(parseInt(obj.getW() * zoom)/2);
var decy=parseInt(parseInt(obj.getH() * zoom)/2);
var ox=parseInt(obj.getX() * zoom) + decx;
var oy=parseInt(obj.getY() * zoom) + decy;
var lx=parseInt(obj.objx * zoom) + decx;
var ly=parseInt(obj.objy * zoom) + decy;
drawLineCSS('linenormals' + obj.id,lx,ly,ox,oy);
}
if(forkDragDrop==1||exceptionForkDragDrop){
event =event + ' onClick="onStartDragFork(' + obj.id + ');" ';
}else{
event =event + ' onMouseDown="onStartDrag(' + obj.id + ');" ';
event =event + ' onMouseUp="onEndDrag();" onMouseMove="moveDrag();" ';
event =event + ' dragend="onEndDragFirefox();" ';
}
var drgevent=' draggable="true"  ';
if(navigator.userAgent.toUpperCase().indexOf("CHROME") != -1){
drgevent=' draggable="false"  ';
}
if(navigator.userAgent.toUpperCase().indexOf("SAFARI") != -1){
drgevent=' draggable="false"  ';
}
if(isSurface()){
drgevent=' draggable="false"  ';
}
if(navigator.userAgent.toUpperCase().indexOf("TRIDENT/7.0") != -1){
drgevent=' draggable="false"  ';
}
h='<div ' + drgevent + ' ' + event + ' ';
h=h + ' style="z-index:10;border:solid 0px green;';
h=h +  cursorA + 'position:absolute;';
h=h + 'background:url(\'fx/transparent.png\');" ';
h=h + ' id="imgbloc' + obj.id + '" class="unselectable imgblocdrag" ';
h=h + ' ></div>';
if(obj.src==''){
h=h + '<table style="' + cursorA + 'display:none;color:' + color + ';" ';
h=h + ' id="table' + obj.id + '" class="unselectable bloc' + obj.id + ' ' +  obj.idscript + '" ';
h=h + ' >';
h=h + '<tr>';
h=h + '<td id="innerbloc' + obj.id + '" class="' +  obj.idscript + 'inner" style="cursor:move;' + alignByObj(obj) + cssPlus + obj.cssadd + '" >';
h=h + obj.text;
h=h + '</td></tr></table>';
}else{
h=h + '<img draggable="true" style="' + cursorA + 'display:none;color:' + color + ';' + cssPlus + obj.cssadd + '" ';
h=h + event;
h=h + ' id="table' + obj.id + '" class="unselectable bloc' + obj.id + '" ';
h=h + ' src="' + obj.src + '" ';
h=h + ' />';
}
var bilansource='';
if(obj.contenu5!=''){
bilansource=bilansource + '<div class="blockbilan" >';
if(obj.idscript=='ludiscapelinks'){
bilansource=bilansource + '<div class="questbilan" >-prv-Drag &amp; Link</div>';
}else{
bilansource=bilansource + '<div class="questbilan" >-prv-Drag &amp; Drop</div>';
}
bilansource=bilansource + '<ul>';
bilansource=bilansource + obj.contenu5;
bilansource=bilansource + '</ul>';
bilansource=bilansource + '-cmt-';
bilansource=bilansource + '</div>';
}
obj.bilan=bilansource;
Ecran.innerHTML=Ecran.innerHTML + h;
chargeDataObjectMem(obj,lastPage0);
}
if(obj.type=='drop'||obj.type=='bag'){
if(obj.text=='invisible'){
h='<table style="display:none;" ';
h=h + ' id="table' + obj.id + '" class="unselectable bloc' + obj.id + '" ';
h=h + ' ><tr>';
h=h + '<td id="innerbloc' + obj.id + '" >';
h=h + '&nbsp;';
h=h + '</td></tr></table>';
}else{
h='<table style="display:none;color:' + color + ';" ';
h=h + ' id="table' + obj.id + '" class="unselectable bloc' + obj.id + '" ';
h=h + ' ><tr>';
h=h + '<td id="innerbloc' + obj.id + '" style="' + alignByObj(obj) + cssPlus + obj.cssadd + '" class="' +  obj.idscript + 'inner" >';
h=h + obj.text;
h=h + '</td></tr></table>';
}
if(forkDragDrop==1||exceptionForkDragDrop){
if(obj.type=='drop'){
h=h + '<img style="display:none;position:absolute;z-index:4;cursor:pointer;" ';
}
if(obj.type=='bag'){
h=h + '<img style="display:none;position:absolute;z-index:11;cursor:pointer;" ';
}
h=h + ' id="imgtable' + obj.id + '" class="unselectable dropcursor dropcursor' + obj.id + '" ';
if(obj.getW()<65&&obj.getH()<65 ){
h=h + ' src="fx/cursor-minimal.gif" ';
}else{
if(obj.getW()>parseInt(obj.getH() * 3.8)){
h=h + ' src="fx/cursorlarge3.gif" ';
}else{
if(obj.getW()>parseInt(obj.getH() * 2.8)){
h=h + ' src="fx/cursorlarge2.gif" ';
}else{
if(obj.getW()>parseInt(obj.getH() * 1.8)){
h=h + ' src="fx/cursorlarge.gif" ';
}else{
h=h + ' src="fx/cursor.gif" ';
}
}
}
}
h=h + ' onClick="onEndDragFork(' + obj.id + ',\'' + obj.type + '\');" ';
h=h + ' />';
}
Ecran.innerHTML=Ecran.innerHTML + h;
chargeDataObjectMem(obj,lastPage0);
}
}
function appliqueDragObj(obj){
var fctEm=obj.type.replace('plugin-','');
fctEm= fctEm + 'OnEndMove';
if(typeof window[fctEm]  == 'function'){
fctEm=fctEm +'(CObjets[' + obj.id + ']);'
}else{fctEm='';}
var Ecran=document.getElementById("main");
var event='';
var cursorA='cursor:move;';
if(forkDragDrop==1||exceptionForkDragDrop){
cursorA='cursor:pointer;';
}
if(forkDragDrop==1||exceptionForkDragDrop){
event =event + ' onClick="onStartDragFork(' + obj.id + ');" ';
event =event + ' ontouchstart="onStartDragFork(' + obj.id + ');" ';
}else{
event =event + ' onMouseDown="onStartDrag(' + obj.id + ');" ';
event =event + ' onMouseUp="onEndDrag();' + fctEm + '" onMouseMove="moveDrag();" ';
event =event + ' dragend="onEndDragFirefox();" ';
event =event + ' ontouchstart="onStartDrag(' + obj.id + ');" ';
event =event + ' ontouchend="onEndDrag();' + fctEm + '" ontouchmove="moveDrag();" ';
}
var drgevent=' draggable="true" ';
if(navigator.userAgent.toUpperCase().indexOf("CHROME") != -1){
drgevent=' draggable="false"  ';
}
if(navigator.userAgent.toUpperCase().indexOf("SAFARI") != -1){
drgevent=' draggable="false"  ';
}
if(isSurface()){
drgevent=' draggable="false"  ';
}
var h='';
h='<div ' + drgevent + ' ' + event + ' ';
h += ' style="z-index:10;border:solid 0px green;';
h +=  cursorA + 'position:absolute;';
h += 'background:url(\'fx/transparent.png\');" ';
h += ' id="imgbloc' + obj.id + '" class="unselectable imgblocdrag" ';
h += ' ></div>';
Ecran.innerHTML=Ecran.innerHTML + h;
}
function zoomDrag(obj){
if(obj.onmove!=1){
var xb=parseInt(obj.getX() * zoom) - 5;
var yb=parseInt(obj.getY() * zoom) - 5;
var wb=parseInt(obj.getW() * zoom) + 10 ;
var hb=parseInt(obj.getH() * zoom) + 10 ;
$("#imgbloc" + obj.id).css("width",wb + 'px').css("height",hb + 'px');
$("#imgbloc" + obj.id).css("left",xb + 'px').css("top",yb + 'px');
}
}
function onStartDrag(i){
EcranDrag=document.getElementById("main");
EcranDragX= EcranDrag.offsetLeft;
EcranDragY= EcranDrag.offsetTop;
if(ObjDrag==-1){
ObjDrag=i;
CObjets[i].onmove=1;
if(CObjets[i].contenu6!=''&&globalSound==1){
playSoundOne('images/' + CObjets[i].contenu6,'');
}
if(CObjets[i].option4=='1'){
var scdd=CObjets[i].extracont;
eval(scdd);
}
}
return true;
}
function onStartDragFork(i){
if(ViewerAfterBilan){return false;}
EcranDrag=document.getElementById("main");
if(ObjDrag==-1){
i=parseInt(i);
if(isPlacedDrag(i)){
CObjets[i].setX(parseInt(CObjets[i].objx));
CObjets[i].setY(parseInt(CObjets[i].objy));
attentePlace=0;
var nx=CObjets[i].getX();
var ny=CObjets[i].getY();
if(document.getElementById('table' + i)){
document.getElementById('table' + i).style.left=parseInt(nx * zoom) + 'px';
document.getElementById('table' + i).style.top=parseInt(ny * zoom) + 'px';
}
if(document.getElementById('imgbloc' + i)){
document.getElementById('imgbloc' + i).style.left=parseInt(nx * zoom) + 'px';
document.getElementById('imgbloc' + i).style.top=parseInt(ny * zoom) + 'px';
}
ObjDrag=-1;
attentePlace=0;
$(".dropcursor").css("display","none");
}else{
ObjDrag=parseInt(i);
attentePlace=1;
$(".dropcursor").fadeIn();
}
}
return true;
}
function isPlacedDrag(j){
if(ViewerAfterBilan){return false;}
var nx=CObjets[j].getX();
var ny=CObjets[j].getY();
var nw=CObjets[j].getW();
var nh=CObjets[j].getH();
var dejaplace=false;
for(var i=0; i < CObjets_count; i++){
CObjets[i].show_element();
if(CObjets[i].type=='drop'||CObjets[i].type=='bag'){
if(parseInt(CObjets[i].getX())==parseInt(nx)){
if(parseInt(CObjets[i].getY())==parseInt(ny)){
dejaplace=true;
}
}
if(parseInt(CObjets[i].getX())==parseInt(nx)){
if(parseInt(ny)>parseInt(CObjets[i].getY())){
var th=parseInt(parseInt(CObjets[i].getY())+parseInt(CObjets[i].getH()));
if(parseInt(ny)<th){
dejaplace=true;
}
}
}
}
}
return dejaplace;
}
function isPlacedOnAnother(j){
if(ViewerAfterBilan){return false;}
var nx=CObjets[j].getX();
var ny=CObjets[j].getY();
var dejaplace=false;
for(var i=0; i < CObjets_count; i++){
if(j!=i){
if(CObjets[i].type=='drag'){
if(parseInt(CObjets[i].getX())==parseInt(nx)){
if(parseInt(CObjets[i].getY())==parseInt(ny)){
dejaplace=true;
}
}
}
}
}
return dejaplace;
}
function onEndDragFork(i,type){
if(ViewerAfterBilan){return false;}
eventCatchScript=true;
if(ObjDrag!=-1&&attentePlace==1){
ObjDrag= parseInt(ObjDrag);
var nx=CObjets[i].getX();
var ny=CObjets[i].getY();
CObjets[ObjDrag].setX(nx);
CObjets[ObjDrag].setY(ny);
if(type=='bag'){
if(isPlacedOnAnother(ObjDrag)){
ny=ny + CObjets[ObjDrag].getH();
CObjets[ObjDrag].setY(ny);
}
if(isPlacedOnAnother(ObjDrag)){
ny=ny + CObjets[ObjDrag].getH();
CObjets[ObjDrag].setY(ny);
}
if(isPlacedOnAnother(ObjDrag)){
ny=ny + CObjets[ObjDrag].getH();
CObjets[ObjDrag].setY(ny);
}
if(isPlacedOnAnother(ObjDrag)){
ny=ny + CObjets[ObjDrag].getH();
CObjets[ObjDrag].setY(ny);
}
if(isPlacedOnAnother(ObjDrag)){
ny=ny + CObjets[ObjDrag].getH();
CObjets[ObjDrag].setY(ny);
}
}
if(document.getElementById('table' + ObjDrag)){
document.getElementById('table' + ObjDrag).style.left=parseInt(nx * zoom) + 'px';
document.getElementById('table' + ObjDrag).style.top=parseInt(ny * zoom) + 'px';
}
if(document.getElementById('imgbloc' + ObjDrag)){
document.getElementById('imgbloc' + ObjDrag).style.left=parseInt(nx * zoom) + 'px';
document.getElementById('imgbloc' + ObjDrag).style.top=parseInt(ny * zoom) + 'px';
}
var VobjDrag=CObjets[ObjDrag];
var VobjDrop=CObjets[i];
if(VobjDrop.data!=VobjDrag.data){
if(VobjDrag.option==1){
VobjDrag.setX(parseInt(VobjDrag.objx));
VobjDrag.setY(parseInt(VobjDrag.objy));
var jnx=VobjDrag.getX();
var jny=VobjDrag.getY();
animplaceObj(ObjDrag,jnx,jny);
if(VobjDrag.contenu3!=''&&globalSound==1){
playSoundOne('images/' + VobjDrag.contenu3,'');
}
}else{
chargeDataObjectMem(CObjets[ObjDrag],lastPage0);
}
}else{
chargeDataObjectMem(CObjets[ObjDrag],lastPage0);
}
ObjDrag=-1;
attentePlace=0;
}
$(".dropcursor").css("display","none");
}
function onEndDrag(){
if(ViewerAfterBilan){return false;}
eventCatchScript=true;
if(forkDragDrop==0&&exceptionForkDragDrop==false){
$(".imgblocdrag").css("border","solid 0px green");
nearDrag(ObjDrag);
chargeDataObjectMem(CObjets[ObjDrag],lastPage0);
ObjDrag=-1;
}
}
function onEndDragFirefox(){
if(ViewerAfterBilan){return false;}
eventCatchScript=true;
if(forkDragDrop==0&&exceptionForkDragDrop==false){
$(".imgblocdrag").css("border","solid 0px green");
nearDrag(ObjDrag);
chargeDataObjectMem(CObjets[ObjDrag],lastPage0);
ObjDrag=-1;
}
}
function moveDrag(){
if(ViewerAfterBilan){return false;}
if(forkDragDrop==0&&exceptionForkDragDrop==false){
if(ObjDrag!=-1){
if(EcranDrag){
var i=parseInt(ObjDrag);
var ex=parseInt(xcoord - EcranDragX) - parseInt(parseInt(CObjets[i].getW() * zoom)/2);
if(CObjets[i].type=='dragslide'){
var x1=parseInt(ex / zoom);
var x2=parseInt(CObjets[i].objx);
if(x1 < x2){
ex=(CObjets[i].objx) * zoom;
CObjets[i].setX(CObjets[i].objx);
}
var x3=parseInt(CObjets[i].text);
if(x1 > (x2 + x3)){
ex=(CObjets[i].objx + x3) * zoom;
}
slideDragImage(parseInt(CObjets[i].getX() - x2), x3 , CObjets[i]);
}
if(document.getElementById('table' + i)){
document.getElementById('table' + i).style.left=ex + 'px';
}
if(document.getElementById('bloc' + i)){
document.getElementById('bloc' + i).style.left=ex + 'px';
}
if(document.getElementById('imgbloc' + i)){
document.getElementById('imgbloc' + i).style.left=parseInt(ex - 5) + 'px';
}
CObjets[i].setX(parseInt(ex / zoom));
var actiony=true;
if(CObjets[i].type=='dragslide'){actiony=false;}
var ey=0;
if(actiony){
ey=parseInt(ycoord - EcranDragY) - parseInt(parseInt(CObjets[i].getH() * zoom)/2);
if(document.getElementById('table' + i)){
document.getElementById('table' + i).style.top=ey + 'px';
}
if(document.getElementById('bloc' + i)){
document.getElementById('bloc' + i).style.top=ey + 'px';
}
if(document.getElementById('imgbloc' + i)){
document.getElementById('imgbloc' + i).style.top=parseInt(ey - 5) + 'px';
}
CObjets[i].setY(parseInt(ey / zoom));
}
if(CObjets[i].idscript=='ludiscapelinks'){
var decx=parseInt(parseInt(CObjets[i].getW() * zoom)/2);
var decy=parseInt(parseInt(CObjets[i].getH() * zoom)/2);
var lx=parseInt(CObjets[i].objx * zoom) + decx;
var ly=parseInt(CObjets[i].objy * zoom) + decy;
drawLineCSS('linenormals' + i,lx,ly,ex+ decx,ey+ decy);
}
}
}
}
}
function nearDrag(j){
try{
if(ViewerAfterBilan){return false;}
var objDrag=CObjets[j];
if(objDrag){
var ctrx=parseInt(objDrag.getX() + (objDrag.getW()/ 2));
var ctry=parseInt(objDrag.getY() + (objDrag.getH()/ 2));
for(var i=0; i < CObjets_count; i++){
if(CObjets[i].type=='drop'||CObjets[i].type=='bag'){
var r=0;
if(ctrx>parseInt(CObjets[i].getX())){
r=r + 1;
}
if(ctry>parseInt(CObjets[i].getY())){
r=r + 1;
}
if(ctrx<parseInt(CObjets[i].getX() + CObjets[i].getW())){
r=r + 1;
}
if(ctry<parseInt(CObjets[i].getY() + CObjets[i].getH())){
r=r + 1;
}
if(r==4){
if(CObjets[i].type=='drop'){
var nx=CObjets[i].getX() + (CObjets[i].getW()/2) - (CObjets[j].getW()/2);
CObjets[j].setX(nx);
var ny=CObjets[i].getY() + (CObjets[i].getH()/2) - (CObjets[j].getH()/2);
CObjets[j].setY(ny);
placeObj(j,nx,ny);
if(CObjets[j].idscript=='ludiscapelinks'){
var decx=parseInt(parseInt(CObjets[j].getW() * zoom)/2);
var decy=parseInt(parseInt(CObjets[j].getH() * zoom)/2);
var lx=parseInt(CObjets[j].objx * zoom) + decx;
var ly=parseInt(CObjets[j].objy * zoom) + decy;
drawLineCSS('linenormals' + j,lx,ly,parseInt(nx* zoom)+ decx,parseInt(ny* zoom)+ decy);
}
}else{
if(CObjets[i].getW()<=parseInt(CObjets[j].getW()+10)){
if(CObjets[i].getH()<=parseInt(CObjets[j].getH()+10)){
var nx=CObjets[i].getX() + (CObjets[i].getW() / 2) - (CObjets[j].getW() / 2);
CObjets[j].setX(nx);
var ny=CObjets[i].getY() + (CObjets[i].getH() / 2) - (CObjets[j].getH()/ 2);
CObjets[j].setY(ny);
placeObj(j,nx,ny);
}
}
}
if(CObjets[i].data!=objDrag.data){
if(objDrag.option==1){
CObjets[j].setX(parseInt(CObjets[j].objx));
CObjets[j].setY(parseInt(CObjets[j].objy));
var jnx=CObjets[j].getX();
var jny=CObjets[j].getY();
animplaceObj(j,jnx,jny);
if(objDrag.contenu3!=''&&globalSound==1){
playSoundOne('images/' + objDrag.contenu3,'');
}
}
}else{
if(objDrag.option2==1&&globalSound==1){
if(objDrag.contenu4!=''&&globalSound==1){
playSoundOne('images/' + objDrag.contenu4,'');
}
}
}
}
}
}
}
}catch(err){}
}
function placeObj(j,nx,ny){
if(document.getElementById('table' + j)){
document.getElementById('table' + j).style.left=parseInt(nx * zoom) + 'px';
document.getElementById('table' + j).style.top=parseInt(ny * zoom) + 'px';
}
if(document.getElementById('imgbloc' + j)){
document.getElementById('imgbloc' + j).style.left=parseInt(nx * zoom) + 'px';
document.getElementById('imgbloc' + j).style.top=parseInt(ny * zoom) + 'px';
}
}
function placeObjx(j,nx){
if(document.getElementById('table' + j)){
document.getElementById('table' + j).style.left=parseInt(nx * zoom) + 'px';
}
if(document.getElementById('imgbloc' + j)){
document.getElementById('imgbloc' + j).style.left=parseInt(nx * zoom) + 'px';
}
}
function animplaceObj(j,nx,ny){
var sid='table' + j;
acceptMoveObj=0;
if(document.getElementById(sid)){
$('#' + sid).animate({
left: parseInt(nx * zoom) + 'px',
top: parseInt(ny * zoom) + 'px'
}, 700);
}
sid='imgbloc' + j;
if(document.getElementById(sid)){
$('#' + sid).animate({
left: parseInt(nx * zoom) + 'px',
top: parseInt(ny * zoom) + 'px'
}, 700, function(){
acceptMoveObj=1;
});
}
}
function calculCoord(e){
if( !e ){
if( window.event ){
e=window.event;
}else{
return;
}
}
if( typeof( e.pageX ) == 'number' ){
xcoord=e.pageX;
ycoord=e.pageY;
} else if( typeof( e.clientX ) == 'number' ){
xcoord=e.clientX;
ycoord=e.clientY;
var badOldBrowser=( window.navigator.userAgent.indexOf( 'Opera' ) + 1 ) ||//**
( window.ScriptEngine && ScriptEngine().indexOf( 'InScript' ) + 1 ) ||//**
( navigator.vendor == 'KDE' );//**
if( !badOldBrowser ){//**
if( document.body && ( document.body.scrollLeft || document.body.scrollTop ) ){//**
xcoord += document.body.scrollLeft;
ycoord += document.body.scrollTop;
} else if( document.documentElement && ( document.documentElement.scrollLeft || document.documentElement.scrollTop ) ){//**
xcoord += document.documentElement.scrollLeft;//**
ycoord += document.documentElement.scrollTop;//**
}
}
}else{
return;
}
}
function slideDragImage(x,max,obj){
if(obj.contenu4!=''){
var parsedText=[];
parsedText=obj.contenu4.split(";");
var lgt=parseInt(parsedText.length);
if(lgt>3){
lgt=parseInt(lgt -1);
}
var portion=parseInt(max / lgt);
var r=parseInt(x/portion);
var nh=parsedText[r];
if(typeof(nh) == 'undefined'){nh= "";}
if(nh!=""){
$('.' + obj.contenu3).attr("src","images/" + nh );
}
}
}
function slideDragLoadImage(obj){
if(obj.contenu4!=''){
var parsedText=[];
parsedText=obj.contenu4.split(";");
var lgt=parseInt(parsedText.length);
for(var e=0 ; e < parsedText.length; e++){
var reponse=parsedText[e];
var wh=4;
if(reponse.indexOf(".jpg")!=-1
||reponse.indexOf(".png")!=-1
||reponse.indexOf(".gif")!=-1
||reponse.indexOf(".jpeg")!=-1){
if(isFixedFrame()){}else{
$('body').append("<img class='previmg' src='images/" + reponse + "' style='position:absolute;right:0px;bottom:0px;width:" + wh + "px;height:" + wh + "px;' />" );
}
}
}
}
}
function createLineElement(id,x,y,length,angle){
var line=document.createElement("div");
var i=parseInt(id.replace('linenormals',''));
if(document.getElementById(id)){
line=document.getElementById(id);
}else{
line.setAttribute('id', id);
document.getElementById('main').appendChild(line);
}
var styles='border: 2px solid ' + getColorLineLcm(i) + '; '
+ 'width: ' + length + 'px; '
+ 'height: 0px; '
+ '-moz-transform: rotate(' + angle + 'rad); '
+ '-webkit-transform: rotate(' + angle + 'rad); '
+ '-o-transform: rotate(' + angle + 'rad); '
+ '-ms-transform: rotate(' + angle + 'rad); '
+ 'position: absolute; '
+ 'z-index:2;'
+ 'top: ' + y + 'px; '
+ 'left: ' + x + 'px; ';
line.setAttribute('style', styles);
}
function createLine(id, x1, y1, x2, y2){
var a=x1 - x2,
b=y1 - y2,
c=Math.sqrt(a * a + b * b);
var sx=(x1 + x2) / 2,
sy=(y1 + y2) / 2;
var x=sx - c / 2,
y=sy;
var alpha=Math.PI - Math.atan2(-b, a);
createLineElement(id, x, y, c, alpha);
}
function drawLineCSS(id, x1, y1, x2, y2){
createLine(id, x1, y1, x2, y2);
}
function getColorLineLcm(i){
var col='#04B486';
if(i==0||i==14||i==28){col='#04B45F';}
if(i==1||i==15||i==29){col='#819FF7';}
if(i==2||i==16||i==30){col='#5882FA';}
if(i==3||i==17||i==31){col='#CC2EFA';}
if(i==4||i==18||i==32){col='#8181F7';}
if(i==5||i==19||i==33){col='#088A68';}
if(i==6||i==20||i==34){col='#088A4B';}
if(i==7||i==21||i==35){col='#BF00FF';}
if(i==8||i==22||i==36){col='#8258FA';}
if(i==9||i==23||i==37){col='#4B8A08';}
if(i==10||i==24||i==38){col= '#045FB4';}
if(i==11||i==25||i==39){col= '#A901DB';}
if(i==12||i==26||i==40){col= '#0174DF';}
if(i==13||i==27||i==41){col= '#088A29';}
return col;
}
function createLineElementRed(id,x,y,length,angle){
var line=document.createElement("div");
if(document.getElementById(id)){
line=document.getElementById(id);
}else{
line.setAttribute('id', id);
document.getElementById('main').appendChild(line);
}
var styles='border: 2px solid #FA5858; '
+ 'width: ' + length + 'px; '
+ 'height: 0px; '
+ '-moz-transform: rotate(' + angle + 'rad); '
+ '-webkit-transform: rotate(' + angle + 'rad); '
+ '-o-transform: rotate(' + angle + 'rad); '
+ '-ms-transform: rotate(' + angle + 'rad); '
+ 'position: absolute; '
+ 'top: ' + y + 'px; '
+ 'left: ' + x + 'px; ';
line.setAttribute('style', styles);
}
function createLineRed(id, x1, y1, x2, y2){
var a=x1 - x2,
b=y1 - y2,
c=Math.sqrt(a * a + b * b);
var sx=(x1 + x2) / 2,
sy=(y1 + y2) / 2;
var x=sx - c / 2,
y=sy;
var alpha=Math.PI - Math.atan2(-b, a);
createLineElementRed(id, x, y, c, alpha);
}
function drawLineCSSRed(id, x1, y1, x2, y2){
createLineRed(id, x1, y1, x2, y2);
}
var LastStartX=0;
var LastStartY=0;
var dragdropTX=0;
var dragdropTY=0;
var TouchStartX=0;
var TouchStartY=0;
var TouchisMoving=false;
var TouchSlide=false;
var switchTabletNav=false;
var ObjTouchDrag=-1;
var TouchDistant=0;
function AbsTouchStart(){
var Ecran=document.getElementById("main");
TouchStartX=LastStartX - Ecran.offsetLeft;
TouchStartY=LastStartY - Ecran.offsetTop;
TouchStartX=parseInt(TouchStartX / zoom);
TouchStartY=parseInt(TouchStartY / zoom);
var Vobj=returnDragObject(TouchStartX,TouchStartY);
ObjTouchDrag=Vobj.id;
}
function AbsTouchMove(){
if(ObjTouchDrag==-1){
var Ecran=document.getElementById("main");
var TouchStartX2=dragdropTX - Ecran.offsetLeft;
var TouchStartY2=dragdropTY - Ecran.offsetTop;
TouchStartX2=parseInt(TouchStartX2 / zoom);
TouchStartY2=parseInt(TouchStartY2 / zoom);
var Vobj=returnDragObject(TouchStartX,TouchStartY);
ObjTouchDrag=Vobj.id;
if(ObjTouchDrag!=-1){
TouchDistant=TouchDistant + 1;
}
}
var Ecran=document.getElementById("main");
if(onslidepage(TouchStartX,TouchStartY)){
if(TouchSlide==false){
var sobj=findSlidePage();
if(sobj.id!=-1){
TouchSlide=true;
if(dragdropTX>LastStartX){
slideMoveLeft(sobj.id);
}
if(dragdropTX<LastStartX){
slideMoveRight(sobj.id);
}
cancelTouch();
}
}
}else{
if(switchTabletNav){
if(ObjTouchDrag==-1){
var ecartx=10;
if(dragdropTX<LastStartX-4){
if(TouchDistant<1){
ProcessNextPageAction(parseInt(largEcranWidth/2),largEcranWidth);
TouchDistant=ecartx;
}else{
if(TouchDistant>ecartx){TouchDistant=ecartx;}
if(TouchDistant>0){TouchDistant=TouchDistant - 1;}
}
}
if(dragdropTX>LastStartX+4){
if(TouchDistant<1){
ProcessNextPageAction(0,parseInt(largEcranWidth/2));
TouchDistant=ecartx;
}else{
if(TouchDistant>ecartx){TouchDistant=ecartx;}
if(TouchDistant>0){TouchDistant=TouchDistant - 1;}
}
}
}
}
}
if(ObjTouchDrag!=-1){
TouchDistant=TouchDistant + 1;
var ex=parseInt(dragdropTX - Ecran.offsetLeft) - parseInt(parseInt(CObjets[ObjTouchDrag].getW() * zoom)/2);
var ey=parseInt(dragdropTY - Ecran.offsetTop) - parseInt(parseInt(CObjets[ObjTouchDrag].getH() * zoom)/2);
if(CObjets[ObjTouchDrag].type=='dragslide'){
var x1=parseInt(ex / zoom);
var x2=parseInt(CObjets[ObjTouchDrag].objx);
if(x1<x2){
ex=(CObjets[ObjTouchDrag].objx) * zoom;
CObjets[ObjTouchDrag].setX(CObjets[ObjTouchDrag].objx);
}
var x3=parseInt(CObjets[ObjTouchDrag].text);
if(x1 > (x2 + x3)){
ex=(CObjets[ObjTouchDrag].objx + x3) * zoom;
}
slideDragImage(parseInt(CObjets[ObjTouchDrag].getX() - x2), x3 , CObjets[ObjTouchDrag]);
}
document.getElementById('table' + ObjTouchDrag).style.left=ex + 'px';
$("#imgbloc" + ObjTouchDrag).css("left",parseInt(ex - 5) + 'px');
CObjets[ObjTouchDrag].setX(ex/zoom);
if(CObjets[ObjTouchDrag].type=='drag'){
document.getElementById('table' + ObjTouchDrag).style.top=ey + 'px';
CObjets[ObjTouchDrag].setY(ey/zoom);
$("#imgbloc" + ObjTouchDrag).css("top", parseInt(ey - 5) + 'px');
if(CObjets[ObjTouchDrag].idscript=='ludiscapelinks'){
var decx=parseInt(parseInt(CObjets[ObjTouchDrag].getW() * zoom)/2);
var decy=parseInt(parseInt(CObjets[ObjTouchDrag].getH() * zoom)/2);
var lx=parseInt(CObjets[ObjTouchDrag].objx * zoom) + decx;
var ly=parseInt(CObjets[ObjTouchDrag].objy * zoom) + decy;
drawLineCSS('linenormals' + ObjTouchDrag,lx,ly,ex+ decx,ey+ decy);
}
}
}
}
function AbsTouchEnd(){
nearDrag(ObjTouchDrag);
if(ObjTouchDrag!=-1){
chargeDataObjectMem(CObjets[ObjTouchDrag],lastPage0);
}
ObjTouchDrag=-1;
TouchSlide=false;
}
if('ontouchstart' in document.documentElement){
document.body.addEventListener('touchstart', function(e){
LastStartX=e.touches[0].pageX;
LastStartY=e.touches[0].pageY;
AbsTouchStart();
if(ObjTouchDrag!=-1){
e.preventDefault();
return false;
}
});
document.body.addEventListener('touchmove', function(e){
dragdropTX=e.touches[0].pageX ;
dragdropTY=e.touches[0].pageY ;
AbsTouchMove();
if(ObjTouchDrag!=-1){
e.preventDefault();
}else{
if(switchTabletNav){
e.preventDefault();
}
}
if(onslidepage(TouchStartX,TouchStartY)){
e.preventDefault();
}
});
document.body.addEventListener('touchend', function(e){
AbsTouchEnd();
});
}
function cancelTouch(){
TouchStartX=null;
TouchisMoving=false;
ObjTouchDrag=-1;
}
function isDragEcran(){
for(var i=0; i < CObjets_count; i++){
if(CObjets[i].type=='drag'||CObjets[i].type=='dragslide'){
return true;
}
}
return false;
}
function returnDragObject(ctrx,ctry){
for(var i=0; i < CObjets_count; i++){
if(CObjets[i].type=='drag'||CObjets[i].type=='dragslide'){
var r=0;
if(ctrx>parseInt(CObjets[i].getX())){
r=r + 1 ;
}
if(ctry>parseInt(CObjets[i].getY())){
r=r + 1 ;
}
if(ctrx<parseInt(CObjets[i].getX() + CObjets[i].getW())){
r=r + 1 ;
}
if(ctry<parseInt(CObjets[i].getY() + CObjets[i].getH())){
r=r + 1 ;
}
if(r==4){
return CObjets[i];
}
}
}
var tempBloc=new CObjet();
tempBloc.id=-1;
return tempBloc;
}
function onslidepage(ctrx,ctry){
for(var i=0; i < CObjets_count; i++){
if(CObjets[i].type=='slidepages'){
var r=0;
if(ctrx>parseInt(CObjets[i].getX())){
r=r + 1 ;
}
if(ctry>parseInt(CObjets[i].getY())){
r=r + 1 ;
}
if(ctrx<parseInt(CObjets[i].getX() + CObjets[i].getW())){
r=r + 1 ;
}
if(ctry<parseInt(CObjets[i].getY() + CObjets[i].getH())){
r=r + 1 ;
}
if(r==4){
return true;
}
}
}
return false;
}
function findSlidePage(){
for(var i=0; i < CObjets_count; i++){
if(CObjets[i].type=='slidepages'){
return CObjets[i];
}
}
var tempBloc=new CObjet();
tempBloc.id=-1;
return tempBloc;
}
function ProcessNextPageAction(bordx,bordxmax){
for(var i=0; i < CObjets_count; i++){
if(CObjets[i].type=='button'){
if(CObjets[i].getX()>bordx&&CObjets[i].getX()<bordxmax){
var ob=CObjets[i];
if(ob.an==1){
if(ob.url!=''){
if(ob.url.indexOf("openPopupLight")!=-1
||ob.url.indexOf("playallsounds")!=-1
||ob.url.indexOf("openSuivi")!=-1
||ob.url.indexOf("loaddata(")!=-1
||ob.url.indexOf("loadDataScreen")!=-1
||ob.url.indexOf("isok")!=-1
||ob.url.indexOf("lastPage")!=-1
||ob.url.indexOf("displayLastPage")!=-1
||ob.url.indexOf("openDialogYNDown")!=-1){
actOnly=ob.url;
}else{
if(ob.url.indexOf("link:")!=-1){
actOnly='javascript:window.open(\'' + ur + '\');';
}else{
actOnly='loaddata(\'' + ob.url + '\',\'' + ob.data + '\');';
}
}
eval(actOnly);
return false;
}
}
}
}
}
}
function rapidlog(mess){
if(!document.getElementById("rapidlog")){
var Ecran=document.getElementById("main");
Ecran.innerHTML=Ecran.innerHTML + '<div id="rapidlog" ><p>' + mess + '</p></div>';
}else{
document.getElementById("rapidlog").innerHTML='<p>' + mess + '</p>';
}
}
var drawingStarted={};
var onPointerMoveS=function(eventObject){
PreventDefaultManipulationAndMouseEvent(eventObject);
eventObject.preventDefault();
dragdropTX=eventObject.clientX;
dragdropTY=eventObject.clientY;
AbsTouchMove();
};
var onPointerDownS=function (eventObject){
LastStartX=eventObject.clientX;
LastStartY=eventObject.clientY;
AbsTouchStart();
};
var onPointerUpS=function (eventObject){
AbsTouchEnd();
};
var onPointerCancelS=function (eventObject){
PreventDefaultManipulationAndMouseEvent(eventObject);
eventObject.preventDefault();
};
function initializeEventSurface(){
if(isSurface()){
var plainCanvas=document.getElementById("main");
/*plainCanvas.addEventListener("MSHoldVisual", function(e){ e.preventDefault(); }, false);
plainCanvas.addEventListener("contextmenu", function(e){ e.preventDefault(); }, false);*/
plainCanvas.addEventListener("pointerdown", onPointerDownS, false);
plainCanvas.addEventListener("pointermove", onPointerMoveS, false);
plainCanvas.addEventListener("pointerup", onPointerUpS, false);
/*plainCanvas.addEventListener("pointerenter", onPointerCancelS, false);
plainCanvas.addEventListener("pointerleave", onPointerCancelS, false);
plainCanvas.addEventListener("pointerover", onPointerCancelS, false);*/
}
}
function DoEvent(eventObject){
if(isSurface()){
PreventDefaultManipulationAndMouseEvent(eventObject);
var evtname=eventObject.type.toLowerCase();
var pointerId=eventObject.pointerId;
if(evtname== "mspointerdown"){
LastStartX=eventObject.pageX;
LastStartY=eventObject.pageY;
AbsTouchStart();
}
else if(evtname== "mspointermove"){
if(drawingStarted[pointerId]){
dragdropTX=eventObject.pageX;
dragdropTY=eventObject.pageY;
AbsTouchMove();
}
}
else if(evtname== "mspointerup"){
AbsTouchEnd();
}
}
}
function PreventDefaultManipulationAndMouseEvent(evtObj){
if(evtObj.preventDefault)
evtObj.preventDefault();
if(evtObj.preventManipulation)
evtObj.preventManipulation();
if(evtObj.preventMouseEvent)
evtObj.preventMouseEvent();
}
var errorsoundglobal=0;
function playallsounds(){
if(globalSound==0&&globalMusic==0){
return false;
}
errorsoundglobal=0;
var useragt=navigator.userAgent.toUpperCase();
var u1='';
var u2='';
var u3='';
var mp3File='';
var boucle=0;
var no_exten='';
if(useragt.indexOf("MSIE") != -1){
no_exten='.ogg';
}
for(var i=0; i < CObjets_count; i++){
if(CObjets[i].type=='son'||CObjets[i].type=='boucle'){
if(CObjets[i].type=='boucle'){boucle=1;}
if(CObjets[i].text.indexOf(".wav")!=-1
||CObjets[i].text.indexOf(".mp3")!=-1
||CObjets[i].text.indexOf(".ogg")!=-1){
if(CObjets[i].text.indexOf(no_exten)==-1||no_exten==''){
if(u1==''){u1=CObjets[i].text;}
else if(u2==''){u2=CObjets[i].text;}
else if(u3==''){u3=CObjets[i].text;}
}
}
if(CObjets[i].text.indexOf(".mp3")!=-1){
mp3File=CObjets[i].text;
}
}
}
if(useragt.indexOf("FIREFOX") != -1||useragt.indexOf("CHROME") != -1||useragt.indexOf("ANDROID") != -1){
if(mp3File!=''){
IPAD_Sound(mp3File,u2,u3,boucle);
return true;
}
}
if(isSurface()){
IPAD_Sound(u1,u2,u3,boucle);
return true;
}
if(useragt.indexOf("MSIE") != -1){
var ifr=0;
if(useragt.indexOf("TRIDENT/6.0")!=-1||useragt.indexOf("TRIDENT/7.0")!=-1){
if(u1.indexOf(".wav")!=-1){
AudioIE10Wav(u1);
ifr=1;
}else{
if(u2.indexOf(".wav")!=-1){
AudioIE10Wav(u2);
ifr=1;
}
}
}
if((u1!=''&&ifr==0)||errorsoundglobal==1){
DHTMLSoundW3C(u1,u2,u3,boucle);
}
return true;
}
if(useragt.indexOf("FIREFOX") != -1||useragt.indexOf("CHROME") != -1){
if(u1!=''){
var lp='';
if(boucle==1){lp='loop';}
FirefoxWav(u1,u2,u3,boucle);
return true;
}
}else{
if(IOS==1){
if(u1!=''){
var lp='';
if(boucle==1){lp='loop';}
IPAD_Sound(u1,u2,u3,boucle);
return true;
}
}
}
if(useragt.indexOf("MSIE") != -1){
IPAD_Sound(mp3File,u2,u3,boucle);
return true;
}
}
function replaySeqSounds(){
if(globalSound==0&&globalMusic==0){
return false;
}
for(var i=0; i < CObjets_count; i++){
var obj=CObjets[i];
if(obj.type=='scriptEvents'){
if(obj.contenu2=='soundlist'){
eventCatchScript=false;
setTimeout('execEventScriptCatch('+obj.id+','+lastPage0+',0);',200);
}
}
}
}
function playSoundOne(u1,u2){
var mp3File='';
if(globalSound==0&&globalMusic==0){
return false;
}
var useragt=navigator.userAgent.toUpperCase();
if(typeof u1 === "undefined"){
u1='';
}
if(typeof u2 === "undefined"){
u2='';
}
if(isSurface()){
IPAD_Sound(u1,u2,u3,boucle);
return true;
}
if(u1.indexOf(".mp3")!=-1){
mp3File=u1;
}
if(useragt.indexOf("FIREFOX") != -1||useragt.indexOf("CHROME") != -1||useragt.indexOf("ANDROID") != -1){
if(mp3File!=''){
IPAD_Sound(mp3File,'','','');
return true;
}
}
if(useragt.indexOf("MSIE") != -1){
var ifr=0;
if(useragt.indexOf("TRIDENT/6.0")!=-1||useragt.indexOf("TRIDENT/7.0")!=-1){
if(u1.indexOf(".wav")!=-1){
AudioIE10Wav(u1);
ifr=1;
}else{
if(u2.indexOf(".wav")!=-1){
AudioIE10Wav(u2);
ifr=1;
}
}
}
if(u1!=''&&ifr==0){
DHTMLSoundW3C(u1,u2,'',0);
}
return true;
}
if(useragt.indexOf("FIREFOX") != -1||useragt.indexOf("CHROME") != -1){
if(u1!=''){
FirefoxWav(u1,u2,'',0);
return true;
}
}else{
if(IOS==1){
if(u1!=''){
IPAD_Sound(u1,u2,'',0);
return true;
}
}
}
}
function StopAllSounds(){
if(document.getElementById("mysoundswf")){
document.getElementById("mysoundswf").innerHTML="" ;
}
if(document.getElementById("dummyspan")){
document.getElementById("dummyspan").innerHTML="";
}
}
function DHTMLSoundW3C(u1,u2,u3,loop){
if(globalSound==0&&globalMusic==0){
return false;
}
var h="<object type=\"audio/x-wav\" height=\"50\" width=\">50\">";
if(u1!=''){
h += "<param name=\"filename\" value='" + u1 + "'>";
}else if(u2!=''){
h += "<param name=\"filename\" value='" + u2 + "'>";
}else if(u3!=''){
h += "<param name=\"filename\" value='" + u3 + "'>";
}
h += "<param name=\"autoplay\" value=\"true\">";
h += "<param name=\"autoStart\" value=\"1\">";
if(loop==1){
h += "<param name='loop' value='true' />";
}
h += "</object> ";
document.getElementById("dummyspan").innerHTML=h;
}
function mp3SpeedAudio(url){
if(globalSound==0&&globalMusic==0){
return false;
}
var h='<audio id="audio2" type="audio/mpeg" preload="auto" src="' + url + '" autoplay="autoplay"></audio>';
document.getElementById("dummyspan").innerHTML=h;
}
function mp3swf(url){
if(globalSound==0&&globalMusic==0){
return false;
}
var fil=url.lastIndexOf('/');
var fic=url.substring(fil + 1);
var h='<object type="application/x-shockwave-flash" data="images/player_mp3_mini.swf" width="2" height="2">';
h += '<param name="movie" value="images/player_mp3_mini.swf" />';
h += '<param name="bgcolor" value="#000000" />';
h += '<param name="FlashVars" value="mp3=' + url + '&amp;autoplay=1" />';
h += '</object>';
document.getElementById("dummyspan").innerHTML=h;
document.getElementById("dummyspan").style.display='block';
}
function HTML5_Sound(u1,u2,u3){
if(globalSound==0&&globalMusic==0){
return false;
}
var h="<audio preload='false' controls='controls' >";
if(u1!=''){
h += "<source src='" + u1 + "' >";
}
if(u2!=''){
h += "<source src='" + u2 + "' >";
}
if(u3!=''){
h += "<source src='" + u3 + "' >";
}
h += "</audio> ";
document.getElementById("dummyspan").innerHTML=h;
}
function ogg_Sound(url,loop){
if(globalSound==0&&globalMusic==0){
return false;
}
var h="<audio src='" + url + "' type='audio/ogg' preload='auto' controls='controls' " + loop + "></audio>";
document.getElementById("dummyspan").innerHTML= h;
}
function IPAD_Sound(u1,u2,u3,loop){
if(globalSound==0&&globalMusic==0){
return false;
}
var sndid="mysoundh";
stopAllSound();
if(document.getElementById(sndid)){
var audioElement;
try{
audioElement=document.getElementById(sndid);
audioElement.setAttribute('src', u1);
}catch(err){}
try{
audioElement.pause();
audioElement.currentTime=0;
audioElement.load();
audioElement.play();
}catch(err){}
try{
audioElement.play();
}catch(err){}
}else{
try{
var audioElement=document.createElement('audio');
audioElement.setAttribute('src', u1);
audioElement.setAttribute("id", sndid);
audioElement.setAttribute("style", 'display:none;');
document.body.appendChild(audioElement);
audioElement.play();
idglobalsoundglobal=sndid;
}catch(err){}
}
}
function stopAllSound(){
try{
playAudPGlobal=new Audio();
}catch(err){}
try{
var audio=new Array();
for(i=0; i < audio.length; i++){
audio[i]=document.getElementsByTagName("audio")[i];
if(!audio[i].paused){
audio[i].pause();
audio[i].currentTime=0;
}
}
}catch(err){}
try{
var media=document.getElementsByTagName('audio');
for(i=0; i < media.length; i++){
media[i].stop();
}
}catch(err){}
try{
if(document.getElementById(idglobalsoundglobal)){
var audioG=document.getElementById(idglobalsoundglobal);
if(!audioG.paused){
audioG.pause();
}
}
}catch(err){}
}
function stopSequencesSound(){
try{
for(i=0; i < collAudiosObjects.length; i++){
if(!collAudiosObjects[i].paused){
collAudiosObjects[i].pause();
collAudiosObjects[i].currentTime=0;
}
}
}catch(err){}
}
function soundid(CtrtResult){
CtrtResult=CtrtResult.replace('/','');
CtrtResult=CtrtResult.replace('.','');
CtrtResult=CtrtResult.replace(' ','');
CtrtResult=CtrtResult.replace('/','');
CtrtResult=CtrtResult.replace('.','');
CtrtResult=CtrtResult.replace(' ','');
return CtrtResult.toLowerCase();
}
function iframe_mp3(url){
if(globalSound==0&&globalMusic==0){
return false;
}
var h='<iframe src="' + url + '" ></iframe>';
document.getElementById("dummyspan").innerHTML=h;
}
function AudioIE10(url){
if(globalSound==0&&globalMusic==0){
return false;
}
var audio=document.createElement("audio");
if(audio != null && audio.canPlayType && audio.canPlayType("audio/mp3")){
writeInConsole('AudioIE10 install');
audio.src=url;
audio.preload='auto';
audio.play();
}else{
writeInConsole('Erreur ' + url);
errorsoundglobal=1;
}
}
function AudioIE10Wav(url){
if(globalSound==0&&globalMusic==0){
return false;
}
document.getElementById("dummyspan").innerHTML='<bgsound src="' + url + '" autoplay />';
}
function returnType(u){
if(u.indexOf(".wav")!=-1){
return 'audio/x-wav'
}
if(u.indexOf(".mp3")!=-1){
return 'audio/mpeg'
}
if(u.indexOf(".ogg")!=-1||u.indexOf(".oga")!=-1){
return 'audio/ogg'
}
}
function FirefoxWav(u1,u2,u3,loop){
if(globalSound==0&&globalMusic==0){
return false;
}
var sd='';
if(u1!=''&&u1.indexOf(".wav")!=-1){
sd= u1 ;
}
if(u2!=''&&u2.indexOf(".wav")!=-1){
sd= u2;
}
if(u3!=''&&u3.indexOf(".wav")!=-1){
sd= u3 ;
}
var h='<audio type="audio/wav" src="' + sd + '" controls="true" ';
if(loop==1){
h += ' loop="true" ';
}
h += ' autoplay="true" ></audio>';
document.getElementById("dummyspan").innerHTML=h;
}
function Firefox_Sound(u1,u2,u3,loop){
if(globalSound==0&&globalMusic==0){
return false;
}
var h="";
if(u1!=''&&u1.indexOf(".wav")!=-1){
h="<audio src='" + u1 + "' preload='auto' controls autoplay " + loop + "  ></audio>";
}
if(u2!=''&&u2.indexOf(".wav")!=-1){
h="<audio src='" + u2 + "' preload='auto' controls autoplay  " + loop + " ></audio>";
}
document.getElementById("dummyspan").innerHTML=h;
}
function returnType(u){
if(u.indexOf(".wav")!=-1){
return 'audio/x-wav'
}
if(u.indexOf(".mp3")!=-1){
return 'audio/mpeg'
}
if(u.indexOf(".ogg")!=-1||u.indexOf(".oga")!=-1){
return 'audio/ogg'
}
}
function DHTMLSoundLoopW3C(surl){
if(globalSound==0&&globalMusic==0){
return false;
}
document.getElementById("dummyspan").innerHTML= "<object type=\"audio/x-wav\" height=\"50\" width=\"50\"> <param name=\"filename\" value='" + surl + "'> <param name=\"autoplay\" value=\"true\"> <param name=\"autoStart\" value=\"1\"> </object> ";
}
function DHTMLSound(surl){
if(globalSound==0&&globalMusic==0){
return false;
}
document.getElementById("dummyspan").innerHTML=
"<embed src='"+surl+"' hidden=true autostart=true loop=false >";
}
function DHTMLSoundLoop(surl){
if(globalSound==0&&globalMusic==0){
return false;
}
document.getElementById("dummyspan").innerHTML= "<embed src='"+surl+"' hidden=true autostart=true loop=true >";
}
var collAudiosObjects=new Array();
function lAudio(surl){
if(surl.indexOf('{Variable1}')!=-1){
surl=surl.replace('{Variable1}',Variable1);
}
if(surl.indexOf('{variable1}')!=-1){
surl=surl.replace('{variable1}',variable1);
}
if(surl.indexOf('{Variable2}')!=-1){
surl=surl.replace('{Variable2}',Variable2);
}
if(surl.indexOf('{variable2}')!=-1){
surl=surl.replace('{variable2}',Variable2);
}
if(surl.indexOf('{Variable3}')!=-1){
surl=surl.replace('{Variable3}',Variable3);
}
if(surl.indexOf('{variable3}')!=-1){
surl=surl.replace('{variable3}',Variable3);
}
var lgt=langueextend.toLowerCase();
lgt=lgt.replace('-','');
if(lgt==''){
lgt='en';
}
if(surl.toLowerCase().indexOf('{lg}')!=-1){
surl=surl.replace('{LG}',lgt);
surl=surl.replace('{lg}',lgt);
}
if(globalSound==0&&globalMusic==0){
surl='fx/low.mp3';
}
var audioObj=new Audio(surl);
audioObj.name="sequencesound";
if(globalSound==0&&globalMusic==0){
audioObj.muted=true;
}
audioObj.onerror=function(){
this.src='fx/low.mp3';
this.load();
this.play();
};
collAudiosObjects.push(audioObj);
return audioObj;
}
var playAudPGlobal;
var playAudPGlobalPageId=-1;
function playAudP(audObject){
if(globalSound==0){
audObject.muted=true;
}
playAudPGlobalPageId=LUDI.getNumPage();
var playPromise=audObject.play();
if(playPromise !== undefined){
playPromise.then(function(){}).catch(function(error){
playAudPGlobal=audObject;
if(!document.getElementById("parametreOpacGesture")){
var h='<div id="parametreOpacGesture" onClick="playAudPGLOB();" ></div>';
$("#main").append(h);
}
$("#parametreOpacGesture").css("display","block");
});
}
}
function playAudPGLOB(){
if(playAudPGlobalPageId==LUDI.getNumPage()){
playAudPGlobal.play();
}
$("#parametreOpacGesture").css("display","none");
}
function clAudio(surl){
if(typeof surl === "undefined"){
return "";
}
if(surl.indexOf('data/data/')!=-1){
surl=surl.replace('data/data/','data/');
}
if(surl.indexOf('{Variable1}')!=-1){
surl=surl.replace('{Variable1}',Variable1);
}
if(surl.indexOf('{variable1}')!=-1){
surl=surl.replace('{variable1}',variable1);
}
if(surl.indexOf('{Variable2}')!=-1){
surl=surl.replace('{Variable2}',Variable2);
}
if(surl.indexOf('{variable2}')!=-1){
surl=surl.replace('{variable2}',Variable2);
}
if(surl.indexOf('{Variable3}')!=-1){
surl=surl.replace('{Variable3}',Variable3);
}
if(surl.indexOf('{variable3}')!=-1){
surl=surl.replace('{variable3}',Variable3);
}
var lgt=langueextend.toLowerCase();
lgt=lgt.replace('-','');
if(lgt==''){
lgt='en';
}
if(surl.toLowerCase().indexOf('{lg}')!=-1){
surl=surl.replace('{LG}',lgt);
surl=surl.replace('{lg}',lgt);
}
return surl;
}
var objflux;
function installflux(obj){
var Ecran=document.getElementById("main");
var nbcol=parseInt(obj.data);
var nbrows=parseInt(obj.note);
if(obj.type=='flux'){
var wd='100%';
if(nbrows==1){
wd='300%';
}
var h='<div style="border:solid 0px gray;overflow:hidden;" ';
h=h + ' id="flux' + obj.id + '" class="bloc' + obj.id + '" ';
h=h + ' >';
h=h + '<div id="fluxinner' + obj.id + '" style="border:solid 0px red;width:' + wd + ';height:100%;padding:0;margin:0;" >';
h=h + '</div>';
h=h + '</div>';
h=h + '<div style="border:solid 0px red;background-image:url(\'css/ajax_loader_blue.gif\');background-repeat:no-repeat;background-position: center center;z-index:15;position:absolute;" ';
h=h + ' id="fluxload' + obj.id + '" class="blocload' + obj.id + '" >';
h=h + '</div>';
if(obj.option==true||obj.option==1){
h=h + '<table style="border:solid 0px gray;position:absolute;display:none;" ';
h=h + ' id="fluxnav' + obj.id + '" class="fluxnav' + obj.id + '" ';
h=h + ' ><tr>';
h=h + '<td style="width:36px;" ><img id="1nav' + obj.id + '" onClick="prevpageflux(' + obj.id + ');" style="cursor:pointer;" src="fx/bouton_precedent.png" /></td>';
h=h + '<td><img id="2nav' + obj.id + '" onClick="nextpageflux(' + obj.id + ');" style="cursor:pointer;" src="fx/bouton_suivant.png" /></td>';
h=h + '</tr></table>';
}
if(obj.option2==true||obj.option2==1){
h=h + '<div style="border:solid 0px gray;position:absolute;height:15px;" ';
h=h + ' id="fluxsearch' + obj.id + '" class="fluxsearch' + obj.id + '" ';
h=h + ' >';
h=h + '</div>';
}
obj.activepage=0;
Ecran.innerHTML=Ecran.innerHTML + h;
}
}
function prevpageflux(id){
if(CObjets[id].activepage>0){
CObjets[id].activepage=parseInt(parseInt(CObjets[id].activepage) - 1);
$("#fluxload" + id ).css("display",'block');
$(".fluxbloc" + id).animate({
marginLeft: '1200px'
}, 600, function(){
loadObjetsFlux(CObjets[id],'-1200');
$(".fluxbloc" + id).animate({
marginLeft: '6px'
}, 600);
});
}
}
function nextpageflux(id){
CObjets[id].activepage=parseInt(parseInt(CObjets[id].activepage) + 1);
$("#fluxload" + id ).css("display",'block');
$(".fluxbloc" + id).animate({
marginLeft: '-1200px'
}, 600, function(){
loadObjetsFlux(CObjets[id],1200);
$(".fluxbloc" + id).animate({
marginLeft: '6px'
}, 600);
});
}
function loadObjetsFluxOnChange(id){
CObjets[id].activepage=0;
loadObjetsFlux(CObjets[id],6);
$(".fluxbloc" + id).animate({
marginLeft: '6px'
}, 200);
}
function loadObjetsFlux(obj,ml){
var filtreselect='';
if(document.getElementById("fluxsearch" + obj.id )){
var objlist=document.getElementById("fluxsearch" + obj.id);
if(!document.getElementById("selectflux" + obj.id)){
var lis=getListFlux(obj.id);
objlist.innerHTML=lis;
}else{
if(document.getElementById("selectflux" + obj.id)){
var item2 =	document.getElementById("selectflux" + obj.id).options[document.getElementById("selectflux" + obj.id).selectedIndex].value;
if(item2=='Tout'){
filtreselect='';
}else{
filtreselect=item2;
}
}
}
}
if(CFlux_count==0){
document.getElementById("fluxinner" + obj.id ).innerHTML="Chargement";
}else{
var nbcol=parseInt(obj.data);
var nbrows=parseInt(obj.note);
var nbbypage=parseInt(nbcol * nbrows);
var min_i=parseInt(obj.activepage * nbbypage);
var max_i=parseInt(parseInt(min_i + nbbypage) - 1);
var h="";
var j=0;
var result=0;
for(var i=0; i < CFlux_count; i++){
if(CFluxs[i].categorie==obj.text||obj.text==''||obj.text=='Tout'){
if(obj.src==''||CFluxs[i].tags.indexOf(obj.src)!=-1){
if(filtreselect==''||CFluxs[i].tags.indexOf(filtreselect)!=-1){
if(j>=min_i&&j<=max_i){
var rd=CFluxs[i].renderteaser(obj);
rd=rd.replace("fluxbloc", "fluxbloc" + obj.id);
h=h + rd;
result=result +1;
}
j=j + 1;
}
}
}
}
objflux=obj;
document.getElementById("fluxinner" + obj.id ).innerHTML=h;
$("#fluxnav" + obj.id).stop().fadeIn();
zoomFlux(obj);
$(".fluxbloc" + obj.id).css("margin-Left", ml + 'px');
if(obj.activepage==0){
$("#1nav" + obj.id).stop().fadeOut();
}else{
$("#1nav" + obj.id).fadeIn();
}
if(parseInt(max_i + 1)>=CFlux_count){
$("#2nav" + obj.id).stop().fadeOut();
}else{
$("#2nav" + obj.id).fadeIn();
}
if(parseInt(result)<nbbypage){
$("#2nav" + obj.id).stop().fadeOut();
}
if(result==0&&ml!=-1){
obj.activepage=0;
loadObjetsFlux(obj,-1);
}
endLoadFlux(obj.id);
setTimeout("endLoadFlux('" + obj.id + "')",1000);
setTimeout("endLoadFlux('" + obj.id + "')",2000);
}
}
function endLoadFlux(id){
$(".blocload" + id ).stop().fadeOut();
}
function zoomFlux(obj){
var e_x=parseInt(obj.getX() * zoom);
var e_y=parseInt(obj.getY() * zoom);
var wb=parseInt(obj.getW() * zoom);
var hb=parseInt(obj.getH() * zoom);
$(".blocload" + obj.id).css("top", parseInt(e_y) + 'px').css("left", parseInt(e_x) + 'px');
$(".blocload" + obj.id).css("width", parseInt(wb) + 'px').css("height", parseInt(hb) + 'px');
var sfluxbloc= ".fluxbloc" + obj.id;
var nbcol=parseInt(obj.data);
var new_w=parseInt(wb - (nbcol * 12));
$(sfluxbloc).css("width", parseInt(new_w/ nbcol) + 'px');
var nbrows=parseInt(obj.note);
var new_h=parseInt(hb - (nbrows * 12));
$(sfluxbloc).css("height", parseInt(new_h/ nbrows) + 'px');
$(sfluxbloc).css("margin-left", '6px').css("margin-top", '6px');
$(sfluxbloc).css("float", 'left');
$("#fluxnav" + obj.id).css("top", parseInt(e_y + hb) + 'px');
var leftnav = parseInt( parseInt(e_x) + parseInt(wb) - parseInt(73) );
$("#fluxnav" + obj.id).css("left", leftnav + 'px');
$(".titreflux" ).css("font-size",parseInt((obj.fontsize + 2) * zoom) + 'px');
$(".contenuflux" ).css("font-size",parseInt((obj.fontsize - 1) * zoom) + 'px');
$(".contenufluxfull" ).css("font-size",parseInt((obj.fontsize + 1) * zoom) + 'px');
$("#fluxsearch" + obj.id).css("top", parseInt(parseInt(e_y) - 19) + 'px');
$("#fluxsearch" + obj.id).css("left", parseInt(parseInt(e_x)+ 6) + 'px');
}
function loadFlux(){
var d=new Date();
var n=d.getMinutes();
$.ajax({
type: "GET",
url: 'flux/flux.xml',
dataType: (isMsie()) ? "text" : "xml",
cache:true,
async:false,
success: function(data){
openfluxXML(data);
}
,
error: function(){
data=getstorage(f);
if(data!=''){
openfluxXML(data,f);
}else{
noresp();
}
}
});
}
function CFlux(){
this.id;
this.titre;
this.chapo;
this.contenu;
this.tags;
this.illustration;
this.htmlcode;
this.categorie;
this.ratio;
this.renderteaser=function(obj){//**
var h="<div ";
h=h + ' class="contentflux fluxbloc ' + obj.cssadd + '" ';
h=h + ' style="' + obj.css + '" ';
h=h + ' >';
h=h + '<div class="titreflux" >' + this.titre + '</div>';
h=h + '<div class="contenuflux" >';
h=h + '<img class="mini_img_flux" src="flux/mini_' + this.illustration + '" />';
h=h + '<p>' + this.chapo + '</p>';
h=h + '<p>' + this.contenu + '</p>';
h=h + '</div>';
var classbtn ="css3button";
if(IE8==1||IE9==1){
classbtn ="ie8button";
}
h=h +  '<table style="right:2px;bottom:2px;" ';
h=h + ' class="' + classbtn + '" onclick="openFluxLight(' + this.id + ');" ';
h=h + ' >';
h=h + '<tr><td style="text-align:center;padding-left:1%;padding-right:1%;" >';
h=h + '&nbsp;' + obj.theme + '&nbsp;';
h=h + '</td></tr></table>';
h=h + '</div>';
return h;
}//**
this.renderfull=function(){//**
var h="<div ";
h=h + ' class="contentinner" ';
h=h + ' >';
h=h + '<div class="titreflux" >' + this.titre + '</div>';
h=h + '<div class="contenufluxfull" >';
h=h + '<img class="full_img_flux" ';
h=h + ' src="flux/' + this.illustration + '" />';
h=h + '<p>' + this.chapo + '</p>';
h=h + '<p>' + this.contenu + '</p>';
h=h + '</div>';
if(this.htmlcode!=''){
h=h + this.htmlcode;
}
h=h + '</div>';
return h;
}//**
}
function openFluxLight(id){
$("#lightbox").css("display","block");
$(".innerlightbox").css("top",'45%').css("left",'45%').css("width", '10%').css("height", '10%');
document.getElementById("innerlightbox").innerHTML=CFluxs[id].renderfull();
$(".innerlightbox").animate({
top: '45%',
height: '10%',
width: '90%',
left: '5%'
}, 400, function(){
$( ".contentinner" ).css("font-size",parseInt((objflux.fontsize ) * zoom) + 'px');
$(".titreflux" ).css("font-size",parseInt((objflux.fontsize + 2) * zoom) + 'px');
$(".innerlightbox").animate({
left: '2%',
width: '96%',
height: '94%',
top: '2%'
}, 500);
});
}
function closeFluxLight(){
$("#lightbox").fadeOut();
if(document.getElementById("innerlightbox")){
document.getElementById("innerlightbox").innerHTML="";
}
}
var CFluxs=new Array();
var CFlux_count=0;
function CFluxs_Add(Elem){
Elem.id=CFlux_count;
CFluxs.push(Elem);
CFlux_count=CFlux_count +1;
}
function openfluxXML(data){
if(data==''){
return false;
}
CFluxs=new Array();
CFlux_count=0;
var nbcharge=0;
var xml_p;
if(typeof data == "string"){
xml_p=StringtoXML(data);
}else{
xml_p=data;
}
$(xml_p).find('actus').each(function(){
var tempBloc=new CFlux();
tempBloc.titre=$(this).find('titre').text();
tempBloc.chapo=$(this).find('chapo').text();
tempBloc.contenu=$(this).find('contenuH').text();
tempBloc.illustration=$(this).find('illustration').text();
tempBloc.tags=$(this).find('Tags').text();
tempBloc.htmlcode=$(this).find('htmlcode').text();
tempBloc.categorie=$(this).find('categorie').text();
CFluxs_Add(tempBloc);
nbcharge++;
});
}
function getListFlux(i){
var h="<select id='selectflux" + i + "' onChange='loadObjetsFluxOnChange(" + i + ");' style='font-size:16px;' >";
h=h + '<option>Tout</option>';
var mem='';
for(var i=0; i < CFlux_count; i++){
if(CFluxs[i].tags!=''){
var rd=CFluxs[i].tags;
if(rd.indexOf(',')!=-1){
var tableau=rd.split(',');
for(var j=0; j<tableau.length; j++){
if(mem.indexOf(tableau[j])==-1){
h=h + '<option>' + tableau[j] + '</option>';
mem=mem + ',' + tableau[j];
}
}
}else{
if(mem.indexOf(rd)==-1){
h=h + '<option>' + rd + '</option>';
mem=mem + ',' + rd;
}
}
}
}
h=h + "</select>";
return h;
}
function installgeo(obj){
var Ecran=document.getElementById("main");
if(obj.type=='geoline'){
var h='<img style="display:none;" ';
h += ' id="bloc' + obj.id + '" class="bloc' + obj.id + '" ';
h += ' src="data/' + obj.src + '" ';
h += ' />';
Ecran.innerHTML=Ecran.innerHTML + h;
}
}
var callcolorfond=0;
var imagefondglobal="";
var imagefondLoad="";
function loadFullHdImg(p){
if(isImageC(imagefondglobal)){
imagefondLoad=imagefondglobal;
var imgBack=new Image();
imgBack.id="backimg" + p ;
imgBack.onload=function(){
var pagid="backimg" + lastPage0;
if(this.id==pagid){
appliqueProcessFinal();
memimagepreload=memimagepreload + imagefondLoad + ';';
}
};
imgBack.src=imagefondLoad;
}
}
function appliqueProcessFinal(){
var css3=recupCss3();
if(css3){
$('#colorfond').css("background-image", "url('" + imagefondLoad + "')");
}else{
$('#colorfond').attr("src",imagefondLoad);
}
}
function getColorfond(){
if(mobiSite){
return colorfond2;
}else{
return colorfond;
}
}
function getColorfondSvg(){
if(mobiSite){
return colorfondsvg2;
}else{
return colorfondsvg;
}
}
function appliqueFond(){
if(callcolorfond>4){
return false;
}else{
var Ecran=document.getElementById("main");
callcolorfond=callcolorfond + 1;
var colFd=getColorfond();
if(colFd.indexOf(".jpg")!=-1
||colFd.indexOf(".png")!=-1
||colFd.indexOf(".gif")!=-1
||colFd.indexOf(".svg")!=-1
||colFd.indexOf(".jpeg")!=-1){
if(!document.getElementById("colorfond")){
var h='';
if(Ecran){
if(colFd.indexOf("repeat:")!=-1){
var backfond=colFd.replace('repeat:','');
h='<div style="display:none;opacity:1;position:absolute;z-index:0;';
h += 'left:0px;top:0px;background:url(\'' + backfond + '\') 0 0;" ';
h += ' id="colorfond" class="colorfond" ';
h += ' class="unselectable" unselectable="on" ></div>';
$('#main').css("background-image", "url('" + backfond + "')");
$('#main').css("background-position", "0 0");
imagefondglobal=backfond;
}else{
var finalfond=getColorfond();
if(getColorfond().indexOf("large:")!=-1){
finalfond=getColorfond().replace('large:','');
}
var ctrLoadFd=memimagepreload.indexOf(finalfond);
var css3=recupCss3();
if(css3){
var objMain=$('#main');
var lowImage=finalfond.replace('images/','images/low-').replace('.png','.jpg');
var dolceTrans='<div style="display:block;position:absolute;';
dolceTrans += 'left:0px;top:0px;background-image:url(\'' + lowImage + '\');background-size:100% 100%;';
dolceTrans += 'background-repeat:no-repeat;background-position:0 0;background-color:transparent;" ';
dolceTrans += ' id="dolceTrans" class="dolceTrans" ';
dolceTrans += ' class="unselectable" unselectable="on" ></div>';
if(finalfond.indexOf("fond-white.png")!=-1||ctrLoadFd!=-1){
lowImage=finalfond;
dolceTrans='';
}
if(lastPage0==0){
dolceTrans='';
}
if(dolceTrans!=''){
setTimeout(function(){$("#dolceTrans").css('display','none');},600);
}
h += '<div style="display:none;position:absolute;';
h += 'left:0px;top:0px;background-image:url(\'' + lowImage + '\');background-size:100% 100%;background-repeat:no-repeat;background-position:0 0;background-color:transparent;" ';
h += ' id="colorfond" class="colorfond" ';
h += ' class="unselectable" unselectable="on" >' + dolceTrans + '</div>';
objMain.css("background-image", "url('" + lowImage + "')");
objMain.css("background-position", "0 0");
objMain.css("background-repeat", "no-repeat");
objMain.css("background-size", "100% 100%");
objMain.css("background-color", "#F2F2F2");
imagefondglobal=finalfond;
if(getColorfondSvg()!=''){
if(isSVGcompatible()){
imagefondglobal=getColorfondSvg();
}
}
}else{
var lowImage=finalfond.replace('images/','images/low-').replace('.png','.jpg');
if(finalfond.indexOf("fond-white.png")!=-1||ctrLoadFd!=-1){
lowImage=finalfond;
}
h += '<img style="display:none;position:absolute;left:0px;top:0px;opacity:1;z-index:0;" ';
h += ' id="colorfond" class="colorfond" ';
h += ' src="' + lowImage + '" ';
h += '  class="unselectable" unselectable="on" />';
imagefondglobal=finalfond;
}
if(finalfond.indexOf("fond-white.png")==-1){
if(ctrLoadFd==-1){
var hdPreload='if(lastPage0==' + lastPage0 + '){loadFullHdImg(' + lastPage0 + ');}';
setTimeout(hdPreload,100);
}
}
if(getColorfond().indexOf("fond-white.png")!=-1){
Ecran.style.backgroundColor='white';
}
if(getColorfond().indexOf("large:")!=-1){
installLargeElements();
}else{
$("#larg1").css("display","none");
$("#larg2").css("display","none");
$("#larg3").css("display","none");
$("#larg4").css("display","none");
$("#larg5").css("display","none");
$("#larg6").css("display","none");
$("#larg7").css("display","none");
$("#larg8").css("display","none");
}
}
if(h!=""){
addToM(h);
var fdcol=$("#colorfond,#dolceTrans");
fdcol.css("width", $("#main").width() + 'px');
fdcol.css("height", $("#main").height() + 'px');
}
}
}
$('#colorfond').css("opacity" , "1");
}else{
$('#main').css("background-image", "");
if(Ecran){
if(Ecran.style.backgroundColor!=getColorfond()&&getColorfond()!=""){
try{
Ecran.style.backgroundColor=getColorfond();
}catch(err){
Ecran.style.backgroundColor='#F2F2F2';
}
}
}
}
if(Ecran){
if(!document.getElementById("cadrefond")){
if(cadrefond=='1'||cadrefond==1){
var hc ='<div id="cadrefond" style="z-index:0;border:solid 1px black;position:absolute;" ></div>';
Ecran.innerHTML=Ecran.innerHTML + hc;
var fdcadre=$("#cadrefond");
fdcadre.css("background-Color",cadrecolorfond);
fdcadre.css("border-Color",cadrebordercolorfond);
}
if(headerfond=='1'||headerfond==1){
var hc ='<div id="cadreheader" style="z-index:0;border:solid 1px black;position:absolute;" ></div>';
Ecran.innerHTML=Ecran.innerHTML + hc;
var fdcadre=$("#cadreheader");fdcadre.css("background-Color",headercolorfond);
fdcadre.css("border-Color",headerbordercolorfond);
}
if(footerfond=='1'||footerfond==1){
var hc ='<div id="cadrefooter" style="z-index:0;border:solid 1px black;position:absolute;" ></div>';
Ecran.innerHTML=Ecran.innerHTML + hc;
var fdcadre=$("#cadrefooter");fdcadre.css("background-Color",footercolorfond);
fdcadre.css("border-Color",footerbordercolorfond);
}
dimensionneCadres();
}
}
if(document.getElementById("content")){
var cont=document.getElementById("content");
var objMain= document.getElementById("main");
cont.style.left= objMain.offsetLeft + 'px';
cont.style.top= objMain.offsetTop + 'px';
cont.style.width="1px";
cont.style.height="1px";
}
}
return true;
}
function installLargeElements(){
if(istablet()){
return false;
}
var finalfond=getColorfond().replace('large:','');
var img1=finalfond.replace('/','/LARG1');
if(document.getElementById("larg1")){
var ctr1=document.getElementById("larg1").src;
if(ctr1.indexOf(img1)==-1){
$(".large").css("display","none");
}
}
if(!document.getElementById("larg1")){
var h='<img style="display:none;z-index:0;position:absolute;" ';
h += ' id="larg1" class="larg1 large" ';
h += ' src="' + img1 + '" ';
h += ' />';
$("body").append(h);
}else{
document.getElementById("larg1").src=img1;
}
var img2=finalfond.replace('/','/LARG2');
if(!document.getElementById("larg2")){
var h='<img style="display:none;z-index:0;position:absolute;" ';
h += ' id="larg2" class="larg2 large" ';
h += ' src="' + img2 + '" ';
h += ' />';
$("body").append(h);
}else{
document.getElementById("larg2").src=img2;
}
var img3=finalfond.replace('/','/LARG3');
if(!document.getElementById("larg3")){
var h='<img style="display:none;z-index:0;position:absolute;" ';
h += ' id="larg3" class="larg3 large" ';
h += ' src="' + img3 + '" ';
h += ' />';
$("body").append(h);
}else{
document.getElementById("larg3").src=img3;
}
var img4=finalfond.replace('/','/LARG4');
if(!document.getElementById("larg4")){
var h='<img style="display:none;z-index:0;position:absolute;" ';
h += ' id="larg4" class="larg4 large" ';
h += ' src="' + img4 + '" ';
h += ' />';
$("body").append(h);
}else{
document.getElementById("larg4").src=img4;
}
var img5=finalfond.replace('/','/LARG5');
if(!document.getElementById("larg5")){
var h='<img style="display:none;z-index:0;position:absolute;" ';
h += ' id="larg5" class="larg5 large" ';
h += ' src="' + img5 + '" ';
h += ' />';
$("body").append(h);
}else{
document.getElementById("larg5").src=img5;
}
var img6=finalfond.replace('/','/LARG6');
if(!document.getElementById("larg6")){
var h='<img style="display:none;z-index:0;position:absolute;" ';
h += ' id="larg6" class="larg6 large" ';
h += ' src="' + img6 + '" ';
h += ' />';
$("body").append(h);
}else{
document.getElementById("larg6").src=img6;
}
var img7=finalfond.replace('/','/LARG7');
if(!document.getElementById("larg7")){
var h='<img style="display:none;z-index:0;position:absolute;" ';
h += ' id="larg7" class="larg7 large" ';
h += ' src="' + img7 + '" ';
h += ' />';
$("body").append(h);
}else{
document.getElementById("larg7").src=img7;
}
var img8=finalfond.replace('/','/LARG8');
if(!document.getElementById("larg8")){
var h='<img style="display:none;z-index:0;position:absolute;" ';
h += ' id="larg8" class="larg8 large" ';
h += ' src="' + img8 + '" ';
h += ' />';
$("body").append(h);
}else{
document.getElementById("larg8").src=img8;
}
zoomLargeElements();
$(".large").animate({opacity: 1});
$(".large").fadeIn(1000);
}
function zoomLargeElements(){
if(document.getElementById("larg1")){
var objMain= document.getElementById("main");
var lx= parseInt($("body").width() - (960 *zoom))/2;
var ly= parseInt($("body").height() - (720 *zoom))/2;
var larg1=document.getElementById("larg1");
if(larg1){
larg1.style.left= (lx - (largefondx * zoom)) + 'px';
larg1.style.top = (ly - (largefondy * zoom)) + 'px';
larg1.style.width= (largefondx * zoom) + "px";
larg1.style.height=(largefondy * zoom) + "px";
}
var larg2=document.getElementById("larg2");
if(larg2){
larg2.style.left= (lx - (largefondx * zoom)) + 'px';
larg2.style.top = (ly) + 'px';
larg2.style.width= (largefondx * zoom) + "px";
larg2.style.height=(720 * zoom) + "px";
}
var larg3=document.getElementById("larg3");
if(larg3){
larg3.style.left= (lx - (largefondx * zoom)) + 'px';
larg3.style.top = (ly + (720 * zoom)) + 'px';
larg3.style.width= (largefondx * zoom) + "px";
larg3.style.height=(largefondy * zoom) + "px";
}
var larg4=document.getElementById("larg4");
if(larg4){
larg4.style.left= (lx) + 'px';
larg4.style.top = (ly - (largefondy * zoom)) + 'px';
larg4.style.width= (960 * zoom) + "px";
larg4.style.height=(largefondy * zoom) + "px";
}
var larg5=document.getElementById("larg5");
if(larg5){
larg5.style.left= (lx) + 'px';
larg5.style.top = (ly + (720 * zoom)) + 'px';
larg5.style.width= (960 * zoom) + "px";
larg5.style.height=(largefondy * zoom) + "px";
}
var larg6=document.getElementById("larg6");
if(larg6){
larg6.style.left= (lx + (960 * zoom)) + 'px';
larg6.style.top = (ly - (largefondy * zoom)) + 'px';
larg6.style.width= (largefondx * zoom) + "px";
larg6.style.height=(largefondy * zoom) + "px";
}
var larg7=document.getElementById("larg7");
if(larg7){
larg7.style.left= (lx + (960 * zoom)) + 'px';
larg7.style.top = (ly) + 'px';
larg7.style.width= (largefondx * zoom) + "px";
larg7.style.height=(720 * zoom) + "px";
}
var larg8=document.getElementById("larg8");
if(larg8){
larg8.style.left= (lx + (960 * zoom)) + 'px';
larg8.style.top = (ly + (720 * zoom)) + 'px';
larg8.style.width= (largefondx * zoom) + "px";
larg8.style.height=(largefondy * zoom) + "px";
}
}
}
function fullScreenMain(){
if(fullscreen==false){
if(haveFullScreenNative()){
requestFullScreen(document.body);
}
fullscreen=true;
}else{
if(haveFullScreenNative()){
cancelFullScreen(document.body);}
fullscreen=false;
}
resizeApp();
}
function requestFullScreen(el){
var requestMethod=el.requestFullScreen || el.webkitRequestFullScreen || el.mozRequestFullScreen || el.msRequestFullscreen;
if(requestMethod){
requestMethod.call(el);
}
return false
}
function cancelFullScreen(el){
if(el.cancelFullScreen){
el.cancelFullScreen();
} else if(el.mozCancelFullScreen){
el.mozCancelFullScreen();
} else if(el.webkitCancelFullScreen){
el.webkitCancelFullScreen();
}
return false
}
var orix=0;
var oriy=0;
var N_T=0;
var N_F=0;
var menu_html='';
var menu_global='data/page0.xml';
var menu_load=0
var remarques='';
var MessageFalse='';
var colorfond="";
var colorfondsvg="";
var colorfond2="";
var colorfondsvg2="";
var largefondx="";
var largefondy="";
var cadrefond="";
var cadrefondsvg="";
var cadrecolorfond="";
var cadrebordercolorfond="";
var headerfond="";
var headercolorfond="";
var headerbordercolorfond="";
var footerfond="";
var footercolorfond="";
var footerbordercolorfond="";
var acceptMoveObj=1;
var exceptionForkDragDrop=false;
var scriptdiapo="";
var scriptloop="";
var lastPage1=0;
var lastPage0=0;
var nbpagesD=1;
var tirageunique=0;
var saveprogression=false;
var saveprogressioncheckpoint=false;
var saveprogressionident='';
var scormProcessScore=0;
var attemptProcess=0;
var domainesliste='';
var parametersapp='';
function CObjet(){
var Ecran=document.getElementById("main");
this.x;
this.y;
this.w;
this.h;
this.x2;
this.y2;
this.w2;
this.h2;
this.rx;
this.ry;
this.orix;
this.oriy;
this.realx;
this.objx;
this.objy;
this.rotation;
this.ind;
this.text;
this.initialtext;
this.fontsize;
this.fontsize2;
this.color;
this.align;
this.url;
this.note;
this.negnote;
this.border;
this.css;
this.cssadd;
this.selectcolor;
this.remarque;
this.domaine;
this.contenu2;
this.contenu3;
this.contenu4;
this.contenu5;
this.contenu6;
this.contenu7;
this.contenu8;
this.contentpath;
this.contentpathsecond;
this.extracont;
this.linkcontenu;
this.linkimage;
this.linkx;
this.linky;
this.mymenu;
this.an;
this.de;
this.di;
this.dedi;
this.de2;
this.di2;
this.dedi2;
this.evol;
this.option;
this.option2;
this.option3;
this.option4;
this.option7;
this.out;
this.pp;
this.fctanim;
this.AnimClic;
this.id;
this.idstr;
this.idscript;
this.type;
this.theme;
this.src;
this.create;
this.data;
this.field1;
this.field2;
this.field3;
this.field4;
this.field5;
this.fields;
this.boite;
this.onmove;
this.oldzoom;
this.bilan;
this.bilandisplay;
this.activepage;
this.zoomslide;
this.unLoad=function(){//**
var sid=".bloc" + this.id;
$(sid).css("display","none");
}//**
this.show_element=function(){//**
var decx=parseInt(orix);
if(this.type=='menu'){decx=0;}
if(oriTypeSite=="classic-responsive"){
if(typesite=="mobile"){
if(this.x>480){
this.x=this.orix - 480;
this.y=this.oriy + 720;
}
}else{
this.x=this.orix;
this.y=this.oriy;
}
}
var e_x=parseInt(decx) + parseInt(this.x * zoom);
var e_y=parseInt(this.y * zoom);
var wb=parseInt(this.w * zoom);
var hb=parseInt(this.h * zoom);
if(mobiSite){
e_x=parseInt(decx) + parseInt(this.x2 * zoom);
e_y=parseInt(this.y2 * zoom);
wb=parseInt(this.w2 * zoom);
hb=parseInt(this.h2 * zoom);
}
var posisty="left:" + e_x + ";top:" + e_y + ";width:" + wb + ";height:" + hb + ";";
if(this.an==1){
posisty="";
}
var color="black";
if(this.color){
color=this.color;
}
var align="center";
if(this.align){
align=this.align;
}
var cssPlus="";
if(this.css){
cssPlus=this.css;
}
if(this.create==0){
var h='';
var act='';
var actOnly='';
this.realx=0;
if(this.url!=''){
if(isSpJSFct(this.url)){
if(this.url.indexOf('"')!=-1 ){
act=" onclick='" + this.url + "'";
}else{
act=' onclick="' + this.url + '"';
}
actOnly=this.url;
}else{
if(this.url.indexOf("link:")!=-1){
var ur=this.url.replace('link:','');
act=' onclick="javascript:window.open(\'' ;
act=act + ur + '\');return false;" ';
actOnly='javascript:window.open(\'' + ur + '\');';
}else{
var transDir='';
if(this.x < 100){
transDir='left';
}
if(this.x > 620&&typesite!="mobile"){
transDir='right';
}
act=' onclick="haveANAvigation=true;transitionDirection=\'' ;
act=act + transDir + '\';loaddata(\'' + this.url ;
act=act + '\',\'' + this.data + '\');" ';
actOnly='haveANAvigation=true;loaddata(\'' + this.url + '\',\'' + this.data + '\');';
}
}
}
if(this.url.indexOf("openCorrection(")==-1){
if(this.strscript!=''){
act=act + ' ' +  this.strscript;
actOnly=actOnly +  this.strscript ;
}
}
installgeo(this);
installgame(this);
installherotarget(this);
installslidepages(this);
installludiplan(this);
instalPhysics(this);
installfluxitems(this);
installMapTarget(this);
installPlugins(this);
installVideo(this);
installAudio(this);
installReportWrite(this);
installExamBarre(this);
installSimulBloc(this);
installMotsaRelier(this);
installBoiteTexte(this,act);
installHandProcess(this);
installIsoAvatar(this);
installCarreQuizz(this);
installSpriteObject(this);
if(this.type=='learningcoins'||this.type=='LearningCoins'){
install_learningcoins(this);
}
if(this.type=='showstar'||this.type=='showstarfx'){
installshow(this,posisty);
}
if(this.type=='automenu'){
installmenuauto(this);
}
if(this.type=='ludirpt2'){
installRptGraph(this);
}
if(this.type=='ludidialog'||this.type=='ludidialogrep'){
instalDialog(this);
}
installludi(this);
installfx(this,act);
installflux(this);
installforms(this);
installshareresult(this);
installbilanresult(this);
installconnexion(this);
installqcm(this);
installbutton(this,act,posisty);
installtext(this,act);
installInputNumerique(this);
if(this.type=='img'){
installimg(this,posisty,act);
}
if(this.type=='timer'){
installclock(this,actOnly);
}
if(this.type=='timercompteur'){
installclockcompteur(this,actOnly);
}
if(this.type=='drag'||this.type=='drop'||this.type=='dragslide'||this.type=='bag'){
installdragdrop(this);//responsive
}
if(this.type=='input'){
installInputSimple(this);
haveNoSyntaxInScreen=false;
}
if(this.type=='inputFocus'){
installInputFocus(this);
haveNoSyntaxInScreen=false;
}
if(this.type=='inputsyntaxique'){
installInputTextAreaBloc(this,color);
haveNoSyntaxInScreen=false;
}
if(this.type=='objvariable'){
installobjvariableDico(this);
}
if(this.type=='textarea'){
h='<div style="color:' + color + ';overflow:hidden;border:dotted 1px gray;' + alignByObj(this)  + cssPlus + '" ';
h += ' id="table' + this.id + '" class="bloc' + this.id + '"  >';
h += '<div class="scrollbar" ><div class="track"><div class="thumb"><div class="end"></div></div></div></div>';
h += '<div class="viewport" id="viewport' + this.id + '" ><div id="overview' + this.id + '"  class="overview">';
h += '<p>' + this.text + '</p>';
h += '</div></div></div>';
haveNoSyntaxInScreen=false;
}
if(this.type=='hideword'||this.type=='anim'){
h='<div style="display:none;overflow:hidden;color:' + color + ';' +  this.cssadd + '" ';
h += ' id="table' + this.id + '" class="bloc' + this.id + '" ';
h += ' >';
h += '</div>';
}
installNotes(this,act);
var ScreenAdd=document.getElementById("main");
ScreenAdd.innerHTML=ScreenAdd.innerHTML + h;
appliqueDataB(this);
this.oldzoom=0;
this.create=1;
updatescore();
}else{
objetzoom(this,e_x,e_y);
}
}//**
this.setX=function(v){//**
if(mobiSite){
this.x2=v;
}else{
this.x=v;
}
}//**
this.setY=function(v){//**
if(mobiSite){
this.y2=v;
}else{
this.y=v;
}
}//**
this.setW=function(v){//**
if(mobiSite){
this.w2=v;
}else{
this.w=v;
}
}//**
this.setH=function(v){//**
if(mobiSite){
this.h2=v;
}else{
this.h=v;
}
}//**
this.getFts=function(){//**
if(mobiSite){
return parseInt(this.fontsize2);
}else{
return parseInt(this.fontsize);
}
}//**
this.getX=function(){//**
if(mobiSite){
return parseInt(this.x2);
}else{
return parseInt(this.x);
}
}//**
this.getY=function(){//**
if(mobiSite){
return parseInt(this.y2);
}else{
return parseInt(this.y);
}
}//**
this.getW=function(){//**
if(mobiSite){
return parseInt(this.w2);
}else{
return parseInt(this.w);
}
}//**
this.getH=function(){//**
if(mobiSite){
return parseInt(this.h2);
}else{
return parseInt(this.h);
}
}//**
this.init=function(){//**
var color="black";
if(this.color){
color=this.color;
}
var selectcolor="red";
if(this.selectcolor){
selectcolor=this.selectcolor;
}
$('.menuitem' + this.id ).hover(function(){
$(this).css("color" , selectcolor);
}, function(){
$(this).css("color" ,color);
});
if(this.type=='hideword'){
var wb=parseInt(this.w * zoom);
var hb=parseInt(this.h * zoom);
var larg=parseInt(parseInt(this.fontsize * 1.5) * zoom);
if(jQuery().hideWords){
if(window.console){console.log('hideWords: is a jQuery function');}
}else{
if(window.console){console.log('hideWords: is not a jQuery function');}
if('function' == typeof(hideWords)){
}else{
$.getScript('javascript/jquery.hidewords.js', function(){
logconsole("hideWords is include");
});
}
}
if(jQuery().hideWords){
$('.bloc' + this.id).hideWords({
large: larg ,
words: this.text ,
width: wb,
height: hb
});
}
}//**
if(this.type=='flux'){
loadFlux();
loadObjetsFlux(this,0);
}
if(this.type=='anim'){
installAnimateImages(this.id);
}
if(this.type=='textarea'){
var hb=parseInt(this.h * zoom);
$("#viewport"+ this.id).css("height", hb + "px");
$('.bloc' + this.id ).tinyscrollbar();
}
objetanim(this);
$("#colorfond").css("display","block");
}//**
}//**
function installAnimateImages(i){
if(jQuery().animateImages){
var obj=CObjets[i];
$('.bloc' + obj.id).animateImages({
folder: "images",
loop  : obj.text,
data  : obj.src,
time  : obj.data
});
}else{
var tkanim=document.createElement('script');
tkanim.src='javascript/jquery.anim.js';
tkanim.type='text/javascript';
var s=document.getElementsByTagName('script')[0];
s.parentNode.insertBefore(tkanim, s);
setTimeout('installAnimateImages(' + i+ ')',300);
}
}
var page_id="";
var CObjets=new Array();
var CObjets_count=0;
function CObjets_Add(Elem){
Elem.id=CObjets_count;
CObjets.push(Elem);
CObjets_count=CObjets_count +1;
}
function CObjets_Paint(){
appliqueFond();
for(var i=0; i < CObjets_count; i++){
CObjets[i].show_element();
}
}
paint=(setInterval("CObjets_Paint()",90));
function noresp(){
$("#loaddiv,#loaddivbarre").css("display","none");
}
function lastPage(){
var ur="data/page" + lastPage1  + ".xml";
loaddata(ur);
}
function loadFile(f){
if(f!=''){
f=formatLangUrl(f);
if(typeof dataExterneXml!=='undefined'){
externdata='electronxml';
externdatafilterpage=0;
}
var datamem='';
nbClickAct=0;
TouchDistant=10;
setTimeout(function(){nbClickAct=1;},300);
if(externdata!=''){
externdatafilterpage=0;
try
{
externdatafilterpage=f.replace("data/page","");
externdatafilterpage=externdatafilterpage.replace(langueextend,"");
externdatafilterpage=externdatafilterpage.replace(".xml","");
}
catch(err)
{
externdatafilterpage=0;
}
if(typeof dataExterneXml !== 'undefined'){
datamem=dataExterneXml;
datamemoire[f]=dataExterneXml;
}else{
$.ajax({
type: "GET",
url: externdata,
dataType: (isMsie()) ? "text" : "xml",
cache:false,async:false,
success: function(data){
datamem=data;
datamemoire[f]=data;
},error: function(){
alert('error');
}
});
}
}else{
try
{
datamem=datamemoire[f];
if(typeof datamem === "undefined"){datamem='';}
}
catch(err)
{
datamem='';
}
}
if(datamem!=''){
afficheData(datamemoire[f],f);
}else{
var d=new Date();
var n=d.getMinutes();
if(localExec()){
var p=f.replace(".xml","");
p=p.replace("data/","");
p=p.replace(langueextend,"");
p=p.replace("page","");
data=poff[parseInt(p)];
if(langueextend!=''){
if(poff[parseInt(p) + langueextend] === undefined){
}else{
data=poff[parseInt(p)+ langueextend]
}
}
if(data!=''){
afficheData(data,f);
}else{
noresp();
}
}else{
$.ajax({
type: "GET",
url: f,
dataType: (isMsie()) ? "text" : "xml",
cache:false,
async:false,
success: function(data){
afficheData(data,f);
savestoragebyloadFile(f);
evolinit=evolinit + 60;
},error: function(){
data=getstorage(f);
if(data!=''){
afficheData(data,f);
}else{
noresp();
}
}
});
}
}
if(oldTransitionPage=='Doors'){
$('#globalcurtainanim2').animate({left:"51%",width:"49%"}, 500);
$('#globalcurtainanim').animate({
width: "49%"
}, 500, function(){
$('#globalcurtainanim2').animate({left:"100%",width:"0%"}, 500);
$('#globalcurtainanim').animate({
width: "0%"
}, 500, function(){
$("#globalcurtain").css("display","none");
});
});
}
if(oldTransitionPage=='Curtain'){
oldTransitionPage='';
$('#globalcurtainanim').animate({
left:  "0%",
width: "50%"
}, 200, function(){
$('#globalcurtainanim').animate({
width: "0%"
}, 200, function(){
$("#globalcurtain").css("display","");
$("#globalcurtainanim").css("display","");
$("#globalcurtainanim2").css("display","none");
});
});
}
}
}
var datamemoire=new Array();
var soundmemoire=new Array();
function formatLangUrl(ur){
if(ur.indexOf(langueextend)==-1&&langueextend!=''){
ur=ur.replace(".xml",langueextend + ".xml");
}
return ur;
}
function preloadFile(f,i){
f=formatLangUrl(f);
$.ajax({
type: "GET",
url: f,
dataType: (isMsie()) ? "text" : "xml",
cache:false,
async:true,
success: function(data){
datamemoire[f]=data;
savestoragebyloadFile(f);
soundmemoire[f]=findSonLoad(data,i);
evolinit=evolinit + 15;
},
error: function(){
datamemoire[f]='';
evolinit=evolinit + 20;
}
});
}
function preloadAllFile(){
if(localExec()){
preLoadImgPage(1);
evolinit=evolinit + 60;
}else{
var nb=parseInt(gebi("DiapoNbDiapo").innerHTML);
if(nb<3){
evolinit=evolinit + 240;
}
if(oldnav){
evolinit=evolinit + 110;
}else{
var timeecart=250;
for(i=0; i<nb; i++){
setTimeout("preloadFile('data/page" + i + ".xml','" + i + "');", timeecart);
timeecart=timeecart + 250;
}
}
}
}
function afficheData(data,f){
tabAnimContext="";
f=formatLangUrl(f);
orix=0;
translatePreventContext="";
if(transitionPage=='Direct'||transitionPage=='Slide'){
$("#globaltransition").css("display","none");
$("#globalcurtain").css("display","none");
}
Base_memoire=new Array();
if(!BasePageTirageUnique.hasOwnProperty(f)){
BasePageTirageUnique[f]=new Array();
}
transitionPage='Classic';
transitionDirection='';
$(".outObjBody").remove();
$("#main").empty();
$("#main").append(getbasedisplayMessage());
if(oldTransitionPage=='Slide'){
installSliderScreen();
}
CPlan_count=0;
openXML(data);
appliqueFond();
addDom();
TouchDistant=10;
CObjets_Paint();
transitionX=0;
CObjets_Paint();
if(oldTransitionPage=='Slide'){
installSliderScreen2();
}
if(!gebi("noNavigueparam")){
var p=f.replace(".xml","");
p=p.replace("data/","");
p=p.replace(langueextend,"");
location.hash="#" + p;
active_hash="#" + p;
current_hash=active_hash;
}
if(transitionPage!='Slide'&&oldTransitionPage=='Slide'){
oldTransitionPage='';
}
if(transitionPage=='Slide'){
recupMainStateHtml();
}
if(transitionPage=='Gaussian'){
sdn("#loaddiv,#loaddivbarre");
}else{
if(transitionPage!='Direct'){
$("#loaddiv,#loaddivbarre").fadeOut(400);
}else{
sdn("#loaddiv,#loaddivbarre");
}
}
if(IOS==0){
StopAllSounds();
stopAllSound();
playallsounds();
}
for(var i=0; i < CObjets_count; i++){
CObjets[i].init();
}
LUDIrunScript=true;
LUDIrunPage=true;
onCorrection=false;
acceptCorrection=false;
if(scriptdiapo!=''){
eval(scriptdiapo);
}
screenTime=(new Date()).getTime();
setTimeout("anim12();", 2000);
setTimeout("loadScormBase();", 1000);
setTimeout("execScriptLoop();", 500);
if(oriTypeSite=="classic-responsive"){
if(typesite=="mobile"){
$("body").scrollTop(0);
window.scrollTo(0, 0);
}
}
if(unikProgressionAll==false){
setTimeout("loadProgressionAll();", 600);
}else{
saveProgressionAll();
}
}
function loadScormBase(){
var scormP=false;
for(var i=0; i < CObjets_count; i++){
var typ=CObjets[i].type;
if(typ=='badge'||typ=='note'
||typ=='note-display'
||typ=='finalprogressbar'){
scormP=true;
}
}
if(scormP){
if('function' == typeof(SetScormScore)){
SetScormScore(parseInt(scormProcessScore));
SetScormComplete();
}
}
}
function findSonLoad(data,i){
var xml_p;
var retourson='';
if(typeof data == "string"){
xml_p=StringtoXML(data);
}else{
xml_p=data;
}
$(xml_p).find('bloc').each(function(){
var Vtype=$(this).find('type').text();
if(Vtype=='son'){
retourson=$(this).find('text').text();
}
if(Vtype=='qcm'){
allDiapoQuest[i]='1';
}
});
return retourson;
}
var memimagepreload="";
function preloadAllFileFd(i){
if(i>1000){
return false;
}
var data=poff[i];
if(typeof data === 'undefined'){
i++;data=poff[i];}
if(typeof data !== 'undefined'){
}
}
function preLoadImgPage(i){
if(i>1000){
return false;
}
var data=poff[i];
if(typeof data === 'undefined'){
i++;data=poff[i];}
if(typeof data === 'undefined'){
i++;data=poff[i];}
if(typeof data === 'undefined'){
i++;data=poff[i];}
if(typeof data === 'undefined'){
i++;data=poff[i];}
if(typeof data === 'undefined'){
i++;data=poff[i];}
if(typeof data !== 'undefined'){
var nbHit=0;
var xml_p;
if(typeof data == "string"){
xml_p=StringtoXML(data);
}else{
xml_p=data;
}
var tempFond;
$(xml_p).find('fond').each(function(){
tempFond=$(this).find('data').text();
if(isImageC(tempFond)){
var imgBack=new Image();imgBack.onload=function(){};
imgBack.src=tempFond;
memimagepreload=memimagepreload + tempFond + ';';
}
});
$(xml_p).find('bloc').each(function(){
var tempType=$(this).find('type').text();
var tempBoite=$(this).find('boite').text();
if(tempType=='img'){
var tempSrc=$(this).find('src').text();
if(isImageC(tempSrc)){
var imgLoadProcess=new Image();
imgLoadProcess.onload=function(){};
imgLoadProcess.src=tempSrc;
nbHit++;
}
var tempAlter=$(this).find('contenu7').text();
if(isImageC(tempAlter)){
var imgLoadProcessAlt=new Image();
imgLoadProcessAlt.onload=function(){};
imgLoadProcessAlt.src=tempAlter;
nbHit++;
}
}
if(tempType=='circletarget'){
var tempdata=$(this).find('data').text();
if(isImageC(tempdata)){
var imgLoadcircletarget=new Image();
imgLoadcircletarget.onload=function(){};
imgLoadcircletarget.src='images/' + tempdata;
nbHit++;
}
}
if(tempType=='gamechangeimages'){
var tempDataSrc=$(this).find('src').text();
if(isImageC(tempDataSrc)){
var imgLoadCir1=new Image();
imgLoadCir1.onload=function(){};
imgLoadCir1.src=tempDataSrc;
nbHit++;
}
}
if(tempType=='qcm'&&tempBoite!=''){
var tempSrcQcm0='fx/qcm/' + tempBoite + '0.png';
var tempSrcQcm1='fx/qcm/' + tempBoite + '1.png';
var imgQcm0=new Image();
imgQcm0.onload=function(){};
imgQcm0.src=tempSrcQcm0;
nbHit++;
var imgQcm1=new Image();
imgQcm1.onload=function(){};
imgQcm1.src=tempSrcQcm1;
nbHit++;
}
});
if(nbHit==0){
setTimeout(function(){preLoadImgPage(i+1);},1000);
}else{
if(i<5){
setTimeout(function(){preLoadImgPage(i+1);},3000);
}else{
setTimeout(function(){preLoadImgPage(i+1);},9000);
}
}
}else{
preLoadImgPage(i+1);
}
}
var domDataH='no';
function addDom(){
if(domaddopt){
if(domDataH=='no'){
$.ajax({
type: "GET",
url: "data/domadd.html",
dataType: "text",
cache:true,
async:true,
success: function(data){
if(typeof(data) == 'undefined'){data='';}
if(data=='undefined'){data='';}
domDataH=data;
if(data!=''){
$("#main").append(data);
}
},
error: function(){
domDataH='';
}
});
}else{
if(domDataH!=''){
$("#main").append(domDataH);
}
}
}
}
var transitionX=0;
function loaddata(f,d){
allaysOnTop();
if(menu_global==f||f==''){return false;}
f=formatLangUrl(f);
if(d=='isok'){
MessageHelp='';
if(isok()==false){
modeTypeMessageIco=1;
if(MessageHelp!=''){
displayMessage(MessageHelp);
}else{
displayMessage(MessageFalse);
}
modeTypeMessageIco=0;
return;
}
}
attemptProcess=0;
globalPlayAudio=0;
stopSequencesSound();
if(IOS==1){
var snd=soundmemoire[f];
if(snd!=''){
if(globalMusic==1){
StopAllSounds();
stopAllSound();
playSoundOne(snd,'');
}
}
}
clockId='';
activeNoeud=0;//Identifiant du dialogue
LUDIwait=0;
nbqcmunique=0;
menu_global=f;
var ipage=0;
try
{
ipage=f.replace("data/page","");
ipage=ipage.replace(langueextend,"");
ipage=ipage.replace(".xml","");
}
catch(err)
{
ipage=0;
}
lastPage1=lastPage0;
lastPage0=parseInt(ipage);
if(d!='nonote'&&d!='cross'){
calculnote();
}
var onlyOneLF=true;
if(transitionPage=='Explose'){
for(var i=0; i < CObjets_count; i++){
var sid=".bloc" + CObjets[i].id +",.alterbloc" + CObjets[i].id;
var rand=Math.floor(Math.random() * 2) + 1;
if(rand==1){
if(CObjets[i].getY()<350){
$(sid).animate({
marginTop:"-1200px"
}, 1000, function(){});
}else{
$(sid).animate({
marginTop:"1200px"
}, 1000, function(){});
}
}else{
if(CObjets[i].getX()<450){
$(sid).animate({
marginLeft:"-1200px"
}, 1000, function(){});
}else{
$(sid).animate({
marginLeft:"1200px"
}, 1000, function(){});
}
}
}
if(onlyOneLF){
setTimeout("loadFile('" + f + "');", 1100);
onlyOneLF=false;
}
}
if(transitionPage=='Classic'){
if(ludiHaveVideo==false){
sdb("#loaddiv,#loaddivbarre");
}
transitionX=1;
ludiHaveVideo=false;
}
if(transitionPage=='Curtain'){
oldTransitionPage='Curtain';
sdb("#globalcurtain");
$("#globalcurtainanim").css("display","");
$("#globalcurtainanim2").css("display","none");
$('#globalcurtainanim').css("left",'99%');
$('#globalcurtainanim').css("top",'0px');
$("#globalcurtainanim").css("width", '3%');
$("#globalcurtainanim").css("height", '100%');
$('#globalcurtainanim').css("opacity" , "1");
if(gebi("loaddiv")){
var loadDivObj=gebi("loaddiv");
if(loadDivObj.tagName.toLowerCase()=='img'){
var newurlimg= gebi("loaddivtransiimage").innerHTML;
$('#globalcurtainanim').css("background-image" , "url('" + newurlimg + "')");
}else{
$('#globalcurtainanim').css("background" , loadDivObj.style.backgroundColor);
}
}
$('#globalcurtainanim').animate({
left:  "2%",
width: "99%"
}, 500, function(){
$('#globalcurtainanim').animate({
left:  "0%",
width: "100%"
}, 500, function(){
if(onlyOneLF){
loadFile(f);
onlyOneLF=false;
}
});
});
setTimeout(function(){
$("#globalcurtain").css("display","none");
$("#globalcurtainanim").css("display","none");
$("#globalcurtainanim2").css("display","none");
}, 1300);
}
if(transitionPage=='FlipSlide'){
$('#main').css('opacity','0.5');
$('#main').animate({  trans: 90},{
step: function(now,fx){
$('#main').css('-ms-transform','perspective(2000px) rotateY('+now+'deg)');
$('#main').css('-webkit-transform','perspective(2000px) rotateY('+now+'deg)');
$('#main').css('-moz-transform','perspective(2000px) rotateY('+now+'deg)');
$('#main').css('transform','perspective(2000px) rotateY('+now+'deg)');
},
duration : 500
},'linear');
setTimeout(function(){
loadFile(f);
$('#main').css('opacity','1');
$('#main').animate({  trans: 0 },{
step: function(now,fx){
$('#main').css('-ms-transform','rotateY('+now+'deg)');
$('#main').css('-webkit-transform','rotateY('+now+'deg)');
$('#main').css('-moz-transform','rotateY('+now+'deg)');
$('#main').css('transform','rotateY('+now+'deg)');
},
duration : 200
},'linear');
}, 1300);
}
if(transitionPage=='Doors'){
oldTransitionPage='Doors';
sdb("#globalcurtain,#globalcurtainanim,#globalcurtainanim2");
$('#globalcurtainanim').css("left",'0%').css("top",'0px');
$("#globalcurtainanim").css("width", '2%').css("height", '100%');
$('#globalcurtainanim').css("opacity" , "1");
$('#globalcurtainanim2').css("left",'100%').css("top",'0px').css("width", '2%');
$("#globalcurtainanim2").css("height", '100%').css("opacity" , "1");
if(gebi("loaddiv")){
var loadDivObj=document.getElementById("loaddiv");
if(loadDivObj.tagName.toLowerCase()=='img'){
var newurlimg= gebi("loaddivtransiimage").innerHTML;
$('#globalcurtainanim,#globalcurtainanim2').css("background-image" , "url('" + newurlimg + "')");
}else{
$('#globalcurtainanim,#globalcurtainanim2').css("background" , loadDivObj.style.backgroundColor);
}
}
$('#globalcurtainanim').animate({
width: "50%"
}, 500, function(){loadFile(f);});
$('#globalcurtainanim2').animate({
left:  "50%",width: "51%"
}, 500);
setTimeout(function(){
$("#globalcurtain").css("display","none");
$("#globalcurtainanim").css("display","none");
$("#globalcurtainanim2").css("display","none");
}, 1300);
}
if(transitionPage=='Gaussian'){
$("#loaddiv").css("background","transparent");
sdb("#loaddiv,#loaddivbarre");
$('.haveflou').animate({
opacity: 0,
marginLeft:"-12px"
}, 500, function(){
loadFile(f);
});
}
if(transitionPage=='Zoom out'){
zoomExterieur();
$('#loaddiv').animate({
opacity: 0.1}, 400, function(){
loadFile(f);
});
transitionX=1;
}
if(transitionPage=='Classic'){
$('#loaddiv').animate({
opacity: 0.9}, 500, function(){
});
loadFile(f);
}
if(transitionPage=='Direct'){
fakeContent();
if(onlyOneLF){
loadFile(f);
onlyOneLF=false;
}
transitionX=0;
}
if(transitionPage=='Slide'){
oldTransitionPage='Slide';
if(onlyOneLF){
loadFile(f);
onlyOneLF=false;
}
transitionX=0;
}
}
var MessageHelp='';
function openDialogYNDown(title,file){
var inn='<p class="dialogDownTitle" >' + title + '</p>';
inn += '<p><a class="buttonDialogDownNo" href="javascript:addL();closeYNDown();" >Non</a>&nbsp;';
inn += '<a class="buttonDialogDownYes" target="_blank" ';
inn += ' href="data/' + file + '" onClick="addL();closeYNDown();" >Oui</a></p>';
if(!gebi("dialogDown")){
var h='<div onClick="addL();" id="dialogDown" style="display:none;" >';
h += inn;
h += '</div>';
addToM(h);
}else{
gebi("dialogDown").innerHTML= inn ;
}
$("#dialogDown").fadeIn();
var wb=parseInt(350 * zoom);
var hb=parseInt(60 * zoom);
hb=gebi("dialogDown").offsetHeight;
$("#dialogDown").css("width", wb + "px").css("z-index",'1000').css("margin-top", "-" + parseInt(hb/2) + "px");
}
function confirmLUDI(title,Msg){
var inn='<p class="dialogDownTitle" >' + title + '</p>';
inn=inn + '<p><a class="buttonDialogDownNo" href="javascript:addL();closeYNDown();" >Non</a>&nbsp;';
inn=inn + '<a class="buttonDialogDownYes" href="javascript:addL();LUDI.nextPage();" >Oui</a></p>';
if(!gebi("dialogDown")){
var h='<div onClick="addL();" id="dialogDown" style="display:none;" >';
h=h + inn;
h=h + '</div>';
addToM(h);
}else{
gebi("dialogDown").innerHTML= inn ;
}
$("#dialogDown").fadeIn();
var wb=parseInt(350 * zoom);
var hb=parseInt(60 * zoom);
hb=gebi("dialogDown").offsetHeight;
$("#dialogDown").css("width", wb + "px").css("z-index",'1000').css("margin-top", "-" + parseInt(hb/2) + "px");
}
function closeYNDown(){
$("#dialogDown").css("display","none");
}
$(function(){
var control_hash=window.location.hash;
if(current_hash==''){
var numDiapo='page0';
if(document.getElementById("numpagemem")){
numDiapo=gebi("numpagemem").innerHTML;
}
if(numDiapo!='page0'){
evolinit=evolinit + 180;
lastPage0= parseInteger(numDiapo);
}
var hurl='data/' + numDiapo + '.xml';
menu_global=hurl;
loadFile(hurl);
}else{
var p=current_hash.replace("#","");
if(typeof(p) == 'undefined'){return false;}
if(numDiapo!='page0'){
lastPage0= parseInteger(p);
}
menu_global='data/' + p + '.xml';
}
preloadAllFile();
});
var current_hash='';
var active_hash='';
function verifPage(){
if(!gebi("noNavigueparam")){
current_hash=window.location.hash;
if(active_hash!=current_hash&&active_hash!=''){
if(current_hash!=''){
active_hash=current_hash;
var p=active_hash.replace("#","");
if(typeof(p) == 'undefined'){return false;}
menu_global='data/' + p + '.xml';
Url=menu_global;
if(p!=''){
loadFile( 'data/' + p + '.xml');
}
}
}
}
}
paint=(setInterval("verifPage()",500));
function openXML(data){
if(data==''){
noresp();
return false;
}
CObjets=new Array();
CObjets_count=0;
hiddenZoneFakeClicked=0;
hiddenZoneLastWord="";
actualTimeoutLudi=0;
CAnimEnvents=new Array();
CAnimEnvents_count=0;
var nbcharge=0;
var xml_p;
if(typeof data == "string"){
xml_p=StringtoXML(data);
}else{
xml_p=data;
}
var HaveBilan=false;
$(xml_p).find('bloc').each(function(){
var tempBloc=new CObjet();
tempBloc.idscript=$(this).find('ids').text();
tempBloc.strscript=$(this).find('st').text();
tempBloc.strscript=pureScript(tempBloc.strscript);
tempBloc.type=$(this).find('type').text();
if(tempBloc.type=='bilanresult'||tempBloc.type=='reportw'){
HaveBilan=true;
}
tempBloc.src=$(this).find('src').text();
tempBloc.url=$(this).find('url').text();
tempBloc.pp=parseInteger($(this).find('pp').text());
tempBloc.ind=parseInt(cleText($(this).find('ind').text()));
if(tempBloc.pp>0){
tempBloc.ind=tempBloc.ind + 3;
}
var tx=$(this).find('x').text();
if(tx.indexOf('+')!=-1){
tempBloc.x=eval(tx);
}else{
tempBloc.x=parseInt(tx);
}
var ty=$(this).find('y').text();
if(ty.indexOf('+')!=-1){
tempBloc.y=eval(ty);
}else{
tempBloc.y=parseInt(ty);
}
tempBloc.x2= $(this).find('x2').text();
tempBloc.y2= $(this).find('y2').text();
tempBloc.w2= $(this).find('w2').text();
tempBloc.h2= $(this).find('h2').text();
tempBloc.orix=tempBloc.x;
tempBloc.oriy=tempBloc.y;
tempBloc.w=parseInt($(this).find('w').text());
tempBloc.h=parseInt($(this).find('h').text());
if($(this).find('out').length>0){
tempBloc.out=parseInt($(this).find('out').text());
}else{
tempBloc.out=0;
}
if($(this).find('fontsize').length>0){
tempBloc.fontsize= parseInt($(this).find('fontsize').text());
tempBloc.fontsize2=tempBloc.fontsize;
}
if($(this).find('fts').length>0){
tempBloc.fontsize= parseInt($(this).find('fts').text());
tempBloc.fontsize2=tempBloc.fontsize;
}
if($(this).find('fontsize2').length>0){
tempBloc.fontsize2= parseInt($(this).find('fontsize2').text());
}
if($(this).find('fts').length>0){
tempBloc.fontsize2= parseInt($(this).find('fts2').text());
}
tempBloc.color=$(this).find('color').text();
tempBloc.align=$(this).find('align').text();
tempBloc.data=$(this).find('data').text();
tempBloc.note=parseFlo($(this).find('note').text());
tempBloc.negnote=parseFlo($(this).find('negnote').text());
tempBloc.remarque=$(this).find('remarque').text();
tempBloc.theme=cleText($(this).find('theme').text());
tempBloc.border=$(this).find('border').text();
tempBloc.css=$(this).find('css').text();
tempBloc.selectcolor=$(this).find('selectcolor').text();
if($(this).find('text').length>0){
tempBloc.text=trLg(cleTetS($(this).find('text').text()));
}
if($(this).find('tx').length>0){
tempBloc.text=trLg(cleTetS($(this).find('tx').text()));
}
tempBloc.initialtext=tempBloc.text;
if($(this).find('contenu2').length>0){
tempBloc.contenu2= trLg(cleTetS($(this).find('contenu2').text()));
}
if($(this).find('tx2').length>0){
tempBloc.contenu2= trLg(cleTetS($(this).find('tx2').text()));
}
if($(this).find('contenu3').length>0){
tempBloc.contenu3=cleTetS($(this).find('contenu3').text());
}
if($(this).find('tx3').length>0){
tempBloc.contenu3=cleTetS($(this).find('tx3').text());
}
if($(this).find('contenu4').length>0){
tempBloc.contenu4=cleTetS($(this).find('contenu4').text());
}
if($(this).find('tx4').length>0){
tempBloc.contenu4=cleTetS($(this).find('tx4').text());
}
if($(this).find('contenu5').length>0){
tempBloc.contenu5=cleTetS($(this).find('contenu5').text());
}
if($(this).find('tx5').length>0){
tempBloc.contenu5=cleTetS($(this).find('tx5').text());
}
if($(this).find('contenu6').length>0){
tempBloc.contenu6=cleTetS($(this).find('contenu6').text());
}
if($(this).find('tx6').length>0){
tempBloc.contenu6=cleTetS($(this).find('tx6').text());
}
if($(this).find('contenu7').length>0){
tempBloc.contenu7=cleTetS($(this).find('contenu7').text());
}
if($(this).find('tx7').length>0){
tempBloc.contenu7=cleTetS($(this).find('tx7').text());
}
if($(this).find('contenu8').length>0){
tempBloc.contenu8=cleTetS($(this).find('contenu8').text());
}
if($(this).find('tx8').length>0){
tempBloc.contenu8=cleTetS($(this).find('tx8').text());
}
tempBloc.contentpath=$(this).find('contentpath').text();
tempBloc.contentpathsecond=$(this).find('contentpathsecond').text();
tempBloc.extracont=$(this).find('extracont').text();
tempBloc.linkcontenu=cleText($(this).find('linkcontenu').text());
tempBloc.linkimage=cleText($(this).find('linkimage').text());
tempBloc.linkx=cleText($(this).find('linkx').text());
tempBloc.linky=cleText($(this).find('linky').text());
tempBloc.field1=cleText($(this).find('field1').text());
tempBloc.field2=cleText($(this).find('field2').text());
tempBloc.field3=cleText($(this).find('field3').text());
tempBloc.field4=cleText($(this).find('field4').text());
tempBloc.field5=cleText($(this).find('field5').text());
tempBloc.AnimClic=$(this).find('acl').text();
if(typeof(tempBloc.AnimClic) == 'undefined'){tempBloc.acl=0;}
tempBloc.boite=cleText($(this).find('boite').text());
tempBloc.domaine=parseInt($(this).find('domaine').text());
tempBloc.option=parseInt($(this).find('o').text());
tempBloc.option2=parseInt($(this).find('o2').text());
tempBloc.option3=parseInt($(this).find('o3').text());
tempBloc.option4=parseInt($(this).find('o4').text());
tempBloc.option7=parseInt($(this).find('o7').text());
tempBloc.an=parseInt($(this).find('an').text());
tempBloc.de=parseInt($(this).find('de').text());
tempBloc.di=parseInt($(this).find('di').text());
tempBloc.dedi=parseInt($(this).find('dedi').text());
if($(this).find('de2').length>0){
tempBloc.de2=parseInt($(this).find('de2').text());
tempBloc.di2=parseInt($(this).find('di2').text());
tempBloc.dedi2=parseInt($(this).find('dedi2').text());
}else{
tempBloc.de2=tempBloc.de;
tempBloc.di2=tempBloc.di;
tempBloc.dedi2 =	tempBloc.dedi;
}
tempBloc.cssadd=cleText($(this).find('cssadd').text());
tempBloc.create=0;
tempBloc.mymenu=menu_global;
if(externdata==''){
CObjets_Add(tempBloc);
}else{
var page=parseInt($(this).find('page').text());
if(parseInt(externdatafilterpage)==page){
CObjets_Add(tempBloc);
}
}
nbcharge++;
});
if(ViewerAfterBilan==true&&HaveBilan==false){
objetViewerNav(parseInt(lastPage0));
}
$(xml_p).find('fond').each(function(){
if(externdata==''){
colorfond=$(this).find('data').text();
colorfondsvg=cleText($(this).find('svg').text());
callcolorfond=0;
}else{
var page=parseInt($(this).find('page').text());
if(parseInt(externdatafilterpage)==page){
colorfond=$(this).find('data').text();
colorfond2=colorfond;
colorfondsvg=cleText($(this).find('svg').text());
callcolorfond=0;
}
}
});
$(xml_p).find('fond2').each(function(){
if(externdata==''){
colorfond2=$(this).find('data').text();
colorfondsvg2=cleText($(this).find('svg').text());
}else{
var page=parseInt($(this).find('page').text());
if(parseInt(externdatafilterpage)==page){
colorfond2=$(this).find('data').text();
colorfondsvg2=cleText($(this).find('svg').text());
}
}
});
$(xml_p).find('prefond').each(function(){
var precolorfond=$(this).find('data').text();
});
$(xml_p).find('largefondx').each(function(){
largefondx=$(this).find('data').text();
});
$(xml_p).find('largefondy').each(function(){
largefondy=$(this).find('data').text();
});
$(xml_p).find('transition').each(function(){
if(externdata==''){
transitionPage=$(this).find('data').text();
}else{
var page=parseInt($(this).find('page').text());
if(parseInt(externdatafilterpage)==page){
transitionPage=$(this).find('data').text();
}
}
});
$(xml_p).find('domainesliste').each(function(){
domainesliste=$(this).find('data').text();
});
$(xml_p).find('title').each(function(){
var n=parseInt($(this).find('n').text());
titlePage[n]=$(this).find('data').text();
});
$(xml_p).find('messagefalse').each(function(){
MessageFalse=$(this).find('data').text();
});
$(xml_p).find('scriptdiapo').each(function(){
if(externdata==''){
scriptdiapo=pureScript($(this).find('data').text());
}else{
var page=parseInt($(this).find('page').text());
if(parseInt(externdatafilterpage)==page){
scriptdiapo=pureScript($(this).find('data').text());
}
}
});
$(xml_p).find('scriptloop').each(function(){
scriptloop=$(this).find('data').text();
});
$(xml_p).find('cadre').each(function(){
cadrefond=$(this).find('data').text();
});
$(xml_p).find('cadrecolor').each(function(){
cadrecolorfond=$(this).find('data').text();
});
$(xml_p).find('cadrebordercolor').each(function(){
cadrebordercolorfond=$(this).find('data').text();
});
$(xml_p).find('header').each(function(){
headerfond=$(this).find('data').text();
});
$(xml_p).find('headercolor').each(function(){
headercolorfond=$(this).find('data').text();
});
$(xml_p).find('headerbordercolor').each(function(){
headerbordercolorfond=$(this).find('data').text();
});
$(xml_p).find('footer').each(function(){
footerfond=$(this).find('data').text();
});
$(xml_p).find('footercolor').each(function(){
footercolorfond=$(this).find('data').text();
});
$(xml_p).find('footerbordercolor').each(function(){
footerbordercolorfond=$(this).find('data').text();
});
$(xml_p).find('tunik').each(function(){
tirageunique=$(this).find('d').text();
});
$(xml_p).find('nbpages').each(function(){
nbpagesD=parseInt($(this).find('data').text());
});
$(xml_p).find('bq').each(function(){
AutoLockObjets=parseInt($(this).find('d').text());
});
$(xml_p).find('param').each(function(){
parametersapp=$(this).find('d').text();
});
$(xml_p).find('pq').each(function(){
AutoSavePersistence=parseInt($(this).find('d').text());
});
$(xml_p).find('suc').each(function(){
allSucessData=$(this).find('d').text();
});
$(xml_p).find('fs').each(function(){
forceScreen=true;
});
$(xml_p).find('swt').each(function(){
if(parseInt($(this).find('d').text())==1){
switchTabletNav=true;
}else{
switchTabletNav=false;
}
});
$(xml_p).find('progsave').each(function(){
var cps=$(this).find('d').text();
if(typeof(cps) == 'undefined'){cps='';}
if(cps!=''){
saveprogression=true;
saveprogressionident=$(this).find('d').text();
}
});
$(xml_p).find('progsave').each(function(){
var cpscp=$(this).find('cp').text();
if(typeof(cpscp) == 'undefined'){cpscp='';}
if(cpscp!=''){
saveprogressioncheckpoint=true;
}
});
$(xml_p).find('pddf').each(function(){
if(parseInt($(this).find('ddf').text())==1){
exceptionForkDragDrop=true;
}else{
exceptionForkDragDrop=false;
}
});
}
function objetZoomSolo(obj){
var e_x=parseInt(obj.getX() * zoom);
var e_y=parseInt(obj.getY() * zoom);
objetzoom(obj,e_x,e_y);
}
function objetzoom(obj,e_x,e_y){
if(obj.type=='fluxitems'){
return false;
}
if(obj.type=='maptarget'){
return false;
}
var scrXDec=0;
var scrYDec=0;
if(obj.out==1){
scrXDec= parseInt($("body").width() - (largEcranWidth *zoom))/2;
scrYDec= parseInt($("body").height() - (largEcranHeight *zoom))/2;
e_x=e_x + scrXDec;
e_y=e_y + scrYDec;
}
var sid=".bloc" + obj.id;
var Tobj=$(sid);
var wb=parseInt(obj.getW() * zoom);
var hb=parseInt(obj.getH() * zoom);
var ctrx=parseInt(obj.realx);
if(ctrx!=e_x){
if(acceptMoveObj==1){
Tobj.css("left",(e_x) + "px");
}
$(".button" + obj.id).css("left",(e_x) + "px");
obj.realx=e_x;
}
if(obj.type=='input'){
$(".input" + obj.id).css("left",(e_x + 6) + "px");
}
if(obj.type=='inputFocus'){
$(".input" + obj.id).css("left", parseInt(e_x- (2 * zoom)) + "px");
}
if(obj.type=='img'){
if(obj.field2!=''){
var simgbloc=".imgbloc" + obj.id;
var Timgbloc=$(simgbloc);
Timgbloc.css("left",(e_x + scrXDec + 1 ) + "px");
}
}
if(obj.type=='infosbulle'){
zoomfx(obj,e_x,e_y,wb,hb);
}
if(obj.oldzoom!=zoom){
obj.oldzoom =zoom;
zoomfx(obj,e_x,e_y,wb,hb);
zoomludi(obj);
zoomGame(obj);
zoomGametarget(obj);
zoomSlidePages(obj);
zoomBoite(obj);
zoomPhysics(obj);
zoomNotes(obj);
zoomAudio(obj);
zoomBoiteTexte(obj);
zoomIsoAvatar(obj);
zoomSpriteObject(obj);
zoomshowStars(obj);
var valfontsize=parseInt(obj.fontsize * zoom);
Tobj.css("width", wb + "px");
if(obj.type!='selectdomaine'&&obj.theme!='tight'){
Tobj.css("height",hb + "px");
}
Tobj.css("top",(e_y) + "px");
if(obj.type=='img'){
var simgbloc=".imgbloc" + obj.id;
var Timgbloc=$(simgbloc);
Timgbloc.css("width", (wb - 2) + "px").css("height",( hb - 2) + "px");
Timgbloc.css("left",(e_x + 1 ) + "px").css("top",(e_y + 1 ) + "px");
}
if(obj.type=='texthtml'){
var selectorspe=".bloc" + obj.id + ' .autosizebloc';
var FrameBloc=$(selectorspe);
var nbFrame=FrameBloc.length;
if(nbFrame>0){
FrameBloc.css("width", (wb - 8) + "px").css("height",( hb - 8) + "px");
FrameBloc.css("left",(e_x) + "px").css("top",(e_y) + "px");
FrameBloc.css("border","none");
}
}
if(obj.type=='textarea'){$("#viewport"+ obj.id).css("height", hb + "px");}
if(obj.type=='reportw'){$("#tablescrool" + obj.id).css("height", hb + "px");}
zoomPlugins(obj);
if(obj.type=='slidepages'){obj.zoomslide=wb / 960;}
if(obj.type=='ludirpt2'){onZoomRptGraph(obj);}
if(obj.type=='inputFocus'){zoomInputFocus(obj);}
if(obj.type=='badge'){
$(".button"+ obj.id).css("width", wb + "px").css("height",parseInt(30 * zoom) + "px").css("top",(e_y + hb + 4) + "px");
}
if(obj.type=='videodistante'){
$(".videodistante"+ obj.id).css("width",parseInt(wb + 4) + "px").css("height",parseInt(hb + 4) + "px");
}
if($(".ipadbutton").length > 0){
var hpadd=parseInt(parseInt(hb - valfontsize)/2);
$(".ipadbutton" + obj.id).css("padding-top",hpadd + "px").css("padding-bottom",hpadd + "px");
}
if(obj.type=='button'){
if(obj.boite.indexOf('neoCss')!=-1){
$("#neoCss" + obj.id).css("line-height",parseInt((hb - 2)/parseInt(obj.contenu5)) + "px");
}
}
if(obj.type=='input'){
var Iobj=$(".input"+ obj.id);
Iobj.css("width", wb + "px").css("height", hb + "px").css("left", e_x + "px").css("top", e_y + "px");
Iobj.css("font-size",parseInt(obj.getFts() * zoom) + 'px');
}
if(obj.type=='inputFocus'){
var Iobj=$(".input"+ obj.id);
Iobj.css("width", parseInt(wb + (4 * zoom)) + "px").css("height", hb + "px");
Iobj.css("left", parseInt(e_x - (2 * zoom)) + "px").css("top", e_y + "px");
Iobj.css("font-size",parseInt(obj.getFts() * zoom) + 'px');
}
if(obj.type=='inputsyntaxique'){
$("#divtextareabloc" + obj.id).css("width", parseInt(wb * 0.96) + "px").css("height", parseInt(hb * 0.96) + "px");
$("#textareabloc" + obj.id).css("width", parseInt(wb * 0.95) + "px").css("height", parseInt(hb * 0.92) + "px");
$("#textareabloc" + obj.id).css("font-size",parseInt(obj.getFts() * zoom) + 'px');
}
if(obj.type=='timercompteur'){
$(".blocTimerCompteur"  + obj.id).css("font-size",parseInt(obj.getFts() * zoom) + 'px');
var wot1=parseFloat(hb * parseFloat(obj.contenu3));
var wot=parseInt(wot1 * zoom);
$("#imgbloc"  + obj.id).css("width", wot + 'px');
$("#imgbloc"  + obj.id).css("height", hb + "px");
}
Tobj.css("position","absolute");
if(obj.boite!=''&&obj.ind==1){
Tobj.css("z-index",'2');
}else{
Tobj.css("z-index",obj.ind);
}
if(obj.align!='Fit'){
Tobj.css("font-size",parseInt(obj.getFts() * zoom) + 'px');
}else{
if(obj.align=='Fit'){
$("#fit" + obj.id).attr("data-ftsize","10");
zoomFitText(obj.id);
}
}
if(obj.url!=''){
Tobj.css("cursor","pointer");
}
if(obj.type=='flux'){
zoomFlux(obj);
}
if(obj.type=='drag'||obj.type=='dragslide'){
zoomDrag(obj);
}
if(obj.type.indexOf('plugin-')!=-1){
if(obj.contenu2=='drag'){
zoomDrag(obj);
}
}
if(obj.type=='drop'||obj.type=='bag'){
var Tobjdrop=$(".dropcursor" + obj.id);
if(obj.type=='drop'){
Tobjdrop.css("left",parseInt(obj.getX() * zoom) + 'px');
Tobjdrop.css("top",parseInt(obj.getY() * zoom) + 'px');
Tobjdrop.css("width",parseInt(obj.getW() * zoom) + 'px');
Tobjdrop.css("height",parseInt(obj.getH() * zoom) + 'px');
}
if(obj.type=='bag'){
if(parseInt(obj.w * zoom)<120&&parseInt(obj.getW() * zoom)<120){
Tobjdrop.css("left",parseInt(obj.getX() * zoom) + 'px');
Tobjdrop.css("top",parseInt(obj.getY() * zoom) + 'px');
Tobjdrop.css("width" , parseInt(obj.getW() * zoom) + 'px');
Tobjdrop.css("height", parseInt(obj.getH() * zoom) + 'px');
}else{
var bagW=parseInt(parseInt(obj.getW()* zoom) - 120)/2;
var bagH=parseInt(parseInt(obj.getW() * zoom) - 120)/2;
Tobjdrop.css("left", parseInt(parseInt(obj.getX()* zoom) + bagW) + 'px');
Tobjdrop.css("top" , parseInt(parseInt(obj.getY()* zoom) + bagW) + 'px');
Tobjdrop.css("width" , '120px');
Tobjdrop.css("height", '120px');
}
}
}
zoomQcm(obj);
if(obj.type=='textscrool'){
$("#tablescrool"+ obj.id).css("height", hb + "px");
}
if(obj.boite=="scrollpro"){
zoomScrollText(obj.id);
}
placeLockObjets(obj);
}
var dObj=true;
if(obj.type=='geoline'){
if(obj.option7==1){
if(mobiSite==true){
dObj=true;
}else{
dObj=false;
}
}else{
if(mobiSite==false){
dObj=true;
}else{
dObj=false;
}
}
}
if(dObj){
Tobj.css("display","");
}else{
Tobj.css("display","none");
}
}
function sdn(i){
$(i).css("display","none");
}
function sdb(i){
$(i).css("display","block");
}
function gei(n){
if(document.getElementById(n)){
var tagName=document.getElementById(n).tagName;
if(tagName=='SELECT'){
var get_id=document.getElementById(n);
var resultselect=get_id.options[get_id.selectedIndex].value;
return resultselect;
}
if(tagName=='INPUT'){
return document.getElementById(n).value;
}
if(tagName=='TEXTAREA'){
var ct=document.getElementById(n).value;
ct=ct.replace('\n','<br />');
return ct;
}
}else{
return "-"
}
}
function geicheck(n){
if(document.getElementById(n)){
return document.getElementById(n).checked;
}
return false;
}
function gebi(n){
return document.getElementById(n);
}
function addToM(h){
$("#main").append(h);
}
function addToMobj(h,obj){
if(obj.out==1){
$("body").append(h);
var sid=".bloc" + obj.id;
var Tobj=$(sid);
Tobj.addClass("outObjBody");
}else{
$("#main").append(h);
}
}
function isSpJSFct(url){
var b=false;
if(url.indexOf("openPopupLight")!=-1
||url.indexOf("openWindowsLight")!=-1
||url.indexOf("playallsounds")!=-1
||url.indexOf("openSuivi")!=-1
||url.indexOf("loaddata(")!=-1
||url.indexOf("loadDataScreen")!=-1
||url.indexOf("isok")!=-1
||url.indexOf("lastPage")!=-1
||url.indexOf("displayLastPage")!=-1
||url.indexOf("openCorrection(")!=-1
||url.indexOf("openCorrectSimple(")!=-1
||url.indexOf("launchPara(")!=-1
||url.indexOf("disImgToScr(")!=-1
||url.indexOf("disDiaToScr(")!=-1
||url.indexOf("openDialogYNDown")!=-1){
b=true;
}
return b;
}
function cleText(s){
if(s == 'undefined'){return "";}
if(typeof(s) == 'undefined'){return "";}else{return s;}
}
function cleTetS(s){
if(s == 'undefined'){return "";}
if(typeof(s) == 'undefined'){return "";}else{
s=s.replace(/ZexclaA/g,"!");
s=s.replace(/ZslashA/g,"\\");
s=s.replace(/ZdeslashA/g,"/");
s=s.replace(/ZbrakA/g,"{");
s=s.replace(/ZdebrakA/g,"}");
s=s.replace("slashaposludi"," ");
}
return s;
}
function writeInConsole(text){
if(typeof console !== 'undefined'){
console.log(text);
}
else{
}
}
function pureScript(s){
if(typeof(s) == 'undefined'){
return "";
}
s=s.replace("slashaposludi"," ")
s=s.replace(/ZexclaA/g,"!")
return s;
}
function Sit(s){
if(typeof(s) == 'undefined'){
return "";
}
var c=s ;
c=c.toLowerCase();
c=c.replace(/&rsquo;/g," ");
c=c.replace(/&eacute;/g,"e");
c=c.replace(/&ccedil;/g,"c");
c=c.replace(/&iacute;/g,"i");
c=c.replace(/&amp;/g, " ");
c=c.replace(/&lt;/g, "<");
c=c.replace(/&gt;/g, ">");
c=c.replace(/&ucirc;/g,"u")
c=c.replace(/&cent;/g,"¢");
c=c.replace(/&agrave;/g,"a");
c=c.replace(/&aacute;/g,"a");
c=c.replace(/&acirc;/g,"a");
c=c.replace(/&atilde;/g,"a");
c=c.replace(/&auml;/g,"a");
c=c.replace(/&aring;/g,"a");
c=c.replace(/&egrave;/g,"e");
c=c.replace(/&eacute;/g,"e");
c=c.replace(/&ecirc;/g,"e");
c=c.replace(/&euml;/g,"e");
c=c.replace(/&igrave;/g,"i");
c=c.replace(/&iacute;/g,"i");
c=c.replace(/&icirc;/g,"i");
c=c.replace(/&iuml;/g,"i");
c=c.replace(/&ocirc;/g,"o");
c=c.replace(/ç/g,"c");
c=c.replace(/é/g,"e");
c=c.replace(/à/g,"a");
c=c.replace(/è/g,"e");
c=c.replace(/ê/g,"e");
c=c.replace(/ô/g,"o");
c=c.replace(/û/g,"o");
c=c.replace('ll','l');
c=c.replace('pp','p');
c=c.replace('nn','n');
c=c.replace('ss','s');
c=c.replace('mm','m');
c=c.replace('tt','t');
c=c.replace('rr','r');
c=c.replace('ff','f');
c=c.replace(',','.');
c=c.replace('_',' ');
c=c.replace(/'/g," ");
c=c.replace('#','');
var r=c.replace(/(?:^\s+|\s+$)/g, "");
return r;
}
function parseBoolean(str){
if(str==1){
return true;
}
if(str=='1'){
return true;
}
if(str==0){
return false;
}
if(str=='0'){
return false;
}
if(str=='true'){
return true;
}
if(str=='false'){
return false;
}
return /^true$/i.test(str);
}
function convertToPercentX(pos){
var ppos=(pos / largEcranWidth)*100;
return ppos + "%";
}
function convertToPercentY(pos){
var ppos=(pos / largEcranHeight)*100;
return ppos + "%";
}
function parseInteger(str){
if(typeof(str) == 'undefined'){str=0;}
if(str == null){str=0;}
if(str==''){str=0;}
if(typeof str === 'string' || str instanceof String){
str=str.replace("page","");
}
return parseInt(str);
}
function parseFlo(str){
if(typeof(str) == 'undefined'){str=0;}
if(str == null){str=0;}
if(str==''){str=0;}
if(typeof str == "string"){
str=str.replace(",",".");
}
return parseFloat(str);
}
function Sst(s){
var cr=s ;
cr=cr.toLowerCase();
cr=cr.replace(/é/g,"e");
cr=cr.replace(/è/g,"e");
cr=cr.replace(/ô/g,"o");
cr=cr.replace('/','_');
cr=cr.replace('/','_');
cr=cr.replace('/','_');
cr=cr.replace('/','_');
cr=cr.replace('/','_');
cr=cr.replace('/','_');
cr=cr.replace('#','');
var r=cr.replace(/(?:^\s+|\s+$)/g, "");
if(r=='_'||r=='_node'){
r='home';
}
return r;
}
function cleanName(s){
if(s == 'undefined'){return "";}
if(typeof(s) == 'undefined'){
return "";
}else{
s=ReplaceAll(s,".,",";");
s=ReplaceAll(s,";"," ");
s=ReplaceAll(s,","," ");
s=ReplaceAll(s,"'"," ");
s=ReplaceAll(s,"  "," ");
s=s.replace(/é/g,"e");
s=s.replace(/è/g,"e");
s=s.replace(/ô/g,"o");
s=s.replace(/ç/g,"c");
s=s.replace(/à/g,"a");
s=s.replace(/ô/g,"o");
s= s.replace(/û/g,"o");
return s;
}
}
function appliqueVarsInTxt(ca){
if(ca.indexOf('{Variable1}')!=-1){
ca=ca.replace('{Variable1}',Variable1);
}
if(ca.indexOf('{Variable2}')!=-1){
ca=ca.replace('{Variable2}',Variable2);
}
if(ca.indexOf('{Variable3}')!=-1){
ca=ca.replace('{Variable3}',Variable3);
}
if(ca.indexOf('{Variable4}')!=-1){
ca=ca.replace('{Variable4}',Variable4);
}
if(ca.indexOf('{Variable5}')!=-1){
ca=ca.replace('{Variable5}',Variable5);
}
if(ca.indexOf('{Variable6}')!=-1){
ca=ca.replace('{Variable6}',Variable6);
}
if(ca.indexOf('{Variable7}')!=-1){
ca=ca.replace('{Variable7}',Variable7);
}
if(ca.indexOf('{Variable8}')!=-1){
ca=ca.replace('{Variable8}',Variable8);
}
if(ca.indexOf('{Variable9}')!=-1){
ca=ca.replace('{Variable9}',Variable9);
}
if(ca.indexOf('{Variable10}')!=-1){
ca=ca.replace('{Variable10}',Variable10);
}
if(ca.indexOf('{breadCrumbPage}')!=-1){
var numP=LUDI.getNumPage() + 1;
var numAllP=LUDI.getFullNbPage();
if(numAllP==0){
numAllP=1;
}
ca=ca.replace('{breadCrumbPage}',numP + "/" + numAllP);
}
return ca;
}
var historyExistDataPage=";";
var historyNoExistDataPage=";";
function pageNumExistXml(nb){
var b=false;
var hc=true;
if(historyExistDataPage.indexOf(";"+nb+";")!=-1){
b=true;
hc=false;
}
if(historyNoExistDataPage.indexOf(";"+nb+";")!=-1){
b=false;
hc=false;
}
if(hc){
if(typeof dataExterneXml!=='undefined'){
return pageNumExistExtXml(nb);
}else{
var data=poff[nb];
if(typeof data === 'undefined'){
b=false
}else{
b=true;
}
}
if(b){
historyExistDataPage += nb+";";
}else{
historyNoExistDataPage += nb+";";
}
}
return b;
}
function pageNumExistExtXml(nb){
var b=false;
var xml_p;
if(typeof dataExterneXml == "string"){
xml_p=StringtoXML(dataExterneXml);
}else{
xml_p=dataExterneXml;
}
$(xml_p).find('bloc').each(function(){
var page=parseInt($(this).find('page').text());
if(nb==page){
b=true;
}
});
return b;
}
function ReplaceAll(Source,stf,str){
var temp=Source;
var index=temp.indexOf(stf);
while(index != -1){
temp=temp.replace(stf,str);
index=temp.indexOf(stf);
}
return temp;
}
function StringtoXML(text){
if(window.ActiveXObject){
var doc=new ActiveXObject('Microsoft.XMLDOM');
doc.async='false';
doc.loadXML(text);
}else{
var parser=new DOMParser();
var doc=parser.parseFromString(text,'text/xml');
}
return doc;
}
function getParamValue(param){
var u=document.location.href;
var reg=new RegExp('(\\?|&|^)'+param+'=(.*?)(&|$)');
matches=u.match(reg);
if(matches==null){return '';}
var vari=matches[2] != undefined ? decodeURIComponent(matches[2]).replace(/\+/g,' ') : '';
for(var i=100; i > -1; i--){
vari=vari.replace('#page' + i,'');
}
return vari;
}
function getAnchorValue(){
var u=document.location.href;
var url=u, idx=url.indexOf("#")
var hash=idx != -1 ? url.substring(idx+1) : "";
return hash;
}
function getWindowHeight(){
var windowHeight=0;
if(typeof(window.innerHeight) == 'number'){
windowHeight=window.innerHeight;
}else{
if(document.body && document.body.clientHeight){
windowHeight=document.body.clientHeight;
}else{
if(document.documentElement && document.documentElement.clientHeight){
windowHeight=document.documentElement.clientHeight;
}
}
}
return windowHeight;
}
function getWindowWidth(){
var windowWidth=0;
if(typeof(window.innerWidth) == 'number'){
windowWidth=window.innerWidth;
}else{
if(document.body && document.body.clientWidth){
windowWidth=document.body.clientWidth;
}else{
if(document.documentElement && document.documentElement.clientHeight){
windowWidth=document.documentElement.clientHeight;
}
}
}
return windowWidth;
}
function getBodyHeight(){
var body=document.body;
html=document.documentElement;
var height=Math.max( body.scrollHeight, body.offsetHeight, html.clientHeight, html.scrollHeight, html.offsetHeight );
return height ;
}
var omitformtags="input,textarea,select";
function disableselect(e){
var tagn=e.target.tagName.toLowerCase();
if(omitformtags.indexOf(tagn)==-1){return false;}
}
function reEnable(){return true;}
function unselect(){
if(navigator.userAgent.toUpperCase().indexOf("MSIE") != -1){
if(typeof document.onselectstart!="undefined"){
document.onselectstart=function(){
e=event.srcElement;
return ( e.type == "text" || e.type == "textarea" );
}
}else{
document.onmousedown= disableselect;
document.onmouseup= reEnable;
}
}
}
var globalDisplayTimer=3500;
var globalDisplayTimerObj;
var globalFirstMessage="";
var modeTypeMessageIco=0;
function alertm(mess){
displayMessage(mess);
}
function getbasedisplayMessage(){
var h="";
if(parametersapp.indexOf('flatright')!=-1){
h="<div id='flatrightmessage' class='noslideobject mat-shadows-a' >";
h += "<div class='iconrightmessageinner rightmessageOk' ></div>";
h += "<div class='supprightmessage' onClick='stopdispRightMess();stopActPersoGame();'  ></div>";
h += "<div class='flatrightmessageinner' ></div></div>";
}else{
h="<div id='centermessage' class='noslideobject' style='display:none;' ><div class='centermessageinner' ><p></p></div></div>";
}
return h;
}
function stopActPersoGame(){
setTimeout(function(){
stopHero();
},100);
setTimeout(function(){
stopHero();
},200);
}
function displayMessageFlat(mess){
if(!gebi("flatrightmessage")){
$("#main").append(getbasedisplayMessage());
}
$("#flatrightmessage").css('right',"-60%");
if(modeTypeMessageIco==0&&mess.indexOf("#error")==-1){
$(".iconrightmessageinner").removeClass('rightmessageKo');
$(".iconrightmessageinner").addClass('rightmessageOk');
}else{
mess=mess.replace("#error","");
$(".iconrightmessageinner").removeClass('rightmessageOk');
$(".iconrightmessageinner").addClass('rightmessageKo');
}
mess=appliqueVarsInTxt(mess);
$(".flatrightmessageinner").html(mess);
$("#flatrightmessage").css('display','block');
$('#flatrightmessage').animate({right:"0%"}, 500);
}
function displayMessage(mess){
if(parametersapp.indexOf('flatright')!=-1){
displayMessageFlat(mess);
return false;
}
var firstLoadMessage=false;
if(!gebi("centermessage")){
var h='<div id="centermessage" class="noslideobject" ><div id="centermessageinner" ><p>...</p></div></div>';
$("#main").append(h);
firstLoadMessage=true;
}
mess=appliqueVarsInTxt(mess);
globalFirstMessage= mess;
$("#centermessage").html('<div id="centermessageinner" ><p>' + mess + '</p></div>');
$("#centermessage").css("display","");
ajustMessages();
if(firstLoadMessage){
setTimeout(function(){
ajustMessages();
},300);
}
if(globalDisplayTimerObj){
clearTimeout(globalDisplayTimerObj);
}
globalDisplayTimerObj=setTimeout('stopdisplayMessage()', 3500);
}
function ajustMessages(){
var wb=parseInt(350 * zoom);
var hb=parseInt(60 * zoom);
hb=$("#centermessageinner p").height() + 45;
var om=$("#centermessage");
om.css("height", hb + "px").css("width", wb + "px").css("z-index",'1000');
om.css("margin-left", "-" + parseInt(wb/2) + "px");
om.css("margin-top", "-" + parseInt(hb/2) + "px");
hb=$("#centermessageinner p").height() + 40;
if(hb<60){hb=60;}
om.css("height", hb + "px");
}
function stopdisplayMessage(){
$("#centermessage").css("display","none");
}
function stopdispRightMess(){
$('#flatrightmessage').animate({right:"-60%"},300, function(){
$("#flatrightmessage").css('display','none');
});
}
var stateHtml="";
var stateColorfond1="";
var stateColorfond2="";
function recupMainStateHtml(){
stateHtml=recupPanelsMat();
stateColorfond1="";
stateColorfond2="";
if(colorfond.indexOf(".jpg")!=-1
||colorfond.indexOf(".png")!=-1
||colorfond.indexOf(".jpeg")!=-1){
stateColorfond1=colorfond.replace('images/','images/low-').replace('.png','.jpg');
}
}
function recupPanelsMat(){
var h='';
for(var i=0; i < CObjets_count; i++){
var obj=CObjets[i];
if(obj.type=='material-panel'){
h += '<div ';
h += 'class="mat-shadows-a" ';
h += 'style="position:absolute;z-index:1;';
h += 'left:' + convertToPercentX(obj.getX()) + ';top:' + convertToPercentY(obj.getY()) + ';';
h += 'width:' + convertToPercentX(obj.getW()) + ';height:' + convertToPercentY(obj.getH()) + ';';
h += 'background-color:'+ obj.selectcolor + ';" >';
h += '</div>';
}
}
return h;
}
function installSliderScreen(){
var backColor=$("#main").css("background-color");
var widthDec=$("#main").width() + "px";
var heightDec=$("#main").height() + "px";
var h="<div id='ecranalter' class='ecranalter dataexptclass' ></div>";
h += "<div id='ecranalter2' class='ecranalter2 dataexptclass' ></div>";
$("#main").append(h);
var ecranAlter=$("#ecranalter");
ecranAlter.css("position","absolute");
ecranAlter.css("z-index","4");
ecranAlter.css("width",widthDec).css("height",heightDec);
ecranAlter.css("background-color",backColor);
ecranAlter.css("right","0px").css("top","0px");
if(stateColorfond1!=''){
ecranAlter.css("background-image", "url('" + stateColorfond1 + "')");
ecranAlter.css("background-position", "0 0");
ecranAlter.css("background-repeat", "no-repeat");
ecranAlter.css("background-size", "100% 100%");
ecranAlter.css("background-color", "#F2F2F2");
}
$("#ecranalter").append(stateHtml);
$("#ecranalter2").css("position","absolute");
$("#ecranalter2").css("z-index","4");
$("#ecranalter2").css("width",widthDec);
$("#ecranalter2").css("height",heightDec);
$("#ecranalter2").css("background-color",backColor);
$("#ecranalter2").css("top","0px");
var leftSld=false;
if(lastPage0==(lastPage1-1)){
leftSld=true;
}
if(leftSld){
$("#ecranalter2").css("position","absolute").css("right",widthDec);
}else{
$("#ecranalter2").css("right","-" + widthDec).css("top","0px");
}
$("#ecranalter2").css("border-right","solid 1px gray").css("border-left","solid 1px gray");
}
function installSliderScreen2(){
var leftSld=false;
var widthDec= $("#main").width() + "px";
var widthDec2= ($("#main").width()*2) + "px";
if(lastPage0==(lastPage1-1)){
leftSld=true;
}
var stateHtml2= recupPanelsMat();
$("#ecranalter2").append(stateHtml2);
if(colorfond.indexOf(".jpg")!=-1
||colorfond.indexOf(".png")!=-1
||colorfond.indexOf(".jpeg")!=-1){
stateColorfond2=colorfond.replace('images/','images/low-').replace('.png','.jpg');
}
if(stateColorfond2!=''){
var ecranAlter2=$('.ecranalter2');
ecranAlter2.css("background-image", "url('" + stateColorfond2 + "')");
ecranAlter2.css("background-position", "0 0");
ecranAlter2.css("background-repeat", "no-repeat");
ecranAlter2.css("background-size", "100% 100%");
ecranAlter2.css("background-color", "#F2F2F2");
}
if(recupCss3()){
$('.ecranalter').addClass("mat-slide");
$('.ecranalter2').addClass("mat-slide");
if(leftSld){
$('.ecranalter').css("right",'-' + widthDec);
$('.ecranalter2').css("right",'0px');
}else{
$('.ecranalter').css("right", widthDec);
$('.ecranalter2').css("right",'0px');
}
setTimeout(function(){
$("#ecranalter").css("display","none");
$("#ecranalter2").css("display","none");
setTimeout(fctMamSlideObject,10);
}, 500);
}else{
if(leftSld){
$('.ecranalter,#ecranalter2').animate({
"right" : '-=' + widthDec
},500, "linear",function(){
$("#ecranalter").css("display","none");
$("#ecranalter2").css("display","none");
setTimeout(fctMamSlideObject,10);
});
}else{
$('.ecranalter,#ecranalter2').animate({
"right" : "+=" + widthDec
},500, "linear",function(){
$("#ecranalter").css("display","none");
$("#ecranalter2").css("display","none");
setTimeout(fctMamSlideObject,10);
});
}
}
}
function recurState(s){
s=s.replace(/reponseholetext"/g,'reponseholetext');
s=s.replace(/advancedA-"/g,'advancealterdA-');
s=s.replace(/advancedB-"/g,'advancealterdB-');
s=s.replace(/id="/g,'id="ecranalter');
s=s.replace(/bloc/g,'blocalter');
s=s.replace(/qcmunique/g,'jepassealter');
s=s.replace(/carre/g,'jepassealter');
s=s.replace(/jepasse/g,'jepassealter');
s=s.replace(/jepassecocheimg/g,'jepassecocheimgalter');
s=s.replace(/onClick/g,'data-onclick');
return s;
}
function CStock(){
this.label;
this.type;
this.value;
this.supp;
this.text;
}
var CStocks=new Array();
var CStocks_count=0;
function stocksAdd(label,type,value,text){
Elem=new CStock();
Elem.label=label;
Elem.type=type;
Elem.value=value;
Elem.text=text;
CStocks_Add(Elem);
}
function stocksExistLabel(label){
for(var i=0; i < CStocks_count; i++){
if(CStocks[i].label==label&&CStocks[i].supp==0){
return true;
}
}
return false;
}
function CStocks_Add(Elem){
Elem.id=CStocks_count;
Elem.supp=0;
CStocks.push(Elem);
CStocks_count=CStocks_count +1;
}
function execScriptLoop(){
if(scriptloop){
if(scriptloop!=""){
eval(scriptloop);
}
}
callSaveProgression();
}
function processVarsIntoTexte(name,value){
var i=0;
for(i; i < CObjets_count; i++){
var Vobj=CObjets[i];
if(Vobj.type=='text'){
var htext=$("#innerbloc" + Vobj.id).html();
if(Vobj.create!=0){
if(htext.indexOf('==' + name)!=-1){
var nh=htext.replace('==' + name,'<span class="params' + name + Vobj.id + '" >?</span>');
$("#innerbloc" + Vobj.id).html(nh);
$(".params" + name + Vobj.id).html(value);
}else{
$(".params" + name + Vobj.id).html(value);
}
}
}
}
}
function processVarsIntoTexteFromInput(name,nameVar){
var i=0;
for(i; i < CObjets_count; i++){
var Vobj=CObjets[i];
if(Vobj.type=='text'){
var htext=$("#innerbloc" + Vobj.id).html();
if(Vobj.create!=0){
var valueInput="?";
if(window.hasOwnProperty(nameVar)){
valueInput=window[nameVar];
}
if(htext.indexOf('==' + name)!=-1){
var nh=htext.replace('==' + name,'<span class="params' + name + Vobj.id + '" >?</span>');
$("#innerbloc" + Vobj.id).html(nh);
$(".params" + name + Vobj.id).html(valueInput);
}else{
$(".params" + name + Vobj.id).html(valueInput);
}
}
}
}
}
var AutoSavePersistence=0;
var ViewerAfterBilan=false;
var ViewerAfterBilanList="";
var dicoVariables={};
function installobjvariableDico(obj){
dicoVariables[obj.src]='';
}
function CObjetMem(){
this.id;
this.idGlobal;
this.idScript;
this.x;
this.y;
this.x2;
this.y2;
this.type;
this.value;
this.value2;
this.value3;
this.remarque;
this.domaine;
this.note_F;
this.note_T;
this.numPage;
this.bxml;
this.bhtml;
this.getInteractions=function(){
var i="<interaction>";
i=i + "<id>" + this.id + "</id>";
i=i + "<idGlobal>" + this.idGlobal + "</idGlobal>";
i=i + "<idScript>" + this.idScript + "</idScript>";
i=i + "<numPage>" + this.numPage + "</numPage>";
i=i + "<type>" + this.type + "</type>";
i=i + "<x>" + this.x + "</x>";
i=i + "<y>" + this.y + "</y>";
i=i + "<x2>" + this.x2 + "</x2>";
i=i + "<y2>" + this.y2 + "</y2>";
i=i + "<noteF>" + this.note_F + "</noteF>";
i=i + "<noteT>" + this.note_T + "</noteT>";
if(this.value==''){
}else{
i=i + "<value><![CDATA[" + this.value + "]]></value>";
}
if(this.value2==''){
}else{
i=i + "<value2><![CDATA[" + this.value2 + "]]></value2>";
}
if(this.value3==''){
}else{
i=i + "<value3><![CDATA[" + this.value3 + "]]></value3>";
}
i=i + "<domaine>" + this.domaine + "</domaine>";
if(this.remarque==''){
}else{
i=i + "<remarque><![CDATA[" + this.remarque + "]]></remarque>";
}
if(typeof this.bhtml==="undefined"){
}else{
if(this.bhtml==''){
}else{
i=i + "<bhtml><![CDATA[" + replaceIdStockQ(this.bhtml,true) + "]]></bhtml>";
}
}
i=i + "</interaction>";
return i;
}
}
var CObjetMems=new Array();
var CObjetMems_count=0;
function CObjetMems_Add(Elem){
Elem.id=CObjetMems_count;
CObjetMems.push(Elem);
CObjetMems_count=CObjetMems_count + 1;
}
function bilanSp(p){
ViewerAfterBilan=true;
var ur="data/page" + p + ".xml";
loaddata(ur,'');
}
var lastSaveProgression=Date.now();
function callSaveProgression(){
var getSaveProgression=Date.now();
var reaction=(getSaveProgression - lastSaveProgression) / 1000;
if(parseInteger(reaction)>2){
lastSaveProgression=Date.now();
setTimeout( function(){
saveProgressionAll();
},500);
}
}
function getXmlInteractions(){
var x='<?xml version="1.0" ?><interactions>';
for(var i=0; i < CObjetMems_count; i++){
var obj=CObjetMems[i];
x += obj.getInteractions();
}
x += '<ViewerAfterBilan>' + ViewerAfterBilan + '</ViewerAfterBilan>';
x += '<lastPageMemId>' + lastPage0 + '</lastPageMemId>';
x += '<ViewerAfterBilanList>' + ViewerAfterBilanList + '</ViewerAfterBilanList>';
x += '<initExam>' + initExam + '</initExam>';
x += '<actualExamId>' + actualExamId + '</actualExamId>';
x += '<actualExamIdScreen>' + actualExamIdScreen + '</actualExamIdScreen>';
x += '<lastExamId>' + lastExamId + '</lastExamId>';
x += '<lastAfterExamId>' + lastAfterExamId + '</lastAfterExamId>';
x += '<qcmRandomize>' + qcmRandomize + '</qcmRandomize>';
x += '<LUDIlife>' + LUDIlife + '</LUDIlife>';
x += '<LUDImoney>' + LUDImoney + '</LUDImoney>';
x += '<LUDIscore>' + LUDIscore + '</LUDIscore>';
if(Variable1!=''){
x += "<Variable1><![CDATA[" + Variable1 + "]]></Variable1>";
}
if(Variable2!=''){
x += "<Variable2><![CDATA[" + Variable2 + "]]></Variable2>";
}
if(Variable3!=''){
x += "<Variable3><![CDATA[" + Variable3 + "]]></Variable3>";
}
if(Variable4!=''){
x += "<Variable4><![CDATA[" + Variable4 + "]]></Variable4>";
}
if(Variable5!=''){
x += "<Variable5><![CDATA[" + Variable5 + "]]></Variable5>";
}
if(Variable6!=''){
x += "<Variable6><![CDATA[" + Variable6 + "]]></Variable6>";
}
if(Variable7!=''){
x += "<Variable7><![CDATA[" + Variable7 + "]]></Variable7>";
}
if(Variable8!=''){
x += "<Variable8><![CDATA[" + Variable8 + "]]></Variable8>";
}
if(Variable9!=''){
x += "<Variable9><![CDATA[" + Variable9 + "]]></Variable9>";
}
if(Variable10!=''){
x += "<Variable10><![CDATA[" + Variable10 + "]]></Variable10>";
}
/*
globalCompteurTimer
globalCompteurTimerSecond
globalCompteurTimerDepart
globalCompteurTimerEnd
globalCompteurDecompt
globalCompteurEndScreen
globalCompteurDisplay
gctElapse
*/
if(globalCompteurTimer==true){
x += "<gct><![CDATA[" + globalCompteurTimer + "]]></gct>";
x += "<gctSecond><![CDATA[" + globalCompteurTimerSecond + "]]></gctSecond>";
x += "<gctDepart><![CDATA[" + globalCompteurTimerDepart + "]]></gctDepart>";
x += "<gctEnd><![CDATA[" + globalCompteurTimerEnd + "]]></gctEnd>";
x += "<gctDecompt><![CDATA[" + globalCompteurDecompt + "]]></gctDecompt>";
x += "<gctEndScreen><![CDATA[" + globalCompteurEndScreen + "]]></gctEndScreen>";
x += "<gctDisplay><![CDATA[" + globalCompteurDisplay + "]]></gctDisplay>";
x += "<gctElapse><![CDATA[" + gctElapse + "]]></gctElapse>";
}
if(initExam==1){
for(var j=0; j < 200; j++){
if(collDiapoExam[j]==''&&j>2){
}else{
x += '<collDiapoExam>' + collDiapoExam[j] + '</collDiapoExam>';
x += '<collDiapoExamIdPage>' + collDiapoExamIdPage[j] + '</collDiapoExamIdPage>';
}
}
}
for(var property in dicoVariables){
if(dicoVariables.hasOwnProperty(property)){
x += "<vari>";
x += "<n><![CDATA[" + property + "]]></n>";
x += "<v><![CDATA[" + window[property] + "]]></v>";
x +="</vari>";
}
}
x += '</interactions>';
return x;
}
function recalculAllNoteByPersistence(){
if(ViewerAfterBilan){return false;}
if(AutoSavePersistence==0){return false;}
N_T=0;
N_F=0;
remarques='';
initializeDomaines();
fullBilanResult=""
BilanXML=""
for(var i=0; i < CObjetMems_count; i++){
var obj=CObjetMems[i];
var objtype=obj.type;
if(objectHaveAnote(objtype)||objtype=='dialog'){
if(obj.note_T!=0){
N_T=N_T + parseFlo(obj.note_T);
N_F=N_F + parseFlo(obj.note_F);
var rema=obj.remarque;
if(typeof(rema) == 'undefined'){rema='';}
if(rema!=''){
remarques=remarques + rema  + '<br />';
domainesRemarques[obj.domaine]=domainesRemarques[obj.domaine] + rema + '<br />';
}
domainesN_T[obj.domaine]=parseFlo(domainesN_T[obj.domaine]) + parseFlo(obj.note_T);
domainesN_F[obj.domaine]=parseFlo(domainesN_F[obj.domaine]) + parseFlo(obj.note_F);
var pourc=0;
if(domainesN_F[obj.domaine]!=0&&domainesN_T[obj.domaine]!=0){
pourc=(parseFlo(domainesN_F[obj.domaine]) / parseFlo(domainesN_T[obj.domaine]));
}
domainesPour[obj.domaine]=pourc;
if(typeof(obj.bhtml) == 'undefined'){obj.bhtml='';}
if(typeof(obj.bxml) == 'undefined'){obj.bxml='';}
var bh=obj.bhtml;
if(initExam==1){
bh=bh.replace('</ul>','</ul><a href="#" class="viewScreenMini" onClick="bilanSp(' + obj.numPage + ')" >&nbsp;</a>');
}
fullBilanResult=fullBilanResult + bh;
BilanXML=BilanXML + obj.bxml;
if(ViewerAfterBilanList==''){ViewerAfterBilanList=';';}
if(ViewerAfterBilanList.indexOf(";" + obj.numPage + ";")==-1){
ViewerAfterBilanList=ViewerAfterBilanList + obj.numPage + ";";
}
}
}
}
if(PenaltyExamBarre>0){
var ratio=parseFlo(20/N_T);
N_F=parseFlo(N_F - parseFlo(PenaltyExamBarre/ratio));
}
}
function chargeNoteObjectMem(obj,numpage,T,F,D,R,type){
if(AutoSavePersistence==0){return false;}
if(typeof(obj) == 'undefined'){return false;}
if(isNaN(numpage)){ return false; }
var idGlobal= numpage + "obj" + obj.id;
var detect=false;
var objG;
for(var i=0; i < CObjetMems_count; i++){
if(CObjetMems[i].idGlobal==idGlobal){
detect=true;
objG=CObjetMems[i];
}
}
if(detect==false){
var tempObjectMem=new CObjetMem();
tempObjectMem.numPage=numpage;
tempObjectMem.idGlobal=idGlobal;
tempObjectMem.type=type;
tempObjectMem.note_T=T;
tempObjectMem.note_F=F;
tempObjectMem.domaine=D;
tempObjectMem.remarque=R;
CObjetMems_Add(tempObjectMem);
}else{
objG.type=type;
objG.note_T=T;
objG.note_F=F;
objG.domaine=D;
objG.remarque=R;
objG.numPage=numpage;
}
}
function chargeBilanPartObjectMem(obj,numpage,bxml,bhtml){
if(AutoSavePersistence==0){return false;}
if(typeof(obj) == 'undefined'){return false;}
if(isNaN(numpage)){ return false; }
var idGlobal= numpage + "obj" + obj.id;
var detect=false;
var objG;
for(var i=0; i < CObjetMems_count; i++){
if(CObjetMems[i].idGlobal==idGlobal){
detect=true;
objG=CObjetMems[i];
}
}
if(detect){
objG.bxml=bxml;
objG.bhtml=bhtml;
}
}
function chargeDataObjectMem(obj,numpage){
if(AutoSavePersistence==0){return false;}
if(typeof(obj) == 'undefined'){return false;}
if(isNaN(numpage)){ return false; }
if(obj.type=='drop'||obj.type=='drag'||obj.type=='qcm'
||obj.type=='qcmunique'||obj.type=='tcm'
||obj.type=='holetext'||obj.type=='input'
||obj.type=='inputFocus'||obj.type=='inputsyntaxique'
||obj.type=='inputNumerique'
||obj.type=='inputNumeriqueSignificatif'
||obj.type=='motarelier'||obj.type=='qcmcube'
||obj.type.indexOf('plugques-')!=-1
){
var idGlobal= numpage + "obj" + obj.id;
var detect=false;
var objG;
for(var i=0; i < CObjetMems_count; i++){
if(CObjetMems[i].idGlobal==idGlobal){
detect=true;
objG=CObjetMems[i];
}
}
var repQCM='';
var repQCM2='';
var repQCM3='';
if(obj.type=='qcmunique'){
$('#' + obj.id + 'qcmunique').each(function(index){
if($(this).html()=="X"){
repQCM=repQCM + '1;0';
}else{
repQCM=repQCM + '0;0';
}
});
}
if(obj.type=='qcmcube'){
var idnCube=0;
$('.Choice' + obj.id).each(function(index){
idnCube++;
if($(this).hasClass("CubeChoiceSelect")){
repQCM=idnCube;
}
});
}
if(obj.type=='tcm'||obj.type=='holetext'){
$('#bloc' + obj.id + ' .reponseholetext').each(function(index){
var idctr=$(this).attr('id');
var ctr2=gei(idctr);
repQCM=repQCM + ctr2 + '|';
});
}
if(obj.type=='qcm'){
$('.carre' + obj.id).each(function(index){
if($(this).html()=="X"){
repQCM=repQCM + '1;';
}else{
repQCM=repQCM + '0;';
}
});
$('.jepasse' + obj.id).each(function(index){
if($(this).html()=="X"){
repQCM2=1;
}else{
repQCM2=0;
}
});
}
if(obj.type=='input'||obj.type=='inputFocus'||obj.type=='inputNumeriqueSignificatif'){
repQCM=document.getElementById('input' + obj.id).value;
}
if(obj.type=='inputsyntaxique'){
repQCM=$('#textareabloc' + obj.id).val();
}
if(obj.type=='inputNumerique'){
repQCM=$('#resultnewInputbloc' + obj.id).html();
repQCM2=$('#innernewInputbloc' + obj.id).html();
repQCM3=$('#charanewInputbloc' + obj.id).html();
}
if(obj.type=='motarelier'){
repQCM=recupMotsaRelier(obj);
repQCM2=recupMotsaRelierLeft(obj);
repQCM3='';
}
if(obj.type.indexOf('plugques-')!=-1){
repQCM=getObjMemoryStream(obj);
repQCM2='';
repQCM3='';
}
if(detect==false){
var tempObjectMem=new CObjetMem();
tempObjectMem.idGlobal=idGlobal;
tempObjectMem.type=obj.type;
tempObjectMem.idScript=obj.idscript;
tempObjectMem.x=obj.x;
tempObjectMem.y=obj.y;
tempObjectMem.x2=obj.x2;
tempObjectMem.y2=obj.y2;
tempObjectMem.numPage=numpage;
tempObjectMem.value=repQCM;
tempObjectMem.value2=repQCM2;
tempObjectMem.value3=repQCM3;
if(obj.type=='drag'){
tempObjectMem.note_T=0;
tempObjectMem.note_F=0;
tempObjectMem.domaine=0;
tempObjectMem.remarque='';
}
CObjetMems_Add(tempObjectMem);
}else{
objG.type=obj.type;
objG.idScript=obj.idscript;
objG.type=obj.type;
objG.x=obj.x;
objG.y=obj.y;
objG.x2=obj.x2;
objG.y2=obj.y2;
objG.numPage=numpage;
objG.value=repQCM;
objG.value2=repQCM2;
objG.value3=repQCM3;
}
}
}
function deleteDataObjectMem(idObj){
for(var i=0; i < CObjetMems_count; i++){
if(CObjetMems[i].idScript==idObj){
objG=CObjetMems[i];
objG.type="";
objG.value="";
objG.value2="";
objG.value3="";
}
}
}
function recupDataObjectMem(obj,numpage){
if(AutoSavePersistence==0){return false;}
var idGlobal=numpage + "obj" + obj.id;
var detect=false;
var objG;
for(var i=0; i < CObjetMems_count; i++){
if(CObjetMems[i].idGlobal==idGlobal){
detect=true;
objG=CObjetMems[i];
}
}
if(detect){
if(obj.type=='drag'){
obj.x=objG.x;
obj.y=objG.y;
obj.x2=objG.x2;
obj.y2=objG.y2;
}
if(obj.type=='tcm'){
var eachElement=objG.value.split('|');
var indexE=0;
$('#bloc' + obj.id + ' .reponseholetext').each(function(index){
var idctr=$(this).attr('id');
if(document.getElementById(idctr)){
setValueSelect(idctr,eachElement[indexE]);
if(ViewerAfterBilan){
$('#' + idctr).prop('disabled', 'disabled');
}
}
indexE=indexE + 1;
});
}
if(obj.type=='holetext'){
var eachElement=objG.value.split('|');
var indexE=0;
$('#bloc' + obj.id + ' .reponseholetext').each(function(index){
var idctr=$(this).attr('id');
if(document.getElementById(idctr)){
var fct='if(document.getElementById("' + idctr + '")){document.getElementById("' + idctr + '").value="' + eachElement[indexE] + '"}';
setTimeout(fct, 200);
if(ViewerAfterBilan){
$('#' + idctr).prop('disabled', 'disabled');
}
}
indexE=indexE + 1;
});
}
if(obj.type=='input'||obj.type=='inputFocus'||obj.type=='inputNumeriqueSignificatif'){
setValueInputDec('input' + obj.id,objG.value);
if(ViewerAfterBilan){
$('#input' + obj.id).prop('disabled', 'disabled');
}
}
if(obj.type=='inputsyntaxique'){
$('#textareabloc' + obj.id).val(objG.value);
if(ViewerAfterBilan){
$('#textareabloc' + obj.id).attr('readonly','readonly');
}
}
if(obj.type=='inputNumerique'){
$('#resultnewInputbloc' + obj.id).html(objG.value);
$('#innernewInputbloc' + obj.id).html(objG.value2);
$('#charanewInputbloc' + obj.id).html(objG.value3);
}
if(obj.type=='qcm'||obj.type=='qcmunique'){
var repQCM=objG.value;
if(objG.value2==1){
$('.jepasse' + obj.id).html("X");
$('.jepassecocheimg' + obj.id).attr('src','fx/qcm/' + obj.boite + '1.png');
}else{
var eachElement=repQCM.split(';');
var indexE=0;
$('.carre' + obj.id + ', #' + obj.id + 'qcmunique' ).each(function(index){
var rep=parseInt(eachElement[indexE]);
if(rep==1){
$(this).html("X");
$(this).parent().parent().parent().find("img").attr('src','fx/qcm/' + obj.boite + '1.png');
$(this).parent().parent().parent().parent().find("img").attr('src','fx/qcm/' + obj.boite + '1.png');
}else{
$(this).html("");
}
indexE=indexE + 1;
});
}
}
if(obj.type=='motarelier'){
$('#advancedB-' + obj.id).html(recomposeMotsaRelier(objG.value));
$('#advancedA-' + obj.id).html(recomposeMotsaRelier(objG.value2));
}
if(obj.type.indexOf('plugques-')!=-1){
setObjMemoryStream(obj,objG.value);
}
}
}
function setValueSelect(id,inVal){
var dl=document.getElementById(id);
var el =0;
var opt2=Sit(inVal);
if(opt2!=''){
for(i=0; i<dl.options.length; i++){
var opt1=Sit(dl.options[i].value);
if(opt1!=''){
if(opt1==opt2){
el=i;
}
}
}
var fct='if(document.getElementById("' + id + '")){document.getElementById("' + id + '").selectedIndex=' + el + '}';
setTimeout(fct, 200);
}
}
function setValueInputDec(id,strVal){
var fct='if(document.getElementById("' + id + '")){document.getElementById("' + id + '").value="' + strVal + '";}';
setTimeout(fct, 200);
}
function objetViewerNav(idPage){
var tempBloc=new CObjet();
tempBloc.idscript='viewScreenApercu';
tempBloc.strscript='';
tempBloc.type='text';
tempBloc.text='<b>APERCU</b>';
tempBloc.url='';
tempBloc.data='<b>APERCU</b>';
tempBloc.align='Center';
tempBloc.initialtext='<b>APERCU</b>';
tempBloc.color='white';
tempBloc.css='background:transparent;border-bottom:solid 1px gray;';
tempBloc.fontsize=12;
tempBloc.x=0;
tempBloc.y=-1;
tempBloc.x2=0;
tempBloc.y2=-1;
tempBloc.w=largEcranWidth;
tempBloc.h=40;
tempBloc.an=1;
tempBloc.de=0;
tempBloc.cssadd='';
tempBloc.di=0;
tempBloc.dedi=0;
tempBloc.ind=10;
tempBloc.create=0;
tempBloc.boite='';
tempBloc.linkcontenu= '';
tempBloc.linkimage= '';
tempBloc.linkx= '';
tempBloc.linky= '';
tempBloc.field1= '';
tempBloc.field2= '';
tempBloc.field3= '';
tempBloc.field4= '';
tempBloc.AnimClic=0;
CObjets_Add(tempBloc);
var iNext=-1;
if(ViewerAfterBilanList==''){
return false;
}
var eachElement=ViewerAfterBilanList.split(';');
var i=0;
var f=false;
for(i=0; i < eachElement.length; i++){
if(eachElement[i]!=''){
if(f){
iNext=parseInt(eachElement[i]);
i=eachElement.length;
f=false;
}else{
if(parseInt(eachElement[i])==parseInt(idPage)){
f=true;
}
}
}
}
var nextButton=new CObjet();
nextButton.idscript='';
nextButton.strscript='';
nextButton.type='button';
nextButton.text='<b>&rarr;</b>';
nextButton.boite='palebluebutton';
if(iNext==-1){
nextButton.url="data/page" + parseInt(lastExamId) + ".xml";
}else{
nextButton.url="data/page" + iNext + ".xml";
}
nextButton.data=nextButton.text
nextButton.initialtext=nextButton.text
nextButton.color='#FE642E';
nextButton.css='cursor:pointer;';
nextButton.fontsize=16;
nextButton.x=parseInt(largEcranWidth - 70);
nextButton.y=2;
nextButton.x2=parseInt(largEcranWidth - 70);
nextButton.y2=2;
nextButton.w=60;
nextButton.h=20;
nextButton.an=1;
nextButton.de=0;
nextButton.cssadd='cursor:pointer;';
nextButton.di=0;
nextButton.dedi=0;
nextButton.ind=10;
nextButton.create=0;
nextButton.linkcontenu= '';
nextButton.linkimage= '';
nextButton.linkx= '';
nextButton.linky= '';
nextButton.field1= '';
nextButton.field2= '';
nextButton.field3= '';
nextButton.field4= '';
nextButton.AnimClic=0;
CObjets_Add(nextButton);
var iPrev=-1;
var iOld=-1;
i=0;
f=false;
for(i=0; i < eachElement.length; i++){
if(eachElement[i]!=''){
if(parseInt(eachElement[i])==parseInt(idPage)){
iPrev=iOld;
i=eachElement.length;
}
iOld=parseInt(eachElement[i]);
}
}
var prevButton=new CObjet();
prevButton.idscript='';
prevButton.strscript='';
prevButton.type='button';
prevButton.text='<b>&larr;</b>';
prevButton.boite='palebluebutton';
if(iPrev==-1){
prevButton.url="";
}else{
prevButton.url="data/page" + iPrev + ".xml";
}
prevButton.data=prevButton.text
prevButton.initialtext=prevButton.text
prevButton.color='#FE642E';
prevButton.css='cursor:pointer;';
prevButton.fontsize=16;
prevButton.x=10;
prevButton.y=2;
prevButton.x2=10;
prevButton.y2=2;
prevButton.w=60;
prevButton.h=20;
prevButton.an=1;
prevButton.de=0;
prevButton.cssadd='cursor:pointer;';
prevButton.di=0;
prevButton.dedi=0;
prevButton.ind=10;
prevButton.create=0;
prevButton.linkcontenu= '';
prevButton.linkimage= '';
prevButton.linkx= '';
prevButton.linky= '';
prevButton.field1= '';
prevButton.field2= '';
prevButton.field3= '';
prevButton.field4= '';
prevButton.AnimClic=0;
if(iPrev!=-1){
CObjets_Add(prevButton);
}
}
function openUrlInteractions(urlLinkInteractions){
try{
$.ajax({
type: "GET",
url: urlLinkInteractions,
dataType: (isMsie()) ? "text" : "xml",
cache:false,
async:false,
success: function(data){
openXmlInteractions(data);
},error: function(xhr, textStatus, errorThrown){
writeInConsole("Error " + xhr.status + " " + urlLinkInteractions);
}
});
}catch(e){
}
}
function openUrlSave(urlLinkInteractions){
try{
$.ajax({
type: "GET",
url: urlLinkInteractions,
dataType: (isMsie()) ? "text" : "xml",
cache:false,
async:false,
success: function(data){
unikProgressionAll=true;
openXmlInteractions(data);
ViewerAfterBilan=false;
var numDiapo=document.getElementById("numpagemem").innerHTML;
var hurl='data/' + numDiapo + '.xml';
menu_global=hurl;
loadFile(hurl);
},error: function(xhr, textStatus, errorThrown){
writeInConsole("Error " + xhr.status + " " + urlLinkInteractions);
}
});
}catch(e){
}
}
function openXmlInteractions(data){
if(data==''){
return false;
}
CObjetMems=new Array();
CObjetMems_count=0;
var xml_p;
if(typeof data == "string"){
xml_p=StringtoXML(data);
}else{
xml_p=data;
}
var HaveBilan=false;
$(xml_p).find('interaction').each(function(){
var tempObjectMem=new CObjetMem();
tempObjectMem.numPage=parseInteger($(this).find('numPage').text());
tempObjectMem.idGlobal=$(this).find('idGlobal').text();
tempObjectMem.type=$(this).find('type').text();
tempObjectMem.note_T=parseFlo($(this).find('noteT').text());
tempObjectMem.note_F=parseFlo($(this).find('noteF').text());
tempObjectMem.domaine=$(this).find('domaine').text();
tempObjectMem.remarque=cleText($(this).find('remarque').text());
tempObjectMem.x=parseInteger($(this).find('x').text());
tempObjectMem.y=parseInteger($(this).find('y').text());
tempObjectMem.x2=parseInteger($(this).find('x2').text());
tempObjectMem.y2=parseInteger($(this).find('y2').text());
tempObjectMem.value=cleText($(this).find('value').text());
tempObjectMem.value2=cleText($(this).find('value2').text());
tempObjectMem.value3=cleText($(this).find('value3').text());
tempObjectMem.bhtml=cleText($(this).find('bhtml').text());
CObjetMems_Add(tempObjectMem);
});
$(xml_p).find('vari').each(function(){
var nd=$(this).find('n').text();
if(window.hasOwnProperty(nd)){
var vd=$(this).find('v').text();
if(isNaN(vd)==false){
vd=parseFloat(vd);
}
window[nd]=vd;
dicoVariables[nd]=vd;
}
});
var lastPageMemId=parseInteger($(xml_p).find('lastPageMemId').text());
actualExamIdScreen=$(xml_p).find('actualExamIdScreen').text();
ViewerAfterBilanList=cleText($(xml_p).find('ViewerAfterBilanList').text());
initExam=parseInteger($(xml_p).find('initExam').text());
lastExamId=parseInteger($(xml_p).find('lastExamId').text());
lastAfterExamId=parseInteger($(xml_p).find('lastAfterExamId').text());
qcmRandomize=parseInteger($(xml_p).find('qcmRandomize').text());
Variable1=cleText($(xml_p).find('Variable1').text());
Variable2=cleText($(xml_p).find('Variable2').text());
Variable3=cleText($(xml_p).find('Variable3').text());
Variable4=cleText($(xml_p).find('Variable4').text());
Variable5=cleText($(xml_p).find('Variable5').text());
Variable6=cleText($(xml_p).find('Variable6').text());
Variable7=cleText($(xml_p).find('Variable7').text());
Variable8=cleText($(xml_p).find('Variable8').text());
Variable9=cleText($(xml_p).find('Variable9').text());
Variable10=cleText($(xml_p).find('Variable10').text());
LUDIlife=parseInteger($(xml_p).find('LUDIlife').text());
LUDImoney=parseInteger($(xml_p).find('LUDImoney').text());
LUDIscore=parseInteger($(xml_p).find('LUDIscore').text());
/*
globalCompteurTimer
globalCompteurTimerSecond
globalCompteurTimerDepart
globalCompteurTimerEnd
globalCompteurDecompt
globalCompteurEndScreen
globalCompteurDisplay
*/
globalCompteurTimer=parseBoolean($(xml_p).find('gct').text());
if(globalCompteurTimer==true){
globalCompteurTimerSecond=parseInteger($(xml_p).find('gctSecond').text());
globalCompteurTimerDepart=parseInteger($(xml_p).find('gctDepart').text());
globalCompteurTimerEnd=parseInteger($(xml_p).find('gctEnd').text());
globalCompteurDecompt=parseBoolean($(xml_p).find('gctDecompt').text());
globalCompteurEndScreen=parseInteger($(xml_p).find('gctEndScreen').text());
globalCompteurDisplay=$(xml_p).find('gctDisplay').text();
gctElapse=parseInteger($(xml_p).find('gctElapse').text());
if(globalCompteurDecompt==false){
globalCompteurTimerDepart=(new Date()).getTime() - gctElapse;
}
appliqueCompteurTimer();
setInterval("appliqueCompteurTimer()", 1000);
}
if(initExam==1){
var j=0;
$(xml_p).find('collDiapoExam').each(function(){
collDiapoExam[j]=cleText($(this).text());
j=j + 1 ;
});
collDiapoExam[j]='';
j=0;
$(xml_p).find('collDiapoExamIdPage').each(function(){
collDiapoExamIdPage[j]=cleText($(this).text());
j=j + 1 ;
});
collDiapoExamIdPage[j]='';
}
AutoSavePersistence=1;
var ranbp=recalculAllNoteByPersistence();
if(initExam==1){
var NbDiapo=parseInteger(document.getElementById("DiapoNbDiapo").innerHTML);
if(lastPageMemId>NbDiapo||lastPageMemId==NbDiapo){
writeInConsole("Error page " + lastPageMemId + " not exist !");
lastPageMemId=0;
}
}
document.getElementById("numpagemem").innerHTML='page' + lastPageMemId;
if(initExam==1){
ViewerAfterBilan=true;
}
}
var allSucessData='';
setTimeout(function(){ loadSucessData(); },500);
function displaySucess(i){
var suc=CSucesss[i];
if(!gebi("sucessobj" + i)){
var act=" onClick='LUDI.goPage(" + suc.numpage + ");";
act += "closeSucessD(" + i + ");' ";
var h="<div id='sucessobj" + i + "' class='mat-sucessblock sucessblock180' >";
h += "<div id='sucessbottommessage' ";
if(suc.redirpage==1||suc.redirpage=='True'){
h += " style='color:" + suc.fontcolor + ";cursor:pointer;' ";
}else{
h += " style='color:" + suc.fontcolor + ";' ";
}
h += " class='mat-sucessmessage' >";
h += "<div class='mat-sucess-icon' " + act + " ";
h += " style='background-color:" + suc.iconcolor + ";' ></div>";
h += "<div class='mat-sucess-content' ";
h += " style='background-color:" + suc.backcolor + ";' >";
h += "<div class='mat-sucess-close' onClick='closeSucessD(" + i + ");' >X</div>";
h += "<div class='mat-sucess-title' " + act + " >" + suc.title + "</div>";
h += "<div class='mat-sucess-subtitle' " + act + " >" + suc.subtitle + "</div>";
h += "</div>";
h += "</div>";
h += "</div>";
$("body").append(h);
}
var decYSuc=decYSucess()+"px";
$("#sucessobj" + i).css("bottom",decYSuc);
$("#sucessobj" + i).css("display","flex");
suc.isshow=1;
setTimeout(function(){
$("#sucessobj" + i).removeClass("sucessblock180");
$("#sucessobj" + i).addClass("sucessblock100");
},100);
setTimeout('closeSucessD('+i+');',10000);
}
function loadSucessData(){
if(allSucessData.indexOf('|')!=-1){
var eachElementSucess=allSucessData.split('|');
for(var e=0 ; e < eachElementSucess.length; e++){
var lineSucess=eachElementSucess[e];
if(lineSucess.indexOf('@')!=-1){
var partSucess=lineSucess.split('@');
var suc=new CSucess();
suc.act=partSucess[0];
suc.num=partSucess[1];
suc.title=partSucess[2];
suc.subtitle=partSucess[3];
suc.recurent=partSucess[4];
suc.redirpage=partSucess[5];
suc.numpage=partSucess[6];
suc.backcolor=partSucess[8];
suc.iconcolor=partSucess[10];
CSucess_Add(suc);
}
}
setTimeout(function(){ controlSucessData(0); },500);
}
}
function decYSucess(){
var posY=0;
for(var i=0; i < CSucess_count; i++){
var suc=CSucesss[i];
if(suc.isshow==1){
posY=posY + 120;
}
}
return posY;
}
function controlSucessData(){
for(var i=0; i < CSucess_count; i++){
var suc=CSucesss[i];
if(suc.onetime==0){
if(suc.act==0){
if(suc.memscore<suc.num&&LUDIscore>suc.num){
displaySucess(i);
suc.onetime=1;
}
}
if(suc.act==1){
var NumPage=LUDI.getNumPage();
if(NumPage==suc.num){
displaySucess(i);
suc.onetime=1;
}
}
}
suc.memscore=LUDIscore;
suc.memlife=LUDIlife;
suc.memmoney=LUDImoney;
}
setTimeout(function(){ controlSucessData(0); },1000);
}
function closeSucessD(i){
$("#sucessobj" + i).removeClass("sucessblock100");
$("#sucessobj" + i).addClass("sucessblock180");
setTimeout(function(){
$("#sucessobj" + i).css("display","none");
},400);
var suc=CSucesss[i];
suc.isshow=0;
}
function CSucess(){
this.id;
this.act;
this.num;
this.title;
this.subtitle;
this.onetime;
this.recurent;
this.redirpage;
this.numpage;
this.backcolor;
this.iconcolor;
this.fontcolor;
this.memscore;
this.memlife;
this.memmoney;
this.isshow;
}
var CSucesss=new Array();
var CSucess_count=0;
function CSucess_Add(Elem){
Elem.id=CSucess_count;
Elem.memscore=0;
Elem.memlife=0;
Elem.memmoney=0;
Elem.onetime=0;
Elem.isshow=0;
CSucesss.push(Elem);
CSucess_count=CSucess_count +1;
}
var unikProgressionAll=false;
function getIDProgressionAll(){
if('function' == typeof(CheckLMSLearnerName)){
var vln=CheckLMSLearnerName();
if(vln!=''){
learnerName=vln;
}
}
if(learnerName==''){
learnerName=Variable1;
}
if(learnerName==''){
learnerName='Player';
}
return saveprogressionident + netH(learnerName);
}
function saveProgressionAll(){
if(saveprogression&&lastPage0>0&&saveprogressioncheckpoint==false){
var idsession=getIDProgressionAll();
var xmlprogress=getXmlInteractions();
amplify.store(idsession,xmlprogress);
var dat=helperDateActu() + ' ' + helperHourActu();
amplify.store(idsession + '-date',dat);
amplify.store(idsession + '-page',lastPage0);
lastSaveProgression=Date.now();
}
}
function saveProgressionOneCP(){
if(saveprogressioncheckpoint&&lastPage0>0){
var idsession=getIDProgressionAll();
var xmlprogress=getXmlInteractions();
amplify.store(idsession,xmlprogress);
var dat=helperDateActu() + ' ' + helperHourActu();
amplify.store(idsession + '-date',dat);
amplify.store(idsession + '-page',lastPage0);
writeInConsole("ProgressionOneCP" + idsession);
lastSaveProgression=Date.now();
}
lastPageCheckPoint=lastPage0;
}
function loadProgressionAll(){
if(unikProgressionAll){
return false;
}
if(saveprogression){
for(var i=0; i < CObjets_count; i++){
if(CObjets[i].type=='connexion'){
return false;
}
}
var idsession=getIDProgressionAll();
var cont=amplify.store(idsession);
unikProgressionAll=true;
if(cont==''){
return false;
}
if(typeof(cont)=='undefined'){
return false;
}
if(cont!=''){
var contDate=amplify.store(idsession + '-date');
openDialogYNProgressionAll(contDate);
}
}
}
function openDialogYNProgressionAll(dt){
var Ecran=document.getElementById("main");
var title= 'Reprise : ' + dt  + '<br />Voulez-vous reprendre ?';
var inn='<p class="dialogDownTitle" >' + title + '</p>';
inn=inn + '<p><a style="cursor:pointer;" class="buttonDialogDownNo" onCLick="closeYNProgressionAll();" >Non</a>&nbsp;';
inn=inn + '<a style="cursor:pointer;" class="buttonDialogDownYes" onCLick="loadProgressionAllRestauration();" >Oui</a></p>';
if(!document.getElementById("dialogReprendre")){
var h='<div id="dialogReprendre" style="display:none;" >';
h=h + inn;
h=h + '</div><div class="opacReprendre" ></div>';
Ecran.innerHTML=Ecran.innerHTML +  h;
}else{
document.getElementById("dialogReprendre").innerHTML= inn ;
}
$("#dialogReprendre").css("display","block");
$(".opacReprendre").css("display","block");
var wb=parseInt(350 * zoom);
var hb=parseInt(100 * zoom);
hb=document.getElementById("dialogReprendre").offsetHeight;
$("#dialogReprendre").css("width", wb + "px").css("z-index",'1000');
}
function closeYNProgressionAll(){
$("#dialogReprendre").css("display","none");
$(".opacReprendre").css("display","none");
LUDIrunPage=true;
}
function loadProgressionAllRestauration(){
var idsession=getIDProgressionAll();
var cont=amplify.store(idsession);
if(cont==''){
closeYNProgressionAll();
return false;
}
if(typeof(cont)=='undefined'){
closeYNProgressionAll();
return false;
}
if(cont!=''){
lastSaveProgression=Date.now();
unikProgressionAll=true;
openXmlInteractions(cont);
ViewerAfterBilan=false;
var numDiapo=document.getElementById("numpagemem").innerHTML;
var hurl='data/' + numDiapo + '.xml';
menu_global=hurl;
loadFile(hurl);
}
closeYNProgressionAll();
}
function installimg(obj,posisty,act){
var h=getBoite(obj);
if(obj.boite==''&&obj.boite!='track'){
h=getBoite(obj);
}
var srctemp=obj.src;
if(typeof(obj.contenu7) === "undefined"){
obj.contenu7='';
}
if(obj.contenu7!=''){
if(isSVGcompatible()){
srctemp=obj.contenu7;
}
}
var cssv=obj.cssadd;
if(obj.strscript!=''){
cssv=cssv + 'cursor:pointer;';
}
if(document.getElementById("loadanimgifparam")){
if(srctemp.indexOf(".gif")!=-1){
srctemp=srctemp + '?g=' + Math.floor(Math.random()*10000);
}
}
if(obj.field2!=''){
h += '<div style="position:absolute;background:' + obj.field2 + ';z-index:1;' + cssv + '" ';
h += ' class="imgbloc' + obj.id + ' alterbloc' + obj.id + '" ';
h += ' ></div>';
}
var onmo='';
if(obj.field1!=''){
var srcfield1=obj.field1;
if(srcfield1.indexOf('/')==-1){
srcfield1='images/' + obj.field1;
}
onmo=' onMouseOver="$(\'#bloc' + obj.id  + '\').attr(\'src\',\'' + srcfield1 + '\');" ';
onmo += ' onMouseLeave="$(\'#bloc' + obj.id  + '\').attr(\'src\',\'' + srctemp + '\');" ';
}
h += '<img ';
h += ' onError="ImgErrorVideo(this);" ';
h += ' id="bloc' + obj.id + '" class="haveflou unselectable bloc' + obj.id + ' ' +  obj.idscript + '" ';
h += ' src="' + srctemp + '" ';
if(act==''&&onmo!=''){
h += onmo;
}
h += ' style="display:none;' + posisty + cssv + '" ';
h += ' />';
if(act!=''){
h += '<a ';
if(istablet()){
act=act.replace('onMouseDown="','onMouseDown="event.preventDefault();');
}
h += ' href="#" ';
h += act + onmo;
h += ' id="abloc' + obj.id + '" class="haveflou unselectable bloc' + obj.id + ' ' +  obj.idscript + '" ';
h += ' style="z-index:4;background-image:url(\'fx/transparent.png\');display:none;cursor:pointer;' + posisty + '" ';
h += ' ></a>';
}
addToMobj(h,obj)
}
var nextIdis=0;
function disImgToScr(i,pathimg,color){
nextIdis=0;
if(!document.getElementById("imgScrView")){
var h='<div id="imgViewBack" style="position:absolute;z-index:5;" >';
h += '<div id="closeImgView" onClick="closeImgToScr()" class="closeImgViewSrc" >';
h += '</div></div>';
h += '<div id="imgScrView" style="position:absolute;z-index:6;" >';
h += '</div>';
addToM(h);
}
$('#diaViewBack,#diaScrView').css('display','none');
var finalPath='images/' + pathimg;
var objAll=$('#imgViewBack,#imgScrView');
$('#imgViewBack').css('background-color',color);
$('#imgViewBack').css('border-radius','4px');
$('#imgScrView').css('background-image','url(\'' + finalPath + '\')');
objAll.css('background-repeat','no-repeat');
objAll.css('background-position','center center');
objAll.css('display','block');
if(i==0){
objAll.css('background-size','contain');
objAll.css('margin-left','0px').css('margin-top','0px');
objAll.css('left','40%').css('right','40%');
objAll.css('top','30%').css('bottom','30%');
$('#imgViewBack').animate({
left : "4%",right : "4%"
}, 500, function(){
$('#imgViewBack').animate({
top : "4%",bottom : "4%",
},300, function(){
$('#imgScrView').animate({
left : "7%",right : "7%",
top : "7%",bottom : "7%",
},200, function(){
});
});
});
}
if(i==2){
objAll.css('background-size','contain');
objAll.css('margin-left','0px').css('margin-top','0px');
objAll.css('left','90%').css('right','0%');
$('#imgViewBack').css('top','30%').css('bottom','30%');
$('#imgScrView').css('top','35%').css('bottom','35%');
$('#imgViewBack').animate({
left : "52%"
}, 300, function(){
$('#imgViewBack').animate({
top : "0%",bottom : "0%",
},300, function(){
$('#imgScrView').animate({
right : "2%",
top : "7%",bottom : "7%",
},200, function(){
});
});
});
$('#imgScrView').animate({
left : "54%"
},300, function(){} );
}
if(i==3){
objAll.css('background-size','contain');
objAll.css('margin-left','0px').css('margin-top','0px');
objAll.css('left','0%').css('right','90%');
$('#imgViewBack').css('top','30%').css('bottom','30%');
$('#imgScrView').css('top','35%').css('bottom','35%');
$('#imgViewBack').animate({
right : "52%"
}, 300, function(){
$('#imgViewBack').animate({
top : "0%",bottom : "0%",
},300, function(){
$('#imgScrView').animate({
left : "2%",
top : "7%",bottom : "7%",
},200, function(){
});
});
});
$('#imgScrView').animate({
right : "54%"
},300, function(){} );
}
if(i==4){
objAll.css('background-size','contain');
objAll.css('margin-left','0px').css('margin-top','0px');
objAll.css('bottom','0%').css('top','90%');
$('#imgViewBack').css('left','30%').css('right','30%');
$('#imgScrView').css('left','35%').css('right','35%');
$('#imgViewBack').animate({
top : "52%"
}, 300, function(){
$('#imgViewBack').animate({
left : "0%",right : "0%",
},300, function(){
$('#imgScrView').animate({
bottom : "2%",
left : "8%",right : "8%",
},200, function(){
});
});
});
$('#imgScrView').animate({
top : "54%"
},300, function(){} );
}
if(i==5){
objAll.css('background-size','contain');
objAll.css('margin-left','0px').css('margin-top','0px');
objAll.css('bottom','90%').css('top','0%');
$('#imgViewBack').css('left','30%').css('right','30%');
$('#imgScrView').css('left','35%').css('right','35%');
$('#imgViewBack').animate({
bottom : "52%"
}, 300, function(){
$('#imgViewBack').animate({
left : "0%",right : "0%",
},300, function(){
$('#imgScrView').animate({
top : "2%",
left : "8%",right : "8%",
},200, function(){
});
});
});
$('#imgScrView').animate({
bottom : "54%"
},300, function(){} );
}
if(i==1){
objAll.css('left','50%').css('top','50%');
$('#imgViewBack').css('width','100px').css('height','100px');
$('#imgViewBack').css('margin-left','-50px').css('margin-top','-50px');
$('#imgScrView').css('width','60px').css('height','60px');
$('#imgScrView').css('margin-left','-30px').css('margin-top','-30px');
var newImg=new Image;
newImg.onload=function(){
var wImg=this.width ;
var hImg=this.height;
var wBac=this.width + 50;
var hBac=this.height + 50;
if(wBac > (largEcranWidth*zoom)||hBac > (largEcranHeight*zoom)){
nextIdis=0;
objAll.css('margin-left','0px').css('margin-top','0px');
objAll.css('width','auto').css('height','auto');
objAll.css('background-size','contain');
objAll.css('left','40%').css('right','40%');
objAll.css('top','30%').css('bottom','30%');
$('#imgViewBack').animate({
left : "4%",right : "4%"
}, 500, function(){
$('#imgViewBack').animate({
top : "4%",bottom : "4%",
},300, function(){
$('#imgScrView').animate({
left : "7%",right : "7%",
top : "7%",bottom : "7%",
},200, function(){
});
});
});
}else{
nextIdis=1;
objAll.css('background-size','none');
$('#imgViewBack').css('width',(wBac) + 'px').css('height',hBac + 'px');
$('#imgViewBack').css('margin-left','-' + (wBac/2) + 'px').css('margin-top','-' + (hBac/2) + 'px');
$('#imgScrView').css('width',wImg + 'px').css('height',hImg + 'px');
$('#imgScrView').css('margin-left','-' + (wImg/2) + 'px').css('margin-top','-' + (hImg/2) + 'px');
}
}
newImg.src=finalPath;
}
}
function closeImgToScr(){
var objAll=$('#imgViewBack,#imgScrView');
if(nextIdis==0){
objAll.animate({
top : "45%",bottom : "45%",
left : "45%",right : "45%"
}, 200, function(){
objAll.css("display","none");
});
}
if(nextIdis==1){
objAll.animate({
width : "60px",height : "60px",
marginLeft : "-30px",marginRight : "-30px"
}, 200, function(){
objAll.css("display","none");
});
}
}
function ImgErrorVideo(source){
source.src="fx/transparent.png";
source.onerror="";
return true;
}
var mynoteStar=0;
function installNotes(obj,act){
var Ecran=document.getElementById("main");
var h="";
var color="black";
if(obj.color){color=obj.color;}
var cssPlus="";
if(this.css){cssPlus=this.css;}
if(obj.type=='reset'){
N_T=0;
N_F=0;
remarques='';
memNoteID='';
LUDIscore=0;
globalCompteurDecompt=false;
globalCompteurTimer=false;
globalCompteurTimerSecond=0;
globalCompteurTimerDepart=0;
globalCompteurTimerEnd=0;
initializeDomaines();
callXapiScore=0;
callXapiEnd=0;
InitialMapTarget=0;
ObjectifMapTarget=0;
RunMapDice=false;
RunActionDice=false;
}
if(obj.type=='note'||obj.type=='badge'||obj.type=='note-display'){
recalculAllNoteByPersistence();
var mynote=0;
try
{
if(N_T!=0&&N_F!=0){
mynote=parseInt((N_F/N_T) * 20);
if('function' == typeof(SetScormScore)){
SetScormScore(parseInt(mynote) * 5);
scormProcessScore=parseInt(mynote) * 5;
}
if(obj.option==1){
mynote= Math.round(parseFlo(N_F) * 100) / 100
}
if(mynote<0){mynote=0;}
}
}
catch(err)
{
mynote=0;
}
var rediract="";
if(obj.type=='note'){
globalCompteurDecompt=false;
h='<table style="display:none;color:' + color + ';' +  obj.cssadd + '" ' + rediract ;
h += ' id="table' + obj.id + '" class="bloc' + obj.id + '" >';
h += '<tr><td style="border-bottom:solid 2px ' + color + ';text-align:center;" >';
if(isNaN(mynote)){mynote=0;}
h += mynote;
h += '</td></tr>';
h += '<tr><td style="text-align:center;" >';
if(isNaN(N_T)){N_T=0;}
if(obj.option==1){
h += N_T;
}else{
h += '20';
}
h += '</td></tr>';
h += '</table>';
if('function' == typeof(SetXapiEnd)){
SetXapiEnd(mynote);
}
}
if(obj.type=='note-display'){
h='<table style="display:none;color:' + color + ';' +  obj.cssadd + '" ' + rediract ;
h += ' id="table' + obj.id + '" class="bloc' + obj.id + '" ';
h += ' >';
h += '<tr><td style="border-bottom:solid 2px ' + color + ';text-align:center;" >';
if(isNaN(mynote)){mynote=0;}
h += mynote;
h += '</td></tr>';
h += '<tr><td style="text-align:center;" >';
if(isNaN(N_T)){N_T=0;}
if(obj.option==1){
h += N_T;
}else{
h += '20';
}
h += '</td></tr>';
h += '</table>';
}
if(obj.type=='badge'){
var im="fx/badges/BadgeNo.png";
h='';
var resultSuccess=false;
if(mynote>parseInt(parseInt(obj.text)-1)){
rediract=act;
im="fx/badges/Badge.png";
h += '<div id="com_valid" style="display:none;" >OK</div>';
if(obj.data!=''){
setTimeout(obj.data, 1000);
}
resultSuccess=true;
}else{
h += '<div id="com_valid" style="display:none;" >KO</div>';
if(obj.src!=''){
setTimeout(obj.src, 1000);
}
}
if('function' == typeof(SetXapiScore)){
SetXapiScore(resultSuccess,mynote);
}
if('function' == typeof(SetXapiEnd)){
SetXapiEnd(mynote);
}
h += '<img style="display:none;' +  obj.cssadd + '" ';
h += ' id="bloc' + obj.id + '" class="bloc' + obj.id + '" ';
h += ' src="' + im + '" ';
h += ' />';
h += '<div id="com_note" style="display:none;" >' + mynote + '</div>';
}
Ecran.innerHTML=Ecran.innerHTML + h;
}
if(obj.type=='remarques'){
recalculAllNoteByPersistence();
h='<table style="display:none;color:' + color + ';" ';
h += ' id="table' + obj.id + '" class="bloc' + obj.id + '" >';
h += '<tr><td style="' + alignByObj(obj) + cssPlus + obj.cssadd + '" >';
h += remarques;
h += '</td></tr></table>';
Ecran.innerHTML=Ecran.innerHTML + h;
}
if(obj.type=='finalprogressbar'){
recalculAllNoteByPersistence();
var myPour=0;
try
{
if(N_T!=0&&N_F!=0){
myPour=parseInt((N_F / N_T) * 100);
if('function' == typeof(SetScormScore)){
SetScormScore(parseInt(myPour));
scormProcessScore=parseInt(myPour);
}
if(myPour<0){myPour=0;}
}
}
catch(err)
{
myPour=0;
}
obj.objx=myPour;
obj.border=false;
h += '<img style="' +  obj.cssadd + '" ';
h += ' id="bloc' + obj.id + '" class="bloc' + obj.id + '" ';
h += ' src="images/progress-bar-fond.png" ';
h += ' />';
h += '<div style="position:absolute;background:#ACFA58;width:2px;z-index:2;' +  obj.cssadd + '" ';
h += ' id="bloc-progress' + obj.id + '" class="bloc-progress' + obj.id + '" ';
h += ' ></div>';
h += '<img style="position:absolute;z-index:2;" ';
h += ' id="bloc-mask' + obj.id + '" class="bloc-mask' + obj.id + '" ';
h += ' src="images/progress-bar-mask.png" />';
h += '<table style="position:absolute;color:' + color + ';z-index:2;" ';
h += ' id="table' + obj.id + '" >';
h += '<tr><td id="table-inner' + obj.id + '" ';
h += ' style="text-align:right;font-family:Lucida Bright;" >';
h += '<b>' + myPour+ '%' + '</b>';
h += '</td></tr>';
h += '</table>';
Ecran.innerHTML=Ecran.innerHTML + h;
}
}
function zoomNotes(obj){
if(obj.type=='finalprogressbar'){
var xb=parseInt((obj.getX() + 15) * zoom);
var yb=parseInt((obj.getY() + 13) * zoom);
var wb=parseInt(306 * zoom);
var hb=parseInt(20 * zoom);
$("#bloc-mask" + obj.id).css("left",xb + 'px').css("top",yb + 'px');
$("#bloc-mask" + obj.id).css("width",wb + 'px').css("height",hb + 'px');
xb=xb + 2;
yb=yb + 1;
hb=hb - 2;
$("#bloc-progress" + obj.id).css("left",xb + 'px').css("top",yb + 'px');
$("#bloc-progress" + obj.id).css("height",hb + 'px');
wb=parseInt( parseInt(304/100) * obj.objx) * zoom;
if(obj.border==false){
obj.border=true;
var j=0;
if(obj.objx>15){j=10;}
if(obj.objx>25){j=20;}
for(i=j; i < obj.objx; i++){
wb=parseInt(parseInt(304/100) * i) * zoom;
var fct='$("#table-inner' + obj.id + '").html("<b>' + i + '%</b>");';
fct=fct + '$("#bloc-progress' + obj.id + '").css("width","' + wb + 'px");';
setTimeout(fct, parseInt(i * 30) + 40);
}
wb=parseInt( parseInt(304/100) *  obj.objx) * zoom;
var fct2='$("#table-inner' + obj.id + '").html("<b>' + obj.objx + '%</b>");';
fct2=fct2 + '$("#bloc-progress' + obj.id + '").css("width","' + wb + 'px");';
setTimeout(fct2, parseInt(i * 30) + 40);
}else{
$("#bloc-progress" + obj.id ).css("width", wb + 'px');
}
xb=parseInt((370 + obj.getX() - 40) * zoom);
yb=parseInt(obj.getY() * zoom);
wb=parseInt(40 * zoom);
hb=parseInt(46 * zoom);
$("#table" + obj.id).css("left",xb + 'px').css("top",yb + 'px');
$("#table" + obj.id).css("width",wb + 'px').css("height",hb + 'px');
$("#table-inner" + obj.id).css("font-size",parseInt(17 * zoom) + 'px');
}
}
function gtN20(){
recalculAllNoteByPersistence();
var mynote=0;
try
{
if(N_T!=0&&N_F!=0){
mynote=parseInt((N_F / N_T) * 20);
if(mynote<0){mynote=0;}
}
}
catch(err)
{
mynote=0;
}
return mynote;
}
function gtNPts(){
recalculAllNoteByPersistence();
var mynote=0;
try
{
if(N_T!=0&&N_F!=0){
mynote= Math.round(parseFlo(N_F) * 100) / 100
if(mynote<0){mynote=0;}
}
}
catch(err)
{
mynote=0;
}
return mynote;
}
function gtDom(i){
recalculAllNoteByPersistence();
return domainesPour[i];
}
var nbqcmunique=0;
var qcmRandomize=-1;
var StockRepQ=new Array();
function CRepQ(){
this.k;this.v;
}
function installqcm(obj){
if(obj.type=='qcm'&&obj.theme=='barre'){
installqcmbarre(obj);
}
if(obj.type=='qcm'&&(obj.theme==''||obj.theme=='tight')){
var marginT='';
if(obj.cssadd.indexOf("fixe")!=-1){
obj.theme ='tight';
marginT='padding:0px;margin:0px';
}
allDiapoQuest[parseInt(lastPage0)]='1';
var Ecran=document.getElementById("main");
var color="black";
if(obj.color){
color=obj.color;
}
if(qcmRandomize==-1){
qcmRandomize=Math.floor(Math.random() * 5);
if(qcmRandomize==0){qcmRandomize=1;}if(qcmRandomize==5){qcmRandomize=4;}
}
var myString="";
appliqueDataQCM(obj);
if(obj.text){
myString=obj.text;
}
var eachElement=myString.split(';');
var MyNotes7="";
if(obj.contenu7){
MyNotes7=obj.contenu7;
}
if(MyNotes7==""){"||||||||||||||||||"}
var eachElementNote=MyNotes7.split('|');
var bilansource='<div class="blockbilan" >';
bilansource=bilansource + '<div class="questbilan" >-prv-' + obj.contenu3 + '</div>';
bilansource=bilansource + '<ul>';
var h='<table style="' + marginT + 'display:none;color:' + color + ';' +  obj.cssadd + '" ';
h +=' id="table' + obj.id + '" class="unselectable haveflou bloc' + obj.id +  ' ' +  obj.idscript + '" ';
h += ' >';
if(eachElement==null){
h += '<tr style="' + marginT + '" ><td style="' + marginT + 'text-align:center; border:dotted 1px gray;" ' + act + ' >';
h += 'Erreur';
h += '</td></tr>';
}else{
var randomname="qcm" + Math.floor(Math.random()*10000) + "qcm" ;
var nbrep=0;
var totalrep=0;
for(var e=0 ; e < eachElement.length; e++){
var reponse=eachElement[e];
if(reponse.indexOf('*')==0){
nbrep=nbrep + 1;
}
if(reponse!=''){
totalrep=totalrep + 1;
}
}
if(nbrep>1){randomname='';}
if(obj.option4==1){
if(totalrep>2){
if(qcmRandomize==1){
var ElemRepo=eachElement[0];
var ElemNote=eachElementNote[0];
eachElement[0]=eachElement[2];
eachElementNote[0]=eachElementNote[2];
eachElement[2]=ElemRepo;
eachElementNote[2]=ElemNote;
}
if(qcmRandomize==2){
var ElemRepo=eachElement[0];
var ElemNote=eachElementNote[0];
eachElement[0]=eachElement[1];
eachElementNote[0]=eachElementNote[1];
eachElement[1]=ElemRepo;
eachElementNote[1]=ElemNote;
}
if(qcmRandomize==3){
var ElemRepo=eachElement[totalrep-1];
var ElemNote=eachElementNote[totalrep-1];
eachElement[totalrep-1]=eachElement[0];
eachElementNote[totalrep-1]=eachElementNote[0];
eachElement[0]=ElemRepo;
eachElementNote[0]=ElemNote;
}
if(qcmRandomize==4){
var ElemRepo=eachElement[totalrep-1];
var ElemNote=eachElementNote[totalrep-1];
eachElement[totalrep-1]=eachElement[totalrep-2];
eachElementNote[totalrep-1]=eachElementNote[totalrep-2];
eachElement[totalrep-2]=ElemRepo;
eachElementNote[totalrep-2]=ElemNote;
}
}
}
var preImg="";
for(var e=0 ; e < eachElement.length; e++){
h += '<tr style="' + marginT + '" >';
var checkclass='qcmn';
var reponse=eachElement[e];
var rep=eachElement[e];
if(reponse.indexOf('*')==0){
checkclass='qcmx';
reponse=reponse.replace('*', '');
}
var caseHtml='<td class="qcmcoche qcmcoche' + obj.id + '" style="' + marginT + 'cursor:pointer;text-align:center;" >';
caseHtml += '<div style="position:relative;z-index:0;" class="qcmcoche' + obj.id + '"  >';
caseHtml += '<table class="qcmt cochecase cochecase' + obj.id + '" ' ;
caseHtml += ' style="z-index:1;position:absolute;' + marginT + 'left:0px;top:0px;color:' + color + ';';
if(obj.boite==''){
caseHtml += 'border:solid 1px ' + color + ';" >';
}else{
caseHtml += '" >';
}
var tdid=obj.id + 'td' + e;
var classm=' carre' + obj.id ;
var namerep=rep;
var idRep=LUDI.guid();
var rq=new CRepQ();
rq.k=idRep;
rq.v=namerep;
StockRepQ.push(rq);
caseHtml += '<tr style="' + marginT + '" >';
caseHtml += '<td id="' + tdid + '" name="' + idRep + '" style="' + marginT + '" class="' + checkclass + ' ' +  randomname + classm + '" ';
if(obj.option3==1){
caseHtml += ' data-note="' + eachElementNote[e] + '" ';
}
var actionmini='';
if(obj.boite==''){
actionmini='unCheckJP(\'' +obj.id+'\',\'\');makechecked(\'' + tdid + '\',\'' + randomname + '\');';
caseHtml += ' onclick="' + actionmini + '" >';
}else{
caseHtml += ' >';
}
caseHtml += '</td></tr></table>';
if(obj.boite!=''){
var imgid=obj.id + 'img' + e;
caseHtml += '<img id="' + imgid + '" src="fx/qcm/' + obj.boite + '0.png" class="cocheimg img' +  randomname + ' cocheimg' + obj.id + '" ';
caseHtml += ' style="z-index:2;position:absolute;color:' + color + ';width:10px;height:10px;' + marginT + 'cursor:pointer;" ';
actionmini='unCheckJP(\'' +obj.id+'\',\'' + obj.boite + '\');makecheckedimg(\'' + imgid + '\',\'' + tdid + '\',\'' + randomname + '\',\'' + obj.boite + '\');';
caseHtml=caseHtml + ' onclick="' + actionmini + '" >';
preImg="fx/qcm/" + obj.boite + "1.png";
}
caseHtml=caseHtml + '</div></td>';
if(obj.contenu8==0){
h += caseHtml;
}
if(obj.contenu8==0){
h += '<td class="selectqcmline" style="' + marginT + 'text-align:left;padding-left:10px;" ';
}else{
h += '<td class="selectqcmline" style="' + marginT + 'text-align:right;padding-right:10px;" ';
}
if(actionmini!=''){
h=h + ' onclick="' + actionmini + '" ';
}
h += ' >';
h += convertQcmToTexte(reponse);
h += '</td>';
if(obj.contenu8==1){
h +=  caseHtml;
}
h += '</tr>';
if(checkclass =='qcmx'){
bilansource=bilansource + '<li>' + idRep + '<span class="goodRepBilan" >&nbsp;&#9632;</span></li>';
}else{
bilansource=bilansource + '<li>' + idRep + '</li>';
}
}//For
}//eachElement == null
if(obj.option==1){
h=h + getJePasse(randomname,obj,false);
}
h=h + '</table>';
bilansource=bilansource + '</ul>-cmt-</div>';
obj.bilan=bilansource;
$('#main').append(h);
if(preImg!=""){
$('body').append("<img class='previmg' src='" + preImg + "' style='position:absolute;right:0px;bottom:0px;width:2px;height:2px;' />" );
}
recupDataObjectMem(obj,lastPage0);
}
if(obj.type=='qcmunique'){
var randomname="qcm" + Math.floor(Math.random() * 10000) + "qcm" ;
var Ecran=document.getElementById("main");
var color="black";
if(obj.color){color=obj.color;}
var h='<table style="position:absolute;color:' + color + ';" ';
h += ' id="table' + obj.id + '" class="bloc' + obj.id + '"  ><tr>';
h += '<td style="padding:0;margin:0;" >';
var tdid=obj.id + 'qcmunique';
h += '<table class="qcmt cochecase cochecase' + obj.id + '" ' ;
h += ' style="color:' + color + ';width:20px;height:20px;';
if(obj.boite==''){
h += 'border:solid 1px ' + color + ';" >';
}else{
h += '" >';
}
var checkclass='qcmn';
if(obj.data=='X'){
checkclass='qcmx';
nbqcmunique=nbqcmunique + 1;
}
h += '<tr><td id="' + tdid + '" ';
h += ' name="' + checkclass + '" ';
h += ' class="' + randomname + '" ';
if(obj.boite==''){
h += ' style="padding:0;margin:0;text-align:center;cursor:pointer;background:white;"  ';
h += ' onclick="makecheckedUnik(this,\'' + randomname + '\');" >';
}else{
h += ' style="padding:0;margin:0;text-align:center;cursor:pointer;background:transparent;"  ';
h += ' >';
}
h += '';
h += '</td></tr></table>';
if(obj.boite!=''){
h += '<img src="fx/qcm/' + obj.boite + '0.png" class="cocheimg img' +  randomname + ' cocheimg' + obj.id + '" ';
h += ' style="color:' + color + ';width:10px;height:10px;cursor:pointer;" ';
h += ' onclick="makecheckedimgUnik(this,\'' + tdid + '\',\'' + randomname + '\',\'' + obj.boite + '\');" />';
}
h += '</td></tr></table>';
Ecran.innerHTML=Ecran.innerHTML + h;
recupDataObjectMem(obj,lastPage0);
zoomQcm(obj);
}
}
function installqcmbarre(obj){
allDiapoQuest[parseInt(lastPage0)]='1';
var color="black";
if(obj.color){
color=obj.color;
}
if(qcmRandomize==-1){
qcmRandomize=Math.floor(Math.random() * 5);
if(qcmRandomize==0){qcmRandomize=1;}if(qcmRandomize==5){qcmRandomize=4;}
}
var myString="";
appliqueDataQCM(obj);
if(obj.text){
myString=obj.text;
}
var eachElement=myString.split(';');
var numberEle=eachElement.length;
var MyNotes7="";
if(obj.contenu7){
MyNotes7=obj.contenu7;
}
if(MyNotes7==""){"||||||||||||||||||"}
var eachElementNote=MyNotes7.split('|');
var bilansource='<div class="blockbilan" >';
bilansource += '<div class="questbilan" >-prv-' + obj.contenu3 + '</div>';
bilansource += '<ul>';
var cols=obj.border.split('|');
var h='<table cellpadding=0 cellspacing=1 ';
if(numberEle==1){
actionmini='CheckAllQ(\'' + obj.id + '\',\''+ obj.boite + '\');';
h += ' onclick="' + actionmini + '" ';
}
h += 'style="display:none;';
h += 'color:' + color + ';';
h += 'border:solid 1px ' + cols[0] + ';';
h += 'background-color:' + cols[1] + ';';
h += obj.cssadd + '" ';
h += ' id="table' + obj.id + '" ';
h += ' class="unselectable barBody haveflou bloc' + obj.id +  ' ' +  obj.idscript + '" ';
h += ' >';
if(eachElement==null){
h += '<tr><td style="text-align:center; border:dotted 1px gray;" ' + act + ' >';
h += 'Erreur';
h += '</td></tr>';
}else{
var randomname= "qcm" + Math.floor(Math.random()*10000) + "qcm" ;
var nbrep=0;
var totalrep=0;
for(var e=0 ; e < eachElement.length; e++){
var reponse=eachElement[e];
if(reponse.indexOf('*')==0){
nbrep=nbrep + 1;
}
if(reponse!=''){
totalrep=totalrep + 1;
}
}
if(nbrep>1){randomname='';}
if(obj.option4==1){
if(totalrep>2){
if(qcmRandomize==1){
var ElemRepo=eachElement[0];
var ElemNote=eachElementNote[0];
eachElement[0]=eachElement[2];
eachElementNote[0]=eachElementNote[2];
eachElement[2]=ElemRepo;
eachElementNote[2]=ElemNote;
}
if(qcmRandomize==2){
var ElemRepo=eachElement[0];
var ElemNote=eachElementNote[0];
eachElement[0]=eachElement[1];
eachElementNote[0]=eachElementNote[1];
eachElement[1]=ElemRepo;
eachElementNote[1]=ElemNote;
}
if(qcmRandomize==3){
var ElemRepo=eachElement[totalrep-1];
var ElemNote=eachElementNote[totalrep-1];
eachElement[totalrep-1]=eachElement[0];
eachElementNote[totalrep-1]=eachElementNote[0];
eachElement[0]=ElemRepo;
eachElementNote[0]=ElemNote;
}
if(qcmRandomize==4){
var ElemRepo=eachElement[totalrep-1];
var ElemNote=eachElementNote[totalrep-1];
eachElement[totalrep-1]=eachElement[totalrep-2];
eachElementNote[totalrep-1]=eachElementNote[totalrep-2];
eachElement[totalrep-2]=ElemRepo;
eachElementNote[totalrep-2]=ElemNote;
}
}
}
var preImg="";
for(var e=0 ; e < eachElement.length; e++){
h=h + '<tr class="barSty" ';
h=h + 'onmouseover="this.style.background=\'' + obj.selectcolor + '\';" ';
h=h + 'onmouseout="this.style.background=\'' + cols[1] + '\';" ';
h=h + ' >';
var checkclass='qcmn';
var reponse=eachElement[e];
var rep=eachElement[e];
if(reponse.indexOf('*')==0){
checkclass='qcmx';
reponse=reponse.replace('*', '');
}
var styleft="barStyQcmLeft";
var styright="barStyQcmRight";
var borcolor="border-color: " + cols[0] + ";";
if(e==0){
styleft="";
styright="";
borcolor="";
}
var caseHtml='<td class="qcmcoche ' + styleft + ' qcmcoche';
caseHtml=caseHtml + obj.id + '" style="cursor:pointer;text-align:center;' + borcolor + '" >';
caseHtml=caseHtml + '<div style="position:relative;z-index:0;" class="qcmcoche' + obj.id + '"  >';
caseHtml=caseHtml + '<table class="qcmt cochecase cochecase' + obj.id + '" ' ;
caseHtml=caseHtml + ' style="z-index:1;position:absolute;left:0px;top:0px;color:' + color + ';';
if(obj.boite==''){
caseHtml=caseHtml + 'border:solid 1px ' + color + ';" >';
}else{
caseHtml=caseHtml + '" >';
}
var tdid=obj.id + 'td' + e;
var classm=' carre' + obj.id ;
var namerep=rep;
var idRep=LUDI.guid();
var rq=new CRepQ();
rq.k=idRep;
rq.v=namerep;
StockRepQ.push(rq);
caseHtml=caseHtml + '<tr><td id="' + tdid + '" name="' + idRep + '" ';
caseHtml=caseHtml + '	style="padding:0px;margin:0px;" ';
caseHtml=caseHtml + '	class="' + checkclass + ' ' +  randomname + classm + '" ';
if(obj.option3==1){
caseHtml=caseHtml + ' data-note="' + eachElementNote[e] + '" ';
}
var actionmini='';
if(obj.boite==''){
actionmini='unCheckJP(\'' +obj.id+'\',\'\');makechecked(\'' + tdid + '\',\'' + randomname + '\');';
caseHtml=caseHtml + ' onclick="' + actionmini + '" >';
}else{
caseHtml=caseHtml + ' >';
}
caseHtml=caseHtml +'</td></tr></table>';
if(obj.boite!=''){
var imgid=obj.id + 'img' + e;
caseHtml=caseHtml + '<img id="' + imgid + '" src="fx/qcm/' + obj.boite + '0.png" class="cocheimg img' +  randomname + ' cocheimg' + obj.id + '" ';
caseHtml=caseHtml + ' style="z-index:2;position:absolute;color:' + color + ';width:10px;height:10px;cursor:pointer;" ';
actionmini='unCheckJP(\'' +obj.id+'\',\'' + obj.boite + '\');makecheckedimg(\'' + imgid + '\',\'' + tdid + '\',\'' + randomname + '\',\'' + obj.boite + '\');';
caseHtml=caseHtml + ' onclick="' + actionmini + '" >';
preImg="fx/qcm/" + obj.boite + "1.png";
}
caseHtml=caseHtml + '</div></td>';
h=h + caseHtml;
h=h + '<td class="selectqcmline qcmline' + obj.id ;
h=h + ' ' + styright + '" style="text-align:left;padding-left:10px;' + borcolor + '" ';
if(actionmini!=''){
h=h + ' onclick="' + actionmini + '" ';
}
h=h + ' >';
h=h + convertQcmToTexte(reponse);
h=h + '</td>';
h=h + '</tr>';
if(checkclass =='qcmx'){
bilansource=bilansource + '<li>' + idRep + '<span class="goodRepBilan" >&nbsp;&#9632;</span></li>';
}else{
bilansource=bilansource + '<li>' + idRep + '</li>';
}
}//For
}//eachElement == null
if(obj.option==1){
h=h + getJePasse(randomname,obj,true);
}
h=h + '</table>';
bilansource=bilansource + '</ul>-cmt-</div>';
obj.bilan=bilansource;
$('#main').append(h);
recupDataObjectMem(obj,lastPage0);
}
function getJePasse(randomname,obj,barre){
var color="black";
if(obj.color){
color=obj.color;
}
var cc=''
var styleft="barStyQcmLeft";
var styright="barStyQcmRight";
var barSty="barSty";
if(barre==false){
styleft="";
styright="";
barSty="";
}
cc=cc + '<td class="qcmcoche ' + styleft + ' qcmcoche' + obj.id + '" style="cursor:pointer;text-align:center;" >';
cc=cc + '<div style="position:relative;z-index:0;" class="qcmcoche' + obj.id + '"  >';
var checkclass='qcmn';
var reponse='&nbsp;' + obj.contenu6;
var rep='';
cc=cc + '<table class="qcmt cochecase cochecase' + obj.id + '" ' ;
cc=cc + ' style="z-index:1;position:absolute;left:0px;top:0px;color:' + color + ';';
if(obj.boite==''){
cc=cc + 'border:solid 1px ' + color + ';" >';
}else{
cc=cc + '" >';
}
var tdid=obj.id + 'td100';
var classm=' jepasse' + obj.id;
cc=cc + '<tr><td id="' + tdid + '" name="' + rep + '" class="' + checkclass + ' ' +  randomname + classm + '" ';
var actionmini='';
if(obj.boite==''){
actionmini='unCheckAll(\'' + obj.id + '\',\'\');';
actionmini=actionmini + 'makechecked(\'' + tdid + '\',\'' + randomname + '\');detectJP(\'' + obj.id  + '\');';
cc=cc + ' onclick="' + actionmini + '" >';
}else{
cc=cc + ' >';
}
cc=cc +'</td></tr></table>';
if(obj.boite!=''){
var imgid=obj.id + 'imgjepasse';
actionmini='unCheckAll(\'' + obj.id + '\',\'' + obj.boite + '\');';
actionmini=actionmini + 'makecheckedimg(\'' + imgid + '\',\'' + tdid + '\',\'' + randomname + '\',\'' + obj.boite + '\');detectJP(\'' + obj.id  + '\');';
cc=cc + '<img id="' + imgid + '" src="fx/qcm/' + obj.boite + '0.png" class="cocheimg img' +  randomname + ' cocheimg' + obj.id + ' jepassecocheimg' + obj.id + '" ';
cc=cc + ' style="z-index:2;position:absolute;color:' + color + ';width:10px;height:10px;cursor:pointer;" ';
cc=cc + ' onclick="' + actionmini + '" ';
cc=cc + ' >';
}
cc=cc + '</div></td>';
var crep='';
if(obj.contenu8==0){
crep=crep + '<td class="' + styright + ' selectqcmline" style="text-align:left;padding-left:10px;" ';
}else{
crep=crep + '<td class="' + styright + ' selectqcmline" style="text-align:right;padding-right:10px;" ';
}
if(actionmini!=''){
crep=crep + ' onclick="' + actionmini + '" ';
}
crep=crep + ' >';
crep=crep + '<i>' + reponse + '</i>';
crep=crep + '</td>';
var h='<tr class="' + barSty + '" >' + cc + crep + '</tr>';
if(obj.contenu8==1){
h='<tr class="' + barSty + '" >' + crep + cc + '</tr>';
}
return h;
}
function zoomQcm(obj){
if(obj.type=='qcm'&&obj.theme=='barre'){
var largqcm=parseInt(44 * zoom);
var largQcmImg=parseInt((44-8) * zoom);
var tid=".cochecase" + obj.id;
if(obj.boite==''){
$(tid).css("font-size",parseInt((obj.fontsize * 0.6) * zoom) + "px");
}else{
$(tid).css("font-size","1px");
$(tid).css("color","transparent");
}
var newlargCase=(largqcm-4) + "px";
$(tid).css("width",largQcmImg);
$(tid).css("height",largQcmImg);
var initlargCase=largqcm + "px";
$(tid).css("width",newlargCase);
$(tid).css("height",newlargCase);
$(tid).css("left",parseInt(4* zoom)+ "px");
$(tid).css("top",parseInt(4* zoom)+ "px");
if(obj.boite==''){
$(".qcmcoche" + obj.id).css("width",initlargCase)
$(".qcmcoche" + obj.id).css("height",initlargCase);
}else{
$(".qcmcoche" + obj.id).css("width",initlargCase);
$(".qcmcoche" + obj.id).css("height",initlargCase);
$(".qcmline" + obj.id).css("height",initlargCase);
var initlargDiv=(largqcm - 2) + "px";
$(".qcmcoche" + obj.id + ":first").css("width",initlargDiv);
$(".qcmcoche" + obj.id + ":first").css("height",initlargDiv);
$(".cocheimg" + obj.id).css("width",largQcmImg).css("height",largQcmImg);
$(".cocheimg" + obj.id).css("left",parseInt(4* zoom)+ "px").css("top",parseInt(4* zoom)+ "px");
}
if(obj.boite==''){
$(".qcmx,.qcmn").css("font-size",parseInt((obj.fontsize * 0.8) * zoom) + "px");
}
}
if(obj.type=='qcm'&&(obj.theme==''||obj.theme=='tight')){
var largqcm=parseInt(parseInt(obj.contenu4) * zoom);
if(largqcm<10){largqcm=10;}
if(largqcm<parseInt(obj.fontsize * zoom)){
largqcm=parseInt(obj.fontsize * zoom);
}
if(obj.theme=='tight'){
var ctrC=parseInt(((obj.fontsize * 1.437) + 8) * zoom);
if(largqcm<ctrC){
largqcm=ctrC;
}
}
var tid=".cochecase" + obj.id;
if(obj.boite==''){
$(tid).css("font-size",parseInt((obj.fontsize * 0.8) * zoom) + "px");
}else{
$(tid).css("font-size","1px");
$(tid).css("color","transparent");
}
var newlargCase=parseInt(largqcm-2) + "px";
$(tid).css("width",newlargCase);
$(tid).css("height",newlargCase);
if(obj.boite==''){
var newlargCaseSpe=parseInt(largqcm * 1.1) + "px";
$(".qcmcoche" + obj.id).css("width",newlargCaseSpe)
$(".qcmcoche" + obj.id).css("height",newlargCase);
}else{
if(obj.theme=='tight'){
$(".qcmcoche" + obj.id).css("width",newlargCase).css("height",parseInt(largqcm) + "px");
}else{
$(".qcmcoche" + obj.id).css("width",newlargCase).css("height",newlargCase);
}
}
var newlarg=largqcm + "px";
$(".cocheimg" + obj.id).css("width",newlarg).css("height",newlarg);
if(obj.boite==''){
$(".qcmx,.qcmn").css("font-size",parseInt((obj.fontsize * 0.8) * zoom) + "px");
}
}
if(obj.type=='qcmunique'){
var largqcm=parseInt(obj.getH() * zoom);
var tid=".cochecase" + obj.id;
var num= $(tid).length;
$(tid).css("font-size",parseInt((obj.fontsize * 0.8) * zoom) + "px");
var newlargCase=parseInt(largqcm-2) + "px";
$(tid).css("width",newlargCase);
$(tid).css("height",newlargCase);
var newlarg=largqcm + "px";
$(".cocheimg" + obj.id).css("width",newlarg).css("height",newlarg);
}
}
function unCheckAll(objid,boite){
if(ViewerAfterBilan){return true;}
eventCatchScript=true;
$('.cocheimg' + objid).attr('src','fx/qcm/' + boite + '0.png');
$('.carre' + objid).each(
function(index){
$(this).html("");
}
);
}
function CheckAllQ(objid,boite){
if(ViewerAfterBilan){return true;}
eventCatchScript=true;
$('.cocheimg' + objid).attr('src','fx/qcm/' + boite + '1.png');
$('.carre' + objid).each(
function(index){
$(this).html("X");
}
);
}
function unCheckJP(objid,boite){
if(ViewerAfterBilan){return true;}
eventCatchScript=true;
$('.jepassecocheimg' + objid).attr('src','fx/qcm/' + boite + '0.png');
$('.jepasse' + objid).each(
function(index){
$(this).html("");
}
);
detectJP(objid);
}
function makecheckedimg(imgid,objid,nm,boite){
if(ViewerAfterBilan){return true;}
eventCatchScript=true;
var img=document.getElementById(imgid);
if(nm!=''){
$('.' + nm).each(
function(index){
$(this).html("");
$('.img' + nm).attr('src','fx/qcm/' + boite + '0.png');
}
);
}
var obj=$('#' + objid);
if(obj.html()!="X"){
obj.html("X");
img.src='fx/qcm/' + boite + '1.png';
}else{
obj.html("");
img.src='fx/qcm/' + boite + '0.png';
}
}
function makechecked(objid,nm){
if(ViewerAfterBilan){return true;}
eventCatchScript=true;
var obj=document.getElementById(objid);
if(nm!=''){
$('.' + nm).each(
function(index){
$(this).html("");
}
);
}
if(obj.innerHTML!="X"){
obj.innerHTML="X";
}else{
obj.innerHTML="";
}
}
function detectJP(ido){
if(ViewerAfterBilan){return true;}
if($('.jepasse' + ido).html()=="X"){
CObjets[ido].options2=1;
}else{
CObjets[ido].options2=0;
}
}
function makecheckedimgUnik(img,objid,nm,boite){
if(ViewerAfterBilan){return true;}
if(nbqcmunique==1){
eventCatchScript=true;
for(var j=0; j < CObjets_count; j++){
var ctrObj=CObjets[j];
if(ctrObj.type=='qcmunique'){
var objIMG=$('.cocheimg' + ctrObj.id);
objIMG.attr('src','fx/qcm/' + ctrObj.boite + '0.png');
var tdid=ctrObj.id + 'qcmunique';
$('#' + tdid).html("");
}
}
}
var obj=$('#' + objid);
if(obj.html()!="X"){
obj.html("X");
img.src='fx/qcm/' + boite + '1.png';
}else{
obj.html("");
img.src='fx/qcm/' + boite + '0.png';
}
}
function makecheckedUnik(obj,nm){
if(ViewerAfterBilan){return true;}
if(nbqcmunique==1){
eventCatchScript=true;
for(var j=0; j < CObjets_count; j++){
var ctrObj=CObjets[j];
if(ctrObj.type=='qcmunique'){
var objIMG=$('.cocheimg' + ctrObj.id);
objIMG.attr('src','fx/qcm/' + ctrObj.boite + '0.png');
var tdid=ctrObj.id + 'qcmunique';
$('#' + tdid).html("");
}
}
}
if(obj.innerHTML!="X"){
obj.innerHTML="X";
}else{
obj.innerHTML="";
}
}
function convertQcmToTexte(data){
data=data.replace('.,', ';');
data=data.replace('.,', ';');
return data;
}
function installMotsaRelier(obj){
if(obj.type=='motatrier'){
var color="black";
if(obj.color){
color=obj.color;
}
var h='<div style="left:50px;top:150px;width:450px;height:400px;" ';
h += 'class="ludiSortableListSortable bloc' + obj.id + '"  >';
h += '<div><div data-force="5" ></div></div>';
h += '<div data-force="5" ';
h += 'class="ludiSortableListSortableUl" style="margin-right:2%;" >';
h += '<div>&nbsp;</div>';
h += '<ul id="advancedA-' + obj.id + '" class="ludiSortableUl" >';
h += recomposeMotsaRelier(obj.contenu2);
h += '</ul>';
h += '</div>';
h += '<div data-force="5" class="ludiSortableListSortableUl2" >';
h += '<div style="text-align:center;color:gray;" >' + obj.contenu7 + '</div>';
h += '<ul id="advancedB-' + obj.id + '" class="ludiSortableUl" >';
h += '</ul>';
h += '</div>';
h += '<div style="clear: both"></div>';
h += '</div>';
addToM(h);
recupDataObjectMem(obj,lastPage0);
setTimeout('installMotsaRelierProcess(' + obj.id + ')',200);
}
}
function recomposeMotsaRelier(liste){
var h='';
var eachElementTried=liste.split('|');
for(var e=0 ; e < eachElementTried.length; e++){
var reponse=eachElementTried[e];
if(reponse!=''){
h += '<li>' + reponse + '</li>';
}
}
return h;
}
var sortById=function (id){ return document.getElementById(id); }
function installMotsaRelierProcess(i){
if(Sortable){
Sortable.create(sortById('advancedA-' + i),{
sort: true,
group:{name:'advanced',pull:true,put:true},
animation: 250
});
Sortable.create(sortById('advancedB-' + i),{
sort: true,
group:{name:'advanced',pull:true,put:true},
animation: 250
});
}else{
alertm('AIE !');
}
}
function recupMotsaRelier(obj){
var r="";
var idul ='#advancedB-' + obj.id + " li";
$(idul).each(function(n){
r=r + $(this).html() + "|";
});
return r;
}
function recupMotsaRelierLeft(obj){
var r="";
var idul ='#advancedA-' + obj.id + " li";
$(idul).each(function(n){
r=r + $(this).html() + "|";
});
return r;
}
function isMotsaRelierLeft(obj){
var r="";
var idul ='#advancedA-' + obj.id + " li";
$(idul).each(function(n){
return true;
});
return false;
}
function controlTwoListMotsaRelier(L1,L2){
var eachElementTried1=L1.split('|');
var eachElementTried2=L2.split('|');
for(var e=0 ; e < eachElementTried1.length; e++){
var data1=Sit(eachElementTried1[e]);
var data2=Sit(eachElementTried2[e]);
if(data1!=''){
if(data2==''){
return false;
}
if(data2!=data1){
return false;
}
}
}
return true;
}
function getMotsRelierBilan(mesreponses,L2){
var mesreponses1=mesreponses.split('|');
var eachElementTried2=L2.split('|');
var r='<ul>';
for(var e=0 ; e < mesreponses1.length; e++){
var data1=Sit(mesreponses1[e]);
var data2=Sit(eachElementTried2[e]);
if(data1!=''){
if(data2!=''){
if(data2==data1){
r=r + '<li>' + mesreponses1[e] + '</li>';
}else{
r=r + '<li><strike>' + mesreponses1[e] + '</strike></li>';
}
}
}
}
r=r + '</ul>';
return r;
}
function installtext(obj,act){
var color="black";
if(obj.color){
color=obj.color;
}
var cssPlus="";
if(obj.css){
cssPlus=obj.css;
}
if(obj.boite=="bbullewhite"||obj.boite=="bcbullewhite"||obj.boite=="bdbullewhite"||obj.boite=="clouding"){
cssPlus=cssPlus.replace('border','no-border');
cssPlus=cssPlus.replace('border-top','no-border');
cssPlus=cssPlus.replace('border-bottom','no-border');
cssPlus=cssPlus.replace('background','no-background');
}
var Ecran=document.getElementById("main");
var h='';
if(obj.type=='textimg'){
var ht=getBoite(obj);
var onmo='';
var srctemp=obj.src;
if(obj.field1!=''){
var srcfield1=obj.field1;
if(srcfield1.indexOf('/')==-1){
srcfield1='images/' + obj.field1;
}
onmo=' onMouseOver="$(\'#bloc' + obj.id  + '\').attr(\'src\',\'' + srcfield1 + '\');" ';
onmo += ' onMouseLeave="$(\'#bloc' + obj.id  + '\').attr(\'src\',\'' + srctemp + '\');" ';
}
h='<img style="display:none;" ';
h += ' id="bloc' + obj.id + '" class="unselectable bloc' + obj.id + '" ';
h += ' src="' + srctemp + '" ';
h += act;
h += ' />';
h += '<table style="display:none;color:' + color + ';" ';
h += ' id="table' + obj.id + '" class="bloc' + obj.id + ' ' + obj.idscript + '" ';
h += ' >';
h += '<tr><td id="innerbloc' + obj.id + '" class="' + obj.idscript + 'inner" ';
h += ' style="text-align:center;color:' + color + ';' + obj.cssadd + '" ' + act  + onmo + ' ';
h += ' >';
h += obj.text;
h += '</td></tr></table>';
if(ht!=''){
h += ht;
}
Ecran.innerHTML=Ecran.innerHTML + h;
}
if(obj.type=='texthtml'){
var ht=getBoite(obj);
var txtcss= obj.cssadd + cssPlus;
txtcss=txtcss.replace("ZdeslashA","/");
txtcss=txtcss.replace("ZdeslashA","/");
h='';
h += '<div style="display:none;color:' + color + ';position:absolute;' + txtcss + '" ';
h += ' class="unselectable haveflou unselectable bloc' + obj.id + '" unselectable="on" >';
var contentAffiche=appliqueVarsInTxt(obj.text);
h += '<div style="padding:1%;" >' + contentAffiche + '</div>';
h += '</div>';
if(ht!=''){
h=h + ht;
}
Ecran.innerHTML=Ecran.innerHTML + h;
}
if(obj.type=='text'){
var ht=getBoite(obj);
if(obj.boite=="scrollpro"){
cssPlus="";
}
h='';
h += '<table style="display:none;color:' + color + ';" ';
h += ' id="table' + obj.id + '" unselectable="on" ';
h += ' class="haveflou unselectable bloc' + obj.id + ' ' +  obj.idscript + '" ';
h += ' >';
h += '<tr>';
h += '<td id="innerbloc' + obj.id + '" ';
h += ' style="position:relative;' + alignByObj(obj) + cssPlus + obj.cssadd + '" ';
var classN="";
if(obj.contenu3=='txneo21'){
classN="txneo21 ";
}
h += 'class="unselectable ' + classN  +  obj.idscript + 'inner" unselectable="on" >';
var contentAffiche=appliqueVarsInTxt(obj.text);
if(obj.boite=="scrollpro"){
h +=  "<div id='tablescrool" + obj.id + "' style='position:relative;width:100%;height:200px;overflow:hidden;' >";
h +=  contentAffiche;
h +=  "</div>"
}else{
if(obj.align=='Fit'){
h += contentAffiche;
}else{
h += contentAffiche;
}
}
h=h + '</td></tr></table>';
if(obj.align=='Fit'||obj.boite=="scrollpro"){
h += '<table style="position:absolute;top:1700px;left:1700px;" ';
h += ' data-ftsize="10" ';
h += ' id="fit' + obj.id + '" class="fit' + obj.id + '" >';
h += '<tr>';
h += '<td id="innerfit' + obj.id + '" style="' + alignByObj(obj) + '" >';
h += contentAffiche;
h += '</td></tr></table>';
}
if(ht!=''){
h += ht;
}
$('#main').append(h);
}
if(obj.type=='textscrool'){
var ht=getBoite(obj);
h='';
h=h + '<table style="display:none;color:' + color + ';" ';
h=h + ' id="table' + obj.id + '" unselectable="on" ';
h=h + ' class="haveflou unselectable bloc' + obj.id + ' ' +  obj.idscript + '" ';
h=h + ' >';
h=h + '<tr>';
h=h + '<td id="innerbloc' + obj.id + '" style="' + alignByObj(obj) + cssPlus + obj.cssadd + '" class="unselectable ' +  obj.idscript + 'inner" unselectable="on" >';
var contentAffiche=appliqueVarsInTxt(obj.text);
h=h + "<div id='tablescrool" + obj.id + "' style='width:100%;height:200px;overflow:auto;' >";
h=h +  contentAffiche;
h=h + "</div>"
h=h + '</td></tr></table>';
if(ht!=''){
h=h + ht;
}
Ecran.innerHTML=Ecran.innerHTML + h;
}
if(obj.type=='textlabel'){
var cssDyna="position:absolute;padding:0;margin:0;color:" + color + ";";
if(obj.align=="LeftBottom"){
cssDyna += "left:0;bottom:0;line-height:0.7;";
}
if(obj.align=="LeftTop"){
cssDyna += "left:0;top:0;line-height:0.7;";
}
if(obj.align=="RightTop"){
cssDyna += "right:0;top:0;line-height:0.7;";
}
if(obj.align=="RightBottom"){
cssDyna += "right:0;bottom:0;line-height:0.7;";
}
h='<div style="display:none;padding:0;margin:0;border:solid 0px gray;" ';
h += ' id="bloc' + obj.id + '" unselectable="on" ';
h += ' class="haveflou unselectable bloc' + obj.id + ' ' +  obj.idscript + '" >';
h += '<span id="innerbloc' + obj.id + '" ';
h += ' style="' + cssDyna + cssPlus + obj.cssadd + '"  class="unselectable ' +  obj.idscript + 'inner" unselectable="on"  >';
var contentAffiche=appliqueVarsInTxt(obj.text);
h=h + contentAffiche;
h=h + '<span></div>';
$('#main').append(h);
}
}
function zoomScrollText(i){
var obj=CObjets[i];
var wb=parseInt(obj.getW() * zoom);
var hb=parseInt(obj.getH() * zoom);
$("#tablescrool" + i).css("font-size",parseInt(obj.getFts() * zoom) + 'px');
$("#tablescrool" + i + " h1").css("font-size",parseInt((obj.getFts()+4) * zoom) + 'px');
$("#tablescrool" + i + " h1").css("font-weight",'bold');
$("#tablescrool" + i + " h2").css("font-size",parseInt((obj.getFts()+3) * zoom) + 'px');
$("#tablescrool" + i + " h2").css("font-weight",'bold');
$("#tablescrool" + i + " h3").css("font-size",parseInt((obj.getFts()+2) * zoom) + 'px');
$("#tablescrool" + i + " h3").css("font-weight",'bold');
$("#tablescrool" + i + " h4").css("font-size",parseInt((obj.getFts()+1) * zoom) + 'px');
$("#tablescrool" + i + " h5").css("font-size",parseInt((obj.getFts()+1) * zoom) + 'px');
$("#tablescrool" + i + " h6").css("font-size",parseInt((obj.getFts()+1) * zoom) + 'px');
$("#tablescrool" + i + " h7").css("font-size",parseInt((obj.getFts()+1) * zoom) + 'px');
$("#fit" + i).css("font-size",parseInt(obj.getFts() * zoom) + 'px');
$("#fit" + i).css("width", wb + 'px');
var hreal=$("#innerfit" + i).height();
if(hreal>hb){
$("#tablescrool"+ i).css("overflow","auto");
$("#tablescrool"+ i).css("height", hb + "px");
$("#tablescrool"+ i).css("position","relative");
$("#tablescrool"+ i).css("top","0px");
}else{
$("#tablescrool"+ i).css("height", hreal + "px");
$("#tablescrool"+ i).css("overflow","visible");
$("#tablescrool"+ i).css("position","relative");
if(obj.align=='LeftTop'||obj.align=='RightTop'||obj.align=='Justify'){
$("#tablescrool"+ i).css("position","relative");
$("#tablescrool"+ i).css("top","0px");
}
if(obj.align=='LeftCenter'||obj.align=='RightCenter'||obj.align=='Center'||obj.align=='Fit'){
$("#tablescrool"+ i).css("position","absolute");
var decM=(hb - hreal)/2;
$("#tablescrool"+ i).css("top",decM + "px");
}
if(obj.align=='LeftBottom'||obj.align=='RightBottom'){
$("#tablescrool"+ i).css("position","absolute");
var decM=(hb - hreal);
$("#tablescrool"+ i).css("top",decM + "px");
}
}
if(hreal==0){
setTimeout('zoomScrollText(' + obj.id + ');', 100);
}
}
function zoomFitText(i){
var obj=CObjets[i];
var wb=parseInt(obj.getW() * zoom);
var hb=parseInt(obj.getH() * zoom);
var ftreal=parseInt($("#fit" + obj.id).attr("data-ftsize"));
var ftrealnew=ftreal;
$("#fit" + obj.id).css("font-size",ftreal + 'px');
$("#fit" + obj.id).css("width", wb + 'px');
var hreal=$("#innerfit" + obj.id).height();
if(hreal==0){
setTimeout('zoomFitText(' + obj.id + ');', 60);
return false;
}
var difreal=parseInt(hb/3);
if(hreal<difreal){
ftreal=parseInt(ftreal * 2);
}else{
if(hreal<parseInt(hb * 0.8)){
ftreal=ftreal + 1;
}else{
if(hreal>parseInt(hb * 0.9)){
ftreal=ftreal - 1;
}
}
}
if(ftreal>24){
ftreal=24;
}
if(ftreal>ftrealnew){
$("#fit" + obj.id).attr("data-ftsize",ftreal);
$("#innerbloc" + obj.id).css("opacity",'0.6');
setTimeout('zoomFitText(' + obj.id + ');', 60);
}else{
$("#fit" + obj.id).attr("data-ftsize",ftrealnew);
$("#fit" + obj.id).css("font-size",ftrealnew + 'px');
$("#innerbloc" + obj.id).css("font-size",ftrealnew + 'px');
$("#FitDiv" + obj.id).css("line-height",ftrealnew + 'px');
$("#innerbloc" + obj.id).css("opacity",'1');
hreal=$("#innerfit" + obj.id).height();
if(hreal>parseInt(hb * 0.9)){
ftrealnew=ftrealnew - 1;
$("#fit" + obj.id).attr("data-ftsize",ftrealnew);
$("#fit" + obj.id).css("font-size",ftrealnew + 'px');
$("#innerbloc" + obj.id).css("font-size",ftrealnew + 'px');
$("#FitDiv" + obj.id).css("line-height",ftrealnew + 'px');
}
}
}
function installBoiteTexte(obj,act){
var cssPlus="";
if(obj.css){
cssPlus=obj.css;
}
if(obj.type=='boitetexte'){
var color="black";
if(obj.color){
color=obj.color;
}
var h='<div style="color:' + color + ';" ';
h += ' id="table' + obj.id + '" ';
h += 'class="table' + obj.id + ' ' + obj.idscript + ' ' + obj.boite + ' alterbloc' + obj.id + '" ';
h += ' >';
var boit=obj.boite.replace("box","");
h += '<div id="roundblue' + obj.id + '" class="' + boit + '" >';
var boitText=obj.boite.replace("box","text");
h += '<div id="roundbluetext' + obj.id + '" class="' + boitText + '" >';
h += obj.text;
h += '</div></div></div>';
addToM(h);
}
if(obj.type=='btncirculaire'){
var h='<div ' + act;
h += ' id="roundboutongray' + obj.id + '" ';
h += 'class="roundboutongray alterbloc' + obj.id + '" >';
h += '<a id="roundboutongrayinner' + obj.id + '" ';
if(obj.getW()<80){
h=h + 'class="roundboutonbef5" >';
}else{
h=h + 'class="roundboutonbef10" >';
}
h += '<div id="roundboutongrayicon' + obj.id + '" class="roundboutongrayicon ' + obj.idscript  + '" ></div>';
h += '</a></div>';
addToM(h);
if(obj.idscript.indexOf("noicon")==-1){
$("#roundboutongrayicon" + obj.id).css('background-image',' url(css/icons/' + obj.text + '.png)');
}
}
if(obj.type=='panelboxshow'){
var color="black";
if(obj.color){
color=obj.color;
}
var h='<div id="LargegrayPanel' + obj.id + '" ';
h += 'class="LargegrayPanel alterbloc' + obj.id + '" >';
h += '<a onClick="actPbshow(' + obj.id + ');" id="LargegrayPanelInner' + obj.id + '" ';
h += 'class="LargegrayPanelInner" style="color:' + color + ';' + cssPlus + '" >';
h += obj.text + '<span style="font-family:arial;" >&nbsp;&#9207;</arial>';
h += '</a>';
h += '<a onClick="actPbshow(' + obj.id + ');" id="LargegrayPanelBottom' + obj.id + '" ';
h += ' style="display:none;" class="LargegrayPanelBottom" ></a>';
h += '<div id="LargegrayPanelText' + obj.id + '" style="display:none;' + cssPlus + '" ';
h += ' class="LargegrayPanelText" >';
h += obj.contenu2 + '<br/><br/>';
h += '</div></div>';
addToM(h);
}
if(obj.type=='panelslide'){
var sens='Right';
if(obj.getX()<20){
sens='Left';
}
if(obj.id!=activePanelSlideObject){
closePanelSideObject();
activePanelSlideObject=-1;
}
var classPS='LPanelSide';
if(obj.contenu3=='infopanelslide.png'){
classPS='LPanelSidelarg';
}
var h='<div id="LargePanelSide' + obj.id + '" ';
h += ' class="LargePanelSide' + sens + ' ' + classPS + '" ';
h += ' onClick="actPanelSide' + sens + '(' + obj.id + ');" >';
h += '<div id="PanelSideVerticalText' + obj.id + '" ';
if(obj.contenu3=='infopanelslide.png'){
h += ' class="LargePanelSideVerticalTextLarg" ';
}else{
h += ' class="LargePanelSideVerticalText" ';
}
h += ' style="background-image:url(images/' + obj.contenu3 + ');" ';
h += '></div>';
h += '</div>';
h += '<div id="LargePanelSideInner' + obj.id + '" ';
h += ' class="LargePanelSideInner' + sens + ' PanelSideInner" >';
h += '<div class="PanelSideCross" ';
h += ' style="' + cssPlus + '" ';
h += ' onClick="actPanelSide' + sens + '(' + obj.id + ');" >';
h += '&#215;</div><br>';
h += obj.contenu2;
h += '</div>';
addToM(h);
}
if(obj.type=='panelcenter'){
var h='<div id="LPanelC' + obj.id + '" id="LPanelCenter" class="LPanelCenter" ';
h += ' onClick="actPclinkCenter (' + obj.id + ');" >';
h += '<div class="p1"></div><div class="p2"></div>';
h += '<div class="p3"></div><div class="p4"></div></div>';
if(obj.getX()>largEcranWidth-320){
if(obj.getY()>(largEcranHeight-320)){
h += '<div id="PanelCenterLink' + obj.id + '" class="PanelCenterLink" ></div>';
}else{
h += '<div id="PanelCenterLink' + obj.id + '" class="PanelCenterLink90" ></div>';
}
}else{
if(obj.getY()>largEcranHeight-320){
h += '<div id="PanelCenterLink' + obj.id + '" class="PanelCenterLink90" ></div>';
}else{
h += '<div id="PanelCenterLink' + obj.id + '" class="PanelCenterLink" ></div>';
}
}
h += '<div id="PanelCenterInner' + obj.id + '" class="PanelCenterInner" >';
h += '<div class="PanelSideCross" ';
h += ' style="' + cssPlus + '" ';
h += ' onClick="closePclinkCenter();" >';
h += '&#215;</div>';
h += obj.contenu2;
h += '</div>';
addToM(h);
}
if(obj.type=='menuludibox'){
var h='<a id="topludimenu' + obj.id + '" ';
h += ' class="topludimenu' + obj.theme + ' bloc' + obj.id + '" ';
h += ' onClick="actShowNavLudiMenu(' + obj.id + ');" >';
h += '</a>';
h += ' <ul id="navludimenu' + obj.id + '" class="navludimenu" >';
h += obj.text;
h += ' </ul>';
addToM(h);
}
if(obj.type=='menuludiblock'){
var eachico=obj.contenu2.split('|');
var eachtxt=obj.contenu3.split('|');
var eachdiap=obj.contenu4.split('|');
var h='<ul id="blockmenu' + obj.id + '" ';
h += ' class="blockmenu bloc' + obj.id + '" >';
h += '<a onclick="LUDI.goPage('+ eachdiap[0] +');"><li>';
h += '<img class="blockmenualignleft" ';
h += 'src="css/icons/' + eachico[0] + '" />';
h += eachtxt[0];
h += '</li></a>';
h += '<a onclick="LUDI.goPage('+ eachdiap[1] +');"><li>';
h += '<img class="blockmenualignleft" ';
h += 'src="css/icons/' + eachico[1] + '" />';
h += eachtxt[1];
h += '</li></a>';
h += '<a onclick="LUDI.goPage('+ eachdiap[2] +');"><li>';
h += '<img class="blockmenualignleft" ';
h += 'src="css/icons/' + eachico[2] + '" />';
h += eachtxt[2];
h += '</li></a>';
h += '<a onclick="LUDI.goPage('+ eachdiap[3] +');"><li>';
h += '<img class="blockmenualignleft" ';
h += 'src="css/icons/' + eachico[3] + '" />';
h += eachtxt[3];
h += '</li></a>';
h += '</ul>';
$("#main").append(h);
}
}
function zoomBoiteTexte(obj){
if(obj.type=='boitetexte'){
var xb=parseInt(obj.getX() * zoom);
var yb=parseInt(obj.getY() * zoom);
var wb=parseInt(obj.getW() * zoom) - 20;
var hb=parseInt(obj.getH() * zoom) - 20;
var tb=$(".table" + obj.id);
tb.css("left",xb + 'px');
tb.css("top" ,yb + 'px');
tb.css("width",wb + 'px');
tb.css("height",hb + 'px');
tb.css("font-size",parseInt(obj.fontsize * zoom) + "px");
wb=wb - 22;
hb=hb - 22;
var rb=$("#roundblue" + obj.id);
rb.css("width",wb + 'px');
rb.css("height",hb + 'px');
wb=wb + 13;
hb=hb - 4;
$("#roundbluetext" + obj.id).css("width",wb + 'px').css("height",hb + 'px');
}
if(obj.type=='btncirculaire'||obj.type=='audiocircle'){
var xb=parseInt(obj.getX() * zoom);
var yb=parseInt(obj.getY() * zoom);
var tb=$("#roundboutongray" + obj.id);
tb.css("left",xb + 'px');
tb.css("top" ,yb + 'px');
tb.css("z-index" ,obj.ind);
var marginR=parseInt(10);
if(obj.getW()<80){
marginR=5;
}
var wb=parseInt(obj.getW() * zoom) - ( marginR + marginR + 3);
var hb=parseInt(obj.getH() * zoom) - ( marginR + marginR + 3);
var rbb=$("#roundboutongrayinner" + obj.id);
rbb.css("width" ,wb + 'px');
rbb.css("height",hb + 'px');
rbb.css("line-height",hb + 'px');
rbb.css("margin",marginR + 'px');
var ibb=$("#roundboutongrayicon" + obj.id);
ibb.css("width" ,wb + 'px');
ibb.css("height",hb + 'px');
}
if(obj.type=='panelboxshow'){
var xb=parseInt(obj.getX() * zoom);
var yb=parseInt(obj.getY() * zoom);
var wb=parseInt(obj.getW() * zoom) + 5;
var hb=parseInt(obj.getH() * zoom);
var tb=$("#LargegrayPanel" + obj.id);
tb.css("left",xb + 'px');
tb.css("top" ,yb + 'px');
tb.css("width",wb + 'px');
tb.css("height" ,hb + 'px');
wb=wb-6;
hb=hb-2;
var panin=$("#LargegrayPanelInner" + obj.id);
panin.css("width",wb + 'px');
panin.css("height" ,hb + 'px');
panin.css("line-height",hb + 'px');
panin.css("font-size",parseInt(16 * zoom) + "px");
var panbott=$("#LargegrayPanelBottom" + obj.id);
panbott.css("width",wb + 'px');
$("#LargegrayPanelText" + obj.id).css("font-size",parseInt(obj.fontsize * zoom) + "px");
obj.objy=obj.getY();
}
if(obj.type=='panelslide'){
var yb=parseInt(obj.getY() * zoom);
var hb=parseInt(obj.getH() * zoom);
var tb=$("#LargePanelSide" + obj.id);
tb.css("top" ,yb + 'px').css("height" ,hb + 'px');
$("#PanelSideVerticalText" + obj.id).css("height" ,hb + 'px');
$("#LargePanelSideInner" + obj.id).css("font-size",parseInt(obj.fontsize * zoom) + "px");
if(obj.contenu5==""){
obj.contenu5=400;
}
var largW=parseInt(obj.contenu5);
if(largW>parseInt(largEcranWidth*zoom)){
largW=parseInt(largEcranWidth*zoom);
}
var sens='Right';
if(obj.getX()<20){
sens='Left';
}
if(sens=='Right'){
$("#LargePanelSideInner" + obj.id).css("right",'-'+(largW+2) + "px");
}else{
$("#LargePanelSideInner" + obj.id).css("left",'-'+(largW+2) + "px");
}
$("#LargePanelSideInner" + obj.id).css("width",(largW -20) + "px");
}
if(obj.type=='panelcenter'){
var xb=parseInt(obj.getX() * zoom)-25;
var yb=parseInt(obj.getY() * zoom)-25;
var tb=$("#LPanelC" + obj.id);
tb.css("left" ,xb + 'px');
tb.css("top" ,yb + 'px');
var pcl=$("#PanelCenterLink" + obj.id);
if(obj.getX()>largEcranWidth-320){
if(obj.getY()>(largEcranHeight-320)){
xb=parseInt(obj.getX() * zoom)-175;
yb=parseInt(obj.getY() * zoom)-175;
pcl.css("left" ,xb + 'px');
pcl.css("top" ,yb + 'px');
xb=parseInt(obj.getX() * zoom) - 400;
yb=parseInt(obj.getY() * zoom) - 400;
}else{
xb=parseInt(obj.getX() * zoom)-175;
yb=parseInt(obj.getY() * zoom)-25;
pcl.css("left" ,xb + 'px');
pcl.css("top" ,yb + 'px');
xb=parseInt(obj.getX() * zoom) - 400;
yb=parseInt(obj.getY() * zoom) + 100;
}
}else{
if(obj.getY()>(largEcranHeight-320)){
xb=parseInt(obj.getX() * zoom)-25;
yb=parseInt(obj.getY() * zoom)-175;
pcl.css("left" ,xb + 'px');
pcl.css("top" ,yb + 'px');
xb=parseInt(obj.getX() * zoom) + 100;
yb=parseInt(obj.getY() * zoom) - 400;
}else{
pcl.css("left" ,xb + 'px');
pcl.css("top" ,yb + 'px');
xb=parseInt(obj.getX() * zoom) + 100;
yb=parseInt(obj.getY() * zoom) + 100;
}
}
var limity=parseInt(parseInt(largEcranHeight * zoom)-315);
if(yb>limity){
yb=limity;
}
if(yb<5){
yb=5;
}
var limitx=parseInt(parseInt(largEcranWidth * zoom)-315);
if(xb>limitx){
xb=limitx;
}
if(xb<5){
xb=5;
}
var pcl=$("#PanelCenterInner" + obj.id);
pcl.css("left",xb + 'px');
pcl.css("top" ,yb + 'px');
var fz=parseInt(obj.fontsize * zoom);
if(fz<10){
fz=10;
}
$("#PanelCenterInner" + obj.id).css("font-size",fz + "px");
}
if(obj.type=='menuludibox'){
var tb=$("#navludimenu" + obj.id);
var xb=parseInt(obj.getX() * zoom);
var yb=parseInt(obj.getY() * zoom) + parseInt(obj.getH() * zoom) + 10;
if(obj.getX()<largEcranWidth/2){
xb=parseInt(obj.getX() * zoom);
tb.css("left",xb + "px");
}else{
xb=parseInt((largEcranWidth-(obj.getX()+obj.getH()))*zoom);
tb.css("right",xb + "px");
}
if(obj.getY()<largEcranHeight/2){
yb=parseInt(obj.getY() * zoom) + parseInt(obj.getH() * zoom) + 10;
tb.css("top",yb + "px");
}else{
yb=parseInt((largEcranHeight - obj.getY())*zoom) + 10;
tb.css("bottom",yb + "px");
}
}
if(obj.type=='menuludiblock'){
var fz=parseInt(17 * zoom);
$(".blockmenu a li").css("padding",fz + "px");
fz=parseInt(20 * zoom);
$(".blockmenu a li").css("font-size",fz + "px");
fz=parseInt(64 * zoom);
$(".blockmenualignleft").css("width",fz + "px").css("height",fz + "px");
}
}
var activePanelSlideObject=-1;
function actPbshow(i){
addL();
var obj=CObjets[i];
if(typeof(obj)==='undefined'){
}else{
var ctrOb=$("#LargegrayPanel" + i);
if(!ctrOb.hasClass("LargegrayPanelOpen")){
ctrOb.addClass("LargegrayPanelOpen");
$("#LargegrayPanelBottom" + i).css("display","block");
$("#LargegrayPanelText" + i).css("display","block");
obj.setY(obj.objy);
if(obj.getY()>(largEcranHeight-380)){
obj.setY(largEcranHeight-380);
}
var yb=parseInt(obj.getY() * zoom);
var hb=parseInt(375 * zoom);
ctrOb.animate({
top: yb + "px",
height: hb + "px"
},500, function(){
});
}else{
obj.setY(obj.objy);
var yb=parseInt(obj.getY() * zoom);
var hb=parseInt(obj.getH() * zoom);
ctrOb.removeClass("LargegrayPanelOpen");
ctrOb.animate({
top: yb + "px",
height: hb + "px"
},500, function(){
$("#LargegrayPanelBottom" + i).css("display","none");
$("#LargegrayPanelText" + i).css("display","none");
});
}
}
}
function closePanelSideObject(){
if(activePanelSlideObject!=-1){
var mr=$("#LargePanelSide" + activePanelSlideObject).css('marginLeft');
if(mr!='0px'){
actPanelSideLeft(activePanelSlideObject);
}else{
mr=$("#LargePanelSide" + activePanelSlideObject).css('marginRight');
if(mr!='0px'){
actPanelSideRight(activePanelSlideObject);
}
}
}
}
function actPanelSideLeft(i){
addL();
var ctrOb=$("#LargePanelSide" + i + ",#LargePanelSideInner" + i);
var mr=ctrOb.css('marginLeft');
var obj=CObjets[i];
if(typeof(obj)==='undefined'){
}else{
if(obj.contenu5==""){
obj.contenu5=400;
}
var pw=parseInt(obj.contenu5);
if(pw>parseInt(largEcranWidth*zoom)){
pw=parseInt(largEcranWidth*zoom);
}
if(mr==pw+"px"){
ctrOb.animate({
marginLeft: "0px"
},500, function(){
});
}else{
activePanelSlideObject=i;
ctrOb.animate({
marginLeft: pw+"px"
},500, function(){
});
}
}
}
function actPanelSideRight(i){
addL();
var ctrOb=$("#LargePanelSide" + i + ",#LargePanelSideInner" + i);
var mr=ctrOb.css('marginRight');
var obj=CObjets[i];
if(typeof(obj)==='undefined'){
}else{
if(obj.contenu5==""){
obj.contenu5=400;
}
var pw=parseInt(obj.contenu5);
if(pw>parseInt(largEcranWidth*zoom)){
pw=parseInt(largEcranWidth*zoom);
}
if(mr==pw+"px"){
activePanelSlideObject=i;
ctrOb.animate({
marginRight: "0px"
},500, function(){
});
}else{
ctrOb.animate({
marginRight: pw+"px"
},500, function(){
});
}
}
}
function actPclinkCenter(i){
addL();
var obj=CObjets[i];
if(typeof(obj)==='undefined'){
}else{
$(".PanelCenterLink,.PanelCenterLink90,.PanelCenterInner").css("display",'none');
$("#PanelCenterLink" +  obj.id).css("display",'block');
$("#PanelCenterInner" + obj.id).css("display",'block');
}
}
function closePclinkCenter(){
addL();
$(".PanelCenterLink,.PanelCenterLink90,.PanelCenterInner").css("display",'none');
}
function actShowNavLudiMenu(i){
addL();
var ctrOb=$("#navludimenu" + i);
ctrOb.toggle();
}
var mynoteStar=0;
var myStarPourc=0;
var starAPourc=0;
var starBPourc=0;
var starCPourc=0;
var starProcessId=0;
var finishAnimStar=false;
function installshow(obj,posisty){
var Ecran=document.getElementById("main");
finishAnimStar=false;
if(obj.type=='showstarfx'){
obj.data='fx/stars/startline-off.png';
obj.text='fx/stars/star-1.png';
obj.contenu2='fx/stars/star-2.png';
obj.contenu3='fx/stars/star-3.png';
}
var libData=obj.contenu4.split(';');
starAPourc=parseInt(libData[0]);
starBPourc=parseInt(libData[1]);
starCPourc=parseInt(libData[2]);
starProcessId=obj.id;
var h='';
h += '<img ';
h += ' id="bloc' + obj.id + '" class="haveflou unselectable bloc' + obj.id + ' ' +  obj.idscript + '" ';
h += ' src="' + obj.data + '" ';
h += ' style="display:none;' + posisty + '" ';
h += ' />';
recalculAllNoteByPersistence();
try{
if(N_T!=0&&N_F!=0){
mynoteStar=parseInt((N_F/N_T) * 20);
myStarPourc=parseInt(mynoteStar) * 5;
if('function' == typeof(SetScormScore)){
setTimeout(function(){
SetScormScore(parseInt(mynoteStar) * 5);
scormProcessScore=parseInt(mynoteStar) * 5;
},1900);
}
if(mynoteStar<0){mynoteStar=0;}
}
} catch(err){
mynoteStar=0;
}
if(myStarPourc>starAPourc||myStarPourc==starAPourc){
h += '<img id="starA' + obj.id + '" class="unselectable" ';
h += ' src="' + obj.text + '" ';
h += ' style="position:absolute;z-index:4;" />';
}
if(myStarPourc>starBPourc||myStarPourc==starBPourc){
h += '<img id="starB' + obj.id + '" class="unselectable" ';
h += ' src="' + obj.contenu2 + '" ';
h += ' style="position:absolute;z-index:4;" />';
}
if(myStarPourc>starCPourc||myStarPourc==starCPourc){
h += '<img id="starC' + obj.id + '" class="unselectable" ';
h += ' src="' + obj.contenu3 + '" ';
h += ' style="position:absolute;z-index:4;" />';
}
h += '<img id="starD' + obj.id + '" class="unselectable" ';
h += ' src="fx/stars/white-spark.png" ';
h += ' style="position:absolute;z-index:5;display:none;transition:all 2s ease-out;" />';
Ecran.innerHTML=Ecran.innerHTML + h;
zoomshowStart(obj);
if(myStarPourc>starAPourc||myStarPourc==starAPourc){
setTimeout(function(){
zoomshowA(obj.id);
},700);
}
}
function zoomshowStart(obj){
var dec=765;
var xb=parseInt((obj.getX() - (4 + dec)) * zoom);
var yb=parseInt((obj.getY() + 27 - dec) * zoom);
var wb=parseInt(155 * zoom) * 2;
var hb=parseInt(155 * zoom) * 2;
$("#starA" + obj.id).css("width",wb + 'px').css("height",hb + 'px');
$("#starA" + obj.id).css("left",xb + 'px').css("top",yb + 'px');
var xbB=parseInt((obj.getX() + 120) * zoom);
var ybB=parseInt((obj.getY() - (50 + dec)) * zoom);
var wbB=parseInt(160 * zoom) * 2;
var hbB=parseInt(146 * zoom) * 2;
$("#starB" + obj.id).css("width",wbB + 'px').css("height",hbB + 'px');
$("#starB" + obj.id).css("left",xbB + 'px').css("top",ybB + 'px');
var xbC=parseInt((obj.getX() + 303 + dec) * zoom);
var ybC=parseInt((obj.getY() + 27 - dec ) * zoom);
var wbC=parseInt(156 * zoom) * 2;
var hbC=parseInt(156 * zoom) * 2;
$("#starC" + obj.id).css("width", wbC + 'px').css("height", hbC + 'px');
$("#starC" + obj.id).css("left", xbC + 'px').css("top", ybC + 'px');
}
function zoomshowfinal(obj){
var xb=parseInt((obj.getX()- 4) * zoom);
var yb=parseInt((obj.getY()+ 27) * zoom);
var wb=parseInt(155 * zoom);
var hb=parseInt(155 * zoom);
$("#starA" + obj.id).css("width",wb + 'px').css("height",hb + 'px');
$("#starA" + obj.id).css("left",xb + 'px').css("top",yb + 'px');
var xbB=parseInt((obj.getX() + 148) * zoom);
var ybB=parseInt((obj.getY() - 2) * zoom);
var wbB=parseInt(160 * zoom);
var hbB=parseInt(146 * zoom);
$("#starB" + obj.id).css("width",wbB + 'px').css("height",hbB + 'px');
$("#starB" + obj.id).css("left",xbB + 'px').css("top",ybB + 'px');
var xbC=parseInt((obj.getX() + 303) * zoom);
var ybC=parseInt((obj.getY() + 27) * zoom);
var wbC=parseInt(156 * zoom);
var hbC=parseInt(156 * zoom);
$("#starC" + obj.id).css("width", wbC + 'px').css("height", hbC + 'px');
$("#starC" + obj.id).css("left", xbC + 'px').css("top", ybC + 'px');
}
function zoomshowStars(obj){
if(finishAnimStar&&obj.type=='showstarfx'){
var xb=convertToPercentX(obj.getX() - 4);
var yb=convertToPercentY(obj.getY() + 27);
var wb=convertToPercentX(155);
var hb=convertToPercentY(155);
$("#starA" + obj.id).css("width",wb).css("height",hb);
$("#starA" + obj.id).css("left",xb).css("top",yb);
xb=convertToPercentX(obj.getX() + 148);
yb=convertToPercentY(obj.getY() - 2);
wb=convertToPercentX(160);
hb=convertToPercentY(146);
$("#starB" + obj.id).css("width",wb).css("height",hb);
$("#starB" + obj.id).css("left",xb).css("top",yb);
xb=convertToPercentX(obj.getX() + 303);
yb=convertToPercentY(obj.getY() + 27);
wb=convertToPercentX(156);
hb=convertToPercentY(156);
$("#starC" + obj.id).css("width",wb).css("height",hb);
$("#starC" + obj.id).css("left",xb).css("top",yb);
}
}
function zoomshowA(i){
obj=CObjets[i];
var xb=convertToPercentX(obj.getX() - 4);
var yb=convertToPercentY(obj.getY() + 27);
var wb=convertToPercentX(155);
var hb=convertToPercentY(155);
var objstar=$("#starA" + obj.id);
setTimeout(function(){
LUDI.sound('fx/stars/tiiin.mp3');
},200);
objstar.animate({
left: xb,top: yb,
width: wb,height: hb
},700,function(){
});
if(myStarPourc>starBPourc||myStarPourc==starBPourc){
setTimeout(function(){zoomshowB(obj.id);},650);
}else{
setTimeout(function(){playshow();},650);
}
}
function zoomshowB(i){
playshow();
obj=CObjets[i];
var xb=convertToPercentX(obj.getX() + 148);
var yb=convertToPercentY(obj.getY() - 2);
var wb=convertToPercentX(160);
var hb=convertToPercentY(146);
var objstar=$("#starB" + obj.id);
setTimeout(function(){
LUDI.sound('fx/stars/tiiin.mp3');
},300);
objstar.animate({
left: xb,top: yb,
width: wb,height: hb
},650,function(){
});
if(myStarPourc>starCPourc||myStarPourc==starCPourc){
setTimeout(function(){zoomshowC(obj.id);},550);
}else{
setTimeout(function(){playshow();},550);
}
}
function zoomshowC(i){
playshow();
obj=CObjets[i];
var xb=convertToPercentX(obj.getX() + 303);
var yb=convertToPercentY(obj.getY() + 27);
var wb=convertToPercentX(156);
var hb=convertToPercentY(156);
var objstar=$("#starC" + obj.id);
setTimeout(function(){
LUDI.sound('fx/stars/tiiin.mp3');
},350);
objstar.animate({
left: xb,top: yb,
width: wb,height: hb
},550,function(){
});
var xbC=convertToPercentX(obj.getX() + 384);
var ybC=convertToPercentY(obj.getY() + 17);
var wbC=convertToPercentX(30);
var hbC=convertToPercentY(30);
$("#starD" + obj.id).css("width", wbC).css("height", hbC);
$("#starD" + obj.id).css("left", xbC).css("top", ybC);
setTimeout(function(){
playshow3();
},400);
}
function playshow(){
finishAnimStar=true;
}
function playshow3(){
$("#starD" + obj.id).css('display','block');
finishAnimStar=true;
setTimeout(function(){
zoomRotateC("#starD" + starProcessId,360);
setTimeout(function(){
var wbC=convertToPercentX(10);
var hbC=convertToPercentY(10);
var xbC=convertToPercentX(obj.getX() + 393);
var ybC=convertToPercentY(obj.getY() + 32);
$("#starD" + obj.id).css("left", xbC).css("top", ybC);
$("#starD" + starProcessId).css("width", wbC).css("height", hbC);
zoomRotateC("#starD" + starProcessId,180);
},2000);
},100);
}
function zoomRotateC(sid,deg){
var Tobj=$(sid);
Tobj.css({ WebkitTransform : 'rotate(' + deg + 'deg)'});
Tobj.css({ '-moz-transform': 'rotate(' + deg + 'deg)'});
Tobj.css({ '-ms-transform': 'rotate(' + deg + 'deg)'});
Tobj.css({ '-o-transform': 'rotate(' + deg + 'deg)'});
Tobj.css({ 'transform': 'rotate(' + deg + 'deg)'});
Tobj.css({ '-webkit-transform': 'rotate(' + deg + 'deg)'});
}
var idIsoHero='';
var srcHeroGlob='';
var positionIsoAvatarLast='';
function installIsoAvatar(obj){
if(obj.type=='gameisoavatar'){
var exIsoAvatar=obj.x;
var eyIsoAvatar=obj.y;
isMovingIsoAvatar=false;
idIsoHero=exIsoAvatar + 'a' + Math.floor(Math.random()*10000);
if(obj.src.indexOf('data/')!=-1){
obj.src=obj.src;
}else{
obj.src='images/' + obj.src;
}
if(srcHeroGlob!=''){
obj.src=srcHeroGlob;
}
var h='';
h += '<div class="avatarKBody avatarKBody' + obj.id + '" >';
h += '<div style="background-image:url(\'' + obj.src + '\');" ';
h += ' class="isoAvatarBodySprite isoAvatarBodySprite' + obj.id + '" >';
h += '</div>';
h += '</div>';
$('#main').append(h);
if(positionIsoAvatarLast!=''){
$('.isoAvatarBodySprite' + obj.id ).css('background-position-y',positionIsoAvatarLast);
}
setTimeout(function(){
moveAllIsoAvatar(idIsoHero);
resetDifWayAvatar();
},500);
}
}
function zoomIsoAvatar(obj){
var ex=parseInt(obj.getX() * zoom);
var ey=parseInt(obj.getY() * zoom);
var ew=parseInt(obj.getW() * zoom);
var eh=parseInt(obj.getH() * zoom);
$('.avatarKBody' + obj.id ).css("z-index","2");
$('.avatarKBody' + obj.id ).css('left',ex + 'px').css('top',ey + 'px');
$('.avatarKBody' + obj.id ).css('width',ew + 'px').css('height',eh + 'px');
var zoomM=ew/110;
$('.isoAvatarBodySprite' + obj.id ).css('transform','scale(' +  zoomM  + ')');
$('.isoAvatarBodySprite' + obj.id ).css('-ms-transform','scale(' +  zoomM + ')');
}
function eventClickIsoAvatar(){
if(haveIsoAvatar()){
var Ecran=document.getElementById("main");
var ex=parseInt(parseInt(xcoord - Ecran.offsetLeft) /zoom);
var ey=parseInt(parseInt(ycoord - Ecran.offsetTop ) /zoom);
if(noClickCancel(ex,ey)==false){
exIsoAvatarObj=ex;
eyIsoAvatarObj=ey;
if(destiAvatarObjisOK()){
recadreDestiAvatarObj();
isMovingIsoAvatar=true;
}else{
var obj=getIsoAvatarObj();
isMovingIsoAvatar=false;
$('.isoAvatarBodySprite' + obj.id ).removeClass("runBodySprite");
}
}
}
}
var exIsoAvatarObj=0;
var eyIsoAvatarObj=0;
var exIsoAvatar=0;
var eyIsoAvatar=0;
var isMovingIsoAvatar=false;
function destiAvatarObjisOK(){
var ig=false;
for(var i=0; i < CObjets_count; i++){
var CtrObj=CObjets[i];
var ex=parseInt(CtrObj.getX());
var ey=parseInt(CtrObj.getY());
var ew=parseInt(CtrObj.getW());
var eh=parseInt(CtrObj.getH());
var CtrType=CtrObj.type;
if(CtrType=='gamezoneaction'){
if(exIsoAvatarObj>ex&&exIsoAvatarObj<parseInt(ex+ew)){
if(eyIsoAvatarObj>ey&&eyIsoAvatarObj<parseInt(ey+eh)){
ig=true;
}
}
}
}
return ig;
}
function recadreDestiAvatarObj(){
for(var i=0; i < CObjets_count; i++){
var CtrObj=CObjets[i];
var ex=parseInt(CtrObj.getX());
var ey=parseInt(CtrObj.getY());
var ew=parseInt(CtrObj.getW());
var eh=parseInt(CtrObj.getH());
var CtrType=CtrObj.type;
if(CtrType=='gamezoneaction'){
if(exIsoAvatarObj>ex&&exIsoAvatarObj<parseInt(ex+ew)){
if(eyIsoAvatarObj>ey&&eyIsoAvatarObj<parseInt(ey+eh)){
resetDifWayAvatar();
exIsoAvatarObj=ex + (ew/2);
eyIsoAvatarObj=ey + (eh-5) ;
}
}
}
}
}
function moveAllIsoAvatar(refIdIsoHero){
if(haveIsoAvatar()){
if(refIdIsoHero==idIsoHero){
if(isMovingIsoAvatar){
var angleHero=0;
var angleDegrees=0;
var obj=getIsoAvatarObj();
if(obj){
var bottomX=obj.getX() + (obj.getW()/2);
var bottomY=obj.getY() + obj.getH();
$('.isoAvatarBodySprite' + obj.id ).addClass("runBodySprite");
try{
angleHero=getAngle(bottomX,bottomY,exIsoAvatarObj,eyIsoAvatarObj);
angleDegrees=parseInteger(angleHero * (180/Math.PI));
}catch(err){
}
var evolx=parseFloat(bottomX) + ((7) * Math.cos(angleHero));
var evoly=parseFloat(bottomY) + ((7) * Math.sin(angleHero));
var dist=distancepyta(evolx,evoly,exIsoAvatarObj,eyIsoAvatarObj);
if(dist < 50){
evolx=parseFloat(bottomX) + ((5) * Math.cos(angleHero));
evoly=parseFloat(bottomY) + ((5) * Math.sin(angleHero));
}
if(dist > 60 && findDifWayAvatar(bottomX,bottomY,dist)){
var objway=findMinWayObject(bottomX,bottomY,dist)
var ex=parseInt(objway.getX());
var ey=parseInt(objway.getY());
var ew=parseInt(objway.getW());
var eh=parseInt(objway.getH());
var exIsoWayObj=ex + (ew/2);
var eyIsoWayObj=ey + (eh-5) ;
try{
angleHero=getAngle(bottomX,bottomY,exIsoWayObj,eyIsoWayObj);
angleDegrees=parseInteger(angleHero * (180/Math.PI));
evolx=parseFloat(bottomX) + ((6) * Math.cos(angleHero));
evoly=parseFloat(bottomY) + ((6) * Math.sin(angleHero));
var distWay=distancepyta(evolx,evoly,exIsoWayObj,eyIsoWayObj);
if(distWay<10){
objway.option7=false;
}
}catch(err){
}
}
var objx=evolx - (obj.getW()/2);
var objy=evoly - (obj.getH());
obj.setX(objx);
obj.setY(objy);
zoomIsoAvatar(obj);
var goleft=false;
if(angleDegrees>-89&&angleDegrees<90){
goleft= true;
}
if(goleft){
if(angleDegrees<0){
$('.isoAvatarBodySprite' + obj.id ).css('background-position-y','-960px');
positionIsoAvatarLast='-960px';
}else{
$('.isoAvatarBodySprite' + obj.id ).css('background-position-y','-320px');
positionIsoAvatarLast='-320px';
}
}else{
if(angleDegrees<180&&(angleDegrees>90||angleDegrees==90)){
$('.isoAvatarBodySprite' + obj.id ).css('background-position-y','0px');
positionIsoAvatarLast='0px';
}else{
$('.isoAvatarBodySprite' + obj.id ).css('background-position-y','-640px');
positionIsoAvatarLast='-640px';
}
}
if(dist<7){
isMovingIsoAvatar=false;
$('.isoAvatarBodySprite' + obj.id ).removeClass("runBodySprite");
haveCollideObjects(evolx,evoly);
resetDifWayAvatar();
}
}
setTimeout(function(){
moveAllIsoAvatar(refIdIsoHero);
},60);
}else{
setTimeout(function(){
moveAllIsoAvatar(refIdIsoHero);
},100);
}
}
}
}
function haveIsoAvatar(){
var br=false;
for(var i=0; i < CObjets_count; i++){
if(CObjets[i].type=='gameisoavatar'){
br=true;
return true;
}
}
return br;
}
function getIsoAvatarObj(){
for(var i=0; i < CObjets_count; i++){
if(CObjets[i].type=='gameisoavatar'){
return CObjets[i];
}
}
}
function findDifWayAvatar(bottomX,bottomY,distance){
var br=false;
for(var i=0; i < CObjets_count; i++){
if(CObjets[i].type=='gamezoneanchor'){
if(CObjets[i].option7){
var obj=CObjets[i];
var objX=obj.getX() + (obj.getW()/2);
var objY=obj.getY() + obj.getH();
var dist=distancepyta(bottomX,bottomY,objX,objY);
if(dist < (distance+50) ){
br=true;
return true;
}
}
}
}
return br;
}
function findMinWayObject(bottomX,bottomY,distance){
var br;
var oldDistance=10000;
for(var i=0; i < CObjets_count; i++){
if(CObjets[i].type=='gamezoneanchor'){
if(CObjets[i].option7){
var obj=CObjets[i];
var objX=obj.getX() + (obj.getW()/2);
var objY=obj.getY() + obj.getH();
var dist=distancepyta(bottomX,bottomY,objX,objY);
if(dist< oldDistance){
if(dist< (distance+50)){
br=obj;
oldDistance=dist;
}
}
}
}
}
return br;
}
function resetDifWayAvatar(){
for(var i=0; i < CObjets_count; i++){
if(CObjets[i].type=='gamezoneanchor'){
CObjets[i].option7=true;
}
}
}
var firstKeyUp=false;
var spriteKeyMove=false;
var spriteKeySens=0;
var spriteAnimPause=false;
function installSpriteObject(obj){
if(obj.type=='spriteobject'){
obj.idstr=LUDI.guid();
var num=parseInt(obj.contenu2);
if(num==4||num==5){
installSpriteLoop(obj);
}
if(num==1){
if(parseInt(obj.field3)!=0){
installSpriteGrav(obj);
}
}
if(num==6){
installSpriteGrav(obj);
}
obj.objx=obj.getX();
obj.objy=obj.getY();
obj.align=obj.objy;
var h='<img style="position:absolute;z-index:2;" ';
h += ' id="bloc' + obj.idstr + '" ';
h += ' class="spriteBloc' + obj.idstr + '" ';
h += ' src="images/' + obj.data + '" ';
if(parseInt(obj.option4)==1){
h += ' onclick="' + obj.contenu7 + '();" ';
}
h += ' />';
$("#main").append(h);
setTimeout('$("body").focus();',300);
if(firstKeyUp==false){
$('#main').keyup(function(e){
var x=e.keyCode;
haveKeyUpSprite(x);
});
$('body').keyup(function(e){
var x=e.keyCode;
haveKeyUpSprite(x);
});
$(document).keyup(function(e){
var x=e.keyCode;
haveKeyUpSprite(x);
});
spriteKeyMove=false;
}
}
}
function installSpriteLoop(obj){
obj.border=0;
obj.rotation=0;
var parsedPoints=[];
parsedPoints=obj.contenu3.split("!");
if(mobiSite){
parsedPoints=obj.contentpathsecond.split("!");
}
obj.rx=obj.getX();
obj.ry=obj.getY();
if(Sit(obj.contenu3)==""){
lengthPts=0;
}
setTimeout('animSpriteLoop("' + obj.id + '","' + obj.idstr + '")',obj.de);
}
function installSpriteGrav(obj){
obj.border=0;
obj.rotation=0;
obj.rx=obj.getX();
obj.ry=obj.getY();
setTimeout('animSpriteGrav("' + obj.id + '","' + obj.idstr + '")',250);
}
function animSpriteGrav(i,idstr){
if(!document.getElementById('bloc' + idstr)){
return false;
}
var obj=CObjets[i];
if(obj.type=='spriteobject'){
var pi=Math.PI;
var angleHero=0;
var deplace=parseInt(obj.contenu8);
var actualY=obj.ry;
var actualX=obj.rx;
var evoly=0;
var evolx=0;
var cancelMove=false;
if(parseInt(obj.field3)==3){
angleHero=90 * (pi/180);
evoly=parseFloat(actualY) + ((deplace) * Math.sin(angleHero));
obj.rx=obj.getX();
obj.ry=evoly;
obj.setY(obj.ry);
}
if(parseInt(obj.field3)==1){
if(spriteKeySens!=2&&spriteKeySens!=1){
angleHero=180 * (pi/180);
evolx=parseFloat(actualX) + ((deplace) * Math.cos(angleHero));
obj.ry=obj.getY();
obj.rx=evolx;
if(obj.rx< -10 ){
obj.rx=-10;
}
obj.setX(obj.rx);
}else{
obj.ry=obj.getY();
obj.rx=obj.getX();
cancelMove=true;
}
}
if(parseInt(obj.field3)==2){
if(spriteKeySens!=2&&spriteKeySens!=1){
angleHero=0 * (pi/180);
evolx=parseFloat(actualX) + ((deplace) * Math.cos(angleHero));
obj.ry=obj.getY();
obj.rx=evolx;
obj.setX(obj.rx);
}else{
obj.ry=obj.getY();
obj.rx=obj.getX();
cancelMove=true;
}
}
if(parseInt(obj.field3)==4){
angleHero=-90 * (pi/180);
evoly=parseFloat(actualY) + ((deplace) * Math.sin(angleHero));
obj.rx=obj.getX();
obj.ry=evoly;
obj.setY(obj.ry);
}
if(cancelMove==false){
collideSpriteChange(obj,obj.rx,obj.ry);
zoomSpriteObject(obj);
}
setTimeout('animSpriteGrav("' + obj.id + '","' + obj.idstr + '")',50);
}
}
function animSpriteLoop(i,idstr){
if(!document.getElementById('bloc' + idstr)){
return false;
}
var obj=CObjets[i];
if(obj.type=='spriteobject'){
var parsedPoints=[];
parsedPoints=obj.contenu3.split("!");
if(mobiSite){
parsedPoints=obj.contentpathsecond.split("!");
}
var nbpts=getNumArrayPt(parsedPoints);
if(obj.border==''){obj.border=0;}
if(parseInt(obj.border)<nbpts){
if(parsedPoints[parseInt(obj.border)]!=''){
if(spriteAnimPause==false){
var parsedPt=[];
parsedPt=parsedPoints[parseInt(obj.border)].split(";");
var xm=parseInt(parsedPt[0]);
var ym=parseInt(parsedPt[1]);
obj.objx=xm;
obj.objy=ym;
animMoveSpritetarget(obj,idstr);
var timeInterval=30
var deplace=parseInt(obj.contenu5);
if(deplace==1){
timeInterval=50;
}
if(obj.rotation>0){
timeInterval=obj.rotation + 30;
obj.rotation=0;
}
}
setTimeout('animSpriteLoop("' + obj.id + '","' + idstr + '")',timeInterval);
}
}
}
}
function animMoveSpritetarget(obj,idstr){
var angleHero=0;
var actualX=obj.rx;
var actualY=obj.ry;
try{
angleHero=getAngle(actualX,actualY,obj.objx,obj.objy);
}catch(err){}
var pi=Math.PI;
var angleDegrees=angleHero * (180/pi);
var dist=distancepyta(obj.objx,obj.objy,actualX,actualY);
var deplace=parseInt(obj.contenu5);
var distCtr=5;
if(deplace>4){
distCtr=deplace + 2;
}
var num=parseInt(obj.contenu2);
var parsedPoints=[];
parsedPoints=obj.contenu3.split("!");
if(mobiSite){
parsedPoints=obj.contentpathsecond.split("!");
}
var nbpts=getNumArrayPt(parsedPoints);
if(dist>distCtr){
var evolx=parseFloat(actualX) + ((deplace) * Math.cos(angleHero));
var evoly=parseFloat(actualY) + ((deplace) * Math.sin(angleHero));
if(evolx>obj.rx){
flipRightSpriteObject(obj,1);
}else{
flipRightSpriteObject(obj,-1);
}
obj.rx=evolx;
obj.ry=evoly;
obj.setX(obj.rx);
obj.setY(obj.ry);
if(parseInt(obj.option3)==1){
var degRot=parseInt(angleDegrees);
var tobjtarget=$(".spriteBloc" + obj.idstr);
tobjtarget.css({ transform: 'rotate(' + degRot + 'deg)'});
tobjtarget.css({ WebkitTransform: 'rotate(' + degRot + 'deg)'});
}
changeSpriteObjImg(obj,'images/' + obj.contenu6);
zoomSpriteObject(obj);
}else{
obj.rx=obj.objx;
obj.ry=obj.objy;
obj.setX(obj.rx);
obj.setY(obj.ry);
if(parseInt(obj.contenu4)>0&&obj.option2==0){
obj.rotation=parseInt(obj.contenu4);
changeSpriteObjImg(obj,'images/' + obj.data);
}
collideSpriteChange(obj,obj.rx,obj.ry);
zoomSpriteObject(obj);
var parsedPt=[];
parsedPt=parsedPoints[parseInt(obj.border)].split(";");
var xm=parseInt(parsedPt[0]);
var ym=parseInt(parsedPt[1]);
obj.rx=xm;
obj.ry=ym;
obj.setX(obj.rx);
obj.setY(obj.ry);
if(obj.border==''){obj.border=0;}
obj.border=parseInt(obj.border);
obj.border=parseInt(parseInt(obj.border) +1);
if(num==5){
if(obj.border==nbpts){
obj.border=0;
}
if(obj.border>nbpts){
obj.border=0;
}
}
}
}
function getNumArrayPt(arrayObj){
var i;
var ct=0;
for(i=0; i < arrayObj.length; ++i){
var cv=arrayObj[i];
if(cv.indexOf(";")!=-1){
ct++;
}
}
return ct;
}
function flipRightSpriteObject(obj,f){
$('#bloc' + obj.idstr).css("-ms-transform","scaleX("+f+")");
$('#bloc' + obj.idstr).css("-webkit-transform","scaleX("+f+")");
$('#bloc' + obj.idstr).css("transform","scaleX("+f+")");
}
function changeSpriteObjImg(obj,f){
var imgsrc=$('#bloc' + obj.idstr).attr("src");
if(imgsrc.indexOf(f)==-1){
$('#bloc' + obj.idstr).attr('src',f);
}
}
function zoomSpriteObject(obj){
if(obj.type=='spriteobject'){
var ex=parseInt(obj.getX() * zoom);
var ey=parseInt(obj.getY() * zoom);
var ew=parseInt(obj.getW() * zoom);
var eh=parseInt(obj.getH() * zoom);
$(".spriteBloc" + obj.idstr).css("left",ex - (ew/2) + 'px');
$(".spriteBloc" + obj.idstr).css("top",ey - (eh/2) + 'px');
$(".spriteBloc" + obj.idstr).css("width",ew + 'px')
$(".spriteBloc" + obj.idstr).css("height",eh + 'px');
}
}
function haveKeySprite(keycode){
nextGameTick=(new Date).getTime();
for(var i=0; i < CObjets_count; i++){
if(CObjets[i].type=='spriteobject'&&spriteAnimPause==false){
var obj=CObjets[i];
var deplace=parseInt(obj.contenu5);
var num=parseInt(obj.contenu2);
if(num!=4&&num!=5){
var moveKey=false;
switch (keycode){
case 38: //UP
if(num==1){
var ctrx=parseInt(obj.getX());
var ctry=parseInt(obj.getY());
var newY=obj.getY() - deplace;
if(newY>(obj.getH()/2)
&&haveCollideObjects(ctrx,newY,0)==false){
}else{
newY=ctry;
}
obj.setY(newY);
zoomSpriteObject(obj);
moveKey=true;
}
break;
case 40: //DOWN
if(num==1||num==3){
var ctrx=parseInt(obj.getX());
var ctry=parseInt(obj.getY());
var newY=obj.getY() + deplace;
if(newY<(largEcranHeight-(obj.getH()/2))
&&haveCollideObjects(ctrx,newY,0)==false){
}else{
newY=ctry;
}
haveCollideObjects(ctrx,ctry,1);
if(num==3){
ctry=newY+(obj.getH()/3);
var coll=haveCollideObjects(ctrx,ctry,1);
if(coll==false){
ctry=newY+(obj.getH()/2);
coll=haveCollideObjects(ctrx,ctry,1);
}
if(coll==false){
ctry=newY+(obj.getH()/4);
coll=haveCollideObjects(ctrx,ctry,1);
}
if(coll==false){
ctry=newY+(obj.getH()/2);
coll=haveCollideObjects(ctrx+(obj.getW()/2),ctry,1);
}
if(coll==false){
ctry=newY+(obj.getH()/2);
coll=haveCollideObjects(ctrx-(obj.getW()/2),ctry,1);
}
}
obj.setY(newY);
zoomSpriteObject(obj);
moveKey=true;
}
break;
case 39: //RIGHT
var ctrx=parseInt(obj.getX());
var ctry=parseInt(obj.getY());
if(parseInt(obj.field3)==1){
deplace=deplace - parseInt(obj.contenu8);
}
if(parseInt(obj.field3)==2){
deplace=deplace + parseInt(obj.contenu8);
}
var newX=obj.getX() + deplace;
if(newX<(largEcranWidth-(obj.getW()/2))
&&haveCollideObjects(newX,ctry,0)==false){
}else{
newX=ctrx;
}
haveCollideObjects(newX,ctry,1);
if(num!=6){
flipRightSpriteObject(obj,1);
}
obj.setX(newX);
if(num==3){
obj.setY(obj.align);
}
zoomSpriteObject(obj);
moveKey=true;
spriteKeySens=2;
break;
case 37: //LEFT
var ctrx=parseInt(obj.getX());
var ctry=parseInt(obj.getY());
if(parseInt(obj.field3)==1){
if(parseInt(obj.contenu8)>0){
return false;
}
deplace=deplace + parseInt(obj.contenu8);
}
if(parseInt(obj.field3)==2){
deplace=deplace - parseInt(obj.contenu8);
}
var newX=obj.getX() - deplace;
if(newX<(largEcranWidth-(obj.getW()/2))
&&haveCollideObjects(newX,ctry,0)==false){
}else{
newX=ctrx;
}
haveCollideObjects(newX,ctry,1);
if(num!=6){
flipRightSpriteObject(obj,-1);
}
obj.setX(newX);
if(num==3){
obj.setY(obj.align);
}
zoomSpriteObject(obj);
moveKey=true;
spriteKeySens=1;
break;
}
if(num!=6){
if(moveKey==false){
spriteKeyMove=false;
changeSpriteObjImg(obj,'images/' + obj.data);
}else{
spriteKeyMove=true;
changeSpriteObjImg(obj,'images/' + obj.contenu6);
}
}
}
}
}
}
function haveKeyUpSprite(keycode){
for(var i=0; i < CObjets_count; i++){
if(CObjets[i].type=='spriteobject'&&spriteAnimPause==false){
spriteKeyMove=false;
spriteKeySens=0;
var obj=CObjets[i];
var deplace=parseInt(obj.contenu5);
var num=parseInt(obj.contenu2);
if(num!=4&&num!=5){
var moveKey=false;
switch (keycode){
case 38: //UP
if(num==3){
obj.setY(obj.align);
}
break;
case 40: //DOWN
if(num==3){
if(num==3){
obj.setY(obj.align);
}
zoomSpriteObject(obj);
moveKey=true;
}
break;
}
if(num!=6){
if(moveKey==false){
changeSpriteObjImg(obj,'images/' + obj.data);
}else{
changeSpriteObjImg(obj,'images/' + obj.contenu6);
}
}
}
}
}
}
function collideSpriteChange(objC,hx,hy){
for(var i=0; i < CObjets_count; i++){
var obj=CObjets[i];
if(obj.type=='gamechangeimages'){
var ex=parseInt(obj.getX());
var ey=parseInt(obj.getY());
var ew=parseInt(obj.getW());
var eh=parseInt(obj.getH());
if(hx>ex&&hx<parseInt(ex+ew)){
if(hy>ey&&hy<parseInt(ey+eh)){
if(objC.type=='spriteobject'){
if(parseInt(objC.contenu4)>0&&objC.option2==1){
objC.rotation=parseInt(objC.contenu4);
}
changeSpriteObjImg(objC,obj.src);
if(obj.contenu7!=''){
if(isFunctionW(obj.contenu7)){
window[obj.contenu7]();
}
}
}
}
}
}
}
}
var allDiapoQuest=new Array();
var interactionNumber=0;
var interactLogs="";
var PopUpLimitControl=-1;
var interactLost=0;
var nunberinteract=0;
function isok(){
if(ViewerAfterBilan){return true;}
var r=true;
var minLog='';
interactLost=0;
nunberinteract=0;
attemptProcess=attemptProcess + 1;
for(var i=0; i < CObjets_count; i++){
var Oty=CObjets[i].type;
var Oid=CObjets[i].id;
if(PopUpLimitControl==-1||PopUpLimitControl==CObjets[i].pp){
if(Oty=='qcm'){
$('#table' + Oid + ' .qcmn').each(function(index){
if($(this).html()=="X"){
r=false;
}
});
$('#table' + Oid + ' .qcmx').each(function(index){
if($(this).html()!="X"){
r=false;
}
});
var loopInt=false;
$('#table' + Oid + ' .qcmn,#table' + Oid + ' .qcmx').each(function(index){
if($(this).html()=="X"){
loopInt=true;
}
});
if(loopInt==false){
interactLost++;
}else{
nunberinteract++;
}
}
if(Oty=='qcmuniquedata'){
var nbrep=0;
for(var j=0; j < CObjets_count; j++){
var ctrObj=CObjets[j];
if(ctrObj.type=='qcmunique'){
var tdunik='#' + ctrObj.id + 'qcmunique';
var nam=$(tdunik).attr('name');
if(nam=='qcmx'){
if($(tdunik).html()!="X"){
r=false;
}else{
nbrep=nbrep +1;
}
}else{
if($(tdunik).html()=="X"){
r=false;
nbrep=nbrep +1;
}
}
}
}
if(CObjets[i].idscript=="satisfaction"){
if(nbrep==0){
r=false;
}else{
r=true;
}
}
}
if(Oty=='qcmcube'){
r=getCorrectCarreQuizz(i);
if(getLostInteractionCarreQuizz(i)){
interactLost++;
}
}
if(Oty=='holetext'||Oty=='tcm'){
$('#bloc' + CObjets[i].id + ' .reponseholetext').each(function(index){
var ctr1=$(this).attr('data-rep');
var idctr=$(this).attr('id');
var ctr2=gei(idctr);
if(Sit(ctr2)==""){
interactLost++;
}
if(Sit(ctr1)!=Sit(ctr2)){
r=false;
}
});
}
if(Oty=='ludihiddenzone'){
if(gebi('zonebloc' + CObjets[i].id )){
if(gebi('zonebloc' + CObjets[i].id ).style.display=='none'){
r=false;
}
}
}
if(Oty=='drop'){
var objDrag=findObjByIdStr(CObjets[i].data);
if(objDrag){
var ctrx=parseInt(objDrag.getX() + (objDrag.getW()/2));
var ctry=parseInt(objDrag.getY() + (objDrag.getH()/2));
var Cox=parseInt(CObjets[i].getX());
if(ctrx<Cox){
r=false;
minLog='drop';
}
if(ctry<parseInt(CObjets[i].getY())){
r=false;
minLog='drop';
}
if(ctrx>parseInt(CObjets[i].getX() + CObjets[i].getW())){
r=false;
minLog='drop';
}
if(ctry>parseInt(CObjets[i].getY() + CObjets[i].getH())){
r=false;
minLog='drop';
}
if(!isPlacedDrag(objDrag.id)){
interactLost++;
}
}
}
if(Oty=='bag'){
var objBag=CObjets[i];
var nbelementsbag=0;
var nbelementsinbag=0;
for(var j=0; j < CObjets_count; j++){
if(CObjets[j].type=='drag'){
var objDrag=CObjets[j];
var ctrx=parseInt(objDrag.getX() + (objDrag.getW()/ 2));
var ctry=parseInt(objDrag.getY() + (objDrag.getH()/ 2));
if(isOnBag(objDrag)){
}else{
if(objDrag.data==objBag.data){
if(ctrx<parseInt(objBag.getX())){
r=false;
minLog='bag';
}
if(ctry<parseInt(objBag.getY())){
r=false;
minLog='bag';
}
if(ctrx>parseInt(objBag.getX() + objBag.getW())){
r=false;
minLog='bag';
}
if(ctry>parseInt(objBag.getY() + objBag.getH())){
r=false;
minLog='bag';
}
}
if(objDrag.data!=objBag.data){
if(ctrx>parseInt(objBag.getX())){
if(ctry>parseInt(objBag.getY())){
if(ctrx<parseInt(objBag.getX() + objBag.getW())){
if(ctry<parseInt(objBag.getY() + objBag.getH())){
r=false;
minLog='bag';
nbelementsinbag++;
}
}
}
}
}
}
if(objDrag.data==objBag.data){
if(ctrx>parseInt(objBag.getX())){
if(ctry>parseInt(objBag.getY())){
if(ctrx<parseInt(objBag.getX() + objBag.getW())){
if(ctry<parseInt(objBag.getY() + objBag.getH())){
nbelementsbag=nbelementsbag +1;
nbelementsinbag++;
}
}
}
}
}
}
}
if(nbelementsinbag==0){
interactLost++;
}
var nbelementsdrag=0;
for(var j=0; j < CObjets_count; j++){
if(CObjets[j].type=='drag'){
nbelementsdrag=nbelementsdrag + 1;
}
}
if(nbelementsbag==0&&nbelementsdrag>0){
minLog='bag';
return false;
}
}
if(Oty=='input'){
var rep=$('.input' + CObjets[i].id ).attr('data-rep');
var yrep=gebi('input' + CObjets[i].id).value;
if(Sit(rep)!=Sit(yrep)||yrep==''){
r=false;
}
if(yrep==''&&rep!=''){
interactLost++;
}else{
nunberinteract++;
}
}
if(Oty=='inputNumerique'){
var rep=$('#resultnewInputbloc' + CObjets[i].id).html();
if(controlRepNum(CObjets[i],rep)==false){
r=false;
}
}
if(Oty=='inputNumeriqueSignificatif'){
var rep=gebi('input' + CObjets[i].id).value;
if(controlRepNumMinMax(CObjets[i],rep)==false){
r=false;
}
}
if(Oty=='inputsyntaxique'){
if(controlRepSyntaxe(CObjets[i],0)==false){
r=false;
}
}
if(Oty=='inputFocus'){
if(controlRepInputFocus(CObjets[i],0)==false){
r=false;
}
}
if(Oty=='hideword'){
if(hidewordisok ==0){
r=false;
}
}
if(Oty=='motatrier'){
var motareliercontrol=recupMotsaRelier(CObjets[i]);
var ctrMotRelier=controlTwoListMotsaRelier(CObjets[i].data,motareliercontrol);
if(ctrMotRelier==false){
r=false;
}
}
if(Oty.indexOf('plugin-')!=-1||Oty.indexOf('plugques-')!=-1){
if(CObjets[i].contenu6==true||CObjets[i].contenu6==1||CObjets[i].contenu6=='True'){
if(testPlugins(CObjets[i])==false){
r=false;
minLog=Oty;
}
}
}
}
}
return r;
}
function isOnBag(objDrag){
var r=false;
var ctrx=parseInt(objDrag.getX() + (objDrag.getW() / 2));
var ctry=parseInt(objDrag.getY() + (objDrag.getH() / 2));
for(var j=0; j < CObjets_count; j++){
if(CObjets[j].type=='bag'){
var objBag=CObjets[j];
if(objDrag.data==objBag.data){
if(ctrx>parseInt(objBag.getX())){
if(ctry>parseInt(objBag.getY())){
if(ctrx<parseInt(objBag.getX() + objBag.getW())){
if(ctry<parseInt(objBag.getY() + objBag.getH())){
r=true;
}
}
}
}
}
}
}
return r;
}
var memNoteID="";
function calculnote(){
if(ViewerAfterBilan){return true;}
partBilanResult="";
var tempTotalBilanXML='';
var tempScore=0;
var tempScoreMax=0;
var tempAnnotations='';
for(var i=0; i < CObjets_count; i++){
var r=true;
var noteratio=1;
var noteSpe=0;
var tempBilanXML='';
var srcBilan='';
var CObjetAnswer='';
var CObjetCorrectAnswer='';
var Oty=CObjets[i].type;
if(Oty=='ludidialog'){
tempBilanXML += '<item id="' + CObjets[i].idscript + '" >';
tempBilanXML += '<type>' + Oty + '</type>';
tempBilanXML += CObjets[i].bilan;
tempBilanXML += '</item>';
srcBilan='<div class="blockbilan" ><div class="questbilan" >Dialogue</div><ul>';
srcBilan=srcBilan + CObjets[i].bilandisplay;
srcBilan=srcBilan + '</ul></div></div>';
fullBilanResult += srcBilan;
}
if(Oty=='qcm'){
chargeDataObjectMem(CObjets[i],lastPage1);
srcBilan=CObjets[i].bilan;
if(typeof(srcBilan)=='undefined'){srcBilan='';}
tempBilanXML += '<item id="' + CObjets[i].idscript + '" >';
tempBilanXML += '<type>' + Oty + '</type>';
tempBilanXML += '<resume><![CDATA[' + CObjets[i].contenu3 + ']]></resume>';
var Xanswers='';
$('#table' + CObjets[i].id + ' .qcmn').each(function(index){
if($(this).html()=="X"){
r=false;
var wrongA=$(this).attr('name');
srcBilan=srcBilan.replace(wrongA,'<span style="color:red;text-decoration:line-through;" >' + wrongA + '</span>');
Xanswers=Xanswers + Sst(cleanName(findTxtStockQ(wrongA))) + ';';
if(CObjets[i].option3==1){
noteSpe += parseFlo($(this).attr('data-note'));
}
}
});
$('#table' + CObjets[i].id + ' .qcmx').each(function(index){
var reponseA=$(this).attr('name');
CObjetCorrectAnswer=CObjetCorrectAnswer + Sst(cleanName(findTxtStockQ(reponseA))) + ',';
if($(this).html()!="X"){
r=false;
}else{
Xanswers=Xanswers + Sst(cleanName(findTxtStockQ(reponseA))) + ';';
if(CObjets[i].option3==1){
noteSpe += parseFlo($(this).attr('data-note'));
}
}
});
tempBilanXML += '<answers><![CDATA[' + Xanswers + ']]></answers>';
tempBilanXML += '<correctanswers><![CDATA[' + CObjetCorrectAnswer + ']]></correctanswers>';
CObjetAnswer=Xanswers;
var noteD=0;
if(r){
noteD=parseFlo(CObjets[i].note);
}
if(CObjets[i].option3==1){
noteD=noteSpe;
if(noteSpe<parseFlo(CObjets[i].negnote)){
noteD=parseFlo(CObjets[i].negnote);
}
if(noteSpe>parseFlo(CObjets[i].note)){
noteD=parseFlo(CObjets[i].note);
}
}
if(r==false){
srcBilan=srcBilan.replace('-prv-','<span style="color:red;" >&#9632;&nbsp;</span>');
srcBilan=srcBilan.replace('-cmt-','<span style="color:red;" >' + CObjets[i].remarque + '</span>');
tempBilanXML += '<valid>0</valid>';
tempBilanXML += '<note>' + noteD + '</note>';
tempBilanXML += '<total>' + parseFlo(CObjets[i].note) + '</total>';
}else{
srcBilan=srcBilan.replace('-prv-','<span style="color:green;" >&#9632;&nbsp;</span>');
srcBilan=srcBilan.replace('-cmt-','');
tempBilanXML += '<valid>1</valid>';
tempBilanXML += '<note>' + noteD + '</note>';
tempBilanXML += '<total>' + parseFlo(CObjets[i].note) + '</total>';
}
partBilanResult=partBilanResult + srcBilan;
fullBilanResult=fullBilanResult + srcBilan;
tempBilanXML += '</item>';
}
if(Oty=='qcmuniquedata'){
srcBilan='<div class="blockbilan" ><div class="questbilan" >-prv-QCM - Multi</div><ul>';
tempBilanXML += '<item id="' + CObjets[i].idscript + '" >';
tempBilanXML += '<type>' + Oty + '</type>';
tempBilanXML += '<resume><![CDATA[QCM - Multi]]></resume>';
var Xanswers='';
for(var j=0; j < CObjets_count; j++){
var ctrObj=CObjets[j];
if(ctrObj.type=='qcmunique'){
chargeDataObjectMem(ctrObj,lastPage1);
var tdunik='#' + ctrObj.id + 'qcmunique';
var nam=$(tdunik).attr('name');
var repQcmUnique=ctrObj.contenu3;
if(repQcmUnique==''){
repQcmUnique=ctrObj.idscript;
}
if(nam=='qcmx'){
srcBilan += '<li>' + repQcmUnique + '&nbsp;<span style="color:green;" >&#9632;&nbsp;</span></li>';
if($(tdunik).html()!="X"){
r=false;
}else{
Xanswers += repQcmUnique + ';';
if(ctrObj.idscript.indexOf("satisfaction-")!=-1){
SatisfationScore=getSatisVal(ctrObj);
}
}
}else{
if($(tdunik).html()=="X"){
r=false;
srcBilan += '<li><span style="color:red;text-decoration: line-through;" >' + repQcmUnique + '</span></li>';
Xanswers += repQcmUnique + ';';
if(ctrObj.idscript.indexOf("satisfaction-")!=-1){
SatisfationScore=getSatisVal(ctrObj);
}
}else{
srcBilan += '<li>' + repQcmUnique + '</li>';
}
}
}
}
srcBilan += "</ul>-cmt-</div>";
tempBilanXML += '<answers><![CDATA[' + Xanswers + ']]></answers>';
CObjetAnswer=Xanswers;
if(r==false){
srcBilan=srcBilan.replace('-prv-','<span style="color:red;" >&#9632;&nbsp;</span>');
srcBilan=srcBilan.replace('-cmt-','<span style="color:red;" >' + CObjets[i].remarque + '</span>');
tempBilanXML += '<valid>0</valid>';
tempBilanXML += '<note>0</note>';
tempBilanXML += '<total>' + parseFlo(CObjets[i].note) + '</total>';
}else{
srcBilan=srcBilan.replace('-prv-','<span style="color:green;" >&#9632;&nbsp;</span>');
srcBilan=srcBilan.replace('-cmt-','');
tempBilanXML += '<valid>1</valid>';
tempBilanXML += '<note>' + parseFlo(CObjets[i].note) + '</note>';
tempBilanXML += '<total>' + parseFlo(CObjets[i].note) + '</total>';
}
if(CObjets[i].idscript!="satisfaction"){
partBilanResult=partBilanResult + srcBilan;
fullBilanResult=fullBilanResult + srcBilan;
}
tempBilanXML += '</item>';
}
if(Oty=='qcmcube'){
chargeDataObjectMem(CObjets[i],lastPage1);
srcBilan='<div class="blockbilan" ><div class="questbilan" >Quizz</div><ul>';
tempBilanXML += '<item id="' + CObjets[i].idscript + '" >';
tempBilanXML += '<type>' + Oty + '</type>';
tempBilanXML += '<resume>text</resume>';
tempBilanXML += '<answers><![CDATA[' + yrep + ']]></answers>';
var resultQuizz=getCorrectCarreQuizz(i);
var rep=getInputCarreQuizz(i);
CObjetAnswer=rep;
if(resultQuizz){
r=true;
srcBilan += '<li>' + rep + '<span class="goodRepBilan" >&nbsp;&#9632;</span></li>'
}else{
r=false;
srcBilan += '<li>' + rep + '&nbsp;&nbsp;</li>'
}
srcBilan=srcBilan + '</ul>-cmt-</div>'
if(resultQuizz==false){
srcBilan=srcBilan.replace('-prv-','<span style="color:red;" >&#9632;&nbsp;</span>');
srcBilan=srcBilan.replace('-cmt-','<span style="color:red;" >' + CObjets[i].remarque + '</span>');
tempBilanXML += '<valid>0</valid>';
tempBilanXML += '<note>0</note>';
tempBilanXML += '<total>' + parseFlo(CObjets[i].note) + '</total>';
}else{
srcBilan=srcBilan.replace('-prv-','<span style="color:green;" >&#9632;&nbsp;</span>');
srcBilan=srcBilan.replace('-cmt-','');
tempBilanXML += '<valid>1</valid>';
tempBilanXML += '<note>' + parseFlo(CObjets[i].note) + '</note>';
tempBilanXML += '<total>' + parseFlo(CObjets[i].note) + '</total>';
}
partBilanResult=partBilanResult + srcBilan;
fullBilanResult=fullBilanResult + srcBilan;
tempBilanXML += '</item>';
}
if(Oty=='input'){
chargeDataObjectMem(CObjets[i],lastPage1);
srcBilan='<div class="blockbilan" ><div class="questbilan" >-prv-Texte / Valeur</div><ul>';
tempBilanXML += '<item id="' + CObjets[i].idscript + '" >';
tempBilanXML += '<type>' + Oty + '</type>';
tempBilanXML += '<resume>text</resume>';
var rep=$('.input' + CObjets[i].id ).attr('data-rep');
var yrep=gebi('input' + CObjets[i].id).value;
tempBilanXML += '<answers><![CDATA[' + yrep + ']]></answers>';
if(Sit(rep)!=Sit(yrep)||yrep==''){
r=false;
var repo=yrep;
if(repo==''){
repo='R&eacute;ponse vide !';
}else{
if(Sit(rep)==''){
repo='<b>' + repo + '</b>';
}else{
repo='<strike>' + repo + '</strike>';
}
}
CObjetAnswer=repo;
srcBilan += '<li>' + rep + '&nbsp;&nbsp;' + repo + '</li>'
}else{
srcBilan += '<li>' + rep + '<span class="goodRepBilan" >&nbsp;&#9632;</span></li>'
}
srcBilan=srcBilan + '</ul>-cmt-</div>'
if(r==false){
srcBilan=srcBilan.replace('-prv-','<span style="color:red;" >&#9632;&nbsp;</span>');
srcBilan=srcBilan.replace('-cmt-','<span style="color:red;" >' + CObjets[i].remarque + '</span>');
tempBilanXML += '<valid>0</valid>';
tempBilanXML += '<note>0</note>';
tempBilanXML += '<total>' + parseFlo(CObjets[i].note) + '</total>';
}else{
srcBilan=srcBilan.replace('-prv-','<span style="color:green;" >&#9632;&nbsp;</span>');
srcBilan=srcBilan.replace('-cmt-','');
tempBilanXML += '<valid>1</valid>';
tempBilanXML += '<note>' + parseFlo(CObjets[i].note) + '</note>';
tempBilanXML += '<total>' + parseFlo(CObjets[i].note) + '</total>';
}
partBilanResult=partBilanResult + srcBilan;
fullBilanResult=fullBilanResult + srcBilan;
tempBilanXML += '</item>';
}
if(Oty=='inputsyntaxique'){
chargeDataObjectMem(CObjets[i],lastPage1);
srcBilan='<div class="blockbilan" >';
srcBilan += '<div class="questbilan" >-prv-' + CObjets[i].contenu6;
srcBilan += '</div><ul>';
tempBilanXML += '<item id="' + CObjets[i].idscript + '" >';
tempBilanXML += '<type>' + Oty + '</type>';
tempBilanXML += '<resume>syntaxic</resume>';
var controlVal=Sit($('#textareabloc' + CObjets[i].id).val());
tempBilanXML += '<answers><![CDATA[' + controlVal + ']]></answers>';
if(controlRepSyntaxe(CObjets[i],1)==false){
r=false;
var repo=controlVal;
if(repo==''){
repo='R&eacute;ponse vide !';
}else{
if(Sit(rep)==''){
repo='<b>' + repo + '</b>';
}else{
repo='<strike>' + repo + '</strike>';
}
}
srcBilan += '<li>' + repo + '</li>';
CObjetAnswer=minHtmlToText(repo);
}else{
srcBilan += '<li>' + controlVal + '<span class="goodRepBilan" >&nbsp;&#9632;</span></li>'
}
srcBilan += '</ul>-cmt-</div>'
if(r==false){
srcBilan=srcBilan.replace('-prv-','<span style="color:red;" >&#9632;&nbsp;</span>');
srcBilan=srcBilan.replace('-cmt-','<span style="color:red;" >' + CObjets[i].remarque + '</span>');
tempBilanXML += '<valid>0</valid>';
tempBilanXML += '<note>0</note>';
tempBilanXML += '<total>' + parseFlo(CObjets[i].note) + '</total>';
}else{
srcBilan=srcBilan.replace('-prv-','<span style="color:green;" >&#9632;&nbsp;</span>');
srcBilan=srcBilan.replace('-cmt-','');
tempBilanXML += '<valid>1</valid>';
tempBilanXML += '<note>' + parseFlo(CObjets[i].note) + '</note>';
tempBilanXML += '<total>' + parseFlo(CObjets[i].note) + '</total>';
}
partBilanResult += srcBilan;
fullBilanResult += srcBilan;
tempBilanXML += '</item>';
}
if(Oty=='inputFocus'){
chargeDataObjectMem(CObjets[i],lastPage1);
srcBilan='<div class="blockbilan" ><div class="questbilan" >-prv-Texte / Focus</div><ul>';
tempBilanXML += '<item id="' + CObjets[i].idscript + '" >';
tempBilanXML += '<type>' + Oty + '</type>';
tempBilanXML += '<resume>syntaxic</resume>';
var recuptar=$('#input' + CObjets[i].id).val();
var controlVal=Sit(recuptar);
tempBilanXML += '<answers><![CDATA[' + controlVal + ']]></answers>';
if(controlRepInputFocus(CObjets[i],1)==false){
r=false;
var repo=controlVal;
if(repo==''){
repo='R&eacute;ponse vide !';
}else{
repo='<strike>' + repo + '</strike>';
}
srcBilan += '<li>' + repo + '</li>';
CObjetAnswer=repo;
}else{
srcBilan += '<li>' + controlVal + '<span class="goodRepBilan" >&nbsp;&#9632;</span></li>'
}
srcBilan=srcBilan + '</ul>-cmt-</div>'
if(r==false){
srcBilan=srcBilan.replace('-prv-','<span style="color:red;" >&#9632;&nbsp;</span>');
srcBilan=srcBilan.replace('-cmt-','<span style="color:red;" >' + CObjets[i].remarque + '</span>');
tempBilanXML += '<valid>0</valid>';
tempBilanXML += '<note>0</note>';
tempBilanXML += '<total>' + parseFlo(CObjets[i].note) + '</total>';
}else{
srcBilan=srcBilan.replace('-prv-','<span style="color:green;" >&#9632;&nbsp;</span>');
srcBilan=srcBilan.replace('-cmt-','');
tempBilanXML += '<valid>1</valid>';
tempBilanXML += '<note>' + parseFlo(CObjets[i].note) + '</note>';
tempBilanXML += '<total>' + parseFlo(CObjets[i].note) + '</total>';
}
partBilanResult += srcBilan;
fullBilanResult += srcBilan;
tempBilanXML += '</item>';
}
if(Oty=='inputNumerique'){
chargeDataObjectMem(CObjets[i],lastPage1);
srcBilan='<div class="blockbilan" ><div class="questbilan" >-prv- Numeric</div><ul>';
tempBilanXML += '<item id="' + CObjets[i].idscript + '" >';
tempBilanXML += '<type>' + Oty + '</type>';
tempBilanXML += '<resume>Numeric</resume>';
var controlVal=$('#resultnewInputbloc' + CObjets[i].id).html();
tempBilanXML += '<answers><![CDATA[' + controlVal + ']]></answers>';
if(controlRepNum(CObjets[i],controlVal)==false){
r=false;
var repo=controlVal;
if(repo==''){
repo='R&eacute;ponse vide !';
}else{
repo='<strike>' + repo + '</strike>';
}
srcBilan += '<li>' + repo + '</li>';
CObjetAnswer=repo;
}else{
srcBilan += '<li>' + controlVal + '<span class="goodRepBilan" >&nbsp;&#9632;</span></li>'
}
srcBilan=srcBilan + '</ul>-cmt-</div>'
if(r==false){
srcBilan=srcBilan.replace('-prv-','<span style="color:red;" >&#9632;&nbsp;</span>');
srcBilan=srcBilan.replace('-cmt-','<span style="color:red;" >' + CObjets[i].remarque + '</span>');
tempBilanXML += '<valid>0</valid>';
tempBilanXML += '<note>0</note>';
tempBilanXML += '<total>' + parseFlo(CObjets[i].note) + '</total>';
}else{
srcBilan=srcBilan.replace('-prv-','<span style="color:green;" >&#9632;&nbsp;</span>');
srcBilan=srcBilan.replace('-cmt-','');
tempBilanXML += '<valid>1</valid>';
tempBilanXML += '<note>' + parseFlo(CObjets[i].note) + '</note>';
tempBilanXML += '<total>' + parseFlo(CObjets[i].note) + '</total>';
}
partBilanResult += srcBilan;
fullBilanResult += srcBilan;
tempBilanXML += '</item>';
}
if(Oty=='inputNumeriqueSignificatif'){
chargeDataObjectMem(CObjets[i],lastPage1);
srcBilan='<div class="blockbilan" >';
srcBilan += '<div class="questbilan" >-prv- Numeric</div><ul>';
tempBilanXML += '<item id="' + CObjets[i].idscript + '" >';
tempBilanXML += '<type>' + Oty + '</type>';
tempBilanXML += '<resume>Numeric</resume>';
var controlVal=gebi('input' + CObjets[i].id).value;
tempBilanXML += '<answers><![CDATA[' + controlVal + ']]></answers>';
if(controlNumMinMaxSimple(CObjets[i],controlVal)==false){
r=false;
var repo=controlVal;
if(repo==''){
repo='R&eacute;ponse vide !';
}else{
repo='<strike>' + repo + '</strike>';
}
srcBilan += '<li>' + repo + '</li>';
CObjetAnswer=repo;
}else{
noteratio=1;
var pourcSpe=parseFlo(CObjets[i].contenu7);
if(pourcSpe>0){
pourcSpe=pourcSpe/100;
if(controlRepNumSigni(CObjets[i],controlVal)==false){
noteratio=noteratio - pourcSpe;
}
}
srcBilan=srcBilan + '<li>' + controlVal + '<span class="goodRepBilan" >&nbsp;&#9632;</span></li>'
}
srcBilan=srcBilan + '</ul>-cmt-</div>'
if(r==false){
srcBilan=srcBilan.replace('-prv-','<span style="color:red;" >&#9632;&nbsp;</span>');
srcBilan=srcBilan.replace('-cmt-','<span style="color:red;" >' + CObjets[i].remarque + '</span>');
tempBilanXML += '<valid>0</valid>';
tempBilanXML += '<note>0</note>';
tempBilanXML += '<total>' + parseFlo(CObjets[i].note) + '</total>';
}else{
srcBilan=srcBilan.replace('-prv-','<span style="color:green;" >&#9632;&nbsp;</span>');
srcBilan=srcBilan.replace('-cmt-','');
tempBilanXML += '<valid>1</valid>';
tempBilanXML += '<note>' + parseFlo(CObjets[i].note) + '</note>';
tempBilanXML += '<total>' + parseFlo(CObjets[i].note) + '</total>';
}
partBilanResult += srcBilan;
fullBilanResult += srcBilan;
tempBilanXML += '</item>';
}
if(Oty=='drop'){
var objDrag=findObjByIdStr(CObjets[i].data);
var ctrx=parseInt(objDrag.getX() + (objDrag.getW() / 2));
var ctry=parseInt(objDrag.getY() + (objDrag.getH() / 2));
srcBilan=objDrag.bilan;
if(typeof(srcBilan)=='undefined'){srcBilan='';}
tempBilanXML += '<item id="' + CObjets[i].idscript + '" >';
tempBilanXML += '<type>' + Oty + '</type><resume>drag drop</resume>';
if(ctrx<parseInt(CObjets[i].getX())){
r=false;
}
if(ctry<parseInt(CObjets[i].getY())){
r=false;
}
if(ctrx>parseInt(CObjets[i].getX() + CObjets[i].getW())){
r=false;
}
if(ctry>parseInt(CObjets[i].getY() + CObjets[i].getH())){
r=false;
}
if(r==false){
srcBilan=srcBilan.replace('-prv-','<span style="color:red;" >&#9632;&nbsp;</span>');
srcBilan=srcBilan.replace('-cmt-','<span style="color:red;" >' + CObjets[i].remarque + '</span>');
tempBilanXML += '<valid>0</valid>';
tempBilanXML += '<note>0</note>';
tempBilanXML += '<total>' + parseFlo(CObjets[i].note) + '</total>';
}else{
srcBilan=srcBilan.replace('-prv-','<span style="color:green;" >&#9632;&nbsp;</span>');
srcBilan=srcBilan.replace('-cmt-','');
tempBilanXML += '<valid>1</valid>';
tempBilanXML += '<note>' + parseFlo(CObjets[i].note) + '</note>';
tempBilanXML += '<total>' + parseFlo(CObjets[i].note) + '</total>';
}
partBilanResult += srcBilan;
fullBilanResult += srcBilan;
tempBilanXML += '</item>';
}
if(Oty=='bag'){
var objBag=CObjets[i];
var nbelementsbag=0;
tempBilanXML += '<item id="' + CObjets[i].idscript + '" >';
tempBilanXML += '<type>' + Oty + '</type>';
tempBilanXML += '<resume>drag drop</resume>';
var listedrag='';
var bilansource='<div class="blockbilan" >';
bilansource += '<div class="questbilan" >-prv-Drag &amp; Drop</div>';
bilansource += '<ul>-listedrag-</ul>-cmt-</div>';
srcBilan=bilansource;
for(var j=0; j < CObjets_count; j++){
if(CObjets[j].type=='drag'){
var objDrag=CObjets[j];
var ctrx=parseInt(objDrag.getX() + (objDrag.getW() / 2));
var ctry=parseInt(objDrag.getY() + (objDrag.getH() / 2));
if(isOnBag(objDrag)){
if(objDrag.contenu5!=''){
listedrag += "<li>" + objDrag.contenu5 + "->&nbsp;" + minHtmlToText(objBag.text) + "</li>";
}
}else{
if(objDrag.data==objBag.data){
if(ctrx<parseInt(objBag.getX())){
r=false;
}
if(ctry<parseInt(objBag.getY())){
r=false;
}
if(ctrx>parseInt(objBag.getX() + objBag.getW())){
r=false;
}
if(ctry>parseInt(objBag.getY() + objBag.getH())){
r=false;
}
}
if(objDrag.data!=objBag.data){
if(ctrx>parseInt(objBag.getX())){
if(ctry>parseInt(objBag.getY())){
if(ctrx<parseInt(objBag.getX() + objBag.getW())){
if(ctry<parseInt(objBag.getY() + objBag.getH())){
r=false;
if(objDrag.contenu5!=''){
listedrag += "<li><s>" + objDrag.contenu5 + "->&nbsp;" + minHtmlToText(objBag.text) + "</s></li>";
}
}
}
}
}
}
}
if(objDrag.data==objBag.data){
if(ctrx>parseInt(objBag.getX())){
if(ctry>parseInt(objBag.getY())){
if(ctrx<parseInt(objBag.getX() + objBag.getW())){
if(ctry<parseInt(objBag.getY() + objBag.getH())){
nbelementsbag += 1;
}
}
}
}
}
}
}
if(nbelementsbag==0){
r=false;
}
srcBilan=srcBilan.replace('-listedrag-',listedrag);
if(r==false){
srcBilan=srcBilan.replace('-prv-','<span style="color:red;" >&#9632;&nbsp;</span>');
srcBilan=srcBilan.replace('-cmt-','<span style="color:red;" >' + CObjets[i].remarque + '</span>');
tempBilanXML += '<valid>0</valid>';
tempBilanXML += '<note>0</note>';
tempBilanXML += '<total>' + parseFlo(CObjets[i].note) + '</total>';
}else{
srcBilan=srcBilan.replace('-prv-','<span style="color:green;" >&#9632;&nbsp;</span>');
srcBilan=srcBilan.replace('-cmt-','');
tempBilanXML += '<valid>1</valid>';
tempBilanXML += '<note>' + parseFlo(CObjets[i].note) + '</note>';
tempBilanXML += '<total>' + parseFlo(CObjets[i].note) + '</total>';
}
partBilanResult += srcBilan;
fullBilanResult += srcBilan;
tempBilanXML += '</item>';
}
if(Oty=='holetext'||Oty=='tcm'){
chargeDataObjectMem(CObjets[i],lastPage1);
var titre="Texte &agrave; trous";
if(CObjets[i].type=='tcm'){
titre="TCM";
}
srcBilan='<div class="blockbilan" ><div class="questbilan" >-prv-' + titre + '</div><ul>';
tempBilanXML += '<item id="' + CObjets[i].idscript + '" >';
tempBilanXML += '<type>' + Oty + '</type>';
tempBilanXML += '<resume>' + CObjets[i].type + '</resume>';
var nbrep=0;
var nbrepOk=0;
$('#bloc' + CObjets[i].id + ' .reponseholetext').each(function(index){
nbrep=nbrep + 1;
var ctr1=$(this).attr('data-rep');
var idctr=$(this).attr('id');
var ctr2=gei(idctr);
if(Sit(ctr1)!=Sit(ctr2)){
r=false;
var repo=ctr2;
if(repo==''){repo='?';}
srcBilan=srcBilan + '<li>' + ctr1 + '&nbsp;&nbsp;<strike>' + repo + '</strike></li>'
CObjetAnswer=CObjetAnswer + repo + ',';
}else{
nbrepOk=nbrepOk +1;
srcBilan=srcBilan + '<li>' + ctr1 + '<span class="goodRepBilan" >&nbsp;&#9632;</span></li>'
CObjetAnswer=CObjetAnswer + ctr1 + ',';
}
});
if(nbrepOk>0&&r==false){r=true;}
noteratio=nbrepOk / nbrep;
srcBilan=srcBilan + '</ul>-cmt-</div>'
if(r==false){
srcBilan=srcBilan.replace('-prv-','<span style="color:red;" >&#9632;&nbsp;</span>');
srcBilan=srcBilan.replace('-cmt-','<span style="color:red;" >' + CObjets[i].remarque + '</span>');
tempBilanXML += '<valid>0</valid>';
tempBilanXML += '<note>0</note>';
tempBilanXML += '<total>' + parseFlo(CObjets[i].note) + '</total>';
}else{
srcBilan=srcBilan.replace('-prv-','<span style="color:green;" >&#9632;&nbsp;</span>');
srcBilan=srcBilan.replace('-cmt-','');
tempBilanXML += '<valid>1</valid>';
tempBilanXML += '<note>' + parseFlo(CObjets[i].note) + '</note>';
tempBilanXML += '<total>' + parseFlo(CObjets[i].note) + '</total>';
}
partBilanResult += srcBilan;
fullBilanResult += srcBilan;
tempBilanXML += '</item>';
}
if(Oty=='motatrier'){
chargeDataObjectMem(CObjets[i],lastPage1);
var motareliercontrol=recupMotsaRelier(CObjets[i]);
var ctrMotRelier=controlTwoListMotsaRelier(CObjets[i].data,motareliercontrol);
if(ctrMotRelier==false){
r=false;
}
tempBilanXML += '<item id="' + CObjets[i].idscript + '" >';
tempBilanXML += '<type>' + Oty + '</type>';
tempBilanXML += '<resume>mots � ordonner</resume>';
tempBilanXML += '<valid>0</valid>';
if(r==false){
tempBilanXML += '<note>0</note>';
}else{
tempBilanXML += '<note>' + parseFlo(CObjets[i].note) + '</note>';
}
tempBilanXML += '<total>' + parseFlo(CObjets[i].note) + '</total>';
tempBilanXML += '</item>';
var bilansource='';
bilansource=bilansource + '<div class="blockbilan" >';
bilansource=bilansource + '<div class="questbilan" >';
if(r==false){
bilansource=bilansource + '<span style="color:red;" >&#9632;&nbsp;</span>';
}else{
bilansource=bilansource + '<span style="color:green;" >&#9632;&nbsp;</span>';
}
bilansource += 'Mots a ordonner</div>';
bilansource += getMotsRelierBilan(motareliercontrol,CObjets[i].data);
if(r==false){
bilansource += '<span style="color:red;" >' + CObjets[i].remarque + '</span>';
}
bilansource += '</div>';
srcBilan=bilansource;
fullBilanResult += srcBilan;
}
if(Oty.indexOf('plugin-')!=-1){
if(CObjets[i].contenu6==true||CObjets[i].contenu6==1||CObjets[i].contenu6=='True'){
if(testPlugins(CObjets[i])==false){
}
}
}
if(Oty.indexOf('plugques-')!=-1){
if(CObjets[i].contenu6==true||CObjets[i].contenu6==1||CObjets[i].contenu6=='True'){
chargeDataObjectMem(CObjets[i],lastPage1);
if(testPlugins(CObjets[i])==false){
r=false;
}else{
r=true;
}
srcBilan=getMinimalBilan(CObjets[i],r);
fullBilanResult += srcBilan;
}
}
if(objectHaveAnote(Oty)){
var remarqueForObjet='';
if(r==false){
if(CObjets[i].remarque!=''){
remarques += CObjets[i].remarque + '<br />';
remarqueForObjet=CObjets[i].remarque;
tempAnnotations += CObjets[i].remarque + '<br />';
if('function' == typeof(SetScormComments)){
SetScormComments(CObjets[i].remarque);
}
try{
domainesRemarques[CObjets[i].domaine]=domainesRemarques[CObjets[i].domaine] + CObjets[i].remarque + '<br />';
}catch(err){}
}
}
tempScoreMax += parseFlo(CObjets[i].note);
N_T=parseFlo(parseFlo(N_T) + parseFlo(CObjets[i].note));
domainesN_T[CObjets[i].domaine]=parseFlo(domainesN_T[CObjets[i].domaine]  + parseFlo(CObjets[i].note));
if(Oty=='qcm'&&CObjets[i].option3==1){
if(noteSpe<parseFlo(CObjets[i].negnote)){
noteSpe=parseFlo(CObjets[i].negnote);
}
if(noteSpe>parseFlo(CObjets[i].note)){
noteSpe=parseFlo(CObjets[i].note);
}
if(CObjets[i].options2==1){
noteSpe=0;
}
N_F=parseFlo(parseFlo(N_F) + noteSpe);
domainesN_F[CObjets[i].domaine]= parseFlo( parseFlo(domainesN_F[CObjets[i].domaine])  + noteSpe);
tempScore += noteSpe;
chargeNoteObjectMem(CObjets[i],lastPage1,CObjets[i].note,noteSpe,CObjets[i].domaine,remarqueForObjet,CObjets[i].type)
}else{
if(r){
var noteadd=parseFlo(CObjets[i].note);
noteadd=noteadd * noteratio;
N_F=parseFlo(parseFlo(N_F) + noteadd);
domainesN_F[CObjets[i].domaine]= parseFlo( parseFlo(domainesN_F[CObjets[i].domaine])  + noteadd);
tempScore += noteadd;
chargeNoteObjectMem(CObjets[i],lastPage1,CObjets[i].note,noteadd,CObjets[i].domaine,remarqueForObjet,CObjets[i].type)
}else{
if(Oty=='qcm'&&CObjets[i].options2==1){
N_F=parseFlo(parseFlo(N_F) + 0);
chargeNoteObjectMem(CObjets[i],lastPage1,CObjets[i].note,0,CObjets[i].domaine,remarqueForObjet,CObjets[i].type)
}else{
N_F=parseFlo(parseFlo(N_F) + parseFlo(CObjets[i].negnote));
tempScore += parseFlo(CObjets[i].negnote);
chargeNoteObjectMem(CObjets[i],lastPage1,CObjets[i].note,CObjets[i].negnote,CObjets[i].domaine,remarqueForObjet,CObjets[i].type)
}
}
}
tempTotalBilanXML += tempBilanXML;
chargeBilanPartObjectMem(CObjets[i],lastPage1,tempBilanXML,srcBilan);
if('function' == typeof(SetXapiInteraction)){
var result='false';
if(r){result='true';}
var duration=0;
try{
duration=parseInt((new Date()).getTime() - screenTime);
}catch(e){}
SetXapiInteraction(interactionNumber,CObjets[i],duration,result,CObjetAnswer,CObjetCorrectAnswer);
}
}
}
BilanXML += tempTotalBilanXML;
if('function'==typeof(SetXapiScreen)){
SetXapiScreen(tempScore,tempScoreMax,tempAnnotations,tempTotalBilanXML);
}
}
function objectHaveAnote(t){
if(typeof(t) == 'undefined'){t='';}
if(t=='qcm'||t=='input'
||t=='holetext'||t=='tcm'
||t=='drop'||t=='qcmuniquedata'
||t=='inputsyntaxique'||t=='inputNumerique'
||t=='bag'||t=='motarelier'||t=='motatrier'
||t=='inputNumeriqueSignificatif'
||t=='inputFocus'||t=='qcmcube'
||t.indexOf('plugques-')!=-1
){
return true;
}else{
return false;
}
}
function minHtmlToText(s){
if(typeof(s) == 'undefined'){ return '?';}
s=s.replace('<p>','');
s=s.replace('</p>','');
s=s.replace('<b>','');
s=s.replace('</b>','');
s=s.replace('<br>','');
s=s.replace('</br>','');
return s;
}
function getMinimalBilan(obj,r){
var oty=obj.type.replace('plugques-','');
var bilansource='';
bilansource=bilansource + '<div class="blockbilan" >';
bilansource=bilansource + '<div class="questbilan" >';
if(r==false){
bilansource=bilansource + '<span style="color:red;" >&#9632;&nbsp;</span>';
}else{
bilansource=bilansource + '<span style="color:green;" >&#9632;&nbsp;</span>';
}
bilansource += oty + '</div>';
bilansource += '<ul>';
bilansource += '<li>Actions</li>';
bilansource += '</ul>';
if(r==false){
bilansource += '<span style="color:red;" >' + CObjets[i].remarque + '</span>';
}
bilansource += '</div>';
return bilansource;
}
function controlRepNum(obj,s){
var ctrfinal=false;
var tableau=obj.text.split('|');
for(var i=0;i<tableau.length;i++){
if(tableau[i]!=''){
var pf1=parseFloat(tableau[i].replace(",","."));
var pf2=parseFloat(s);
var rnd=parseInt(obj.border);
if(obj.option==1&&rnd>0){
var rnd=parseInt(obj.border);
var puiss=10;
if(rnd==2){puiss=100;}
if(rnd==3){puiss=1000;}
if(rnd==4){puiss=10000;}
if(rnd==5){puiss=100000;}
if(rnd==6){puiss=1000000;}
if(rnd==7){puiss=10000000;}
pf1=Math.round(pf1 * puiss) / puiss;
pf2=Math.round(pf2 * puiss) / puiss;
if(pf1==pf2){
ctrfinal=true;
}
}else{
if(pf1==pf2){
ctrfinal=true;
}
}
}
}
return ctrfinal;
}
function controlRepNumMinMax(obj,num){
if(typeof(num) == 'undefined'){
return false;
}
num=num.replace(',','.');
num=num.replace(/ /g,'');
if(obj.option7==0){
if(num.indexOf(".")==-1){
num=num + ".";
}
if(getSigFigs(num)!=parseInt(obj.contenu4)){
return false;
}
}
var controlVal=parseFlo(num);
var controlMin=parseFlo(obj.text);
var controlMax=parseFlo(obj.contenu2);
try{
xmproce=new MathProcessor;
controlVal=xmproce.parse(num);
}catch(e){
}
if(isNaN(controlVal)){
controlVal=0;
}
try{
xmproce=new MathProcessor;
controlMin=xmproce.parse(obj.text);
controlMax=xmproce.parse(obj.contenu2);
}catch(e){
}
if(controlVal==0){return false;}
if(controlVal<controlMin){return false;}
if(controlVal>controlMax){return false;}
return true;
}
function controlRepNumSigni(obj,num){
if(typeof(num) == 'undefined'){
return false;
}
num=num.replace(',','.');
num=num.replace(/ /g,'');
if(num.indexOf(".")==-1){
num=num + ".";
}
if(getSigFigs(num)!=parseInt(obj.contenu4)){
return false;
}
return true;
}
function controlNumMinMaxSimple(obj,num){
if(typeof(num) == 'undefined'){
return false;
}
num=num.replace(',','.');
num=num.replace(/ /g,'');
var controlVal=parseFlo(num);
var controlMin=parseFlo(obj.text);
var controlMax=parseFlo(obj.contenu2);
try{
xmproce=new MathProcessor;
controlVal=xmproce.parse(num);
controlMin=xmproce.parse(obj.text);
controlMax=xmproce.parse(obj.contenu2);
}catch(e){
}
if(controlVal==0){return false;}
if(controlVal<controlMin){return false;}
if(controlVal>controlMax){return false;}
return true;
}
function controlRepSyntaxe(obj,s){
var scripts=obj.border.split('|');
var ctrfinal =false;
var controlVal=Sit($('#textareabloc' + obj.id).val());
if(controlVal!=''){
var tableau=obj.text.split('|');
for(var i=0; i<tableau.length;i++){
if(tableau[i]!=''){
var ctrinterne=true;
var mots=tableau[i].split(';');
for(var j=0; j<mots.length;j++){
var controlMot=Sit(mots[j]);
if(controlMot!=''){
if(controlVal.indexOf(controlMot)==-1){
ctrinterne=false;
}
}
}
if(ctrinterne==true){
ctrfinal=true;
if(s==1){
eval(scripts[i]);
}
}
}
}
}
var finalMessage='';
var helpMessage=obj.data.split('@');
for(var i=0; i<helpMessage.length;i++){
if(finalMessage==''){
if(helpMessage[i]!=''){
var messageContent=helpMessage[i].split('|');
if(controlVal.indexOf(Sit(messageContent[0]))==-1){
finalMessage=messageContent[1] + '<br />';
}
}
}
}
if(MessageHelp.indexOf(finalMessage)==-1){
MessageHelp=MessageHelp + finalMessage;
}
return ctrfinal;
}
function controlRepInputFocus(obj,s){
var ctrfinal =false;
var controlVal=Sit($('#input' + obj.id).val());
if(controlVal!=''){
var tableau=obj.text.split('|');
for(var i=0; i<tableau.length;i++){
if(tableau[i]!=''){
var ctrinterne=true;
var controlMot=Sit(tableau[i]);
if(controlMot!=''){
if(controlVal.indexOf(controlMot)==-1){
ctrinterne=false;
}
}
if(ctrinterne==true){
ctrfinal=true;
}
}
}
}
return ctrfinal;
}
function findObjByIdStr(data){
for(var i=0; i < CObjets_count; i++){
if(CObjets[i].type=='drag'){
if(CObjets[i].data==data){
return CObjets[i];
}
}
}
var fakeBloc=new CObjet();
fakeBloc.x=-10;
fakeBloc.y=-10;
fakeBloc.x2=-10;
fakeBloc.y2=-10;
fakeBloc.w=10;
fakeBloc.h=10;
return fakeBloc;
}
function installbutton(obj,act,posisty){
if(obj.type=='button'||obj.type=='buttonarea'){
var Ecran=document.getElementById("main");
var color="black";
var cssPlus="";
if(obj.css){
cssPlus=obj.css;
}
if(obj.color){
color=obj.color;
}
var classbtn ="css3button";
if(obj.boite!=''){
classbtn=obj.boite;
}
if(obj.text=="(invisible)"||obj.type=='buttonarea'){
h='<a id="table' + obj.id + '" class="unselectable bloc' + obj.id + ' ' +  obj.idscript + '" ';
h += ' style="cursor:pointer;background-image:url(\'fx/transparent.png\');' + posisty + '" ';
h += act + '>';
if(obj.boite=='circleblue'){
h += '<div class="zoneareacircleblueanim" ></div>';
h += '<div class="zoneareacircleblue" ></div>';
}
if(obj.boite=='circlered'){
h += '<div class="zoneareacircleredanim" ></div>';
h += '<div class="zoneareacirclered" ></div>';
}
h += '</a>';
}else{
if(oldnav){
if(oldnav){
color='black;'
}
h='<ul ';
h=h + ' id="table' + obj.id + '" class="haveflou ipadul bloc' + obj.id + ' ' +  obj.idscript + '" ';
h=h + ' >';
h=h + ' <li class="ipadli" >';
h=h + '<a id="innerbloc' + obj.id + '" ';
h=h + ' class="ipadbutton ipadbutton' + obj.id + ' ' + obj.idscript + '" ';
h=h + ' style="color:' + color + ';" ';
h=h +  ' href="javascript:return false" ' + act + ' >';
h=h + obj.text;
h=h + '</a>';
h=h + ' </li>';
h=h + '</ul>';
}else{
h='<table style="display:none;color:' + color + ';" ' + act + ' ';
h=h + ' id="table' + obj.id + '" class="' + classbtn + ' haveflou bloc' + obj.id + ' ' +  obj.idscript + '" ';
h=h + ' >';
h=h + '<tr><td id="innerbloc' + obj.id + '" style="text-align:center;' +  obj.cssadd + cssPlus + '" >';
h=h + obj.text;
h=h + '</td></tr></table>';
if(obj.boite.indexOf('neoCss')!=-1){
h='<a ' + act;
h=h + ' id="neoCss' + obj.id + '" class="' + classbtn + ' haveflou bloc' + obj.id + ' ' +  obj.idscript + '" ';
h=h + ' style="cursor:pointer;' + cssPlus + ';color:' + color + ';" >';
h=h + obj.text;
h=h + '</a>';
}
}
}
$("#main").append(h);
}
}
var nbqcmunique=0;
function installRptGraph(obj){
if(obj.type=='ludirpt2'){
var Ecran=document.getElementById("main");
var libelles=obj.text.split('|');
var rptcolors=obj.data.split(';');
var h='<div style="position:absolute;" ';
h += ' id="bloc' + obj.id + '" class="bloc' + obj.id + '" ';
h += '>';
h += '<div style="border-bottom:solid 1px gray;position:absolute;z-index:3;overflow:hidden;" ';
h += ' id="blocbarre' + obj.id + '" class="blocbarre' + obj.id + '" ';
h += '>';
h += '<div class="rptColHorizon" >100%</div>';
h += '<div class="rptColHorizon" >80%</div>';
h += '<div class="rptColHorizon" >60%</div>';
h += '<div class="rptColHorizon" >40%</div>';
h += '<div class="rptColHorizon" >20%</div>';
h += obj.contenu2;
h += '</div>';
h += '<img style="position:absolute;bottom:0px;left:0px;z-index:1;" id="imgbarre' + obj.id + '" class="imgbarre' + obj.id + '"  src="images/LibellesDomaines.png" />';
h += '</div>';
Ecran.innerHTML=Ecran.innerHTML + h;
for(var i=0; i<parseInt(obj.src); i++){
var pourc=0;
if(domainesN_F[i]!=0&&domainesN_T[i]!=0){
pourc=(domainesN_F[i] / domainesN_T[i]);
}
pourc=parseInt(pourc * 100);
if(pourc==0){pourc=1;}
$('.RptvertiBar' + i).css("height", "1%");
if(pourc>1){
var fct="$('.RptvertiBar" + i + "').animate({height :'" + pourc + "%'},1000);";
setTimeout(fct, parseInt(900));
}
domainesPour[i]=pourc;
$('.RptvertiBar' + i).css("position","absolute");
if(pourc<61){
$('.RptvertiBar' + i).css("bottom","-3px");
}
if(pourc<41){
$('.RptvertiBar' + i).css("bottom","-4px");
}
if(pourc<21){
$('.RptvertiBar' + i).css("bottom","-5px");
}
if(pourc>79){
$('.RptvertiBar' + i).css("bottom","-2px");
}
if(pourc>99){
$('.RptvertiBar' + i).css("bottom","-1px");
}
$('.RptvertiBar' + i).css("border","solid 1px gray");
$('.RptvertiBar' + i).css("border-bottom","none");
}
}
}
function onZoomRptGraph(obj){
var hb=parseInt(parseInt(obj.getH() -85) * zoom);
var wb=parseInt(obj.getW() * zoom);
$(".blocbarre" + obj.id).css("height" , hb + 'px');
$(".blocbarre" + obj.id).css("width" , wb + 'px');
$(".imgbarre" + obj.id).css("height" , parseInt(85 * zoom) + 'px');
$(".imgbarre" + obj.id).css("width" ,'100%');
}
var loadReponsesslide='<img class="loadslide" src="css/ajax_loader_orange.gif" />';
var ecranhaveslidepage=0;
function installslidepages(obj){
var h='';
var act='';
var Ecran=document.getElementById("main");
if(obj.type=='slidepages'){
obj.evol=0;
h='<div style="position:absolute;';
h += 'border-right:solid 1px gray;border-left:solid 1px gray;overflow:hidden;" ';
h += ' id="bloc' + obj.id + '" class="bloc' + obj.id + '" ';
h += ' />';
obj.idstr="";
var myString="";
if(obj.text){myString=obj.text;}
var eachElement=myString.split(';');
if(eachElement == null){
}else{
h += '<div id="page" class="SlideContainPage' + obj.id + '" ';
h += ' style="background-color:white;position:absolute;left:0px;top:0px;" ';
h += ' >' ;
obj.idstr="";
var timeelaps=300;
for(var e=0 ; e < eachElement.length; e++){
var reponse=eachElement[e];
if(reponse.indexOf(".xml")!=-1){
var pageid=idpagegen();
obj.idstr=obj.idstr + ';' + pageid;
h += '<div id="' + pageid + '" class="parentPage' + obj.id + '" ';
h += ' style="background-color:white;float:left;position:relative" >';
h += loadReponsesslide;
h += '</div>';
var fct='loadFileSlide( "data/' + reponse + '","' + pageid + '")';
setTimeout(fct,timeelaps)
timeelaps=timeelaps + 500;
}
}
setTimeout("$('.loadslide').css('display','none');",1500);
}
h += '</div>';
h += '</div>';
h += '<div onClick="slideMoveRight(\'' + obj.id + '\')" id="slidebtnr' + obj.id + '" ';
h += ' class="btnslideright" style="display:none;" ></div>';
h += '<div onClick="slideMoveLeft(\'' + obj.id + '\')" id="slidebtnl' + obj.id + '" ';
h += ' class="btnslideleft" style="display:none;" ></div>';
CObjetSlides=new Array();
CObjetSlides_count=0;
if(h!=''){
Ecran.innerHTML=Ecran.innerHTML + h;
if(ecranhaveslidepage==0){
setInterval("CObjetSlides_Paint()",200);
}
ecranhaveslidepage=1;
}
}
}
function idpagegen(){
var randomnumber=Math.floor(Math.random()*10000);
var randomnumber2=Math.floor(Math.random()*10000);
var pageId='page' + randomnumber + randomnumber2;
return pageId;
}
function zoomSlidePages(obj){
var ex=parseInt(obj.getX() * zoom);
var ey=parseInt(obj.getY() * zoom);
var ew=parseInt(obj.getW() * zoom);
var eh=parseInt(obj.getH() * zoom);
$(".parentPage" + obj.id).css("width",ew + 'px').css("height",eh + 'px');
$(".SlideContainPage" + obj.id).css("width",(ew * (obj.note + 2)) + 'px').css("height",eh + 'px');
if(obj.note>1){
$("#slidebtnr" + obj.id).css("display","");
}
$("#slidebtnr" + obj.id).css("left",parseInt((ex + ew) -16) + 'px')
$("#slidebtnr" + obj.id).css("top",parseInt(ey + eh - 110) + 'px');
$("#slidebtnl" + obj.id).css("left",parseInt((ex) -18) + 'px')
$("#slidebtnl" + obj.id).css("top",parseInt(ey + eh - 110) + 'px');
}
function CObjetSlide(){
this.x;
this.y;
this.w;
this.h;
this.ind;
this.text;
this.fontsize;
this.color;
this.align;
this.url;
this.note;
this.border;
this.css;
this.cssadd;
this.selectcolor;
this.remarque;
this.domaine;
this.mymenu;
this.an;
this.de;
this.evol;
this.option;
this.option2;
this.id;
this.idstr;
this.type;
this.theme;
this.src;
this.create;
this.data;
this.onmove;
this.oldzoom;
this.nameecran;
this.zoomslide;
this.show_element=function(){
var Ecran=document.getElementById(this.nameecran);
var e_x=parseInt(this.x * this.zoomslide);
var e_y=parseInt(this.y * this.zoomslide);
var wb=parseInt(this.w * this.zoomslide);
var hb=parseInt(this.h * this.zoomslide);
if(this.an==1){posisty="";}
var color="black";
if(this.color){color=this.color;}
var align="center";
if(this.align){align=this.align;}
var cssPlus="";
if(this.css){cssPlus=this.css;}
if(this.create==0){
var h='';
var act='';
var actslide='';
if(this.url!=''){
if(this.url.indexOf("link:")!=-1){
var ur=this.url.replace('link:','');
act=' onclick="javascript:window.open(\'' + ur + '\');return false;" ';
}else{
var transDir='';
if(this.x < 100){
transDir='left';
}
if(this.x > 620&&typesite!="mobile"){
transDir='right';
}
act=' onclick="transitionDirection=\''+ transDir + '\';loaddata(\'' + this.url + '\',\'' + this.data + '\');" ';
actslide=' onclick="loadFileSlide(\'' + this.url + '\',\'' + this.nameecran + '\');" ';
}
}
if(this.type=='img'){
var srctemp=this.src;
if(srctemp.indexOf(".gif")!=-1){
srctemp=srctemp + '?g=' + Math.floor(Math.random()*10000)
}
h='<img ';
h=h + ' id="blocslide' + this.id + '" class="blocslide' + this.id + '" ';
h=h + ' src="' + srctemp + '" ';
var cur='';
if(actslide!=''){
cur='cursor:pointer;'
}
h=h + ' style="display:none;' + cur + this.cssadd + posisty + '" ';
h=h + actslide;
h=h + ' />';
}
if(this.type=='textimg'){
h='<img style="display:none;" ';
h=h + ' id="blocslide' + this.id + '" class="blocslide' + this.id + '" ';
h=h + ' src="' + this.src + '" ';
if(this.cssadd!=''){
h=h + ' style="' + this.cssadd + '" ';
}
h=h + act;
h=h + ' />';
h=h + '<table style="display:none;color:' + color + ';" ';
h=h + ' id="table' + this.id + '" class="blocslide' + this.id + '" ';
h=h + ' >';
h=h + '<tr><td style="text-align:center;color:' + color + ';" ' + act + ' >';
h=h + this.text;
h=h + '</td></tr></table>';
}
if(this.type=='text'){
h='<table style="display:none;color:' + color + ';" ';
h=h + ' id="table' + this.id + '" class="blocslide' + this.id + '" ';
h=h + ' >';
h=h + '<tr>';
h=h + '<td id="innerbloc' + this.id + '" style="' + alignByObj(this) + cssPlus + this.cssadd + '" >';
var contentAffiche=this.text;
if(contentAffiche.indexOf('{Variable1}')!=-1){
contentAffiche=contentAffiche.replace('{Variable1}',Variable1);
}
h=h + contentAffiche;
h=h + '</td></tr></table>';
}
if(document.getElementById(this.nameecran)){
Ecran.innerHTML=Ecran.innerHTML + h;
this.create=1;
}
}else{
objetslidezoom(this,e_x,e_y);
}
}//show element
}//fin class
function objetslidezoom(obj,e_x,e_y){
var objM=trouveSlidePage(obj.nameecran);
obj.zoomslide=objM.zoomslide;
var sid=".blocslide" + obj.id;
var wb=parseInt(obj.w * objM.zoomslide);
var hb=parseInt(obj.h * objM.zoomslide);
$(sid).css("position","absolute");
$(sid).css("top",(e_y) + "px").css("left",(e_x) + "px");
$(sid).css("width", wb + "px").css("height",hb + "px");
$(sid).fadeIn();
$(sid).css("font-size",parseInt(obj.fontsize * objM.zoomslide) + 'px');
}
function trouveSlidePage(nameecran){
for(var i=0; i < CObjets_count; i++){
if(CObjets[i].type=='slidepages'){
var str=CObjets[i].idstr;
if(str.indexOf(nameecran)!=-1){
return CObjets[i];
}
}
}
var tempBloc=new CObjet();
tempBloc.zoomslide=zoom * 0.94;
return tempBloc;
}
var CObjetSlides=new Array();
var CObjetSlides_count=0;
function CObjetSlides_Add(Elem){
Elem.id=CObjetSlides_count;
CObjetSlides.push(Elem);
CObjetSlides_count=CObjetSlides_count +1;
}
function CObjetSlides_Paint(){
if(ecranhaveslidepage==1){
for(var i=0; i < CObjetSlides_count; i++){
CObjetSlides[i].show_element();
}
}
}
function loadFileSlide(f,nameecran){
var d=new Date();
var n=d.getMinutes();
document.getElementById(nameecran).innerHTML=loadReponsesslide;
f=formatLangUrl(f);
if(localExec()){
var p=f.replace(".xml","");
p=p.replace("data/","");
p=p.replace(langueextend,"");
p=p.replace("page","");
data=poff[parseInt(p)];
openXMLforslide(data,nameecran);
setTimeout("$('.loadslide').css('display','none');",1500);
}else{
$.ajax({
type: "GET",
url: f + '?t=' + n,
dataType: (isMsie()) ? "text" : "xml",
cache:true,
async:true,
success: function(data){
openXMLforslide(data,nameecran);
setTimeout("$('.loadslide').css('display','none');",1000);
},error: function(){
data=getstorage(f);
if(data!=''){
openXMLforslide(data,f);
}else{
noresp();
}
}
});
}
}
function openXMLforslide(data,nameecran){
if(data==''){return false;}
var nbcharge=0;
var xml_p;
if(typeof data == "string"){
xml_p=StringtoXML(data);
}else{
xml_p=data;
}
$(xml_p).find('bloc').each(function(){
var tempBloc=new CObjetSlide();
tempBloc.type=$(this).find('type').text();
tempBloc.src=$(this).find('src').text();
tempBloc.url=$(this).find('url').text();
tempBloc.ind=$(this).find('ind').text();
tempBloc.x=parseInt($(this).find('x').text());
tempBloc.y=parseInt($(this).find('y').text());
tempBloc.w=parseInt($(this).find('w').text());
tempBloc.h=parseInt($(this).find('h').text());
if(mobiSite){
tempBloc.x=parseInt($(this).find('x2').text());
tempBloc.y=parseInt($(this).find('y2').text());
tempBloc.w=parseInt($(this).find('w2').text());
tempBloc.h=parseInt($(this).find('h2').text());
}
tempBloc.fontsize= parseInt($(this).find('fontsize').text());
tempBloc.text=$(this).find('text').text();
tempBloc.color=$(this).find('color').text();
tempBloc.align=$(this).find('align').text();
tempBloc.data=$(this).find('data').text();
tempBloc.note=parseInt($(this).find('note').text());
tempBloc.theme=$(this).find('theme').text();
tempBloc.border=$(this).find('border').text();
tempBloc.css=$(this).find('css').text();
tempBloc.selectcolor=$(this).find('selectcolor').text();
tempBloc.remarque=$(this).find('remarque').text();
tempBloc.domaine=parseInt($(this).find('domaine').text());
tempBloc.option=parseInt($(this).find('option').text());
tempBloc.option2=parseInt($(this).find('option2').text());
tempBloc.an=parseInt($(this).find('an').text());
tempBloc.de=parseInt($(this).find('de').text());
tempBloc.cssadd=$(this).find('cssadd').text();
tempBloc.create=0;
tempBloc.nameecran=nameecran;
tempBloc.zoomslide=1;
CObjetSlides_Add(tempBloc);
nbcharge++;
});
$(xml_p).find('fond').each(function(){
var Slidcolorfond=$(this).find('data').text();
if(Slidcolorfond.indexOf(".jpg")!=-1
||Slidcolorfond.indexOf(".png")!=-1
||Slidcolorfond.indexOf(".gif")!=-1
||Slidcolorfond.indexOf(".jpeg")!=-1){
}else{
$( "#" + nameecran).css("background-color",Slidcolorfond);
}
});
}
function slideMoveRight(id){
var wf=CObjets[id].w * zoom;
var evol=CObjets[id].evol;
if(evol<CObjets[id].note){evol=evol + 1;}
if(evol==CObjets[id].note){$("#slidebtnr" + CObjets[id].id).css("display","none");}
if(evol<CObjets[id].note&&CObjets[id].note>1){
$("#slidebtnr" + CObjets[id].id).fadeIn()
}
if(evol>0&&CObjets[id].note>1){
$("#slidebtnl" + CObjets[id].id).fadeIn()
}
CObjets[id].evol=evol;
$(".SlideContainPage" + id).animate({ left : parseInt(-wf * evol) + 'px' },500);
}
function slideMoveLeft(id){
var wf=CObjets[id].w * zoom;
var evol=CObjets[id].evol;
if(evol>0){evol=evol - 1;}
if(evol==0){$("#slidebtnl" + CObjets[id].id).css("display","none");}
if(evol>1){$("#slidebtnl" + CObjets[id].id).fadeIn();}
if(evol<CObjets[id].note&&CObjets[id].note>1){
$("#slidebtnr" + CObjets[id].id).fadeIn();
}
CObjets[id].evol=evol;
$(".SlideContainPage" + id).animate({ left : parseInt(-wf * evol) + 'px' },500);
}
function openPopupLight(f){
document.getElementById("innerlightbox").innerHTML=loadReponsesslide;
if(ecranhaveslidepage==0){
setInterval("CObjetSlides_Paint()",200);
}
ecranhaveslidepage=1;
loadFileSlide(f,'innerlightbox');
$("#lightbox").css("display","none");
$(".innerlightbox").css("top",'2%').css("left",'-2%');
$(".innerlightbox").css("width", '96%').css("height", '94%');
$(".lightbox").fadeIn();
$(".innerlightbox").animate({
left: '2%'
}, 300, function(){
setTimeout("$('.loadslide').css('display','none');",1500);
});
}
function openWindowsLight(num,larg,haut){
if(num>0){
LUDIactivePopUp=num;
if(!document.getElementById("divopacover")){
var h='<div id="divopacover" class="divopacover" ></div>';
$("#main").append(h);
}
if(!document.getElementById("divwindowsligth")){
var h='<div id="divwindowsligth" class="divwindowsligth" ></div>';
$("#main").append(h);
}
var objBarre=getPopBarre(num);
var b='<div id="divwindowsobjBarre" style="position:absolute;left:0px;top:0px;right:-1px;';
b=b + 'background-color:'+objBarre.selectcolor+';color:'+objBarre.color+';" >';
b=b + '&nbsp;&nbsp;' + objBarre.text;
if(objBarre.option==1){
b=b + '<div class="divwindowsligthclose" onClick="closePopBarre();" ></div>';
}
b=b + '</div>';
$("#divwindowsligth").html(b);
$("#divopacover ,#divwindowsligth").css("display","block");
$('#divwindowsobjBarre').css("line-height",parseInt(32 * zoom) + 'px');
var xb=parseInt(((largEcranWidth-larg)/2) * zoom);
var yb=parseInt(((largEcranHeight-haut)/2) * zoom);
var wb=parseInt(larg * zoom);
var hb=parseInt(haut * zoom);
$('#divwindowsligth').css("left",xb + 'px').css("top",yb + 'px');
$('#divwindowsligth').css("width",wb + 'px').css("height",hb + 'px');
$('#divwindowsligth').addClass("slideludiscape");
var condi='if(lastPage0==' + lastPage0 + '){';
var condistop='}';
setTimeout(condi + 'showWindowsLight(' + num + ')' + condistop, 1000);
}else{
closePopBarre();
}
}
function closePopBarre(){
$("#divopacover ,#divwindowsligth").css("display","none");
for(var i=0; i < CObjets_count;i++){
var obj=CObjets[i];
var sid=".bloc" + obj.id +",.alterbloc" + obj.id;
if(obj.pp!=0){
$(sid).css({opacity:0});
$(sid).css("margin-top","-1000px");
}
}
LUDIactivePopUp=0;
}
function getPopBarre(num){
for(var i=0; i < CObjets_count;i++){
var obj=CObjets[i];
if(obj.pp==num&&obj.type=='popBarre'){
return obj;
}
}
}
function showWindowsLight(num){
$('#divwindowsligth').css({opacity:1});
$('#divwindowsligth').css("margin-top","0px");
$('#divwindowsligth').css("display","block");
for(var i=0; i < CObjets_count;i++){
var obj=CObjets[i];
var sid=".bloc" + obj.id +",.alterbloc" + obj.id;
if(obj.pp==num){
if(obj.an!=18){
$(sid).css({opacity:1});
$(sid).css("margin-top","0px");
}
}
}
}
var transitionPage="Classic";
var oldTransitionPage="Classic";
var transitionDirection="";
function objetanim(obj){
if(obj.type=="examBar"
||obj.type=="geoline"
||obj.type=="examBarScreen"){
return false;
}
if(obj.an==0){
obj.an=1;
}
var o_de=obj.de;
var o_dedi=obj.dedi;
if(CanalTempo==2){
o_de=obj.de2;
o_dedi=obj.dedi2;
}
if(obj.an==11&&o_de==0){
obj.an=1;
}
if(lastPage0==0&&obj.an==24){
o_de=o_de + 1000;
}
var condi='if(lastPage0==' + lastPage0 + '){';
var condistop='}';
var sid=".bloc" + obj.id +",.alterbloc" + obj.id;
if(obj.pp!=0){
$(sid).css({ opacity: 0});
$(sid).css("margin-top", "-1000px");
return false;
}
if(obj.an!=1){
var xb=parseInt(obj.getX() * zoom);
var yb=parseInt(obj.getY() * zoom);
var wb=parseInt(obj.getW() * zoom);
var hb=parseInt(obj.getH() * zoom);
var ecranW= document.getElementById("main").offsetWidth;
var ecranH= document.getElementById("main").offsetHeight;
if(ecranW==0){ecranW=1000;}
if(ecranH==0){ecranH=900;}
if(obj.an==2){
$(sid).css("margin-top", parseInt(ecranH - yb + 300 ) + "px");
obj.fctanim='$(\'' + sid + '\').animate({marginTop : "0px"},700);';
if(obj.AnimClic==0){
setTimeoutLudi(condi + obj.fctanim + condistop, o_de);
}
}
if(obj.an==3){
$(sid).css("margin-top", "-" + parseInt(yb + hb + 300) + "px");
obj.fctanim='$(\'' + sid + '\').animate({marginTop : "0px"},700);';
if(obj.AnimClic==0){
setTimeoutLudi(condi + obj.fctanim + condistop, o_de);
}
}
if(obj.an==4){
var decx=parseInt(xb + wb);
$(sid).css("margin-left", "-" + (decx + 20) + "px");
obj.fctanim='$(\'' + sid + '\').animate({marginLeft : "0px"},700);';
if(obj.AnimClic==0){
setTimeoutLudi(condi + obj.fctanim + condistop, o_de);
}
}
if(obj.an==5){
var decx=parseInt(ecranW - xb) + 70;
if(decx<((largEcranWidth-20) * zoom)){
decx=largEcranWidth * zoom;
}
$(sid).css("margin-left", decx + "px");
obj.fctanim='$(\'' + sid + '\').animate({marginLeft : "0px"},1000);';
if(obj.AnimClic==0){
setTimeoutLudi(condi + obj.fctanim + condistop, o_de);
}
}
if(obj.an==10){
if(document.getElementById("innerbloc" + obj.id)){
var sidinner="#innerbloc" + obj.id;
$(sidinner).css({ opacity: 0});
if(!oldnav){
var fctanim2='$(\'' + sidinner + '\').css({ opacity: 1 });';
obj.fctanim=fctanim2 + 'textlplfct(\'' + sidinner + '\');';
if(obj.AnimClic==0){
setTimeoutLudi(condi + obj.fctanim + condistop, o_de);
}
}else{
obj.fctanim='$(\'' + sidinner + '\').css({ opacity: 1 })';
if(obj.AnimClic==0){
setTimeoutLudi(condi + obj.fctanim + condistop,o_de);
}
}
}
}
if(obj.an==11){
if(!oldnav){
$(sid).css({ opacity: 0});
$(sid).css("margin-top", "-1000px");
obj.fctanim='$(\'' + sid + '\').css("margin-top","0px");$(\'' + sid + '\').animate({opacity : "1"},700);';
if(obj.AnimClic==0){
setTimeoutLudi(condi + obj.fctanim + condistop, o_de);
}
}else{
$(sid).css({ opacity: 0}).css("margin-top", "-1000px");
obj.fctanim='$(\'' + sid + '\').css("margin-top","0px").css({opacity : "1"},700);';
if(obj.AnimClic==0){
setTimeoutLudi(condi + obj.fctanim + condistop, o_de);
}
}
}
if(obj.an==12){
$(sid).css("margin-top", "1000px");
}
if(obj.an==13){
$(sid).css("margin-top", "-500px").css("margin-left", "500px").css("opacity", "0.2");
var fctanim= '$(\'' + sid + '\').animate({marginLeft:"0px",marginTop:"0px",opacity:1},300);';
obj.fctanim=fctanim;
if(obj.AnimClic==0){
setTimeoutLudi(condi + obj.fctanim + condistop,o_de);
}
}
if(!oldnav){
if(obj.an==14){
obj.fctanim='danceYTop(\'' + obj.id + '\');';
if(obj.AnimClic==0){
setTimeoutLudi(condi + obj.fctanim + condistop,o_de);
}
}
}
if(!oldnav){
if(obj.an==15){
obj.evol=40;
$(sid).css("margin-top", "-1500px");
obj.fctanim='appliqueSkew(\'' + obj.id + '\');';
if(obj.AnimClic==0){
setTimeoutLudi(condi + obj.fctanim + condistop, o_de);
}
}
}
if(obj.an==16){
if(!oldnav){
$(sid + ' .phr').each(function(index){
$(this).css("display","none");
});
obj.fctanim='anim16(\'' + obj.id + '\');';
if(obj.AnimClic==0){
setTimeoutLudi(condi + obj.fctanim + condistop, o_de);
}
}else{
$(sid + ' .phr').each(function(index){
$(this).css("display","none");
});
obj.fctanim='anim16Old(\'' + obj.id + '\',250);';
if(obj.AnimClic==0){
setTimeoutLudi(condi + obj.fctanim + condistop, o_de);
}
}
}
if(!oldnav){
if(obj.an==17){
obj.rotation=0;
obj.fctanim='rotationObjet(\'' + obj.id + '\');';
if(obj.AnimClic==0){
setTimeoutLudi(condi + obj.fctanim + condistop,o_de);
}
}
}
if(obj.an==18){
$(sid).css({ opacity: 0 });
$(sid).css("margin-top", "1000px");
if(obj.type=='input'){
$(".input" + obj.id ).css("margin-top", "1000px");
}
}
if(obj.an==19){
obj.fctanim='$(\'' + sid + '\').addClass("shakeludiscape");';
if(obj.AnimClic==0){
setTimeoutLudi(condi + obj.fctanim + condistop,o_de);
}
}
if(obj.an==21){
var ecranY1=(largEcranHeight) * zoom ;
$(sid).css("-ms-transform", "translateY(-"+ecranY1+"px)");
$(sid).css("transform", "translateY(-"+ecranY1+"px)");
$(sid).css("-webkit-transform", "translateY(-"+ecranY1+"px)");
obj.fctanim='$(\'' + sid + '\').addClass("bounce-in-top");';
if(obj.AnimClic==0){
setTimeoutLudi(condi + obj.fctanim + condistop,o_de);
}
}
if(obj.an==22){
$(sid).css("opacity", "0");
obj.fctanim='$(\'' + sid + '\').addClass("slideludiscape");';
if(obj.AnimClic==0){
setTimeoutLudi(condi + obj.fctanim + condistop,o_de);
}
}
if(obj.an==23){
obj.fctanim='$(\'' + sid + '\').addClass("heartbeatludiscape");';
if(obj.AnimClic==0){
setTimeoutLudi(condi + obj.fctanim + condistop,o_de);
}
}
if(obj.an==26){
obj.fctanim='$(\'' + sid + '\').addClass("animevidencelittle");';
if(obj.AnimClic==0){
setTimeoutLudi(condi + obj.fctanim + condistop,o_de);
}
}
if(obj.an==27){
obj.fctanim='$(\'' + sid + '\').addClass("animewobble");';
if(obj.AnimClic==0){
setTimeoutLudi(condi + obj.fctanim + condistop,o_de);
}
}
if(obj.an==24){
$(sid).css({ opacity: 0});
$(sid).css("margin-top", "-1000px");
if(obj.type=='handcircle'){
obj.fctanim='launchHandWritingCircle(\'' + obj.id + '\');';
}else{
if(obj.type=='handarrow'){
obj.fctanim='launchHandArrowAnim(\'' + obj.id + '\',0,"right");';
}else{
if(obj.type=='handarrowbottom'){
obj.fctanim='launchHandArrowAnim(\'' + obj.id + '\',0,"bottom");';
}else{
obj.fctanim='launchHandWriting(\'' + obj.id + '\');';
}
}
}
if(obj.AnimClic==0){
setTimeoutLudi(condi + obj.fctanim + condistop,o_de);
}
}
}
var o_di=obj.di;
if(CanalTempo==2){
o_di=obj.di2;
}
if(o_di==1){
if(!oldnav){
var fctanim='$(\'' + sid + '\').animate({opacity : "0"},700,function(){$(\'' + sid + '\').css("margin-top","-100px");});';
setTimeoutLudi(condi + fctanim + condistop,o_de + o_dedi + 500);
}else{
var fctanim='$(\'' + sid + '\').css({opacity : 0}).css("margin-top","-100px");';
setTimeoutLudi(condi + fctanim + condistop,o_de + o_dedi + 300);
}
}
}
function textlplfct(idtxt){
if(jQuery().textlpl){
$(idtxt).textlpl();
}
}
function CAnimEnvent(){
this.id;
this.time;
this.fct;
this.page;
this.active;
this.execution=function(){//**
if(this.fct!=''){
eval(this.fct);
}
}//**
}//**
var actualTimeoutLudi=0;
var CAnimEnvents=new Array();
var CAnimEnvents_count=0;
function CAnimEnvents_Add(Elem){
Elem.id=CAnimEnvents_count;
CAnimEnvents.push(Elem);
CAnimEnvents_count=CAnimEnvents_count +1;
}
function setTimeoutLudi(fct,time){
var tempBlocPage=new CAnimEnvent();
tempBlocPage.time=actualTimeoutLudi + time;
tempBlocPage.active=1;
tempBlocPage.fct=fct;
tempBlocPage.page=lastPage0;
CAnimEnvents_Add(tempBlocPage);
}
setTimeout('LoopTimeoutLudi();', 100);
function LoopTimeoutLudi(){
actualTimeoutLudi=actualTimeoutLudi + 100;
for(var i=0; i < CAnimEnvents_count; i++){
if(CAnimEnvents[i]){
if(CAnimEnvents[i].active==1){
if(CAnimEnvents[i].page==lastPage0){
if(actualTimeoutLudi>CAnimEnvents[i].time||actualTimeoutLudi==CAnimEnvents[i].time){
if(CAnimEnvents[i].active==1){
CAnimEnvents[i].execution();
CAnimEnvents[i].active=0;
}else{
CAnimEnvents[i].active=0;
}
}
}
}
}
}
setTimeout('LoopTimeoutLudi()', 100);
}
function appliqueSkew(i){
var id='.bloc' + i;
$(id).css("margin-top", "0px");
CObjets[i].evol=parseInt(CObjets[i].evol)- 1
var Skewx=CObjets[i].evol - 1;
var Skewy=(CObjets[i].evol)*2;
var sk=' skew(' + Skewx + 'deg,' + Skewy + 'deg)';
$(id).css({
WebkitTransform : sk ,
MozTransform   : sk,
MsTransform     : sk,
OTransform     : sk,
transform     : sk
});
if(CObjets[i].evol>0){
var fctanim='appliqueSkew(\'' + CObjets[i].id + '\');';
setTimeout(fctanim, 25);
}else{
$(id).css({
WebkitTransform : "skew(0deg,0deg)" ,
MozTransform   : "skew(0deg,0deg)",
MsTransform     : "skew(0deg,0deg)",
OTransform     : "skew(0deg,0deg)",
transform     : "skew(0deg,0deg)"
});
}
}
function danceYTop(vid){
try
{
var sid=".bloc" + vid;
if(CObjets[vid]){
if(CObjets[vid].an==14){
$(sid).animate({marginTop:"-0.5em"},1000, function(){
danceYBottom(vid);
});
}else{
$(sid).css("margin-top","0px");
}
}
}catch(err){}
}
function danceYBottom(vid){
try
{
var sid=".bloc" + vid;
if(CObjets[vid]){
if(CObjets[vid].an==14){
$(sid).animate({marginTop:"0.5em"},1000, function(){
danceYTop(vid);
});
}else{
$(sid).css("margin-top","0px");
}
}
}catch(err){}
}
function anim12(){
var continu=false;
for(var i=0; i < CObjets_count; i++){
if(CObjets[i].an==12){
continu=true;
}
}
if(continu==false){
return false;
}
if(isok()){
for(var i=0; i < CObjets_count; i++){
if(CObjets[i].an==12){
var o_de=CObjets[i].de;
if(CanalTempo==2){
o_de=CObjets[i].de2;
}
var sid=".bloc" + CObjets[i].id + ",.alterbloc" + CObjets[i].id;
var fctanim='$(\'' + sid + '\').animate({marginTop : "0px"},700);';
setTimeoutLudi(fctanim, o_de);
}
}
}else{
setTimeoutLudi("anim12();", 1000);
}
}
function anim16(idobj){
var sid="#table" + idobj;
var ind=0;
var tempNd=250;
$(sid + ' .phr').each(function(index){
if(ind==0){
var sd=$(this).css("display");
if(sd=='none'){
ind=ind + 1;
$(this).delay(tempNd).fadeIn(500,function(){
$(this).css("display","");
anim16(idobj);
});
tempNd=tempNd + 2000;
}
}
});
}
function anim16Old(idobj,tempNd){
var sid="#table" + idobj;
var ind=0;
if(tempNd!=2000){
tempNd=2000;
}
$(sid + ' .phr').each(function(index){
if(ind==0){
var sd=$(this).css("display");
if(sd=='none'){
ind=1;
$(this).css("display","");
setTimeoutLudi("anim16Old(" + idobj + "," + tempNd + ");",tempNd);
}
}
});
}
var preloadIncrement=0;
function activeObjectAnimClic(){
var j=-1;
var ctrX=1500;
var ctrY=1500;
for(var i=0; i < CObjets_count; i++){
if(CObjets[i].an!=1){
if(CObjets[i].AnimClic==1){
if(CObjets[i].y<ctrY){
ctrY=CObjets[i].y;
ctrX=CObjets[i].x;
j=i;
}else{
if(CObjets[i].y==ctrY){
if(CObjets[i].x<ctrX){
ctrX=CObjets[i].x;
j=i;
}
}
}
}
}
}
if(j!=-1){
var o_de=CObjets[i].de;
if(CanalTempo==2){
o_de=CObjets[i].de2;
}
setTimeoutLudi(CObjets[j].fctanim,o_de);
CObjets[j].AnimClic=2;
}
}
function zoomExterieur(){
$('#zoomtransition').css("left",'0px');
$('#zoomtransition').css("top",'0px');
$("#zoomtransition").css("width", $("#globaltransition").width() + 'px');
$("#zoomtransition").css("height", $("#globaltransition").height() + 'px');
$('#zoomtransition').css("opacity" , "1");
var finalfond=colorfond;
if(colorfond.indexOf("large:")!=-1){
finalfond=colorfond.replace('large:','');
}
if(document.getElementById("zoomtransition")){
$(".large").fadeOut();
document.getElementById("zoomtransition").src=finalfond;
}
$("#globaltransition").css("display","");
if(transitionDirection==""){
$('#zoomtransition').stop().animate(
{opacity: 0.8,
left : "-=300px",top : "-=300px",
width : "+=600px",height : "+=600px"
},1000, function(){
$("#globaltransition").fadeOut("slow");
});
}
if(transitionDirection=="left"){
$('#zoomtransition').stop().animate(
{opacity: 0.9,
left : "0px",top : "-=50px",
width : "+=150px",height : "+=100px"
},600, function(){
$('#zoomtransition').animate(
{left : "600px",opacity: 0.2
},400, function(){
$("#globaltransition").fadeOut("slow");
});
});
}
if(transitionDirection=="right"){
$('#zoomtransition').stop().animate(
{opacity: 0.9,
left : "-=150px",top : "-=50px",
width : "+=150px",height : "+=100px"
},600, function(){
$('#zoomtransition').animate(
{left : "-=600px",opacity: 0.2
},400, function(){
$("#globaltransition").fadeOut("slow");
});
});
}
}
function fakeContent(){
if(document.getElementById("colorfond")){
document.getElementById("zoomtransition").src=imagefondglobal;
$('#zoomtransition').css("left",'0px');
$('#zoomtransition').css("top",'0px');
$("#zoomtransition").css("width", $("#globaltransition").width() + 'px');
$("#zoomtransition").css("height", $("#globaltransition").height() + 'px');
$('#zoomtransition').css("opacity" , "1");
$("#globaltransition").css("display","");
}
}
var Base_MEM='';
var BaseMEMdbl='';
var BaseNodbl='';
var Base_memoire=new Array();
var BasePageTirageUnique=new Array();
var QuestionAleaMemeEcran=false;
function appliqueDataB(obj){
var eachContent;
if(obj.linkcontenu!=''&&obj.linkcontenu.indexOf(':')!=-1){
eachContent=obj.linkcontenu.split(':');
VerifLoadBaseLink(eachContent[0]);
}else{
if(obj.linkimage!=''&&obj.linkimage.indexOf(':')!=-1){
eachContent=obj.linkimage.split(':');
VerifLoadBaseLink(eachContent[0]);
}
}
if(obj.linkx!=''&&obj.linkx.indexOf(':')!=-1){
eachContent=obj.linkx.split(':');
VerifLoadBaseLink(eachContent[0]);
}
if(obj.type=='text'){
if(obj.linkcontenu!=''){
var txt=recupDataLink(obj.linkcontenu,obj.text);
$('#innerbloc' + obj.id).html(txt);
}
}
if(obj.type=='drag'){
if(obj.linkcontenu!=''){
var txt=recupDataLink(obj.linkcontenu,obj.text);
$('#innerbloc' + obj.id).html(txt);
}
}
if(obj.type=='button'){
if(obj.linkcontenu!=''){
$('#innerbloc' + obj.id).html(recupDataLink(obj.linkcontenu,obj.text));
}
}
if(obj.type=='img'){
if(obj.linkimage!=''){
var imgsrc=recupDataLink(obj.linkimage,obj.src);
if(imgsrc==''){
$('#bloc' + obj.id).css('margin-top','-1000px');
}else{
$('#bloc' + obj.id).attr('src',imgsrc);
redimImageSrc(imgsrc,obj,0);
}
}
}
if(obj.linkx!=''){
var nx=parseInt(recupDataLink(obj.linkx,obj.getX()));
obj.setX(nx);
}
if(obj.linky!=''){
obj.setY(parseInt(recupDataLink(obj.linky,obj.getY())));
}
}
function redimImageSrc(isrc,obj,nb){
if(nb>10){return false;}
var oImg=document.getElementById("imgloadctr");
oImg.src=isrc;
if(nb>0){
var ratio=$('#bloc' + obj.id).height() / oImg.offsetHeight;
obj.w=oImg.offsetWidth * ratio;
obj.h=oImg.offsetHeight * ratio;
obj.oldzoom=0;
}else{
window.setTimeout( function(){redimImageSrc(isrc,obj,parseInt(nb+1))}, 200);
}
}
function appliqueDataQCM(obj){
var eachContent;
if(obj.linkcontenu!=''&&obj.linkcontenu.indexOf(':')!=-1){
eachContent=obj.linkcontenu.split(':');
var nameB=eachContent[0];
VerifLoadBaseLink(nameB);
var ctrtext=recupDataLink(nameB + ':B','');
if(ctrtext!=''){
obj.remarque=ctrtext;
}
var text='';
var nbr=0;
ctrtext=recupDataLink(nameB + ':C','');
if(ctrtext!=''){
text=text + ctrtext;
nbr++;
}
ctrtext=recupDataLink(nameB + ':D','');
if(ctrtext!=''){
text=text + ';' + ctrtext;
nbr++;
}
ctrtext=recupDataLink(nameB + ':E','');
if(ctrtext!=''){
text=text + ';' + ctrtext;
nbr++;
}
ctrtext=recupDataLink(nameB + ':F','');
if(ctrtext!=''){
text=text + ';' + ctrtext;
nbr++;
}
ctrtext=recupDataLink(nameB + ':G','');
if(ctrtext!=''){
text=text + ';' + ctrtext;
nbr++;
}
ctrtext=recupDataLink(nameB + ':H','');
if(ctrtext!=''){
text=text + ';' + ctrtext;
nbr++;
}
ctrtext=recupDataLink(nameB + ':I','');
if(ctrtext!=''){
text=text + ';' + ctrtext;
nbr++;
}
ctrtext=recupDataLink(nameB + ':J','');
if(ctrtext!=''){
text=text + ';' + ctrtext;
nbr++;
}
ctrtext=recupDataLink(nameB + ':K','');
if(ctrtext!=''){
text=text + ';' + ctrtext;
nbr++;
}
ctrtext=recupDataLink(nameB + ':L','');
if(ctrtext!=''){
text=text + ';' + ctrtext;
nbr++;
}
if(text!=''){
obj.text=text;
obj.h=obj.contenu2 * nbr;
}
}
}
function VerifLoadBaseLink(nameBase){
if(Base_MEM.indexOf(nameBase + ';')==-1){
Base_MEM=Base_MEM + nameBase + ';';
loadB(nameBase);
}
}
function recupDataLink(linkcontenu,text){
var eachContent=linkcontenu.split(':');
var nameB=eachContent[0];
var col=eachContent[1];
var nb=0;
for(var i=0; i < CBase_count; i++){
if(CBases[i].NameBase==nameB){
nb=nb + 1;
}
}
var nbr=parseInt(Math.random() * nb);
var memtest="!" + nameB + "-" + nbr;
if(tirageunique==1){
if(BasePageTirageUnique.hasOwnProperty(menu_global)){
if(BasePageTirageUnique[menu_global].hasOwnProperty(nameB)){
nbr=BasePageTirageUnique[menu_global][nameB];
Base_memoire[nameB]=nbr;
}
}
}
if(Base_memoire.hasOwnProperty(nameB)){
nbr=Base_memoire[nameB];
}else{
if(BaseMEMdbl.indexOf(memtest)!=-1){
for(var j=0; j < 50; j++){
nbr=parseInt(Math.random() * nb);
var memctrl="!" + nameB + "-" + nbr;
if(BaseMEMdbl.indexOf(memctrl)==-1){
j=50;
}
}
}else{
BaseMEMdbl=BaseMEMdbl + memtest;
}
if(BasePageTirageUnique.hasOwnProperty(menu_global)){
BasePageTirageUnique[menu_global][nameB]=nbr;
}
Base_memoire[nameB]=nbr;
}
nb=0;
for(var i=0; i < CBase_count; i++){
if(CBases[i].NameBase==nameB){
if(nb==nbr){
if(col=='A'){return parseTxt(CBases[i].A);}
if(col=='B'){return parseTxt(CBases[i].B);}
if(col=='C'){return parseTxt(CBases[i].C);}
if(col=='D'){return parseTxt(CBases[i].D);}
if(col=='E'){return parseTxt(CBases[i].E);}
if(col=='F'){return parseTxt(CBases[i].F);}
if(col=='G'){return parseTxt(CBases[i].G);}
if(col=='H'){return parseTxt(CBases[i].H);}
if(col=='I'){return parseTxt(CBases[i].I);}
if(col=='J'){return parseTxt(CBases[i].J);}
if(col=='K'){return parseTxt(CBases[i].K);}
if(col=='L'){return parseTxt(CBases[i].L);}
if(col=='M'){return parseTxt(CBases[i].M);}
if(col=='N'){return parseTxt(CBases[i].N);}
if(col=='O'){return parseTxt(CBases[i].O);}
}
nb=nb + 1;
}
}
return text;
}
function parseTxt(str){
if(typeof(str) == 'undefined'){
return('');
}
str=str.replace(String.fromCharCode(10),'');
str=str.replace(String.fromCharCode(13),'');
sautl=/[\n]/gi;
str=str.replace(sautl, "" );
return $.trim(str);
}
function loadB(f){
var baseOffCtr=false;
if(typeof(basedataoff)!=='undefined'){
if(typeof(basedataoff[f])!=='undefined'){
baseOffCtr=true;
}
}
if(baseOffCtr){
var dataOff=basedataoff[f];
openLinkBaseXML(dataOff,f);
}else{
var linkbase='data/outlink' + f + '.html';
$.ajax({
type: "GET",
url: linkbase,
dataType: "text",
cache:false,async:false,
success: function(data){
$.ajax({
type: "GET",
url: data,
cache:false,async:false,
success: function(data){
openLinkBaseXML(data,f);
},
error: function(xhr, ajaxOptions, thrownError){
loadB2(f);
}
});
},
error: function(xhr, ajaxOptions, thrownError){
loadB2(f);
}
});
}
}
function loadB2(f){
$.ajax({
type: "GET",
url: 'data/' + f + '.xml',
dataType: (isMsie()) ? "text" : "xml",
cache:true,
async:false,
success: function(data){
openLinkBaseXML(data,f);
},
error: function(){}
});
}
function CBase(){
this.NameBase;
this.A;
this.B;
this.C;
this.D;
this.E;
this.F;
this.G;
this.H;
this.I;
this.J;
this.K;
this.L;
this.M;
this.N;
this.O;
}
var CBases=new Array();
var CBase_count=0;
function CBases_Add(Elem){
Elem.id=CBase_count;
CBases.push(Elem);
CBase_count=CBase_count +1;
}
function openLinkBaseXML(data,nameB){
if(data==''){
return false;
}
var xml_p;
if(typeof data == "string"){
xml_p=StringtoXML(data);
}else{
xml_p=data;
}
$(xml_p).find('data').each(function(){
var tempBloc=new CBase();
tempBloc.NameBase=nameB;
var nb=0;
$(this).find('value').each(function(){
if(nb==0){tempBloc.A=parseTxt($(this).text());}
if(nb==1){tempBloc.B=parseTxt($(this).text());}
if(nb==2){tempBloc.C=parseTxt($(this).text());}
if(nb==3){tempBloc.D=parseTxt($(this).text());}
if(nb==4){tempBloc.E=parseTxt($(this).text());}
if(nb==5){tempBloc.F=parseTxt($(this).text());}
if(nb==6){tempBloc.G=parseTxt($(this).text());}
if(nb==7){tempBloc.H=parseTxt($(this).text());}
if(nb==8){tempBloc.I=parseTxt($(this).text());}
if(nb==9){tempBloc.J=parseTxt($(this).text());}
if(nb==10){tempBloc.K=parseTxt($(this).text());}
if(nb==11){tempBloc.L=parseTxt($(this).text());}
if(nb==12){tempBloc.M=parseTxt($(this).text());}
if(nb==13){tempBloc.N=parseTxt($(this).text());}
if(nb==14){tempBloc.O=parseTxt($(this).text());}
nb++;
});
CBases_Add(tempBloc);
});
}
function decludi(data){
if(data.indexOf('crypt-')!=-1){
data=data.replace('crypt-','');
data=decludiAll(data,'zpx','e');
data=decludiAll(data,'zqx','o');
data=decludiAll(data,'zrx','a');
data=decludiAll(data,'zsx','i');
data=decludiAll(data,'ybx','0');
data=decludiAll(data,'ycx','1');
data=decludiAll(data,'ydx','2');
data=decludiAll(data,'yfx','3');
data=decludiAll(data,'ygx','4');
data=decludiAll(data,'yhx','5');
data=decludiAll(data,'yjx','6');
data=decludiAll(data,'ykx','7');
data=decludiAll(data,'ylx','8');
data=decludiAll(data,'ymx','9');
}
return data;
}
function decludiAll(str, find, replace){
return str.replace(new RegExp(find, 'g'), replace);
}
var filedata='';
var PlanorigineX=-1;
var PlanorigineY=-1 ;
var PlanobjectifY=100 ;
var objectifPlanorigineX=100;
var objectifPlanorigineY=100 ;
var objectifActive=0 ;
var xcoordplan=0;
var ycoordplan=0;
var decxcoordplan=0;
var decycoordplan=0;
var backgroundcolorplan="white";
var largXplan=0;
function resetAllParametrePlan(){
filedata='';
PlanorigineX=-1;
PlanorigineY=-1 ;
PlanobjectifY=100 ;
objectifPlanorigineX=100;
objectifPlanorigineY=100 ;
objectifActive=0 ;
xcoordplan=0;
ycoordplan=0;
decxcoordplan=0;
decycoordplan=0;
backgroundcolorplan="white";
largXplan=0;
CPlans=new Array();
CPlan_count=0;
planZoom=0.8;
planObjZoom=0.8;
initplanZoom=1;
initObjZoom=1;
movePlanZoom=0;
toolplan=0;
}
function installludiplan(obj){
var Ecran=document.getElementById("main");
if(obj.type=='ludiplan'){
resetAllParametrePlan();
h='<div style="display:none;px;cursor:pointer;border:solid 1px black;" ';
h=h + ' id="mymap" class="instaplan bloc' +  obj.id + '" >';
h=h + '</div>';
Ecran.innerHTML=Ecran.innerHTML + h;
PlanorigineY=-1;
initplanZoom=1;
CPlan_count=0;
loadPlan('ludiplan/' + obj.contenu2);
}
}
function loadPlan(urlink){
var d=new Date();
var n=d.getMinutes();
$.ajax({
type: "GET",
url: urlink,
dataType: (isMsie()) ? "text" : "xml",
async:false,
success: function(data){
openPlanXML(data);
initorigineplan();
},
error: function(){
if(langue=='fr'){
alert("Erreur, Veuillez charger un fichier ludiplan en double-cliquant sur l'objet !");
}else{
alert("error, please load a file Ludiplan !");
}
}
});
}
var CPlans=new Array();
var CPlan_count=0;
var planZoom=0.8;
var planObjZoom=0.8;
var initplanZoom=1;
var initObjZoom=1;
var movePlanZoom=0;
function CPlans_Add(Elem){
Elem.id=CPlan_count;
Elem.create=0;
CPlans.push(Elem);
CPlan_count=CPlan_count + 1 ;
}
function initorigineplan(){
if(document.getElementById("mymap")){
var wi=parseInt(document.getElementById("mymap").offsetWidth);
if(wi>10){
if(PlanorigineY==-1){
PlanorigineX=wi /2;
var he=parseInt(document.getElementById("mymap").offsetHeight);
PlanorigineY=parseInt(he/2) + parseInt(he * 0.15);
PlanobjectifY=document.getElementById("mymap").offsetHeight /2;
initludiplan();
}
}
}
}
function CPlan(){
this.id;
this.x;
this.y;
this.w;
this.h;
this.data;
this.TypeGeo;
this.texte;
this.script;
this.create;
this.show_element=function(){
var e_x=PlanorigineX + parseInt(this.x * planZoom);
var e_y=PlanorigineY - parseInt(this.y * planZoom);
if(this.create==0){
var h='';
h=h + '<img id="blocplan' + this.id + '" ';
h=h + ' style="position:absolute;left:10px;top:10px;display:none;';
if(this.TypeGeo==1){
h=h + 'z-index:' + parseInt(10000 - this.y ) + ';"  ';
}
if(this.TypeGeo==10){
h=h + 'z-index:' + parseInt(100000 - this.y ) + ';"  ';
}
if(this.TypeGeo==2){
h=h + 'z-index:0;"  ';
}
h=h + ' src="ludiplan/' + this.data + '" onMouseDown="disableselectplan();" onMouseUp="reEnableplan();" />';
if(this.TypeGeo==10){
h=h + '<table id="blocplantitle' + this.id + '" ';
h=h + ' style="top:-100px;position:absolute;text-align:center;';
h=h +'z-index:' + parseInt(100000 - this.y ) + ';" ';
h=h + ' />';
var act='';
if(this.script!=''){
act=' onClick="' + this.script + '" ';
}
h=h + '<tr><td ' + act + ' style="font_size:14px;"  >';
h=h + this.texte;
h=h + '</td></tr>';
h=h + '<tr><td style="height:10px;" ></td></tr>';
h=h + '</table>';
}
var mymap=document.getElementById("mymap");
mymap.innerHTML=mymap.innerHTML + h;
this.create=1;
}else{
var planid="#blocplan" + this.id;
if(document.getElementById("blocplan" + this.id)){
if(this.TypeGeo==1||this.TypeGeo==2){
var wb=parseInt(this.w * planZoom);
var hb=parseInt(this.h * planZoom);
$(planid).css("left",(e_x - (wb / 2)) + "px").css("top",(e_y - ((hb / 4) *3)) + "px");
$(planid).fadeIn();
$(planid).css("width", wb + "px").css("height",hb + "px");
}
}
if(this.TypeGeo==10){
var planidcss="#blocplantitle" + this.id;
var wb=parseInt(this.w);
var hb=parseInt(this.h);
$(planid).css("left",(e_x - (wb / 2)) + "px").css("top",(e_y - hb) + "px");
$(planid).fadeIn();
$(planid).css("width", wb + "px").css("height",hb + "px");
$(planidcss).css("left",(e_x - (wb / 2)) + "px").css("top",(e_y - hb) + "px");
$(planidcss).fadeIn();
$(planidcss).css("width", wb + "px").css("height",hb + "px");
}
$(planid).css("position","absolute");
}
}
}
function disableselectplan(){
return false;
}
function reEnableplan(){
return true;
}
function PaintPlan(){
initorigineplan();
if(PlanorigineY!=-1){
if(initplanZoom==1&&PlanorigineY>PlanobjectifY){
PlanorigineY=PlanorigineY - 2;
}else{
initplanZoom=0;
}
}
if(initObjZoom==1){
if(planZoom<planObjZoom-0.025||planZoom>planObjZoom+0.025){
if(planZoom>planObjZoom){
planZoom=planZoom - 0.024;
}else{
if(planZoom<planObjZoom){
planZoom=planZoom + 0.025;
}
}
}else{
initObjZoom=0;
}
}
if(document.getElementById("mymap")){
if(CPlan_count>0){
for(var i=0; i < CPlan_count; i++){
CPlans[i].show_element();
}
}
}
if(objectifActive==1){
recentrePlan(1);
recentrePlan(5);
recentrePlan(6);
recentrePlan(7);
recentrePlan(8);
recentrePlan(6);
recentrePlan(5);
recentrePlan(1);
}
}
setInterval('PaintPlan();',100);
function recentrePlan(i){
if(movePlanZoom==0){
if(planZoom<0.8){
planZoom=planZoom + 0.003;
}
}else{
if(planZoom<planObjZoom-0.035||planZoom>planObjZoom+0.035){
if(planZoom>planObjZoom){
planZoom=planZoom - 0.034;
}else{
if(planZoom<planObjZoom){
planZoom=planZoom + 0.035;
}
}
}
}
var dx=document.getElementById("mymap").offsetWidth/2;
var tx=dx + parseInt((objectifPlanorigineX * planZoom)*-1);
if(PlanorigineX>tx){
PlanorigineX=PlanorigineX - i;
}else{
if(PlanorigineX<tx-i){
PlanorigineX=PlanorigineX + i;
}
}
var dy=document.getElementById("mymap").offsetHeight/2;
var ty=dy + parseInt((objectifPlanorigineY * planZoom));
if(PlanorigineY>ty){
PlanorigineY=PlanorigineY - i;
}else{
if(PlanorigineY<ty-i){
PlanorigineY=PlanorigineY + i;
}
}
}
function openPlanXML(data){
if(data==''){
return false;
}
CPlans=new Array();
CPlan_count=0;
var nbcharge=0;
var xml_p;
if(typeof data == "string"){
xml_p=StringtoXMLPlan(data);
}else{
xml_p=data;
}
$(xml_p).find('infos').each(function(){
backgroundcolorplan=$(this).find('backgroundcolorH').text();
largXplan=parseInt($(this).find('largX').text());
document.getElementById("mymap").style.backgroundColor=backgroundcolorplan;
});
$(xml_p).find('plan').each(function(){
var tempBloc=new CPlan();
tempBloc.id=$(this).find('id').text();
tempBloc.x=$(this).find('x').text();
tempBloc.y=$(this).find('y').text();
tempBloc.w=$(this).find('w').text();
tempBloc.h=$(this).find('h').text();
tempBloc.data=$(this).find('data').text();
tempBloc.texte=$(this).find('texte').text();
tempBloc.script=$(this).find('script').text();
tempBloc.TypeGeo=parseInt($(this).find('TypeGeo').text());
CPlans_Add(tempBloc);
nbcharge++;
});
}
function StringtoXMLPlan(text){
if(window.ActiveXObject){
var doc=new ActiveXObject('Microsoft.XMLDOM');
doc.async='false';
doc.loadXML(text);
}else{
var parser=new DOMParser();
var doc=parser.parseFromString(text,'text/xml');
}
return doc;
}
var toolplan=0;
function initludiplan(){
if(document.getElementById("mymap")){
initplanZoom=1;
initObjZoom=1;
objectifActive=0;
createNomenclature();
planObjZoom=parseInt(document.getElementById("mymap").offsetWidth)/parseInt(largXplan);
var mymap=document.getElementById("mymap");
mymap.onmousedown=function(e){
calculCoordplan(e);
decxcoordplan=PlanorigineX - xcoordplan;
decycoordplan=PlanorigineY - ycoordplan;
toolplan=1;
initplanZoom=0;
objectifActive=0;
};
mymap.onmousemove=function(e){
calculCoordplan(e);
document.getElementById("mymap").focus();
if(toolplan==1){
moveOrigineplan();
PaintPlan();
mymap.style.cursor='move';
}
};
mymap.onmouseup=function(e){
toolplan=0;
mymap.style.cursor='default';
};
$('#mymap')
.bind('mousewheel', function(event, delta){
var dir=delta > 0 ? 'Up' : 'Down',
vel=Math.abs(delta);
if(dir=='Up'){
if(planZoom<1.25){
planZoom=planZoom + 0.05;
PaintPlan();
toolplan=0;
}
}else{
if(planZoom>0.25){
planZoom=planZoom - 0.05;
PaintPlan();
toolplan=0;
}
}
return false;
});
}
$(document).bind("dragstart", function(e){
if(e.target.nodeName.toUpperCase() == "IMG"){
return false;
}
});
}
function createNomenclature(){
var mymap=document.getElementById("mymap");
var haveTitleInPlan=false;
for(var i=0; i < CPlan_count; i++){
if(CPlans[i].TypeGeo==10){
haveTitleInPlan=true;
}
}
var h="<table class='nomenclature' style='z-index:10;' >";
h=h + '<tr onClick="placeToPlanReset();" >';
h=h + '<td class="lignenomenclaturereset" >&nbsp;Overview&nbsp;&nbsp;</td>';
h=h + '</tr>';
for(var i=0; i < CPlan_count; i++){
if(CPlans[i].TypeGeo==10){
var desc=CPlans[i].description;
if(desc==''){
desc='&nbsp;';
}
h=h + '<tr onClick="placeToPlan(' + CPlans[i].x + ',' + CPlans[i].y + ');" >';
h=h + '<td class="lignenomenclature" >&nbsp;' + CPlans[i].texte + '&nbsp;&nbsp;</td>';
h=h + '</tr>';
}
}
h=h + "</table>";
if(haveTitleInPlan){
$('#mymap').append(h);
}
}
function placeToPlan(x,y){
objectifPlanorigineX=x;
objectifPlanorigineY=y;
movePlanZoom=0;
objectifActive=1;
}
function placeToPlanReset(){
objectifPlanorigineX=0;
objectifPlanorigineY=0;
planObjZoom=parseInt(document.getElementById("mymap").offsetWidth)/parseInt(largXplan);
PaintPlan();
objectifActive=1;
movePlanZoom=1;
}
function moveOrigineplan(){
PlanorigineX=xcoordplan +  decxcoordplan;
PlanorigineY=	ycoordplan +  decycoordplan;
}
function calculCoordplan(e){
if( !e ){
if( window.event ){
e=window.event;
}else{
return;
}
}
if( typeof( e.pageX ) == 'number' ){
xcoordplan=e.pageX;
ycoordplan=e.pageY;
} else if( typeof( e.clientX ) == 'number' ){
xcoordplan=e.clientX;
ycoordplan=e.clientY;
var badOldBrowser=( window.navigator.userAgent.indexOf( 'Opera' ) + 1 ) ||
( window.ScriptEngine && ScriptEngine().indexOf( 'InScript' ) + 1 ) ||
( navigator.vendor == 'KDE' );
if( !badOldBrowser ){
if( document.body && ( document.body.scrollLeft || document.body.scrollTop ) ){
xcoordplan += document.body.scrollLeft;
ycoordplan += document.body.scrollTop;
} else if( document.documentElement && ( document.documentElement.scrollLeft || document.documentElement.scrollTop ) ){
xcoordplan += document.documentElement.scrollLeft;
ycoordplan += document.documentElement.scrollTop;
}
}
}else{
return;
}
}
function rotationObjet(i){
i=parseInt(i);
var sid=".bloc" + CObjets[i].id;
if(CObjets[i].an==17){
rotationObjetPlug(sid,CObjets[i].rotation);
CObjets[i].rotation=CObjets[i].rotation + 1;
if(CObjets[i].rotation==360){CObjets[i].rotation=0;}
var fctanim='rotationObjet(\'' + i + '\');';
setTimeout(fctanim, 100);
}
}
function rotationObjetPlug(sid,rot){
$(sid).rotate(rot);
}
function degreeToWEBMatrix(obj,deg){
var sid=".bloc" + obj.id;
var Tobj=$(sid);
Tobj.css({ WebkitTransform : 'rotate(' + deg + 'deg)'});
Tobj.css({ '-moz-transform': 'rotate(' + deg + 'deg)'});
Tobj.css({ '-ms-transform': 'rotate(' + deg + 'deg)'});
Tobj.css({ '-o-transform': 'rotate(' + deg + 'deg)'});
Tobj.css({ 'transform': 'rotate(' + deg + 'deg)'});
Tobj.css({ '-webkit-transform': 'rotate(' + deg + 'deg)'});
}
function degreeToIEMatrix(obj,deg){
var deg2radians=Math.PI * 2 / 360;
var rad=deg * deg2radians ;
var costheta=Math.cos(rad);
var sintheta=Math.sin(rad);
var M11=costheta;
var M12=-sintheta;
var M21=sintheta;
var M22=costheta;
var Dx;
var Dy;
var iecos;
var iesin;
var halfWidth;
var halfHeight;
var rad=deg*(Math.PI/180);
iecos=Math.cos(rad);
iesin=Math.sin(rad);
halfWidth=(obj.getW() * zoom)/2;
halfHeight=(obj.getH() * zoom)/2;
Dx=-halfWidth*iecos + halfHeight * iesin + halfWidth;
Dy=-halfWidth*iesin - halfHeight * iecos + halfHeight;
var infos="M11=" + M11 + ", M12=" + M12 + ", M21=" + M21 + ", M22=" + M22 + ", SizingMethod='auto expand' ";
var matr="progid:DXImageTransform.Microsoft.Matrix(" + infos + ")";
var sid=".bloc" + obj.id;
var Tobj=$(sid);
Tobj.css("-ms-filter",matr);
Tobj.css("filter",matr);
var ml=$(sid).width() - parseInt(obj.getW() * zoom);
ml=ml / 2;
var hl=$(sid).height() - parseInt(obj.getH() * zoom);
hl=hl / 2;
Tobj.css("margin-left",'-' + ml + 'px');
Tobj.css("margin-top",'-' + hl + 'px');
}
var SatisfationScore=0;
function getSatisVal(Cobj){
var istr=Cobj.idscript.replace('satisfaction-','');
var j=parseInt(istr);
return j;
}
function installshareresult(obj){
if(obj.type=='shareresult'){
var Ecran=document.getElementById("main");
var h='';
var act=' onClick="launchshareresult(' + obj.id + ');" ';
var srctemp=obj.contenu2;
var h='<img ';
h += ' id="bloc' + obj.id + '" class="unselectable bloc' + obj.id + '" ';
h += ' src="' + srctemp + '" ';
h += ' style="cursor:pointer;display:none;' + obj.cssadd + '" ';
h += act;
h += ' />';
if(!document.getElementById("shareresult")){
var mynote=0;
try
{
if(N_T!=0&&N_F!=0){
mynote=parseInt((N_F / N_T) * 20);
if(mynote<0){mynote=0;}
}
}
catch(err){mynote=0;}
h=h + '<div id="shareresult" class="mainshare" >';
h=h + '<div onClick="stopshareresult()" id="closelightbox" class="closelightbox" ></div>';
h=h + '<iframe id="tableshareresult" style="width:100%;height:99%;display:none;" frameborder=0 scrolling=no';
h=h + ' src="http://www./shareresult/ex.php?t=' + obj.contenu3 + '&n=' + krNb(mynote.toString()) + '&p=' + recupParmDom(obj) + '&m=' + obj.contenu4 + '&a=' + obj.contenu5 + '&u=' + obj.url + '" ></iframe>';
h=h + '</div>';
}
Ecran.innerHTML=Ecran.innerHTML + h;
}
}
function launchshareresult(i){
$('#shareresult').fadeIn();
$('#tableshareresult').fadeIn();
}
function stopshareresult(){
$('#shareresult').fadeOut();
}
function recupParmDom(obj){
var par="";
var libelles=obj.text.split('|');
for(var i=0; i<parseInt(obj.src); i++){
if(libelles[i]!=''){
par=par + libelles[i] + '|';
var pourc=0;
if(domainesN_F[i]!=0&&domainesN_T[i]!=0){
pourc=(domainesN_F[i] / domainesN_T[i]);
}
par=par + pourc + '@';
}
}
return par;
}
function krNb(source){
source=replaceAll(source,'0','b');
source=replaceAll(source,'1','c');
source=replaceAll(source,'2','d');
source=replaceAll(source,'3','e');
source=replaceAll(source,'4','f');
source=replaceAll(source,'5','g');
source=replaceAll(source,'6','h');
source=replaceAll(source,'7','i');
source=replaceAll(source,'8','j');
source=replaceAll(source,'9','k');
source=replaceAll(source,'.','l');
return source;
}
function replaceAll(Source,stringToFind,stringToReplace){
var temp=Source;
var index=temp.indexOf(stringToFind);
while(index != -1){
temp=temp.replace(stringToFind,stringToReplace);
index=temp.indexOf(stringToFind);
}
return temp;
}
var fullBilanResult='';
var partBilanResult='';
var BilanXML='';
var TitleBilanXML='';
function installbilanresult(obj){
if(obj.type=='bilanresult'){
globalCompteurDecompt=false;
recalculAllNoteByPersistence();
var Ecran=document.getElementById("main");
var h='';
var act=' onClick="launchBilanResult(' + obj.id + ');" ';
var srctemp=obj.contenu2;
var h='<img ';
h += ' id="bloc' + obj.id + '" class="unselectable bloc' + obj.id + '" ';
h += ' onMouseOver="upBilan(' +  obj.id + ');" ';
h += ' onMouseOut="doBilan(' +  obj.id + ');" ';
h += ' src="' + srctemp + '" ';
h += ' style="cursor:pointer;display:none;' + obj.cssadd + '" ';
h += act + ' />';
if(!document.getElementById("bilanresult")){
var mynote=0;
try
{
if(N_T!=0&&N_F!=0){
mynote=parseInt((N_F / N_T) * 20);
if(mynote<0){mynote=0;}
}
}catch(err){mynote=0;}
TitleBilanXML=obj.contenu3 ;
h += '<div id="bilanresult" class="mainbilan" >';
h += '<div onClick="stopBilanResult()" id="closelightbox" class="closelightbox" ></div>';
h += '<div id="toptitleH" class="toptitle" >' + obj.contenu3 + '</div>';
h += '<img class="printBilan" onClick="PrintElem(\'containBilanH\');" src="fx/printbtn.png" />';
h += '<div id="containBilanH" class="containBilan" >' + replaceIdStockQ(fullBilanResult,false) + '</div>';
h += '</div>';
}
Ecran.innerHTML=Ecran.innerHTML + h;
if('function' == typeof(SetXapiEnd)){
SetXapiEnd(mynote);
}
if(scriptdiapo!=''&&scriptdiapo.indexOf('MathJax.Hub')!=-1){
eval(scriptdiapo);
}
if(h!=''){
if(obj.contenu4=='1'||obj.contenu4==1){
var fct="sendBilanMail(" + mynote + ",'" + obj.field1 + "','" + obj.contenu7 + "'," + obj.contenu8 + "," + obj.option7+ ")";
setTimeout(fct, 3000);
}
if(obj.contenu5!=''){
sendBilanXML(obj.contenu5);
}
}
}
if(obj.type=='redirectionParcours'){
var h='';
h=h + '<table style="display:none;margin:0;padding:0;" ';
h=h + ' id="table' + obj.id + '" class="bloc' + obj.id + '" >';
h=h + '<tr style="margin:0;padding:0;" >';
h=h + '<td style="margin:0;padding:0;text-align:center;" >';
h=h + '<img src="images/redirect.gif" />';
h=h + '</td></tr></table>';
$("#main").append(h);
setTimeout(obj.contenu2,2500);
}
}
function replaceIdStockQ(fbre,cn){
var i;
for(i=0; i < StockRepQ.length; ++i){
var cv=StockRepQ[i].v;
if(cn){cv=cleanName(cv)}
fbre=fbre.replace(StockRepQ[i].k,StockRepQ[i].v);
}
return fbre;
}
function findTxtStockQ(idk){
var i;
var fbre="";
for(i=0; i < StockRepQ.length; ++i){
if(StockRepQ[i].k==idk){
fbre=StockRepQ[i].v;
return StockRepQ[i].v;
}
}
return fbre;
}
function upBilan(i){
var wb=parseInt(CObjets[i].getW() * zoom);
var hb=parseInt(CObjets[i].getH() * zoom);
var wb_max=parseInt(wb * 1.1);
var hb_max=parseInt(hb * 1.1);
var dec_x=parseInt((wb_max - wb) / 2 );
var dec_y=parseInt((hb_max - hb) / 2 );
$('.bloc' + i).stop().animate({width :wb_max + 'px',height :hb_max + 'px',marginLeft :  '-' + dec_x + 'px',marginTop :  '-' + dec_y + 'px' } , 300);
}
function doBilan(i){
var wb=parseInt(CObjets[i].getW() * zoom);
var hb=parseInt(CObjets[i].getH() * zoom);
$('.bloc' + i).stop().animate({width : wb + 'px',height : hb + 'px',marginLeft : '0px',marginTop : '0px' } , 300);
}
function sendBilanLogs(title,mkript){
if(haveRightProcessPhp()){
var urlBase=parseTxt(window.top.location.origin);
var msend=title + "--" + urlBase + "--" + interactLogs;
crossDomainPostLudiGet(mkript,msend);
}
}
function sendBilanXML(url){
var finalXML='<?xml version="1.0" ?><result>' + getInfosSuppBilan() + BilanXML + '</result>';
$.ajax({
type: "POST",
url: url,
data:{ result: netH(finalXML)},
success: function(data){
logBilan('sendBilanXML OK');
},
error: function(){
writeInConsole("Impossible d'envoyer le bilan !");
}
});
}
function getInfosSuppBilan(){
var mynote=0;
try
{
if(N_T!=0&&N_F!=0){
mynote=parseInt((N_F / N_T) * 20);
if(this.option==1){
mynote= parseInt(N_F);
}
if(mynote<0){mynote=0;}
}
}
catch(err)
{
mynote=0;
}
var pourcScore=parseInt(parseInt(mynote) * 5);
var addXML='<score>' + pourcScore + '</score>';
addXML=addXML + '<satisfaction>' + SatisfationScore + '</satisfaction>';
addXML=addXML + '<time>' + MillisecondsToTime((new Date()).getTime() - ScormStartTime) + '</time>';
addXML=addXML + '<date>' + helperDateActu() + '</date>';
addXML=addXML + '<hour>' + helperHourActu() + '</hour>';
return addXML;
}
function getInfosSuppBilanWrite(){
var mynote=0;
try
{
if(N_T!=0&&N_F!=0){
mynote=parseInt((N_F / N_T) * 20);
if(this.option==1){
mynote= parseInt(N_F);
}
if(mynote<0){mynote=0;}
}
}
catch(err)
{
mynote=0;
}
var pourcScore=parseInt(parseInt(mynote) * 5);
var addXML='Score : ' + pourcScore + '%<br>';
addXML=addXML + 'Satisfaction : ' + SatisfationScore + '<br>';
addXML=addXML + 'Time : ' + MillisecondsToTime((new Date()).getTime() - ScormStartTime)+ '<br>';
return addXML;
}
function getInfosSuppBilanLearnerName(){
if('function' == typeof(CheckLMSLearnerName)){
var vln=CheckLMSLearnerName();
if(vln!=''){
learnerName=vln;
}
}
var rt='<h2>' + learnerName + '</h2>';
return rt;
}
function sendBilanXMLProcess(){
if(haveRightProcessPhp()){
var finalXML='<?xml version="1.0" ?>';
finalXML=finalXML + '<result>';
finalXML=finalXML + getInfosSuppBilan() + BilanXML + '</result>';
var prepXML=netH(finalXML);
var urlStat='process-stats';
$.ajax({
type: "POST",
url: 'data/' + urlStat + '.php',
data:{ result: prepXML},
success: function(data){
logBilan('sendBilanXMLProcess OK');
},
error: function(){}
});
}
}
function launchBilanResult(i){
$('#bilanresult').fadeIn();
}
function stopBilanResult(){
$('#bilanresult').fadeOut();
}
function recupParmDomBilan(obj){
var par="";
var libelles=obj.text.split('|');
for(var i=0; i<parseInt(obj.src); i++){
if(libelles[i]!=''){
par=par + libelles[i] + '|';
var pourc=0;
if(domainesN_F[i]!=0&&domainesN_T[i]!=0){
pourc=(domainesN_F[i] / domainesN_T[i]);
}
par=par + pourc + '@';
}
}
return par;
}
function PrintElem(elem){
var rH='<h2 style="font-size:18px;" >' + $('#toptitleH').html() + '</h2>';
rH=rH + $('#' + elem).html();
var cla= 'class="blockbilan"';
var sty='style="float:left;width:45%;padding:1%;margin:1%;font-size:15px;border:solid 1px gray;height:200px;" ';
rH=ReplaceAll(rH,cla,sty);
cla= 'class=blockbilan';
rH=ReplaceAll(rH,cla,sty);
PopupElem(rH);
}
function PopupElem(data){
var uagent=navigator.userAgent.toUpperCase();
var mywindow;
if(uagent.indexOf("MSIE") != -1){
mywindow=window.open("", 'Print');
}else{
if(uagent.indexOf("CHROME") != -1){
mywindow=window.open("",'Print Rpt','height=600,width=700');
}else{
mywindow=window.open("",'Print', 'height=400,width=600');
}
}
mywindow.document.write('<html><head><title>' + TitleBilanXML + '</title>');
mywindow.document.write('</head><body onload="self.print();" >');
mywindow.document.write('</body></html>');
mywindow.document.write(data);
mywindow.document.write('</body></html>');
mywindow.document.close();
if(uagent.indexOf("MSIE") != -1){
mywindow.print();
window.setTimeout(function(){mywindow.close()}, 3000);
}else{
mywindow.print();
mywindow.close();
}
return true;
}
function logBilan(msg){
if(typeof console === "undefined" || typeof console.log === "undefined"){
}else{
console.log(msg)
}
}
var FullEmail='';
var urlDistanteConnexion='';
function installconnexion(obj){
if(obj.type=='connexion'){
var h='';
var act=' onClick="launchBilanResult(' + obj.id + ');" ';
var srctemp=obj.contenu2;
var classtemp="";
if(obj.boite=='flat'){classtemp=" mat-shadows-a";}
var h='<div ';
h += ' id="bloc' + obj.id + '" class="unselectable bloc' + obj.id + classtemp + '" ';
h += ' style="';
if(obj.boite==''){h += 'background:#014051;';}
if(obj.boite=='flat'){
h += 'background:white;border:solid 1px gray;';
}
h += 'cursor:pointer;display:none;' + obj.cssadd + '" ';
h += ' >';
if(obj.boite==''){
h += '<img class="loadconn" src="images/loadconnexion.gif" ';
h += ' style="position:absolute;left:50%;top:50%;margin-left:-45px;margin-top:-45px;" />';
}else{
h += '<img class="loadconn" src="images/loadconnexion2.gif" ';
h += ' style="position:absolute;left:50%;top:50%;margin-left:-8px;margin-top:-8px;" />';
}
h += '<table class="idenconn" ';
if(obj.boite==''){
h += 'style="position:absolute;padding:1%;width:98%;height:75%;top:9%;display:none;" ';
}
if(obj.boite=='flat'){
h += 'style="background:white;position:absolute;padding:1%;padding-left:2%;width:97%;height:75%;display:none;" ';
}
h += ' >';
h += '<tr>';
if(obj.boite==''){
h += '<td style="text-align:center;width:36%;" >';
h += '<img src="images/connexionuser.png" />';
}else{
h += '<td style="text-align:center;width:1%;" >';
}
h += '</td>';
h += '<td>';
var labelClass="labelconn";
if(obj.boite=='flat'){labelClass="labelconnblack";}
if(obj.boite=='flat'){
h += '<p id="labelconn0" class="labelconntitle" >Connexion</p>';
h += '<hr/>';
}
if(parseInt(obj.contenu3)==0){
h += '<p id="labelconn1" class="' + labelClass + '" >Votre prénom</p>';
h += '<input id="conn1" type="text" class="inputconn" />';
h += '<p id="labelconn2" class="' + labelClass + '" >Votre email</p>';
h += '<input id="conn2" type="text" class="inputconn" />';
}
if(parseInt(obj.contenu3)==1||parseInt(obj.contenu3)==2){
h += '<p id="labelconn1" class="' + labelClass + '" >Login</p>';
h += '<input id="conn1" type="text" class="inputconn" />';
h += '<p id="labelconn2" class="' + labelClass + '" >Password</p>';
h += '<input id="conn2" type="password" class="inputconn" />';
}
h += '</td>';
h += '</tr>';
h += '<tr>';
h += '<td></td>';
h += '<td style="text-align:right;margin-right:2%;" >';
if(parseInt(obj.contenu3)==0){
h += '<a onClick="launchConnexionBase(' + obj.data + ',\'' + obj.boite + '\');" style="text-decoration:none;" >';
h += '<img src="images/connexionbouton' + obj.boite + '.png"  />';
h += '</a>';
}
if(parseInt(obj.contenu3)==1){
urlDistanteConnexion='data/' + obj.contenu2;
h += '<a onClick="controlConnexionBase(' + obj.data + ',\'' + obj.boite + '\');" style="text-decoration:none;" >';
h += '<img src="images/connexionbouton' + obj.boite + '.png"  />';
h += '</a>';
}
if(parseInt(obj.contenu3)==2){
urlDistanteConnexion=obj.text;
h += '<a onClick="controlConnexionBase(' + obj.data + ',\'' + obj.boite + '\');" style="text-decoration:none;" >';
h += '<img src="images/connexionbouton' + obj.boite + '.png"  />';
h += '</a>';
}
h += '</td>';
h += '</tr>';
h += '</table>';
h += '</div>';
$('#main').append(h);
$(".loadconn").animate({
opacity: 0
}, 2000, function(){
$(".loadconn").fadeOut();
$(".idenconn").fadeIn();
});
}
}
function launchConnexionBase(idpage,boite){
var col1="pink";
var col2="white";
if(boite=='flat'){
var col1="#e64c65";
var col2="black";
}
var conn1=document.getElementById("conn1").value;
var conn2=document.getElementById("conn2").value;
if(conn1==''){
$("#labelconn1").css("color",col1);
}else{
$("#labelconn1").css("color",col2);
}
if(isEmailCtr(conn2)==false){
conn2='';
}
if(conn2==''){
$("#labelconn2").css("color",col1);
}else{
$("#labelconn1").css("color",col2);
}
if(conn1!=''&&conn2!=''){
$(".loadconn").fadeIn();
$(".idenconn").fadeOut();
Variable1=conn1;
FullEmail=conn2;
learnerName=conn1 + ' ' + conn2;
$(".loadconn").animate({
opacity: 50
}, 1500, function(){
var ur="data/page" + idpage + ".xml";
loaddata(ur,'');
});
}
}
function controlConnexionBase(idpage){
var conn1=document.getElementById("conn1").value;
var conn2=document.getElementById("conn2").value;
if(conn1==''){
$("#labelconn1").css("color","pink");
return false;
}else{
$("#labelconn1").css("color","white");
}
if(conn2==''){
$("#labelconn1").css("color","pink");
return false;
}else{
$("#labelconn1").css("color","white");
}
$.ajax({
type:"GET",
url: urlDistanteConnexion,
dataType: (isMsie()) ? "text":"xml",
cache:false,
success:function(data){
$(".idenconn").css("display","none");
$(".loadconn").css("display","");
var ok=0;
var xml_p;
if(typeof data == "string"){
xml_p=StringtoXML(data);
}else{
xml_p=data;
}
$(xml_p).find('Member').each(function(){
var log=$(this).find('Login').text();
var pass=$(this).find('Pass').text();
if(conn1==log){
if(conn2==pass){
ok=1;
Variable1=conn1;
FullEmail=conn1;
learnerName=conn1;
}
}
});
if(ok==0){
$(".loadconn").animate({
opacity: 50
}, 1000, function(){
$(".loadconn").fadeOut();
$(".idenconn").fadeIn();
});
}else{
$(".loadconn").animate({
opacity: 50
}, 1500, function(){
var ur="data/page" + idpage + ".xml";
loaddata(ur,'');
});
}
},error: function(){
$(".loadconn").fadeOut();
$(".idenconn").fadeIn();
alert("error source !");
}
});
}
function isEmailCtr(myVar){
var regEmail=new RegExp('^[0-9a-z._-]+@{1}[0-9a-z.-]{2,}[.]{1}[a-z]{2,5}$','i');
return regEmail.test(myVar);
}
var globalPlayAudio=0;
var ludiHaveVideo=false;
function installVideo(obj){
var Ecran=document.getElementById("main");
var h='';
if(obj.type=='videopreload'){
if(recupCss3()){
var req=new XMLHttpRequest();
req.open('GET',obj.data,true);
req.responseType='blob';
req.onload=function(){
if(this.status===200){
var videoBlob=this.response;
var vid=URL.createObjectURL(videoBlob);
}
}
req.onerror=function(){}
req.send();
}
}
if(obj.type=='videohtml'){
h += '<div style="display:none;position:absolute;overflow:hidden;" ';
h += ' class="bloc' + obj.id + '" unselectable="on" >';
var widthvideo=parseInt(obj.getW() * zoom);
var heightvideo=parseInt(obj.getH() * zoom);
if(parseInt(obj.border)!=0){
var b= parseInt(parseInt(parseInt(parseInt(obj.border) * -1) * 2) * zoom);
widthvideo =widthvideo  + b;
heightvideo=heightvideo + b;
}
var ident=LUDI.guid();
if(obj.idscript!=''){
ident=obj.idscript;
}
h += '<video oncontextmenu="return false;" id="video' + obj.id + '" ';
if(isMozilla()){
}
if(obj.option=='1'||obj.option==1){
h += ' autoplay ';
if(haveNoAutoplay()){
h += ' muted ';
obj.option2=1;
}
}
if(obj.option2=='1'||obj.option2==1||isVideoHtml5Control()){
h += ' controls controlsList="nodownload" ';
}
h += ' width="' + widthvideo + '" height="' + heightvideo + '" ';
if(typeof obj.contenu5 === 'undefined'){
obj.contenu5='';
}
if(obj.contenu5!=''){
h += ' poster="' + obj.contenu5 + '" ';
}
h += ' playsinline ';
var sty='';
if(obj.cssadd){
sty=obj.cssadd;
}
if(parseInt(obj.border)!=0){
var b= parseInt(obj.border ) * zoom;
sty += "margin-left:" + b + "px;";
sty += "margin-top :" + b + "px;";
}
h += ' style="' + sty + '" ';
h += ' >';
var completePath='';
try{
if(navigator.userAgent.toUpperCase().indexOf("TRIDENT/5.0") != -1){
var path=window.location.pathname;
path=path.replace("/C:/","C:/");
completePath=path.substr(0,path.lastIndexOf("/")+1);
}
}catch(err){
completePath="";
}
if(obj.text!=''){
h=h + '<source id="srcvid' + ident +'" src="' + completePath + obj.text + '" type="video/mp4" />';
}
if(obj.contenu2!=''){
h=h + '<source src="' +  completePath + obj.contenu2 + '" type="video/ogg" />';
}
h=h + '</video> ';
h=h + '</div>';
if(noAudionoVideoSupport()){
h='<div style="display:none;position:absolute;background:black;color:white;" ';
h=h + ' class="bloc' + obj.id + '" >';
h=h + '<p style="font-size:18px;" >';
h=h + '<a target="_blank" href="' + obj.text + '" style="text-decoration:none;color:white;" >'
h=h + 'Télécharger et voir la vidéo</a></p>';
h=h + '</div>';
}
$("#main").append(h);
}
if(obj.type=='videodistante'){
h += '<div style="display:none;position:absolute;background:black;overflow: hidden;" ';
h += ' class="bloc' + obj.id + '" unselectable="on" >';
var widthvideo=parseInt(obj.getW() * zoom) + 4;
var heightvideo=parseInt(obj.getH() * zoom) + 4;
var datavideo=obj.data;
datavideo=datavideo.replace('videow', widthvideo + 'px');
datavideo=datavideo.replace('videoh', heightvideo + 'px');
datavideo=datavideo.replace('genframeludiscape','videodistante' + obj.id);
h += datavideo;
h += '</div>';
$("#main").append(h);
}
if(obj.type=='ludiplayerhtml'){
installVideoLudiPlayer(obj);
}
}
function installVideoLudiPlayer(obj){
var h='';
var leftvideo=parseInt(obj.getX() * zoom);
var topvideo=parseInt(obj.getY() * zoom);
var widthvideo=parseInt(obj.getW() * zoom);
var heightvideo=parseInt(obj.getH() * zoom);
if(parseInt(obj.border)!=0){
var b= parseInt(parseInt(parseInt(parseInt(obj.border) * -1) * 2) * zoom);
widthvideo =widthvideo  + b;
heightvideo=heightvideo + b;
}
h += '<div class="videoContainer bloc' + obj.id + '" style="left:' + leftvideo + 'px;top:' + topvideo + 'px;" >';
var ident=LUDI.guid();
if(obj.idscript!=''){
ident=obj.idscript;
}
h += '<video id="video' + ident +'" class="video-ludivideo video-ludivideo' + obj.id + '" controls preload="auto" ';
if(parseInt(obj.option)==1){
h += ' muted ';
}
if(obj.contenu5==''){
h += ' poster="data/poster-ludivideo.jpg" ';
}else{
h += ' poster="' + obj.contenu5 + '" ';
}
var sty='';
if(obj.cssadd){
sty=obj.cssadd;
}
if(parseInt(obj.border)!=0){
var b= parseInt(obj.border ) * zoom;
sty=sty + "margin-left:" + b + "px;";
sty=sty + "margin-top :" + b + "px;";
}
h += ' style="' + sty + '" ';
h += ' width="' + widthvideo + '" height="' + heightvideo + '" >';
h += '<source id="srcvid' + ident +'" src="' + obj.text + '" type="video/mp4" />';
h += '<p>Your browser does not support the video tag.</p>';
h += '</video>';
if(isIOS()){
obj.option2='0';
}
if(parseInt(obj.option)==1){
h += '<span id="AutoPlayLudiVideo' + obj.id + '" class="AutoPlayLudiVideo' + obj.id + '" style="display:none;" ></span>';
h += '<span id="AutoPlayLudiVideo" style="display:none;" ></span>';
}
if(obj.option2=='1'||obj.option2==1){
h += '<div class="control control' + obj.id + '">';
h += '<div class="topControl topControl' + obj.id + '"><div class="progress progress' + obj.id + '">';
h += '<span class="bufferBar bufferBar' + obj.id + '"></span>';
h += '<span class="timeBar timeBar' + obj.id + '"></span>';
h += '</div></div>';
h += '<div class="btmControl btmControl' + obj.id + '">';
h += '<div class="btnPlay btnPlay' + obj.id + ' btn" title="Play/Pause video"></div>';
h += '<div class="btnStop btnStop' + obj.id + ' btn" title="Stop video"></div>';
h += '<div class="time time' + obj.id + '">';
h += '<span class="current current' + obj.id + '"></span> / ';
h += '<span class="duration duration' + obj.id + '"></span> ';
h += '</div>';
if(obj.contenu4=='0'||obj.contenu4==0){
h += '<div class="btnFS btnFS' + obj.id + ' btn" title="Switch to full screen"></div>';
}
h += '<div class="volume volume' + obj.id + '" title="Set volume">';
h += '<span class="volumeBar volumeBar' + obj.id + '" ></span>';
h += '</div>';
h += '<div class="sound sound2 soundbtn' + obj.id + ' btn" title="Mute/Unmute sound"></div>';
h += '</div>';
h += '</div>';
}
if(obj.option3=='1'||obj.option3==1){
ludiHaveVideo=true;
h += '<span id="NextPageLudiVideo' + obj.id + '" style="display:none;" ></span>';
}
if(obj.contenu3=='1'||obj.contenu3==1){
h += '<span id="LoopLudiVideo' + obj.id + '" style="display:none;" ></span>';
}
if(obj.contenu8!=''){
h += '<span id="NextFctLudiVideo' + obj.id + '" style="display:none;" >' + obj.contenu8 + '</span>';
}
h += '<div class="loading' + obj.id + '" ></div>';
h += '</div>';
if(noAudionoVideoSupport()){
h='<div style="display:none;position:absolute;background:black;color:white;" ';
h += ' class="bloc' + obj.id + '" >';
h += '<p style="font-size:18px;" >';
h += '<a target="_blank" href="' + obj.text + '" style="text-decoration:none;color:white;" >'
h += 'Télécharger et voir la vidéo</a></p>';
h += '</div>';
}
if('function'==typeof(loadAllLudiVideo)){
$("#main").append(h);
try{
$('.video-ludivideo'+ obj.id)[0].removeAttribute("controls");
}catch(err){}
setTimeout("loadAllLudiVideo(" + obj.id + ")",1000);
}
}
function noAudionoVideoSupport(){
var extraOldNavigator=false;
if(navigator.userAgent.toUpperCase().indexOf("TRIDENT/4.0") != -1){//IE8
extraOldNavigator=true;
}
if(navigator.userAgent.toUpperCase().indexOf("TRIDENT/3.0") != -1){//IE7
extraOldNavigator=true;
}
if(navigator.userAgent.toUpperCase().indexOf("MSIE 6.0") != -1){//IE6
extraOldNavigator=true;
}
return extraOldNavigator;
}
function loadeddataAudio(audio){
writeInConsole(audio.src + ' load');
audio.pause();
}
function installAudio(obj){
if(obj.type=='audiopreload'){
if(recupCss3()){
var audio=new Audio();
audio.id=LUDI.guid();
audio.src=obj.data;
audio.preload="auto";
audio.volume=0.001;
$(audio).on("loadeddata", loadeddataAudio(audio));
}
}
if(obj.type=='audiohtml'||obj.type=='audiomultihtml'){
var Ecran=document.getElementById("main");
var h='';
h=h + '<div style="display:none;position:absolute;border:solid 1px black;background-color:#333;" ';
h=h + ' id="audio' + obj.id + '" ';
h=h + ' class="bloc' + obj.id + '" unselectable="on" >';
if(obj.type=='audiohtml'){
h=h + '<audio class="audioplayer bloc' + obj.id + '" src="' + obj.text + '" preload="auto" />';
}
if(obj.type=='audiomultihtml'){
h=h + '<audio class="audioplayer bloc' + obj.id + '" src="' + obj.data + '" preload="auto" />';
}
h=h + '</div>';
if(noAudionoVideoSupport()){
h='<div style="display:none;position:absolute;background:black;color:white;" ';
h=h + ' class="bloc' + obj.id + '" >';
h=h + '<p style="font-size:18px;" >';
h=h + '<a target="_blank" href="' + obj.text + '" style="text-decoration:none;color:white;" >'
h=h + 'Télécharger et écouter la musique</a></p>';
h=h + '</div>';
}
if(obj.type=='audiomultihtml'){
h=h + '<ol class="bloclist' + obj.id + '" ';
h=h + 'style="margin-top:0px;position:absolute;background:white;color:black;border:solid 1px black;list-style: decimal-leading-zero inside;"  >';
var myString="";
if(obj.text){myString=obj.text;}
var myTitle="";
if(obj.contenu2){myTitle=obj.contenu2;}
var myImages="";
if(obj.contenu3){myImages=obj.contenu3;}
var sty="style=\"position:relative;margin: 0px;padding: 9px 5px 10px;border-bottom: 1px solid #ccc;cursor: pointer;\"";
var eachElement=myString.split(';');
var eachTitle=myTitle.split(';');
var eachImages=myImages.split(';');
for(var e=0 ; e < eachElement.length; e++){
var reponse=eachElement[e];
if(reponse!=''){
var reponseTitle=eachTitle[e];
var reponseImage=eachImages[e];
h=h + '<li ' + sty + ' onclick="loadFileAudioPlay(this,' + obj.id + ');" >';
h=h + '<a href="#" ';
h=h + ' data-id="' + obj.contenu5 + '" ';
h=h + ' data-img="data/' + reponseImage + '" ';
h=h + ' data-src="data/' + reponse + '" >';
h=h + reponseTitle + '</a><span></span>';
h=h + '</li>';
}
}
h=h + '</ol>';
}
if(globalSound==1){
Ecran.innerHTML=Ecran.innerHTML + h;
}
if(globalPlayAudio==0&&globalSound==1){
globalPlayAudio=1;
if(obj.type=='audiomultihtml'){
setTimeout("initAudiocreateMulti()",1000);
}
if(obj.type=='audiohtml'){
if(obj.option=='1'||obj.option==1){
var delai=500;
if(lastPage0==0){
delai=2000;
}
setTimeout("initAudiocreateAllAuto()",delai);
}else{
setTimeout("initAudiocreateAll()",1000);
}
}
}
}
if(obj.type=='audiocircle'){
var h='';
h += '<div onclick="audiocCircleP(' + obj.id + ')" id="roundboutongray' + obj.id + '" ';
h += 'class="roundboutongray alterbloc' + obj.id + '" >';
h += '<a id="roundboutongrayinner' + obj.id + '" ';
if(obj.getW()<80){
h += 'class="roundboutonbef5" >';
}else{
h += 'class="roundboutonbef10" >';
}
h += '<div id="roundboutongrayicon' + obj.id + '" class="roundboutonaudio roundboutongrayicon ' + obj.idscript  + '" ></div>';
h += '</a></div>';
addToM(h);
if(obj.idscript.indexOf("noicon")==-1){
$("#roundboutongrayicon" + obj.id).css('background-image',' url(css/icons/play.png)');
}
if(globalSound==1){
if(obj.option=='1'||obj.option==1){
var delai=500;
if(lastPage0==0){
delai=1500;
}
setTimeout("audiocCircleP(" + obj.id + ")",delai);
}
}
}
}
var audioElementCircle;
function audiocCircleP(id){
var objCircle=$("#roundboutongrayicon" + id);
var sndid="audioElementCircle";
var back=objCircle.css('background-image');
if(back.indexOf('playstop')==-1){
var obj=CObjets[id];
if(document.getElementById(sndid)){
try{
audioElementCircle=document.getElementById(sndid);
}catch(err){}
if(audioElementCircle.pause){
audioElementCircle.pause();
}
source=document.getElementById('srcaudio');
source.setAttribute('src',obj.text);
if(audioElementCircle.load){
audioElementCircle.load();
}
if(audioElementCircle.play){
playAudP(audioElementCircle);
}
}else{
audioElementCircle=document.createElement('audio');
audioElementCircle.setAttribute("id", sndid);
document.getElementById('main').appendChild(audioElementCircle);
var source=document.createElement('source');
source.src=obj.text;
source.type='video/mp4';
source.id='srcaudio';
audioElementCircle.appendChild(source);
if(audioElementCircle.play){
playAudP(audioElementCircle);
}
}
$(".roundboutonaudio").css('background-image',' url(css/icons/play.png)');
objCircle.css('background-image',' url(css/icons/playstop.png)');
}else{
try{
audioElementCircle=document.getElementById(sndid);
}catch(err){}
if(audioElementCircle.autoplay){
audioElementCircle.autoplay=false;
}
if(audioElementCircle.pause){
audioElementCircle.pause();
}
try{
audioElementCircle.pause();
audioElementCircle.currentTime=0;
}catch(err){}
try{
audioElementCircle.loop=false;
}catch(err){}
if(audioElementCircle.autoplay){
audioElementCircle.autoplay=false;
}
if(audioElementCircle.pause){
audioElementCircle.pause();
}
objCircle.css('background-image',' url(css/icons/play.png)');
}
}
var globalAudioMulti;
function initAudiocreateMulti(){
try{
var a=audiojs.createAll({
trackEnded: function(){
var next=$('ol li.playing').next();
if(!next.length){
next=$('ol li').first();
next.addClass('playing').siblings().removeClass('playing');
audio.load($('a', next).attr('data-src'));
var imgDataId3=$('a', next).attr('data-id');
var imgData3=$('a', next).attr('data-img');
if(imgDataId3!=''){
$('.' + imgDataId3).attr("src",imgData3);
}
}else{
next.addClass('playing').siblings().removeClass('playing');
audio.load($('a', next).attr('data-src'));
audio.play();
var imgDataId3=$('a', next).attr('data-id');
var imgData3=$('a', next).attr('data-img');
if(imgDataId3!=''){
$('.' + imgDataId3).attr("src",imgData3);
}
}
}
});
globalAudioMulti=a[0];
first=$('ol a').attr('data-src');
$('ol li').first().addClass('playing');
globalAudioMulti.load(first);
var imgData=$('ol a').attr('data-img');
var imgDataId=$('ol a').attr('data-id');
if(imgData!=''){
$('.' + imgDataId).attr("src",imgData);
}
}catch(e){}
}
function loadFileAudioPlay(ob,id){
$(ob).addClass('playing').siblings().removeClass('playing');
var src=$('a', ob).attr('data-src');
globalAudioMulti.load(src);
globalAudioMulti.play();
var imgDataId2=$('a', ob).attr('data-id');
var imgData2=$('a', ob).attr('data-img');
if(imgDataId2!=''){
$('.' + imgDataId2).attr("src",imgData2);
}
}
function initAudiocreateAll(){
try{
audiojs.events.ready(function(){
var as=audiojs.createAll();
});
}catch(e){}
$('body > .audiojs').css('display','none');
}
function initAudiocreateAllAuto(){
try{
audiojs.events.ready(function(){
var as=audiojs.createAll();
if(typeof as[0] !== 'undefined'){
as[0].play();
}
});
}catch(e){}
$('body > .audiojs').css('display','none');
}
function zoomAudio(obj){
if(obj.type=='audiomultihtml'){
var xb=parseInt(obj.getX() * zoom);
var yb=parseInt(obj.getY() * zoom);
var wb=parseInt(obj.getW() * zoom);
var hb=parseInt(obj.getH() * zoom);
$('.bloclist' + obj.id).css("left",xb + 'px').css("top",parseInt(yb + hb) + 'px').css("width",wb + 'px');
}
if(obj.type=='ludiplayerhtml'){
var widthvideo=parseInt(obj.getW() * zoom);
var heightvideo=parseInt(obj.getH() * zoom);
if(parseInt(obj.border)!=0){
var b= parseInt(parseInt(parseInt(parseInt(obj.border) * -1) * 2) * zoom);
widthvideo =widthvideo  + b;
heightvideo=heightvideo + b;
}
$('.video-ludivideo' + obj.id).css("width",widthvideo + 'px').css("height",heightvideo + 'px');
}
if(obj.type=='videohtml'){
var widthvideo=parseInt(obj.getW() * zoom);
var heightvideo=parseInt(obj.getH() * zoom);
if(parseInt(obj.border)!=0){
var b= parseInt(parseInt(parseInt(parseInt(obj.border) * -1) * 2) * zoom);
widthvideo =widthvideo  + b;
heightvideo=heightvideo + b;
}
$('#video' + obj.id).css("width",widthvideo + 'px').css("height",heightvideo + 'px');
var xb=parseInt(obj.getX() * zoom);
var yb=parseInt(obj.getY() * zoom);
var wb=parseInt(obj.getW() * zoom);
var hb=parseInt(obj.getH() * zoom);
$('.bloc' + obj.id).css("left",xb + 'px').css("top",parseInt(yb) + 'px');
$('.bloc' + obj.id).css("width",wb + 'px').css("height",parseInt(hb) + 'px');
}
}
var textdomrapportw="";
var nbdomrapportw=1;
var textSendRapportW="";
var SendRapportBool=0;
var RapportWmkript="";
function installReportWrite(obj){
if(obj.type=='reportw'){
globalCompteurDecompt=false;
recalculAllNoteByPersistence();
var color="black";
if(obj.color){
color=obj.color;
}
var cssPlus="";
if(obj.css){
cssPlus=obj.css;
}
var Ecran=document.getElementById("main");
var h='';
h += '<table style="color:' + color + ';" ';
h += ' id="table' + obj.id + '" unselectable="on" ';
h += ' class="haveflou unselectable bloc' + obj.id + ' ' +  obj.idscript + '" ';
h += ' >';
h += '<tr>';
h += '<td id="innerbloc' + obj.id + '" style="text-align:left;vertical-align:top;' + obj.cssadd + cssPlus + '" class="unselectable ' +  obj.idscript + 'inner" unselectable="on" >';
h += "<div class='reportw' id='tablescrool" + obj.id + "' style='width:100%;height:200px;overflow:auto;' >";
h += "</div>"
h += '</td></tr></table>';
textdomrapportw=obj.text;
nbdomrapportw=obj.src;
SendRapportBool=0;
Ecran.innerHTML=Ecran.innerHTML + h;
if(obj.field1!=''){
loadReportWrite(obj.data,"tablescrool" + obj.id,obj.field1,parseInt(obj.option7));
}else{
loadReportWrite(obj.data,"tablescrool" + obj.id,'',0);
}
}
}
function loadReportWrite(data,id,mkript,srelai){
var d=new Date();
var n=d.getMinutes();
$.ajax({
type: "GET",
url: 'data/' + data + '?t=' + n,
dataType: (isMsie()) ? "text" : "xml",
cache:true,
async:false,
success: function(code){
openReportWriteXML(code,id);
if(mkript!=''){
RapportWmkript=mkript;
setTimeout(function(){sendRapportWMail(RapportWmkript,srelai)}, 1000);
}
}
,
error: function(){
}
});
}
function openReportWriteXML(data,id){
var n=0;
try{
if(N_T!=0&&N_F!=0){
n=parseInt((N_F / N_T) * 20);
if(n<0){n=0;}
}
}
catch(err)
{
n=0;
}
if('function' == typeof(SetXapiEnd)){
SetXapiEnd(n);
}
var domP=new Array();
for(var j=0;j<20;j++){
domP[j]=0;
}
for(var i=0; i<20; i++){
if(domainesN_F[i]!=0&&domainesN_T[i]!=0){
domP[i]=parseInt((domainesN_F[i] / domainesN_T[i])*100);
}
}
if(data==''){
return false;
}
var xml_p;
if(typeof data == "string"){
xml_p=StringtoXML(data);
}else{
xml_p=data;
}
var titleh2=getInfosSuppBilanLearnerName();
var hfull='';
$(xml_p).find('rapport').each(function(){
var ctrscript=$(this).find('ctr').text();
var textAdd=$(this).find('html').text();
var typeO=parseInt($(this).find('type').text());
var idCondition=parseInt($(this).find('condition').text());
var idDom=parseInt($(this).find('valeur').text());
var colorHtml=$(this).find('colorHtml').text();
var textBold=$(this).find('bold').text();
if(ctrscript.indexOf('if')==-1){
ctrscript='';
}
textAdd=textAdd.replace('{Time}','{time}');
textAdd=textAdd.replace('{Note}','{note}');
textAdd=textAdd.replace('{Date}','{date}');
textAdd=textAdd.replace('{Hour}','{hour}');
textAdd=textAdd.replace('{note}', n + '/20');
textAdd=textAdd.replace('{time}', MillisecondsToTime((new Date()).getTime() - ScormStartTime));
textAdd=textAdd.replace('{learnerName}', learnerName);
textAdd=textAdd.replace('{satisfaction}', SatisfationScore);
textAdd=textAdd.replace('{date}', helperDateActu());
textAdd=textAdd.replace('{hour}', helperHourActu());
textAdd=appliqueVarsInTxt(textAdd);
var cssbold='color:' + colorHtml + ';';
if(textBold=='true'||textBold=='True'){
cssbold=cssbold + 'font-weight:bold;';
}
var r=0;
if(ctrscript!=''&&typeO!=2){
eval(ctrscript);
}else{
r=1;
}
if(r==1){
if(typeO==0){
hfull=hfull + "<h2 style='" + cssbold + "' >" + textAdd + "</h2>";
textSendRapportW=textSendRapportW + "<h2 style='" + cssbold + "' >" + textAdd + "</h2>";
}
if(typeO==1){
hfull=hfull + "<p style='" + cssbold + "' >" + textAdd + "</p>";
textSendRapportW=textSendRapportW + "<p style='" + cssbold + "' >" + textAdd + "</p>";
}
if(typeO==2){
if(idCondition!=2){
textAdd=textAdd.replace('{comments}', remarques);
}else{
textAdd=textAdd.replace('{comments}', domainesRemarques[idDom]);
}
hfull=hfull + "<p style='" + cssbold + "' >" + textAdd + "</p>";
textSendRapportW=textSendRapportW + "<p style='" + cssbold + "' >" + textAdd + "</p>";
}
if(typeO==3){
hfull=hfull + getGraphDomain(domP,textAdd);
textSendRapportW=textSendRapportW + getGraphTextes(domP,textAdd);
}
if(typeO==4){
var getbr=getBilanReportW();
getbr=replaceIdStockQ(getbr,false);
textAdd=textAdd.replace('{comments}', getbr);
hfull=hfull + textAdd;
}
}
});
hfull=hfull + getPrintRapportW();
document.getElementById(id).innerHTML=hfull;
if('function' == typeof(SetScormScore)){
SetScormScore(parseInt(n) * 5);
SetScormComplete();
}
}
function getGraphDomain(domP,title){
var lg=parseInt(73 * parseInt(nbdomrapportw));
var h='';
h=h + '<div class="bargraph" style= "width:' + lg + 'px;">';
h=h + '<ul class="bars">';
var libelles=textdomrapportw.split('|');
for(var i=0; i<parseInt(nbdomrapportw); i++){
if(libelles[i]!=''){
var id=i + 1;
var coef=domP[i] / 100;
var he=parseInt(200 * coef);
var lib=domP[i];
if(domP[i]<5){
lib='';
}
h=h + '<li class="bar' + id + ' colorbar' +  id + '" style="height: ' + he + 'px;" >' + lib + '</li>';
}
}
h=h + '</ul>';
h=h + '<ul class="label">';
for(var i=0; i<parseInt(nbdomrapportw); i++){
if(libelles[i]!=''){
h=h + '<li>' + libelles[i] + '</li>';
}
}
h=h + '</ul>';
h=h + '<ul class="y-axis"><li>100</li><li>75</li><li>50</li><li>25</li><li>0</li></ul>';
h=h + '<p class="centered">' + title + '</p>';
h=h + '</div>';
return h;
}
function getGraphTextes(domP,title){
var h='<p><h2>' + title + '</h2><ul>';
var libelles=textdomrapportw.split('|');
for(var i=0; i<parseInt(nbdomrapportw); i++){
if(libelles[i]!=''){
var lib=domP[i];
h=h + '<li>' + libelles[i]  + ' ' + lib +  '%</li>';
}
}
h=h + '</ul></p>';
return h;
}
function getBilanReportW(){
var h='<table style="width:98%;min-height:100px;" ><tr><td>';
h=h + fullBilanResult + '</td></tr></table>';
return h;
}
function getPrintRapportW(){
var h='';
h=h + '<div class="printBilanRapportW" onClick="PrintElemRapportW();" >';
h=h + '</div>';
return h;
}
function PrintElemRapportW(elem){
var rH=$('.reportw').html();
$.ajax({
type: "GET",
url: 'css/ui.css',
cache:true,
async:false,
success: function(css){
PopupElemRapportW(rH,css);
}
,
error: function(){
}
});
}
function PopupElemRapportW(data,css){
css=css + ' .bargraph ul.bars li{background:black !important;color:white !important;border:solid 1px black !important; } .label li{color: black !important;}';
var uagent=navigator.userAgent.toUpperCase();
var mywindow;
if(uagent.indexOf("MSIE") != -1){
mywindow=window.open("", 'Print');
}else{
if(uagent.indexOf("CHROME") != -1){
mywindow=window.open("",'Print Rpt','height=600,width=700');
}else{
mywindow=window.open("",'Print', 'height=400,width=600');
}
}
mywindow.document.write('<html><head><title>' + TitleBilanXML + '</title><style>' + css + '</style></head>');
mywindow.document.write('<body>'); //onload="self.print();"
mywindow.document.write(data);
mywindow.document.write('</body></html>');
mywindow.document.close();
if(navigator.userAgent.toUpperCase().indexOf("MSIE") != -1){
mywindow.print();
window.setTimeout(function(){mywindow.close()}, 3000);
}else{
mywindow.print();
mywindow.close();
}
return true;
}
var extenLgProcess='.php';
var MEMmynote;
var MEMmkript;
var MEMobjm;
var MEMhistory;
var MEMsrelai;
function sendBilanMail(mynote,mkript,objm,history,srelai){
MEMmynote=mynote;
MEMmkript=mkript;
MEMobjm=objm;
MEMhistory=history;
MEMsrelai=srelai;
var titleh2=getInfosSuppBilanLearnerName();
if(haveRightSendMail()){
title2=titleh2 + getInfosSuppBilanWrite();
var msend=titleh2 +  replaceIdStockQ(fullBilanResult,true);
msend=netH(msend);
var bil=mynote + ' sur 20';
if(haveRightProcessPhp()){
if(history==1){
$.ajax({
type: "GET",
url: 'data/sendlinkbilan.php?u=' + encodeURIComponent(FullEmail) + '&p=' + encodeURIComponent(learnerName) + '&b=' + encodeURIComponent(bil),
dataType: "text",
cache: false, async: true,
success: function(data){
if(data.indexOf('ok')!=-1){
logBilan("Lien bilan envoyé!");
}else{
dialogErrorPostLudiGet(0);
logBilan("Impossible d'envoyer le lien bilan !");
}
},
error: function(){
dialogErrorPostLudiGet(0);
logBilan("Impossible d'envoyer le lien bilan !");
}
});
}
}
objm=netH(objm);
if(haveRightProcessPhp()){
objm=objm.replace("{date}",helperDateActu());
objm=objm.replace("{hour}",helperHourActu());
objm=objm.replace("{learnerName}",learnerName);
objm=objm.replace("{note}",mynote);
objm=appliqueVarsInTxt(objm);
var msendB=titleh2 + replaceIdStockQ(fullBilanResult,true);
msendB=netbalises2(msendB);
$.ajax({
type: "POST",
url: 'data/sendfullbilan.php',
dataType: "text",
data:{p :msendB,o : objm},
cache: false, async: true,
success: function(data){
if(data=='ok'){
logBilan("Rapport envoyé!");
}else{
logBilan("Script bilan en echec");
dialogErrorPostLudiGet(0);
if(srelai==1){
crossDomainPostLudiGet(mkript,msend);
logBilan("Bilan envoyé par relai !");
}
}
},
error: function(){
dialogErrorPostLudiGet(0);
if(srelai==1){
crossDomainPostLudiGet(mkript,msend);
logBilan("Bilan envoyé par relai !");
}
}
});
}else{
if(srelai==1){
crossDomainPostLudiGet(mkript,msend);
logBilan("Rapport envoyé par relai !");
}
}
}else{
alertm("Envoi du bilan par mail");
}
}
function crossDomainPostLudiGet(t,msend){
urlp='http://www./openelearningsendresultsplease/exbilan' + extenLgProcess;
if(isHTTPSmessage()){
urlp='https://www./openelearningsendresultsplease/exbilan' + extenLgProcess;
}
msend=netH(msend);
msend=netbalises(msend);
if(msend.length>400){
sendRapportLudiMulti(t,msend,0);
}else{
$.ajax({
type: 'GET',
url: urlp + "?t=" + t + "&m=" + encodeURIComponent(msend),
dataType: "jsonp",
cache:false,
success:function(json){
logBilan("success !");
},
complete: function(){
logBilan( "AJAX GET - complete()" );
},
error:function(jqXHR, textStatus, errorThrown){
logBilan("error GET!");
logBilan(jqXHR.status);
if(jqXHR.status != 200){
crossDomainPostLudi(urlp,t,msend);
}
}
});
}
}
var globalidentsend='';
function sendRapportLudiMulti(t,msend,e){
var urlp='http://www./openelearningsendresultsplease/exbilan' + extenLgProcess;
if(isHTTPSmessage()){
urlp='https://www./openelearningsendresultsplease/exbilan' + extenLgProcess;
}
if(globalidentsend==''){
globalidentsend=ggG();
}
var idg=globalidentsend + msend.length;
var limit=(parseInt(e * 300)+ 300);
var nsend=msend.substr(parseInt(e * 300),300);
$.ajax({
type: 'GET',
url: urlp + "?t=" + t + "&m=" + encodeURIComponent(nsend) + '&i=' + idg + '&e=1',
dataType: "jsonp",
cache:false,
success:function(json){
logBilan("success !");
},complete: function(){
logBilan("complete !");
if(limit<msend.length){
sendRapportLudiMulti(t,msend,parseInt(e + 1));
}else{
$.ajax({
type: 'GET',
url: urlp + "?t=" + t + "&m=" + '&i=' + idg + '&e=0',
dataType: "jsonp",
cache:false,
success:function(json){
logBilan("success final send!");
},
complete: function(){}
});
}
}
});
}
function ggG(){
var result, i, j;
result='';
for(j=0; j<32; j++)
{
if( j == 8 || j == 12|| j == 16|| j == 20)
result=result + '';
i=Math.floor(Math.random()*16).toString(16).toLowerCase();
result=result + i;
}
return result
}
function sendRapportWMail(mkript,srelai){
MEMmkript=mkript;
MEMsrelai=srelai;
if(haveRightSendMail()){
var titleh2=getInfosSuppBilanLearnerName();
if(haveRightProcessPhp()){
$.ajax({
type: "POST",
url: 'data/sendreportByMail.php',
dataType: "text",
data:{b : titleh2 + textSendRapportW},
cache: false, async: true,
success: function(data){
if(data.indexOf('ok')!=-1){
logBilan("Rapport ecrit envoyé!");
}else{
logBilan("Rapport ecrit en echec!");
dialogErrorPostLudiGet(1);
if(srelai==1){
crossDomainPostLudiGet(mkript,titleh2 + textSendRapportW);
logBilan("Rapport ecrit via relai !");
}
}
},error: function(){
dialogErrorPostLudiGet(1);
if(srelai==1){
crossDomainPostLudiGet(mkript,titleh2 + textSendRapportW);
logBilan("Rapport ecrit via relai !");
}
}
});
}else{
if(srelai==1){
crossDomainPostLudiGet(mkript,titleh2 + textSendRapportW);
logBilan("Rapport ecrit via relai !");
}
}
}
}
function haveRightSendMail(){
var ur=window.location.href;
if(ur.indexOf("BatisseursNumeriques")!=-1){
if(ur.indexOf("FASTWEB")!=-1){
if(langue=='fr'){
alertm("Le rapport sera envoyé par email");
}else{
alertm("The report will be sent by email");
}
return false;
}
}
return true;
}
function haveRightProcessPhp(){
var ur=window.location.href;
if(ur.indexOf("liberscol.fr")!=-1){
return false;
}
if(ur.indexOf("file://")!=-1){
return false;
}
return true;
}
function isHTTPSmessage(){
var ur=window.location.href;
if(ur.indexOf("https:")!=-1){
return true;
}
return false;
}
function crossDomainGetLudi(urlp){
var iframeWindow;
if(document.getElementById('ifrm')){
iframeWindow= $('#ifrm');
iframeWindow.attr("src",urlp);
}else{
iframeWindow=document.createElement("iframe");
iframeWindow.style.display="none";
iframeWindow.src=urlp;
iframeWindow.id='ifrm';
iframeWindow.style.width='10px';
iframeWindow.style.height='10px';
document.body.appendChild(iframeWindow);
}
}
function crossDomainPostLudi(urlp,t,m){
var iframe=document.createElement("iframe");
var randomnumber=Math.floor(Math.random()*10000);
var uniqueString="postcross" + randomnumber;
document.body.appendChild(iframe);
iframe.style.display="none";
iframe.contentWindow.name=uniqueString;
var form=document.createElement("form");
form.target=uniqueString;
form.action=urlp;
form.method="POST";
var input=document.createElement("input");
input.type="hidden";
input.name="t";
input.value=t;
form.appendChild(input);
var inputm=document.createElement("input");
inputm.type="hidden";
inputm.name="m";
inputm.value=m;
form.appendChild(inputm);
document.body.appendChild(form);
form.submit();
logBilan("Envoyer bilan en form.submit()!");
}
function netH(str){
str=str.replace(/&eacute;/g,'e');
str=str.replace(/&egrave;/g,'e');
str=str.replace(/&agrave;/g,'a');
str=str.replace(/&ecirc;/g,'e');
str=str.replace(/&ocirc;/g,'o');
str=str.replace(/&oelig;/g,'oe');
var accent=[
/[\300-\306]/g, /[\340-\346]/g, // A, a
/[\310-\313]/g, /[\350-\353]/g, // E, e
/[\314-\317]/g, /[\354-\357]/g, // I, i
/[\322-\330]/g, /[\362-\370]/g, // O, o
/[\331-\334]/g, /[\371-\374]/g, // U, u
/[\321]/g, /[\361]/g, // N, n
/[\307]/g, /[\347]/g, // C, c
];
var noaccent=['A','a','E','e','I','i','O','o','U','u','N','n','C','c'];
for(var i=0; i < accent.length; i++){
str=str.replace(accent[i], noaccent[i]);
}
return str;
}
function netbalises(str){
str=str.replace(/&#9632;/g,'<b>@</b>')
str=str.replace(/&nbsp;/g,'-')
str=str.replace(/<h2><\/h2>/g,'')
str=str.replace(/&/g,'')
str=str.replace(/#/g,'')
str=str.replace(/;/g,'')
return str;
}
function netbalises2(str){
str=str.replace(/&eacute;/g,'e');
str=str.replace(/&egrave;/g,'e');
str=str.replace(/&agrave;/g,'a');
str=str.replace(/&ecirc;/g,'e');
str=str.replace(/&ocirc;/g,'o');
str=str.replace(/&oelig;/g,'oe');
str=str.replace(/é/g,'e');
str=str.replace(/è/g,'e');
str=str.replace(/à/g,'a');
str=str.replace(/â/g,'a');
str=str.replace(/ê/g,'e');
str=str.replace(/ô/g,'o');
str=str.replace(/ù/g,'u');
str=str.replace(/ç/g,"c");
str=str.replace(/&nb sp;/g,' ')
str=str.replace(/&nbsp;/g,' ')
str=str.replace(/<h2><\/h2>/g,'')
return str;
}
function dialogErrorProcess(typ){
if(typ==0){
sendBilanMail(MEMmynote,MEMmkript,MEMobjm,MEMhistory,MEMsrelai);
}
if(typ==1){
sendRapportWMail(MEMmkript,MEMsrelai);
}
}
function dialogErrorPostLudiGet(typ){
var inn='<p class="dialogDownTitle" >Une erreur a été rencontré lors de l\'envoi.<br/>Merci de réessayer dans quelques secondes.</p>';
inn +=  '<p><a href="#" class="buttonDialogDownNo"  onCLick="addL();closeYNDown();" >Non</a>&nbsp;';
inn +=  '<a href="#" class="buttonDialogDownYes"  onCLick="addL();';
if(typ==1){
inn +=  'dialogErrorProcess(1);';
}
inn +=  'closeYNDown();" >Oui</a></p>';
if(!gebi("dialogDown")){
var h='<div id="dialogDown" style="display:none;" >';
h += inn;
h += '</div>';
addToM(h);
}else{
gebi("dialogDown").innerHTML= inn ;
}
$("#dialogDown").fadeIn();
var wb=parseInt(350 * zoom);
var hb=parseInt(60 * zoom);
hb=gebi("dialogDown").offsetHeight;
$("#dialogDown").css("width", wb + "px").css("z-index",'1000').css("margin-top", "-" + parseInt(hb/2) + "px");
}
var initExam=0;
var collDiapoExam=new Array();
var collDiapoExamIdPage=new Array();
var collDiapoExamMemPages='';
var memNoteIdExamBarre='';
var limitDomaineExamBarre='';
var diffeDomaineExamBarre='';
var PenaltyExamBarre=0;
var actualExamId=-1;
var actualExamIdScreen=-1;
var lastExamId=0;
var lastAfterExamId=0;
function installExamBarre(obj){
if(obj.type=='selectdomaine'){
var Ecran=document.getElementById("main");
var h=obj.data;
h=h.replace('{idsection}','bloc' + obj.id);
h=h.replace('{sectionclass}','bloc' + obj.id);
Ecran.innerHTML=Ecran.innerHTML + h;
}
if(obj.type=='examBar'){
var Ecran=document.getElementById("main");
var h='<div ';
h=h + 'style="position:absolute;';
h=h + 'cursor:text;z-index:3;" ';
h=h + ' id="bloc' + obj.id + '" class="bloc' + obj.id + ' exambarre" ';
h=h + ' >';
h=h + obj.text;
h=h + '</div>';
Ecran.innerHTML=Ecran.innerHTML + h;
var nb=parseInt(document.getElementById("DiapoNbDiapo").innerHTML);
var timeecart=250;
for(i=0; i<nb; i++){
if(i!=lastPage0){
if(memNoteID.indexOf('p' + i + ';' )!=-1){
$('.examitem' + i).css('background','#BCF5A9');
}
}
}
if(initExam==0){
collDiapoExamMemPages='';
initExam=1;
lastExamId=parseInt(obj.contenu3);
lastAfterExamId=parseInt(obj.contenu2);
for(i=0;i<1000;i++){
collDiapoExam[i]='';
collDiapoExamIdPage[i]= '';
}
}
}
if(obj.type=='examBarScreen'){
var Ecran=document.getElementById("main");
var h='<div ';
h += 'style="position:absolute;';
h += 'cursor:text;text-align:center;z-index:3;" ';
h += ' id="bloc' + obj.id + '" class="bloc' + obj.id + ' exambarre" >';
h += obj.text;
h += '</div>';
if(obj.option==1){
if(obj.getY()>300){
h += '<div id="showScreen" style="position:absolute;display:none;z-index:4;" class="examscreen_box_bottom" >';
}else{
h += '<div id="showScreen" style="position:absolute;display:none;z-index:4;" class="examscreen_box" >';
}
h += '<img id="showScreenimg" class="showScreenimg" onMouseLeave="hiddenDataScreen();" onClick="processDataScreenExamIdScreen();"  '
h += 'style="position:relative;display:none;';
h += 'cursor:pointer;z-index:4;" />';
h += '</div>';
}
Ecran.innerHTML=Ecran.innerHTML + h;
if(initExam==0){
collDiapoExamMemPages='';
initExam=1;
lastExamId=parseInt(obj.contenu3);
lastAfterExamId=parseInt(obj.contenu2);
var eachC=obj.data.split(';');
var eachDomaine=obj.contenu4.split(';');
var nb=parseInt(eachC.length);
var listIdMem="";
var nbQuestions=parseInt(parseInt(obj.border)+1);
var haveRecentTirage=true;
var cont=amplify.store('storeexdata'+nbQuestions);
if(cont==''){
haveRecentTirage=false;
}
if(typeof(cont)=='undefined'){
haveRecentTirage=false;
}
if(haveRecentTirage){
collDiapoExam=amplify.store('collDiapoExam');
collDiapoExamIdPage=amplify.store('collDiapoExamIdPage');
memNoteIdExamBarre=amplify.store('memNoteIdExamBarre');
diffeDomaineExamBarre=amplify.store('diffeDomaineExamBarre');
}else{
for(i=0; i<1000; i++){
collDiapoExam[i]='';
collDiapoExamIdPage[i]= '';
}
for(i=1; i<nbQuestions; i++){
collDiapoExam[i]='1';
var nbr=parseInt(Math.random() * nb);
var haveNoFind=true;
for(var j=0;j<200;j++){
nbr=parseInt(Math.random()*(nb));
var domNum=parseInteger(eachDomaine[nbr]);
var ctrFront=false;
if(limitDomaineExamBarre==''||limitDomaineExamBarre.indexOf(domNum)!=-1){
ctrFront=true;
}
if(obj.option3==1&&diffeDomaineExamBarre!=''){
if(diffeDomaineExamBarre.indexOf("d" + domNum + ";")==-1){
ctrFront=true;
}else{
ctrFront=false;
}
}
if(ctrFront){
if(eachC[nbr]!=''){
haveNoFind=false;
collDiapoExamIdPage[i]=eachC[nbr];
if(collDiapoExamMemPages.indexOf(";" + eachC[nbr] + ";")==-1){
memNoteIdExamBarre=memNoteIdExamBarre + "p" + eachC[nbr] + ";";
diffeDomaineExamBarre=diffeDomaineExamBarre + "d" + domNum + ";";
j=200;
}
}
}
}
if(haveNoFind){
i--;
diffeDomaineExamBarre='';
}else{
collDiapoExamMemPages=collDiapoExamMemPages +  ";" + eachC[nbr] + ";";
}
amplify.store('storeexdata'+nbQuestions,nbQuestions,{expires:180000});
amplify.store('collDiapoExam',collDiapoExam,{expires:180000});
amplify.store('collDiapoExamIdPage',collDiapoExamIdPage,{expires:180000});
amplify.store('memNoteIdExamBarre',memNoteIdExamBarre,{expires:180000});
amplify.store('diffeDomaineExamBarre',diffeDomaineExamBarre,{expires:180000});
}
}
loadDataScreenFirstTime(1);
}
if(actualExamId!=-1){
$('.examitem' + parseInt(actualExamId - 1) + ' a').css('background','black');
$('.examitem' + parseInt(actualExamId - 1) + ' a').css('color','white');
}
}
}
function selectDomaineCheck(idom){
if(idom!='all'){
if(document.getElementById("task_all")){
if(document.getElementById("task_" + idom).checked){
document.getElementById("task_all").checked=false;
}
}
}
var allFalse=true;
$('.domaineselect-list-cb').each(function (){
if(this.checked){
allFalse=false;
}
});
if(allFalse){
if(document.getElementById("task_all")){
document.getElementById("task_all").checked=true;
}
}
if(document.getElementById("task_all")){
if(document.getElementById("task_all").checked){
$('.domaineselect-list-cb').each(function (){
this.checked=false;
});
document.getElementById("task_all").checked=true;
}
}
if(document.getElementById("task_all")){
limitDomaineExamBarre='';
if(document.getElementById("task_all").checked){
limitDomaineExamBarre='';
}else{
$('.domaineselect-list-cb').each(function(){
if(this.checked){
limitDomaineExamBarre=limitDomaineExamBarre + this.value + ',';
}
});
}
}
}
function loadDataScreenFirstTime(i){
CObjetMems=new Array();
CObjetMems_count=0;
actualExamId=i;
var p=collDiapoExamIdPage[actualExamId];
if(p!=''){
var ur="data/page" + p + ".xml";
loaddata(ur,'nonote');
appliqueNumberScreenExamIdPage(actualExamId);
}
}
function loadDataScreen(i){
actualExamId=i;
var p=collDiapoExamIdPage[actualExamId];
if(p!=''){
var ur="data/page" + p + ".xml";
loaddata(ur,'');
appliqueNumberScreenExamIdPage(actualExamId);
}
}
function rSp(p){
var ur="data/page" + p + ".xml";
loaddata(ur,'');
}
function appliqueNumberScreenExamIdPage(i){
if(i!=-1){
setTimeout("$('.pagenumbertaginner').html('" + i + "');", 300);
}
}
function loadDataScreenNext(){
writeInConsole('loadDataScreenNext actualExamId:' + actualExamId);
if(actualExamId==-1){
actualExamId=1;
}else{
actualExamId=actualExamId + 1;
}
if(collDiapoExamIdPage[actualExamId] ==''){
var ur="data/page" + lastAfterExamId + ".xml";
loaddata(ur,'');
}else{
var ur="data/page" + collDiapoExamIdPage[actualExamId] + ".xml";
loaddata(ur,'');
appliqueNumberScreenExamIdPage(actualExamId);
}
}
function loadDataScreenPrev(){
if(actualExamId<2){
return false;
}
actualExamId=actualExamId - 1;
var ur="data/page" + collDiapoExamIdPage[actualExamId] + ".xml";
loaddata(ur,'');
appliqueNumberScreenExamIdPage(actualExamId);
}
function showDataScreen(i,obj){
actualExamIdScreen=i;
var minJpg=collDiapoExamIdPage[i];
if(minJpg!=''){
var src="data/page" + minJpg + ".jpg";
var posi=$('.exambarre').position();
var largLink=(obj.offsetWidth + 4) * parseInt(i-1);
$('#showScreenimg').attr('src',src).css("display","");
$('#showScreen').css("left", parseInt(posi.left + largLink) + 'px').css("display","");
if(posi.top>300){
$('#showScreen').css("top", parseInt(posi.top - 250) + 'px');
}else{
$('#showScreen').css("top", parseInt((posi.top + 30) + $('.exambarre').height()) + 'px');
}
}
}
function hiddenDataScreen(){
$('#showScreen').css("display","none");
}
function processDataScreenExamIdScreen(){
if(actualExamIdScreen!=-1){
loadDataScreen(actualExamIdScreen);
}
}
var fullBilanResult='';
var BilanXML='';
var TitleBilanXML='';
function openSuivi(ur){
var Ecran=document.getElementById("main");
if(!document.getElementById("suiviresult")){
var ipage=0;
try
{
ipage=ur.replace("data/page","");
ipage=ipage.replace(".xml","");
}
catch(err)
{
ipage=0;
}
lastPage1=lastPage0;
lastPage0=parseInt(ipage);
calculnote();
var h='';
var mynote=0;
var Hnote="";
try
{
if(N_T!=0&&N_F!=0){
mynote=parseInt((N_F / N_T) * 20);
if(mynote<0){mynote=0;}
}
}
catch(err){mynote=0;}
Hnote="<table style='position:absolute;left:5px;bottom:5px;font-size:40px;background:white;border:dotted 1px gray;padding:5px;' >";
Hnote=Hnote + "<tr><td style='border-bottom:solid 2px black;padding:5px;padding-left:30px;padding-right:30px;text-align:center;' >" + mynote;
Hnote=Hnote + "</td></tr>";
Hnote=Hnote + "<tr><td style='padding:5px;text-align:center;' >20</td></tr></table>";
h=h + '<div id="suiviresult" class="suiviresult" >';
h=h + '<div  id="closesuivibox" class="suivibox" onClick="loaddata(\'' + ur + '\',\'nonote\')" >';
h=h + '&#8680;';
h=h + '</div>';
if(isok()){
h=h + '<div id="toptitleH" class="toptitlesuiviGreen" >Votre progression</div>';
}else{
h=h + '<div id="toptitleH" class="toptitlesuiviRed" >Votre progression</div>';
}
h=h + '<div id="containBilanH" class="containBilan" >' + partBilanResult + '</div>';
h=h + '</div>';
Ecran.innerHTML=Ecran.innerHTML + h;
if(scriptdiapo!=''&&scriptdiapo.indexOf('MathJax.Hub')!=-1){
eval(scriptdiapo);
}
$('#suiviresult').animate({left: "5%"},700);
}
}
var onCorrection=false;
var acceptCorrection=false;
var greSpe='&#9632';
var redSpe='red';
function openCorrectSimple(pg){
openCorrection('data/page' + pg + '.xml','')
}
function openCorrection(ur,strscript){
var act='loaddata(\'' + ur + '\',\'nonote\')';
if(onCorrection){
if(acceptCorrection){
if(ur!=''){
loaddata(ur,'nonote');
}else{
LUDI.nextPageNoNote();
}
onCorrection=false;
}
return false;
}
$('.suiviErreurMark').css('display','none');
$('.suiviErreurMark').remove();
onCorrection=true;
acceptCorrection=false;
if(strscript!=''){
strscript=strscript.replace(/jspostr/g, "'");
eval(strscript);
}
var Ecran=document.getElementById("main");
var ipage=0;
try
{
ipage=ur.replace("data/page","");
ipage=ipage.replace(".xml","");
}
catch(err)
{
ipage=0;
}
lastPage1=lastPage0;
lastPage0=parseInt(ipage);
calculnote();
var questionsActive=false;
for(var i=0; i < CObjets_count; i++){
var Oty=CObjets[i].type;
if(Oty=='qcm'){
processCorrectionQcm(i);
questionsActive=true;
}
if(Oty=='qcmuniquedata'){
processCorrectionQcmUnique(i);
questionsActive=true;
}
if(Oty=='qcmcube'){
correctionCarreQuizz(i,0);
questionsActive=true;
}
if(Oty=='motatrier'){
processCorrectionMotaTrier(i);
questionsActive=true;
}
if(Oty=='drop'){
processCorrectionDrag(i);
questionsActive=true;
}
if(Oty=='bag'){
processCorrectionBag(i);
questionsActive=true;
}
if(Oty=='input'){
processCorrectionInput(i);
questionsActive=true;
}
if(Oty=='inputNumeriqueSignificatif'){
processCorrectionInputNumerique(i);
questionsActive=true;
}
if(Oty=='inputsyntaxique'){
processCorrectionInputSyntaxique(i);
questionsActive=true;
}
if(Oty=='tcm'){
processCorrectionTcm(i);
questionsActive=true;
}
if(Oty.indexOf('plugques-')!=-1){
processCorrectionPLugMe(i);
questionsActive=true;
}
}
if(questionsActive){
setTimeout(function(){ acceptCorrection=true; }, 1000);
}else{
loaddata(ur,'nonote');
onCorrection=false;
}
}
function processCorrectionQcm(i){
var CorrectAnswer="";
var timeCorrection=200;
var idAnim=CObjets[i].id * 100;
$('#table' + CObjets[i].id + ' .qcmn').each(function(index){
if($(this).html()=="X"){
r=false;
var wrongA=$(this).attr('name');
var parent=$(this).parent().parent().parent().parent().parent().parent().find(".selectqcmline");
var contenu=parent.html();
parent.html("<span id='idAnim" + idAnim + "' >" + contenu + "</span>");
setTimeout( "animCorrectionQcm('errorspan','idAnim" + idAnim + "');", timeCorrection);
timeCorrection=timeCorrection + 200;
idAnim=idAnim + 1;
}
});
$('#table' + CObjets[i].id + ' .qcmx').each(function(index){
var reponseA=$(this).attr('name');
CorrectAnswer=CorrectAnswer + reponseA + ',';
var parent=$(this).parent().parent().parent().parent().parent().parent().find(".selectqcmline");
var contenu=parent.html();
if($(this).html()!="X"){
r=false;
parent.html("<span id='idAnim" + idAnim + "' >" + contenu + "</span>");
setTimeout( "animCorrectionQcm('goodspan','idAnim" + idAnim + "');", timeCorrection);
timeCorrection=timeCorrection + 200;
idAnim=idAnim + 1;
}else{
r=true;
parent.html("<span id='idAnim" + idAnim + "' >" + contenu + "</span>");
setTimeout( "animCorrectionQcm('goodspan','idAnim" + idAnim + "');", timeCorrection);
timeCorrection=timeCorrection + 200;
idAnim=idAnim + 1;
}
});
$('#table' + CObjets[i].id).find("*").attr('onclick','').unbind('click');
}
function processCorrectionQcmUnique(i){
var nbrep=0;
for(var j=0; j < CObjets_count; j++){
var ctrObj=CObjets[j];
if(ctrObj.type=='qcmunique'){
var tdunik='#' + ctrObj.id + 'qcmunique';
$('#table' + ctrObj.id).find("*").attr('onclick','').unbind('click');
$('.bloc' + ctrObj.id).find("*").attr('onclick','').unbind('click');
var nam=$(tdunik).attr('name');
if(nam=='qcmx'){
var ctrval=$(tdunik).html();
if(ctrval=="X"){
var ctrx=parseInt(CObjets[j].getX())-18;
var ctry=parseInt(CObjets[j].getY())-5;
var idAnim=i * 1000;
var h="<div id='idAnim" + idAnim + "' ";
h=h + " style='position : absolute;left:" + convertToPercentX(ctrx) + ";top:" + convertToPercentY(ctry) + ";' ";
h=h + " class='goodMarkDiv' >&#10003;</div>"
$("#main").append(h);
var rx=parseInt(CObjets[j].getX())-6;
var ry=parseInt(CObjets[j].getY())-6;
var rw=parseInt(CObjets[j].getW())+9;
var rh=parseInt(CObjets[j].getH())+9;
var r="<div id='rndAnim" + idAnim + "' ";
r=r + " style='left:" + convertToPercentX(rx) + ";top:" + convertToPercentY(ry)  + ";width:" + convertToPercentX(rw) + ";height:" + convertToPercentY(rh) + ";' ";
r=r + " class='goodMarkRound' ></div>"
$("#main").append(r);
}else{
var ctrx=parseInt(CObjets[j].getX())-18;
var ctry=parseInt(CObjets[j].getY())-5;
var idAnim=i * 1000;
var h="<div id='idAnim" + idAnim + "' ";
h=h + " style='left:" + convertToPercentX(ctrx) + ";top:" + convertToPercentY(ctry) + ";' ";
h=h + " class='errorMarkDiv' >&#x2717;</div>"
$("#main").append(h);
}
}else{
if($(tdunik).html()=="X"){
var ctrx=parseInt(CObjets[j].getX())-18;
var ctry=parseInt(CObjets[j].getY())-5;
var idAnim=i * 1000;
var h="<div id='idAnim" + idAnim + "' ";
h=h + " style='left:" + convertToPercentX(ctrx) + ";top:" + convertToPercentY(ctry) + ";' ";
h=h + " class='errorMarkDiv' >&#x2717;</div>"
$("#main").append(h);
var rx=parseInt(CObjets[j].getX())-6;
var ry=parseInt(CObjets[j].getY())-6;
var rw=parseInt(CObjets[j].getW())+9;
var rh=parseInt(CObjets[j].getH())+9;
var r="<div id='rndAnim" + idAnim + "' ";
r=r + " style='left:" + convertToPercentX(rx) + ";top:" + convertToPercentY(ry) + ";width:" + convertToPercentX(rw) + ";height:" + convertToPercentY(rh) + ";' ";
r=r + " class='errorMarkRound' ></div>"
$("#main").append(r);
}
}
}
}
}
function processCorrectionDrag(i){
var VobjDrag=findObjByIdStr(CObjets[i].data);
var ctrx=parseInt(VobjDrag.getX() + (VobjDrag.getW()/2));
var ctry=parseInt(VobjDrag.getY() + (VobjDrag.getH()/2));
var r=true;
if(ctrx<parseInt(CObjets[i].getX())){
r=false;
}
if(ctry<parseInt(CObjets[i].getY())){
r=false;
}
if(ctrx>parseInt(CObjets[i].getX() + CObjets[i].getW())){
r=false;
}
if(ctry>parseInt(CObjets[i].getY() + CObjets[i].getH())){
r=false;
}
if(r==false){
VobjDrag.setX( parseInt(CObjets[i].getX()));
VobjDrag.setY( parseInt(CObjets[i].getY()));
var jnx=VobjDrag.getX();
var jny=VobjDrag.getY();
animplaceObj(VobjDrag.id,jnx,jny);
if(VobjDrag.idscript=='ludiscapelinks'){
var decx=parseInt(parseInt(VobjDrag.getW() * zoom)/2);
var decy=parseInt(parseInt(VobjDrag.getH() * zoom)/2);
var ox=parseInt(VobjDrag.getX() * zoom) + decx;
var oy=parseInt(VobjDrag.getY() * zoom) + decy;
var lx=parseInt(VobjDrag.objx * zoom) + decx;
var ly=parseInt(VobjDrag.objy * zoom) + decy;
drawLineCSSRed('linenormals' + VobjDrag.id,lx,ly,ox,oy);
$('.text' + VobjDrag.data + 'inner').css("color","#FA5858");
}
$('#table' + VobjDrag.id).css("color","red");
}else{
$('#table' + VobjDrag.id).css("color","green");
$('#innerbloc' + VobjDrag.id).css("border-color","green");
}
$('#table' + VobjDrag.id).attr('onMouseDown','').unbind('MouseDown');
$('#imgbloc' + VobjDrag.id).attr('onMouseDown','').unbind('MouseDown');
}
var memBagAuto
function processCorrectionBag(j){
var collId=findObjCollByIdStr(CObjets[j].data);
var arrayLength=collId.length;
var progx =0;
var progy =2;
for(var b=0; b < arrayLength; b++){
var c=parseInt(collId[b]);
var VobjDrag=CObjets[c]
var ctrx=parseInt(VobjDrag.getX() + (VobjDrag.getW() / 2));
var ctry=parseInt(VobjDrag.getY() + (VobjDrag.getH() / 2));
var r=true;
if(ctrx<parseInt(CObjets[j].getX())){
r=false;
}
if(ctry<parseInt(CObjets[j].getY())){
r=false;
}
if(ctrx>parseInt(CObjets[j].getX() + CObjets[j].getW())){
r=false;
}
if(ctry>parseInt(CObjets[j].getY() + CObjets[j].getH())){
r=false;
}
if(r==false){
$('#table' + VobjDrag.id).css("color","red");
}
VobjDrag.setX(parseInt(CObjets[j].getX()));
VobjDrag.setY(parseInt(CObjets[j].getY()));
progx=parseInt(parseInt(CObjets[j].getW() - VobjDrag.getW()) / 2);
var jnx=VobjDrag.getX() + progx;
var jny=VobjDrag.getY() + progy;
animplaceObj(VobjDrag.id,jnx,jny);
progy=progy + VobjDrag.getH();
$('#table' + VobjDrag.id).attr('onMouseDown','').unbind('MouseDown');
$('#imgbloc' + VobjDrag.id).attr('onMouseDown','').unbind('MouseDown');
}
collId=findObjCollByIdStrNoData(CObjets[j].data);
arrayLength=collId.length;
for(var b=0; b < arrayLength; b++){
var c=parseInt(collId[b]);
var VobjDrag=CObjets[c]
var ctrx=parseInt(VobjDrag.getX() + (VobjDrag.getW()/2));
var ctry=parseInt(VobjDrag.getY() + (VobjDrag.getH()/2));
var r=false;
if(ctrx>parseInt(CObjets[j].getX())){
if(ctry>parseInt(CObjets[j].getY())){
if(ctrx<parseInt(CObjets[j].getX() + CObjets[j].getW())){
if(ctry<parseInt(CObjets[j].getY() + CObjets[j].getH())){
r=true;
}
}
}
}
if(r){
VobjDrag.setX(parseInt(VobjDrag.objx));
VobjDrag.setY(parseInt(VobjDrag.objy));
var jnx=VobjDrag.getX();
var jny=VobjDrag.getY();
animplaceObj(VobjDrag.id,jnx,jny);
}
$('#table' + VobjDrag.id).attr('onMouseDown','').unbind('MouseDown');
$('#imgbloc' + VobjDrag.id).attr('onMouseDown','').unbind('MouseDown');
}
}
function processCorrectionInput(i){
var rep=$('.input' + CObjets[i].id ).attr('data-rep');
var displayrep=rep;
var yrep=document.getElementById('input' + CObjets[i].id).value;
var ctrx=parseInt(parseInt(CObjets[i].getX() + (CObjets[i].getW()/2)) * zoom);
var ctry=parseInt(CObjets[i].getY() * zoom);
var cl='tooltipsgreen';
if(Sit(rep)!=Sit(yrep)||yrep==''){
cl='tooltipsred';
}else{
displayrep="&#x2714;";
}
var h='<a style="left:' + ctrx + 'px;top:' + ctry + 'px;" ';
h += ' class="' + cl + '" href="#">.<span>' + displayrep + '</span></a>';
$("#main").append(h);
}
function processCorrectionInputNumerique(i){
var rep=$('#input' + CObjets[i].id ).attr('data-rep');
var displayrep=rep;
var yrep=$('#input' + CObjets[i].id ).val();
var ctrx=parseInt(parseInt(CObjets[i].getX() + (CObjets[i].getW()/2)) * zoom);
var ctry=parseInt(CObjets[i].getY() * zoom);
var isFalse=false;
if(typeof(yrep) == 'undefined'){
yrep='';
isFalse=false;
}
if(yrep==''){
isFalse=false;
}
var cl='tooltipsgreen';
if(controlRepNumMinMax(CObjets[i],yrep)==false||isFalse){
cl='tooltipsred';
}else{
displayrep="&#x2714;";
}
var h='<a style="left:' + ctrx + 'px;top:' + ctry + 'px;" ';
h += ' class="' + cl + '" href="#">.<span>' + displayrep + '</span></a>';
$("#main").append(h);
}
function processCorrectionInputSyntaxique(i){
var r=true;
if(controlRepSyntaxe(CObjets[i],0)==false){
r=false;
}
var displayrep="";
var ctrx=parseInt(parseInt(CObjets[i].getX() + (CObjets[i].getW()/2)) * zoom);
var ctry=parseInt(CObjets[i].getY() * zoom);
var cl='tooltipsgreen';
if(!r){
cl='tooltipsred';
displayrep="&#x2717;";
$('.textareabloc' + CObjets[i].id).css("color","red");
var ac=CObjets[i].contenu7;
$('.textareabloc' + CObjets[i].id).val(ac);
}else{
displayrep="&#x2714;";
$('.textareabloc' + CObjets[i].id).css("color","green");
}
var h='<a style="left:' + ctrx + 'px;top:' + ctry + 'px;" ';
h += ' class="' + cl + '" href="#">.<span>' + displayrep + '</span></a>';
$("#main").append(h);
}
function processCorrectionTcm(i){
$('#bloc' + CObjets[i].id + ' .reponseholetext').each(function(index){
var ctr1=$(this).attr('data-rep');
var idctr=$(this).attr('id');
var ctr2=gei(idctr);
if(Sit(ctr1)!=Sit(ctr2)){
$(this).replaceWith( "<span style='color:red;' >" + ctr1 + "</span>" );
}else{
$(this).replaceWith( "<span style='color:#7DFF26;' >&#x2714;&nbsp;" + ctr2 + "</span>" );
}
});
}
function processCorrectionMotaTrier(i){
var motareliercontrol=recupMotsaRelier(CObjets[i]);
var eachElementTried1=CObjets[i].data.split('|');
var eachElementTried2=motareliercontrol.split('|');
var idulA ='#advancedA-' + i;
var idulB ='#advancedB-' + i;
var ha="";
var h="";
var num=1;
for(var e=0 ; e < eachElementTried1.length; e++){
var rep=eachElementTried1[e];
var data1=Sit(eachElementTried1[e]);
var data2=Sit(eachElementTried2[e]);
if(data1!=''){
if(data2==''||data2!=data1){
num=num + 1;
h=h + '<li style="color:red;" >' + rep + '</li>';
}else{
num=num + 1;
h=h + '<li style="color:green;" >' + rep + '</li>';
}
}
}
$(idulA).html("");
$(idulB).html(h);
Sortable.create(sortById('advancedB-' + i),{
sort: false,
group:{name:'advanced',pull:false,put:false},
animation: 250
});
$(idulB).find("*").on('ondragstart', function(e){
return false;
});
$(idulB).find("*").on('dragenter', function(e){
return false;
});
$(idulB).find("*").on('mouseup', function(e){
return false;
});
$(idulB).find("*").on('mousemove', function(e){
return false;
});
}
function animCorrectionQcm(clas,id){
$('#' + id).animate({
marginLeft: "+=5"
}, 150, function(){
$('#' + id).addClass(clas);
});
}
function findObjCollByIdStr(data){
var collId= new Array();
for(var i=0; i < CObjets_count; i++){
if(CObjets[i].type=='drag'){
if(CObjets[i].data==data){
collId.push(i);
}
}
}
return collId;
}
function findObjCollByIdStrNoData(data){
var collId= new Array();
for(var i=0; i < CObjets_count; i++){
if(CObjets[i].type=='drag'){
if(CObjets[i].data!=data){
collId.push(i);
}
}
}
return collId;
}
function processCorrectionPLugMe(i){
var obj=CObjets[i];
var fct= obj.type.replace('plugques-','');
fct=fct + 'ViewResults(obj)';
eval(fct);
}
function viewErreurMarks(){
$('.suiviErreurMark').css('display','none');
$('.suiviErreurMark').remove();
var questionsActive=false;
for(var i=0; i < CObjets_count; i++){
var Oty=CObjets[i].type;
if(Oty=='qcm'){
processErreurQcm(i);
questionsActive=true;
}
if(Oty=='qcmuniquedata'){
processErreurQcmUnique(i);
questionsActive=true;
}
if(Oty=='qcmcube'){
processErreurCarreQuizz(i);
questionsActive=true;
}
if(Oty=='motatrier'){
processErreurMotaTrier(i);
questionsActive=true;
}
if(Oty=='drop'){
processErreurDrag(i);
questionsActive=true;
}
if(Oty=='bag'){
processErreurBag(i);
questionsActive=true;
}
if(Oty=='input'){
processErreurInput(i);
questionsActive=true;
}
if(Oty=='inputNumeriqueSignificatif'){
processErreurInputNumeriqueSignificatif(i);
questionsActive=true;
}
if(Oty=='tcm'){
processErreurTcm(i);
questionsActive=true;
}
if(Oty.indexOf('plugques-')!=-1){
processViewErrorsPlugins(CObjets[i]);
questionsActive=true;
}
}
}
function processErreurQcm(i){
var CorrectAnswer="";
var timeCorrection=200;
var idAnim=CObjets[i].id * 100;
$('#table' + CObjets[i].id + ' .qcmn').each(function(index){
if($(this).html()=="X"){
r=false;
var wrongA=$(this).attr('name');
var parent=$(this).parent().parent().parent().parent().parent().parent().find(".selectqcmline");
var contenu=parent.html();
parent.html("<span id='idAnim" + idAnim + "' class='suiviErreurMark' >&#x2717;</span>" + contenu);
setTimeout( "animErreurVQcm('errorMark','idAnim" + idAnim + "');", timeCorrection);
timeCorrection=timeCorrection + 200;
idAnim=idAnim + 1;
}
});
}
function processErreurQcmUnique(i){
var nbrep=0;
for(var j=0; j < CObjets_count; j++){
var ctrObj=CObjets[j];
if(ctrObj.type=='qcmunique'){
var tdunik='#' + ctrObj.id + 'qcmunique';
var nam=$(tdunik).attr('name');
if(nam=='qcmx'){
}else{
if($(tdunik).html()=="X"){
var ctrx=parseInt(CObjets[j].getX() * zoom)-18;
var ctry=parseInt(CObjets[j].getY() * zoom)-5;
var idAnim=i * 100;
var h="<div id='idAnim" + idAnim + "' ";
h=h + " style='left:" + ctrx + "px;top:" + ctry + "px;' ";
h=h + " class='suiviErreurMark errorMarkDiv' >&#x2717;</div>"
$("#main").append(h);
}
}
}
}
}
function processErreurDrag(i){
var VobjDrag=findObjByIdStr(CObjets[i].data);
var ctrx=parseInt(VobjDrag.getX() + (VobjDrag.getW() / 2));
var ctry=parseInt(VobjDrag.getY() + (VobjDrag.getH() / 2));
var r=true;
if(ctrx<parseInt(CObjets[i].getX())){
r=false;
}
if(ctry<parseInt(CObjets[i].getY())){
r=false;
}
if(ctrx>parseInt(CObjets[i].getX() + CObjets[i].getW())){
r=false;
}
if(ctry>parseInt(CObjets[i].getY() + CObjets[i].getH())){
r=false;
}
if(r==false){
/*
if(VobjDrag.idscript=='ludiscapelinks'){
var decx=parseInt(parseInt(VobjDrag.w * zoom)/2);
var decy=parseInt(parseInt(VobjDrag.h * zoom)/2);
var ox=parseInt(VobjDrag.x * zoom) + decx;
var oy=parseInt(VobjDrag.y * zoom) + decy;
var lx=parseInt(VobjDrag.objx * zoom) + decx;
var ly=parseInt(VobjDrag.objy * zoom) + decy;
drawLineCSS('linenormals' + VobjDrag.id,lx,ly,ox,oy);
}
*/
var idAnim=CObjets[i].id * 100;
var ta=$('#imgbloc' + VobjDrag.id);
ta.append("<div id='idAnim" + idAnim + "' class='suiviErreurMark errorMarkDiv' >&#x2717;</div>");
}
}
var memBagAuto;
function processErreurBag(j){
var collId=findObjCollByIdStr(CObjets[j].data);
var arrayLength=collId.length;
for(var b=0; b < arrayLength; b++){
var c=parseInt(collId[b]);
var VobjDrag=CObjets[c]
var ctrx=parseInt(VobjDrag.getX() + (VobjDrag.getW() / 2));
var ctry=parseInt(VobjDrag.getY() + (VobjDrag.getH() / 2));
var r=true;
if(ctrx<parseInt(CObjets[j].getX())){
r=false;
}
if(ctry<parseInt(CObjets[j].getY())){
r=false;
}
if(ctrx>parseInt(CObjets[j].getX() + CObjets[j].getW())){
r=false;
}
if(ctry>parseInt(CObjets[j].getY() + CObjets[j].getH())){
r=false;
}
if(r==false){
var idAnim=CObjets[i].id * 100;
var ta=$('#imgbloc' + VobjDrag.id);
ta.append("<div id='idAnim" + idAnim + "' class='suiviErreurMark errorMarkDiv' >&#x2717;</div>");
}
}
}
function processErreurInput(i){
var rep=$('.input' + CObjets[i].id ).attr('data-rep');
var displayrep=rep;
var yrep=document.getElementById('input' + CObjets[i].id).value;
var ctrx=parseInt(CObjets[i].getX() * zoom) - 18;
var ctry=parseInt(CObjets[i].getY() * zoom) - 5;
if(Sit(rep)!=Sit(yrep)||yrep==''){
var idAnim=i * 100;
var h="<div id='idAnim" + idAnim + "' ";
h=h + " style='left:" + ctrx + "px;top:" + ctry + "px;' ";
h=h + " class='suiviErreurMark errorMarkDiv' >&#x2717;</div>"
$("#main").append(h);
}
}
function processErreurInputNumeriqueSignificatif(i){
var r=true;
var controlVal=gebi('input' + CObjets[i].id).value;
if(controlNumMinMaxSimple(CObjets[i],controlVal)==false){
r=false;
}
var ctrx=parseInt(CObjets[i].getX() * zoom) - 18;
var ctry=parseInt(CObjets[i].getY() * zoom) - 5;
if(!r){
var idAnim=i * 100;
var h="<div id='idAnim" + idAnim + "' ";
h += " style='left:" + ctrx + "px;top:" + ctry + "px;' ";
h +=  " class='suiviErreurMark errorMarkDiv' >&#x2717;</div>"
$("#main").append(h);
}
}
function processErreurTcm(i){
$('#bloc' + CObjets[i].id + ' .reponseholetext').each(function(index){
var ctr1=$(this).attr('data-rep');
var idctr=$(this).attr('id');
var ctr2=gei(idctr);
if(Sit(ctr1)!=Sit(ctr2)){
var idAnim=CObjets[i].id * 100;
var lst="<span id='idAnim" + idAnim + "' ";
if(CObjets[i].option7==1){
lst=lst + " style='position:absolute;margin-left:-5px;margin-top:-20px;' ";
}
lst=lst + " class='suiviErreurMark errorMark' >&#x2717;</span>";
$(this).before(lst);
}
});
}
function processErreurMotaTrier(i){
var motareliercontrol=recupMotsaRelier(CObjets[i]);
var eachElementTried1=CObjets[i].data.split('|');
var eachElementTried2=motareliercontrol.split('|');
var idulA ='#advancedA-' + i;
var idulB ='#advancedB-' + i;
var ha="";
var h="";
var num=1;
for(var e=0 ; e < eachElementTried1.length; e++){
var rep=eachElementTried1[e];
var data1=Sit(eachElementTried1[e]);
var data2=Sit(eachElementTried2[e]);
if(data1!=''){
if(data2==''||data2!=data1){
var idul ='#advancedB-' + CObjets[i].id + " li";
$(idul).each(function(n){
var dataCtr=Sit($(this).html());
if(data2==dataCtr){
var h="<span id='idAnim" + i + "' ";
h += " style='left:0px;top:0px;' ";
h += " class='suiviErreurMark errorMark' >&#x2717;</span>"
$(this).prepend(h);
}
});
}
}
}
}
function animErreurVQcm(clas,id){
$('#' + id).animate({
marginLeft: "+=5"
}, 150, function(){
$('#' + id).addClass(clas);
});
}
var haveCanon=false;
var paintBoules;
function instalPhysics(obj){
var Ecran=document.getElementById("main");
if(obj.type=='physicscanon'){
obj.onmove=0;
var tempBoule=new CBoule();
h='<img ';
h += ' id="boule' + obj.id + '" ';
h += ' class="unselectable boule' + obj.id + '" ';
h += ' src="' + obj.text + '" ';
h += ' style="display:none;z-index:1;position:absolute;' + obj.cssadd + '" ';
h += ' />';
tempBoule.x=obj.getX() + (obj.getW()/2) ;
tempBoule.y=obj.getY() + (obj.getH()/2) ;
tempBoule.ix=tempBoule.x;
tempBoule.iy=tempBoule.y;
tempBoule.active=0;
tempBoule.idref=obj.id;
CBoules_Add(tempBoule);
h += '<img ';
h += ' id="bloc' + obj.id + '" ';
h += ' class="unselectable bloc' + obj.id + '" ';
h += ' src="' + obj.data + '" ';
h += ' style="display:none;' + obj.cssadd + '" />';
haveCanon=true;
Ecran.innerHTML=Ecran.innerHTML + h;
window.clearInterval(paintBoules);
paintBoules=setInterval("moveBoules()",30);
}
}
function zoomPhysics(obj){
if(obj.type=='physicscanon'){
for(var i=0; i < CBoule_count; i++){
if(CBoules[i].idref==obj.id){
var bouleid='.boule' + CBoules[i].idref;
CBoules[i].ix=obj.getX() + (obj.getW()/2) ;
CBoules[i].iy=obj.getY() + (obj.getH()/2) ;
$(bouleid).css("width", (40 * zoom) + "px");
$(bouleid).css("height",(40 * zoom) + "px");
$(bouleid).css("left", ((CBoules[i].x - 20) * zoom) + "px");
$(bouleid).css("top" , ((CBoules[i].y - 20) * zoom) + "px");
$(bouleid).fadeIn();
}
}
}
}
function rotateCanon(){
for(var i=0; i < CObjets_count; i++){
if(CObjets[i].type=='physicscanon'){
var Vobj= CObjets[i];
/*degreeToWEBMatrix(Vobj,Vobj.rotation);
degreeToIEMatrix(Vobj,Vobj.rotation);*/
var sid=".bloc" + Vobj.id;
rotationObjetPlug(sid,Vobj.rotation);
}
}
}
function movePhysics(){
for(var i=0; i < CObjets_count; i++){
if(haveCanon){
if(CObjets[i].type=='physicscanon'){
var Vobj= CObjets[i];
var Ecran=document.getElementById("main");
var ex=parseInt(parseInt(xcoord - Ecran.offsetLeft) /zoom);
var ey=parseInt(parseInt(ycoord - Ecran.offsetTop ) /zoom);
var angleCanon=getAngle(ex,ey,Vobj.getX() + (Vobj.getW()/2) ,Vobj.getY() + (Vobj.getH()/2));
var angleDegrees=angleCanon * (180 /Math.PI) + 180;
Vobj.rotation=angleDegrees;
if(Vobj.onmove==0){
rotateCanon();
}
}
}
if(CObjets[i].type=='img'){
if(CObjets[i].border=='track'){
var Vobj= CObjets[i];
var Ecran=document.getElementById("main");
var ex=parseInt(parseInt(xcoord - Ecran.offsetLeft) /zoom);
var ey=parseInt(parseInt(ycoord - Ecran.offsetTop ) /zoom);
var vojY=Vobj.getY();
var angleTrack=getAngle(Vobj.getX() + (Vobj.getW()/2) ,vojY + (Vobj.getH()/2),ex,ey);
var decZoom=parseFlo(Vobj.contenu6);
if(mobiSite){
decZoom=parseFlo(Vobj.contenu8);
}
var decX=parseInteger((8 * decZoom) * Math.cos(angleTrack));
var decY=parseInteger((5 * decZoom) * Math.sin(angleTrack));
var objId='.bloc' + Vobj.id;
var marGT=parseInteger($(objId).css('margin-top').replace('px',''));
var marGL=parseInteger($(objId).css('margin-left').replace('px',''));
if(marGL<50&&marGL>-50){
$(objId).css("margin-left", ((decX) * zoom) + "px");
}
if(marGT<50&&marGT>-50){
$(objId).css("margin-top", ((decY) * zoom) + "px");
}
}
}
}
}
function activeBoule(obj){
if(obj.type=='physicscanon'){
for(var i=0; i < CBoule_count; i++){
if(CBoules[i].idref==obj.id){
CBoules[i].active=1;
CBoules[i].angle=obj.rotation;
CBoules[i].x=CBoules[i].ix;
CBoules[i].y=CBoules[i].iy;
obj.onmove=1;
var bouleid='.boule' + CBoules[i].idref;
$(bouleid).css("left", ((CBoules[i].x - 20) * zoom) + "px");
$(bouleid).css("top" , ((CBoules[i].y - 20) * zoom) + "px");
}
}
}
}
function moveBoules(){
for(var i=0; i < CBoule_count; i++){
if(CBoules[i].active==1){
var deplace=10;
var evolx=parseFloat(CBoules[i].x) +  ((deplace) * Math.cos(CBoules[i].angle *  (Math.PI/180 ) ));
var evoly=parseFloat(CBoules[i].y) + ((deplace) * Math.sin(CBoules[i].angle * (Math.PI/180 ) ));
CBoules[i].x=evolx;
CBoules[i].y=evoly;
var bouleid='.boule' + CBoules[i].idref;
$(bouleid).css("left", ((CBoules[i].x - 20) * zoom) + "px");
$(bouleid).css("top" , ((CBoules[i].y - 20) * zoom) + "px");
}
}
rotateCanon();
}
function CBoule(){
this.id;
this.idref;
this.x;
this.y;
this.ix;
this.iy;
this.active;
this.angle;
}
var CBoules=new Array();
var CBoule_count=0;
function CBoules_Add(Elem){
Elem.id=CBoule_count;
CBoules.push(Elem);
CBoule_count=CBoule_count +1;
}
var LUDIlifeFirstLoad=true;
var LUDIlife=0;
var LUDIlifegameover=0;
var LUDIlifeNoReload=0;
var LUDIlifeheight=0;
var LUDIlifeTotal=0;
var LUDImoney=0;
var LUDIscore=0;
var LUDIspeed=15;
var LUDIwait=0;
var LUDIactualID="";
var LUDIfuturID="";
var LUDIrunScript=true;
var LaScr=true;
var LUDIrunPage=true;
var LUDIactivePopUp=0;
var LUDIrunPageIsOk=false;
var LUDIactualPageIsOk=false;
var runGameOver=false;
var runOneLife=false;
var LUDINbPageGlobal=-1;
var lastPageCheckPoint=0;
function oelengine(){
this.load=function(id){//**
LUDIactualID=id;
};
this.getObjetById=function(LudiId){//**
var Robj=new CObjet();
Robj.id=-1;
var i=0;
for(i; i < CObjets_count; i++){
if(CObjets[i].idscript==LudiId){
Robj=CObjets[i];
}
}
return Robj;
};
this.pageIsOk=function(id){//**
if(LUDIrunPageIsOk==false){
PopUpLimitControl=-1;
LUDIactualPageIsOk=isok();
if(LUDIactualPageIsOk){
viewErreurMarks();
}
LUDIrunPageIsOk=true;
setTimeout('LUDIrunPageIsOk=false;',200);
return LUDIactualPageIsOk;
}else{
return LUDIactualPageIsOk;
}
};
this.questionAreCompleted=function(){//**
isok();
if(interactLost==0){
return true;
}else{
return false;
}
};
this.questionOneCompleted=function(){//**
isok();
if(nunberinteract>0){
return true;
}else{
return false;
}
};
this.miniIsOk=function(){//**
execScriptLoop();
PopUpLimitControl=LUDIactivePopUp;
if(LUDIrunPageIsOk==false){
LUDIactualPageIsOk=isok();
PopUpLimitControl=-1;
LUDIrunPageIsOk=true;
setTimeout('LUDIrunPageIsOk=false;',200);
return LUDIactualPageIsOk;
}else{
return LUDIactualPageIsOk;
}
};
this.rotateAngle=function(s,rot){//**
LUDIactualID=s;
var t=setTimeout( "LUDIrotateAll('" + LUDIactualID +  "'," + rot + ")" ,LUDIwait);
};
this.rotate=function(rot){//**
var t=setTimeout( "LUDIrotateAll('" + LUDIactualID +  "'," + rot + ")" ,LUDIwait);
};
this.closeMini=function(){//**
execScriptLoop();
closePopBarre();
LUDIactivePopUp=0;
};
this.replaySeqSounds=function(){//**
replaySeqSounds();
};
this.startTimer=function(){//**
if(clockFct!=''&&clockTimerG>0){
setTimeout(clockFct,clockTimerG);
clockFct='';
clockTimerG=0;
}
};
this.translate=function(x,y){//**
var t=setTimeout( "LUDItranslateAll('" + LUDIactualID +  "'," + x + "," + y + ")" ,LUDIwait);
};
this.translateXY=function(s,x,y){//**
LUDIactualID=s;
var t=setTimeout( "LUDItranslateAll('" + LUDIactualID +  "'," + x + "," + y + ")" ,LUDIwait);
};
this.translateXYobj=function(s1,s2,speed){//**
LUDIactualID=s1;
if(LUDIwait==0){
LUDItranslateAllobj( s1,s2,speed);
}else{
var t=setTimeout( "LUDItranslateAllobj('" + s1 +  "','" + s2 + "'," + speed + ")" ,LUDIwait);
}
};
this.location=function(x,y){//**
var i=0;
for(i; i < CObjets_count; i++){
if(CObjets[i].idscript==LUDIactualID){
var Vobj= CObjets[i];
Vobj.setX(x);
Vobj.setY(y);
var ex=parseInt(Vobj.getX() * zoom);
var ey=parseInt(Vobj.getY() * zoom);
$(".bloc" + Vobj.id).css("left",ex + 'px').css("top",ey + 'px');
zoomBoite(Vobj);
zoomBoiteTexte(Vobj);
}
}
};
this.locationXY=function(s,x,y){//**
LUDIactualID=s;
var i=0;
for(i; i < CObjets_count; i++){
if(CObjets[i].idscript==LUDIactualID){
var Vobj= CObjets[i];
Vobj.setX(x);
Vobj.setY(y);
var ex=parseInt(Vobj.getX() * zoom);
var ey=parseInt(Vobj.getY() * zoom);
$(".bloc" + Vobj.id).css("left",ex + 'px').css("top",ey + 'px');
zoomBoite(Vobj);
zoomBoiteTexte(Vobj);
}
}
};
this.mapTo=function(s,s2){//**
var Vobj;
var Vobj2;
var i=0;
for(i; i < CObjets_count; i++){
if(CObjets[i].idscript==s){
var Vobj= CObjets[i];
}
if(CObjets[i].idscript==s2){
var Vobj2= CObjets[i];
}
}
Vobj.setX(Vobj2.getX());
Vobj.setY(Vobj2.getY());
Vobj.setW(Vobj2.getW());
Vobj.setH( Vobj2.getH());
var ex=parseInt(Vobj.getX() * zoom);
var ey=parseInt(Vobj.getY() * zoom);
var ew=parseInt(Vobj.getW() * zoom);
var eh=parseInt(Vobj.getH() * zoom);
$(".bloc" + Vobj.id).css("left",ex + 'px').css("top",ey + 'px');
$(".bloc" + Vobj.id).css("width",ew + 'px').css("height",eh + 'px');
};
this.speed=function(s){//**
LUDIspeed=parseInt(s);
};
this.sound=function(s){//**
if(globalSound==1){
stopSequencesSound();
var urlS=clAudio(s);
playSoundOne(urlS,'');
}
};
this.timeNextPage=function(t){//**
if(runGameOver){return false;}
if(LUDIrunPage){
LUDIrunPage=false;
setTimeout(function(){
var ip=menu_global.replace("data/page","");
ip=ip.replace(".xml","");
ip=ip.replace(langueextend,"");
ip=parseInt(ip) + 1;
LUDI.goPageUrl(ip);
},(t * 1000));
}
};
this.nextPage=function(s){//**
if(runGameOver){return false;}
if(LUDIrunPage){
LUDIrunPage=false;
var ip=menu_global.replace("data/page","");
ip=ip.replace(".xml","");
ip=ip.replace(langueextend,"");
ip=parseInt(ip) + 1;
LUDI.goPageUrl(ip);
}
};
this.nextPageIsOK=function(){//**
if(runGameOver){return false;}
var ip=menu_global.replace("data/page","");
ip=ip.replace(".xml","");
ip=ip.replace(langueextend,"");
ip=parseInt(ip) + 1;
var ur="data/page" + ip + ".xml";
if(this.pageIsOk()){
if(LUDIrunPage){
LUDIrunPage=false;
var t=setTimeout( "LUDIrunScript=false;loaddata('" + ur +  "','isok');" ,parseInt(LUDIwait + 200));
}
}else{
loaddata(ur,'isok');
}
};
this.nextPageNoNote=function(s){//**
if(runGameOver){return false;}
if(LUDIrunPage){
LUDIrunPage=false;
var ip=menu_global.replace("data/page","");
ip=ip.replace(".xml","");
ip=ip.replace(langueextend,"");
ip=parseInt(ip) + 1;
LUDI.goPageUrl(ip);
}
};
this.nextPageAnd1=function(s){//**
if(runGameOver){return false;}
if(LUDIrunPage){
LUDIrunPage=false;
var ip=menu_global.replace("data/page","");
ip=ip.replace(".xml","");
ip=ip.replace(langueextend,"");
ip=parseInt(ip) + 2;
LUDI.goPageUrl(ip);
}
};
this.lastCheckPoint=function(s){//**
if(runGameOver){return false;}
if(LUDIrunPage){
LUDI.goPageUrl(lastPageCheckPoint);
}
};
this.getNumPage=function(){
var ip=menu_global.replace("data/page","");
ip=ip.replace(".xml","");
ip=ip.replace(langueextend,"");
ip=parseInt(ip);
return ip;
}
this.getFullNbPage=function(){
if(LUDINbPageGlobal==-1){
var nbP=nbpagesD;
if(typeof dataExterneXml!=='undefined'){
nbP=0;
for(var i=0;i<800;i++){
if(pageNumExistExtXml(i)){
nbP++;
}
}
}
LUDINbPageGlobal=nbP;
return nbP;
}else{
return LUDINbPageGlobal;
}
}
this.nextPageAnd2=function(s){//**
if(runGameOver){return false;}
if(LUDIrunPage){
LUDIrunPage=false;
var ip=menu_global.replace("data/page","");
ip=ip.replace(".xml","");
ip=ip.replace(langueextend,"");
ip=parseInt(ip) + 3;
LUDI.goPageUrl(ip);
}
};
this.nextPageAnd3=function(s){//**
if(runGameOver){return false;}
if(LUDIrunPage){
LUDIrunPage=false;
var ip=menu_global.replace("data/page","");
ip=ip.replace(".xml","");
ip=ip.replace(langueextend,"");
ip=parseInt(ip) + 4;
LUDI.goPageUrl(ip);
}
};
this.nextPageAnd4=function(s){//**
if(runGameOver){return false;}
if(LUDIrunPage){
LUDIrunPage=false;
var ip=menu_global.replace("data/page","");
ip=ip.replace(".xml","");
ip=ip.replace(langueextend,"");
ip=parseInt(ip) + 5;
LUDI.goPageUrl(ip);
}
};
this.goPageDec=function(dec){//**
if(runGameOver){return false;}
if(LUDIrunPage){
LUDIrunPage=false;
var ip=menu_global.replace("data/page","");
ip=ip.replace(".xml","");
ip=ip.replace(langueextend,"");
ip=parseInt(ip) + dec;
LUDI.goPageUrl(ip);
}
};
this.GoMini=function(num){//**
if(LUDIactivePopUp>0){
closePopBarre();
LUDIactivePopUp=0;
}
var objBarre=getPopBarre(num);
var larg=objBarre.w;
var haut=objBarre.contenu2;
openWindowsLight(num,larg,haut);
execScriptLoop();
};
this.prevPage=function(s){//**
if(runGameOver){return false;}
if(LUDIrunPage){
LUDIrunPage=false;
var ip=menu_global.replace("data/page","");
ip=ip.replace(".xml","");
ip=ip.replace(langueextend,"");
ip=parseInt(ip) - 1;
if(ip!=-1){
LUDI.goPageUrl(ip);
}
}
};
this.displayLastPage=function(s){//**
if(runGameOver){return false;}
if(LUDIrunPage){
LUDIrunPage=false;
LUDI.goPageUrl(lastPage1);
}
};
this.goPage=function(ip){//**
if(runGameOver){return false;}
if(LUDIrunPage){
LUDIrunPage=false;
if(ip.length>6){
ip=pidoff[ip];
if(typeof ip === 'undefined'){
return false;
}
}
LUDI.goPageUrl(ip);
}
};
this.goPageUrl=function(ip){//**
haveANAvigation=true;
var ur="data/page" + ip + ".xml";
var t=setTimeout( "LUDIrunScript=false;loaddata('" + ur +  "','');" ,parseInt(LUDIwait + 200));
};
this.callPage=function(urlParam){//**
if(urlParam!=''){
$.ajax({
type: "GET",
url: urlParam,
cache:false,async:true,
success: function(data){},error: function(){}
});
}
};
this.topPage=function(urlParam){//**
if(urlParam!=''){
top.location.href=urlParam;
}
};
this.wait=function(s){//**
LUDIwait=LUDIwait + parseInt(s);
};
this.waitReset=function(){//**
LUDIwait=0;
};
this.ra=function(){//**
this.waitReset();
updatescore();
callSaveProgression();
}
this.uscore=function(v){//**
LUDIscore=parseInt(LUDIscore) + parseInt(v);
if(LUDIscore<0){LUDIscore=0;}
updatescore();
}
this.updateScore=function(v){//**
LUDIscore=parseInt(LUDIscore) + parseInt(v);
if(LUDIscore<0){LUDIscore=0;}
updatescore();
}
this.updateMoney=function(v){//**
LUDImoney=parseInt(LUDImoney) + parseInt(v);
if(LUDImoney<0){LUDImoney=0;}
if(LUDImoney<0){LUDImoney=0;}
}
this.updateNote=function(v){//**
N_F=N_F + parseInt(v);
if(N_F<0){N_F=0;}
}
this.updateNoteExam=function(){//**
var nb=parseInt(document.getElementById("DiapoNbDiapo").innerHTML);
var dec=0;
for(i=0; i<nb; i++){
var ctrStr=parseInt(allDiapoQuest[i]);
if(ctrStr==1){
if(initExam==0){
if(memNoteID.indexOf('p' + i + ';' )==-1){
N_T=N_T + 1;
dec=dec + 1;
}
}
if(initExam==1){
if(memNoteID.indexOf('p' + i + ';' )==-1){
if(memNoteIdExamBarre.indexOf('p' + i + ';' )!=-1){
N_T=N_T + 1;
dec=dec + 1;
}
}
}
}
}
if(dec>0){
var p='Pénalité';
if(langue!='fr'){p='Penalty';}
var rem='<span style="color:red;" >Penalty -' + dec + '</span>';
remarques=remarques + rem + '<br />';
var tempBloc=new CObjet();
tempBloc.id=999;
tempBloc.type='qcm';
chargeNoteObjectMem(tempBloc,999,dec,0,0,rem,'qcm')
}
}
this.penalty=function(p){//**
PenaltyExamBarre=PenaltyExamBarre + p;
};
this.deleteLife=function(){//**
if(runOneLife==false){
runOneLife=true;
var LIFEanim=LUDIlife - 1;
if(LIFEanim<0||LIFEanim==LUDIlifeTotal){
LIFEanim=0;
}
LUDIlife=LUDIlife - 1;
if(LUDIlife==0||LUDIlife<1){
runGameOver=true;
}
var objLife=$(".gamelife" + LIFEanim);
objLife.animate({
marginTop :'100px',
marginLeft:'-100px',
width: parseInt(LUDIlifeheight * 3) + 'px',
height: parseInt(LUDIlifeheight * 3) + 'px'
},1500, function(){
objLife.animate({
marginTop :'0px',
opacity: 0.1
},500, function(){
objLife.css("display","none");
runOneLife=false;
if(LUDIlife==0||LUDIlife<1){
if(LUDIrunPage){
LUDIrunPage=false;
runGameOver=true;
var ur="data/page" + LUDIlifegameover + ".xml";
var t=setTimeout( "LUDIrunScript=false;loaddata('" + ur +  "','');runGameOver=false;" ,parseInt(LUDIwait + 100));
}
}
});
});
}
};
this.addLife=function(){//**
if(runOneLife==false){
runOneLife=true;
if(LUDIlife<LUDIlifeTotal){
var LIFEanim=LUDIlife;
if(LIFEanim<0||LIFEanim==LUDIlifeTotal){
LIFEanim=0;
}
var objLife=$(".gamelife" + LIFEanim);
LUDIlife=LUDIlife + 1;
objLife.css("margin-top","0px");
objLife.css("margin-left","0px");
objLife.css("width","10px");
objLife.css("height","10px");
objLife.css("display","");
objLife.animate({
width: parseInt(LUDIlifeheight * zoom) + 'px',
height: parseInt(LUDIlifeheight * zoom) + 'px',
opacity: 0.9
},300, function(){
runOneLife=false;
});
}
}
};
this.getValueInput=function(s){//**
var txt=$("." + s).val();
txt=parseTxt(txt);
if(txt==''){
txt=$("." + s + "inner").html();
txt=parseTxt(txt);
}
allaysOnTop();
return txt;
};
this.getNumberInput=function(s){//**
var txt=$("." + s).val();
txt=parseTxt(txt);
if(txt==''){
txt=$("." + s + "inner").html();
txt=parseTxt(txt);
}
allaysOnTop();
return parseFlo(txt);
};
this.QcmControl= function(s,li){//**
var bret=false;
$("." + s + ' .cochecase tr td').each(function(index){
if($(this).html()=="X"){
if(li.indexOf(index + ';')!=-1){
bret=true;
}else{
bret=false;
}
}
});
return bret;
};
this.inputControl= function(s,val1,val2){//**
var txt=$("." + s).val();
txt=parseTxt(txt);
if(txt==''){
txt=$("." + s + "inner").html();
txt=parseTxt(txt);
}
var valObj=parseFlo(txt);
var bol=false;
if(valObj==parseFlo(val1)&&parseFlo(val1)==parseFlo(val2)){
bol=true;
}else{
if(valObj>parseFlo(val1)&&valObj<parseFlo(val2)){
bol=true;
}
}
return bol;
};
this.getValueQcm=function(s){//**
var txt="";
$("." + s + ' .qcmn').each(function(index){
if($(this).html()=="X"){
var recolteW=$(this).attr('name');
recolteW=findTxtStockQ(recolteW);
recolteW=recolteW.replace('*', '');
txt=txt + recolteW;
}
});
$("." + s + ' .qcmx').each(function(index){
if($(this).html()=="X"){
var recolteW=$(this).attr('name');
recolteW=findTxtStockQ(recolteW);
recolteW=recolteW.replace('*', '');
txt=txt + recolteW;
}
});
return txt;
};
this.getValueSelect=function(s){//**
var txt=$(".tcm" + s).find('select').val();
txt=parseTxt(txt);
return txt;
};
this.setValueSelect=function(s,txt){//**
$(".tcm" + s).find('select').val(txt);
};
this.setValueTxt=function(s,txt){
if(LUDIwait==0){
$("." + s + "inner").html(txt);
$("." + s + " tbody tr td").html(txt);
$("a." + s).html(txt);
}else{
var t=setTimeout( '$(".' + s + 'inner").html("' + txt + '");' ,parseInt(LUDIwait + 200));
}
};
this.fadeIn=function(s){
if(LUDIwait==0){
this.fadeInProcess(s);
}else{
var t=setTimeout( "LUDI.fadeInProcess('" + s +  "');" ,parseInt(LUDIwait + 200));
}
};
this.fadeInProcess=function(s){
$("." + s).css({ opacity: 1 }).css("margin-top", "0px");
var i=0;
for(i; i < CObjets_count; i++){
var obj=CObjets[i];
if(obj.idscript==s){
var sid=".bloc" + obj.id +",.alterbloc" + obj.id;
$(sid).css({ opacity: 1 }).css("margin-top","0px").css("margin-left","0px");
}
}
allaysOnTop();
};
this.fadeOut=function(s){
if(LUDIwait==0){
this.fadeOutProcess(s);
}else{
var t=setTimeout( "LUDI.fadeOutProcess('" + s +  "');" ,parseInt(LUDIwait + 200));
}
};
this.fadeOutProcess=function(s){
$("." + s).css({ opacity: 0 }).css("margin-top", "1000px");
var i=0;
for(i; i < CObjets_count; i++){
var obj=CObjets[i];
if(obj.idscript==s){
var sid=".bloc" + obj.id +",.alterbloc" + obj.id;
$(sid).css({ opacity: 0 }).css("margin-top", "-1000px");
}
}
};
this.changeSrcVideo=function(s,url){
var i=0;
for(i; i < CObjets_count; i++){
var obj=CObjets[i];
if(obj.idscript==s){
if(obj.type=='videohtml'||obj.type=='ludiplayerhtml'){
var videoObj;
if(document.getElementById('video' + s)){
videoObj=document.getElementById('video' + s);
}else{
if(document.getElementById('video' + i)){
videoObj=document.getElementById('video' + i);
}
}
if(videoObj){
if(videoObj.pause){
videoObj.pause();
}
var source=document.getElementById('srcvid' + s);
if(source){
source.setAttribute('src',url);
if(videoObj.load){
videoObj.load();
}
}else{
var source=document.createElement('source');
source.src=url;
source.type='video/mp4';
source.id='srcvid' + s;
videoObj.appendChild(source);
logBilan("create source :  " + s);
}
}else{
logBilan("changeSrcVideo : video object " + s + " not find !");
}
}
}
}
};
this.playSrcVideo=function(s){
var i=0;
for(i; i < CObjets_count; i++){
var obj=CObjets[i];
if(obj.idscript==s){
if(obj.type=='videohtml'||obj.type=='ludiplayerhtml'){
var videoObj;
if(document.getElementById('video' + s)){
videoObj=document.getElementById('video' + s);
}else{
if(document.getElementById('video' + i)){
videoObj=document.getElementById('video' + i);
}
}
if(videoObj){
if(videoObj.pause){
videoObj.pause();
}
if(videoObj.play){
videoObj.play();
sdn('.init' + i);
}else{
logBilan("playSrcVideo : video object " + s + " not play !");
}
}else{
logBilan("playSrcVideo : video object " + s + " not find !");
}
}
}
}
};
this.getScore=function(s){
recalculAllNoteByPersistence();
var prc=0;
try{
if(N_T!=0&&N_F!=0){
prc=parseInt((N_F / N_T) * 100);
if(prc<0){prc=0;}
}
}catch(err){
prc=0;
}
return prc;
};
this.scoreIsMin=function(s){//**
var rf=false;
var cs=LUDI.getScore();
if(cs>s||cs==s){
rf=true;
}
return rf;
};
this.scoreIsMax=function(s){//**
var rf=false;
var cs=LUDI.getScore();
if(cs<s){
rf=true;
}
return rf;
};
this.changeTeam=function(){//**
if(EquipMapMAX>0){
if(EquipMapMAX==1){
if(EquipMapTarg==1){
EquipMapTarg=0;
}else{
EquipMapTarg=1;
}
}
}
};
this.ResetGame=function(){
runGameOver=true;
if(LUDIlifeNoReload==0){
LUDIlife=LUDIlifeTotal;
if(LUDIlife<1){
LUDIlife=1;
}
}
};
this.Reset=function(){//**
initializeDomaines();
CObjetMems=new Array();
CObjetMems_count=0;
ViewerAfterBilan=false;
ViewerAfterBilanList="";
learnerName="";
Variable1="";
Variable2="";
Variable3="";
Variable4="";
Variable5="";
Variable6="";
Variable7="";
Variable8="";
Variable9="";
Variable10="";
EquipMapTarg=0;
LUDI.goPage(0);
};
this.reverseTeam=function(c){//**
ObjectifMapTarget[EquipMapTarg]=ObjectifMapTarget[EquipMapTarg] - c;
if(ObjectifMapTarget[EquipMapTarg]<0){
ObjectifMapTarget[EquipMapTarg]=0;
}
};
this.reverseTeamAndAnim=function(c){//**
ObjectifMapTarget[EquipMapTarg]=c;
var i=0;
for(i; i < CObjets_count; i++){
var Vobj= CObjets[i];
if(Vobj.type=='maptarget'){
reculeMapTargetID(i);
animMapTarget(Vobj.id);
}
}
};
this.simulateDice=function(c){//**
ObjectifMapTarget[EquipMapTarg]=ObjectifMapTarget[EquipMapTarg] + c;
RunActionDice=true;
};
this.processNoteMemory=function(name,FinalScore,TotalScore,Domaine,Remark){//**
if(AutoSavePersistence==0){return false;}
var ip=menu_global.replace("data/page","");
ip=ip.replace(".xml","");
ip=ip.replace(langueextend,"");
ip=parseInt(ip);
var idGlobal= ip + "obj" + name;
var detect=false;
var objG;
for(var i=0; i < CObjetMems_count; i++){
if(CObjetMems[i].idGlobal==idGlobal){
detect=true;
objG=CObjetMems[i];
}
}
var bilansource='<div class="blockbilan" >';
bilansource=bilansource + '<div class="questbilan" >-prv-' + name + '</div>';
bilansource=bilansource + '<ul>';
bilansource=bilansource + '<li>' + FinalScore + '/' + TotalScore + '</li>';
bilansource=bilansource + '</ul>-cmt-</div>';
if(FinalScore<TotalScore){
bilansource=bilansource.replace('-prv-','<span style="color:red;" >&#9632;&nbsp;</span>');
bilansource=bilansource.replace('-cmt-','<span style="color:red;" >' + Remark + '</span>');
}else{
bilansource=bilansource.replace('-prv-','<span style="color:green;" >&#9632;&nbsp;</span>');
bilansource=bilansource.replace('-cmt-','<span style="color:green;" >' + Remark + '</span>');
}
if(detect==false){
var tempObjectMem=new CObjetMem();
tempObjectMem.numPage=ip;
tempObjectMem.idGlobal=idGlobal;
tempObjectMem.type='input';
tempObjectMem.note_T=TotalScore;
tempObjectMem.note_F=FinalScore;
tempObjectMem.domaine=Domaine;
tempObjectMem.remarque=Remark;
tempObjectMem.bhtml=bilansource;
CObjetMems_Add(tempObjectMem);
}else{
objG.type='input';
objG.note_T=TotalScore;
objG.note_F=FinalScore;
objG.domaine=Domaine;
objG.remarque=Remark;
objG.numPage=ip;
objG.bhtml=bilansource;
}
};
this.createImg=function(url,x,y,w,h){//**
var t=this.createBase('img');
t.x=x;t.y=y;t.w=w;t.h=h;
t.src='fx/close.png';
if(url!=''){t.src=url;}
CObjets_Add(t);
};
this.inacEle=function(obj){//**
$(obj).css("opacity","0.5");
$(obj).off('click');
obj.disabled=true;
};
this.randomId=function(){//**
function s5(){
return Math.floor((1 + Math.random()) * 0x10000)
.toString(16)
.substring(1);
}
return s5()+s5()+'-'+s5()+'-'+s5()+'-'+s5()+'-'+s5()+s5()+s5();
};
this.guid=function(){//**
return this.randomId();
};
this.createBase=function(type){//**
var t=new CObjet();
t.idscript='';
t.strscript='';t.type=type;t.text='';t.url='';t.data='';t.align='';
t.initialtext='';t.color='black';t.css='';
t.contenu7='';
t.fontsize=18;
t.x=0;t.y=0;
t.w=40;t.h=40;
t.x2=0;t.y2=0;
t.w2=40;t.h2=40;
t.an=1;
t.de=0;
t.cssadd='';
t.di=0;
t.dedi=0;
t.ind=2;
t.create=0;
t.boite='';
t.linkcontenu= '';
t.linkimage= '';
t.linkx= '';
t.linky= '';
t.field1= '';
t.field2= '';
t.field3= '';
t.field4= '';
t.AnimClic=0;
return t;
};
this.printScreen=function(){//**
LudiPrintScreenDiv();
};
this.forceAvatarSkin=function(src){//**
srcHeroGlob=src;
};
}
var LUDI=new oelengine();
var OpEl=new oelengine();
function LUDIrotateAll(id,rot){
var i=0;
for(i; i < CObjets_count; i++){
if(CObjets[i].idscript==id){
var Vobj= CObjets[i];
Vobj.rotation=rot;
if(rotateIE()){
degreeToWEBMatrix(Vobj,Vobj.rotation);
degreeToIEMatrix(Vobj,Vobj.rotation);
}else{
rotationObjetPlug('.' + Vobj.idscript,Vobj.rotation);
}
}
}
}
function rotateIE(){
var oldnav=false;
if(navigator.userAgent.toUpperCase().indexOf("TRIDENT/5.0") != -1){
oldnav=true;
}
if(navigator.userAgent.toUpperCase().indexOf("TRIDENT/4.0") != -1){
oldnav=true;
}
if(navigator.userAgent.toUpperCase().indexOf("TRIDENT/3.0") != -1){
oldnav=true;
}
if(navigator.userAgent.toUpperCase().indexOf("MSIE 6.0") != -1){
oldnav=true;
}
return oldnav;
}
function updatescore(){
var i=0;
for(i; i < CObjets_count; i++){
var Vobj= CObjets[i];
if(Vobj.type=='text'){
if(Vobj.initialtext.indexOf('{score}')!=-1){
var nh=Vobj.initialtext.replace('{score}',LUDIscore);
$("#innerbloc" + Vobj.id).html(nh);
}
if(Vobj.initialtext.indexOf('{time}')!=-1){
var tim=MillisecondsToTime((new Date()).getTime() - ScormStartTime);
var nh=Vobj.initialtext.replace('{time}', tim);
$("#innerbloc" + Vobj.id).html(nh);
}
}
if(Vobj.type=='textimg'){
if(Vobj.initialtext.indexOf('{score}')!=-1){
var nh=Vobj.initialtext.replace('{score}',LUDIscore);
$("#innerbloc" + Vobj.id).html(nh);
}
}
}
}
function LUDItranslateAll(id,x,y){
var i=0;
for(i; i < CObjets_count; i++){
if(CObjets[i].idscript==id){
var Vobj= CObjets[i];
LUDItranslate(Vobj,x,y);
}
}
}
var translatePreventContext="";
function LUDItranslate(Vobj,x,y){
Vobj.objx=x;
Vobj.objy=y;
translatePreventContext=translatePreventContext + '@' + Vobj.idscript + LUDI.getNumPage() + '@';
animLUDItranslate(Vobj);
}
function animLUDItranslate(obj){
if(translatePreventContext.indexOf('@' + obj.idscript + LUDI.getNumPage() + '@')!=-1){
var angleLUDI=0;
try{
angleLUDI=getAngle(obj.getX(),obj.getY(),obj.objx,obj.objy);
}catch(err){}
var dist=distancepyta(obj.objx,obj.objy,obj.getX(),obj.getY());
var deplace=parseInt(LUDIspeed * zoom);
if(dist>LUDIspeed){
var evolx=parseFloat(obj.getX()) + ((deplace) * Math.cos(angleLUDI));
var evoly=parseFloat(obj.getY()) + ((deplace) * Math.sin(angleLUDI));
obj.setX(evolx);
obj.setY(evoly);
var ex=parseInt(obj.getX() * zoom);
var ey=parseInt(obj.getY() * zoom);
$(".bloc" + obj.id).css("left",ex + 'px').css("top",ey + 'px');
zoomBoite(obj);
if(LUDIrunScript){
var t=setTimeout(function(){animLUDItranslate(obj);},50);
}
}
}
if(dist<=LUDIspeed){
obj.setX(obj.objx);
obj.setY(obj.objy);
var ex=parseInt(obj.getX() * zoom);
var ey=parseInt(obj.getY() * zoom);
$(".bloc" + obj.id).css("left",ex + 'px').css("top",ey + 'px');
zoomBoite(obj);
}
}
var tabAnimContext="";
function LUDItranslateAllobj(id1,id2,speed){
var i=0;
var VobjDesti;
for(i; i < CObjets_count; i++){
var ctridscript=CObjets[i].idscript;
if(ctridscript!=""){//**
if(ctridscript==id2){//**
VobjDesti= CObjets[i];
}
}
}
if(typeof VobjDesti === 'undefined'){
return false;
}
i=0;
for(i; i < CObjets_count; i++){
if(CObjets[i].idscript==id1){
var Vobj= CObjets[i];
var distOrigin=distancepyta(VobjDesti.getX()+(VobjDesti.getW()/2),VobjDesti.getY()+(VobjDesti.getH()/2),Vobj.getX()+(Vobj.getW()/2),Vobj.getY()+(Vobj.getH()/2));
var wOrigin=parseInt(Vobj.getW()-VobjDesti.getW());
var hOrigin=parseInt(Vobj.getH()-VobjDesti.getH());
var idactionAnim=LUDI.randomId();
tabAnimContext += idactionAnim;
if(distOrigin>1){
animLUDItslObj(Vobj,VobjDesti.getX(),VobjDesti.getY(),VobjDesti.getW(),VobjDesti.getH(),speed,distOrigin,wOrigin,hOrigin,idactionAnim);
}
}
}
}
function animLUDItslObj(obj,objx,objy,objw,objh,speed,distOrigin,wOrigin,hOrigin,idactionAnim){
if(tabAnimContext.indexOf(idactionAnim)==-1){
return false;
}
var angleLUDI=0;
try{
var p1x=obj.getX() + parseInt(obj.getW()/2);
var p1y=obj.getY() + parseInt(obj.getH()/2);
var p2x=objx + parseInt(objw/2);
var p2y=objy + parseInt(objh/2);
angleLUDI=getAngle(p1x,p1y,p2x,p2y);
}catch(err){}
var dist=distancepyta(p2x,p2y,p1x,p1y);
var pourcWh=(dist/distOrigin);
var DistSpeed=5;
if(speed==1){
DistSpeed=8;
}
if(speed==2){
DistSpeed=16;
}
if(speed==3){
DistSpeed=24;
}
var deplace=parseInt(DistSpeed * zoom);
if(dist>DistSpeed){
var evolW=parseInt(objw + (wOrigin * pourcWh));
obj.setW(evolW);
var evolH=parseInt(objh + (hOrigin * pourcWh));
obj.setH(evolH);
var midW= parseInt(evolW/2);
var midH= parseInt(evolH/2);
var evolx=parseFloat(obj.getX()+midW) + ((deplace) * Math.cos(angleLUDI));
var evoly=parseFloat(obj.getY()+midH) + ((deplace) * Math.sin(angleLUDI));
obj.setX(evolx-midW);
obj.setY(evoly-midH);
var ex=parseInt(obj.getX() * zoom);
var ey=parseInt(obj.getY() * zoom);
var ew= parseInt(obj.getW() * zoom);
var eh= parseInt(obj.getH() * zoom);
$(".bloc" + obj.id).css("left",ex + 'px').css("top",ey + 'px');
$(".bloc" + obj.id).css("width",ew + 'px');
$(".bloc" + obj.id).css("height",eh + 'px');
zoomBoite(obj);
if(LUDIrunScript){
var ti=50;
var t=setTimeout(function(){animLUDItslObj(obj,objx,objy,objw,objh,speed,distOrigin,wOrigin,hOrigin,idactionAnim);},ti);
}
}
if(dist<=(DistSpeed+1)){
obj.setX(objx);
obj.setY(objy);
obj.setW(objw);
obj.setH(objh);
var ex=parseInt(obj.getX() * zoom);
var ey=parseInt(obj.getY() * zoom);
$(".bloc" + obj.id).css("left",ex + 'px').css("top",ey + 'px');
var ew=parseInt(obj.getW() * zoom);
var eh=parseInt(obj.getH() * zoom);
$(".bloc" + obj.id).css("width",ew + 'px').css("height",eh + 'px');
zoomBoite(obj);
}
}
function parseTxt(str){
if(typeof(str) == 'undefined'){str='';}
if(str === null){str='';}
return str;
}
function getAnglePrecise(p1x,p1y,p2x,p2y){
var delta_x=p2x - p1x;
var delta_y=p2y - p1y;
var theta_radians= Math.atan2(delta_y, delta_x);
return theta_radians;
}
function LudiPrintScreenDiv(){
var mywindow=window.open('', 'PRINT', 'height=600,width=800');
mywindow.document.write('<html><head><title>Export</title>');
mywindow.document.write('</head><body >');
var printcontent=$('#main').clone();
mywindow.document.write(printcontent.html());
mywindow.document.write('</body></html>');
mywindow.focus(); // necessary for IE >= 10*/
mywindow.print();
mywindow.close();
}
var lexiquePosX=0;
var lexiquePosY=0;
var lexiqueLoadAll=0;
var lexiqueObject;
function ShowLexique(id){
if(lexiqueLoadAll==0){
lexiqueLoadAll=1;
loadLexiques();
}
lexiqueObject=getElementLexique(id);
var Ecran=document.getElementById("main");
var hm='<div class="lexiqueContent" style="overflow:hidden;" >';
hm += '<p class="lexiqueTitle" >' + lexiqueObject.term + '</p>';
hm += '<p>' + lexiqueObject.resume + '</p>';
hm += '</div>';
hm += '<a class="addLexique" onClick="ShowLexiqueLarg();" ></a>';
hm += '<a class="delLexique" onClick="$(\'#lexiqueBox\').fadeOut()" ></a>';
if(!document.getElementById("lexiqueBox")){
var h='<div id="lexiqueBox" class="lexiqueBox" >';
h += hm;
h += '</div>';
$("#main").append(h);
}else{
$("#lexiqueBox").empty();
$("#lexiqueBox").append(hm);
}
var $this=$(this);
var lx= parseInt($("body").width()  - (largEcranWidth *zoom))/2;
var ly= parseInt($("body").height() - (largEcranHeight *zoom))/2;
lexiquePosX=parseInt(parseInt(xcoord - lx) - 80);
lexiquePosY=parseInt(parseInt(ycoord - ly) + 25);
if(lexiquePosX<1){lexiquePosX=1;}
if(lexiquePosX+210>parseInt(largEcranWidth*zoom)){
lexiquePosX=parseInt(largEcranWidth*zoom) - 210;
}
$("#lexiqueBox").removeClass("lexiqueBox lexiqueBoxBottom");
if(lexiquePosY<parseInt((largEcranHeight *zoom)/2)){
$("#lexiqueBox").addClass("lexiqueBox");
$("#lexiqueBox").css("top" , lexiquePosY + "px");
}else{
$("#lexiqueBox").addClass("lexiqueBoxBottom");
$("#lexiqueBox").css("top" , parseInt(lexiquePosY - 250) + "px");
}
$("#lexiqueBox").css("left", lexiquePosX + "px");
$("#lexiqueBox").css("width","200px").css("height","200px");
$("#lexiqueBox").css("display","none");
$("#lexiqueBox").slideDown();
setTimeout(function(){ $(".delLexique").fadeIn(); }, 2000);
}
function ShowLexiqueLarg(){
var hm='<div class="lexiqueContentLarg" style="overflow:auto;" >';
hm += '<p>' + lexiqueObject.detail + '</p>';
hm += '</div>';
hm += '<a class="delLexique" onClick="$(\'#lexiqueBox\').fadeOut()" ></a>';
if(lexiquePosY<parseInt((largEcranHeight *zoom)/2)){
$("#lexiqueBox").animate({width: "300px",height: "300px"});
}else{
$("#lexiqueBox").animate({width: "300px",height: "300px",
"top" : parseInt(lexiquePosY - 350) + "px"});
}
if(lexiquePosX+310>parseInt(largEcranWidth*zoom)){
lexiquePosX=parseInt(largEcranWidth*zoom) - 310;
$("#lexiqueBox").animate({"left":lexiquePosX+"px"});
}
document.getElementById("lexiqueBox").innerHTML=hm;
$(".addLexique").css("display","none");
setTimeout(function(){ $(".delLexique").fadeIn(); }, 3000);
}
function loadLexiques(){
if(localExec()){
var data=doff['lexique'];
openLexiqueXML(data);
}else{
var d=new Date();
var n=d.getMinutes();
$.ajax({
type: "GET",
url: 'data/lexique.xml',
dataType: (isMsie()) ? "text" : "xml",
cache:true,async:false,
success: function(data){
openLexiqueXML(data);
},
error: function(){}
});
}
}
function CLexique(){
this.id;
this.idRef;
this.term;
this.resume;
this.detail;
this.refs;
}
var CLexiques=new Array();
var CLexique_count=0;
function CLexiques_Add(Elem){
Elem.id=CLexique_count;
CLexiques.push(Elem);
CLexique_count=CLexique_count +1;
}
function openLexiqueXML(data){
if(data==''){
return false;
}
CLexiques=new Array();
CLexique_count=0;
var xml_p;
if(typeof data == "string"){
xml_p=StringtoXML(data);
}else{
xml_p=data;
}
$(xml_p).find('lexique').each(function(){
var tempBloc=new CLexique();
tempBloc.idRef=$(this).find('ID').text();
tempBloc.term=$(this).find('term').text();
tempBloc.resume=$(this).find('resumeStr').text();
tempBloc.detail=$(this).find('detail').text();
tempBloc.refs=$(this).find('refs').text();
CLexiques_Add(tempBloc);
});
}
function getElementLexique(id){
for(var i=0; i < CLexique_count; i++){
if(CLexiques[i].idRef==id){
return CLexiques[i];
}
}
return  new CLexique();
}
var globalSound=1;
var globalMusic=1;
function launchPara(){
if(!document.getElementById("parametrebox")){
var h='<div id="parametreOpac" onClick="closePara()" ></div>';
h += '<div id="parametrebox" >';
h += '<div id="parametreinner" >';
h += innerParametres() + '</div></div>';
$("#main").append(h);
}
$("#parametrebox ,#parametreOpac").css("display","block")
}
function closePara(){
$("#parametrebox,#parametreOpac,.parametreAll").css("display","none")
}
function innerParametres(){
var h='<h1>PARAMETRES</h1>';
h += '<table style="" ><tbody>';
h += '<tr>';
h += '<td style="cursor: pointer; text-align: center; width:36px; height:36px;">';
h += '<div style="position:relative;z-index:0;width:36px;height:36px;" >';
h += '<img onClick="checkMusic();" class="imgMusic" src="fx/qcm/check' + globalMusic + '.png" ';
h += ' style="width:36px;height:36px;cursor:pointer;" />';
h += '</div>';
h += '</td>';
h += '<td onClick="checkMusic();" class="selectqcmline" style="text-align:left;padding-left:10px;" >';
h += 'Musique</td>';
h += '</tr>';
h += '<tr>';
h += '<td style="cursor: pointer; text-align: center; width:36px; height:36px;">';
h += '<div style="position:relative;z-index:0;width:36px;height:36px;" >';
h += '<img onClick="checkSound();" class="imgSound"  src="fx/qcm/check' + globalSound + '.png" ';
h += ' style="width:36px;height:36px;cursor:pointer;" />';
h += '</div>';
h += '</td>';
h += '<td onClick="checkSound();" class="selectqcmline" style="text-align:left;padding-left:10px;" >';
h += 'Effets Audio</td>';
h += '</tr>';
h += '</tbody></table>';
return h;
}
function checkMusic(){
if(globalMusic==0){
globalMusic=1;
}else{
globalMusic=0;
}
$('.imgMusic').attr('src','fx/qcm/check' + globalMusic + '.png');
}
function checkSound(){
if(globalSound==0){
globalSound=1;
}else{
globalSound=0;
}
$('.imgSound').attr('src','fx/qcm/check' + globalSound + '.png');
}
function launchLangChoice(){
$('#langbox').fadeIn();
}
function redirLang(lg){
$('#langbox').fadeOut();
var ext=lg;
if(langueextend!=ext){
if(haveLocalFileUrl()){
if(ext==""){
window.location.href= "index.html";
}else{
window.location.href= "index.html#langueextend" + ext;
}
}else{
if(window.location.href.indexOf(".php")!=-1){
window.location.href= "index.php?lg=" + ext;
}else{
window.location.href= "index.html?lg=" + ext;
}
}
}
}
var langG="";
function chgLg(lgCode){
langG=lgCode;
var np=LUDI.getNumPage();
LUDIrunPage=true;
menu_global="";
LUDI.goPage(np);
}
function trLg(lg){
if(langG!=''){
var tradObj=baseTradOff[langG];
var findTradObj=false;
if(typeof(tradObj) != 'undefined'){
var globKey=cleanAccentsForKey(lg.toLowerCase());
var trad=tradObj[globKey];
if(typeof(trad) == 'undefined'){trad='';}
if(trad!=''){
lg=trad;
findTradObj=true;
}
if(findTradObj==false){
var simplekey=createSimpleKey(lg);
trad=tradObj[simplekey];
if(typeof(trad) == 'undefined'){trad='';}
if(trad!=''){
lg=trad;
findTradObj=true;
}
}
}else{
alert("traductor-"+langG+" error");
langG="";
}
}
return lg;
}
function createSimpleKey(s){
s=cleanAccentsForKey(s);
s=s.substring(0,40);
return s;
}
function cleanAccentsForKey(s){
s=s.replace(/(<([^>]+)>)/gi, "");
s=s.toLowerCase();
s=s.replace(/'/g,"");
s=s.replace(/&rsquo;/g,"");
s=s.replace(/&apos;/g,"");
s=s.replace(/&eacute;/g,"");
s=s.replace(/é/g,"");
s=s.replace("(","");
s=s.replace("(","");
s=s.replace("(","");
s=s.replace(")","");
s=s.replace(")","");
s=s.replace(")","");
s=s.replace("<p>","");
s=s.replace("</p>","");
s=s.replace(/\./g,"");
s=s.replace(/,/g,"");
return s;
}
var callXapiScore=0;
function SetXapiScore(success,score_raw){
if(callXapiScore==0){
callXapiScore=1;
if('function' == typeof(openelearningFinishActivity)){
var duration=MillisecondsToTimeXapi((new Date()).getTime() - ScormStartTime);
var activityId="";
var title="";
try{
if(document.getElementById("xapiActivityID")){
activityId=document.getElementById("xapiActivityID").innerHTML;
}
}catch(e){}
try{
if(document.getElementById("xapiTitle")){
title=document.getElementById("xapiTitle").innerHTML;
}
}catch(e){}
var login='';
openelearningFinishActivity(login,activityId,title,success,duration,score_raw);
}
}
}
var callXapiEnd=0;
function SetXapiEnd(score_raw){
if(callXapiEnd==0){
callXapiEnd=1;
var duration=0;
try{
duration=parseInt((new Date()).getTime() - ScormStartTime);
}catch(e){}
var activityId="";
var title="";
try{
if(document.getElementById("xapiActivityID")){
activityId=document.getElementById("xapiActivityID").innerHTML;
}
}catch(e){}
try{
if(document.getElementById("xapiTitle")){
title=document.getElementById("xapiTitle").innerHTML;
}
}catch(e){}
var login=getLoginNameUnik();
if('function' == typeof(openelearningFinishAll)){
openelearningFinishAll(login,activityId,title,duration,score_raw);
}
if(document.getElementById("linkParams")){
var obnote=document.getElementById("linkParams");
var linkP='?h=1&r=finish&l=' + login + '&a=' + activityId + '&d=' + duration + '&s=' + score_raw ;
obnote.innerHTML=linkP;
}
}
}
function SetXapiScreen(tempScore,tempScoreMax,tempAnnotations,tempBilanXML){
var duration=0;
try{
duration=parseInt((new Date()).getTime() - screenTime);
}catch(e){}
var activityId="";
var title="";
try{
if(document.getElementById("xapiActivityID")){
activityId=document.getElementById("xapiActivityID").innerHTML;
}
}catch(e){}
try{
if(document.getElementById("xapiTitle")){
title=document.getElementById("xapiTitle").innerHTML;
}
}catch(e){}
var login=getLoginNameUnik();
var pageId=parseInt(lastPage1);
if('function' == typeof(openelearningFinishScreen)){
openelearningFinishScreen(login,activityId,pageId,title,duration,tempScore,tempScoreMax,tempAnnotations,tempBilanXML);
}
if(document.getElementById("linkParams")){
var obnote=document.getElementById("linkParams");
var linkP='?h=0&r=screen&l=' + login + '&a=' + activityId + '&p=' + pageId + '&d=' + duration + '&s=' + tempScore + '&t=' + tempScoreMax;
obnote.innerHTML=linkP;
}
}
function SetXapiInteraction(n,obj,duration,result,answer,correctAnswer){
var a=parseTxt(answer);
if(a!=''){
interactLogs += parseTxt(obj.idscript) + "-(" + a + ")";
}
if('function' == typeof(ScormInteractionCom)){
var idscript=parseTxt(obj.idscript);
var description=parseTxt(obj.idscript);
if(obj.type=='qcm'){
if(obj.contenu3!=''){
description=netH(obj.contenu3);
description=description.replace(/'/g,'');
}
}
ScormInteractionCom(n,idscript,parseTxt(obj.type),duration,result,parseTxt(answer),description,parseTxt(correctAnswer));
interactionNumber=interactionNumber + 1 ;
}
}
function MillisecondsToTimeXapi(Seconds){
Seconds=Math.round(Seconds/1000);
var S=Seconds % 60;
Seconds -= S;
if(S < 10){S='0' + S;}
var M=(Seconds / 60) % 60;
if(M < 10){M='0' + M;}
var H=Math.floor(Seconds / 3600);
if(H < 10){H='0' + H;}
return H + ':' + M + ':' + S;
}
function getLoginNameUnik(){
var rt='';
if('function' == typeof(CheckLMSLearnerName)){
var vln=CheckLMSLearnerName();
if(vln!=''){
rt=vln;
}
}
if(rt==''){
rt=Variable1;
}
return rt;
}
function backToHome(){
var findHomeAction=false;
var parentHomeCourse=window.top.$("#home-course");
if(parentHomeCourse.length==1){
if(window.parent && window.parent.API){
var redirHref=parentHomeCourse.attr("href");
var InitURL=window.parent.location.href;
if(InitURL.indexOf('lp_controller.php?')!=-1
&&redirHref.indexOf('http')==-1){
var partUrl=InitURL.split('?');
partUrl[0]=partUrl[0].replace('lp_controller.php','');
redirHref=partUrl[0] + redirHref;
setTimeout(function(){
window.parent.location.href=redirHref;
},700);
window.parent.API.save_asset();
parentHomeCourse.trigger('click');
findHomeAction=true;
}
}
}
if(findHomeAction==false){
var parentScormPage=window.top.$("#scormpage");
if(parentScormPage.length==1){
var redirHref=parentScormPage.parent().find('a').first().attr("href");
var InitURL=window.parent.location.href;
if(InitURL.indexOf('scorm')!=-1
&&redirHref.indexOf('http')!=-1){
setTimeout(function(){
window.parent.location.href=redirHref;
},700);
findHomeAction=true;
}
}
}
}
var getcoinid='';
var lastcoinid='';
var memcoinid='';
function install_learningcoins(obj){
var idlc=obj.id + 'lc' + LUDI.getNumPage() + obj.idscript ;
getcoinid='';
if(localStorage){
getcoinid=window.localStorage.getItem(idlc);
if(typeof getcoinid == 'undefined'){ getcoinid=''; }
if(getcoinid == 'undefined'){ getcoinid=''; }
if(getcoinid === null){ getcoinid=''; }
}
if(memcoinid.indexOf(idlc)!=-1){
getcoinid=1;
}
var h='<img data-id="' + idlc + '" ' ;
h += ' id="bloc' + obj.id + '" class="haveflou unselectable bloc' + obj.id + ' ' + obj.idscript + '" ';
h += ' src="fx/lc-flat.png" ';
if(getcoinid!=''){
h += ' style="display:none;opacity:0;margin-top:-1500px;margin-left:-1500px;visibility:hidden;" ';
}else{
h += ' style="cursor:pointer;" ';
h += ' onClick="getLearningC(\'' + idlc + '\',\'' + obj.idscript + '\');" ';
}
h += ' />';
addToMobj(h,obj)
}
function getLearningC(lcid,idscript){
if(lcid!=lastcoinid&&memcoinid.indexOf(lcid)==-1){
memcoinid=memcoinid + ';' + lcid+ ';';
lastcoinid=lcid;
if(localStorage){
window.localStorage.setItem(lcid,'1');
}
LUDImoney=LUDImoney + 1;
$("." + idscript).css("display","none");
$("." + idscript).animate({
width: '0px',
marginTop:'-20px',
marginLeft:'20px'
},400,function(){
$("." + idscript).css("display","none");
});
if(!haveLocalFileUrl()){
var havelms=false;
if(typeof(API.save_asset)!= "undefined"){
var olms=parent.olms;
if(olms.lms_item_type=='sco'){
havelms=true;
var lk='../../../../plugin/chalkboard_tools/';
lk += "plug/ajaxprocess/ajax.get_l_coins.php" ;
lk += "?item_id=1&lp_id="+lcid+"&&session_id=0&pc=1";
$.ajax({
url: lk
}).done(function(){
logconsole("lc:" + lcid);
}).error(function(){
lk='../' + lk;
$.ajax({
url: lk
}).done(function(){
logconsole("lc:" + lcid);
});
});
}
}
if(havelms==false){
if(typeof(window.parent.M) != "undefined"){
if(typeof(window.parent.M.cfg.wwwroot) != "undefined"){
var lk=window.parent.M.cfg.wwwroot + '/mod/openelearningstudio/chalkboard_tools/plug/ajaxprocess/ajax.get_l_coins.php' ;
lk += "?baseid=1&lcid="+lcid+"&&session_id=0&pc=1";
$.ajax({
url: lk
}).done(function(){
logconsole("lc:" + lcid);
});
}
}
}
}
}
}
function installDevWin(){
var wlog=getParamValue("log");
if(document.getElementById("havelogw")){
wlog=1;
}
if(getAnchorValue().indexOf("log")!=-1){
wlog=1;
}
if(wlog==1){
if(!document.getElementById("actionDevWin")){
var h='<div id="actionDevWin" onClick="showActionDevWin();" ';
h += ' class="actionDevWin noselect" >&#9881;</div>';
h += '<div class="actionDevWinZone" ></div>';
$("body").append(h);
setTimeout("refreshDevWin()",500);
}
}
}
var closeDevWin=0;
function showActionDevWin(){
if(closeDevWin==0){
closeDevWin=1;
$(".actionDevWinZone").css('width','300px').css('height','26px');
$(".actionDevWinZone").css('display','block');
$(".actionDevWinZone").animate({
height:"390px"
},500,function(){
$(".actionDevWin").css('bottom','411px');
});
}else{
closeDevWin=0;
$(".actionDevWinZone").css('display','block');
$(".actionDevWin").animate({
bottom:"0px"
},500,function(){
});
$(".actionDevWinZone").animate({
height:"0px"
},500,function(){
$(".actionDevWin").css('bottom','0px');
$(".actionDevWinZone").css('display','none');
});
}
}
function refreshDevWin(){
var iH='' ;
iH += 'Actual page : ' + LUDI.getNumPage() + '<br>';
iH += 'Last page : ' + lastPage1 + '<br>';
if(isok()){
iH += 'Questions Status : <span style="color:#ABEBC6;font-weight:bold;" >OK</span> <br>';
}else{
iH += 'Questions Status : <span style="color:#F1948A;font-weight:bold;" >KO</span> <br>';
}
iH += 'Game score : ' +  LUDIscore + '<br>';
if(Variable1!=''){
iH += "Variable1=" + Variable1 + '<br>';
}
for(var property in dicoVariables){
if(dicoVariables.hasOwnProperty(property)){
if(property!='innerBlocNote'){
iH += property + ' : ' + window[property] + '<br>';
}
}
}
$('.actionDevWinZone').html(iH);
setTimeout("refreshDevWin()",500);
}
setTimeout("installDevWin()",1000);
