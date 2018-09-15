	

	var out = document.getElementById("finalcode");
	
	function init(){
		
		var str = '||||||||||';
		if(out.value!=''){
			str=out.value + '||||||||||';
		}else{
			setTimeout(function(){init();},200);
			return false;
		}
		
		var r = str.split('|');
		
		if(r.length>1){
			$("#d1").val(r[0]);
			$("#d2").val(r[1]);
		}else{
			$("#d1").val('6,5,4,3,2,1,');
			$("#d2").val('1,2,3,4,3,2,');
		}
		
		if(r[0]==''){
			$("#d1").val('6,5,4,3,2,1,');
		}
		if(r[1]==''){
			$("#d2").val('1,2,3,4,3,2,');
		}
		
		main();
		
	}
	
	function main(){
		

		var f = $("#d1").val()+'|'+$("#d2").val()+'|';
		
		out.value = f;
		
		setTimeout(function(){main();},200);
		
	}
	
	setTimeout(function(){
		init();
	},300);