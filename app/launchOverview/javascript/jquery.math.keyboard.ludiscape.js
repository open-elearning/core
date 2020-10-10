
(function($){
	
    $.fn.extend({
		
		mathKeyboard: function(options){
			
			var defaults = { parentId: "" , loop: "true" };
			var options = $.extend(defaults, options);
			var $this = $(this);
			
			var idL = $this.attr('id');
			var idNi = "newInput" + $this.attr('id');
			
			var sty = " style='border:solid 2px black;background:white;z-index:9;' ";
			var sty2 = " style='border:solid 0px gray;padding:2px;margin-left:5px;cursor:text;' ";
			
			var h = parseInt($("#" + idL).height());
			
			var newInput = "<div id='" + idNi + "' " + sty + " >";
			
			newInput = newInput + "<div onClick='displayKeyLudiF(\"" + idNi + "\");' id='inner" + idNi + "' " + sty2 + " >";
			newInput = newInput + "<span class='curtxt' >&nbsp;</span>&nbsp;";
			newInput = newInput + "</div>";
			
			newInput = newInput + "<div id='chara" + idNi + "' style='display:none;' >";
			newInput = newInput + "</div>";
			
			newInput = newInput + "<div id='result" + idNi + "' style='display:none;' >";
			newInput = newInput + "</div>";
			
			newInput = newInput + "</div>";
			
			var t = "<table id='keyboard" + idNi + "'  style='z-index:10;position:absolute;background:white;display:none;' >";
			
			t = t + "<tr><td ><a asty onClick='aKeyLudiF(\"" + idNi + "\",\"del\")' >&#8592;</a></td>";
			t = t + "<td ><a asty onClick='iKeyLudiF(\"" + idNi + "\",this)' >/</a></td>";
			t = t + "<td ><a asty  onClick='iKeyLudiF(\"" + idNi + "\",this)' >*</a></td>";
			t = t + "<td ><a asty  onClick='iKeyLudiF(\"" + idNi + "\",this)' >+</a></td>";
			t = t + "<td ><a asty  onClick='iKeyLudiF(\"" + idNi + "\",this)' >-</a></td></tr>"
			
			t = t + "<tr><td ><a asty  onClick='iKeyLudiF(\"" + idNi + "\",this)' >7</a></td>";
			t = t + "<td ><a asty  onClick='iKeyLudiF(\"" + idNi + "\",this)' >8</a></td>";
			t = t + "<td ><a asty onClick='iKeyLudiF(\"" + idNi + "\",this)' >9</a></td>";
			t = t + "<td ><a asty  onClick='iKeyLudiF(\"" + idNi + "\",this)' ><small><small>Exp</small></small></a></td>";
			t = t + "<td ><a asty  onClick='iKeyLudiF(\"" + idNi + "\",this)' >&Pi;</a></td></tr>";
			
			t = t + "<tr><td ><a asty onClick='iKeyLudiF(\"" + idNi + "\",this)' >4</a></td>";
			t = t + "<td ><a asty onClick='iKeyLudiF(\"" + idNi + "\",this)' >5</a></td>";
			t = t + "<td ><a asty onClick='iKeyLudiF(\"" + idNi + "\",this)' >6</a></td>";
			t = t + "<td ><a asty onClick='iKeyLudiF(\"" + idNi + "\",this)' >^</a></td>";
			t = t + "<td ><a asty onClick='iKeyLudiF(\"" + idNi + "\",this)' >~</a></td></tr>";
			
			t = t + "<tr><td ><a asty onClick='iKeyLudiF(\"" + idNi + "\",this)' >1</a></td>";
			t = t + "<td ><a asty onClick='iKeyLudiF(\"" + idNi + "\",this)' >2</a></td>";
			t = t + "<td ><a asty onClick='iKeyLudiF(\"" + idNi + "\",this)' >3</a></td>";
			t = t + "<td ><a asty onClick='iKeyLudiF(\"" + idNi + "\",this)' >(</a></td>";
			t = t + "<td ><a asty onClick='iKeyLudiF(\"" + idNi + "\",this)' >)</a></td>";
			t = t + "</tr>";
			
			t = t + "<tr><td colspan='2' ><a asty onClick='iKeyLudiF(\"" + idNi + "\",this)' >0</a></td>";
			t = t + "<td ><a asty onClick='iKeyLudiF(\"" + idNi + "\",this)' >.</a></td>";
			t = t + "<td colspan=2 ><a asty onClick='aKeyLudiF(\"" + idNi + "\",\"close\")' ><small><small>Close</small></small></a></td>";
			t = t + "</tr>";
			t = t + "</table>";

			var nag = navigator.userAgent.toUpperCase();

			var tbsty = "<td ";
			var hx = 35;
			
			if(nag.indexOf("ANDROID") != -1||nag.indexOf("IPAD") != -1){hx = 42;}
			
			tbsty = tbsty + " style='border:solid 1px black;width:"+ hx +"px;height:"+ hx +"px;text-align:center;font-size:20px;cursor:pointer;' ";
			
			var regex = new RegExp('<td', 'g');			
			t = t.replace(regex,tbsty);
			
			var regexAStyle = new RegExp('asty', 'g');
			var nstyfora = ' href="#" style="text-decoration:none;background:white;padding:6px;" ';
			
			if(nag.indexOf("ANDROID")!=-1||nag.indexOf("IPAD")!= -1){
				nstyfora = ' href="#" style="text-decoration:none;background:white;padding:10px;" ';
			}
			
			t = t.replace(regexAStyle,nstyfora);
			
			if(lowTabletMode()==false){
				if('ontouchstart' in document.documentElement) {
					var regexTouch = new RegExp('onClick=', 'g');
					t = t.replace(regexTouch,'onTouchStart=');
				}
			}
			
			var regexTouch = new RegExp('onClick=', 'g');
			t = t.replace(regexTouch,'onMouseDown=');

			newInput = newInput + t;
			
			if(document.getElementById(options.parentId)){
				
				var pi = document.getElementById(options.parentId);
				pi.innerHTML = pi.innerHTML + newInput;
				zoomToObjectKeyboard(idL,idNi);

			}
			
			return this;    
		
		}
    
    });
	
})(jQuery);

function zoomToObjectKeyboard(id,idest){
	
	if(document.getElementById(idest)){
		
		mapToObjectKeyboard(id,idest);
		
		var h = parseInt($("#" + idest).height());	
		var fsize = parseInt(h *0.8);
		var fsize2 = parseInt(h *0.48);
		var topH = parseInt(h-fsize)/2;
		
		$("#keyboard" + idest + " td").css("background-color","white").css("color","black");
		
		var DivColor = $("#inner" + idest);
		DivColor.css("margin-top", topH + "px");
		DivColor.css("font-size", fsize2 + "px");
		DivColor.css("color","black");
		
		$(".curtxt").toggle();
			
		var doc = document.getElementById(idest);
		var keyboard = $("#keyboard" + idest);
		keyboard.css("left", parseInt(parseInt(doc.offsetLeft) - 1) + "px");
			
		if(parseInt(doc.offsetTop)<keyboard.height()){
			keyboard.css("top" , parseInt(parseInt(doc.offsetTop) + $("#" + idest).height() + 4) + "px");
		}else{
			keyboard.css("top" , parseInt(parseInt(doc.offsetTop) - keyboard.height() - 4) + "px");
		}
		
		var fct = "zoomToObjectKeyboard('" + id + "','" + idest + "')";
		setTimeout(fct,500);
		
	}
	
}

function lowTabletMode(){
	var nag = navigator.userAgent.toUpperCase();
	if(nag.indexOf("IPAD") != -1){
		if(nag.indexOf('OS 3_') != -1){return true;}
		if(nag.indexOf('OS 4_') != -1){return true;}
		if(nag.indexOf('OS 5_') != -1){return true;}
	}
	if(nag.indexOf("ANDROID")== -1){return true;}
	return false;
}

function mapToObjectKeyboard(id,idest){

	var p = $("#" + id);
	var doc = document.getElementById(id);
	var offset = p.offset();
	var p2 = $("#" + idest);
	p2.css("position", "absolute");
	p2.css("left", parseInt(parseInt(doc.offsetLeft) - 1 ) + "px");
	p2.css("top" , parseInt(parseInt(doc.offsetTop) - 1 ) + "px");
	p2.css("width", parseInt(p.width() + 2 ) + "px");
	p2.css("height", parseInt(p.height() + 2 ) + "px");

}

function displayKeyLudiF(id){
	$(".curtxt").html("|");
	$("#keyboard" + id).fadeIn();
}

function iKeyLudiF(id,obj){
	var val = obj.innerHTML;
	aKeyLudiF(id,val);
}

function aKeyLudiF(id,val){
	
	if(val=='close'){
		$("#keyboard" + id).fadeOut();
		$(".curtxt").html("&nbsp;");
		return false;
	}
	
	var r1 = new RegExp('<small>', 'g');			
	val = val.replace(r1,'');
	var r2 = new RegExp('</small>', 'g');			
	val = val.replace(r2,'');

	var txt = document.getElementById('chara' + id).innerHTML;
	
	if(val=='Exp'){
		val = "E";
	}
	
	if(val=='&Pi;'){
		val = "P";
	}
	
	if(val!='del'){
		txt = txt + val;
	}
	
	//Annulation
	if(val=='del'){
		if(txt.length>0){
			txt = txt.substring(0,txt.length-1);
			afftxt = txt;
		}
	}
	
	//Résultat
	var resultTxt = txt;
	var rPie = new RegExp('P', 'g');
	resultTxt = resultTxt.replace(rPie,'3.141592653589');
	try{
		xmproce = new MathProcessor;
		resultTxt = xmproce.parse(resultTxt);
	}catch(e){}
	var res = 0;
	try {
		res = eval(resultTxt);
	} catch(err) {
		res = 0;
	}
	document.getElementById('result' + id).innerHTML = res;
	//Résultat
	
	document.getElementById('chara' + id).innerHTML = txt;
	
	var afftxt = txt + "<span class='curtxt' >|</span>"
	
	var rE = new RegExp('E', 'g');
	afftxt = afftxt.replace(rE,'e+');
	
	var rPie = new RegExp('P', 'g');
	afftxt = afftxt.replace(rPie,'&Pi;');
	
	document.getElementById('inner' + id).innerHTML = afftxt;
	
}
	
//+ Jonas Raoni Soares Silva
//@ http://jsfromhell.com/classes/math-processor [v1.0]
MathProcessor = function(){ //v1.0
    var o = this;
    o.o = {
        "+": function(a, b){ return +a + b; },
        "-": function(a, b){ return a - b; },
        "%": function(a, b){ return a % b; },
        "/": function(a, b){ return a / b; },
        "*": function(a, b){ return a * b; },
        "^": function(a, b){ return Math.pow(a, b); },
        "~": function(a, b){ return Math.sqrt(a, b); }
    };
    o.s = { "^": 3, "~": 3, "*": 2, "/": 2, "%": 1, "+": 0, "-": 0 };
    o.u = {"+": 1, "-": -1}, o.p = {"(": 1, ")": -1};
};

MathProcessor.prototype.parse = function(e){
    for(var n, x, o = [], s = [x = this.RPN(e.replace(/ /g, "").split(""))]; s.length;)
        for((n = s[s.length-1], --s.length); n[2]; o[o.length] = n, s[s.length] = n[3], n = n[2]);
    for(; (n = o.pop()) != undefined; n[0] = this.o[n[0]](isNaN(n[2][0]) ? this.f(n[2][0]) : n[2][0], isNaN(n[3][0]) ? this.f(n[3][0]) : n[3][0]));
    return +x[0];
};

MathProcessor.prototype.methods = {
    "div": function(a, b){ return parseInt(a / b); },
    "frac": function(a){ return a - parseInt(a); },
    "sum": function(n1, n2, n3, n){ for(var r = 0, a, l = (a = arguments).length; l; r += a[--l]); return r; },
    "medium": function(a, b){ return (a + b) / 2; }
};

MathProcessor.prototype.error = function(s){
    throw new Error("MathProcessor: " + (s || "Erro na expressÃ£o"));
}

MathProcessor.prototype.RPN = function(e){
    var _, r, c = r = [, , , 0];
    if(e[0] in this.u || !e.unshift("+"))
        for(; e[1] in this.u; e[0] = this.u[e.shift()] * this.u[e[0]] + 1 ? "+" : "-");
    (c[3] = [this.u[e.shift()], c, , 0])[1][0] = "*", (r = [, , c, 0])[2][1] = r;
    (c[2] = this.v(e))[1] = c;
    (!e.length && (r = c)) || (e[0] in this.s && ((c = r)[0] = e.shift(), !e.length && this.error()));
     while(e.length){
        if(e[0] in this.u){
            for(; e[1] in this.u; e[0] = this.u[e.shift()] * this.u[e[0]] + 1 ? "+" : "-");
            (c = c[3] = ["*", c, , 0])[2] = [-1, c, , 0];
        }
        (c[3] = this.v(e))[1] = c;
        e[0] in this.s && (c = this.s[e[0]] > this.s[c[0]] ?
            ((c[3] = (_ = c[3], c[2]))[1][2] = [e.shift(), c, _, 0])[2][1] = c[2]
            : r == c ? (r = [e.shift(), , c, 0])[2][1] = r
            : ((r[2] = (_ = r[2], [e.shift(), r, ,0]))[2] = _)[1] = r[2]);
    }
    return r;
};

MathProcessor.prototype.v = function(e){
    if("0123456789.".indexOf(e[0]) + 1){
        for(var i = -1, l = e.length; ++i < l && "0123456789.".indexOf(e[i]) + 1;);
        return [+e.splice(0,i).join(""), , , 0];
    }
    else if(e[0] == "("){
        for(var i = 0, l = e.length, j = 1; ++i < l && (e[i] in this.p && (j += this.p[e[i]]), j););
        return this.RPN(l = e.splice(0,i), l.shift(), !j && e.shift());
    }
    else{
        var i = 0, c = e[0].toLowerCase();
        if((c >= "a" && c <= "z") || c == "_"){
            while(((c = e[++i].toLowerCase()) >= "a" && c <= "z") || c == "_" || (c >= 0 && c <= 9));
            if(c == "("){
                for(var l = e.length, j = 1; ++i < l && (e[i] in this.p && (j += this.p[e[i]]), j););
                return [e.splice(0,i+1).join(""), , , 0];
            }
        }
    }
    this.error();
}

MathProcessor.prototype.f = function(e){
    var i = 0, n;
    if(((e = e.split(""))[i] >= "a" && e[i] <= "z") || e[i] == "_"){
        while((e[++i] >= "a" && e[i] <= "z") || e[i] == "_" || (e[i] >= 0 && e[i] <= 9));
        if(e[i] == "("){
            !this.methods[n = e.splice(0, i).join("")] && this.error("FunÃ§Ã£o \"" + n + "\" nÃ£o encontrada"), e.shift();
            for(var a = [], i = -1, j = 1; e[++i] && (e[i] in this.p && (j += this.p[e[i]]), j);)
                j == 1 && e[i] == "," && (a.push(this.parse(e.splice(0, i).join(""))), e.shift(), i = -1);
            a.push(this.parse(e.splice(0,i).join(""))), !j && e.shift();
        }
        return this.methods[n].apply(this, a);
    }
};
