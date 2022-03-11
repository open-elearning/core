	
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
			
			$("#d1").val(r[1]);
			$("#d2").val(r[2]);
			$("#d3").val(r[3]);
			$("#d4").val(r[4]);
			$("#d5").val(r[5]);
			$("#d6").val(r[6]);
			$("#d7").val(r[7]);
			$("#d8").val(r[8]);
			$("#d9").val(r[9]);
			$("#d10").val(r[10]);
			
			var fcheck = r[0];
			
			if(fcheck.indexOf("1")!=-1){
				document.getElementById('checkboxloop').checked = true;
			}else{
				document.getElementById('checkboxloop').checked = false;
			}
			
			if(fcheck.indexOf("2")!=-1){
				document.getElementById('checkboxnextpage').checked = true;
			}else{
				document.getElementById('checkboxnextpage').checked = false;
			}
			
			if(fcheck.indexOf("3")!=-1){
				document.getElementById('checkboxspeedmode').checked = true;
			}else{
				document.getElementById('checkboxspeedmode').checked = false;
			}
			
	
		}else{
			$("#d1").val('Hello, :-)');
			$("#d2").val('Hi Damien, How are you ?');
		}
		
		if(r[1]==''){
			$("#d1").val('Hello, :-)');
			$("#d2").val('Hi Damien, How are you ?');
		}
		
		main();
		
	}
	
	function main(){
		
		var fcheck = "";
		
		if(document.getElementById('checkboxloop').checked){
		fcheck = "1";}
		
		if(document.getElementById('checkboxnextpage').checked){
		fcheck = fcheck + "2";}
		
		if(document.getElementById('checkboxspeedmode').checked){
		fcheck = fcheck + "3";}
		
		
		var f = fcheck+'|'+gstr(1)+'|'+gstr(2)+'|'+gstr(3)+'|'+gstr(4)+'|'+gstr(5)+'|'+gstr(6)+'|'+gstr(7)+'|'+gstr(8)+'|'+gstr(9)+'|'+gstr(10);
		
		out.value = f;
		
		setTimeout(function(){main();},200);
		
	}
	
	function gstr(i){
		var txt = $("#d" + i).val();
		txt = txt.replace(':)',':-)');
		txt = txt.replace(':(',':-(');
		txt = txt.replace(':-|',':-:');
		txt = txt.replace(':|',':-:');
		txt = txt.replace('|',':');
		txt = txt.replace('<3','smileyheart');
		
		return txt;
	}
	
	setTimeout(function(){
		init();
	},300);
	