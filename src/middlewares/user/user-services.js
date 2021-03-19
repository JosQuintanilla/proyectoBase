const request = require('request');
const { addListener } = require('../../models/user-model');

const logger = require('../../config/logger')('services:user'),
      UserModel = require('../../models/user-model'), 
      sql = require("../../config/mysql//index.js"),
      MySql = require('../../config/mysql/index'),
      config = require('../../../config');



const getListUser = async function(){
    try {
        logger.silly(`getListUser - init`);
        sql.query('select rut,nombre, apellido from personas', (err, result) => {
            if (err) {
                logger.error(`error - userModel: ${err}`);
                return;
            }
            if (result.length) {
                logger.silly(`getListUser result: ${JSON.stringify(result, null, 2)}`);
                var personList = []
                result.forEach(persona => {
                    logger.silly(`getListUser uno`);
                    var per = {
                        rut: persona.rut,
                        nombre:persona.nombre,
                        apellido:persona.apellido
                    }
                    personList.push(per);
                });


                return result;
            }
        }); 

    } catch (error) {
        logger.error(`getListUser Error: ${error}`);
        return ({message: `A ocurrido un error: ${error}`});
    }
}

const service = {
    getListUser
};

module.exports = service;