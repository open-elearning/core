
function onPaint(obj){
	
	if(!document.getElementById("actionBlocCalc")){
		
		var h = '<div id="actionBlocCalcul" class="calculatorBlock" >';
		h += '<div class="openBlocCalcul" onClick="showActionCalculatrice();" ></div>';
		h += '<div class="crossBlocCalcul" onClick="closeActionCalculatrice();" ></div>';
		h += '<table class="calculatrice" id="calc">';
        h += '<tr>';
        h += '<td colspan="4" class="calc_td_resultat">';
        h += '<input type="text" readonly="readonly" name="calc_resultat" id="calc_resultat" class="calc_resultat" />';
        h += '</td></tr><tr>';
		h += '<td class="calc_td_btn">';
        h += '<input type="button" class="calc_btn" value="CE" ';
		h += 'onclick="f_calc(\'calc\',\'ce\');" /></td>';
        h += '<td class="calc_td_btn">';
        h += '<input type="button" class="calc_btn" value="&larr;" onclick="f_calc(\'calc\',\'nbs\');" />';
        h += '</td><td class="calc_td_btn">';
        h += '<input type="button" class="calc_btn" value="%" onclick="appliqueDiv100();" />';
        h += '</td><td class="calc_td_btn">';
        h += '<input type="button" class="calc_btn" value="+" onclick="f_calc(\'calc\',\'+\');" />';
        h += '</td></tr><tr><td class="calc_td_btn">';
        h += '<input type="button" class="calc_btn" value="7" ';
		h += 'onclick="add_calc(\'calc\',7);" /> ';
        h += '</td><td class="calc_td_btn"> ';
        h += '<input type="button" class="calc_btn" value="8" ';
		h += 'onclick="add_calc(\'calc\',8);" /> ';
        h += '</td><td class="calc_td_btn"> ';
        h += '<input type="button" class="calc_btn" value="9" ';
		h += 'onclick="add_calc(\'calc\',9);" /> ';
        h += '</td><td class="calc_td_btn">';
        h += '<input type="button" class="calc_btn" value="-" ';
		h += 'onclick="f_calc(\'calc\',\'-\');" />';
        h += '</td></tr><tr><td class="calc_td_btn">';
		h += '<input type="button" class="calc_btn" value="4" ';
		h += ' onclick="add_calc(\'calc\',4);" />';
        h += '</td><td class="calc_td_btn">';
        h += '<input type="button" class="calc_btn" value="5" ';
		h += ' onclick="add_calc(\'calc\',5);" />';
        h += '</td><td class="calc_td_btn">';
        h += '<input type="button" class="calc_btn" value="6" ';
		h += 'onclick="add_calc(\'calc\',6);" />';
        h += '</td><td class="calc_td_btn">';
        h += '<input type="button" class="calc_btn" value="x" ';
		h += 'onclick="f_calc(\'calc\',\'*\');" />';
        h += '</td></tr><tr><td class="calc_td_btn">';
        h += '<input type="button" class="calc_btn" value="1" ';
        h += 'onclick="add_calc(\'calc\',1);" />';
        h += '</td><td class="calc_td_btn">';
        h += '<input type="button" class="calc_btn" value="2" ';
        h += 'onclick="add_calc(\'calc\',2);" />';
        h += '</td>';
		h += '<td class="calc_td_btn">';
        h += '<input type="button" class="calc_btn" value="3" ';
        h += 'onclick="add_calc(\'calc\',3);" />';
        h += '</td>';
		h += '<td class="calc_td_btn" >';
        h += '<input type="button" class="calc_btn" value="/" ';
        h += ' onclick="f_calc(\'calc\',\'div\');" />';
        h += '</td>';
		h += '</tr><tr>';
		h += '<td class="calc_td_btn">';
        h += '<input type="button" class="calc_btn" value="&plusmn;" ';
        h += 'onclick="f_calc(\'calc\',\'+-\');" />';
        h += '</td>';
        h += '<td class="calc_td_btn">';
        h += '<input type="button" class="calc_btn" value="0" ';
        h += 'onclick="add_calc(\'calc\',0);" />';
        h += '</td>';
		h += '<td class="calc_td_btn">';
        h += '<input type="button" class="calc_btn" value="," ';
        h += 'onclick="add_calc(\'calc\',\'.\');" />';
        h += '</td>';
		h += '<td class="calc_td_btn">';
        h += '<input type="button" class="calc_btn" value="=" ';
        h += 'onclick="f_calc(\'calc\',\'egal\');" />';
        h += '</td></tr></table>';
		h += '</div>';
		
		$("body").append(h);
		
		setTimeout(function(){ 
			document.getElementById('calc').onload=initialiser_calc('calc');
		},300);
		
	}
	
	return "";

}

function appliqueDiv100(){
	f_calc('calc','div');
	add_calc('calc','1');
	add_calc('calc','0');
	add_calc('calc','0');
	f_calc('calc','egal');
}

function onZoom(obj){}
function isOK(obj){}

function showActionCalculatrice(){
	
	$(".openBlocCalcul").css("display","none");
	
	$("#actionBlocCalcul").animate({
		width:"350px",
		height:"310px"
	},500,function(){
		$(".calculatrice").css("display","block");
		$(".crossBlocCalcul").css("display","block");
	});

}

function closeActionCalculatrice(){
	
	
	$(".crossBlocCalcul").css("display","none");
	$(".calculatrice").css("display","none");
		
	$("#actionBlocCalcul").animate({
		width:"58px",height:"58px"
	},500,function(){
		$(".openBlocCalcul").css("display","block");
	});

}

calc_array = new Array();

var calcul=0;
var pas_ch=0;

function $id(id){
    return document.getElementById(id);
}

function f_calc(id,n){
	
	if(n=='div'){n = '/';}
	if(n=='egal'){n = '=';}
	
	if(n=='ce'){
	
		initialiser_calc(id);
	
	}else if(n=='='||n=='egal'){
		
		if(calc_array[id][0]!='=' && calc_array[id][1]!=1)
		{	
			var ev = 'calcul='+calc_array[id][2]+calc_array[id][0]+calc_array[id][3]+';';
			eval(ev);


			calc_array[id][0] = '=';
			var idfinal = id + '_resultat';
			$id(id + '_resultat').value = calcul;
			calc_array[id][2]=calcul;
			calc_array[id][3]=0;
		
		}
		
	}else if(n=='+-'){
		$id(id+'_resultat').value=$id(id+'_resultat').value*(-1);
		if(calc_array[id][0]=='=')
		{
			calc_array[id][2] = $id(id+'_resultat').value;
			calc_array[id][3] = 0;
		}
		else
		{
			calc_array[id][3] = $id(id+'_resultat').value;
		}
		pas_ch = 1;
	}else if(n=='nbs'){
		if($id(id+'_resultat').value<10 && $id(id+'_resultat').value>-10)
		{
			$id(id+'_resultat').value=0;
		}
		else
		{
			$id(id+'_resultat').value=$id(id+'_resultat').value.slice(0,$id(id+'_resultat').value.length-1);
		}
		if(calc_array[id][0]=='=')
		{
			calc_array[id][2] = $id(id+'_resultat').value;
			calc_array[id][3] = 0;
		}
		else
		{
			calc_array[id][3] = $id(id+'_resultat').value;
		}
	}else{
		if(calc_array[id][0]!='=' && calc_array[id][1]!=1)
		{
			eval('calcul='+calc_array[id][2]+calc_array[id][0]+calc_array[id][3]+';');
			$id(id+'_resultat').value=calcul;
			calc_array[id][2]=calcul;
			calc_array[id][3]=0;
		}
		calc_array[id][0] = n;
	}
	if(pas_ch==0){
		calc_array[id][1] = 1;
	}else{
		pas_ch=0;
	}
	document.getElementById(id+'_resultat').focus();
	return true;
}

function add_calc(id,n){
	
	if(calc_array[id][1]==1)
	{
			$id(id+'_resultat').value=n;
	}
	else
	{
			$id(id+'_resultat').value+=n;
	}
	if(calc_array[id][0]=='=')
	{
			calc_array[id][2] = $id(id+'_resultat').value;
			calc_array[id][3] = 0;
	}
	else
	{
			calc_array[id][3] = $id(id+'_resultat').value;
	}
	calc_array[id][1] = 0;
	document.getElementById(id+'_resultat').focus();
	return true;
}

function initialiser_calc(id){
        $id(id+'_resultat').value=0;
        calc_array[id] = new Array('=',1,'0','0',0);
        document.getElementById(id+'_resultat').focus();
        return true;
}
