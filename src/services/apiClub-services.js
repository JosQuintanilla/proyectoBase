const logger = require('../config/logger')('Middlewares - ApiClubMovistar'),
      Utils = require('../helpers/utils/util'),
      InfoModel = require('../models/info-model'),
      rp = require('request-promise-native'),
      config = require('../../config');


async function getReferralCode(id_user) {
    try {
        const infoResult = await InfoModel.findOne({});
        //logger.silly(`getReferralCode infoResult: ${JSON.stringify(infoResult, null, 2)}`);
        const OPTIONS = {
            headers: {
                'Authorization': infoResult.validate_user_authorization,
                'Content-Type': 'application/json',
                'apikey': infoResult.validate_user_api_key
            },
            body: JSON.stringify({
                "nombreApi": "getRamdomCode/"+id_user,
                "verbo": "GET",
                "data": [ {} ]
            }),
            method: 'POST'
        };
        const response = await rp(infoResult.validate_user_endpoint, OPTIONS);
        logger.silly(`getReferralCode response: ${JSON.stringify(response, null, 2)}`);
        return JSON.parse(response);
    } catch (err) {
        logger.error(`getReferralCode - err: ${err}`);
        return (false);
    }
}

///  1 Embajador 001744
const sendEmailEmbajador = async function (req) {
    try {
        const infoResult = await InfoModel.findOne({});

        const OPTIONS = {
            headers: {
                'Authorization': infoResult.enviar_email_referidor_authorization,
                'Content-Type': 'application/json',
                'apikey': infoResult.enviar_email_referidor_api_key,
                'Host': infoResult.enviar_email_referidor_host,
                timeout: config.TIMEOUT_REFERRAL
            },
            body: JSON.stringify({
                "triggeringSystem": "GM",
                "notificationType": infoResult.enviar_email_referidor_type, //001744
                "identification": {
                    "identificationType": "RUT",
                    "identificationNumber": req.rut,
                    "identificationCode": req.dv
                },
                "preferredContactMedia": "EMAIL",
                "email": {
                    "eMailAddress": req.email
                },
                "telephoneNumber": {
                    "number": ""
                },
                "templateParameters": {
                    "product": {
                        "name": Utils.reemplazarAcentos(req.nombre_plan)
                    },
                    "individualName": {
                        "givenNames": Utils.reemplazarAcentos(req.nombre_referido),
                        "familyNames": Utils.reemplazarAcentos(req.nombre_referidor)
                    },
                    "url": req.url
                }
            }),
            method: 'POST'
        };
        
        logger.silly(`sendEmailEmbajador - Body: ${OPTIONS.body}`);
        logger.silly(`sendEmailEmbajador - url: ${infoResult.enviar_email_referidor_endpoint}`);
        logger.silly(`sendEmailEmbajador - type: ${infoResult.enviar_email_referidor_type}`);

        const response = await rp(infoResult.enviar_email_referidor_endpoint, OPTIONS);
        logger.silly(`sendEmailEmbajador - response: ${JSON.stringify(response, null, 2)}`);
        return response;
    } catch (err) {
        logger.error(`sendEmailEmbajador - Catch Error: ${err}`);
        return false;
    }
}

///  2 Email Referidor Internet 001746
const sendEmailReferralPlanInternet = async function (req) {
    try {
        const infoResult = await InfoModel.findOne({});
        const OPTIONS = {
            headers: {
                'Authorization': infoResult.enviar_email_plan_internet_authorization,
                'Content-Type': 'application/json',
                'apikey': infoResult.enviar_email_plan_internet_api_key,
                'Host': infoResult.enviar_email_plan_internet_host,
                timeout: config.TIMEOUT_REFERRAL
            },
            body: JSON.stringify({
                "triggeringSystem": "GM",
                "notificationType": infoResult.enviar_email_plan_internet_type,
                "identification": {
                    "identificationType": "RUT",
                    "identificationNumber": req.rut,
                    "identificationCode": req.dv
                },
                "preferredContactMedia": "EMAIL",
                "email": {
                    "eMailAddress": req.email
                },
                "telephoneNumber": {
                    "number": ""
                },
                "templateParameters": {
                    "individualName": {
                        "familyNames": Utils.reemplazarAcentos(req.nombre_referidor),
                        "givenNames": Utils.reemplazarAcentos(req.nombre_referido)
                    },
                    "url": req.url
                }
            }),
            method: 'POST'
        };
        logger.silly(`sendEmailReferralPlanInternet - Body: ${OPTIONS.body}`);
        logger.silly(`sendEmailReferralPlanInternet - type: ${infoResult.enviar_email_plan_internet_type}`);
        logger.silly(`sendEmailReferralPlanInternet - url: ${infoResult.enviar_email_plan_internet_endpoint}`);        

        const response = await rp(infoResult.enviar_email_plan_internet_endpoint, OPTIONS);
        logger.silly(`sendEmailReferralPlanInternet - response: ${JSON.stringify(response, null, 2)}`);
        return response;
    } catch (err) {
        logger.error(`sendEmailReferralPlanInternet - Catch Error: ${err}`);
        return false;
    }
}
///  2 Email Referidor Mobile   001745
const sendEmailReferralPlanMobile = async function (req) {
    try {
        const infoResult = await InfoModel.findOne({});

        const OPTIONS = {
            headers: {
                'Authorization': infoResult.enviar_email_plan_mobile_authorization,
                'Content-Type': 'application/json',
                'apikey': infoResult.enviar_email_plan_mobile_api_key,
                'Host': infoResult.enviar_email_plan_mobile_host,
                timeout: config.TIMEOUT_REFERRAL
            },
            body: JSON.stringify({
                "triggeringSystem": "GM",
                "notificationType": infoResult.enviar_email_plan_mobile_type,
                "identification": {
                    "identificationType": "RUT",
                    "identificationNumber": req.rut,
                    "identificationCode": req.dv
                },
                "preferredContactMedia": "EMAIL",
                "email": {
                    "eMailAddress": req.email
                },
                "telephoneNumber": {
                    "number": ""
                },
                "templateParameters": {
                    "individualName": {
                        "familyNames": Utils.reemplazarAcentos(req.nombre_referidor),
                        "givenNames": Utils.reemplazarAcentos(req.nombre_referido)
                    },
                    "url": req.url
                }
            }),
            method: 'POST'
        };
        logger.silly(`sendEmailReferralPlanMobile - Body: ${OPTIONS.body}`);
        logger.silly(`sendEmailReferralPlanMobile - type: ${infoResult.enviar_email_plan_mobile_type}`);
        logger.silly(`sendEmailReferralPlanMobile - url: ${infoResult.enviar_email_plan_mobile_endpoint}`);
        
        const response = await rp(infoResult.enviar_email_plan_mobile_endpoint, OPTIONS);
        logger.silly(`sendEmailReferralPlanMobile - response: ${JSON.stringify(response, null, 2)}`);
        return response;
    } catch (err) {
        logger.error(`sendEmailReferralPlanMobile - Catch Error: ${err}`);
        return false;
    }
}


///  4 Email Referidor Compra  001780
const sendEmailComprado = async function (req) {
    try {
        const infoResult = await InfoModel.findOne({});
        logger.silly(`sendEmailComprado - req: ${JSON.stringify(req, null, 2)}`);
        
        const OPTIONS = {
            headers: {
                'Authorization': infoResult.enviar_email_comprado_authorization,
                'Content-Type': 'application/json',
                'apikey': infoResult.enviar_email_comprado_api_key,
                'Host': infoResult.enviar_email_comprado_host,
                timeout: config.TIMEOUT_REFERRAL
            },
            body: JSON.stringify({
                "triggeringSystem": "GM",
                "notificationType": infoResult.enviar_email_comprado_type,
                "identification": {
                    "identificationType": "RUT",
                    "identificationNumber": req.rut,
                    "identificationCode": req.dv
                },
                "preferredContactMedia": "EMAIL",
                "email": {
                    "eMailAddress": req.email
                },
                "telephoneNumber": {
                    "number": ""
                },
                "templateParameters": {
                    "productOffering": {
                        "description": "item 1"
                    },
                    "product": {
                        "name": Utils.reemplazarAcentos(req.nombre_plan),
                        "description": "item 2"
                    },
                    "geographicAddress": {
                        "comments": "item 3",
                        "fullAddress": "item 4"
                    },
                    "individualName": {
                        "familyNames": Utils.reemplazarAcentos(req.nombre_referidor),
                        "givenNames": Utils.reemplazarAcentos(req.nombre_referido)                        
                    },
                    "url": req.url,
                    "message": "message"
                }
            }),
            method: 'POST'
        };
        
        logger.silly(`sendEmailComprado - Body: ${OPTIONS.body}`);
        logger.silly(`sendEmailComprado - type: ${infoResult.enviar_email_comprado_type}`);
        logger.silly(`sendEmailComprado - url: ${infoResult.enviar_email_comprado_endpoint}`);

        const response = await rp(infoResult.enviar_email_comprado_endpoint, OPTIONS);
        logger.silly(`sendEmailComprado - response: ${JSON.stringify(response, null, 2)}`);
        return response;
    } catch (err) {
        logger.error(`sendEmailComprado - Catch Error: ${err}`);
        return false;
    }
}


///////////////////////////////////
const sendSMS = async function (req){
    try {
        const infoResult = await InfoModel.findOne({});

        const OPTIONS = {
            headers: {
                'Authorization': infoResult.enviar_sms_authorization,
                'Content-Type': 'application/json',
                'apikey': infoResult.enviar_sms_api_key,
                'Host': infoResult.enviar_sms_host,
                timeout: config.TIMEOUT_REFERRAL
            },
            body: JSON.stringify({
                "triggeringSystem": "GM",
                "notificationType": infoResult.enviar_sms_type,
                "identification": {
                    "identificationType": "RUT",
                    "identificationNumber": req.rut,
                    "identificationCode": req.dv
                },
                "preferredContactMedia": "SMS",
                "email": {
                    "eMailAddress": req.email
                },
                "telephoneNumber": {
                    "number": req.phone
                },
                "templateParameters": {
                    "userAbstract": {
                        "userName": Utils.reemplazarAcentos(req.nombre_referidor)
                    },
                    "individualName":{
                        "fullName": Utils.reemplazarAcentos(req.nombre_referido)
                    },
                    "url": req.url
                }
            }),
            method: 'POST'
        };
    
        logger.silly(`sendSMS - Body: ${OPTIONS.body}`);
        logger.silly(`sendSMS - type: ${infoResult.enviar_sms_type}`);
        logger.silly(`sendSMS - url: ${infoResult.enviar_sms_endpoint}`);

        const response = await rp(infoResult.enviar_sms_endpoint, OPTIONS);
        logger.silly(`sendSMS - response: ${JSON.stringify(response, null, 2)}`);
        return response;
    } catch (err) {
        logger.error(`sendSMS - err catch: ${err}`);
        return (false);
    }
}

///////////////////////////


async function validateReferralsCode(){
    try {
    } catch (err) {
        logger.error(`validarCodigoReferidos - err: ${err}`);
        return (false);
    }
}

module.exports = {
    getReferralCode,
    validateReferralsCode,

    sendEmailEmbajador,
    
    sendEmailReferralPlanInternet,
    sendEmailReferralPlanMobile,
    
    sendEmailComprado, 

    sendSMS
};