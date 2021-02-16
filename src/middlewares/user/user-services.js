const request = require('request');
const { addListener } = require('../../models/user-model');

const logger = require('../../config/logger')('services:user'),
      UserModel = require('../../models/user-model'), 
      OfferModel = require('../../models/offer-model'),
      InfoModel = require('../../models/info-model'),
      ReferralModel = require('../../models/referral-model'),
      Utils = require('../../helpers/utils/util'),
      ObjectId = require('mongodb').ObjectID,
      moment = require('moment'),
      ApiClubMovistar = require('./../../services/apiClub-services'),
      config = require('../../../config');

const validateUser = async function (id_user){
    try {
        logger.silly(`validateUser - id_user: ${id_user}`);
        try {
            //Search the user in Gamification
            var userResult = await UserModel.findOne({id_usuario: id_user});
            logger.silly(`validateUser userResult: ${JSON.stringify(userResult, null, 2)}`);
            if(userResult != null && userResult != undefined){
                //Validatr fecha T y C
                const infoResult = await InfoModel.findOne({});
                logger.silly(`validateUser infoResult date tyc: ${infoResult.date_t_y_c}`);
                logger.silly(`validateUser userResult date tyc: ${userResult.date_t_y_c}`);

                if(infoResult.date_t_y_c > userResult.date_t_y_c){
                    logger.silly(`validateUser Debe actualizar T Y C`);
                    userResult.t_y_c = false;
                    userResult.save();
                }
                return userResult;
            }else{
                logger.silly(`validateUser usuario No existe en Referidos`);
                const resultApi =  await ApiClubMovistar.getReferralCode(id_user);
                logger.silly(`validateUser resultApi: ${resultApi}`);
                if(resultApi.codError == "200"){ // || resultApi.codError == "800"
                    //Agregar Uario a Base Referidos
                    var email = '';
                    if(resultApi.data.linea[0].email){
                        email = resultApi.data.linea[0].email;
                    }else{
                        email = resultApi.data.email;
                    }
                    var user = new UserModel();
                    user.name = resultApi.data.name,
                    user.last_name = resultApi.data.last_name,
                    user.rut = resultApi.data.rut,
                    user.email = email,
                    user.id_linea = resultApi.data._id, ////////////////////Esta mal
                    user.id_usuario = resultApi.data._id,
                    user.referal_code = resultApi.data.codigoReferido,
                    user.phone = resultApi.data.phone,
                    //Create user
                    logger.silly(`validateUser usuario creado en referidos`);
                    await user.save();
                    return user;
                }else{
                    return ({message: `El usuario no existe en el club`});
                }  
            }
        } catch (error) {
            logger.error(`validateUser Error Api Club: ${error}`);
            return ({message: `El usuario no existe en el club: ${error}`});
        }        
    } catch (error) {
        logger.error(`validateUser Error: ${error}`);
        return ({message: `A ocurrido un error: ${error}`});
    }
}

const getUser = async function(id_user){
    try {
        logger.silly(`getUser - id_user: ${id_user}`);
        var userModelResult = await UserModel.findOne({id_usuario: id_user});
        logger.silly(`getUser - userModel: ${JSON.stringify(userModelResult, null, 2)}`);
        return userModelResult;
    } catch (error) {
        logger.error(`getUser Error: ${error}`);
        return ({message: `A ocurrido un error: ${error}`});
    }
}

const validateExitsUser = async function (id_user) {
    try {
        const userResult = await UserModel.findOne({id_usuario: id_user});
        logger.silly(`validateExitsUser user: ${JSON.stringify(userResult, null, 2)}`);
        if(userResult != null && userResult != undefined){
            return true;
        }else{
            return false;
        }
    } catch (error) {
        logger.error(`validateExitsUser Error: ${error}`);
        throw error;
    }
}

const aceptTermsAndConditions = async function (id_user){
    try {
        logger.silly(`aceptTermsAndConditions - id_user: ${id_user}`);
        //Validate if user don't accept terms and conditions
        const userResult = await UserModel.findOne({id_usuario: id_user, t_y_c: false});
        logger.silly(`aceptTermsAndConditions user: ${JSON.stringify(userResult, null, 2)}`);
        if(userResult != null && userResult != undefined){
            const queryTyC = {
                id_usuario: id_user
            },
                options = { upsert: true, new: false },
                update = {
                    t_y_c: true,
                    date_t_y_c: new Date()
            };
            const result = await UserModel.findOneAndUpdate(queryTyC, update, options);
            logger.silly(`aceptTermsAndConditions - result: ${JSON.stringify(result, null, 2)} `);
    
            if(result != null && result != undefined){
                return true;
            }else{
                return false;
            }
        }else{
            return true;
        }
    } catch (error) {
        logger.error(`aceptTermsAndConditions Error: ${error}`);
        throw error;
    }
}

const addReferral = async function(request){
    try {
        var userModelResult = await UserModel.findOne({id_usuario: request.id_usuario});
        var offerResult = await OfferModel.findById({_id: ObjectId(request.id_offer)});
        const infoResult = await InfoModel.findOne({});
        //Validar Referido
        if(userModelResult == null || userModelResult == undefined || offerResult == null || offerResult == undefined){
            return ({codError: "205", message: `El usuario no existe en referidos`});
        }
        //Validar que el usuario no se invite
        logger.info(`addReferral - Validate rut: request.rut: ${request.rut} y el userModelResult.rut: ${userModelResult.rut}`);
        if(request.rut == userModelResult.rut){
            logger.error(`addReferral - El referido no se puede invitar a el mismo`);
            return ({codError: "204", message: `El referido no se puede invitar a el mismo`});
        }
        var day = new Date();
        day.setDate(0);
        var endDay = new Date();
        endDay.setDate(31);
        var startMouth = moment(day).format("YYYY-MM-DD");
        var endMouth = moment(endDay).format("YYYY-MM-DD");
        logger.silly(`addReferral - fechas startMouth: ${startMouth} -  endMouth: ${endMouth} oferta: ${infoResult.id_offer_internet}`);

        let queryReferralOfferInternet = [
            { $match: { "id_usuario": request.id_usuario } },
            { $unwind: "$referrals" }, { $match: { "referrals.date_invitation":  { $gte: new Date(startMouth), $lt: new Date(endMouth)  } } },
            { $match: { "referrals.id_offer":  infoResult.id_offer_internet } }
        ];            
        const invitadoOfferInternetResult = await UserModel.aggregate(queryReferralOfferInternet);
        logger.silly(`addReferral - invitadoOfferInternetResult length: ${JSON.stringify(invitadoOfferInternetResult.length, null, 2)}`);
        let queryReferralOfferMobile = [
            { $match: { "id_usuario": request.id_usuario } },
            { $unwind: "$referrals" }, { $match: { "referrals.date_invitation":  { $gte: new Date(startMouth), $lt: new Date(endMouth)  } } },
            { $match: { "referrals.id_offer":  infoResult.id_offer_mobile } }
        ];            
        const invitadoOfferMobileResult = await UserModel.aggregate(queryReferralOfferMobile);
        logger.silly(`addReferral - invitadoOfferMobileResult length: ${invitadoOfferMobileResult.length}`);
        logger.silly(`addReferral - maximum_amount_per_month  ${infoResult.maximum_amount_per_month}`);            
        if(Number(invitadoOfferMobileResult.length) >= Number(infoResult.maximum_amount_per_month) ||
            Number(invitadoOfferInternetResult.length) >= Number(infoResult.maximum_amount_per_month)){
            logger.error(`addReferral - Has superado el maximo de invitaciones que puedes enviar por mes. Espera hasta el próximo mes para invitarla nuevamente.`);
            return ({codError: "204", message: `Has superado el maximo de invitaciones que puedes enviar por mes. Espera hasta el próximo mes para invitarla nuevamente.`});
        }
        //N veces la misma persona
        let queryPerReferral = [
            { $match: { "id_usuario": request.id_usuario } },
            { $unwind: "$referrals" }, { $match: { "referrals.date_invitation":  { $gte: new Date(startMouth), $lt: new Date(endMouth)  } } },
            { $match: { "referrals.rut": request.rut , "referrals.id_offer": request.id_offer }  }
        ];            
        const perReferralResult = await UserModel.aggregate(queryPerReferral);
        logger.silly(`addReferral - perReferralResult length: ${perReferralResult.length}`);
        logger.silly(`addReferral - per referral  ${infoResult.maximum_amount_per_referral}`); 
        if(Number(perReferralResult.length) >= Number(infoResult.maximum_amount_per_referral)){
            logger.error(`addReferral - Ya has invitado ${infoResult.maximum_amount_per_referral } veces a esta persona durante este mes. Espera hasta el próximo mes para invitarla nuevamente.`);
            return ({codError: "204", message: `Ya has invitado ${infoResult.maximum_amount_per_referral } veces a esta persona durante este mes. Espera hasta el próximo mes para invitarla nuevamente.`});
        }
        var date_invitation_aux  =  new Date();
        date_invitation_aux.setHours(Number(date_invitation_aux.getHours() - 3 ));
        var referal = new ReferralModel({
            _id: ObjectId(),
            name: request.name, rut: request.rut, phone:'56'+request.phone,
            email:request.email, states: "blue", states_details: config.STATUS_ON_PROCESS,
            date_invitation: date_invitation_aux, id_offer: request.id_offer,
            link: offerResult.landing,  url: offerResult.landing,
            'intermedio_BO.gestionado': '', 'intermedio_BO.fecha_gestion': '',
            'intermedio_BO.feedback': '', 'intermedio_BO.direccion': '',
            'intermedio_BO.numero_peticion_BO': '', 'feedback_Reporteria.estado_peticion': '',
            'feedback_Reporteria.producto': '', 'feedback_Reporteria.fecha_emsion': '',
            'feedback_Reporteria.fecha_instalacion': '', 'feedback_Reporteria.canal_venta': '',
            'feedback_Reporteria.subcanal': '', 'feedback_Reporteria.cau_nombre': ''
        });
        userModelResult.referrals.push(referal);
        userModelResult.save();
        //Enviar Invitacion a Referidos
        const resultSendInvitation = await sendInvitationToReferrals(infoResult.url_app, userModelResult.bank_detail.email, userModelResult.name+' '+userModelResult.last_name,referal);
        logger.silly(`addReferral - resultSendInvitation: ${JSON.stringify(resultSendInvitation, null, 2)}`);
        return userModelResult;
    } catch (error) {
        logger.error(`addReferral Error: ${JSON.stringify(error, null,2)}`);
        throw error;
    }
}


const sendInvitationToReferrals = async function(url_app,email,nombre_referidor,referral){
    try {
        logger.silly(`sendInvitationToReferrals - referral: ${JSON.stringify(referral, null, 2)}`);
        try {
            const offerResult = await OfferModel.findById({_id: ObjectId(referral.id_offer)});
            logger.silly(`sendInvitationToReferrals - isInternet: ${offerResult.isInternet}`);

            ///1 Email Referidor 001744
            const dataEmailReferidor = {
                asunto: `${referral.name} te invita a unirte a la experiencia`,
                nombre_referidor: nombre_referidor,
                nombre_referido: referral.name,
                nombre_plan: offerResult.name,
                email: email,
                rut: '1',
                dv: '9',
                url: url_app,
                item1: offerResult.items[0].item,
                item2: offerResult.items[1].item,
                item3: offerResult.items[2].item,
                item4: offerResult.items[3].item,
                imagen_plan: offerResult.items[4].item
            };
            logger.silly(`sendInvitationToReferrals - dataEmailReferidor: ${JSON.stringify(dataEmailReferidor, null, 2)}`);
            const resultEmailReferidor = await ApiClubMovistar.sendEmailEmbajador(dataEmailReferidor);
            logger.silly(`sendInvitationToReferrals - resultEmailReferidor: ${JSON.stringify(resultEmailReferidor, null, 2)}`);

            ///  2 Email Referidor Internet 001746
            ///  2 Email Referidor Mobile   001745
            const dataEmailReferido = {
                asunto: `${referral.name} te invita a unirte a la experiencia`,
                nombre_referidor: nombre_referidor,
                nombre_referido: referral.name,
                nombre_plan: offerResult.name,
                email: referral.email,
                rut: '1',
                dv: '9',
                url: offerResult.landing,
                item1: offerResult.items[0].item,
                item2: offerResult.items[1].item,
                item3: offerResult.items[2].item,
                item4: offerResult.items[3].item,
                imagen_plan: offerResult.items[4].item
            };
            logger.silly(`sendInvitationToReferrals - is Internet: ${offerResult.isInternet}`);
            var resultEmailReferido = {};
            if(offerResult.isInternet == "true"){
                logger.silly(`sendInvitationToReferrals - Plan Internet OK`);
                resultEmailReferido = await ApiClubMovistar.sendEmailReferralPlanInternet(dataEmailReferido);
            }else{
                resultEmailReferido = await ApiClubMovistar.sendEmailReferralPlanMobile(dataEmailReferido);
            }
            logger.silly(`sendInvitationToReferrals - resultEmailReferido: ${JSON.stringify(resultEmailReferido, null, 2)}`);
            
            //SMS
            const datosSMS = {
                nombre_referido: referral.name,
                nombre_referidor: nombre_referidor,
                rut: '1',
                dv: '9',
                url: offerResult.landing,
                email: referral.email,
                phone: referral.phone
            };
            logger.silly(`sendInvitationToReferrals - datosSMS: ${JSON.stringify(datosSMS, null, 2)}`);
            const resultSMS = await ApiClubMovistar.sendSMS(datosSMS);
            logger.silly(`sendInvitationToReferrals - resultSMS: ${JSON.stringify(resultSMS, null, 2)}`);
            return true;
        } catch (error) {
            logger.error(`sendInvitationToReferrals Error 1: ${error}`);
            return false;
        }        
    } catch (error) {
        logger.error(`sendInvitationToReferrals Error 2: ${error}`);
        throw error;
    }
}

const getListReferrals = async function(id_user){
    try {
        logger.silly(`getListReferrals - id_user: ${id_user}`);
        var userModelResult = await UserModel.findOne({id_usuario: id_user});
        logger.silly(`addReferral - userModel: ${JSON.stringify(userModelResult, null, 2)}`);
        return userModelResult.referrals;
    } catch (error) {
        logger.error(`getListReferrals Error: ${error}`);
        throw error;
    }
}

const addBankDetail = async function(request){
    try {
        logger.silly(`addBankDetail - request: ${JSON.stringify(request, null, 2)}`);
        var userModelResult = await UserModel.findOne({id_usuario: request.id_usuario});
        logger.silly(`addBankDetail - PRE - userModel: ${JSON.stringify(userModelResult, null, 2)}`);
        var bank = {
            bank: request.bank,
            account_type: request.account_type,
            account_number: request.account_number,
            name: request.name,
            rut: request.rut,
            email: request.email
        };
        userModelResult.bank_detail =  bank;
        logger.silly(`addBankDetail - POST - userModel: ${JSON.stringify(userModelResult, null, 2)}`);
        userModelResult.save();
        return userModelResult;

    } catch (error) {
        logger.error(`addBankDetail Error: ${error}`);
        throw error;
    }
}

const getBankDetails = async function(id_user){
    try {
        logger.silly(`getBankDetails - id_user: ${id_user}`);
        var userModelResult = await UserModel.findOne({id_usuario: id_user});
        logger.silly(`getBankDetails - userModel: ${JSON.stringify(userModelResult, null, 2)}`);
        return userModelResult.bank_detail;
    } catch (error) {
        logger.error(`getBankDetails Error: ${error}`);
        throw error;
    }
}



const getInvitationDetail = async function(id_user, rut_invitado, id_plan){
    try {
        logger.silly(`getInvitationDetail - id_user: ${id_user}`);
        logger.silly(`getInvitationDetail - rut_invitado: ${rut_invitado}`);
        logger.silly(`getInvitationDetail - id_plan: ${id_plan}`);
        let queryInivtation = [
            { $match: { "id_usuario": id_user } },
            { $unwind: "$referrals" },
            { $match: { "referrals.rut": rut_invitado, "referrals.id_offer": id_plan } }
          ];
          logger.silly(`getInvitationDetail - queryInivtation: ${JSON.stringify(queryInivtation, null, 2)}`);
        const userResult = await UserModel.aggregate(queryInivtation);
        logger.silly(`getInvitationDetail - userResult: ${JSON.stringify(userResult[0], null, 2)}`);
        const offerResult = await OfferModel.findById({_id: ObjectId(id_plan)});
        if(userResult != null && userResult != undefined && userResult[0] != null && userResult[0] != undefined && offerResult != null && offerResult != undefined){
            logger.silly(`getInvitationDetail - offerResult.name_plan: ${JSON.stringify(offerResult.name, null, 2)}`);            
            var result = {
                name: userResult[0].name+" "+userResult[0].last_name,
                link: offerResult.urlUtmMailCorta,
                orden: offerResult.orden,
                name_plan: offerResult.name ,
                imagen_plan: offerResult.imagen ,
                discount: offerResult.discount ,
                discount_string: offerResult.discount_string ,
                capacity: offerResult.capacity ,
                capacity_text: offerResult.capacity_text ,
                price: offerResult.price ,
                normal_price: offerResult.normal_price ,
                isInternet: offerResult.isInternet,
                months: offerResult.months ,
                items: offerResult.items
            };
            //logger.silly(`getInvitationDetail - result: ${JSON.stringify(result, null, 2)}`);
            return result;
        }else{
            logger.error(`getInvitationDetail No existe usuario o oferta`);
            return ({message: "Error No existe usuario o oferta"});
        }
    } catch (error) {
        logger.error(`getInvitationDetail Error: ${error}`);
        return ({message: `A ocurrido un error: ${error}`});
    }
}
const service = {
    validateUser,
    getUser,
    aceptTermsAndConditions,
    addReferral,
    getListReferrals,
    addBankDetail,
    getBankDetails,
    getInvitationDetail
};

module.exports = service;