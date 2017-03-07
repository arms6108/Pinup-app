var express = require('express');
var request = require("request");
var cheerio = require("cheerio");
var pinUp = require('../model/pinupSchema').pinUp;

function commonMethod() {

}


commonMethod.prototype.scrapePackage = function(pinupUrl) {
    return new Promise(function(resolve, reject) {
        request(pinupUrl, function(error, response, html) {
          // console.log(html);
            if (!error) {
                var $ = cheerio.load(html);

                if ($("#error-section").length === 0) {
                    var objData = {};
                    objData.pinupUrl=pinupUrl;
                    objData.title = $("title").text() || "";
                    objData.description = $("description").text() || "";
                    objData.link = $("link").text() || "";
                    objData.tags = $("tags").text() || "";
                    objData.imageUrl = $('.img-responsive.img-comic').attr("src") || "";
                    resolve(objData);
                } else {
                    reject({
                        "error": "invalid url provided"
                    });
                }

            }
        });
    });
};

commonMethod.prototype.save = function (pinupData,callback) {
  // console.log("pinupData::",pinupData);
  var pinUpObj = new pinUp(pinupData);
  pinUpObj.save(function (error,data) {
    console.log(error);
    if(error){
      callback(error,null);
    }else {
      callback(null,data);
    }
  });
};

module.exports=commonMethod;
