const express = require('express');
const router = express.Router();
const Room = require('../models/Room');
const { loginCheck } = require('./middlewares');

router.get('/', (req, res, next) => {
  Room.find()
    .then(rooms => {
      res.render('rooms/index', { roomsList: rooms })
    })
    .catch(error => {
      next(error);
    });
  /*
  Room.find({owner: req.user._id})
    .then(rooms => {
      res.render('rooms/index', { roomsList: rooms })
    })
    .catch(error => {
      next(error);
    });
  */
})

router.get('/add', (req, res) => {
  res.render('rooms/add');
});

router.post('/', loginCheck(), (req, res, next) => {
  const { price, name, description } = req.body;
  // if (!req.isAuthenticated()) {
  //   res.redirect('/');

  // }
  Room.create({
    price,
    name,
    description,
    owner: req.user._id
  })
    .then(room => {
      console.log(room);
      res.redirect('/rooms')
    })
    .catch(error => {
      next(error);
    })
});

router.get('/:roomId', (req, res, next) => {
  const query = { _id: req.params.roomId };

  if (req.user.role !== 'admin') {
    query.owner = req.user._id;
  }

  Room.findOneAndDelete(query)
    .then(() => {
      res.redirect('/rooms');
    })
    .catch(error => {
      next(error);
    })
})

module.exports = router;
