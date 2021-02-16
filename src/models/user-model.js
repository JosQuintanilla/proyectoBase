const mongoose = require('mongoose');
const Schema = mongoose.Schema;
   
let UserSchema = new Schema({
    name: { type: String, unique: true },
    last_name: { type: String },
    rut: { type: String },
    email: { type: String },
    id_linea: { type: String },
    id_usuario: { type: String },
    referal_code: { type: String },
    phone: { type: String, default: "" },
    t_y_c: { type: Boolean, default: false },
    date_t_y_c: { type: Date },
    referrals: [{
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
        add_csv: { type: Boolean, default: false },
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
    }],
    bank_detail: {
        bank: { type: String },
        account_type: { type: String },
        account_number: { type: String },
        name: { type: String },
        rut: { type: String },
        email: { type: String }
    }
}, {
    collection: 'referrals-users'
});
const UserModel = mongoose.model('referrals-users', UserSchema);


module.exports = UserModel;