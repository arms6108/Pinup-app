var express = require('express');
var request = require("request");
var cheerio = require("cheerio");
var pinUp = require('../model/pinupSchema').pinUp;
var topic = require('../model/topicSchema');
var morgan = require('morgan');
var app = express();

app.use(morgan('dev'));
function commonMethod() {

}

commonMethod.prototype.scrapePackage = function(pinupUrl) {
    return new Promise(function(resolve, reject) {
        request(pinupUrl, function(error, response, html) {
            if (!error && response.statusCode == 200) {
                var $ = cheerio.load(html);
                if ($("#error-section").length === 0) {
                    var objData = {};
                    objData.pinupUrl = pinupUrl;
                    objData.title = $("title").text() ||"";
                    objData.description = $("description").text() ||$('meta[name=Description]').attr("content")||$('meta[name=description]').attr("content")|| "";
                    objData.link = $("link").text() ||$('link[rel=canonical]').attr('href')||"";
                    objData.tags = $("tags").text() || $('meta[name=Keywords]').attr("content")||$('meta[name=keywords]').attr("content")||"";
                    objData.imageUrl = $('link').attr("href") || "";
                    resolve(objData);
                } else {
                    reject({
                        "error": "invalid url provided"
                    });
                }
          //  } else if(response.statusCode == 404){
              //throw 'Please check the URL 404 Error';
            } else {
              throw 'Please provide the proper URL ('+error+')';
            }
        });
    }).catch(function(err) {

      throw "Error: "+err;
    });
};

commonMethod.prototype.save = function(pinupData, callback) {
    // console.log("pinupData::",pinupData);
    var pinUpObj = new pinUp(pinupData);
    pinUpObj.save(function(error, data) {
        if (error) {
          callback(error, null);
        } else {
          callback(null, data);
        }
    });
};
commonMethod.prototype.topicSave = function(topicData, callback) {
    // console.log("pinupData::",pinupData);
    var topicObj = new topic(topicData);
    topicObj.save(function(error, data) {
        console.log(error);
        if (error) {
            callback(error, null);
        } else {
            callback(null, data);
        }
    });
};


module.exports = commonMethod;
