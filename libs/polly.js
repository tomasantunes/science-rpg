const AWS = require('aws-sdk');
var secretConfig = require('../secret-config.json');

function getPolly() {
    AWS.config = new AWS.Config();
    AWS.config.accessKeyId = secretConfig.AWS_ACCESS_KEY_ID;
    AWS.config.secretAccessKey = secretConfig.AWS_SECRET_ACCESS_KEY;
    AWS.config.region = "eu-north-1";

    const Polly = new AWS.Polly();
    return Polly;
}

module.exports = {
    getPolly,
    default: {
        getPolly
    }
};