const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let TyCSchema = new Schema({
    texto: {
        type: String,
        required: true
    },
    politica: {
        type: String,
        enum: ['TerminosYCondiciones', 'Privacidad']
    },
    titulo: {
        type: String
    },
    fecha_creacion: {
        type: Date,
        default: Date.now
    }
}, {
    collection: 'referrals-terms-conditions'
});
const TyCModel = mongoose.model('referrals-terms-conditions', TyCSchema);


module.exports = TyCModel;