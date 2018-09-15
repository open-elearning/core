	
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
			$("#lab1").val(r[0]);
			$("#d1").val(r[1]);
		}else{
			$("#lab1").val('label1,label2,label3');
			$("#d1").val('5,3,4');
		}
		
		if(r[0]==''){
			$("#lab1").val('label1,label2,label3');
			$("#d1").val('5,3,4');
		}

		main();
		
	}
	
	function main(){
		
		var f = $("#lab1").val()+'|'+$("#d1").val()+'|';
		
		out.value = f;
		
		setTimeout(function(){main();},200);
		
	}
	
	setTimeout(function(){
		init();
	},300);
	