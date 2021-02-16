var express = require('express');
var router = express.Router();
const __apiVersion = `${process.env.npm_package_version}`;
const __name = `${process.env.npm_package_name}`;   


router.get('/', (req, res, next) => {
    res.status(200).send({
        name: __name,
        api_version: __apiVersion
    });
});


module.exports = router;    