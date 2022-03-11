	
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
			
		
			var fcheck = r[0];
			
			if(fcheck.indexOf("1")!=-1){
				document.getElementById('checkBoxActive').checked = true;
			}else{
				document.getElementById('checkBoxActive').checked = false;
			}
			
		}
		
		main();
		
	}
	
	function main(){
		
		var fcheck = "0";
		var imageC = "bigCheckGreenScreenNo.png";
		if(document.getElementById('checkBoxActive').checked){
			fcheck = "1";
			imageC = "bigCheckGreenScreen.png";
		}

		var f = fcheck+'|'+imageC+'|||';
		
		out.value = f;
		
		setTimeout(function(){main();},200);
		
	}
	
	setTimeout(function(){
		init();
	},300);
	