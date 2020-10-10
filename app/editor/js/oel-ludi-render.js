
var	borderCol = 'gray';
var	cornerCol = 'white';
var	strokeCol = 'black';
var	cornerTrans = false;
var	strokeSize = 9;

function OptsHandles(legObj,refLudi){
	
	if(refLudi.lock){

		legObj.set({
			borderColor: borderCol,
			cornerColor: cornerCol,
			transparentCorners: true,
			cornerStrokeColor : strokeCol,
			cornerSize: 0,
			padding:0,
			selectable:false
		});

	}else{

		legObj.set({
			borderColor: borderCol,
			cornerColor: cornerCol,
			transparentCorners: cornerTrans,
			cornerStrokeColor : strokeCol,
			cornerSize: strokeSize,
			padding:4
		});

	}

}

//Objets CLudiRender
function CLudiRender(refLudi){
	
	if(refLudi.isCreate==false){
		
		refLudi.isCreate = true;
		
		oldIdSize = '';

		var ol = parseInt(refLudi.getX());
		var ot = parseInt(refLudi.getY());

		var ow = parseInt(refLudi.getW());
		var oh = parseInt(refLudi.getH());
		
		var rw = parseInt(refLudi.getRW());
		var rh = parseInt(refLudi.getRH());

		var uid = parseInt(refLudi.id);
		
		if("undefined"===typeof refLudi.type){
			return false;
		}
		
		if(refLudi.type=="img"){
			
			var imgsrc = correctUrlImg(refLudi.data);
			
			fabric.util.loadImage(imgsrc, function(img){
				
				var legimg = new fabric.Image(img,{
					left : ol,
					top  : ot,
					scaleX : ow / rw,
					scaleY : oh / rh
				});
				
				legimg.id = uid;
				legimg.lockRotation = true;
				legimg.hasRotatingPoint = false;
				OptsHandles(legimg,refLudi);

				canvas.add(legimg);
				
			});
			
			console.log("img:" + imgsrc);
			
		}
		
		if(refLudi.type=="barre"){
			
			var rect = new fabric.Rect({
				left : ol,
				top  : ot,
				width : ow,
				height : oh,
				fill: refLudi.val
			});
			colorBase = refLudi.val;
			rect.id = uid;
			rect.lockRotation = true;
			rect.lockScalingY = true;
			rect.lockScalingX = true;
			rect.lockMovementX = false;
			rect.hasRotatingPoint = false;
			rect.hasControls = false;
			rect.hasBorders  = true;
			rect.lockMovementX = true;
			rect.lockMovementY = true;
			
			OptsHandles(rect,refLudi);

			canvas.add(rect);
			
		}
		
		if(refLudi.type=="video"
		||refLudi.type=="videomp4"){
			
			var videosrc = refLudi.data;
			
			fabric.util.loadImage(videosrc,function(img){
				
				var legimg = new fabric.Image(img,{
					left : ol,top  : ot,
					scaleX : ow / img.width,
					scaleY : oh / img.height
				});
				
				legimg.id = uid;
				legimg.lockRotation = true;
				legimg.hasRotatingPoint = false;
				legimg.hasControls = true;
				OptsHandles(legimg,refLudi);

				canvas.add(legimg);
				
			});
			
		}

		if(refLudi.type=="audio"){
			
			var videosrc = refLudi.data;
			
			fabric.util.loadImage(videosrc,function(img){
				
				var legimg = new fabric.Image(img,{
					left : ol,top  : ot,
					scaleX : ow / img.width,
					scaleY : oh / img.height
				});
				
				legimg.id = uid;
				legimg.lockRotation = true;
				legimg.lockScalingY = true;
				legimg.lockScalingX = true;
				legimg.lockMovementX = false;
				legimg.hasRotatingPoint = false;
				legimg.hasControls = false;
				OptsHandles(legimg,refLudi);

				canvas.add(legimg);
				
			});
			
		}
		
		if(refLudi.type=="bilan"){
			
			var bilansrc = refLudi.data;
			
			fabric.util.loadImage(bilansrc, function(img){
				
				var legimg = new fabric.Image(img,{
					left : ol,top  : ot,
					scaleX : ow / img.width,
					scaleY : oh / img.height
				});
				
				legimg.id = uid;
				legimg.lockRotation = true;
				legimg.lockScalingY = true;
				legimg.lockScalingX = true;
				legimg.lockMovementX = false;
				legimg.hasRotatingPoint = false;
				legimg.hasControls = false;
				legimg.hasBorders  = true;

				OptsHandles(legimg,refLudi);

				canvas.add(legimg);
				
			});
			
		}
		
		if(refLudi.type=="database"){
			
			var bilansrc = refLudi.data;
			
			fabric.util.loadImage(bilansrc, function(img){
				
				var legimg = new fabric.Image(img,{
					left : ol,top  : ot,
					scaleX : ow / img.width,
					scaleY : oh / img.height
				});
				
				legimg.id = uid;
				legimg.lockRotation = true;
				legimg.lockScalingY = true;
				legimg.lockScalingX = true;
				legimg.lockMovementX = false;
				legimg.hasRotatingPoint = false;
				legimg.hasControls = false;
				legimg.hasBorders  = true;

				OptsHandles(legimg,refLudi);

				canvas.add(legimg);
				
			});
			
		}
		
		if(refLudi.type=="life"){
			
			var lifesrc = refLudi.data;
			
			fabric.util.loadImage(lifesrc, function(img){
				
				var legLife = new fabric.Image(img,{
					left : ol,top  : ot,
					scaleX : ow / img.width,
					scaleY : oh / img.height
				});
				
				legLife.id = uid;
				legLife.lockRotation = true;
				legLife.lockScalingY = true;
				legLife.lockScalingX = true;
				legLife.lockMovementX = false;
				legLife.hasRotatingPoint = false;
				legLife.hasControls = false;
				legLife.hasBorders  = true;

				OptsHandles(legLife,refLudi);

				canvas.add(legLife);
				
			});
			
		}
		
		if(refLudi.type=="plugin"){
			
			if(typeof(refLudi.data)=='undefined'){
				refLudi.data = "";
			}
			if(refLudi.data=='undefined'){
				refLudi.data = "";
			}
			
			var pluginsrc = correctLocalUrlImg(refLudi.data);
			
			if(pluginsrc!=''&&UrlExists(pluginsrc)){
				
				fabric.util.loadImage(pluginsrc, function(img){
					
					var legimg = new fabric.Image(img,{
						left : ol,top  : ot,
						scaleX : ow / img.width,
						scaleY : oh / img.height
					});
					
					legimg.id = uid;
					legimg.lockRotation = true;
					legimg.lockScalingY = true;
					legimg.lockScalingX = true;
					legimg.lockMovementX = false;
					legimg.hasRotatingPoint = false;
					legimg.hasControls = false;
					legimg.hasBorders  = true;

					OptsHandles(legimg,refLudi);

					canvas.add(legimg);
					
				});
			
			}else{
				
				var imgsrc = 'img/empty.png';
				fabric.util.loadImage(imgsrc, function(img){
					var legimg = new fabric.Image(img,{
						left : ol,
						top  : ot,
						scaleX : ow / rw,
						scaleY : oh / rh
					});
					legimg.id = uid;
					canvas.add(legimg);
				});
			}
			
		}
					
		if(refLudi.type=="plugme"){
			
			if(typeof(refLudi.data)=='undefined'){
				refLudi.data = "";
			}
			if(refLudi.data=='undefined'){
				refLudi.data = "";
			}
			
			var pluginsrc = correctLocalUrlImg(refLudi.data);

			if(pluginsrc!=''&&UrlExists(pluginsrc)){
				
				fabric.util.loadImage(pluginsrc, function(img){
					
					var legimg = new fabric.Image(img,{
						left : ol,top  : ot,
						scaleX : ow / img.width,
						scaleY : oh / img.height
					});
					
					legimg.id = uid;
					legimg.lockRotation = true;
					legimg.lockScalingY = true;
					legimg.lockScalingX = true;
					legimg.lockMovementX = false;
					legimg.hasRotatingPoint = false;
					legimg.hasControls = false;
					legimg.hasBorders  = true;

					OptsHandles(legimg,refLudi);

					canvas.add(legimg);
					
					//loadMappingSvg(uid);
					
				});
			
			}else{

				refLudi.realwidth = refLudi.width;
				refLudi.realheight = refLudi.height;
			
				var text = new rectLudiscape({
					left: ol,
					top: ot,
					width: ow,
					height: oh,
					borderColor :'#A9E2F3',
					label:'',
					fontSize : 18,
					fill: '',
					textColor : 'black',
					stroke : 'gray',
					strokeWidth : 0.5
				});

				text.lockRotation = true;
				text.hasRotatingPoint = false;
				text.lockScalingY = false;
				text.lockScalingX = false;
				text.lockMovementX = false;
				text.hasControls = false;
				text.hasBorders  = true;
				text.setControlsVisibility({
					mt: false, 
					mb: true,
					mr: true, 
					ml: false, 
					bl: false,
					br: false, 
					tl: false, 
					tr: false,
					mtr: false,
				});
				text.id = uid;
				OptsHandles(text,refLudi);
				
				canvas.add(text);
				
			}
			
		}
		
		if(refLudi.type=="speech"){
			
			var speechsrc = refLudi.data;
			
			fabric.util.loadImage(speechsrc,function(img){
				var speechimg = new fabric.Image(img,{
					left : ol,top  : ot,
					scaleX : ow / img.width,
					scaleY : oh / img.height
				});
				speechimg.id = uid;
				speechimg.lockRotation = true;
				speechimg.lockScalingY = true;
				speechimg.lockScalingX = true;
				speechimg.lockMovementX = false;
				speechimg.hasRotatingPoint = false;
				speechimg.hasControls = false;
				speechimg.hasBorders  = true;
				
				OptsHandles(speechimg,refLudi);
				
				canvas.add(speechimg);
			});

		}
		
		if(refLudi.type=="qcm"){
			
			var svg = new String(getBaseQcmObj(453,210,refLudi));
			
			fabric.loadSVGFromString(svg, function(objects, options) {
			
			  var obj = fabric.util.groupSVGElements(objects, options);
			  obj.left = ol;
			  obj.top = ot;
			  obj.scaleX = ow/453;
			  obj.scaleY =  oh/210;
			  obj.lockRotation = true;
			  obj.lockScalingY = true;
			  obj.lockScalingX = true;
			  obj.lockMovementX = false;
			  obj.hasControls = false;
			  obj.hasRotatingPoint = false;
			  obj.id = uid;
			  OptsHandles(obj,refLudi);

			  canvas.add(obj);
			
			});

		}
		
		if(refLudi.type=="lcm"){
			
			var hobj = 260;
			var svg = new String(getBaseLcm3(480,260,refLudi));

			if(refLudi.number<4){
				refLudi.height = hobj;
				oh = hobj;
			}
			if(refLudi.number==4){
				refLudi.height = hobj;
				oh = hobj;
				svg = new String(getBaseLcm4(480,260,refLudi));
			}
			if(refLudi.number==5){
				hobj = 320;
				refLudi.height = hobj;
				oh = hobj;
				svg = new String(getBaseLcm5(480,320,refLudi));
			}
			if(refLudi.number==6){
				hobj = 350;
				refLudi.height = hobj;
				oh = hobj;
				svg = new String(getBaseLcm6(480,350,refLudi));
			}
			
			fabric.loadSVGFromString(svg, function(objects, options) {
			
			  var obj = fabric.util.groupSVGElements(objects, options);
			  obj.left = ol;
			  obj.top = ot;
			  obj.scaleX = ow / 480;
			  obj.scaleY =  oh / hobj;
			  obj.lockRotation = true;
			  obj.lockScalingY = true;
			  obj.lockScalingX = true;
			  obj.lockMovementX = false;
			  obj.hasControls = false;
			  obj.hasRotatingPoint = false;
			  obj.id = uid;
			  OptsHandles(obj,refLudi);
				
			  canvas.add(obj);
			
			});

		}
		
		if(refLudi.type=="text"){
			
			refLudi.realwidth = refLudi.width;
			refLudi.realheight = refLudi.height;
			
			var text = new rectLudiscape({
				left: ol,
				top: ot,
				width: ow,
				height: oh,
				borderColor :'#A9E2F3',
				label:'',
				fontSize : 18,
				fill: '',
				textColor : 'black',
				stroke : 'gray',
				strokeWidth : 0.5
			});
			
			text.lockRotation = true;
			text.hasRotatingPoint = false;
			text.lockScalingY = false;
			text.lockScalingX = false;
			text.lockMovementX = false;
			text.hasControls = true;
			text.hasBorders  = true;
			text.setControlsVisibility({
				mt: false, 
				mb: true,
				mr: true, 
				ml: false, 
				bl: false,
				br: false, 
				tl: false, 
				tr: false,
				mtr: false,
			});
			text.id = uid;
			OptsHandles(text,refLudi);

			canvas.add(text);

		}
		
		if(refLudi.type=="label"){
			
			refLudi.realwidth = refLudi.width;
			refLudi.realheight = refLudi.height;
			
			//refLudi.text
			var text = new rectLudiscape({
				left: ol,
				top: ot,
				width: ow,
				height: oh,
				borderColor :'black',
				label:'',
				stroke: 'white',
    			strokeWidth: 0,
				fontSize : 14,
				fill: '',
				textColor : 'black',
				stroke : 'gray',
				strokeWidth : 0.5
			});
			
			text.lockRotation = true;
			text.hasRotatingPoint = false;
			text.lockScalingY = false;
			text.lockScalingX = false;
			text.lockMovementX = false;
			text.hasControls = true;
			text.hasBorders  = true;
			text.setControlsVisibility({
				mt: false, 
				mb: true,
				mr: true, 
				ml: false, 
				bl: false,
				br: false, 
				tl: false, 
				tr: false,
				mtr: false,
			});
			text.id = uid;
			OptsHandles(text,refLudi);
			
			canvas.add(text);

		}
		
		if(refLudi.type=="dom"){
			
			refLudi.realwidth = refLudi.width;
			refLudi.realheight = refLudi.height;
			
			//refLudi.text
			var text = new rectLudiscape({
				left: ol,
				top: ot,
				width: ow,
				height: oh,
				borderColor :'black',
				label:'',
				stroke: 'white',
    			strokeWidth: 0,
				fontSize : 14,
				fill: '',
				textColor : 'black',
				stroke : 'pink',
				strokeWidth : 0.5
			});
			
			text.lockRotation = true;
			text.hasRotatingPoint = false;
			text.lockScalingY = false;
			text.lockScalingX = false;
			text.lockMovementX = false;
			text.hasControls = true;
			text.hasBorders  = true;
			text.setControlsVisibility({
				mt: false, 
				mb: true,
				mr: true, 
				ml: false, 
				bl: false,
				br: false, 
				tl: false, 
				tr: false,
				mtr: false,
			});
			text.id = uid;
			OptsHandles(text,refLudi);
			
			canvas.add(text);

		}

		if(refLudi.type=="tcm"){
			
			refLudi.realwidth = refLudi.width;
			refLudi.realheight = refLudi.height;
			
			var text = new rectLudiscape({
				left: ol,
				top: ot,
				width: ow,
				height: oh,
				borderColor :'#A9E2F3',
				label: '',
				fontSize : 18,
				fill: '',
				textColor : 'black'
			});
			
			text.lockRotation = true;
			text.hasRotatingPoint = false;
			text.lockScalingY = false;
			text.lockScalingX = false;
			text.lockMovementX = false;
			text.hasControls = true;
			text.hasBorders  = true;
			text.id = uid;
			
			text.setControlsVisibility({
				mt: false, 
				mb: true,
				mr: true, 
				ml: false, 
				bl: false,
				br: false, 
				tl: false, 
				tr: false,
				mtr: false,
			});
			
			OptsHandles(text,refLudi);
			
			canvas.add(text);

		}
		
		if(refLudi.type=="title"){
			
			var txt = refLudi.text;
			
			if(isTxtHtml(refLudi.text)){
				txt = "";
			}
			
			var text = new rectLudiscape({
				left: ol,
				top: ot,
				width: ow,
				height: oh,
				borderColor :'#A9E2F3',
				label: txt,
				fontSize : 20,
				fill: '',
				textColor : 'white'
			});
			
			titleBase = refLudi.text;
			
			text.lockRotation = true;
			text.lockScalingY = true;
			text.lockScalingX = true;
			text.lockMovementX = false;
			text.hasRotatingPoint = false;
			text.hasControls = false;
			text.hasBorders  = true;
			text.id = uid;
			OptsHandles(text,refLudi);
			
			canvas.add(text);
			canvas.bringToFront(text)

		}
		
		if(refLudi.type=="button"){
			
			var svg = new String(getBaseBouton(ow,oh,refLudi));
			
			fabric.loadSVGFromString(svg, function(objects, options) {
			
			var obj = fabric.util.groupSVGElements(objects, options);
			obj.left = ol;
			obj.top = ot;
			obj.scaleX = 1;
			obj.scaleY =  1;
			obj.lockRotation = true;
			obj.lockScalingY = true;
			obj.lockScalingX = true;
			obj.lockMovementX = false;
			obj.hasRotatingPoint = false;
			obj.hasControls = false;
			obj.hasBorders  = true;
			obj.id = uid;
			OptsHandles(obj,refLudi);
			
			canvas.add(obj);
			
			});

		}
		
		if(refLudi.type=="input"){
			
			var svg = new String(getBaseInput(ow,oh,refLudi));
			
			fabric.loadSVGFromString(svg, function(objects, options) {
			
			var obj = fabric.util.groupSVGElements(objects, options);
			obj.left = ol;
			obj.top = ot;
			obj.scaleX = 1;
			obj.scaleY =  1;
			obj.lockRotation = true;
			obj.lockScalingY = true;
			obj.lockScalingX = true;
			obj.lockMovementX = false;
			obj.hasRotatingPoint = false;
			obj.hasControls = false;
			obj.hasBorders  = true;
			obj.id = uid;
			OptsHandles(obj,refLudi);
		
			canvas.add(obj);
			
			});

		}
		
		//variable
		if(refLudi.type=="variable"){
			
			var svg = new String(getBaseVariable(ow,oh,refLudi));
			
			fabric.loadSVGFromString(svg, function(objects, options) {
			
			var obj = fabric.util.groupSVGElements(objects, options);
			obj.left = ol;
			obj.top = ot;
			obj.scaleX = 1;
			obj.scaleY =  1;
			obj.lockRotation = true;
			obj.lockScalingY = true;
			obj.lockScalingX = true;
			obj.lockMovementX = false;
			obj.hasRotatingPoint = false;
			obj.hasControls = false;
			obj.hasBorders  = true;
			obj.id = uid;
			OptsHandles(obj,refLudi);
			
			canvas.add(obj);
			
			});

		}

		if(refLudi.type=="fluxPts"){
			
			var fluxPtsSrc = 'img/flux-add.png';
			
			if(UrlExists(fluxPtsSrc)){
				
				fabric.util.loadImage(fluxPtsSrc, function(img){
					
					var legimg = new fabric.Image(img,{
						left : ol,top  : ot,
						scaleX : ow / img.width,
						scaleY : oh / img.height
					});
					
					legimg.id = uid;
					legimg.preserveObjectStacking = true;
					legimg.lockRotation = true;
					legimg.lockScalingY = true;
					legimg.lockScalingX = true;
					legimg.lockMovementX = false;
					legimg.hasRotatingPoint = false;
					legimg.hasControls = false;
					legimg.hasBorders  = true;
					OptsHandles(legimg,refLudi);
					canvas.add(legimg);

					
				});
			
			}else{
				
				var imgsrc = 'img/error.png';
				fabric.util.loadImage(imgsrc, function(img){
					var legimg = new fabric.Image(img,{
						left : ol,
						top  : ot,
						scaleX : ow / rw,
						scaleY : oh / rh
					});
					legimg.id = uid;
					canvas.add(legimg);
				});
				
			}
			
		}
		
		if(refLudi.type=="helper"){
			
			if(refLudi.text=="test"){
			
				var imgsrc = refLudi.data;
				
				var svg = new String(getBaseHelper(453,210,refLudi));
				
				fabric.loadSVGFromString(svg, function(objects, options) {
				
					var obj = fabric.util.groupSVGElements(objects, options);
					obj.left = ol;
					obj.top = ot;
					obj.scaleX = ow/rw;
					obj.scaleY = oh/rh;
					obj.lockRotation = true;
					obj.lockScalingY = true;
					obj.lockScalingX = true;
					obj.lockMovementX = true;
					obj.hasControls = false;
					obj.hasRotatingPoint = false;
					obj.id = uid;
					
					OptsHandles(obj,refLudi);
					
					canvas.add(obj);
				
				});
				
			}else{
			
				var imgsrc = refLudi.data;
				
				fabric.util.loadImage(imgsrc, function(img){
					
					var legimg = new fabric.Image(img,{
						borderColor :'white',
						left : ol,
						top  : ot,
						scaleX : ow / img.width,
						scaleY : oh / img.height
					});
					
					legimg.id = uid;
					legimg.lockRotation = true;
					legimg.lockScalingY = true;
					legimg.lockScalingX = true;
					legimg.lockMovementX = false;
					legimg.hasRotatingPoint = false;
					legimg.hasControls = false;
					legimg.hasBorders  = true;
					legimg.lockMovementX = true;
					legimg.lockMovementY = true;
					
					canvas.add(legimg);
					
				});

			}
			
		}
		
	}else{
		
	}

}

function correctUrlImg(imgsrc){
	
	if(typeof(imgsrc)=='undefined'){
		imgsrc = "";
	}
	if(imgsrc=='undefined'){
		imgsrc = "";
	}
	if(imgsrc.indexOf("assets")==-1){
		imgsrc = folderAllImages + imgsrc;
	}
	if(imgsrc.indexOf("/assets/")!=-1){
		imgsrc = folderAllImages + findNameOfFile(imgsrc);
	}
	if(imgsrc.indexOf("img")!=-1&&imgsrc.indexOf("playvideo.png")!=-1){
		imgsrc = folderAllImages + "playvideo.png";
	}
	if(imgsrc.indexOf("img/bulle")!=-1&&imgsrc.indexOf("assets")!=-1){
		imgsrc = imgsrc.replace("img/bulle", "bulle");
	}
	return imgsrc;
}

function correctLocalUrlImg(imgsrc){
	
	if(imgsrc.indexOf("file:")!=-1||imgsrc.indexOf("Users/")!=-1){
		if(imgsrc.indexOf("plugins/")!=-1){

			var folderPlugins = folderAllImages.replace("assets", "plugins");
			var local = findNameOfFileForPlugins(imgsrc);
			newimgsrc = 'file:///' + folderPlugins + local;
			newimgsrc = newimgsrc.replace(/\\/g, "/");
			console.log(imgsrc + ' correctLocalUrlImg ' + newimgsrc);
			imgsrc = newimgsrc;
		}
		
	}
	
	//file:///C:/Users/pouet/AppData/Roaming/OpenElearning/openelearning/plugins/ProgressGlobalTop/resources/sreenptwin.png"

	return imgsrc;
}

function findNameOfFile(imgsrc){
	if(imgsrc.indexOf("/")!=-1){
		imgsrc = imgsrc.substring(imgsrc.lastIndexOf('/')+1);
	}
	if(imgsrc.indexOf("\\")!=-1){
		imgsrc = imgsrc.substring(imgsrc.lastIndexOf('\\')+1);
	}
	return imgsrc;
}

function findNameOfFileForPlugins(imgsrc){
	if(imgsrc.indexOf("/")!=-1){
		imgsrc = imgsrc.substring(imgsrc.lastIndexOf('plugins/')+8);
	}
	if(imgsrc.indexOf("\\")!=-1){
		imgsrc = imgsrc.substring(imgsrc.lastIndexOf('plugins\\')+8);
	}
	return imgsrc;
}
