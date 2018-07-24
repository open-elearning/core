
function onPaint(obj){
	
	var sp = LUDI.getScore();
	
	var h = '<table class="cmqrightleft bloc' + obj.id + '" >';
	
	h += '<tr><td colspan=3 style="text-align:center;" >###quest###</td></tr>';
	
	h += getCmqLeftRightLine(obj.id,1);
	h += getCmqLeftRightLine2(obj.id,2);
	h += getCmqLeftRightLine(obj.id,3);
	
	h = h.replace('###quest###',obj.fields[0]);
	
	h = h.replace('###d1###',obj.fields[1]);
	h = h.replace('###g1###',obj.fields[2]);
	
	h = h.replace('###d2###',obj.fields[3]);
	h = h.replace('###g2###',obj.fields[4]);
	
	h = h.replace('###d3###',obj.fields[5]);
	h = h.replace('###g3###',obj.fields[6]);
	
	if(obj.fields[7]!=''){
		
		h += getCmqLeftRightLine2(obj.id,4);	
		
		h = h.replace('###d4###',obj.fields[7]);
		h = h.replace('###g4###',obj.fields[8]);
		
		if(obj.fields[9]!=''){
			
			h += getCmqLeftRightLine(obj.id,5);
			h = h.replace('###d5###',obj.fields[9]);
			h = h.replace('###g5###',obj.fields[10]);
		
		}
	}
	
	h += '</table>';
	
	setTimeout(function(){
		initCmqLeftRight();
		recupDataObjectMem(obj,lastPage0);
	},200);
	
	return h;
	
}

function initCmqLeftRight(){
	
	$(".checkrl").on("click",function(){
		
		if($(this).hasClass("checkrl")){
			$(this).removeClass("checkrl");
			$(this).addClass("checkrlactive");
		}
		
		var result = parseInt($(this).attr("datarep"));
		var idstr = $(this).attr("id");
		
		var elem = $(this).parent().parent();
		
		if(document.getElementById(idstr).checked){
			elem.next().css("font-weight","bold");
			elem.prev().css("font-weight","normal");
		}else{
			elem.prev().css("font-weight","bold");
			elem.next().css("font-weight","normal");
		}
		
	});
	
}

function getCmqLeftRightLine(id,i){
	
	var h = '<tr><td id="colLeft' + id + '" class="repleft' + id + ' autoSelectLR" ';
	h += ' onClick="autoSelectLineL(' + id + ',' + i + ');" ';
	h += 'style="text-align:right;" >###g' + i + '###&nbsp;</td>';
	h += '<td style="width:40px;position:relative;" >';
	h += '<p><input class="checkrl checkind' + id + '" ';
	h += 'type="checkbox" datarep="0" id="checkcmq' + id + '-' + i + '" />';
	h += '<label for="checkcmq' + id + '-' + i + '" >';
	h += '<span class="ui"></span></label></p>';
	h += '</td><td id="colRight' + id + '" ';
	h += ' onClick="autoSelectLineR(' + id + ',' + i + ');" ';
	h += 'class="repright' + id + ' autoSelectLR" >###d' + i + '###</td></tr>';
	return h;
	
}

function getCmqLeftRightLine2(id,i){
	
	var h = '<tr><td id="colLeft' + id + '" class="repleft' + id + ' autoSelectLR" ';
	h += ' onClick="autoSelectLineL(' + id + ',' + i + ');" ';
	h += 'style="text-align:right;" >###d' + i + '###&nbsp;</td>';
	h += '<td style="width:40px;position:relative;" >';
	h += '<p><input class="checkrl checkind' + id + '" ';
	h += 'type="checkbox" datarep="1" id="checkcmq' + id + '-' + i + '" />';
	h += '<label for="checkcmq' + id + '-' + i + '" >';
	h += '<span class="ui"></span></label></p>';
	h += '</td><td id="colRight' + id + '" ';
	h += ' onClick="autoSelectLineR(' + id + ',' + i + ');" ';
	h += 'class="repright' + id + ' autoSelectLR" >###g' + i + '###</td></tr>';
	return h;
	
}

function autoSelectLineL(id,i){
	document.getElementById('checkcmq' + id + '-' + i).checked = false;
	
	var elem = $('#checkcmq' + id + '-' + i).parent().parent();
	elem.prev().css("font-weight","bold");
	elem.next().css("font-weight","normal");
	$('#checkcmq' + id + '-' + i).removeClass("checkrl");
	$('#checkcmq' + id + '-' + i).addClass("checkrlactive");
}

function autoSelectLineR(id,i){
	document.getElementById('checkcmq' + id + '-' + i).checked = true;
	
	var elem = $('#checkcmq' + id + '-' + i).parent().parent();
	elem.next().css("font-weight","bold");
	elem.prev().css("font-weight","normal");
	$('#checkcmq' + id + '-' + i).removeClass("checkrl");
	$('#checkcmq' + id + '-' + i).addClass("checkrlactive");
}

function onZoom(obj){
	
	var xb = parseInt(obj.x * zoom);
	var yb = parseInt(obj.y * zoom);
	
	var wb = parseInt(obj.w * zoom);
	var hb = parseInt(obj.h * zoom);
	
	$('#colLeft'+obj.id).css("width",parseInt((wb-40)/2) + "px");
	$('#colRight'+obj.id).css("width",parseInt((wb-40)/2) + "px");
	
}

function viewResults(obj){
	
	var i = 1;
	
	
	$('.checkind' + obj.id).each(function(index){
		
		var result = parseInt($(this).attr("datarep"));
		var idstr = $(this).attr("id");
		var elem = $(this).parent().parent();
		
		if(result==0){
			
			if($(this).hasClass("checkrl")){
				elem.prev().css("color","green").css("font-weight","bold");
			}else{
				if(document.getElementById(idstr).checked){
					elem.next().css("color","red").css("text-decoration","line-through");
					elem.prev().css("color","green");
				}else{
					elem.prev().css("color","green");
				}
			}
			
			document.getElementById(idstr).checked = false;
			
		}else{
			
			if($(this).hasClass("checkrl")){
			
				elem.next().css("color","green").css("font-weight","bold");
			
			}else{
				
				if(document.getElementById(idstr).checked){
					elem.next().css("color","green");
				}else{
					elem.prev().css("color","red").css("text-decoration","line-through");
					elem.next().css("color","green");
				}
				
			}
			
			document.getElementById(idstr).checked = true;
		
		}
		i++;
	});
	
	$('.checkind' + obj.id).each(function(index){
		if($(this).hasClass("checkrl")){
			$(this).removeClass("checkrl");
			$(this).addClass("checkrlactive");
		}
	});	
	
}

function viewErrors(obj){
	
	var i = 1;
	
	$('.checkind' + obj.id).each(function(index){
		
		var result = parseInt($(this).attr("datarep"));
		var idstr = $(this).attr("id");
		var elem = $(this).parent().parent();//.parent();
		var idAnim = obj.id * 100;
		
		var es = "<span id='idAnim" + idAnim + "' ";
		es = es + " class='errorMarkDiv suiviErreurMark' ";
		es = es + "style='left:0px;top:0px;' >&#x2717;</span>";
		
		if(result==0){
			
			if($(this).hasClass("checkrl")){
				elem.append(es);
			}else{
				if(document.getElementById(idstr).checked){
					elem.append(es);
				}
			}
			
		}else{
			
			if($(this).hasClass("checkrl")){
				elem.append(es);
			}else{
				if(document.getElementById(idstr).checked){
					
				}else{
					elem.append(es);
				}
			}	
		}
			
		i++;
	});
	
}

function sendObjMemory(obj){
	
	var t = '';
	$('.checkind' + obj.id).each(function(index){
		if($(this).hasClass("checkrl")){
			t = t + 'n|';
		}else{
			var idstr = $(this).attr("id");
			if(document.getElementById(idstr).checked){
				t = t + '1|';
			}else{
				t = t + '0|';
			}
		}
	});
	return t;
	
}

function retrieveObjMemory(obj,mem){
	
	mem = mem + '||||||||';
	
	var r = mem.split('|');
	
	for(var e=0;e<r.length;e++){
		
		var valcase = r[e];
		
		if(valcase!='n'&&valcase!=''){
			
			var i = 0;
			
			$('.checkind' + obj.id).each(function(index){
				if(e==i){
					$(this).removeClass("checkrl");
					$(this).addClass("checkrlactive");
					var idstr = $(this).attr("id");
					if(valcase=='0'){
						document.getElementById(idstr).checked = false;
					}else{
						document.getElementById(idstr).checked = true;
					}
				}
				i++;
			});

		}
	
	}
	
}

function isOK(obj){
	
	var i = 1;
	
	var r = true;

	$('.checkind' + obj.id).each(function(index){
		
		if($(this).hasClass("checkrl")){
			r =  false;
		}
		
		var idstr = $(this).attr("id");	
		var result = parseInt($(this).attr("datarep"));
		
		if(result==0){
			if(geicheck(idstr)){r =  false;}
		}else{
			if(!geicheck(idstr)){r =  false;}
		}
		
		i++;
		
	});
	
	return r;
	
}
