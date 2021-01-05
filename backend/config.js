const DB_FULLURL = "mongodb://localhost:27017/"
const DB_PORT = 27017
const DB_NAME = "eshopDB"

// Allowed product codes
const PRODUCT_CODES = {
    REQUESTED: 0,
    PAYMENT_RECEIVED: 1,
    SHIPPED: 2,
    DELIVERED: 3,
    DISPUTED: 99
}

exports.DB_FULLURL = DB_FULLURL
exports.DB_PORT = DB_PORT
exports.DB_NAME = DB_NAME
exports.PRODUCT_CODES = PRODUCT_CODES