var express = require('express')
var app = express()

//app.use(express.static('public'));

//Alias path for static files
app.use('/static', express.static('public'));

app.get('/', function(req, res){
	res.set('Content-Type', 'text/xml'); //res.type('html'); res.set({'Content-Type':'text/xml'});
	res.send('<name>Hello World!</name>');
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
							<input type="text" name="">\
							<label>Passowrd</label>\
							<input type="password" name="">\
							<button>Submit</button>\
						</form>\
					</body>\
					</html>';

	//res.set('Content-Type', 'text/plain'); 
	res.send(content);
});


app.post('/form-post', function(req, res){
	res.send("Form posted");
});

app.put('/put-method', function(req, res){
	res.send("Accessing route thorugh PUT method");
});

app.get('/json', function(req, res){
	var json_data = {"user_name": "Srikanth", "user_id": 100};
	res.json(json_data);
});

app.get('/download-pdf', function(req, res){
	console.log("download file path" +  __dirname + '/downloads/Express4.pdf' );
	res.download(__dirname + '/downloads/Express4.pdf', 'expressjs-documentation.pdf');
});

app.get('/download-excel', function(req, res){
	console.log("download file path" +  __dirname + '/downloads/expressjs.xlsx' );
	res.download(__dirname + '/downloads/expressjs.xlsx', 'expressjs.xlsx');
});

app.get('/download-image', function(req, res){
	console.log("download file path" +  __dirname + '/downloads/2017-11-27_120013.png' );
	res.download(__dirname + '/downloads/2017-11-27_120013.png', 'sample.png');
});

app.get('/send-image', function(req, res){
	res.sendFile(__dirname + '/downloads/2017-11-27_120013.png');
});

app.listen(3030, function(){
 console.log('Example app listening on port 3030!')
});