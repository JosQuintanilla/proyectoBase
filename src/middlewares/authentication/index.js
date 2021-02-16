const logger = require('../../config/logger/index')('middleware:authentication');
const jwt = require('jsonwebtoken');
const auth = require('basic-auth');
const { AccessDeniedError, NoCredentialsProvided } = require('../../helpers/errorHandler/ApplicationError');
const { OK } = require('http-status-codes');
const config = require('../../../config');
const tiempoJWT = 300000000;
/**
 * Controller for basic authentication and authorize the user given a json web token
 * @param {object} req - Objeto de entrada
 * @param {string} req.headers.authorization - Header para la autenticacion, se debe proporcionar como 'authorization': 'Basic BASE64(user:pass)'
 * @param {object} res.locals.user - Objeto local para ser utilizado por otros middleware con los datos del usuario
 * @param {object} res.locals.user.credenciales - Objeto con las credenciales del usuario 
 * @param {any} next - Next middleware method
 */
const authenticate = async function(req, res, next) {
    try {
        logger.silly(`authenticate req headers: ${JSON.stringify(req.headers, null, 2)}`);   
        ////
        const credenciales = auth(req);
        logger.silly(`authenticate credenciales: ${JSON.stringify(credenciales, null, 2)}`,);
        if (!credenciales){
            logger.silly(`authenticate : if`);
            throw new NoCredentialsProvided();
        } else{
            logger.silly(`authenticate credenciales else`,);
            res.locals.user = {
                credenciales: credenciales
            };
            next();
        }
    } catch (error) {
        if (error.status) {
            res.status(error.status).json(error.message);
        } else {
            logger.error(`authenticate error ${error}`);
            res.status(500).json(error.message);
        }
    }
}

/**
 * Middleware que verifica y abre el token para ser utilizado en los siguientes middlewares
 * @param {object} req - Objeto de la request de entrada
 * @param {object} req.headers - Cabezeras HTTP: authorization Bearer o x-access-token con el jwt proporcionado en la autenticación basica 
 * @param {object} res - Objeto de respuesta
 * @param {object} res.locals - Objecto local que se entrega a los siguientes middlewares 
 * @param {*} next 
 */
async function authorize(req, res, next) {
    try {
        next();
        /** 
        var token =  req.headers["authorization"];
        if(token != null && token != undefined && token != ""){
            token =  req.headers["authorization"].split('Bearer ')[1];
            logger.silly(`authorize - Token: -${token}-`);
            //if no token found, return response (without going to the next middelware)
            if (!token) throw new NoCredentialsProvided();
            // Verify the token

            const user = _verifyToken(token);
            logger.silly(JSON.stringify(user, null, 2));
            if (!user){
                logger.error(`1 - authorize Usuario Invalido Eliminar el next()`);  
                //throw new NoCredentialsProvided();
                next();
            }else{
                // Keep the user in locals
                res.locals.user = user;
            }
            next();
        }else{
            logger.error(`2 - authorize Usuario Invalido Eliminar el next()`);  
                //throw new NoCredentialsProvided();
            next();
        }*/
    } catch (error) {
        logger.error(`authorize error ${error.stack}`);    
        next(error);
    }
}

/**
 * funcion sincronca para generar el token utilizado el usuario dado
 * @param {object} user - Usuario dado
 */
function _tokenize(user) {
    try {
        var token = jwt.sign({ user: user }, config.SECRET, { expiresIn: tiempoJWT });
        logger.silly(`_tokenize - token ${token}`);
        return token;
    } catch (error) {
        logger.error(`_tokenize error ${error}`);
        throw error;
    }
}

/**
 * Esta funcion tokeniza el objeto user en las variables locales
 * Tambien responde al usuario con el token generado
 * @param {object} req -
 * @param {object} res.locals.user - Objeto del usuario a tokenizar 
 * @param {*} next 
 */
async function tokenization(req, res, next) {
    logger.silly(`tokenization - idUser: ${req.params.id_usuario}`);
    try {
        const token = _tokenize(req.params.id_usuario);
        logger.silly(`tokenization - token: ${token}`);
        res.status(OK).json({
            token
        });
    } catch (error) {
        logger.error(`tokenization error ${error}`);
        next(error);
    }
}

/**
 * Funcion que vefifica que el token es valido
 * @param {string} token 
 */
function _verifyToken(token) {
    return jwt.verify(token, config.SECRET, { expiresIn: tiempoJWT }, (err, obj) => {
        if (err) {
            logger.error(err);
            return false;
        };
        return obj;
    });
};

const middlewares = {
    authenticate,
    authorize,
    tokenization
};

module.exports = middlewares;