var http = require('http'),
    url = require('url');

var mysql = require('mysql');


var db = mysql.createConnection({
    host:     'localhost',
    user:     'arun',
    password: 'arun',
    database: 'shop'
});
var cart = [];
var theuser=null;
var theuserid =null;
var server = http.createServer(function (request, response) {
    var path = url.parse(request.url).pathname;
    var url1 = url.parse(request.url);
    console.log("path: "+path);
    console.log("url: "+url1)
    if (request.method == 'POST') {
        switch (path) {


            case "/login":
                var body = '';
                console.log("user Login ");
                request.on('data', function (data) {
                    body += data;
                });

                request.on('end', function () {
                    var obj = JSON.parse(body);
                    console.log(JSON.stringify(obj, null, 2));
                    var query = "SELECT * FROM Customer where name='"+obj.name+"'";
                    response.writeHead(200, {
                        'Access-Control-Allow-Origin': '*'
                    });

                    db.query(
                        query,
                        [],
                        function(err, rows) {
                            if (err) {
                                response.end('{"error": "1"}');
                                throw err;
                            }
                            if (rows!=null && rows.length>0) {
                                console.log(" user in database" );
                                theuserid = rows[0].customerID;
                                var obj = {
                                    id: theuserid
                                }
                                response.end(JSON.stringify(obj));

                            }
                            else{
                                response.end('{"error": "1"}');
                                console.log(" user not in database");

                            }

                        }
                    );


                });


                break;

            case "/register":
                var body = '';
                console.log("user Register ");
                request.on('data', function (data) {
                    body += data;
                });

                request.on('end', function () {
                    var obj = JSON.parse(body);
                    console.log(JSON.stringify(obj, null, 2));
                    var query = "SELECT * FROM Customer where name='"+obj.name+"'";
                    response.writeHead(200, {
                        'Access-Control-Allow-Origin': '*'
                    });

                    db.query(
                        query,
                        [],
                        function(err, rows) {
                            if (err) {
                                response.end("error");
                                throw err;
                            }
                            if (rows!=null && rows.length>0) {
                                console.log(" user already in database");
                                response.end('{"error": "2"}');
                            }
                            else{
                                query = "INSERT INTO Customer (name, password, address)"+
                                        "VALUES(?, ?, ?)";
                                db.query(
                                    query,
                                    [obj.name,obj.password,obj.address],
                                    function(err, result) {
                                        if (err) {
                                            // 2 response is an sql error
                                            response.end('{"error": "3"}');
                                            throw err;
                                        }
                                        theuserid = result.insertId;
                                        var obj = {
                                            id: theuserid
                                        }
                                        response.end(JSON.stringify(obj));

                                    }
                                );
                            }

                        }
                    );


                });


                break;
            case "/checkCurrentUserAccessRight":
            
                console.log("Checking Customer Access Right");
                var custId = req.params.custId;
                console.log("getCart" + custId);
                console.log("Customer ID: " + custId);


            request.on('end', function () {
                var obj = JSON.parse(body);
                console.log(JSON.stringify(obj, null, 2));
                var query = "select * from groups ga join customer_group cg where ga.id = cg.group_id and cg.customer_id='"+custId+"'";
                response.writeHead(200, {
                    'Access-Control-Allow-Origin': '*'
                });

                db.query(
                    query,
                    [],
                    function(err, rows) {
                        if (err) {
                            response.end("error");
                            throw err;
                        }
                        if (rows!=null && rows.length>0) {
                            console.log(" user already in database");
                            response.end('{"error": "2"}');
                        }
                        else{
                        	
                        }

                    }
                );


            });
            break;
            
        } //switch
    }
   

});
server.listen(3001);

