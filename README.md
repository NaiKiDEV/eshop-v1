# NaiKiDev E.Shop v1.0
Below you will find the stack used and how to run the app.

## Stack
#### Front
* HTML, CSS, JS
* React.js
* Bootstrap
* Redux, Redux-Saga
#### Back
* Express.js
* MongoDB


## Front-end
Use your prefered terminal:
* ```cd eshop-v1/app```
* ```npm install``` (First time only)
* ```npm start```
* Open the browser, then type in the following: localhost:3000/
 
## Back-end
Use your prefered terminal:
* ```cd eshop-v1/backend```
* ```npm install``` (First time only)
* ```npm start```
* In the terminal you should see a message: ```"Server running on port 8000"```. You are good to go!

## MongoDB setup (Assuming you have it installed)
* Go into your terminal and type ```mongo```
* Type ```use eshopDB```, this should create db for you to use. Type ```show dbs``` to see if it was created.
* Use these commands to get the default database going 
  * ```db.users.insert({})```
  * ```db.products.insert({})```
  * ```db.orders.insert({})```
* Use ```show collections``` to see if you successfully created the architecture.
