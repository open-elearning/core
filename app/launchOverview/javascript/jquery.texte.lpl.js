
$.fn.textlpl = function(opt,callback) {
  
  var i=0;
	
  var typeone = function(self, text, content) {
	
    if (text.length > 0) {
      i = i + 1;
      var next = text.match(/(\s*(<[^>]*>)?)*(&.*?;|.?)/)[0];
      text = text.substr(next.length);
	  var next2 = text.match(/(\s*(<[^>]*>)?)*(&.*?;|.?)/)[0];
	  text = text.substr(next2.length);
	  var next3 = text.match(/(\s*(<[^>]*>)?)*(&.*?;|.?)/)[0];
	  text = text.substr(next3.length);
      $(self).html(content+next+next2+next3);
      setTimeout(function(){
              typeone(self, text, content + next + next2 + next3);
      },120);
      if(text.length==0) if (callback!=null) callback();
    }

  }

  this.each(function() {
    opt = opt || { 'delay': 120};
    typeone(this, $(this).html(), '');
  });

  return this;

}
