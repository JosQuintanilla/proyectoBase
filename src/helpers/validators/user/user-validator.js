"use strict";
/* utils */
var JSONValidation = require('json-validation').JSONValidation,
    logger = require('../../../config/logger')('middleware:JSONValidation');

exports.validateAddReferral = function(datos) {
    var jv = new JSONValidation();
    var schema = {
        type: "object",
        properties: {
            id_usuario: { type: "string", required: true },
            referal_code: { type: "string", required: true },
            name: { type: "string", required: true },
            rut: { type: "string", required: true },
            phone:{ type: "string", required: true },
            email:{ type: "string", required: true },
            id_offer:{ type: "string", required: true }
        }
    };
    return jv.validate(datos, schema);
}