const logger = require('../../config/logger')('middleware:userController'),
      UserService = require('./user-services'),
      validations = require('../../helpers/validators/user/user-validator'),
      { AccessDeniedError } = require('../../helpers/errorHandler/ApplicationErrors');



const getListUser = async function (req,res,next){
    logger.silly(`getListUser - init`);
    const result = await UserService.getListUser();
    if(result != null && result != undefined && result.message != null && result.message != undefined){
        res.status(500).json(result);
    }else{   
        res.status(200).json(result);
    }
}


const controller = {
    getListUser
};
module.exports = controller;