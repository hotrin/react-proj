const mysql = require('mysql');
const express = require('express');
let app = express();
const bodyparser = require('body-parser');
const cors = require('cors');

app.use(bodyparser.json());
app.use(cors());

let db = mysql.createConnection({
  host: 'remotemysql.com',
  user: 'uHqoXfY5Iu',
  password: 'IG60yZtRF4',
  database: 'uHqoXfY5Iu'
});

db.connect((err) => {
  if (!err)
    console.log('db is connected')
  else
    console.log('db connection FAILD ! ! ! ' + JSON.stringify(err, undefined, 2))
});

app.listen(4000, () => console.log('express running on port no : 4000'));

app.get('/vacations', (req, res) => {
  db.query('SELECT * FROM vacations', (err, rows, fileds) => {
    if (!err) {
      res.send(rows);
    } else {
      console.log(err);
    }
  });
});

app.get('/vacations/:id', (req, res) => {
  const { id } = req.params;
  db.query('SELECT * FROM vacations WHERE id = ?', [id], (err, rows, fileds) => {
    if (!err) {
      res.send(rows);
    } else {
      console.log(err);
    }
  });
});

app.post('/vacations', (req, res) => {
  const { destination, picture, fromDate, toDate, price } = req.body;
  const query = 'INSERT INTO vacations (destination, picture, fromDate, toDate, price) VALUES (?, ?, ?, ?, ?)';
  db.query(query, [destination, picture, fromDate, toDate, price], (error, results, fields) => {
    if (!error) {
      res.send(results);
    } else {
      console.log(error);
      res.status(500).send(error);
    }
  });
});

app.put('/vacations/:id', (req, res) => {
  const { id } = req.params;
  const { destination, picture, fromDate, toDate, price } = req.body;
  const query = 'UPDATE vacation SET destination = ?, picture = ?, fromDate = ?, toDate = ?, price = ? WHERE id = ?';
  db.query(query, [destination, picture, fromDate, toDate, price, id], (error, results, fields) => {
    if (!error) {
      res.send(results);
    } else {
      console.log(error);
      res.status(500).send(error);
    }
  });
});

app.delete('/vacations/:id', (req, res) => {
  const { id } = req.params;
  const query = 'DELETE vacation WHERE id=?';
  db.query(query, [id], (error, results, fields) => {
    if (!error) {
      res.send(results);
    } else {
      console.log(error);
      res.status(500).send(error);
    }
  });
});

app.put('/vacation/:id/follow', (req, res) => {
  const { id } = req.pararms;
  const { userId, following } = req.body;
  const query = 'UPDATE vacations SET followers = followers + 1 WHERE id = ?;';
  const query2 = 'UPDATE users SET following = ? WHERE id = ?';
  db.query(`${query2}${query}`, [id, following, userId], (error, results, fields) => {
    if (!error) {
      res.send(results);
    } else {
      console.log(error);
      res.status(500).send(error);
    }
  });
});

app.put('/vacation/:id/unfollow', (req, res) => {
  const { id } = req.pararms;
  const { userId, following } = req.body;
  const query = 'UPDATE vacations SET followers = followers - 1 WHERE id = ?;';
  const query2 = 'UPDATE users SET following = ? WHERE id = ?';
  db.query(`${query2}${query}`, [id, following, userId], (error, results, fields) => {
    if (!error) {
      res.send(results);
    } else {
      console.log(error);
      res.status(500).send(error);
    }
  });
});

app.post('/login', (req, res) => {
  const { username, password } = req.body;
  const query = 'SELECT from users WHERE username = ? AND password = ?';
  db.query(query, [username, password], (error, results, fields) => {
    if (!error) {
      res.send(results);
    } else {
      console.log(error);
      res.status(500).send(error);
    }
  });
});

app.post('/register', (req, res) => {
  const { username, password, name } = req.body;
  const query = 'INSERT INTO users (username, password, name) VALUES (?, ?, ?)';
  db.query(query, [username, password, name], (error, results, fields) => {
    if (!error) {
      res.send(results);
    } else {
      console.log(error);
      res.status(500).send(error);
    }
  });
});
