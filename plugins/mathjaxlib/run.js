
function onPaint(obj){
	
	if(!document.getElementById("mathjaxlibclue")){
		
		var h = '<div id="mathjaxlibclue" ></div>';
		
		$("body").append(h);
		
		var js = document.createElement("script");
		js.type = "text/javascript";
		//https://cdn.mathjax.org/mathjax/2.7-latest/MathJax.js
		js.src = "https://cdnjs.cloudflare.com/ajax/libs/mathjax/2.7.1/MathJax.js?config=TeX-AMS-MML_HTMLorMML";
		document.body.appendChild(js);

		setTimeout(function(){ 
			appliqueMathJaxLib();
		},1500);
		
	} else {

		setTimeout(function(){ 
			appliqueMathJaxLibSolo();
		},500);

	}
	
	//sample : \( J_\alpha(x) = \sum\limits_{m=0}^\infty \frac{(-1)^m}{m! \, \Gamma(m + \alpha + 1)}{\left({\frac{x}{2}}\right)}^{2 m + \alpha} \)
	
	return "";

}

function appliqueMathJaxLib(){

	if (MathJax) {
	
		MathJax.Hub.Config({
			extensions: ["tex2jax.js"],
			jax: ["input/TeX", "output/HTML-CSS"],
				tex2jax: {
				inlineMath: [ ['$','$'], ["\\(","\\)"] ],
				displayMath: [ ['$$','$$'], ["\\[","\\]"] ],
				processEscapes: true
			},
			"HTML-CSS": { availableFonts: ["TeX"] }
		});
			
	} else {
		alertm("Error MathJax load");
	}
	
}

function appliqueMathJaxLibSolo(){
	
	if (MathJax) {
		MathJax.Hub.Queue(["Typeset",MathJax.Hub]);
	} else {
		alertm("Error MathJax load");
	}

}

function onZoom(obj){}
function isOK(obj){}
