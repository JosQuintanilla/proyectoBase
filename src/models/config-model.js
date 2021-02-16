const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let ConfigSchema = new Schema({
    tipo: { type: String, required: true, unique: true },
    data: { type: Object, required: true }
}, {
    collection: 'referrals-configs'
});
const ConfigModel = mongoose.model('referrals-configs', ConfigSchema);


module.exports = ConfigModel;