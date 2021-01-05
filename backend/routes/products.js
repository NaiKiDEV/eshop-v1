var express = require('express');
var router = express.Router();
var MongoClient = require('mongodb').MongoClient
var ObjectID = require('mongodb').ObjectID
const { DB_FULLURL, DB_NAME } = require('../config')
const { getCurrentDate } = require('../utils')

console.log("[SERVER] loading /products endpoint")

console.log("Date test:", getCurrentDate())

/* GET products listing. */
router.get('/all', function (req, res, next) {
    MongoClient.connect(DB_FULLURL, (err, client) => {
        if (err) {
            console.log("[SERVER] connection failed")
            res.status(400).send({ message: "Failed to connect to the server.", error: 1 })
        }
        var db = client.db(DB_NAME)
        db.collection('products').find({}).toArray((err, products) => {
            if (err) {
                console.log("[SERVER] products db error")
                res.status(400).send({ message: "Failed to connect to the products database.", error: 1 })
            }
            if (products.length > 0) {
                res.status(200).send(products.map(product => { return { ...product } }))
                console.log("All products:", products)
            } else {
                res.status(200).send({ error: 1, message: "There are no products." })
            }
        })
    })
});

router.post('/delete', (req, res) => {
    console.log("Request with body:", req.body)
    const { _id, name } = req.body // Only need 1 to identify the item, both are unique
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
            db.collection('products').find({ $or: [{ name: name }, { _id: new ObjectID(_id) }] }).toArray((err, result) => {
                if (err) {
                    console.log("[SERVER] users db error")
                    res.status(400).send({ message: "Failed to connect to the users database.", error: 1 })
                    return
                    // throw err
                }
                console.log("Found products ", result.length)
                // If there are no products with given name
                if (result.length === 1) {
                    db.collection('products')
                        .deleteOne({ $or: [{ name: name }, { _id: new ObjectID(_id) }] })
                        .then(response => JSON.parse(response))
                        .then(response => {
                            console.log(response)
                            if (response.deletedCount > 0) {
                                res.status(200).send({ message: "Product removed successfully.", ok: 1 })
                                console.log("Prod removed successfully.")
                            } else {
                                res.status(200).send({ message: "Product wasn't removed.", error: 1 })
                                console.log("Prod wasn't removed.")
                            }
                        })
                } else {
                    res.status(200).send({ message: "Product doesn't exist.", error: 1 })
                    console.log("[SERVER] User doesn't exist.")
                }
            })
        } catch (e) {
            res.status(400).send({ message: "Incorrect _id value, must be 12bits", error: 1 })
            console.log("_id was incorrect", _id)
            return
        }

    })
})

router.post('/create', (req, res) => {
    console.log("Request with body:", req.body)
    try {
        const { name, price, description, categories, stock, images } = req.body
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
            db.collection('products').find({ name: name }).toArray((err, result) => {
                if (err) {
                    console.log("[SERVER] users db error")
                    res.status(400).send("Failed to connect to users database.")
                    return
                    // throw err
                }
                console.log("Found users with given email ", result.length)
                // If there are no users with given email
                if (result.length === 0) {
                    db.collection('products').insertOne(
                        {
                            name,
                            price,
                            description,
                            categories,
                            images,
                            stock,
                            created: getCurrentDate()
                        })
                        .then(response => JSON.parse(response))
                        .then(response => {
                            console.log(response)
                            if (response.insertedCount > 0) {
                                res.status(200).send({ message: "Product added successfully.", ok: 1 })
                                console.log("Product added successfully.")
                            } else {
                                res.status(200).send({ message: "Product wasn't added.", error: 1 })
                                console.log("Product wasn't added.")
                            }
                        }
                        )
                } else {
                    res.status(200).send({ message: "Product with that name already exists.", error: 1 })
                    console.log("Product with that name already exists.")
                }
            })
        })
    } catch (e) {
        res.status(400).send({ message: "Incorrect data format.", error: 1 })
        return
    }

})

console.log("[SERVER] loading /products endpoint complete \n")

module.exports = router;
