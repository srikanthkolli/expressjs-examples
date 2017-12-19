var express = require('express');
var app = express();
var multer  = require('multer');
app.use('/uploads', express.static('uploads'));

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads/')
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname)
  }
});

var upload = multer({ 
				storage: storage, 
				fileFilter: function (req, file, cb) {
				    // accept image only
				    if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
				        return cb(new Error('Only image files are allowed!'), false);
				    }
				    cb(null, true);
				},
				limits: { fileSize: 1000000 } //size in bytes
			});


app.get('/file-upload', function(req, res){
	var content = '<!DOCTYPE html>\
					<html>\
					<head>\
						<title></title>\
					</head>\
					<body>\
						<form action="/file-upload" enctype="multipart/form-data" method="post">\
							<label>Name</label>\
							<input type="text" name="name">\
							<label>File</label>\
							<input type="file" name="photo">\
							<button>Submit</button>\
						</form>\
					</body>\
					</html>';

	res.send(content);
});

app.post('/file-upload', upload.single('photo'), function(req, res){
	var imgFile = "<img src='/" + req.file.path + "'>";
	res.send("File uploaded " + imgFile + "and Form posted with data - " + JSON.stringify(req.body));
});


app.listen(3030, function(){
 console.log('Example app listening on port 3030!')
});