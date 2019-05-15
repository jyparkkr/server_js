const hostname = '127.0.0.1';
const port = 3000;

var express = require('express');
var bodyParser = require('body-parser');
var fs = require('fs');

var mysql = require('mysql');
var conn = mysql.createConnection({
  host  : 'localhost',
  user  : 'root',
  password  : 'password',
  database : 'o2'
});

conn.connect();
var app = express();
app.set('views', './views_mysql');
app.set('view engine', 'jade');
app.use(bodyParser.urlencoded({extended:false}));
app.locals.pretty = true;

app.get('/topic/add', function(req, res){
  var sql = 'SELECT id, title FROM topic';
  conn.query(sql, function(err, topics, fields){
    if(err){
      console.log(err);
      res.status(500).send('Internal server error');
    } else{
      console.log('add open');
      res.render('add', {topics:topics});
    }
  });
});

app.post('/topic/add', function(req, res){
  var title = req.body.title;
  var description = req.body.description;
  var author = req.body.author;
  var sql = 'INSERT INTO topic (title, description, author) VALUES(?, ?, ?)';
  conn.query(sql, [title, description, author], function(err, result, fields){
    if(err){
      console.log(err);
      res.status(500).send('Internal Server Error');
    } else {
      res.redirect('/topic/'+result.insertId);
    }
  });
})


app.get('/topic/edit', function(req, res){
  var sql = 'SELECT id, title FROM topic';
  conn.query(sql, function(err, topics, fields){
    if(err){
      console.log(err);
      res.status(500).send('Internal server error');
    } else{
      console.log('edit open');
      res.render('edit', {topics:topics});
    }
  });
});

app.get(['/topic/:id/edit'], function(req, res){
  var sql = 'SELECT id, title FROM topic';
  conn.query(sql, function(err, topics, fields){
    var id = req.params.id;
    if(id){
      var sql = 'SELECT * FROM topic WHERE id=?';
      conn.query(sql, [id], function(err, rows, field){
        if(err){
          console.log(err);
          res.status(500).send('Internal server error');
        } else{
          console.log('view with available topic');
          res.render('edit', {topics:topics, rows:rows[0]});
        }
      })
    } else{
      console.log('view without id');
      res.status(500).send('Internal server error');
    }
  });
});

app.post(['/topic/:id/edit'], function(req, res){
  console.log('here');
  var title = req.body.title;
  var description = req.body.description;
  var author = req.body.author;
  var id = req.params.id;
  var sql = 'UPDATE topic SET title=?, description=?, author=? WHERE id=(?)';
  conn.query(sql, [title, description, author, id], function(err, result, fields){
    if(err){
      console.log(err);
      res.status(500).send('Internal Server Error');
    } else {
      res.redirect('/topic/'+id);
    }
  });
})

app.get(['/topic', '/topic/:id'], function(req, res){
  var sql = 'SELECT id, title FROM topic';
  conn.query(sql, function(err, topics, fields){
    var id = req.params.id;
    if(id){
      var sql = 'SELECT * FROM topic WHERE id=?';
      conn.query(sql, [id], function(err, rows, field){
        if(err){
          console.log(err);
          res.status(500).send('Internal server error');
        } else{
          console.log('view with available topic');
          res.render('view', {topics:topics, rows:rows[0]});
        }
      })
    } else{
      console.log('view with no-available topic');
      res.render('view', {topics:topics});
    }
  });
});


app.get('/', function(req, res){
  //res.send('This is home page');
  var sql = 'SELECT id, title FROM topic';
  conn.query(sql, function(err, topics, fields){
    console.log('view with no-available topic');
    res.render('view', {topics:topics});
  });
});

app.listen(port, hostname, function () {
  console.log(`Server running at http://${hostname}:${port}/`);
});
