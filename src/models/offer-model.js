const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let OfferSchema = new Schema({
    orden: {  type: Number, required: true  },
    name: {  type: String, required: true  },
    imagen: {  type: String, required: true  },
    discount: {  type: Number, required: true  },
    discount_string: {  type: String, required: true  },
    capacity: {  type: String, required: true  },
    capacity_text: {  type: String, required: true  },
    price: {  type: String, required: true  },
    normal_price: {  type: String, required: true  },
    months: {  type: String, required: true  },
    discount_month: {  type: String, required: true  },
    landing: {  type: String, required: true  },
    link: {  type: String, required: true  },
    urlUtmSms: {type:String, require:true},
    urlUtmMail: {type:String, require:true},
    urlUtmSmsCorta: {type:String, require:true},
    urlUtmMailCorta: {type:String, require:true},
    id_bo: {  type: String, required: true  },
    bo_name: {  type: String, required: true  },
    isInternet: {  type: String, required: true  },
    status: {  type: Boolean, required: true  },
    items:[{
        item: {  type: String, required: true  },
        item_text: {  type: String, required: true  },
        item_icon: {  type: String, required: true  }
    }]
}, {
    collection: 'referrals-offers'
});
const OfferModel = mongoose.model('referrals-offers', OfferSchema);


module.exports = OfferModel;