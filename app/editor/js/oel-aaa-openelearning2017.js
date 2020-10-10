
function openelearning2017() {
	
    this.load = function(id){};
	
	this.gebi = function(n){
		return document.getElementById(n);
	};

	this.gvbi = function(n) {
		
		if(document.getElementById(n)){
		
			var tagName = document.getElementById(n).tagName;
			
			if(tagName=='SELECT'){
				var get_id = document.getElementById(n);
				var resultselect = get_id.options[get_id.selectedIndex].value;
				return resultselect;
			}
			
			if(tagName=='INPUT'){
				return document.getElementById(n).value;
			}
			
			if(tagName=='TEXTAREA'){
				var ct = document.getElementById(n).value;
				ct = ct.replace('\n','<br />');
				return ct;
			}
		
		}else{
		
			return "-"
			
		}
	};
	
	this.real = function(txt, rep, witht) {
		return txt.replace(new RegExp(rep,'g'),witht);
	};
	
	this.cthl = function(txt) {
		txt = this.real(txt,'$','<br />');
		txt = this.real(txt,'_','<br />');

		txt = this.real(txt,'cµ','<center>');
		txt = this.real(txt,'µc','</center>');
		return txt;
	};
	
	this.getMenu = function(n){
		h = '<div class="m'+n+' mpan" onClick="ludiCss(\''+n+'-vertical\');" >';
		return h + '</div>';
	};

	this.extractvId = function(n){
		n = this.real(n,'http://www.youtube.com/watch?v=','');
		n = this.real(n,'https://www.youtube.com/watch?v=','');
		n = this.real(n,'https://youtu.be/','');
		n = this.real(n,'https://www.youtube.com/','');
		n = this.real(n,'http://www.youtube.com/','');
		n = this.real(n,'/','');
		n = this.real(n,' ','');
		n = this.real(n,' ','');
		n = n.replace('watch?v=','');
		n = n.replace('/','');
		n = n.replace(' ','');
		n = n.replace(' ','');
		var ampersandPosition = n.indexOf('&');
		if(ampersandPosition != -1) {
			n = n.substring(0, ampersandPosition);
		}
		return n;
	};
	
	this.extractIdStr = function(s){
		s = s.replace(' ','');
		s = s.replace(' ','');
		s = replaceAll(s,'ô','o');
		s = replaceAll(s,'é','e');
		s = replaceAll(s,'è','e');
		s = replaceAll(s,'à','a');
		s = replaceAll(s,'à','a');
		s = replaceAll(s,'ç','c');
		s = replaceAll(s,'ù','u');
		s = replaceAll(s,'ï','i');
		s = replaceAll(s,'ö','o');
		s = replaceAll(s,'â','a');
		return s;
	};
	
}

var openelearning = new openelearning2017();
