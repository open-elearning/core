
var typeCodeEdit = -1;
var tableDataFiles = "test.jpg|no@test2.jpg|no2";

function extraCustomFilesEditZone(){
	
	var p = '<div id="editExtraCustomFiles" class="editExtraCode pan ' + TYPEWIND + 'osBorder" >';
	
	p += barEditWind(getTrd("Edition") + '&nbsp;Custom&nbsp;Files');
	
	p += '<div class="tableFileEdition" >...</div>';

	p += '<div class="tableBaseEditionBtn" >';
	
	p += '<a style="float:left;" onclick="closeEdit();" ';
	p += 'class="validation lblcancel" >Cancel</a>';
	
	p += '<a style="float:right;margin-right:10px;" ';
	p += 'onclick="saveCodeEditZone();" ';
	p += 'class="btnSave lblsave" >Save</a>';
	
	p += '</div>';
	
	p += '</div>';
	
	return p;

}

function launchTableFilesBase(){
	
	var remote = require('electron').remote;
	tableDataFiles = remote.getGlobal('sharedObj').stockfiles;

	var dataTxt = tableDataFiles;

	var p ='<table id="tableBaseE" ';
	p += ' style="min-width:450px;" ';
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
					p += '<td id="' + guid() + '" >' + rowTxta[0] + '</td>';
					p += '<td id="' + guid() + '" >' + rowTxta[1] + '</td>';
					p += '<td id="' + guid() + '" >'  + '</td>';
					p += '</tr>';		
				}
			}
		}
	}
	
	p += getLineFileAdd();
	
	p += '</table>';

	$('.tableFileEdition').html(p);
	
}

function getLineFileAdd(){
	var p ='<tfoot id="footerLinedata" ><tr id="lineDataAdd" >';
	p += '<td style="text-align:center;background:white!important;" ';
	p += ' colSpan="15" onClick="addNewFileUpload();" >';
	p += '<img style="cursor:pointer;" src="img/line-add.png" />';
	p += '</td></tr></tfoot>';
	return p;
}

function launchCustomFilesEditZone(){
	optHideAll();
	$('.opacedit').css("display","block");
	$('#editExtraCustomFiles').css("display","block");
	launchTableFilesBase();
}

function saveCustomFilesEditZone(){
	$('.opacedit').css("display","none");
	$('#editExtraCustomFiles').css("display","none");
	var extraCodeTxt = $('#textExtraCode').val();
	closePan();
}

function addNewFileUpload(){
	
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