var express = require('express');
var app = express();

const hostname = '127.0.0.1';
const port = 3000;

app.use(express.static('public'));
app.set('view engine', 'jade');
app.set('views', './views'); //template file directory

app.get('/', function(req, res){
  res.send('This is home page');
})

app.get('/template', function(req, res){
  res.render('temp')
})

app.get('/dynamic', function(req, res){
  var lis = ''
  var time = Date();
  for (var i=0;i<5;i++){
    lis += '<li>coding</li>'
  }
  var output = `<!DOCTYPE html>
  <html lang="en" dir="ltr">
    <head>
      <meta charset="utf-8">
      <title></title>
    </head>
    <body>
      Hello, dynamic!
      <ul>
        ${lis}
      </ul>
      ${time}
    </body>
  </html>`;
  res.send(output)
})

app.get('/temp_pic', function(req, res){
  res.send('This is temp_pic, <img src="/7.JPG"> ');
})


app.get('/welcome', function(req, res){
  res.send('This is welcome page');
})
app.listen(port, hostname, function () {
  console.log(`Server running at http://${hostname}:${port}/`);
});
