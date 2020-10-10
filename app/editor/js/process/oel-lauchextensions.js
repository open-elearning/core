
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
    
	var remote = require('electron').remote;
	var Rplugins = remote.getGlobal('plugins');
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

	var listassets = remote.getGlobal('sharedObj').listassets;
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

			openPlug(arrList[i],dirp);
			
			var plugMe = getLastPlugMe();
			
			if(plugMe.category=='Games'||plugMe.category=='game'){
				addToGamePanel(entry,pth);
			}else{
				if(plugMe.category=='Charts'||plugMe.category=='chart'){
					addToGraphicsPanel(entry,pth);
				}else{
					if(plugMe.type=='objet'||plugMe.type=='object'){
						contentP++;
						addToContentsPanel(entry,pth,ind);
						ind ++;
						if(ind==3){ind=1;}
					}
					if(plugMe.type=='UI'||plugMe.type=='ui'){
						var dirprun = 'file:///' + dir + entry + '/run.js';
						dirprun = dirprun.replace(/\\/g, "/");
						addToUI(dirprun);
					}
				}
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

	
    $('#pann-extensions').append('<a id="btnLauchExtensions" style="position:absolute;right:10px;bottom:5px;width:auto;" onclick="lauchextensions()" class="validationMin" >&nbsp;Extensions&nbsp;...&nbsp;</a>');

}

function addToGamePanel(entry,pth){
	
	var base = '';
	base += '<button onClick="addPlugProcess(\'' + entry + '\');" class="ribbon-button extensions-button"><span class="icon">';
	base += '<img src="' + pth + '"></span>';
	base += '<span class="caption">&nbsp;&nbsp;' + entry + '&nbsp;&nbsp;</span>';
	base += '</button>';
	
	$('#addPluginsGame').after(base);
	
}

function addToGraphicsPanel(entry,pth){
	
	var base = '';
	base += '<button onClick="addPlugProcess(\'' + entry + '\');" ';
	base += ' class="ribbon-button extensions-button"><span class="icon">';
	base += '<img src="' + pth + '"></span>';
	base += '<span class="caption">&nbsp;&nbsp;' + entry + '&nbsp;&nbsp;</span>';
	base += '</button>';
	
	$('#addPluginsGraphics').after(base);
	
}

function addToContentsPanel(entry,pth,ind){
	
	var b = '<button id="extensions-button-' + entry + '" ';
    b += 'onClick="addPlugProcess(\'' + entry + '\');" ';
    b += ' class="ribbon-button extensions-button">';
	b += '<img style="position:absolute;left:27px;top:12px;width:46px;,height:46px;" src="' + pth + '">';
	b += '<span class="caption" style="word-wrap:break-word;width:90px;';
	b += 'position:absolute;left:5px;bottom:5px;" >' + entry + '</span>';
	b += '</button>';
	
	$('#pann-extensions').append(b);
	
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
