var express = require('express');
var router = express.Router();
const userController = require('../../middlewares/user/user-controller');
const authenticateMiddlewares = require('../../middlewares/authentication/index');


router.get('/getListUser',
    userController.getListUser);


module.exports = router;