var express = require('express');
var app = express();

app.use(function(req, res, next) {
  console.log('Middleware 1');
  next();
});

app.use(function(req, res, next) {
  console.log('Middleware 2');
  next();
});

app.get('/*', function(req, res, next){
   next();
});

app.get('/home', function(req, res, next){
   res.send('Helloooooooooo');
});

app.get('/form', function(req, res){
	var content = '<!DOCTYPE html>\
					<html>\
					<head>\
						<title></title>\
					</head>\
					<body>\
						<form action="/form-post" method="post">\
							<label>Email</label>\
							<input type="text" name="email">\
							<label>Passowrd</label>\
							<input type="password" name="password">\
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