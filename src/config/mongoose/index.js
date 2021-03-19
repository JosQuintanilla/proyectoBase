const mongoose = require('mongoose');
const logger = require('../logger')('mongoose');
const config = require('../../../config');

async function connect() {
    console.log('mongo - process - MONGO_DATABASE',process.env.MONGO_DATABASE);
    console.log('mongo - config - MONGO_DATABASE',config.MONGO_DATABASE);
    try {
        // mongoose.Promise = global.Promise;
        const protocol = config.MONGO_PROTOCOL;
        const user = config.MONGO_USER;
        const pass = config.MONGO_PASS;
        const uri = config.MONGO_URI;
        const database = config.MONGO_DATABASE;
        // const replicaSet = config.MONGO_REPLICATE_SET;
        //const mongouri = `${protocol}://${user}:${pass}@${uri}/${database}`;
        const mongouri = '';
        //logger.info(`mongouri: ${mongouri}`);
        await mongoose.connect(mongouri, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
            useFindAndModify: false
        });
        return true;

    } catch (error) {
        logger.error(error);
        mongoose.disconnect();
        throw error;
    }

}

mongoose.connection.on("connected", function() {
    logger.info('Connected to mongo');
});

mongoose.connection.on("error", function(err) {
    logger.error(err);
});

mongoose.connection.on('disconnected', function() {
    logger.info('MongoDB Disconnected');
});


module.exports = {
    connect: connect
};