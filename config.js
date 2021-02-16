module.exports = {
    name: 'proyecto-api',
    env: process.env.ENVIRONMENT || 'production',
    port: process.env.PORT || 3000,
    level: process.env.LEVEL,
    LOG_LEVEL: process.env.LOG_LEVEL || 'silly',
    //MONGO
    MONGO_PROTOCOL:process.env.MONGO_PROTOCOL || 'mongodb',
    MONGO_USER:process.env.MONGO_USER || 'gamificationapp',
    MONGO_PASS:process.env.MONGO_PASS || 'gamificationapp',
    MONGO_URI:process.env.MONGO_URI || '10.186.243.23:27017',
    MONGO_PORT:process.env.MONGO_PORT || '27017',
    MONGO_DATABASE:process.env.MONGO_DATABASE || 'gamification',
    //TIME OUT 
    TIMEOUT_REQUEST:process.env.TIMEOUT_REFERRAL || '120000',
};