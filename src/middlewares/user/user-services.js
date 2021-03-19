const request = require('request');
const { addListener } = require('../../models/user-model');

const logger = require('../../config/logger')('services:user'),
      UserModel = require('../../models/user-model'), 
      MySql = require('../../config/mysql/index'),
      config = require('../../../config');



const getListUser = async function(){
    try {
        logger.silly(`getListUser - init`);
        MySql.
        var userModelResult = await UserModel.findOne();
        logger.silly(`getListUser - userModel: ${JSON.stringify(userModelResult, null, 2)}`);
        return userModelResult;
    } catch (error) {
        logger.error(`getListUser Error: ${error}`);
        return ({message: `A ocurrido un error: ${error}`});
    }
}

const service = {
    getListUser
};

module.exports = service;