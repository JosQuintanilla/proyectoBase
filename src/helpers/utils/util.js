const rp = require('request-promise-native'),
      logger = require('../../config/logger')('Utils');


exports.reemplazarAcentos = function (cadena) {
    cadena = cadena.replace(/á/gi, 'a');
    cadena = cadena.replace(/é/gi, 'e');
    cadena = cadena.replace(/í/gi, 'i');
    cadena = cadena.replace(/ó/gi, "o");
    cadena = cadena.replace(/ú/gi, "u");
    cadena = cadena.replace(/ñ/gi, "n");

    return cadena;
}

exports.encrypt = async function (param){
    logger.silly(`Utils - encrypt - param: ${param}`);
    var bf = new Blowfish("referidos_key");
    var encrypted = bf.encrypt(param);
    return encrypted;
}

exports.desencrypt = async function (param){
    logger.silly(`Utils - desencrypt - param: ${param}`);
    var bf = new Blowfish("referidos_key");
    var decrypted = bf.decrypt(param);
    logger.silly(`Utils - desencrypt - decrypted: ${decrypted}`);
    return decrypted;
}