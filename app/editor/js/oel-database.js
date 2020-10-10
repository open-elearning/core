
var GlobalDataid = -1;
var tableGlobale;
var tableDataTxt = "";
var loadDataShow="<center><br><img src='img/microsave.gif' /><br></center>";

function databaseEditZone(){
	
	var p = '<div id="editDatabase" class="editDatabase pan ' + TYPEWIND + 'osBorder" >';
	
	p += '<div class="toolbar-w toolbar-header">';
	p += '<div onClick="closeEdit();" class="closehead" ></div>';
	p += '<h1 class="titlehead">Data-Base edition</h1>';
	p += '</div>';
	
	p += '<div class="tableBaseTitle" >';
	p += 'ID&nbsp;:&nbsp;<input id="textdatabasetitleedit" type="text" class="textdatabasetitleedit" ';
	p += ' style="width:350px;" />';
	
	p += '</div>';
	
	p += '<div class="tableBaseEdition" ></div>';

	p += '<div class="tableBaseEditionBtn" >';
	
	p += '<a style="float:left;" onclick="closeEdit();" ';
	p += 'class="validation" >Cancel</a>';
	
	p += '<a style="float:left;margin-left:10px;" onclick="csvUpload();" ';
	p += 'class="validation" >Import CSV</a>';
	
	
	p += '<a style="float:right;margin-right:10px;" ';
	p += 'onclick="extractDataBase();" ';
	p += 'class="btnSave" >Save</a>';
	
	p += '</div>';
	
	p += '</div>';
	
	return p;

}

function extractDataBase(){
	
	if(tableDataTxt!=""){
		
		var obj = CLudis[GlobalDataid];
		
		var exportTxt = '';
		
		var i = 0;
		
		//var tableWorks =  tableGlobale.getTable();
		var tableDoc = $("#tableBaseE");
		
		tableDoc.find('tr').each(function(){
			
			if(i!=0){
				
				var j = 0;
				
				$(this).find('td').each(function(){
					
					var txt = $(this).text();

					if(txt=='&nbsp;'){
						txt = '';
					}

					txt = txt.replace('|','');
					txt = txt.replace('@','');
					
					if(j==0){
						exportTxt += txt  ;
					}else{
						exportTxt += '|' + txt  ;
					}
					
					j++;
					
				});
				
				exportTxt += '@';
				
			}
			i++;
			
		});
		
		obj.text = exportTxt;
		
		obj.idString = $('#textdatabasetitleedit').val();
		
		$('.tableBaseEdition').html(loadDataShow);
		
		closeEdit();
		
		tableDataTxt = "";	
	
	}
	
}

function launchEditDataBase(obj){
	
	GlobalDataid = obj.id;
	
	$('.opacedit').css("display","block");
	$('#editDatabase').css("display","block");
	
	$('#textdatabasetitleedit').val(obj.idString);
	
	tableDataTxt = obj.text;
	
	$('.tableBaseEdition').html(loadDataShow);
	
	setTimeout(function(){
		launchTableDataBase();
	},700);
	
}

function launchTableDataBase(){
	
	var dataTxt = tableDataTxt;
	
	tableDataTxt = "ok";
	
	var p ='<table id="tableBaseE" class="tableBaseE a-table" >';
	p += '<tr>';
	p += '<th>A</th>';
	p += '<th>B</th>';
	p += '<th>C</th>';
	p += '<th>D</th>';
	p += '<th>E</th>';
	p += '<th>F</th>';
	p += '<th>G</th>';
	p += '<th>H</th>';
	p += '<th>I</th>';

	p += '<th>J</th>';
	p += '<th>K</th>';
	p += '<th>L</th>';
	p += '<th>M</th>';
	p += '<th>N</th>';
	p += '<th>O</th>';
	p += '</tr>';
	
	var dataTxta = dataTxt.split("@");
	var i = 0;
	var r = 0;
	
	for (i = 0; i < dataTxta.length; i++) {
		var lineRow = dataTxta[i];

		if(lineRow!=''){
			r++;

			var rowTxta = lineRow.split("|");

			if(rowTxta.length>2){
				
				var clue1 = rowTxta[0].replace(' ','');
				var clue2 = rowTxta[1].replace(' ','');
				var clue3 = rowTxta[2].replace(' ','');
				
				if(clue1!=''&&clue1!=' '&&(clue1.length>1||clue2.length>1||clue3.length>1)){
					
					p += '<tr>';

					var j = 0;
					for (j=0;j<rowTxta.length;j++) {
						var tdTxt = rowTxta[j];
						p += '<td id="' + guid() + '" onClick="editCellOplace(this);" >' + tdTxt + '</td>';
					}
					p += '</tr>';		
				}
						
			}

		}

	}
	
	p += getLineData()+getLineData();
	p += getLineDataAdd();
	
	p += '</table>';

	$('.tableBaseEdition').html(p);
	
}

var tdInit;
var valtdInit;
var actualIdTdInit = "";

function editCellOplace(o){
	
	if(typeof tdInit =="undefined"){

	}else{

		if(actualIdTdInit==$(o).attr("id")){
			return false;
		}
		
	}
	
	$(".editorInputTd").remove();
	$(o).css("min-width","100px");
	tdInit = $(o);
	actualIdTdInit = tdInit.attr("id");
	valtdInit = $(o).html();
	
	if(valtdInit=='&nbsp;'){
		valtdInit = '';
	}

	var widthInput = " style='width:100%;' ";

	if(valtdInit.length>12){
		widthInput = " style='width:100%;min-width:150px;' ";
	}
	if(valtdInit.length>24){
		widthInput = " style='width:100%;min-width:250px;' ";
	}
	if(valtdInit.length>36){
		widthInput = " style='width:100%;min-width:350px;' ";
	}

	$(o).html("<input " + widthInput + " onblur='blurLineData(this)' id='editorInputTd' val='' />");
	tdInit.attr("val-data",valtdInit);
	$("#editorInputTd").val(valtdInit);
	$("#editorInputTd").focus();
}

function saveLineData(inp){

	if(typeof tdInit=="undefined"){

	}else{
		itdInit.attr("val-data",$(inp).val());
	}
}

function blurLineData(inp){
	
	if(typeof tdInit =="undefined"){
	}else{
		var valData = $(inp).val();
		if(valData==''){
			valData = '&nbsp;';
		}
		tdInit.html(valData);
		itdInit.attr("val-data",valData);
	}

}

function getLineData(){
	
	var p ='<tr>';
	p += '<td id="' + guid() + '" onClick="editCellOplace(this);" >&nbsp;</td>';
	p += '<td id="' + guid() + '" onClick="editCellOplace(this);" ></td>';
	p += '<td id="' + guid() + '" onClick="editCellOplace(this);" ></td>';
	p += '<td id="' + guid() + '" onClick="editCellOplace(this);" ></td>';
	p += '<td id="' + guid() + '" onClick="editCellOplace(this);" ></td>';
	p += '<td id="' + guid() + '" onClick="editCellOplace(this);" ></td>';
	p += '<td id="' + guid() + '" onClick="editCellOplace(this);" ></td>';
	p += '<td id="' + guid() + '" onClick="editCellOplace(this);" ></td>';
	p += '<td id="' + guid() + '" onClick="editCellOplace(this);" ></td>';
	p += '<td id="' + guid() + '" onClick="editCellOplace(this);" ></td>';
	p += '<td id="' + guid() + '" onClick="editCellOplace(this);" ></td>';
	p += '<td id="' + guid() + '" onClick="editCellOplace(this);" ></td>';
	p += '<td id="' + guid() + '" onClick="editCellOplace(this);" ></td>';
	p += '<td id="' + guid() + '" onClick="editCellOplace(this);" ></td>';
	p += '<td id="' + guid() + '" onClick="editCellOplace(this);" ></td></tr>';
	return p;
}

function getLineDataAdd(){
	var p ='<tfoot id="footerLinedata" ><tr id="lineDataAdd" >';
	p += '<td style="text-align:center;background:white!important;" ';
	p += ' colSpan="15" onClick="addLineData();" >';
	p += '<img style="cursor:pointer;" src="img/line-add.png" />';
	p += '</td></tr></tfoot>';
	return p;
}

function addLineData(){
	$('#footerLinedata').before(getLineData());
}

function csvUpload(){
	
	const electron = require('electron');
	const ipc = electron.ipcRenderer;
	ipc.send('message',{key:'dataupload'});
	
	setTimeout(function(){
		controlReceptionCsvUpload();
	},300);
	
}

function controlReceptionCsvUpload(){

	if ($('#editDatabase').is(':visible')) {
		
		var remote = require('electron').remote;
		var dataUpload = remote.getGlobal('sharedObj').dataUpload;
		
		if(dataUpload==''){
			setTimeout(function(){
				controlReceptionCsvUpload();
			},300);
		}else{
			
			if(dataUpload=='error'){
				
				alert('echec');
				
			}else{

				
				var dataTxt = CSVtoBase(dataUpload);
				var dataTxta = dataTxt.split("@");
				
				if(dataTxta && dataTxta.length){
					var loadDataS = loadDataShow + '<center>Import ' + dataTxta.length + ' lines Ok</center>';
					$('.tableBaseEdition').html(loadDataS);
					tableDataTxt = dataTxt;
					setTimeout(function(){
						launchTableDataBase();
					},1000);
				}
			
			}
			
		}
		
	}
	
}

// Return array of string values, or NULL if CSV string not well formed.
function CSVtoBase(data) {
   
   var finalExtract = "";
   var currentData = data.toString().split(/(?:\r\n|\r|\n)/g);
   
    if (currentData && currentData.length) {
        for(var line = 0; line < currentData.length; line++) {
			var lineSplit = currentData[line];
			finalExtract = finalExtract + replaceAll(lineSplit,';','|') + '@';
        }
    }
   return finalExtract;

 }


