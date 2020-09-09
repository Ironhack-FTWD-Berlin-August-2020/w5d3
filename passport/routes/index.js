const express = require('express');
const router = express.Router();
const { loginCheck } = require('./middlewares');

// middleware that checks if the user is logged in
// const loginCheck = () => {
//   return (req, res, next) => {
//     if (req.isAuthenticated()) {
//       next();
//     } else {
//       res.redirect('/login');
//     }
//   }
// }


/* GET home page */
router.get('/', (req, res, next) => {
  res.render('index', { user: req.user });
});

router.get('/private', loginCheck(), (req, res) => {
  res.render('private');
});

module.exports = router;
