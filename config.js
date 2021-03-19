module.exports = {
    name: 'mspersonasAndina-api',
    env: process.env.ENVIRONMENT || 'production',
    port: process.env.PORT || 3000,
    level: process.env.LEVEL,
    LOG_LEVEL: process.env.LOG_LEVEL || 'silly',
    //MONGO
    MYSQL_HOST:'localhost',
    MYSQL_USER:'root',
    MYSQL_PASS:'123456',
    MYSQL_DATABASE:'personas',
    //TIME OUT 
    TIMEOUT_REQUEST:process.env.TIMEOUT_REFERRAL || '120000',
};