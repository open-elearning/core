
function lauchextensions(){

    $('#pann-extensions').html("<p style='text-align:center;' ><br/><img src='images/openelearning.gif' /></p>");
    const electron = require('electron');
	const ipc = electron.ipcRenderer;
    ipc.send('message',{key:'store',path:'store'})
	
    setTimeout(function(){
		controlReturnExtensions();
		$('#pann-extensions').css("display","none");
    },2000);

}

function controlReturnExtensions(){

    var remote = require('electron').remote;
	var editorWindReloadPlugins = remote.getGlobal('editorWindReloadPlugins');

    if(editorWindReloadPlugins==1){
        loadLearningPlugins();
    }else{
        setTimeout(function(){
			controlReturnExtensions();
		},1000);
    }

}

function loadLearningPlugins(){
    
    $('#pann-extensions').html("");
    $(".extensions-button").remove();
    
	collSmartBloc = new Array();

	var remote = require('electron').remote;
	var Rplugins = remote.getGlobal('plugins');
	var listassets = remote.getGlobal('sharedObj').listassets;

	var idOkLoad = false;
	var allData = new Array();
	
	if(Rplugins){
		if(Rplugins.allData){
			allData = Rplugins.allData;
			idOkLoad = true;
		}
	}
	if(idOkLoad==false){
		setTimeout(function(){
			loadLearningPlugins();
		},1000);
	}

	var res = listassets.split(";");
	
	var dir = res[0];
	dir = dir.replace("assets","plugins");
	
	var ind = 1;

	folderAllPlugins = dir;
	
	var contentP = 0;
	var i = 0;

	allData.forEach(function(entry){
		
		if(entry!=''){

			var pth = 'file:///' + dir + entry + '/icon.png';
			pth = pth.replace(/\\/g, "/");
			
			var base = '<div class="linkplugin lbtn" ';
			base += ' style="background-image:url(\'' + pth + '\');" ';
			base += ' onClick="addPlugProcess(\'' + entry + '\');" >';
			base += '<p class="linkp" >' + entry + '</p>';
			base += '</div>';
			
			var dirp = 'file:///' + dir + entry + '/resources/';
			dirp = dirp.replace(/\\/g, "/");
			
			var arrList = remote.getGlobal('plugins').xData;
			var jsList = remote.getGlobal('plugins').jsData;
			var cssList = remote.getGlobal('plugins').cssData;

			openPlug(arrList[i],dirp);
			
			var plugMe = getLastPlugMe();
			
			plogs('plugin load ' + plugMe.category + ' entry : ' + entry);

			if(plugMe.category=='Games'||plugMe.category=='game'){
				addToGamePanel(entry,pth);
			} else if (plugMe.category=='gameiso'||plugMe.category=='Gameiso'){
				addToIsoPanel(entry,pth);
			} else if (plugMe.category=='Charts'||plugMe.category=='chart'){
				addToGraphicsPanel(entry,pth);
			} else if (plugMe.category=='quizz'||plugMe.category=='quiz'){
				addToQuizzPanel(entry,pth);
			} else if (plugMe.category=='smartbloc'){
				addToSmartBloc(entry,pth,jsList[i],cssList[i]);
			} else if (plugMe.category=='objectfx'){
				addToObjectfxPanel(entry,pth);
			} else if (plugMe.type=='objet'||plugMe.type=='object'){
				contentP++;
				addToContentsPanel(entry,pth,ind);
				ind ++;
				if(ind==3){
					ind=1;
				}
			} else if (plugMe.type=='UI'||plugMe.type=='ui'){
				var dirprun = 'file:///' + dir + entry + '/run.js';
				dirprun = dirprun.replace(/\\/g, "/");
				addToUI(dirprun);
			}

			i++;
						
		}

	});

	if(contentP==0){
		$('#pann-extensions').append("<p style='text-align:center;' ><br/>No plugins are installed !</p>");
	}
	if(contentP<5){
		$('#pann-extensions').css("height","260px");
		$('#pann-extensions').css("width","220px");
	}

    if(contentP>4){
		$('#pann-extensions').css("height","360px");
		$('#pann-extensions').css("width","222px");
	}

	addShopToContentsPanel();

	addToIsoPanelGame();

}

function addToQuizzPanel(entry,pth){
	
	if (!document.getElementById('btn'+entry)) {

		var base = '';
		base += '<button id="btn' + entry + '" onClick="addPlugProcess(\'' + entry + '\');" ';
		base += ' class="ribbon-button extensions-button"><span class="icon">';
		base += '<img src="' + pth + '"></span>';

		if (entry=='t6m_markswords') {
			entry = getTrdU('markwords');
		}
		base += '<span class="caption">&nbsp;&nbsp;' + entry + '&nbsp;&nbsp;</span>';

		base += '</button>';
		
		$('#addPluginsQuestions').after(base);
	}

}

function addToGamePanel(entry,pth){
	
	if (!document.getElementById('btn'+entry)) {
		var base = '';
		base += '<button id="btn' + entry + '" onClick="addPlugProcess(\'' + entry + '\');" ';
		base += ' class="ribbon-button extensions-button"><span class="icon">';
		base += '<img src="' + pth + '"></span>';
		base += '<span class="caption">&nbsp;&nbsp;' + entry + '&nbsp;&nbsp;</span>';
		base += '</button>';
		$('#addPluginsGame').after(base);
	}

}

function addToIsoPanel(entry,pth){

	if (!document.getElementById('btn'+entry)) {
		var b = '<button id="btn' + entry + '" onClick="addPlugProcess(\'' + entry + '\');" ';
		b += ' style="width:64px;margin-right:4px;" ';
		b += ' class="avatar-button" ><span class="icon">';
		b += '<img src="' + pth + '"></span>';
		b += '</button>';
		$('.pann-isometric-avatars').append(b);
	}

}

function addToIsoPanelGame(){

	if (!document.getElementById('btngame')) {

		var b = '';
		b += '<button id="btngame" onClick="ajoutLudiGameZoneAct();" ';
		b += ' style="width:100px;" ';
		b += ' class="ribbon-button extensions-button"><span class="icon">';
		b += '<img src="img/zone-blue.png" ></span>';
		b += '<span class="caption">&nbsp;&nbsp;Action Point&nbsp;&nbsp;</span>';
		b += '</button>';

		b += '<button onClick="loadPageBackImgIso();" ';
		b += ' style="width:100px;margin-left:6px;" ';
		b += ' class="ribbon-button extensions-button"><span class="icon">';
		b += '<img src="img/backiso.jpg" ></span>';
		b += '<span class="caption">&nbsp;&nbsp;Background&nbsp;&nbsp;</span>';
		b += '</button>';

		$('.pann-isometric-zone').append(b);
	}
}

function addToGraphicsPanel(entry,pth){
	
	if (!document.getElementById('btn'+entry)) {
		var base = '';
		base += '<button id="btn' + entry + '" onClick="addPlugProcess(\'' + entry + '\');" ';
		base += ' class="ribbon-button extensions-button"><span class="icon">';
		base += '<img src="' + pth + '"></span>';
		base += '<span class="caption">&nbsp;&nbsp;' + entry + '&nbsp;&nbsp;</span>';
		base += '</button>';
		$('#addPluginsGraphics').after(base);
	}
}

function addToObjectfxPanel(entry,pth){
	
	if (!document.getElementById('btn'+entry)) {
		var base = '';
		var title = entry.replace("addon_","");
		title = title.replace("_"," ").replace("_"," ");
		base += '<a id="btn' + entry + '" title="' + title + '" ';
		base += ' class="pann-objectfx-btn" ';
		base += ' onClick="addPlugProcess(\'' + entry + '\');" >';
		base += '<img class="pann-objectfx-img" src="' + pth + '" />';
		base += '<span class="pann-objectfx-caption" >' + title + '</span>';
		base += '</a>';
		$('#pann-objectfx').append(base);
	}
}

function addToContentsPanel(entry,pth,ind){
	
	if (!document.getElementById('extensions-button-'+entry)) {
		var b = '<button id="extensions-button-' + entry + '" ';
		b += 'onClick="addPlugProcess(\'' + entry + '\');" ';
		b += ' class="ribbon-button extensions-button">';
		b += '<img style="position:absolute;left:27px;top:12px;width:46px;,height:46px;" src="' + pth + '">';
		b += '<span class="caption" style="word-wrap:break-word;width:90px;';
		b += 'position:absolute;left:5px;bottom:5px;" >' + entry + '</span>';
		b += '</button>';
		
		$('#pann-extensions').append(b);
	}
	
}

function addShopToContentsPanel(){
	
	if (!document.getElementById('extensions-button-shopplugin')) {
		var b = '<button id="extensions-button-shopplugin" ';
		b += ' onClick="lauchextensions();" ';
		b += ' class="ribbon-button extensions-button">';
		b += '<img style="position:absolute;left:27px;top:25px;width:46px;,height:46px;" ';
		b += ' src="img/plugins.png" >';
		b += '<span class="caption" style="word-wrap:break-word;';
		b += 'position:absolute;left:5px;bottom:5px;width:90px;" >...</span>';
		b += '</button>';
		$('#pann-extensions').append(b);
	}
	
}

function addToUI(dirprun){

	setTimeout(function(){

		var s = document.createElement("script");
		s.type = "text/javascript";
		s.src = dirprun;
		$("body").append(s);
		
		dirprunCss = dirprun.replace(".js",".css")
		
		var ss = document.createElement("link");
		ss.type = "text/css";
		ss.rel = "stylesheet";
		ss.href = dirprunCss;
		$("body").append(ss);

	},500);

}

var collSmartBloc = new Array();

function addToSmartBloc(entry,pth,jsData,cssData){
	
	var Elem = new Object();
	Elem.id = entry;
	Elem.pth = pth;
	Elem.jsData = jsData;
	Elem.cssData = cssData;
	collSmartBloc.push(Elem);

}
