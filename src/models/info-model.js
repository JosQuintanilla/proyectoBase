const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let InfoSchema = new Schema({
    terms_and_conditions: { type: String, required: true, unique: true },
    date_t_y_c: { type: Date },
    amount: { type: Number, required: true, unique: true  },

    id_offer_mobile: { type: String, required: true, unique: true },
    id_offer_internet: { type: String, required: true, unique: true },

    maximum_amount_per_month: { type: Number, required: true, unique: true },
    maximum_amount_per_referral: { type: Number, required: true, unique: true },
    endpoint_movistar: { type: String, required: true, unique: true },
    url_app: { type: String, required: true, unique: true },
    endpoint_referidos_web: { type: String, required: true, unique: true },
    validate_user_endpoint: { type: String, required: true, unique: true },
    validate_user_authorization: { type: String, required: true, unique: true },
    validate_user_api_key: { type: String, required: true, unique: true },

    //Referido Plan Internet
    enviar_email_plan_internet_authorization : { type: String, required: true, unique: true },
    enviar_email_plan_internet_api_key : { type: String, required: true, unique: true },
    enviar_email_plan_internet_host : { type: String, required: true, unique: true },
    enviar_email_plan_internet_type : { type: String, required: true, unique: true },
    enviar_email_plan_internet_endpoint : { type: String, required: true, unique: true },

    //Referido Plan Mobile
    enviar_email_plan_mobile_authorization : { type: String, required: true, unique: true },
    enviar_email_plan_mobile_api_key : { type: String, required: true, unique: true },
    enviar_email_plan_mobile_host : { type: String, required: true, unique: true },
    enviar_email_plan_mobile_type : { type: String, required: true, unique: true },
    enviar_email_plan_mobile_endpoint : { type: String, required: true, unique: true },

    //Referidor
    enviar_email_referidor_authorization : { type: String, required: true, unique: true },
    enviar_email_referidor_api_key : { type: String, required: true, unique: true },
    enviar_email_referidor_host : { type: String, required: true, unique: true },
    enviar_email_referidor_type : { type: String, required: true, unique: true },
    enviar_email_referidor_endpoint : { type: String, required: true, unique: true },

    //SMS
    enviar_sms_authorization : { type: String, required: true, unique: true },
    enviar_sms_api_key : { type: String, required: true, unique: true },
    enviar_sms_host : { type: String, required: true, unique: true },
    enviar_sms_type : { type: String, required: true, unique: true },
    enviar_sms_endpoint : { type: String, required: true, unique: true },
    
    //Comprado
    enviar_email_comprado_authorization : { type: String, required: true, unique: true },
    enviar_email_comprado_api_key : { type: String, required: true, unique: true },
    enviar_email_comprado_host : { type: String, required: true, unique: true },
    enviar_email_comprado_type : { type: String, required: true, unique: true },
    enviar_email_comprado_endpoint : { type: String, required: true, unique: true }
}, {
    collection: 'referrals-info'
});
const InfoModel = mongoose.model('referrals-info', InfoSchema);


module.exports = InfoModel;