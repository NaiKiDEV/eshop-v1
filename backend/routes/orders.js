var express = require('express');
var router = express.Router();
var MongoClient = require('mongodb').MongoClient
var ObjectID = require('mongodb').ObjectID
const { DB_FULLURL, DB_NAME, PRODUCT_CODES } = require('../config')
const { getCurrentDate } = require('../utils')

console.log("[SERVER] loading /orders endpoint")
console.log("Date test:", getCurrentDate())

router.post('/userorders', function (req, res, next) {
    const { _id, email } = req.body
    console.log(req.body)
    MongoClient.connect(DB_FULLURL, (err, client) => {
        if (err) {
            console.log("[SERVER] connection failed")
            res.status(400).send({ message: "Failed to connect to the server.", error: 1 })
        }
        var db = client.db(DB_NAME)
        db.collection('orders').find({ $or: [{ email: email }, { userid: new ObjectID(_id) }] }).toArray((err, orders) => {
            if (err) {
                console.log("[SERVER] orders db error")
                res.status(400).send({ message: "Failed to connect to the orders database.", error: 1 })
            }
            if (orders.length > 0) {
                db.collection('orders').aggregate(
                    [
                        {
                            $match: { $or: [{ email: email }, { _id: new ObjectID(_id) }] }
                        },
                        {
                            $lookup: { from: "users", localField: "userid", foreignField: "_id", as: "user" }
                        },
                        {
                            $lookup: { from: "products", localField: "productid", foreignField: "_id", as: "product" }
                        }
                    ])
                    .toArray((err, obj) => {
                        console.log(obj)
                        res.status(200).send({ orders: obj })
                    })
                // db.collection('users').findOne({ _id: new ObjectID(order.userid) }).then(userdata => {
                //     db.collection('products').findOne({ _id: new ObjectID(order.productid) }).then(productdata => {
                //         console.log({ ...order, user: userdata, product: productdata })
                //         res.status(200).send({ ...order, user: { ...userdata, password: null }, product: productdata })
                //     })
                // })

                console.log("Found orders:", orders)
            } else {
                res.status(200).send({ error: 1, message: "There are no products." })
            }
        })
    })
});

router.get('/all', function (req, res, next) {
    MongoClient.connect(DB_FULLURL, (err, client) => {
        if (err) {
            console.log("[SERVER] connection failed")
            res.status(400).send({ message: "Failed to connect to the server.", error: 1 })
        }
        var db = client.db(DB_NAME)
        db.collection('orders').find({}).toArray((err, orders) => {
            if (err) {
                console.log("[SERVER] orders db error")
                res.status(400).send({ message: "Failed to connect to the orders database.", error: 1 })
            }
            if (orders.length > 0) {
                db.collection('orders').aggregate(
                    [
                        {
                            $lookup: { from: "users", localField: "userid", foreignField: "_id", as: "user" }
                        },
                        {
                            $lookup: { from: "products", localField: "productid", foreignField: "_id", as: "product" }
                        }
                    ])
                    .toArray((err, obj) => {
                        console.log(obj)
                        res.status(200).send(obj)
                    })
                // db.collection('users').findOne({ _id: new ObjectID(order.userid) }).then(userdata => {
                //     db.collection('products').findOne({ _id: new ObjectID(order.productid) }).then(productdata => {
                //         console.log({ ...order, user: userdata, product: productdata })
                //         res.status(200).send({ ...order, user: { ...userdata, password: null }, product: productdata })
                //     })
                // })

                console.log("Found orders:", orders)
            } else {
                res.status(200).send({ error: 1, message: "There are no products." })
            }
        })
    })
});

/* GET products listing. */
router.post('/order', function (req, res, next) {
    const { _id } = req.body
    MongoClient.connect(DB_FULLURL, (err, client) => {
        if (err) {
            console.log("[SERVER] connection failed")
            res.status(400).send({ message: "Failed to connect to the server.", error: 1 })
        }
        var db = client.db(DB_NAME)
        db.collection('orders').find({ _id: new ObjectID(_id) }).toArray((err, orders) => {
            if (err) {
                console.log("[SERVER] orders db error")
                res.status(400).send({ message: "Failed to connect to the orders database.", error: 1 })
            }
            if (orders.length > 0) {
                db.collection('orders').aggregate(
                    [
                        {
                            $match: { _id: new ObjectID(_id) }
                        },
                        {
                            $lookup: { from: "users", localField: "userid", foreignField: "_id", as: "user" }
                        },
                        {
                            $lookup: { from: "products", localField: "productid", foreignField: "_id", as: "product" }
                        }
                    ])
                    .toArray((err, obj) => {
                        console.log(obj)
                        res.status(200).send(obj)
                    })
                // db.collection('users').findOne({ _id: new ObjectID(order.userid) }).then(userdata => {
                //     db.collection('products').findOne({ _id: new ObjectID(order.productid) }).then(productdata => {
                //         console.log({ ...order, user: userdata, product: productdata })
                //         res.status(200).send({ ...order, user: { ...userdata, password: null }, product: productdata })
                //     })
                // })

                console.log("Found orders:", orders)
            } else {
                res.status(200).send({ error: 1, message: "There are no products." })
            }
        })
    })
});

router.post('/create', (req, res) => {
    console.log("Request with body:", req.body)
    try {
        const { userid, productid, email } = req.body
        MongoClient.connect(DB_FULLURL, function (err, client) {
            if (err) {
                console.log("[SERVER] connection failed")
                res.status(400).send("Failed to connect to server.")
                return
                // throw err
            }
            // Get db
            var db = client.db(DB_NAME)
            // Try to find if there are users with given email
            db.collection('orders').insertOne(
                {
                    userid: new ObjectID(userid),
                    productid: new ObjectID(productid),
                    email,
                    orderstatus: PRODUCT_CODES.REQUESTED,
                    created: getCurrentDate()
                })
                .then(response => JSON.parse(response))
                .then(response => {
                    console.log(response)
                    if (response.insertedCount > 0) {
                        res.status(200).send({ message: "Order added successfully.", ok: 1 })
                        console.log("Order added successfully.")
                    } else {
                        res.status(200).send({ message: "Order wasn't added.", error: 1 })
                        console.log("Order wasn't added.")
                    }
                }
                )
        })
    } catch (e) {
        res.status(400).send({ message: "Incorrect data format.", error: 1 })
        return
    }

})

router.post('/delete', (req, res) => {
    console.log("Request with body:", req.body)
    const { _id } = req.body // Only need 1 to identify the item, both are unique
    MongoClient.connect(DB_FULLURL, function (err, client) {
        if (err) {
            console.log("[SERVER] connection failed")
            res.status(400).send({ message: "Failed to connect to the server.", error: 1 })
            return
            // throw err
        }
        // Get db
        var db = client.db(DB_NAME)
        // Try to find if there are users with given email
        try {
            db.collection('orders')
                .deleteOne({ _id: new ObjectID(_id) })
                .then(response => JSON.parse(response))
                .then(response => {
                    console.log(response)
                    if (response.deletedCount > 0) {
                        res.status(200).send({ message: "Order removed successfully.", ok: 1 })
                        console.log("Order removed successfully.")
                    } else {
                        res.status(200).send({ message: "Order wasn't removed.", error: 1 })
                        console.log("Order wasn't removed.")
                    }
                })
        } catch (e) {
            res.status(400).send({ message: "Incorrect _id value, must be 12bits", error: 1 })
            console.log("_id was incorrect", _id)
            return
        }

    })
})

router.post('/update', (req, res) => {
    console.log("Request with body:", req.body)
    const { _id, orderstatus } = req.body
    MongoClient.connect(DB_FULLURL, function (err, client) {
        if (err) {
            console.log("[SERVER] connection failed")
            res.status(400).send({ message: "Failed to connect to the server.", error: 1 })
            return
            // throw err
        }
        // Get db
        var db = client.db(DB_NAME)
        try {
            if (Object.values(PRODUCT_CODES).indexOf(orderstatus) > -1) {
                db.collection('orders')
                    .findOneAndUpdate({ _id: new ObjectID(_id) }, { $set: { orderstatus: orderstatus } })
                    .then(response => {
                        console.log(response)
                        if (response.ok) {
                            res.status(200).send({ message: "Order was updated successfully.", ok: 1 })
                            console.log("Order was updated successfully.")
                        } else {
                            res.status(200).send({ message: "Order wasn't updated.", error: 1 })
                            console.log("Order wasn't updated.")
                        }
                    })
            } else {
                res.status(200).send({ message: "You provided invalid productstatus code.", error: 1 })
            }

        } catch (e) {
            res.status(400).send({ message: "Incorrect _id value, must be 12bits", error: 1 })
            console.log("_id was incorrect", _id)
            throw e
            return
        }

    })
})



console.log("[SERVER] loading /orders endpoint complete \n")

module.exports = router;
