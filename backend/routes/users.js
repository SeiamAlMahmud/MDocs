var express = require('express');
const { register, login, logout } = require('../controllers/userControllers');
const authMiddleware = require('../MiddleWare/authMiddleware');
var router = express.Router();

/* GET users listing. */
router.get('/', function (req, res, next) {
  res.send('respond with a resource');
});

router.get('/dashboard', authMiddleware, (req, res) => {
  console.log('first')
  res.json({ success: true, message: 'Welcome to your dashboard' });
});

router.post("/register", register)
router.post("/login", login)
router.post('/logout', logout);
module.exports = router;
