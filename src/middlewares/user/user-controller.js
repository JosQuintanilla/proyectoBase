const logger = require('../../config/logger')('middleware:userController'),
      UserService = require('./user-services'),
      validations = require('../../helpers/validators/user/user-validator'),
      { AccessDeniedError } = require('../../helpers/errorHandler/ApplicationErrors');

const validateUser = async function (req,res,next){
    const result = await UserService.validateUser(req.params.id_usuario);
    if(result != null && result != undefined && result.message != null && result.message != undefined){
        res.status(500).json(result);
    }else{   
        next();
    }
}

const getUser = async function (req,res,next){
    logger.silly(`getUser - params: ${JSON.stringify(req.params, null, 2)}`);
    const result = await UserService.getUser(req.params.id_usuario);
    if(result != null && result != undefined && result.message != null && result.message != undefined){
        res.status(500).json(result);
    }else{   
        res.status(200).json(result);
    }
}

const aceptTermsAndConditions = async function(req, res, next){
    logger.silly(`aceptTermsAndConditions - params : ${JSON.stringify(req.params, null, 2)}`);
    const result = await UserService.aceptTermsAndConditions(req.params.id_usuario);
    res.status(200).json(result);
}

const addReferral = async function(req, res, next){
    try {
        var validate = validations.validateAddReferral(req.body);
        if (validate.ok) {
            const result = await UserService.addReferral(req.body);
            res.status(200).json(result);
        }else{
            logger.error(`addReferral - Error al validar ${JSON.stringify(validate.errors, null, 2)}`);
            throw  new AccessDeniedError(JSON.stringify( validate.errors, null, 2));
        }
    } catch (error) {
        logger.error(`addReferral - A ocurrido un error ${error}`);
        res.status(500).json({message: `addReferral - A ocurrido un error ${error}`});
    }
}

const getListReferrals = async function(req, res, next){
    logger.silly(`getListReferrals - params : ${JSON.stringify(req.params, null, 2)}`);
    const result = await UserService.getListReferrals(req.params.id_usuario);
    res.status(200).json(result);
}

const addBankDetail = async function(req, res, next){
    logger.silly(`addBankDetail - params : ${JSON.stringify(req.body, null, 2)}`);
    const result = await UserService.addBankDetail(req.body);
    res.status(200).json(result);
}

const getBankDetails = async function(req, res, next){
    logger.silly(`getBankDetails - params : ${JSON.stringify(req.params, null, 2)}`);
    const result = await UserService.getBankDetails(req.params.id_usuario);
    res.status(200).json(result);
}

const getInvitationDetail = async function(req, res, next){
    try {
        const result = await UserService.getInvitationDetail(req.params.id_usuario,req.params.rut_invitado, req.params.id_plan);
        logger.silly(`getInvitationDetail - result : ${JSON.stringify(result, null, 2)}`);
        res.status(200).json(result); //{message: `salio bien`}
    } catch (error) {
        logger.error(`getInvitationDetail - A ocurrido un error ${error}`);
        res.status(500).json({message: `getInvitationDetail - A ocurrido un error ${error}`});
    }   
}

const controller = {
    validateUser,
    getUser,
    aceptTermsAndConditions,
    addReferral,
    getListReferrals,
    addBankDetail,
    getBankDetails,
    getInvitationDetail
};
module.exports = controller;