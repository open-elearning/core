
var memActionStore = "";
var installMessage = "+&nbsp;Add";
var allDataPLugins = new Array();

function loadPluginsStore(){
	
	var remote = require('electron').remote;
	var allDatastore = remote.getGlobal('plugins').store;
	var pathDatastore = remote.getGlobal('plugins').pathStore;
	allDataPLugins = remote.getGlobal('plugins').allData;
	
	/*
	var dataDist = remote.getGlobal('sharedFiles').distData;
	
	if(dataDist!=undefined){
		if(dataDist.dico!=undefined){
			dataDist.dico.forEach(function(entry){
				var libObject = new Object();
				libObject.name = entry.title;
				libObject.description = entry.title;
				libObject.pathicon = '';
				allDatastore.push(libObject);
			});
		}
	}else{
		console.log('dataDist => ' + dataDist);
	}
	*/
	allDatastore.forEach(function(entry){
		
		if(entry.pathicon==undefined){
			entry.pathicon = pathDatastore + "/" + entry.name + "/icon.png";
		}

		var b  = '<li class="gallery-li" >';

		if(entry.pathicon!=''){
			b += '<img src="' + entry.pathicon + '" />';
		}
		
		b += '<div class="gallery-plugins-text" >' + entry.name + '</div>';
		b += '</li>';
		b += '<li class="gallery-li-descript" >';

		if(entry.description.length>150){
			b += '<p style="font-size:12px;"  >' + entry.description + '</p>';
		}else{
			b += '<p style="font-size:14px;" >' + entry.description + '</p>';
		}
		
		var installdisplay = " style='display:none;' ";
		var unstalldisplay = " style='display:block;' ";
		
		var installP = isInstallPLugins(entry.name);
		//alert(entry.name + ' is' + installP);
		if(installP==false){
			installdisplay = " style='display:block;' ";
			unstalldisplay = " style='display:none;' ";
		}
		
		if(entry.pathicon!=''){
			
			b += '<a href="#" ' + installdisplay + ' id="install' + entry.name + '" ';
			b += ' onClick="loadPluginExec(\'' + entry.name + '\');" ';
			b += ' class="addpluginbtn myButton" >' + installMessage + '</a>';
			
			b += '<a href="#" ' + unstalldisplay + ' id="unstall' + entry.name + '" ';
			b += ' onClick="delPluginExec(\'' + entry.name + '\');" ';
			b += ' class="addpluginbtn myButtonUn" >X</a>';

		}

		b += '</li>';
		

		$('#gallery-plugins').prepend(b);
	
	});

	$('.gallstore').css('display','none');
	$('.gallery-plugins').css('display','none');
	
	setTimeout(function(){
		$('.gallery-plugins-load').css('display','none');
		$('.gallery-plugins').css('display','block');
	},1000);

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
		ipc.send('message',{key:'delpluginbtn',val:item});
		
		var remote = require('electron').remote;
		var allDeleteStore = remote.getGlobal('plugins').deleteStore;
		
		if(allDeleteStore.indexOf(item)!=-1){
			$('#install' + item).css('display','block');
			$('#unstall' + item).css('display','none');		
			$('#install' + item).html(installMessage);
		}else{
			$('#unstall' + item).html('Error !');
		}

	},2000);
	
}