

function loadPlugins(){
	
	var remote = require('electron').remote;
	var allData = remote.getGlobal('plugins').allData;
	
	allData.forEach(function(entry){
		var base  = '<div class="folder" >';
		base  += '<span>' + entry + '</span></div>';
		$('.zone-exports').prepend(base);
	});
	
}