var express = require('express');
var router = express.Router();
const login = require('../middleware/login');
const AcessoController = require('../controllers/AcessoController');

/* GET home page. */
router.post('/', login, AcessoController.login);

module.exports = router;
