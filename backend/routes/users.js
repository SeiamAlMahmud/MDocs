var express = require('express');
const { register } = require('../controllers/userControllers');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post("/register", register)
module.exports = router;
