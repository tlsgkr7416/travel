const Client = require('mongodb').MongoClient;
const express = require('express');
const cors = require('cors');
const travel = require('./routes/travel');
const app = express();
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const session = require('express-session');

const bodyParser = require('body-parser');
const port = 3001;

app.use(session({secret: '비밀코드', resave: true, saveUninitialized: false}));
app.use(passport.initialize());
app.use(passport.session());


function corsCheck(req, callback) {
    let corsOptions;
    const acceptList = [];

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

app.post('/delete', async (req, res) => {
    await db.collection('travel').remove({itemId: req.body.itemId});
    res.redirect(`http://localhost:3000/home/${req.body.userId}`);
    res.send(res);
});

app.post('/membership', (req, res) => {
    db.collection('membership').insertOne({
    _id: req.body.id,
    name: req.body.name,
    password: req.body.password,
    email: req.body.email}, (error, client) => { 
    res.redirect('http://localhost:3000/');
    });
});

app.post('/login', passport.authenticate('local', {failureRedirect : '/fail'}), (req, res) => {
  res.redirect(`http://localhost:3000/home/${req.body.id}`);
});

passport.use(new LocalStrategy({
  usernameField: 'id',
  passwordField: 'password',
  session: true,
  passReqToCallback: false,
}, function (inputId, inputPassword, done) {
  
  db.collection('membership').findOne({ _id: inputId+'' }, function (error, result) {
    if (error) return done(error)

    if (!result) return done(null, false, { message: '존재하지않는 아이디' })
    if (inputPassword == result.password) {
      return done(null, result);
    } else {
      return done(null, false, { message: '비번틀렸어요' })
    }
  })
}));

passport.serializeUser(function (user, done) {
  done(null, user._id)
});

passport.deserializeUser(function (id, done) {
  done(null, {})
}); 

const loginCheck = (req, res, next) => {
    if (req.user) {
      next();
    } else res.redirect('http://localhost:3000/');
};

app.post('/home', async (req, res) => {
  const user = await db.collection('membership').findOne({_id: req.body.id});
  const item = await db.collection('travel').find().toArray();
  res.json({user, item});
});

app.put('/item/heart', async (req, res) => {
  console.log(req.body);
  await db.collection('travel').update({itemId: req.body.itemId}, {$inc: {heart: 1}});
  await db.collection('travel').update({itemId: req.body.itemId}, {$push: {heartClickId: req.body.userId}});
  res.send({message: '완료'});
});

app.put('/item/reply', async (req, res) => {
  const response = await db.collection('travel').update({
    itemId: req.body.itemId},
    {$push:{replyPeople:{[req.body.id]: req.body.reply}
  }});
  
  res.send(response);
});

app.get('/mypage/itemList', loginCheck, async (req, res) => {
  const response = await db.collection('travel').find({userId: req.query.userId}).toArray();
  res.json(response);
});

app.get('/logout', async (req, res) => {
    req.logout();
    res.redirect('http://localhost:3000/');
    res.send(res);
});

app.listen(port, () => {
  console.log('server start');
});
