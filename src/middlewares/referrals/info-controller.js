const logger = require('../../config/logger')('middleware:infoController'),
      InfoServices = require('./info-services');

const getInfoReferrals = async function (req,res, next){
    const result = await InfoServices.getInfoReferrals();
    res.status(200).json(result);
}

const getAmount = async function (req,res, next){
    const result = await InfoServices.getAmount();
    res.status(200).json(result);
}

const getTermsAndConditions = async function (req,res, next){
    const result = await InfoServices.getTermsAndConditions();
    logger.silly(`getTermsAndConditions result : ${JSON.stringify(result, null, 2)}`);
    res.status(200).json(result);
}

const getEndPointMovistar = async function (req,res, next){
    const result = await InfoServices.getEndPointMovistar();
    logger.silly(`getEndPointMovistar result : ${JSON.stringify(result, null, 2)}`);
    res.status(200).json(result);
}

const controller = {
    getInfoReferrals,
    getAmount,
    getTermsAndConditions,
    getEndPointMovistar
};

module.exports = controller;