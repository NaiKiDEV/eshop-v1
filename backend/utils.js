var crypto = require('crypto');

function getCurrentDate() {
    var date = new Date()
    var m = date.getMonth()
    var d = date.getDate()
    var h = date.getHours()
    var min = date.getMinutes()
    var s = date.getSeconds()
    return `${date.getFullYear()}-${m < 10 ? "0" + (m + 1) : m + 1}-${d < 10 ? "0" + (d + 1) : d + 1} ${h < 10 ? "0" + h : h}:${min < 10 ? "0" + min : min}:${s < 10 ? "0" + s : s}`
}

function hash(message) {
    return crypto.createHash('sha256').update(message).digest('hex');
}

exports.getCurrentDate = getCurrentDate
exports.getHash = hash