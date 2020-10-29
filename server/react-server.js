const Client = require('mongodb').MongoClient;
const express = require('express');
const cors = require('cors');
const travel = require('./routes/travel');
const app = express();

const bodyParser = require('body-parser');
const port = 3001;


function corsCheck(req, callback) {
    let corsOptions;
    const acceptList = [
      // ... url list
    ];
    if (acceptList.indexOf(req.header('Origin')) !== -1) {
      corsOptions = { origin: true, credential: true };
    } else {
      corsOptions = { origin: false };
    }
    callback(null, corsOptions);
}

app.use(
    cors({
      method: ['GET', 'POST', 'PUT', 'DELETE'],
      credentials: true,
    })
);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use('/travel', travel);
let db;

app.get('/', cors(corsCheck), (req, res) => {
   let url = 'mongodb://localhost:27017';
   Client.connect(url, (error, conn) => {
       db = conn.db('travel');
       res.send('성공');
   });
});

app.post('/item', async (req, res) => {
  await db.collection('travel').insertOne(req.body);
  res.json(req.body);
});

app.put('/item', async (req, res) => {
  const result = req.body;
  const response = await db.collection('travel').update({itemId: result.itemId}, result);
  res.send(response);
});

app.delete('/delete', async (req, res) => {
  const response = await db.collection('travel').remove(req.body);
  res.send(response);
})

app.post('/membership', (req, res) => {
    db.collection('membership').insertOne({
    _id: req.body.id,
    name: req.body.name,
    password: req.body.password,
    email: req.body.email}, (error, client) => { 
    res.redirect('http://localhost:3000/');
    });
});

app.post('/login', (req, res) => {
  db.collection('membership').findOne({_id: req.body.id, password: req.body.password}, (error, docs) => {
    if (docs) {
      res.redirect(`http://localhost:3000/home/${req.body.id}`);
    } else {
      res.json(docs);
    }
  });
});

app.post('/home', async (req, res) => {
  const user = await db.collection('membership').findOne({_id: req.body.id});
  const item = await db.collection('travel').find({userId: req.body.id}).toArray();
  res.json({user, item});
});

app.put('/item/heart', async (req, res) => {
  const response = await db.collection('travel').update(req.body, {$inc: {heart: 1}});
  res.send(response);
});

app.listen(port, () => {
  console.log('server start');
});
