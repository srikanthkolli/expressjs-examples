var express = require('express');
var app = express();

app.set('views', './views');
app.set('view engine', 'pug');

app.get('/render-template', function(req, res, next){
   res.render('index', { title: 'Hey', message: 'Shenll Tech' });
});


app.listen(3030, function(){
 console.log('Example app listening on port 3030!')
});