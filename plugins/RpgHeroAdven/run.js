
function onPaint(obj){
	
	var html = '';
	html = html + '<img id="hero' + obj.id + '" class="hero2D hero' + obj.id + '" ';
	html = html + ' src="data/poseleft.gif" ';
	html = html + '/>';
	
	heroGuid = obj.id;
	setTimeout("preLoadingGame()",200);
		
	return html;
	
}

function onZoom(obj){
	
	var pw = obj.w * zoom;
	var ph = obj.h * zoom;

	$('#hero' + obj.id ).css('width',pw + 'px').css('height',ph + 'px');
	
}

function drawAllGames(){
	
	var obj = CObjets[heroGuid];
	
	
	if(isStable==false){
		
		var objx = obj.x;
		var objy = obj.y;
		
		var s = 5;
		objy = objy + s;
		
		var ctrx = objx + (obj.w/2);
		var ctry = objy + (obj.h);
		
		if(!detectCollide(ctrx,ctry)){
			obj.x = objx;
			obj.y = objy;
		}else{
			isStable = true;
		}
		
		objy = objy + s;
		
		var ctrx = objx + (obj.w/2);
		var ctry = objy + (obj.h);
		
		if(!detectCollide(ctrx,ctry)){
			obj.x = objx;
			obj.y = objy;
		}else{
			isStable = true;
		}
		
	}
	
	
	if(isMoving){
		
		var objx = obj.x;
		var objy = obj.y;
		
		var s = 5;
		
		if(facing=="E"){
			objx = objx + s;

			attrImgGameHero(obj.id,'moveright.gif');
		}
		if(facing=="O"){
			objx = objx - s;

			attrImgGameHero(obj.id,'moveleft.gif');
		}
		
		if(facing=="N"){
			objy = objy - s;
			attrImgGameHero(obj.id,'poseleft.gif');
		}
		if(facing=="S"){
			objy= objy + s;
			attrImgGameHero(obj.id,'poseleft.gif');
		}
		
		var ctrx = objx + (obj.w/2);
		var ctry = objy + (obj.h);
		
		if(!detectCollide(ctrx,ctry)){
			
			obj.x = objx;
			obj.y = objy;
			
			isStable = false;
			
		}else{
			
			if(facing=="E"){
				objx = objx + s;
				objy = objy - 10;
				attrImgGameHero(obj.id,'moveright.gif');
			}
			if(facing=="O"){
				objx = objx - s;
				objy = objy - 10;
				attrImgGameHero(obj.id,'moveleft.gif');
			}
			var ctrx = objx + (obj.w/2);
			var ctry = objy + (obj.h);
			
			if(!detectCollide(ctrx,ctry)){
				obj.x = objx;
				obj.y = objy;
				isStable = false;
			}
			
		}
		
	}else{
		if(facing=="N"){
			attrImgGameHero(obj.id,'poseleft.gif');
		}else if(facing=="E"){
			attrImgGameHero(obj.id,'poseright.gif');
		}else if(facing=="O"){
			attrImgGameHero(obj.id,'poseleft.gif');
		}else{
			attrImgGameHero(obj.id,'poseright.gif');
		}
	}
	
	var px = obj.x * zoom;
	var py = obj.y * zoom;
	
	$('#hero' + obj.id ).css('left',px + 'px').css('top',py + 'px');
	
}

function moveBlock(objx,objy,obj){
	
	if(objx>parseInt(obj.x-10)){
		if(objx<parseInt(obj.x+5)){
			obj.x = obj.x + 5;
			if(detectCollideBloc(obj.id)){
				obj.x = obj.x - 5;
			}else{
				var px = obj.x * zoom;
				$('.bloc' + obj.id).css('left',px + 'px');	
			}
			return false;
		}
	}
	
	if(objx>parseInt(obj.x+obj.w-5)){
		if(objx<parseInt(obj.x+obj.w+10)){
			obj.x = obj.x - 5;
			if(detectCollideBloc(obj.id)){
				obj.x = obj.x + 5;
			}else{
				var px = obj.x * zoom;
				$('.bloc' + obj.id).css('left',px + 'px');
			}
			return false;
		}
	}
	
	if(objy>parseInt(obj.y+obj.h-5)){
		if(objy<parseInt(obj.y+obj.h+35)){
			obj.y = obj.y - 5;
			if(detectCollideBloc(obj.id)){
				obj.y = obj.y + 5;
			}else{
				var py = obj.y * zoom;
				$('.bloc' + obj.id).css('top',py + 'px');
			}
			return false;
		}
	}
	
	if(objy>parseInt(obj.y+9)){
		if(objy<parseInt(obj.y+20)){
			obj.y = obj.y + 5;
			if(detectCollideBloc(obj.id)){
				obj.y = obj.y - 5;
			}else{
				var py = obj.y * zoom;
				$('.bloc' + obj.id).css('top',py + 'px');
			}
			return false;
		}
	}
	
}

function detectCollideBloc(b){
	
	var objBloc = CObjets[b];
	
	for (var i = 0; i < CObjets_count; i++){
		
		if(b!=i){
			
			var obj = CObjets[i];
			
			if(obj.type=='plugin-gameblock2d'||obj.idscript=='collide'){
				
				var lx = objBloc.x + objBloc.w;
				var ly = objBloc.y + (objBloc.h/2);
				
				if(lx>(obj.x-1)){
					if(lx<(obj.x+obj.w+1)){
						if(ly>(obj.y-1)){
							if(ly<(obj.y+obj.h+1)){
								return true;
							}
						}
					}
				}
				
				lx = objBloc.x;
				ly = objBloc.y + (objBloc.h/2);
				
				if(lx>(obj.x-1)){
					if(lx<(obj.x+obj.w+1)){
						if(ly>(obj.y-1)){
							if(ly<(obj.y+obj.h+1)){
								return true;
							}
						}
					}
				}
				
				lx = objBloc.x + (objBloc.w/2);
				ly = objBloc.y + objBloc.h;
				
				if(lx>(obj.x-1)){
					if(lx<(obj.x+obj.w+1)){
						if(ly>(obj.y-1)){
							if(ly<(obj.y+obj.h+1)){
								return true;
							}
						}
					}
				}
				
				lx = objBloc.x + (objBloc.w/2);
				ly = objBloc.y;
				
				if(lx>(obj.x-1)){
					if(lx<(obj.x+obj.w+1)){
						if(ly>(obj.y-1)){
							if(ly<(obj.y+obj.h+1)){
								return true;
							}
						}
					}
				}
				
				
			}
		}

	}
	
	return false;
	
}

function detectCollide(objx,objy){
	
	for (var i = 0; i < CObjets_count; i++){
		
		var obj = CObjets[i];
		
		if(obj.idscript=='collide'){
			var dy = 10;
			if(objx>obj.x&&objx<obj.x+obj.w){
				if(objy>(obj.y+dy)&&objy<(obj.y+obj.h+0)){
					return true;
				}
			}
			
		}
		
		if(obj.idscript=='collidehalf'){
			var dy = obj.h/2;
			if(objx>obj.x&&objx<obj.x+obj.w){
				if(objy>(obj.y+dy)&&objy<(obj.y+obj.h+30)){
					return true;
				}
			}
			
		}
		
		if(obj.type=='plugin-gameblock2d'){
			
			if(objx>(obj.x-1)&&objx<(obj.x+obj.w+1)){
				
				if(objy>obj.y+10){
					if(objy<(obj.y+obj.h+30)){
						moveBlock(objx,objy,obj);
						return true;
					}
				}
				
			}
			
		}
		
	}
	
	if(objx<-10){return true;}
	if(objx>970){return true;}
	if(objy<10){return true;}
	if(objy>(730)){return true;}
	
	return false;
	
}

function attrImgGameHero(id,img){
	
	var srcSource = $('#hero' + id ).attr('src');
	
	if(srcSource.indexOf(img)==-1){
		$('#hero' + id ).attr('src','data/' + img);
	}
	
}

function isOK(obj){
	return true;
}

var heroGuid = 0;
var gameloop = false;
var isMoving = false;
var isStable = false;

var facing = "E";

function gameLoopProcess(){
	
	drawAllGames();
	
	if(gameloop){
		setTimeout("gameLoopProcess()",34);
	}
	
	document.getElementById("main").focus();
	
}

function StartGameLoopProcess(){
	gameloop = true;
	gameLoopProcess();
	document.addEventListener("keydown",keyDownHandler, false);	
	document.addEventListener("keyup",keyDownHandlerUp, false);
	
	window.onkeydown = function(e) {
		if(e.keyCode == 32 && e.target == document.body) {
			e.preventDefault();
			return false;
		}
	};

	document.getElementById("main").focus();
}

function preLoadingGame(){
	
	facing = "E"; //N = North, E = East, S = South, O = Oeust
	isMoving = false;
	gameloop = false;
	setTimeout("StartGameLoopProcess()",200);			
	
}

function keyDownHandler(event){
	
	event.preventDefault();
	
	var keyPressed = String.fromCharCode(event.keyCode);
	
	if (keyPressed == "D"||parseInt(event.keyCode)==39)
	{	
		facing = "E";
		isMoving = true;		
	}else if (keyPressed == "A"||parseInt(event.keyCode)==37)
	{	
		facing = "O";
		isMoving = true;		
	}
	else if (isMoving)
	{
		isMoving = false;
	}
	
	/*if (keyPressed == "W"||parseInt(event.keyCode)==38)
	{		
		facing = "N";
		isMoving = true;
	}else 
	else if (keyPressed == "S"||parseInt(event.keyCode)==40)
	{	
		facing = "S";
		isMoving = true;		
	}*/
	
	
}

function keyDownHandlerUp(event){
	isMoving = false;
}
