"use strict";

const electron = require('electron');

var fs = require('fs');

function downloadFile(file_url,targetPath){

    var received_bytes = 0;
    var total_bytes = 0;

    var request = undefined;

    try{
        request = require('request');
    }catch(e){
        if (e instanceof Error && e.code === "MODULE_NOT_FOUND"){
            console.log("!!! Can't find request !!!");
        }
    }

    if(request!=undefined){

        var req = request({
            method: 'GET',
            uri: file_url
        });

        var out = fs.createWriteStream(targetPath);
        req.pipe(out);

        req.on('response', function (data) {
            total_bytes = parseInt(data.headers['content-length' ]);
        });

        req.on('data', function(chunk){
            received_bytes += chunk.length;
            showProgress(received_bytes, total_bytes);
        });

        req.on('end', function() {
            console.log("File succesfully downloaded");
        });

    }

}
exports.downloadFile = downloadFile;

function showProgress(received,total){
    var percentage = (received * 100) / total;
    console.log(percentage + "% | " + received + " bytes out of " + total + " bytes.");
}
exports.showProgress = showProgress;