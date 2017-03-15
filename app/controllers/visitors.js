var cookieSession = require('cookie-session'),
    express = require('express'),
    app = express(),
    useragent = require('express-useragent'),
    visit = require('../model/detail');
    const requestIp = require('request-ip');
// var os = require('os').networkInterfaces();
var connect = require('connect');
var http = require('http');
var net = require('net');
var app = connect();
app.use(requestIp.mw({ attributeName : 'myCustomAttributeName' }))


module.exports = function(options) {
    return function(req, res, next) {
      var ip = req.myCustomAttributeName;
          console.log(ip);
          var ipType = net.isIP(ip); // returns 0 for invalid, 4 for IPv4, and 6 for IPv6
          console.log('ip address is ' + ip + ' and is of type IPv' + ipType + '\n');

        var source = req.headers['user-agent'];
        var agent = useragent.parse(source);
        var device;
        var array1 = ["isMobile", "isTablet", "isiPad", "isiPod", "isiPhone", "isDesktop", "isMac", "isSamsung"];
        var resultJson = useragent.parse(source);
        var flag = false,
            i = 0;
        while (!flag) {
            if (resultJson[array1[i]]) {
                if (array1[i] == "isDesktop" || array1[i] == "isMac") {
                    // console.log("Desktop");
                    device = "Desktop";
                } else {
                    // console.log("Mobile");
                    device = "Mobile";
                }
                flag = true;
            }
            i++;
        }
        console.log(resultJson["browser"]);

        var data = {
            browser: resultJson["browser"],
            device: device
        }
        console.log(data);
        visit.savenow(data, function(error, data1) {
            if (error) {
                console.log(error)
            } else {
                console.log(data1);
            }
        })
        // var ip = Object.keys(os).reduce(function (result, dev) {
        //   return result.replace("lo","").concat(os[dev].reduce(function (result, details) {
        //     return result.concat(details.family === 'IPv4' && !details.internal ? [details.address] : []);
        //     result.concat(details.family === 'IPv4' && !details.internal ? [details.address] : [])
        //     console.log("data",result.concat(details.family === 'IPv4' && !details.internal ? [details.address] : []));
        //   }, []));
        // });

        next();
    }
    return (data);
}
