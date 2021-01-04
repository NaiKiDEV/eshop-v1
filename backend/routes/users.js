var express = require('express');
var router = express.Router();
var MongoClient = require('mongodb').MongoClient
const { DB_FULLURL, DB_NAME } = require('../config')

console.log("DB URL:", DB_FULLURL)
console.log("DB NAME:", DB_NAME)

/* GET users listing. */
router.get('/', function (req, res, next) {
  res.send('respond with a resource');
});

router.post('/delete', (req, res) => {
  console.log(req.body)
  console.log("Request with body:", req.body)
  const { email } = req.body
  MongoClient.connect(DB_FULLURL, function (err, client) {
    if (err) {
      console.log("[SERVER] connection failed")
      res.status(400).send("Failed to connect to the server.")
      return
      // throw err
    }
    // Get db
    var db = client.db(DB_NAME)
    // Try to find if there are users with given email
    db.collection('users').find({ email: email }).toArray((err, result) => {
      if (err) {
        console.log("[SERVER] users db error")
        res.status(400).send("Failed to connect to the users database.")
        return
        // throw err
      }
      console.log("Found users with given email ", result.length)
      // If there are no users with given email
      if (result.length === 1) {
        db.collection('users').deleteOne({ email: email })
          .then(response => JSON.parse(response))
          .then(response => {
            console.log(response)
            if (response.deletedCount > 0) {
              res.status(200).send({ message: "User removed successfully.", ok: 1 })
              console.log("User removed successfully.")
            } else {
              res.status(400).send({ message: "User wasn't removed." })
              console.log("User wasn't removed.")
            }
          }
          )
      } else {
        res.status(200).send({ message: "User doesn't exist." })
        console.log("User doesn't exist.")
      }
    })
  })
})

router.post('/create', (req, res) => {
  console.log("Request with body:", req.body)
  const { email, password } = req.body
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
    db.collection('users').find({ email: email }).toArray((err, result) => {
      if (err) {
        console.log("[SERVER] users db error")
        res.status(400).send("Failed to connect to users database.")
        return
        // throw err
      }
      console.log("Found users with given email ", result.length)
      // If there are no users with given email
      if (result.length === 0) {
        db.collection('users').insertOne({ email: email, password: password })
          .then(response => JSON.parse(response))
          .then(response => {
            console.log(response)
            if (response.insertedCount > 0) {
              res.status(200).send({ message: "User added successfully.", ok: 1 })
              console.log("User added successfully.")
            } else {
              res.status(400).send({ message: "User wasn't added." })
              console.log("User wasn't added.")
            }
          }
          )
      } else {
        res.status(200).send({ message: "User already exists." })
        console.log("User already exists.")
      }
    })
  })
})

module.exports = router;
