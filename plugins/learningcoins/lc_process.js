
var getcoinid = '';
var lastcoinid = '';
var memcoinid = '';

function install_learningcoins(obj) {

	var idlc = obj.id + 'lc' + LUDI.getNumPage() + obj.idscript ;
	getcoinid = '';
    if (localStorage) {
        getcoinid = window.localStorage.getItem(idlc);
        if (typeof getcoinid == 'undefined') { getcoinid = ''; }
        if (getcoinid == 'undefined') { getcoinid = ''; }
        if (getcoinid === null) { getcoinid = ''; }
    }
    if (memcoinid.indexOf(idlc)!=-1) {
        getcoinid = 1;
    }

	var h = '<img data-id="' + idlc + '" ' ;
	h += ' id="bloc' + obj.id + '" class="haveflou unselectable bloc' + obj.id + ' ' + obj.idscript + '" ';
	h += ' src="fx/lc-flat.png" ';

    if (getcoinid!='') {
	    h += ' style="display:none;opacity:0;margin-top:-1500px;margin-left:-1500px;visibility:hidden;" ';
    } else {
        h += ' style="cursor:pointer;" ';
        h += ' onClick="getLearningC(\'' + idlc + '\',\'' + obj.idscript + '\');" ';
    }
	h += ' />';

	addToMobj(h,obj)

}

function getLearningC(lcid,idscript) {

    if (lcid!=lastcoinid&&memcoinid.indexOf(lcid)==-1) {

        memcoinid = memcoinid + ';' + lcid+ ';';

        lastcoinid = lcid;
        if (localStorage) {
            window.localStorage.setItem(lcid,'1');
        }
        LUDImoney = LUDImoney + 1;
        $("." + idscript).css("display","none");

        $("." + idscript).animate({
            width: '0px',
            marginTop:'-20px',
            marginLeft:'20px'
          },400,function(){
            $("." + idscript).css("display","none");
        });

        if (!haveLocalFileUrl()) {
            
            var havelms = false;

            //Hack Chamilo LMS
            if (typeof(API.save_asset)!= "undefined") {

                var olms = parent.olms;
                if (olms.lms_item_type=='sco') {

                    havelms = true;

                    var lk = '../../../../plugin/chalkboard_tools/';
                    lk += "plug/ajaxprocess/ajax.get_l_coins.php" ;
                    lk += "?item_id=1&lp_id="+lcid+"&&session_id=0&pc=1";
                    $.ajax({
                        url: lk
                    }).done(function(){
                        logconsole("lc:" + lcid);
                    }).error(function(){
                        lk = '../' + lk;
                        $.ajax({
                            url: lk
                        }).done(function(){
                            logconsole("lc:" + lcid);
                        });
                    });

                }
            }
            
            //Hack Moodle
            if (havelms==false) {
                if (typeof(window.parent.M) != "undefined") {
                    if (typeof(window.parent.M.cfg.wwwroot) != "undefined") {
                        var lk = window.parent.M.cfg.wwwroot + '/mod/openelearningstudio/chalkboard_tools/plug/ajaxprocess/ajax.get_l_coins.php' ;
                        lk += "?baseid=1&lcid="+lcid+"&&session_id=0&pc=1";
                        $.ajax({
                            url: lk
                        }).done(function(){
                            logconsole("lc:" + lcid);
                        });
                    }
                }
            }

        }

    }

}