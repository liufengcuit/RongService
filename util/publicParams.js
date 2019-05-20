const sha1 = require('js-sha1');
const config = require("../chat/config.js")

function encryptionSha1() {
    let $appKey = config.appKey;
    let $nonce = Math.floor(Math.random()*10000).toString();
    let $timestamp = new Date().getTime().toString();
    let $secret = config.secret;
    let $signature = sha1($secret + $nonce + $timestamp);

    return {
        "AppKey": $appKey,
        "Nonce": $nonce,
        "Timestamp": $timestamp,
        "Signature": $signature
    }
}

module.exports = {
    encryptionSha1
}