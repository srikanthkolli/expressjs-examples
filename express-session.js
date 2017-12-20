var express = require('express');
var app = express();
var bodyParser = require('body-parser'); //For parsing http body
var session = require('express-session');

app.use(session({ secret: 'anything' }));
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/login', function(req, res){

	var content = '';
	if(req.session && typeof req.session.user == 'undefined'){
		content = '<!DOCTYPE html>\
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
	}else{
		content = '<p>You are already loggedin</p> <a href="/logout">Logout</a>';
	}

	res.send(content);
});

app.post('/form-post', function(req, res){
	if(req.body && req.body.user){
		if(req.body.user.email == 'srikanth@shenll.com' && req.body.user.password == '123456'){
			req.session.user = {email: 'srikanth@shenll.com' };
			res.send("Sucess!!!!!! you are loggedin <a href='/logout'>Logout</a>");
		}else{
			res.send("Failed!!!! Please check email or pasword");
		}
	}else{
		res.send("Failed!!!! Email or pasword are required");
	}
});

app.get('/logout', function(req, res){
	req.session.destroy();
	res.redirect('/login');
});


app.listen(3030, function(){
 console.log('Example app listening on port 3030!')
});