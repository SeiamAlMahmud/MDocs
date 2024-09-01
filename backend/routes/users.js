var express = require('express');
const { register, login, logout, dashboard } = require('../controllers/userControllers');
const authMiddleware = require('../MiddleWare/authMiddleware');
var router = express.Router();

/* GET users listing. */
router.get('/', function (req, res, next) {
  res.send('respond with a resource');
});

router.get('/dashboard', authMiddleware, dashboard)


router.post("/register", register)
router.post("/login", login)
router.post('/logout', logout);


module.exports = router;
