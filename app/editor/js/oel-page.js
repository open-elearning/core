
//Objets CPage
function CPage(){
	
	this.id;
	this.pageId;
	this.index;
	this.data;
	this.back;
	this.screen;
	this.script;
	this.havemin;
	
	this.isCreate;
	this.supp;
	
	this.comicMode;
	
	this.showElement = function(){
		
		var i = this.pageId;
		
		if(!document.getElementById('page' + i)){
			var p = '<li id="lip' + i + '" class="pagecl ' + i + '" ';
			p += ' style="border:solid 1px gray;" >';
			p += ' <canvas class="imgpage" id="page' + i + '" ';
			p += ' onClick="loadPage(\'' + i + '\');" ';
			p += ' class="ecranmini" width="150" height="110" >';
			p += '<canvas>';
			p += '</li>';
			$('#listecrans').append(p);
			$('#lip' + i).append('<div class=pagedeleteb onClick="pageDelete=\'' + i + '\';showEditDelete(1);" ></div>');
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
		loadPage(GPageId);
		
	}else{
		endOrdonne();
	}
	
}

function duplikPages(){
	
	var precPage = GetPageById(GPageId);
	var oldP = GPageId;
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
	reordonnePages();
	loadPage(GPageId);
	CPagesResetAll();
	
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
	
	}else{
		
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
	if(isNonePage()){
		objTemp.comicMode = 4;
	}
	CPagesAdd(objTemp);
	
	CPagesPaint();
	loadPage(GPageId);
	closePan();
	
	if(isNonePage()){
		
	}else{
		ajoutLudiBARRE();
	}
	
	eventPages = true;
}

function loadPage(UidPage){
	
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
	
	//reinitHelpers
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
	
	var pathPath = folderAllImages + pa.back;
	canvas.setBackgroundImage(pathPath);
	
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
	
	ajoutLudiHELPER();
	
}

var GlobalSortable;
 
function reOrdonne(){
	
	$(".mparamspage").css("display","block");
	$(".block-reordonne").css("display","none");
	$(".block-stopedit").css("display","block");
	$(".pagedeleteb").css("display","block");

	
	//http://johnny.github.io/jquery-sortable/
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
	$(".block-reordonne").css("display","block");
	$(".block-stopedit").css("display","none");
	$(".pagedeleteb").css("display","none");

	reordonnePages();
	CPagesResetAll();
	loadPage(GPageId);
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

//Guid