var express = require('express');
var router = express.Router();
const userController = require('../../middlewares/user/user-controller');
const authenticateMiddlewares = require('../../middlewares/authentication/index');

router.get('/validateUser/:id_usuario',
    userController.validateUser,
    authenticateMiddlewares.tokenization
    );

router.get('/getUser/:id_usuario',
    authenticateMiddlewares.authorize,
    userController.getUser);

router.patch('/:id_usuario/aceptTermsAndConditions',
    authenticateMiddlewares.authorize,
    userController.aceptTermsAndConditions);

router.post('/:id_usuario/addReferral', 
    authenticateMiddlewares.authorize,
    userController.addReferral);

router.get('/:id_usuario/getListReferrals', 
    authenticateMiddlewares.authorize,
    userController.getListReferrals);

router.post('/:id_usuario/addBankDetail', 
    authenticateMiddlewares.authorize,
    userController.addBankDetail);

router.get('/:id_usuario/rutInvitado/:rut_invitado/idPlan/:id_plan', 
    userController.getInvitationDetail);

module.exports = router;