const mongoose = require('mongoose');
const Schema = mongoose.Schema;
   
let ReferralSchema = new Schema({
    _id: { type: Schema.Types.ObjectId, required: false },
    name: { type: String },
    rut: { type: String },
    phone:{ type: String },
    email:{ type: String },
    states:{ type: String },
    states_details:{ type: String },
    date_invitation: { type: Date },
    pay_date: { type: Date },
    id_offer: { type: String },
    link: {  type: String },
    intermedio_BO:{
        gestionado: { type: String },
        fecha_gestion: { type: String },
        feedback: { type: String },
        direccion: { type: String },
        numero_peticion_BO: { type: String }
    },
    feedback_Reporteria:{
        estado_peticion: { type: String },
        producto: { type: String },
        fecha_emsion: { type: String },
        fecha_instalacion: { type: String },
        canal_venta: { type: String },
        subcanal: { type: String },
        cau_nombre: { type: String }
    }
}, {
    collection: 'referrals-referral'
});
const ReferralModel = mongoose.model('referrals-referral', ReferralSchema);


module.exports = ReferralModel;