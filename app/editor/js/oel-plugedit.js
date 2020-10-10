
var folderAllPlugins = '';
var transfertTextPlugins = '';
var pleaseWaitPlugin = false;

function editPluginPrepareLaunch(obj){
	$('.opacedit').css("display","block");
	editPluginForms(obj);
}

function editPluginLaunch(obj){
	editPluginPrepareLaunch(obj);
	$('.editpluginForms').css("display",'block');
}

function editPluginForms(obj){
	
	pleaseWaitPlugin = false;
	transfertTextPlugins = obj.text;
	if(transfertTextPlugins == 'undefined'){
		transfertTextPlugins = "";
	}
	if(typeof(transfertTextPlugins) == 'undefined'){
		transfertTextPlugins = "";
	}
	var pathAllPlugins = folderAllPlugins.replace(/\\/g, "/");
	
	var wbpath = 'file:///' + pathAllPlugins + obj.val + '/forms/index.html';
	wbpath = wbpath.replace(/\\/g, "/");
	wbpath = wbpath.replace('\\', "/");
	
	//width:837px; height:478px;
	if(!openelearning.gebi('editpluginForms')){
		
		var p = '<div id="editpluginForms"  class="editpluginForms pan ' + TYPEWIND + 'osBorder" style="background:white!important;" >';
		
		p += barreEdit();
		
		p += '<div class="zonePluginLogo" ></div>';
		
		p += '<iframe id="editPluginFrame" name="editPluginFrame" ';
		p += ' src="' + wbpath + '" width="827px" height="480px" ';
		p += ' style="position:absolute;left:2px;top:35px;display:none;" ';
		p += ' frameBorder="0" >';
		p += '</iframe>';
		
		p += '<div class="listzonepuglin" >';
		p += '<a style="float:left;" onclick="closeEdit();" ';
		p += 'class="validation" >Cancel</a>';

		p += '<a style="float:right;margin-right:10px;" ';
		p += 'onclick="validPluginInsert();" ';
		p += 'class="btnSave" >Save</a>';
		p += '</div>';
		
		p += '</div>';
		
		$('body').append(p);
		
	}else{
		$('#editPluginFrame').css("display","none");
		$('.zonePluginLogo').css("display","block");
		loadIframe('editPluginFrame',wbpath);
	}
	
	$('#editpluginForms').css("height","540px");

	setTimeout(function(){ 
		if(transfertTextPlugins==''){
			transfertTextPlugins = '|||||';
		}
		$('#editPluginFrame').contents().find('#finalcode').val(transfertTextPlugins);
	},400);
	setTimeout(function(){ 
		$('#editPluginFrame').css("display","block");
		$('.zonePluginLogo').css("display","none");
		pleaseWaitPlugin = true;
	},700);
}

function validPluginInsert(){
	
	if(pleaseWaitPlugin){
		
		transfertTextPlugins = $('#editPluginFrame').contents().find('#finalcode').val();
		
		if(transfertTextPlugins==''){
		
			alert('Failure of registration');
		
		}else{
			
			var obj = CLudis[GlobalUid];
			obj.text = transfertTextPlugins;
			$('.opacedit').css("display","none");
			$('.editpluginForms').css("display",'none');
			showWiziZone();
					
			
		}
	}
	
}

function loadIframe(iframeName, url){
	
    var $iframe = $('#' + iframeName);
	if($iframe.length){
        $iframe.attr('src',url);   
        return false;
    }
	return true;
	
}

function loadMappingSvg(i){
	
	var obj = CLudis[i];
	
	var ol = parseInt(obj.x);
	var ot = parseInt(obj.y);
	
	var ow = parseInt(obj.width);
	var oh = parseInt(obj.height);
	
	var rw = parseInt(obj.realwidth);
	var rh = parseInt(obj.realheight);
	
	var objPlug = getCPlugById(obj.val);
	
	var svgMapping = objPlug.screenTextMapping;
	
	fabric.loadSVGFromString(svgMapping,function(objects,options){
				
		var obj = fabric.util.groupSVGElements(objects, options);
		obj.left = ol;
		obj.top = ot;
		obj.scaleX = ow/rw;
		obj.scaleY =  oh/rh;
		obj.lockRotation = true;
		obj.lockScalingY = true;
		obj.lockScalingX = true;
		obj.lockMovementX = false;
		obj.hasControls = false;
		obj.hasRotatingPoint = false;
		obj.id = i;
		
		obj.set({
			borderColor: borderCol,
			cornerColor: cornerCol,
			transparentCorners: false
		});
	
		canvas.add(obj);
	
	});

}
