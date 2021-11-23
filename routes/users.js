var express = require('express');
var router = express.Router();
const UserController = require('../controllers/UserController');
const login = require('../middleware/login');


router.post('/', UserController.createUsers);
router.get('/:email', UserController.getUser);

router.post('/login', login, UserController.login);
router.get('/acessos/:email', login, UserController.getCount);

router.post('/refresh-token', login, UserController.refreshToken);

module.exports = router;
