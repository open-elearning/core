
var oneCreaIsopersoopen = 0;
var objIsopersoopen = 0;

function onPaint(obj){
	objIsopersoopen = obj;
	var h = '<div id="bloc' + obj.id + '" class="mapjpc886 bloc' + obj.id + '" ></div>';
	oneCreaIsopersoopen = 0;
	setTimeout("installIsoPerso(" + obj.id + ");",500);
	return h;	
}

function installIsoPerso(i){
	
	if(oneCreaIsopersoopen==0){
		
		oneCreaIsopersoopen = 1;

		var obj = CObjets[i];

		var objT0 = LUDI.createBase();
		objT0.type = "gameisoavatar"; 
		objT0.idscript = "gameisoavatar886";
		objT0.x = objIsopersoopen.x;
		objT0.y = objIsopersoopen.y;
		objT0.w = 66;objT0.h = 192;
		objT0.text = "images/open-sprite-solo.png";
		objT0.fontsize = 20;
		objT0.color = "Black";
		objT0.ind = 1;objT0.boite = "";
		objT0.an = 1;objT0.de = 0;
		objT0.css = "border: solid 1px Gray;";
		objT0.contenu6 = 0;objT0.option3 = 0;
		objT0.src = "data/open-sprite.png";
		if(obj.fields[0].indexOf(".png")!=-1){
			objT0.src = "data/" + obj.fields[0];
		}
		objT0.contenu3 = "";
		objT0.contenu4 = "";
		
		CObjets_Add(objT0);
	
	}
	
}

function onZoom(obj){

}

function isOK(obj){
	return true;
}
