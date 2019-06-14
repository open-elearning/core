
function questionQcmEdit(){
	
	var p = '<div class="questionqcmedit pan" >';
	
	p += barreEdit();
	
	p +='<a id="cocheqcm1" onClick="qcmProcessClick(1);" class="cocheqcmedit" style="margin-top:35px;" ></a>';
	p += '<input id="sourceqcm1" onkeyup="ajusteQcm();" type="text" class="textqcmedit"  style="margin-top:35px;" />';
	p += '<a id="cocheqcm2" onClick="qcmProcessClick(2);" class="cocheqcmedit" ></a>';
	p += '<input id="sourceqcm2" onkeyup="ajusteQcm();" type="text" class="textqcmedit" />';
	p += '<a id="cocheqcm3" onClick="qcmProcessClick(3);" class="cocheqcmedit" ></a>';
	p += '<input id="sourceqcm3" onkeyup="ajusteQcm();" type="text" class="textqcmedit" />';
	p += '<a id="cocheqcm4" onClick="qcmProcessClick(4);" class="cocheqcmedit" ></a>';
	p += '<input id="sourceqcm4" onkeyup="ajusteQcm();" type="text" class="textqcmedit" />';
	p += '<a id="cocheqcm5" onClick="qcmProcessClick(5);" class="cocheqcmedit" ></a>';
	p += '<input id="sourceqcm5" onkeyup="ajusteQcm();" type="text" class="textqcmedit" />';

	p += '<a style="position:absolute;left:15px;bottom:15px;" '; 
	p += ' onclick="closeEdit();" ';
	p += 'class="validation noselectmouse" >Cancel</a>';

	p += '<a style="position:absolute;right:15px;bottom:15px;" ';
	p += 'onclick="saveQcmInsert();" ';
	p += 'class="btnSave noselectmouse" >Save</a>';

	p += '</div>';
	
	return p;
}
function saveQcmInsert(){

	getSourceQcm();
	$('.opacedit').css("display","none");
	$('.questionqcmedit').css("display",'none');
	showWiziZone();

}

function getSourceQcm(){
	
	if(GlobalUid==-1){
		return false;
	}
	
	redimQcm(GlobalUid);

	var obj = CLudis[GlobalUid];
	
	if(obj.type=='qcm'){
		
		obj.text = $('#sourceqcm1').val();
		obj.text2 = $('#sourceqcm2').val();
		obj.text3 = $('#sourceqcm3').val();
		obj.text4 = $('#sourceqcm4').val();
		obj.text5 = $('#sourceqcm5').val();
		
		var svg = new String(getBaseQcmObj(453,210,obj));
		var objCanvas = canvas.getActiveObject();
		var objC;
		
		fabric.loadSVGFromString(svg,function(objects,options){
			
			objCanvas.paths[1] = objects[1];
			objCanvas.paths[2].text = objects[2].text;
			
			objCanvas.paths[3] = objects[3];
			objCanvas.paths[4].text = objects[4].text;
						
			objCanvas.paths[5] = objects[5];
			objCanvas.paths[6].text = objects[6].text;
			
			objCanvas.paths[7] = objects[7];
			objCanvas.paths[8].text = objects[8].text;
			
			objCanvas.paths[9] = objects[9];
			objCanvas.paths[10].text = objects[10].text;

			//canvas.renderAll();
		});
		
	}
	eventObjects = true;
}

function setSourceQcm(uid){
	
	var obj = CLudis[uid];
	
	if(obj.type=='qcm'){
		
		$('#cocheqcm3,#sourceqcm3').css("display",'none');
		$('#cocheqcm4,#sourceqcm4').css("display",'none');
		$('#cocheqcm5,#sourceqcm5').css("display",'none');
		
		$('#sourceqcm1').val(obj.text);
		$('#sourceqcm2').val(obj.text2);
		$('#sourceqcm3').val(obj.text3);
		$('#sourceqcm4').val(obj.text4);
		$('#sourceqcm5').val(obj.text5);
		
		cocheQcmProcess(1,obj.val);
		cocheQcmProcess(2,obj.val2);
		cocheQcmProcess(3,obj.val3);
		cocheQcmProcess(4,obj.val4);
		cocheQcmProcess(5,obj.val5);
		
		if(obj.text2!=''){
			$('#cocheqcm3,#sourceqcm3').css("display",'block');
		}
		if(obj.text3!=''){
			$('#cocheqcm4,#sourceqcm4').css("display",'block');
		}
		if(obj.text4!=''){
			$('#cocheqcm5,#sourceqcm5').css("display",'block');
		}
		
	}
	eventObjects = true;
}

function redimQcm(uid){
	
	var obj = CLudis[uid];
	
	if(obj.type=='qcm'){
		
		var hw = 280;

		if(obj.text2!=''){
			$('#cocheqcm3,#sourceqcm3').css("display",'block');
			hw = 280;
		}else{
			$('#cocheqcm3,#sourceqcm3').css("display",'none');
		}
		
		if(obj.text3!=''){
			$('#cocheqcm4,#sourceqcm4').css("display",'block');
			hw = 300;
		}else{
			$('#cocheqcm4,#sourceqcm4').css("display",'none');
		}

		if(obj.text4!=''){
			$('#cocheqcm5,#sourceqcm5').css("display",'block');
			hw = 350;
		}else{
			$('#cocheqcm5,#sourceqcm5').css("display",'none');
		}

		$('.questionqcmedit').css("height",hw + 'px');

	}

}

function ajusteQcm(){
	
	ModeEdit = true;
	UidEdit = GlobalUid;
	
	var t2 = $('#sourceqcm2').val();
	if(t2!=''){
		$('#cocheqcm3,#sourceqcm3').css("display",'block');
	}else{
		$('#cocheqcm3,#sourceqcm3').css("display",'none');
	}
	
	var t3 = $('#sourceqcm3').val();
	if(t3!=''){
		$('#cocheqcm4,#sourceqcm4').css("display",'block');
	}else{
		$('#cocheqcm4,#sourceqcm4').css("display",'none');
	}
	
	var t4 = $('#sourceqcm4').val();
	if(t4!=''){
		$('#cocheqcm5,#sourceqcm5').css("display",'block');
	}else{
		$('#cocheqcm5,#sourceqcm5').css("display",'none');
	}
	
	getSourceQcm();

	redimQcm(GlobalUid);

	eventObjects = true;
}

function cocheQcmProcess(i,coche){
	
	var coh = $('#cocheqcm' + i);
	
	if(coche==0){
		coh.css("background-image",'url(img/circle40.png)');
	}else{
		coh.css("background-image",'url(img/check40.png)');
	}
	eventObjects = true;
}

function qcmProcessClick(i){
	
	var obj = CLudis[GlobalUid];
	
	var coh = $('#cocheqcm' + i);
	
	var bg = coh.css('background-image');
	
	if(bg.indexOf('circle40')!=-1){
		if(i==1){obj.val  = 1;}
		if(i==2){obj.val2 = 1;}
		if(i==3){obj.val3 = 1;}
		if(i==4){obj.val4 = 1;}
		if(i==5){obj.val5 = 1;}
		coh.css("background-image",'url(img/check40.png)');
	}else{
		if(i==1){obj.val  = 0;}
		if(i==2){obj.val2 = 0;}
		if(i==3){obj.val3 = 0;}
		if(i==4){obj.val4 = 0;}
		if(i==5){obj.val5 = 0;}
		coh.css("background-image",'url(img/circle40.png)');
	}
	
	getSourceQcm();
	eventObjects = true;
}
