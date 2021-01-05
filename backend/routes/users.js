var express = require('express');
var router = express.Router();
var MongoClient = require('mongodb').MongoClient
const { DB_FULLURL, DB_NAME } = require('../config')
const { getHash, getCurrentDate } = require('../utils')


console.log("DB URL:", DB_FULLURL)
console.log("DB NAME:", DB_NAME)

console.log("[SERVER] loading /users endpoint")

console.log("If there is an error (npm install crypto).")
console.log("Hash test: ", getHash("password"))


/* GET users listing. */
router.get('/all', function (req, res, next) {
	MongoClient.connect(DB_FULLURL, (err, client) => {
		if (err) {
			console.log("[SERVER] connection failed")
			res.status(400).send({ message: "Failed to connect to the server.", error: 1 })
		}
		var db = client.db(DB_NAME)
		db.collection('users').find({}).toArray((err, result) => {
			if (err) {
				console.log("[SERVER] users db error")
				res.status(400).send({ message: "Failed to connect to the users database.", error: 1 })
			}
			if (result.length > 0) {
				res.status(200).send(result.map(user => { return { ...user, password: "this property is hidden from public usage" } }))
				console.log("All users:", result)
			} else {
				res.status(200).send({ ok: 1, message: "There are no users." })
			}
		})
	})
});

router.post('/delete', (req, res) => {
	console.log(req.body)
	console.log("Request with body:", req.body)
	const { email } = req.body
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
		db.collection('users').find({ email: email }).toArray((err, result) => {
			if (err) {
				console.log("[SERVER] users db error")
				res.status(400).send({ message: "Failed to connect to the users database.", error: 1 })
				return
				// throw err
			}
			console.log("Found users with given email ", result.length)
			// If there are no users with given email
			if (result.length === 1) {
				db.collection('users')
					.deleteOne({ email: email })
					.then(response => JSON.parse(response))
					.then(response => {
						console.log(response)
						if (response.deletedCount > 0) {
							res.status(200).send({ message: "User removed successfully.", ok: 1 })
							console.log("User removed successfully.")
						} else {
							res.status(200).send({ message: "User wasn't removed.", error: 1 })
							console.log("User wasn't removed.")
						}
					})
			} else {
				res.status(200).send({ message: "User doesn't exist.", error: 1 })
				console.log("[SERVER] User doesn't exist.")
			}
		})
	})
})

router.post('/create', (req, res) => {
	console.log("Request with body:", req.body)
	const { email, password, address, zipcode, creditcard, phone, name, surname } = req.body
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
				var hashedpass = getHash(password);
				db.collection('users').insertOne(
					{
						email,
						password: hashedpass,
						name,
						surname,
						address,
						zipcode,
						creditcard,
						phone,
						created: getCurrentDate()
					})
					.then(response => JSON.parse(response))
					.then(response => {
						console.log(response)
						if (response.insertedCount > 0) {
							res.status(200).send({ message: "User added successfully.", ok: 1 })
							console.log("User added successfully.")
						} else {
							res.status(200).send({ message: "User wasn't added." })
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

console.log("[SERVER] loading /users endpoint complete \n")

module.exports = router;
