
var memActionStore = "";
var installMessage = "+&nbsp;Add&nbsp;to&nbsp;Open&nbsp;eLearning";
var allDataPLugins = new Array();

function loadPluginsStore(){
	
	var remote = require('electron').remote;
	var allDatastore = remote.getGlobal('plugins').store;
	var pathDatastore = remote.getGlobal('plugins').pathStore;
	allDataPLugins = remote.getGlobal('plugins').allData;
	
	allDatastore.forEach(function(entry){
		
		var pathIco = pathDatastore + "/" + entry.name + "/icon.png";
		
		var b  = '<li class="gallery-li" >';
		b += '<img src="' + pathIco + '" >';
		b += '<div class="gallery-plugins-text" >' + entry.name + '</div>';
		b += '</li>';
		b += '<li class="gallery-li-descript" >';
		b += '<p>' + entry.description + '</p>';
		
		var installdisplay = " style='display:none;' ";
		var unstalldisplay = " style='display:block;' ";
		
		var installP = isInstallPLugins(entry.name);
		//alert(entry.name + ' is' + installP);
		if(installP==false){
			installdisplay = " style='display:block;' ";
			unstalldisplay = " style='display:none;' ";
		}
		
		b += '<a href="#" ' + installdisplay + ' id="install' + entry.name + '" ';
		b += ' onClick="loadPluginExec(\'' + entry.name + '\');" ';
		b += ' class="addpluginbtn myButton" >' + installMessage + '</a>';
		
		b += '<a href="#" ' + unstalldisplay + ' id="unstall' + entry.name + '" ';
		b += ' onClick="delPluginExec(\'' + entry.name + '\');" ';
		b += ' class="addpluginbtn myButtonUn" >Uninstall</a>';
		
		b += '</li>';
		
		$('#gallery-plugins').prepend(b);
	
	});
	$('.gallstore').css('display','none');
	
}

function isInstallPLugins(item){
	
	var b = false;
	
	allDataPLugins.forEach(function(entry){
		if(item==entry){
			b = true;
		}
	});
	
	return b;
}

function loadPluginExec(item){
	
	if(memActionStore!=item){

		memActionStore = item;
		
		const electron = require('electron');
		const ipc = electron.ipcRenderer;
		
		ipc.send('message',{key:'delpluginbtn',val:item});
		$('#install' + item).html('-');
		
		setTimeout(function(){
			$('#install' + item).html('--');
		},500);
		
		setTimeout(function(){
			$('#install' + item).html('---');
		},1000);
		
		setTimeout(function(){
			$('#install' + item).html('----');
		},1500);
		
		setTimeout(function(){
			$('#install' + item).html('-----');
		},2000);
		
		setTimeout(function(){
			$('#install' + item).html('------');
		},2250);
		
		setTimeout(function(){
			ipc.send('message',{key:'addpluginbtn',val:item});
			$('#install' + item).css('display','none');
			$('#unstall' + item).css('display','block');
		},2500);
		
	}
	
}

function delPluginExec(item){
	
	const electron = require('electron');
	const ipc = electron.ipcRenderer;
	
	ipc.send('message',{key:'delpluginbtn',val:item});
	
	setTimeout(function(){
		$('#unstall' + item).html('------');
	},500);
	
	setTimeout(function(){
		$('#unstall' + item).html('---');
	},1000);
	
	setTimeout(function(){
		$('#unstall' + item).html('-');
	},1500);
		
	setTimeout(function(){
		ipc.send('message',{key:'addpluginbtn',val:item});
		$('#install' + item).css('display','block');
		$('#unstall' + item).css('display','none');		
		$('#install' + item).html(installMessage);
	},2000);
	
}