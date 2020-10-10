
var editorInstance;

//Dev Mode
setTimeout(function(){
	var hash = location.hash.replace('#','');
	if(hash=='devmode'){
		forceLoad();
	}
},600);

//Dev Mode step 2
setTimeout(function(){
	var hash = location.hash.replace('#','');
	if(hash=='devmode'){
		launchCodeEditZone();
	}
},700);

//Images min
setTimeout(function(){
	processPagesMini();
},1500);

//load Learning Plugins
setTimeout(function(){
	loadLearningPlugins();
},5000);

						
function forceLoad(){
	
	location.hash = 'devmode';
	
	GPageId = guid();
	var objTemp = new CPage();
	objTemp.pageId = GPageId;
	objTemp.index = 0;
	objTemp.back = 'white.jpg';
	CPagesAdd(objTemp);
	
	CPagesPaint();
	loadPage(GPageId);
	closePan();
	
	ajoutLudiBARRE();
	eventPages = true;
	reOrdonne();
	endOrdonne();
	
	pageAdd();
	
}

