const logger = require('../../config/logger')('services:info-referidos'),
      TyCModel = require('../../models/term-condition-model'),
      InfoModel = require('../../models/info-model');

const getInfoReferrals = async function (){
    try {
        const infoResult = await InfoModel.findOne({});
        logger.silly(`getInfoReferrals infoResult: ${JSON.stringify(infoResult, null, 2)}`);
        return infoResult;
    } catch (error) {
        logger.error(`getInfoReferrals Error: ${error}`);
        throw error;
    }
}

const getAmount = async function (){
    try {
        const infoResult = await InfoModel.findOne({});
        logger.silly(`getAmount amount: ${JSON.stringify(infoResult.amount, null, 2)}`);
        return infoResult.amount;
    } catch (error) {
        logger.error(`getAmount Error: ${error}`);
        throw error;
    }
}

const getTermsAndConditions = async function (){
    try {
        const tycResult = await TyCModel.findOne({});

        logger.silly(`getTermsAndConditions tycResult: ${JSON.stringify(tycResult.texto, null, 2)}`);
        return tycResult.texto;
    } catch (error) {
        logger.error(`getTermsAndConditions Error: ${error}`);
        throw error;
    }
}


const getEndPointMovistar = async function (){
    try {
        const infoResult = await InfoModel.findOne({});
        logger.silly(`getEndPointMovistar endpoint_movistar: ${JSON.stringify(infoResult.endpoint_movistar, null, 2)}`);
        return infoResult.endpoint_movistar;
    } catch (error) {
        logger.error(`getEndPointMovistar Error: ${error}`);
        throw error;
    }
}


const service = {
    getInfoReferrals,
    getAmount,
    getTermsAndConditions,
    getEndPointMovistar
};

module.exports = service;