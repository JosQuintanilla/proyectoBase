var express = require('express');
var router = express.Router();
const OfferController = require('../../middlewares/offer/offer-controller');
const authenticateMiddlewares = require('../../middlewares/authentication/index');

router.get('/getOffers', 
    authenticateMiddlewares.authorize,
    OfferController.getOffers
);

router.post('/addOffer', 
    authenticateMiddlewares.authorize,
    OfferController.addOffer
);

router.get('/idPlan/:id_plan', 
    OfferController.getInvitationPlan);

module.exports = router;