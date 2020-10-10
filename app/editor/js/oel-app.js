
var canvas;
var zoomCanv = 1;
var oldZoomCanvas = 0;
var decxCanv = 1;
var decyCanv = 1;

var actualX = 0;
var actualY = 0;

var rectLudiscape;
var editor;

var EDITORMODE = 0;
var SCREEN_0_W = 960;
var SCREEN_0_H = 720;

function haveGridPlace(LudiObj){

	var b = true;
	
	if(LudiObj.type=='label'){
		b = true;
	}
	
	return b;

}

function haveWizi(LudiObj){

	var b = true;
	if(LudiObj.type=='img'){
		b = false;
	}
	return b;

}

(function(){
	
	canvas = new fabric.Canvas('ecran');
	canvas.hoverCursor = 'pointer';
	
	var moveHandler = function (evt){
		
		var movingObject = evt.target;
		closePan();
		
		if(typeof movingObject==="undefined"){
			
		}else{
			
			if(movingObject.id=='Move'){
				
				console.log("movingObject Move");
				
				var LudiObj = CLudis[GlobalUid];
				var LinkObjectl = parseInt(movingObject.get('left')) + 29 ;
				var LinkObjectt = parseInt(movingObject.get('top')) + 29;
				
				if(haveGridPlace(LudiObj)){
					LinkObjectl = Math.round(LinkObjectl/10) * 10;
					LinkObjectt = Math.round(LinkObjectt/10) * 10;
				}

				canvas.forEachObject(function(obj){
					if (obj.id&&obj.id===GlobalUid){
						obj.set('left',LinkObjectl);
						obj.set('top', LinkObjectt);
						LudiObj.setX(LinkObjectl);
						LudiObj.setY(LinkObjectt);
					}
				});
				
				eventObjects = true;
				moveWiziZone(GlobalUid);
				return false;
				
			}else{
				
				MoveObjectLudi.set('left',-100);
			
			}
			
			$('.tmpshow').css("display","none");

			var i = parseInt(movingObject.id);
			var obj = CLudis[i];
			
			var ol = parseInt(movingObject.get('left'));
			var ot = parseInt(movingObject.get('top'));
			
			if(haveGridPlace(obj)){
				ol = Math.round(ol/10) * 10;
				ot = Math.round(ot/10) * 10;
			}

			if(obj.type!='img'){
				
				if(ol<10){ol = 10;}
				if(obj.type=='speech'){
					if(ot<-30){ot = -30;}
				}else{
					if(ot<10){ot = 10;}
				}
			
			}
			
			if(obj.type=='fluxPts'){
				showWiziZone();
			}
			
			movingObject.set('left',ol);
			movingObject.set('top',ot);
			
			if(obj.type=='button'){
				
				if(obj.text6==4||obj.text6==5||obj.text6==6){
					
					if(EDITORMODE==0){
						if(ol>870){
							ol = 870;
							movingObject.set('left',870);
						}
					}
					if(EDITORMODE==1){
						if(ol>390){
							ol = 390;
							movingObject.set('left',390);
						}
					}

				}else{
					
					if(EDITORMODE==0){
						if(ol>760){
							ol = 760;
							movingObject.set('left',760);
						}
					}
					if(EDITORMODE==1){
						if(ol>310){
							ol = 310;
							movingObject.set('left',310);
						}
					}

				}

				if(EDITORMODE==0){
					if(ot>650){
						ot = 650;
						movingObject.set('top',650);
					}	
				}
				if(EDITORMODE==1){
					if(ot>720){
						ot = 720;
						movingObject.set('top',720);
					}	
				}

			}
			
			obj.setX(ol);
			obj.setY(ot);
			
			eventObjects = true;
		
		}
		
	};
	
	var resizeHandler = function (evt) {
		
		var resizeObject = evt.target;

		closePan();
		
		if(typeof resizeObject==="undefined"){		
			
		}else{
			
			if(resizeObject.id=='Move'){
				return false;
				eventObjects = true;
			}
			
			var i = (resizeObject.id);
			var obj = CLudis[i];
			
			var propX = resizeObject.get('width');
			var propY = resizeObject.get('height');

			var scalX = resizeObject.get('scaleX');
			var scalY = resizeObject.get('scaleY');

			var ow = parseInt(scalX * propX);
			var oh = parseInt(scalY * propY);
			
			obj.setW(ow);
			obj.setH(oh);
			
			if(obj.type=='text'||obj.type=='label'||obj.type=='dom'){
				showWiziZone();
			}
			
		}
		
	};
	
	var modifiedHandler = function (evt){
		var modifiedObject = evt.target;
	};
	
	var customEvtHandler = function (evt) {
		console.log("I was triggered by a custom event.");
	};
	
	var customEvtHandlerAdded = function (evt){
		
	};
	
	canvas.on('object:moving', moveHandler);
	canvas.on('object:scaling', resizeHandler);
	canvas.on('object:modified', modifiedHandler);
	canvas.on('custom:event', customEvtHandler);
	canvas.on('object:added', customEvtHandlerAdded);
	
	canvas.on('mouse:move', function(options) {
		actualX = parseInt(options.e.layerX/zoomCanv);
		actualY = parseInt(options.e.layerY/zoomCanv);
	});
	
	fabric.util.addListener(canvas.upperCanvasEl, 'dblclick', function (e){
		
		if(GlobalUid==-1){return false;}
		
		var target = canvas.findTarget(e);
		
		var modifiedObject = target;
		
		if (typeof modifiedObject === "undefined") {
			
		}else{
			
			var obj = CLudis[GlobalUid];
			
			if(obj.haveEditElement()){
				showEditZone();
				placeWorkingPlace();
			}

		}
		
	});
	
	fabric.util.addListener(canvas.upperCanvasEl, 'click', function (e){
		closePan();
		var target = canvas.findTarget(e);
		var modifiedObject = target;
		if (typeof modifiedObject === "undefined") {
			if(ModeEdit){
				reloadObject(UidEdit);
			}
		}else{
			
			if(modifiedObject.id=='Move'){
				return false;
				eventObjects = true;
			}
			
			if(ModeEdit){
				reloadObject(UidEdit);
			}
			SelectWorkingI(modifiedObject.id);
			placeWorkingPlace();
		}
	
	});
	
	rectLudiscape = fabric.util.createClass(fabric.Rect,{
	  type: 'textRectLudiscape',
	  initialize: function(options) {
	    options || (options = { });
	    this.callSuper('initialize', options);
	    this.set('label', options.label || '');
		this.set('textColor', options.textColor || 'black');
		this.set('fontSize', options.fontSize || 12);
	  },
	  toObject: function() {
	    
		return fabric.util.object.extend(this.callSuper('toObject'), {
			label: this.get('label'),textColor: this.get('textColor')
	    });
		
	  },
	  _render: function(ctx) {
	    
		this.callSuper('_render', ctx);
		ctx.font = this.fontSize + 'px Helvetica';
		ctx.fillStyle = this.textColor;
		
		rectangledText(ctx,-this.width/2 + 5,-this.height/2 + 20,this.width,cleanText(this.label),this.fontSize,'Helvetica',this.textColor);
		
	  }
	});
	
})();

$(function(){
	
	contextInstall($('body'));
	contextInstall($('.canvas-container'));
	
	$('#g-block').contextPopup({
	  title: 'Open eLearning',
	  items: [
		{label:'Duplicate',
		icon:'img/icons/windows.png',
		action:function(){
			duplikPages();
		}},
		{label:'Delete',
		icon:'img/icons/delete.png',
		action:function() {
			deletePagesG();
		}}
	  ]
	});
	
	//var Dropzone = require("dropzone");
	
});

function contextInstall(objMenu){
	
	objMenu.contextPopup({
	  title: 'Open eLearning',
	  items: [
		{label:'Edit object',
		icon:'img/icons/edit.png',
		action:function(){
			showEditZone();
		}},
		{label:'Copy Ctr + C',
		icon:'img/icons/copy.png',
		action:function(){
			copyCLudi();
		}},
		{label:'Paste Ctr + V',
		icon:'img/icons/paste.png',
		action:function(){
			pasteCLudi();
		}},
		{label:'Format',
		icon:'img/icons/format_cells.png',
		action:function(){
			showEditFormatId();
		}},
		{label:'Animation',
		icon:'img/icons/anim.png',
		action:function(){
			showEditAnim();
		}},
		
		{label:'Properties',
		icon:'img/icons/check.gif',
		action:function(){
			showProperties();
		}},
		{label:'Lock',
		icon:'img/icons/lock.gif',
		action:function(){
			processLockObjLudi();
		}},
		{label:'Delete',
		icon:'img/icons/delete.png',
		action:function(){
			showEditDelete();
		}}
	  ]
	});

}

function contextmenuEventsFabric(){
	
	if(GPageId==''){
		return false;
	}
	canvas.deactivateAll();
	closeEdit();
	
	var seli = -1;
	
	for (var i = 0; i < CLudisCount; i++){
		if(CLudis[i].supp==0){
			if(CLudis[i].pageId==GPageId){
				
				if(actualX>CLudis[i].getX()){
					if(actualX<(CLudis[i].getX()+CLudis[i].getW())){
						if(actualY>CLudis[i].getY()){
							if(actualY<(CLudis[i].getY()+CLudis[i].getH())){
								seli = i;
							}
						}
					}
				}
				
			}
		}
	}
	
	if(seli!=-1){
		
		canvas.forEachObject(function(obj) {
			if (obj.id === seli) {
				obj.set('active', true);
				GlobalUid = seli;
			}
		});
		
	}
	
}

function deviceChange(){
	
	if(GPageId==''){
		return false;
	}
	
	var responsiveProject = getParamsGlobal('responsiveProject','text').value;
	
	if(responsiveProject==''){
		
		paramsSettingsLaunch();

	}else{

		deleteLudiHELPER();
		closePan();
		if(EDITORMODE==1){
			EDITORMODE = 0;
			$('#iconScreenMode').attr('src','editor/metro/img/screen43.png');
		}else{
			EDITORMODE = 1;
			$('#iconScreenMode').attr('src','editor/metro/img/screen24.png');
		}

		setEditorMode(EDITORMODE);
		
		loadPage(GPageId);

	}
}

function SelectWorkingI(i){
	
	var objLudi = CLudis[i];
	
	if(objLudi===undefined){
	
	}else{

		if(CLudis[i].lock){
			return false;
		}
		canvas.forEachObject(function(obj){
			if(obj===undefined){	
			}else{
				var idu = parseInteger(obj.id);
				if(isNaN(idu)){idu = 0;}
				if((idu && idu===i)
				||(idu==0&&i==0)){
					obj.set('active',true);
					placeEditZone(i);
					canvas.renderAll();
					canvas.calcOffset();
				}else{
					obj.set('active', false);
				}
			}
		});

	}

}

function SelectWorkingO(i){
	
	canvas.forEachObject(function(obj){
		if(obj===undefined){	
		}else{
			var idu = parseInteger(obj.id);
			if(isNaN(idu)){idu=0;}
			if (idu&&idu===i){
				obj.set('active', true);
			}else{
				obj.set('active', false);
			}
		}
	});
	
}
