var express = require('express');
var app = express();
//Azure port config
var portaz = process.env.PORT || 8000;


app.use('/public', express.static(__dirname + '/public'));


app.get('/', function(req, res){
  res.sendFile(__dirname+'/index.html')
});

app.get('/template.html', function(req, res){
  res.sendFile(__dirname+'/template.html')
});

var server = app.listen(portaz, function(){
  var host = server.address().address;
  var port = server.address().port;

  console.log('The app is listening at http://%s:%s', host, port)
});
