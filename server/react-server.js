const Client = require('mongodb').MongoClient;
const express = require('express');
const cors = require('cors');
const app = express();
const bodyParser = require('body-parser');
const port = 3001;

app.listen(port, () => {
    console.log('server start');
});

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
      method: ['GET', 'POST'],
      credentials: true,
    })
);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get('/travelInfo', cors(corsCheck), (req, res) => {
   let url = 'mongodb://localhost:27017';
   Client.connect(url, (error, conn) => {
       const db = conn.db('travel');

       db.collection().find({}).toArray((err, docs) => {
           console.log(docs);
           res.json(docs);
           conn.close();
       });
   });
});