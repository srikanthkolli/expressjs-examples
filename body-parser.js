var express = require('express');
var app = express();
var bodyParser = require('body-parser'); //For parsing http body

app.use(bodyParser.urlencoded({ extended: false }));

app.get('/form', function(req, res){
	var content = '<!DOCTYPE html>\
					<html>\
					<head>\
						<title></title>\
					</head>\
					<body>\
						<form action="/form-post" method="post">\
							<label>Email</label>\
							<input type="text" name="user[email]">\
							<label>Passowrd</label>\
							<input type="password" name="user[password]">\
							<button>Submit</button>\
						</form>\
					</body>\
					</html>';

	res.send(content);
});

app.post('/form-post', function(req, res){
	console.log(req.body);
	res.send("Form posted with data - " + JSON.stringify(req.body));
});

app.listen(3030, function(){
 console.log('Example app listening on port 3030!')
});