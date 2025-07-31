
var typeFullexport = 0;
var htmlFullexport = '';

function createFileProcess() {

    if (finishLoadData) {

        if (!openelearning.gebi('editFileProcess')) {

            var p = '<div id="editFileProcess" ';
            p += ' class="editpluginForms pan ' + TYPEWIND + 'osBorder" ';
            p += ' style="background:white!important;" >';
            
            p += barEditWind(getTrd("Export"));
            
            p += '<div class="zoneRenderFile" ></div>';
            p += '<div class="zoneHtmlFileView" ></div>';
            p += '<div class="zoneHtmlOverview" ></div>';

            p += '<div class="listzonepuglin" >';
            p += '<a id="exportFileBtn" ';
            p += ' style="float:right;margin-right:380px;display:none;" ';
            p += ' onclick="exportJsPDF();" ';
            p += ' class="btnSave" >' + getTrd('Download') + '</a>';
            p += '</div>';
            
            p += '</div>';
            
            $('body').append(p);

        }

        $('.opacedit').css("display","block");
        $('#editFileProcess').css("display","block");

        $('.zoneRenderFile').css("display","block");
        $('.zoneHtmlFileView').css("display","none");

        setTimeout(function(){createScreenProcess();},1000);


    }

}

function createScreenProcess() {

    $('.zoneHtmlOverview').css("display","block");
    $('.zoneHtmlFileView').html('');
    $('.zoneRenderFile').html('');

    var index = 0;
    var timeO = 0;
    for (var i=0;i<CPagesCount;i++) {
        if (typeof(CPages[i])!="undefined"){
            var actualPage = CPages[i].pageId;
            drwImageDataSlide(actualPage,index);
            setTimeout('drwImageDataSlide(\'' + actualPage + '\',' + index + ');',timeO);
            timeO = timeO + 500;
            index++;
            $('.zoneRenderFile').css("display","none");
        }
    }

    setTimeout(function(){
        createPrintProcess();
    },timeO);
		
}

function createPrintProcess() {

    $('.zoneHtmlFileView').css("display","block");

    collRenderImg = new Array();

    htmlFullexport = '<html>';
    htmlFullexport += '<head>';
    htmlFullexport += '</head>';
    htmlFullexport += '<body>';

    var index = 0;

    for (var i=0;i<CPagesCount;i++) {
        
        if (typeof(CPages[i])!="undefined"){
           
            var actualPage = CPages[i].pageId;
            var canvx = document.getElementById('slide' + actualPage);
            if (canvx) {

                var imghref = getBase64Image(canvx);
                collRenderImg.push(imghref);
                htmlFullexport += '<img style="width:80%;margin-left:10%;" ';
                htmlFullexport += ' src="' + imghref + '" />';

            }

            index++;
        }
        
    }

    htmlFullexport += '</body>';
    htmlFullexport += '</html>';

    $('.zoneHtmlFileView').html(htmlFullexport);
    memDataHtml = htmlFullexport;

    $('#exportFileBtn').css('display','block');
    $('.zoneHtmlOverview').css("display","none");

}

function validFileProcess() {

    closeEdit();
}

function saveImageProcess(e) {
    this.href = canvas.toDataURL({
        format: 'jpeg',
        quality: 0.8
    });
    this.download = 'canvas.png'
}

var collRenderImg = new Array();
var memDataImg = '';
var memDataHtml = '';

function drwImageDataSlide(processId,index){
	
    $('.zoneRenderFile').append('<img id="pg' + index + '" crossorigin />');

    var p = ' <canvas id="slide' + processId + '" ';
    p += ' width="960" height="720" ><canvas>';
    $('.zoneRenderFile').append(p);
    
    $("#slide" + processId).css("zoom","30%").css("border","solid 1px gray"); 

    var canv = document.getElementById('slide' + processId);
    var ctx = canv.getContext("2d");

    ctx.fillStyle = 'white';
	ctx.fillRect(0,0,1280,720);

	for (var i = 0; i < CLudisCount; i++){
		var obj = CLudis[i];
		if (obj.supp==0) {
			if (obj.pageId==processId) {
				if (obj.type=='barre') {
					var rx = parseInt(obj.x);
					var ry = parseInt(obj.y);
					var rw = parseInt(obj.width);
					var rh = parseInt(obj.height);

					ctx.fillStyle = obj.val;
					ctx.fillRect(rx,ry,rw,rh);
					ctx.stroke();

                    ctx.font = "20px Arial";
                    ctx.fillStyle = "white";
                    ctx.textAlign = "left";
                    ctx.fillText(obj.text, 21,40);
				}
			}
		}
	}
    
    memDataImg = '';

    drwObjectDataSlide(processId,ctx);
    drwObjectDataSlide(processId,ctx);
    drwObjectDataSlide(processId,ctx);
    drwObjectDataSlide(processId,ctx);
    drwObjectDataSlide(processId,ctx);
    drwObjectDataSlide(processId,ctx);
    drwObjectDataSlide(processId,ctx);

    
   
}

function drwObjectDataSlide(processId,ctx){

    var oneProcess = true;

    for (var i = 0; i < CLudisCount; i++){
		
        if (memDataImg.indexOf(';'+i+';')==-1) {
            
            var obj = CLudis[i];

            if (obj.supp==0) {

                if (obj.pageId==processId&&oneProcess==true) {

                    oneProcess = false;
                    memDataImg = memDataImg + ';' + i + ';';

                    if (obj.type=='img') {
                        var img = new Image();
                        // img.crossOrigin = "Anonymous";
                        img.onload = function() {
                            var objIm = CLudis[img.id];
                            var x = parseInt(objIm.x);
                            var y = parseInt(objIm.y);
                            var dw = parseInt(objIm.width);
                            var dh = parseInt(objIm.height);
                            ctx.drawImage(img, x, y, dw, dh);
                        };
                        var srcimg = correctUrlImg(obj.data);
                        img.id = i;
                        img.src = srcimg;
                    }

                    if(obj.type=='text'){
                        
                        var x2 = parseInt(obj.x);
                        var y2 = parseInt(obj.y);
                        var dw2 = parseInt(obj.width);
                        var dh2 = parseInt(obj.height);

                        //rectangledText(ctx,x2,y2,dw2,cleanText(obj.text),18,'Arial','black');

                        var objT = obj.text;

                        let testEl = document.createElement('div');
                        testEl.contentEditable = 'true';
                        testEl.style.width = dw2 + 'px';
                        testEl.classList.toggle('__canvas_text__', true);
                        testEl.innerHTML = objT;

                        let canvasRT = htmlTextToCanvas(testEl.outerHTML,{
                            pixelRatio: 1
                        });
                        $('.zoneRenderFile').append(canvasRT);

                        ctx.drawImage(canvasRT,x2,y2);

                    }

                }
            }

                
        }
	}



}

function getBase64Image(canvx) {
    var canvas = document.createElement("canvas");
    canvas.width = canvx.width;
    canvas.height = canvx.height;
    var ctx = canvas.getContext("2d");
    ctx.drawImage(canvx, 0, 0);
    var dataURL = canvas.toDataURL("image/jpeg");
    return dataURL;
}

function exportJsPDF() {
    
    $('#exportFileBtn').css("display","none");

    if (typeFullexport==0) {
      
        var doc = new jsPDF("p","mm","a4");
        var pi = 0;
        var px = 7;
        var py = 10;
        var pw = parseInt(190);
        var ph = parseInt(pw * 0.75);
        collRenderImg.forEach(function(item, index, array) {
            console.log(item, index);
            doc.addImage(item,'JPEG',px,py,pw,ph,'page'+index,'NONE',0);
            py = py + (ph + 10);
            pi++;
            if (pi==2) {
                pi = 0;
                doc.addPage();
                py = 10;
            }
        });
        doc.save('export-oel.pdf');

    }

    if (typeFullexport==1) {
        downloadDirect('export-oel.html',$('.zoneHtmlFileView').html());
    }

    setTimeout(function(){
        $('.opacedit').css("display","none");
        $('#editFileProcess').css("display","none");
    },5000);

}

function downloadDirect(filename, text) {
    
    var element = document.createElement('a');
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
    element.setAttribute('download', filename);
  
    element.style.display = 'none';
    document.body.appendChild(element);
  
    element.click();
  
    document.body.removeChild(element);

}

/**
 * # htmlTextToCanvas
 * 
 * Given a HTML string or HTMLElement, 
 * returns a canvas with a replica of the text, 
 * including fonts, layout, formatting and colors
 * 
 * @author haxiomic (George Corney)
 * @license MIT
 * @version 1.2.0
 * @website https://github.com/haxiomic/html-text-to-canvas
 * 
 * @param {string | HTMLElement} htmlOrElement
 * @param {{
 * 	?pixelRatio: number,
 * 	?offscreenCanvas: boolean,
 * 	?overrideCanvas: HTMLCanvasElement,
 * }} options
 * @returns {HTMLCanvasElement} canvas element
 */
function htmlTextToCanvas(htmlOrElement, options = {}) {
	options = {
		pixelRatio: 1.0,
		offscreenCanvas: false,
		overrideCanvas: null
	}

	/**
	 * Marks each character with a span element so we can determine its location later
	 * @param {HTMLElement} el 
	 */
	function markCharacters(el) {
		/** @type {HTMLSpanElement[]} */
		let charGroups = [];
		for (let node of el.childNodes) {
			switch (node.nodeType) {
				case node.TEXT_NODE: {
					/** @type {Text} */
					let textNode = node;
					let chars = Array.from(textNode.data); // split('') but support emojis and others
					let charGroup = document.createElement('span');
					charGroup.classList.add('__char_group__');
					charGroup.__spans = new Array(chars.length);
					for (let i = 0; i < chars.length; i++) {
						let charSpan = document.createElement('span');
						charSpan.innerHTML = chars[i];
						charGroup.appendChild(charSpan);
						charGroup.__spans[i] = charSpan;
					}
					charGroups.push(charGroup);
					textNode.replaceWith(charGroup);
				} break;
				default: {
					charGroups = charGroups.concat(markCharacters(node));
				} break;
			}
		}
		return charGroups;
	}

	/**
	 * @param {HTMLElement} el
	 * @param {HTMLElement[]} charGroups
	 */
	function unmarkCharacters(el, charGroups) {
		for (let charGroup of charGroups) {
			charGroup.replaceWith(charGroup.textContent);
		}
	}

	/**
	 * Firefox currently does not generate a .font property after getComputedStyle so we much assemble one manually
	 * See https://stackoverflow.com/a/58533415
	 */
	function getFontFromComputedStyle(computedStyle, overrideFontSize) {
		let font = computedStyle.font;
		// Firefox returns the empty string for .font, so create the .font property manually
		if (font === '' || overrideFontSize) {
				// Firefox uses percentages for font-stretch, but Canvas does not accept percentages
				// so convert to keywords, as listed at:
				//   https://developer.mozilla.org/en-US/docs/Web/CSS/font-stretch
				const fontStretchLookupTable = {
						'50%': 'ultra-condensed',
						'62.5%': 'extra-condensed',
						'75%': 'condensed',
						'87.5%': 'semi-condensed',
						'100%': 'normal',
						'112.5%': 'semi-expanded',
						'125%': 'expanded',
						'150%': 'extra-expanded',
						'200%': 'ultra-expanded'
				};
				// If the retrieved font-stretch percentage isn't found in the lookup table, use
				// 'normal' as a last resort.
				let fontStretch = fontStretchLookupTable.hasOwnProperty(computedStyle.fontStretch)
						? fontStretchLookupTable[computedStyle.fontStretch]
						: computedStyle.fontStretch;
				font = computedStyle.fontStyle
						+ ' ' + computedStyle.fontVariant
						+ ' ' + computedStyle.fontWeight
						+ ' ' + fontStretch
						+ ' ' + (overrideFontSize || computedStyle.fontSize)
						+ '/' + computedStyle.lineHeight
						+ ' ' + computedStyle.fontFamily;
		}
		return font;
	}

	/** @type {HTMLElement} */
	let el;
	let shouldUnmark = true;
	if (htmlOrElement instanceof HTMLElement) {
		el = htmlOrElement;
	} else {
		el = document.createElement('span');
		el.classList.toggle('__canvas_text__', true); // useful for debug
		el.innerHTML = htmlOrElement;
		shouldUnmark = false;
	}

	let temporaryDomEl = null;
	if (!el.isConnected) {
		// use a parent el so we don't have to modify el's position to absolute
		let parentEl = document.createElement('span');
		parentEl.style.position = 'absolute';
		parentEl.style.top = '0';
		parentEl.style.left = '0';
		parentEl.appendChild(el);

		// remove this element from the dom when finished
		document.body.appendChild(parentEl);
		temporaryDomEl = parentEl;
	}

	let charGroups = markCharacters(el);

	let textBBox = el.getBoundingClientRect();
	let canvas;
	if (options.overrideCanvas != null) {
		canvas = options.overrideCanvas;
	} else if (options.offscreenCanvas) {
		canvas = new OffscreenCanvas(textBBox.width * options.pixelRatio, textBBox.height * options.pixelRatio);
	} else {
		canvas = document.createElement('canvas');
		canvas.style.width = textBBox.width + 'px';
		canvas.style.height = textBBox.height + 'px';
	}

	canvas.width = textBBox.width * options.pixelRatio;
	canvas.height = textBBox.height * options.pixelRatio;

	let ctx = canvas.getContext('2d');
	ctx.clearRect(0, 0, canvas.width, canvas.height);

	// set background
	let elStyle = window.getComputedStyle(el);
	ctx.fillStyle = elStyle.backgroundColor;
	ctx.fillRect(0, 0, canvas.width, canvas.height);

	for (let charGroup of charGroups) {
		let style = window.getComputedStyle(charGroup);

		let fontSpecifier = getFontFromComputedStyle(style);

		let fontSizeValue = parseFloat(style.fontSize);
		let fontSizeUnit = /([a-z%]+)$/i.exec(style.fontSize)[1];

		// if pixel ratio != 1.0 we need to adjust the font size
		// simple technique is to use a temporary element to manage the css parsing for us
		if (options.pixelRatio !== 1.0) {
			fontSpecifier = getFontFromComputedStyle(style, fontSizeValue * options.pixelRatio + fontSizeUnit);
		}

		ctx.font = fontSpecifier;
		ctx.fillStyle = style.color;
		ctx.textBaseline = "top";

		// apply text transform
		let text = charGroup.textContent;
		switch (style.textTransform) {
			case 'uppercase': {
				text = text.toUpperCase();
			} break;
			case 'lowercase': {
				text = text.toLowerCase();
			} break;
			case 'capitalize': {
				text = text.replace(/\b\w/g, l => l.toUpperCase());
			} break;
		}
		let chars = Array.from(text);

		let textMetrics = ctx.measureText('a');
		let yOffset = textMetrics.fontBoundingBoxAscent != null ? textMetrics.fontBoundingBoxAscent : 0;
		
		for (let i = 0; i < charGroup.__spans.length; i++) {
			let span = charGroup.__spans[i];
			// position of span relative to containing box
			let spanBBox = span.getBoundingClientRect();

			let drawX = (spanBBox.left - textBBox.left) * options.pixelRatio;
			let drawY = (spanBBox.top - textBBox.top) * options.pixelRatio + yOffset;

			ctx.fillText(
				chars[i],
				drawX, drawY
			);
		}
	}
	
	if (shouldUnmark) {
		unmarkCharacters(el, charGroups);
	}

	if (temporaryDomEl != null) {
		temporaryDomEl.remove();
	}

	return canvas;
}