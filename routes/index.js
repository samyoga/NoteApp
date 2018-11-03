var express = require('express');
var router = express.Router();

var Users = require('../models/users');
var Notes = require('../models/notes');
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'WLIT' });
});

router.get('/login', function(req, res){
  res.render('login');
});

router.get('/signup', function(req, res){
  res.render('signup');
});

router.post('/signup', function(req, res){
  console.log('request.....', req.body);
  var user = new Users({
    username: req.body.username,
    password: req.body.password
  });
  var promise = user.save();
  promise.then((user) => {
    console.log('user signed up with values', user);
  })
});

router.post('/login', function(req, res){
  if (req.body.username && req.body.password){
  Users.findOne({
    username:req.body.username,
    password: req.body.passwords
  },function(err, user){
    console.log('user logged in with values:', user);
    res.redirect('/addnote')
  })
}
  else { console.log('Not a valid id'); }
});

router.get('/addnote', function(req, res){
  res.render('addnote');
});

router.get('/viewnote', function(req, res){
  //res.render('viewnote');
  Notes.find().exec(function(err, notes){
  res.render('viewnote', {notes})
  });
});

router.post('/addnote', function(req, res){
  console.log('request', req.body);
  var note = new Notes({
    title: req.body.title,
    note: req.body.note
  });
  var promise = note.save();
  promise.then((note) => {
    console.log('Your notes:', note);
    Notes.find().exec(function(err, notes){
      res.render('viewnote', {notes})
    });
  });
});

router.get('/deletenote/:id', function(req, res) {
  Notes.findOneAndRemove({_id: req.params.id}, function(err, note) {
    console.log('deleted note is', note);
    res.redirect('/viewnote')
  });
})

router.get('/editnote/:id', function(req, res){
  Notes.findOne({_id: req.params.id}, function(err, note){
    console.log('edited note is', note);
    res.render('editnote', {note})
  });
})

router.post('/viewnote', function(req, res){
  console.log('request', req.body);
});

module.exports = router;
