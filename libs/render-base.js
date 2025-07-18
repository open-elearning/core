"use strict";

function renderBaseProcess(ob,path){
	
	if(ob.type=='database'){
		
		var easyfile =  require('./easyfile')
		
		var endout = '<?xml version="1.0" encoding="UTF-8"?><d>';
		
		var dataTxt = ob.text;
		
		var dataTxta = dataTxt.split("@");

		var i = 0;
		var r = 0;
		
		for (i = 0; i < dataTxta.length; i++) {
			var lineRow = dataTxta[i];
			if(lineRow!=''){
				r++;
				var rowTxta = lineRow.split("|");
				var CtrA = rowTxta[0];
				var CtrB = rowTxta[1];
				if (CtrA!=''&&CtrB!='') {
					endout += '<data>';
					var j = 0;
					for (j=0;j<rowTxta.length;j++) {
						var tdTxt = rowTxta[j];
						endout += '<value><![CDATA[' + tdTxt + ']]></value>';
					}
					endout += '</data>';
				}
			}
		}
		
		endout = endout + '</d>';
		
		var renderPath = path + "/" +  ob.idString + ".xml";
		
		easyfile.writeText(renderPath,endout);
		
	}
	
}
exports.renderBaseProcess = renderBaseProcess;
