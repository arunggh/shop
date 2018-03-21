(function (){
  'use strict';

  var express   = require("express")
    , request   = require("request")
    , endpoints = require("../endpoints")
    , helpers   = require("../../helpers")
    , app       = express()

  app.get("/catalogue/images*", function (req, res, next) {
    var url = endpoints.catalogueUrl + req.url.toString();
    console.log("images url "+url);
    request.get(url)
        .on('error', function(e) { next(e); })
        .pipe(res);
  });
  
  app.post("/newProduct", function (req, res, next) {
	    console.log("New Product ££");
    	var options = {
            uri: endpoints.catalogueUrl+"/newProduct",
            method: 'POST',
            json: true,
            body: req.body
        };
        request(options, function(error, response, body) {
        	console.log("return data: " + JSON.stringify(body));
        	res.end(body);
          	return;
        });
        res.end();
	  });

  app.get("/getProducts", function (req, res, next) {
    var x = endpoints.catalogueUrl+"/getProducts" ;//+ req.url.toString();
    console.log("getProducts "+x);
    helpers.simpleHttpRequest(x
     , res, next);
  });

  app.get("/tags", function(req, res, next) {
    helpers.simpleHttpRequest(endpoints.tagsUrl, res, next);
  });

  module.exports = app;
}());
